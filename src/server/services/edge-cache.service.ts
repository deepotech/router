import { unstable_cache } from "next/cache";
import { PageRetrievalService, PageRetrievalPayload } from "./page-retrieval.service";
import { EntityType } from "@prisma/client";

export class EdgeCacheService {
  /**
   * Wraps the PageRetrievalService inside Next.js unstable_cache.
   * This ensures the database and AI cascades are only hit once per ISR cycle.
   */
  public static async getCachedPageData(
    routePath: string,
    query: string,
    entityType: EntityType,
    entityId: number,
    decayScore: number = 1.0
  ): Promise<PageRetrievalPayload> {
    
    // Dynamic TTL based on decay score (stale content is cached longer)
    const revalidateTime = decayScore < 0.5 ? 86400 : 3600; // 24h vs 1h

    const fetcher = async () => {
      return await PageRetrievalService.getPageData(routePath, query, entityType, entityId);
    };

    const cachedFetch = unstable_cache(
      fetcher,
      [`semantic-page-${entityType.toLowerCase()}-${entityId}`],
      {
        revalidate: revalidateTime,
        tags: [`entity-${entityId}`, `${entityType.toLowerCase()}s`]
      }
    );

    return cachedFetch();
  }
}
