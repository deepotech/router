"use client";

import { useState } from "react";
import { Globe, Loader2, RefreshCw, MapPin, Server } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  isp?: string;
  timezone?: string;
}

export default function IpCheckerClient() {
  const [data, setData] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ip");
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(
          errJson.error ||
            "Unable to retrieve IP information right now. Please try again in a few seconds."
        );
      }
      const json = await res.json();
      setData({
        ip: json.ip,
        city: json.city,
        region: json.region,
        country: json.country,
        isp: json.isp,
        timezone: json.timezone,
      });
    } catch (err: any) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to retrieve IP information right now. Please try again in a few seconds."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card p-8 text-center mb-6">
      {!data && !loading && (
        <div className="py-6">
          <Globe size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] mb-6">
            Click the button to reveal your public IP address
          </p>
          <Button variant="primary" size="lg" onClick={check} id="check-ip-btn">
            <Globe size={18} /> Check My IP
          </Button>
        </div>
      )}

      {loading && (
        <div className="py-8">
          <Loader2
            size={36}
            className="text-[var(--brand-400)] mx-auto mb-3 animate-spin"
          />
          <p className="text-[var(--text-secondary)]">Detecting your IP...</p>
        </div>
      )}

      {error && (
        <div className="py-6">
          <p className="text-red-400 mb-4">{error}</p>
          <Button variant="secondary" size="md" onClick={check}>
            Try Again
          </Button>
        </div>
      )}

      {data && !loading && (
        <div>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Your Public IP
          </p>
          <p className="text-5xl font-extrabold font-mono gradient-text mb-6">
            {data.ip}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
            {[
              {
                icon: MapPin,
                label: "Location",
                value: [data.city, data.region, data.country]
                  .filter(Boolean)
                  .join(", "),
              },
              { icon: Server, label: "ISP / Org", value: data.isp },
              { icon: Globe, label: "Timezone", value: data.timezone },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-[var(--bg-elevated)] rounded-xl p-4 border border-[var(--border-subtle)]"
              >
                <Icon size={14} className="text-[var(--text-muted)] mb-1" />
                <p className="text-xs text-[var(--text-muted)]">{label}</p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mt-1 break-words">
                  {value || "N/A"}
                </p>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={check}
            className="mt-5"
          >
            <RefreshCw size={14} /> Refresh
          </Button>
        </div>
      )}
    </div>
  );
}
