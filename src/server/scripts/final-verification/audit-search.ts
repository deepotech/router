import { SearchOrchestratorService } from "../../services/search-orchestrator.service";
import { QueryNormalizationService } from "../../services/query-normalization.service";

async function audit() {
  const queries = [
    "tp lnik admin page",
    "wifi conected no internet",
    "router reboot loop after firmware update",
    "192.168 l l login",
    "huawei hg8245h5",
    "asdfghjkl" // gibberish for fallback
  ];

  console.log("=== Search Quality Evaluation ===");
  
  let tier0 = 0;
  let tier1 = 0;
  let tier2 = 0;
  let tier3 = 0;
  let totalLatency = 0;

  for (const query of queries) {
    const normalized = QueryNormalizationService.normalize(query);
    console.log(`\n🔍 Query: "${query}" => Normalized: "${normalized}"`);
    
    const start = Date.now();
    const results = await SearchOrchestratorService.search(query, 3);
    const latency = Date.now() - start;
    totalLatency += latency;

    if (results.length === 0) {
      console.log(`  ❌ NO RESULTS`);
      continue;
    }

    const tier = results[0].tierUsed;
    console.log(`  ✅ Best Match: "${results[0].title}" (Tier ${tier}, Confidence: ${(results[0].score * 100).toFixed(0)}%)`);
    
    if (tier === 0) tier0++;
    else if (tier === 1) tier1++;
    else if (tier === 2) tier2++;
    else if (tier === 3) tier3++;
  }

  const avgLatency = (totalLatency / queries.length).toFixed(1);
  console.log(`\n--- Summary ---`);
  console.log(`Tier 0 (Memory): ${tier0}`);
  console.log(`Tier 1 (Exact): ${tier1}`);
  console.log(`Tier 2 (Vector): ${tier2}`);
  console.log(`Tier 3 (Fallback): ${tier3}`);
  console.log(`Average Latency: ${avgLatency}ms`);
}

audit();
