import { prisma } from "../db/prisma";

export class GovernanceMetricsService {
  /**
   * Logs a governance event, such as an AI generation freeze or a hallucination spike.
   * Useful for the Admin Operations Center to visualize over time.
   */
  public static async logEvent(eventType: string, details: any) {
    // We reuse the AnalyticsEvent table for governance telemetry
    await prisma.analyticsEvent.create({
      data: {
        eventType: `GOVERNANCE_${eventType}`,
        eventData: details
      }
    });
  }

  public static async logHallucination(entityType: string, entityId: number, score: number) {
    await this.logEvent("HALLUCINATION_DETECTED", {
      entityType,
      entityId,
      score,
      timestamp: new Date().toISOString()
    });
  }
}
