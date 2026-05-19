"use client";

import { useState } from "react";
import { Globe, Loader2, RefreshCw, MapPin, Wifi, Server } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  org?: string;
  timezone?: string;
}

const breadcrumbs = [
  { label: "Tools", href: "/tools" },
  { label: "IP Checker", href: "/tools/ip-checker" },
];

export default function IpCheckerPage() {
  const [data, setData] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error("Failed to fetch IP info");
      const json = await res.json();
      setData({
        ip: json.ip,
        city: json.city,
        region: json.region,
        country: json.country_name,
        org: json.org,
        timezone: json.timezone,
      });
    } catch {
      setError("Could not fetch IP information. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900/20 flex items-center justify-center">
            <Globe size={20} className="text-blue-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            IP Checker
          </h1>
        </div>
        <p className="text-[var(--text-secondary)]">
          Find your public IP address, location, ISP, and timezone instantly.
        </p>
      </div>

      <div className="glass-card p-8 text-center mb-6">
        {!data && !loading && (
          <div className="py-6">
            <Globe size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)] mb-6">Click the button to reveal your public IP address</p>
            <Button variant="primary" size="lg" onClick={check} id="check-ip-btn">
              <Globe size={18} /> Check My IP
            </Button>
          </div>
        )}

        {loading && (
          <div className="py-8">
            <Loader2 size={36} className="text-[var(--brand-400)] mx-auto mb-3 animate-spin" />
            <p className="text-[var(--text-secondary)]">Detecting your IP...</p>
          </div>
        )}

        {error && (
          <div className="py-6">
            <p className="text-red-400 mb-4">{error}</p>
            <Button variant="secondary" size="md" onClick={check}>Try Again</Button>
          </div>
        )}

        {data && !loading && (
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">Your Public IP</p>
            <p className="text-5xl font-extrabold font-mono gradient-text mb-6">{data.ip}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              {[
                { icon: MapPin, label: "Location", value: [data.city, data.region, data.country].filter(Boolean).join(", ") },
                { icon: Server, label: "ISP / Org", value: data.org },
                { icon: Globe, label: "Timezone", value: data.timezone },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[var(--bg-elevated)] rounded-xl p-4 border border-[var(--border-subtle)]">
                  <Icon size={14} className="text-[var(--text-muted)] mb-1" />
                  <p className="text-xs text-[var(--text-muted)]">{label}</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mt-1 break-words">{value || "N/A"}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={check} className="mt-5">
              <RefreshCw size={14} /> Refresh
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
