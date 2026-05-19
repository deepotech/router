import { PrismaClient } from "@prisma/client";
import { contentGenerationQueue } from "../server/jobs/queues/content.queue";

const prisma = new PrismaClient();

async function runSeed() {
  console.log("🌱 Starting Phase 1 Content Expansion Seed...");

  // 1. Brands
  const brands = [
    { name: "TP-Link", slug: "tp-link" },
    { name: "Huawei", slug: "huawei" },
    { name: "ASUS", slug: "asus" },
    { name: "Netgear", slug: "netgear" },
    { name: "D-Link", slug: "d-link" }
  ];

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {},
      create: b
    });
  }
  console.log("✅ Brands seeded");

  // 2. Router Models
  const models = [
    { brandSlug: "tp-link", name: "Archer C6", slug: "tp-link-archer-c6" },
    { brandSlug: "tp-link", name: "AX50", slug: "tp-link-ax50" },
    { brandSlug: "tp-link", name: "AX73", slug: "tp-link-ax73" },
    { brandSlug: "huawei", name: "HG8145V5", slug: "huawei-hg8145v5" },
    { brandSlug: "huawei", name: "AX3", slug: "huawei-ax3" },
    { brandSlug: "asus", name: "RT-AX58U", slug: "asus-rt-ax58u" },
    { brandSlug: "asus", name: "RT-AX55", slug: "asus-rt-ax55" },
    { brandSlug: "netgear", name: "R7000", slug: "netgear-r7000" },
    { brandSlug: "netgear", name: "RAX50", slug: "netgear-rax50" },
    { brandSlug: "d-link", name: "DIR-825", slug: "d-link-dir-825" }
  ];

  for (const m of models) {
    const brand = await prisma.brand.findUnique({ where: { slug: m.brandSlug } });
    if (!brand) continue;

    const router = await prisma.routerModel.upsert({
      where: { slug: m.slug },
      update: {},
      create: {
        name: m.name,
        slug: m.slug,
        brandId: brand.id,
        status: "STAGED",
        wifiSetupGuide: "",
        resetGuide: "",
      }
    });

    // Enqueue Stage 1 and Stage 2
    await contentGenerationQueue.add("content-generation", { type: "ROUTER_STAGE_1", payload: { modelId: router.id } });
    await contentGenerationQueue.add("content-generation", { type: "ROUTER_STAGE_2", payload: { modelId: router.id } }, { delay: 5000 });
  }
  console.log("✅ Router Models seeded & queued");

  // 3. IPs
  const ips = [
    { address: "192.168.1.1", slug: "192-168-1-1" },
    { address: "192.168.0.1", slug: "192-168-0-1" },
    { address: "10.0.0.1", slug: "10-0-0-1" }
  ];

  for (const ip of ips) {
    const ipRecord = await prisma.ipAddress.upsert({
      where: { address: ip.address },
      update: {},
      create: {
        address: ip.address,
        slug: ip.slug,
        description: "",
        loginGuide: "",
        status: "STAGED"
      }
    });

    await contentGenerationQueue.add("content-generation", { type: "IP_STAGE_1", payload: { ipId: ipRecord.id } });
  }
  console.log("✅ IPs seeded & queued");

  // 4. Problems
  const problems = [
    { title: "WiFi Connected But No Internet", slug: "wifi-connected-but-no-internet" },
    { title: "Router Blinking Orange", slug: "router-blinking-orange" },
    { title: "DNS Server Not Responding", slug: "dns-server-not-responding" },
    { title: "Internet Disconnects Randomly", slug: "internet-disconnects-randomly" },
    { title: "Router Login Page Not Opening", slug: "router-login-page-not-opening" },
    { title: "Slow WiFi Speed", slug: "slow-wifi-speed" },
    { title: "5GHz WiFi Missing", slug: "5ghz-wifi-missing" },
    { title: "WiFi Keeps Disconnecting", slug: "wifi-keeps-disconnecting" },
    { title: "Default Gateway is Not Available", slug: "default-gateway-not-available" },
    { title: "Router Keeps Rebooting", slug: "router-keeps-rebooting" }
  ];

  for (const p of problems) {
    const problemRecord = await prisma.problem.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        excerpt: "",
        content: "",
        status: "STAGED"
      }
    });

    // Enqueue Pipeline Stages
    // We can chain these using job dependencies in BullMQ, or just enqueue them with delays for now to keep it simple.
    // In a production system, Stage 2 would be queued AT THE END of Stage 1 processing.
    // For this seed, we'll let the worker enqueue the next stages, OR we enqueue them with increasing delays.
    // Let's queue Stage 1. Stage 1's processor should ideally queue Stage 2. 
    // Wait, the prompt says "Refactor generation into staged jobs... Each stage should support retries independently". 
    // It's safer to queue Stage 1, and let Stage 1's completion trigger Stage 2 (by modifying the service to enqueue it), 
    // OR we just queue them here with delays.
    await contentGenerationQueue.add("content-generation", { type: "PROBLEM_STAGE_1", payload: { problemId: problemRecord.id, title: p.title } });
    await contentGenerationQueue.add("content-generation", { type: "PROBLEM_STAGE_2", payload: { problemId: problemRecord.id } }, { delay: 10000 });
    await contentGenerationQueue.add("content-generation", { type: "PROBLEM_STAGE_3", payload: { problemId: problemRecord.id } }, { delay: 20000 });
  }
  console.log("✅ Problems seeded & queued");

  console.log("🚀 Phase 1 Seed Enqueued. Run 'npm run worker' to process.");
  process.exit(0);
}

runSeed().catch(console.error);
