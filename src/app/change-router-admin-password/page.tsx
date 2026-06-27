import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "How to Change Router Admin Password (All Brands, 2026)",
  description:
    "Step-by-step guide to changing your router's admin password on TP-Link, Netgear, ASUS, D-Link, Linksys, and Huawei routers. Protect your admin panel with a strong, unique password.",
  canonical: "/change-router-admin-password",
  keywords: [
    "change router admin password",
    "how to change router password",
    "update router login password",
    "router admin password change",
    "change router management password",
    "TP-Link admin password change",
    "Netgear admin password change",
    "ASUS router password change",
  ],
});

// ─── Static data ─────────────────────────────────────────────────────────────

const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Recovery", url: "/router-login-recovery" },
  { name: "Change Router Admin Password", url: "/change-router-admin-password" },
];

const troubleshootingSteps = [
  {
    title: "Log Into the Router Admin Panel",
    description:
      "Open a web browser and type your router&apos;s IP address directly into the address bar — use http://192.168.1.1, http://192.168.0.1, or the brand-specific hostname (e.g., http://tplinkwifi.net). Enter your current admin username and password. If you do not know them, check the label on the bottom of your router for factory defaults. Common defaults include admin/admin, admin/password, or a unique printed string on Netgear models.",
    tip:
      "Use http:// not https://. Router admin panels use HTTP on port 80 by default. Browsers that auto-upgrade to HTTPS will show a certificate error — add the explicit http:// prefix to prevent this.",
  },
  {
    title: "Navigate to the Admin Password Settings",
    description:
      "Once logged in, find the admin password settings. The menu path varies by brand: TP-Link: Advanced → System → Administration → Account Management. Netgear: ADVANCED → Administration → Set Password. ASUS: Administration → System → Router Login. D-Link: Tools → Admin → Administrator Password. Linksys: Connectivity → Administration. Huawei: System Tools → Modify Login Password. Look for a section labeled &apos;Admin Password&apos;, &apos;Management Password&apos;, or &apos;Router Password&apos;.",
    tip:
      "Some routers require you to enter the current password before allowing you to set a new one — this is a security measure to prevent unauthorized changes. Have the current password ready.",
  },
  {
    title: "Create a Strong Admin Password",
    description:
      "Enter a new admin password that meets all of these criteria: at least 12 characters long; mix of uppercase and lowercase letters; includes numbers and at least one symbol (!@#$%^&); not the same as your Wi-Fi password; not based on personal information (name, address, date of birth). Avoid dictionary words. Good examples: R0ut3r!Secur3-2026, Admin#9vX@mW4p. Bad examples: mypassword, admin123, Password1.",
    tip:
      "Use a password manager (Bitwarden, 1Password, Dashlane) to generate and store the password. Also write it on paper and tape it to the bottom of the router alongside the label — this provides a physical backup without digital exposure.",
  },
  {
    title: "Save the New Password and Verify",
    description:
      "Click Save, Apply, or Submit to save the new password. The router may prompt you to log in again with the new credentials immediately after saving. Log in with your new password to confirm it works. If the router logs you out automatically, re-enter the username (admin) and the new password you just set. If the login fails, clear your browser&apos;s saved passwords for the router IP (to avoid auto-fill conflicts) and try again.",
    tip:
      "After successfully changing the admin password, update it in your password manager immediately. Also update any physical notes or documentation you keep about your network configuration.",
  },
  {
    title: "Enable HTTPS Admin Access if Supported",
    description:
      "Many modern routers (ASUS, Netgear Nighthawk, TP-Link Deco) support HTTPS for the admin panel, encrypting the connection between your browser and the router. Check Administration → System → HTTPS Management or Security → Remote Access for this option. Enabling HTTPS prevents any other device on your network from sniffing the admin password during login. Note that your browser will still show a certificate warning (self-signed cert) — you can safely proceed.",
    tip:
      "If your router supports HTTPS admin access, also consider changing the management port from 80 to a non-standard port (e.g., 8443). This adds a minor layer of obscurity but does not replace a strong password.",
  },
];

const faqs = [
  {
    question: "How often should I change my router admin password?",
    answer:
      "Change your router admin password: (1) immediately after purchasing a new router and before connecting it to the internet; (2) whenever you suspect unauthorized access (unknown devices, changed settings you did not make); (3) annually as part of routine network security maintenance; (4) after giving access to a contractor, technician, or house guest who needed it temporarily. There is no need to change it more frequently unless you have a specific reason.",
  },
  {
    question: "Does changing the admin password affect my Wi-Fi connection?",
    answer:
      "No — the router admin password and the Wi-Fi password are completely separate. Changing the admin password does not disconnect any devices from Wi-Fi, does not change the Wi-Fi password (WPA2/WPA3 key), and does not affect any network settings. Only people who need to access the router management panel (at 192.168.1.1) will need the new admin password.",
  },
  {
    question: "What if I change the admin password and forget the new one?",
    answer:
      "If you forget the new admin password, you have a few recovery options: (1) Check your browser&apos;s saved passwords for the router IP; (2) Check your password manager; (3) Look for the password written on the router label (if you followed the advice to write it there); (4) As a last resort, perform a factory reset using the physical RESET button — this restores the factory default credentials but erases all custom configuration.",
  },
  {
    question: "What is a strong router admin password?",
    answer:
      "A strong router admin password is: at least 12 characters; a mix of uppercase and lowercase letters, numbers, and symbols; not a dictionary word or common phrase; not derived from personal information; different from your Wi-Fi password and any other password you use. Example: xK9#mW4p!Router26. Using a password manager to generate a random 16-character password is the best approach — you only need to enter it occasionally.",
  },
  {
    question: "Can I use the same admin password across multiple routers?",
    answer:
      "You should not. If one router is compromised and the password is leaked, all other routers with the same password become vulnerable. Each router should have a unique admin password. Password managers make this practical since you do not need to remember each individual password.",
  },
];

const commonCauses = [
  {
    title: "Default Admin/Admin Credentials",
    desc: "Leaving the factory default admin password is the single greatest router security vulnerability — it is publicly documented and exploited by malware.",
  },
  {
    title: "Weak Password Choices",
    desc: "Using easily guessable passwords like the home address, phone number, or router model name reduces security to near zero.",
  },
  {
    title: "Password Not Updated After Sharing",
    desc: "Giving the admin password to a technician or guest and not changing it afterward leaves access open indefinitely.",
  },
  {
    title: "Same Password for Admin and Wi-Fi",
    desc: "If the Wi-Fi password is compromised, attackers on the network can also log into the admin panel with the same credential.",
  },
];

const quickFixChecklist = [
  "Log into router admin panel at http://192.168.1.1 (use http://)",
  "Navigate to Administration → Password or equivalent menu",
  "Enter current password to confirm identity",
  "Create new password: 12+ chars, mixed case, numbers, symbols",
  "Do NOT use the same password as your Wi-Fi",
  "Save the new password to a password manager",
  "Write the new password on paper, store near router",
  "Log in again with new credentials to verify it works",
  "Enable HTTPS admin access if your router supports it",
];

export default async function ChangeRouterAdminPasswordPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Change Router Admin Password: Step-by-Step Guide (2026)"
      intro="Leaving your router&apos;s admin panel protected by factory-default credentials (admin/admin) is the single most common home network security mistake. Any device on your network — or an attacker who cracks your Wi-Fi — can access and modify all settings. This guide walks through changing the admin password on every major router brand, creating a strong credential, and securely storing it so you never get locked out."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Change Your Admin Password Before Anything Else",
        text: "If you are setting up a new router, change the admin password as the very first step — before connecting devices, configuring Wi-Fi, or opening any ports. Default credentials like admin/admin are publicly known and actively exploited.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if the router is ISP-supplied and you cannot access the admin panel to change the password. ISP-managed devices may have restricted admin access."
      severityLevel="high"
    >
      <div className="space-y-8">

        {/* Quick Answer */}
        <section
          className="glass-card p-5 border border-orange-950/30 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer: Change Admin Password"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            How to Change Your Router Admin Password in 3 Steps
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            (1) Log in at{" "}
            <code className="font-mono text-green-400">http://192.168.1.1</code> with your current credentials.
            (2) Navigate to Administration → Password (path varies by brand — see table below).
            (3) Enter a new 12+ character password and save. Store it in a password manager and write it on the
            router label. For help logging in, see the{" "}
            <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">
              router login guide
            </Link>
            .
          </p>
        </section>

        {/* Why Change It */}
        <section aria-label="Why Change the Router Admin Password">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Why You Must Change the Default Admin Password
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                risk: "Network Hijacking",
                color: "text-red-400 bg-red-900/10 border-red-800/30",
                desc: "An attacker with the admin password can change DNS servers to route all traffic through a malicious proxy — intercepting banking and login sessions.",
              },
              {
                risk: "Malware Propagation",
                color: "text-orange-400 bg-orange-900/10 border-orange-800/30",
                desc: "Router malware (Mirai, VPNFilter) systematically scans for routers using default admin/admin credentials and compromises them for botnet activity.",
              },
              {
                risk: "Port Opening for Attackers",
                color: "text-amber-400 bg-amber-900/10 border-amber-800/30",
                desc: "With admin access, attackers can open ports, enable remote management, and create persistent backdoors into your network.",
              },
              {
                risk: "WPA2 Key Extraction",
                color: "text-purple-400 bg-purple-900/10 border-purple-800/30",
                desc: "The Wi-Fi password is visible in plain text in the router admin panel — anyone who logs in can extract it and give network access to others.",
              },
            ].map(({ risk, color, desc }, i) => (
              <div key={i} className={`glass-card p-4 rounded-xl border ${color.split(" ").slice(1).join(" ")}`}>
                <h3 className={`text-xs font-bold mb-1 ${color.split(" ")[0]}`}>{risk}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand-Specific Menu Paths */}
        <section aria-label="Admin Password Menu Paths by Brand">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Admin Password Menu Path by Router Brand
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Brand</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Login URL</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Password Change Path</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["TP-Link", "tplinkwifi.net", "Advanced → System → Administration → Account Management", "/tp-link-router-login"],
                  ["Netgear", "routerlogin.net", "ADVANCED → Administration → Set Password", "/netgear-router-login"],
                  ["ASUS", "192.168.1.1", "Administration → System → Router Login Password", "/asus-router-login"],
                  ["D-Link", "192.168.0.1", "Tools → Admin → Administrator Password", "/d-link-router-login"],
                  ["Linksys", "192.168.1.1", "Connectivity → Administration → Router Password", "/linksys-router-login"],
                  ["Huawei", "192.168.100.1", "System Tools → Modify Login Password", "/huawei-router-login"],
                ].map(([brand, url, path, href], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3">
                      <Link href={href} className="text-[var(--brand-400)] hover:underline font-medium">
                        {brand}
                      </Link>
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px]">{url}</td>
                    <td className="py-2 px-3 text-[var(--text-muted)] text-[11px]">{path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Password Strength Guide */}
        <section aria-label="Password Strength Guide">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Router Admin Password Strength Guide
          </h2>
          <div className="space-y-2">
            {[
              { label: "Weak (Avoid)", examples: "admin, password, 12345678, router123", color: "text-red-400", bar: "w-1/5 bg-red-500" },
              { label: "Fair (Acceptable)", examples: "MyRouter2026, SecureNet#1", color: "text-amber-400", bar: "w-2/5 bg-amber-500" },
              { label: "Good", examples: "R0ut3r!Net2026, xK9mW@pass", color: "text-yellow-400", bar: "w-3/5 bg-yellow-500" },
              { label: "Strong (Recommended)", examples: "xK9#mW4p!Router26, @9gBv!qL2mRt", color: "text-green-400", bar: "w-4/5 bg-green-500" },
              { label: "Excellent", examples: "Generated by password manager: 16+ random chars", color: "text-emerald-400", bar: "w-full bg-emerald-500" },
            ].map(({ label, examples, color, bar }, i) => (
              <div key={i} className="glass-card p-3 rounded-xl border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] font-bold ${color}`}>{label}</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">{examples}</span>
                </div>
                <div className="h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${bar}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section aria-label="Related Security Guides">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { text: "Secure Router After Setup", href: "/secure-router-after-setup" },
              { text: "Router Admin Password Reference", href: "/router-admin-password" },
              { text: "Forgot Router Password Recovery", href: "/forgot-router-password" },
              { text: "Router Login Recovery Hub", href: "/router-login-recovery" },
              { text: "Router Firmware Update Guide", href: "/router-firmware-update-guide" },
              { text: "Wi-Fi Security Guide", href: "/wifi-security" },
              { text: "WPA3 vs WPA2", href: "/wpa3-vs-wpa2" },
              { text: "Change Wi-Fi Password", href: "/change-wifi-password" },
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
