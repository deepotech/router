import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";

async function main() {
  const problems = await prisma.problem.count();
  const ips = await prisma.ipAddress.count();
  const routers = await prisma.routerModel.count();
  const chunks = await prisma.semanticChunk.findMany({
    select: { id: true, entityType: true, entityId: true, chunkType: true, title: true, tokenEstimate: true, priorityScore: true },
  });

  const problemsByStatus = await prisma.problem.groupBy({ by: ['status'], _count: { id: true } });
  const ipsByStatus = await prisma.ipAddress.groupBy({ by: ['status'], _count: { id: true } });
  const routersByStatus = await prisma.routerModel.groupBy({ by: ['status'], _count: { id: true } });

  const metrics = await prisma.retrievalMetric.findMany({
    orderBy: { createdAt: 'desc' }, take: 5,
    select: { query: true, tierUsed: true, latencyMs: true },
  });

  console.log("\n=== DATABASE STATE ===");
  console.log(`Problems: ${problems} | IPs: ${ips} | Routers: ${routers}`);
  console.log("\nProblems by status:", JSON.stringify(problemsByStatus));
  console.log("IPs by status:", JSON.stringify(ipsByStatus));
  console.log("Routers by status:", JSON.stringify(routersByStatus));
  console.log(`\nSemantic Chunks (${chunks.length}):`);
  chunks.forEach(c => console.log(`  [${c.entityType}|${c.chunkType}] entityId:${c.entityId} tokens:${c.tokenEstimate} title:"${c.title}"`));
  console.log("\nRecent Retrieval Metrics:");
  metrics.forEach(m => console.log(`  "${m.query}" | tier:${m.tierUsed} | ${m.latencyMs}ms`));
}

main().catch(console.error).finally(() => process.exit(0));
