import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Router Firmware Update Guide: Safe Update for All Brands (2026)",
  description:
    "Update your router firmware safely without bricking it. Includes brand-specific firmware update URLs, automatic vs manual update steps, and backup procedures for TP-Link, Netgear, ASUS, Huawei, Linksys, and D-Link.",
  canonical: "/router-firmware-update-guide",
  keywords: [
    "router firmware update",
    "how to update router firmware",
    "router firmware upgrade guide",
    "TP-Link firmware update",
    "Netgear firmware update",
    "ASUS router firmware",
    "router firmware not updating",
    "manual router firmware update",
  ],
});

// ─── Static data ─────────────────────────────────────────────────────────────

const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Recovery", url: "/router-login-recovery" },
  { name: "Router Firmware Update Guide", url: "/router-firmware-update-guide" },
];

const troubleshootingSteps = [
  {
    title: "Back Up Your Router Configuration Before Updating",
    description:
      "Before any firmware update, export your router&apos;s current configuration. Log into the admin panel and navigate to Administration → Backup Settings (TP-Link) or Administration → Backup Configuration (Netgear) or System → Backup/Restore (ASUS). Save the configuration file to your computer. Firmware updates occasionally reset settings, and the backup allows instant restoration of all port forwarding rules, DNS settings, and Wi-Fi credentials.",
    tip:
      "Also note your ISP connection type (DHCP, PPPoE, Static), PPPoE credentials, DNS servers, and custom Wi-Fi credentials. Some firmware updates clear these even when restoring a backup from an older firmware version.",
  },
  {
    title: "Check the Current Firmware Version",
    description:
      "Log into the router admin panel. Navigate to Administration → Router Information (or System Status on some brands). Note the current firmware version string (e.g., 1.0.0.15 Build 220923). Visit the manufacturer&apos;s firmware download page and compare against the latest release. Only update if a newer version is available — there is no benefit to re-flashing the same version.",
    tip:
      "On some routers, the firmware version appears on the main dashboard/overview page as soon as you log in. On TP-Link Archer models, it shows in the top-right corner of the admin UI.",
  },
  {
    title: "Use Automatic Update if Available (Recommended)",
    description:
      "Many modern routers support automatic or one-click firmware updates from within the admin panel. On TP-Link: Administration → Firmware Upgrade → Check for Update. On Netgear: ADVANCED → Administration → Firmware Update → Check Online. On ASUS: Administration → Firmware Upgrade → Check. If the router reports a new version is available, click Update and wait — do NOT power off the router during the update (typically 3–5 minutes). The router will reboot automatically when done.",
    tip:
      "The most critical rule of firmware updates: never interrupt power during the flashing process. A power cut mid-flash creates a &apos;bricked&apos; router that cannot boot. Plug the router directly into a wall socket (not a power strip) during the update to minimize interruption risk.",
  },
  {
    title: "Manually Download and Flash Firmware",
    description:
      "If the router&apos;s auto-update does not find a newer version, download the firmware manually from the manufacturer&apos;s support site. On TP-Link: go to tp-link.com/en/support/download. On Netgear: netgear.com/support. On ASUS: asus.com/networking/support. Search for your exact router model number (found on the label). Download the latest stable firmware ZIP or .bin file. In the admin panel, navigate to Administration → Firmware Upgrade → Browse, select the downloaded file, and click Upgrade.",
    tip:
      "Never flash firmware meant for a different router model — even slightly different hardware revisions (e.g., v1 vs v2) use incompatible firmware that will brick the device. Your router&apos;s hardware version is printed on the bottom label next to the model number (e.g., TL-WR940N v6).",
  },
  {
    title: "Perform a Factory Reset After Major Firmware Updates",
    description:
      "After a major firmware version upgrade (e.g., from 1.x to 2.x firmware), it is best practice to perform a factory reset before restoring your configuration backup. This clears any incompatible configuration remnants from the old firmware. Navigate to Administration → Factory Default Reset (or hold the physical RESET button for 15 seconds). After the reset, restore your configuration backup, verify all settings, and reconnect devices.",
    tip:
      "Minor firmware updates (e.g., 1.0.0.14 to 1.0.0.15) typically do not require a factory reset. Major version changes often introduce new configuration structures that are incompatible with old backup formats — always reset on major upgrades.",
  },
];

const faqs = [
  {
    question: "Is it safe to update router firmware? What are the risks?",
    answer:
      "Router firmware updates are safe when performed correctly. The main risks are: (1) power interruption during flashing, which can brick the device — always use a direct wall socket and have a UPS if available; (2) flashing firmware for the wrong hardware revision — always verify the exact model and version; (3) rare firmware bugs introduced in new releases — check user forums for reports before flashing if you are risk-averse. The benefits (security patches, bug fixes, performance improvements) almost always outweigh the risks for routers with publicly known vulnerabilities.",
  },
  {
    question: "Why should I update my router firmware?",
    answer:
      "Router firmware updates deliver: (1) Critical security patches fixing known vulnerabilities (e.g., CVE-documented exploits that allow remote code execution); (2) Bug fixes for connectivity issues, VPN stability, and DHCP reliability; (3) New features such as WPA3 support, improved QoS, MU-MIMO optimizations; (4) Performance improvements for Wi-Fi range and throughput. Routers running outdated firmware with known CVEs are actively exploited by botnets — updating firmware is one of the most important security steps for a home network.",
  },
  {
    question: "What does bricking a router mean and how do I unbrick it?",
    answer:
      "A &apos;bricked&apos; router is one that cannot complete its boot process — typically caused by a power interruption during firmware flashing or flashing wrong firmware. Recovery options include: (1) TFTP recovery — many routers have a failsafe boot mode that accepts a firmware image via TFTP from a connected computer; (2) 30-30-30 reset — hold RESET while removing and reinserting power on some older routers; (3) Serial console recovery — for advanced users with hardware access. Contact your router manufacturer&apos;s support as the first step — they often have recovery tools.",
  },
  {
    question: "How often should I update router firmware?",
    answer:
      "Check for firmware updates every 3–6 months for home routers. If you are notified of a critical security vulnerability (via CVE announcements or the manufacturer&apos;s security advisory page), update immediately regardless of the timing. Many modern routers support automatic background updates — enabling this is recommended for home users who do not monitor firmware releases manually.",
  },
  {
    question: "Can I roll back a firmware update if it causes problems?",
    answer:
      "Some routers support firmware rollback — check Administration → Firmware in the admin panel for a &apos;Revert&apos; or &apos;Previous Version&apos; option. However, most consumer routers do not officially support rollback. Alternatives: flash the previous firmware version manually (if you saved it), or contact the manufacturer. Note that some manufacturers restrict downgrading firmware for security reasons, and doing so may expose the router to known vulnerabilities that were fixed in the newer version.",
  },
];

const commonCauses = [
  {
    title: "Outdated Security Firmware",
    desc: "Running firmware with known CVEs exposes the router to remote exploitation by botnets and attackers.",
  },
  {
    title: "Connectivity or VPN Bugs",
    desc: "Old firmware may have stability bugs causing random disconnections, VPN failures, or DHCP lease issues.",
  },
  {
    title: "Missing Wi-Fi Features",
    desc: "WPA3, MU-MIMO, and Band Steering features are often added or improved through firmware updates.",
  },
  {
    title: "Performance Degradation Over Time",
    desc: "Memory leaks, background processes, and unoptimized wireless drivers are addressed in firmware patches.",
  },
];

const quickFixChecklist = [
  "Back up current router config before starting (Administration → Backup)",
  "Note your current firmware version from router admin panel",
  "Check for auto-update in router admin panel first",
  "If manual: download firmware from manufacturer&apos;s official support page only",
  "Verify exact hardware revision on router label matches firmware download",
  "Plug router directly into wall socket (not surge protector) before flashing",
  "Do NOT power off router during the update process (3–5 minutes)",
  "After update: verify firmware version changed in admin panel",
  "For major version updates: perform factory reset, then restore backup",
];

export default async function RouterFirmwareUpdateGuidePage() {
  return (
    <TroubleshootingArticleShell
      h1="Router Firmware Update Guide: Safe Update Without Bricking (2026)"
      intro="Router firmware updates deliver critical security patches, performance improvements, and new features — but flashing wrong firmware or interrupting the process can brick the device. This guide explains how to back up your configuration, find the correct firmware for your exact hardware revision, perform both automatic and manual updates, and safely recover from update failures for TP-Link, Netgear, ASUS, Huawei, D-Link, and Linksys routers."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Never Power Off During Firmware Update",
        text: "Interrupting the firmware flashing process (3–5 minutes) by powering off the router creates a bricked device that cannot boot. Plug directly into a wall socket and do not touch the router until it has fully rebooted after the update.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="For ISP-supplied routers (modem-router combos), do not manually flash firmware — the ISP manages firmware updates remotely. Contact your ISP if the device is running outdated firmware with known security issues."
      severityLevel="medium"
    >
      <div className="space-y-8">

        {/* Quick Answer */}
        <section
          className="glass-card p-5 border border-orange-950/30 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer: Firmware Update"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            How to Update Router Firmware Safely
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Back up your config first, then use the auto-update option in your router admin panel (Administration
            → Firmware Upgrade → Check for Update). For manual updates, download only from the official brand site
            using your exact model and hardware version from the router label. Never interrupt power during flashing.
            For brand-specific login steps see the{" "}
            <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">
              router login guide
            </Link>
            .
          </p>
        </section>

        {/* Comparison: Firmware Update vs Factory Reset */}
        <section aria-label="Firmware Update vs Factory Reset Comparison">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Firmware Update vs. Factory Reset: Key Differences
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium w-1/3">Aspect</th>
                  <th className="text-left py-2 px-3 text-blue-400 font-medium">Firmware Update</th>
                  <th className="text-left py-2 px-3 text-red-400 font-medium">Factory Reset</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["Erases custom settings", "No (usually)", "Yes — complete wipe"],
                  ["Erases Wi-Fi config", "No", "Yes"],
                  ["Adds security patches", "Yes", "No"],
                  ["Fixes bugs", "Yes", "Partially (if bug is config-related)"],
                  ["Adds new features", "Yes", "No"],
                  ["Recovery use", "No", "Yes — locked out recovery"],
                  ["Time required", "3–5 minutes", "2–3 minutes + reconfiguration"],
                ].map(([aspect, firmware, reset], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3 text-[var(--text-primary)] font-medium">{aspect}</td>
                    <td className="py-2 px-3 text-blue-300">{firmware}</td>
                    <td className="py-2 px-3 text-red-300">{reset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Brand-Specific Firmware Update Table */}
        <section aria-label="Brand-Specific Firmware Update Guide">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Firmware Update Guide by Brand
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Brand</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Admin URL</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Firmware Menu Path</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Auto Update</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Support Page</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["TP-Link", "tplinkwifi.net", "Advanced → System → Firmware Upgrade", "Yes", "/tp-link-router-login"],
                  ["Netgear", "routerlogin.net", "ADVANCED → Administration → Firmware Update", "Yes", "/netgear-router-login"],
                  ["ASUS", "192.168.1.1", "Administration → Firmware Upgrade", "Yes", "/asus-router-login"],
                  ["Huawei", "192.168.100.1", "Maintenance → Software Upgrade", "Partial", "/huawei-router-login"],
                  ["Linksys", "192.168.1.1", "Connectivity → Router Firmware Update", "Yes", "/linksys-router-login"],
                  ["D-Link", "192.168.0.1", "Tools → Firmware Update", "No (manual only)", "/d-link-router-login"],
                ].map(([brand, url, path, auto, href], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3">
                      <Link href={href} className="text-[var(--brand-400)] hover:underline font-medium">
                        {brand}
                      </Link>
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px]">{url}</td>
                    <td className="py-2 px-3 text-[var(--text-muted)] text-[11px]">{path}</td>
                    <td className={`py-2 px-3 text-[11px] ${auto === "Yes" ? "text-green-400" : auto === "Partial" ? "text-amber-400" : "text-red-400"}`}>
                      {auto}
                    </td>
                    <td className="py-2 px-3">
                      <Link href={href} className="text-[var(--brand-400)] hover:underline text-[11px]">
                        Login guide →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Features Matrix */}
        <section aria-label="Brand Features Matrix">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Firmware Management Features by Brand
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Brand</th>
                  <th className="text-center py-2 px-3 text-[var(--text-muted)] font-medium">Backup Config</th>
                  <th className="text-center py-2 px-3 text-[var(--text-muted)] font-medium">Auto Update</th>
                  <th className="text-center py-2 px-3 text-[var(--text-muted)] font-medium">Manual Upload</th>
                  <th className="text-center py-2 px-3 text-[var(--text-muted)] font-medium">Rollback</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["TP-Link", "✓", "✓", "✓", "✗"],
                  ["Netgear", "✓", "✓", "✓", "Partial"],
                  ["ASUS", "✓", "✓", "✓", "✓"],
                  ["Huawei", "✓", "Partial", "✓", "✗"],
                  ["Linksys", "✓", "✓", "✓", "✗"],
                  ["D-Link", "✓", "✗", "✓", "✗"],
                ].map(([brand, backup, auto, manual, rollback], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3 text-[var(--text-primary)] font-medium">{brand}</td>
                    {[backup, auto, manual, rollback].map((val, j) => (
                      <td key={j} className={`py-2 px-3 text-center ${val === "✓" ? "text-green-400" : val === "✗" ? "text-red-400" : "text-amber-400"}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related guides */}
        <section aria-label="Related Router Security Guides">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { text: "Secure Router After Setup", href: "/secure-router-after-setup" },
              { text: "Change Router Admin Password", href: "/change-router-admin-password" },
              { text: "Router Login Recovery Hub", href: "/router-login-recovery" },
              { text: "Router Settings Page", href: "/router-settings" },
              { text: "Wi-Fi Security Guide", href: "/wifi-security" },
              { text: "WPA3 vs WPA2 Comparison", href: "/wpa3-vs-wpa2" },
              { text: "Router Admin Panel", href: "/router-admin" },
              { text: "Router Reset Guide", href: "/router-reset" },
            ].map(({ text, href }) => (
              <Link
                key={href}
                href={href}
                className="glass-card p-3 rounded-xl border border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-500)]/30 transition-colors"
              >
                <svg className="w-3 h-3 text-[var(--brand-400)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
                {text}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
