import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";

async function listStaged() {
  const problems = await prisma.problem.findMany({
    where: { status: 'STAGED' },
    select: { id: true, title: true, slug: true, diagnosticCategory: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 30
  });

  const ips = await prisma.ipAddress.findMany({
    where: { status: 'STAGED' },
    select: { id: true, address: true, slug: true, status: true },
    take: 10
  });

  const routers = await prisma.routerModel.findMany({
    where: { status: 'STAGED' },
    select: { id: true, name: true, slug: true },
    take: 10
  });

  console.log(`\n=== STAGED ENTITIES READY FOR REVIEW ===\n`);
  console.log(`Problems (${problems.length}):`);
  problems.forEach(p => console.log(`  [${p.id}] ${p.title} | Category: ${p.diagnosticCategory || 'N/A'}`));

  console.log(`\nIPs (${ips.length}):`);
  ips.forEach(i => console.log(`  [${i.id}] ${i.address} /${i.slug}`));

  console.log(`\nRouters (${routers.length}):`);
  routers.forEach(r => console.log(`  [${r.id}] ${r.name} /${r.slug}`));

  console.log(`\nTotal staged: ${problems.length + ips.length + routers.length}`);
}

listStaged().catch(console.error).finally(() => process.exit(0));
