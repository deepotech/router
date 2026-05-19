import { getRedisClient } from "../jobs/redis";

/**
 * Operational Mode Service — distributed kill switch backed by Redis.
 *
 * Previously: a static class variable (in-process singleton).
 * In a multi-instance deployment (Railway, Vercel), each container had its own
 * independent mode state. Setting EMERGENCY on one instance did nothing to others.
 *
 * Now: reads/writes to Redis so every instance shares the same operational mode.
 * Falls back to NORMAL if Redis is unavailable (fail-open, not fail-closed — intentional
 * to avoid accidentally taking down the site due to a Redis blip).
 */

const REDIS_KEY = "sys:operational_mode";

export enum OperationalMode {
  NORMAL = "NORMAL",
  SAFE_MODE = "SAFE_MODE",
  AI_DISABLED = "AI_DISABLED",
  SEO_FREEZE = "SEO_FREEZE",
  READ_ONLY = "READ_ONLY",
  EMERGENCY = "EMERGENCY",
}

export class OperationalModeService {
  public static async getMode(): Promise<OperationalMode> {
    try {
      const stored = await getRedisClient().get(REDIS_KEY);
      if (stored && Object.values(OperationalMode).includes(stored as OperationalMode)) {
        return stored as OperationalMode;
      }
    } catch (err) {
      console.error("[OperationalMode] Redis read failed, defaulting to NORMAL:", err);
    }
    return OperationalMode.NORMAL;
  }

  public static async setMode(mode: OperationalMode): Promise<void> {
    console.warn(`[OperationalMode] Switching to: ${mode}`);
    try {
      // No TTL — mode persists until explicitly changed
      await getRedisClient().set(REDIS_KEY, mode);
    } catch (err) {
      console.error("[OperationalMode] Redis write failed:", err);
      throw err; // Fail loudly on writes — operator needs to know the kill switch didn't fire
    }
  }

  public static async isAiEnabled(): Promise<boolean> {
    const mode = await this.getMode();
    return mode === OperationalMode.NORMAL || mode === OperationalMode.SEO_FREEZE;
  }

  public static async isPublishingEnabled(): Promise<boolean> {
    const mode = await this.getMode();
    return mode === OperationalMode.NORMAL || mode === OperationalMode.SAFE_MODE;
  }
}
