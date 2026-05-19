import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { ProblemService } from "@/server/services/problem.service";

import { hasDatabase } from "@/lib/server/env-safe";

export async function generateSitemaps() {
  // Only one sitemap for problems, ID is zero
  return [{ id: "0" }];
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  if (!hasDatabase) return [];
  try {
    await id; // resolve just to consume
    
    const problems = await ProblemService.getAll();
    
    return problems.map((problem) => ({
      url: `${APP_URL}/problems/${problem.slug}`,
      lastModified: problem.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("[Build] Sitemap generation failed:", error);
    return [];
  }
}
