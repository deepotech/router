import Link from "next/link";
import { ChevronRight, Server } from "lucide-react";
import { RecommendationService } from "@/server/services/recommendation.service";
import { Badge } from "@/components/ui/Badge";

interface Props {
  diagnosticCategory: string | null;
  limit?: number;
}

export async function RelatedRoutersForProblem({ diagnosticCategory, limit = 4 }: Props) {
  const routers = await RecommendationService.getRelatedRoutersForProblem(diagnosticCategory, limit);

  if (!routers || routers.length === 0) return null;

  return (
    <section className="glass-card p-6 mt-8">
      <div className="flex items-center gap-2 mb-4 border-b border-[var(--border-subtle)] pb-3">
        <Server className="text-[var(--brand-400)]" size={20} />
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          Affected Router Models
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {routers.map((router) => {
          const brandName = router.brand?.name || "Router";
          const brandSlug = router.brand?.slug || "unknown";
          return (
            <Link
              key={router.id}
              href={`/routers/${brandSlug}/${router.slug}`}
              className="flex flex-col justify-between p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-500)] hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div>
                <Badge variant="brand" className="mb-2">
                  {brandName}
                </Badge>
                <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-1">
                  {router.name}
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1">
                  Check specifications, default login gateway IPs, and setups.
                </p>
              </div>
              <span className="mt-3 text-[11px] font-semibold text-[var(--brand-400)] flex items-center gap-0.5 group-hover:underline">
                View Specs <ChevronRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
