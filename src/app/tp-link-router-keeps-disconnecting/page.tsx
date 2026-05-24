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
  title: "TP-Link Router Keeps Disconnecting? Full Fix Guide (2026)",
  description:
    "TP-Link Archer or Deco dropping Wi-Fi constantly? Diagnose Smart Connect band-steering bugs, DHCP lease conflicts, firmware memory leaks, and DFS channel collisions.",
  canonical: "/tp-link-router-keeps-disconnecting",
  keywords: [
    "tp-link router keeps disconnecting",
    "tp-link wifi dropping",
    "archer wifi disconnects",
    "tp-link smart connect problem",
    "deco mesh disconnecting",
    "tp-link dhcp lease issue",
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "TP-Link Disconnecting", url: "/tp-link-router-keeps-disconnecting" },
];

const troubleshootingSteps = [
  {
    title: "Disable Smart Connect and Separate 2.4 / 5 GHz SSIDs",
    description:
      "Log into the TP-Link admin portal at http://192.168.0.1 or http://tplinkwifi.net. Navigate to Wireless → Basic Settings and disable Smart Connect. Create separate 2.4 GHz (e.g. HomeNet_2G) and 5 GHz (e.g. HomeNet_5G) networks. This prevents erratic band-steering from dropping clients mid-session.",
    tip: "Smart Connect's automatic steering algorithm attempts to shift devices between bands based on signal strength, but triggers brief disconnections during the switch.",
  },
  {
    title: "Force a Fixed Wi-Fi Channel (Avoid Auto / DFS Channels)",
    description:
      "In Wireless → Advanced Settings, change Channel Selection from Auto to a fixed non-DFS channel: Channel 6 for 2.4 GHz, and Channel 36, 40, 149, or 153 for 5 GHz. DFS channels (52–140) force radar detection events, causing the radio to pause for up to 60 seconds.",
    tip: "Dynamic Frequency Selection (DFS) radar events appear as complete, unexplained 30–60 second Wi-Fi outages, indistinguishable from disconnection bugs.",
  },
  {
    title: "Increase DHCP Lease Duration & Expand Lease Pool",
    description:
      "Navigate to Advanced → Network → DHCP Server. Increase the IP lease time from the default 120 minutes to 1440 minutes (24 hours). Also widen the IP pool start/end range to ensure enough leases for all connected clients.",
    tip: "When the DHCP pool is exhausted or lease time is too short, clients fail to renew their IP in time and drop silently off the network.",
  },
  {
    title: "Update Firmware via TP-Link Admin Panel",
    description:
      "Navigate to Advanced → System Tools → Firmware Upgrade. Click Check for Upgrades. If a new build is available, click Upgrade. For Deco systems, open the Deco App → More → Update Deco.",
    tip: "TP-Link Archer V1 and V2 chipsets had known memory-leak bugs in firmware builds below 1.3.0 that caused the wireless daemon to crash silently every 6–18 hours.",
  },
  {
    title: "Disable IGMP Snooping and IGMP Proxying",
    description:
      "Under Advanced → Network → IGMP Snooping, disable both IGMP Snooping and IGMP Proxy. On some Archer models, this multicast optimization interferes with client keepalives, triggering spurious disconnections.",
  },
];

const faqs = [
  {
    question: "Why does my TP-Link router disconnect every few hours at the exact same time?",
    answer:
      "Timed disconnections are caused by DHCP lease expiration, scheduled firmware check routines, or the wireless driver restarting on a fixed cycle. Increasing the DHCP lease duration to 24 hours and disabling automatic firmware check cron jobs in the router's task scheduler usually resolves this completely.",
  },
  {
    question: "Does TP-Link Smart Connect cause disconnections?",
    answer:
      "Yes. Smart Connect's band-steering engine continuously monitors client RSSI values and forces connected devices to switch between 2.4 GHz and 5 GHz bands when signal thresholds are crossed. Each switch causes a brief disconnection, typically lasting 1–5 seconds. On poorly optimized Archer models, this switching loop can become aggressive and continuous.",
  },
  {
    question: "Why does my TP-Link Deco mesh node keep disconnecting one area?",
    answer:
      "Deco nodes lose connectivity when the wireless backhaul channel between the main Deco unit and the satellite node becomes overloaded or switches to an incompatible channel. In a tri-band Deco, ensure the dedicated backhaul band is active and the satellite node is placed within 40 feet with no more than one wall between units.",
  },
  {
    question: "How do I check if TP-Link firmware is causing my disconnection issue?",
    answer:
      "Navigate to Advanced → System Tools → System Log inside the TP-Link admin portal. Filter for 'WLAN' or 'DHCP' events. If you see periodic 'WLAN driver restarted' or 'DHCP pool full' entries at the same intervals as disconnections, a firmware bug is likely responsible.",
  },
  {
    question: "What does '169.254.x.x IP address' mean on a TP-Link connected device?",
    answer:
      "A 169.254.x.x address is an APIPA (Automatic Private IP Addressing) fallback. It means the client device could not obtain an IP address from the TP-Link router's DHCP server, typically because the pool was full, the lease was denied, or the router daemon was temporarily unresponsive.",
  },
];

const commonCauses = [
  {
    title: "Smart Connect Band-Steering",
    desc: "Archer's automatic 2.4/5 GHz steering algorithm forcing devices across bands, causing brief but repetitive disconnections.",
  },
  {
    title: "DFS Radar Events",
    desc: "Auto-selected DFS channels (52–140 on 5 GHz) triggering radar avoidance pauses, causing 30–60 second silent outages.",
  },
  {
    title: "DHCP Pool Exhaustion",
    desc: "Short default lease times combined with many connected smart home devices draining the 150-address default pool.",
  },
  {
    title: "Wireless Daemon Memory Leak",
    desc: "Older Archer chipset firmware builds accumulating kernel heap usage until the wireless stack crashes and restarts.",
  },
];

const quickFixChecklist = [
  "Disable Smart Connect and create separate 2.4 GHz and 5 GHz SSIDs.",
  "Fix Wi-Fi channel to non-DFS: Channel 6 (2.4 GHz) or Channel 36/149 (5 GHz).",
  "Increase DHCP lease time to 1440 minutes in DHCP Server settings.",
  "Check TP-Link firmware version and upgrade via Advanced → System Tools.",
  "Disable IGMP Snooping and IGMP Proxy under Advanced → Network.",
];

const hardwareIndicators = [
  {
    component: "Wireless SoC",
    failureSign: "Disconnections every 2–4 hours despite firmware updates",
    severity: "high" as const,
    action: "Router SoC is likely overheating; add external airflow or replace unit.",
  },
  {
    component: "Power Adapter",
    failureSign: "Disconnections correlate with heavy downloads or peak hours",
    severity: "high" as const,
    action: "Test with a matching-voltage replacement power brick (12V/1.5A).",
  },
  {
    component: "Flash Storage",
    failureSign: "Firmware upgrade fails or settings reset after power cycle",
    severity: "medium" as const,
    action: "NVRAM corruption; perform full factory reset and reflash firmware.",
  },
  {
    component: "LAN Capacitors",
    failureSign: "Router is over 5 years old and disconnects only during warm weather",
    severity: "medium" as const,
    action: "Aging capacitors lose ripple-voltage stability; router replacement recommended.",
  },
];

export default function TpLinkRouterKeepsDisconnectingPage() {
  return (
    <TroubleshootingArticleShell
      h1="TP-Link Router Keeps Disconnecting? Full Fix Guide (2026)"
      intro="Is your TP-Link Archer, Deco, or TL-series router dropping Wi-Fi repeatedly? Discover the exact root causes — from Smart Connect band-steering loops and DFS radar avoidance events, to DHCP lease exhaustion and firmware memory leaks — and resolve them permanently."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Firmware Upgrade Risk Notice",
        text: "Before upgrading TP-Link firmware, export your current configuration file via Advanced → System Tools → Backup & Restore. A failed or interrupted firmware flash can corrupt the bootloader partition, requiring a TFTP recovery procedure.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if disconnections happen simultaneously across all devices including those connected via Ethernet, and if your router's WAN status page shows the public IP dropping. This indicates an upstream DHCP issue on the ISP's CMTS or GPON OLT rather than a local TP-Link router fault."
      severityLevel="medium"
    >
      <div className="space-y-6">
        {/* Brand Badge */}
        <BrandRouterBadge
          brandName="TP-Link"
          seriesLabel="Archer / Deco / TL-Series"
          accentColor="blue"
          icon="wifi"
        />

        {/* Quick Answer AI Snippet */}
        <section
          className="glass-card p-5 border border-blue-950/20 bg-blue-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer Summary"
        >
          <div className="absolute top-0 right-0 bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wide">
            Quick Diagnostic Summary
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li>
              <strong>Symptoms:</strong> TP-Link Wi-Fi disconnects every few hours, specific rooms lose signal repeatedly, or all devices drop at the same scheduled time.
            </li>
            <li>
              <strong>Most Likely Cause:</strong> Smart Connect band-steering forcing clients to switch bands, a DFS radar avoidance event on auto-selected channels, or a DHCP pool exhaustion cycle.
            </li>
            <li>
              <strong>Fastest Safe Fix:</strong> Disable Smart Connect, set a fixed non-DFS 5 GHz channel (36 or 149), and increase the DHCP lease time to 1440 minutes.
            </li>
          </ul>
        </section>

        <ConnectionOptimizerClient mode="wifi-signal" />

        {/* ISP escalation banner */}
        <ISPWarningBanner
          title="ISP-Side Line Instability Detection"
          body="If TP-Link disconnections coincide with your modem's WAN or Online LED blinking, the root cause is upstream at your ISP's node — not inside the TP-Link router. Ask your ISP to run a line audit for T3/T4 upstream timeout events or GPON optical signal degradation."
          variant="info"
          escalationSteps={[
            "Check your modem's Event Log for T3 or T4 timeout entries during the disconnection window.",
            "Request an 'RF line audit' or 'ONT telemetry check' from ISP level-2 support.",
            "Ask the ISP to verify if the local cable node is operating with high ingress noise.",
          ]}
        />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Symptoms vs. Root Causes — TP-Link Disconnection Diagnostic Table
          </h2>
          <p>
            Use this table to immediately match the disconnection pattern you observe with its underlying
            network protocol or hardware fault:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Disconnection Pattern</th>
                  <th className="px-3 py-2 text-left">Root Protocol / Hardware Cause</th>
                  <th className="px-3 py-2 text-left">Affected TP-Link Models</th>
                  <th className="px-3 py-2 text-left">Fix Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2">Drops every 2 hours on the dot</td>
                  <td className="px-3 py-2">DHCP lease expiry not renewing (short 120-min default)</td>
                  <td className="px-3 py-2">All Archer and TL models</td>
                  <td className="px-3 py-2 text-red-400 font-bold">High</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">30–60 second blackout, then reconnects automatically</td>
                  <td className="px-3 py-2">DFS radar avoidance channel switch on 5 GHz Auto mode</td>
                  <td className="px-3 py-2">Archer AX, C5400, C3150</td>
                  <td className="px-3 py-2 text-red-400 font-bold">High</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Specific devices disconnect but others stay connected</td>
                  <td className="px-3 py-2">Smart Connect band-steering forcing selective device switches</td>
                  <td className="px-3 py-2">Archer AX series, Deco M9</td>
                  <td className="px-3 py-2 text-amber-400 font-bold">Medium</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">All devices disconnect simultaneously (not the modem)</td>
                  <td className="px-3 py-2">TP-Link wireless daemon crash / kernel memory leak</td>
                  <td className="px-3 py-2">Archer C7 V1/V2, TL-WR940N</td>
                  <td className="px-3 py-2 text-red-400 font-bold">High</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Mesh satellite drops then reconnects every few minutes</td>
                  <td className="px-3 py-2">Deco wireless backhaul channel collision or weak RSSI</td>
                  <td className="px-3 py-2">Deco XE75, M5, X60</td>
                  <td className="px-3 py-2 text-amber-400 font-bold">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            What Happens Internally When a TP-Link Router Drops Wi-Fi?
          </h2>
          <p>
            TP-Link consumer routers (Archer series) run a customized version of the{" "}
            <strong>OpenWrt-derived Linux kernel</strong> on Qualcomm Atheros (QCA) or MediaTek (MT) chipsets. The wireless subsystem is managed by the <code>hostapd</code> daemon for AP management and the <code>wpad</code> supplicant for client authentication.
          </p>
          <p>
            When a disconnection occurs, one of three internal events is typically responsible:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Deauthentication Frame:</strong> The router sends an IEEE 802.11 Deauthentication frame to clients, forcibly ending the wireless association. This is what Smart Connect triggers when it wants to move a client from 5 GHz to 2.4 GHz.
            </li>
            <li>
              <strong>Channel Change Event:</strong> When DFS detects a radar signal on the current channel, the regulatory framework forces the router to vacate the frequency within 10 seconds and select a new one. During channel scanning, no clients can transmit data.
            </li>
            <li>
              <strong>DHCP Lease Renewal Failure:</strong> At the midpoint of a lease's expiry time, clients attempt to renew their IP by sending a DHCP Request unicast to the router. If the DHCP daemon is busy or the pool is exhausted, the renewal fails silently, and clients enter a 169.254.x.x fallback state, severing internet access while showing as "connected" to Wi-Fi.
            </li>
          </ol>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            TP-Link Firmware UI Paths — Exact Navigation Reference
          </h2>
          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">
            Archer Series (Standard Web Interface)
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-[11px] text-[var(--text-muted)]">
            <li><strong>Admin login:</strong> <code>http://192.168.0.1</code> or <code>http://tplinkwifi.net</code></li>
            <li><strong>Disable Smart Connect:</strong> <code>Wireless → Basic Settings → Toggle Smart Connect OFF</code></li>
            <li><strong>Fix Channel:</strong> <code>Wireless → Advanced Settings → Channel → Select 6 (2.4G) or 36/149 (5G)</code></li>
            <li><strong>DHCP Lease Time:</strong> <code>Advanced → Network → DHCP Server → IP Lease Time</code></li>
            <li><strong>Firmware Upgrade:</strong> <code>Advanced → System Tools → Firmware Upgrade → Check for Upgrades</code></li>
            <li><strong>System Log:</strong> <code>Advanced → System Tools → System Log</code></li>
          </ul>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase mt-4">
            Deco Mesh System (Mobile App Configuration)
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-[11px] text-[var(--text-muted)]">
            <li><strong>Backhaul check:</strong> Deco App → <code>More → Wi-Fi → Network Mode → Select Auto-Band or Fixed 5 GHz backhaul</code></li>
            <li><strong>Deco firmware update:</strong> Deco App → <code>More → Update Deco</code></li>
            <li><strong>Reset Deco node:</strong> Hold physical reset button for 5 seconds until LED turns amber/red</li>
          </ul>

          {/* Hardware Failure Card */}
          <HardwareFailureCard
            brandName="TP-Link"
            indicators={hardwareIndicators}
            replacementAdvice="If your TP-Link Archer router is more than 5 years old, experiences persistent disconnections across all firmware versions, and exhibits excessive heat at the chassis, the internal QCA SoC is likely experiencing accelerated silicon degradation. A modern Wi-Fi 6 (802.11ax) dual-band router with active heat dissipation offers a cost-effective path forward compared to continued repairs."
          />

          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Beginner vs. Advanced Fix Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Fix Method</th>
                  <th className="px-3 py-2 text-left">Difficulty</th>
                  <th className="px-3 py-2 text-left">Time Required</th>
                  <th className="px-3 py-2 text-left">Risk Level</th>
                  <th className="px-3 py-2 text-left">Effectiveness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2">Disable Smart Connect</td>
                  <td className="px-3 py-2 text-emerald-400">Beginner</td>
                  <td className="px-3 py-2">3 min</td>
                  <td className="px-3 py-2 text-emerald-400">None</td>
                  <td className="px-3 py-2">High</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Fix Wi-Fi channel manually</td>
                  <td className="px-3 py-2 text-emerald-400">Beginner</td>
                  <td className="px-3 py-2">5 min</td>
                  <td className="px-3 py-2 text-emerald-400">Very Low</td>
                  <td className="px-3 py-2">High</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Expand DHCP pool and increase lease time</td>
                  <td className="px-3 py-2 text-amber-400">Intermediate</td>
                  <td className="px-3 py-2">5 min</td>
                  <td className="px-3 py-2 text-emerald-400">Low</td>
                  <td className="px-3 py-2">High</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Firmware upgrade via admin panel</td>
                  <td className="px-3 py-2 text-amber-400">Intermediate</td>
                  <td className="px-3 py-2">10 min</td>
                  <td className="px-3 py-2 text-amber-400">Medium (backup first)</td>
                  <td className="px-3 py-2">Very High</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">TFTP recovery firmware flash</td>
                  <td className="px-3 py-2 text-red-400">Advanced</td>
                  <td className="px-3 py-2">30 min</td>
                  <td className="px-3 py-2 text-red-400">High (brick risk)</td>
                  <td className="px-3 py-2">Very High</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Related Diagnostic Pages</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Understand general Wi-Fi disconnection causes at <a href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">WiFi Keeps Disconnecting — Full Guide</a>.</li>
              <li>If the router itself is rebooting (not just dropping Wi-Fi), read <a href="/router-keeps-restarting" className="text-[var(--brand-400)] hover:underline">Router Keeps Restarting</a>.</li>
              <li>Optimize routing performance with our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet Guide</a>.</li>
              <li>If your TP-Link login page times out, see <a href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">Router Login Not Working Fix</a>.</li>
              <li>Check your physical link status with the <a href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Ethernet Connected but No Internet Guide</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
