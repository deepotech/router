// @ts-nocheck
import { prisma } from "../db/prisma";

export type DecayStage = 'ACTIVE' | 'DEGRADED' | 'ARCHIVED';

export class AuthorityDecayService {
  private static readonly DEGRADE_THRESHOLD_DAYS = 30;
  private static readonly ARCHIVE_THRESHOLD_DAYS = 90;

  /**
   * Processes the decay lifecycle for semantic chunks based on retrieval telemetry.
   * Avoids endless regeneration loops by utilizing a hybrid demotion model.
   */
  public static async processDecayLifecycle(): Promise<void> {
    const now = new Date();
    
    // Find relations that haven't been resolved recently
    const staleRelations = await prisma.retrievalIntentRelation.findMany({
      where: {
        lastResolvedAt: { lte: new Date(now.getTime() - this.DEGRADE_THRESHOLD_DAYS * 24 * 60 * 60 * 1000) }
      }
    });

    const chunkUpdates = new Map<string, DecayStage>();

    for (const rel of staleRelations) {
      if (!rel.lastResolvedAt) continue;

      const daysStale = (now.getTime() - rel.lastResolvedAt.getTime()) / (1000 * 3600 * 24);
      
      if (daysStale >= this.ARCHIVE_THRESHOLD_DAYS) {
        chunkUpdates.set(rel.resolvedByChunkId, 'ARCHIVED');
      } else if (daysStale >= this.DEGRADE_THRESHOLD_DAYS) {
        if (chunkUpdates.get(rel.resolvedByChunkId) !== 'ARCHIVED') {
          chunkUpdates.set(rel.resolvedByChunkId, 'DEGRADED');
        }
      }
    }

    for (const [chunkId, stage] of chunkUpdates.entries()) {
      await this.applyDecayStage(chunkId, stage);
    }
  }

  private static async applyDecayStage(chunkId: string, stage: DecayStage): Promise<void> {
    console.log(`[AuthorityDecay] Chunk ${chunkId} transitioned to ${stage}`);
    
    if (stage === 'DEGRADED') {
      // Reduce priority score, lowering link propagation weight.
      // Removed from "recommended authority targets".
      await prisma.semanticChunk.update({
        where: { chunkId },
        data: { priorityScore: 0.5 }
      });
    } else if (stage === 'ARCHIVED') {
      // Excluded from canonical promotion, retained for historical memory.
      // Eligible for regeneration ONLY if QueryIntelligence detects renewed demand.
      await prisma.semanticChunk.update({
        where: { chunkId },
        data: { priorityScore: 0.1 }
      });
    }
  }
}
