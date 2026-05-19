/**
 * RETRIEVAL COVERAGE BACKFILL PIPELINE
 * =====================================
 * Generates OVERVIEW + DIAGNOSTIC + FAQ semantic chunks for every
 * published entity that is missing retrieval coverage.
 *
 * Constraints:
 * - No publishing, no sitemap injection
 * - Rollout state remains THROTTLED
 * - Uses upsert (safe to re-run)
 * - Rate-limited: 500ms delay between API calls
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { prisma } from "../db/prisma";
import { SemanticChunkingService } from "../services/semantic-chunking.service";
import { RetrievalDensityService } from "../services/retrieval-density.service";
import { RetrievalCoverageService } from "../services/retrieval-coverage.service";
import type { RawChunk } from "../services/semantic-chunking.service";

// Use createOpenAI with explicit config to support OpenRouter base URL
const openaiProvider = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});
const model = openaiProvider("gpt-4o-mini");


// ─── Rate limiter ─────────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Chunk generation schemas ─────────────────────────────────────────────────
const ChunkSchema = z.object({
  overview: z.string().describe("Dense 2-3 sentence technical summary for retrieval. No fluff."),
  diagnostic: z.string().describe("Step-by-step diagnostic process with technical signals. Markdown."),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string().describe("Concise, technically accurate answer. Max 3 sentences.")
  })).min(2).max(3),
});

// ─── Generate chunks for a PROBLEM ───────────────────────────────────────────
async function backfillProblemChunks(problem: {
  id: number; title: string; content: string; excerpt: string; diagnosticCategory: string | null;
}): Promise<number> {
  const label = `[Backfill:Problem#${problem.id}] ${problem.title}`;
  console.log(`\n  → ${label}`);

  const { object } = await generateObject({
    model,
    schema: ChunkSchema,
    prompt: `
You are a Staff Network Engineer. Generate dense, technical retrieval chunks for this router problem:
Title: "${problem.title}"
Category: ${problem.diagnosticCategory || "General"}
Excerpt: ${problem.excerpt || "N/A"}
Existing content snippet: ${problem.content.substring(0, 300)}

Rules:
- Overview: 2-3 dense sentences with technical signals (IPs, protocols, error codes)
- Diagnostic: Markdown checklist of 3-5 diagnostic steps. Include specific commands/settings.
- FAQ: 2-3 specific technical Q&As. No generic answers.
- NEVER start with "As an AI" or generic intros.
    `.trim(),
  });

  const densityCheck = RetrievalDensityService.calculateDensity(object.overview + " " + object.diagnostic, "troubleshooting");
  if (densityCheck.recommendation === "REJECT") {
    console.warn(`    ⚠️  Low density for ${problem.title} — skipping (score: ${densityCheck.score.toFixed(0)})`);
    return 0;
  }

  const faqText = object.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  const rawChunks: RawChunk[] = [
    { chunkType: "OVERVIEW", title: `${problem.title} — Overview`, content: object.overview, priorityScore: 1.2 },
    { chunkType: "DIAGNOSTIC", title: `${problem.title} — Diagnostic`, content: object.diagnostic, priorityScore: 1.0 },
    { chunkType: "FAQ", title: `${problem.title} — FAQs`, content: faqText, priorityScore: 0.9 },
  ];

  const saved = await SemanticChunkingService.processAndSaveChunks("PROBLEM", problem.id, rawChunks);
  console.log(`    ✅ Saved ${saved.length} chunks (density: ${densityCheck.score.toFixed(0)}/100)`);
  return saved.length;
}

// ─── Generate chunks for an IP ADDRESS ───────────────────────────────────────
async function backfillIpChunks(ip: {
  id: number; address: string; description: string; loginGuide: string; diagnosticCategory: string | null;
}): Promise<number> {
  const label = `[Backfill:IP#${ip.id}] ${ip.address}`;
  console.log(`\n  → ${label}`);

  const { object } = await generateObject({
    model,
    schema: ChunkSchema,
    prompt: `
You are a Staff Network Engineer. Generate retrieval chunks for the router admin IP: ${ip.address}

Rules:
- Overview: What this IP is used for, which brands use it, how to access it.
- Diagnostic: Troubleshooting steps if ${ip.address} is not accessible (exact steps).
- FAQ: 2-3 specific Q&As about ${ip.address} (login issues, password resets).
- Use the IP address ${ip.address} explicitly in your answers.
    `.trim(),
  });

  const faqText = object.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  const rawChunks: RawChunk[] = [
    { chunkType: "OVERVIEW", title: `${ip.address} — Overview`, content: object.overview, priorityScore: 1.3 },
    { chunkType: "DIAGNOSTIC", title: `${ip.address} — Cannot Access`, content: object.diagnostic, priorityScore: 1.1 },
    { chunkType: "FAQ", title: `${ip.address} — FAQs`, content: faqText, priorityScore: 0.9 },
  ];

  const saved = await SemanticChunkingService.processAndSaveChunks("IP", ip.id, rawChunks);
  console.log(`    ✅ Saved ${saved.length} chunks`);
  return saved.length;
}

// ─── Generate chunks for a ROUTER MODEL ──────────────────────────────────────
async function backfillRouterChunks(router: {
  id: number; name: string; wifiSetupGuide: string; resetGuide: string; diagnosticCategory: string | null;
  brandName?: string;
}): Promise<number> {
  const label = `[Backfill:Router#${router.id}] ${router.name}`;
  console.log(`\n  → ${label}`);

  const { object } = await generateObject({
    model,
    schema: ChunkSchema,
    prompt: `
You are a Staff Network Engineer. Generate retrieval chunks for: ${router.brandName || ""} ${router.name}

Rules:
- Overview: Model specs, default login IP, default credentials, key features for retrieval.
- Diagnostic: Top 3 common issues with this specific model and how to fix them (step-by-step).
- FAQ: 2-3 Q&As specific to this router model (factory reset, login, firmware).
- Be model-specific. No generic router advice.
    `.trim(),
  });

  const faqText = object.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  const rawChunks: RawChunk[] = [
    { chunkType: "OVERVIEW", title: `${router.name} — Overview`, content: object.overview, priorityScore: 1.2 },
    { chunkType: "DIAGNOSTIC", title: `${router.name} — Common Issues`, content: object.diagnostic, priorityScore: 1.0 },
    { chunkType: "FAQ", title: `${router.name} — FAQs`, content: faqText, priorityScore: 0.9 },
  ];

  const saved = await SemanticChunkingService.processAndSaveChunks("ROUTER", router.id, rawChunks);
  console.log(`    ✅ Saved ${saved.length} chunks`);
  return saved.length;
}

// ─── Main backfill orchestrator ───────────────────────────────────────────────
async function runBackfill() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║      RETRIEVAL COVERAGE BACKFILL PIPELINE               ║");
  console.log("║      Goal: Tier 1 hit rate > 70%                        ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // 1. Snapshot coverage BEFORE backfill
  console.log("📸 Pre-backfill coverage snapshot...");
  const beforeSnapshot = await RetrievalCoverageService.generateCoverageSnapshot();
  console.log(`   Entities: ${beforeSnapshot.totalEntities} | Chunks: ${beforeSnapshot.totalChunks} | Tier 1 Rate: ${beforeSnapshot.tier1EligibilityRate}%\n`);

  // 2. Identify entities that need chunks (missing OVERVIEW or DIAGNOSTIC)
  const gapEntities = beforeSnapshot.entities.filter((e) => !e.tier1Eligible);
  console.log(`🎯 Found ${gapEntities.length} entities below Tier 1 threshold\n`);

  // 3. Sort by priority: PROBLEM (Connectivity) → IP → ROUTER
  const priorityOrder = { PROBLEM: 0, IP: 1, ROUTER: 2 };
  gapEntities.sort((a, b) => priorityOrder[a.entityType] - priorityOrder[b.entityType]);

  // 4. Fetch full data for gap entities
  const problemIds = gapEntities.filter((e) => e.entityType === "PROBLEM").map((e) => e.entityId);
  const ipIds = gapEntities.filter((e) => e.entityType === "IP").map((e) => e.entityId);
  const routerIds = gapEntities.filter((e) => e.entityType === "ROUTER").map((e) => e.entityId);

  const [problems, ips, routers] = await Promise.all([
    prisma.problem.findMany({
      where: { id: { in: problemIds } },
      select: { id: true, title: true, content: true, excerpt: true, diagnosticCategory: true },
    }),
    prisma.ipAddress.findMany({
      where: { id: { in: ipIds } },
      select: { id: true, address: true, description: true, loginGuide: true, diagnosticCategory: true },
    }),
    prisma.routerModel.findMany({
      where: { id: { in: routerIds } },
      include: { brand: { select: { name: true } } },
    }),
  ]);

  let totalGenerated = 0;
  let errors = 0;

  // 5. Backfill Problems (PRIORITY 1 — Connectivity/DNS)
  console.log(`\n━━━ PHASE 1: Problems (${problems.length} entities) ━━━`);
  for (const p of problems) {
    try {
      const count = await backfillProblemChunks(p);
      totalGenerated += count;
      await delay(600); // Rate limit: 600ms between calls
    } catch (err) {
      console.error(`    ❌ Failed for Problem#${p.id}: ${(err as Error).message}`);
      errors++;
      await delay(1000);
    }
  }

  // 6. Backfill IPs (PRIORITY 2 — Login/Access)
  console.log(`\n━━━ PHASE 2: IP Addresses (${ips.length} entities) ━━━`);
  for (const ip of ips) {
    try {
      const count = await backfillIpChunks(ip);
      totalGenerated += count;
      await delay(600);
    } catch (err) {
      console.error(`    ❌ Failed for IP#${ip.id}: ${(err as Error).message}`);
      errors++;
      await delay(1000);
    }
  }

  // 7. Backfill Routers (PRIORITY 3)
  console.log(`\n━━━ PHASE 3: Router Models (${routers.length} entities) ━━━`);
  for (const r of routers) {
    try {
      const count = await backfillRouterChunks({
        id: r.id, name: r.name, wifiSetupGuide: r.wifiSetupGuide,
        resetGuide: r.resetGuide, diagnosticCategory: r.diagnosticCategory,
        brandName: r.brand.name,
      });
      totalGenerated += count;
      await delay(600);
    } catch (err) {
      console.error(`    ❌ Failed for Router#${r.id}: ${(err as Error).message}`);
      errors++;
      await delay(1000);
    }
  }

  // 8. Snapshot coverage AFTER backfill
  console.log("\n\n📸 Post-backfill coverage snapshot...");
  const afterSnapshot = await RetrievalCoverageService.recordCoverageSnapshot();

  // 9. Final Report
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║               BACKFILL RESULTS                          ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log(`║ Chunks Generated : ${String(totalGenerated).padEnd(38)}║`);
  console.log(`║ Errors           : ${String(errors).padEnd(38)}║`);
  console.log(`║ Before Tier 1 %  : ${String(beforeSnapshot.tier1EligibilityRate + "%").padEnd(38)}║`);
  console.log(`║ After Tier 1 %   : ${String(afterSnapshot.tier1EligibilityRate + "%").padEnd(38)}║`);
  console.log(`║ Total Chunks Now : ${String(afterSnapshot.totalChunks).padEnd(38)}║`);
  console.log(`║ Avg Chunks/Entity: ${String(afterSnapshot.avgChunksPerEntity).padEnd(38)}║`);
  console.log(`║ Critical Gaps    : ${String(afterSnapshot.criticalGaps.length).padEnd(38)}║`);
  const reached70 = afterSnapshot.tier1EligibilityRate >= 70;
  console.log(`║ Target (>70%)    : ${String(reached70 ? "✅ ACHIEVED" : `❌ ${afterSnapshot.tier1EligibilityRate}% — run again`).padEnd(38)}║`);
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  if (afterSnapshot.criticalGaps.length > 0) {
    console.log("⚠️  Remaining critical gaps:");
    afterSnapshot.criticalGaps.forEach((e) =>
      console.log(`   [${e.entityType}] ${e.title} — readiness: ${e.retrievalReadinessScore}% | chunks: ${e.chunkCount}`)
    );
  }
}

runBackfill().catch(console.error).finally(() => process.exit(0));
