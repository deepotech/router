import { prisma } from "@/server/db/prisma";

export interface MemoryRecallResult {
  hasMemory: boolean;
  historicalFix?: string;
  successRate?: number;
  memoryConfidence?: number;
}

export class AIMemoryService {
  /**
   * Recalls previous successful troubleshooting paths to prevent blind
   * regeneration of known solutions.
   */
  static async recallSuccessfulFix(
    symptomHash: string,
    modelId?: string
  ): Promise<MemoryRecallResult> {
    // Note: 'TroubleshootingMemory' is a proposed schema table
    // for Phase 5 to store historical diagnostic successes.
    try {
      const memory = await prisma.$queryRaw<any[]>`
        SELECT fix_content, success_rate, sample_size
        FROM "TroubleshootingMemory"
        WHERE symptom_hash = ${symptomHash}
          ${modelId ? `AND model_id = ${modelId}` : ''}
        ORDER BY success_rate DESC
        LIMIT 1
      `;

      if (memory && memory.length > 0) {
        const topMemory = memory[0];
        // Only return if we have a statistically significant success rate
        if (topMemory.sample_size > 5 && topMemory.success_rate > 0.8) {
          return {
            hasMemory: true,
            historicalFix: topMemory.fix_content,
            successRate: topMemory.success_rate,
            memoryConfidence: (topMemory.success_rate * topMemory.sample_size) / (topMemory.sample_size + 10), // Basic Wilson-like confidence
          };
        }
      }
    } catch (e) {
      console.warn("AI Memory recall failed or table not yet initialized:", e);
    }

    return { hasMemory: false };
  }

  /**
   * Stores a newly successful troubleshooting path into the AI memory.
   */
  static async memorizeFix(
    symptomHash: string,
    fixContent: string,
    modelId?: string
  ): Promise<void> {
    try {
      await prisma.$executeRaw`
        INSERT INTO "TroubleshootingMemory" (symptom_hash, fix_content, model_id, success_rate, sample_size)
        VALUES (${symptomHash}, ${fixContent}, ${modelId}, 1.0, 1)
        ON CONFLICT (symptom_hash, model_id) 
        DO UPDATE SET 
          sample_size = "TroubleshootingMemory".sample_size + 1
      `;
    } catch (e) {
      console.error("Failed to memorize fix:", e);
    }
  }
}
