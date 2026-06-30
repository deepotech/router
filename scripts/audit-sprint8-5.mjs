/**
 * Sprint 8.5 — Comprehensive SEO Audit Script
 * Covers: Internal Links, Schema, Metadata, Sitemap, Robots, Cannibalization
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(ROOT, "src", "app");

// ─── Helpers ────────────────────────────────────────────────
function readFile(filePath) {
  try { return fs.readFileSync(filePath, "utf-8"); } catch { return null; }
}

function getPageDirs(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    // Skip Next.js special dirs and route groups
    if (name.startsWith("(") || name === "api" || name === "embed" || name === "admin") continue;
    const pageFile = path.join(dir, name, "page.tsx");
    if (fs.existsSync(pageFile)) {
      results.push({ slug: "/" + name, file: pageFile });
    }
  }
  return results;
}

// Extract all href links from a file
function extractHrefs(content) {
  const hrefRegex = /href=["']([^"']+)["']/g;
  const links = [];
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    const href = m[1];
    // Only internal links (start with /)
    if (href.startsWith("/") && !href.startsWith("//")) {
      links.push(href);
    }
  }
  return [...new Set(links)];
}

// Extract metadata title and description
function extractMetadata(content) {
  const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
  const descMatch = content.match(/description:\s*\n?\s*["'`]([^"'`]{10,})/s);
  const canonicalMatch = content.match(/canonical:\s*["'`]([^"'`]+)["'`]/);
  const ogMatch = content.match(/openGraph/);
  const twitterMatch = content.match(/twitter/i);
  return {
    title: titleMatch ? titleMatch[1].trim() : null,
    description: descMatch ? descMatch[1].trim().slice(0, 80) : null,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    hasOG: !!ogMatch,
    hasTwitter: !!twitterMatch,
  };
}

// Extract JSON-LD schema types
function extractSchemas(content) {
  const typeRegex = /"@type":\s*["']([A-Za-z]+)["']/g;
  const types = [];
  let m;
  while ((m = typeRegex.exec(content)) !== null) {
    types.push(m[1]);
  }
  return types;
}

function extractFaqs(content) {
  return (content.match(/FAQPage/g) || []).length;
}

function extractTechArticles(content) {
  return (content.match(/TechArticle/g) || []).length;
}

function hasJsonLd(content) {
  return content.includes("JsonLd") || content.includes("json-ld");
}

function extractBreadcrumbs(content) {
  return content.includes("breadcrumbs") || content.includes("Breadcrumb");
}

// ─── Main Audit ─────────────────────────────────────────────
const pages = getPageDirs(APP_DIR);
console.log(`\n📊 Sprint 8.5 SEO Audit — ${pages.length} pages found\n`);

// Build lookup: slug → incoming links count
const incomingLinks = {};
const outgoingLinksMap = {};
const metadataMap = {};
const schemaMap = {};
const duplicateTitles = {};
const duplicateDescs = {};
const issues = [];

// 1) Parse all pages
for (const page of pages) {
  const content = readFile(page.file);
  if (!content) continue;

  const outgoing = extractHrefs(content);
  const meta = extractMetadata(content);
  const schemas = extractSchemas(content);
  const faqCount = extractFaqs(content);
  const techCount = extractTechArticles(content);
  const hasBreadcrumb = extractBreadcrumbs(content);

  outgoingLinksMap[page.slug] = outgoing;
  metadataMap[page.slug] = { ...meta, faqCount, techCount, hasBreadcrumb, schemas };

  // Track incoming
  for (const href of outgoing) {
    const clean = href.split("?")[0].split("#")[0];
    if (!incomingLinks[clean]) incomingLinks[clean] = [];
    incomingLinks[clean].push(page.slug);
  }
}

// 2) Internal Link Audit
console.log("═══════════════════════════════════════════════════════");
console.log("1️⃣  INTERNAL LINK AUDIT");
console.log("═══════════════════════════════════════════════════════");

const orphanPages = [];
const hubPages = ["/router-login", "/router-login-recovery", "/router-password", "/router-login-hostnames"];

for (const page of pages) {
  const incoming = incomingLinks[page.slug] || [];
  const outgoing = outgoingLinksMap[page.slug] || [];
  if (incoming.length === 0) {
    orphanPages.push(page.slug);
  }
}

console.log(`\n🔗 Hub Pages — incoming links:`);
for (const hub of hubPages) {
  const inc = incomingLinks[hub] || [];
  console.log(`   ${hub}: ${inc.length} incoming links`);
}

console.log(`\n⚠️  Orphan Pages (0 internal incoming links): ${orphanPages.length}`);
for (const p of orphanPages.slice(0, 20)) {
  console.log(`   ${p}`);
}
if (orphanPages.length > 20) console.log(`   ... and ${orphanPages.length - 20} more`);

// Pages with most outgoing to hub
console.log(`\n📤 Pages with fewest outgoing links (potential isolation):`);
const sortedOutgoing = pages
  .map(p => ({ slug: p.slug, count: (outgoingLinksMap[p.slug] || []).length }))
  .sort((a, b) => a.count - b.count)
  .slice(0, 10);
for (const p of sortedOutgoing) {
  console.log(`   ${p.slug}: ${p.count} outgoing links`);
}

// 3) Schema Audit
console.log("\n═══════════════════════════════════════════════════════");
console.log("2️⃣  SCHEMA AUDIT");
console.log("═══════════════════════════════════════════════════════");

const schemaIssues = [];
for (const page of pages) {
  const m = metadataMap[page.slug];
  if (!m) continue;

  if (m.faqCount > 1) {
    schemaIssues.push({ slug: page.slug, issue: `Duplicate FAQPage (${m.faqCount}x)` });
  }
  if (m.techCount > 1) {
    schemaIssues.push({ slug: page.slug, issue: `Duplicate TechArticle (${m.techCount}x)` });
  }
  if (!hasJsonLd(readFile(page.file) || "")) {
    schemaIssues.push({ slug: page.slug, issue: "No JSON-LD found" });
  }
}

if (schemaIssues.length === 0) {
  console.log("\n✅ No schema duplication issues found.");
} else {
  console.log(`\n⚠️  Schema issues (${schemaIssues.length}):`);
  for (const s of schemaIssues) {
    console.log(`   [${s.slug}] ${s.issue}`);
  }
}

// Schema type distribution
const allSchemaTypes = {};
for (const page of pages) {
  const m = metadataMap[page.slug];
  if (!m) continue;
  for (const type of m.schemas) {
    allSchemaTypes[type] = (allSchemaTypes[type] || 0) + 1;
  }
}
console.log("\n📋 Schema type distribution:");
for (const [type, count] of Object.entries(allSchemaTypes).sort((a, b) => b[1] - a[1])) {
  console.log(`   ${type}: ${count} pages`);
}

// 4) Metadata Audit
console.log("\n═══════════════════════════════════════════════════════");
console.log("3️⃣  METADATA AUDIT");
console.log("═══════════════════════════════════════════════════════");

const titlesSet = {};
const descsSet = {};
const metaIssues = [];

for (const page of pages) {
  const m = metadataMap[page.slug];
  if (!m) continue;

  if (!m.title) {
    metaIssues.push({ slug: page.slug, issue: "Missing title" });
  } else {
    if (titlesSet[m.title]) {
      metaIssues.push({ slug: page.slug, issue: `Duplicate title: "${m.title.slice(0, 50)}"` });
    }
    titlesSet[m.title] = page.slug;
  }

  if (!m.description) {
    metaIssues.push({ slug: page.slug, issue: "Missing description" });
  } else {
    if (descsSet[m.description]) {
      metaIssues.push({ slug: page.slug, issue: `Duplicate description` });
    }
    descsSet[m.description] = page.slug;
  }

  if (!m.canonical) {
    metaIssues.push({ slug: page.slug, issue: "Missing canonical" });
  }

  if (!m.hasOG) {
    metaIssues.push({ slug: page.slug, issue: "No OG tags" });
  }

  if (!m.hasBreadcrumb) {
    metaIssues.push({ slug: page.slug, issue: "No Breadcrumb" });
  }
}

console.log(`\n⚠️  Metadata issues: ${metaIssues.length}`);
const grouped = {};
for (const issue of metaIssues) {
  if (!grouped[issue.issue.split(":")[0]]) grouped[issue.issue.split(":")[0]] = [];
  grouped[issue.issue.split(":")[0]].push(issue.slug);
}
for (const [type, pages_] of Object.entries(grouped)) {
  console.log(`\n   [${type}] — ${pages_.length} pages:`);
  for (const p of pages_.slice(0, 8)) console.log(`     ${p}`);
  if (pages_.length > 8) console.log(`     ... and ${pages_.length - 8} more`);
}

// 5) Sitemap Audit
console.log("\n═══════════════════════════════════════════════════════");
console.log("4️⃣  SITEMAP AUDIT");
console.log("═══════════════════════════════════════════════════════");

const sitemapContent = readFile(path.join(APP_DIR, "sitemap.ts")) || "";
const sitemapUrls = [];
const urlRegex = /`\$\{APP_URL\}([^`"]+)`|["']https:\/\/[^"']+["']/g;
let sm;
while ((sm = urlRegex.exec(sitemapContent)) !== null) {
  if (sm[1]) sitemapUrls.push(sm[1]);
}

const notInSitemap = [];
for (const page of pages) {
  const inSitemap = sitemapUrls.some(u => u === page.slug || u.startsWith(page.slug + "/"));
  if (!inSitemap) notInSitemap.push(page.slug);
}

console.log(`\n📄 Sitemap URL entries extracted: ~${sitemapUrls.length}`);
console.log(`📑 Static page dirs: ${pages.length}`);
console.log(`\n⚠️  Pages possibly missing from sitemap (${notInSitemap.length}):`);
for (const p of notInSitemap.slice(0, 30)) {
  console.log(`   ${p}`);
}
if (notInSitemap.length > 30) console.log(`   ... and ${notInSitemap.length - 30} more`);

// 6) Robots Audit
console.log("\n═══════════════════════════════════════════════════════");
console.log("5️⃣  ROBOTS AUDIT");
console.log("═══════════════════════════════════════════════════════");

const robotsInApp = readFile(path.join(APP_DIR, "robots.ts")) ||
                    readFile(path.join(APP_DIR, "..", "public", "robots.txt"));

if (robotsInApp) {
  console.log("\n✅ robots.ts/txt found:");
  console.log(robotsInApp.slice(0, 500));
} else {
  console.log("\n⚠️  No robots.ts or robots.txt found!");
  issues.push("CRITICAL: No robots.txt/ts configuration found");
}

// Check for noindex usage
const noindexFiles = [];
for (const page of pages) {
  const content = readFile(page.file) || "";
  if (content.includes("noindex") || content.includes("robots: { index: false")) {
    noindexFiles.push(page.slug);
  }
}
console.log(`\n🔍 Pages with noindex: ${noindexFiles.length}`);
for (const p of noindexFiles) console.log(`   ${p}`);

// 7) Summary
console.log("\n═══════════════════════════════════════════════════════");
console.log("📊 SPRINT 8.5 SUMMARY");
console.log("═══════════════════════════════════════════════════════");
console.log(`\n  Total pages audited:        ${pages.length}`);
console.log(`  Orphan pages:               ${orphanPages.length}`);
console.log(`  Schema issues:              ${schemaIssues.length}`);
console.log(`  Metadata issues:            ${metaIssues.length}`);
console.log(`  Pages missing from sitemap: ${notInSitemap.length}`);
console.log(`  noindex pages:              ${noindexFiles.length}`);
console.log(`  Critical issues:            ${issues.length}`);

console.log("\n✅ Audit complete.\n");
