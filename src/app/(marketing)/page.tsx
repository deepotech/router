import type { Metadata } from "next";
import Link from "next/link";
import {
  Wifi,
  Wrench,
  Zap,
  Bot,
  Shield,
  Globe,
  ChevronRight,
  ArrowRight,
  Activity,
  Lock,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SearchBox } from "@/components/search/SearchBox";
import { JsonLd, generateWebSiteSchema } from "@/lib/seo/schema";
import { APP_NAME, APP_URL, ROUTER_BRANDS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "RouterVia — AI-Powered Router & Network Troubleshooting",
  description:
    "Fix any WiFi or router problem instantly with AI. Access router admin pages, configure settings, diagnose network issues, and use free networking tools.",
};

// ---- Static tool cards ----
const tools = [
  {
    id: "ip-checker",
    icon: Globe,
    label: "IP Checker",
    desc: "Find your public IP",
    color: "text-blue-400",
    bg: "bg-blue-900/20",
  },
  {
    id: "dns-checker",
    icon: Activity,
    label: "DNS Checker",
    desc: "Test DNS resolution",
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
  },
  {
    id: "speed-test",
    icon: Zap,
    label: "Speed Test",
    desc: "Measure download/upload",
    color: "text-amber-400",
    bg: "bg-amber-900/20",
  },
  {
    id: "wifi-qr",
    icon: Wifi,
    label: "WiFi QR",
    desc: "Share WiFi instantly",
    color: "text-purple-400",
    bg: "bg-purple-900/20",
  },
  {
    id: "port-checker",
    icon: Shield,
    label: "Port Checker",
    desc: "Check open ports",
    color: "text-red-400",
    bg: "bg-red-900/20",
  },
  {
    id: "password-generator",
    icon: Lock,
    label: "Password Gen",
    desc: "Secure WiFi passwords",
    color: "text-cyan-400",
    bg: "bg-cyan-900/20",
  },
];

const problems = [
  {
    slug: "wifi-connected-no-internet",
    label: "WiFi Connected, No Internet",
  },
  { slug: "slow-internet", label: "Slow Internet Speed" },
  { slug: "dns-not-resolving", label: "DNS Not Resolving" },
];

const stats = [
  { value: "500+", label: "Router Models" },
  { value: "50+", label: "Problem Guides" },
  { value: "7", label: "Free Tools" },
  { value: "AI", label: "Powered Assistant" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateWebSiteSchema(APP_NAME, APP_URL)} />

      {/* ---- Hero ---- */}
      <section className="hero-bg relative overflow-hidden">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(90deg, var(--border-default) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
              <Badge variant="brand">
                <Bot size={12} />
                AI-Powered Troubleshooting
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up stagger-1">
              Fix Any{" "}
              <span className="gradient-text">WiFi & Router</span>
              <br />
              Problem Instantly
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2">
              AI-powered diagnostics, router admin access guides, networking
              tools, and step-by-step troubleshooting for every router brand.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up stagger-3">
              <Link href="/assistant">
                <Button variant="primary" size="lg">
                  <Bot size={18} />
                  Ask AI Assistant
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/routers">
                <Button variant="secondary" size="lg">
                  <Wifi size={18} />
                  Browse Routers
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up stagger-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-2xl font-extrabold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Quick IP Search ---- */}
      <section className="py-12 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
            <SearchBox />
            <Button variant="primary" size="md" className="sm:w-auto w-full" onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>
              Semantic Search
            </Button>
          </div>
          <p className="text-center text-xs text-[var(--text-muted)] mt-3">
            Common:{" "}
            {[
              { label: "192.168.1.1", slug: "192-168-1-1" },
              { label: "192.168.0.1", slug: "192-168-0-1" },
              { label: "192.168.8.1", slug: "192-168-8-1" },
            ].map((ip, i) => (
              <span key={ip.slug}>
                {i > 0 && " · "}
                <Link
                  href={`/ips/${ip.slug}`}
                  className="text-[var(--brand-400)] hover:underline"
                >
                  {ip.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ---- Router Brands ---- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
              Router Brands
            </h2>
            <p className="text-[var(--text-secondary)] mt-1">
              Login guides, default passwords, and setup for every brand
            </p>
          </div>
          <Link
            href="/routers"
            className="hidden sm:flex items-center gap-1 text-sm text-[var(--brand-400)] hover:text-[var(--brand-300)] transition-colors"
          >
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ROUTER_BRANDS.map((brand, i) => (
            <Link
              key={brand.slug}
              href={`/routers/${brand.slug}`}
              className={`glass-card p-5 text-center hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-900)] mx-auto mb-3 flex items-center justify-center">
                <Wifi size={18} className="text-[var(--brand-400)]" />
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Networking Tools ---- */}
      <section className="py-20 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Free Networking Tools
            </h2>
            <p className="text-[var(--text-secondary)]">
              Professional-grade tools right in your browser — no installation
              needed
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className={`glass-card p-5 text-center hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${tool.bg} mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-[var(--transition-fast)]`}
                  >
                    <Icon
                      size={18}
                      className={tool.color}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs font-semibold text-[var(--text-primary)] mb-0.5">
                    {tool.label}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {tool.desc}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/tools">
              <Button variant="secondary" size="md">
                View All Tools <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Common Problems ---- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
              Common Problems
            </h2>
            <p className="text-[var(--text-secondary)] mt-1">
              Step-by-step fixes for the most frequent networking issues
            </p>
          </div>
          <Link
            href="/problems"
            className="hidden sm:flex items-center gap-1 text-sm text-[var(--brand-400)] hover:text-[var(--brand-300)] transition-colors"
          >
            All guides <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <Link
              key={problem.slug}
              href={`/problems/${problem.slug}`}
              className="glass-card p-6 hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Wrench size={18} className="text-red-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {problem.label}
                  </h3>
                  <span className="text-xs text-[var(--brand-400)] flex items-center gap-1">
                    Read fix <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- AI CTA ---- */}
      <section className="py-20 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Bot size={28} className="text-[var(--brand-400)]" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Can&apos;t Find Your Answer?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">
            Our AI assistant will diagnose your problem, identify your router,
            and provide personalized step-by-step fixes — in seconds.
          </p>
          <Link href="/assistant">
            <Button variant="primary" size="lg">
              <Bot size={18} />
              Start AI Troubleshooting
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
