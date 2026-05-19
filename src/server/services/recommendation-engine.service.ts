import { EntityType } from "@prisma/client";
import { prisma } from "../db/prisma";

export interface RecommendationResult {
  entityType: EntityType;
  entityId: number;
  relationType: string;
  score: number;
}

export class RecommendationEngineService {
  /**
   * Retrieves deterministic recommendations (related links) for an entity.
   * Limits results to prevent graph explosion.
   */
  public static async getRecommendations(
    entityType: EntityType,
    entityId: number,
    limit = 5
  ): Promise<RecommendationResult[]> {
    // We query the EntityRelation table directly. No recursive graph hops.
    const edges = await prisma.entityRelation.findMany({
      where: { fromEntityType: entityType, fromEntityId: entityId },
      orderBy: [
        { score: "desc" },
        { confidenceScore: "desc" }
      ],
      take: limit
    });

    return edges.map(edge => ({
      entityType: edge.toEntityType,
      entityId: edge.toEntityId,
      relationType: edge.relationType,
      score: edge.score
    }));
  }

  /**
   * Gets reciprocal recommendations (who links TO me?)
   */
  public static async getIncomingRecommendations(
    entityType: EntityType,
    entityId: number,
    limit = 5
  ): Promise<RecommendationResult[]> {
    const edges = await prisma.entityRelation.findMany({
      where: { toEntityType: entityType, toEntityId: entityId },
      orderBy: { score: "desc" },
      take: limit
    });

    return edges.map(edge => ({
      entityType: edge.fromEntityType,
      entityId: edge.fromEntityId,
      relationType: edge.relationType,
      score: edge.score
    }));
  }
}
