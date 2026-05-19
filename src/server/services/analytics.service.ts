import { Prisma } from "@prisma/client";
import { AnalyticsRepository } from "../repositories/analytics.repository";

export class AnalyticsService {
  /**
   * Logs an analytics event to the database.
   * This operates in a "fire-and-forget" manner to not block the main execution thread.
   */
  static async logEvent(eventType: string, eventData: Prisma.InputJsonValue = {}, req?: Request) {
    try {
      // In Next.js App Router, we'd extract IP from req.headers.get("x-forwarded-for")
      // We anonymize the IP hash for GDPR compliance
      const userAgent = req?.headers.get("user-agent") || undefined;
      
      // We don't await this so it doesn't block the request response cycle
      AnalyticsRepository.createEvent(eventType, eventData, userAgent).catch(e => {
        console.error("Failed to log analytics event:", e);
      });
    } catch (e) {
      console.error("Analytics error:", e);
    }
  }
}
