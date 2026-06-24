import { prisma } from "@/server/db/prisma";
import type { Problem } from "@/types";

// =============================================================
// Problem Repository
// =============================================================

export const ProblemRepository = {
  async getAll(options?: {
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<Problem[]> {
    const problems = await prisma.problem.findMany({
      where: options?.category
        ? { category: options.category as Problem["category"] }
        : undefined,
      orderBy: { createdAt: "desc" },
      take: options?.limit,
      skip: options?.offset,
    });
    return problems.map(mapProblem);
  },

  async getBySlug(slug: string): Promise<Problem | null> {
    const problem = await prisma.problem.findUnique({ where: { slug } });
    if (!problem) return null;
    return mapProblem(problem);
  },

  async getAllSlugs(): Promise<string[]> {
    const problems = await prisma.problem.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return problems.map((p) => p.slug);
  },

  async getRelated(slugs: string[]): Promise<Problem[]> {
    const problems = await prisma.problem.findMany({
      where: { slug: { in: slugs } },
    });
    return problems.map(mapProblem);
  },

  async count(): Promise<number> {
    return prisma.problem.count();
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProblem(p: any): Problem {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    excerpt: p.excerpt,
    content: p.content,
    causes: p.causes,
    fixes: p.fixes as Problem["fixes"],
    faqs: p.faqs as Problem["faqs"],
    relatedSlugs: p.relatedSlugs,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
