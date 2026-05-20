import { NextRequest, NextResponse } from "next/server";
import { SearchOrchestratorService } from "@/server/services/search-orchestrator.service";
import { QueryNormalizationService } from "@/server/services/query-normalization.service";
import { prisma } from "@/server/db/prisma";
import { AnalyticsService } from "@/server/services/analytics.service";

/**
 * Unified Search API — single source of truth for all search surfaces.
 *
 * Pipeline: normalize → deterministic (Tier 1) → vector (Tier 2) → hub fallback (Tier 3)
 *
 * Returns structured { routers, problems, ips } for the GlobalSearch dropdown,
 * by enriching SemanticChunk results with real entity records.
 *
 * Previous: two parallel implementations (SearchService text-match + EmbeddingService).
 * Now: one pipeline via SearchOrchestratorService.
 */
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ routers: [], problems: [], ips: [] });
  }

  // Safely log the search event in a non-blocking way
  try {
    AnalyticsService.logEvent("SEARCH", { query: query.trim() }, req).catch((err) => {
      console.error("[Search Analytics] Non-blocking logEvent failed:", err);
    });
  } catch (error) {
    console.error("[Search Analytics] Failed to initialize logEvent:", error);
  }

  try {
    const normalizedQuery = QueryNormalizationService.normalize(query);
    const rawResults = await SearchOrchestratorService.search(normalizedQuery, 10);

    // Separate by entity type so GlobalSearch can render grouped results
    const routerIds   = [...new Set(rawResults.filter(r => r.entityType === "ROUTER"  && r.entityId > 0).map(r => r.entityId))];
    const problemIds  = [...new Set(rawResults.filter(r => r.entityType === "PROBLEM" && r.entityId > 0).map(r => r.entityId))];
    const ipIds       = [...new Set(rawResults.filter(r => r.entityType === "IP"      && r.entityId > 0).map(r => r.entityId))];

    // Fetch real entity records (for correct slugs/brand slugs/names)
    const [routers, problems, ips] = await Promise.all([
      routerIds.length > 0
        ? prisma.routerModel.findMany({
            where: { id: { in: routerIds } },
            select: { id: true, slug: true, name: true, brand: { select: { name: true, slug: true } } },
          })
        : [],
      problemIds.length > 0
        ? prisma.problem.findMany({
            where: { id: { in: problemIds } },
            select: { id: true, slug: true, title: true },
          })
        : [],
      ipIds.length > 0
        ? prisma.ipAddress.findMany({
            where: { id: { in: ipIds } },
            select: { id: true, slug: true, address: true },
          })
        : [],
    ]);

    // Preserve relevance ordering from the orchestrator
    const orderedRouters = routerIds.map(id => routers.find(r => r.id === id)).filter(Boolean);
    const orderedProblems = problemIds.map(id => problems.find(p => p.id === id)).filter(Boolean);
    const orderedIps = ipIds.map(id => ips.find(ip => ip.id === id)).filter(Boolean);

    return NextResponse.json({
      routers: orderedRouters,
      problems: orderedProblems,
      ips: orderedIps,
      isFallback: rawResults.length > 0 && rawResults[0].isFallback === true,
    });
  } catch (error) {
    console.error("[Search API] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
