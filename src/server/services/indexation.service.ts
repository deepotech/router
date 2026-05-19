import { prisma } from "../db/prisma";

export class IndexationService {
  /**
   * Calculates the crawl-worthiness score of a router page.
   * Prevents URL explosion by advising 'noindex' on weak pages.
   */
  static async evaluateRouterPage(routerId: number): Promise<{ indexable: boolean; score: number }> {
    const router = await prisma.routerModel.findUnique({
      where: { id: routerId },
      include: { brand: true },
    });

    if (!router) return { indexable: false, score: 0 };

    let score = 0;

    // Has explicit AI generated unique setup guide
    if (router.wifiSetupGuide && router.wifiSetupGuide.length > 300) score += 40;
    
    // Has custom FAQs
    const faqs = router.faqs as any[];
    if (Array.isArray(faqs) && faqs.length > 0) score += 20;

    // Has image
    if (router.imageUrl) score += 10;

    // Has multiple IP connections or problem links (Knowledge Graph richness)
    const relations = await prisma.entityRelation.count({
      where: { fromEntityType: "ROUTER", fromEntityId: routerId },
    });
    if (relations > 2) score += 30;

    return {
      score,
      // Only index if the score is above 50, preventing thin content index bloat
      indexable: score >= 50,
    };
  }

  /**
   * Helper function for sitemaps: returns an array of only high-quality router slugs
   */
  static async getIndexableRouters(limit = 50000, offset = 0) {
    // In production, you would cache this or have a cron job update an "isIndexable" boolean on the model directly to avoid doing this calculation at sitemap generation time.
    const routers = await prisma.routerModel.findMany({
      skip: offset,
      take: limit,
      select: {
        slug: true,
        brand: { select: { slug: true } },
        updatedAt: true,
        // Using length of setup guide as a proxy for "indexability" without fetching full relations
        wifiSetupGuide: true,
      },
    });

    // Filter thin content
    return routers.filter(r => r.wifiSetupGuide.length > 200).map(r => ({
      brandSlug: r.brand.slug,
      modelSlug: r.slug,
      lastModified: r.updatedAt,
    }));
  }
}
