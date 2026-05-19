import { Queue } from "bullmq";
import Redis from "ioredis";
import { SemanticDiversityService } from "../services/semantic-diversity.service";
import { CrawlPressureService } from "../services/crawl-pressure.service";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

// Redis connection
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

const generationQueue = new Queue('content-generation', { connection });

// ---------------------------------------------------------
// STAGE I-A COHORTS
// ---------------------------------------------------------

const COHORT_A = [
  { entityType: 'IP', entityId: '192.168.1.1', intentCategory: 'login', query: '192.168.1.1 login' },
  { entityType: 'IP', entityId: '192.168.0.1', intentCategory: 'login', query: '192.168.0.1 admin password reset' },
  { entityType: 'IP', entityId: '10.0.0.1', intentCategory: 'login', query: '10.0.0.1 default credentials' },
  { entityType: 'IP', entityId: '192.168.100.1', intentCategory: 'login', query: '192.168.100.1 router setup' },
  { entityType: 'IP', entityId: '192.168.8.1', intentCategory: 'login', query: '192.168.8.1 admin page not loading' },
];

const COHORT_B = [
  { entityType: 'PROBLEM', entityId: 'wifi-connected-no-internet', intentCategory: 'connectivity', query: 'wifi connected but no internet' },
  { entityType: 'PROBLEM', entityId: 'router-blinking-orange', intentCategory: 'connectivity', query: 'router blinking orange' },
  { entityType: 'PROBLEM', entityId: 'internet-disconnects-randomly', intentCategory: 'connectivity', query: 'internet disconnects randomly' },
  { entityType: 'PROBLEM', entityId: 'wifi-slow-after-update', intentCategory: 'connectivity', query: 'wifi slow after firmware update' },
  { entityType: 'PROBLEM', entityId: 'router-not-detecting-wan', intentCategory: 'connectivity', query: 'router not detecting WAN cable' },
];

const COHORT_C = [
  { entityType: 'PROBLEM', entityId: 'firmware-recovery-mode', intentCategory: 'firmware', query: 'firmware recovery mode' },
  { entityType: 'PROBLEM', entityId: 'router-stuck-after-update', intentCategory: 'firmware', query: 'router stuck after update' },
  { entityType: 'PROBLEM', entityId: 'firmware-rollback', intentCategory: 'firmware', query: 'firmware rollback' },
  { entityType: 'PROBLEM', entityId: 'emergency-recovery-setup', intentCategory: 'firmware', query: 'emergency recovery setup' },
  { entityType: 'PROBLEM', entityId: 'reset-failed-flash', intentCategory: 'firmware', query: 'reset after failed firmware flash' },
];

async function runSeed() {
  console.log('🚀 Initiating Stage I-A Controlled Generation Cohort...');

  // Step 1: Pre-flight Crawl Pressure Check
  const pressure = await CrawlPressureService.evaluatePublishingSafety();
  if (pressure.action === 'HALT_PUBLISHING') {
    console.error('❌ CRAWL PRESSURE HIGH: Cannot safely initiate rollout.');
    console.error(pressure);
    process.exit(1);
  }

  // Combine cohorts and duplicate for scale (Simulating ~150 chunks across variants)
  const fullBatch = [...COHORT_A, ...COHORT_B, ...COHORT_C];
  
  // Step 2: Semantic Diversity Check
  const isDiverse = SemanticDiversityService.validateBatchDiversity(fullBatch);
  if (!isDiverse) {
    console.error('❌ SEMANTIC DIVERSITY FAILED: Batch is too skewed. Halting.');
    process.exit(1);
  }

  console.log('✅ Governance & Pressure checks passed. Enqueueing micro-batches...');

  // Step 3: Enqueue in delayed micro-batches
  let delayMs = 0;
  let enqueued = 0;

  for (const jobData of fullBatch) {
    // 5-minute spacing between generations to prevent vector latency spikes
    // and allow the telemetry loop to catch overlap anomalies mid-batch.
    delayMs += 5 * 60 * 1000; 

    await generationQueue.add('generate-semantic-chunk', {
      ...jobData,
      stage: 'STAGE_I_A',
      forceStatus: 'STAGED' // Mandatory: NEVER publish directly
    }, {
      delay: delayMs,
      attempts: 3,
      backoff: { type: 'exponential', delay: 10000 }
    });

    enqueued++;
  }

  console.log(`✅ Successfully queued ${enqueued} Stage I-A generation tasks.`);
  console.log(`⏳ Estimated completion time: ${(delayMs / 1000 / 60 / 60).toFixed(1)} hours.`);
  console.log('📊 Monitor progress at /admin/observability');

  await connection.quit();
}

// Execute if run directly
if (require.main === module) {
  runSeed().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
