import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking DB counts...");
  const models = await prisma.routerModel.count();
  const modelsPublished = await prisma.routerModel.count({ where: { status: "PUBLISHED" } });
  const modelsStaged = await prisma.routerModel.count({ where: { status: "STAGED" } });

  const problems = await prisma.problem.count();
  const problemsPublished = await prisma.problem.count({ where: { status: "PUBLISHED" } });
  const problemsStaged = await prisma.problem.count({ where: { status: "STAGED" } });

  const ips = await prisma.ipAddress.count();
  const ipsPublished = await prisma.ipAddress.count({ where: { status: "PUBLISHED" } });
  const ipsStaged = await prisma.ipAddress.count({ where: { status: "STAGED" } });

  console.log("Models total:", models, "Published:", modelsPublished, "Staged:", modelsStaged);
  console.log("Problems total:", problems, "Published:", problemsPublished, "Staged:", problemsStaged);
  console.log("IPs total:", ips, "Published:", ipsPublished, "Staged:", ipsStaged);

  const someProblems = await prisma.problem.findMany({ take: 3 });
  console.log("Sample problems:", someProblems.map(p => ({ title: p.title, status: p.status, isPublished: p.isPublished })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
