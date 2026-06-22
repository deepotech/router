import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { prisma } from "../db/prisma";

async function main() {
  console.log("=== BRANDS ===");
  const brands = await prisma.brand.findMany();
  console.log(JSON.stringify(brands, null, 2));

  console.log("\n=== ROUTER MODELS ===");
  const routers = await prisma.routerModel.findMany({
    select: { id: true, name: true, slug: true, brand: { select: { slug: true } } }
  });
  console.log(JSON.stringify(routers, null, 2));

  console.log("\n=== PROBLEMS ===");
  const problems = await prisma.problem.findMany({
    select: { id: true, title: true, slug: true }
  });
  console.log(JSON.stringify(problems, null, 2));
}

main().catch(console.error).finally(() => process.exit(0));
