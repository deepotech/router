import { Redis } from "ioredis";

// Centralized Redis connection for BullMQ
// Supports both local Redis (dev) and Upstash TLS (production/Railway)
let redisInstance: Redis | null = null;

export const getRedisClient = (): Redis => {
  if (redisInstance) return redisInstance;

  const redisUrl = process.env.REDIS_URL;

  const options: any = {
    maxRetriesPerRequest: null, // Required by BullMQ
    lazyConnect: true, // Do not block app startup if Redis is down
    retryStrategy: (times: number) => {
      // Don't retry infinitely if Redis is down, give up after a few tries to fail fast
      if (times > 3) return null;
      return Math.min(times * 50, 2000);
    }
  };

  if (redisUrl) {
    if (redisUrl.startsWith("rediss://")) options.tls = {};
    redisInstance = new Redis(redisUrl, options);
  } else {
    options.host = process.env.REDIS_HOST || "127.0.0.1";
    options.port = parseInt(process.env.REDIS_PORT || "6379");
    options.password = process.env.REDIS_PASSWORD || undefined;
    redisInstance = new Redis(options);
  }

  // Prevent unhandled error crashes
  redisInstance.on('error', (err) => {
    console.warn('[Redis] Connection Error:', err.message);
  });

  return redisInstance;
};
