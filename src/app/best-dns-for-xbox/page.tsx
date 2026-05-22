import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { ShieldCheck, Info } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Best DNS Settings for Xbox Series X/S & One | Low Ping — RouterVia",
  description:
    "Find the absolute best DNS settings for Xbox Series X, S, and Xbox One to speed up downloads and optimize matchmaking latency. Direct setup guide.",
  canonical: "/best-dns-for-xbox",
  keywords: [
    "best dns for xbox",
    "xbox series x dns settings",
    "xbox manual dns lookup",
    "fastest dns for xbox live",
    "xbox download speed fix",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Best DNS for Xbox", url: "/best-dns-for-xbox" },
];

const steps = [
  {
    title: "Access Xbox General Network Settings Menu",
    description: "Press the Xbox button on your controller to summon the guide. Go to Profile & System -> Settings -> General -> Network Settings.",
  },
  {
    title: "Enter the Advanced Settings Console Page",
    description: "In the Network Settings column, scroll down to the bottom right and click on 'Advanced Settings'. Check your current IP and DNS configuration.",
    tip: "You can find your MAC address and current gateway IP on this page as well.",
  },
  {
    title: "Select Manual DNS Setup",
    description: "Click on 'DNS Settings' and select 'Manual'. This overrides your automatic ISP resolution and opens input screens for Primary and Secondary IPv4 settings.",
  },
  {
    title: "Enter Optimized Public DNS IP Addresses",
    description: "Enter Cloudflare's gaming servers: Primary IPv4 DNS: '1.1.1.1', Secondary IPv4 DNS: '1.0.0.1'. Alternatively, configure Google's servers: Primary IPv4 DNS: '8.8.8.8', Secondary IPv4 DNS: '8.8.4.4'. Save parameters.",
    tip: "If your network supports IPv6, you can configure manual IPv6 DNS using Cloudflare's 2606:4700:4700::1111 and 2606:4700:4700::1001.",
  },
  {
    title: "Confirm Network Connection Status",
    description: "The console will verify the connection and return you to the Advanced Settings dashboard. Click on 'Test Network Connection' to confirm that Xbox Live is fully active with high-speed DNS mappings.",
  },
];

const faqs = [
  {
    question: "Does changing DNS improve my Xbox multiplayer matchmaking?",
    answer: "Yes. Xbox Live relies on resolving multiple hostname clusters to construct multiplayer parties, verify matchmaking lobbies, and establish secure voice chat channels. When your DNS resolves these hosts in 5ms rather than 50ms, lobby handshakes complete much quicker, reducing search queues and errors.",
  },
  {
    question: "How do I fix 'DNS is not resolving Xbox server names'?",
    answer: "This error means your Xbox cannot find the numeric IP for Xbox Live authentication servers. You can fix this immediately by selecting 'Manual DNS Settings' in your Xbox Network console and entering Cloudflare's public DNS (1.1.1.1) or Google's DNS (8.8.8.8).",
  },
  {
    question: "Can I use IPv6 DNS on Xbox?",
    answer: "Yes, if your router and ISP natively support IPv6, you can configure manual IPv6 settings. Cloudflare's primary IPv6 DNS is '2606:4700:4700::1111' and secondary is '2606:4700:4700::1001'. IPv6 completely bypasses NAT translation layers, helping you get an Open NAT type naturally.",
  },
];

export default async function BestDnsForXboxPage() {
  return (
    <TroubleshootingArticleShell
      h1="Best DNS for Xbox Settings"
      intro="Tired of slow patch downloads, high-latency matchmaking queues, or DNS resolution timeouts on Xbox Live? Discover how to configure manual DNS settings."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={steps}
    >
      <div className="space-y-6">
        {/* Comparison grid for Xbox */}
        <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl bg-gradient-to-br from-emerald-950/10 via-transparent to-transparent space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-400" />
            Top DNS Recommendations for Xbox Live
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            These independent recursive DNS clusters are highly optimized for Xbox Series X/S and Xbox One players:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Cloudflare DNS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Extremely low resolution overhead, perfect for competitive shooters.</span>
              </div>
              <div className="text-right font-mono text-[var(--text-secondary)]">
                <span className="block text-[var(--text-primary)] font-semibold">1.1.1.1</span>
                <span className="block text-[10px] text-[var(--text-muted)]">1.0.0.1</span>
              </div>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Google Public DNS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Excellent caching bandwidth for 100GB+ game patch downloads.</span>
              </div>
              <div className="text-right font-mono text-[var(--text-secondary)]">
                <span className="block text-[var(--text-primary)] font-semibold">8.8.8.8</span>
                <span className="block text-[10px] text-[var(--text-muted)]">8.8.4.4</span>
              </div>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Quad9 DNS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Built-in threat lookup blocklist, enhancing console network safety.</span>
              </div>
              <div className="text-right font-mono text-[var(--text-secondary)]">
                <span className="block text-[var(--text-primary)] font-semibold">9.9.9.9</span>
                <span className="block text-[10px] text-[var(--text-muted)]">149.112.112.112</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TroubleshootingArticleShell>
  );
}
