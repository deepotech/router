import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import {
  BrandRouterBadge,
  ISPWarningBanner,
  HardwareFailureCard,
} from "@/components/tools/BrandIssueComponents";

export const metadata: Metadata = buildMetadata({
  title: "ASUS Router Red Light Fix Guide — What Each Color Means (2026)",
  description:
    "ASUS router showing a red, blinking orange, or amber power LED? Diagnose WAN port authentication failures, ISP IP assignment drops, overheating shutdowns, and firmware boot loops — with model-specific fixes.",
  canonical: "/asus-router-red-light",
  keywords: [
    "asus router red light",
    "asus router red power light",
    "asus router blinking orange",
    "asus router led meaning",
    "asus router internet light red",
    "asus rt-ax88u red light",
    "asus router not connecting internet red indicator",
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "ASUS Router Red Light", url: "/asus-router-red-light" },
];

const troubleshootingSteps = [
  {
    title: "Identify the Exact LED Behavior Pattern",
    description:
      "Before applying any fix, precisely characterize the LED behavior. Solid Red Power LED = WAN authentication or IP assignment failure. Blinking Orange Power LED = firmware boot loop or corrupted firmware. Solid Red WAN/Internet LED = ISP upstream link is down or PPPoE credentials are wrong. Pulsing Amber = router is in factory reset / recovery mode.",
    tip: "On ASUS routers, the Power LED and the WAN/Internet LED are separate indicators. Misidentifying which LED is red leads to wrong fixes.",
  },
  {
    title: "Check WAN Connection Type and ISP Credentials",
    description:
      "Log into ASUS admin at http://192.168.1.1 or http://router.asus.com. Navigate to WAN → Internet Connection. Verify the WAN Connection Type matches your ISP service: DHCP (Cable), PPPoE (DSL/Fiber), or Static IP. If PPPoE, re-enter your username and password character-by-character to rule out copy-paste errors.",
    tip: "ISPs sometimes change WAN authentication requirements during maintenance windows, invalidating previously working PPPoE credentials.",
  },
  {
    title: "Power Cycle the Full Line in Strict Order",
    description:
      "Shut off the router, then the modem. Wait 60 seconds. Power the modem on first. Wait until all modem LEDs are stable (90 seconds minimum). Then power on the ASUS router. This strict sequence allows the modem to fully re-establish its upstream DHCP or PPPoE session before the router queries for an IP.",
    tip: "Skipping the 60-second full discharge between modem and router power-on is the most common reason power cycling fails to fix a red WAN light.",
  },
  {
    title: "Clone Your ISP's MAC Address in WAN Settings",
    description:
      "Some ISPs whitelist the MAC address of the first device that connected to their modem (typically your old router or a technician's laptop). Navigate to WAN → Internet Connection → Special Requirement from ISP → MAC Address Clone. Enter the MAC address of a previously authorized device, or click Get MAC Address to clone from a connected PC.",
    tip: "MAC whitelist binding is common with residential cable ISPs, particularly in the US. Swapping the router without cloning MAC causes immediate WAN failure.",
  },
  {
    title: "Recover from Firmware Boot Loop Using ASUS WPS/Recovery Mode",
    description:
      "If the router shows a blinking orange or blinking red LED from boot with no web interface response: (1) Download the correct firmware binary for your exact model from asus.com. (2) Set your PC to static IP 192.168.1.2/255.255.255.0. (3) Plug the PC directly into LAN port 1 via Ethernet. (4) Hold the WPS button while powering on the router until the power LED flashes. (5) Manually navigate to http://192.168.1.1 in a browser — a minimal recovery interface will appear for firmware upload.",
  },
];

const faqs = [
  {
    question: "What does a solid red light on an ASUS router mean?",
    answer:
      "A solid red Power LED on ASUS routers (RT-AX, RT-AC, and GT series) indicates a WAN connectivity failure — the router cannot obtain an IP address from the ISP. Common causes include an unplugged WAN cable, an ISP upstream outage, incorrect PPPoE credentials, or MAC address whitelist mismatch. A solid red Internet/WAN LED specifically (separate from the power LED) confirms the WAN port link is down.",
  },
  {
    question: "Why is my ASUS router blinking orange instead of solid white?",
    answer:
      "A blinking or pulsing orange LED on ASUS routers typically indicates a firmware boot failure or that the device is in firmware recovery mode. This is caused by a failed firmware update, file corruption from a power interruption during flashing, or hardware-level boot partition failure. Use ASUS's built-in WPS rescue mode or the Firmware Restoration utility on Windows to recover.",
  },
  {
    question: "Can I fix an ASUS red light without a computer?",
    answer:
      "Partially. You can power cycle the modem and router in the correct order using just the power buttons. You can also press and hold the WPS/Reset button to initiate factory reset (hold 15 seconds until the Power LED blinks rapidly). However, diagnosing WAN credentials or MAC address issues requires accessing the admin interface via a computer or phone browser on the local network.",
  },
  {
    question: "My ASUS router has red light but the modem shows green — who is responsible?",
    answer:
      "If your modem shows a solid green Online indicator but the ASUS router's WAN/Internet LED is red, the problem is between the modem's LAN output and the router's WAN port. Common causes: wrong WAN cable port (using a LAN port instead of the dedicated WAN port), a faulty patch cable, incorrect WAN connection type selected in ASUS admin, or a MAC address whitelisting block from your ISP.",
  },
  {
    question: "Does ASUS router overheating cause a red light?",
    answer:
      "Yes. ASUS RT-AX88U, GT-AX11000, and other high-performance models have thermal protection circuits. If internal temperature exceeds safe thresholds (~85°C on the processor), the router throttles performance and may show an amber or red indicator before initiating a protective shutdown. Ensure the router has at least 2 inches of clearance on all sides and is not placed in an enclosed cabinet.",
  },
];

const commonCauses = [
  {
    title: "ISP WAN IP Assignment Failure",
    desc: "The ISP DHCP server, RADIUS server, or PPPoE concentrator rejecting the router's authentication — most common after hardware swap.",
  },
  {
    title: "MAC Address Whitelist Mismatch",
    desc: "Cable ISPs binding the WAN service to the first connected device's MAC address, blocking new routers from obtaining an IP.",
  },
  {
    title: "Firmware Corruption / Boot Loop",
    desc: "ASUS router failing to boot cleanly due to a failed update or partition corruption, causing a blinking orange recovery LED.",
  },
  {
    title: "Thermal Shutdown",
    desc: "Internal temperature protection engaging on high-performance models (AX88U, GT-AX11000), causing the router to halt wireless operations.",
  },
];

const quickFixChecklist = [
  "Identify the exact LED pattern: solid red power, blinking orange, or solid red WAN LED.",
  "Power cycle modem → wait 90 sec → power on ASUS router.",
  "Check WAN connection type (DHCP vs PPPoE) in WAN → Internet Connection.",
  "Try MAC Address Clone from WAN → Internet Connection → MAC Address Clone.",
  "If blinking orange, use WPS recovery mode to flash fresh firmware from asus.com.",
];

const hardwareIndicators = [
  {
    component: "WAN Port",
    failureSign: "Red light persists even after ISP line confirmed working",
    severity: "high" as const,
    action: "Test WAN port with a different cable; if still red, the port NIC chip may be faulty.",
  },
  {
    component: "Power Regulator",
    failureSign: "Router powers on briefly then shuts to red indicator within seconds",
    severity: "high" as const,
    action: "Test with an ASUS-compatible OEM power brick; damaged regulators cause immediate boot failure.",
  },
  {
    component: "NAND Flash",
    failureSign: "Firmware recovery always fails or settings reset after every reboot",
    severity: "medium" as const,
    action: "NAND wear-out; permanent firmware corruption. Router replacement is the only solution.",
  },
  {
    component: "Thermal Paste / Heatsink",
    failureSign: "Red indicator only occurs after 2+ hours of use in warm environments",
    severity: "medium" as const,
    action: "Reapply thermal paste on the CPU/SoC die; ensure external airflow is unobstructed.",
  },
];

export default function AsusRouterRedLightPage() {
  return (
    <TroubleshootingArticleShell
      h1="ASUS Router Red Light — What Each LED Color Means and How to Fix It"
      intro="An ASUS router showing a red, blinking orange, or amber LED is not a generic error — each LED pattern pinpoints a specific failure layer, from ISP authentication rejection and WAN IP conflicts, to firmware boot corruption and thermal protection events. Use this guide to identify the exact cause and apply the right fix."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Before Factory Reset Warning",
        text: "A factory reset will erase all ASUS router configuration including VPN profiles, custom DNS, firewall rules, IPTV settings, and port forwarding rules. If you have not backed up your config via Administration → Restore/Save/Upload Setting, do so before proceeding.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP directly if: the modem shows Online/green status but your ASUS router cannot obtain a WAN IP (a sign of MAC whitelist or upstream DHCP server rejection), or if your ISP has recently changed authentication requirements following a network migration or account upgrade."
      severityLevel="high"
    >
      <div className="space-y-6">
        {/* Brand Badge */}
        <BrandRouterBadge
          brandName="ASUS"
          seriesLabel="RT-AX / RT-AC / GT-AX Series"
          accentColor="orange"
          icon="router"
        />

        {/* Quick Answer AI Snippet */}
        <section
          className="glass-card p-5 border border-orange-950/20 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer Summary"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            Quick Diagnostic Summary
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li>
              <strong>Solid Red Power LED:</strong> WAN IP assignment has failed — check ISP credentials, power cycle modem-first, or clone MAC address.
            </li>
            <li>
              <strong>Blinking Orange LED:</strong> Firmware is corrupt or in boot recovery — use WPS firmware recovery mode with the correct .trx firmware file.
            </li>
            <li>
              <strong>Pulsing Amber:</strong> The router has initiated a factory reset or is waiting for recovery input — do not power off during this process.
            </li>
          </ul>
        </section>

        {/* LED decoder table */}
        <section className="glass-card border border-[var(--border-subtle)] rounded-2xl overflow-hidden" aria-labelledby="led-table-title">
          <div className="px-5 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
            <h3 id="led-table-title" className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              ASUS Router LED Color Reference
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">LED State</th>
                  <th className="px-3 py-2 text-left">Meaning</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="px-3 py-2 text-red-400 font-bold">Solid Red (Power)</td>
                  <td className="px-3 py-2">WAN IP assignment failure or PPPoE auth rejection</td>
                  <td className="px-3 py-2">Power cycle modem, verify ISP credentials, clone MAC</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-orange-400 font-bold">Blinking Orange (Power)</td>
                  <td className="px-3 py-2">Firmware corruption, boot loop, or recovery mode</td>
                  <td className="px-3 py-2">Use WPS recovery to flash correct firmware binary</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-amber-400 font-bold">Pulsing Amber (Power)</td>
                  <td className="px-3 py-2">Factory reset in progress or awaiting recovery input</td>
                  <td className="px-3 py-2">Wait 3 minutes; do NOT power off mid-process</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-red-400 font-bold">Solid Red (WAN/Internet)</td>
                  <td className="px-3 py-2">No physical WAN link detected or ISP modem offline</td>
                  <td className="px-3 py-2">Check WAN cable, verify modem Online LED is green</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-blue-400 font-bold">Blinking Blue (WPS)</td>
                  <td className="px-3 py-2">WPS pairing session active (not an error)</td>
                  <td className="px-3 py-2">Normal; LED returns to white after pairing completes</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-emerald-400 font-bold">Solid White / Green</td>
                  <td className="px-3 py-2">Normal operation; WAN and wireless operational</td>
                  <td className="px-3 py-2">No action needed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ConnectionOptimizerClient mode="slow-router" />

        <ISPWarningBanner
          title="ISP-Level WAN Rejection Detection"
          body="ASUS routers show a permanent red WAN LED when the ISP's upstream DHCP or PPPoE server is actively blocking the router's MAC address or rejecting authentication tokens. This is NOT a router hardware fault — it requires ISP-side intervention to release or re-authorize the modem/router binding."
          variant="warning"
          escalationSteps={[
            "Ask your ISP to 'release and re-bind the CPE lease' for your modem/ONT.",
            "Request MAC address whitelisting for your ASUS router's WAN MAC.",
            "If using PPPoE, ask ISP to verify your authentication credentials on their RADIUS server.",
          ]}
        />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            What Happens Internally During an ASUS Red Light WAN Failure?
          </h2>
          <p>
            When an ASUS router (running ASUSWRT) fails to establish a WAN connection, it follows an internal retry sequence:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>WAN Port Link-Up Detection:</strong> The WAN port&apos;s Ethernet PHY chip detects a physical link. If no link is detected, the WAN LED goes red immediately — this is a Layer 1 (physical) failure.
            </li>
            <li>
              <strong>WAN Type Negotiation:</strong> If WAN type is set to DHCP, the router sends a DHCP Discover broadcast on the WAN port. If PPPoE, it sends an LCP Echo Request to the ISP&apos;s PPPoE concentrator.
            </li>
            <li>
              <strong>DHCP/PPPoE Server Response:</strong> If the ISP server responds with a DHCP Offer or PPPoE LCP Conf-Ack, the router proceeds to IP assignment. If not, or if the MAC is blacklisted, the router receives no reply, times out, and marks WAN as failed — displaying the red power LED.
            </li>
            <li>
              <strong>ASUSWRT Retry Loop:</strong> The router retries WAN negotiation every 60 seconds by default. You can watch this in real-time via Administration → System Log, filtering by &ldquo;WAN&rdquo; or &ldquo;pppoe&rdquo;.
            </li>
          </ol>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Model-Specific Red Light Causes — ASUS Reference Chart
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">ASUS Model</th>
                  <th className="px-3 py-2 text-left">Most Common Red Light Cause</th>
                  <th className="px-3 py-2 text-left">Model-Specific Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 text-[var(--text-primary)]">RT-AX88U</td>
                  <td className="px-3 py-2">WAN port auto-negotiation mismatching ISP modem at Gigabit</td>
                  <td className="px-3 py-2">Force WAN port to 100Mbps in WAN settings to stabilize link</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--text-primary)]">RT-AC68U</td>
                  <td className="px-3 py-2">PPPoE credential cache corruption after firmware update</td>
                  <td className="px-3 py-2">Re-enter PPPoE credentials manually; do not use auto-detect</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--text-primary)]">GT-AX11000</td>
                  <td className="px-3 py-2">Thermal throttle causing WAN daemon restart at high ambient temps</td>
                  <td className="px-3 py-2">Ensure 2&quot; clearance all sides; monitor via ASUSWRT system temp sensor</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--text-primary)]">ZenWiFi AX (XT8)</td>
                  <td className="px-3 py-2">AiMesh node losing backhaul sync with the main node</td>
                  <td className="px-3 py-2">Reset AiMesh pairing in ASUSWRT → AiMesh → Remove and Re-add node</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--text-primary)]">RT-AX86U</td>
                  <td className="px-3 py-2">IPv6 conflict causing false WAN failure indicator</td>
                  <td className="px-3 py-2">Disable IPv6 under WAN → IPv6, then re-enable and set to Passthrough</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HardwareFailureCard
            brandName="ASUS"
            indicators={hardwareIndicators}
            replacementAdvice="ASUS routers older than 6 years on the RT-AC platform may no longer receive firmware security patches. If persistent red-light failures persist across multiple ISP environments and power supplies, hardware degradation — particularly WAN PHY chip failure or power regulator failure — is the most likely cause. Upgrading to a current-gen RT-AX or ZenWiFi AX model provides both reliability and Wi-Fi 6 performance improvements."
          />

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Internal Links for ASUS Troubleshooting</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If your ASUS router keeps rebooting (not just showing red), read <a href="/asus-router-keeps-restarting" className="text-[var(--brand-400)] hover:underline">ASUS Router Keeps Restarting</a>.</li>
              <li>Optimize DNS for your ASUS router at <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet</a>.</li>
              <li>If your modem Online light is also blinking, see <a href="/modem-online-light-blinking" className="text-[var(--brand-400)] hover:underline">Modem Online Light Blinking Fix</a>.</li>
              <li>Change DNS directly in your ASUS router using the guide at <a href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline">How to Change DNS on Router</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
