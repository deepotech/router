export class DeploymentSecurityService {
  /**
   * Validates the runtime environment for critical secrets before startup.
   * Throws an error preventing startup if configuration is unsafe.
   */
  static validateEnvironment(): void {
    const requiredSecrets = [
      "DATABASE_URL",
      "OPENAI_API_KEY",
      "REDIS_URL", // Railway injects REDIS_URL
    ];

    const missing = requiredSecrets.filter((secret) => !process.env[secret]);

    if (missing.length > 0) {
      throw new Error(`[SECURITY FATAL] Missing critical secrets for deployment: ${missing.join(", ")}`);
    }

    // Safety check against accidentally exposing production secrets to the browser
    const unsafeNextPublics = Object.keys(process.env).filter(
      (key) => key.startsWith("NEXT_PUBLIC_") && (key.includes("API_KEY") || key.includes("SECRET") || key.includes("DATABASE"))
    );

    if (unsafeNextPublics.length > 0) {
      throw new Error(`[SECURITY FATAL] Leaked secrets in NEXT_PUBLIC_ variables: ${unsafeNextPublics.join(", ")}`);
    }

    console.log("[SECURITY] Environment validation passed.");
  }
}
