import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";

export const metadata: Metadata = buildMetadata({
  title: "WiFi Keeps Disconnecting: 12 Proven Fixes (2026 Guide) — RouterVia",
  description:
    "WiFi randomly disconnecting? Fix DHCP lease failures, driver problems, router firmware bugs, mesh roaming failures, channel congestion, and DNS issues with our complete 2026 guide.",
  canonical: "/wifi-keeps-disconnecting",
  keywords: [
    "wifi keeps disconnecting",
    "internet randomly disconnects",
    "wifi dropping",
    "dhcp lease renewal disconnect",
    "wifi driver problems",
    "router firmware bugs",
    "mesh roaming problems",
    "channel congestion fix",
    "unstable connection",
  ],
});

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "WiFi Troubleshooting", url: "/how-to-improve-wifi-signal" },
  { name: "WiFi Keeps Disconnecting", url: "/wifi-keeps-disconnecting" },
];

const troubleshootingSteps = [
  {
    title: "Identify Whether All Devices Drop or Just One",
    description:
      "Open your router admin panel and check the active client list when the disconnection occurs. If all devices disconnect simultaneously, the problem lies at the router or ISP level. If only one device disconnects, the problem is local to that device's wireless network adapter, driver, or OS power settings.",
    tip: "Single-device dropouts almost always indicate a client-side problem: aggressive power management settings, outdated wireless adapter drivers, or band steering conflicts.",
  },
  {
    title: "Disable Smart Connect and Band Steering",
    description:
      "Log into your router admin panel (typically 192.168.1.1 or 192.168.0.1). Navigate to Wireless settings and disable 'Smart Connect' or 'Band Steering'. Give the 2.4GHz and 5GHz bands separate names (SSIDs), such as 'HomeWiFi_2G' and 'HomeWiFi_5G'. Connect your performance-critical devices manually to the 5GHz network.",
    tip: "Smart Connect relies on RSSI comparison algorithms. When you move slightly, the router may forcibly migrate your device between bands, causing a 1–3 second drop during re-association.",
  },
  {
    title: "Increase DHCP Lease Time",
    description:
      "Access your router admin dashboard and navigate to LAN → DHCP Server settings. Find the 'Lease Time' or 'Address Lease Time' option. By default, it may be set to 3600 or 7200 seconds (1–2 hours). Change this value to 86400 seconds (24 hours) or 604800 seconds (7 days). Save and reboot the router.",
    tip: "A short lease time forces devices to renew their IP address frequently. If the renewal request fails due to temporary RF interference, the device loses its IP address and disconnects.",
  },
  {
    title: "Disable WiFi Adapter Power Management (Windows)",
    description:
      "On Windows, right-click the Start menu and open Device Manager. Expand Network Adapters, right-click your WiFi card (Intel, Realtek, or Qualcomm), and select Properties. Navigate to the Power Management tab and uncheck 'Allow the computer to turn off this device to save power'.",
    tip: "Additionally, open Control Panel → Power Options → Change plan settings → Change advanced power settings. Expand Wireless Adapter Settings → Power Saving Mode, and set both On Battery and Plugged In to 'Maximum Performance'.",
  },
  {
    title: "Update or Roll Back WiFi Driver",
    description:
      "Visit the manufacturer support page for your computer (Dell, HP, Lenovo) or wireless adapter (Intel, Killer, Realtek). Download the latest stable driver version. If your disconnections began immediately after a recent update, open Device Manager → Network Adapters → right-click WiFi card → Properties → Driver tab, and click 'Roll Back Driver'.",
  },
  {
    title: "Change 2.4GHz Channel Width to 20MHz Only",
    description:
      "Log into your router, find the Wireless settings, select the 2.4GHz band, and change the Channel Width from 'Auto' or '40MHz' to '20MHz'. Change the channel itself from 'Auto' to a fixed, non-overlapping channel (1, 6, or 11) based on a channel scan.",
    tip: "A wider 40MHz channel in the 2.4GHz band overlaps with almost all other available channels, creating severe co-channel interference in residential areas that triggers packet loss and dropouts.",
  },
  {
    title: "Update Router Firmware",
    description:
      "Log into your router administration panel. Check the current firmware version and compare it to the latest release on the manufacturer website. If an update is available, download it and upload it via the system tools panel, or use the router's automatic update tool. Do not turn off the router during this process.",
  },
  {
    title: "Audit Router Log for WAN Disconnection Events",
    description:
      "If all devices disconnect from the internet simultaneously, log into the router and go to System Log → WAN Log. Look for errors such as 'PPPoE Link Down', 'DHCP Lease Lost on WAN', or 'No Carrier'. If these events correlate with your internet drops, the problem is with your ISP's line or modem.",
  },
];

const faqs = [
  {
    question: "Why does my WiFi disconnect every few minutes?",
    answer:
      "Frequent WiFi disconnections are typically caused by: (1) Smart Connect / Band Steering forcing your device to hop between 2.4GHz and 5GHz networks due to changing signal levels; (2) High channel congestion on the selected wireless channel, leading to packet collision rates above 20% which trigger disassociation; (3) Windows or OS power management turning off the network adapter to save power; (4) Degraded router firmware struggling with memory leaks; or (5) Microwave or baby monitor interference.",
  },
  {
    question: "Why does my WiFi disconnect and reconnect every 30 seconds?",
    answer:
      "Disconnections occurring at regular 30-second to 1-minute intervals almost always indicate a DHCP lease renewal failure. The router is assigning an IP address, but the device is failing to handshake and renew it before expiration, or the router's DHCP pool has run out of available addresses. Increasing the lease time to 24 hours in the router LAN settings and expanding the IP address range resolves this issue.",
  },
  {
    question: "How do I stop my laptop from disconnecting from WiFi?",
    answer:
      "First, open Device Manager → Network Adapters, select your WiFi card properties, and disable 'Allow the computer to turn off this device to save power' in the Power Management tab. Second, update your wireless driver to the latest OEM version. Third, split your router's 2.4GHz and 5GHz bands into separate network names so your laptop is not forced to roam between bands.",
  },
  {
    question: "Does channel congestion cause WiFi to disconnect?",
    answer:
      "Yes. When multiple routers share the same frequency channel, they compete for airtime using CSMA/CA protocols. If nearby interference is severe, packet collision rates spike. When the client device fails to receive keep-alive packets (beacons) from the router within a set window, it assumes the connection is lost and disconnects.",
  },
  {
    question: "Why does my WiFi disconnect when I walk to another room?",
    answer:
      "This is a mesh roaming failure or a 'sticky client' issue. Your device is clinging to a weak signal from the primary router instead of roaming to a closer mesh node or access point. During the eventual forced handoff, the signal drops. Enabling 802.11r (Fast BSS Transition) and adjusting the roaming aggressiveness of your device's WiFi adapter resolves this.",
  },
  {
    question: "Can a bad router cause WiFi to keep disconnecting?",
    answer:
      "Yes. If a router's processor overheats, its internal memory (RAM) overflows due to conntrack table exhaustion, or its hardware power capacitors degrade, it will periodically reset its wireless radios or crash entirely. If rebooting the router resolves the dropping issue for only a few hours, the router hardware is likely failing.",
  },
  {
    question: "Why does my phone WiFi keep disconnecting when the screen is off?",
    answer:
      "Smartphones have aggressive power management systems designed to conserve battery. When the screen turns off, the OS may disconnect WiFi to save power and fall back on cellular data. On Android, you can adjust this by turning off battery optimization for the system network manager or setting WiFi sleep policy to 'Always On'. On iOS, this behavior is managed by the system and cannot be configured.",
  },
  {
    question: "What is a DHCP lease and why does it cause dropouts?",
    answer:
      "A DHCP lease is a temporary IP address assigned to your device by the router. When half of the lease time expires (T1 timer), the device attempts to renew the lease. If the router fails to respond due to packet collisions or network load, the device tries again at 87.5% of lease time (T2 timer). If both fail, the device drops the IP address, causing a complete disconnection.",
  },
  {
    question: "How does mesh roaming failure cause WiFi disconnections?",
    answer:
      "In a mesh network, as you move around, your device should hand off seamlessly between nodes using 802.11k, 802.11v, and 802.11r protocols. If these protocols are disabled, or if the satellite nodes are placed too close together (creating overlapping coverage zones at identical signal levels), the device will constantly fluctuate between nodes, dropping packets during each transfer.",
  },
  {
    question: "Can ISP problems cause my local WiFi to disconnect?",
    answer:
      "An ISP outage will drop your internet access, but your device should remain connected to the local WiFi signal. However, many modern smart devices automatically disconnect from a WiFi network if they detect 'No Internet Access' and scan for alternative networks. If your devices display a 'Connected, no internet' message, the problem is your ISP line rather than your local WiFi signal.",
  },
  {
    question: "Why does my WiFi disconnect when using the microwave?",
    answer:
      "Microwave ovens operate at 2.45GHz, which directly overlaps with WiFi channels 1 through 11. If the microwave's shielding is slightly worn, it will emit electromagnetic noise that completely saturates the 2.4GHz band nearby. The fix is to connect your devices to the 5GHz or 6GHz bands, which operate at higher frequencies and are unaffected by microwaves.",
  },
  {
    question: "Does having too many devices cause WiFi to disconnect?",
    answer:
      "Yes. Budget routers have limited memory and processor capacity. Each connected device consumes a slot in the NAT conntrack table and requires CPU airtime allocations. When the device count exceeds 20–30 on a basic router, the system runs out of memory, leading to spontaneous radio restarts or device drops. Upgrading to a WiFi 6 router with OFDMA solves this.",
  },
];

const quickFixChecklist = [
  "Determine if all devices disconnect (ISP/router) or just one (device-specific)",
  "Disable Smart Connect and split 2.4GHz and 5GHz into distinct SSIDs",
  "Set DHCP lease time to 24 hours (1440 minutes) in LAN settings",
  "Disable WiFi adapter power saving in Windows Device Manager",
  "Set power plan to High Performance in Windows Power Options",
  "Update WiFi adapter driver from manufacturer website",
  "Set 2.4GHz channel width to 20MHz in Wireless settings",
  "Switch to a less congested channel using a WiFi analyzer app",
  "Update router firmware to the latest stable release",
  "Check WAN status page for PPPoE drops or CRC errors",
];

const commonCauses = [
  {
    title: "DHCP Lease Expiry",
    desc: "Short lease times (1-2 hours) force frequent IP renewal requests. If renewal fails due to congestion or firmware bugs, a brief disconnection occurs.",
  },
  {
    title: "Smart Connect Band Migration",
    desc: "Band steering forces devices between 2.4GHz and 5GHz, causing mandatory 0.5-3 second disconnections during every band switch.",
  },
  {
    title: "WiFi Adapter Power Management",
    desc: "Windows aggressively powers down WiFi adapters to save power, causing disconnections whenever the adapter enters sleep state.",
  },
  {
    title: "Channel Congestion",
    desc: "In dense areas, competing networks on the same channel create collision rates above 20-30%, causing link quality failures and disassociation.",
  },
  {
    title: "Mesh Roaming Failure",
    desc: "Devices clinging to weak distant nodes instead of roaming to nearby satellites cause forced disconnections when the signal degrades beyond the threshold.",
  },
  {
    title: "Buggy Router Firmware",
    desc: "Known wireless driver bugs in older firmware releases cause arbitrary disconnections, especially under sustained traffic loads.",
  },
];

export default function WifiKeepsDisconnectingPage() {
  return (
    <TroubleshootingArticleShell
      h1="WiFi Keeps Disconnecting? 12 Proven Fixes for Unstable WiFi"
      intro="Are your devices randomly disconnecting from WiFi every few minutes? Does your internet drop and reconnect constantly? This comprehensive guide outlines the scientific troubleshooting methodology to identify the root causes of WiFi instability — including DHCP lease failures, band steering issues, driver power management, and RF congestion — and provides step-by-step fixes."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Check All Devices First",
        text: "Before modifying router settings, determine if all connected devices are experiencing disconnections simultaneously. If only your laptop or phone drops while other devices stay connected, the problem is with that specific device's adapter or driver — not the router.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if WAN disconnections appear in your router log alongside PPPoE session resets, DSL retrain events, or fiber ONT authentication timeouts. Request an upstream signal level audit and check for line noise, fiber bend, or ONT hardware replacement."
      severityLevel="high"
    >
      <div className="space-y-8">
        {/* Quick Answer */}
        <section
          className="glass-card p-5 border border-amber-900/20 bg-amber-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer Summary"
        >
          <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h2 className="text-xs font-bold text-amber-400 mb-3 uppercase tracking-wide">
            Quick Answer — Why WiFi Keeps Disconnecting
          </h2>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li>
              <strong>If only one device drops:</strong> Disable network adapter power saving in Windows Device Manager, or update the device's wireless drivers.
            </li>
            <li>
              <strong>If all devices drop:</strong> Split the router's 2.4GHz and 5GHz bands (disable Smart Connect) and assign separate names to stop band hopping.
            </li>
            <li>
              <strong>Periodic dropouts (e.g. every hour):</strong> Increase the DHCP lease time in your router's LAN settings to 24 hours to prevent renewal drops.
            </li>
            <li>
              <strong>Apartment interference:</strong> Switch the 2.4GHz band to 20MHz width to reduce overlapping noise, and move critical devices to the cleaner 5GHz band.
            </li>
            <li>
              <strong>Hardware overload:</strong> If the router drops connections only under heavy download load, the CPU is overheating or the power adapter is failing.
            </li>
          </ul>
        </section>

        <article className="prose prose-invert max-w-none space-y-8 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          {/* Section 1: Diagnosing the Root Layer */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Diagnosing the Root Layer: OSI Model Troubleshooting
            </h2>
            <p>
              When a network connection is unstable, troubleshooting randomly without a plan leads to frustration. Network engineers use the **OSI (Open Systems Interconnection) Model** to isolate network problems systematically. By categorizing symptoms by layer, you can isolate whether your WiFi drops are caused by physical RF obstacles, link-layer protocol issues, or IP address configuration errors.
            </p>
            <p className="mt-3">
              Use the reference table below to identify where your disconnect problem is occurring:
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-3 py-2 text-left">Symptom</th>
                    <th className="px-3 py-2 text-left">OSI Layer</th>
                    <th className="px-3 py-2 text-left">Diagnosis Method</th>
                    <th className="px-3 py-2 text-left">Fix Direction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr>
                    <td className="px-3 py-2 font-semibold">All devices drop simultaneously</td>
                    <td className="px-3 py-2">Layer 1/3 (Physical/Network)</td>
                    <td className="px-3 py-2">Check WAN status page in router admin</td>
                    <td className="px-3 py-2">ISP line or router gateway failure</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">One device drops only</td>
                    <td className="px-3 py-2">Layer 1/2 (Physical/Data Link)</td>
                    <td className="px-3 py-2">Check device logs or Event Viewer</td>
                    <td className="px-3 py-2">WiFi adapter driver or power setting</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Drops every 30-60 minutes regularly</td>
                    <td className="px-3 py-2">Layer 3 (Network - DHCP)</td>
                    <td className="px-3 py-2">Compare lease expiry time with drops</td>
                    <td className="px-3 py-2">Extend DHCP lease time in router</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Drops only when walking around</td>
                    <td className="px-3 py-2">Layer 2 (Data Link - Roaming)</td>
                    <td className="px-3 py-2">Monitor signal strength in dBm</td>
                    <td className="px-3 py-2">Adjust mesh node placement / 802.11r</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Drops during microwave use</td>
                    <td className="px-3 py-2">Layer 1 (Physical - RF)</td>
                    <td className="px-3 py-2">Use 2.4GHz analyzer while running oven</td>
                    <td className="px-3 py-2">Switch devices to 5GHz or 6GHz band</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: DHCP Lease Problems */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              DHCP Lease Problems: Why Frequent IP Renewals Drop Connections
            </h2>
            <p>
              When a device connects to a local network, it doesn't automatically own an IP address. Instead, it requests one from the router's **DHCP (Dynamic Host Configuration Protocol)** server. The router lends the IP address for a specific duration known as the **Lease Time**.
            </p>
            <p className="mt-3">
              According to the DHCP specification (RFC 2131), the client must attempt to renew its lease when half of the lease time has elapsed. This is called the **T1 timer**. For example, if your lease time is set to 2 hours, the device will send a renewal request at the 1-hour mark. If the router fails to respond (due to RF interference, processor load, or client sleep states), the device continues using the IP until the **T2 timer** is reached (87.5% of lease time). If it still fails, the device must drop the IP address when the lease expires, terminating the connection and creating a noticeable dropout.
            </p>
            <p className="mt-3">
              To fix this, you must change your lease configuration:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Log into your router admin panel using its gateway IP address (e.g. 192.168.1.1).</li>
              <li>Navigate to the <strong>LAN Settings</strong> or <strong>DHCP Server Settings</strong> section.</li>
              <li>Locate the <strong>Lease Time</strong> field (often expressed in seconds or minutes).</li>
              <li>Change the lease time from its default (typically 86400 seconds / 1440 minutes for 24 hours, or 604800 seconds for 7 days).</li>
              <li>Click Save/Apply and reboot your router to clear the dynamic allocation tables.</li>
            </ol>
          </section>

          {/* Section 3: WiFi Driver Problems */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              WiFi Driver Problems: Platform-Specific Adapter Troubleshooting
            </h2>
            <p>
              If your computer keeps dropping its WiFi connection while your smartphone remains stable, the issue lies in your computer's wireless adapter configuration or driver stack.
            </p>

            <h3 className="text-sm font-semibold text-[var(--text-primary)] mt-4 mb-2">Windows Driver Fixes</h3>
            <p>
              Windows frequently updates network drivers automatically through Windows Update, which can introduce unstable generic drivers. Additionally, Windows default power schemes prioritize power saving over link stability.
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                <strong>Disable Power Saving:</strong> Open Device Manager → Network Adapters → right-click your wireless card (e.g., Intel Wi-Fi 6E AX211) → Properties → Power Management tab. Uncheck 'Allow the computer to turn off this device to save power'.
              </li>
              <li>
                <strong>Configure Power Profile:</strong> Open Control Panel → Power Options → Change plan settings next to your active plan → Change advanced power settings. Expand Wireless Adapter Settings → Power Saving Mode, and set both options to 'Maximum Performance'.
              </li>
              <li>
                <strong>Reinstall Drivers:</strong> Download the latest WiFi driver package directly from Intel or your PC manufacturer's support site. Disconnect from the internet, uninstall the current device from Device Manager (checking 'Delete the driver software for this device'), and install the downloaded package.
              </li>
            </ol>

            <h3 className="text-sm font-semibold text-[var(--text-primary)] mt-4 mb-2">macOS Wireless Troubleshooting</h3>
            <p>
              macOS does not expose network adapter settings in Device Manager. However, macOS frequently suffers from configuration corruption and location services conflicts.
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                <strong>Disable AWDL (Apple Wireless Direct Link) Interference:</strong> AirDrop, AirPlay, and Handoff rely on AWDL, which forces the WiFi card to periodically scan on channel 149 while maintaining your primary network connection. This can cause latency spikes and drops. To test, open Terminal and run: <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">sudo ifconfig awdl0 down</code>.
              </li>
              <li>
                <strong>Reset Network Configuration Files:</strong> Turn off WiFi. Open Finder, press <kbd className="bg-[var(--bg-elevated)] px-1 rounded">Cmd+Shift+G</kbd>, and type: <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">/Library/Preferences/SystemConfiguration/</code>. Delete the files <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[10px]">com.apple.airport.preferences.plist</code>, <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[10px]">NetworkInterfaces.plist</code>, and <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[10px]">preferences.plist</code>. Restart your Mac and re-enable WiFi.
              </li>
            </ol>
          </section>

          {/* Section 4: Router Firmware Bugs */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Router Firmware Bugs: How to Safely Identify and Resolve Them
            </h2>
            <p>
              Like any software, your router's operating system (firmware) can contain bugs, memory leaks, or driver errors. Over time, as devices connect and disconnect, memory leaks in the router's DNS cache or connection tracking (conntrack) table can deplete available system RAM, causing the wireless radio daemon to crash and restart.
            </p>
            <p className="mt-3">
              If your router's wireless networks vanish entirely for 30–60 seconds before reappearing, the router is likely experiencing a firmware kernel panic or radio driver restart.
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Log into your router admin panel and check the **Firmware Version** listed on the dashboard.</li>
              <li>Visit the support section of the manufacturer's website (ASUS, TP-Link, Netgear, Linksys) and search for your exact router model number.</li>
              <li>Check the changelogs of newer firmware versions. Look for terms like \"Fixes wireless stability issues,\" \"Resolves memory leaks,\" or \"Improves Wi-Fi performance under load.\"</li>
              <li>Download the latest stable firmware file. Connect your computer directly to the router using an Ethernet cable (never update firmware over WiFi).</li>
              <li>Navigate to the firmware update section of your router's admin panel, upload the file, and click update. Do not disconnect the power during this process.</li>
            </ol>
          </section>

          {/* Section 5: Channel Congestion */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Channel Congestion: Scanning and Setting Clean Frequencies
            </h2>
            <p>
              WiFi uses radio waves, which are shared resources. In a dense environment, dozens of wireless networks broadcast in the same frequencies, causing packets to collide. When collisions occur, the router or client must retransmit the packet, increasing latency. If collision rates exceed 20%, the connection degrades so severely that devices drop off.
            </p>
            <p className="mt-3">
              To resolve this:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                <strong>Scan Your Local Frequencies:</strong> Use a tool like **WiFi Analyzer** on Android or **inSSIDer** on Windows to view the networks around you.
              </li>
              <li>
                <strong>Isolate 2.4GHz Networks:</strong> The 2.4GHz band has 11 channels, but only channels **1, 6, and 11** do not overlap. If your router is set to channel 3, it receives interference from networks on channel 1, 2, 3, 4, and 5. Set your router exclusively to channel 1, 6, or 11.
              </li>
              <li>
                <strong>Restrict Channel Width:</strong> In dense areas, make sure the 2.4GHz band is set to **20MHz** channel width, not 40MHz. A 40MHz width overlaps with 80% of the entire 2.4GHz band, increasing packet collision rates.
              </li>
            </ol>
          </section>

          {/* Section 6: Mesh Roaming Problems */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Mesh Roaming Problems: Adjusting 802.11r/k/v and Aggr-Settings
            </h2>
            <p>
              In a home with a mesh system or multiple access points, client devices decide when to hand off from a distant node to a closer one. This process is called roaming. By default, many client devices will cling to a weak signal from the router they first connected to until the signal drops completely (the \"sticky client\" problem).
            </p>
            <p className="mt-3">
              Modern mesh systems implement roaming assistance protocols:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>802.11k (Neighbor Reports):</strong> The router sends the client a list of nearby access points and their signal strengths, reducing the time the client spends scanning for alternatives.
              </li>
              <li>
                <strong>802.11v (BSS Transition Management):</strong> The router actively advises the client to steer to a less congested or closer node.
              </li>
              <li>
                <strong>802.11r (Fast BSS Transition):</strong> Accelerates the security handshake when roaming, reducing handoff latency to under 50ms.
              </li>
            </ul>
            <p className="mt-3">
              If your connection drops when you walk between rooms, log into your mesh router's settings and verify that **802.11r** and **Fast Roaming** are enabled. On your PC, open Device Manager → right-click your wireless adapter → Properties → Advanced tab → select **Roaming Aggressiveness** (or Roaming Sensitivity) and change it to **Medium-High** or **High** to force the card to scan for stronger nodes sooner.
            </p>
          </section>

          {/* Section 7: ISP Line Issues vs Local WiFi Problems */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              ISP Line Issues vs Local WiFi Problems: How to Tell the Difference
            </h2>
            <p>
              An unstable internet connection can originate from two completely different places: your local WiFi network, or your ISP's connection line to the home. If your laptop loses internet access but remains connected to your WiFi signal, the issue is almost certainly upstream (with the ISP or modem).
            </p>
            <p className="mt-3">
              To verify:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                <strong>Ping Your Gateway:</strong> Open Command Prompt (Windows) or Terminal (Mac) and type: <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">ping -t 192.168.1.1</code> (replace with your router's IP).
              </li>
              <li>
                <strong>Ping an External Server:</strong> In a separate command window, type: <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">ping -t 8.8.8.8</code>.
              </li>
              <li>
                <strong>Analyze the Results:</strong> If both pings drop requests, your local wireless link is dropping packets. If your ping to <code className="bg-[var(--bg-elevated)] px-1 rounded">192.168.1.1</code> remains stable (under 5ms without packet loss) but the ping to <code className="bg-[var(--bg-elevated)] px-1 rounded">8.8.8.8</code> fails, your local WiFi is perfect — your ISP's connection is dropping.
              </li>
            </ol>
          </section>

          {/* Section 8: DNS Failure Causing Apparent Disconnections */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              DNS Failure Causing Apparent Disconnections
            </h2>
            <p>
              When a DNS server fails or responds slowly, your browser cannot translate domain names (like Google.com) into IP addresses. When this happens, your browser will display a 'Server Not Found' or 'No Internet Connection' error, making you think your WiFi has disconnected.
            </p>
            <p className="mt-3">
              To test this, type an IP address directly into your browser's address bar (for example, <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">http://1.1.1.1</code> or <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">http://8.8.8.8</code>). If the page loads successfully but you cannot load websites by typing their names, your WiFi is working perfectly, but your DNS server has failed.
            </p>
            <p className="mt-3">
              Navigate to your router's WAN settings and replace your ISP's DNS servers with reliable options:
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-3 py-2 text-left">DNS Provider</th>
                    <th className="px-3 py-2 text-left">Primary IP</th>
                    <th className="px-3 py-2 text-left">Secondary IP</th>
                    <th className="px-3 py-2 text-left">Average Latency</th>
                    <th className="px-3 py-2 text-left">Primary Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr>
                    <td className="px-3 py-2 font-semibold">Cloudflare</td>
                    <td className="px-3 py-2 font-mono text-emerald-400">1.1.1.1</td>
                    <td className="px-3 py-2 font-mono">1.0.0.1</td>
                    <td className="px-3 py-2">~12ms</td>
                    <td className="px-3 py-2">Speed & Privacy</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Google</td>
                    <td className="px-3 py-2 font-mono text-emerald-400">8.8.8.8</td>
                    <td className="px-3 py-2 font-mono">8.8.4.4</td>
                    <td className="px-3 py-2">~22ms</td>
                    <td className="px-3 py-2">Reliability & Scale</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Quad9</td>
                    <td className="px-3 py-2 font-mono text-emerald-400">9.9.9.9</td>
                    <td className="px-3 py-2 font-mono">149.112.112.112</td>
                    <td className="px-3 py-2">~25ms</td>
                    <td className="px-3 py-2">Malware Blocking</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              For complete guides on DNS, see our articles on <a href="/dns" className="text-[var(--brand-400)] hover:underline">DNS Fundamentals</a>, <a href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline">DNS Server Not Responding Fixes</a>, and <a href="/best-dns-servers" className="text-[var(--brand-400)] hover:underline">Best DNS Servers</a>.
            </p>
          </section>

          {/* Related Troubleshooting Guides */}
          <section className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-2xl">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Related Troubleshooting Guides
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <li>
                <a href="/how-to-improve-wifi-signal" className="text-[var(--brand-400)] hover:underline">
                  How to Improve WiFi Signal & Boost Range
                </a>
              </li>
              <li>
                <a href="/router-keeps-restarting" className="text-[var(--brand-400)] hover:underline">
                  Router Keeps Restarting Troubleshooting
                </a>
              </li>
              <li>
                <a href="/mesh-wifi" className="text-[var(--brand-400)] hover:underline">
                  Mesh WiFi Complete Guide
                </a>
              </li>
              <li>
                <a href="/mesh-wifi-setup" className="text-[var(--brand-400)] hover:underline">
                  Mesh WiFi Setup Guide
                </a>
              </li>
              <li>
                <a href="/wifi-extender-vs-mesh" className="text-[var(--brand-400)] hover:underline">
                  WiFi Extender vs Mesh WiFi
                </a>
              </li>
              <li>
                <a href="/dns" className="text-[var(--brand-400)] hover:underline">
                  DNS Complete Guide
                </a>
              </li>
              <li>
                <a href="/best-dns-servers" className="text-[var(--brand-400)] hover:underline">
                  Best DNS Servers Directory
                </a>
              </li>
              <li>
                <a href="/router-login" className="text-[var(--brand-400)] hover:underline">
                  Router Login & IP Guide
                </a>
              </li>
              <li>
                <a href="/router-settings" className="text-[var(--brand-400)] hover:underline">
                  Router Settings Configuration Guide
                </a>
              </li>
              <li>
                <a href="/wifi-security" className="text-[var(--brand-400)] hover:underline">
                  WiFi Security & Setup
                </a>
              </li>
              <li>
                <a href="/guest-wifi-setup" className="text-[var(--brand-400)] hover:underline">
                  Guest WiFi Network Setup
                </a>
              </li>
              <li>
                <a href="/wpa3-vs-wpa2" className="text-[var(--brand-400)] hover:underline">
                  WPA3 vs WPA2 Security Comparison
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
