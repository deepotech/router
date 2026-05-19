import { prisma } from "../db/prisma";

export class RetrievalMetricsService {
  /**
   * Logs retrieval metrics asynchronously to avoid blocking the user search request.
   */
  public static logMetric(data: {
    query: string;
    latencyMs: number;
    fallbackTriggered: boolean;
    reranked: boolean;
    tierUsed: number;
    resultsReturned: number;
  }) {
    // Fire and forget
    prisma.retrievalMetric.create({
      data: {
        query: data.query,
        latencyMs: data.latencyMs,
        fallbackTriggered: data.fallbackTriggered,
        reranked: data.reranked,
        tierUsed: data.tierUsed,
        resultsReturned: data.resultsReturned
      }
    }).catch(err => console.error("Failed to log retrieval metric:", err));
  }
}
