import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, Shield, Lock, Wifi, RefreshCw, Settings, Server, Globe, Info, CheckCircle2, ArrowRight, ExternalLink, HelpCircle, Activity } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { APP_URL, ROUTER_BRANDS, COMMON_IPS } from "@/lib/constants";
import { safeDb } from "@/lib/server/safe-db";
import { RouterService } from "@/server/services/router.service";
import { IpService } from "@/server/services/ip.service";
import { RelatedGuidesGrid } from "./RelatedGuidesGrid";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepItem {
  title: string;
  description: string;
  tip?: string;
}

export interface RelatedModel {
  name: string;
  slug: string;
}

export interface CredentialItem {
  username?: string;
  password?: string;
  notes?: string;
}

export interface RouterLoginArticleShellProps {
  h1: string;
  intro: string;
  hostname: string;
  brand: string;
  defaultIp: string;
  credentials: CredentialItem[];
  faqs: FAQItem[];
  steps: StepItem[];
  relatedModels?: RelatedModel[];
  breadcrumbs?: { name: string; url: string }[];
  eeatCoverage: string;
  eeatCompatibility: string;
  children: ReactNode;
}

export default async function RouterLoginArticleShell({
  h1,
  intro,
  hostname,
  brand,
  defaultIp,
  credentials,
  faqs,
  steps,
  relatedModels = [],
  breadcrumbs,
  eeatCoverage,
  eeatCompatibility,
  children,
}: RouterLoginArticleShellProps) {
  // Build breadcrumbs if not provided
  const activeBreadcrumbs = breadcrumbs || [
    { name: "Router Login", url: "/router-login" },
    { name: "Router Login Hostnames", url: "/router-login-hostnames" },
    { name: hostname, url: `/${hostname}` },
  ];

  const mappedBreadcrumbs = activeBreadcrumbs.map((b) => ({
    label: b.name,
    href: b.url,
  }));

  // Fetch sidebar links safely
  const dbBrands = await safeDb(async () => RouterService.getAllBrands(), []);
  const dbIps = await safeDb(async () => IpService.getAll(), []);

  const activeBrands = dbBrands.length > 0 ? dbBrands.slice(0, 6) : ROUTER_BRANDS.slice(0, 6);
  const activeIps = dbIps.length > 0 ? dbIps.slice(0, 5) : COMMON_IPS.slice(0, 5);

  // JSON-LD schema generation
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${APP_URL}/${hostname}#article`,
    "headline": h1,
    "description": intro,
    "dependencies": `Network Gateway, Router Interface, DNS Resolver, ${hostname}`,
    "proficiencyLevel": "Intermediate",
    "articleSection": "WiFi & Diagnostics",
    "publisher": {
      "@type": "Organization",
      "name": "RouterVia",
      "logo": {
        "@type": "ImageObject",
        "url": `${APP_URL}/favicon.ico`,
      },
    },
    "author": {
      "@type": "Organization",
      "name": "RouterVia Engineering Group",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": APP_URL,
      },
      ...activeBreadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 2,
        "name": b.name,
        "item": `${APP_URL}${b.url}`,
      })),
    ],
  };

  // Helper to slugify IPs for routing
  const getIpSlug = (ip: string) => {
    return ip.replace(/\./g, "-");
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={mappedBreadcrumbs} className="mb-6" />

        {/* Article Header & EEAT Indicators */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border text-orange-400 border-orange-800/40 bg-orange-900/10">
              <Wifi size={12} /> WiFi & Gateway Setup
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border text-emerald-400 border-emerald-800/40 bg-emerald-950/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Guide
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-4">
            {h1}
          </h1>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-3xl mb-4">
            {intro}
          </p>

          {/* Sleek EEAT Metadata Bar */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-muted)] border-t border-b border-[var(--border-subtle)] py-3">
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Interface Coverage: </span>
              {eeatCoverage}
            </div>
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Firmware: </span>
              {eeatCompatibility}
            </div>
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Reading Time: </span>
              ~8 minutes
            </div>
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Reviewed: </span>
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </div>
          </div>
        </header>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visual Breadcrumb Flow */}
            <div className="flex items-center gap-2 p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)] font-medium">
              <Link href="/router-login" className="hover:text-[var(--brand-400)] transition-colors">Router Login</Link>
              <ArrowRight size={12} className="text-[var(--text-muted)]" />
              <Link href="/router-login-hostnames" className="hover:text-[var(--brand-400)] transition-colors">Hostnames</Link>
              <ArrowRight size={12} className="text-[var(--text-muted)]" />
              <span className="text-[var(--brand-400)] font-bold">{hostname}</span>
            </div>

            {/* Quick Router Login Box */}
            <section aria-label="Quick Router Login Info" className="relative p-6 rounded-2xl border border-[var(--brand-800)]/40 bg-gradient-to-br from-[var(--brand-950)]/20 to-[var(--bg-surface)] overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Lock size={120} />
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Shield size={20} className="text-[var(--brand-400)]" />
                Quick Router Login details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                  <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mb-1">Hostname Address</span>
                  <span className="font-mono text-base font-bold text-[var(--text-primary)]">{hostname}</span>
                </div>
                <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                  <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mb-1">Default IP Gateway</span>
                  <Link href={`/ips/${getIpSlug(defaultIp)}`} className="font-mono text-base font-bold text-[var(--brand-400)] hover:underline flex items-center gap-1">
                    {defaultIp} <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                  <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mb-1">Default Username</span>
                  <span className="font-mono text-base font-bold text-[var(--text-primary)]">
                    {credentials[0]?.username || "admin"}
                  </span>
                </div>
                <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                  <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mb-1">Default Password</span>
                  <span className="font-mono text-base font-bold text-[var(--text-primary)]">
                    {credentials[0]?.password || "admin"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`http://${hostname}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--brand-600)] hover:bg-[var(--brand-500)] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <ExternalLink size={16} /> Open Login Interface
                </a>
                <Link
                  href="/router-reset"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] font-bold text-sm transition-all"
                >
                  <RefreshCw size={16} /> Factory Reset Guide
                </Link>
              </div>
            </section>

            {/* Quick Alternatives Box */}
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)]">
              <span className="font-bold text-[var(--text-primary)] block mb-1">Can&apos;t access {hostname}?</span>
              Try logging in directly using numeric subnets:{" "}
              <Link href={`/ips/${getIpSlug(defaultIp)}`} className="text-[var(--brand-400)] hover:underline font-semibold">{defaultIp}</Link> or alternative local gateway:{" "}
              <Link href={`/ips/192-168-1-1`} className="text-[var(--brand-400)] hover:underline font-semibold">192.168.1.1</Link> / <Link href={`/ips/192-168-0-1`} className="text-[var(--brand-400)] hover:underline font-semibold">192.168.0.1</Link>.
            </div>

            {/* Children (Core word content) */}
            <div className="w-full prose-dark">{children}</div>

            {/* Structured Steps Resolution */}
            <section aria-labelledby="steps-title" className="glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
              <h2 id="steps-title" className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <Settings size={18} className="text-[var(--brand-400)]" />
                Step-by-Step Gateway Connection Flow
              </h2>
              <ol className="relative border-l border-[var(--border-subtle)] ml-3 space-y-6">
                {steps.map((step, idx) => (
                  <li key={idx} className="mb-0 pl-6">
                    <span className="absolute -left-3.5 flex items-center justify-center w-7 h-7 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] text-xs font-bold text-[var(--text-primary)] font-mono">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                      {step.description}
                    </p>
                    {step.tip && (
                      <div className="p-3 bg-[var(--bg-elevated)] border-l-2 border-[var(--brand-500)] rounded-r-lg text-[11px] text-[var(--text-muted)] leading-relaxed italic">
                        <strong>Configuration Tip:</strong> {step.tip}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQs */}
            <section aria-labelledby="faqs-title" className="space-y-4">
              <h2 id="faqs-title" className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <HelpCircle size={18} className="text-[var(--brand-400)]" />
                Expert Q&A & Troubleshooting Insights
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="border border-[var(--border-subtle)] rounded-xl p-5 bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-all duration-300"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Default Credentials Sidebar Panel */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)]/50">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Lock size={14} className="text-[var(--brand-400)]" />
                Default credentials
              </h3>
              <div className="space-y-3">
                {credentials.map((cred, idx) => (
                  <div key={idx} className="text-xs border-b border-[var(--border-subtle)] pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between py-1">
                      <span className="text-[var(--text-muted)]">Username:</span>
                      <span className="font-mono font-bold text-[var(--text-primary)]">{cred.username || "(blank)"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[var(--text-muted)]">Password:</span>
                      <span className="font-mono font-bold text-[var(--text-primary)]">{cred.password || "(blank)"}</span>
                    </div>
                    {cred.notes && (
                      <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-1 italic">
                        {cred.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Router Models */}
            {relatedModels.length > 0 && (
              <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)]/50">
                <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Server size={14} className="text-cyan-400" />
                  Supported Models
                </h3>
                <ul className="space-y-2 text-xs">
                  {relatedModels.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/routers/${brand.toLowerCase().replace(/\s+/g, "-")}/${m.slug}`}
                        className="flex items-center justify-between p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--brand-800)] text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-all"
                      >
                        <span>{m.name}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Alternative Login IPs */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)]/50">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Server size={14} className="text-cyan-400" />
                Router Gateway IPs
              </h3>
              <ul className="space-y-2.5">
                {activeIps.map((ip) => {
                  const slug = "slug" in ip ? ip.slug : (ip as any).ipSlug;
                  const addr = "address" in ip ? ip.address : (ip as any).ipAddress;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/ips/${slug}`}
                        className="flex items-center justify-between text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--brand-800)] transition-all"
                      >
                        <span className="font-mono">{addr}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Compatible Brands */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)]/50">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe size={14} className="text-emerald-400" />
                Compatible Brands
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {activeBrands.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/routers/${b.slug}`}
                    className="text-center text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] p-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--brand-800)] transition-all truncate"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Diagnostic Notice */}
            <div className="p-5 border border-amber-900/30 bg-amber-900/5 rounded-xl">
              <h4 className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                <Info size={14} /> Diagnostic Safety Notice
              </h4>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                Before making any security changes, configuration adjustments, or resetting gateway settings, export a backup configuration file (.bin / .config) locally from your admin panel to restore it if mistakes happen.
              </p>
            </div>
          </aside>
        </div>

        {/* Reusable Related Guides Grid */}
        <RelatedGuidesGrid />
      </div>
    </>
  );
}
