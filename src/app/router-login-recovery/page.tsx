import type { Metadata } from "next";
import Link from "next/link";
import { Key, Globe, Network, ShieldCheck, ArrowRight, ShieldAlert } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Router Login Recovery & Troubleshooting Directory (2026)",
  description:
    "Comprehensive guide and recovery directory for router password recovery, admin page timeouts, IP conflicts, and firmware security updates.",
  canonical: "/router-login-recovery",
  keywords: [
    "router recovery",
    "forgot router password",
    "router login help",
    "router login troubleshooting",
    "admin gateway error",
  ],
});

export default async function RouterLoginRecoveryPage() {
  const breadcrumbs = [
    { name: "Router Login", url: "/router-login" },
    { name: "Recovery Directory", url: "/router-login-recovery" },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/router-login-recovery#itemlist`,
    "name": "Router Login Recovery & Troubleshooting Guides",
    "numberOfItems": 10,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "Forgot Router Password Guide",
          "url": `${APP_URL}/forgot-router-password`
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "Router Admin Password Recovery",
          "url": `${APP_URL}/router-admin-password`
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": "Cannot Access Settings Page Fix",
          "url": `${APP_URL}/router-cannot-access-settings`
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": "Router Web Interface Not Opening Troubleshooting",
          "url": `${APP_URL}/router-web-interface-not-opening`
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "WebPage",
          "name": "Login Page Not Loading Fix",
          "url": `${APP_URL}/router-login-page-not-loading`
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "WebPage",
          "name": "Router IP Conflict Resolution",
          "url": `${APP_URL}/router-ip-conflict`
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "WebPage",
          "name": "No Internet Access After Login Troubleshooting",
          "url": `${APP_URL}/router-no-internet-after-login`
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "WebPage",
          "name": "Router Firmware Update Guide",
          "url": `${APP_URL}/router-firmware-update-guide`
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "WebPage",
          "name": "How to Change Router Admin Password",
          "url": `${APP_URL}/change-router-admin-password`
        }
      },
      {
        "@type": "ListItem",
        "position": 10,
        "item": {
          "@type": "WebPage",
          "name": "How to Secure Your Router After Setup",
          "url": `${APP_URL}/secure-router-after-setup`
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Why can't I access my router's settings page?",
      answer: "Settings page access failures usually result from network adapter sleep states, custom DNS-over-HTTPS (DoH) settings, active VPN clients, or incorrect gateway IP configurations. Disabling VPNs, clearing browser cache, and trying a direct IP connection usually bypasses these obstacles."
    },
    {
      question: "How do I recover a forgotten router admin password?",
      answer: "Router admin panels do not support online recovery emails. If you forget your custom password, you must perform a hardware factory reset by holding the Reset button for 10-15 seconds. This restores default credentials printed on the router sticker."
    },
    {
      question: "What is the difference between my admin password and Wi-Fi password?",
      answer: "The admin password protects access to the local router dashboard where settings are modified. The Wi-Fi password (WPA security key) is what client devices use to join your wireless network to access the internet."
    },
    {
      question: "What should I do if the router Reset button is unresponsive?",
      answer: "If the physical reset fails, ensure the router is fully powered on before pressing. Hold the button for a full 15-20 seconds. If it still fails, perform a '30-30-30 reset': hold reset for 30s while powered on, unplug power for 30s while holding, and plug back in for 30s while still holding."
    }
  ];

  return (
    <>
      <JsonLd data={itemListSchema} />

      <TroubleshootingArticleShell
        h1="Router Login Recovery & Troubleshooting Directory"
        intro="Lost access to your router settings panel or looking to secure your home Wi-Fi gateway? Welcome to the central repository for router administration, credential recovery, interface errors, local DNS troubleshooting, and router security configurations."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={[]}
        severityLevel="low"
        isHubPage={true}
        disableTechArticle={true}
        disableFaqs={true}
      >
        <div className="space-y-8">
          {/* Quick Hub Intro */}
          <section className="prose prose-invert max-w-none text-sm text-[var(--text-secondary)] leading-relaxed">
            <p>
              Navigating local router configurations can be challenging when web dashboards fail to load, default passwords are rejected, or gateway routes conflict. This directory serves as a structured troubleshooting indexing tool. If you are looking for general instructions, consult our primary <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">router login</Link> manual, or view our index of <Link href="/router-login-hostnames" className="text-[var(--brand-400)] hover:underline">router login hostnames</Link> for brand-specific interface addresses.
            </p>
            <p>
              Whether you are attempting to locate your <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">router admin configurations</Link>, recover access via the <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline">router reset guidelines</Link>, or modify <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">advanced router settings</Link>, select the dedicated diagnostic guide below to resolve your network issue.
            </p>
          </section>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Credentials & Password Recovery */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--brand-800)]/40 transition-all">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Key size={18} className="text-orange-400" />
                Credentials & Passwords
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Solve administrator account lockouts, look up manufacturer default passwords, and learn secure credential updates:
              </p>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/forgot-router-password" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Forgot Router Password Guide <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-admin-password" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Router Admin Password Index <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/change-router-admin-password" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    How to Change Admin Password <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-password" className="text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    General Default Password Index <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Box 2: Dashboard & Connection Errors */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--brand-800)]/40 transition-all">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Globe size={18} className="text-cyan-400" />
                Browser & Gateway Access
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Troubleshoot DNS intercept blocks, browser connection timeouts, and unreachable configuration portals:
              </p>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/router-cannot-access-settings" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Cannot Access Settings Fixes <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-web-interface-not-opening" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Web Interface Not Opening <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-login-page-not-loading" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Login Page Loading loops <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-login-not-working" className="text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    General Router Login Troubleshooter <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Box 3: Local IP & Subnet Conflicts */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--brand-800)]/40 transition-all">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Network size={18} className="text-emerald-400" />
                IP, Routing & Subnets
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Diagnose duplicate IP mapping conflicts, empty gateway routes, and DHCP allocation issues:
              </p>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/router-ip-conflict" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Router IP Conflict Resolution <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Default Gateway Not Available Guide <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-not-assigning-ip-addresses" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    DHCP IP Assignment Errors <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-login-hostnames" className="text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Local DNS Hostname Directory <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Box 4: Security & System Upgrades */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--brand-800)]/40 transition-all">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-400" />
                Maintenance & Hardening
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Install new firmware safely, secure your router from hacking, and solve disconnection bugs:
              </p>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/router-firmware-update-guide" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Firmware Upgrade Procedures <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/secure-router-after-setup" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Post-Setup Hardening Checklist <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-no-internet-after-login" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    No Internet After Login Fixes <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <Link href="/router-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline flex items-center gap-1.5">
                    Constant Network Disconnections <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Cross Links Section */}
          <section className="p-6 border border-red-800/20 bg-red-950/5 rounded-2xl">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert size={14} /> Security Advisory
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Never share your administrative password or router configuration files. Keep your router&apos;s firmware updated to patch local vulnerabilities. For brand-specific settings pages, review our custom login dashboards for{" "}
              <Link href="/netgear-router-login" className="text-[var(--brand-400)] hover:underline">Netgear</Link>,{" "}
              <Link href="/tp-link-router-login" className="text-[var(--brand-400)] hover:underline">TP-Link</Link>,{" "}
              <Link href="/asus-router-login" className="text-[var(--brand-400)] hover:underline">ASUS</Link>,{" "}
              <Link href="/d-link-router-login" className="text-[var(--brand-400)] hover:underline">D-Link</Link>,{" "}
              <Link href="/linksys-router-login" className="text-[var(--brand-400)] hover:underline">Linksys</Link>, and{" "}
              <Link href="/huawei-router-login" className="text-[var(--brand-400)] hover:underline">Huawei</Link>.
            </p>
          </section>

          {/* Quick Hostname Fallback Section */}
          <section className="text-xs text-[var(--text-muted)] space-y-2">
            <h4 className="font-bold text-[var(--text-primary)]">Quick Gateway Fallback Pages:</h4>
            <div className="flex flex-wrap gap-2">
              <Link href="/routerlogin.net" className="hover:underline font-mono">routerlogin.net</Link> |
              <Link href="/tplinkwifi.net" className="hover:underline font-mono">tplinkwifi.net</Link> |
              <Link href="/mywifiext.net" className="hover:underline font-mono">mywifiext.net</Link> |
              <Link href="/orbilogin.com" className="hover:underline font-mono">orbilogin.com</Link> |
              <Link href="/ips/192-168-1-1" className="hover:underline font-mono">192.168.1.1</Link> |
              <Link href="/ips/192-168-0-1" className="hover:underline font-mono">192.168.0.1</Link> |
              <Link href="/ips/10-0-0-1" className="hover:underline font-mono">10.0.0.1</Link> |
              <Link href="/ips/192-168-100-1" className="hover:underline font-mono">192.168.100.1</Link>
            </div>
          </section>

        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
