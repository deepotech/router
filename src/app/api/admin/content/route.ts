import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function GET(request: Request) {
  try {
    const problems = await prisma.problem.findMany({
      where: { status: "STAGED" },
      select: { id: true, title: true, status: true, generationMetrics: true, datasetGovernance: true }
    });

    const routers = await prisma.routerModel.findMany({
      where: { status: "STAGED" },
      select: { id: true, name: true, brand: { select: { name: true } }, status: true, generationMetrics: true, datasetGovernance: true }
    });

    const ips = await prisma.ipAddress.findMany({
      where: { status: "STAGED" },
      select: { id: true, address: true, status: true, generationMetrics: true, datasetGovernance: true }
    });

    return NextResponse.json({ problems, routers, ips });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, id, action } = await request.json();

    const newStatus = action === "APPROVE" ? "REVIEWED" : "DRAFT"; 
    
    if (type === "PROBLEM") {
      await prisma.problem.update({ where: { id }, data: { status: newStatus } });
    } else if (type === "ROUTER") {
      await prisma.routerModel.update({ where: { id }, data: { status: newStatus } });
    } else if (type === "IP") {
      await prisma.ipAddress.update({ where: { id }, data: { status: newStatus } });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, status: newStatus });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
