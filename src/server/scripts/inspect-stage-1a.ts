import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";

async function inspect() {
  const chunks = await prisma.semanticChunk.findMany({
    select: { chunkId: true, entityType: true, chunkType: true, title: true, tokenEstimate: true, priorityScore: true, createdAt: true }
  });

  const metrics = await prisma.retrievalMetric.count();
  const events = await prisma.analyticsEvent.count({ where: { eventType: 'SEMANTIC_CHUNK_GENERATED' } });
  const relations = await prisma.retrievalIntentRelation.count();

  console.log(`\n=== STAGE I-A DATABASE REPORT ===\n`);
  console.log(`SemanticChunks: ${chunks.length}`);
  console.log(`RetrievalMetrics: ${metrics}`);
  console.log(`Telemetry Events: ${events}`);
  console.log(`IntentRelations: ${relations}`);

  console.log(`\n--- Chunks ---`);
  chunks.forEach(c => {
    console.log(`  [${c.entityType}] ${c.title} | tokens: ${c.tokenEstimate} | priority: ${c.priorityScore}`);
  });
}

inspect().catch(console.error).finally(() => process.exit(0));
