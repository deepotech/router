import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ALL_GUIDES } from "@/data/related-guides";

interface RelatedGuidesProps {
  currentUrl: string;
  category: "wifi" | "nat" | "dns";
  tags: string[];
  brand?: string;
  maxItems?: number;
  limit?: number; // fallback support for older code/tests
}

export default function RelatedGuides({
  currentUrl,
  category,
  tags,
  brand,
  maxItems,
  limit,
}: RelatedGuidesProps) {
  // Respect maxItems, fallback to limit, fallback to default 4
  const finalLimit = maxItems ?? limit ?? 4;
  const resultGuides: { title: string; url: string }[] = [];

  // Prepend Hub Pages if they are not the current page
  if (currentUrl !== "/router-login") {
    resultGuides.push({
      title: "Router Login Guide",
      url: "/router-login",
    });
  }
  if (currentUrl !== "/router-login-recovery") {
    resultGuides.push({
      title: "Router Login Recovery Hub",
      url: "/router-login-recovery",
    });
  }

  // Calculate scores for other guides
  const scoredGuides = ALL_GUIDES.map((guide) => {
    let score = 0;

    // Exclude current page
    if (guide.url === currentUrl) {
      score -= 1000;
    }

    // Exclude already added hub pages to prevent duplication
    if (resultGuides.some((r) => r.url === guide.url)) {
      score -= 1000;
    }

    // Category match (+3)
    if (guide.category === category) {
      score += 3;
    }

    // Tag match (+2 for each shared tag)
    const sharedTags = guide.tags.filter((t) => tags.includes(t));
    score += sharedTags.length * 2;

    // Brand match (+1)
    if (brand && guide.brand === brand) {
      score += 1;
    }

    return { ...guide, score };
  })
    .filter((guide) => guide.score > -100) // filter out current page / duplicates
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  // Add scored guides to fill the remaining slots up to finalLimit
  for (const guide of scoredGuides) {
    if (resultGuides.length >= finalLimit) {
      break;
    }
    resultGuides.push({
      title: guide.title,
      url: guide.url,
    });
  }

  const displayGuides = resultGuides.slice(0, finalLimit);

  if (displayGuides.length === 0) return null;

  return (
    <section aria-label="Related technical guides" className="mt-8">
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
        Related Troubleshooting Guides & References
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayGuides.map((guide) => (
          <Link
            key={guide.url}
            href={guide.url}
            className="glass-card p-3 rounded-xl border border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-500)]/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] shrink-0" />
              <span>{guide.title}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--brand-400)] shrink-0 ml-2" />
          </Link>
        ))}
      </div>
    </section>
  );
}
