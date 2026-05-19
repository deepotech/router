import { prisma } from "../db/prisma";
import { OpenAI } from "openai";
import { SearchAnalyticsService } from "./search-analytics.service";
import { SemanticMemoryService } from "./semantic-memory.service";
import { AuthorityHubService } from "./authority-hub.service";
import { QueryNormalizationService } from "./query-normalization.service";
import { FallbackRecommendationService } from "./fallback-recommendation.service";
import { StorageTier } from "@prisma/client";

// Support both native OpenAI keys (sk-...) and OpenRouter keys (sk-or-v1-...)
// When an OpenRouter key is detected, route requests via the OpenRouter base URL.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const isOpenRouter = OPENAI_API_KEY.startsWith("sk-or-");
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || "dummy-key-for-build",
  ...(isOpenRouter && { baseURL: "https://openrouter.ai/api/v1" })
});


export interface RetrievalResult {
  chunkId: string;
  title: string | null;
  content: string;
  entityType: string;
  entityId: number;
  score: number;
  tierUsed: number;
  isFallback?: boolean;
}

export class SearchOrchestratorService {
  /**
   * Main retrieval entry point. 
   * Tries Memory Cache -> Deterministic -> Semantic fallback -> Reranking.
   */
  public static async search(query: string, limit = 5): Promise<RetrievalResult[]> {
    const startTime = Date.now();
    let fallbackTriggered = false;
    let reranked = false;
    let tierUsed = 1;

    const normalizedQuery = QueryNormalizationService.normalize(query);

    try {
      // TIER 0: SEMANTIC MEMORY CACHE (Ultra-fast, zero database cost)
      // If someone searched this exact phrase recently, return it instantly.
      const cached = await SemanticMemoryService.retrieveMemory(normalizedQuery);
      if (cached) {
        SearchAnalyticsService.logSearch({
          query: normalizedQuery,
          latencyMs: Date.now() - startTime,
          tierUsed: 0,
          resultsReturned: 1,
          classification: "exact"
        });
        
        return [{
          chunkId: cached.fingerprint,
          title: "Cached Semantic Response",
          content: cached.content,
          entityType: cached.entityType,
          entityId: 0,
          score: cached.trustScore,
          tierUsed: 0
        }];
      }

      // TIER 1 & 1.5: UNIFIED HYBRID SQL LAYER (Exact + FTS + Trigram)
      // This reduces latency by eliminating sequential DB queries.
      const exactQuery = `%${normalizedQuery}%`;
      
      const unifiedMatches: any[] = await prisma.$queryRaw`
        SELECT 
          "chunkId",
          title,
          content,
          "entityType",
          "entityId",
          "priorityScore",
          (
            -- 1. Exact match bonus (Highest weight)
            CASE 
              WHEN title ILIKE ${exactQuery} THEN 2.0 
              WHEN content ILIKE ${exactQuery} THEN 1.5 
              ELSE 0.0 
            END
            +
            -- 2. Trigram similarity (Handles typos)
            GREATEST(similarity(title, ${normalizedQuery}), similarity(content, ${normalizedQuery})) * 0.5
            +
            -- 3. Full Text Search Rank (Natural language weighting)
            ts_rank_cd(textsearch, plainto_tsquery('english', ${normalizedQuery})) * 1.5
          ) * "priorityScore" as combined_score
        FROM semantic_chunks
        WHERE 
          title ILIKE ${exactQuery} OR 
          content ILIKE ${exactQuery} OR 
          similarity(title, ${normalizedQuery}) > 0.15 OR 
          similarity(content, ${normalizedQuery}) > 0.15 OR
          textsearch @@ plainto_tsquery('english', ${normalizedQuery})
        ORDER BY combined_score DESC
        LIMIT ${limit};
      `;

      let results: RetrievalResult[] = unifiedMatches.map(m => ({
        chunkId: m.chunkId,
        title: m.title,
        content: m.content,
        entityType: m.entityType,
        entityId: m.entityId,
        score: m.combined_score,
        tierUsed: m.combined_score > 1.5 ? 1 : 1.5 // Rough estimation of exact vs fuzzy tier
      }));

      // TIER 2: SEMANTIC SEARCH FALLBACK (Only if Tier 1 & 1.5 fail to find enough results)
      if (results.length < limit) {
        fallbackTriggered = true;
        tierUsed = 2;

        try {
          const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: normalizedQuery,
            encoding_format: "float",
          });
          const queryVector = response.data[0].embedding;
          const vectorString = `[${queryVector.join(",")}]`;

          const semanticMatches: any[] = await prisma.$queryRaw`
            SELECT 
              c."chunkId", 
              c."title", 
              c."content", 
              c."entityType", 
              c."entityId", 
              c."priorityScore",
              1 - (e."embedding" <=> ${vectorString}::vector) as similarity
            FROM "embedding_records" e
            JOIN "semantic_chunks" c ON e."chunkId" = c."id"
            WHERE e."storageTier" = 'HOT'::"StorageTier"
            ORDER BY e."embedding" <=> ${vectorString}::vector ASC
            LIMIT ${limit};
          `;

          const existingIds = new Set(results.map(r => r.chunkId));
          for (const match of semanticMatches) {
            if (!existingIds.has(match.chunkId)) {
              results.push({
                chunkId: match.chunkId,
                title: match.title,
                content: match.content,
                entityType: match.entityType,
                entityId: match.entityId,
                score: match.similarity * match.priorityScore, 
                tierUsed: 2
              });
              existingIds.add(match.chunkId);
            }
          }
          reranked = true;
        } catch (semanticError) {
          console.error("[SearchOrchestrator] Tier 2 Semantic Search failed:", semanticError);
          // Do not throw - allow fallback to Tier 3
        }
      }

      // Final sort based on composite scores
      results.sort((a, b) => b.score - a.score);
      results = results.slice(0, limit);

      // TIER 3: HONEST FALLBACK (If literally no relevant results are found)
      // We never return an empty array or hallucinated data. We return Popular Hubs.
      if (results.length === 0) {
        tierUsed = 3;
        results = await FallbackRecommendationService.getGlobalFallbacks(limit);
      }

      const latencyMs = Date.now() - startTime;
      
      let classification: "exact" | "typo" | "semantic" | "garbage" = "exact";
      if (tierUsed === 1.5) classification = "typo";
      else if (tierUsed === 2) classification = "semantic";
      else if (tierUsed === 3) classification = "garbage";

      SearchAnalyticsService.logSearch({
        query: normalizedQuery,
        latencyMs,
        tierUsed,
        resultsReturned: results.length,
        classification
      });

      return results;
    } catch (e) {
      console.error("Search Orchestrator Error:", e);
      // Failsafe empty return (we shouldn't reach here unless DB itself dies)
      return [];
    }
  }
}
