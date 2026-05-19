import Link from "next/link";
import { Wifi, ChevronRight } from "lucide-react";
import { RecommendationService } from "@/server/services/recommendation.service";

interface Props {
  brandId: number;
  currentModelId: number;
  brandName: string;
  brandSlug: string;
}

export async function RelatedRouters({ brandId, currentModelId, brandName, brandSlug }: Props) {
  const routers = await RecommendationService.getRelatedRouters(brandId, currentModelId);

  if (routers.length === 0) return null;

  return (
    <section className="glass-card p-6 mt-8">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
        Other {brandName} Routers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {routers.map((router: any) => (
          <Link
            key={router.slug}
            href={`/routers/${brandSlug}/${router.slug}`}
            className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--brand-700)] transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Wifi size={16} className="text-[var(--brand-400)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                {brandName} {router.name}
              </span>
            </div>
            <ChevronRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
