import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info, Shield, Lock, Wifi, Smartphone, Globe, Settings, RefreshCw, AlertTriangle } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Huawei AX3 Default Password & WiFi Setup Guide (Updated 2026)",
  description:
    "Learn how to set up the Huawei WiFi AX3 / AX3 Pro router. Find default login passwords, access 192.168.3.1, change Wi-Fi settings, and configure AiMesh.",
  canonical: "/huawei-ax3-default-password",
  keywords: [
    "huawei ax3 default password",
    "huawei wifi ax3 login",
    "huawei ax3 admin password",
    "192.168.3.1 ax3 login",
    "huawei ax3 setup guide",
    "huawei ax3 pro configuration",
    "huawei hilink mesh setup",
  ],
});

export default async function HuaweiAx3DefaultPasswordPage() {
  const breadcrumbs = [
    { name: "Default Passwords", url: "/router-password" },
    { name: "Huawei", url: "/routers/huawei" },
    { name: "AX3 Default Credentials", url: "/huawei-ax3-default-password" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/huawei-ax3-default-password#webpage`,
    "url": `${APP_URL}/huawei-ax3-default-password`,
    "name": "Huawei AX3 Default Password & WiFi Setup Guide (Updated 2026)",
    "description": "Learn how to set up the Huawei WiFi AX3 / AX3 Pro router. Find default login passwords, access 192.168.3.1, change Wi-Fi settings, and configure AiMesh.",
    "about": {
      "@type": "Thing",
      "name": "Huawei AX3 default password",
    },
  };

  const troubleshootingSteps = [
    {
      title: "Establish local LAN or Wi-Fi Connection to the AX3",
      description:
        "Connect your computer or smartphone to the Huawei AX3 router. If configuring wireless, connect to the default Wi-Fi network printed on the bottom label (SSID typically begins with 'HUAWEI-' followed by unique identification characters). No default Wi-Fi password is set for these out-of-the-box SSIDs. Alternatively, connect your computer directly to one of the auto-negotiating WAN/LAN ports on the back panel using a network cable.",
      tip: "The Huawei AX3 features auto-sensing ports, meaning any of the physical ports on the back can function as a WAN or LAN port. The router will automatically detect which port is connected to the internet modem.",
    },
    {
      title: "Open Your Web Browser and Access 192.168.3.1",
      description:
        "Launch your preferred web browser on the connected device. In the URL address bar at the top, type the default management IP address 'http://192.168.3.1' (or type 'hi.link') and press Enter. This will load the Huawei HiLink Router Setup Assistant wizard. If the page fails to load, check that you are not connected to a VPN tunnel or proxy server.",
      tip: "If you have already configured the router, the browser will display the standard login page asking for your custom administration password.",
    },
    {
      title: "Complete the Initial HiLink Configuration Assistant",
      description:
        "During the first boot configuration: 1) Click 'Start' on the welcome screen. 2) Select your connection type (typically 'DHCP' for cable internet, or PPPoE if your ISP requires login credentials). 3) Define your new Wi-Fi Name (SSID) and set a secure Wi-Fi Security Key. 4) Select the 'Set as router login password' checkbox, or define a distinct administrator password for the web console. Click 'Save' to reboot the router.",
      tip: "If you toggle 'Set as router login password', your admin password will match your Wi-Fi password. This is convenient but slightly less secure.",
    },
    {
      title: "Configure Advanced Wi-Fi 6 Parameters",
      description:
        "Once logged in, navigate to 'More Functions' -> 'Wi-Fi Settings' -> 'Advanced Wi-Fi Settings'. Here you can enable Wi-Fi 6 (802.11ax) parameters, select 160MHz channel bandwidth for maximum throughput, and adjust signal strength parameters to 'Max' to optimize coverage across brick walls.",
      tip: "If you have older wireless clients that fail to discover the AX3 Wi-Fi network, enable the 'Wi-Fi 5 Backup Network' option in the settings menu.",
    },
  ];

  const faqs = [
    {
      question: "What is the default admin password for Huawei AX3?",
      answer: "The Huawei AX3 does not ship with a factory-defined administrator password. During the initial out-of-the-box setup, the configuration assistant requires you to define a custom password, or choose to match it to your Wi-Fi password.",
    },
    {
      question: "How do I configure AX3 in Access Point (AP) mode?",
      answer: "Log into the admin portal at 192.168.3.1. Go to More Functions > Network Settings > Ethernet. Locate the Working Mode dropdown and change it from 'Router' to 'Bridge' (which represents Access Point mode). Click Save. The AX3 will disable its NAT engine and act as a wireless bridge.",
    },
    {
      question: "How do I reset my Huawei AX3 to factory defaults?",
      answer: "Locate the Reset button hole next to the power port. With the router turned on, insert a pin and hold the button for 6-8 seconds until the status indicator light goes out and flashes red. Release the button and wait 2 minutes for the router to restart.",
    },
    {
      question: "How do I pair multiple AX3 routers in a Mesh network?",
      answer: "Connect your primary AX3 router to the internet. Power on the secondary AX3 router close to the primary unit. Wait for the status indicator on the primary router to start flashing slowly. Press the 'H' button on the primary AX3 router. The indicator will flash faster, showing pairing is in progress. Once the indicator turns solid blue, the mesh link is established.",
    },
    {
      question: "Does the Huawei AX3 support WPA3 security?",
      answer: "Yes, the Huawei WiFi AX3 series supports modern WPA3-SAE encryption. To enable it, log into the admin interface, go to Wi-Fi Settings, select WPA2/WPA3-PSK hybrid or WPA3-SAE mode under Security, and click Save.",
    },
  ];

  const commonCauses = [
    {
      title: "Wi-Fi 6 Driver Mismatch",
      desc: "Older laptops with outdated Intel wireless drivers (e.g. AC-7260) cannot detect Wi-Fi 6 beacons, causing the AX3 SSID to be invisible.",
    },
    {
      title: "Auto-WAN/LAN Detection Errors",
      desc: "The router's auto-sensing port algorithm can occasionally misidentify the WAN connection if the upstream modem is slow to boot.",
    },
    {
      title: "Forgotten Setup Password",
      desc: "Users often forget custom admin passwords set during initial configurations, requiring a hard factory reset to restore portal access.",
    },
  ];

  const quickFixChecklist = [
    "Verify your device is connected to the AX3 Wi-Fi SSID network named on the bottom sticker.",
    "Open your browser and navigate to http://192.168.3.1 or http://hi.link.",
    "Try entering your Wi-Fi network password if you configured the router to match admin credentials.",
    "Enable the 'Backup Wi-Fi 5 Network' if legacy devices cannot see the AX3 Wi-Fi 6 SSID.",
    "Hold the physical Reset button down for 8 seconds to start the configuration wizard from scratch.",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <TroubleshootingArticleShell
        h1="Huawei AX3 WiFi 6 Router Setup & Default Password Guide"
        intro="The Huawei WiFi AX3 (and AX3 Pro) is a popular Wi-Fi 6 consumer router featuring high speeds and mesh compatibility. This guide outlines how to establish a local connection, access the 192.168.3.1 setup panel, configure secure Wi-Fi 6 parameters, and set up an AiMesh network."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Legacy Device Compatibility Warning",
          text: "Some older smartphones, laptops, and smart TVs do not support Wi-Fi 6 standards and will fail to connect. If your legacy devices cannot discover the AX3 SSID, enable the 'Wi-Fi 5 Backup Network' in the Wi-Fi Settings panel.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="medium"
        whenToContactISP="If you configure PPPoE connection parameters and the status LED remains solid red, the WAN interface cannot reach your ISP. Double-check your connection credentials or contact your fiber/DSL service provider to verify account activation."
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              1. Huawei WiFi AX3 & AX3 Pro Technical Specifications
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Below are the key technical hardware profiles and default parameters of the Huawei AX3 router family:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Specification Parameter</th>
                    <th className="px-4 py-3 text-left">Default Factory Setting</th>
                    <th className="px-4 py-3 text-left">Recommended Setting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Default Management IP</td>
                    <td className="px-4 py-3 font-mono">192.168.3.1</td>
                    <td className="px-4 py-3 font-mono">192.168.3.1 (or 192.168.3.2 for AP nodes)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Default Web Domain</td>
                    <td className="px-4 py-3 font-mono">hi.link</td>
                    <td className="px-4 py-3 font-mono">hi.link</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Default Username / Password</td>
                    <td className="px-4 py-3 font-mono">None (defined during wizard)</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">Custom Strong Password</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Wi-Fi Standards Supported</td>
                    <td className="px-4 py-3">Wi-Fi 6 (802.11ax) / Wi-Fi 5 / Wi-Fi 4</td>
                    <td className="px-4 py-3">Wi-Fi 6 (with Wi-Fi 5 Backup enabled)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Wireless Security Mode</td>
                    <td className="px-4 py-3">WPA2-PSK (AES)</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">WPA2/WPA3-PSK Hybrid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              2. How to Configure Huawei AX3 Mesh Networking
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Huawei AX3 routers support HiLink Mesh (Link+), allowing you to link multiple units to eliminate wireless dead zones. Follow these steps to build your mesh network:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Method A: Wireless One-Click Pairing</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Power on the secondary AX3 router within 1 meter of your primary configured router. Wait 1 minute. The status LED on the primary router will begin to flash slowly. Press the physical <strong>H button</strong> on the primary router chassis. The indicator light will flash rapidly. Once the secondary router's LED changes to solid blue, mesh sync is complete. You can now relocate the unit to another room.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Method B: Wired Ethernet Backhaul</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  For maximum speeds, connect a network cable from one of the LAN ports on your primary AX3 to the WAN port of the secondary AX3. The routers will automatically configure themselves via Link+ protocol, establishing a high-speed wired backhaul link.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              3. Internal Linking Hub
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Further optimize your network configurations using our related guides:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Related Huawei Guides</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Log in to your gateway: <Link href="/huawei-router-login" className="text-[var(--brand-400)] hover:underline">Huawei Router Login Guide</Link></li>
                  <li>Find default passwords: <Link href="/huawei-router-default-password" className="text-[var(--brand-400)] hover:underline">Huawei Default Password Directory</Link></li>
                  <li>Identify your default IP: <Link href="/huawei-router-ip-address" className="text-[var(--brand-400)] hover:underline">Huawei Router IP Guide</Link></li>
                  <li>Configure HG8145V5 ONT: <Link href="/huawei-hg8145v5-default-password" className="text-[var(--brand-400)] hover:underline">Huawei HG8145V5 Setup</Link></li>
                </ul>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">General Router Access Resources</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Access default router panels: <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Setup Guide</Link></li>
                  <li>Troubleshoot Wi-Fi drops: <Link href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">Wi-Fi Connection Diagnostic</Link></li>
                  <li>Compare Wi-Fi standards: <Link href="/wpa3-vs-wpa2" className="text-[var(--brand-400)] hover:underline">WPA2 vs WPA3 SAE Guide</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
