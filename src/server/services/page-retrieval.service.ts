import { SearchOrchestratorService } from "./search-orchestrator.service";
import { RecommendationEngineService } from "./recommendation-engine.service";
import { EntityType } from "@prisma/client";

export interface PageRetrievalPayload {
  mainContent: any[];
  relatedEntities: any[];
  metrics: {
    latencyMs: number;
    tierUsed: number;
  };
}

export class PageRetrievalService {
  /**
   * Universal fetcher for App Router pages.
   * Runs semantic search + related entity recommendations in parallel.
   *
   * EdgeObservabilityService removed — it was writing to AnalyticsEvent on every
   * page render, adding a DB write to every SSR request. Performance-negative.
   */
  public static async getPageData(
    _routePath: string,
    query: string,
    entityType: EntityType,
    entityId: number
  ): Promise<PageRetrievalPayload> {
    const startTime = Date.now();

    const [searchResults, relatedEntities] = await Promise.all([
      SearchOrchestratorService.search(query, 10),
      RecommendationEngineService.getRecommendations(entityType, entityId, 5),
    ]);

    return {
      mainContent: searchResults,
      relatedEntities,
      metrics: {
        latencyMs: Date.now() - startTime,
        tierUsed: searchResults.length > 0 ? searchResults[0].tierUsed : 1,
      },
    };
  }
}
