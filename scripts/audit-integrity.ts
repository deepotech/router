import { prisma } from "../src/server/db/prisma";

async function runAudit() {
  console.log("--- Semantic Integrity Audit ---");

  // 1. Total chunks
  const totalChunks = await prisma.semanticChunk.count();
  console.log(`Total Chunks: ${totalChunks}`);

  // 2. Chunks with entityId = 1
  const entityId1Chunks = await prisma.semanticChunk.count({
    where: { entityId: 1 }
  });
  console.log(`Chunks with entityId=1 (potential fakes): ${entityId1Chunks}`);

  // 3. Check for orphans (PROBLEM)
  const problemChunks = await prisma.semanticChunk.findMany({
    where: { entityType: "PROBLEM" },
    select: { id: true, entityId: true }
  });
  
  let problemOrphans = 0;
  for (const chunk of problemChunks) {
    const exists = await prisma.problem.findUnique({ where: { id: chunk.entityId } });
    if (!exists) problemOrphans++;
  }
  console.log(`PROBLEM orphans: ${problemOrphans}`);

  // 4. Check for orphans (ROUTER)
  const routerChunks = await prisma.semanticChunk.findMany({
    where: { entityType: "ROUTER" },
    select: { id: true, entityId: true }
  });
  
  let routerOrphans = 0;
  for (const chunk of routerChunks) {
    const exists = await prisma.routerModel.findUnique({ where: { id: chunk.entityId } });
    if (!exists) routerOrphans++;
  }
  console.log(`ROUTER orphans: ${routerOrphans}`);

  // 5. Clean up orphans and entityId=1
  console.log("\n--- Cleanup ---");
  const deletedEntity1 = await prisma.semanticChunk.deleteMany({
    where: { entityId: 1 }
  });
  console.log(`Deleted entityId=1 chunks: ${deletedEntity1.count}`);

  console.log("Audit complete.");
}

runAudit().catch(console.error).finally(() => prisma.$disconnect());
