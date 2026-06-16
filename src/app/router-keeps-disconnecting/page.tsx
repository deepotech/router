import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Router Keeps Disconnecting? 14 Expert Fixes for Unstable Internet",
  description:
    "Is your router keeps disconnecting from the internet every few minutes? Diagnose Wi-Fi interference, ISP line instability, DHCP lease failures, overheating, firmware bugs, and mesh roaming drops with our expert technical guide.",
  canonical: "/router-keeps-disconnecting",
  keywords: [
    "router keeps disconnecting",
    "internet disconnects randomly",
    "wifi disconnects every few minutes",
    "router keeps losing connection",
    "unstable internet connection",
    "router dropping internet",
    "wifi keeps cutting out",
    "router disconnects periodically",
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "Router Keeps Disconnecting", url: "/router-keeps-disconnecting" },
];

const troubleshootingSteps = [
  {
    title: "Identify Disconnection Pattern via Router Logs",
    description:
      "Log into your router admin panel (typically 192.168.1.1 or 192.168.0.1) and navigate to the System Log or Event Log section. Look for recurring WAN disconnect events, DHCP lease expiry notices, or PHY link-down events. Timestamps on these events will reveal whether disconnections are periodic (suggesting DHCP lease renewal failures) or random (suggesting RF interference or thermal throttling).",
    tip: "Export the log as a text file and search for keywords like 'WAN disconnect', 'link down', 'DHCP timeout', or 'pppoe lost' to quickly identify the failure pattern.",
  },
  {
    title: "Test Physical Coaxial or DSL Line Quality",
    description:
      "Examine the physical cable from your modem to the wall outlet. Coaxial cables with corroded F-connectors, sharp bends, or water ingress at external junction boxes cause signal-to-noise ratio (SNR) degradation. On DSL connections, excessive line attenuation (above 45 dB) will cause frequent PPPoE session drops. Request your ISP to check line attenuation and power level readings remotely via their NOC tools.",
    tip: "On cable modems, navigate to the modem's diagnostic page (usually at 192.168.100.1) and check downstream SNR. Values below 30 dB indicate a problematic coaxial signal path.",
  },
  {
    title: "Change Wireless Channel and Band to Reduce RF Interference",
    description:
      "Open your router admin panel, navigate to Wireless Settings, and switch from 'Auto' channel selection to a specific non-overlapping channel. For 2.4 GHz, use channels 1, 6, or 11. For 5 GHz, choose channels above 100 to avoid DFS radar conflicts. Scan the RF environment using a Wi-Fi analyzer app to identify which channels are congested by neighboring networks.",
    tip: "Enable 802.11ax (Wi-Fi 6) or 802.11ac band steering if your router supports it. Devices on 5 GHz experience far less interference from neighboring networks than on 2.4 GHz.",
  },
  {
    title: "Check Router Temperature and Improve Ventilation",
    description:
      "Place the router in an open, elevated, well-ventilated area away from direct sunlight, carpet, and enclosed cabinets. Overheating causes the SoC (System on Chip) to throttle CPU clock speeds, leading to dropped packet processing and WAN disconnections. Many consumer routers have no thermal sensor alerts — overheating will silently degrade network performance before causing crashes.",
    tip: "Use an infrared thermometer to measure the router chassis temperature. Temperatures above 55°C indicate a ventilation problem. If the heatsink compound on older routers has dried out, consider replacing it.",
  },
  {
    title: "Update Router Firmware to Latest Stable Release",
    description:
      "Outdated firmware contains unresolved memory leaks, WAN session management bugs, and Wi-Fi driver stability issues. Log into your router admin panel, navigate to Administration or Firmware Update, and check for available updates. Download only from the official manufacturer website to avoid firmware corruption. After updating, perform a factory reset and reconfigure from scratch rather than restoring a backup.",
    tip: "Check the router manufacturer's release notes before updating. Some beta firmware versions introduce more instability than they resolve. Always use stable release branches for production networks.",
  },
  {
    title: "Fix DHCP Lease Renewal Failures on WAN Interface",
    description:
      "For PPPoE connections, the router must re-authenticate with the ISP's RADIUS server every few hours. If the router's PPPoE client library has a bug, it may fail to renew the session silently. For DHCP WAN connections, the router must send a DHCP Renew packet to the ISP before the lease expiry. Navigate to WAN settings and manually set the DHCP client lease renewal interval to 50% of the total lease time. Also, ensure the DNS servers specified are valid (use 8.8.8.8 or 1.1.1.1 as fallback).",
    tip: "If your ISP uses PPPoE, check the 'Keep Alive' or 'Reconnect on Demand' setting in WAN configuration. Setting the Keep Alive interval to 30 seconds prevents sessions from timing out silently.",
  },
  {
    title: "Resolve Mesh Network Wi-Fi Roaming Conflicts",
    description:
      "In mesh Wi-Fi systems, when a client device moves between access points, the 802.11r (Fast BSS Transition) protocol manages the handoff. If 802.11r is misconfigured or disabled, roaming causes a full de-authentication and re-association cycle that can take 3-10 seconds, appearing as a disconnection. Ensure all mesh nodes run identical SSID and security settings, and verify that 802.11r Fast Roaming is enabled in the mesh system settings.",
    tip: "Disable 'Band Steering' temporarily to verify if cross-band handoff between 2.4 GHz and 5 GHz is causing the disconnection symptoms on mobile devices.",
  },
  {
    title: "Disable Power-Saving Modes on Network Adapters",
    description:
      "Windows and Linux operating systems include power management settings that allow the OS to suspend the network adapter during idle periods to save battery. This causes periodic disconnections that appear identical to ISP-side issues. In Windows Device Manager, navigate to Network Adapters, right-click your Wi-Fi or Ethernet adapter, select Properties, go to the Power Management tab, and uncheck 'Allow the computer to turn off this device to save power'.",
    tip: "On laptops, also navigate to Control Panel → Power Options → Change Plan Settings → Change Advanced Power Settings → Wireless Adapter Settings → Power Saving Mode and set it to Maximum Performance.",
  },
];

const faqs = [
  {
    question: "Why does my router disconnect from the internet every few minutes?",
    answer:
      "Periodic disconnections every few minutes are most commonly caused by DHCP or PPPoE WAN lease renewal failures, Wi-Fi channel interference from neighboring networks, or router overheating triggering thermal throttling. Check your router's event log for WAN disconnect timestamps and correlate them with the interval between disconnections. If disconnections are exactly periodic (e.g., every 60 minutes), it is almost certainly a WAN lease renewal failure. If they are random, interference or thermal issues are more likely.",
  },
  {
    question: "Can Wi-Fi interference cause a router to completely lose internet?",
    answer:
      "Yes. Severe 2.4 GHz RF interference from neighboring networks, cordless phones, Bluetooth devices, or microwave ovens can saturate the wireless channel. When channel utilization exceeds 85%, packet collision rates rise dramatically, causing TCP connections to time out and WAN sessions to drop. Switching to 5 GHz or 6 GHz and selecting a dedicated, clear channel dramatically reduces this issue.",
  },
  {
    question: "How do I tell if my ISP line is causing my router to disconnect?",
    answer:
      "Connect a device directly to the modem via Ethernet cable, bypassing the router, and monitor for disconnections. If disconnections persist, the fault is with the ISP line or modem. On cable connections, access the modem's diagnostic page (often at 192.168.100.1) and check downstream SNR values — anything below 30 dB indicates a line quality problem. Report these modem diagnostics to your ISP's technical support team as evidence.",
  },
  {
    question: "Why does my router keep disconnecting at night?",
    answer:
      "Nighttime disconnections are frequently caused by ISP network congestion or scheduled maintenance on your ISP's backbone. During peak hours (8 PM to midnight), overloaded CMTS or DSLAM nodes can drop customer sessions. Alternatively, many routers run scheduled background tasks at night, such as firmware update checks or DDNS renewal, which can briefly drop the WAN session. Check the router's log timestamps to confirm the exact cause.",
  },
  {
    question: "Can a bad DNS server cause internet disconnections?",
    answer:
      "A failed DNS server does not cause physical disconnections, but it makes all internet access appear to fail because domain names cannot be resolved to IP addresses. This is frequently misidentified as a router disconnection. Change your router's DNS settings to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google) and restart the DNS client service on your devices. If connectivity is restored, the original DNS server was the problem.",
  },
  {
    question: "Does router overheating cause internet disconnections?",
    answer:
      "Yes. When a router's System on Chip (SoC) temperature exceeds safe operating thresholds (typically above 85°C internally), it reduces processing speed to prevent permanent damage. This thermal throttling reduces packet processing capacity, causing bufferbloat, high latency, and eventual WAN session drops. Fanless consumer routers are particularly vulnerable when placed in enclosed spaces or stacked with other electronics.",
  },
  {
    question: "Why does my mesh Wi-Fi keep disconnecting when I walk between rooms?",
    answer:
      "This is a roaming handoff failure. When a client device moves out of range of one mesh node and into another, the 802.11r Fast BSS Transition protocol should handle the handoff seamlessly. If 802.11r is disabled or the two nodes have different security settings, the client must perform a full 802.11 re-authentication cycle, which takes 3-10 seconds and appears as a disconnection. Enable 802.11r in your mesh system settings and verify all nodes share identical SSID and WPA3/WPA2 configurations.",
  },
  {
    question: "Should I replace my router if it keeps disconnecting after all fixes?",
    answer:
      "If you have replaced the coaxial or DSL cable, updated firmware, performed a factory reset, resolved interference, and the router still disconnects frequently, the hardware is likely failing. Symptoms of hardware failure include: daily disconnections requiring a power cycle, extremely hot chassis, inability to hold WAN DHCP leases for more than 24 hours, and reverting settings after reboots. A router older than 5-7 years may no longer receive firmware security patches and should be replaced regardless.",
  },
  {
    question: "Can too many connected devices cause a router to disconnect?",
    answer:
      "Consumer-grade routers have CPU and RAM limits that govern how many simultaneous NAT translation table entries they can maintain. Connecting more than 50-60 active devices can exhaust the NAT connection table or the router's RAM, causing it to drop existing sessions. This is especially problematic in homes with many IoT devices, smart TVs, and multiple users streaming simultaneously. Upgrading to a router with higher RAM (512 MB or more) and a multi-core processor resolves this.",
  },
  {
    question: "How does the 802.11r Fast Roaming standard prevent Wi-Fi disconnections?",
    answer:
      "IEEE 802.11r (Fast BSS Transition) pre-authenticates a client device with neighboring access points before the device physically moves out of the current AP's range. This creates a pre-established security context at the new AP. When the device roams, it needs to exchange only two frames to complete the transition instead of a full authentication cycle, reducing handoff time from several seconds to under 50 milliseconds — effectively making the roaming event invisible to active connections.",
  },
];

const commonCauses = [
  {
    title: "RF Channel Interference",
    desc: "Neighboring Wi-Fi networks, Bluetooth devices, and 2.4 GHz appliances saturate the wireless channel, causing packet collisions and TCP session timeouts.",
  },
  {
    title: "WAN DHCP or PPPoE Lease Expiry",
    desc: "The router's WAN client fails to renew its IP lease or PPPoE session before expiry, causing an internet blackout until the connection is re-established.",
  },
  {
    title: "Router Thermal Throttling",
    desc: "Overheating of the SoC processor forces clock speed reductions, degrading packet processing capacity and eventually dropping WAN sessions.",
  },
  {
    title: "Firmware Memory Leaks",
    desc: "Bugs in the router's WAN management daemon or Wi-Fi driver cause gradual RAM depletion, eventually crashing the network stack and requiring a reboot.",
  },
  {
    title: "ISP Line Signal Degradation",
    desc: "Corroded coaxial connectors, high DSL attenuation, or poor fiber splice quality cause SNR drops that trigger the modem to drop its WAN session.",
  },
  {
    title: "Mesh Roaming Handoff Failure",
    desc: "Misconfigured 802.11r Fast BSS Transition causes full re-authentication cycles during roaming events, creating multi-second disconnections on mobile devices.",
  },
];

const quickFixChecklist = [
  "Log into the router admin panel and check System Log for WAN disconnect events.",
  "Check the router's physical placement — ensure it is in an open, ventilated area.",
  "Switch Wi-Fi to 5 GHz band and set a manual non-overlapping channel (e.g., channel 36 or 149).",
  "Update router firmware to the latest stable release from the manufacturer's website.",
  "Disable power management on the network adapter in Windows Device Manager.",
  "Run 'ipconfig /release' and 'ipconfig /renew' to force a fresh DHCP negotiation.",
  "Enable PPPoE Keep Alive (30-second interval) in WAN settings if using PPPoE.",
  "Change DNS to 1.1.1.1 and 8.8.8.8 in router LAN settings to rule out DNS failures.",
];

export default function RouterKeepsDisconnectingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Router Keeps Disconnecting? 14 Expert Fixes for Unstable Internet"
      intro="If your router keeps disconnecting from the internet every few minutes, the cause could be RF channel interference, ISP line instability, DHCP WAN lease renewal failures, router overheating, firmware bugs, or mesh Wi-Fi roaming conflicts. This guide covers every major disconnection root cause with technically precise diagnostic steps and fix procedures."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "ISP Line Fault Warning",
        text: "Before adjusting router settings, bypass your router by connecting a device directly to the modem via Ethernet. If disconnections persist without the router in the path, your ISP line or modem hardware is the root cause — no amount of router configuration will resolve this. Report the modem diagnostic page readings (SNR, power levels, uncorrected errors) to your ISP.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if: your modem's downstream SNR is below 30 dB on cable or line attenuation exceeds 45 dB on DSL; your modem logs show frequent T3/T4 timeout errors on DOCSIS; disconnections persist after bypassing the router; your ISP's network operations center confirms active outages or node congestion in your area. ISPs have remote access to modem diagnostic data and can often identify physical line faults without dispatching a technician."
      severityLevel="high"
    >
      <div className="space-y-6">
        {/* Quick AI Answer Box */}
        <section
          className="glass-card p-5 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer Summary"
        >
          <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h2 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">
            Quick Diagnostic Summary
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            A router that keeps disconnecting has one of three root causes:{" "}
            <strong>ISP line instability</strong> (test by bypassing the router),{" "}
            <strong>Wi-Fi RF interference</strong> (switch to 5 GHz, set a fixed channel), or{" "}
            <strong>WAN session management bugs</strong> (update firmware, enable PPPoE keep-alive). Check
            the router log for WAN disconnect timestamps. If disconnections are exactly periodic, a DHCP or
            PPPoE lease renewal failure is the cause. If they are random, interference or thermal throttling
            is responsible.
          </p>
        </section>

        {/* Interactive Troubleshooting Wizard */}
        <ConnectionOptimizerClient mode="ethernet-no-internet" />

        {/* Technical Article Body */}
        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">

          {/* Symptoms Table */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Disconnection Symptoms Diagnostic Matrix
          </h2>
          <p>
            Different disconnection patterns point to different root causes. Use this matrix to map your
            observed symptom to the most probable technical fault:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Symptom</th>
                  <th className="px-3 py-2 text-left">Most Likely Cause</th>
                  <th className="px-3 py-2 text-left">Severity</th>
                  <th className="px-3 py-2 text-left">Fastest Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Disconnects every 30-60 min exactly</td>
                  <td className="px-3 py-2">DHCP WAN lease renewal failure or PPPoE session timeout</td>
                  <td className="px-3 py-2">High</td>
                  <td className="px-3 py-2">Enable PPPoE Keep Alive; manually set DHCP renewal interval</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Random disconnections at any time</td>
                  <td className="px-3 py-2">Wi-Fi RF channel interference or ISP line SNR degradation</td>
                  <td className="px-3 py-2">High</td>
                  <td className="px-3 py-2">Switch to 5 GHz; check modem SNR diagnostic page</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Disconnects when moving between rooms</td>
                  <td className="px-3 py-2">Mesh roaming 802.11r Fast BSS Transition failure</td>
                  <td className="px-3 py-2">Medium</td>
                  <td className="px-3 py-2">Enable 802.11r in mesh settings; verify identical SSID on all nodes</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Disconnects during heavy usage</td>
                  <td className="px-3 py-2">Router CPU/RAM overload or thermal throttling</td>
                  <td className="px-3 py-2">High</td>
                  <td className="px-3 py-2">Improve ventilation; upgrade to higher-spec router</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Disconnects worse during peak hours</td>
                  <td className="px-3 py-2">ISP backbone congestion or CMTS node overload</td>
                  <td className="px-3 py-2">Medium</td>
                  <td className="px-3 py-2">Report to ISP with modem log evidence; consider ISP change</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Disconnects after firmware update</td>
                  <td className="px-3 py-2">Firmware bug in WAN daemon or Wi-Fi driver</td>
                  <td className="px-3 py-2">High</td>
                  <td className="px-3 py-2">Roll back firmware to previous stable version</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Disconnects at night only</td>
                  <td className="px-3 py-2">ISP maintenance window or router scheduled tasks</td>
                  <td className="px-3 py-2">Low</td>
                  <td className="px-3 py-2">Disable router scheduled tasks; report ISP maintenance pattern</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Why Routers Disconnect */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Why Routers Disconnect Randomly: The Technical Explanation
          </h2>
          <p>
            A router maintains internet connectivity through a WAN session — either a DHCP lease with the
            ISP, a PPPoE authenticated session, or a static IP binding. When any of these sessions fails to
            renew or is terminated by an external event, the router loses internet access until the session
            is re-established. Understanding why sessions drop is the key to resolving recurring
            disconnections.
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>DHCP WAN Lease Expiry:</strong> ISPs assign routers WAN IP addresses via DHCP with a
              set lease time (often 24 hours or longer). The router must send a DHCP Renew packet before the
              lease expires. If the router's DHCP client is buggy or the ISP's DHCP server rejects the
              renewal (e.g., due to a MAC address change), the router will lose its WAN IP when the lease
              expires.
            </li>
            <li>
              <strong>PPPoE Session Drops:</strong> DSL and fiber connections frequently use PPPoE
              (Point-to-Point Protocol over Ethernet) for authentication. PPPoE sessions must be kept alive
              with periodic echo requests. If the router's PPPoE client misses these keep-alive exchanges
              (due to CPU overload or a firmware bug), the ISP's BRAS (Broadband Remote Access Server) will
              terminate the session, dropping the internet connection.
            </li>
            <li>
              <strong>STP (Spanning Tree) Topology Changes:</strong> In networks with multiple switches or
              wired mesh backhauls, a Spanning Tree Protocol topology change can block network ports for up
              to 30 seconds during convergence. This appears identical to an internet disconnection on
              connected devices.
            </li>
          </ul>

          {/* Wi-Fi Interference Causes */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Wi-Fi Interference: How RF Congestion Causes Disconnections
          </h2>
          <p>
            The 2.4 GHz Wi-Fi band contains only three non-overlapping channels (1, 6, and 11) in the
            standard 20 MHz configuration. In dense urban environments, dozens of neighboring networks may
            share these same channels, creating co-channel interference that degrades packet delivery rates.
          </p>
          <p>
            When channel utilization exceeds 85%, the wireless medium becomes saturated. Devices must wait
            increasingly long periods for a clear channel before transmitting (CSMA/CA — Carrier Sense
            Multiple Access with Collision Avoidance). TCP ACK packets experience delays, causing TCP
            connections to time out. These TCP timeouts manifest as internet disconnections, even though the
            Wi-Fi association itself remains active.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Non-Wi-Fi 2.4 GHz Interference Sources:</strong> Microwave ovens (when in use),
              Bluetooth devices, baby monitors, cordless phones, and Zigbee IoT devices all operate in the
              2.4 GHz band and directly interfere with Wi-Fi traffic.
            </li>
            <li>
              <strong>DFS Radar Events (5 GHz):</strong> If your router uses DFS (Dynamic Frequency
              Selection) channels (channels 52-144 in the 5 GHz band), it is required by law to detect
              radar signals on those channels and vacate them immediately. When radar is detected, the router
              switches channels, causing a brief disconnection (up to 60 seconds) while the new channel is
              selected and clients reconnect.
            </li>
            <li>
              <strong>Adjacent Channel Interference:</strong> Configuring a Wi-Fi network on channel 3 or 9
              in the 2.4 GHz band causes partial overlap with channels 1, 6, or 11, creating adjacent
              channel interference that is harder to diagnose than co-channel interference.
            </li>
          </ul>

          {/* Router Overheating */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Router Overheating: How Thermal Throttling Drops Connections
          </h2>
          <p>
            Consumer-grade routers are designed as always-on appliances with passive cooling systems
            (heatsinks without fans). Their SoC processors are engineered to handle typical household
            traffic loads within a specific thermal envelope. When ambient temperatures rise, or the router
            is placed in a confined space, the SoC temperature increases beyond the safe operating range.
          </p>
          <p>
            Modern SoCs implement thermal throttling: when internal temperature exceeds a threshold
            (typically 75-85°C on consumer routers), the processor reduces its clock frequency to lower
            heat output. This reduces packet processing throughput, increases latency, and can cause WAN
            session management tasks to miss their keep-alive windows, dropping the internet connection.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">Identifying Overheating Symptoms</h3>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>Router chassis is too hot to comfortably touch (typically above 55°C surface temperature)</li>
            <li>Internet speed degrades progressively throughout the day, restoring after the router cools at night</li>
            <li>Router logs show increasing error rates correlating with ambient temperature changes</li>
            <li>Router disconnects during summer months but is stable in winter</li>
            <li>Disconnect frequency increases when multiple devices stream or download simultaneously</li>
          </ul>

          {/* ISP Line Stability */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            ISP Line Stability Issues: Modem Diagnostics and Signal Analysis
          </h2>
          <p>
            Many users assume router disconnections are caused by their router hardware or settings, when the
            actual fault lies in the physical line between the modem and the ISP's central equipment. ISP
            line quality can be measured directly from the modem's diagnostic interface.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">Cable Modem (DOCSIS) Signal Check</h3>
          <p>
            Access your cable modem's diagnostic page (usually at{" "}
            <code className="font-mono">192.168.100.1</code>) and check:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Downstream SNR (Signal-to-Noise Ratio):</strong> Should be above 33 dB for DOCSIS 3.0.
              Values below 30 dB will cause uncorrectable errors and connection drops.
            </li>
            <li>
              <strong>Downstream Power Level:</strong> Should be between -7 dBmV and +7 dBmV. Levels outside
              this range indicate cable plant issues.
            </li>
            <li>
              <strong>Uncorrected Errors (T3/T4 Timeouts):</strong> Any non-zero uncorrected error count
              indicates signal quality problems requiring ISP line maintenance.
            </li>
          </ul>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">DSL Line Quality Metrics</h3>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Line Attenuation:</strong> Should be below 40 dB for stable ADSL2+ or VDSL2. High
              attenuation (above 45 dB) means the copper pair is too long or damaged.
            </li>
            <li>
              <strong>Noise Margin (SNR Margin):</strong> Should be above 6 dB. Margin below 3 dB will cause
              frequent DSL retraining events, each appearing as a disconnection.
            </li>
            <li>
              <strong>DSL Retrains:</strong> Check the DSL modem statistics page for retraining event counts.
              More than one or two retrains per day indicates line instability.
            </li>
          </ul>

          {/* DHCP Lease Renewal */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            DHCP Lease Renewal Failures: The Silent Connection Killer
          </h2>
          <p>
            When ISPs use DHCP to assign WAN IP addresses, the router receives an IP lease with a defined
            expiry time. At 50% of the lease time, the router should send a DHCP Request (Renew) packet to
            the ISP's DHCP server to extend the lease. If this renewal fails, the router enters a Rebinding
            state at 87.5% of the lease time, broadcasting DHCP Discover packets. If all renewal attempts
            fail, the lease expires and the router loses its WAN IP address, disconnecting all internet
            traffic until a new lease is obtained.
          </p>
          <p>
            Common causes of WAN DHCP renewal failures include ISP MAC address filtering (the ISP's DHCP
            server will only renew leases for the registered modem's MAC address), network congestion causing
            the renewal packet to be lost, and router firmware bugs in the DHCP client state machine.
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# Check WAN DHCP lease status on ASUS router via SSH:
nvram get wan0_lease
nvram get wan0_expires

# Force WAN DHCP renewal on OpenWrt:
udhcpc -i eth0.2 -f -q`}
          </pre>

          {/* Firmware Bugs */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Firmware Bugs: How Memory Leaks Cause Progressive Instability
          </h2>
          <p>
            Router firmware consists of a Linux-based operating system running several network daemons:
            hostapd (Wi-Fi management), dnsmasq (DNS/DHCP), pppd (PPPoE), and the WAN client. These
            daemons are compiled for minimal memory footprints on routers with 128-512 MB of RAM. Memory
            leaks in any of these daemons will cause RAM usage to increase over time.
          </p>
          <p>
            As available RAM decreases, the router's kernel triggers the OOM (Out of Memory) killer, which
            terminates background processes to free memory. If the OOM killer terminates a critical network
            daemon (such as hostapd or the WAN client), the Wi-Fi or internet connection will drop until the
            daemon restarts. This produces a characteristic pattern: the router is most stable immediately
            after a reboot and becomes progressively less stable over days or weeks until a reboot is
            required to restore full performance.
          </p>
          <p>
            The fix is updating to the latest stable firmware. If the manufacturer has released no updates
            and memory leaks persist, consider installing open-source alternative firmware such as OpenWrt or
            DD-WRT if your router model is supported.
          </p>

          {/* Mesh Network Roaming */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Mesh Network Roaming Problems and 802.11r Fast BSS Transition
          </h2>
          <p>
            Mesh Wi-Fi systems use multiple access points with a shared SSID to provide seamless whole-home
            coverage. However, seamless roaming depends on correct implementation of the IEEE 802.11r Fast
            BSS Transition (FT) standard. Without 802.11r, each roaming event requires:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>De-authentication:</strong> The client device is disconnected from the current AP.
            </li>
            <li>
              <strong>Probe and Scan:</strong> The device scans all channels for available APs with the same
              SSID.
            </li>
            <li>
              <strong>Association:</strong> The device sends an Association Request to the new AP.
            </li>
            <li>
              <strong>4-Way Handshake:</strong> A full WPA3/WPA2 security handshake is performed to derive
              new session keys.
            </li>
          </ol>
          <p>
            This process takes 3-10 seconds, during which all network traffic is interrupted. Video calls,
            online gaming sessions, and VPN connections will typically time out and drop during this window.
          </p>
          <p>
            With 802.11r enabled, the client pre-authenticates with neighboring APs while still connected
            to the current AP, and the actual roaming transition completes in under 50 milliseconds —
            making the handoff completely invisible to active connections.
          </p>

          {/* Ethernet vs Wi-Fi Diagnosis */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Ethernet vs. Wi-Fi Diagnosis: Isolating the Fault Layer
          </h2>
          <p>
            The most powerful diagnostic step for recurring disconnections is to connect a device via
            Ethernet cable directly to the router's LAN port and monitor for disconnections over 24 hours.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Test Scenario</th>
                  <th className="px-3 py-2 text-left">Result</th>
                  <th className="px-3 py-2 text-left">Confirmed Cause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2">Ethernet direct to router → Stable</td>
                  <td className="px-3 py-2 text-emerald-400">No disconnections</td>
                  <td className="px-3 py-2">Wi-Fi layer fault (interference, driver, or roaming)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Ethernet direct to router → Unstable</td>
                  <td className="px-3 py-2 text-red-400">Disconnections persist</td>
                  <td className="px-3 py-2">WAN layer fault (ISP line, DHCP, PPPoE, or router hardware)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Ethernet direct to modem (bypass router) → Stable</td>
                  <td className="px-3 py-2 text-emerald-400">No disconnections</td>
                  <td className="px-3 py-2">Router hardware or firmware fault</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Ethernet direct to modem (bypass router) → Unstable</td>
                  <td className="px-3 py-2 text-red-400">Disconnections persist</td>
                  <td className="px-3 py-2">ISP line or modem hardware fault — contact ISP</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Windows Troubleshooting Commands */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Windows Troubleshooting Commands for Disconnection Diagnosis
          </h2>
          <p>
            Use these Windows commands to diagnose network instability at the OS level. Run all commands in
            an elevated Command Prompt or PowerShell session (Run as Administrator):
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">1. Continuous Ping to Gateway (Monitor Drop Rate)</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            ping -t 192.168.1.1
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Run a continuous ping to your gateway (use your actual gateway IP from ipconfig). Count dropped
            packets and note timestamps. If pings drop while physically connected via Ethernet, the WAN is
            dropping. If pings drop only on Wi-Fi, the fault is in the wireless layer.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">2. Traceroute to Detect Routing Failures</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            tracert 8.8.8.8
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Traceroute reveals at which network hop (your router, your ISP's first node, or further upstream)
            packets are being dropped. If the first hop (your router) responds but the second hop (ISP) shows
            asterisks (*), the ISP line is the fault point.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">3. Reset Network Stack (Winsock + IP)</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /flushdns
ipconfig /renew`}
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            This sequence resets the entire Windows network stack. Winsock reset removes third-party LSP
            drivers. IP reset restores default TCP/IP registry settings. The ipconfig sequence clears stale
            DHCP bindings and DNS cache. A system restart is required after running these commands.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">4. View Network Event History in PowerShell</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`Get-WinEvent -LogName "Microsoft-Windows-NetworkProfile/Operational" |
  Where-Object { $_.Id -eq 10000 -or $_.Id -eq 10001 } |
  Select-Object TimeCreated, Message |
  Format-List`}
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            This PowerShell command retrieves Windows network connect (Event ID 10000) and disconnect (Event
            ID 10001) events with precise timestamps. Compare these timestamps against your router's system
            log to correlate Windows-detected disconnections with router-side events.
          </p>

          {/* Router Log Analysis */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Router Log Analysis: Reading WAN Disconnect Events
          </h2>
          <p>
            Router system logs record every network event with timestamps. Learning to interpret common log
            entries is essential for accurate diagnosis:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>
                <code className="font-mono">WAN link down / WAN disconnected</code>:
              </strong>{" "}
              The router's WAN port has lost physical link or the ISP session has been terminated. This
              indicates a physical cable issue, modem fault, or ISP-side session termination.
            </li>
            <li>
              <strong>
                <code className="font-mono">DHCP lease expired / failed to renew</code>:
              </strong>{" "}
              The router could not extend its WAN IP lease before it expired. The router will reconnect
              automatically, but there will be a gap in internet access during re-negotiation.
            </li>
            <li>
              <strong>
                <code className="font-mono">LCP echo timeout / PPPoE session closed</code>:
              </strong>{" "}
              The PPPoE Link Control Protocol keep-alive exchange failed, causing the ISP's BRAS to
              terminate the authenticated session.
            </li>
            <li>
              <strong>
                <code className="font-mono">hostapd: deauthentication (reason code 3)</code>:
              </strong>{" "}
              A Wi-Fi client was deauthenticated (reason code 3 = Station is leaving). This can indicate
              a client roaming event or a forced disassociation due to Wi-Fi driver errors.
            </li>
            <li>
              <strong>
                <code className="font-mono">kernel: eth0: link down / PHY reset</code>:
              </strong>{" "}
              The physical Ethernet port's PHY chip has reset. This can be caused by cable issues, a
              failing switch port on the router, or electrical interference.
            </li>
          </ul>

          {/* When to Replace */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            When To Replace Your Router
          </h2>
          <p>
            Configuration and firmware fixes can resolve most disconnection issues. However, hardware
            degradation eventually makes replacement the only viable option:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Daily Power Cycles Required:</strong> The router must be physically rebooted every
              day to restore internet connectivity, indicating RAM memory leaks that cannot be resolved
              through firmware updates.
            </li>
            <li>
              <strong>Router Age Over 5-7 Years:</strong> Older routers no longer receive firmware security
              patches and lack support for modern Wi-Fi standards (Wi-Fi 6E, WPA3). Security
              vulnerabilities in unpatched firmware can allow unauthorized remote access.
            </li>
            <li>
              <strong>No Manufacturer Firmware Support:</strong> If the manufacturer has discontinued
              firmware updates for your router model, security vulnerabilities will accumulate over time.
            </li>
            <li>
              <strong>Excessive Heat Under Light Load:</strong> If the router chassis is extremely hot even
              with minimal connected devices, the thermal design has degraded and will only worsen over time.
            </li>
            <li>
              <strong>Settings Revert After Reboot:</strong> If custom configurations (DNS, port forwarding,
              DHCP reservations) revert to factory defaults after a reboot, the NVRAM (non-volatile memory)
              storage has failed.
            </li>
          </ul>

          {/* Internal links */}
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Related Guides &amp; Tools</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>
                If your connection drops due to IP address issues, see our{" "}
                <a href="/router-not-assigning-ip-addresses" className="text-[var(--brand-400)] hover:underline">
                  DHCP IP Assignment Failure Fix Guide
                </a>
                .
              </li>
              <li>
                If your gateway shows as unavailable, follow our{" "}
                <a href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">
                  Default Gateway Not Available Resolution Guide
                </a>
                .
              </li>
              <li>
                Optimize your DNS to prevent resolution-related disconnection symptoms with our{" "}
                <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">
                  Best DNS Server Speed Guide
                </a>
                .
              </li>
              <li>
                Check your WAN IP status with the{" "}
                <a href="/what-is-my-ip" className="text-[var(--brand-400)] hover:underline">
                  IP Address Checker
                </a>
                .
              </li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
