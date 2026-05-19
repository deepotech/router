/**
 * RETRIEVAL STRESS TESTING SUITE
 * ==============================
 * Simulates high-entropy, noisy, and ambiguous queries against the index.
 * Verifies Tier 0 stability and measures degradation thresholds.
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";

const STRESS_QUERIES = [
  // 1. High Noise / Poor Spelling
  { q: "routr kep disconectng snd rebotin", expectedType: "PROBLEM" },
  { q: "cnt acess 19216811 admin oage", expectedType: "IP" },
  { q: "y wify so slow on fon but pc ok", expectedType: "PROBLEM" },
  { q: "tp archer c6 setup without netwrk", expectedType: "ROUTER" },
  { q: "blinking oraneg light no conect", expectedType: "PROBLEM" },

  // 2. Ambiguous Intents (Too Broad)
  { q: "internet broken", expectedType: "PROBLEM" },
  { q: "wifi issue", expectedType: "PROBLEM" },
  { q: "router not working", expectedType: "PROBLEM" },
  { q: "help with tp link", expectedType: "ROUTER" },
  { q: "admin login", expectedType: "IP" },

  // 3. Stage I-B Specific (Interference, Mesh, DNS)
  { q: "microwave kills my wifi connection", expectedType: "PROBLEM" },
  { q: "bluetooth headset drops internet", expectedType: "PROBLEM" },
  { q: "xfinity dns server not working", expectedType: "PROBLEM" },
  { q: "deco mesh red light", expectedType: "PROBLEM" },
  { q: "orbi satellite keeps disconnecting", expectedType: "PROBLEM" },
  { q: "windows says ip address conflict", expectedType: "PROBLEM" },
  { q: "how to downgrade asus firmware", expectedType: "PROBLEM" },
  { q: "bricked router during update", expectedType: "PROBLEM" },
  { q: "dhcp pool full", expectedType: "PROBLEM" },

  // 4. Overly Specific / Conversational
  { q: "I just bought an asus rt-ax88u and I don't know how to set it up", expectedType: "ROUTER" },
  { q: "My phone says connected to wifi but there is no internet connection at all", expectedType: "PROBLEM" },
  { q: "What do I do if my browser says DNS probe finished no internet", expectedType: "PROBLEM" },
  { q: "I forgot the password to 192.168.0.1 what is the default", expectedType: "IP" },
  { q: "Why does my 5ghz network disappear randomly", expectedType: "PROBLEM" },

  // 5. Extremely Short (1-2 words)
  { q: "192.168.1.1", expectedType: "IP" },
  { q: "archer ax73", expectedType: "ROUTER" },
  { q: "dns error", expectedType: "PROBLEM" },
  { q: "slow wifi", expectedType: "PROBLEM" },
  { q: "red light", expectedType: "PROBLEM" },
];

function tokenize(text: string): Set<string> {
  const STOP = new Set(["the", "is", "at", "on", "and", "a", "to", "in", "of", "for", "with", "as", "by", "my", "i", "how", "what", "do", "if", "why"]);
  return new Set(text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
}

function scoreChunkForQuery(chunkContent: string, query: string): number {
  const queryTokens = tokenize(query);
  const chunkTokens = tokenize(chunkContent);
  let matches = 0;
  for (const qt of queryTokens) {
    // Partial matching for typos/noise
    let matched = false;
    for (const ct of chunkTokens) {
      if (ct === qt || (ct.length > 4 && qt.length > 4 && (ct.includes(qt) || qt.includes(ct)))) {
        matched = true;
        break;
      }
    }
    if (matched) matches++;
  }
  return queryTokens.size > 0 ? matches / queryTokens.size : 0;
}

async function runStressTest() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║         RETRIEVAL STRESS TESTING SUITE                  ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const allChunks = await prisma.semanticChunk.findMany({
    select: { chunkId: true, entityType: true, chunkType: true, title: true, content: true, priorityScore: true },
  });

  console.log(`📦 Chunk Index Size: ${allChunks.length} chunks (Testing Entropy)\n`);

  const results = [];

  for (const test of STRESS_QUERIES) {
    const start = Date.now();

    const scored = allChunks
      .map((c) => ({
        chunk: c,
        score: scoreChunkForQuery(c.content + " " + (c.title || ""), test.q) * c.priorityScore,
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    const latencyMs = Date.now() - start;
    const topResult = scored[0];

    // Tier assignment based on noisy thresholds
    let tier: 0 | 1 | 2 = 2;
    if (topResult && topResult.score >= 0.5) tier = 0; // High confidence match
    else if (topResult && topResult.score >= 0.2) tier = 1; // Good match despite noise
    else tier = 2; // Fallback required

    results.push({
      query: test.q,
      tier,
      latencyMs,
      topScore: topResult?.score ?? 0,
      topChunk: topResult?.chunk.title || "NO MATCH",
    });
  }

  // ── Results Summary ────────────────────────────────────────────────────────────
  const tier0Count = results.filter((r) => r.tier === 0).length;
  const tier1Count = results.filter((r) => r.tier === 1).length;
  const tier2Count = results.filter((r) => r.tier === 2).length;
  const avgLatency = Math.round(results.reduce((s, r) => s + r.latencyMs, 0) / results.length);
  const tier1PlusRate = Math.round(((tier0Count + tier1Count) / results.length) * 100);

  for (const r of results) {
    const tierIcon = r.tier === 0 ? "🔵 T0" : r.tier === 1 ? "🟢 T1" : "🔴 T2";
    const scoreStr = (r.topScore * 100).toFixed(0).padStart(3) + "%";
    console.log(`  ${tierIcon} | ${scoreStr} | ${r.query.padEnd(50)} → "${r.topChunk.substring(0, 30)}"`);
  }

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║              STRESS TEST SUMMARY                        ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log(`║ Total Stress Queries : ${String(results.length).padEnd(33)}║`);
  console.log(`║ 🔵 Tier 0 Hits       : ${String(tier0Count + ` (${Math.round(tier0Count/results.length*100)}%)`).padEnd(33)}║`);
  console.log(`║ 🟢 Tier 1 Hits       : ${String(tier1Count + ` (${Math.round(tier1Count/results.length*100)}%)`).padEnd(33)}║`);
  console.log(`║ 🔴 Tier 2 Falls      : ${String(tier2Count + ` (${Math.round(tier2Count/results.length*100)}%)`).padEnd(33)}║`);
  console.log(`║ T0+T1 Success Rate   : ${String(tier1PlusRate + "%").padEnd(33)}║`);
  console.log(`║ Avg Latency          : ${String(avgLatency + "ms").padEnd(33)}║`);
  console.log("╠══════════════════════════════════════════════════════════╣");
  
  if (tier2Count > 0) {
    console.log("║ ⚠️  DEGRADATION DETECTED: Some queries falling to Tier 2 ║");
  } else {
    console.log("║ ✅ ENTROPY VALIDATED: High resilience against noise.    ║");
  }
  
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

runStressTest().catch(console.error).finally(() => process.exit(0));
