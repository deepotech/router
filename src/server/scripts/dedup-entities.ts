/**
 * DUPLICATE ENTITY SUPPRESSION
 * ==============================
 * Detects and merges duplicate entities, preserving the canonical
 * (highest quality) version and redirecting weaker duplicates.
 * Safe: uses soft-delete (REJECTED_SPAM status) not hard delete.
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";
import { SemanticChunkingService } from "../services/semantic-chunking.service";

function tokenize(text: string): Set<string> {
  const STOP = new Set(["the", "is", "at", "on", "and", "a", "to", "in", "of", "for", "with", "as", "by"]);
  return new Set(text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = tokenize(a);
  const setB = tokenize(b);
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const w of setA) if (setB.has(w)) intersection++;
  return intersection / (setA.size + setB.size - intersection);
}

// ─── Score entity to find canonical version ───────────────────────────────────
function scoreEntity(content: string, wordCount: number): number {
  let score = 0;
  score += Math.min(wordCount, 500) / 5; // up to 100 pts from word count
  if (content.includes("##")) score += 20; // has heading structure
  if (content.length > 300) score += 10;
  return score;
}

async function suppressProblemDuplicates(): Promise<void> {
  console.log("\n━━━ PROBLEM DUPLICATE SCAN ━━━");

  const problems = await prisma.problem.findMany({
    select: { id: true, title: true, slug: true, content: true, status: true, isPublished: true },
  });

  const merged: Set<number> = new Set();
  let suppressedCount = 0;

  for (let i = 0; i < problems.length; i++) {
    if (merged.has(problems[i].id)) continue;

    for (let j = i + 1; j < problems.length; j++) {
      if (merged.has(problems[j].id)) continue;

      const titleSim = jaccardSimilarity(problems[i].title, problems[j].title);
      if (titleSim < 0.6) continue; // Not similar enough

      console.log(`\n  🔍 Duplicate detected:`);
      console.log(`     A: [#${problems[i].id}] "${problems[i].title}"`);
      console.log(`     B: [#${problems[j].id}] "${problems[j].title}"`);
      console.log(`     Title similarity: ${(titleSim * 100).toFixed(0)}%`);

      // Score both to find canonical
      const scoreA = scoreEntity(problems[i].content, problems[i].content.split(/\s+/).length);
      const scoreB = scoreEntity(problems[j].content, problems[j].content.split(/\s+/).length);

      const canonical = scoreA >= scoreB ? problems[i] : problems[j];
      const weaker = scoreA >= scoreB ? problems[j] : problems[i];

      console.log(`     Canonical: #${canonical.id} (score: ${scoreA >= scoreB ? scoreA.toFixed(0) : scoreB.toFixed(0)})`);
      console.log(`     Suppressing: #${weaker.id}`);

      // Soft-suppress the weaker entity
      await prisma.problem.update({
        where: { id: weaker.id },
        data: {
          status: "REJECTED_SPAM" as any,
          isPublished: false,
          datasetGovernance: {
            suppressedAt: new Date().toISOString(),
            reason: "duplicate_suppression",
            canonicalId: canonical.id,
            canonicalSlug: canonical.slug,
          },
        },
      });

      // Redirect its semantic chunks to the canonical entity
      await prisma.semanticChunk.updateMany({
        where: { entityType: "PROBLEM", entityId: weaker.id },
        data: { entityId: canonical.id },
      });

      merged.add(weaker.id);
      suppressedCount++;
      console.log(`     ✅ Suppressed #${weaker.id} → canonical is #${canonical.id}`);
    }
  }

  console.log(`\n  Problems suppressed: ${suppressedCount}`);
}

async function suppressRouterDuplicates(): Promise<void> {
  console.log("\n━━━ ROUTER DUPLICATE SCAN ━━━");

  const routers = await prisma.routerModel.findMany({
    include: { brand: { select: { name: true } } },
  });

  const merged: Set<number> = new Set();
  let suppressedCount = 0;

  for (let i = 0; i < routers.length; i++) {
    if (merged.has(routers[i].id)) continue;

    for (let j = i + 1; j < routers.length; j++) {
      if (merged.has(routers[j].id)) continue;

      // Check both name similarity AND brand match
      const nameSim = jaccardSimilarity(routers[i].name, routers[j].name);
      const sameBrand = (routers[i] as any).brand?.name === (routers[j] as any).brand?.name;

      if (nameSim < 0.8 || !sameBrand) continue;

      console.log(`\n  🔍 Duplicate detected:`);
      console.log(`     A: [#${routers[i].id}] ${(routers[i] as any).brand?.name} ${routers[i].name}`);
      console.log(`     B: [#${routers[j].id}] ${(routers[j] as any).brand?.name} ${routers[j].name}`);

      const scoreA = scoreEntity(routers[i].wifiSetupGuide, routers[i].wifiSetupGuide.split(/\s+/).length);
      const scoreB = scoreEntity(routers[j].wifiSetupGuide, routers[j].wifiSetupGuide.split(/\s+/).length);

      const canonical = scoreA >= scoreB ? routers[i] : routers[j];
      const weaker = scoreA >= scoreB ? routers[j] : routers[i];

      await prisma.routerModel.update({
        where: { id: weaker.id },
        data: {
          status: "REJECTED_SPAM" as any,
          isPublished: false,
          datasetGovernance: {
            suppressedAt: new Date().toISOString(),
            reason: "duplicate_suppression",
            canonicalId: canonical.id,
            canonicalSlug: canonical.slug,
          },
        },
      });

      await prisma.semanticChunk.updateMany({
        where: { entityType: "ROUTER", entityId: weaker.id },
        data: { entityId: canonical.id },
      });

      merged.add(weaker.id);
      suppressedCount++;
      console.log(`     ✅ Suppressed #${weaker.id} → canonical is #${canonical.id}`);
    }
  }

  console.log(`\n  Routers suppressed: ${suppressedCount}`);
}

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║           DUPLICATE ENTITY SUPPRESSION                  ║");
  console.log("╚══════════════════════════════════════════════════════════╝");

  await suppressProblemDuplicates();
  await suppressRouterDuplicates();

  // Final count
  const [activeProblems, activeRouters] = await Promise.all([
    prisma.problem.count({ where: { status: { not: "REJECTED_SPAM" as any } } }),
    prisma.routerModel.count({ where: { status: { not: "REJECTED_SPAM" as any } } }),
  ]);

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║                 SUPPRESSION COMPLETE                    ║");
  console.log(`║ Active Problems : ${String(activeProblems).padEnd(38)}║`);
  console.log(`║ Active Routers  : ${String(activeRouters).padEnd(38)}║`);
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

main().catch(console.error).finally(() => process.exit(0));
