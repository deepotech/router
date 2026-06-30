/**
 * Sprint 8.5 — Detail: Orphan Pages & Internal Links incoming count
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(ROOT, "src", "app");

function readFile(f) { try { return fs.readFileSync(f, "utf-8"); } catch { return null; } }

function getPageDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith("(") && !["api","embed","admin","search","assistant","about","contact","disclaimer","terms-of-service","privacy-policy","editorial-policy"].includes(e.name))
    .filter(e => fs.existsSync(path.join(dir, e.name, "page.tsx")))
    .map(e => ({ slug: "/" + e.name, file: path.join(dir, e.name, "page.tsx") }));
}

function extractHrefs(content) {
  const re = /["'\u0060](\/[a-zA-Z0-9\-\/\.]+)["'\u0060]/g;
  const links = new Set();
  let m;
  while ((m = re.exec(content)) !== null) {
    const url = m[1].split("?")[0].split("#")[0];
    if (
      url !== "/" &&
      !url.startsWith("/api") &&
      !url.startsWith("/_") &&
      !url.startsWith("/routers/") &&
      !url.startsWith("/problems/") &&
      !url.startsWith("/ips/")
    ) {
      links.add(url);
    }
  }
  return [...links];
}

const pages = getPageDirs(APP_DIR);
const incomingLinks = {};
const outgoingLinksMap = {};

// Read brand-issues.ts config to map its links
const brandIssuesContent = readFile(path.join(ROOT, "src", "lib", "config", "brand-issues.ts")) || "";

for (const page of pages) {
  const content = readFile(page.file) || "";
  let outgoing = extractHrefs(content);

  // If this is a brand issue page, parse its corresponding section in brand-issues.ts
  const slugName = page.slug.substring(1); // remove leading slash
  if (content.includes("BrandIssueArticleShell") && brandIssuesContent.includes(slugName)) {
    const sectionRegex = new RegExp(`"${slugName}":\\s*{([^}]+)}`, "s");
    const sectionMatch = brandIssuesContent.match(sectionRegex);
    if (sectionMatch) {
      const configLinks = extractHrefs(sectionMatch[1]);
      outgoing = [...new Set([...outgoing, ...configLinks])];
    }
  }

  outgoingLinksMap[page.slug] = outgoing;
  for (const href of outgoing) {
    if (!incomingLinks[href]) incomingLinks[href] = [];
    incomingLinks[href].push(page.slug);
  }
}

// ─── All pages sorted by incoming link count ─────────────────
console.log("\n📈 ALL PAGES — Incoming internal links count (sorted):\n");
const allWithCounts = pages.map(p => ({
  slug: p.slug,
  incoming: (incomingLinks[p.slug] || []).length,
  outgoing: (outgoingLinksMap[p.slug] || []).length,
})).sort((a, b) => b.incoming - a.incoming);

for (const p of allWithCounts) {
  const status = p.incoming === 0 ? "🔴 ORPHAN" : p.incoming < 3 ? "🟡 WEAK" : "🟢";
  console.log(`  ${status.padEnd(14)} ${p.slug.padEnd(55)} in:${String(p.incoming).padStart(3)}  out:${String(p.outgoing).padStart(3)}`);
}
