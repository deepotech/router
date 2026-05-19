import { StorageTier } from "@prisma/client";

export class VectorStorageStrategy {
  /**
   * Determine whether an embedding should reside in HOT or COLD storage.
   * HOT vectors are kept in active memory/indices for fast retrieval.
   * COLD vectors are archived to reduce pgvector memory bloat.
   */
  public static determineStorageTier(
    retrievalFrequency: number,
    authorityScore: number,
    daysSinceLastUpdate: number
  ): StorageTier {
    // High authority or highly searched items always stay hot
    if (authorityScore > 0.8 || retrievalFrequency > 100) {
      return StorageTier.HOT;
    }

    // Stale content with low retrieval falls to cold storage
    if (daysSinceLastUpdate > 90 && retrievalFrequency < 10) {
      return StorageTier.COLD;
    }

    // Default to HOT for new or average content
    return StorageTier.HOT;
  }

  /**
   * Calculates how fresh the vector is (0.0 to 1.0).
   * Used by the orchestrator to deprioritize stale semantic matches.
   */
  public static calculateFreshnessScore(daysSinceLastUpdate: number): number {
    const halfLifeDays = 180; // After 6 months, freshness is 0.5
    return Math.exp((-Math.LN2 / halfLifeDays) * daysSinceLastUpdate);
  }

  /**
   * Determines if a vector is so stale/useless it should be pruned completely 
   * to save database storage costs.
   */
  public static shouldPruneVector(
    tier: StorageTier,
    daysSinceLastRetrieval: number,
    authorityScore: number
  ): boolean {
    if (tier === StorageTier.HOT) return false;
    
    // Prune cold vectors that haven't been searched in a year and have low authority
    if (daysSinceLastRetrieval > 365 && authorityScore < 0.3) {
      return true;
    }

    return false;
  }
}
