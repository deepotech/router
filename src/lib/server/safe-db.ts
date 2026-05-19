import { hasDatabase } from "./env-safe";

/**
 * Executes a database operation safely.
 * If the database URL is missing (e.g., during Railway build phase) or the operation fails,
 * it catches the error and returns the provided fallback value, preventing build crashes.
 */
export async function safeDb<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase) {
    return fallback;
  }
  try {
    return await operation();
  } catch (error) {
    console.warn("[Safe DB] Operation failed or unavailable:", error instanceof Error ? error.message : String(error));
    return fallback;
  }
}
