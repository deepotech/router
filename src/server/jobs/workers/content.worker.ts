import { Worker } from "bullmq";
import { getRedisClient } from "../redis";
import { contentProcessor } from "../processors/content.processor";

/**
 * Initializes the worker process for content generation.
 * This should be run in a separate Node process or a Next.js custom server.
 */
export const contentWorker = new Worker("content-generation", contentProcessor, {
  connection: getRedisClient(),
  concurrency: 5, // Process 5 jobs concurrently
  limiter: {
    max: 10, // Max 10 jobs
    duration: 1000, // per second (Rate limiting to protect OpenAI API)
  },
});

contentWorker.on("completed", (job) => {
  console.log(`[Worker-Event] 🟢 Job ${job.id} completed successfully.`);
});

contentWorker.on("failed", (job, err) => {
  console.error(`[Worker-Event] 🔴 Job ${job?.id} FAILED with error: ${err.message}`);
  console.error(err.stack);
});

contentWorker.on("error", (err) => {
  console.error(`[Worker-Event] ⚠️ Worker error: ${err.message}`);
});
