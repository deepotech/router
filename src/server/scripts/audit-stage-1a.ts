import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";
import { RetrievalDensityService } from "../services/retrieval-density.service";
import { SemanticOverlapService } from "../services/semantic-overlap.service";
import { HallucinationDetectionService } from "../services/hallucination-detection.service";
import { QualityService } from "../services/quality.service";
import * as fs from "fs";
import * as path from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EntityAuditResult {
  id: number;
  entityType: "PROBLEM" | "IP" | "ROUTER";
  title: string;
  slug: string;
  status: string;
  category: string | null;
  wordCount: number;
  // Scores (0-100 unless noted)
  densityScore: number;
  qualityScore: number;
  hallucinationFlag: boolean;
  hallucinationScore: number; // 0.0=clean, 1.0=flagged
  overlapScore: number; // 0.0=unique, 1.0=duplicate
  crawlRisk: "LOW" | "MEDIUM" | "HIGH";
  // Tier potential
  tier0Potential: "HIGH" | "MEDIUM" | "LOW";
  tier1Coverage: boolean;
  cacheabilityScore: number;
  semanticUniqueness: number; // 0-100
  // Recommendations
  recommendation: "APPROVE" | "REVIEW" | "REJECT";
  issues: string[];
  strengths: string[];
}

interface AuditReport {
  generatedAt: string;
  summary: {
    total: number;
    approved: number;
    needsReview: number;
    rejected: number;
    avgDensity: number;
    avgQuality: number;
    avgOverlap: number;
    hallucinationFlags: number;
  };
  rolloutHealth: {
    tier0HitPotential: string;
    tier1DeterministicCoverage: number;
    semanticReuseProjection: string;
    cacheabilityAvg: number;
    canonicalHubCandidates: string[];
    recommendation: "ACCELERATE" | "THROTTLE" | "LIMITED";
    nextCohortSize: number;
    highestValueCluster: string;
  };
  entities: EntityAuditResult[];
  weakEntities: EntityAuditResult[];
  bestEntities: EntityAuditResult[];
  duplicateIntents: Array<{ titleA: string; titleB: string; similarity: number }>;
  thinContentRisks: EntityAuditResult[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getWordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function tokenize(text: string): Set<string> {
  const STOP = new Set(["the", "is", "at", "which", "on", "and", "a", "to", "in", "of", "for", "with", "as", "by"]);
  return new Set(
    text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w))
  );
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = tokenize(a);
  const setB = tokenize(b);
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const w of setA) if (setB.has(w)) intersection++;
  return intersection / (setA.size + setB.size - intersection);
}

function calcCrawlRisk(wordCount: number, overlapScore: number, density: number): "LOW" | "MEDIUM" | "HIGH" {
  if (wordCount < 100 || overlapScore > 0.7) return "HIGH";
  if (wordCount < 200 || overlapScore > 0.5 || density < 30) return "MEDIUM";
  return "LOW";
}

function calcTier0Potential(density: number, wordCount: number, quality: number): "HIGH" | "MEDIUM" | "LOW" {
  const combined = (density + quality) / 2;
  if (combined >= 75 && wordCount >= 200) return "HIGH";
  if (combined >= 50) return "MEDIUM";
  return "LOW";
}

function calcCacheability(density: number, overlapScore: number, quality: number): number {
  // High density + unique + high quality = highly cacheable
  const uniqueness = (1 - overlapScore) * 100;
  return Math.round((density * 0.4 + uniqueness * 0.3 + quality * 0.3));
}

// ─── Main Audit ───────────────────────────────────────────────────────────────

async function auditStage1A(): Promise<void> {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║     STAGE I-A GOVERNANCE VALIDATION & QUALITY AUDIT     ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // 1. Fetch all entities — Stage I-A used PUBLISHED status (seed script published directly)
  const [problems, ips, routers, chunks, intentRelations, retrievalMetrics] = await Promise.all([
    prisma.problem.findMany({
      where: { status: { in: ["PUBLISHED", "STAGED", "REVIEWED"] } },
      select: { id: true, title: true, slug: true, content: true, excerpt: true, diagnosticCategory: true, status: true },
    }),
    prisma.ipAddress.findMany({
      where: { status: { in: ["PUBLISHED", "STAGED", "REVIEWED"] } },
      select: { id: true, address: true, slug: true, description: true, loginGuide: true, diagnosticCategory: true, status: true },
    }),
    prisma.routerModel.findMany({
      where: { status: { in: ["PUBLISHED", "STAGED", "REVIEWED"] } },
      select: { id: true, name: true, slug: true, wifiSetupGuide: true, resetGuide: true, diagnosticCategory: true, status: true },
    }),
    prisma.semanticChunk.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { id: true, chunkId: true, entityType: true, content: true, title: true, priorityScore: true, tokenEstimate: true },
    }),
    prisma.retrievalIntentRelation.findMany({
      select: { resolvedByChunkId: true, reuseCount: true, resolutionScore: true },
    }),
    prisma.retrievalMetric.findMany({
      orderBy: { createdAt: "desc" }, take: 50,
      select: { query: true, tierUsed: true, latencyMs: true, fallbackTriggered: true },
    }),
  ]);

  console.log(`📊 Fetched: ${problems.length} Problems | ${ips.length} IPs | ${routers.length} Routers`);
  console.log(`📦 Semantic Chunks: ${chunks.length} | Intent Relations: ${intentRelations.length}\n`);

  const results: EntityAuditResult[] = [];

  // ── Audit PROBLEMS ──────────────────────────────────────────────────────────
  console.log("🔍 Auditing Problems...");
  for (const p of problems) {
    const text = `${p.title} ${p.excerpt} ${p.content}`;
    const wordCount = getWordCount(text);
    const density = RetrievalDensityService.calculateDensity(text, "troubleshooting");
    const quality = QualityService.evaluateContent(p.content, "GUIDE");
    const hallucinationScore = HallucinationDetectionService.evaluateEntityPayload({ textContent: text });
    const hallucinationFlag = hallucinationScore > 0.3;

    // Pairwise overlap vs other problem contents
    let maxOverlap = 0;
    for (const other of problems) {
      if (other.id === p.id) continue;
      const sim = jaccardSimilarity(text, `${other.title} ${other.content}`);
      if (sim > maxOverlap) maxOverlap = sim;
    }

    const crawlRisk = calcCrawlRisk(wordCount, maxOverlap, density.score);
    const tier0 = calcTier0Potential(density.score, wordCount, quality.score);
    const cacheability = calcCacheability(density.score, maxOverlap, quality.score);
    const semanticUniqueness = Math.round((1 - maxOverlap) * 100);

    const issues: string[] = [...quality.issues];
    const strengths: string[] = [];
    if (wordCount < 150) issues.push("Thin content (<150 words)");
    if (hallucinationFlag) issues.push(`Hallucination risk (score: ${hallucinationScore.toFixed(2)})`);
    if (maxOverlap > 0.6) issues.push(`High overlap with another problem (${(maxOverlap * 100).toFixed(0)}%)`);
    if (density.score > 70) strengths.push("High retrieval density");
    if (quality.score >= 80) strengths.push("Quality check passed");
    if (crawlRisk === "LOW") strengths.push("Low crawl risk");

    let recommendation: "APPROVE" | "REVIEW" | "REJECT" = "APPROVE";
    if (crawlRisk === "HIGH" || hallucinationFlag) recommendation = "REJECT";
    else if (crawlRisk === "MEDIUM" || quality.score < 70 || density.score < 40) recommendation = "REVIEW";

    results.push({
      id: p.id, entityType: "PROBLEM", title: p.title, slug: p.slug,
      status: p.status, category: p.diagnosticCategory,
      wordCount, densityScore: Math.round(density.score), qualityScore: quality.score,
      hallucinationFlag, hallucinationScore, overlapScore: maxOverlap,
      crawlRisk, tier0Potential: tier0, tier1Coverage: wordCount >= 150,
      cacheabilityScore: cacheability, semanticUniqueness,
      recommendation, issues, strengths,
    });
  }

  // ── Audit IPs ───────────────────────────────────────────────────────────────
  console.log("🔍 Auditing IPs...");
  for (const ip of ips) {
    const text = `${ip.address} ${ip.description} ${ip.loginGuide}`;
    const wordCount = getWordCount(text);
    const density = RetrievalDensityService.calculateDensity(text, "login");
    const quality = QualityService.evaluateContent(ip.loginGuide || ip.description, "GUIDE");
    const hallucinationScore = HallucinationDetectionService.evaluateEntityPayload({
      ips: [ip.address], textContent: text,
    });
    const hallucinationFlag = hallucinationScore > 0;

    let maxOverlap = 0;
    for (const other of ips) {
      if (other.id === ip.id) continue;
      const sim = jaccardSimilarity(text, `${other.address} ${other.description}`);
      if (sim > maxOverlap) maxOverlap = sim;
    }

    const crawlRisk = calcCrawlRisk(wordCount, maxOverlap, density.score);
    const tier0 = calcTier0Potential(density.score, wordCount, quality.score);
    const cacheability = calcCacheability(density.score, maxOverlap, quality.score);
    const issues: string[] = [...quality.issues];
    const strengths: string[] = [];
    if (hallucinationFlag) issues.push("Invalid IP address format detected");
    else strengths.push("Valid IP address format ✓");
    if (density.score > 60) strengths.push("Good technical signal density");

    let recommendation: "APPROVE" | "REVIEW" | "REJECT" = "APPROVE";
    if (hallucinationFlag) recommendation = "REJECT";
    else if (crawlRisk === "MEDIUM" || quality.score < 70) recommendation = "REVIEW";

    results.push({
      id: ip.id, entityType: "IP", title: ip.address, slug: ip.slug,
      status: ip.status, category: ip.diagnosticCategory,
      wordCount, densityScore: Math.round(density.score), qualityScore: quality.score,
      hallucinationFlag, hallucinationScore, overlapScore: maxOverlap,
      crawlRisk, tier0Potential: tier0, tier1Coverage: wordCount >= 100,
      cacheabilityScore: cacheability, semanticUniqueness: Math.round((1 - maxOverlap) * 100),
      recommendation, issues, strengths,
    });
  }

  // ── Audit ROUTERS ───────────────────────────────────────────────────────────
  console.log("🔍 Auditing Routers...\n");
  for (const r of routers) {
    const text = `${r.name} ${r.wifiSetupGuide} ${r.resetGuide}`;
    const wordCount = getWordCount(text);
    const density = RetrievalDensityService.calculateDensity(text, "specification");
    const quality = QualityService.evaluateContent(r.wifiSetupGuide, "GUIDE");
    const hallucinationScore = HallucinationDetectionService.evaluateEntityPayload({ textContent: text });
    const hallucinationFlag = hallucinationScore > 0.3;

    let maxOverlap = 0;
    for (const other of routers) {
      if (other.id === r.id) continue;
      const sim = jaccardSimilarity(text, `${other.name} ${other.wifiSetupGuide}`);
      if (sim > maxOverlap) maxOverlap = sim;
    }

    const crawlRisk = calcCrawlRisk(wordCount, maxOverlap, density.score);
    const tier0 = calcTier0Potential(density.score, wordCount, quality.score);
    const cacheability = calcCacheability(density.score, maxOverlap, quality.score);
    const issues: string[] = [...quality.issues];
    const strengths: string[] = [];
    if (density.score > 65) strengths.push("Strong technical density");
    if (maxOverlap < 0.3) strengths.push("High semantic uniqueness");
    if (wordCount < 150) issues.push("Setup guide may be thin");

    let recommendation: "APPROVE" | "REVIEW" | "REJECT" = "APPROVE";
    if (crawlRisk === "HIGH" || hallucinationFlag) recommendation = "REJECT";
    else if (crawlRisk === "MEDIUM" || quality.score < 70) recommendation = "REVIEW";

    results.push({
      id: r.id, entityType: "ROUTER", title: r.name, slug: r.slug,
      status: r.status, category: r.diagnosticCategory,
      wordCount, densityScore: Math.round(density.score), qualityScore: quality.score,
      hallucinationFlag, hallucinationScore, overlapScore: maxOverlap,
      crawlRisk, tier0Potential: tier0, tier1Coverage: true,
      cacheabilityScore: cacheability, semanticUniqueness: Math.round((1 - maxOverlap) * 100),
      recommendation, issues, strengths,
    });
  }

  // ── Duplicate Intent Detection ──────────────────────────────────────────────
  const duplicateIntents: Array<{ titleA: string; titleB: string; similarity: number }> = [];
  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      if (results[i].entityType !== results[j].entityType) continue;
      const sim = jaccardSimilarity(results[i].title, results[j].title);
      if (sim > 0.5) {
        duplicateIntents.push({ titleA: results[i].title, titleB: results[j].title, similarity: sim });
      }
    }
  }

  // ── Canonical Hub Candidates (top cacheability + tier0=HIGH) ────────────────
  const hubCandidates = results
    .filter((r) => r.tier0Potential === "HIGH" && r.recommendation === "APPROVE")
    .sort((a, b) => b.cacheabilityScore - a.cacheabilityScore)
    .slice(0, 5)
    .map((r) => r.title);

  // ── Rollout Health Assessment ───────────────────────────────────────────────
  const approved = results.filter((r) => r.recommendation === "APPROVE").length;
  const needsReview = results.filter((r) => r.recommendation === "REVIEW").length;
  const rejected = results.filter((r) => r.recommendation === "REJECT").length;
  const avgDensity = results.reduce((s, r) => s + r.densityScore, 0) / (results.length || 1);
  const avgQuality = results.reduce((s, r) => s + r.qualityScore, 0) / (results.length || 1);
  const avgOverlap = results.reduce((s, r) => s + r.overlapScore, 0) / (results.length || 1);
  const avgCacheability = results.reduce((s, r) => s + r.cacheabilityScore, 0) / (results.length || 1);
  const hallucinationFlags = results.filter((r) => r.hallucinationFlag).length;
  const tier1Coverage = results.filter((r) => r.tier1Coverage).length;
  const approvalRate = approved / (results.length || 1);

  // Determine rollout recommendation
  let rolloutRec: "ACCELERATE" | "THROTTLE" | "LIMITED" = "LIMITED";
  if (approvalRate >= 0.85 && avgDensity >= 60 && hallucinationFlags === 0) rolloutRec = "ACCELERATE";
  else if (approvalRate >= 0.65 && avgDensity >= 45) rolloutRec = "THROTTLE";

  // Highest-value cluster
  const categoryCounts: Record<string, number> = {};
  results.filter((r) => r.recommendation === "APPROVE").forEach((r) => {
    const cat = r.category || r.entityType;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const highestValueCluster = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "PROBLEM";

  const report: AuditReport = {
    generatedAt: new Date().toISOString(),
    summary: {
      total: results.length,
      approved,
      needsReview,
      rejected,
      avgDensity: Math.round(avgDensity),
      avgQuality: Math.round(avgQuality),
      avgOverlap: Math.round(avgOverlap * 100),
      hallucinationFlags,
    },
    rolloutHealth: {
      tier0HitPotential: results.filter((r) => r.tier0Potential === "HIGH").length > results.length * 0.5 ? "HIGH" : "MEDIUM",
      tier1DeterministicCoverage: tier1Coverage,
      semanticReuseProjection: intentRelations.length > 10 ? "HIGH" : intentRelations.length > 3 ? "MEDIUM" : "LOW",
      cacheabilityAvg: Math.round(avgCacheability),
      canonicalHubCandidates: hubCandidates,
      recommendation: rolloutRec,
      nextCohortSize: rolloutRec === "ACCELERATE" ? 40 : rolloutRec === "THROTTLE" ? 25 : 10,
      highestValueCluster,
    },
    entities: results,
    weakEntities: results.filter((r) => r.recommendation !== "APPROVE").sort((a, b) => a.qualityScore - b.qualityScore).slice(0, 10),
    bestEntities: results.filter((r) => r.recommendation === "APPROVE").sort((a, b) => b.cacheabilityScore - a.cacheabilityScore).slice(0, 10),
    duplicateIntents,
    thinContentRisks: results.filter((r) => r.wordCount < 150 || r.crawlRisk === "HIGH"),
  };

  // ── Console Output ──────────────────────────────────────────────────────────
  console.log("┌─────────────────────────────────────────────────────────┐");
  console.log("│                  AUDIT SUMMARY                         │");
  console.log("├─────────────────────────────────────────────────────────┤");
  console.log(`│ Total Entities   : ${String(report.summary.total).padEnd(36)}│`);
  console.log(`│ ✅ APPROVE       : ${String(report.summary.approved).padEnd(36)}│`);
  console.log(`│ ⚠️  REVIEW        : ${String(report.summary.needsReview).padEnd(36)}│`);
  console.log(`│ ❌ REJECT        : ${String(report.summary.rejected).padEnd(36)}│`);
  console.log(`│ Avg Density      : ${String(report.summary.avgDensity + "/100").padEnd(36)}│`);
  console.log(`│ Avg Quality      : ${String(report.summary.avgQuality + "/100").padEnd(36)}│`);
  console.log(`│ Avg Overlap      : ${String(report.summary.avgOverlap + "%").padEnd(36)}│`);
  console.log(`│ Hallucination 🚨 : ${String(report.summary.hallucinationFlags).padEnd(36)}│`);
  console.log("└─────────────────────────────────────────────────────────┘\n");

  console.log("┌─────────────────────────────────────────────────────────┐");
  console.log("│                 ROLLOUT HEALTH REPORT                  │");
  console.log("├─────────────────────────────────────────────────────────┤");
  console.log(`│ Stage I-B Rec.   : ${String(report.rolloutHealth.recommendation).padEnd(36)}│`);
  console.log(`│ Next Cohort Size : ${String(report.rolloutHealth.nextCohortSize + " entities").padEnd(36)}│`);
  console.log(`│ Tier 0 Potential : ${String(report.rolloutHealth.tier0HitPotential).padEnd(36)}│`);
  console.log(`│ Tier 1 Coverage  : ${String(report.rolloutHealth.tier1DeterministicCoverage + " entities").padEnd(36)}│`);
  console.log(`│ Semantic Reuse   : ${String(report.rolloutHealth.semanticReuseProjection).padEnd(36)}│`);
  console.log(`│ Cacheability Avg : ${String(report.rolloutHealth.cacheabilityAvg + "/100").padEnd(36)}│`);
  console.log(`│ Best Cluster     : ${String(report.rolloutHealth.highestValueCluster).padEnd(36)}│`);
  console.log("└─────────────────────────────────────────────────────────┘\n");

  if (hubCandidates.length > 0) {
    console.log("🏛️  CANONICAL HUB CANDIDATES:");
    hubCandidates.forEach((h, i) => console.log(`   ${i + 1}. ${h}`));
    console.log();
  }

  if (duplicateIntents.length > 0) {
    console.log("⚠️  DUPLICATE INTENT PAIRS:");
    duplicateIntents.forEach((d) =>
      console.log(`   "${d.titleA}" ↔ "${d.titleB}" (${(d.similarity * 100).toFixed(0)}%)`)
    );
    console.log();
  }

  if (report.thinContentRisks.length > 0) {
    console.log("🚨 THIN CONTENT RISKS:");
    report.thinContentRisks.forEach((r) =>
      console.log(`   [${r.entityType}] ${r.title} — ${r.wordCount} words, risk: ${r.crawlRisk}`)
    );
    console.log();
  }

  console.log("\n📋 ENTITY-LEVEL RESULTS:");
  results.forEach((r) => {
    const icon = r.recommendation === "APPROVE" ? "✅" : r.recommendation === "REVIEW" ? "⚠️ " : "❌";
    console.log(`  ${icon} [${r.entityType}] ${r.title}`);
    console.log(`      Density: ${r.densityScore}/100 | Quality: ${r.qualityScore}/100 | Overlap: ${(r.overlapScore * 100).toFixed(0)}% | Crawl: ${r.crawlRisk} | Tier0: ${r.tier0Potential}`);
    if (r.issues.length > 0) console.log(`      Issues: ${r.issues.join("; ")}`);
  });

  // ── Retrieval Tier Performance Analysis ────────────────────────────────────
  if (retrievalMetrics.length > 0) {
    const tier1Hits = retrievalMetrics.filter((m) => m.tierUsed === 1).length;
    const tier2Hits = retrievalMetrics.filter((m) => m.tierUsed === 2).length;
    const fallbacks = retrievalMetrics.filter((m) => m.fallbackTriggered).length;
    const avgLatency = Math.round(retrievalMetrics.reduce((s, m) => s + m.latencyMs, 0) / retrievalMetrics.length);
    const tier1Rate = Math.round((tier1Hits / retrievalMetrics.length) * 100);

    console.log("┌─────────────────────────────────────────────────────────┐");
    console.log("│               RETRIEVAL TIER PERFORMANCE               │");
    console.log("├─────────────────────────────────────────────────────────┤");
    console.log(`│ Total Queries    : ${String(retrievalMetrics.length).padEnd(36)}│`);
    console.log(`│ Tier 1 Hits      : ${String(tier1Hits + ` (${tier1Rate}%)`).padEnd(36)}│`);
    console.log(`│ Tier 2 Fallbacks : ${String(tier2Hits).padEnd(36)}│`);
    console.log(`│ Fallback Trigger : ${String(fallbacks).padEnd(36)}│`);
    console.log(`│ Avg Latency      : ${String(avgLatency + "ms").padEnd(36)}│`);
    console.log(`│ Chunk Coverage   : ${String(chunks.length + " chunks in index").padEnd(36)}│`);
    console.log(`│ Gap Diagnosis    : ${String(tier1Rate < 50 ? "⚠️  More chunks needed" : "✅ Good coverage").padEnd(36)}│`);
    console.log("└─────────────────────────────────────────────────────────┘\n");

    // Add to report
    (report as any).retrievalPerformance = {
      totalQueries: retrievalMetrics.length,
      tier1Hits, tier2Hits, fallbacks, avgLatencyMs: avgLatency, tier1HitRate: tier1Rate,
      chunkIndexSize: chunks.length,
      diagnosis: tier1Rate < 50
        ? "CRITICAL: Tier 1 hit rate below 50%. Chunk index is too small. More semantic chunks needed."
        : tier1Rate < 75
        ? "WARNING: Tier 1 hit rate below 75%. Consider generating more targeted chunks."
        : "HEALTHY: Good Tier 1 coverage.",
    };
  }

  // ── Save JSON report ────────────────────────────────────────────────────────
  const reportPath = path.join(process.cwd(), "audit-stage-1a-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ Full report saved to: ${reportPath}`);
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║                   AUDIT COMPLETE                        ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

auditStage1A().catch(console.error).finally(() => process.exit(0));
