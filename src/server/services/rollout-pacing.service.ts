import { CacheHeatmapService } from "./cache-heatmap.service";

export interface PacingRecommendation {
  status: 'THROTTLE' | 'MAINTAIN' | 'ACCELERATE';
  recommendedBatchSize: number;
  reason: string;
}

export class RolloutPacingService {
  /**
   * Dynamically controls publishing velocity based on telemetry signals.
   * If cache hits are dropping or overlaps are high, it throttles generation.
   */
  public static async calculatePacing(): Promise<PacingRecommendation> {
    const { tiers, coldQueries } = await CacheHeatmapService.analyzeHeatmap();

    const totalChunks = tiers.length;
    if (totalChunks === 0) {
      return { status: 'MAINTAIN', recommendedBatchSize: 10, reason: "Insufficient telemetry, using baseline." };
    }

    const hotCount = tiers.filter(t => t.tier === 'HOT').length;
    const hotRatio = hotCount / totalChunks;

    const highReuseCount = tiers.filter(t => t.semanticReuseCount > 2).length;
    const reuseRatio = highReuseCount / totalChunks;

    // High number of recurring cold queries means we are missing content. 
    // We should accelerate IF reuse ratio is stable (meaning our existing content isn't overlapping).
    
    let status: 'THROTTLE' | 'MAINTAIN' | 'ACCELERATE' = 'MAINTAIN';
    let batchSize = 25; // Default Stage 1 batch size
    let reason = "Metrics are stable.";

    if (hotRatio < 0.1 && totalChunks > 50) {
      // If we have many chunks but very few HOT ones, we are polluting the cache with low-value pages.
      status = 'THROTTLE';
      batchSize = 5;
      reason = "Low cache heat density. Throttling to prevent vector pollution.";
    } else if (reuseRatio > 0.3 && coldQueries.length > 5) {
      // We have strong reusable chunks AND identified clear gaps.
      status = 'ACCELERATE';
      batchSize = 50;
      reason = "High semantic reuse and clear content gaps identified. Accelerating generation.";
    }

    return {
      status,
      recommendedBatchSize: batchSize,
      reason
    };
  }
}
