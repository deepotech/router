"use client";

import { useState } from "react";
import { Activity, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const breadcrumbs = [
  { label: "Tools", href: "/tools" },
  { label: "DNS Checker", href: "/tools/dns-checker" },
];

interface DnsResult {
  domain: string;
  resolved: boolean;
  ip?: string;
  error?: string;
}

export default function DnsCheckerPage() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<DnsResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/tools/dns?domain=${encodeURIComponent(domain.trim())}`);
      const json = await res.json();
      setResult(json);
    } catch {
      setResult({ domain, resolved: false, error: "Request failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/20 flex items-center justify-center">
            <Activity size={20} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">DNS Checker</h1>
        </div>
        <p className="text-[var(--text-secondary)]">Test DNS resolution for any domain name.</p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex gap-3">
          <input
            id="dns-domain-input"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="example.com"
            className="flex-1 px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all font-mono"
          />
          <Button variant="primary" size="md" onClick={check} loading={loading} id="dns-check-btn">
            Check DNS
          </Button>
        </div>

        {loading && (
          <div className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
            <Loader2 size={18} className="text-[var(--brand-400)] animate-spin" />
            <span className="text-sm text-[var(--text-secondary)]">Resolving {domain}...</span>
          </div>
        )}

        {result && !loading && (
          <div className={`p-5 rounded-xl border ${result.resolved ? "border-emerald-800/50 bg-emerald-900/10" : "border-red-800/50 bg-red-900/10"}`}>
            <div className="flex items-center gap-3 mb-3">
              {result.resolved
                ? <CheckCircle size={20} className="text-emerald-400" />
                : <XCircle size={20} className="text-red-400" />}
              <span className="font-semibold text-[var(--text-primary)]">
                {result.resolved ? "DNS Resolved Successfully" : "DNS Resolution Failed"}
              </span>
            </div>
            <dl className="space-y-2">
              <div className="flex justify-between text-sm">
                <dt className="text-[var(--text-muted)]">Domain</dt>
                <dd className="font-mono text-[var(--text-primary)]">{result.domain}</dd>
              </div>
              {result.ip && (
                <div className="flex justify-between text-sm">
                  <dt className="text-[var(--text-muted)]">Resolved IP</dt>
                  <dd className="font-mono text-[var(--brand-400)]">{result.ip}</dd>
                </div>
              )}
              {result.error && (
                <div className="text-sm text-red-400">{result.error}</div>
              )}
            </dl>
          </div>
        )}

        <div className="pt-2 border-t border-[var(--border-subtle)]">
          <p className="text-xs text-[var(--text-muted)] mb-2">Quick check common domains:</p>
          <div className="flex flex-wrap gap-2">
            {["google.com", "cloudflare.com", "openai.com"].map((d) => (
              <button
                key={d}
                onClick={() => { setDomain(d); }}
                className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-mono"
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
