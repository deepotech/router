import { Queue } from "bullmq";
import Redis from "ioredis";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const generationQueue = new Queue('content-generation', { connection });

async function check() {
  console.log('Checking queue...');
  const waiting = await generationQueue.getWaitingCount();
  const delayed = await generationQueue.getDelayedCount();
  const active = await generationQueue.getActiveCount();
  const completed = await generationQueue.getCompletedCount();
  const failed = await generationQueue.getFailedCount();

  console.log(`Waiting: ${waiting}`);
  console.log(`Delayed: ${delayed}`);
  console.log(`Active: ${active}`);
  console.log(`Completed: ${completed}`);
  console.log(`Failed: ${failed}`);

  const delayedJobs = await generationQueue.getDelayed();
  console.log('\nSample Delayed Jobs:');
  delayedJobs.slice(0, 3).forEach(job => {
    console.log(`- Job ${job.id}: Delayed until ${new Date(job.timestamp + job.delay).toLocaleString()}`);
  });

  await connection.quit();
}

check().catch(console.error);
