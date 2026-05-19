import { prisma } from "@/server/db/prisma";

export class SemanticDriftService {
  /**
   * Detects gradual degradation of semantic consistency over time.
   * Compares recent embeddings with the historical baseline of an entity.
   */
  static async detectDrift(entityId: string, currentEmbedding: number[]): Promise<boolean> {
    try {
      // Find the baseline embedding for this entity from 6+ months ago
      const baseline = await prisma.$queryRaw<any[]>`
        SELECT embedding::vector, "createdAt"
        FROM "SemanticChunks"
        WHERE "entityId" = ${entityId}
        ORDER BY "createdAt" ASC
        LIMIT 1
      `;

      if (baseline && baseline.length > 0) {
        // Pseudo-query to calculate distance between current embedding and baseline
        const driftQuery = await prisma.$queryRaw<any[]>`
          SELECT ( ${currentEmbedding}::vector <=> ${baseline[0].embedding}::vector ) AS distance
        `;
        
        const distance = driftQuery[0]?.distance || 0;
        
        // If distance is too high, the topic has drifted significantly
        const DRIFT_THRESHOLD = 0.4;
        if (distance > DRIFT_THRESHOLD) {
          console.warn(`Semantic drift detected for entity ${entityId}. Distance: ${distance}`);
          return true; // Remediation required
        }
      }
      return false;
    } catch (e) {
      console.error("Failed to detect semantic drift:", e);
      return false;
    }
  }
}
