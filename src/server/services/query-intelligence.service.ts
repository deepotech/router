import { prisma } from "../db/prisma";

export interface IntentCluster {
  coreIntent: string;
  volume: number;
  relatedQueries: string[];
  recommendedAction: 'GENERATE' | 'MONITOR' | 'IGNORE';
}

export class QueryIntelligenceService {
  /**
   * Analyzes CACHE_MISS events (failed searches) to extract recurring semantic intents.
   * This acts as the roadmap generator for future content.
   */
  public static async analyzeUnresolvedQueries(daysBack = 7): Promise<IntentCluster[]> {
    const cutoff = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);

    const misses = await prisma.analyticsEvent.findMany({
      where: {
        eventType: "CACHE_MISS",
        createdAt: { gte: cutoff }
      },
      select: { eventData: true }
    });

    const queryFrequency = new Map<string, number>();

    for (const miss of misses) {
      const data = miss.eventData as { query?: string };
      if (data?.query) {
        // Simplified normalization. Real implementation uses NLP or embeddings to cluster.
        const normalized = data.query.toLowerCase().trim().replace(/[^\w\s]/g, "");
        if (normalized.length > 3) {
          queryFrequency.set(normalized, (queryFrequency.get(normalized) || 0) + 1);
        }
      }
    }

    // Heuristic Clustering (Grouping similar words)
    const clusters: Record<string, IntentCluster> = {};

    for (const [query, count] of queryFrequency.entries()) {
      const coreKeywords = query.split(/\s+/).filter(w => w.length > 3).sort().join(" ");
      const intentKey = coreKeywords || query;

      if (!clusters[intentKey]) {
        clusters[intentKey] = {
          coreIntent: intentKey,
          volume: 0,
          relatedQueries: [],
          recommendedAction: 'MONITOR'
        };
      }
      
      clusters[intentKey].volume += count;
      if (!clusters[intentKey].relatedQueries.includes(query)) {
        clusters[intentKey].relatedQueries.push(query);
      }
    }

    const sortedClusters = Object.values(clusters).sort((a, b) => b.volume - a.volume);

    // Apply generation threshold
    for (const cluster of sortedClusters) {
      if (cluster.volume >= 5) {
        cluster.recommendedAction = 'GENERATE';
      } else if (cluster.volume === 1) {
        cluster.recommendedAction = 'IGNORE';
      }
    }

    return sortedClusters;
  }
}
