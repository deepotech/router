import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany({ select: { name: true, slug: true } });
  const models = await prisma.routerModel.findMany({ select: { name: true, slug: true, brand: { select: { name: true } }, isPublished: true } });
  const ips = await prisma.ipAddress.findMany({ select: { address: true, slug: true, isPublished: true } });
  const problems = await prisma.problem.findMany({ select: { title: true, slug: true, category: true, isPublished: true } });

  fs.writeFileSync('detailed-records.json', JSON.stringify({ brands, models, ips, problems }, null, 2));
  console.log('Detailed records exported to detailed-records.json');
}

main().catch(console.error).finally(() => prisma.$disconnect());
