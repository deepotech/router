import { prisma } from "../db/prisma";

export interface SemanticLinkCandidate {
  targetUrl: string;
  affinityScore: number;
  affinityType: 'IP' | 'FIRMWARE' | 'CHIPSET' | 'SIGNATURE' | 'REUSE_OVERLAP';
  semanticCluster: string;
}

export class SemanticLinkRefinerService {
  private static readonly HARD_CAP = 12;
  private static readonly IDEAL_TARGET = 8;
  private static readonly MAX_SAME_CLUSTER = 3;

  /**
   * Upgrades internal linking quality by replacing naive/random linking
   * with deterministic, intent-aware clustering.
   */
  public static async refineOutboundLinks(
    sourceEntityId: number, 
    sourceEntityType: 'PROBLEM' | 'ROUTER' | 'IP',
    candidates: SemanticLinkCandidate[]
  ): Promise<SemanticLinkCandidate[]> {
    
    // Sort by deterministic affinity rather than generic lexical similarity
    const sortedCandidates = candidates.sort((a, b) => {
      // Priority Order: IP > Firmware > Chipset > Signature > Reuse
      const priorityMap = { 'IP': 5, 'FIRMWARE': 4, 'CHIPSET': 3, 'SIGNATURE': 2, 'REUSE_OVERLAP': 1 };
      
      const priorityDiff = priorityMap[b.affinityType] - priorityMap[a.affinityType];
      if (priorityDiff !== 0) return priorityDiff;

      return b.affinityScore - a.affinityScore;
    });

    const finalLinks: SemanticLinkCandidate[] = [];
    const clusterCounts = new Map<string, number>();

    for (const candidate of sortedCandidates) {
      if (finalLinks.length >= this.IDEAL_TARGET) break;

      // Ensure we don't link too many times to the same semantic cluster
      const clusterCount = clusterCounts.get(candidate.semanticCluster) || 0;
      if (clusterCount >= this.MAX_SAME_CLUSTER) {
        continue; // Skip, max links to this cluster reached
      }

      finalLinks.push(candidate);
      clusterCounts.set(candidate.semanticCluster, clusterCount + 1);
    }

    // Strict enforcement of hard cap
    return finalLinks.slice(0, this.HARD_CAP);
  }

  /**
   * Calculates the semantic link propagation score.
   * Hubs with higher PageRank density should receive more weight.
   */
  public static calculatePropagationWeight(hubAuthorityScore: number, outLinkCount: number): number {
    if (outLinkCount === 0) return 0;
    
    if (outLinkCount > this.HARD_CAP) {
      console.warn(`[SemanticLinkRefiner] Hard cap exceeded (${outLinkCount} links). PageRank diluted.`);
      return (hubAuthorityScore / outLinkCount) * 0.5; // Heavy penalty for overlinking
    }
    
    return hubAuthorityScore / outLinkCount;
  }
}
