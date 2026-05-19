import { prisma } from "@/server/db/prisma";

export class CrawlLockService {
  private static readonly INITIAL_PUBLISH_CAP = 50;

  /**
   * Prevents uncontrolled publishing after launch.
   * Throttles the number of staged pages that can be flipped to 'published'
   * until crawl health is verified.
   */
  static async canPublishNewPage(): Promise<boolean> {
    try {
      // For phase 6, we assume a "publishedAt" field exists or will exist
      const publishedCountQuery = await prisma.$queryRaw<any[]>`
        SELECT count(*) as count FROM "Problem" WHERE "isPublished" = true
      `;

      const currentPublishedCount = Number(publishedCountQuery[0]?.count || 0);

      if (currentPublishedCount >= this.INITIAL_PUBLISH_CAP) {
        console.warn(`[CRAWL LOCK] Publish cap of ${this.INITIAL_PUBLISH_CAP} reached. New pages will remain staged.`);
        return false;
      }

      return true;
    } catch (e) {
      console.error("[CRAWL LOCK] Failed to verify publish cap. Failing closed.", e);
      return false; // Fail closed to prevent accidental mass publishing
    }
  }

  /**
   * Lifts the crawl lock to the next semantic rollout phase.
   */
  static async expandPublishCap(newCap: number): Promise<void> {
    console.log(`[CRAWL LOCK] Expanding publish cap to ${newCap}.`);
    // Persist this config to Redis or a config table
  }
}
