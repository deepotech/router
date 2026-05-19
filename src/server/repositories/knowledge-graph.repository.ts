import { prisma } from "../db/prisma";
import { EntityType } from "@prisma/client";

export class KnowledgeGraphRepository {
  /**
   * Adds or updates a bidirectional relation between two entities
   */
  static async upsertRelation(
    fromType: EntityType,
    fromId: number,
    toType: EntityType,
    toId: number,
    relationType: string,
    score: number = 1.0
  ) {
    // Forward relation
    await prisma.entityRelation.upsert({
      where: {
        unique_relation: {
          fromEntityType: fromType,
          fromEntityId: fromId,
          toEntityType: toType,
          toEntityId: toId,
          relationType,
        },
      },
      update: { score },
      create: {
        fromEntityType: fromType,
        fromEntityId: fromId,
        toEntityType: toType,
        toEntityId: toId,
        relationType,
        score,
      },
    });

    // We can also create a reverse relation if needed, e.g., "IS_SOLVED_BY"
  }

  /**
   * Get direct connections from a specific entity
   */
  static async getConnections(entityType: EntityType, entityId: number, limit: number = 10) {
    return prisma.entityRelation.findMany({
      where: {
        fromEntityType: entityType,
        fromEntityId: entityId,
      },
      orderBy: { score: "desc" },
      take: limit,
    });
  }

  /**
   * Get specific entity references linked to this entity by relationType
   */
  static async getRelatedEntityIds(
    fromType: EntityType,
    fromId: number,
    toType: EntityType,
    relationType: string
  ): Promise<number[]> {
    const relations = await prisma.entityRelation.findMany({
      where: {
        fromEntityType: fromType,
        fromEntityId: fromId,
        toEntityType: toType,
        relationType,
      },
      orderBy: { score: "desc" },
    });
    return relations.map((r) => r.toEntityId);
  }
}
