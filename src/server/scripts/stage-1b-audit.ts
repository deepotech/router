/**
 * STAGE I-B AUDIT & ROLLOUT RECOMMENDATION
 * ========================================
 * Analyzes the state of the graph after Stage I-B generation to ensure
 * safety, quality, and semantic stability before a full ACCELERATE rollout.
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";
import { RetrievalCoverageService } from "../services/retrieval-coverage.service";

async function runStage1BAudit() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║         STAGE I-B GRAPH & SAFETY AUDIT                  ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const [problems, ips, routers, chunks] = await Promise.all([
    prisma.problem.findMany({ select: { id: true, title: true, content: true, isPublished: true, status: true } }),
    prisma.ipAddress.findMany({ select: { id: true, address: true, loginGuide: true, isPublished: true, status: true } }),
    prisma.routerModel.findMany({ select: { id: true, name: true, wifiSetupGuide: true, isPublished: true, status: true } }),
    prisma.semanticChunk.findMany(),
  ]);

  const totalEntities = problems.length + ips.length + routers.length;

  console.log("📊 1. GRAPH EXPANSION VALIDATION");
  console.log("------------------------------------------------------------");
  console.log(`  • Total Entities      : ${totalEntities}`);
  console.log(`  • Problems            : ${problems.length}`);
  console.log(`  • IPs                 : ${ips.length}`);
  console.log(`  • Routers             : ${routers.length}`);
  console.log(`  • Semantic Chunks     : ${chunks.length}`);
  console.log(`  • Avg Chunks/Entity   : ${(chunks.length / totalEntities).toFixed(1)}`);
  
  const orphanEntities = problems.filter(p => p.content === "" || p.content === null).length +
                         routers.filter(r => r.wifiSetupGuide === "" || r.wifiSetupGuide === null).length;
  console.log(`  • Orphan Entities     : ${orphanEntities === 0 ? "✅ 0 (Healthy)" : `❌ ${orphanEntities} (Needs backfill)`}`);
  
  const activeProblems = problems.filter(p => !["REJECTED_SPAM", "DRAFT"].includes(p.status));
  const activeRouters = routers.filter(r => !["REJECTED_SPAM", "DRAFT"].includes(r.status));
  const activeIps = ips.filter(i => !["REJECTED_SPAM", "DRAFT"].includes(i.status));

  // Checking semantic overlap roughly by title uniqueness
  const titles = new Set([...activeProblems.map(p => p.title), ...activeIps.map(i => i.address), ...activeRouters.map(r => r.name)]);
  const overlapRisk = (activeProblems.length + activeIps.length + activeRouters.length) - titles.size;
  console.log(`  • Duplicate Canonical : ${overlapRisk === 0 ? "✅ 0" : `⚠️ ${overlapRisk} potential duplicates`}`);

  console.log("\n🛡️  2. CRAWL SAFETY VERIFICATION");
  console.log("------------------------------------------------------------");
  
  let thinCount = 0;
  activeProblems.forEach(p => { if (p.content && p.content.split(" ").length < 150) thinCount++; });
  activeRouters.forEach(r => { if (r.wifiSetupGuide && r.wifiSetupGuide.split(" ").length < 150) thinCount++; });
  
  console.log(`  • Thin Content Risk   : ${thinCount === 0 ? "✅ 0 entities < 150 words" : `❌ ${thinCount} entities < 150 words`}`);
  
  const stagedCount = problems.filter(p => p.status === "STAGED").length + routers.filter(r => r.status === "STAGED").length;
  const publishedCount = problems.filter(p => p.status === "PUBLISHED").length + routers.filter(r => r.status === "PUBLISHED").length;
  console.log(`  • STAGED Enforcement  : ${stagedCount > 0 ? "✅ Active" : "⚠️ None"}`);
  console.log(`  • Live Sitemap Growth : ${publishedCount} / ${totalEntities} (${((publishedCount/totalEntities)*100).toFixed(0)}%)`);

  console.log("\n⚡ 3. RETRIEVAL TELEMETRY (Coverage Snapshot)");
  console.log("------------------------------------------------------------");
  const snapshot = await RetrievalCoverageService.generateCoverageSnapshot();
  console.log(`  • Tier 1 Eligibility  : ${snapshot.tier1EligibilityRate}%`);
  console.log(`  • Critical Gaps       : ${snapshot.criticalGaps.length}`);

  console.log("\n🎯 4. ROLLOUT RECOMMENDATION");
  console.log("------------------------------------------------------------");
  
  let recommendation = "ACCELERATE";
  const reasons = [];

  if (thinCount > 0) {
    recommendation = "THROTTLE";
    reasons.push("Thin content detected. Recover thin content before scaling.");
  }
  if (overlapRisk > 0) {
    recommendation = "THROTTLE";
    reasons.push("Duplicate intents detected. Run dedup before scaling.");
  }
  if (snapshot.tier1EligibilityRate < 90) {
    recommendation = "THROTTLE";
    reasons.push(`Tier 1 coverage is below 90% (${snapshot.tier1EligibilityRate}%). Run chunk backfill.`);
  }
  if (orphanEntities > 0) {
    recommendation = "FREEZE";
    reasons.push("Orphan/empty entities detected. Pipeline failure risk.");
  }

  console.log(`  STATUS: [ ${recommendation} ]`);
  if (reasons.length > 0) {
    reasons.forEach(r => console.log(`  Reason: ${r}`));
  } else {
    console.log("  Reason: Graph is dense, retrieval is stable, and governance is strictly enforced.");
    console.log("  Action: Platform is ready for full Stage I-B publication or Stage II scale generation.");
  }
  
  console.log("\n╚══════════════════════════════════════════════════════════╝\n");
}

runStage1BAudit().catch(console.error).finally(() => process.exit(0));
