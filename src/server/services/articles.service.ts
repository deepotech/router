import { prisma } from "@/server/db/prisma";
import { safeDb } from "@/lib/server/safe-db";

export interface Article {
  id: string; // e.g. `problem-${id}`, `ip-${id}`, `router-${id}`
  title: string;
  slug: string;
  excerpt: string;
  type: "IP" | "Problem" | "Firmware";
  createdAt: Date;
  href: string;
  diagnosticCategory: string | null;
}

export const ArticlesService = {
  /**
   * Fetches and aggregates latest articles across Problems, IPs, and Router Models.
   * Sorted by newest first. Supports pagination.
   */
  async getLatestArticles(options?: { page?: number; limit?: number }): Promise<Article[]> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    return safeDb(async () => {
      // Fetch data in parallel with a cap to prevent overloading
      const [problems, ips, routers] = await Promise.all([
        prisma.problem.findMany({
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            createdAt: true,
            diagnosticCategory: true,
          },
          orderBy: { createdAt: "desc" },
          take: skip + limit, // Get enough candidates to slice correctly after sorting
        }),
        prisma.ipAddress.findMany({
          where: { isPublished: true },
          select: {
            id: true,
            address: true,
            slug: true,
            description: true,
            createdAt: true,
            diagnosticCategory: true,
          },
          orderBy: { createdAt: "desc" },
          take: skip + limit,
        }),
        prisma.routerModel.findMany({
          where: { isPublished: true },
          select: {
            id: true,
            name: true,
            slug: true,
            metaDescription: true,
            createdAt: true,
            diagnosticCategory: true,
            brand: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: skip + limit,
        }),
      ]);

      // Normalize into a common structure
      const normalizedProblems: Article[] = problems.map((p) => ({
        id: `problem-${p.id}`,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        type: "Problem",
        createdAt: p.createdAt,
        href: `/problems/${p.slug}`,
        diagnosticCategory: p.diagnosticCategory,
      }));

      const normalizedIps: Article[] = ips.map((ip) => ({
        id: `ip-${ip.id}`,
        title: `${ip.address} Router Login Guide`,
        slug: ip.slug,
        excerpt: ip.description || "",
        type: "IP",
        createdAt: ip.createdAt,
        href: `/ips/${ip.slug}`,
        diagnosticCategory: ip.diagnosticCategory,
      }));

      const normalizedRouters: Article[] = routers.map((r) => ({
        id: `router-${r.id}`,
        title: `${r.brand?.name || ""} ${r.name} Setup & Login`,
        slug: r.slug,
        excerpt: r.metaDescription || `Complete guide, manuals, and troubleshooting for the ${r.name} router.`,
        type: "Firmware",
        createdAt: r.createdAt,
        href: `/routers/${r.brand?.slug || "unknown"}/${r.slug}`,
        diagnosticCategory: r.diagnosticCategory,
      }));

      // Merge and sort by newest first
      const allArticles = [...normalizedProblems, ...normalizedIps, ...normalizedRouters];
      allArticles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      // Apply pagination slicing
      return allArticles.slice(skip, skip + limit);
    }, []);
  },

  /**
   * Returns the total count of all published articles (Problems + IPs + RouterModels)
   */
  async getTotalArticlesCount(): Promise<number> {
    return safeDb(async () => {
      const [problemCount, ipCount, routerCount] = await Promise.all([
        prisma.problem.count({ where: { isPublished: true } }),
        prisma.ipAddress.count({ where: { isPublished: true } }),
        prisma.routerModel.count({ where: { isPublished: true } }),
      ]);
      return problemCount + ipCount + routerCount;
    }, 0);
  },
};
