import { prisma } from "@/server/db/prisma";

export class ResolutionFeedbackService {
  /**
   * Captures user feedback on whether a troubleshooting path resolved their issue.
   * This forms the closed-loop learning system.
   */
  static async captureFeedback(
    problemId: string,
    wasResolved: boolean,
    userId?: string
  ): Promise<void> {
    try {
      // 1. Update the overall success rate for the specific problem entity
      const incrementField = wasResolved ? "successCount" : "failureCount";
      
      // We will assume Problem model will have successCount and failureCount in Phase 5
      await prisma.$executeRaw`
        UPDATE "Problem"
        SET 
          "${incrementField}" = COALESCE("${incrementField}", 0) + 1,
          "successRate" = CAST(COALESCE("successCount", 0) + ${wasResolved ? 1 : 0} AS FLOAT) / 
                          NULLIF(COALESCE("successCount", 0) + COALESCE("failureCount", 0) + 1, 0)
        WHERE id = ${problemId}
      `;

      // 2. Log the individual feedback event for future adaptive analysis
      await prisma.$executeRaw`
        INSERT INTO "TroubleshootingFeedbackEvent" (problem_id, was_resolved, user_id, created_at)
        VALUES (${problemId}, ${wasResolved}, ${userId || null}, NOW())
      `;

    } catch (e) {
      console.error("Failed to capture resolution feedback:", e);
    }
  }

  /**
   * Analyzes feedback trends to flag troubleshooting paths that have a plummeting success rate,
   * triggering a regeneration or human review.
   */
  static async flagDegradedTroubleshooting(): Promise<string[]> {
    try {
      const degradedProblems = await prisma.$queryRaw<any[]>`
        SELECT id 
        FROM "Problem"
        WHERE "successRate" < 0.4 AND ("successCount" + "failureCount") > 20
      `;
      return degradedProblems.map((p) => p.id);
    } catch (e) {
      console.error("Failed to flag degraded troubleshooting:", e);
      return [];
    }
  }
}
