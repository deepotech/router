import { Queue } from "bullmq";
import { getRedisClient } from "../redis";

export const contentGenerationQueue = new Queue("content-generation", {
  connection: getRedisClient(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000, // 5s, 25s, 125s
    },
    removeOnComplete: true, // Keep DB clean
    removeOnFail: false, // Keep failed jobs for inspection
  },
});

export const embeddingQueue = new Queue("embedding-generation", {
  connection: getRedisClient(),
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: true,
  },
});
