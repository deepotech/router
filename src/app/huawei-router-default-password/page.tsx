import type { Metadata } from "next";
import Link from "next/link";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Huawei Router Default Username & Password List (Updated 2026)",
  description:
    "Complete list of default usernames and passwords for all Huawei consumer routers, mobile LTE routers, and GPON fiber ONTs. Recovery instructions.",
  canonical: "/huawei-router-default-password",
  keywords: [
    "huawei router default password",
    "huawei default username and password",
    "telecomadmin admintelecom",
    "huawei ont login password",
    "huawei hg8145v5 default credentials",
    "huawei ax3 login keys",
    "reset huawei password",
  ],
});

export default async function HuaweiRouterDefaultPasswordPage() {
  const breadcrumbs = [
    { name: "Default Passwords", url: "/router-password" },
    { name: "Huawei", url: "/routers/huawei" },
    { name: "Huawei Default Passwords", url: "/huawei-router-default-password" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/huawei-router-default-password#webpage`,
    "url": `${APP_URL}/huawei-router-default-password`,
    "name": "Huawei Router Default Username & Password List (Updated 2026)",
    "description": "Complete list of default usernames and passwords for all Huawei consumer routers, mobile LTE routers, and GPON fiber ONTs.",
    "about": { "@type": "Thing", "name": "Huawei Default Passwords" },
  };

  const troubleshootingSteps = [
    {
      title: "Identify Your Specific Huawei Model Sticker",
      description:
        "Every Huawei device has a physical manufacturing label attached to its bottom panel or rear casing. Locate this sticker. It contains crucial security metadata: your model number, default Wi-Fi network name (SSID), factory Wi-Fi security key (WPA/WPA2/WPA3), and the default local IP gateway. For consumer routers, if there is no default password printed, the router uses a setup wizard where you must define a custom password on the first boot.",
      tip: "Take a high-resolution photo of the bottom sticker with your phone. This makes it easy to read small text and serial numbers when configuring settings in a dark room.",
    },
    {
      title: "Test Global Administrator Accounts for Fiber ONTs",
      description:
        "If you are attempting to access a Huawei Optical Network Terminal (GPON ONT) supplied by a fiber provider, standard consumer passwords will not work. Access the login screen at 192.168.100.1. Try entering Username 'telecomadmin' and Password 'admintelecom'. If this fails, the ISP has customized the root configurations. Standard user login alternatives are Username 'root' and Password 'admin'.",
      tip: "Logging in as 'root' limits your dashboard view, hiding advanced options like port forwarding, VoIP routing, and WAN mode switching.",
    },
    {
      title: "Perform a Physical Factory Reset to Restore Defaults",
      description:
        "If you or your service provider changed the administrator password and you cannot remember it, you must perform a hardware reset. Locate the tiny 'Reset' hole on the router. With the device powered on, press and hold the button inside using a pin for 10-15 seconds. Release the button when the LEDs blink or power off. The device will wipe all custom configurations and restore factory default usernames and passwords.",
      tip: "Warning: A factory reset deletes all custom configuration settings. You will need to re-enter your ISP PPPoE credentials, Wi-Fi SSIDs, and port mappings after the reboot.",
    },
  ];

  const faqs = [
    {
      question: "What is the telecomadmin password for Huawei ONTs?",
      answer: "The standard factory default password for the 'telecomadmin' account on Huawei GPON ONTs (such as the HG8145V5 and HG8245H) is 'admintelecom'. This account gives full root configuration rights over the optical network terminal.",
    },
    {
      question: "Why does telecomadmin/admintelecom fail to log in?",
      answer: "Fiber optic internet service providers (ISPs) often push custom firmware configurations to ONTs. During initial provisioning, the ISP's auto-configuration server (ACS) over TR-069 protocol will rewrite the default telecomadmin password to a custom value unique to the ISP or linked to the device's serial number. Contact your ISP if standard defaults fail.",
    },
    {
      question: "How do I change my Huawei Wi-Fi password?",
      answer: "Log into the web admin interface (e.g. 192.168.3.1), navigate to the 'WLAN' or 'Wi-Fi Settings' tab. Locate your wireless network name (SSID), input your new key in the 'Pre-shared Key' or 'Wi-Fi Password' field, and click Save or Apply.",
    },
    {
      question: "Is there a default password for Huawei AX3 router?",
      answer: "Huawei WiFi AX3 routers do not ship with a preconfigured default administrator password. During the initial out-of-the-box configuration, the setup wizard forces the user to define a custom admin password, or toggle a setting that matches the admin password to the custom Wi-Fi security key.",
    },
    {
      question: "What is the default login for Huawei LTE/5G mobile routers?",
      answer: "Most Huawei LTE mobile routers (e.g., B535, B310, B818) use 'admin' as both the default username and password. You can access the configuration dashboard at http://192.168.8.1.",
    },
    {
      question: "How do I see connected devices on a Huawei router after logging in?",
      answer: "Log into your admin panel (192.168.3.1 for consumer routers), go to 'DHCP' or 'More Functions' → 'Device Manager'. A list of all connected devices with their MAC addresses, IP addresses, and hostnames is displayed. Use this list to identify unknown devices and block unauthorized connections.",
    },
  ];

  const commonCauses = [
    {
      title: "TR-069 Remote Override",
      desc: "Upstream ISP servers modify factory logins during fiber line activation to prevent residential users from altering WAN settings.",
    },
    {
      title: "Custom User Credentials",
      desc: "The router setup wizard forces a custom password configuration on initial boot, rendering printed factory defaults obsolete.",
    },
    {
      title: "Incomplete Factory Reset",
      desc: "Pressing the reset button for less than 10 seconds only reboots the router instead of wiping the NVRAM configuration partition.",
    },
  ];

  const quickFixChecklist = [
    "Verify the model name and check the physical sticker on the bottom of the Huawei device.",
    "Try 'telecomadmin' and 'admintelecom' if logging into a GPON ONT at 192.168.100.1.",
    "Try 'root' and 'admin' as fallback credentials for limited read-only user access.",
    "Hold the hardware Reset button down with a pin for a full 10-15 seconds until all LEDs flash.",
    "Consult your ISP's technical documentation or support line if custom firmware blocks default keys.",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <TroubleshootingArticleShell
        h1="Huawei Router Default Passwords: Full Username & Login List"
        intro="Need the default credentials for your Huawei Wi-Fi router, LTE gateway, or fiber ONT terminal? This guide provides the complete manufacturing default username and password matrix, model-specific access keys, and recovery options when default logins fail."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "ISP Firmwares & Custom Passwords Warning",
          text: "Many modern telecom operators override Huawei's default 'admintelecom' password during setup for security purposes. If factory defaults fail, check your ISP service contract or look for a custom credential sticker affixed by the installer.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="medium"
        whenToContactISP="If you have performed a complete factory reset and still cannot access the router admin panel using 'telecomadmin' or 'admin', your ISP has locked down the hardware firmware. Contact their support desk to request access or ask them to put the device into Bridge Mode."
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              1. Huawei Router Default Credentials Matrix
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Use the following matrix to identify the default credentials for your Huawei device family. Ensure you are attempting login on the corresponding gateway IP address. Our full <Link href="/huawei-router-ip-address" className="text-[var(--brand-400)] hover:underline">Huawei IP address guide</Link> covers how to determine which gateway your device is using.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Device Family / Models</th>
                    <th className="px-4 py-3 text-left">Default Gateway</th>
                    <th className="px-4 py-3 text-left">Default Username</th>
                    <th className="px-4 py-3 text-left">Default Password</th>
                    <th className="px-4 py-3 text-left">Access Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Fiber GPON ONTs (HG8145V5, HG8245H, EG8145V5)</td>
                    <td className="px-4 py-3 font-mono">192.168.100.1</td>
                    <td className="px-4 py-3 font-mono">telecomadmin</td>
                    <td className="px-4 py-3 font-mono">admintelecom</td>
                    <td className="px-4 py-3">Global Root / Full Admin</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Fiber GPON ONTs (Standard User fallback)</td>
                    <td className="px-4 py-3 font-mono">192.168.100.1</td>
                    <td className="px-4 py-3 font-mono">root</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3">Restricted User / Read-Only</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">AX Series (WiFi AX3, AX3 Pro, AX2)</td>
                    <td className="px-4 py-3 font-mono">192.168.3.1</td>
                    <td className="px-4 py-3">None (Setup Wizard)</td>
                    <td className="px-4 py-3">User Defined</td>
                    <td className="px-4 py-3">Full Administrator</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">4G/5G SIM Routers (B535, B818, B311)</td>
                    <td className="px-4 py-3 font-mono">192.168.8.1</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3">Full Administrator</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Legacy ADSL Modems (HG532, HG531)</td>
                    <td className="px-4 py-3 font-mono">192.168.1.1</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 font-mono">admin (or @HuaweiHG521)</td>
                    <td className="px-4 py-3">Full Administrator</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              2. How to Recover Access to Your Huawei Router
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              If default passwords do not allow you to log in, someone has customized the login keys. Follow this structured recovery path to restore router access. You can also see our <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">router login not working guide</Link> for universal recovery procedures that apply to all brands.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Check Your Wi-Fi Key</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  During the initial setup of consumer routers like the AX3, the configuration assistant asks the user: &quot;Set as router login password?&quot;. If this checkbox was selected, your administrator password matches the security password you use to connect devices to Wi-Fi. Try entering your Wi-Fi password.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Execute a Hardware NVRAM Reset</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  To perform a hard reset: Keep the router plugged into power. Locate the Reset hole. Press a pin inside the button and hold it firmly for 12 seconds. Watch the status LED; it will turn off or flash red. Release the pin and wait 2 minutes for the bootloader to clear and re-initialize default parameters. Learn more about this in our <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline">general router reset guide</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              3. Security Best Practices After Login
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Once you have successfully logged in with default credentials, your first priority should be to harden access. Routers running default passwords are actively exploited by IoT botnets and port-scanning malware:
            </p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Immediately change the admin password to something 12+ characters with mixed case, numbers, and symbols.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Update your <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline">Wi-Fi password</Link> if you have been using the default SSID key.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Enable <Link href="/wpa3-vs-wpa2" className="text-[var(--brand-400)] hover:underline">WPA3 encryption</Link> if your router firmware supports it (AX3 Pro and newer).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Set up a <Link href="/guest-wifi-setup" className="text-[var(--brand-400)] hover:underline">Guest Wi-Fi network</Link> for IoT devices and visitors to isolate them from your main LAN.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Review <Link href="/how-to-see-who-is-on-my-wifi" className="text-[var(--brand-400)] hover:underline">who is connected to your Wi-Fi</Link> and block any unknown MAC addresses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Change your DNS servers to trusted resolvers — see our <Link href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">best DNS servers guide</Link>.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              4. Related Huawei &amp; Router Access Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei Device Guides</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Log in to your gateway: <Link href="/huawei-router-login" className="text-[var(--brand-400)] hover:underline">Huawei Router Login Guide</Link></li>
                  <li>Identify your default IP: <Link href="/huawei-router-ip-address" className="text-[var(--brand-400)] hover:underline">Huawei Router IP Guide</Link></li>
                  <li>AX3 WiFi 6 setup: <Link href="/huawei-ax3-default-password" className="text-[var(--brand-400)] hover:underline">Huawei AX3 Setup Guide</Link></li>
                  <li>HG8145V5 ONT setup: <Link href="/huawei-hg8145v5-default-password" className="text-[var(--brand-400)] hover:underline">HG8145V5 Admin Guide</Link></li>
                </ul>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">General Router Access Resources</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Full brand password list: <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">Default Router Passwords</Link></li>
                  <li>Admin access hub: <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Setup Guide</Link></li>
                  <li>Safe reset procedures: <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline">Router Reset Walkthrough</Link></li>
                  <li>All brand login guides: <Link href="/router-login-hostnames" className="text-[var(--brand-400)] hover:underline">Router Login Hostnames Directory</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
