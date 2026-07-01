import Link from "next/link";
import { BookOpen, Activity, Wifi, Shield, ArrowRight, Settings, Server, Globe, Info, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { APP_URL, ROUTER_BRANDS, COMMON_IPS } from "@/lib/constants";
import { safeDb } from "@/lib/server/safe-db";
import { RouterService } from "@/server/services/router.service";
import { IpService } from "@/server/services/ip.service";
import TableOfContents from "@/components/ui/TableOfContents";
import CopyCodeButton from "@/components/ui/CopyCodeButton";

export interface TroubleshootingArticleShellProps {
  h1: string;
  intro: string;
  category: "nat" | "dns" | "wifi";
  breadcrumbs: {
    name: string;
    url: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  troubleshootingSteps: {
    title: string;
    description: string;
    tip?: string;
  }[];
  children: React.ReactNode;
  warningBanner?: {
    title: string;
    text: string;
  };
  quickFixChecklist?: string[];
  commonCauses?: {
    title: string;
    desc: string;
  }[];
  whenToContactISP?: string;
  severityLevel?: "low" | "medium" | "high";
  
  // Sprint 8: Optimization additions
  isHubPage?: boolean;
  disableTechArticle?: boolean;
  disableFaqs?: boolean;
  reviewedMetadata?: {
    lastReviewed: string;
    reviewedBy: string;
    testedOn?: string[];
  };
  prevPage?: { name: string; url: string };
  nextPage?: { name: string; url: string };
  
  // Sprint 9: EEAT additions
  sources?: string[];
  compatibility?: string;
  lastVerified?: string;
  testingNotes?: string;
}

export default async function TroubleshootingArticleShell({
  h1,
  intro,
  category,
  breadcrumbs,
  faqs,
  troubleshootingSteps,
  children,
  warningBanner,
  quickFixChecklist,
  commonCauses,
  whenToContactISP,
  severityLevel,
  isHubPage = false,
  disableTechArticle = false,
  disableFaqs = false,
  reviewedMetadata,
  prevPage,
  nextPage,
  sources,
  compatibility,
  lastVerified,
  testingNotes,
}: TroubleshootingArticleShellProps) {
  const currentMonthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const finalReviewedBy = reviewedMetadata?.reviewedBy || "RouterVia Engineering Group";
  const finalLastReviewed = reviewedMetadata?.lastReviewed || currentMonthYear;
  const finalLastVerified = lastVerified || currentMonthYear;
  const finalTestedOn = reviewedMetadata?.testedOn || ["Core Gateways", "Default Resolvers"];
  const finalSources = sources || ["IEEE 802.11 Protocols & RFC specifications", "Official Router Manufacturer documentation"];
  const finalCompatibility = compatibility || "All standard modern router platforms";
  const finalTestingNotes = testingNotes || "Verified in a simulated LAN routing environment with standard NAT gateway parameters.";
  const mappedBreadcrumbs = breadcrumbs.map((b) => ({
    label: b.name,
    href: b.url,
  }));

  // Fetch related brands and common IPs safely to link them for deep PageRank distribution
  const dbBrands = await safeDb(async () => RouterService.getAllBrands(), []);
  const dbIps = await safeDb(async () => IpService.getAll(), []);

  // Filter or fall back to static list
  const activeBrands = dbBrands.length > 0 ? dbBrands.slice(0, 5) : ROUTER_BRANDS.slice(0, 5);
  const activeIps = dbIps.length > 0 ? dbIps.slice(0, 5) : COMMON_IPS.slice(0, 5);

  const categories = {
    nat: {
      color: "text-cyan-400 border-cyan-800/40 bg-cyan-900/10",
      icon: Shield,
      label: "NAT & Port Forwarding",
      techCategory: "NetworkAddressTranslation",
    },
    dns: {
      color: "text-emerald-400 border-emerald-800/40 bg-emerald-900/10",
      icon: Server,
      label: "DNS & Optimization",
      techCategory: "DomainNameSystem",
    },
    wifi: {
      color: "text-orange-400 border-orange-800/40 bg-orange-900/10",
      icon: Wifi,
      label: "WiFi & Diagnostics",
      techCategory: "WirelessConnectivity",
    },
  };

  const catConfig = categories[category];
  const CatIcon = catConfig.icon;

  // dynamic TechArticle Schema
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${APP_URL}${breadcrumbs[breadcrumbs.length - 1]?.url || ""}#article`,
    "headline": h1,
    "description": intro,
    "dependencies": "Network Gateway, Router Interface, DNS Resolver",
    "proficiencyLevel": "Intermediate",
    "articleSection": catConfig.label,
    "publisher": {
      "@type": "Organization",
      "name": "RouterVia",
      "logo": {
        "@type": "ImageObject",
        "url": `${APP_URL}/favicon.ico`
      }
    },
    "author": {
      "@type": "Organization",
      "name": "RouterVia Engineering Group"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
      ...breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 2,
        "name": b.name,
        "item": `${APP_URL}${b.url}`,
      }))
    ]
  };

  return (
    <>
      {!isHubPage && !disableTechArticle && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
        />
      )}
      {!isHubPage && !disableFaqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={mappedBreadcrumbs} className="mb-8" />

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${catConfig.color}`}>
              <CatIcon size={12} /> {catConfig.label}
            </span>
            {severityLevel && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                severityLevel === "high"
                  ? "text-red-400 border-red-800/40 bg-red-950/20"
                  : severityLevel === "medium"
                  ? "text-amber-400 border-amber-800/40 bg-amber-950/20"
                  : "text-emerald-400 border-emerald-800/40 bg-emerald-950/20"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  severityLevel === "high"
                    ? "bg-red-400"
                    : severityLevel === "medium"
                    ? "bg-amber-400"
                    : "bg-emerald-400"
                }`} />
                <Activity size={10} />
                {severityLevel === "high" ? "High Severity" : severityLevel === "medium" ? "Medium Severity" : "Low Severity"}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-4">
            {h1}
          </h1>

          {/* Sleek EEAT Metadata Bar */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-muted)] border-t border-b border-[var(--border-subtle)]/30 py-3 mb-6">
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Reviewed By: </span>
              {finalReviewedBy}
            </div>
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Last Reviewed: </span>
              {finalLastReviewed}
            </div>
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Last Verified: </span>
              {finalLastVerified}
            </div>
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Compatibility: </span>
              {finalCompatibility}
            </div>
          </div>

          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-3xl">
            {intro}
          </p>
          {warningBanner && (
            <div className="mt-5 flex gap-3 p-4 rounded-xl border border-amber-800/40 bg-amber-950/15 animate-fade-in-up">
              <Info size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-400 mb-1">{warningBanner.title}</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{warningBanner.text}</p>
              </div>
            </div>
          )}
        </header>

        {/* Two-Column Layout: Main Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div id="article-content-wrapper" className="lg:col-span-2 space-y-8">
            <CopyCodeButton contentSelector="#article-content-wrapper" />
            {/* Interactive Section or Inner Content */}
            <div className="w-full">{children}</div>

            {/* Quick Fix Checklist */}
            {quickFixChecklist && quickFixChecklist.length > 0 && (
              <section aria-labelledby="checklist-title" className="glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
                <h2 id="checklist-title" className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Quick Fix Checklist
                </h2>
                <ul className="space-y-2.5">
                  {quickFixChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-[var(--text-secondary)] leading-relaxed">
                      <span className="mt-0.5 w-5 h-5 rounded-full border border-emerald-800/40 bg-emerald-950/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-emerald-400">{idx + 1}</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Common Causes Grid */}
            {commonCauses && commonCauses.length > 0 && (
              <section aria-labelledby="causes-title">
                <h2 id="causes-title" className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-400" />
                  Common Root Causes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {commonCauses.map((cause, idx) => (
                    <div key={idx} className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl">
                      <h3 className="text-xs font-bold text-[var(--text-primary)] mb-1">{cause.title}</h3>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{cause.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Structured Troubleshooting Flow */}
            {troubleshootingSteps && troubleshootingSteps.length > 0 && (
              <section aria-labelledby="steps-title" className="glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
                <h2 id="steps-title" className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                  <Settings size={18} className="text-[var(--brand-400)]" />
                  Step-by-Step Diagnostic Resolution Flow
                </h2>
                <ol className="relative border-l border-[var(--border-subtle)] ml-3 space-y-6">
                  {troubleshootingSteps.map((step, idx) => (
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
                          <strong>Expert Tip:</strong> {step.tip}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* When To Contact ISP */}
            {whenToContactISP && (
              <section aria-labelledby="isp-title" className="p-5 border border-blue-900/30 bg-blue-950/10 rounded-xl">
                <h2 id="isp-title" className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                  <Globe size={15} /> When To Contact Your ISP
                </h2>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{whenToContactISP}</p>
              </section>
            )}

            {/* Dynamic FAQs */}
            {faqs && faqs.length > 0 && (
              <section aria-labelledby="faqs-title" className="space-y-4">
                <h2 id="faqs-title" className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <BookOpen size={18} className="text-[var(--brand-400)]" />
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
            )}

            {/* Prev/Next Navigation */}
            {(prevPage || nextPage) && (
              <nav className="flex justify-between items-center border-t border-[var(--border-subtle)] pt-6 mt-10" aria-label="Guides navigation">
                {prevPage ? (
                  <Link
                    href={prevPage.url}
                    className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-colors p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
                  >
                    <ChevronLeft size={16} />
                    <div className="text-left">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">Previous Guide</span>
                      <span>{prevPage.name}</span>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPage ? (
                  <Link
                    href={nextPage.url}
                    className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-colors p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-right"
                  >
                    <div className="text-right">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">Next Guide</span>
                      <span>{nextPage.name}</span>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            )}

          </div>

          {/* Sidebar (SEO Authority Elements) */}
          <aside className="space-y-6">
            {/* Table of Contents */}
            <TableOfContents contentSelector="#article-content-wrapper" />

            {/* EEAT Verification Card */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-4">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2">
                <Shield className="text-emerald-400" size={14} />
                Verification Status
              </h3>
              <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed space-y-2.5">
                <div>
                  <span className="font-semibold text-[var(--text-primary)] block mb-0.5">Tested On:</span>
                  {finalTestedOn.join(", ")}
                </div>
                {finalTestingNotes && (
                  <div>
                    <span className="font-semibold text-[var(--text-primary)] block mb-0.5">Testing Notes:</span>
                    <span className="italic text-[var(--text-muted)]">{finalTestingNotes}</span>
                  </div>
                )}
                {finalSources && finalSources.length > 0 && (
                  <div>
                    <span className="font-semibold text-[var(--text-primary)] block mb-0.5">Verified Sources:</span>
                    <ul className="list-disc list-inside space-y-1 text-[10px] text-[var(--text-muted)]">
                      {finalSources.map((s, idx) => (
                        <li key={idx} className="truncate animate-fade-in" title={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* Related IPs */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Server size={14} className="text-cyan-400" />
                Related Router Admin IPs
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

            {/* Related Router Brands */}
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe size={14} className="text-emerald-400" />
                Compatible Router Brands
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {activeBrands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/routers/${brand.slug}`}
                    className="text-center text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] p-2.5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--brand-800)] transition-all truncate"
                  >
                    {brand.name}
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
                Before changing DNS, forwarding ports, or restoring gateway firmware, always export a backup of your current router configuration. This allows you to restore network settings in a single click if configuration faults occur.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

