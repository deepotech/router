import { NextResponse } from 'next/server';
import { prisma } from '@/server/db/prisma';
import * as fs from 'fs';
import * as path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Try to load pre-generated audit report
    let auditReport: Record<string, unknown> | null = null;
    const reportPath = path.join(process.cwd(), 'audit-stage-1a-report.json');
    if (fs.existsSync(reportPath)) {
      auditReport = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    }

    // 2. Always fetch live DB metrics
    const [
      totalStaged,
      totalReviewed,
      totalPublished,
      totalChunks,
      totalIntentRelations,
      totalRetrievalMetrics,
      semanticEvents,
      highPriorityChunks,
    ] = await Promise.all([
      prisma.problem.count({ where: { status: 'STAGED' } })
        .then(async (p) => {
          const [ip, r] = await Promise.all([
            prisma.ipAddress.count({ where: { status: 'STAGED' } }),
            prisma.routerModel.count({ where: { status: 'STAGED' } }),
          ]);
          return p + ip + r;
        }),
      prisma.problem.count({ where: { status: 'REVIEWED' } })
        .then(async (p) => {
          const [ip, r] = await Promise.all([
            prisma.ipAddress.count({ where: { status: 'REVIEWED' } }),
            prisma.routerModel.count({ where: { status: 'REVIEWED' } }),
          ]);
          return p + ip + r;
        }),
      prisma.problem.count({ where: { isPublished: true } })
        .then(async (p) => {
          const [ip, r] = await Promise.all([
            prisma.ipAddress.count({ where: { isPublished: true } }),
            prisma.routerModel.count({ where: { isPublished: true } }),
          ]);
          return p + ip + r;
        }),
      prisma.semanticChunk.count(),
      prisma.retrievalIntentRelation.count(),
      prisma.retrievalMetric.count(),
      prisma.analyticsEvent.count({ where: { eventType: 'SEMANTIC_CHUNK_GENERATED' } }),
      prisma.semanticChunk.count({ where: { priorityScore: { gte: 0.8 } } }),
    ]);

    // 3. Chunk type breakdown
    const chunkBreakdown = await prisma.semanticChunk.groupBy({
      by: ['chunkType'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });

    // 4. Entity type breakdown for chunks
    const entityBreakdown = await prisma.semanticChunk.groupBy({
      by: ['entityType'],
      _count: { id: true },
    });

    // 5. Top intent relations (super-resolvers)
    const superResolvers = await prisma.retrievalIntentRelation.findMany({
      orderBy: { reuseCount: 'desc' },
      take: 5,
      select: { resolvedByChunkId: true, reuseCount: true, resolutionScore: true, sourceIntent: true },
    });

    // 6. Recent retrieval performance
    const recentMetrics = await prisma.retrievalMetric.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { latencyMs: true, tierUsed: true, fallbackTriggered: true },
    });
    const avgLatency = recentMetrics.length > 0
      ? Math.round(recentMetrics.reduce((s, m) => s + m.latencyMs, 0) / recentMetrics.length)
      : 0;
    const tier1Rate = recentMetrics.length > 0
      ? Math.round((recentMetrics.filter((m) => m.tierUsed === 1).length / recentMetrics.length) * 100)
      : 0;

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      liveMetrics: {
        totalStaged,
        totalReviewed,
        totalPublished,
        totalChunks,
        totalIntentRelations,
        totalRetrievalMetrics,
        semanticEvents,
        highPriorityChunks,
        avgLatencyMs: avgLatency,
        tier1HitRate: tier1Rate,
      },
      chunkBreakdown: chunkBreakdown.map((c) => ({ type: c.chunkType, count: c._count.id })),
      entityBreakdown: entityBreakdown.map((e) => ({ type: e.entityType, count: e._count.id })),
      superResolvers,
      auditReport: auditReport ?? null,
      reportExists: !!auditReport,
    });
  } catch (err) {
    console.error('[AuditAPI] Error:', err);
    return NextResponse.json({ error: 'Audit API failed', details: String(err) }, { status: 500 });
  }
}
