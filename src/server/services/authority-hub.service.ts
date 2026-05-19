import { prisma } from "../db/prisma";

export interface AuthorityHub {
  entityIdentifier: string;
  reuseRate: number;
  recommendedInternalLinks: string[];
}

export class AuthorityHubService {
  /**
   * Identifies the most reused semantic chunks based on RetrievalIntentRelation reuseCount.
   * Used only as Tier 3 emergency fallback when all other search tiers return 0 results.
   *
   * NOTE: If no intent relations exist yet (empty DB), returns an empty array.
   * Tier 3 will then return no results, which is honest behavior.
   */
  public static async identifyHubs(): Promise<AuthorityHub[]> {
    // Query the actual schema fields that exist in RetrievalIntentRelation
    const topRelations = await prisma.retrievalIntentRelation.findMany({
      orderBy: { reuseCount: "desc" },
      take: 5,
      select: {
        resolvedByChunkId: true,
        reuseCount: true,
        sourceIntent: true,
      },
    });

    if (topRelations.length === 0) return [];

    const hubs: AuthorityHub[] = [];

    for (const relation of topRelations) {
      // Look up the actual chunk using chunkId (the correct schema field)
      const chunk = await prisma.semanticChunk.findUnique({
        where: { chunkId: relation.resolvedByChunkId },
        select: { entityType: true, entityId: true },
      });

      let entityIdentifier = "unknown-entity";
      if (chunk) {
        entityIdentifier = `${chunk.entityType.toLowerCase()}-${chunk.entityId}`;
      }

      hubs.push({
        entityIdentifier,
        reuseRate: relation.reuseCount,
        recommendedInternalLinks: [],
      });
    }

    return hubs;
  }
}
