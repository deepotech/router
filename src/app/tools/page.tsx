import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Activity, Zap, Wifi, Shield, Lock, Gauge } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = buildMetadata({
  title: "Free Networking Tools — IP Checker, DNS, Speed Test & More",
  description:
    "Free professional networking tools: IP checker, DNS lookup, speed test, ping test, port checker, WiFi QR generator, and password generator. No install required.",
  canonical: "/tools",
});

const tools = [
  {
    id: "ip-checker",
    icon: Globe,
    label: "IP Checker",
    description: "Instantly find your public IP address, location, and ISP information.",
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    border: "border-blue-800/30",
    category: "Network",
  },
  {
    id: "dns-checker",
    icon: Activity,
    label: "DNS Checker",
    description: "Test DNS resolution for any domain and check propagation status.",
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
    border: "border-emerald-800/30",
    category: "Network",
  },
  {
    id: "speed-test",
    icon: Gauge,
    label: "Speed Test",
    description: "Measure your real download and upload speeds with latency testing.",
    color: "text-amber-400",
    bg: "bg-amber-900/20",
    border: "border-amber-800/30",
    category: "Network",
  },
  {
    id: "ping-test",
    icon: Zap,
    label: "Ping Test",
    description: "Test latency and connectivity to any host or IP address.",
    color: "text-yellow-400",
    bg: "bg-yellow-900/20",
    border: "border-yellow-800/30",
    category: "Network",
  },
  {
    id: "port-checker",
    icon: Shield,
    label: "Port Checker",
    description: "Check if a specific port is open or closed on any host.",
    color: "text-red-400",
    bg: "bg-red-900/20",
    border: "border-red-800/30",
    category: "Security",
  },
  {
    id: "wifi-qr",
    icon: Wifi,
    label: "WiFi QR Generator",
    description: "Generate a QR code to share your WiFi network instantly.",
    color: "text-purple-400",
    bg: "bg-purple-900/20",
    border: "border-purple-800/30",
    category: "WiFi",
  },
  {
    id: "password-generator",
    icon: Lock,
    label: "Password Generator",
    description: "Generate secure, strong passwords for your router and networks.",
    color: "text-cyan-400",
    bg: "bg-cyan-900/20",
    border: "border-cyan-800/30",
    category: "Security",
  },
];

const breadcrumbs = [{ label: "Tools", href: "/tools" }];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          Free Networking Tools
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          Professional-grade tools to diagnose, test, and secure your network — all
          running directly in your browser with no installation needed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className={`glass-card p-6 hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${tool.bg} border ${tool.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className={tool.color} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-[var(--text-primary)]">{tool.label}</h2>
                    <Badge variant="default" size="sm">{tool.category}</Badge>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{tool.description}</p>
                  <span className="mt-3 text-xs text-[var(--brand-400)] group-hover:underline inline-block">
                    Launch tool →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
