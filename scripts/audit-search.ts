import { SearchOrchestratorService } from "../src/server/services/search-orchestrator.service";
import { QueryNormalizationService } from "../src/server/services/query-normalization.service";
import { prisma } from "../src/server/db/prisma";
import { getRedisClient } from "../src/server/jobs/redis";

const queries = [
  // Router/Admin
  "tp link login",
  "tplink admin",
  "huawei hg8245h5",
  "netgear router setup",
  "192.168.1.1",
  "192.168 l l login",
  
  // Typos
  "wifi conected no internet",
  "tp lnik admin",
  "routr rebooting",
  "dns isnt workng",

  // Problems
  "slow internet speed",
  "router keeps disconnecting",
  "dns not resolving",
  "firmware update failed",
  "wifi connected but no internet",

  // Broad intents
  "internet not working",
  "cannot access router",
  "setup wifi extender",
  "change router password",

  // Garbage/noise
  "asdfghjkl"
];

async function resolveResultUrl(entityType: string, entityId: number): Promise<string | null> {
  if (entityType === "PROBLEM" && entityId > 0) {
    const problem = await prisma.problem.findUnique({ where: { id: entityId }, select: { slug: true } });
    if (problem) return `/problems/${problem.slug}`;
  }
  if (entityType === "ROUTER" && entityId > 0) {
    const router = await prisma.routerModel.findUnique({ where: { id: entityId }, select: { slug: true, brand: { select: { slug: true } } } });
    if (router?.brand) return `/routers/${router.brand.slug}/${router.slug}`;
  }
  if (entityType === "IP" && entityId > 0) {
    const ip = await prisma.ipAddress.findUnique({ where: { id: entityId }, select: { slug: true } });
    if (ip) return `/ips/${ip.slug}`;
  }
  return null;
}

async function runAudit() {
  console.log("=== Phase S: Search Reliability Audit ===");
  console.log("Query | Latency | Tier | Results | Valid URLs | Notes\n");

  let totalQueries = 0;
  let successCount = 0;
  let avgLatency = 0;

  for (const q of queries) {
    const start = Date.now();
    try {
      const normalized = QueryNormalizationService.normalize(q);
      const results = await SearchOrchestratorService.search(normalized, 5);
      const latency = Date.now() - start;
      
      let validUrls = 0;
      let hasFallback = false;
      let bestTier = results.length > 0 ? results[0].tierUsed : "-";

      for (const r of results) {
        if (r.tierUsed === 3) hasFallback = true;
        const url = await resolveResultUrl(r.entityType, r.entityId);
        if (url) validUrls++;
      }

      const resultsFound = results.length > 0;
      const allUrlsValid = results.length > 0 && validUrls === results.length;
      
      if (resultsFound && allUrlsValid) successCount++;
      totalQueries++;
      avgLatency += latency;

      let notes = [];
      if (hasFallback) notes.push("Fallback (T3)");
      if (!resultsFound) notes.push("No Results");
      if (resultsFound && !allUrlsValid) notes.push("BROKEN URLS");

      console.log(`"${q}" | ${latency}ms | T${bestTier} | ${results.length} | ${validUrls}/${results.length} | ${notes.join(", ") || "OK"}`);

    } catch (err: any) {
      console.log(`"${q}" | FAILED | - | - | - | CRASH: ${err.message}`);
    }
  }

  console.log("\n=== Summary ===");
  console.log(`Total Queries: ${totalQueries}`);
  console.log(`Success Rate: ${((successCount / totalQueries) * 100).toFixed(1)}%`);
  console.log(`Avg Latency: ${(avgLatency / totalQueries).toFixed(0)}ms`);
}

runAudit().catch(console.error).finally(() => prisma.$disconnect());
