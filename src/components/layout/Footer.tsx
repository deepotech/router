import Link from "next/link";
import { Wifi, Globe } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { ArticlesService } from "@/server/services/articles.service";
import { FooterLinks } from "./FooterLinks";

// =============================================================
// Footer — async Server Component
// =============================================================

const footerLinks = {
  Routers: [
    { label: "TP-Link", href: "/routers/tp-link" },
    { label: "Huawei", href: "/routers/huawei" },
    { label: "ZTE", href: "/routers/zte" },
    { label: "D-Link", href: "/routers/d-link" },
    { label: "ASUS", href: "/routers/asus" },
    { label: "All Brands", href: "/routers" },
  ],
  "Common IPs": [
    { label: "192.168.1.1", href: "/ips/192-168-1-1" },
    { label: "192.168.0.1", href: "/ips/192-168-0-1" },
    { label: "192.168.8.1", href: "/ips/192-168-8-1" },
    { label: "10.0.0.1", href: "/ips/10-0-0-1" },
    { label: "All IP Directory", href: "/ips" },
  ],
  Tools: [
    { label: "IP Checker", href: "/tools/ip-checker" },
    { label: "DNS Checker", href: "/tools/dns-checker" },
    { label: "Speed Test", href: "/tools/speed-test" },
    { label: "WiFi QR Generator", href: "/tools/wifi-qr" },
    { label: "Password Generator", href: "/tools/password-generator" },
  ],
  "Network & IP": [
    { label: "What Is My IP", href: "/what-is-my-ip" },
    { label: "DNS Lookup Tool", href: "/dns-lookup" },
    { label: "Port Checker", href: "/port-checker" },
    { label: "MAC Address Lookup", href: "/mac-address-lookup" },
    { label: "Subnet Calculator", href: "/subnet-calculator" },
  ],

  "Gaming Net": [
    { label: "NAT Type Checker", href: "/nat-type-checker" },
    { label: "DNS Propagation", href: "/dns-propagation-checker" },
    { label: "Best DNS for Gaming", href: "/best-dns-for-gaming" },
    { label: "Port Forwarding Not Working", href: "/port-forwarding-not-working" },
    { label: "High Ping Fix", href: "/high-ping-fix" },
    { label: "Double NAT Detected", href: "/double-nat-detected" },
    { label: "NAT Type Strict Fix", href: "/nat-type-strict" },
    { label: "Best Router Settings for Gaming", href: "/best-router-settings-for-gaming" },
    { label: "Best QoS Settings for Gaming", href: "/best-qos-settings-for-gaming" },
    { label: "Open NAT Type", href: "/open-nat-type" },
    { label: "Gaming Packet Loss Fix", href: "/gaming-packet-loss-fix" },
    { label: "Gaming Jitter Fix", href: "/gaming-jitter-fix" },
    { label: "Gaming Lag Spikes Fix", href: "/gaming-lag-spikes-fix" },
    { label: "Bufferbloat Fix", href: "/bufferbloat-fix" },
    { label: "Bufferbloat Test", href: "/bufferbloat-test" },
    { label: "Gaming Network Optimization", href: "/gaming-network-optimization" },
    { label: "Best Router for Gaming", href: "/best-router-for-gaming" },
    { label: "Gaming Router vs Normal Router", href: "/gaming-router-vs-normal-router" },
    { label: "Ethernet vs WiFi Gaming", href: "/ethernet-vs-wifi-gaming" },
    { label: "WiFi 6 for Gaming", href: "/wifi-6-for-gaming" },
    { label: "WiFi 7 for Gaming", href: "/wifi-7-for-gaming" },
    { label: "Best Mesh WiFi for Gaming", href: "/best-mesh-wifi-for-gaming" },
    { label: "Cat6 vs Cat8 for Gaming", href: "/cat6-vs-cat8-for-gaming" },
    { label: "Powerline Adapter for Gaming", href: "/powerline-adapter-for-gaming" },
    { label: "Gaming Switch vs Router", href: "/gaming-switch-vs-router" },
  ],
  "Router Problems": [
    { label: "Router Keeps Restarting", href: "/router-keeps-restarting" },
    { label: "Router Login Not Working", href: "/router-login-not-working" },
    { label: "WiFi Keeps Disconnecting", href: "/wifi-keeps-disconnecting" },
    { label: "Router Blinking Orange", href: "/router-blinking-orange" },
    { label: "WAN Not Detected", href: "/router-not-detecting-wan" },
    { label: "TP-Link Disconnecting", href: "/tp-link-router-keeps-disconnecting" },
    { label: "ASUS Red Light Fix", href: "/asus-router-red-light" },
    { label: "TP-Link Login Issues", href: "/tp-link-login-not-working" },
    { label: "ASUS Keeps Restarting", href: "/asus-router-keeps-restarting" },
  ],
  "Router Login": [
    { label: "Router Login Guide", href: "/router-login" },
    { label: "Hostnames Directory", href: "/router-login-hostnames" },
    { label: "routerlogin.net Guide", href: "/routerlogin.net" },
    { label: "tplinkwifi.net Guide", href: "/tplinkwifi.net" },
    { label: "Netgear Login Guide", href: "/netgear-router-login" },
    { label: "TP-Link Login Guide", href: "/tp-link-router-login" },
    { label: "Login Not Working", href: "/router-login-not-working" },
  ],
  "DNS Guides": [
    { label: "Best DNS for Speed", href: "/best-dns-for-faster-internet" },
    { label: "How to Change Router DNS", href: "/how-to-change-dns-on-router" },
    { label: "DNS Server Not Responding", href: "/dns-server-not-responding" },
    { label: "Chrome DNS Probe Error", href: "/dns-probe-finished-no-internet" },
    { label: "Best DNS for PS5", href: "/best-dns-for-ps5" },
    { label: "Best DNS for Xbox", href: "/best-dns-for-xbox" },
  ],
  "WiFi Security": [
    { label: "WiFi Security Hub", href: "/wifi-security" },
    { label: "WPA3 vs WPA2", href: "/wpa3-vs-wpa2" },
    { label: "Who Is on My WiFi", href: "/how-to-see-who-is-on-my-wifi" },
    { label: "Guest WiFi Setup", href: "/guest-wifi-setup" },
    { label: "Block Devices on Router", href: "/block-device-on-router" },
  ],
  "Mesh WiFi": [
    { label: "Mesh WiFi Guide", href: "/mesh-wifi" },
    { label: "Mesh WiFi Setup", href: "/mesh-wifi-setup" },
    { label: "Extender vs Mesh WiFi", href: "/wifi-extender-vs-mesh" },
    { label: "Best Mesh for Gaming", href: "/best-mesh-wifi-for-gaming" },
    { label: "How to Improve WiFi Signal", href: "/how-to-improve-wifi-signal" },
  ],
  "Internet Fixes": [
    { label: "Phone Connected No Internet", href: "/wifi-connected-but-no-internet-phone" },
    { label: "Modem Online Blinking", href: "/modem-online-light-blinking" },
    { label: "Ethernet Slower than WiFi", href: "/ethernet-slower-than-wifi" },
    { label: "Connected No Access", href: "/internet-connected-no-access" },
    { label: "Ethernet Connected No Internet", href: "/ethernet-connected-but-no-internet" },
    { label: "Router Not Assigning IP", href: "/router-not-assigning-ip-addresses" },
    { label: "Default Gateway Unavailable", href: "/default-gateway-not-available" },
    { label: "Find Router IP", href: "/how-to-find-router-ip-address" },
    { label: "Packet Loss Test Guide", href: "/packet-loss-test" },
    { label: "How to Fix Packet Loss", href: "/how-to-fix-packet-loss" },
  ],
  Troubleshooting: [
    { label: "Improve WiFi Signal", href: "/how-to-improve-wifi-signal" },
    { label: "WiFi Keeps Disconnecting", href: "/wifi-keeps-disconnecting" },
    { label: "Internet Keeps Dropping", href: "/internet-keeps-dropping" },
    { label: "Router Keeps Restarting", href: "/router-keeps-restarting" },
    { label: "Speed Up Internet", href: "/how-to-speed-up-internet" },
  ],
  "Commercial Guides": [
    { label: "Best WiFi Routers", href: "/best-wifi-routers" },
    { label: "Best Router For Gaming", href: "/best-router-for-gaming" },
    { label: "Best Mesh WiFi Systems", href: "/best-mesh-wifi" },
  ],
  "Legal & Trust": [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const FALLBACK_GUIDES = [
  { id: "fallback-1", title: "192.168.1.1 Router Login Guide", href: "/ips/192-168-1-1" },
  { id: "fallback-2", title: "192.168.0.1 Router Login Guide", href: "/ips/192-168-0-1" },
  { id: "fallback-3", title: "WiFi Connected No Internet Fix", href: "/problems/wifi-connected-no-internet" },
  { id: "fallback-4", title: "Slow Internet Connection Guide", href: "/problems/slow-internet" },
  { id: "fallback-5", title: "DNS Server Not Responding Fix", href: "/problems/dns-not-resolving" },
];

export async function Footer() {
  const year = new Date().getFullYear();

  // Fetch latest articles with try/catch and static fallback for build safety
  let recentArticles = FALLBACK_GUIDES;
  try {
    const dynamicArticles = await ArticlesService.getLatestArticles({ limit: 5 });
    if (dynamicArticles && dynamicArticles.length > 0) {
      recentArticles = dynamicArticles.map((a) => ({
        id: a.id,
        title: a.title,
        href: a.href,
      }));
    }
  } catch (error) {
    console.warn("[Footer] Failed to fetch dynamic recent articles, using fallback:", error);
  }

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-600)] flex items-center justify-center">
                <Wifi size={16} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-[var(--text-primary)]">
                Router<span className="gradient-text">Via</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              AI-powered router troubleshooting and networking platform. Fix any
              WiFi issue instantly.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all duration-[var(--transition-fast)]"
              >
                <Globe size={14} aria-hidden="true" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all duration-[var(--transition-fast)]"
              >
                <Globe size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Static Link Columns (col-span-7) & Dynamic Recent Guides (col-span-2) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-9 gap-8">
            <div className="md:col-span-7">
              <FooterLinks footerLinks={footerLinks} />
            </div>
            
            <div className="md:col-span-2 md:border-l md:border-[var(--border-subtle)] md:pl-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                Recent Guides
              </h3>
              <ul className="space-y-2.5">
                {recentArticles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={article.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-400)] transition-colors duration-[var(--transition-fast)] line-clamp-2"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              className="text-[var(--text-muted)] hover:text-[#1DA1F2] transition-colors"
              aria-label="Twitter"
            >
              <Globe size={20} />
            </a>
            <a
              href="https://github.com"
              className="text-[var(--text-muted)] hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Globe size={20} />
            </a>
            <Link
              href="/privacy-policy"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
