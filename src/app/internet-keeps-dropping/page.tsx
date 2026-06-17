import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";

export const metadata: Metadata = buildMetadata({
  title: "Internet Keeps Dropping: Complete Fix Guide 2026 — RouterVia",
  description:
    "Internet keeps dropping? Fix modem sync failures, fiber/GPON issues, ISP congestion, PPPoE reconnect loops, packet loss, DNS failures, and latency spikes with our expert diagnosis guide.",
  canonical: "/internet-keeps-dropping",
  keywords: [
    "internet keeps dropping",
    "internet drops randomly",
    "internet connection dropping",
    "modem keeps dropping",
    "fiber internet dropping",
    "pppoe reconnect loop",
    "packet loss fix",
    "isp congestion fix",
    "latency spikes",
  ],
});

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "Internet Keeps Dropping", url: "/internet-keeps-dropping" },
];

const troubleshootingSteps = [
  {
    title: "Isolate Modem vs Router vs WiFi",
    description:
      "Connect a single computer directly to your modem's LAN port using an Ethernet cable (bypassing your router completely). Monitor the connection. If the connection remains stable, the problem lies within your router or local WiFi settings. If the connection continues to drop, the issue resides with the modem, cabling, or ISP connection line.",
    tip: "Most ISP gateways (combined modem-routers) have a 'Bridge Mode' or 'IP Passthrough' that must be enabled to isolate hardware routing issues correctly.",
  },
  {
    title: "Check Router WAN Log for Connection Events",
    description:
      "Log into your router admin panel and check the System Log or WAN status page. Look for messages such as 'PPPoE Link Down', 'DHCP Lease Lost on WAN', or 'Carrier Detect Failed'. Record the timestamp of these events to determine if the drops occur at regular intervals (suggesting provisioning/DHCP issues) or during peak traffic hours (suggesting ISP congestion).",
  },
  {
    title: "Verify Optical Power Levels (Fiber/GPON Customers)",
    description:
      "If you have fiber internet, log into your ONT (Optical Network Terminal) status page or call your ISP to verify your Rx (received) optical power. The acceptable range for GPON fiber is typically -8 dBm to -27 dBm. An optical signal level of -28 dBm or worse indicates a bent fiber patch cable, dirty connector, or bad outdoor splitter, which triggers synchronization dropouts.",
    tip: "A micro-bend (sharp bend) in a fiber optic patch cable can cause 3-5 dB of optical signal attenuation, dropping your connection under load.",
  },
  {
    title: "Inspect and Adjust WAN MTU Size",
    description:
      "If your DSL or fiber connection uses PPPoE authentication, log into the router and navigate to WAN settings. Verify the MTU (Maximum Transmission Unit) setting. For standard DHCP/IP WANs, set MTU to 1500. For PPPoE connections, reduce the MTU to exactly 1492. An incorrect MTU size causes packet fragmentation and frequent connection drops on security-hardened servers.",
  },
  {
    title: "Audit and Replace Ethernet Cabling",
    description:
      "Inspect the Ethernet cable connecting your modem's WAN port to your router's WAN port. Verify it is a Cat6 or better cable with no crimps, bent pins, or broken clips. Intermittent physical link connection events (where the router's WAN port alternates between 'Connected' and 'Disconnected') mimic line dropouts.",
  },
  {
    title: "Configure QoS to Prevent Bufferbloat",
    description:
      "If your internet drops or spikes in latency when someone uploads a file, navigate to your router's Quality of Service (QoS) settings. Set your upload and download bandwidth limits to 90% of your actual speed test results. This keeps the modem buffer from saturating, which triggers bufferbloat packet drops.",
    tip: "When your upload channel is saturated, ACK (acknowledgement) packets cannot get out, which causes TCP connections to stall and eventually drop.",
  },
  {
    title: "Set Reliable Custom WAN DNS Servers",
    description:
      "Log into your router admin console, navigate to WAN / DNS settings, and set the Primary DNS to 1.1.1.1 (Cloudflare) and Secondary DNS to 8.8.8.8 (Google). Disable any ISP-side DNS hijacking or search assistants, which frequently crash under high lookup volume.",
  },
  {
    title: "Request a Line Quality Audit from Your ISP",
    description:
      "If your direct-to-modem ping tests show packet loss or signal drops, call your ISP and request a line quality audit. Ask them to check the Downstream Power Level, Upstream Power Level, and Signal-to-Noise Ratio (SNR) on your cable connection, or the Optical Power Margin on your fiber connection.",
  },
];

const faqs = [
  {
    question: "Why does my internet keep dropping every few hours?",
    answer:
      "Drops every few hours are usually caused by: (1) PPPoE session timeout schedules set by your ISP, forcing a periodic re-authentication loop; (2) Upstream node congestion causing packet loss during peak times; (3) Thermal overheating of the modem or ONT, causing system resets; (4) DHCP WAN lease renewal timeouts where the ISP server fails to renew the WAN IP; or (5) Degrading coaxial line splitters introducing noise on cable lines.",
  },
  {
    question: "How do I know if my internet problem is from the ISP or my router?",
    answer:
      "The definitive test is bypassing the router. Connect a PC directly to the modem's Ethernet port. If the internet still drops, the problem is with the modem, cabling, or ISP network. If the connection becomes stable, your router's CPU is overheating, its NAT table is full, or its wireless settings are misconfigured.",
  },
  {
    question: "What is a PPPoE reconnect loop and how do I fix it?",
    answer:
      "A PPPoE reconnect loop occurs when your router attempts to establish an authenticated session with your ISP, but the session drops immediately after connecting. This is caused by: (1) Incorrect PPPoE username or password settings; (2) An MTU size set higher than 1492, which crashes PPPoE packets; or (3) ISP-side authentication server failures. Setting the MTU to 1492 and updating the router firmware typically fixes this.",
  },
  {
    question: "What causes packet loss on fiber internet?",
    answer:
      "Packet loss on fiber optic lines is typically caused by physical signal degradation: (1) Dirt, dust, or oils on the SC/APC fiber connectors; (2) Micro-bends or sharp curves in the fiber jumper cable; (3) A failing GPON ONT transceiver module; or (4) Congestion at the ISP's local OLT splitter node where too many subscribers share a single fiber link.",
  },
  {
    question: "How do I test for ISP congestion?",
    answer:
      "Run speed tests at different times (e.g. 6 AM vs 8 PM). If download speed drops by more than 50% in the evening and ping latency increases by 50ms+, you are experiencing ISP congestion. You can also run a traceroute command (tracert 8.8.8.8 on Windows) during a drop to see which hop introduces latency — if it's the second or third hop, the bottleneck is in your ISP's local network.",
  },
  {
    question: "What is bufferbloat and why does it cause drops?",
    answer:
      "Bufferbloat is high latency that occurs when a network link is saturated with traffic. Modems have buffers designed to store packets during spikes. However, if the buffer is too large and becomes full, packets wait in line for hundreds of milliseconds. Real-time protocols (like gaming, VoIP, or DNS lookups) will time out and drop their connections, even though the physical link remains active.",
  },
  {
    question: "Can a bad coaxial splitter cause cable internet to drop?",
    answer:
      "Yes. Cable internet (DOCSIS) relies on high-frequency signals running over coaxial copper cables. Every splitter placed on a coaxial cable reduces signal power (typically by 3.5 dB to 7 dB per output port). If your signal level drops below -10 dBmV or your SNR falls below 32 dB, the modem will lose sync with the ISP's CMTS node, power cycling the link to reconnect.",
  },
  {
    question: "What is GPON and how does it affect fiber reliability?",
    answer:
      "GPON (Gigabit Passive Optical Network) is a point-to-multipoint fiber architecture. A single fiber strand from the ISP's central office is split using passive optical splitters to serve up to 64 homes. If your neighbors are saturating the optical link, or if someone's ONT is transmitting out of turn (a 'rogue ONT'), the optical signal is corrupted, causing intermittent drops for all connected homes.",
  },
  {
    question: "Why does my internet drop only when it rains or is hot?",
    answer:
      "Physical lines are sensitive to environment. Underground copper and coaxial cables can degrade, allowing water to seep into connections during rain, causing short circuits. Overhead fiber lines can expand in extreme heat, increasing signal loss. Additionally, green ISP utility cabinets on the street can overheat in summer, causing local node routing gear to restart.",
  },
  {
    question: "How does a dirty fiber connector cause packet loss?",
    answer:
      "Fiber optics transmit data using light beams. The core of a single-mode fiber optic cable is only 9 microns in diameter — smaller than a red blood cell. A single speck of dust on the connector end-face blocks the light path, causing refraction and scattering. This reduces the received optical power at the ONT, leading to high bit error rates and packet drops.",
  },
  {
    question: "Why does my modem's online light blink when the internet drops?",
    answer:
      "A blinking online light indicates that the modem is attempting to establish synchronization with the ISP's network. On cable modems, it means the downstream or upstream carrier lock has been lost. On fiber ONTs, a blinking PON light means the ONT cannot authenticate with the OLT. This is a physical or link-layer connection drop that requires ISP line troubleshooting.",
  },
  {
    question: "Does custom DNS prevent my internet from dropping?",
    answer:
      "DNS settings do not fix physical line drops, but they prevent 'apparent' drops caused by DNS server failures. If your ISP's DNS server goes offline, you will lose access to all websites, making the internet appear down. Setting your DNS to Cloudflare (1.1.1.1) or Google (8.8.8.8) ensures name resolution remains active if your ISP's DNS crashes.",
  },
];

const quickFixChecklist = [
  "Bypass the router and connect directly to the modem with Ethernet",
  "Audit the router system log for PPPoE or WAN link down events",
  "Run a traceroute to identify where latency spikes occur",
  "Replace the Ethernet cable connecting the modem and router",
  "Verify cable modem signal levels are between -7 and +7 dBmV",
  "Ensure fiber ONT optical signal is better than -27 dBm",
  "Configure WAN MTU to 1492 for PPPoE connections",
  "Enable QoS in the router settings to eliminate bufferbloat",
  "Replace default ISP DNS servers with Cloudflare (1.1.1.1)",
  "Request a line quality audit and SNR check from your ISP support",
];

const commonCauses = [
  {
    title: "Modem Sync Loss",
    desc: "Excessive cable splitters, line noise, or copper degradation drops the DOCSIS downstream/upstream carrier lock, causing the modem to reset.",
  },
  {
    title: "Optical Signal Attenuation",
    desc: "Dirt on connectors or micro-bends in fiber patch cords drops optical power levels below the ONT's receiver sensitivity threshold (-27 dBm).",
  },
  {
    title: "PPPoE Authentication Failures",
    desc: "ISPs terminating PPPoE sessions due to timeout settings, combined with incorrect router MTU sizes (above 1492), trigger reconnect loops.",
  },
  {
    title: "Local Node ISP Congestion",
    desc: "Peak-hour bandwidth saturation at the local GPON splitter or cable node drops packet delivery, leading to high latency spikes.",
  },
  {
    title: "Bufferbloat Stalls",
    desc: "High upload traffic fills the modem's internal buffers, delaying TCP acknowledgment packets and causing connection time outs.",
  },
  {
    title: "DNS Server Failures",
    desc: "Slow or overloaded ISP-side DNS resolution servers fail to resolve domain names, making the internet appear completely offline.",
  },
];

export default function InternetKeepsDroppingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Internet Keeps Dropping: Complete Troubleshooting & Fix Guide"
      intro="Does your internet connection drop randomly throughout the day? Does your modem periodically lose sync, or does your fiber ONT blink red? This guide provides the technical methodology to isolate and resolve upstream internet drops — from cable signal levels and fiber optical power margins to PPPoE loops, conntrack limits, and ISP congestion."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Isolate Before You Call",
        text: "Before calling your ISP, always perform a direct-to-modem Ethernet test. If the connection is stable when connected directly to the modem, the problem is your local router or WiFi settings. ISPs will charge a service fee if they dispatch a technician only to find the issue was your personal router.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if direct-to-modem testing shows packet loss, or if your cable modem's downstream power is below -10 dBmV (with SNR below 32 dB) or upstream power is above 50 dBmV. Tell their support agent: 'My modem is losing upstream carrier sync due to low signal levels, and I need a technician to check the line drop.'"
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
            Quick Answer — How to Fix Internet Dropping
          </h2>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li>
              <strong>Perform isolation test:</strong> Connect a PC directly to the modem via Ethernet. If drops stop, your router is overloaded or failing.
            </li>
            <li>
              <strong>Check cables:</strong> Swap the WAN Ethernet cable between your modem and router with a new Cat6 cable to eliminate interface drops.
            </li>
            <li>
              <strong>Adjust MTU size:</strong> If your ISP uses PPPoE, configure your router's WAN MTU to exactly 1492 to prevent packet fragmentation.
            </li>
            <li>
              <strong>Clean up DNS:</strong> Set your router's WAN DNS to Cloudflare (1.1.1.1) and Google (8.8.8.8) to bypass unstable ISP DNS servers.
            </li>
            <li>
              <strong>Signal check:</strong> Access your cable modem at 192.168.100.1; downstream signal should be between -7 and +7 dBmV, and SNR above 33 dB.
            </li>
          </ul>
        </section>

        <article className="prose prose-invert max-w-none space-y-8 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          {/* Section 1: Isolate the Root Layer */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Isolating the Root Layer: Modem vs Router vs WiFi
            </h2>
            <p>
              When your internet drops, the first step is determining which device in your local network chain is failing. A home network has three potential failure points:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li><strong>The WiFi Link:</strong> Wireless interference or signal decay between your client device and the router.</li>
              <li><strong>The Router Gateway:</strong> The router fails to route local network traffic to the WAN port due to memory, CPU, or firmware errors.</li>
              <li><strong>The Modem / Line:</strong> The modem loses sync with the ISP's terminal server due to physical line noise or authentication drops.</li>
            </ol>
            <p className="mt-3">
              To isolate this, run a continuous ping test from a computer. Open two Command Prompt (Windows) or Terminal (Mac) windows:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>In Window 1, ping your router: <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">ping 192.168.1.1 -t</code> (replace with your gateway IP).</li>
              <li>In Window 2, ping a public server: <code className="bg-[var(--bg-elevated)] px-1 rounded text-red-400">ping 8.8.8.8 -t</code>.</li>
            </ul>
            <p className="mt-3">
              Watch the windows during a dropout. If both windows display 'Request Timed Out', your connection to the router has failed (WiFi or router crash). If your ping to <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[11px]">192.168.1.1</code> remains stable (e.g. 1ms, 0% packet loss) but <code className="bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[11px]">8.8.8.8</code> fails, your local network is fine — your modem or ISP line is dropping the connection.
            </p>
          </section>

          {/* Section 2: Fiber/GPON Problems */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Fiber/GPON Problems: Optical Power Margin & Transceiver Issues
            </h2>
            <p>
              Fiber-to-the-Home (FTTH) networks use **GPON (Gigabit Passive Optical Network)** systems. Unlike copper or coaxial cables, fiber transmits data using light pulses through glass fibers. These systems are highly reliable, but they are sensitive to signal loss caused by physical issues.
            </p>
            <p className="mt-3">
              **Optical Power Margin** is the measure of light signal strength. It is expressed in negative decibels (dBm). For a GPON ONT (Optical Network Terminal) to function correctly:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Excellent Signal:</strong> -15 dBm to -22 dBm.</li>
              <li><strong>Marginal Signal:</strong> -23 dBm to -26 dBm (intermittent packet loss may occur under thermal load).</li>
              <li><strong>Unusable Signal:</strong> -27 dBm or worse (the ONT's optical receiver cannot decode the light pulse, causing frequent PON sync loss).</li>
            </ul>
            <p className="mt-3">
              If your ONT's **PON (Passive Optical Network)** light flashes or its **LOS (Loss of Signal)** light blinks red, your optical signal has dropped below the threshold. Common causes include micro-bends in your fiber patch cord (sharp bends leak light out of the glass cladding) or dust on the SC/APC connector end-face. If your fiber patch cord has a sharp bend, straighten it immediately. If signal issues persist, request your ISP to clean the optical ports and measure attenuation with an OTDR (Optical Time-Domain Reflectometer).
            </p>
          </section>

          {/* Section 3: ISP Congestion and Node Saturation */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              ISP Congestion, Node Saturation, and Upstream Packet Loss
            </h2>
            <p>
              ISPs do not provide a dedicated, unshared connection line for each home. Instead, they run a single high-bandwidth connection line to a local neighborhood cabinet (called a **Node** in cable networks or an **OLT** in fiber networks) and split it among 32 to 128 homes.
            </p>
            <p className="mt-3">
              If your internet drops or slows down only in the evenings (typically between 7:00 PM and 11:00 PM), your neighborhood node is experiencing **Node Saturation**. When too many subscribers download video streams or games simultaneously, the node's output buffer fills up, causing it to drop excess packets. This is called congestion-induced packet loss.
            </p>
            <p className="mt-3">
              To diagnose node saturation, run a traceroute command:
            </p>
            <pre className="bg-[var(--bg-elevated)] p-3 rounded text-xs font-mono text-[var(--text-secondary)]">
              tracert google.com
            </pre>
            <p className="mt-3">
              Look at the round-trip times (latency) for each hop. Hop 1 is your local router. Hop 2 or 3 is your ISP's local gateway. If Hop 1 shows 1ms, but Hop 2 jumps from 15ms during the day to 150ms+ at night with asterisk (*) symbols (indicating dropped packets), your ISP's local node is saturated. Report these traceroute results to your ISP's tier-2 support.
            </p>
          </section>

          {/* Section 4: PPPoE Reconnect Loops */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              PPPoE Reconnect Loops and MTU Configuration
            </h2>
            <p>
              Many DSL and fiber connections require your router to authenticate using **PPPoE (Point-to-Point Protocol over Ethernet)**. PPPoE wraps your standard IP traffic inside an authentication layer. This wrapper takes up 8 bytes of space in each packet header.
            </p>
            <p className="mt-3">
              Standard Ethernet has a maximum packet size of 1500 bytes (called the **MTU / Maximum Transmission Unit**). Because PPPoE consumes 8 bytes, the actual payload size must be restricted to **1492 bytes**.
            </p>
            <p className="mt-3">
              If your router's WAN MTU size is left at the default 1500 on a PPPoE connection, large packets (like security handshakes or media streams) will exceed the MTU and get fragmented. If the ISP's terminal server drops fragmented packets, the PPPoE session will crash, causing a reconnect loop.
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Log into your router admin panel and open WAN Settings.</li>
              <li>Locate the <strong>Connection Type</strong> option and verify it is set to PPPoE.</li>
              <li>Find the <strong>MTU</strong> (or MRU) field and change it from 1500 to **1492**.</li>
              <li>Click Save and reboot your router to apply the new packet size limits.</li>
            </ol>
          </section>

          {/* Section 5: Latency Spikes and Bufferbloat */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Latency Spikes and Bufferbloat: How Upload Saturation Kills Connections
            </h2>
            <p>
              Most home internet plans are asymmetrical — they provide fast download speeds but slow upload speeds. For example, a cable plan might provide 300 Mbps download but only 10 Mbps upload.
            </p>
            <p className="mt-3">
              When a device on your network uploads a file, backs up photos, or runs a cloud sync, it can easily saturate the upload channel. When the upload channel is saturated, the modem's internal memory buffer fills up with pending packets. This is called **Bufferbloat**.
            </p>
            <p className="mt-3">
              When bufferbloat occurs, simple network acknowledgement packets (TCP ACK) get stuck in line behind the large upload packets. If your computer cannot send ACK packets back to a website, the website stops sending data, assuming your connection has dropped. Your ping latency will spike from 20ms to 1000ms+, causing real-time applications to drop the connection.
            </p>
            <p className="mt-3">
              To fix this:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Log into your router, find the **QoS** or **Bandwidth Control** settings, and enable it.</li>
              <li>Set the router's upload bandwidth limit to 90% of your actual speed test result (for example, if you get 10 Mbps upload, set QoS upload limit to 9 Mbps).</li>
              <li>This forces the router to queue packets before they reach the modem, keeping the modem's buffer empty and maintaining low latency.</li>
            </ol>
          </section>

          {/* Related Troubleshooting Guides */}
          <section className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-2xl">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Related Troubleshooting Guides
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <li>
                <a href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">
                  WiFi Keeps Disconnecting Troubleshooting
                </a>
              </li>
              <li>
                <a href="/how-to-improve-wifi-signal" className="text-[var(--brand-400)] hover:underline">
                  How to Improve WiFi Signal & Range
                </a>
              </li>
              <li>
                <a href="/router-keeps-restarting" className="text-[var(--brand-400)] hover:underline">
                  Router Keeps Restarting Fixes
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
                  Router Login & Gateway Guide
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
