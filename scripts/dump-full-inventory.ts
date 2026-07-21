import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany({ select: { id: true, name: true, slug: true } });
  const routerModels = await prisma.routerModel.findMany({ select: { id: true, name: true, slug: true, isPublished: true, brand: { select: { name: true, slug: true } } } });
  const ipAddresses = await prisma.ipAddress.findMany({ select: { id: true, address: true, slug: true, isPublished: true } });
  const problems = await prisma.problem.findMany({ select: { id: true, title: true, slug: true, category: true, isPublished: true } });

  const appDir = path.join(process.cwd(), 'src', 'app');
  const dirs = fs.readdirSync(appDir, { withFileTypes: true });

  const staticRoutes: string[] = [];
  for (const d of dirs) {
    if (d.isDirectory() && !d.name.startsWith('(') && fs.existsSync(path.join(appDir, d.name, 'page.tsx'))) {
      staticRoutes.push('/' + d.name);
    }
  }

  const output = {
    brands,
    routerModelsCount: routerModels.length,
    routerModels,
    ipAddressesCount: ipAddresses.length,
    ipAddresses,
    problemsCount: problems.length,
    problems,
    staticRoutesCount: staticRoutes.length,
    staticRoutes
  };

  fs.writeFileSync('inventory-dump.json', JSON.stringify(output, null, 2));
  console.log('Successfully written inventory-dump.json');
}

main().catch(console.error).finally(() => prisma.$disconnect());
