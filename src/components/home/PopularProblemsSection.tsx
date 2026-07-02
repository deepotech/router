import Link from "next/link";
import { AlertTriangle, Key, WifiOff, RefreshCw, Radio, Settings, Share2, Globe, Wifi, Activity } from "lucide-react";

interface ProblemItem {
  title: string;
  description: string;
  href: string;
  icon: any;
  severity: "high" | "medium" | "low";
}

const PROBLEMS: ProblemItem[] = [
  {
    title: "Router Login Not Working",
    description: "Cannot access the admin setup page at 192.168.1.1 or other gateway IP addresses.",
    href: "/router-login-not-working",
    icon: AlertTriangle,
    severity: "high",
  },
  {
    title: "192.168.1.1 Login",
    description: "Step-by-step setup instructions to access and configure your default gateway IP.",
    href: "/ips/192-168-1-1",
    icon: Globe,
    severity: "medium",
  },
  {
    title: "Forgot Router Password",
    description: "How to recover admin passwords or perform a factory reset to regain control.",
    href: "/forgot-router-password",
    icon: Key,
    severity: "high",
  },
  {
    title: "Router Keeps Disconnecting",
    description: "Fix unstable wireless connections, dropping signals, and interface reboots.",
    href: "/router-keeps-disconnecting",
    icon: WifiOff,
    severity: "high",
  },
  {
    title: "WiFi Connected But No Internet",
    description: "Resolve the common status of having local connection but no upstream access.",
    href: "/wifi-connected-but-no-internet-phone",
    icon: Radio,
    severity: "medium",
  },
  {
    title: "Router Red Light",
    description: "Diagnose flashing or solid red internet/WAN status lights on your router.",
    href: "/problems/router-red-light",
    icon: Activity,
    severity: "high",
  },
  {
    title: "Port Forwarding",
    description: "Configure NAT rules to open specific ports for gaming consoles or local servers.",
    href: "/port-forwarding",
    icon: Share2,
    severity: "medium",
  },
  {
    title: "Double NAT",
    description: "Fix multiple router conflicts when connecting cascading routers to modems.",
    href: "/double-nat-detected",
    icon: Settings,
    severity: "medium",
  },
  {
    title: "DNS Problems",
    description: "Fix 'DNS Server Not Responding' and pick the fastest secure public DNS servers.",
    href: "/dns-server-not-responding",
    icon: Wifi,
    severity: "low",
  },
  {
    title: "Internet Connected No Access",
    description: "Troubleshoot Ethernet and Wi-Fi networks showing local link with no internet.",
    href: "/internet-connected-no-access",
    icon: RefreshCw,
    severity: "medium",
  },
];

export function PopularProblemsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Most Popular Router Problems
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Select your network problem below to view detailed, step-by-step diagnostic and repair instructions.
            </p>
          </div>
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-400)] hover:text-[var(--brand-300)] hover:underline transition-colors"
          >
            All Problems <AlertTriangle size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((prob) => {
            const Icon = prob.icon;
            return (
              <Link
                key={prob.title}
                href={prob.href}
                className="glass-card p-6 flex flex-col justify-between hover:border-[var(--brand-500)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--brand-400)] group-hover:border-[var(--brand-800)] transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                      {prob.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {prob.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className={`px-2 py-0.5 rounded font-semibold ${
                    prob.severity === "high" 
                      ? "bg-red-950/50 text-red-400 border border-red-900/50" 
                      : prob.severity === "medium"
                      ? "bg-amber-950/50 text-amber-400 border border-amber-900/50"
                      : "bg-blue-950/50 text-blue-400 border border-blue-900/50"
                  }`}>
                    {prob.severity.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-[var(--brand-400)] group-hover:underline">
                    Fix Problem &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
