import { prisma } from "../db/prisma";

export interface HeatmapTier {
  fingerprint: string;
  hits: number;
  tier: 'COLD' | 'WARM' | 'HOT';
  semanticReuseCount: number;
}

export class CacheHeatmapService {
  private static readonly HOT_THRESHOLD = 20;
  private static readonly WARM_THRESHOLD = 5;

  /**
   * Analyzes recent cache events to categorize chunks into COLD, WARM, or HOT tiers.
   * Tracks semantic reuse (when a chunk serves multiple distinct queries).
   */
  public static async analyzeHeatmap(): Promise<{ 
    tiers: HeatmapTier[], 
    hotFingerprints: string[],
    coldQueries: string[] 
  }> {
    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const recentEvents = await prisma.analyticsEvent.findMany({
      where: {
        eventType: { in: ["MEMORY_CACHE_HIT", "CACHE_MISS"] },
        createdAt: { gte: last7Days }
      },
      select: { eventType: true, eventData: true }
    });

    const frequencyMap = new Map<string, { hits: number, queries: Set<string> }>();
    const missMap = new Map<string, number>();

    for (const event of recentEvents) {
      const data = event.eventData as { fingerprint?: string, query?: string };
      
      if (event.eventType === "MEMORY_CACHE_HIT" && data?.fingerprint) {
        if (!frequencyMap.has(data.fingerprint)) {
          frequencyMap.set(data.fingerprint, { hits: 0, queries: new Set() });
        }
        const stats = frequencyMap.get(data.fingerprint)!;
        stats.hits += 1;
        if (data.query) stats.queries.add(data.query.toLowerCase());
      } else if (event.eventType === "CACHE_MISS" && data?.query) {
        const normalizedQuery = data.query.toLowerCase();
        missMap.set(normalizedQuery, (missMap.get(normalizedQuery) || 0) + 1);
      }
    }

    const tiers: HeatmapTier[] = [];
    const hotFingerprints: string[] = [];

    for (const [fingerprint, stats] of frequencyMap.entries()) {
      let tier: 'COLD' | 'WARM' | 'HOT' = 'COLD';
      if (stats.hits >= this.HOT_THRESHOLD) {
        tier = 'HOT';
        hotFingerprints.push(fingerprint);
      } else if (stats.hits >= this.WARM_THRESHOLD) {
        tier = 'WARM';
      }

      tiers.push({
        fingerprint,
        hits: stats.hits,
        tier,
        semanticReuseCount: stats.queries.size // Number of distinct queries served by this chunk
      });
    }

    // Identify recurring cold queries (failed to hit cache but requested multiple times)
    // This indicates a content gap we need to generate for.
    const coldQueries = Array.from(missMap.entries())
      .filter(([_, misses]) => misses >= 3)
      .map(([query, _]) => query);

    // Sort tiers by highest hit count
    tiers.sort((a, b) => b.hits - a.hits);

    return { tiers, hotFingerprints, coldQueries };
  }
}
