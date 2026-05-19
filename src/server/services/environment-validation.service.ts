import { OperationalModeService, OperationalMode } from "./operational-mode.service";

export class EnvironmentValidationService {
  /**
   * Validates the presence and structure of critical environment variables.
   * Designed to run on worker boot or Next.js server startup.
   */
  public static validateEnvironment() {
    console.log("🔍 [EnvValidation] Running Production Readiness Checks...");
    const missing: string[] = [];

    const criticalVars = [
      "DATABASE_URL",
      "OPENAI_API_KEY",
      // "REDIS_URL" // Optional locally, but mandatory in Railway production
    ];

    for (const v of criticalVars) {
      if (!process.env[v]) {
        missing.push(v);
      }
    }

    if (missing.length > 0) {
      console.error(`🚨 [EnvValidation] CRITICAL ERROR: Missing environment variables: ${missing.join(", ")}`);
      // In a strict production environment, we would process.exit(1) here to prevent corrupted boot states.
      // For safety during deployment transitions, we force the system into SAFE_MODE instead.
      console.warn("⚠️ [EnvValidation] Forcing SAFE_MODE due to missing environment variables.");
      OperationalModeService.setMode(OperationalMode.SAFE_MODE);
    } else {
      console.log("✅ [EnvValidation] Environment variables validated.");
    }

    // Secondary Check: Verify Database Connection string format
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("postgresql://") && !process.env.DATABASE_URL.startsWith("postgres://")) {
      console.error("🚨 [EnvValidation] DATABASE_URL must be a valid PostgreSQL connection string.");
    }
  }
}
