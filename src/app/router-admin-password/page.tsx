import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Router Admin Password: Default Credentials by Brand (2026)",
  description:
    "Find your router's default admin password, understand the difference between admin and Wi-Fi passwords, and learn how to reset or recover access for TP-Link, Netgear, ASUS, D-Link, Linksys, and Huawei routers.",
  canonical: "/router-admin-password",
  keywords: [
    "router admin password",
    "router default admin password",
    "router administrator login",
    "router admin credentials",
    "default router username and password",
    "router admin page password",
    "router management password",
    "change router admin password",
  ],
});

// ─── Static data ─────────────────────────────────────────────────────────────

const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Recovery", url: "/router-login-recovery" },
  { name: "Router Admin Password", url: "/router-admin-password" },
];

const troubleshootingSteps = [
  {
    title: "Locate the Admin Password on Your Router Label",
    description:
      "The factory-default admin credentials are always printed on the physical label attached to the bottom or back panel of the router. This label shows the default admin username, admin password (sometimes labeled &apos;Admin Password&apos; or &apos;Password&apos;), the management URL (e.g., 192.168.1.1 or tplinkwifi.net), and the default Wi-Fi credentials. Use these to log in before trying anything else.",
    tip:
      "Netgear routers print a unique router-specific admin password on the label — it is NOT admin/password. Always check the label for the actual value rather than using the generic defaults documented online.",
  },
  {
    title: "Access the Router Admin Console",
    description:
      "Open a web browser and type your router&apos;s IP address or hostname directly in the address bar — for example, http://192.168.1.1, http://192.168.0.1, or your router&apos;s brand hostname such as http://tplinkwifi.net. Do not search for it in Google. On the login page, enter the admin username and password from the label. If you see a security certificate error, click &apos;Advanced&apos; and proceed — router admin panels use self-signed certificates.",
    tip:
      "Always use http:// not https://. Most router admin dashboards do not support TLS and will fail to load if the browser forces HTTPS.",
  },
  {
    title: "Change the Admin Password for Security",
    description:
      "Once logged in, navigate to Administration → Management → Change Admin Password (the exact menu path varies by brand and model). Set a strong, unique password of at least 12 characters using a mix of uppercase, lowercase, numbers, and symbols. Store it in a password manager. Leaving the router admin password as the factory default (admin/admin) is a critical security vulnerability.",
    tip:
      "Write the new admin password on a piece of paper and tape it to the bottom of your router — this ensures recovery if you forget it, without exposing it digitally.",
  },
  {
    title: "Reset to Factory Default if Credentials Are Unknown",
    description:
      "If the admin password was changed and is not known, locate the RESET button on the back or bottom of the router. With the router powered on, hold the RESET button for 10–15 seconds until all LEDs flash. Wait 90 seconds for the reboot to complete, then log in using the factory defaults on the label. All custom settings will be erased.",
    tip:
      "For ISP-supplied routers, the admin password may be set to a unique device-specific value by the ISP. If the label&apos;s defaults fail after a factory reset, call your ISP — they may have remotely configured the device.",
  },
];

const faqs = [
  {
    question: "What is the difference between the router admin password and the Wi-Fi password?",
    answer:
      "The router admin password controls access to the router&apos;s configuration dashboard (e.g., at 192.168.1.1) where you manage all settings. The Wi-Fi password (WPA2/WPA3 key) is what wireless devices use to join your network. These are completely separate credentials — changing one does not affect the other. You can view and change your Wi-Fi password by logging into the admin dashboard with the admin password.",
  },
  {
    question: "Why does my router admin password not work even though I am using the defaults?",
    answer:
      "The most common reasons are: (1) the password was already changed during a previous setup session; (2) Caps Lock is enabled — admin passwords are case-sensitive; (3) you are using a different router than expected on that IP — confirm the IP by running ipconfig and checking the Default Gateway value; (4) the browser auto-filled an incorrect saved password. Try the password in a private/incognito browser window to bypass auto-fill.",
  },
  {
    question: "Is it safe to leave the router with the default admin password?",
    answer:
      "No — leaving the default admin password (especially admin/admin or admin/password) is a significant security risk. Any device on your network — or an attacker who gains Wi-Fi access — can log into the admin panel and change DNS settings, open ports, intercept traffic, or install malicious firmware. Always change the admin password during initial setup. See our guide on how to secure your router after setup.",
  },
  {
    question: "Can I log into my router admin panel from outside my home network?",
    answer:
      "By default, no — router admin panels are only accessible from within the local network (LAN). Remote management must be explicitly enabled in the admin panel under Administration → Remote Access or WAN Management. Enabling remote admin access without proper security (HTTPS, IP whitelisting) is dangerous and not recommended.",
  },
  {
    question: "What port does the router admin panel use?",
    answer:
      "Most router admin panels use port 80 (HTTP) or port 443 (HTTPS) on the LAN-side IP address. Some routers also expose the admin panel on port 8080 or 8443 as an alternative. The admin interface is always on the router&apos;s LAN IP (e.g., 192.168.1.1:80) — it is separate from any WAN-facing ports which may be opened for services like gaming or remote desktop.",
  },
];

const commonCauses = [
  {
    title: "Default Credentials Used (Security Risk)",
    desc: "Most routers ship with admin/admin or admin/password. These are publicly documented and exploited by malware and attackers.",
  },
  {
    title: "Password Changed and Forgotten",
    desc: "The admin password was updated for security but not saved to a password manager or written down.",
  },
  {
    title: "ISP-Locked Credentials",
    desc: "ISP-provided routers often use non-standard credentials the ISP controls, preventing customer access to certain settings.",
  },
  {
    title: "Wrong IP or Device",
    desc: "Connecting to the wrong IP address or a different device on the network, causing the correct credentials to fail.",
  },
];

const quickFixChecklist = [
  "Check the router label for default admin username and password",
  "Open browser and type http://192.168.1.1 directly (not via Google search)",
  "Disable Caps Lock — admin passwords are case-sensitive",
  "Try private/incognito mode to avoid browser auto-fill",
  "Ensure you are on the router&apos;s own network (not a different Wi-Fi)",
  "Run ipconfig to confirm the correct Default Gateway IP",
  "If credentials fail after label check → hold RESET for 15 seconds",
];

export default async function RouterAdminPasswordPage() {
  return (
    <TroubleshootingArticleShell
      h1="Router Admin Password: Complete Guide & Default Credentials (2026)"
      intro="The router admin password is the credential that protects your router&apos;s configuration dashboard — the control center for Wi-Fi, security, port forwarding, and DNS settings. This guide explains what the admin password is, where to find it, how to change it, and what to do when it stops working, with brand-specific credential tables for TP-Link, Netgear, ASUS, D-Link, Linksys, and Huawei."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Default Admin Passwords Are a Security Risk",
        text: "Leaving your router with factory-default admin credentials (admin/admin) exposes your entire network to unauthorized configuration changes. Change the admin password immediately after accessing the dashboard for the first time.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your router is ISP-supplied and the factory reset does not restore working default credentials. ISPs may remotely manage credentials on their devices and can reset access on your behalf."
      severityLevel="high"
    >
      <div className="space-y-8">

        {/* Quick Answer */}
        <section
          className="glass-card p-5 border border-orange-950/30 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer: Router Admin Password"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            What is the Router Admin Password?
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The router admin password controls access to your router&apos;s web management dashboard (at addresses
            like 192.168.1.1). Find it on the label on the bottom of your router — most factory defaults are{" "}
            <code className="font-mono text-amber-300">admin/admin</code> or a unique printed string. For brand-specific
            credentials, see the table below. If the password was changed and lost, see our{" "}
            <Link href="/forgot-router-password" className="text-[var(--brand-400)] hover:underline">
              forgot router password guide
            </Link>
            .
          </p>
        </section>

        {/* Comparison: Admin vs Wi-Fi Password */}
        <section aria-label="Admin Password vs Wi-Fi Password Comparison">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Admin Password vs. Wi-Fi Password: Key Differences
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium w-1/3">Aspect</th>
                  <th className="text-left py-2 px-3 text-amber-400 font-medium">Admin Password</th>
                  <th className="text-left py-2 px-3 text-blue-400 font-medium">Wi-Fi Password</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["Purpose", "Logs you into the router dashboard", "Connects devices to Wi-Fi network"],
                  ["Where entered", "Browser → router IP address", "Device Wi-Fi settings"],
                  ["Changes affect", "Admin access only", "All wireless connections"],
                  ["Default value", "admin/admin or label-printed value", "Unique label-printed key"],
                  ["Recovery if lost", "Factory reset (erases all settings)", "Log into admin panel to view/change"],
                  ["Security scope", "Router management plane", "Wireless data plane"],
                  ["Who needs it", "Router administrators", "All network users"],
                ].map(([aspect, admin, wifi], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3 text-[var(--text-primary)] font-medium">{aspect}</td>
                    <td className="py-2 px-3 text-amber-300">{admin}</td>
                    <td className="py-2 px-3 text-blue-300">{wifi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Brand Default Password Table */}
        <section aria-label="Brand Default Admin Credentials Table">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Default Admin Credentials by Router Brand
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Brand</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Default Username</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Default Password</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Login URL</th>
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["TP-Link", "admin", "admin", "http://tplinkwifi.net", "/tp-link-router-login", "/tp-link-default-password"],
                  ["Netgear", "admin", "password (unique — check label)", "http://routerlogin.net", "/netgear-router-login", "/netgear-default-password"],
                  ["ASUS", "admin", "admin", "http://192.168.1.1", "/asus-router-login", "/asus-default-password"],
                  ["D-Link", "admin", "(blank — no password)", "http://192.168.0.1", "/d-link-router-login", "/d-link-default-password"],
                  ["Linksys", "admin", "admin", "http://192.168.1.1", "/linksys-router-login", "/linksys-default-password"],
                  ["Huawei", "admin", "admin", "http://192.168.100.1", "/huawei-router-login", "/huawei-router-default-password"],
                ].map(([brand, user, pass, url, loginHref, passHref], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3 text-[var(--text-primary)] font-medium">
                      <Link href={loginHref} className="text-[var(--brand-400)] hover:underline">
                        {brand}
                      </Link>
                    </td>
                    <td className="py-2 px-3 font-mono text-green-400">{user}</td>
                    <td className="py-2 px-3 font-mono text-amber-400">{pass}</td>
                    <td className="py-2 px-3 font-mono text-[11px]">{url}</td>
                    <td className="py-2 px-3">
                      <Link href={passHref} className="text-[var(--brand-400)] hover:underline text-[11px]">
                        Password guide →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-2">
            After a factory reset, use these values. Always change the admin password after logging in. See the full{" "}
            <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">
              router password guide
            </Link>{" "}
            for more details.
          </p>
        </section>

        {/* Related troubleshooting links */}
        <section aria-label="Related Resources">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { text: "Forgot Router Password — Recovery Guide", href: "/forgot-router-password" },
              { text: "Cannot Access Router Settings", href: "/router-cannot-access-settings" },
              { text: "Change Router Admin Password", href: "/change-router-admin-password" },
              { text: "Secure Router After Setup", href: "/secure-router-after-setup" },
              { text: "Router Login Recovery Hub", href: "/router-login-recovery" },
              { text: "Router Login Not Working", href: "/router-login-not-working" },
              { text: "Router Login Hostnames", href: "/router-login-hostnames" },
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
