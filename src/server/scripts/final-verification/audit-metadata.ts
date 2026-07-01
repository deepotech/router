import fs from "fs";
import path from "path";

const APP_DIR = path.join(process.cwd(), "src", "app");

interface AuditResult {
  route: string;
  filePath: string;
  hasTitle: boolean;
  hasDescription: boolean;
  hasCanonical: boolean;
  hasOgImage: boolean;
  hasTwitterCard: boolean;
  title?: string;
  description?: string;
  canonical?: string;
  error?: string;
}

// Helper to recursively walk a directory
function walkDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (file === "page.tsx" || file === "page.ts") {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function auditMetadata() {
  console.log("=== Running Comprehensive Metadata Audit ===");

  const pageFiles = walkDir(APP_DIR);
  console.log(`Found ${pageFiles.length} page routes to audit.\n`);

  const results: AuditResult[] = [];
  const titles = new Map<string, string>(); // title -> route
  const descriptions = new Map<string, string>(); // description -> route

  for (const file of pageFiles) {
    const relativePath = path.relative(APP_DIR, file);
    const route = "/" + relativePath.replace(/\\/g, "/").replace(/\/page\.(tsx|ts)$/, "");
    
    // Skip admin and API routes
    if (route.startsWith("/admin") || route.startsWith("/api") || route.includes("(marketing)")) {
      continue;
    }

    const content = fs.readFileSync(file, "utf-8");

    // Regular expressions to extract metadata values
    const titleRegex = /title:\s*["'`]([^"'`]+)["'`]/;
    const descRegex = /description:\s*["'`]([^"'`]+)["'`]/;
    const canonicalRegex = /canonical:\s*["'`]([^"'`]+)["'`]/;
    const ogImageRegex = /ogImage:/;

    const isEmbedRoute = route.startsWith("/embed");

    // Also check for sibling layout.tsx which might hold metadata for client components
    const dir = path.dirname(file);
    const layoutPath = path.join(dir, "layout.tsx");
    let layoutContent = "";
    if (fs.existsSync(layoutPath)) {
      layoutContent = fs.readFileSync(layoutPath, "utf-8");
    }

    // Combine with layout
    const allContent = content + layoutContent;

    const titleMatch = allContent.match(titleRegex);
    const descMatch = allContent.match(descRegex);
    const canonicalMatch = allContent.match(canonicalRegex);

    const title = titleMatch ? titleMatch[1] : undefined;
    const description = descMatch ? descMatch[1] : undefined;
    const canonical = canonicalMatch ? canonicalMatch[1] : undefined;

    const hasBuildMetadataAnywhere = allContent.includes("buildMetadata(");
    const hasGenerateMetadataAnywhere = allContent.includes("generateMetadata(") || allContent.includes("generateMetadata ");
    const hasAlternatesCanonical = allContent.includes("alternates:") && (allContent.includes("canonical:"));
    const ogImageMatch = allContent.includes("ogImage:") || allContent.includes("og:image");

    const result: AuditResult = {
      route,
      filePath: relativePath,
      hasTitle: title !== undefined || hasGenerateMetadataAnywhere || hasBuildMetadataAnywhere,
      hasDescription: description !== undefined || hasGenerateMetadataAnywhere || hasBuildMetadataAnywhere,
      hasCanonical: canonical !== undefined || hasGenerateMetadataAnywhere || hasBuildMetadataAnywhere || hasAlternatesCanonical || isEmbedRoute,
      hasOgImage: ogImageMatch || hasGenerateMetadataAnywhere || hasBuildMetadataAnywhere,
      hasTwitterCard: allContent.includes("twitter:") || hasGenerateMetadataAnywhere || hasBuildMetadataAnywhere,
      title,
      description,
      canonical,
    };

    // Check duplicate titles
    if (title) {
      if (titles.has(title)) {
        result.error = `Duplicate Title with route: ${titles.get(title)}`;
      } else {
        titles.set(title, route);
      }
    }

    // Check duplicate descriptions
    if (description) {
      if (descriptions.has(description)) {
        result.error = (result.error ? result.error + "; " : "") + `Duplicate Description with route: ${descriptions.get(description)}`;
      } else {
        descriptions.set(description, route);
      }
    }

    // Check canonical matches route slug
    if (canonical && canonical !== route && canonical !== "/") {
      // Dynamic segments like [brand] or [model] will naturally mismatch, so skip check for bracket routes
      // Also skip if canonical contains a template variable (e.g. ${APP_URL}/tools/speed-test)
      const isTemplateLiteral = canonical.includes("${");
      if (!route.includes("[") && !isTemplateLiteral) {
        result.error = (result.error ? result.error + "; " : "") + `Canonical mismatch: canonical is '${canonical}', but path is '${route}'`;
      }
    }

    results.push(result);
  }

  // Print results
  let passedCount = 0;
  let failedCount = 0;

  for (const r of results) {
    if (!r.hasTitle || !r.hasDescription || !r.hasCanonical || r.error) {
      failedCount++;
      console.log(`❌ Fail: ${r.route} (${r.filePath})`);
      if (!r.hasTitle) console.log("   - Missing Title");
      if (!r.hasDescription) console.log("   - Missing Description");
      if (!r.hasCanonical) console.log("   - Missing Canonical Tag");
      if (r.error) console.log(`   - Error: ${r.error}`);
    } else {
      passedCount++;
    }
  }

  console.log("\n================ Summary ================");
  console.log(`Audited Routes : ${results.length}`);
  console.log(`Passed Routes  : ${passedCount} ✅`);
  console.log(`Failed Routes  : ${failedCount} ${failedCount > 0 ? "❌" : "✅"}`);
  console.log("=========================================");

  if (failedCount > 0) {
    process.exit(1);
  } else {
    console.log("Verdict: METADATA INTEGRITY PASS");
  }
}

auditMetadata().catch(console.error);
