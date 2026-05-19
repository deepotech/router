/**
 * RETRIEVAL BENCHMARKING SUITE
 * =============================
 * Simulates real queries against the semantic chunk index and
 * measures Tier 0/1/2 performance after the backfill.
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";
import { RetrievalCoverageService } from "../services/retrieval-coverage.service";

// ─── Test query battery ───────────────────────────────────────────────────────
const TEST_QUERIES = [
  // Connectivity
  { query: "router not connecting to internet", category: "Connectivity" },
  { query: "wifi connected but no internet access", category: "Connectivity" },
  { query: "default gateway not available", category: "Connectivity" },
  { query: "internet keeps dropping randomly", category: "Connectivity" },
  // Login / IP
  { query: "192.168.1.1 not opening", category: "Login" },
  { query: "router admin panel login", category: "Login" },
  { query: "forgot router password", category: "Login" },
  { query: "10.0.0.1 access admin", category: "Login" },
  // DNS
  { query: "DNS server not responding", category: "DNS" },
  { query: "dns not resolving websites", category: "DNS" },
  // Hardware / Signal
  { query: "router blinking orange light", category: "Hardware" },
  { query: "5ghz wifi not showing up", category: "Hardware" },
  { query: "slow wifi speed", category: "Speed" },
  // Router-specific
  { query: "TP-Link Archer C6 setup", category: "Router" },
  { query: "ASUS RT-AX88U firmware", category: "Router" },
];

// ─── Simplified keyword-based retrieval (mirrors real Tier 1 logic) ───────────
function tokenize(text: string): Set<string> {
  const STOP = new Set(["the", "is", "at", "on", "and", "a", "to", "in", "of", "for", "with", "as", "by", "not", "no"]);
  return new Set(text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
}

function scoreChunkForQuery(chunkContent: string, query: string): number {
  const queryTokens = tokenize(query);
  const chunkTokens = tokenize(chunkContent);
  let matches = 0;
  for (const qt of queryTokens) {
    if (chunkTokens.has(qt)) matches++;
  }
  return queryTokens.size > 0 ? matches / queryTokens.size : 0;
}

// ─── Run benchmarks ───────────────────────────────────────────────────────────
async function runBenchmark() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║          RETRIEVAL BENCHMARK SUITE                      ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Fetch all chunks into memory for local scoring
  const allChunks = await prisma.semanticChunk.findMany({
    select: { id: true, chunkId: true, entityType: true, chunkType: true, title: true, content: true, priorityScore: true },
  });

  console.log(`📦 Chunk Index Size: ${allChunks.length} chunks\n`);

  const results: Array<{
    query: string; category: string;
    tier: 0 | 1 | 2;
    latencyMs: number;
    topScore: number;
    topChunk: string;
  }> = [];

  for (const { query, category } of TEST_QUERIES) {
    const start = Date.now();

    // Score all chunks
    const scored = allChunks
      .map((c) => ({
        chunk: c,
        score: scoreChunkForQuery(c.content + " " + (c.title || ""), query) * c.priorityScore,
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    const latencyMs = Date.now() - start;
    const topResult = scored[0];

    // Tier assignment
    let tier: 0 | 1 | 2 = 2;
    if (topResult && topResult.score >= 0.6) tier = 0; // Near-perfect match
    else if (topResult && topResult.score >= 0.25) tier = 1; // Good match
    else tier = 2; // Fallback

    // Record to DB
    await prisma.retrievalMetric.create({
      data: {
        query,
        latencyMs,
        fallbackTriggered: tier === 2,
        reranked: scored.length > 1,
        tierUsed: tier,
        resultsReturned: scored.length,
      },
    });

    results.push({
      query, category, tier, latencyMs,
      topScore: topResult?.score ?? 0,
      topChunk: topResult?.chunk.title || "NO MATCH",
    });
  }

  // ── Coverage Snapshot ────────────────────────────────────────────────────────
  const snapshot = await RetrievalCoverageService.generateCoverageSnapshot();

  // ── Results Table ────────────────────────────────────────────────────────────
  const tier0Count = results.filter((r) => r.tier === 0).length;
  const tier1Count = results.filter((r) => r.tier === 1).length;
  const tier2Count = results.filter((r) => r.tier === 2).length;
  const avgLatency = Math.round(results.reduce((s, r) => s + r.latencyMs, 0) / results.length);
  const tier1PlusRate = Math.round(((tier0Count + tier1Count) / results.length) * 100);

  console.log("━━━ QUERY-LEVEL RESULTS ━━━");
  for (const r of results) {
    const tierIcon = r.tier === 0 ? "🔵 T0" : r.tier === 1 ? "🟢 T1" : "🔴 T2";
    const scoreStr = (r.topScore * 100).toFixed(0).padStart(3) + "%";
    console.log(`  ${tierIcon} | ${scoreStr} | ${r.query.padEnd(40)} → "${r.topChunk.substring(0, 40)}"`);
  }

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║              BENCHMARK SUMMARY                          ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log(`║ Total Queries    : ${String(results.length).padEnd(38)}║`);
  console.log(`║ 🔵 Tier 0 Hits  : ${String(tier0Count + ` (${Math.round(tier0Count/results.length*100)}%)`).padEnd(38)}║`);
  console.log(`║ 🟢 Tier 1 Hits  : ${String(tier1Count + ` (${Math.round(tier1Count/results.length*100)}%)`).padEnd(38)}║`);
  console.log(`║ 🔴 Tier 2 Falls : ${String(tier2Count + ` (${Math.round(tier2Count/results.length*100)}%)`).padEnd(38)}║`);
  console.log(`║ T0+T1 Success   : ${String(tier1PlusRate + "%").padEnd(38)}║`);
  console.log(`║ Avg Latency     : ${String(avgLatency + "ms").padEnd(38)}║`);
  console.log(`║ Chunk Index     : ${String(allChunks.length + " chunks").padEnd(38)}║`);
  console.log(`║ Entity Coverage : ${String(snapshot.tier1EligibilityRate + "% Tier 1 eligible").padEnd(38)}║`);
  console.log("╠══════════════════════════════════════════════════════════╣");
  const targetMet = tier1PlusRate >= 70;
  console.log(`║ Target (>70%)   : ${String(targetMet ? "✅ TARGET MET — Ready for Stage I-B" : `❌ ${tier1PlusRate}% — Backfill more chunks`).padEnd(38)}║`);
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Coverage gaps
  if (snapshot.criticalGaps.length > 0) {
    console.log("🚨 Entities still needing chunks:");
    snapshot.criticalGaps.slice(0, 8).forEach((e) =>
      console.log(`   [${e.entityType}] ${e.title} — ${e.chunkCount} chunks, readiness: ${e.retrievalReadinessScore}%`)
    );
  }
}

runBenchmark().catch(console.error).finally(() => process.exit(0));
