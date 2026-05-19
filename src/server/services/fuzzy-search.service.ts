import { prisma } from "../db/prisma";
import { RetrievalResult } from "./search-orchestrator.service";

export class FuzzySearchService {
  /**
   * Tier 1.5 - PostgreSQL Fuzzy Search (pg_trgm)
   * A crucial safety net that runs entirely locally, protecting against OpenAI downtime.
   * Handles typos, partial matches, and noise by comparing trigrams.
   */
  public static async search(query: string, limit: number = 5): Promise<RetrievalResult[]> {
    try {
      // PostgreSQL similarity() returns a score between 0 and 1.
      // We set a threshold of 0.2 to catch typos but avoid pure garbage.
      const threshold = 0.2;

      // We search across BOTH title and content, combining the best match.
      // Using Raw SQL to leverage pg_trgm similarity functions directly.
      const fuzzyMatches: any[] = await prisma.$queryRaw`
        SELECT 
          id,
          "chunkId",
          title,
          content,
          "entityType",
          "entityId",
          "priorityScore",
          GREATEST(
            similarity(title, ${query}),
            similarity(content, ${query})
          ) as match_score
        FROM semantic_chunks
        WHERE 
          similarity(title, ${query}) > ${threshold} OR 
          similarity(content, ${query}) > ${threshold}
        ORDER BY match_score DESC
        LIMIT ${limit};
      `;

      return fuzzyMatches.map(match => ({
        chunkId: match.chunkId,
        title: match.title,
        content: match.content,
        entityType: match.entityType,
        entityId: match.entityId,
        score: match.match_score * match.priorityScore,
        tierUsed: 1.5
      }));
    } catch (e) {
      console.error("[FuzzySearch] Tier 1.5 Failed:", e);
      return []; // Failsafe empty return, let Tier 2 or 3 handle it
    }
  }
}
