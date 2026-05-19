import { performance } from "perf_hooks";

const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const QUERIES = [
  "tp-link router login", // exact
  "htpp://192.168.l.l",   // typo
  "admin password",       // broad
  "hg8245h setup",        // exact model
  "asdf1234garbage",      // garbage
];

async function runTest(concurrentUsers = 10, totalRequests = 100) {
  console.log(`\n🚀 Starting Load Test: ${concurrentUsers} concurrent users, ${totalRequests} total requests`);
  console.log(`🎯 Target: ${API_URL}`);

  let completed = 0;
  let errors = 0;
  const latencies: number[] = [];

  const start = performance.now();

  const worker = async () => {
    while (completed < totalRequests) {
      const q = QUERIES[Math.floor(Math.random() * QUERIES.length)];
      const reqStart = performance.now();
      try {
        const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(q)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await res.text(); // consume body
      } catch (e) {
        errors++;
      } finally {
        const reqEnd = performance.now();
        latencies.push(reqEnd - reqStart);
        completed++;
      }
    }
  };

  const promises = [];
  for (let i = 0; i < concurrentUsers; i++) {
    promises.push(worker());
  }

  await Promise.all(promises);

  const end = performance.now();
  const totalTimeSeconds = (end - start) / 1000;

  latencies.sort((a, b) => a - b);
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length || 0;

  console.log(`\n✅ Load Test Complete`);
  console.log(`⏱ Total Time: ${totalTimeSeconds.toFixed(2)}s`);
  console.log(`⚡ Requests/sec: ${(totalRequests / totalTimeSeconds).toFixed(2)}`);
  console.log(`❌ Error Rate: ${((errors / totalRequests) * 100).toFixed(2)}%`);
  console.log(`📊 Avg Latency: ${avg.toFixed(2)}ms`);
  console.log(`📈 p95 Latency: ${p95.toFixed(2)}ms`);
}

runTest(10, 100).catch(console.error);
