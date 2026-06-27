import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, RotateCcw, HelpCircle, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Forgot Router Password? 5 Recovery Methods That Work (2026)",
  description:
    "Recover access to your router admin panel when you forget the password. Learn soft recovery, factory reset, and credential extraction methods for all major brands.",
  canonical: "/forgot-router-password",
  keywords: [
    "forgot router password",
    "router password recovery",
    "reset router admin password",
    "router login password forgotten",
    "recover router admin access",
    "router factory reset password",
    "router admin credentials lost",
    "how to get into router without password",
  ],
});

// ─── Static data ─────────────────────────────────────────────────────────────

const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Recovery", url: "/router-login-recovery" },
  { name: "Forgot Router Password", url: "/forgot-router-password" },
];

const troubleshootingSteps = [
  {
    title: "Try the Default Factory Credentials First",
    description:
      "Before assuming the password is lost, try the factory-default credentials printed on the label stuck to the bottom or back of your router. Common defaults are admin/admin, admin/password, or a unique printed string. If nobody has changed them since purchase, this will work immediately without any reset.",
    tip:
      "Take a photo of the router label and store it in your password manager. The label shows the default SSID, default Wi-Fi password, default admin URL, and default admin credentials — all the information you need.",
  },
  {
    title: "Check Your Browser's Saved Passwords",
    description:
      "Your browser may have offered to save the admin password when you last logged in. In Chrome, navigate to chrome://password-manager/passwords and search for your router&apos;s IP address (e.g., 192.168.1.1). In Firefox, open Settings → Privacy &amp; Security → Saved Logins. In Edge, go to edge://settings/passwords. The saved credential may contain your current admin password.",
    tip:
      "Windows Credential Manager (Control Panel → User Accounts → Credential Manager → Windows Credentials) sometimes stores router admin passwords entered through Internet Explorer or Edge Legacy — worth checking before proceeding to a factory reset.",
  },
  {
    title: "Use Router Management Software or App",
    description:
      "Many routers have a companion mobile app or desktop software that stores your session and may bypass the manual password entry. TP-Link&apos;s Tether app, ASUS Router app, Netgear Nighthawk app, and Linksys app all maintain authenticated sessions. If you set up the app previously, open it and navigate to administration settings — you may be able to change the admin password from within the app without needing the current one.",
    tip:
      "If you are locked out of the app too, check if your smartphone or tablet has biometric login configured for the app — fingerprint or Face ID authentication may bypass the password prompt entirely.",
  },
  {
    title: "Perform a Factory Reset Using the Physical Reset Button",
    description:
      "Locate the small recessed RESET button on the back or bottom of the router. With the router powered on and fully booted, use a paperclip, toothpick, or SIM ejector tool to press and hold the RESET button for 10–15 seconds until all LED lights flash simultaneously or the router reboots. After the reset completes (allow 90 seconds), log in using the default credentials on the label. All custom settings, including Wi-Fi passwords and port forwarding rules, will be erased.",
    tip:
      "Make sure to back up your router&apos;s configuration first if you can partially access the admin panel — even read-only access is enough to export settings via Administration → Backup in most router UIs.",
  },
  {
    title: "Recover via Telnet or SSH (Advanced)",
    description:
      "Some routers expose a Telnet or SSH management interface on port 23 or 22. If this was previously enabled, you may be able to connect without needing the web UI password. On Windows, open Command Prompt and run: telnet 192.168.1.1. On Mac/Linux use: ssh admin@192.168.1.1. Once connected, use the router&apos;s CLI commands (varies by brand) to reset the admin password without a full factory reset. Common commands include nvram get http_passwd (DD-WRT/OpenWrt) or passwd admin.",
    tip:
      "This method works on OpenWrt, DD-WRT, Tomato, and some OEM firmware variants. It does NOT work on most consumer routers with locked-down firmware unless Telnet/SSH was explicitly enabled during initial setup.",
  },
];

const faqs = [
  {
    question: "Will a factory reset delete my Wi-Fi password?",
    answer:
      "Yes — a factory reset erases all customized settings including your Wi-Fi name (SSID), Wi-Fi password, port forwarding rules, custom DNS settings, QoS configurations, guest network settings, and the admin password. After the reset, all these settings revert to factory defaults as printed on the router label. You will need to reconfigure everything from scratch and reconnect all devices to the network.",
  },
  {
    question: "What is the difference between forgetting the admin password and forgetting the Wi-Fi password?",
    answer:
      "The admin password (also called the router password or login password) protects the router&apos;s web management interface at addresses like 192.168.1.1 — it controls administrative access to all router settings. The Wi-Fi password (WPA key or wireless password) is what devices use to join your wireless network. You can recover a forgotten Wi-Fi password without a factory reset by logging into the admin panel and viewing the wireless security settings — provided you still know the admin password.",
  },
  {
    question: "Is the router password the same as the Wi-Fi password?",
    answer:
      "No — these are two separate, unrelated passwords. The router admin password is used to log into the router&apos;s configuration dashboard (typically at 192.168.1.1 or 192.168.0.1). The Wi-Fi password is the network access key that wireless devices use to connect to your network. On many routers from factories, both are set to a random string printed on the device label, and they are different values.",
  },
  {
    question: "Can I recover my router admin password without a factory reset?",
    answer:
      "Yes, in some cases. Options include: (1) checking your browser&apos;s saved passwords manager for the IP address; (2) using the router&apos;s companion mobile app if it maintains an authenticated session; (3) using Telnet/SSH if enabled; (4) using TFTP recovery mode on supported models. However, if none of these work, a factory reset using the physical RESET button is the most reliable and universally supported method.",
  },
  {
    question: "What if the physical reset button does not work?",
    answer:
      "If the physical reset button is unresponsive, first ensure the router is fully powered on (wait 60 seconds after boot) before pressing it — some routers disable the reset button during the boot sequence. Try holding for a full 15–20 seconds rather than 10. If the button is mechanically broken, check if your router supports a soft reset through the web UI (Administration → Factory Reset) or via the CLI if Telnet/SSH is available. As a last resort, some routers support TFTP firmware recovery which also resets settings.",
  },
];

const commonCauses = [
  {
    title: "Credentials Changed During Setup",
    desc: "The admin password was customized during initial setup and not saved to a password manager or written down.",
  },
  {
    title: "Multiple People Configure Same Router",
    desc: "A household member or IT person changed the admin password and did not communicate the new credential.",
  },
  {
    title: "Default Credentials Already Tried",
    desc: "The default admin/admin or admin/password credentials were previously changed for security reasons but not recorded.",
  },
  {
    title: "ISP-Locked Router",
    desc: "ISP-provided routers often use non-standard credentials or disable the reset button to prevent customer configuration.",
  },
];

const quickFixChecklist = [
  "Check the label on the back/bottom of your router for default credentials",
  "Try admin/admin, admin/password, or admin/(blank) as credentials",
  "Check your browser&apos;s saved passwords for the router IP",
  "Open the router&apos;s companion app (TP-Link Tether, ASUS Router, Nighthawk)",
  "Check Windows Credential Manager for stored router login",
  "If nothing works, hold RESET button for 15 seconds while router is powered on",
  "After reset, wait 90 seconds before accessing admin panel",
  "Log in with factory defaults printed on the router label",
];

export default async function ForgotRouterPasswordPage() {
  return (
    <TroubleshootingArticleShell
      h1="Forgot Router Password? 5 Recovery Methods That Work (2026)"
      intro="Losing access to your router&apos;s admin panel means you cannot change Wi-Fi passwords, fix connectivity issues, configure port forwarding, or update security settings. This guide walks through every realistic recovery method — from checking browser-saved passwords to performing a factory reset — so you can regain control of your router without permanently losing your network configuration."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Factory Reset Erases All Settings",
        text: "A factory reset restores your router to its original out-of-box state, deleting ALL custom configurations including Wi-Fi credentials, port forwarding, custom DNS, and parental controls. Try all other recovery methods before resorting to a factory reset.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if the router is ISP-supplied and the reset button appears disabled or the default credentials on the label do not work. ISPs sometimes remotely provision routers with unique credentials not printed on the device label."
      severityLevel="high"
    >
      <div className="space-y-8">

        {/* AIO Quick Answer */}
        <section
          className="glass-card p-5 border border-orange-950/30 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer: Forgot Router Password"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            What to Do When You Forget Your Router Password
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Start with the router label: the default admin credentials are almost always printed there. If
            the password was changed, check your browser&apos;s saved passwords or companion app. If you truly
            cannot recover it, hold the physical RESET button for 15 seconds — this erases all custom settings
            and restores the factory defaults. See the full{" "}
            <Link href="/router-login-recovery" className="text-[var(--brand-400)] hover:underline">
              Router Login Recovery directory
            </Link>{" "}
            for additional scenarios.
          </p>
        </section>

        {/* Decision Tree */}
        <section aria-label="Password Recovery Decision Tree">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Password Recovery Decision Tree
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: HelpCircle,
                color: "text-blue-400",
                bg: "bg-blue-900/10 border-blue-800/30",
                q: "Can you access the admin panel at all?",
                yes: "YES → Try default credentials from label",
                no: "NO → Check if you're on the right network first",
              },
              {
                icon: KeyRound,
                color: "text-amber-400",
                bg: "bg-amber-900/10 border-amber-800/30",
                q: "Did someone previously change the password?",
                yes: "YES → Check browser saved passwords & app sessions",
                no: "NO → Factory defaults from the label should work",
              },
              {
                icon: RotateCcw,
                color: "text-red-400",
                bg: "bg-red-900/10 border-red-800/30",
                q: "Are you willing to lose all custom settings?",
                yes: "YES → Proceed with physical factory reset (15s hold)",
                no: "NO → Try Telnet/SSH recovery or browser app session",
              },
              {
                icon: CheckCircle2,
                color: "text-green-400",
                bg: "bg-green-900/10 border-green-800/30",
                q: "Is the reset button physically accessible?",
                yes: "YES → Hold for 10–15s while powered on",
                no: "NO → Use soft reset via partial UI or CLI access",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`glass-card p-4 rounded-xl border ${item.bg}`}
              >
                <div className={`flex items-center gap-2 mb-2 ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs font-bold">{item.q}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-green-400 flex items-start gap-1">
                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />
                    {item.yes}
                  </p>
                  <p className="text-[11px] text-red-400 flex items-start gap-1">
                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />
                    {item.no}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Box: Forgot Password vs Factory Reset */}
        <section aria-label="Forgot Password vs Factory Reset Comparison">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Forgot Password vs. Factory Reset: Key Differences
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium w-1/3">Aspect</th>
                  <th className="text-left py-2 px-3 text-amber-400 font-medium">Soft Recovery</th>
                  <th className="text-left py-2 px-3 text-red-400 font-medium">Factory Reset</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["Erases Wi-Fi settings", "No", "Yes — complete wipe"],
                  ["Erases port forwarding", "No", "Yes"],
                  ["Requires physical access", "No", "Yes (reset button)"],
                  ["Recovers forgotten password", "Sometimes", "Always (reverts to default)"],
                  ["Time required", "1–5 minutes", "5–10 minutes"],
                  ["Risk of misconfiguration", "Low", "High — must reconfigure all"],
                  ["Works on all routers", "No", "Yes"],
                ].map(([aspect, soft, reset], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3 text-[var(--text-primary)] font-medium">{aspect}</td>
                    <td className="py-2 px-3 text-green-400">{soft}</td>
                    <td className="py-2 px-3 text-red-400">{reset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recovery Scenarios */}
        <section aria-label="Recovery Scenarios by Situation">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Recovery by Scenario
          </h2>
          <div className="space-y-3">
            {[
              {
                scenario: "I know my username but forgot the password",
                solution:
                  "Check browser saved passwords for the router IP. If that fails, use your router&apos;s companion app. If still locked, a factory reset is required — the RESET button restores credentials to default.",
                link: { text: "Router admin password guide", href: "/router-admin-password" },
              },
              {
                scenario: "I know my password but forgot my username",
                solution:
                  "Try admin, administrator, root, or user as usernames — these cover 95% of all consumer routers. If your router uses an ISP-assigned username, check the label or call your ISP.",
                link: { text: "Router login guide", href: "/router-login" },
              },
              {
                scenario: "I forgot both username and password",
                solution:
                  "Start with label defaults. If previously changed, a factory reset is your only option to fully regain access. This erases all custom configuration — reconnect and reconfigure everything after the reset.",
                link: { text: "Router reset guide", href: "/router-reset" },
              },
              {
                scenario: "I cannot access the physical router (remote setup)",
                solution:
                  "Use the router companion app (Tether, Nighthawk, ASUS Router) as it may maintain an authenticated session. If that fails, someone on-site must physically press the reset button.",
                link: { text: "Router admin panel guide", href: "/router-admin" },
              },
              {
                scenario: "The physical reset button is not working",
                solution:
                  "Ensure the router is fully booted (wait 90s after power-on). Hold for a full 15–20 seconds using a firm tool. If mechanically broken, try a soft factory reset via the web UI (if partially accessible) or contact the manufacturer.",
                link: { text: "Router settings page", href: "/router-settings" },
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-4 rounded-xl border border-[var(--border-subtle)]"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--brand-500)]/20 text-[var(--brand-400)] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">{item.scenario}</h3>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-7 mb-2">
                  {item.solution}
                </p>
                <div className="pl-7">
                  <Link
                    href={item.link.href}
                    className="text-[11px] text-[var(--brand-400)] hover:underline flex items-center gap-1"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {item.link.text}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand-Specific Default Credentials */}
        <section aria-label="Brand Default Credentials">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Default Admin Credentials by Brand
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Brand</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Default Username</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Default Password</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Login URL</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["TP-Link", "admin", "admin", "/tp-link-router-login"],
                  ["Netgear", "admin", "password", "/netgear-router-login"],
                  ["ASUS", "admin", "admin", "/asus-router-login"],
                  ["D-Link", "admin", "(blank)", "/d-link-router-login"],
                  ["Linksys", "admin", "admin", "/linksys-router-login"],
                  ["Huawei", "admin", "admin", "/huawei-router-login"],
                ].map(([brand, user, pass, href], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3 text-[var(--text-primary)] font-medium">
                      <Link href={href} className="text-[var(--brand-400)] hover:underline">
                        {brand}
                      </Link>
                    </td>
                    <td className="py-2 px-3 font-mono text-green-400">{user}</td>
                    <td className="py-2 px-3 font-mono text-amber-400">{pass}</td>
                    <td className="py-2 px-3">
                      <Link href={href} className="text-[var(--brand-400)] hover:underline">
                        Login guide →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-2">
            After a factory reset, use these defaults. For unique credentials (Netgear router-specific passwords), check the label.
            See our{" "}
            <Link href="/router-admin-password" className="text-[var(--brand-400)] hover:underline">
              router admin password guide
            </Link>{" "}
            and{" "}
            <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">
              router password reference
            </Link>
            .
          </p>
        </section>

        {/* Related Guides */}
        <section aria-label="Related Router Login Guides">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { text: "Router Login Guide", href: "/router-login" },
              { text: "Router Reset (Factory Reset)", href: "/router-reset" },
              { text: "Router Admin Password Reference", href: "/router-admin-password" },
              { text: "Cannot Access Router Settings", href: "/router-cannot-access-settings" },
              { text: "Change Router Admin Password", href: "/change-router-admin-password" },
              { text: "Secure Router After Setup", href: "/secure-router-after-setup" },
              { text: "TP-Link Default Password", href: "/tp-link-default-password" },
              { text: "Netgear Default Password", href: "/netgear-default-password" },
            ].map(({ text, href }) => (
              <Link
                key={href}
                href={href}
                className="glass-card p-3 rounded-xl border border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-500)]/30 transition-colors"
              >
                <ArrowRight className="w-3 h-3 text-[var(--brand-400)] shrink-0" />
                {text}
              </Link>
            ))}
          </div>
        </section>

        {/* IP Quick Access */}
        <section aria-label="Common Router Login IPs">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
            Try These Common Router Gateway IPs
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { ip: "192.168.1.1", href: "/ips/192-168-1-1" },
              { ip: "192.168.0.1", href: "/ips/192-168-0-1" },
              { ip: "10.0.0.1", href: "/ips/10-0-0-1" },
              { ip: "192.168.100.1", href: "/ips/192-168-100-1" },
            ].map(({ ip, href }) => (
              <Link
                key={ip}
                href={href}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--brand-400)] hover:border-[var(--brand-500)]/50 transition-colors"
              >
                {ip}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}

// named re-export for module consistency
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
