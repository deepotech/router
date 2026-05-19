import { EntityType } from "@prisma/client";
import { prisma } from "../db/prisma";

export class SemanticCentralityService {
  /**
   * Recalculates the centrality score (authority hub score) for a specific entity.
   * Centrality = (InDegree * 0.4) + (Sum of incoming Semantic Weights * 0.6)
   */
  public static async calculateCentrality(entityType: EntityType, entityId: number) {
    // 1. Calculate incoming edges (in-degree)
    const incomingEdges = await prisma.entityRelation.findMany({
      where: { toEntityType: entityType, toEntityId: entityId }
    });

    const inDegree = incomingEdges.length;
    const totalIncomingWeight = incomingEdges.reduce((sum, edge) => sum + edge.score, 0);

    // 2. Calculate outgoing edges (out-degree)
    const outDegree = await prisma.entityRelation.count({
      where: { fromEntityType: entityType, fromEntityId: entityId }
    });

    // Simple centrality heuristic
    const centralityScore = (inDegree * 0.4) + (totalIncomingWeight * 0.6);

    // 3. Upsert EntityAuthority
    await prisma.entityAuthority.upsert({
      where: { entityType_entityId: { entityType, entityId } },
      update: {
        centralityScore,
        inDegree,
        outDegree,
        lastCalculated: new Date()
      },
      create: {
        entityType,
        entityId,
        centralityScore,
        inDegree,
        outDegree
      }
    });

    return centralityScore;
  }
}
