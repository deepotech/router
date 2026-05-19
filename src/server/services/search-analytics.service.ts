import { prisma } from "../db/prisma";

export interface SearchLogData {
  query: string;
  latencyMs: number;
  tierUsed: number;
  resultsReturned: number;
  classification: "exact" | "typo" | "semantic" | "garbage";
}

export class SearchAnalyticsService {
  /**
   * Asynchronously logs real search analytics without blocking the request.
   */
  public static logSearch(data: SearchLogData) {
    prisma.analyticsEvent.create({
      data: {
        eventType: "SEARCH_QUERY",
        eventData: data as any,
      }
    }).catch(err => console.error("Failed to log search analytics:", err));
  }
}
