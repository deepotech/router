import { prisma } from "../db/prisma";
import { unstable_cache } from "next/cache";

export class HomepageStatsService {
  /**
   * Fetches real counts from the database to replace fake marketing claims.
   * Cached for 5 minutes using Next.js unstable_cache.
   */
  public static getRealCounts = unstable_cache(
    async () => {
      try {
        const [routers, problems, ips] = await Promise.all([
          prisma.routerModel.count(),
          prisma.problem.count({ where: { status: "PUBLISHED" } }),
          prisma.ipAddress.count()
        ]);

        return {
          routers,
          problems,
          ips
        };
      } catch (e) {
        console.error("[HomepageStats] Error fetching real counts:", e);
        return { routers: 0, problems: 0, ips: 0 };
      }
    },
    ['homepage-stats'],
    { revalidate: 300 } // 5 minutes
  );
}
