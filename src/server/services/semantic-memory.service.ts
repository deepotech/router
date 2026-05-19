import crypto from "crypto";
import { getRedisClient } from "../jobs/redis";

/**
 * Semantic Memory Cache backed by Redis.
 *
 * Previously: an in-process Map that was destroyed on every serverless cold start
 * (i.e., permanently empty in production).
 *
 * Now: Redis-backed, distributed across all instances, with real TTL.
 * Uses the same redisConnection as BullMQ to avoid extra connections.
 */

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days — same as the old in-memory TTL
const KEY_PREFIX = "smem:";

export interface CachedMemory {
  fingerprint: string;
  content: string;
  trustScore: number;
  entityType: string;
  createdAt: number;
}

export class SemanticMemoryService {
  /**
   * Generates a deterministic SHA-256 fingerprint from the input string.
   */
  public static generateFingerprint(inputString: string): string {
    return crypto
      .createHash("sha256")
      .update(inputString.trim().toLowerCase())
      .digest("hex");
  }

  /**
   * Stores a high-trust AI response in Redis.
   * Low-trust content (< 0.8) is refused to prevent caching bad answers.
   */
  public static async storeMemory(
    inputString: string,
    content: string,
    trustScore: number,
    entityType: string
  ): Promise<void> {
    if (trustScore < 0.8) {
      console.warn(`[SemanticMemory] Refusing to cache low-trust content (score: ${trustScore})`);
      return;
    }

    const fingerprint = this.generateFingerprint(inputString);
    const payload: CachedMemory = {
      fingerprint,
      content,
      trustScore,
      entityType,
      createdAt: Date.now(),
    };

    await getRedisClient().set(
      `${KEY_PREFIX}${fingerprint}`,
      JSON.stringify(payload),
      "EX",
      CACHE_TTL_SECONDS
    );
  }

  /**
   * Retrieves a cached memory entry from Redis.
   * Returns null if not found or expired (Redis handles TTL natively).
   */
  public static async retrieveMemory(inputString: string): Promise<CachedMemory | null> {
    try {
      const fingerprint = this.generateFingerprint(inputString);
      const raw = await getRedisClient().get(`${KEY_PREFIX}${fingerprint}`);
      if (!raw) return null;
      return JSON.parse(raw) as CachedMemory;
    } catch (err) {
      // If Redis is unavailable, degrade gracefully — do not crash search
      console.error("[SemanticMemory] Redis read failed, skipping cache:", err);
      return null;
    }
  }

  /**
   * Removes a specific entry from the cache (e.g., if flagged as hallucinated).
   */
  public static async invalidateMemory(inputString: string): Promise<void> {
    try {
      const fingerprint = this.generateFingerprint(inputString);
      await getRedisClient().del(`${KEY_PREFIX}${fingerprint}`);
    } catch (err) {
      console.error("[SemanticMemory] Redis delete failed:", err);
    }
  }
}
