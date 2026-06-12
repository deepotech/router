import type { Metadata } from "next";
import Link from "next/link";
import {
  Wifi,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Award,
  HelpCircle,
  HardDrive,
  Info,
  Lock,
  Settings,
  RefreshCw,
  Sliders,
  Layers,
  ShoppingBag,
  Link2
} from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { JsonLd, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { hasDatabase } from "@/lib/server/env-safe";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "Router Brands Directory: Login IPs, Setup Guides & Troubleshooting",
  description:
    "Browse router brands including TP-Link, ASUS, Huawei, Netgear, D-Link, ZTE, Linksys and Xiaomi. Find default login addresses, setup instructions, Wi-Fi settings and troubleshooting guides.",
  canonical: "/routers",
  keywords: [
    "router brands",
    "router manufacturers",
    "router login ip",
    "default router ip",
    "router admin address",
    "tp-link login",
    "asus router login",
    "huawei router login",
    "netgear router login",
    "router setup guide",
  ],
});

// Force dynamic to prevent Prisma queries during Railway build phase
export const dynamic = "force-dynamic";

// ---- Brand Details Hardcoded mapping for Cards ----
const BRAND_DETAILS: Record<string, { defaultIp: string; alternativeAddress?: string }> = {
  "tp-link": { defaultIp: "192.168.0.1", alternativeAddress: "tplinkwifi.net" },
  "asus": { defaultIp: "192.168.1.1", alternativeAddress: "router.asus.com" },
  "netgear": { defaultIp: "192.168.1.1", alternativeAddress: "routerlogin.net" },
  "huawei": { defaultIp: "192.168.3.1", alternativeAddress: "huaweiwifi.com" },
  "d-link": { defaultIp: "192.168.0.1", alternativeAddress: "dlinkrouter.local" },
  "zte": { defaultIp: "192.168.1.1" },
  "linksys": { defaultIp: "192.168.1.1" },
  "xiaomi": { defaultIp: "192.168.31.1" },
  "tenda": { defaultIp: "192.168.0.1", alternativeAddress: "tendawifi.com" },
  "mercusys": { defaultIp: "192.168.1.1", alternativeAddress: "mwlogin.net" },
  "cisco": { defaultIp: "192.168.1.1" },
  "belkin": { defaultIp: "192.168.2.1", alternativeAddress: "router" },
  "arris": { defaultIp: "192.168.0.1" },
};

export default async function RoutersPage() {
  let brands: any[] = [];
  if (hasDatabase) {
    try {
      brands = await RouterService.getAllBrands();
    } catch (error) {
      console.error("[Build] Failed to fetch brands:", error);
    }
  }
  const breadcrumbs = [{ label: "Routers", href: "/routers" }];

  // ---- Structured Data (JSON-LD) ----
  const breadcrumbSchema = buildBreadcrumbSchema(
    [{ label: "Home", href: "/" }, ...breadcrumbs],
    APP_URL
  );

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/routers#webpage`,
    "url": `${APP_URL}/routers`,
    "name": "Router Brands Directory: Login IPs, Setup Guides & Troubleshooting",
    "description": "Browse router brands including TP-Link, ASUS, Huawei, Netgear, D-Link, ZTE, Linksys and Xiaomi. Find default login addresses, setup instructions, Wi-Fi settings and troubleshooting guides.",
    "about": {
      "@type": "Thing",
      "name": "Router Brands",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/routers#itemlist`,
    "name": "Popular Router Brands",
    "numberOfItems": brands.length,
    "itemListElement": brands.map((brand, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Brand",
        "name": brand.name,
        "url": `${APP_URL}/routers/${brand.slug}`,
        "description": brand.description || undefined,
      },
    })),
  };

  const faqs = [
    {
      question: "What is the most reliable router brand?",
      answer: "TP-Link and ASUS are widely considered the most reliable router brands for general consumers, offering consistent firmware updates, excellent hardware durability, and robust Wi-Fi range.",
    },
    {
      question: "What router brand is best for gaming?",
      answer: "ASUS is the leading brand for gaming routers, particularly its ROG (Republic of Gamers) and TUF Gaming lines, which feature advanced QoS (Quality of Service) controls, geofiltering, and dedicated gaming ports.",
    },
    {
      question: "Is TP-Link better than ASUS?",
      answer: "TP-Link is generally better for budget-conscious users and average home settings due to its affordability and ease of use. ASUS is better for power users, gamers, and tech enthusiasts who require advanced settings, security controls, and high-performance hardware.",
    },
    {
      question: "What is the default router IP?",
      answer: "The most common default router IP addresses are 192.168.1.1 and 192.168.0.1. However, some brands use alternative addresses like 192.168.3.1 (Huawei) or 192.168.31.1 (Xiaomi).",
    },
    {
      question: "Can I change my router login IP?",
      answer: "Yes, you can change your router's default login IP address (LAN IP) by accessing the router settings page, navigating to the Network or LAN Settings section, and entering a new IP address. Doing this helps prevent local network conflicts.",
    },
    {
      question: "Which router brands support Wi-Fi 7?",
      answer: "Major router brands including ASUS, TP-Link, and Netgear offer Wi-Fi 7 routers. These devices support the 6 GHz band, 320 MHz channel width, and multi-link operation (MLO) for ultra-fast, low-latency connectivity.",
    },
    {
      question: "Which router brands offer mesh systems?",
      answer: "Brands like Linksys (Velop), Netgear (Orbi), TP-Link (Deco), and ASUS (ZenWiFi) offer dedicated mesh Wi-Fi systems that eliminate dead zones by blanketing your home with a single, seamless Wi-Fi network.",
    },
    {
      question: "Why can't I access 192.168.1.1?",
      answer: "If you cannot access 192.168.1.1, ensure you are connected to the router's network (via Wi-Fi or Ethernet). Check that 192.168.1.1 is indeed your gateway IP by running 'ipconfig' in Windows Command Prompt and looking for the 'Default Gateway'. Also, try temporarily disabling VPNs or firewall software.",
    },
    {
      question: "Is WPA3 necessary?",
      answer: "While not strictly necessary, WPA3 provides much stronger security than WPA2 by offering protection against brute-force password attacks and securing individual data encryption on public or guest networks. It is highly recommended to enable it if your router and devices support it.",
    },
    {
      question: "How often should router firmware be updated?",
      answer: "You should update your router's firmware every 3 to 6 months. Frequent updates ensure your router has the latest security patches, performance optimizations, and bug fixes to protect your home network from new vulnerabilities.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbs} className="mb-8" />

        {/* Hero Section */}
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4 tracking-tight">
            Router Brands <span className="gradient-text">Directory</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-3xl leading-relaxed">
            Find login IPs, default admin addresses, setup guides, Wi-Fi configuration help, firmware basics, and troubleshooting resources for popular router brands.
          </p>
        </div>

        {/* Featured Snippet Table */}
        <div className="mb-16 glass-card p-6 border border-[var(--border-subtle)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Info size={20} className="text-[var(--brand-400)]" />
            Quick Reference: Default Router Logins
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="pb-3 pr-4">Brand</th>
                  <th className="pb-3 px-4">Default Login IP</th>
                  <th className="pb-3 pl-4">Alternative Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">TP-Link</td>
                  <td className="py-3 px-4">
                    <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.0.1</Link>
                  </td>
                  <td className="py-3 pl-4 font-mono text-[var(--brand-400)]">tplinkwifi.net</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">ASUS</td>
                  <td className="py-3 px-4">
                    <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.1.1</Link>
                  </td>
                  <td className="py-3 pl-4 font-mono text-[var(--brand-400)]">router.asus.com</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Netgear</td>
                  <td className="py-3 px-4">
                    <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.1.1</Link>
                  </td>
                  <td className="py-3 pl-4 font-mono text-[var(--brand-400)]">routerlogin.net</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Huawei</td>
                  <td className="py-3 px-4">
                    <Link href="/ips/192-168-3-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.3.1</Link>
                  </td>
                  <td className="py-3 pl-4 font-mono text-[var(--brand-400)]">huaweiwifi.com</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">D-Link</td>
                  <td className="py-3 px-4">
                    <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.0.1</Link>
                  </td>
                  <td className="py-3 pl-4 font-mono text-[var(--brand-400)]">dlinkrouter.local</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">ZTE</td>
                  <td className="py-3 px-4">
                    <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.1.1</Link>
                  </td>
                  <td className="py-3 pl-4 font-mono">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Brands Grid Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Explore Router Brands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, i) => {
              const details = BRAND_DETAILS[brand.slug];
              return (
                <Link
                  key={brand.slug}
                  href={`/routers/${brand.slug}`}
                  className={`glass-card p-6 flex flex-col justify-between hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-1 transition-all duration-[var(--transition-base)] group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                >
                  <div>
                    {/* Top Row: Icon & Brand Name */}
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-[var(--transition-fast)]">
                          <Wifi size={22} className="text-[var(--brand-400)]" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                          {brand.name}
                        </h3>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-[var(--text-muted)] group-hover:text-[var(--brand-400)] group-hover:translate-x-1 transition-all flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>

                    {brand.description && (
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-6 leading-relaxed">
                        {brand.description}
                      </p>
                    )}
                  </div>

                  {/* Info Specifications Grid */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
                    <div>
                      <span className="block font-semibold text-[var(--text-muted)] mb-0.5">Default IP</span>
                      <span className="font-mono text-[var(--text-primary)] font-medium">
                        {details?.defaultIp || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="block font-semibold text-[var(--text-muted)] mb-0.5">Login URL</span>
                      <span className="font-mono text-[var(--text-primary)] font-medium truncate block" title={details?.alternativeAddress}>
                        {details?.alternativeAddress || "—"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block font-semibold text-[var(--text-muted)] mb-0.5">Models</span>
                      <Badge variant="default" size="sm" className="inline-block px-1.5 py-0.5 text-[10px]">
                        {brand.modelCount ?? 0}
                      </Badge>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 1. Top Router Brands by Market Share */}
        <div className="mb-16 glass-card p-8 border border-[var(--border-subtle)]">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Award size={22} className="text-[var(--brand-400)]" />
            Top Router Brands by Market Share
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
            Different router manufacturers focus on specific target demographics. Review the global market positions and primary specializations of the industry leaders below.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="pb-3 pr-4">Brand</th>
                  <th className="pb-3 px-4">Market Position</th>
                  <th className="pb-3 pl-4">Best Known For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">TP-Link</td>
                  <td className="py-3 px-4">Global Leader</td>
                  <td className="py-3 pl-4">Reliable Home Networking & Value</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">ASUS</td>
                  <td className="py-3 px-4">Premium</td>
                  <td className="py-3 pl-4">High-Performance Gaming & Advanced Features</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Netgear</td>
                  <td className="py-3 px-4">Premium</td>
                  <td className="py-3 pl-4">Raw Throughput & Performance</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Huawei</td>
                  <td className="py-3 px-4">ISP Market</td>
                  <td className="py-3 pl-4">Fiber Optic Routers & Telecom Modems</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Xiaomi</td>
                  <td className="py-3 px-4">Budget / IoT</td>
                  <td className="py-3 pl-4">Smart Home Integration & Value pricing</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Linksys</td>
                  <td className="py-3 px-4">Mesh Expert</td>
                  <td className="py-3 pl-4">Whole-Home Mesh Coverage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Decision Tree Section */}
        <div className="mb-16 bg-[var(--bg-elevated)] p-6 rounded-2xl border border-[var(--border-subtle)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Sliders size={20} className="text-[var(--brand-400)]" />
            Router Brand Decision Tree
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-5 leading-relaxed">
            Struggling to decide on a brand? Use this interactive logic flow diagram to find the manufacturer that best fits your immediate internet needs.
          </p>
          <pre className="font-mono text-xs sm:text-sm text-[var(--brand-300)] bg-[var(--bg-base)] p-4 rounded-xl border border-[var(--border-subtle)] overflow-x-auto whitespace-pre leading-relaxed">
{`Need Gaming?
 ├─ Yes → ASUS (High performance, advanced QoS, gaming ports)
 └─ No
      ├─ Need Mesh? → Linksys (Exceptional coverage, modular design)
      ├─ Need Budget? → D-Link (Reliable, cost-effective options)
      ├─ Need Fiber? → Netgear (Ideal for ultra-fast gigabit connections)
      └─ Need Smart Home? → Xiaomi (Optimized for IoT integration)`}
          </pre>
        </div>

        {/* 3. Brand Comparison & Problems Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Comparison Table */}
          <div className="glass-card p-6 border border-[var(--border-subtle)]">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Layers size={20} className="text-[var(--brand-400)]" />
              Router Brand Strengths
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
                <thead>
                  <tr className="text-[var(--text-primary)] font-semibold text-left">
                    <th className="pb-3 pr-4">Brand</th>
                    <th className="pb-3 pl-4">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">ASUS</td>
                    <td className="py-2.5 pl-4">Gaming & Power Users</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">TP-Link</td>
                    <td className="py-2.5 pl-4">General Home Users</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Huawei</td>
                    <td className="py-2.5 pl-4">ISP Routers & Fiber Lines</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Netgear</td>
                    <td className="py-2.5 pl-4">Performance & Speed Seekers</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">D-Link</td>
                    <td className="py-2.5 pl-4">Budget-Conscious Buyers</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Xiaomi</td>
                    <td className="py-2.5 pl-4">Smart Homes & IoT ecosystem</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Linksys</td>
                    <td className="py-2.5 pl-4">Mesh Systems & Large Homes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Problems by Brand */}
          <div className="glass-card p-6 border border-[var(--border-subtle)]">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-[var(--brand-400)]" />
              Common Problems by Brand
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
                <thead>
                  <tr className="text-[var(--text-primary)] font-semibold text-left">
                    <th className="pb-3 pr-4">Brand</th>
                    <th className="pb-3 pl-4">Common Issue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">TP-Link</td>
                    <td className="py-2.5 pl-4">
                      <Link href="/tp-link-login-not-working" className="text-[var(--brand-400)] hover:underline">Login portal issues</Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">ASUS</td>
                    <td className="py-2.5 pl-4">
                      <Link href="/asus-router-keeps-restarting" className="text-[var(--brand-400)] hover:underline">Firmware updates & boot loops</Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Huawei</td>
                    <td className="py-2.5 pl-4">
                      <Link href="/router-not-detecting-wan" className="text-[var(--brand-400)] hover:underline">ISP gateway restrictions</Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Netgear</td>
                    <td className="py-2.5 pl-4">
                      <Link href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline">DNS resolution dropouts</Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">D-Link</td>
                    <td className="py-2.5 pl-4">
                      <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">Weak default security options</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* How To Find Your Router Brand */}
        <div className="mb-16 glass-card p-8 border border-[var(--border-subtle)]">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">How to Find Your Router Brand & IP Address</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Method 1: Physical Label</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Flip your router upside down. Look for a sticker indicating the <strong>Brand Name</strong>, <strong>Model Number</strong>, <strong>Default Access URL/IP</strong> (e.g., 192.168.1.1), and default login credentials.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Method 2: Admin Panel</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Open a browser, type your router&apos;s IP in the search bar, and look at the login screen header. The brand logo and model family name (like Archer, Nighthawk, or Orbi) are prominently displayed.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Method 3: Windows (Command Prompt)</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Open Command Prompt (cmd) and type the command below. Your default router login address is listed as the <strong>Default Gateway</strong>.
              </p>
              <pre className="font-mono text-xs sm:text-sm text-[var(--brand-300)] bg-[var(--bg-base)] p-3 rounded-lg border border-[var(--border-subtle)] mt-2">
                ipconfig
              </pre>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Method 4: Linux (Terminal)</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Open your terminal and type the route display command. The IP listed under the gateway column is your router IP.
              </p>
              <pre className="font-mono text-xs sm:text-sm text-[var(--brand-300)] bg-[var(--bg-base)] p-3 rounded-lg border border-[var(--border-subtle)] mt-2">
                ip route
              </pre>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Method 5: macOS (Terminal)</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Open Terminal and run the network statistics routing command to display your router gateway address.
              </p>
              <pre className="font-mono text-xs sm:text-sm text-[var(--brand-300)] bg-[var(--bg-base)] p-3 rounded-lg border border-[var(--border-subtle)] mt-2">
                netstat -nr
              </pre>
            </div>
          </div>
        </div>

        {/* Common Router Login Addresses */}
        <div className="mb-16 glass-card p-8 border border-[var(--border-subtle)]">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Common Router Login IP Addresses</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Most manufacturers use default private IP subnets for router admin panels. Click on any of the common router addresses below to read dedicated setup and troubleshooting guides.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {["192.168.0.1", "192.168.1.1", "192.168.1.254", "192.168.3.1", "10.0.0.1"].map((ip) => {
              const slug = ip.replace(/\./g, "-");
              return (
                <Link
                  key={ip}
                  href={`/ips/${slug}`}
                  className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] p-4 rounded-xl text-center hover:bg-[var(--bg-hover)] transition-all font-mono font-bold text-[var(--text-primary)] hover:text-[var(--brand-400)] text-sm sm:text-base flex items-center justify-center gap-1.5"
                >
                  <Link2 size={14} className="text-[var(--text-muted)]" />
                  {ip}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Router Setup Basics & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Setup Basics */}
          <div className="glass-card p-6 border border-[var(--border-subtle)] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Settings size={20} className="text-[var(--brand-400)]" />
                Router Setup Basics
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                When configuring a new home or office router, prioritize completing these four fundamental network settings:
              </p>
              <ul className="space-y-3.5 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
                  <div>
                    <strong>Change Wi-Fi name (SSID):</strong> Differentiate your network from default factory setups to prevent easy identification.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
                  <div>
                    <strong>Change Wi-Fi password:</strong> Choose a strong, custom WPA2/WPA3 password. Avoid using dictionary terms.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
                  <div>
                    <strong>Update firmware:</strong> Keep firmware updated to secure routing ports and enhance Wi-Fi transmission speed.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] mt-2 flex-shrink-0" />
                  <div>
                    <strong>Backup settings:</strong> Save your working configuration file so you can easily restore settings in the event of a crash.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Security Checklist */}
          <div className="glass-card p-6 border border-[var(--border-subtle)] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Shield size={20} className="text-[var(--brand-400)]" />
                Router Security Checklist
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                Apply these configuration adjustments to protect your home network from unauthorized connections and potential hacking attempts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-[var(--text-secondary)]">
                {[
                  "Change admin default password",
                  "Enable WPA3 encryption protocol",
                  "Enable automatic firmware updates",
                  "Disable WPS (Wi-Fi Protected Setup)",
                  "Create isolated Guest Networks",
                  "Backup router configurations"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[var(--accent-400)] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Troubleshooting Sections & Buying Guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Troubleshooting */}
          <div className="glass-card p-6 border border-[var(--border-subtle)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <RefreshCw size={18} className="text-[var(--brand-400)]" />
              Troubleshooting
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              Encountering errors with gateway logins? Access our deep diagnostics guides:
            </p>
            <div className="space-y-2 text-xs font-semibold text-[var(--brand-400)]">
              <Link href="/ips/192-168-1-1" className="block hover:underline">192.168.1.1 Portal</Link>
              <Link href="/ips/192-168-0-1" className="block hover:underline">192.168.0.1 Portal</Link>
              <Link href="/router-login" className="block hover:underline">Router Admin Login</Link>
              <Link href="/router-password" className="block hover:underline">Router Default Passwords</Link>
              <Link href="/default-gateway-not-available" className="block hover:underline">Default Gateway Not Available</Link>
              <Link href="/router-login-not-working" className="block hover:underline">Router Admin Page Not Working</Link>
            </div>
          </div>

          {/* Gaming Routers */}
          <div className="glass-card p-6 border border-[var(--border-subtle)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <Sliders size={18} className="text-[var(--brand-400)]" />
              Gaming Router Guides
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              Optimize your gaming connections and tweak router configuration profiles for low-latency:
            </p>
            <div className="space-y-2 text-xs font-semibold text-[var(--brand-400)]">
              <Link href="/best-router-for-gaming" className="block hover:underline">Best Gaming Routers</Link>
              <Link href="/gaming-router-vs-normal-router" className="block hover:underline">Gaming Router vs Normal Router</Link>
              <Link href="/best-router-settings-for-gaming" className="block hover:underline">Settings for Low Ping</Link>
              <Link href="/best-qos-settings-for-gaming" className="block hover:underline">Best QoS Configuration</Link>
              <Link href="/wifi-6-for-gaming" className="block hover:underline">Wi-Fi 6 Gaming Advantages</Link>
              <Link href="/wifi-7-for-gaming" className="block hover:underline">Wi-Fi 7 Next-Gen Standard</Link>
              <Link href="/gaming-network-optimization" className="block hover:underline">Ping & Jitter Optimization</Link>
            </div>
          </div>

          {/* Mesh Networking */}
          <div className="glass-card p-6 border border-[var(--border-subtle)] flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <HardDrive size={18} className="text-[var(--brand-400)]" />
                Mesh Networking
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                Eradicate dead spots in multi-story houses using modular router nodes:
              </p>
              <Link href="/best-mesh-wifi-for-gaming" className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-400)] hover:underline">
                Best Mesh WiFi Systems for Gaming
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Router Buying Guide */}
        <div className="mb-16 glass-card p-8 border border-[var(--border-subtle)]">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ShoppingBag size={22} className="text-[var(--brand-400)]" />
            Router Buying Guide: Brand Recommendations
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Need a router upgrade but don&apos;t know which brand fits your home geometry or layout? Review our suggestions based on specific household sizes and use cases:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="pb-3 pr-4">Household / Usage Need</th>
                  <th className="pb-3 pl-4">Recommended Brand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Small Apartment / Budget Setup</td>
                  <td className="py-3 pl-4 font-medium text-[var(--brand-400)]">TP-Link</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Competitive Online Gaming</td>
                  <td className="py-3 pl-4 font-medium text-[var(--brand-400)]">ASUS</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Multi-Story Home Mesh Coverage</td>
                  <td className="py-3 pl-4 font-medium text-[var(--brand-400)]">Linksys</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Basic Low-Cost Secondary Router</td>
                  <td className="py-3 pl-4 font-medium text-[var(--brand-400)]">D-Link</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Ultra-Fast Gigabit Fiber internet</td>
                  <td className="py-3 pl-4 font-medium text-[var(--brand-400)]">Netgear</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Internal Link Hub: Popular Router Guides */}
        <div className="mb-16 glass-card p-8 border border-[var(--border-subtle)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Link2 size={20} className="text-[var(--brand-400)]" />
            Popular Router Guides
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Quickly navigate directly to our highest authority documentation pages regarding IP addresses, login panels, Wi-Fi standard analyses, and gaming configurations:
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "192.168.1.1 Gateway", href: "/ips/192-168-1-1" },
              { label: "192.168.0.1 Gateway", href: "/ips/192-168-0-1" },
              { label: "Router Admin Login", href: "/router-login" },
              { label: "Router Passwords", href: "/router-password" },
              { label: "Login Not Working", href: "/router-login-not-working" },
              { label: "Default Gateway Fix", href: "/default-gateway-not-available" },
              { label: "Best Router for Gaming", href: "/best-router-for-gaming" },
              { label: "WiFi 6 for Gaming", href: "/wifi-6-for-gaming" },
              { label: "WiFi 7 for Gaming", href: "/wifi-7-for-gaming" },
              { label: "Gaming Network Optimization", href: "/gaming-network-optimization" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3.5 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Collapsible FAQ Section */}
        <div className="glass-card p-8 border border-[var(--border-subtle)] mb-10">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <HelpCircle size={24} className="text-[var(--brand-400)]" />
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-[var(--border-subtle)]">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer focus:outline-none">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                    {faq.question}
                  </h3>
                  <span className="transition duration-300 group-open:-rotate-180 text-[var(--text-muted)] group-hover:text-[var(--brand-400)]">
                    <ChevronDown size={18} />
                  </span>
                </summary>
                <div className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed animate-fade-in-up">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
