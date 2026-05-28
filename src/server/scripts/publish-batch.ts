import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";
import { CrawlPressureService } from "../services/crawl-pressure.service";

/**
 * Controlled Batch Publisher — Stage I-A
 * 
 * Governance rules:
 *   - Entities must pass CrawlPressure check before each batch
 *   - Max 20 per day enforced by CrawlPressureService
 *   - STAGED → REVIEWED → PUBLISHED (two-step promotion)
 *   - Problems: only publish if they have content + fixes
 *   - IPs: only publish if they have loginGuide + faqs
 *   - Routers: only publish if they have wifiSetupGuide
 */

const DRY_RUN = process.argv.includes('--dry-run');

async function publishBatch() {
  console.log(`\n🚀 Stage I-A Controlled Batch Publisher`);
  console.log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN (no DB writes)' : '✅ LIVE PUBLISH'}\n`);

  // 1. Pre-flight crawl pressure check
  const pressure = await CrawlPressureService.evaluatePublishingSafety();
  if (pressure.action === 'HALT_PUBLISHING') {
    console.error('❌ CRAWL PRESSURE: Publishing halted by governance.');
    console.error(pressure);
    process.exit(1);
  }
  console.log('✅ Crawl pressure check passed.');

  let totalPublished = 0;

  // 2. Promote qualifying Problems
  const problems = await prisma.problem.findMany({
    where: { status: 'REVIEWED' },
    select: { id: true, title: true, slug: true, content: true, fixes: true, excerpt: true }
  });

  const qualifyingProblems = problems.filter(p =>
    p.content && p.content.length > 100 &&
    p.excerpt && p.excerpt.length > 20
  );

  console.log(`\nProblems: ${qualifyingProblems.length}/${problems.length} qualify for publishing.`);

  for (const p of qualifyingProblems) {
    if (!DRY_RUN) {
      await prisma.problem.update({
        where: { id: p.id },
        data: { status: 'PUBLISHED', isPublished: true, publishedAt: new Date() }
      });
    }
    console.log(`  ✅ ${DRY_RUN ? '[DRY]' : ''} PUBLISHED Problem [${p.id}]: ${p.title}`);
    totalPublished++;
  }

  // 3. Promote qualifying IPs
  const ips = await prisma.ipAddress.findMany({
    where: { status: 'REVIEWED' },
    select: { id: true, address: true, slug: true, loginGuide: true, description: true }
  });

  const qualifyingIPs = ips.filter(ip =>
    ip.loginGuide && ip.loginGuide.length > 100 &&
    ip.description && ip.description.length > 20
  );

  console.log(`\nIPs: ${qualifyingIPs.length}/${ips.length} qualify for publishing.`);

  for (const ip of qualifyingIPs) {
    if (!DRY_RUN) {
      await prisma.ipAddress.update({
        where: { id: ip.id },
        data: { status: 'PUBLISHED', isPublished: true, publishedAt: new Date() }
      });
    }
    console.log(`  ✅ ${DRY_RUN ? '[DRY]' : ''} PUBLISHED IP [${ip.id}]: ${ip.address}`);
    totalPublished++;
  }

  // 4. Promote qualifying Routers
  const routers = await prisma.routerModel.findMany({
    where: { status: 'REVIEWED' },
    select: { id: true, name: true, slug: true, wifiSetupGuide: true, resetGuide: true }
  });

  const qualifyingRouters = routers.filter(r =>
    r.wifiSetupGuide && r.wifiSetupGuide.length > 100 &&
    r.resetGuide && r.resetGuide.length > 50
  );

  console.log(`\nRouters: ${qualifyingRouters.length}/${routers.length} qualify for publishing.`);

  for (const r of qualifyingRouters) {
    if (!DRY_RUN) {
      await prisma.routerModel.update({
        where: { id: r.id },
        data: { status: 'PUBLISHED', isPublished: true, publishedAt: new Date() }
      });
    }
    console.log(`  ✅ ${DRY_RUN ? '[DRY]' : ''} PUBLISHED Router [${r.id}]: ${r.name}`);
    totalPublished++;
  }

  // 5. Emit telemetry
  if (!DRY_RUN && totalPublished > 0) {
    await prisma.analyticsEvent.create({
      data: {
        eventType: 'BATCH_PUBLISHED',
        eventData: { totalPublished, stage: 'STAGE_I_A', timestamp: new Date().toISOString() }
      }
    });
  }

  console.log(`\n🎯 COMPLETE: ${totalPublished} entities ${DRY_RUN ? 'would be' : 'were'} published.`);
  console.log(`📊 Monitor at: /admin/observability`);
}

publishBatch().catch(console.error).finally(() => process.exit(0));
