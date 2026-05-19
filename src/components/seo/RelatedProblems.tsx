import Link from "next/link";
import { Wrench, ChevronRight } from "lucide-react";
import { RecommendationService } from "@/server/services/recommendation.service";
import { PROBLEM_CATEGORIES } from "@/lib/constants";

interface Props {
  category: string;
  currentSlug: string;
}

export async function RelatedProblems({ category, currentSlug }: Props) {
  const problems = await RecommendationService.getRelatedProblems(category, currentSlug);

  if (problems.length === 0) return null;

  const categoryName = PROBLEM_CATEGORIES[category as keyof typeof PROBLEM_CATEGORIES] || "Network";

  return (
    <section className="glass-card p-6 mt-8">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
        Related {categoryName} Issues
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {problems.map((prob: any) => (
          <Link
            key={prob.slug}
            href={`/problems/${prob.slug}`}
            className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl hover:border-red-800/50 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Wrench size={16} className="text-red-400" />
              <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-red-400 transition-colors line-clamp-1">
                {prob.title}
              </span>
            </div>
            <ChevronRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
