import Link from "next/link";
import { ChevronRight, Clock, HelpCircle } from "lucide-react";
import { RecommendationService } from "@/server/services/recommendation.service";
import { Badge } from "@/components/ui/Badge";

interface Props {
  ipAddress: string;
  diagnosticCategory: string | null;
  limit?: number;
}

export async function RelatedProblemsForIp({ ipAddress, diagnosticCategory, limit = 3 }: Props) {
  const problems = await RecommendationService.getRelatedProblemsForIp(ipAddress, diagnosticCategory, limit);

  if (!problems || problems.length === 0) return null;

  return (
    <section className="glass-card p-6 mt-8">
      <div className="flex items-center gap-2 mb-4 border-b border-[var(--border-subtle)] pb-3">
        <HelpCircle className="text-[var(--brand-400)]" size={20} />
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          Common Problems With {ipAddress}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {problems.map((problem) => (
          <Link
            key={problem.id}
            href={`/problems/${problem.slug}`}
            className="flex flex-col justify-between p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-500)] hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="danger">Problem</Badge>
                <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                  <Clock size={10} />
                  {new Date(problem.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2 mb-1">
                {problem.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                {problem.excerpt}
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-[var(--brand-400)] flex items-center gap-0.5 group-hover:underline">
              View Fix <ChevronRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
