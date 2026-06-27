import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GuideItem {
  title: string;
  url: string;
  category: "wifi" | "nat" | "dns";
  tags: string[];
  brand?: string;
}

const ALL_GUIDES: GuideItem[] = [
  {
    title: "Forgot Router Password Recovery",
    url: "/forgot-router-password",
    category: "wifi",
    tags: ["password", "recovery", "reset"],
  },
  {
    title: "Router Admin Password Guide",
    url: "/router-admin-password",
    category: "wifi",
    tags: ["password", "credentials"],
  },
  {
    title: "Cannot Access Router Settings Page",
    url: "/router-cannot-access-settings",
    category: "nat",
    tags: ["access", "timeout", "settings"],
  },
  {
    title: "Web Interface Not Opening Troubleshooting",
    url: "/router-web-interface-not-opening",
    category: "nat",
    tags: ["access", "browser", "settings"],
  },
  {
    title: "Login Page Not Loading Fix",
    url: "/router-login-page-not-loading",
    category: "nat",
    tags: ["access", "timeout", "loading"],
  },
  {
    title: "Router IP Conflict Resolution",
    url: "/router-ip-conflict",
    category: "nat",
    tags: ["ip", "conflict", "dhcp"],
  },
  {
    title: "No Internet Access After Login",
    url: "/router-no-internet-after-login",
    category: "wifi",
    tags: ["internet", "wan", "dns"],
  },
  {
    title: "Router Firmware Update Guide",
    url: "/router-firmware-update-guide",
    category: "wifi",
    tags: ["firmware", "update", "setup"],
  },
  {
    title: "How to Change Router Admin Password",
    url: "/change-router-admin-password",
    category: "wifi",
    tags: ["password", "setup", "credentials"],
  },
  {
    title: "How to Secure Your Router After Setup",
    url: "/secure-router-after-setup",
    category: "wifi",
    tags: ["security", "setup", "hardening"],
  },
  {
    title: "TP-Link Default Password Guide",
    url: "/tp-link-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "tp-link",
  },
  {
    title: "Netgear Default Password Guide",
    url: "/netgear-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "netgear",
  },
  {
    title: "ASUS Default Password Guide",
    url: "/asus-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "asus",
  },
  {
    title: "D-Link Default Password Guide",
    url: "/d-link-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "d-link",
  },
  {
    title: "Linksys Default Password Guide",
    url: "/linksys-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "linksys",
  },
];

interface RelatedGuidesProps {
  currentUrl: string;
  category: "wifi" | "nat" | "dns";
  tags: string[];
  brand?: string;
  limit?: number;
}

export default function RelatedGuides({
  currentUrl,
  category,
  tags,
  brand,
  limit = 4,
}: RelatedGuidesProps) {
  // Score and sort guides based on relevancy algorithm
  const scoredGuides = ALL_GUIDES.map((guide) => {
    let score = 0;

    // 1. Exclude current page
    if (guide.url === currentUrl) {
      score -= 100;
    }

    // 2. Category match (+3)
    if (guide.category === category) {
      score += 3;
    }

    // 3. Tag match (+2 for each shared tag)
    const sharedTags = guide.tags.filter((t) => tags.includes(t));
    score += sharedTags.length * 2;

    // 4. Brand match (+1)
    if (brand && guide.brand === brand) {
      score += 1;
    }

    return { ...guide, score };
  })
    .filter((guide) => guide.score > -50) // Filter out current page
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)); // Sort by score, then alphabetically

  const displayGuides = scoredGuides.slice(0, limit);

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
