import { ProblemRepository } from "@/server/repositories/problem.repository";
import type { Problem } from "@/types";

// =============================================================
// Problem Service
// =============================================================

export const ProblemService = {
  async getAll(category?: string): Promise<Problem[]> {
    return ProblemRepository.getAll({ category });
  },

  async getBySlug(slug: string): Promise<Problem | null> {
    return ProblemRepository.getBySlug(slug);
  },

  async getRelated(slugs: string[]): Promise<Problem[]> {
    return ProblemRepository.getRelated(slugs);
  },

  async getAllPaths(): Promise<{ slug: string }[]> {
    const slugs = await ProblemRepository.getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  },

  async getCount(): Promise<number> {
    return ProblemRepository.count();
  },
};
