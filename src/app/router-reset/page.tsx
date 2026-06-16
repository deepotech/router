import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "How to Factory Reset a Router: Step-by-Step Instructions",
  description:
    "Learn how to factory reset your wireless router. Compare soft reset vs hard reset, find reset button locations, and configure your router post-reset.",
  canonical: "/router-reset",
  keywords: [
    "router reset",
    "factory reset router",
    "how to reset router",
    "router reset button",
    "restore router settings",
  ],
});

export default async function RouterResetPage() {
  const breadcrumbs = [
    { name: "Router Reset", url: "/router-reset" }
  ];

  // ---- Structured Data (JSON-LD) ----
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/router-reset#webpage`,
    "url": `${APP_URL}/router-reset`,
    "name": "How to Factory Reset a Router: Step-by-Step Instructions",
    "description": "Learn how to factory reset your wireless router. Compare soft reset vs hard reset, find reset button locations, and configure your router post-reset.",
    "about": {
      "@type": "Thing",
      "name": "Router Factory Reset",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/router-reset#itemlist`,
    "name": "Popular Reset Guides",
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "Router Brands Directory",
          "url": `${APP_URL}/routers`,
        },
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "IP Address Directory",
          "url": `${APP_URL}/ips`,
        },
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": "Router Login Guide",
          "url": `${APP_URL}/router-login`,
        },
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": "Default Router Passwords Guide",
          "url": `${APP_URL}/router-password`,
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Factory Reset Your Router",
    "description": "A complete step-by-step guide to performing a hard factory reset on any wireless router using the physical reset button, restoring the device to its original out-of-box configuration.",
    "totalTime": "PT5M",
    "tool": [
      { "@type": "HowToTool", "name": "Paperclip or SIM ejector pin" },
      { "@type": "HowToTool", "name": "Ethernet cable (recommended)" },
      { "@type": "HowToTool", "name": "Web browser" }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Back up your current configuration",
        "text": "Before resetting, log into the router admin panel (typically at 192.168.1.1 or 192.168.0.1), navigate to System Tools > Backup, and download the configuration file. Also note your PPPoE username and password from the WAN settings page.",
        "url": `${APP_URL}/router-reset#backup`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Ensure the router is powered on",
        "text": "The router must be connected to a power source during the reset. Do not perform a factory reset on a router that is powered off — doing so will have no effect and may corrupt the NVRAM write cycle on some chipsets.",
        "url": `${APP_URL}/router-reset#step-power`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Locate the recessed Reset pinhole",
        "text": "Find the small pinhole on the back or bottom panel of your router labeled 'Reset' or 'RST'. On some TP-Link and ASUS models, the Reset function shares a combined WPS/Reset button.",
        "url": `${APP_URL}/router-reset#step-locate`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Press and hold for 10-15 seconds",
        "text": "Insert a straightened paperclip or SIM ejector pin into the pinhole. Press down firmly until you feel a tactile click, then hold for 10 to 15 seconds. Do not release early — releasing at 5 seconds on many models triggers only a configuration partial-clear rather than a full NVRAM wipe.",
        "url": `${APP_URL}/router-reset#step-hold`
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Observe LED indicator signals",
        "text": "Watch the front panel LED lights. On TP-Link routers the SYS/Power LED will blink rapidly then go solid. On ASUS routers the power LED blinks slowly. On Netgear routers the Power LED blinks amber. Once you see the LED transition, release the button.",
        "url": `${APP_URL}/router-reset#step-leds`
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Wait for the reboot cycle to complete",
        "text": "The router will reboot automatically, which takes 60 to 120 seconds. During this time, never disconnect the power. The router is ready when the Wi-Fi LEDs stabilize and the default SSID is broadcast.",
        "url": `${APP_URL}/router-reset#step-reboot`
      },
      {
        "@type": "HowToStep",
        "position": 7,
        "name": "Reconnect and reconfigure",
        "text": "Connect your device via Ethernet or to the factory default Wi-Fi network (credentials on the bottom label). Open a browser and navigate to the default gateway IP to run the setup wizard. Re-enter your ISP PPPoE credentials and set a new Wi-Fi password and admin password.",
        "url": `${APP_URL}/router-reset#step-reconfigure`
      }
    ]
  };

  const faqs = [
    {
      question: "What does resetting a router do?",
      answer: "A factory reset deletes all custom configuration settings from the router's non-volatile memory (NVRAM). This restores default Wi-Fi names (SSID), security passwords, admin credentials, port forwarding rules, and custom subnets to factory defaults.",
    },
    {
      question: "What is the difference between restart and reset?",
      answer: "A restart (reboot or power cycle) simply turns the router off and on again to clear temporary system memory without changing your configurations. A reset restores the device back to its original factory settings, erasing all custom configurations.",
    },
    {
      question: "How long do I hold the reset button?",
      answer: "For most routers, you must press and hold the physical Reset button using a paperclip for 10 to 15 seconds while the device is powered on. Release the button when the LED indicators flash or turn solid. Releasing at 5 seconds may only partially clear settings on some models.",
    },
    {
      question: "Where is the reset button located?",
      answer: "The Reset button is typically a small pinhole located on the back or bottom panel of the router, labeled 'Reset' or 'Restore'. Some models feature a combined WPS/Reset button — pressing for 1 second activates WPS pairing while holding 10+ seconds triggers a full factory reset.",
    },
    {
      question: "What is the 30-30-30 reset rule?",
      answer: "The 30-30-30 rule is a legacy hard reset method: hold the reset button for 30 seconds, unplug power for 30 seconds while holding the button, and plug power back in while holding the button for another 30 seconds. Most modern routers do not require this — it was specifically designed for older Broadcom-based DD-WRT hardware.",
    },
    {
      question: "How do I log in after resetting?",
      answer: "Once the router restarts, connect your computer to the router's default Wi-Fi network (credentials are printed on the bottom label) or use an Ethernet cable, and navigate to the default gateway IP (usually 192.168.1.1 or 192.168.0.1) in a browser.",
    },
    {
      question: "Does a reset delete router firmware?",
      answer: "No, a factory reset does not roll back or delete the installed firmware version. It only clears custom user configurations and settings database entries, retaining the current firmware version. If you need to downgrade firmware, you must flash a firmware image manually via the recovery mode (TFTP method).",
    },
    {
      question: "Will my ISP settings be deleted after reset?",
      answer: "If you have a DSL connection requiring PPPoE login credentials, or a static IP configuration from your ISP, those details will be deleted. You must re-enter your ISP credentials to restore internet access. ISP-branded routers (e.g., Huawei HG8245H5) may have TR-069 auto-provisioning that re-pushes ISP settings automatically within minutes.",
    },
    {
      question: "Can I reset a router from the admin page?",
      answer: "Yes, this is known as a soft reset. Log into the router's admin panel, navigate to Administration or System Tools, click 'Factory Defaults' or 'Restore', and confirm to start the reset process. This is functionally identical to a physical button reset — both wipe NVRAM.",
    },
    {
      question: "How do I restore my router backup settings?",
      answer: "Log into the admin page, go to System Tools > Backup & Restore, click 'Choose File' under Restore Settings, select your previously exported configuration file, and click Restore to apply.",
    },
    {
      question: "Will resetting an ISP-provided router restore true factory defaults?",
      answer: "Not always. ISP-locked routers (such as the Huawei HG8245H5, ZTE H298A, or Nokia G-2425G) use TR-069 (CWMP) — a remote management protocol that allows the ISP's Auto Configuration Server (ACS) to reprovision the device within minutes of a reset. Your custom Wi-Fi password and admin credentials will be cleared, but ISP-mandated settings like VLAN tags, IPTV configurations, and management lock will be silently reapplied.",
    },
    {
      question: "What is the difference between NVRAM and flash memory in routers?",
      answer: "NVRAM (Non-Volatile RAM) stores the active configuration variables (SSID, passwords, routing rules, DHCP leases) and is what gets wiped during a factory reset. Flash memory (NAND or NOR) stores the firmware binary image itself and is not affected by a standard reset. Some enterprise routers also maintain separate calibration data in a protected flash partition that is never erased.",
    },
    {
      question: "Are router logs deleted after a factory reset?",
      answer: "Yes. System logs, DHCP assignment history, connection logs, firewall event logs, and traffic statistics are all stored in volatile RAM or a circular log buffer in NVRAM — all of which are cleared during a factory reset. If you need to preserve logs for security audit purposes, export them via the admin panel (System Tools > System Log > Save) before resetting.",
    },
    {
      question: "Will my dual-band SSIDs be restored after a reset?",
      answer: "After a factory reset, dual-band routers revert to separate default SSIDs for the 2.4 GHz and 5 GHz bands (e.g., 'TP-Link_2.4GHz_XXXX' and 'TP-Link_5GHz_XXXX' where XXXX is derived from the MAC address). Any band-steering configuration, unified SSID names, or 6 GHz band settings on Wi-Fi 6E routers will need to be reconfigured.",
    },
    {
      question: "In what order should I reset a mesh Wi-Fi system?",
      answer: "For mesh systems (e.g., TP-Link Deco, ASUS ZenWiFi, Netgear Orbi, Eero), always reset the primary router/hub node first, then reset each satellite node individually. After resetting all nodes, re-add the satellites through the mesh app. Resetting only satellite nodes while the hub retains old configuration can result in adoption failures and 'node not found' errors.",
    },
  ];

  const troubleshootingSteps = [
    {
      title: "Locate Pinhole Button",
      description: "Find the small recessed hole labeled 'Reset' on the back or bottom of your router.",
      tip: "Avoid using sharp objects like needles that can damage the internal button. Use a bent paperclip or toothpick instead.",
    },
    {
      title: "Hold for 10-15 Seconds",
      description: "While the router is powered on, insert the paperclip and hold the button down firmly. Keep it pressed down for 10 to 15 seconds.",
    },
    {
      title: "Observe LED Indicators",
      description: "Keep holding the button until the LED lights on the front of the router turn off, flash rapidly, or turn solid amber, indicating the memory sweep has started.",
    },
    {
      title: "Wait for System Reboot",
      description: "Release the button and wait 1 to 2 minutes for the router to complete its reboot cycle and re-initialize LAN interfaces.",
      tip: "Never power off or unplug the router during the reboot cycle.",
    },
  ];

  const quickFixChecklist = [
    "Verify the router is plugged into power before attempting reset",
    "Identify the recessed physical reset button hole",
    "Hold the reset button down for at least 10 full seconds",
    "Wait for the front panel lights to cycle and stabilize",
    "Connect to the default Wi-Fi network using credentials on the bottom sticker",
    "Open your browser and navigate to the default gateway IP to begin setup",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={howToSchema} />

      <TroubleshootingArticleShell
        h1="How to Reset Your Router"
        intro="Step-by-step instructions to factory reset your wireless router, find the physical reset button, execute soft vs hard resets, and restore settings."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
      >

        {/* Section 1: Soft Reset vs Hard Reset */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Soft Reset vs. Hard Reset: Which One Do You Need?</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            When troubleshooting network connectivity issues, choosing the correct reset method is critical — an unnecessary factory reset means reconfiguring your entire network from scratch. Understanding the architectural difference between these two operations will save you time and avoid data loss.
          </p>
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li>
              <strong className="text-[var(--text-primary)]">Power Cycle (Reboot):</strong> The mildest intervention. Unplugging the power cord for 30 seconds and plugging it back in — or clicking &quot;Reboot&quot; in the admin panel — clears the router&apos;s active volatile RAM (DRAM). This flushes the ARP table, NAT connection tracking table, DNS resolver cache, and any hung system processes. Your custom SSID, passwords, and port forwarding rules are untouched because they live in NVRAM, not volatile RAM. Use a power cycle first for intermittent connection drops, slow speeds, or unresponsive devices.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Soft Reset (Admin Panel Factory Restore):</strong> Initiated from the router&apos;s web interface (Administration → Factory Defaults, or Maintenance → Restore), this performs a full NVRAM wipe and triggers a reboot. The outcome is identical to a physical button reset — all custom configurations are erased. Use this when you can still access the admin panel but want a clean slate.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Hard Reset (Physical Button Factory Reset):</strong> Completely wipes the router&apos;s non-volatile random-access memory (NVRAM or flash config partition). This restores the operating system back to its default factory settings, erasing custom SSIDs, Wi-Fi keys, admin passwords, port forwarding rules, static DHCP leases, VPN configurations, parental controls, and DHCP server settings. Required when you are locked out of the admin panel or have forgotten the admin password.
            </li>
          </ul>
        </div>

        {/* Section 2: Pre-Reset Recovery Checklist */}
        <div id="backup" className="mb-10 glass-card p-6 border border-amber-800/40 bg-amber-900/10 rounded-2xl">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-400" />
            Recovery Checklist: Do This BEFORE Resetting
          </h2>
          <p className="text-[var(--text-secondary)] mb-4 text-sm">
            A factory reset is irreversible. Spend 5 minutes collecting the following information from your{" "}
            <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline font-semibold">router settings panel</Link>{" "}
            before proceeding. You will need these details to restore internet access afterward.
          </p>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <span><strong className="text-[var(--text-primary)]">Screenshot WAN settings:</strong> Navigate to Network → WAN or Internet. Note your Connection Type (PPPoE, DHCP, Static IP), and for PPPoE connections write down the exact username and password your ISP assigned. These are typically formatted like <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">user@ispname.net</code> or a phone number.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <span><strong className="text-[var(--text-primary)]">Export configuration backup:</strong> Go to System Tools → Backup (TP-Link) / Administration → Restore/Save Setting (ASUS) / Advanced → Administration → Backup Settings (Netgear). Download the .bin or .cfg file to your computer.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <span><strong className="text-[var(--text-primary)]">Note port forwarding rules:</strong> Visit NAT → Port Forwarding or Advanced → Port Forwarding/Port Triggering. Write down every rule: internal IP, external port, protocol (TCP/UDP), and device name. Visit our{" "}
                <Link href="/port-forwarding" className="text-[var(--brand-400)] hover:underline">port forwarding guide</Link>{" "}
                for reconfiguration help after reset.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <span><strong className="text-[var(--text-primary)]">Record static DHCP leases:</strong> In LAN → DHCP → Address Reservation, note every device MAC address paired with a reserved IP (e.g., NAS device at 192.168.1.100, security camera at 192.168.1.110).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <span><strong className="text-[var(--text-primary)]">Note custom DNS servers:</strong> In WAN or DHCP settings, note any custom DNS servers (e.g., Cloudflare <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">1.1.1.1</code>, Google <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">8.8.8.8</code>, Pi-hole <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">192.168.1.200</code>).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <span><strong className="text-[var(--text-primary)]">Export VPN configurations:</strong> If running OpenVPN or WireGuard on your router, export client configuration files (.ovpn, .conf) and note any VPN server credentials.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Factory Reset Consequences */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">What Gets Deleted When You Factory Reset?</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            A factory reset performs a complete wipe of the configuration partition in flash memory. The following settings are permanently erased — with no undo:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-secondary)]">
            {[
              { label: "Custom Wi-Fi SSID names", detail: "Both 2.4 GHz and 5 GHz band names revert to factory defaults (e.g., TP-Link_2.4GHz_XXXX)" },
              { label: "Wi-Fi passwords (WPA2/WPA3 keys)", detail: "Reverts to the factory default passphrase printed on the device label" },
              { label: "Admin username & password", detail: "Resets to 'admin/admin', 'admin/password', or blank — check your model's default on our password guide" },
              { label: "Port forwarding rules", detail: "All TCP/UDP port mappings for gaming, servers, CCTV, etc. are wiped" },
              { label: "Static DHCP address reservations", detail: "All MAC-to-IP bindings (address reservation / DHCP static leases) are deleted" },
              { label: "VPN client/server configurations", detail: "OpenVPN, WireGuard, PPTP/L2TP configs and credentials are erased" },
              { label: "Custom DNS server settings", detail: "DNS overrides revert to ISP-assigned servers or manufacturer defaults" },
              { label: "Parental controls & schedules", detail: "All content filtering rules, schedule blocks, and device restrictions are removed" },
              { label: "QoS bandwidth rules", detail: "Traffic prioritization and bandwidth allocation settings are cleared" },
              { label: "Firewall rules & DMZ config", detail: "Custom firewall ACLs, IP filtering, and DMZ host assignments are deleted" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-3 rounded-xl border border-[var(--border-subtle)]">
                <p className="font-semibold text-[var(--text-primary)] mb-0.5">&#x2717; {item.label}</p>
                <p className="text-xs text-[var(--text-secondary)]">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            Items that are <em>not</em> affected by a factory reset: installed firmware version, hardware MAC addresses, regulatory domain settings, and any ISP-pushed TR-069 provisioning parameters (on ISP-managed devices).
          </p>
        </div>

        {/* Section 4: Factory Reset Step-by-Step */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Factory Reset Step-by-Step Instructions</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            To restore your router back to its factory default configuration, execute a physical hard reset following these detailed steps:
          </p>
          <ol className="space-y-3 text-[var(--text-secondary)]">
            <li id="step-power">
              <strong className="text-[var(--text-primary)]">1. Confirm power is connected.</strong> The router must be running — the power LED should be lit. Pressing the reset button on an unpowered device has no effect and can cause partial NVRAM corruption on some Mediatek-based chipsets.
            </li>
            <li id="step-locate">
              <strong className="text-[var(--text-primary)]">2. Locate the recessed Reset pinhole.</strong> Find the small hole on the back or bottom panel labeled <em>Reset</em> or <em>RST</em>. If your router has a combined WPS/Reset button (common on TP-Link Archer and ASUS RT series), note that a short press (&lt;3 seconds) activates WPS pairing only — you must hold for the full duration to trigger a factory reset.
            </li>
            <li id="step-hold">
              <strong className="text-[var(--text-primary)]">3. Press and hold for 10-15 seconds.</strong> Insert a straightened paperclip or SIM ejector pin into the pinhole. Press until you feel the tactile switch click. Hold firmly for 10 to 15 seconds. On TP-Link routers, 10 seconds is sufficient. On Netgear Nighthawk models, some users report needing the full 15 seconds before the LED sequence begins.
            </li>
            <li id="step-leds">
              <strong className="text-[var(--text-primary)]">4. Watch the LED indicators for confirmation.</strong> LED behavior varies by brand (see the brand table below), but generally: the Power LED will blink rapidly, all LEDs may briefly turn off, or the LED color changes from white/green to amber. This indicates the NVRAM erase cycle has started. Release the button at this point.
            </li>
            <li id="step-reboot">
              <strong className="text-[var(--text-primary)]">5. Wait for the full reboot cycle.</strong> The router takes 60 to 120 seconds to complete the reboot after an NVRAM wipe. Do not disconnect power during this window. The router is ready when Wi-Fi LEDs stabilize and the factory default SSID appears in your device&apos;s Wi-Fi scan list.
            </li>
            <li id="step-reconfigure">
              <strong className="text-[var(--text-primary)]">6. Reconnect and reconfigure.</strong> Connect via Ethernet or the default Wi-Fi network. Navigate to the default gateway IP in a browser (see our{" "}
              <Link href="/router-login" className="text-[var(--brand-400)] hover:underline font-semibold">router login guide</Link>{" "}
              for brand-specific IPs). Use the default admin credentials from the device label to log in. If you cannot reach the admin panel, consult our{" "}
              <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline font-semibold">router login troubleshooting guide</Link>.
            </li>
          </ol>
        </div>

        {/* Section 5: WPS Reset Methods */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">WPS/Reset Combination Button Behavior</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Many modern routers — particularly TP-Link Archer, ASUS RT-series, and Tenda AC-series — consolidate the WPS pairing button and the factory reset function into a single physical button. Understanding the timing-based behavior of this dual-function button is critical to avoid accidentally triggering the wrong operation:
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
            <table className="w-full text-sm text-left text-[var(--text-secondary)]">
              <thead className="bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Hold Duration</th>
                  <th className="px-4 py-3">Function Triggered</th>
                  <th className="px-4 py-3">LED Indicator</th>
                  <th className="px-4 py-3">Affected Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-[var(--brand-400)]">~1 second (quick press)</td>
                  <td className="px-4 py-3">WPS pairing mode activated</td>
                  <td className="px-4 py-3">WPS LED blinks for 2 min</td>
                  <td className="px-4 py-3">TP-Link Archer C6, C80, AX73</td>
                </tr>
                <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-[var(--brand-400)]">3-5 seconds</td>
                  <td className="px-4 py-3">WPS mode disabled (toggle)</td>
                  <td className="px-4 py-3">WPS LED turns off</td>
                  <td className="px-4 py-3">Some ASUS RT-AC68U variants</td>
                </tr>
                <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-red-400">10 seconds</td>
                  <td className="px-4 py-3">Factory reset triggered</td>
                  <td className="px-4 py-3">All LEDs flash / Power blinks amber</td>
                  <td className="px-4 py-3">TP-Link Archer, ASUS RT, Tenda AC/AX</td>
                </tr>
                <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-red-400">15 seconds</td>
                  <td className="px-4 py-3">Factory reset triggered</td>
                  <td className="px-4 py-3">Power LED blinks amber rapidly</td>
                  <td className="px-4 py-3">Netgear Nighthawk AX series, Orbi</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            <strong className="text-amber-400">Important:</strong> On ASUS routers with a dedicated Reset pinhole separate from WPS (e.g., RT-AX88U Pro, RT-BE96U), the pinhole always triggers a factory reset regardless of duration — there is no WPS function on that button.
          </p>
        </div>

        {/* Section 6: ISP Router Reset Behavior & TR-069 */}
        <div className="mb-10 glass-card p-6 border border-red-800/40 bg-red-900/10 rounded-2xl">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-400" />
            ISP-Locked Routers: Why Factory Reset May Not Restore True Defaults
          </h2>
          <p className="text-[var(--text-secondary)] mb-4 text-sm">
            This is the most commonly misunderstood aspect of router resets. If your router was provided by your ISP (common in fiber/FTTH, ADSL2+, and cable deployments), it is almost certainly running locked firmware with TR-069 (CWMP — CPE WAN Management Protocol) enabled.
          </p>
          <p className="text-[var(--text-secondary)] mb-4 text-sm">
            <strong className="text-[var(--text-primary)]">What is TR-069?</strong> TR-069 is a broadband provisioning protocol that allows ISPs to remotely manage subscriber CPE (Customer Premises Equipment) via an ACS (Auto Configuration Server). On ISP-deployed routers — such as the <strong>Huawei HG8245H5</strong>, <strong>Huawei EG8145V5</strong>, <strong>ZTE H298A</strong>, <strong>ZTE ZXHN F670L</strong>, <strong>Nokia G-2425G</strong>, and <strong>Sercomm FG824CD</strong> — the TR-069 agent runs as a persistent background service.
          </p>
          <p className="text-[var(--text-secondary)] mb-2 text-sm">
            <strong className="text-[var(--text-primary)]">What happens when you reset an ISP router:</strong>
          </p>
          <ol className="space-y-2 text-sm text-[var(--text-secondary)] mb-4">
            <li>1. The physical reset wipes NVRAM — your custom Wi-Fi name, password, and admin credentials are cleared.</li>
            <li>2. The router reboots into factory defaults and connects to the ISP&apos;s network.</li>
            <li>3. Within 1-5 minutes, the TR-069 ACS server detects the device (via its serial number or MAC address) and pushes a provisioning XML payload.</li>
            <li>4. This payload re-applies: VLAN IDs, IPTV multicast configurations, Voice over IP (VoIP) SIP credentials, management interface lockouts, ISP-specific DNS servers, and sometimes even a forced Wi-Fi SSID and password.</li>
            <li>5. The admin username is often reset to a vendor-specific default that the ISP has changed — not &quot;admin/admin&quot;.</li>
          </ol>
          <div className="p-3 bg-[var(--bg-elevated)] rounded-xl text-sm text-[var(--text-secondary)]">
            <strong className="text-red-400">Warning:</strong> If you reset an ISP router hoping to gain access to locked settings (e.g., bridge mode, DMZ, or VLAN configuration), TR-069 will re-lock those settings within minutes. To access these features, you must contact your ISP and request a bridge mode configuration, or replace the ISP router with your own router and place the ISP device in passthrough/bridge mode.
          </div>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Additionally, after resetting an ISP-provided router, you will need to re-enter your PPPoE credentials if the TR-069 server does not push them automatically. Contact your ISP to retrieve your PPPoE username and password — these are different from your ISP account portal login. Learn more in our{" "}
            <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline font-semibold">router admin guide</Link>.
          </p>
        </div>

        {/* Section 7: Brand-by-Brand Extended Reset Table */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Router Factory Reset Guide: 10 Major Brands</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Reset button location, required hold duration, and LED confirmation signal vary significantly across manufacturers. Use this reference table before attempting a reset:
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
            <table className="w-full text-sm text-left text-[var(--text-secondary)]">
              <thead className="bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Reset Button Location</th>
                  <th className="px-4 py-3">Hold Duration</th>
                  <th className="px-4 py-3">LED Signal</th>
                  <th className="px-4 py-3">Default Login IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {[
                  {
                    brand: "TP-Link",
                    location: "Back panel — combined WPS/Reset pinhole",
                    duration: "10 seconds",
                    led: "SYS LED blinks rapidly, then all LEDs flash",
                    ip: "192.168.0.1 or 192.168.1.1",
                  },
                  {
                    brand: "ASUS",
                    location: "Back panel — dedicated Reset pinhole (separate from WPS on newer models)",
                    duration: "5-10 seconds",
                    led: "Power LED blinks slowly, then all LEDs off during reboot",
                    ip: "192.168.1.1 or router.asus.com",
                  },
                  {
                    brand: "Netgear",
                    location: "Back or bottom — labeled 'Restore Factory Settings'",
                    duration: "7-15 seconds",
                    led: "Power LED blinks amber rapidly",
                    ip: "192.168.1.1 or routerlogin.net",
                  },
                  {
                    brand: "D-Link",
                    location: "Back panel — pinhole labeled 'Reset'",
                    duration: "10 seconds",
                    led: "Power LED turns amber, blinks, then solid green on reboot",
                    ip: "192.168.0.1 or dlinkrouter.local",
                  },
                  {
                    brand: "Linksys",
                    location: "Back panel — pinhole or dedicated flush button",
                    duration: "10 seconds",
                    led: "Power LED blinks rapidly (amber) then solid blue",
                    ip: "192.168.1.1 or linksyssmartwifi.com",
                  },
                  {
                    brand: "Huawei",
                    location: "Back or bottom — pinhole labeled 'Reset'",
                    duration: "5-10 seconds",
                    led: "All LEDs flash simultaneously, then reboot sequence",
                    ip: "192.168.1.1 or 192.168.100.1",
                  },
                  {
                    brand: "ZTE",
                    location: "Back panel — labeled 'Reset' or 'RST'",
                    duration: "5-10 seconds",
                    led: "WLAN LED blinks rapidly, then router reboots",
                    ip: "192.168.1.1 or 192.168.0.1",
                  },
                  {
                    brand: "Tenda",
                    location: "Back panel — combined WPS/Reset or dedicated Reset pinhole",
                    duration: "8-10 seconds",
                    led: "All LEDs turn on briefly, then router reboots",
                    ip: "192.168.0.1 or tendawifi.com",
                  },
                  {
                    brand: "Belkin",
                    location: "Back panel — small Reset pinhole",
                    duration: "10-15 seconds",
                    led: "Power LED blinks, then router reboots with default SSID",
                    ip: "192.168.2.1",
                  },
                  {
                    brand: "Mikrotik",
                    location: "Back panel pinhole — or hold during power-on for RouterBOOT reset",
                    duration: "5 seconds (pinhole) or 5s during boot",
                    led: "USR LED blinks 3x to confirm reset",
                    ip: "192.168.88.1",
                  },
                ].map((row) => (
                  <tr key={row.brand} className="hover:bg-[var(--bg-elevated)] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.brand}</td>
                    <td className="px-4 py-3">{row.location}</td>
                    <td className="px-4 py-3 font-mono text-[var(--brand-400)]">{row.duration}</td>
                    <td className="px-4 py-3">{row.led}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Not sure which IP to use for your brand? Our{" "}
            <Link href="/router-login" className="text-[var(--brand-400)] hover:underline font-semibold">router login guide</Link>{" "}
            lists default gateway IPs for 50+ router models. If you cannot reach the admin panel after reset, see our{" "}
            <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline font-semibold">router login not working guide</Link>.
          </p>
        </div>

        {/* Section 8: Soft Reset Methods */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Soft Reset Methods: Factory Restore via Admin Panel</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            If you can still access your router&apos;s admin panel, a software-initiated factory reset is often more convenient than hunting for the physical pinhole. The end result is identical — all NVRAM configuration is erased. The menu path varies by manufacturer:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-4 rounded-xl border border-[var(--border-subtle)]">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">TP-Link Archer / TL Series</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-1">
                Navigate to <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">Advanced → System → Backup &amp; Restore → Factory Restore</code>. Click <strong>Factory Restore</strong> (full wipe) rather than <strong>Restore</strong> (which requires a .bin backup file). The router will display a warning dialog — click OK and wait 2 minutes.
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Applies to: Archer AX21, AX55, AX73, AX90, C6, C80 running TP-Link firmware 3.x+</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-[var(--border-subtle)]">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">ASUS RT / TUF / ZenWiFi Series</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-1">
                Navigate to <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">Administration → Restore/Save/Upload Setting → Restore</code>. Alternatively, on ASUSWRT-Merlin firmware, SSH into the router and run: <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs font-mono">nvram erase &amp;&amp; reboot</code>. This command erases all NVRAM variables and triggers an immediate cold reboot.
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Applies to: RT-AX55, RT-AX86U, RT-AX88U Pro, RT-BE96U, ZenWiFi Pro ET12, TUF-AX5400</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-[var(--border-subtle)]">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Netgear Nighthawk / Orbi</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-1">
                Navigate to <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">Advanced → Administration → Backup Settings → Erase</code>. On Orbi mesh systems, perform the erase on the <em>Orbi router (RBR)</em> first, then reset each satellite (RBS) separately. The Orbi app also provides a factory reset option under Device Settings → Reset Router.
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Applies to: Nighthawk AX8, AX12, RAX120, Orbi RBK752, RBK863S, RBRE960</p>
            </div>
          </div>
          <div className="mt-4 p-4 glass-card rounded-xl border border-[var(--border-subtle)]">
            <h3 className="font-bold text-[var(--text-primary)] mb-2 text-sm">Power Cycle vs. Factory Reset: Why They Are Different</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              A power cycle (unplugging the router for 30 seconds) only clears volatile DRAM — this contains the active ARP table, NAT sessions, and process memory. NVRAM (which stores your Wi-Fi settings, passwords, and rules) is non-volatile by design: it persists through power loss. This is why a power cycle never affects your network configuration. A factory reset explicitly writes the &quot;erase&quot; command to NVRAM sectors, overwriting all user data with factory defaults before the reboot sequence begins.
            </p>
          </div>
        </div>

        {/* Section 9: Post-Reset Setup */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Post-Reset Setup Guidelines</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            After a factory reset, your router will broadcast the default factory SSID and no longer recognize your previous Wi-Fi password. Follow these steps to restore internet access and re-configure your network:
          </p>
          <ol className="space-y-3 text-[var(--text-secondary)]">
            <li>
              <strong className="text-[var(--text-primary)]">1. Connect via Ethernet.</strong> Plug a CAT5e or CAT6 Ethernet cable from your computer&apos;s LAN port directly to any LAN port (yellow ports) on the router. This is more reliable than Wi-Fi during initial setup.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">2. Navigate to the admin panel.</strong> Open a browser and go to the default gateway IP (typically <strong>192.168.1.1</strong> or <strong>192.168.0.1</strong>). Refer to our <Link href="/ips" className="text-[var(--brand-400)] hover:underline font-semibold">IP Address Directory</Link> if you are unsure.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">3. Log in with factory default credentials.</strong> Use the username and password printed on the bottom sticker of your router. If the sticker is missing or you cannot log in, consult our <Link href="/router-password" className="text-[var(--brand-400)] hover:underline font-semibold">default router passwords guide</Link>.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">4. Run the Quick Setup wizard.</strong> Configure your WAN connection type (select PPPoE for DSL/FTTH and enter your ISP credentials, or DHCP for cable internet). Set a custom SSID and Wi-Fi password for both bands. For help changing your Wi-Fi name and key, see our <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline font-semibold">change Wi-Fi password guide</Link>.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">5. Change admin credentials immediately.</strong> Navigate to System Management or Administration → Set Password and update the admin password from the factory default to a unique, strong password. Learn more in our <Link href="/router-admin" className="text-[var(--brand-400)] hover:underline font-semibold">router admin guide</Link> and <Link href="/router-password" className="text-[var(--brand-400)] hover:underline font-semibold">router password guide</Link>.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">6. Restore your configuration backup.</strong> If you exported a backup file before resetting, upload it via System Tools → Backup &amp; Restore → Restore. Verify your port forwarding rules and DHCP reservations are restored correctly.
            </li>
          </ol>
        </div>

        {/* Section 10: Post-Reset Security Hardening */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-[var(--brand-400)]" />
            Post-Reset Security Hardening Checklist
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            A factory reset returns your router to an insecure out-of-box state. Complete this security hardening checklist before putting the router back into production:
          </p>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-xl">
              <CheckCircle2 size={16} className="text-[var(--brand-400)] mt-0.5 shrink-0" />
              <div>
                <strong className="text-[var(--text-primary)]">Change the admin panel password</strong>
                <p className="text-xs mt-0.5">The factory default &quot;admin/admin&quot; credential is publicly documented and exploited by Mirai botnet variants. Set a minimum 12-character password with mixed case and numbers. See our <Link href="/change-wifi-password" className="text-[var(--brand-400)] hover:underline">change Wi-Fi password guide</Link> for the Wi-Fi security key change procedure.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-xl">
              <CheckCircle2 size={16} className="text-[var(--brand-400)] mt-0.5 shrink-0" />
              <div>
                <strong className="text-[var(--text-primary)]">Update firmware to the latest version</strong>
                <p className="text-xs mt-0.5">Navigate to System → Firmware Update and check for the latest version. Firmware updates patch CVEs — e.g., TP-Link patched CVE-2023-1389 (remote code execution) in firmware 1.1.4 Build 20230219. Always update firmware immediately after a factory reset.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-xl">
              <CheckCircle2 size={16} className="text-[var(--brand-400)] mt-0.5 shrink-0" />
              <div>
                <strong className="text-[var(--text-primary)]">Disable WPS (Wi-Fi Protected Setup)</strong>
                <p className="text-xs mt-0.5">WPS PIN mode has a known brute-force vulnerability (Pixie Dust attack) that allows attackers to recover the WPA2 key within minutes. Navigate to Wireless → WPS and disable it entirely unless you have a specific device that requires it.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-xl">
              <CheckCircle2 size={16} className="text-[var(--brand-400)] mt-0.5 shrink-0" />
              <div>
                <strong className="text-[var(--text-primary)]">Enable WPA3 or WPA2/WPA3 mixed mode</strong>
                <p className="text-xs mt-0.5">Navigate to Wireless → Security and select WPA3-Personal or WPA2/WPA3 mixed (for compatibility with older devices). Avoid WEP and WPA (TKIP) — both are cryptographically broken. Visit our <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">router settings guide</Link> for detailed configuration steps.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-xl">
              <CheckCircle2 size={16} className="text-[var(--brand-400)] mt-0.5 shrink-0" />
              <div>
                <strong className="text-[var(--text-primary)]">Disable remote management</strong>
                <p className="text-xs mt-0.5">Ensure Remote Management (also called WAN Management or Remote GUI Access) is disabled — this prevents access to the admin panel from the internet. Navigate to Advanced → System → Remote Management and confirm it is off.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-xl">
              <CheckCircle2 size={16} className="text-[var(--brand-400)] mt-0.5 shrink-0" />
              <div>
                <strong className="text-[var(--text-primary)]">Configure custom DNS servers</strong>
                <p className="text-xs mt-0.5">Change from ISP-default DNS servers to a privacy-respecting alternative. Cloudflare (<code className="bg-[var(--bg-elevated)] px-1 rounded">1.1.1.1</code> / <code className="bg-[var(--bg-elevated)] px-1 rounded">1.0.0.1</code>), or Google (<code className="bg-[var(--bg-elevated)] px-1 rounded">8.8.8.8</code> / <code className="bg-[var(--bg-elevated)] px-1 rounded">8.8.4.4</code>) improve resolution speed and privacy over many ISP DNS resolvers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 11: Brand Instructions (original expanded) */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Detailed Reset Steps by Brand</h2>
          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">TP-Link Router Reset</h3>
              <p>Locate the Reset/WPS button on the back. Press and hold for 10 seconds until the SYS LED flashes rapidly. Release the button and wait for the router to restart. The default SSID will appear as <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">TP-Link_XXXX</code>. Default admin IP: <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">192.168.0.1</code>. Default credentials: <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">admin / admin</code> (older firmware) or set via first-run wizard (newer firmware).</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">ASUS Router Reset</h3>
              <p>Hold the Reset button for 5-10 seconds until the power LED starts blinking slowly. Release the button, wait for the router to reboot, and configure via <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">http://router.asus.com</code> or <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">192.168.1.1</code>. Default login: <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">admin / admin</code>. On newer AiMesh-capable models (RT-AX88U Pro, ZenWiFi Pro ET12), ASUS requires you to set a new admin password and SSID via the ASUS Router app on first boot.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Netgear Router Reset</h3>
              <p>Insert a paperclip into the Restore Factory Settings hole. Hold for 7-10 seconds until the power LED blinks amber. Release the button and wait for reboot (90 seconds on Nighthawk models). Access setup at <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">routerlogin.net</code> or <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">192.168.1.1</code>. Default credentials: <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">admin / password</code>.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">D-Link Router Reset</h3>
              <p>Hold the Reset pinhole for 10 seconds until the power LED changes to amber. Release and wait for reboot. Access at <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">192.168.0.1</code> or <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">dlinkrouter.local</code>. Many D-Link routers (DIR-X series) require the password from the label on first login — there is no &quot;admin/admin&quot; default on these models.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Linksys Router Reset</h3>
              <p>Hold the physical Reset button on the back panel for 10 seconds. The power LED will blink amber rapidly, then turn solid blue when ready. Access at <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">192.168.1.1</code> or <code className="bg-[var(--bg-elevated)] px-1 rounded text-xs">linksyssmartwifi.com</code>. For Velop mesh systems, reset each node individually using the node&apos;s dedicated reset process in the Linksys app.</p>
            </div>
          </div>
        </div>

        {/* Section 12: Related Router Guides */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Info size={16} className="text-[var(--brand-400)]" />
            Related Router Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              {
                label: "Router Login Guide",
                href: "/router-login",
                desc: "Find default gateway IPs and credentials for 50+ router models.",
              },
              {
                label: "Default Router Passwords",
                href: "/router-password",
                desc: "Look up factory default admin usernames and passwords by brand.",
              },
              {
                label: "Router Admin Panel Guide",
                href: "/router-admin",
                desc: "Navigate your router admin interface — settings, menus, and options explained.",
              },
              {
                label: "Router Settings Guide",
                href: "/router-settings",
                desc: "Configure WAN, LAN, DHCP, DNS, QoS, and firewall settings correctly.",
              },
              {
                label: "Change Wi-Fi Password",
                href: "/change-wifi-password",
                desc: "Step-by-step guide to changing your Wi-Fi SSID and security key.",
              },
              {
                label: "Router Login Not Working",
                href: "/router-login-not-working",
                desc: "Diagnose and fix admin panel access issues after a reset.",
              },
              {
                label: "Port Forwarding Guide",
                href: "/port-forwarding",
                desc: "Reconfigure port forwarding rules for gaming, servers, and CCTV after a reset.",
              },
              {
                label: "Router Brands Directory",
                href: "/routers",
                desc: "Browse all supported router brands and model-specific configuration guides.",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col gap-0.5 p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all"
              >
                <span className="font-semibold text-[var(--text-primary)] text-sm">{link.label}</span>
                <span className="text-xs text-[var(--text-secondary)]">{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 13: Cluster Internal Linking Hub */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" />
            Router Access Cluster Navigation
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Router Directory", href: "/routers" },
              { label: "IP Address Directory", href: "/ips" },
              { label: "Router Login Guide", href: "/router-login" },
              { label: "Default Router Passwords", href: "/router-password" },
              { label: "How to Reset a Router", href: "/router-reset" },
              { label: "Router Admin Hub", href: "/router-admin" },
              { label: "Router Settings", href: "/router-settings" },
              { label: "Change Wi-Fi Password", href: "/change-wifi-password" },
              { label: "Login Issues Diagnoses", href: "/router-login-not-working" },
              { label: "Port Forwarding", href: "/port-forwarding" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </TroubleshootingArticleShell>
    </>
  );
}
