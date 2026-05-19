import { EntityType } from "@prisma/client";
import { prisma } from "../db/prisma";
import { RelationshipScoringService } from "./relationship-scoring.service";

export class SemanticGraphService {
  /**
   * Deterministically create a semantic edge between two entities.
   * If the edge already exists, it updates the scores.
   */
  public static async createEdge(
    fromType: EntityType,
    fromId: number,
    toType: EntityType,
    toId: number,
    relationType: string,
    sharedAttributesCount = 0
  ) {
    // Prevent self-loops
    if (fromType === toType && fromId === toId) return null;

    // Fetch authorities to calculate semantic weight
    const [fromAuth, toAuth] = await Promise.all([
      prisma.entityAuthority.findUnique({ where: { entityType_entityId: { entityType: fromType, entityId: fromId } } }),
      prisma.entityAuthority.findUnique({ where: { entityType_entityId: { entityType: toType, entityId: toId } } })
    ]);

    const sourceAuthority = fromAuth?.centralityScore || 0.1;
    const targetAuthority = toAuth?.centralityScore || 0.1;

    const confidenceScore = RelationshipScoringService.calculateConfidence(relationType, sharedAttributesCount);
    const semanticWeight = RelationshipScoringService.calculateSemanticWeight(relationType, sourceAuthority, targetAuthority);

    // Enforce caps: Do not create the edge if the source already has > 50 outgoing edges of this type
    const edgeCount = await prisma.entityRelation.count({
      where: { fromEntityType: fromType, fromEntityId: fromId, relationType }
    });

    if (edgeCount >= 50) {
      console.warn(`[SemanticGraph] Edge cap reached for ${fromType}:${fromId} [${relationType}]`);
      return null;
    }

    const edge = await prisma.entityRelation.upsert({
      where: {
        unique_relation: {
          fromEntityType: fromType,
          fromEntityId: fromId,
          toEntityType: toType,
          toEntityId: toId,
          relationType
        }
      },
      update: {
        score: semanticWeight,
        confidenceScore
      },
      create: {
        fromEntityType: fromType,
        fromEntityId: fromId,
        toEntityType: toType,
        toEntityId: toId,
        relationType,
        score: semanticWeight,
        confidenceScore
      }
    });

    return edge;
  }
}
