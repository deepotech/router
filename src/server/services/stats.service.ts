import { prisma } from "@/server/db/prisma";
import { safeDb } from "@/lib/server/safe-db";

export interface HomepageStats {
  routerModels: number;
  ipAddresses: number;
  troubleshootingGuides: number;
}

const FALLBACK: HomepageStats = {
  routerModels: 0,
  ipAddresses: 0,
  troubleshootingGuides: 0,
};

/**
 * StatsService — single source of truth for dynamic homepage counters.
 *
 * All counts are filtered to PUBLISHED / isPublished=true records only,
 * so numbers update automatically as new AI-generated content is published.
 *
 * Wrapped in safeDb so that missing DATABASE_URL during Railway build
 * never crashes the app — it returns 0 fallbacks instead.
 */
export const StatsService = {
  async getHomepageStats(): Promise<HomepageStats> {
    return safeDb(async () => {
      const [routerModels, ipAddresses, troubleshootingGuides] =
        await Promise.all([
          // Published router models
          prisma.routerModel.count({
            where: { isPublished: true },
          }),
          // Published IP address articles
          prisma.ipAddress.count({
            where: { isPublished: true },
          }),
          // Published troubleshooting / problem guides
          prisma.problem.count({
            where: { isPublished: true },
          }),
        ]);

      return { routerModels, ipAddresses, troubleshootingGuides };
    }, FALLBACK);
  },
};
