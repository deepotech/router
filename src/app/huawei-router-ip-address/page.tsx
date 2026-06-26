import type { Metadata } from "next";
import Link from "next/link";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Huawei Router IP Address: Find Default Gateways (Updated 2026)",
  description:
    "How to find the default IP address of your Huawei router or ONT terminal. Step-by-step instructions for Windows, macOS, Android, and iOS.",
  canonical: "/huawei-router-ip-address",
  keywords: [
    "huawei router ip address",
    "huawei default gateway ip",
    "find huawei router ip",
    "192.168.3.1 gateway",
    "192.168.8.1 huawei ip",
    "192.168.100.1 default ip",
    "huawei ont router gateway",
  ],
});

export default async function HuaweiRouterIpAddressPage() {
  const breadcrumbs = [
    { name: "IP Directory", url: "/ips" },
    { name: "Huawei", url: "/routers/huawei" },
    { name: "Huawei Router IP Address", url: "/huawei-router-ip-address" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/huawei-router-ip-address#webpage`,
    "url": `${APP_URL}/huawei-router-ip-address`,
    "name": "Huawei Router IP Address: Find Default Gateways (Updated 2026)",
    "description": "How to find the default IP address of your Huawei router or ONT terminal. Step-by-step instructions for Windows, macOS, Android, and iOS.",
    "about": { "@type": "Thing", "name": "Huawei Router IP" },
  };

  const troubleshootingSteps = [
    {
      title: "Query Default Gateway via Command Prompt on Windows",
      description:
        "Ensure your Windows machine is connected to the Huawei router's Wi-Fi or LAN network. Press the Windows Key + R to open the Run utility. Type 'cmd' and press Enter to load the Command Prompt. Inside the command interface, type 'ipconfig' and press Enter. Scroll down the output list to locate your active adapter (e.g. Wireless LAN adapter Wi-Fi). Find the row labeled 'Default Gateway'. The numerical sequence shown there (such as 192.168.3.1) is your Huawei router's active IP address.",
      tip: "If the Default Gateway row is blank, your machine has failed to lease a DHCP configuration. Read our DHCP troubleshooting guides to restore IP allocation.",
    },
    {
      title: "Find Huawei IP Address via System Settings on macOS",
      description:
        "On macOS, connect to the Huawei router's network. Click the Apple logo icon in the top-left corner of the screen and select 'System Settings' (or System Preferences). Navigate to the 'Network' tab in the left sidebar. Click on your active network interface (Wi-Fi or Ethernet) from the lists, and then click on the 'Details...' button next to the network name. In the configuration popup window, click on the 'TCP/IP' tab. Your Huawei default IP is displayed next to the label 'Router'.",
      tip: "You can also open the macOS Terminal app and execute 'route -n get default' to retrieve the gateway IP instantly via shell command.",
    },
    {
      title: "Retrieve Gateway IP Address on Android Devices",
      description:
        "Open your Android device's main Settings app and navigate to 'Network & Internet' -> 'Internet' (or 'Wi-Fi'). Tap the gear icon next to your active connected Wi-Fi SSID network name. Scroll down to the bottom of the network configuration list. Depending on your Android version, you will find the gateway IP address listed directly under 'Gateway' or 'Router', showing the active LAN subnet.",
      tip: "If your Android phone displays 'IP Settings' as DHCP, the gateway IP is automatically populated. If set to Static, ensure the subnet matches the router's parameters.",
    },
    {
      title: "Locate Huawei Router IP on Apple iOS (iPhone/iPad)",
      description:
        "On an iPhone or iPad, open the Settings app. Tap on the 'Wi-Fi' section. Find your active connected network name, which is marked with a blue checkmark, and tap the blue information 'i' circle icon next to it. Scroll down to the IPv4 Address section. The gateway IP address of your Huawei router is displayed next to the label 'Router'.",
    },
  ];

  const faqs = [
    {
      question: "Why does my Huawei router use 192.168.3.1?",
      answer: "192.168.3.1 is the global factory default gateway chosen by Huawei engineers for all consumer Wi-Fi routers. Using a distinct subnet range like 192.168.3.X prevents IP conflicts when users daisy-chain the Huawei router behind standard modems which typically use 192.168.0.1 or 192.168.1.1.",
    },
    {
      question: "How do I access 192.168.100.1 on a Huawei ONT?",
      answer: "Connect your PC directly to LAN Port 1 on the ONT using an Ethernet cable. Open your browser and navigate to http://192.168.100.1. Enter the administrator credentials telecomadmin / admintelecom to log in.",
    },
    {
      question: "Can my Huawei router gateway IP change automatically?",
      answer: "Yes. If you plug your Huawei router's WAN port into a modem that already uses 192.168.3.1, the Huawei router detects the IP conflict. To resolve it, the router automatically shifts its LAN subnet range to 192.168.8.1 or 192.168.100.1. Always check your device's network settings to locate the active gateway.",
    },
    {
      question: "What is hi.link and how does it relate to the router IP?",
      answer: "hi.link is a local domain name (mDNS hostname) programmed into Huawei router firmwares. When you type 'hi.link' into your browser, the router redirects the request to its local IP address (typically 192.168.3.1), saving you from remembering the numerical sequence.",
    },
    {
      question: "How do I configure a static IP on my Huawei router?",
      answer: "Log into the admin panel, navigate to WAN or Internet settings, change the Connection Type from DHCP/Auto to Static IP, and input the static IP, subnet mask, gateway IP, and DNS servers supplied by your ISP.",
    },
    {
      question: "Why is my Huawei router showing 169.254.x.x instead of 192.168.3.1?",
      answer: "A 169.254.x.x address (APIPA — Automatic Private IP Addressing) means your device failed to receive a DHCP lease from the router. This happens when the router's DHCP service has crashed, the network cable is faulty, or your device's network adapter has a static IP configured. Power cycle the router and re-plug your Ethernet cable.",
    },
  ];

  const commonCauses = [
    {
      title: "Subnet Auto-Shifting",
      desc: "Upstream gateway conflicts force the Huawei router to re-route its LAN IP to 192.168.8.1 or 192.168.100.1 to prevent IP address clashes.",
    },
    {
      title: "Client-Side Static IP Bindings",
      desc: "Your computer has a manually configured static IP address from a different network range, blocking communication with the Huawei subnet.",
    },
    {
      title: "Active VPN Interferences",
      desc: "Encrypted VPN routing overrides local gateway paths, sending IP requests through external VPN servers instead of the local router gateway.",
    },
  ];

  const quickFixChecklist = [
    "Verify your device is physically connected to the Huawei Wi-Fi network or LAN port.",
    "Disable active VPN tunnels, proxy configurations, or corporate DNS servers.",
    "Use 'ipconfig' (Windows) or 'route -n get default' (macOS) to query the active gateway.",
    "Test direct access in browser: http://192.168.3.1, http://192.168.8.1, or http://192.168.100.1.",
    "Perform a hardware factory reset to restore default factory IP settings.",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <TroubleshootingArticleShell
        h1="Huawei Router IP Address: Find and Access Gateway Settings"
        intro="Can't find your Huawei router's default IP gateway? Whether you are configuring a consumer Wi-Fi router (192.168.3.1), a mobile cellular router (192.168.8.1), or a GPON ONT terminal (192.168.100.1), this guide details how to find the IP address on Windows, macOS, Android, and iOS."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Subnet Conflict Auto-Shift Warning",
          text: "When cascading a Huawei router behind an ISP modem, the Huawei router may automatically shift its IP subnet to 192.168.8.1 or 192.168.100.1 to avoid collision. If 192.168.3.1 fails to load, query your system configuration to find the new IP address.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="low"
        whenToContactISP="If your gateway IP displays 169.254.x.x, your router's DHCP server has failed or crashed. If power-cycling the router does not resolve this, contact your service provider or manufacturer, as the NVRAM chip or DHCP daemon might be damaged."
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              1. Huawei Gateway IP Reference & Subnets
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Use the following directory table to cross-reference common Huawei router models with their factory default IP address and subnet masks. Once you identify your IP, visit the specific model's admin guide for login credentials — start with the <Link href="/huawei-router-default-password" className="text-[var(--brand-400)] hover:underline">Huawei default password directory</Link>.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Router Model / Series</th>
                    <th className="px-4 py-3 text-left">Default IP Address</th>
                    <th className="px-4 py-3 text-left">Subnet Mask</th>
                    <th className="px-4 py-3 text-left">Access Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Huawei WiFi AX3 (Dual/Quad Core)</td>
                    <td className="px-4 py-3 font-mono">192.168.3.1</td>
                    <td className="px-4 py-3 font-mono">255.255.255.0</td>
                    <td className="px-4 py-3"><Link href="/ips/192-168-3-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.3.1 Guide</Link></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Huawei B535 / B818 4G LTE Router</td>
                    <td className="px-4 py-3 font-mono">192.168.8.1</td>
                    <td className="px-4 py-3 font-mono">255.255.255.0</td>
                    <td className="px-4 py-3"><Link href="/ips/192-168-8-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.8.1 Guide</Link></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Huawei HG8145V5 / HG8245H GPON ONT</td>
                    <td className="px-4 py-3 font-mono">192.168.100.1</td>
                    <td className="px-4 py-3 font-mono">255.255.255.0</td>
                    <td className="px-4 py-3"><Link href="/ips/192-168-100-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.100.1 Guide</Link></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Legacy Huawei HG532 ADSL Modems</td>
                    <td className="px-4 py-3 font-mono">192.168.1.1</td>
                    <td className="px-4 py-3 font-mono">255.255.255.0</td>
                    <td className="px-4 py-3"><Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline font-mono">192.168.1.1 Guide</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              2. How to Access Your Huawei Router After Finding the IP
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Once you have retrieved your gateway IP, use these steps to securely access and manage your router panel:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Step 1: Enter the IP in the Address Bar</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Open a browser and type the IP address exactly (e.g., <code>192.168.3.1</code>) into the search bar. Do not append search suffixes like &quot;.com&quot; or wrap the numbers in search engine quotes. Press Enter to load the landing page. If you see a browser error, refer to the <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">router login not working guide</Link> for resolution steps.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Step 2: Enter Default Logins</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Input default credentials such as Username <code>telecomadmin</code> and Password <code>admintelecom</code> for fiber gateways, or log in with your custom administrator password for AX series routers. Look up details in our <Link href="/huawei-router-default-password" className="text-[var(--brand-400)] hover:underline">Huawei router password directory</Link>.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Step 3: Configure Network Settings</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Once inside the admin panel, your most impactful first actions are: change the <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline">Wi-Fi password</Link>, update your <Link href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline">DNS server settings</Link>, and optionally set up <Link href="/port-forwarding" className="text-[var(--brand-400)] hover:underline">port forwarding rules</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              3. Why IP Address Matters for Network Diagnostics
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Your router's IP address is the starting point for diagnosing virtually every network issue. If you are experiencing any of the below network problems, your first diagnostic step is always to confirm your router's gateway IP and verify the admin panel is accessible:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Internet keeps dropping", href: "/internet-keeps-dropping" },
                { label: "Default gateway not available", href: "/default-gateway-not-available" },
                { label: "Router not assigning IP addresses", href: "/router-not-assigning-ip-addresses" },
                { label: "Ethernet connected but no internet", href: "/ethernet-connected-but-no-internet" },
                { label: "Router blinking orange light", href: "/router-blinking-orange" },
                { label: "Double NAT detected", href: "/double-nat-detected" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--brand-800)] transition-all font-medium"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              4. Related Huawei & Gateway IP Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Related Huawei Guides</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Log in to your gateway: <Link href="/huawei-router-login" className="text-[var(--brand-400)] hover:underline">Huawei Router Login Guide</Link></li>
                  <li>Find default passwords: <Link href="/huawei-router-default-password" className="text-[var(--brand-400)] hover:underline">Huawei Default Password Directory</Link></li>
                  <li>AX3 WiFi 6 model: <Link href="/huawei-ax3-default-password" className="text-[var(--brand-400)] hover:underline">Huawei AX3 Setup Guide</Link></li>
                  <li>HG8145V5 fiber ONT: <Link href="/huawei-hg8145v5-default-password" className="text-[var(--brand-400)] hover:underline">HG8145V5 Admin Guide</Link></li>
                </ul>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">General Router Access Resources</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Universal gateway guide: <Link href="/how-to-find-router-ip-address" className="text-[var(--brand-400)] hover:underline">How to Find Router IP Address</Link></li>
                  <li>All router IP addresses: <Link href="/ips" className="text-[var(--brand-400)] hover:underline">IP Address Directory</Link></li>
                  <li>Access default router panels: <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline">Router Admin Setup Guide</Link></li>
                  <li>Explore public IP: <Link href="/what-is-my-ip" className="text-[var(--brand-400)] hover:underline">What Is My IP Address Tool</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
