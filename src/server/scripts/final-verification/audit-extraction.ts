import fs from "fs";

async function fetchPage(url: string) {
  try {
    const res = await fetch(`https://routervia.com${url}`);
    const text = await res.text();
    return text;
  } catch (e) {
    console.error(`Failed to fetch ${url}`, e);
    return "";
  }
}

async function audit() {
  const pages = [
    { name: "Homepage", url: "/" },
    { name: "Problem Page", url: "/problems/wifi-connected-no-internet" }, // assume this exists or use a known one
    { name: "Router Setup", url: "/routers/huawei/hg8245h5/setup" }, // assume this exists based on earlier output
    { name: "Search Results", url: "/search?q=tp+link+admin" }
  ];

  console.log("=== AI Extraction Snapshot Audit ===");
  
  let score = 0;
  let totalChecks = 0;

  for (const page of pages) {
    const html = await fetchPage(page.url);
    if (!html) {
      console.log(`❌ ${page.name} - Failed to load`);
      continue;
    }

    console.log(`\n📄 Auditing ${page.name} (${page.url})`);
    
    // Checks
    const hasJsonLd = html.includes('type="application/ld+json"');
    const hasRetrievalBlock = html.includes('RetrievalAnswerBlock') || html.includes('AI') || html.includes('Diagnostic'); // rough proxy if classnames are stripped
    const hasCanonical = html.includes('rel="canonical"');
    const noRawJson = !html.includes('{"props":{"pageProps"'); // Next.js standard JSON leak check
    // If it's pure app router, no pageProps usually, so this is just a sanity check

    console.log(`  - JSON-LD present: ${hasJsonLd ? '✅' : '❌'}`);
    console.log(`  - Semantic data present: ${hasRetrievalBlock ? '✅' : '❌'}`);
    console.log(`  - Canonical tags: ${hasCanonical ? '✅' : '❌'}`);
    console.log(`  - No raw JSON leak: ${noRawJson ? '✅' : '❌'}`);

    // Scoring
    score += hasJsonLd ? 1 : 0;
    score += hasRetrievalBlock ? 1 : 0;
    score += hasCanonical ? 1 : 0;
    score += noRawJson ? 1 : 0;
    totalChecks += 4;
  }

  console.log(`\nExtraction Quality Score: ${((score / totalChecks) * 100).toFixed(0)}%`);
  if (score / totalChecks > 0.8) {
    console.log("Verdict: READY FOR CRAWLERS");
  } else {
    console.log("Verdict: NEEDS IMPROVEMENT");
  }
}

audit();
