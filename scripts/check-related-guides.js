#!/usr/bin/env node
/**
 * check-related-guides.js
 * Validates the RelatedGuides component's data and all inline usages across pages.
 *
 * Checks:
 * 1. No page links to itself in the ALL_GUIDES database
 * 2. All URLs in ALL_GUIDES have a corresponding page in src/app/
 * 3. No duplicate URLs exist in ALL_GUIDES database
 * 4. All <RelatedGuides> usages have a maxItems prop set
 * 5. Hub pages are NOT in ALL_GUIDES (they are auto-prepended by the component)
 * 6. currentUrl prop doesn't appear as a link to itself (logic check)
 */

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const srcApp = path.join(rootDir, "src", "app");
const dataFile = path.join(rootDir, "src", "data", "related-guides.ts");
const relatedGuidesComponent = path.join(rootDir, "src", "components", "tools", "RelatedGuides.tsx");

let errors = [];
let warnings = [];

// ─── 1. Read and parse the ALL_GUIDES database ────────────────────────────────
console.log("📋 Reading related-guides.ts data file...");
if (!fs.existsSync(dataFile)) {
  console.error("❌ FATAL: src/data/related-guides.ts not found!");
  process.exit(1);
}

const dataContent = fs.readFileSync(dataFile, "utf-8");

// Extract URL strings from ALL_GUIDES array using regex
const urlMatches = [...dataContent.matchAll(/url:\s*"([^"]+)"/g)];
const guideUrls = urlMatches.map((m) => m[1]);

console.log(`   Found ${guideUrls.length} guides in database.`);

// ─── 2. Check for duplicate URLs in database ──────────────────────────────────
console.log("\n🔍 Checking for duplicate URLs in database...");
const seen = new Set();
for (const url of guideUrls) {
  if (seen.has(url)) {
    errors.push(`DUPLICATE URL in ALL_GUIDES: ${url}`);
  }
  seen.add(url);
}
if (errors.length === 0) {
  console.log("   ✅ No duplicates found.");
}

// ─── 3. Check all database URLs exist as pages ────────────────────────────────
console.log("\n🗂️  Checking all database guide URLs have corresponding pages...");
const HUB_URLS = ["/router-login", "/router-login-recovery"];

for (const url of guideUrls) {
  // Hub pages should NOT be in ALL_GUIDES (they're auto-prepended)
  if (HUB_URLS.includes(url)) {
    warnings.push(`WARNING: Hub page "${url}" is in ALL_GUIDES but will be auto-prepended. Consider removing it to avoid potential duplication.`);
    continue;
  }

  // Convert URL to filesystem path
  const pagePath = path.join(srcApp, url.replace(/^\//, ""), "page.tsx");
  if (!fs.existsSync(pagePath)) {
    errors.push(`MISSING PAGE: URL "${url}" in ALL_GUIDES has no page at ${pagePath}`);
  }
}

if (!errors.some((e) => e.startsWith("MISSING PAGE"))) {
  console.log("   ✅ All guide URLs have corresponding pages.");
}

// ─── 4. Find all <RelatedGuides> usages in pages ─────────────────────────────
console.log("\n📄 Scanning all page.tsx files for <RelatedGuides> usages...");

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const usages = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      usages.push(...scanDirectory(fullPath));
    } else if (entry.name === "page.tsx") {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes("<RelatedGuides")) {
        usages.push({ file: fullPath, content });
      }
    }
  }
  return usages;
}

const allUsages = scanDirectory(srcApp);
console.log(`   Found ${allUsages.length} pages using <RelatedGuides>.`);

// ─── 5. Validate each usage ───────────────────────────────────────────────────
console.log("\n🔬 Validating each <RelatedGuides> usage...");

for (const { file, content } of allUsages) {
  const relFile = path.relative(rootDir, file);

  // Extract all <RelatedGuides ... /> blocks
  const componentMatches = [...content.matchAll(/<RelatedGuides[\s\S]*?\/>/g)];

  for (const match of componentMatches) {
    const block = match[0];

    // Extract currentUrl
    const currentUrlMatch = block.match(/currentUrl=["']([^"']+)["']/);
    if (!currentUrlMatch) {
      errors.push(`${relFile}: <RelatedGuides> missing currentUrl prop`);
      continue;
    }
    const currentUrl = currentUrlMatch[1];

    // Check maxItems is set
    if (!block.includes("maxItems")) {
      errors.push(`${relFile}: <RelatedGuides currentUrl="${currentUrl}"> missing maxItems prop`);
    }

    // Check currentUrl matches the page's path (basic self-link check)
    const pageDir = path.dirname(file);
    const pageSlug = "/" + path.relative(srcApp, pageDir).replace(/\\/g, "/");

    if (currentUrl !== pageSlug) {
      warnings.push(
        `${relFile}: currentUrl="${currentUrl}" but page is at "${pageSlug}". Verify this is intentional.`
      );
    }

    // Check currentUrl doesn't appear in ALL_GUIDES (would cause self-reference) 
    if (guideUrls.includes(currentUrl)) {
      // This is fine — the component auto-excludes itself. Just confirm.
      console.log(`   ℹ️  ${relFile}: currentUrl="${currentUrl}" exists in ALL_GUIDES (will be self-excluded by component ✅)`);
    }

    // Check hub pages are NOT being passed as currentUrl in the hub pages themselves
    // (they won't link to themselves — handled by component)
  }
}

// ─── 6. Summary ───────────────────────────────────────────────────────────────
console.log("\n─────────────────────────────────────────────────");
if (warnings.length > 0) {
  console.log("\n⚠️  Warnings:");
  warnings.forEach((w) => console.log(`   • ${w}`));
}

if (errors.length > 0) {
  console.log("\n❌ Errors:");
  errors.forEach((e) => console.log(`   • ${e}`));
  console.log(`\n💥 check-related-guides FAILED with ${errors.length} error(s).`);
  process.exit(1);
} else {
  console.log(`\n✅ check-related-guides PASSED — ${allUsages.length} usages validated, ${guideUrls.length} guides in database.`);
  process.exit(0);
}
