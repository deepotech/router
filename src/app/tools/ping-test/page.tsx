"use client";

import { useState } from "react";
import { Zap, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const breadcrumbs = [
  { label: "Tools", href: "/tools" },
  { label: "Ping Test", href: "/tools/ping-test" },
];

interface PingResult { host: string; latency: number | null; success: boolean; }

async function browserPing(host: string): Promise<number | null> {
  const url = host.startsWith("http") ? host : `https://${host}`;
  const start = performance.now();
  try {
    await fetch(url + "?nocache=" + Date.now(), { method: "HEAD", mode: "no-cors" });
    return Math.round(performance.now() - start);
  } catch { return null; }
}

export default function PingTestPage() {
  const [host, setHost] = useState("");
  const [results, setResults] = useState<PingResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!host.trim()) return;
    setLoading(true);
    setResults([]);
    const pings: PingResult[] = [];
    for (let i = 0; i < 4; i++) {
      const latency = await browserPing(host.trim());
      pings.push({ host: host.trim(), latency, success: latency !== null });
      setResults([...pings]);
      await new Promise((r) => setTimeout(r, 500));
    }
    setLoading(false);
  }

  const avg = results.filter(r => r.success && r.latency).reduce((a, b) => a + (b.latency || 0), 0) / (results.filter(r => r.success).length || 1);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={breadcrumbs} className="mb-8" />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-900/20 flex items-center justify-center">
            <Zap size={20} className="text-yellow-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">Ping Test</h1>
        </div>
        <p className="text-[var(--text-secondary)]">Test connectivity and latency to any host. (Browser-based — uses HTTP HEAD requests.)</p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex gap-3">
          <input
            id="ping-host-input"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="google.com or 8.8.8.8"
            className="flex-1 px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm font-mono transition-all"
          />
          <Button variant="primary" size="md" onClick={run} loading={loading} id="ping-btn">
            Ping
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] text-sm font-mono">
                <div className="flex items-center gap-2">
                  {r.success
                    ? <CheckCircle size={14} className="text-emerald-400" />
                    : <XCircle size={14} className="text-red-400" />}
                  <span className="text-[var(--text-secondary)]">Reply from {r.host}</span>
                </div>
                <span className={r.success ? "text-[var(--brand-400)]" : "text-red-400"}>
                  {r.success ? `${r.latency}ms` : "timeout"}
                </span>
              </div>
            ))}
            {results.length === 4 && (
              <div className="flex justify-between text-xs text-[var(--text-muted)] px-1 pt-2 border-t border-[var(--border-subtle)]">
                <span>Packets: {results.filter(r => r.success).length}/4 received</span>
                <span>Avg: {Math.round(avg)}ms</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
          {["google.com", "8.8.8.8", "cloudflare.com"].map((h) => (
            <button key={h} onClick={() => setHost(h)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-mono">
              {h}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
