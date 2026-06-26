import type { Metadata } from "next";
import Link from "next/link";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Huawei HG8145V5 Default Username & Password Guide (2026)",
  description:
    "Get default admin logins for the Huawei HG8145V5 GPON ONT. Learn how to log into 192.168.100.1, change Wi-Fi settings, and troubleshoot fiber connection issues.",
  canonical: "/huawei-hg8145v5-default-password",
  keywords: [
    "huawei hg8145v5 default password",
    "hg8145v5 admin login",
    "telecomadmin hg8145v5",
    "192.168.100.1 hg8145v5",
    "huawei hg8145v5 wifi setup",
    "gpon ont admin access",
    "hg8145v5 factory reset",
  ],
});

export default async function HuaweiHg8145v5DefaultPasswordPage() {
  const breadcrumbs = [
    { name: "Default Passwords", url: "/router-password" },
    { name: "Huawei", url: "/routers/huawei" },
    { name: "HG8145V5 Default Credentials", url: "/huawei-hg8145v5-default-password" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/huawei-hg8145v5-default-password#webpage`,
    "url": `${APP_URL}/huawei-hg8145v5-default-password`,
    "name": "Huawei HG8145V5 Default Username & Password Guide (2026)",
    "description": "Get default admin logins for the Huawei HG8145V5 GPON ONT. Learn how to log into 192.168.100.1, change Wi-Fi settings, and troubleshoot fiber connection issues.",
    "about": { "@type": "Thing", "name": "Huawei HG8145V5 default password" },
  };

  const troubleshootingSteps = [
    {
      title: "Establish Wired Ethernet Link to the HG8145V5",
      description:
        "Because the HG8145V5 is a GPON Optical Network Terminal (ONT), configuring settings over Wi-Fi can lead to dropped sessions during network commits. Connect an RJ45 Ethernet cable from your computer's network interface card to LAN Port 1 or LAN Port 2 on the side panel of the Huawei ONT. Ensure that your computer's network adapter settings are configured to automatically obtain an IP address via DHCP.",
      tip: "Avoid using LAN Port 4 if your ISP utilizes it for IPTV bridging, as this port may not lease local IP addresses to standard computer clients.",
    },
    {
      title: "Navigate to 192.168.100.1 in Your Web Browser",
      description:
        "Open a web browser on your connected computer. In the URL address bar, enter the default ONT IP address 'http://192.168.100.1' and press Enter. This will load the official Huawei administration portal. If a security warning appears stating that the connection is unencrypted, click 'Advanced' and then 'Proceed' to bypass the warning and load the panel.",
      tip: "If the page does not load, verify that your computer has obtained a local IP in the 192.168.100.X range by typing 'ipconfig' in command prompt. If it shows 169.254.x.x, read our gateway diagnostic guides.",
    },
    {
      title: "Enter the High-Privilege 'telecomadmin' Account Credentials",
      description:
        "To obtain full administrative access to configure fiber settings, enter Username 'telecomadmin' and Password 'admintelecom' in the login fields. If your ISP has pushed a custom remote profile, this default might fail. In that case, look at the physical sticker on the bottom of the ONT for custom ISP access keys, or try the standard user credentials: Username 'root' and Password 'admin'.",
      tip: "Always prefer 'telecomadmin' over 'root' because the root profile blocks critical menus including WAN interface setups, VLAN mappings, and TR-069 ACS configuration.",
    },
    {
      title: "Perform a Hardware Reset if Custom Credentials Fail",
      description:
        "If the administrator logins have been modified and you cannot access the system, you must perform a hardware reset. Locate the recessed 'Reset' button on the side panel. With the ONT powered on, press and hold the button using a paperclip or SIM ejector tool for exactly 10-15 seconds. Release the button. The ONT status lights will power off and cycle. Wait 2 minutes for the system to re-initialize defaults.",
      tip: "Warning: Resetting your ONT will wipe your GPON LOID (Logical ONT Identifier) or SLID authorization keys. If your ISP requires LOID authentication, you will lose internet access and must contact support to re-provision the ONT.",
    },
  ];

  const faqs = [
    {
      question: "What is the telecomadmin password for Huawei HG8145V5?",
      answer: "The factory default username is 'telecomadmin' and the default password is 'admintelecom'. This account gives full configuration control over the ONT, allowing you to configure WAN connections, VLANs, and bridge modes.",
    },
    {
      question: "How do I set up Bridge Mode on the HG8145V5?",
      answer: "Log in as telecomadmin. Navigate to the WAN tab. Create or edit the WAN interface, change the WAN Mode from Route to 'Bridge', select the appropriate VLAN ID (if required by your ISP), and bind the interface to a physical LAN port (e.g. LAN 1) where you will connect your personal router.",
    },
    {
      question: "What does a blinking LOS red light mean on HG8145V5?",
      answer: "A blinking red LOS (Loss of Signal) light means the ONT is not detecting optical light on the fiber interface. Check that the green fiber connector on the bottom is plugged in securely and there are no sharp bends in the cable. Contact your ISP if line levels drop below -27 dBm.",
    },
    {
      question: "Why is the PON light flashing green?",
      answer: "A blinking green PON (Passive Optical Network) light indicates that the ONT is attempting to handshakes and authenticate with the ISP's central office OLT. If it blinks indefinitely, the ONT is not provisioned on the provider's network or the LOID key is incorrect.",
    },
    {
      question: "How do I change the Wi-Fi SSID and password on the HG8145V5?",
      answer: "Log into the admin portal, navigate to the WLAN tab. Select WLAN Configuration. Modify the SSID Name, set Security Mode to WPA2-PSK or WPA2/WPA3-PSK, enter your secure wireless password in the Pre-shared Key field, and click Apply.",
    },
    {
      question: "Can I connect a personal router to the HG8145V5?",
      answer: "Yes. If you configure the HG8145V5 in Bridge Mode (as telecomadmin), you can connect a personal router to LAN Port 1. Your personal router will then handle NAT, DHCP, Wi-Fi, and firewall independently — known as PPPoE pass-through. This eliminates Double NAT issues and gives you full control over your network.",
    },
  ];

  const commonCauses = [
    {
      title: "ISP Remote TR-069 Changes",
      desc: "Fiber internet providers push automatic firmware configurations that rewrite the default telecomadmin logins to secure custom credentials.",
    },
    {
      title: "LOID Authentication Failures",
      desc: "Performing a hardware reset wipes ISP authorization credentials, preventing the ONT from syncing with the GPON fiber line.",
    },
    {
      title: "Wrong LAN Port Hookups",
      desc: "Connecting your PC to LAN ports configured for IPTV or VoIP prevents your computer from leasing an IP and accessing the login page.",
    },
  ];

  const quickFixChecklist = [
    "Connect your computer to LAN Port 1 or LAN Port 2 of the HG8145V5 using an Ethernet cable.",
    "Open your web browser and navigate to the default ONT IP: http://192.168.100.1.",
    "Try entering the high-privilege credentials: telecomadmin / admintelecom.",
    "Use root / admin as a secondary fallback login if admintelecom is rejected.",
    "Do not factory reset the ONT unless you have documented your GPON LOID authorization key.",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <TroubleshootingArticleShell
        h1="Huawei HG8145V5 Default Password & Login Setup Guide"
        intro="The Huawei HG8145V5 is a widely deployed GPON Optical Network Terminal (ONT) used by fiber operators worldwide. This guide provides the default administrator credentials, details how to log into the 192.168.100.1 gateway, and explains how to configure Wi-Fi and resolve fiber connectivity errors."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "GPON Fiber Authentication Warning",
          text: "Never execute a factory reset on your HG8145V5 ONT unless you have written down your GPON LOID (Logical ONT Identifier) password. Resetting the device will delete this key, disconnecting you from the fiber network until your ISP re-provisions the line.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="high"
        whenToContactISP="If you log in and the GPON status indicates 'O5 Operation' but the WAN IP is empty, your ISP has disabled the MAC address lease. If the LOS light is blinking red, the fiber optic cable is damaged. In both cases, contact your ISP support team to resolve the issue."
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              1. HG8145V5 Default Login and Credential Configurations
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Use the following credential configurations to log into your Huawei HG8145V5 ONT. Keep in mind that different accounts provide different configuration permissions. See also our full <Link href="/huawei-router-default-password" className="text-[var(--brand-400)] hover:underline">Huawei default password directory</Link> for the complete list across all device families.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Username</th>
                    <th className="px-4 py-3 text-left">Password</th>
                    <th className="px-4 py-3 text-left">Privilege Level</th>
                    <th className="px-4 py-3 text-left">Available Configuration Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-[var(--brand-400)]">telecomadmin</td>
                    <td className="px-4 py-3 font-mono">admintelecom</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Root Administrator</td>
                    <td className="px-4 py-3">Full access. Create WAN profiles, configure VLAN tags, bridge mode, port forwarding, and voice.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-[var(--brand-400)]">root</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 text-yellow-400 font-bold">Standard User</td>
                    <td className="px-4 py-3">Limited access. View system diagnostics, configure basic Wi-Fi keys, and check optical power levels.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-[var(--brand-400)]">admin</td>
                    <td className="px-4 py-3 font-mono">admin</td>
                    <td className="px-4 py-3 text-yellow-400 font-bold">Standard User</td>
                    <td className="px-4 py-3">Limited access. Standard fallback login configuration for older firmware revisions.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              2. How to Access the HG8145V5 Admin Page
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              If the default IP address does not load, follow this troubleshooting guide to restore access. For universal browser diagnostic steps that apply to all brands, see our <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">router login not working guide</Link>.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Check Your Local IP Subnet</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  If the ONT is connected to a secondary router, your computer might be receiving an IP address from the secondary router's subnet (such as <code>192.168.1.X</code> or <code>192.168.3.X</code>). To load <code>192.168.100.1</code>, disconnect your secondary router, plug your PC directly into the ONT, and reboot your computer to lease a fresh IP from the ONT's DHCP server. If this creates a <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT situation</Link>, configure Bridge Mode on the ONT.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Query Optical Signal Power</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Log in as a standard user (root/admin) and navigate to Status &gt; Optical Information. Verify that the Rx Optical Power is between <strong>-8 dBm and -27 dBm</strong>. If it is lower than -27 dBm (e.g. -30 dBm), the optical signal is too weak, causing packet loss and interface disconnects. Use our <Link href="/how-to-fix-packet-loss" className="text-[var(--brand-400)] hover:underline">packet loss fix guide</Link> to understand signal degradation and troubleshooting steps.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              3. Configuring the HG8145V5 in Bridge Mode
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Running the HG8145V5 in Bridge Mode allows you to connect a dedicated router behind the ONT, giving you full control over NAT, DHCP, QoS, and Wi-Fi. This eliminates Double NAT and improves gaming performance. Here is the step-by-step process:
            </p>
            <ol className="space-y-3 text-xs text-[var(--text-secondary)]">
              {[
                "Log into the ONT at http://192.168.100.1 using telecomadmin / admintelecom.",
                "Navigate to WAN → WAN Configuration and click the 'New' button.",
                "Set Mode to 'Bridge', enter your ISP's VLAN ID (check your ISP documentation), and select Connection Type as 'IPoE' or 'PPPoE' as required.",
                "Bind the WAN interface to LAN Port 1 in the interface binding section.",
                "Connect your personal router's WAN port to LAN Port 1 on the ONT with an Ethernet cable.",
                "Configure your personal router to dial PPPoE using your ISP username and password.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--brand-800)] text-[var(--brand-300)] text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-xs text-[var(--text-muted)]">
              For more details on optimal router settings after Bridge Mode, explore our <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">router settings optimization guide</Link> and the <Link href="/port-forwarding" className="text-[var(--brand-400)] hover:underline">port forwarding setup guide</Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              4. Related Huawei & Fiber Network Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Related Huawei Guides</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Log in to your gateway: <Link href="/huawei-router-login" className="text-[var(--brand-400)] hover:underline">Huawei Router Login Guide</Link></li>
                  <li>Find default passwords: <Link href="/huawei-router-default-password" className="text-[var(--brand-400)] hover:underline">Huawei Default Password Directory</Link></li>
                  <li>Identify your default IP: <Link href="/huawei-router-ip-address" className="text-[var(--brand-400)] hover:underline">Huawei Router IP Guide</Link></li>
                  <li>Configure AX3 routers: <Link href="/huawei-ax3-default-password" className="text-[var(--brand-400)] hover:underline">Huawei AX3 Config Guide</Link></li>
                  <li>Router login cluster: <Link href="/router-login" className="text-[var(--brand-400)] hover:underline">Router Login Hub</Link></li>
                  <li>Full password list: <Link href="/router-password" className="text-[var(--brand-400)] hover:underline">Default Router Passwords</Link></li>
                </ul>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Fiber & Gateway Diagnostics</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Fix Double NAT: <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT Detected Guide</Link></li>
                  <li>Ethernet no internet: <Link href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Ethernet Connected But No Internet</Link></li>
                  <li>Gateway not available: <Link href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">Default Gateway Not Available Fix</Link></li>
                  <li>Identify MAC address: <Link href="/mac-address-lookup" className="text-[var(--brand-400)] hover:underline">MAC Address Lookup Tool</Link></li>
                  <li>Fix packet loss: <Link href="/how-to-fix-packet-loss" className="text-[var(--brand-400)] hover:underline">Packet Loss Fix Guide</Link></li>
                  <li>Router admin guide: <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Setup Guide</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
