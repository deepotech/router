import { EntityType } from "@prisma/client";

export class RelationshipScoringService {
  /**
   * Deterministically calculates the confidence of a relationship.
   * Confidence means "how sure are we this relationship is factually correct?"
   */
  public static calculateConfidence(
    relationType: string,
    sharedAttributesCount: number
  ): number {
    let baseConfidence = 0.5;

    switch (relationType) {
      case "SHARES_IP":
        baseConfidence = 1.0; // Factual, mathematically certain
        break;
      case "FIRMWARE_MATCH":
        baseConfidence = 0.95; // Factual, highly certain
        break;
      case "RELATED_PROBLEM":
        baseConfidence = 0.7; // Needs symptom overlap to increase
        break;
      case "RECOMMENDED_WITH":
        baseConfidence = 0.6; // Soft recommendation
        break;
    }

    // Boost confidence if they share multiple attributes
    const boost = Math.min(sharedAttributesCount * 0.1, 0.3);
    return Math.min(baseConfidence + boost, 1.0);
  }

  /**
   * Deterministically calculates the semantic weight of a relationship.
   * Semantic Weight means "how important is this edge for reranking and internal linking?"
   */
  public static calculateSemanticWeight(
    relationType: string,
    sourceAuthority: number,
    targetAuthority: number
  ): number {
    let baseWeight = 1.0;

    switch (relationType) {
      case "CAUSED_BY":
      case "SOLVES":
        baseWeight = 2.5; // Very strong semantic signal for troubleshooting
        break;
      case "RELATED_PROBLEM":
        baseWeight = 1.5;
        break;
      case "SHARES_IP":
        baseWeight = 0.8; // High confidence, but lower semantic linking weight
        break;
    }

    // Edges between high-authority nodes are heavier
    const authorityMultiplier = 1 + ((sourceAuthority + targetAuthority) / 2);
    
    return baseWeight * authorityMultiplier;
  }
}
