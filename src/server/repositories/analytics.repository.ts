import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

export class AnalyticsRepository {
  static async createEvent(eventType: string, eventData: Prisma.InputJsonValue, userAgent?: string, ipHash?: string) {
    return prisma.analyticsEvent.create({
      data: {
        eventType,
        eventData,
        userAgent,
        ipHash,
      },
    });
  }

  static async getTopSearches(limit = 10) {
    // In a real scenario, this would use a raw query with GROUP BY
    // For now, we'll fetch recent failed searches
    return prisma.analyticsEvent.findMany({
      where: { eventType: "SEARCH_NO_RESULTS" },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
