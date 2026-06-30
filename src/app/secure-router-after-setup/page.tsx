import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import RelatedGuides from "@/components/tools/RelatedGuides";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Secure Router After Setup: 7-Step Hardening Checklist (2026)",
  description:
    "Harden your home router security after initial setup with this 7-step checklist. Covers admin password, WPA3 encryption, WPS, remote management, firmware updates, guest networks, and DNS security.",
  canonical: "/secure-router-after-setup",
  keywords: [
    "secure router after setup",
    "router security hardening",
    "router security checklist",
    "how to secure home router",
    "router security settings",
    "WPA3 router security",
    "disable WPS router",
    "router hardening guide",
  ],
});

// ─── Static data ─────────────────────────────────────────────────────────────

const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Recovery", url: "/router-login-recovery" },
  { name: "Secure Router After Setup", url: "/secure-router-after-setup" },
];

const troubleshootingSteps = [
  {
    title: "Change the Default Admin Password Immediately",
    description:
      "Log into your router admin panel (at 192.168.1.1 or your brand&apos;s hostname) and navigate to Administration → Password. Replace the factory-default admin password (admin, admin, password, or printed string) with a strong unique password of 12+ characters containing uppercase, lowercase, numbers, and symbols. This is the most critical security step — default credentials are publicly known and actively targeted by automated malware.",
    tip:
      "Store the new admin password in a password manager AND write it on paper inside the router enclosure. This ensures recovery without digital exposure.",
  },
  {
    title: "Enable WPA3 (or WPA2-AES at minimum)",
    description:
      "Navigate to Wireless → Security Mode in the admin panel. Set encryption to WPA3-Personal if your router supports it — this provides the strongest available wireless security with protection against offline dictionary attacks. If WPA3 is unavailable, use WPA2-Personal with AES (CCMP) encryption only — never TKIP, and never WEP or WPA1 which are completely broken. Also set a strong Wi-Fi password (20+ characters is ideal).",
    tip:
      "WPA3 Transition Mode (WPA2/WPA3 mixed) is a good option if you have some older devices — it allows WPA3-capable devices to connect securely while still supporting WPA2 for legacy devices. See our WPA3 vs WPA2 comparison guide.",
  },
  {
    title: "Disable WPS (Wi-Fi Protected Setup)",
    description:
      "Navigate to Wireless → WPS in the admin panel and disable it completely, including the PIN method. WPS has a known design flaw (the WPS PIN can be brute-forced in hours using publicly available tools like Reaver). Disabling WPS eliminates this attack vector entirely. The WPS button on the router can remain physically present — it just needs to be disabled in software.",
    tip:
      "Even if your router claims to use &apos;WPS Push-Button only&apos; (without PIN), some devices expose PIN functionality in their firmware regardless of the UI setting. Complete WPS disable is the safest choice.",
  },
  {
    title: "Disable Remote (WAN) Management",
    description:
      "Navigate to Administration → Remote Management or Security → Remote Access. Ensure remote administration from the WAN side is completely disabled unless you have a specific, justified need for it. With remote management enabled, anyone on the internet can attempt to access your router admin panel — exposed to password brute-force attacks. If you must enable remote access, restrict it to specific IPs and require HTTPS.",
    tip:
      "Some routers enable remote management by default (particularly Netgear devices). Check this setting even on new routers — the default state is not always secure.",
  },
  {
    title: "Keep Firmware Updated",
    description:
      "Navigate to Administration → Firmware Upgrade in the admin panel. Enable automatic updates if available. If not, manually check for new firmware every 3 months. Router firmware updates contain critical security patches for vulnerabilities that are actively exploited in the wild. Running outdated firmware with known CVEs is one of the most dangerous configurations for a home network. See our firmware update guide for brand-specific instructions.",
    tip:
      "Subscribe to your router brand&apos;s security advisory email list or RSS feed to receive notifications of critical security patches as soon as they are released, rather than discovering them weeks later.",
  },
  {
    title: "Isolate Guest Networks for IoT Devices",
    description:
      "Navigate to Wireless → Guest Network and create a separate guest SSID. Place all IoT devices (smart TVs, cameras, doorbells, smart bulbs, thermostats) on the guest network, not the main network. Guest networks are isolated from the LAN — devices on the guest network cannot communicate with computers, NAS drives, or printers on the main network. This &apos;IoT segmentation&apos; prevents compromised smart devices from attacking your main computers.",
    tip:
      "Many router brands offer &apos;AP Isolation&apos; or &apos;Client Isolation&apos; for the guest network — enable this to also prevent guest network devices from communicating with each other, providing an additional layer of separation.",
  },
  {
    title: "Configure Secure DNS (Cloudflare / Google)",
    description:
      "Navigate to WAN → DNS Settings in the admin panel. Change the DNS servers from your ISP&apos;s default to a security-focused public resolver: Cloudflare (1.1.1.1 and 1.0.0.1) provides fast, privacy-respecting DNS. Cloudflare for Families (1.1.1.3 and 1.0.0.3) adds malware/adult content blocking. Google (8.8.8.8 and 8.8.4.4) is reliable and fast. NextDNS and Quad9 (9.9.9.9) provide DNS-level threat blocking. This protects all devices on your network from ISP DNS snooping and phishing attacks.",
    tip:
      "For maximum privacy, consider enabling DNS-over-HTTPS (DoH) on your router if it supports it — this encrypts DNS queries between your router and the upstream resolver, preventing ISP visibility into your browsing.",
  },
];

const faqs = [
  {
    question: "What are the most important router security settings to change?",
    answer:
      "In order of importance: (1) Change the default admin password — this is the single most critical action; (2) Enable WPA3 or WPA2-AES encryption for Wi-Fi; (3) Disable WPS entirely; (4) Disable remote (WAN) management; (5) Update firmware immediately and enable auto-updates; (6) Isolate IoT devices on a guest network. If you only do the first three, your router will be significantly more secure than a factory-default configuration.",
  },
  {
    question: "What is WPS and why is it dangerous?",
    answer:
      "WPS (Wi-Fi Protected Setup) is a feature designed to simplify connecting devices to Wi-Fi using an 8-digit PIN or a button push. The PIN method has a design flaw — the 8-digit PIN is validated in two separate 4-digit halves, reducing the brute-force search space from 100 million combinations to just 11,000. Tools like Reaver and Bully can crack a WPS PIN in as little as 4 hours on unprotected routers. Disabling WPS entirely eliminates this attack vector.",
  },
  {
    question: "Should I hide my Wi-Fi SSID (network name)?",
    answer:
      "SSID hiding provides only cosmetic security, not real protection. Any wireless scanner (including free mobile apps) can detect hidden SSIDs — the network still broadcasts its presence, just without a name. Hidden SSIDs also cause connection issues with some devices and make troubleshooting harder. Focus on strong WPA3/WPA2-AES encryption and a strong Wi-Fi password instead — these provide real security rather than security theater.",
  },
  {
    question: "Is MAC address filtering effective for router security?",
    answer:
      "MAC address filtering is not an effective security control in 2026. MAC addresses can be trivially spoofed — an attacker who captures the wireless traffic can see authorized MAC addresses in plain text (even on WPA2 networks) and clone them. MAC filtering creates administrative overhead (you must add every new device manually) without providing meaningful security. Use strong WPA3 encryption and a strong Wi-Fi password instead.",
  },
  {
    question: "What is UPnP and should I disable it?",
    answer:
      "UPnP (Universal Plug and Play) allows devices on your network to automatically open ports in the router&apos;s firewall without user approval. This is convenient for gaming, streaming, and video calls, but malware on any infected device can also use UPnP to open ports, bypassing firewall protection. Disable UPnP if your network does not specifically require it. For gaming, use manual port forwarding instead of UPnP — it provides the same connectivity with explicit control over which ports are open.",
  },
];

const commonCauses = [
  {
    title: "Default Admin/Admin Left Unchanged",
    desc: "Factory-default admin credentials are publicly documented and actively targeted by malware scanners.",
  },
  {
    title: "WPS PIN Enabled",
    desc: "WPS PIN can be brute-forced in hours using freely available tools, granting Wi-Fi access without the password.",
  },
  {
    title: "Remote Management Open",
    desc: "WAN-side admin access exposes the router management panel to internet-based brute-force attacks.",
  },
  {
    title: "IoT Devices on Main Network",
    desc: "Compromised smart devices can attack other computers and NAS devices if not isolated on a guest network.",
  },
];

const quickFixChecklist = [
  "☑ Change admin password: 12+ chars, unique, stored in password manager",
  "☑ Enable WPA3-Personal (or WPA2-AES if WPA3 unavailable)",
  "☑ Disable WPS completely (including PIN method)",
  "☑ Disable WAN Remote Management",
  "☑ Update router firmware immediately, enable auto-updates",
  "☑ Create guest network for IoT devices (enable AP isolation)",
  "☑ Change DNS to 1.1.1.1 / 8.8.8.8 or NextDNS",
  "☑ Optional: Disable UPnP, use manual port forwarding instead",
];

// ─── Security checklist items ─────────────────────────────────────────────────

const securityChecklist = [
  {
    item: "Change admin password",
    impact: "Critical",
    color: "text-red-400",
    effort: "1 min",
    desc: "Replace admin/admin with 12+ char unique password",
  },
  {
    item: "Enable WPA3/WPA2-AES",
    impact: "Critical",
    color: "text-red-400",
    effort: "2 min",
    desc: "Disable TKIP and WEP — use WPA3 or WPA2-AES only",
  },
  {
    item: "Disable WPS PIN",
    impact: "High",
    color: "text-orange-400",
    effort: "1 min",
    desc: "WPS PIN can be brute-forced — disable it entirely",
  },
  {
    item: "Disable Remote Management",
    impact: "High",
    color: "text-orange-400",
    effort: "1 min",
    desc: "Block WAN-side admin panel access from internet",
  },
  {
    item: "Update Firmware",
    impact: "High",
    color: "text-amber-400",
    effort: "5 min",
    desc: "Apply all security patches and enable auto-updates",
  },
  {
    item: "Isolate IoT on Guest Network",
    impact: "Medium",
    color: "text-yellow-400",
    effort: "10 min",
    desc: "Keep smart devices separate from computers and NAS",
  },
  {
    item: "Secure DNS (Cloudflare/Google)",
    impact: "Medium",
    color: "text-green-400",
    effort: "2 min",
    desc: "Use 1.1.1.1 or 8.8.8.8 for privacy and reliability",
  },
];

export default async function SecureRouterAfterSetupPage() {
  return (
    <TroubleshootingArticleShell
      h1="Secure Router After Setup: 7-Step Hardening Checklist (2026)"
      intro="Most routers leave the factory configured for convenience, not security — default passwords, WPS enabled, and remote management potentially open. This 7-step checklist closes every major attack vector: admin credential hardening, WPA3 encryption, WPS disablement, firmware updates, IoT segmentation, and DNS security. Follow these steps once after setup and your home network will be significantly better protected against automated attacks, malware, and unauthorized access."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Complete This Checklist Before Connecting Any Devices",
        text: "Factory-default router configurations prioritize ease of setup over security. Until you change the admin password and disable WPS, your router is vulnerable to automated attacks from any device on your local network. Complete this checklist as your very first post-setup task.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If your router is ISP-supplied and you cannot access settings to harden security, contact your ISP. They may have limited your admin panel access or can perform some security configurations remotely."
      severityLevel="high"
    >
      <div className="space-y-8">

        {/* Quick Answer */}
        <section
          className="glass-card p-5 border border-orange-950/30 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer: Secure Router"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            The 3 Most Critical Router Security Actions
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            (1) Change the default admin password — admin/admin is known by every malware scanner;
            (2) Enable WPA3 or WPA2-AES encryption — not TKIP or WEP;
            (3) Disable WPS entirely — the PIN method has a brute-forceable design flaw.
            These three steps close the vast majority of home router attack vectors. See our{" "}
            <Link href="/change-router-admin-password" className="text-[var(--brand-400)] hover:underline">
              change admin password guide
            </Link>{" "}
            and{" "}
            <Link href="/router-firmware-update-guide" className="text-[var(--brand-400)] hover:underline">
              firmware update guide
            </Link>{" "}
            for detailed steps.
          </p>
        </section>

        {/* Common Mistakes Section */}
        <section aria-label="Common Mistakes After Router Setup">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Common Mistakes After Router Setup
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                mistake: "Leaving admin/admin as the password",
                consequence: "Any device on your network can access and modify all router settings.",
                color: "border-red-800/30 bg-red-900/5",
                badge: "Critical",
                badgeColor: "text-red-400",
              },
              {
                mistake: "WPS PIN enabled",
                consequence: "An attacker nearby can crack Wi-Fi access in hours using Reaver or Bully.",
                color: "border-orange-800/30 bg-orange-900/5",
                badge: "Critical",
                badgeColor: "text-orange-400",
              },
              {
                mistake: "Remote Management enabled",
                consequence: "Router admin panel is accessible from the internet, enabling global brute-force attacks.",
                color: "border-orange-800/30 bg-orange-900/5",
                badge: "High Risk",
                badgeColor: "text-amber-400",
              },
              {
                mistake: "Outdated firmware with known CVEs",
                consequence: "Exploits for known vulnerabilities are publicly available and actively used by botnets.",
                color: "border-amber-800/30 bg-amber-900/5",
                badge: "High Risk",
                badgeColor: "text-amber-400",
              },
              {
                mistake: "UPnP enabled",
                consequence: "Any infected device on the network can open firewall ports without your knowledge.",
                color: "border-yellow-800/30 bg-yellow-900/5",
                badge: "Medium Risk",
                badgeColor: "text-yellow-400",
              },
              {
                mistake: "Smart devices on main network",
                consequence: "Compromised IoT devices can scan and attack computers, NAS, and other devices on the LAN.",
                color: "border-yellow-800/30 bg-yellow-900/5",
                badge: "Medium Risk",
                badgeColor: "text-yellow-400",
              },
            ].map(({ mistake, consequence, color, badge, badgeColor }, i) => (
              <div key={i} className={`glass-card p-4 rounded-xl border ${color}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">{mistake}</h3>
                  <span className={`text-[10px] font-bold shrink-0 ${badgeColor}`}>{badge}</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{consequence}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Security Checklist */}
        <section aria-label="Security Hardening Checklist">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Router Security Hardening Checklist
          </h2>
          <div className="space-y-2">
            {securityChecklist.map(({ item, impact, color, effort, desc }, i) => (
              <div
                key={i}
                className="glass-card p-4 rounded-xl border border-[var(--border-subtle)] flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded border-2 border-[var(--border-subtle)] shrink-0 mt-0.5 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-xs font-bold text-[var(--text-primary)]">{item}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold ${color}`}>{impact}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">{effort}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <RelatedGuides
          currentUrl="/secure-router-after-setup"
          category="wifi"
          tags={["security", "setup", "hardening"]}
          maxItems={4}
        />

      </div>
    </TroubleshootingArticleShell>
  );
}
