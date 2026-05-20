import { prisma } from "@/server/db/prisma";
import { safeDb } from "@/lib/server/safe-db";

export interface TrendingItem {
  label: string;
  href: string;
  score: number;
}

const FALLBACK_TRENDING: TrendingItem[] = [
  { label: "192.168.1.1", href: "/ips/192-168-1-1", score: 100 },
  { label: "WiFi Connected No Internet", href: "/problems/wifi-connected-no-internet", score: 90 },
  { label: "Router Login", href: "/search?q=router%20login", score: 80 },
  { label: "TP-Link Login", href: "/search?q=TP-Link%20login", score: 70 },
  { label: "Ethernet No Internet", href: "/problems/ethernet-connected-no-internet", score: 60 },
];

export const TrendingService = {
  /**
   * Identifies trending topics/searches from the AnalyticsEvent table.
   * Groups and counts SEARCH and PAGE_VIEW events in memory.
   */
  async getTrendingSearches(limit = 8): Promise<TrendingItem[]> {
    return safeDb(async () => {
      // Fetch recent events to analyze trend dynamically
      const events = await prisma.analyticsEvent.findMany({
        where: {
          eventType: {
            in: ["SEARCH", "PAGE_VIEW"],
          },
        },
        orderBy: { createdAt: "desc" },
        take: 200, // Aggregate recent traffic
      });

      if (events.length === 0) {
        return FALLBACK_TRENDING.slice(0, limit);
      }

      const frequencyMap: Record<string, { label: string; href: string; count: number }> = {};

      for (const event of events) {
        const data = event.eventData as any;
        if (event.eventType === "SEARCH" && data?.query) {
          const queryStr = data.query.trim();
          if (queryStr.length < 2) continue;
          const key = `search:${queryStr.toLowerCase()}`;
          if (!frequencyMap[key]) {
            frequencyMap[key] = {
              label: queryStr,
              href: `/search?q=${encodeURIComponent(queryStr)}`,
              count: 0,
            };
          }
          frequencyMap[key].count += 1;
        } else if (event.eventType === "PAGE_VIEW" && data?.url && data?.title) {
          const key = `page:${data.url}`;
          if (!frequencyMap[key]) {
            frequencyMap[key] = {
              label: data.title,
              href: data.url,
              count: 0,
            };
          }
          frequencyMap[key].count += 1.5; // Slightly weight direct page views higher
        }
      }

      // Convert to list, sort by score desc
      const aggregatedList: TrendingItem[] = Object.values(frequencyMap).map((item) => ({
        label: item.label,
        href: item.href,
        score: Math.round(item.count * 10),
      }));

      aggregatedList.sort((a, b) => b.score - a.score);

      // If we don't have enough dynamic results, pad with fallback items
      if (aggregatedList.length < limit) {
        const existingLabels = new Set(aggregatedList.map((item) => item.label.toLowerCase()));
        for (const fallback of FALLBACK_TRENDING) {
          if (!existingLabels.has(fallback.label.toLowerCase())) {
            aggregatedList.push(fallback);
            if (aggregatedList.length >= limit) break;
          }
        }
      }

      return aggregatedList.slice(0, limit);
    }, FALLBACK_TRENDING.slice(0, limit));
  },
};
