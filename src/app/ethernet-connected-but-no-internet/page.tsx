import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Ethernet Connected But No Internet? Expert Fix Guide — RouterVia",
  description:
    "Is your Ethernet cable showing connected but no internet access? Diagnose IP assignment failures, DNS resolution errors, gateway connectivity problems, Winsock corruption, MAC address conflicts, and VLAN misconfigurations with our expert technical guide.",
  canonical: "/ethernet-connected-but-no-internet",
  keywords: [
    "ethernet connected but no internet",
    "network cable connected no internet",
    "ethernet no internet windows 11",
    "lan connected but no internet",
    "unidentified network ethernet",
    "wired connection no internet access",
    "ethernet adapter no internet",
    "netsh winsock reset fix",
  ],
});

const breadcrumbs = [
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "Ethernet Connected No Internet", url: "/ethernet-connected-but-no-internet" },
];

const troubleshootingSteps = [
  {
    title: "Verify Physical Layer: Cable, Port, and LED Indicators",
    description:
      "Unplug the Ethernet cable from both your computer's NIC (Network Interface Card) and the router or switch LAN port. Inspect the RJ-45 connector for bent pins, damaged locking tab, or corrosion. Reinsert firmly until the clip clicks. Check the LED indicators on both the NIC and router port — a steady green or amber link LED confirms Layer 1 (physical) connectivity. If no LED is lit, try a different cable and a different router port.",
    tip: "Cat5e cables longer than 100 meters exceed the IEEE 802.3 specification limit and will cause excessive packet loss. For runs over 90 meters, use a Gigabit switch as a relay point or upgrade to fiber.",
  },
  {
    title: "Check and Renew IP Address Configuration",
    description:
      "Open an elevated Command Prompt and run 'ipconfig /all'. Verify your IPv4 Address is in your router's local subnet (e.g., 192.168.1.x). If the address shows 169.254.x.x (APIPA range), the DHCP server did not respond. Run 'ipconfig /release' followed by 'ipconfig /renew' to force a fresh DHCP negotiation. If DHCP still fails, temporarily assign a manual static IP in the same subnet as your router to access the admin panel.",
    tip: "If the adapter shows 0.0.0.0 as the IP address, the DHCP client service on Windows has stopped. Restart it via Services (services.msc) → DHCP Client → Start.",
  },
  {
    title: "Flush DNS Cache and Reset Winsock Stack",
    description:
      "DNS cache corruption or Winsock API layer damage can block internet access even with a valid IP assignment. Open an elevated Command Prompt and run the four-command sequence: 'ipconfig /flushdns', 'netsh winsock reset', 'netsh int ip reset', then restart the computer. This sequence clears the DNS cache, removes third-party LSP network filters, and restores default TCP/IP registry values.",
    tip: "After running netsh commands, a system restart is mandatory. The commands write changes to registry keys that are loaded at system boot — they do not take effect until the next startup.",
  },
  {
    title: "Test Gateway Ping and Verify Routing Table",
    description:
      "Open Command Prompt and run 'ping 192.168.1.1' (replace with your actual gateway IP). If ping succeeds, your local network is functional but the gateway cannot reach the internet — the problem is with the router's WAN connection. If ping fails, your IP configuration or routing table is incorrect. Run 'route print' to inspect the IPv4 routing table and verify a default route (0.0.0.0) exists pointing to your gateway.",
    tip: "If ping to the gateway succeeds but ping to 8.8.8.8 fails, the router's WAN interface is down or misconfigured. If ping to 8.8.8.8 succeeds but websites don't load, the DNS resolver is failing — not the network itself.",
  },
  {
    title: "Update or Roll Back Network Adapter Drivers",
    description:
      "Open Device Manager (devmgmt.msc), expand Network Adapters, right-click your Ethernet adapter, and select Update Driver. If a Windows update recently installed a new driver that introduced instability, select 'Roll Back Driver' instead. For Intel and Realtek adapters, download the latest driver directly from the chipset manufacturer's website (not Windows Update) for maximum stability.",
    tip: "If the Ethernet adapter has a yellow exclamation mark in Device Manager, the driver is corrupted or conflicting. Uninstall the device entirely (check 'Delete driver software'), restart the computer, and let Windows reinstall the driver from scratch.",
  },
  {
    title: "Detect and Resolve MAC Address Conflicts",
    description:
      "In networks where two devices share the same MAC address (a configuration error or NIC failure), ARP (Address Resolution Protocol) tables on the router become unstable, causing both devices to lose connectivity intermittently. Open Command Prompt and run 'arp -a' to view the ARP table. If you see the same MAC address mapped to multiple IP addresses, a MAC conflict exists. Check all devices on the network and look for duplicate MAC addresses in the router's DHCP client list.",
    tip: "Some operating systems support MAC address randomization for privacy. If a device is configured to randomize its MAC on the wired adapter, it may conflict with an existing DHCP reservation or another device's hardware MAC.",
  },
  {
    title: "Investigate VLAN Configuration and Managed Switch Settings",
    description:
      "In business or advanced home networks using managed switches with VLAN segmentation, an incorrect port VLAN assignment can isolate a device from the DHCP server or gateway. If you are using a managed switch, verify that the port connected to your computer is configured as an untagged member of the correct VLAN (the same VLAN as your router's DHCP server). Also verify that no port security or 802.1X authentication policy is blocking the new device.",
    tip: "VLAN configuration errors are invisible from the end device's perspective — the link LED will show active but DHCP will silently fail. Always verify switch port VLAN membership when adding a new device to a managed network.",
  },
  {
    title: "Run Windows Network Diagnostics and Check ISP Side",
    description:
      "Right-click the network icon in the taskbar and select 'Troubleshoot problems'. Windows Network Diagnostics can automatically detect and repair common issues including DHCP client failures, DNS resolver errors, and Winsock catalog problems. After running Windows diagnostics, connect a different device to the same Ethernet cable and router port. If the second device also has no internet, the problem is with the router's WAN connection or the ISP line — not your computer.",
    tip: "Bypass the router by connecting directly to the modem with an Ethernet cable. If internet access is restored with a direct modem connection, the router is the fault point. If no internet access with a direct modem connection, contact your ISP.",
  },
];

const faqs = [
  {
    question: "Why does my Ethernet show connected but no internet in Windows 11?",
    answer:
      "The most common cause is an IP address assignment failure — your Ethernet adapter is physically connected (Layer 1/2) but cannot obtain a valid IP from the DHCP server. Check your IP address using ipconfig: if it shows 169.254.x.x (APIPA), the DHCP negotiation failed. Run ipconfig /release and ipconfig /renew in an elevated Command Prompt, then restart the router. If the problem persists, temporarily assign a static IP matching your router's subnet to confirm whether the router's DHCP server is at fault.",
  },
  {
    question: "Why does my Ethernet work on one device but not another?",
    answer:
      "Device-specific Ethernet failures are usually caused by network adapter driver corruption, Winsock API layer damage from VPN or firewall software, or MAC address conflicts. If the same cable and router port work on a second device, the issue is isolated to the first device's software stack. Run 'netsh winsock reset', 'netsh int ip reset', and restart the computer to restore the network stack. If the problem persists, reinstall the Ethernet adapter driver from Device Manager.",
  },
  {
    question: "How does 'netsh winsock reset' fix Ethernet no internet issues?",
    answer:
      "The Windows Sockets (Winsock) API is the interface between Windows applications and the TCP/IP network stack. Third-party software such as VPNs, security suites, and network optimization tools install Layered Service Providers (LSPs) that hook into the Winsock catalog. If these LSPs become corrupted or conflicting, they intercept all network socket connections and can block internet access entirely while the physical connection remains active. The netsh winsock reset command removes all LSP entries and restores the Winsock catalog to its clean default state.",
  },
  {
    question: "What does 'Unidentified Network' mean on an Ethernet connection?",
    answer:
      "The 'Unidentified Network' status in Windows Network & Internet settings indicates that Windows could not determine the network's identity or internet status. This occurs when: (1) the adapter received a valid local IP but cannot reach the Microsoft network connectivity test server (msftconnecttest.com), indicating a DNS failure; (2) the adapter received an APIPA address instead of a DHCP lease; or (3) the adapter is connected to an isolated VLAN or a router with no WAN connection. Check the router's WAN status page to confirm it has an active internet connection.",
  },
  {
    question: "Can a faulty Ethernet cable cause no internet even with a link light?",
    answer:
      "Yes. A damaged Ethernet cable can maintain a physical link (showing a green LED) while having broken conductors that prevent data transmission. Ethernet uses 8 conductors (4 pairs) — a link light only confirms that the basic link pulse signal is being transmitted on one pair, but data transmission requires all pairs to function correctly for full-duplex Gigabit operation. Test with a known-good cable. For long cable runs, use an Ethernet cable tester to verify continuity across all 8 conductors.",
  },
  {
    question: "Why does my Ethernet work but only some websites load?",
    answer:
      "Partial connectivity where some websites load and others do not is typically a DNS resolution problem rather than an Ethernet hardware issue. If you can access websites by IP address (try entering 216.58.210.174 for Google) but not by domain name, your DNS server is failing. Change your DNS server to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google) in the network adapter's IPv4 settings. Also check if your ISP is blocking specific domains via DNS filtering.",
  },
  {
    question: "Can a MAC address conflict cause Ethernet no internet?",
    answer:
      "Yes. When two devices on the same network have identical MAC addresses, ARP (Address Resolution Protocol) tables on the router and switches become inconsistent — network frames destined for one device may be delivered to the other. This causes intermittent or complete loss of connectivity for both devices. Check the router's DHCP client list for duplicate MAC addresses. Also verify that your operating system's MAC address randomization is not generating an address that conflicts with another device on the network.",
  },
  {
    question: "How does VLAN misconfiguration cause Ethernet no internet?",
    answer:
      "In managed switch environments, each physical port is assigned to one or more VLANs. If a port is configured as a member of the wrong VLAN (for example, a guest VLAN isolated from the router's DHCP server), the connected device will receive no DHCP response and no default gateway. The physical link will be active, but all higher-layer protocols will fail silently. Verify in the managed switch's web interface that the port connected to the device is an untagged member of the correct VLAN, and that the VLAN has access to the router's DHCP server.",
  },
  {
    question: "What is the difference between 'no internet' and 'no network' on Ethernet?",
    answer:
      "'No network' means the physical Ethernet link (Layer 1/2) is not established — the cable is disconnected, the port is disabled, or the NIC is not recognized. 'No internet' means Layer 1/2 is functional (the physical link is active, and a local IP may be assigned), but Layer 3 routing to external internet addresses is failing. The distinction is critical for diagnosis: 'no network' requires physical or driver fixes, while 'no internet' requires investigating IP routing, DNS, and the router's WAN connection.",
  },
];

const commonCauses = [
  {
    title: "DHCP Server Unresponsive",
    desc: "The router's DHCP daemon has crashed or exhausted its lease pool, leaving the Ethernet adapter with an APIPA 169.254.x.x address and no valid gateway.",
  },
  {
    title: "DNS Resolution Failure",
    desc: "The DNS server configured in DHCP options is unreachable or returning NXDOMAIN for all queries, making all domain-name-based internet access fail while IP-based connectivity works.",
  },
  {
    title: "Winsock / TCP/IP Stack Corruption",
    desc: "Third-party VPN or security software has corrupted the Windows Sockets API catalog, blocking all socket-based network communication at the OS level.",
  },
  {
    title: "WAN Interface Disconnected",
    desc: "The router's WAN port has lost its ISP connection (DHCP lease expired, PPPoE session dropped), so LAN devices have local IPs but no route to the internet.",
  },
  {
    title: "MAC Address Conflict",
    desc: "Two devices on the network share the same MAC address, causing ARP table instability and packet delivery failures at the switch/router layer.",
  },
  {
    title: "Driver Corruption or Version Mismatch",
    desc: "An outdated, corrupted, or incompatible Ethernet driver fails to correctly negotiate link speed, duplex, or offload features with the router's switch port.",
  },
];

const quickFixChecklist = [
  "Run 'ipconfig /all' — check for 169.254.x.x APIPA address indicating DHCP failure.",
  "Run 'ipconfig /release' and 'ipconfig /renew' in an elevated Command Prompt.",
  "Run 'netsh winsock reset' and 'netsh int ip reset' — restart the computer after.",
  "Ping your gateway (e.g., 'ping 192.168.1.1') to confirm local connectivity.",
  "Ping 8.8.8.8 — if this works but websites don't load, the problem is DNS.",
  "Change DNS to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google) in adapter IPv4 settings.",
  "Update or roll back the Ethernet adapter driver in Device Manager.",
  "Test with a different Ethernet cable and a different router port.",
];

export default function EthernetConnectedButNoInternetPage() {
  return (
    <TroubleshootingArticleShell
      h1="Ethernet Connected But No Internet? Complete Technical Fix Guide"
      intro="When your Ethernet cable shows a connected link light but internet access is unavailable, the fault typically lies at Layer 3 (IP routing) or above — not in the physical cable itself. This guide covers every technical root cause: IP assignment failures, DNS resolution errors, Winsock corruption, driver faults, MAC address conflicts, VLAN misconfigurations, and ISP-side WAN issues, with exact diagnostic commands and fix procedures."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Quick Isolation Test",
        text: "Before any software troubleshooting, connect a second device to the same Ethernet cable and router port. If the second device has internet, the issue is isolated to your computer's network stack or drivers. If the second device also has no internet, the router's WAN connection or the LAN port itself is the fault point.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if: all devices connected via Ethernet to the router have no internet access simultaneously; the router's WAN status page shows 'Disconnected' or 'No IP'; bypassing the router with a direct modem Ethernet connection also produces no internet; or your modem's diagnostic page shows downstream SNR below 30 dB or T3/T4 timeout error counts increasing."
      severityLevel="high"
    >
      <div className="space-y-6">
        {/* Quick AI Summary */}
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
            <strong>Step 1:</strong> Run{" "}
            <code className="font-mono text-amber-300">ipconfig /all</code> — check for{" "}
            <code className="font-mono text-amber-300">169.254.x.x</code> APIPA address (DHCP failed) or a
            valid IP (DNS or routing fault). <strong>Step 2:</strong> Ping your gateway IP. If it
            responds, your local network works — the router has no internet. If it fails, your IP
            configuration is broken. <strong>Step 3:</strong> Run{" "}
            <code className="font-mono text-amber-300">netsh winsock reset</code> and{" "}
            <code className="font-mono text-amber-300">netsh int ip reset</code>, then restart. This
            resolves 70% of Windows Ethernet no-internet issues caused by software stack corruption.
          </p>
        </section>

        {/* Interactive Troubleshooting Wizard */}
        <ConnectionOptimizerClient mode="ethernet-no-internet" />

        {/* Technical Article Body */}
        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">

          {/* Symptoms Matrix */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Ethernet No Internet Symptoms Matrix
          </h2>
          <p>
            The specific error message or status shown by Windows narrows down the fault layer
            significantly. Use this matrix to identify your exact root cause:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Symptom / Error</th>
                  <th className="px-3 py-2 text-left">Fault Layer</th>
                  <th className="px-3 py-2 text-left">Root Cause</th>
                  <th className="px-3 py-2 text-left">Primary Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">169.254.x.x IP address</td>
                  <td className="px-3 py-2">Layer 3 (IP)</td>
                  <td className="px-3 py-2">DHCP server not responding; APIPA fallback activated</td>
                  <td className="px-3 py-2">ipconfig /release /renew; restart router DHCP</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">0.0.0.0 IP address</td>
                  <td className="px-3 py-2">Layer 3 (IP)</td>
                  <td className="px-3 py-2">Windows DHCP Client service stopped or crashed</td>
                  <td className="px-3 py-2">Restart DHCP Client service in services.msc</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Unidentified Network</td>
                  <td className="px-3 py-2">Layer 3-7</td>
                  <td className="px-3 py-2">IP assigned but gateway or DNS unreachable</td>
                  <td className="px-3 py-2">Ping gateway; change DNS to 1.1.1.1; check router WAN</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">No valid IP configuration</td>
                  <td className="px-3 py-2">Layer 2-3</td>
                  <td className="px-3 py-2">Adapter failed to bind IP; possible driver or Winsock fault</td>
                  <td className="px-3 py-2">netsh winsock reset; netsh int ip reset; restart</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Valid IP but websites fail</td>
                  <td className="px-3 py-2">Layer 7 (DNS)</td>
                  <td className="px-3 py-2">DNS server unreachable or returning incorrect responses</td>
                  <td className="px-3 py-2">ipconfig /flushdns; set DNS to 1.1.1.1 or 8.8.8.8</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">No link light on port</td>
                  <td className="px-3 py-2">Layer 1 (Physical)</td>
                  <td className="px-3 py-2">Cable fault, NIC hardware failure, or disabled port</td>
                  <td className="px-3 py-2">Replace cable; test on different port; check NIC in Device Manager</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-amber-400">Works on one device only</td>
                  <td className="px-3 py-2">Software Stack</td>
                  <td className="px-3 py-2">Device-specific driver corruption or Winsock LSP damage</td>
                  <td className="px-3 py-2">Reinstall driver; run netsh winsock reset on affected device</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* How Ethernet Communication Works */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            How Ethernet Communication Works: Layer 1 to Layer 7
          </h2>
          <p>
            Ethernet connectivity is established across multiple protocol layers. A failure at any layer
            blocks all higher-layer communication, but presents differently to the end user. Understanding
            the OSI model layers relevant to Ethernet helps pinpoint exactly where the fault occurs:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Layer 1 — Physical:</strong> The electrical signal (100BASE-TX, 1000BASE-T, or
              2.5GBASE-T) is transmitted over the copper conductors in the Cat5e/Cat6 cable. Link pulse
              signals confirm the physical connection — this is what the LED link light indicates. A link
              light confirms only Layer 1 is active.
            </li>
            <li>
              <strong>Layer 2 — Data Link (Ethernet Frame):</strong> Ethernet frames are addressed using
              48-bit MAC addresses. Switches use MAC address tables to forward frames to the correct port.
              ARP (Address Resolution Protocol) operates at this layer to map IP addresses to MAC
              addresses. VLAN tags (802.1Q) are also applied at Layer 2.
            </li>
            <li>
              <strong>Layer 3 — Network (IP):</strong> IP addresses are assigned via DHCP or configured
              statically. The routing table determines which gateway to forward packets to. A missing or
              incorrect default route (0.0.0.0/0) causes all internet traffic to be discarded locally.
            </li>
            <li>
              <strong>Layer 4 — Transport (TCP/UDP):</strong> TCP establishes reliable connections
              using three-way handshakes. Winsock API corruption at this layer can block all socket
              connections, even when lower layers are fully functional.
            </li>
            <li>
              <strong>Layer 7 — Application (DNS):</strong> DNS translates domain names (google.com) to
              IP addresses. A failed DNS server makes all web browsing appear broken even when the
              network is fully functional at layers 1-4.
            </li>
          </ul>

          {/* IP Assignment Failures */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            IP Assignment Failures: DHCP vs. Static Configuration
          </h2>
          <p>
            When a device connects via Ethernet, the network adapter broadcasts a DHCP Discover packet to
            request an IP address. The router's DHCP server responds with a DHCP Offer containing an IP
            address, subnet mask, default gateway, and DNS server addresses. If this exchange fails, the
            device enters the APIPA fallback state, self-assigning a 169.254.x.x address.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Diagnosing DHCP Failures on Windows
          </h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# Step 1: Check current IP configuration
ipconfig /all

# Step 2: Release and renew IP lease
ipconfig /release
ipconfig /renew

# Step 3: If renewal fails, assign a temporary static IP
# (Use the router's subnet, avoid the DHCP pool range)
netsh interface ip set address "Ethernet" static 192.168.1.250 255.255.255.0 192.168.1.1

# Step 4: Restore DHCP after testing
netsh interface ip set address "Ethernet" dhcp`}
          </pre>
          <p>
            If a temporary static IP provides internet access, the router's DHCP server is the fault
            point. Log into the router admin panel and verify that: the DHCP server is enabled, the lease
            pool has available addresses, and the server is actively responding to requests.
          </p>

          {/* DNS Resolution Failures */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            DNS Resolution Failures: Why Ping Works But Websites Don't Load
          </h2>
          <p>
            A common and frequently misdiagnosed scenario: the Ethernet adapter has a valid IP address, ping
            to 8.8.8.8 succeeds, but web browsers cannot load any websites. This is a pure DNS resolution
            failure — the DNS server configured in your DHCP settings is unreachable or returning errors.
          </p>
          <p>
            The distinction between DNS failure and network failure is simple to test:
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# Test 1: Ping a known IP address (bypasses DNS)
ping 8.8.8.8

# Test 2: Ping a domain name (requires DNS)
ping google.com

# Test 3: Explicit DNS resolution test
nslookup google.com 1.1.1.1

# Test 4: Flush DNS cache and retry
ipconfig /flushdns`}
          </pre>
          <p>
            If Test 1 succeeds but Test 2 fails, DNS is the fault. Change your DNS server settings
            immediately. You can set the DNS server directly in the Ethernet adapter's IPv4 properties or
            in your router's DHCP configuration (to push the DNS change to all connected devices).
          </p>
          <p>
            Recommended public DNS servers for reliability and speed:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Cloudflare:</strong> Primary <code className="font-mono">1.1.1.1</code>, Secondary{" "}
              <code className="font-mono">1.0.0.1</code>
            </li>
            <li>
              <strong>Google:</strong> Primary <code className="font-mono">8.8.8.8</code>, Secondary{" "}
              <code className="font-mono">8.8.4.4</code>
            </li>
            <li>
              <strong>Quad9 (filtered/secure):</strong> Primary <code className="font-mono">9.9.9.9</code>,
              Secondary <code className="font-mono">149.112.112.112</code>
            </li>
          </ul>

          {/* Gateway Connectivity Problems */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Gateway Connectivity Problems: Router WAN Diagnosis
          </h2>
          <p>
            If your device has a valid local IP and can ping the gateway, but cannot reach external IP
            addresses, the router's WAN interface is the fault point. The router has a healthy LAN but no
            internet connection itself.
          </p>
          <p>
            Log into the router admin panel and navigate to the WAN or Internet Status page. Check:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>WAN IP Address:</strong> Should show a valid public or ISP-assigned IP. If it shows
              0.0.0.0, the router's WAN DHCP negotiation with the ISP has failed.
            </li>
            <li>
              <strong>WAN Gateway:</strong> Should show the ISP's gateway IP. If missing, the router has
              no route to the ISP's network.
            </li>
            <li>
              <strong>WAN DNS:</strong> Should show the ISP's DNS server or your configured custom DNS.
            </li>
            <li>
              <strong>Connection Type:</strong> Verify the connection type (DHCP, PPPoE, Static) matches
              your ISP's requirements. Incorrect connection type will prevent WAN authentication.
            </li>
          </ul>
          <p>
            If the WAN status shows all correct values but internet is still inaccessible, perform the
            gateway diagnostic using traceroute:
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            tracert 8.8.8.8
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            If the traceroute shows responses from your router (hop 1) but asterisks (*) at hop 2 (the
            ISP's first node), the ISP line between your router and the ISP's equipment is dropping
            packets. Contact your ISP's technical support and provide the traceroute output.
          </p>

          {/* Driver Corruption */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Driver Corruption Issues: Diagnosing Ethernet Adapter Software Faults
          </h2>
          <p>
            Ethernet adapter drivers translate between the Windows network stack and the physical NIC
            hardware. Driver corruption, incompatible versions installed by Windows Update, or conflicts
            with virtualization software (VMware, Hyper-V, VirtualBox) can cause the adapter to report as
            connected while failing to correctly process network packets.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">Symptoms of Driver Corruption</h3>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>Ethernet adapter shows in Device Manager with a yellow exclamation mark (Code 43 or Code 10)</li>
            <li>Adapter intermittently disappears from Device Manager and reappears</li>
            <li>Link speed negotiation fails (adapter connects at 10 Mbps instead of 1 Gbps)</li>
            <li>Packet loss on Ethernet but not on a second computer using the same cable and port</li>
            <li>Network stack resets (netsh winsock reset) provide temporary relief but the issue returns</li>
          </ul>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">Driver Reinstallation Procedure</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# In Device Manager (devmgmt.msc):
# 1. Expand "Network Adapters"
# 2. Right-click your Ethernet adapter
# 3. Select "Uninstall device"
# 4. Check "Delete the driver software for this device"
# 5. Click Uninstall
# 6. Action menu → Scan for hardware changes
# Windows will reinstall the default driver

# For Intel NIC driver update via PowerShell:
# Download from intel.com/download-center and run:
.\Install.bat`}
          </pre>

          {/* Windows Network Stack Repair */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Windows Network Stack Repair: Complete Command Reference
          </h2>
          <p>
            The Windows TCP/IP network stack consists of multiple components that can become corrupted
            independently. This is the complete sequence to fully reset the Windows network stack:
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">1. Flush DNS Resolver Cache</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            ipconfig /flushdns
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Clears the local DNS resolver cache. Forces the OS to perform new DNS lookups instead of using
            cached (potentially stale or incorrect) entries.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">2. Release and Renew IP Address</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`ipconfig /release
ipconfig /renew`}
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Releases the current DHCP lease and broadcasts a new DHCP Discover packet to obtain a fresh
            IP configuration from the DHCP server.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">3. Reset Winsock API Catalog</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            netsh winsock reset
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Removes all third-party Layered Service Provider (LSP) entries installed by VPNs, firewalls,
            and network optimization tools. Restores the Winsock catalog to its Windows default state.
            Requires a system restart.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">4. Reset TCP/IP Stack</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
            netsh int ip reset
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Rewrites the TCP/IP protocol stack configuration in the Windows registry to factory defaults.
            This clears custom IP routes, incorrect static configurations, and registry corruption
            affecting the IP stack. Requires a system restart.
          </p>
          <h3 className="text-xs font-bold text-[var(--text-primary)]">5. Disable Large Send Offload (LSO) — Advanced Fix</h3>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# In Device Manager → Ethernet Adapter → Properties → Advanced tab:
# Find "Large Send Offload v2 (IPv4)" → Set to Disabled
# Find "Large Send Offload v2 (IPv6)" → Set to Disabled

# Or via PowerShell (replace "Ethernet" with your adapter name):
Set-NetAdapterAdvancedProperty -Name "Ethernet" -DisplayName "Large Send Offload v2 (IPv4)" -DisplayValue "Disabled"
Set-NetAdapterAdvancedProperty -Name "Ethernet" -DisplayName "Large Send Offload v2 (IPv6)" -DisplayValue "Disabled"`}
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            LSO offloads TCP segmentation from the CPU to the NIC hardware. Driver bugs in LSO
            implementation can corrupt TCP segments, causing connections to stall or fail intermittently.
            Disabling LSO forces the CPU to handle segmentation, bypassing the buggy NIC firmware code.
          </p>

          {/* MAC Address Conflicts */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            MAC Address Conflicts: Detection and Resolution
          </h2>
          <p>
            Each network device has a factory-assigned 48-bit MAC address (Media Access Control address)
            that uniquely identifies it at the Ethernet frame level. Network switches maintain MAC address
            tables that map each MAC address to a specific switch port. When two devices share the same
            MAC address, the switch's MAC table flaps between the two ports, causing frames to be
            delivered to the wrong device intermittently.
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# View ARP cache to detect duplicate MAC mappings:
arp -a

# View your adapter's MAC address:
ipconfig /all | findstr "Physical"

# On Linux — check for duplicate MACs on LAN:
ip neigh show | sort -k5`}
          </pre>
          <p>
            If you identify a MAC address conflict, check the router's DHCP client list for duplicate MAC
            entries. Also verify that your OS is not configured to randomize the MAC address on wired
            Ethernet connections (this is normally only used for Wi-Fi privacy but can be accidentally
            enabled on Ethernet adapters).
          </p>

          {/* VLAN Problems */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            VLAN Misconfiguration in Managed Switches: Invisible Isolation
          </h2>
          <p>
            Virtual Local Area Networks (VLANs) allow a single physical switch to logically segment
            traffic into separate broadcast domains. In office or advanced home networks, VLANs isolate
            traffic between different device categories (e.g., VLAN 10 for corporate devices, VLAN 20 for
            guest devices, VLAN 30 for IoT devices).
          </p>
          <p>
            A VLAN misconfiguration is particularly difficult to diagnose because:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>The physical Ethernet link is fully active (green LED on both ends)</li>
            <li>The device receives no DHCP response (placed on a VLAN without a DHCP server)</li>
            <li>The device may receive an IP from a DHCP server on the wrong VLAN (e.g., guest VLAN with internet blocked)</li>
            <li>
              <strong>Trunk Port vs. Access Port:</strong> If the switch port is configured as a trunk port
              (carrying 802.1Q VLAN tags) instead of an access port (untagged), the connected Windows PC
              will not recognize the 802.1Q tags and cannot process the VLAN-tagged frames.
            </li>
          </ul>
          <p>
            Resolution: Log into the managed switch's web interface. Navigate to VLAN settings, find the
            port connected to the affected device, and verify it is configured as an untagged member of
            the correct VLAN that has access to the router's DHCP server and internet gateway.
          </p>

          {/* Managed Switch Troubleshooting */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Managed Switch Troubleshooting: Port Security and 802.1X Authentication
          </h2>
          <p>
            Enterprise-grade managed switches often implement port security features that can silently block
            new devices:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>MAC-Based Port Security:</strong> The switch is configured to allow only a specific
              number of MAC addresses per port (often just one). Connecting a new device or replacing a
              network adapter triggers a security violation, placing the port in err-disabled state. The
              link LED may remain green but the port discards all traffic.
            </li>
            <li>
              <strong>802.1X Network Access Control:</strong> The switch requires all devices to
              authenticate via a RADIUS server before permitting traffic. Devices without a valid 802.1X
              supplicant or certificate will be placed on a restricted VLAN with no internet access.
            </li>
            <li>
              <strong>DHCP Snooping:</strong> Managed switches with DHCP snooping enabled will block DHCP
              Offer packets from untrusted ports. If a device is connected to a port not configured as a
              DHCP trusted port, it may not receive DHCP responses.
            </li>
          </ul>

          {/* ISP Side Causes */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            ISP-Side Causes: When the Problem Is Beyond Your Network
          </h2>
          <p>
            If all local diagnostics confirm that the Ethernet hardware, adapter, driver, and router LAN
            configuration are correct, the fault may lie with the ISP's equipment or the line between the
            modem and the ISP's central office:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>ISP DHCP Server Failure:</strong> The ISP's DHCP server fails to respond to the
              router's WAN DHCP Discover requests. The router's WAN interface shows 0.0.0.0 as its IP
              address. This is an ISP-side issue requiring their NOC intervention.
            </li>
            <li>
              <strong>PPPoE Authentication Rejection:</strong> The ISP's BRAS (Broadband Remote Access
              Server) rejects the router's PPPoE authentication credentials. Check the router's WAN log
              for authentication failure messages and verify the ISP username/password is correct.
            </li>
            <li>
              <strong>MAC Address Binding:</strong> Some ISPs bind their provisioned service to a specific
              modem or router MAC address. Replacing either device without notifying the ISP will cause
              the WAN connection to fail. Contact your ISP to update the registered MAC address.
            </li>
            <li>
              <strong>Physical Line Fault:</strong> Damage to the coaxial cable, fiber splice, or copper
              pair between your home and the ISP's node will cause intermittent or complete connectivity
              failure. Request an ISP line test or technician visit.
            </li>
          </ul>

          {/* Advanced Packet Testing */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Advanced Packet Testing: Using Ping and Traceroute Correctly
          </h2>
          <p>
            Systematic use of ping and traceroute allows you to pinpoint at which network layer and at
            which physical hop packet loss is occurring:
          </p>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# Test 1: Local loopback (confirms TCP/IP stack is functional)
ping 127.0.0.1

# Test 2: Local gateway (confirms LAN and router reachability)
ping 192.168.1.1

# Test 3: ISP's first hop (confirms WAN connectivity to ISP node)
# (Find your WAN gateway IP from the router's WAN status page)
ping <WAN_GATEWAY_IP>

# Test 4: External IP (confirms ISP routing is working)
ping 8.8.8.8

# Test 5: External domain (confirms DNS is working)
ping google.com

# Full traceroute to external (maps all hops to destination)
tracert -d 8.8.8.8`}
          </pre>
          <p>
            Work through these five tests in order. The first test that fails identifies the exact fault
            layer. If Test 1 fails, the Windows TCP/IP stack itself is corrupt (run netsh winsock reset).
            If Test 1-2 succeed but Test 3 fails, the WAN connection to the ISP is down. If tests 1-4
            succeed but Test 5 fails, DNS is the only fault.
          </p>

          {/* Linux diagnostic section */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Linux Ethernet Diagnostics: Command Reference
          </h2>
          <pre className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[10px] text-green-400">
{`# View all interfaces and IP addresses
ip addr show

# View routing table (check for default route)
ip route show

# Check if link is up and speed/duplex
ip link show eth0
ethtool eth0

# Release and renew DHCP (if using dhclient)
sudo dhclient -r eth0
sudo dhclient eth0

# Check DNS resolution
nslookup google.com 1.1.1.1

# Check ARP table for MAC conflicts
ip neigh show

# Restart NetworkManager if all else fails
sudo systemctl restart NetworkManager`}
          </pre>

          {/* Internal links */}
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">
              Related Guides &amp; Tools
            </span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>
                If your router isn&apos;t assigning IP addresses via DHCP, see our{" "}
                <a
                  href="/router-not-assigning-ip-addresses"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  Router DHCP IP Assignment Fix Guide
                </a>
                .
              </li>
              <li>
                If the default gateway is not available, follow the{" "}
                <a
                  href="/default-gateway-not-available"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  Default Gateway Not Available Resolution Guide
                </a>
                .
              </li>
              <li>
                If DNS probe errors are appearing in your browser, see our{" "}
                <a
                  href="/dns-probe-finished-no-internet"
                  className="text-[var(--brand-400)] hover:underline"
                >
                  DNS Probe Finished No Internet Fix
                </a>
                .
              </li>
              <li>
                Verify your public IP address after fixing the connection with the{" "}
                <a href="/public-ip-checker" className="text-[var(--brand-400)] hover:underline">
                  Public IP Checker Tool
                </a>
                .
              </li>
              <li>
                Access your router admin panel at{" "}
                <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">
                  192.168.1.1
                </a>{" "}
                to diagnose WAN configuration.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
