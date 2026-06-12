import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import {
  Monitor,
  Smartphone,
  Globe,
  RefreshCw,
  Terminal,
  CheckCircle2,
  Shield,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to Flush DNS Cache — Windows, Mac, Linux & Browser (2026)",
  description:
    "Step-by-step commands to flush DNS cache on Windows, macOS, Linux, Chrome, Firefox, and Edge. Fix DNS resolution errors, slow browsing, and stale cached records instantly.",
  canonical: "/how-to-flush-dns-cache",
  keywords: [
    "flush dns cache",
    "clear dns cache",
    "how to flush dns",
    "ipconfig flushdns",
    "dns cache windows",
    "dns cache mac",
    "dns cache linux",
    "clear dns chrome",
    "dns not resolving fix",
    "reset dns cache",
  ],
});

const breadcrumbs = [
  { name: "DNS", url: "/dns" },
  { name: "Flush DNS Cache", url: "/how-to-flush-dns-cache" },
];

const troubleshootingSteps = [
  {
    title: "Identify the OS / Browser Causing the Issue",
    description:
      "DNS caches exist at three separate levels: the operating system, the web browser, and the router. Identify which level holds the stale record by testing the domain on a different browser or device. If the issue appears in one browser only, clear the browser DNS cache first.",
    tip: "Open a Private / Incognito tab. If the site loads there, the issue is browser-level caching.",
  },
  {
    title: "Run the Flush DNS Command",
    description:
      "Execute the correct flush command for your OS (see the guide below). On Windows you need an elevated Command Prompt. On macOS the command varies by OS version. On Linux the service name depends on the resolver stack in use.",
    tip: "After flushing, close and reopen your browser to clear its in-memory lookup table.",
  },
  {
    title: "Clear Browser-Level DNS Cache",
    description:
      "Web browsers maintain their own DNS cache independent of the OS. Even after an OS flush, a browser can serve stale records for minutes. Visit the browser's hidden internal settings page to force a clear.",
    tip: "Chrome: chrome://net-internals/#dns — click 'Clear host cache'. Firefox: restart after about:config network.dnsCacheExpiration → 0.",
  },
  {
    title: "Verify Resolution is Fixed",
    description:
      "After flushing, use the nslookup or dig command to confirm the domain now resolves to the correct IP. If the IP still points to a stale address, the record may be cached at the router or ISP level.",
    tip: "Run: nslookup yourdomain.com 8.8.8.8 — to bypass local caches and query Google's resolver directly.",
  },
];

const faqs = [
  {
    question: "What does flushing the DNS cache do?",
    answer:
      "Flushing the DNS cache deletes all locally stored domain-to-IP mappings. This forces your OS and browser to query your DNS resolver for fresh records on the next request. It fixes errors caused by changed IP addresses, corrupted entries, or DNS hijacking artifacts.",
  },
  {
    question: "How often should I flush my DNS cache?",
    answer:
      "There is no set schedule. Flush your DNS cache when you experience issues like websites not loading despite a working connection, being redirected to wrong pages, or receiving DNS resolution errors after a domain's IP address has recently changed.",
  },
  {
    question: "Does flushing DNS improve speed?",
    answer:
      "Temporarily, flushing DNS will slow down the first visit to each website since your device must re-resolve every domain from scratch. However, if stale cache entries were causing slow lookups or repeated retries, flushing can restore normal resolution speed.",
  },
  {
    question: "Will flushing DNS log me out of websites?",
    answer:
      "No. DNS flushing only removes cached IP mappings — it does not affect browser cookies, session tokens, saved passwords, or login states. You will remain logged into all websites.",
  },
  {
    question: "What is the Windows command to flush DNS?",
    answer:
      "Open Command Prompt as Administrator and run: ipconfig /flushdns. You should see a confirmation: 'Successfully flushed the DNS Resolver Cache.' If this command fails, also try: netsh winsock reset followed by a system reboot.",
  },
  {
    question: "How do I flush DNS on Mac?",
    answer:
      "On macOS Monterey, Ventura, and Sonoma (macOS 12–14), open Terminal and run: sudo killall -HUP mDNSResponder. On older versions like High Sierra and Mojave: sudo killall -HUP mDNSResponder && sudo dscacheutil -flushcache.",
  },
  {
    question: "How do I clear DNS cache in Chrome?",
    answer:
      "Type chrome://net-internals/#dns in the Chrome address bar, then click the 'Clear host cache' button. You can also click the 'Close idle sockets' button on chrome://net-internals/#sockets to force Chrome to re-establish connections.",
  },
  {
    question: "Is it safe to flush DNS?",
    answer:
      "Yes, flushing the DNS cache is completely safe. It removes only temporary lookup records from memory. No files are deleted, no settings are changed, and no personal data is affected. The cache will rebuild automatically as you browse.",
  },
];

const quickFixChecklist = [
  "Open Command Prompt (Windows) or Terminal (Mac/Linux) with administrator privileges",
  "Run the appropriate flush command for your OS (see guide below)",
  "Clear browser-specific DNS cache via chrome://net-internals/#dns (Chrome)",
  "Restart your browser after flushing to clear in-memory lookup tables",
  "Test with nslookup or ping to verify the domain resolves to the correct IP",
  "Restart your router if OS and browser flushes do not resolve the issue",
];

const commonCauses = [
  {
    title: "Stale Cached IP Addresses",
    desc: "A website or server has moved to a new IP address, but your OS is still directing requests to the old address stored in cache.",
  },
  {
    title: "Corrupted Cache Entries",
    desc: "DNS cache entries can become corrupted by network interruptions, causing incorrect or partial IP mappings that fail to resolve.",
  },
  {
    title: "DNS Hijacking Artifacts",
    desc: "Malware or ISP-level injection may have poisoned your cache with false IP mappings that redirect traffic to malicious or incorrect servers.",
  },
  {
    title: "Development / Testing Conflicts",
    desc: "Developers often need to flush DNS after pointing a domain to a new server IP, as the old IP is cached and blocks staging environment access.",
  },
];

const flushCommandsSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/how-to-flush-dns-cache#howto`,
  name: "How to Flush DNS Cache",
  description:
    "Step-by-step commands to flush and clear the DNS cache on Windows, macOS, Linux, and web browsers.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Flush DNS on Windows",
      text: "Open Command Prompt as Administrator. Run: ipconfig /flushdns",
      url: `${APP_URL}/how-to-flush-dns-cache#windows`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Flush DNS on macOS",
      text: "Open Terminal. Run: sudo killall -HUP mDNSResponder",
      url: `${APP_URL}/how-to-flush-dns-cache#macos`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Flush DNS on Linux",
      text: "Open Terminal. Run: sudo systemd-resolve --flush-caches (for systemd-resolved) or sudo /etc/init.d/nscd restart (for nscd).",
      url: `${APP_URL}/how-to-flush-dns-cache#linux`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Clear DNS Cache in Chrome",
      text: "Navigate to chrome://net-internals/#dns and click 'Clear host cache'.",
      url: `${APP_URL}/how-to-flush-dns-cache#chrome`,
    },
  ],
};

const platforms = [
  {
    id: "windows",
    label: "Windows",
    icon: Monitor,
    color: "blue",
    versions: "Windows 10 / 11",
    command: "ipconfig /flushdns",
    steps: [
      "Press Win + S, type Command Prompt",
      "Right-click and select Run as Administrator",
      'Type: ipconfig /flushdns and press Enter',
      "Confirm: 'Successfully flushed the DNS Resolver Cache'",
      "Optionally run: netsh winsock reset (then reboot)",
    ],
    note: "The /flushdns switch clears all entries in the Windows DNS Resolver Cache. For persistent issues, also run ipconfig /registerdns to re-register DNS entries.",
  },
  {
    id: "macos",
    label: "macOS",
    icon: Monitor,
    color: "purple",
    versions: "Monterey / Ventura / Sonoma (12–14)",
    command: "sudo killall -HUP mDNSResponder",
    steps: [
      "Open the Terminal app (Applications → Utilities → Terminal)",
      "Type the command and press Enter",
      "Enter your Mac administrator password when prompted",
      "No output is shown on success — close and reopen your browser",
    ],
    note: "For macOS High Sierra or Mojave, use: sudo killall -HUP mDNSResponder && sudo dscacheutil -flushcache",
  },
  {
    id: "linux",
    label: "Linux",
    icon: Terminal,
    color: "emerald",
    versions: "Ubuntu / Debian / Fedora (systemd-resolved)",
    command: "sudo systemd-resolve --flush-caches",
    steps: [
      "Open your terminal emulator",
      "Run the flush command for your resolver stack",
      "Verify the cache was cleared: sudo systemd-resolve --statistics",
      "Restart your browser to clear its in-memory DNS table",
    ],
    note: "If using nscd instead of systemd-resolved, use: sudo /etc/init.d/nscd restart. On Arch Linux: sudo systemctl restart systemd-resolved",
  },
  {
    id: "android",
    label: "Android",
    icon: Smartphone,
    color: "amber",
    versions: "Android 9+",
    command: "Toggle Airplane Mode On → Off",
    steps: [
      "Open Settings → Network & Internet → Private DNS",
      "Set Private DNS to Off, then back to Automatic",
      "Alternatively, toggle Airplane Mode on for 5 seconds then off",
      "Open Chrome → chrome://net-internals/#dns → Clear host cache",
    ],
    note: "Android does not have a direct terminal DNS flush command without root. The most reliable method is using Chrome's built-in DNS cache flush.",
  },
];

const browsers = [
  {
    id: "chrome",
    name: "Google Chrome",
    url: "chrome://net-internals/#dns",
    steps: [
      "Type chrome://net-internals/#dns in the address bar",
      "Click the 'Clear host cache' button",
      "Navigate to chrome://net-internals/#sockets and click 'Close idle sockets'",
      "Reload the affected page",
    ],
  },
  {
    id: "firefox",
    name: "Mozilla Firefox",
    url: "about:networking#dns",
    steps: [
      "Type about:networking#dns in the address bar",
      "Click 'Clear DNS Cache' button at the top right",
      "Alternatively restart Firefox — it clears the in-memory DNS table on launch",
    ],
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    url: "edge://net-internals/#dns",
    steps: [
      "Type edge://net-internals/#dns in the address bar",
      "Click 'Clear host cache'",
      "Also visit edge://net-internals/#sockets → Close idle sockets",
    ],
  },
  {
    id: "safari",
    name: "Safari (macOS)",
    url: "Develop menu",
    steps: [
      "Enable the Develop menu: Safari → Preferences → Advanced → Show Develop menu",
      "Click Develop in the menu bar",
      "Select 'Empty Caches' to clear all cached content including DNS",
    ],
  },
];

export default function HowToFlushDnsCachePage() {
  return (
    <>
      <JsonLd data={flushCommandsSchema} />

      <TroubleshootingArticleShell
        h1="How to Flush DNS Cache: Complete Commands for All Platforms (2026)"
        intro="Flushing your DNS cache forces your operating system and browser to discard stale or corrupted domain-to-IP mappings and fetch fresh records. This guide provides exact commands for Windows, macOS, Linux, Android, and all major web browsers — fixing DNS resolution errors, wrong redirects, and slow site loading in under two minutes."
        category="dns"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="low"
      >
        {/* OS Platform Commands */}
        <section className="mb-10" id="os-commands" aria-label="DNS Flush Commands by OS">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Flush DNS Cache by Operating System
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Each operating system maintains its own DNS resolver cache. Select your platform below for
            the exact commands and step-by-step instructions. Always run these commands with
            administrator or sudo privileges.
          </p>

          <div className="space-y-4">
            {platforms.map((p) => {
              const colorMap: Record<string, string> = {
                blue: "border-blue-900/30 bg-blue-950/5",
                purple: "border-purple-900/30 bg-purple-950/5",
                emerald: "border-emerald-900/30 bg-emerald-950/5",
                amber: "border-amber-900/30 bg-amber-950/5",
              };
              const labelColor: Record<string, string> = {
                blue: "text-blue-400",
                purple: "text-purple-400",
                emerald: "text-emerald-400",
                amber: "text-amber-400",
              };
              return (
                <div
                  key={p.id}
                  id={p.id}
                  className={`p-5 border rounded-xl ${colorMap[p.color]}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <p.icon size={16} className={labelColor[p.color]} />
                    <span className={`font-bold text-sm ${labelColor[p.color]}`}>{p.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">{p.versions}</span>
                  </div>
                  <pre className="font-mono text-xs text-[var(--brand-300)] bg-[var(--bg-base)] px-4 py-3 rounded-lg border border-[var(--border-subtle)] mb-3 overflow-x-auto">
                    {p.command}
                  </pre>
                  <ol className="list-decimal pl-5 space-y-1 text-xs text-[var(--text-secondary)] mb-3">
                    {p.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                  <p className="text-[11px] text-[var(--text-muted)] italic leading-relaxed">
                    {p.note}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Browser DNS Cache */}
        <section className="mb-10" id="browser-commands" aria-label="DNS Flush Commands by Browser">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Clear DNS Cache in Web Browsers
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
            Browsers maintain their own in-process DNS cache separate from the OS. Even after an OS
            flush, the browser may continue serving stale records. Clear the browser DNS cache using
            its internal tools:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {browsers.map((b) => (
              <div
                key={b.id}
                id={b.id}
                className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[var(--text-primary)]">{b.name}</span>
                  <code className="text-[10px] font-mono text-[var(--brand-400)] bg-[var(--bg-base)] px-2 py-0.5 rounded">
                    {b.url}
                  </code>
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-xs text-[var(--text-secondary)]">
                  {b.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* What Happens After Flushing */}
        <section className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            What Happens After Flushing?
          </h2>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p>
              After a successful DNS flush, your device&apos;s resolver cache is empty. The next time
              you visit any website, your OS will query your configured DNS resolver (ISP default or a
              public resolver like 1.1.1.1) to obtain a fresh IP mapping. This is completely normal
              and takes milliseconds.
            </p>
            <p>
              The first few page loads after a flush may feel slightly slower as each domain is
              re-resolved. The cache will rebuild automatically as you browse, restoring the speed
              benefit within minutes.
            </p>
            <div className="flex items-start gap-2 mt-4 p-3 bg-amber-950/10 border border-amber-900/20 rounded-lg">
              <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-muted)]">
                If DNS errors persist after flushing, the problem may be upstream at your ISP&apos;s
                resolver or router level. Try switching to a public DNS like Cloudflare (1.1.1.1) or
                Google DNS (8.8.8.8) in your network settings.
              </p>
            </div>
          </div>
        </section>

        {/* DNS Security Note */}
        <section className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Shield size={18} className="text-[var(--brand-400)]" />
            Improve DNS Security After Flushing
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            After clearing stale cache entries, consider switching to a privacy-focused, encrypted DNS
            resolver to prevent future cache poisoning and ISP-level DNS hijacking:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { name: "Cloudflare", primary: "1.1.1.1", secondary: "1.0.0.1", tag: "Privacy + Speed" },
              { name: "Google DNS", primary: "8.8.8.8", secondary: "8.8.4.4", tag: "Reliability" },
              { name: "Quad9", primary: "9.9.9.9", secondary: "149.112.112.112", tag: "Security" },
            ].map((r) => (
              <div
                key={r.name}
                className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg"
              >
                <div className="font-bold text-[var(--text-primary)] mb-1">{r.name}</div>
                <div className="font-mono text-[var(--brand-300)] text-[11px]">
                  {r.primary} / {r.secondary}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-1">{r.tag}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-6 glass-card p-5 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Related DNS Guides</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "What is DNS?", href: "/what-is-dns" },
              { label: "Best DNS Servers", href: "/best-dns-servers" },
              { label: "DNS Hub", href: "/dns" },
              { label: "DNS Not Resolving Fix", href: "/dns-server-not-responding" },
              { label: "Change DNS on Router", href: "/how-to-change-dns-on-router" },
              { label: "Best DNS for Gaming", href: "/best-dns-for-gaming" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </TroubleshootingArticleShell>
    </>
  );
}
