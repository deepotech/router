/**
 * Worker Entrypoint
 * Run this with: npm run worker
 *
 * Loads .env.local explicitly (tsx does not auto-load it like Next.js).
 * Boots the BullMQ content generation worker in an isolated Node.js process.
 */

// Must be the very first import — loads .env.local before any service code runs
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" }); // fallback

import { contentWorker } from "./content.worker";

const redisUrl = process.env.REDIS_URL;
const redisDisplay = redisUrl
  ? redisUrl.replace(/:([^@]+)@/, ":***@") // mask password
  : `${process.env.REDIS_HOST || "127.0.0.1"}:${process.env.REDIS_PORT || "6379"}`;

console.log("🚀 [Worker] RouterVia Content Worker starting...");
console.log(`[Worker] Redis: ${redisDisplay}`);
console.log("[Worker] Listening for jobs on queue: content-generation");

// Handle graceful shutdown for Railway / Docker deployments
process.on("SIGINT", async () => {
  console.log("[Worker] SIGINT received. Closing worker gracefully...");
  await contentWorker.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("[Worker] SIGTERM received. Closing worker gracefully...");
  await contentWorker.close();
  process.exit(0);
});
