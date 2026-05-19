/**
 * Runtime Environment Validator
 * Validates critical env vars at startup.
 * Fails fast in production if required vars are missing.
 * Secrets are never logged — only key names are reported.
 */

const REQUIRED_VARS = ["DATABASE_URL"] as const;
const OPTIONAL_VARS = ["OPENAI_API_KEY", "REDIS_URL", "NEXT_PUBLIC_APP_URL"] as const;

export function validateEnv(): void {
  // Only run validation in server context
  if (typeof window !== "undefined") return;

  const missing: string[] = [];

  for (const key of REQUIRED_VARS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    const msg = `[RouterVia] FATAL: Missing required environment variables: ${missing.join(", ")}`;
    console.error(msg);
    if (process.env.NODE_ENV === "production") {
      throw new Error(msg);
    }
  }

  // Warn about optional but recommended vars
  for (const key of OPTIONAL_VARS) {
    if (!process.env[key]) {
      console.warn(`[RouterVia] WARNING: Optional env var not set: ${key}`);
    }
  }

  // Detect localhost leaks in production
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_APP_URL?.includes("localhost")
  ) {
    console.error(
      "[RouterVia] FATAL: NEXT_PUBLIC_APP_URL contains 'localhost' in production!"
    );
    throw new Error("NEXT_PUBLIC_APP_URL must not be localhost in production.");
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[RouterVia] Environment validated (dev mode).");
  } else {
    console.log("[RouterVia] Environment validated. Production mode active.");
  }
}
