export class RailwayValidationService {
  /**
   * Validates infrastructure configurations specific to Railway deployment environments.
   */
  static validateInfrastructure(): void {
    // Determine if we are running in the Railway environment
    const isRailway = process.env.RAILWAY_ENVIRONMENT_NAME !== undefined;

    if (!isRailway) {
      console.log("[RAILWAY] Skipping Railway-specific infrastructure validation (Local Environment).");
      return;
    }

    // 1. Worker Memory Safeguards
    const memoryLimit = process.env.RAILWAY_MEMORY_LIMIT_MB;
    if (memoryLimit && parseInt(memoryLimit, 10) < 512) {
      console.warn("[RAILWAY WARNING] Worker memory is under 512MB. OOM crashes may occur during intensive embedding jobs.");
    }

    // 2. Concurrency checks
    const aiConcurrency = process.env.QUEUE_CONCURRENCY || "1";
    if (parseInt(aiConcurrency, 10) > 5) {
      console.warn("[RAILWAY WARNING] High AI queue concurrency detected. Monitor rate limits closely.");
    }

    console.log("[RAILWAY] Infrastructure validation completed safely.");
  }
}
