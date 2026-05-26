import React from "react";
import TroubleshootingArticleShell from "./TroubleshootingArticleShell";
import ConnectionOptimizerClient from "./ConnectionOptimizerClient";
import {
  BrandRouterBadge,
  ISPWarningBanner,
  HardwareFailureCard,
} from "./BrandIssueComponents";
import { BrandIssueConfig } from "@/lib/config/brand-issues";
import Link from "next/link";
import {
  ShieldAlert,
  Globe,
  BookOpen,
  Activity,
} from "lucide-react";

interface BrandIssueArticleShellProps {
  config: BrandIssueConfig;
}

export default async function BrandIssueArticleShell({
  config,
}: BrandIssueArticleShellProps) {
  const quickNavItems = [
    { label: "Quick Answer", id: "quick-answer" },
    { label: "Common Causes", id: "common-causes" },
    { label: "Diagnostics", id: "diagnostics-table" },
    { label: "Technical Guide", id: "technical-guide" },
    { label: "Hardware Failure", id: "hardware-failure" },
    { label: "ISP Detection", id: "isp-diagnostics" },
    { label: "Fix Matrix", id: "fix-matrix" },
  ];

  // Map configuration for TroubleshootingArticleShell
  const breadcrumbs = [
    {
      name: "Router Problems",
      url:
        config.slug === "tp-link-login-not-working" ||
        config.slug === "asus-router-red-light"
          ? "/router-login-not-working"
          : "/router-keeps-restarting",
    },
    { name: config.seo.title.split("?")[0], url: config.seo.canonical },
  ];

  // We can pass the static aspects to the base TroubleshootingArticleShell
  return (
    <TroubleshootingArticleShell
      h1={config.h1}
      intro={config.intro}
      category={config.issueType}
      breadcrumbs={breadcrumbs}
      faqs={config.faq}
      troubleshootingSteps={config.quickFixes.map((fix, idx) => ({
        title: `Fix Step ${idx + 1}`,
        description: fix,
      }))}
      warningBanner={{
        title: config.warningBanner.title,
        text: config.warningBanner.text,
      }}
      quickFixChecklist={config.quickFixes}
      commonCauses={config.commonCauses}
      whenToContactISP={config.whenToContactISP}
      severityLevel={config.severityLevel}
    >
      <div className="space-y-6">
        {/* Sticky floating quick navigation anchors */}
        <nav
          className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 py-2.5 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center gap-2 overflow-x-auto no-scrollbar mb-6"
          aria-label="Article navigation"
        >
          <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)] mr-2 whitespace-nowrap flex items-center gap-1">
            <Activity size={10} /> Jump To:
          </span>
          {quickNavItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3 py-1 rounded-full text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--brand-500)] transition-all whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Brand Badge */}
        <BrandRouterBadge
          brandName={config.brand}
          seriesLabel={config.seriesLabel}
          accentColor={config.accentColor}
          icon={config.icon}
        />

        {/* Quick Answer AI Snippet */}
        <section
          id="quick-answer"
          className={`glass-card p-5 border rounded-2xl relative overflow-hidden scroll-mt-28 ${
            config.accentColor === "red"
              ? "border-red-950/20 bg-red-950/5"
              : config.accentColor === "orange"
              ? "border-orange-950/20 bg-orange-950/5"
              : config.accentColor === "emerald"
              ? "border-emerald-950/20 bg-emerald-950/5"
              : "border-blue-950/20 bg-blue-950/5"
          }`}
          aria-label="Quick Answer Summary"
        >
          <div
            className={`absolute top-0 right-0 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold ${
              config.accentColor === "red"
                ? "bg-red-500/10 text-red-400"
                : config.accentColor === "orange"
                ? "bg-orange-500/10 text-orange-400"
                : config.accentColor === "emerald"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            AIO Quick Answer
          </div>
          <h3
            className={`text-xs font-bold mb-2 uppercase tracking-wide ${
              config.accentColor === "red"
                ? "text-red-400"
                : config.accentColor === "orange"
                ? "text-orange-400"
                : config.accentColor === "emerald"
                ? "text-emerald-400"
                : "text-blue-400"
            }`}
          >
            Quick Diagnostic Summary
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li>
              <strong>Symptoms:</strong> {config.aiSnippet.symptoms.join(" ")}
            </li>
            <li>
              <strong>Primary Cause:</strong> {config.aiSnippet.primaryCause}
            </li>
            <li>
              <strong>Fastest Safe Fix:</strong> {config.aiSnippet.fastestFix}
            </li>
          </ul>
        </section>

        {/* Connection Optimizer Client */}
        <ConnectionOptimizerClient mode={config.optimizerMode} />

        {/* ISP Warning Banner / Dynamic Notice */}
        <section id="common-causes" className="scroll-mt-28 space-y-4">
          <ISPWarningBanner
            title={`Hardware Power & Subnet Check: ${config.brand}`}
            body={config.warningBanner.text}
            variant={config.severityLevel === "high" ? "danger" : "warning"}
            escalationSteps={config.quickFixes.slice(0, 3)}
          />
        </section>

        {/* Main Article Container */}
        <article className="prose prose-invert max-w-none space-y-8 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          {/* Diagnostics Table */}
          <section id="diagnostics-table" className="scroll-mt-28 space-y-3">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              {config.diagnosticTable.title}
            </h2>
            <p>
              Match your symptoms with the root cause mechanisms to narrow down
              troubleshooting:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    {config.diagnosticTable.headers.map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {config.diagnosticTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="px-3 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dynamic Technical Guide Sections */}
          <section id="technical-guide" className="scroll-mt-28 space-y-6">
            {config.technicalSections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-sm font-bold text-[var(--text-primary)]">
                  {section.title}
                </h2>

                {section.type === "text" && section.content && (
                  <div className="space-y-3">
                    {section.content.map((p, pidx) => (
                      <p key={pidx}>{p}</p>
                    ))}
                  </div>
                )}

                {section.type === "code" && section.code && (
                  <div className="space-y-2">
                    <pre className="bg-[var(--bg-elevated)] p-3 rounded-lg text-[10px] text-emerald-400 font-mono overflow-x-auto">
                      <code>{section.code}</code>
                    </pre>
                    {section.codeCaption && (
                      <p className="text-[11px] text-[var(--text-muted)] italic">
                        {section.codeCaption}
                      </p>
                    )}
                  </div>
                )}

                {section.type === "list" && section.content && (
                  <div className="space-y-2">
                    {section.listType === "ordered" ? (
                      <ol className="list-decimal pl-5 space-y-1.5 text-[11px] text-[var(--text-muted)]">
                        {section.content.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="list-disc pl-5 space-y-1.5 text-[11px] text-[var(--text-muted)]">
                        {section.content.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {section.type === "table" && section.table && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                      <thead>
                        <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                          {section.table.headers.map((h, i) => (
                            <th key={i} className="px-3 py-2 text-left">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-subtle)]">
                        {section.table.rows.map((row, ridx) => (
                          <tr key={ridx}>
                            {row.map((cell, cidx) => (
                              <td key={cidx} className="px-3 py-2">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Hardware Failure Card & Advice */}
          <section id="hardware-failure" className="scroll-mt-28">
            <HardwareFailureCard
              brandName={config.brand}
              indicators={config.hardwareFailureSigns}
              replacementAdvice={config.replacementAdvice}
            />
          </section>

          {/* E-E-A-T Diagnostic Insights */}
          <section id="isp-diagnostics" className="scroll-mt-28 space-y-6">
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 rounded-2xl space-y-4">
              <div className="flex gap-2.5 items-start">
                <Globe className="text-[var(--brand-400)] mt-0.5" size={16} />
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    How ISPs Detect This Issue Remotely
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {config.ispDetection}
                  </p>
                </div>
              </div>

              <hr className="border-[var(--border-subtle)]" />

              <div className="flex gap-2.5 items-start">
                <ShieldAlert className="text-red-400 mt-0.5" size={16} />
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    When to Stop Troubleshooting
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {config.whenToStopTroubleshooting}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Fix Matrix Table */}
          <section id="fix-matrix" className="scroll-mt-28 space-y-3">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              {config.fixMatrix.title}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    {config.fixMatrix.headers.map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {config.fixMatrix.rows.map((row, ridx) => (
                    <tr key={ridx}>
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="px-3 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Contextual Internal Links */}
          <section className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-3">
            <h4 className="font-bold text-[var(--text-primary)] text-xs flex items-center gap-1.5">
              <BookOpen size={14} className="text-[var(--brand-400)]" />
              Related Router Diagnostics & Performance Guides
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-[11px]">
              {config.internalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[var(--brand-400)] hover:underline"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
