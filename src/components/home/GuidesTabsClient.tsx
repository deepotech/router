"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  type: string;
  createdAt: string;
}

interface GuidesTabsClientProps {
  latestArticles: Article[];
}

const POPULAR_GUIDES: Article[] = [
  {
    id: "pop-1",
    title: "192.168.1.1 Router Login & Setup Guide",
    excerpt: "Learn how to access your router configuration interface, default logins, passwords, and security setup step-by-step.",
    href: "/ips/192-168-1-1",
    type: "IP",
    createdAt: "2026-07-02T00:00:00.000Z",
  },
  {
    id: "pop-2",
    title: "How to Change Your WiFi Password Instantly",
    excerpt: "Protect your wireless network from intruders. Learn how to log in and change your SSID security password.",
    href: "/change-wifi-password",
    type: "Firmware",
    createdAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "pop-3",
    title: "How to Find Router IP Address (Default Gateway)",
    excerpt: "Locked out? Find the correct default gateway IP address on Windows, macOS, Android, and iOS devices.",
    href: "/how-to-find-router-ip-address",
    type: "IP",
    createdAt: "2026-06-30T00:00:00.000Z",
  },
  {
    id: "pop-4",
    title: "Forgot Router Password Recovery Guide",
    excerpt: "Forgot your custom admin credentials? Here is how to restore default login settings with a factory hardware reset.",
    href: "/forgot-router-password",
    type: "Problem",
    createdAt: "2026-06-29T00:00:00.000Z",
  },
  {
    id: "pop-5",
    title: "Fix: DNS Server Not Responding Error",
    excerpt: "Cannot resolve web addresses? Troubleshoot DNS settings on your router or switch to high-speed public DNS.",
    href: "/dns-server-not-responding",
    type: "Problem",
    createdAt: "2026-06-28T00:00:00.000Z",
  },
  {
    id: "pop-6",
    title: "Best Secure DNS Servers for Fast Browsing",
    excerpt: "Compare speed, latency, privacy policies, and security filtering of Cloudflare, Google, OpenDNS, and Quad9.",
    href: "/best-dns-servers",
    type: "Firmware",
    createdAt: "2026-06-27T00:00:00.000Z",
  },
];

const EDITOR_PICKS: Article[] = [
  {
    id: "ed-1",
    title: "Double NAT Detected: Why it Happens & How to Fix",
    excerpt: "Configuring two cascading routers can cause connection conflicts. Learn how to toggle Bridge Mode on your modem-router combo.",
    href: "/double-nat-detected",
    type: "Problem",
    createdAt: "2026-07-02T00:00:00.000Z",
  },
  {
    id: "ed-2",
    title: "WiFi Connected But No Internet on Phones & Tablets",
    excerpt: "Fix device-specific connectivity issues. Solve the no-internet error on Android and iOS wireless clients.",
    href: "/wifi-connected-but-no-internet-phone",
    type: "Problem",
    createdAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "ed-3",
    title: "The Ultimate Port Forwarding Configuration Guide",
    excerpt: "Open internal ports for Minecraft servers, gaming consoles, NAT configurations, and local hosting environments safely.",
    href: "/port-forwarding",
    type: "Firmware",
    createdAt: "2026-06-25T00:00:00.000Z",
  },
  {
    id: "ed-4",
    title: "How to See Who is on My WiFi Network",
    excerpt: "Detect unauthorized connections stealing your bandwidth. Audit wireless client lists using router firmware tables.",
    href: "/how-to-see-who-is-on-my-wifi",
    type: "Firmware",
    createdAt: "2026-06-24T00:00:00.000Z",
  },
  {
    id: "ed-5",
    title: "Gaming Network Optimization & Lag Mitigation",
    excerpt: "Reduce latency, fix jitter, and optimize packet queues by configuring Quality of Service (QoS) priorities.",
    href: "/gaming-network-optimization",
    type: "Firmware",
    createdAt: "2026-06-23T00:00:00.000Z",
  },
  {
    id: "ed-6",
    title: "Best Mesh WiFi Systems for Complete Home Coverage",
    excerpt: "Eliminate wireless dead zones. Compare top dual-band and tri-band mesh systems for seamless coverage.",
    href: "/best-mesh-wifi",
    type: "Firmware",
    createdAt: "2026-06-22T00:00:00.000Z",
  },
];

export function GuidesTabsClient({ latestArticles }: GuidesTabsClientProps) {
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "picks">("latest");

  const getArticles = () => {
    switch (activeTab) {
      case "popular":
        return POPULAR_GUIDES;
      case "picks":
        return EDITOR_PICKS;
      default:
        return latestArticles;
    }
  };

  const currentArticles = getArticles();

  const badgeColors: Record<string, "brand" | "success" | "warning" | "danger" | "outline" | "default"> = {
    IP: "success",
    Problem: "danger",
    Firmware: "brand",
  };

  return (
    <div>
      {/* Tabs list */}
      <div className="flex border-b border-[var(--border-subtle)] mb-8 gap-6">
        <button
          onClick={() => setActiveTab("latest")}
          className={`pb-3 font-semibold text-sm transition-colors relative ${
            activeTab === "latest"
              ? "text-[var(--brand-400)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          aria-selected={activeTab === "latest"}
          role="tab"
        >
          Latest Guides
          {activeTab === "latest" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-500)] rounded-full animate-fade-in-up" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`pb-3 font-semibold text-sm transition-colors relative ${
            activeTab === "popular"
              ? "text-[var(--brand-400)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          aria-selected={activeTab === "popular"}
          role="tab"
        >
          Popular Guides
          {activeTab === "popular" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-500)] rounded-full animate-fade-in-up" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("picks")}
          className={`pb-3 font-semibold text-sm transition-colors relative ${
            activeTab === "picks"
              ? "text-[var(--brand-400)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          aria-selected={activeTab === "picks"}
          role="tab"
        >
          Editor's Picks
          {activeTab === "picks" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-500)] rounded-full animate-fade-in-up" />
          )}
        </button>
      </div>

      {currentArticles.length === 0 ? (
        <div className="glass-card p-12 text-center text-[var(--text-muted)]">
          No articles found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="glass-card p-6 flex flex-col justify-between hover:border-[var(--brand-500)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={badgeColors[article.type] || "default"}>
                    {article.type}
                  </Badge>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
              </div>
              <span className="text-sm font-semibold text-[var(--brand-400)] flex items-center gap-1 group-hover:underline mt-auto">
                Read full guide <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
