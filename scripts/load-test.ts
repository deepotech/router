const APP_URL = process.env.APP_URL || "http://localhost:3000";

const testQueries = [
  "tp link login",           // Exact/Tier 1
  "192.168.1.1",             // Exact/Tier 1
  "tplink admin",            // Typo/Tier 1.5
  "internet disconnected",   // Semantic/Tier 2
  "router keeps rebooting",  // Semantic/Tier 2
  "asdfghjkl",               // Garbage/Tier 3
  "wifi conected no internet", // Typo/Tier 1.5
  "huawei hg8245h5",         // Fallback/Tier 3
  "slow speeds on 5ghz",     // Semantic/Tier 2
  "dns server not responding"// Semantic/Tier 2
];

async function runLoadTest(concurrentUsers = 100) {
  console.log(`🚀 Starting Load Test: ${concurrentUsers} concurrent requests against ${APP_URL}/api/search...`);
  
  const startTime = Date.now();
  let successCount = 0;
  let failCount = 0;
  const latencies: number[] = [];

  const promises = Array.from({ length: concurrentUsers }).map(async (_, i) => {
    const query = testQueries[i % testQueries.length];
    const reqStart = Date.now();
    try {
      const res = await fetch(`${APP_URL}/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        successCount++;
        latencies.push(Date.now() - reqStart);
      } else {
        failCount++;
      }
    } catch (e) {
      failCount++;
    }
  });

  await Promise.all(promises);
  
  const endTime = Date.now();
  const totalDuration = endTime - startTime;

  latencies.sort((a, b) => a - b);
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const p95Index = Math.floor(latencies.length * 0.95);
  const p95Latency = latencies[p95Index] || 0;

  console.log("=== LOAD TEST RESULTS ===");
  console.log(`Total Requests: ${concurrentUsers}`);
  console.log(`Success Rate: ${((successCount / concurrentUsers) * 100).toFixed(2)}%`);
  console.log(`Fail Rate: ${((failCount / concurrentUsers) * 100).toFixed(2)}%`);
  console.log(`Average Latency: ${avgLatency.toFixed(2)}ms`);
  console.log(`P95 Latency: ${p95Latency}ms`);
  console.log(`Total Duration: ${totalDuration}ms`);
  console.log(`Throughput: ${(concurrentUsers / (totalDuration / 1000)).toFixed(2)} req/sec`);
}

runLoadTest(100);
