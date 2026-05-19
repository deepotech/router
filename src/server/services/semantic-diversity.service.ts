import { prisma } from "../db/prisma";

export class SemanticDiversityService {
  /**
   * Evaluates a proposed generation batch for semantic diversity.
   * If a batch is heavily skewed (e.g. 50 TP-Link guides, 0 others), it rejects the batch
   * forcing the orchestration layer to re-sample from underserved entities.
   */
  public static validateBatchDiversity(proposedBatch: { entityId: string; brandName?: string; intentCategory: string }[]): boolean {
    const total = proposedBatch.length;
    if (total <= 3) return true; // Too small for statistical diversity enforcement

    const brandCounts = new Map<string, number>();
    const intentCounts = new Map<string, number>();

    for (const item of proposedBatch) {
      if (item.brandName) {
        brandCounts.set(item.brandName, (brandCounts.get(item.brandName) || 0) + 1);
      }
      intentCounts.set(item.intentCategory, (intentCounts.get(item.intentCategory) || 0) + 1);
    }

    // Heuristics for diversity (Stage I parameters)
    const MAX_BRAND_SATURATION = 0.40; // No more than 40% of a batch should be a single brand
    const MAX_INTENT_SATURATION = 0.50; // No more than 50% should be a single intent (e.g., login issues)

    for (const [brand, count] of brandCounts.entries()) {
      if (count / total > MAX_BRAND_SATURATION) {
        console.warn(`[SemanticDiversity] Batch rejected. Brand ${brand} exceeds saturation limit (${(count/total*100).toFixed(0)}%).`);
        return false;
      }
    }

    for (const [intent, count] of intentCounts.entries()) {
      if (count / total > MAX_INTENT_SATURATION) {
        console.warn(`[SemanticDiversity] Batch rejected. Intent ${intent} exceeds saturation limit (${(count/total*100).toFixed(0)}%).`);
        return false;
      }
    }

    return true;
  }
}
