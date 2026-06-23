"use client";

import { useState } from "react";
import { Zap, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// =====================================================
// Ping Test Client — Browser-based HTTP HEAD latency
// =====================================================

interface PingResult {
  host: string;
  latency: number | null;
  success: boolean;
}

async function browserPing(host: string): Promise<number | null> {
  const url = host.startsWith("http") ? host : `https://${host}`;
  const start = performance.now();
  try {
    await fetch(url + "?nocache=" + Date.now(), { method: "HEAD", mode: "no-cors" });
    return Math.round(performance.now() - start);
  } catch {
    return null;
  }
}

export default function PingTestClient() {
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

  const successful = results.filter((r) => r.success && r.latency);
  const avg = successful.length
    ? successful.reduce((a, b) => a + (b.latency || 0), 0) / successful.length
    : 0;

  return (
    <div className="space-y-4">
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
          <Zap size={14} /> Ping
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] text-sm font-mono"
            >
              <div className="flex items-center gap-2">
                {r.success ? (
                  <CheckCircle size={14} className="text-emerald-400" />
                ) : (
                  <XCircle size={14} className="text-red-400" />
                )}
                <span className="text-[var(--text-secondary)]">Reply from {r.host}</span>
              </div>
              <span className={r.success ? "text-[var(--brand-400)]" : "text-red-400"}>
                {r.success ? `${r.latency}ms` : "timeout"}
              </span>
            </div>
          ))}
          {results.length === 4 && (
            <div className="flex justify-between text-xs text-[var(--text-muted)] px-1 pt-2 border-t border-[var(--border-subtle)]">
              <span>Packets: {results.filter((r) => r.success).length}/4 received</span>
              <span>Avg: {Math.round(avg)}ms</span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
        {["google.com", "8.8.8.8", "cloudflare.com", "1.1.1.1"].map((h) => (
          <button
            key={h}
            onClick={() => setHost(h)}
            className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-mono"
          >
            {h}
          </button>
        ))}
      </div>
    </div>
  );
}
