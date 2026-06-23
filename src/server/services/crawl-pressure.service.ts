import { prisma } from "../db/prisma";

export interface CrawlPressureStatus {
  publishRateOk: boolean;
  overlapRiskOk: boolean;
  duplicationOk: boolean;
  validationOk: boolean;
  action: 'HALT_PUBLISHING' | 'PROCEED';
}

export class CrawlPressureService {
  // Stage I-A highly conservative limits
  private static readonly MAX_PAGES_PER_HOUR = 5;
  private static readonly MAX_PAGES_PER_DAY = 20;

  /**
   * Acts as the final safety valve before a generated/staged page is allowed to be PUBLISHED.
   * Protects the SEO crawl budget by monitoring sitemap growth velocity and telemetry risks.
   * Note: This halts PUBLISHING, not necessarily generation (Staged vs Published separation).
   */
  public static async evaluatePublishingSafety(): Promise<CrawlPressureStatus> {
    // Fail-open: if DB is unavailable (e.g., connection pool exhausted during next build),
    // return PROCEED so static generation doesn't crash. This mirrors the Redis fail-open
    // pattern used in OperationalModeService.getMode().
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // 1. Check Publishing Velocity (Sitemap injection rate)
      const publishedLastHour = await prisma.problem.count({
        where: { status: 'PUBLISHED', publishedAt: { gte: oneHourAgo } }
      }) + await prisma.routerModel.count({
        where: { status: 'PUBLISHED', publishedAt: { gte: oneHourAgo } }
      });

      const publishedLastDay = await prisma.problem.count({
        where: { status: 'PUBLISHED', publishedAt: { gte: oneDayAgo } }
      }) + await prisma.routerModel.count({
        where: { status: 'PUBLISHED', publishedAt: { gte: oneDayAgo } }
      });

      const publishRateOk = publishedLastHour < this.MAX_PAGES_PER_HOUR && publishedLastDay < this.MAX_PAGES_PER_DAY;

      // 2. Check Telemetry Signals (Priority Order)
      const recentMetrics = await prisma.analyticsEvent.findMany({
        where: { eventType: { in: ['OVERLAP_SPIKE', 'VALIDATION_FAILURE', 'SEMANTIC_DUPLICATION'] }, createdAt: { gte: oneDayAgo } }
      });

      const overlapFailures = recentMetrics.filter(m => m.eventType === 'OVERLAP_SPIKE').length;
      const semanticDuplications = recentMetrics.filter(m => m.eventType === 'SEMANTIC_DUPLICATION').length;
      const validationFailures = recentMetrics.filter(m => m.eventType === 'VALIDATION_FAILURE').length;

      const overlapRiskOk = overlapFailures < 3; // Very low tolerance for overlap risk
      const duplicationOk = semanticDuplications < 2; // Very low tolerance for duplicate canonicals
      const validationOk = validationFailures < 5;

      const isSafe = publishRateOk && overlapRiskOk && validationOk && duplicationOk;

      if (!isSafe) {
        console.warn(`[CrawlPressure] HALTING PUBLICATION: RateOK=${publishRateOk}, OverlapOK=${overlapRiskOk}, DuplicationOK=${duplicationOk}, ValidationOK=${validationOk}`);
      }

      return {
        publishRateOk,
        overlapRiskOk,
        duplicationOk,
        validationOk,
        action: isSafe ? 'PROCEED' : 'HALT_PUBLISHING'
      };
    } catch (err) {
      // Fail-open: treat DB unavailability as non-blocking for publishing decisions.
      // The crawl pressure check is a runtime publishing gate, not a build-time gate.
      console.warn('[CrawlPressure] DB unavailable during evaluatePublishingSafety — failing open (PROCEED):', err instanceof Error ? err.message : err);
      return {
        publishRateOk: true,
        overlapRiskOk: true,
        duplicationOk: true,
        validationOk: true,
        action: 'PROCEED',
      };
    }
  }
}
