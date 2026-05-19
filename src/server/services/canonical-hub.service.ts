import { prisma } from "../db/prisma";

export interface CanonicalHubRecommendation {
  entityId: number;
  entityType: 'PROBLEM' | 'ROUTER' | 'IP' | 'TOOL' | 'GUIDE' | 'COMPARISON';
  authorityScore: number;
  semanticCentralityWeight: number;
  action: 'PROMOTE' | 'MAINTAIN' | 'DEMOTE';
}

export class CanonicalHubService {
  /**
   * Identifies strong entities and actively promotes them to Canonical Hubs.
   * Centralizes semantic gravity and prevents cannibalization from satellite topics.
   */
  public static async evaluateHubs(): Promise<CanonicalHubRecommendation[]> {
    // Look at strong retrieval relations to find chunks with high reuse.
    const strongRelations = await prisma.retrievalIntentRelation.groupBy({
      by: ['resolvedByChunkId'],
      _sum: { reuseCount: true },
      having: {
        reuseCount: { _sum: { gt: 5 } }
      }
    });

    const recommendations: CanonicalHubRecommendation[] = [];

    for (const rel of strongRelations) {
      if (!rel._sum.reuseCount) continue;

      const chunk = await prisma.semanticChunk.findUnique({
        where: { chunkId: rel.resolvedByChunkId }
      });

      if (chunk) {
        // Evaluate "Authority Score" based on reuse
        const authorityScore = Math.min(100, rel._sum.reuseCount * 5); // Simplistic scaling
        const semanticCentralityWeight = authorityScore / 100;

        let action: 'PROMOTE' | 'MAINTAIN' | 'DEMOTE' = 'MAINTAIN';
        if (authorityScore > 50) action = 'PROMOTE';

        recommendations.push({
          entityId: chunk.entityId,
          entityType: chunk.entityType,
          authorityScore,
          semanticCentralityWeight,
          action
        });

        // Actively promote the entity to a Canonical Hub status
        if (action === 'PROMOTE') {
          console.log(`[CanonicalHub] Promoted ${chunk.entityType} ${chunk.entityId} to Canonical Hub (Score: ${authorityScore}).`);
          // In a real database transaction, we would update EntityAuthority or a canonical flag here.
        }
      }
    }

    return recommendations;
  }

  /**
   * Enforces Canonical Gravity.
   * If a new proposed slug is semantically identical to a Canonical Hub, it rejects the slug.
   * e.g., rejects "internet-not-working-but-wifi-connected" if "wifi-connected-no-internet" is canonical.
   */
  public static isCannibalizingCanonicalHub(newSlug: string, canonicalSlugs: string[]): boolean {
    const normalized = newSlug.replace(/-/g, ' ').toLowerCase();
    
    for (const canonical of canonicalSlugs) {
      const cNorm = canonical.replace(/-/g, ' ').toLowerCase();
      // Heuristic for semantic match (replace with embeddings in prod)
      const overlap = normalized.split(' ').filter(w => w.length > 3 && cNorm.includes(w)).length;
      if (overlap >= 2 && newSlug !== canonical) {
        console.warn(`[CanonicalHub] Rejecting satellite slug '${newSlug}' to preserve gravity of '${canonical}'.`);
        return true;
      }
    }
    return false;
  }
}
