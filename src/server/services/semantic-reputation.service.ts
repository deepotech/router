import { prisma } from "@/server/db/prisma";

export class SemanticReputationService {
  /**
   * Calculates and updates the semantic authority score of an entity.
   * This score determines retrieval weighting and internal linking priority.
   */
  static async updateEntityAuthority(
    entityId: string,
    entityType: "problem" | "router" | "brand"
  ): Promise<number> {
    try {
      // 1. Fetch entity metrics
      // In a real implementation, we'd have columns for internalLinkCount, engagementQuality, etc.
      let baseQuery;
      if (entityType === "problem") {
        baseQuery = await prisma.$queryRaw<any[]>`
          SELECT "successRate", "successCount" 
          FROM "Problem" WHERE id = ${entityId}
        `;
      }

      if (!baseQuery || baseQuery.length === 0) return 0.5;

      const metrics = baseQuery[0];
      const successRate = metrics.successRate || 0.5;
      const successCount = metrics.successCount || 0;

      // 2. Calculate authority
      // More successful resolutions = higher authority.
      // We use a logarithmic scale for count to prevent massive outliers dominating.
      const countWeight = Math.min(Math.log10(successCount + 1) / 3, 1); // Caps at ~1000 successes
      const semanticAuthorityScore = (successRate * 0.7) + (countWeight * 0.3);

      // 3. Persist back to the database (Assuming phase 5 schema has semanticAuthority field)
      // await prisma.$executeRaw`
      //   UPDATE "${entityType}" SET "semanticAuthority" = ${semanticAuthorityScore} WHERE id = ${entityId}
      // `;

      return semanticAuthorityScore;
    } catch (e) {
      console.error("Failed to update entity authority:", e);
      return 0.5;
    }
  }
}
