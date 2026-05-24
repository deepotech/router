import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Modem Online Light Blinking? DOCSIS Channel Bonding & Signal Fix (2026)",
  description:
    "Is your modem online light blinking? Discover how to fix DOCSIS upstream channel sync issues, coax attenuation, splitter signal loss, and fiber ONT registration faults.",
  canonical: "/modem-online-light-blinking",
  keywords: [
    "modem online light blinking",
    "DOCSIS sync issue",
    "modem upstream problem",
    "coaxial signal attenuation",
    "GPON ONT loss of signal",
    "upstream T3 timeout"
  ],
});

const breadcrumbs = [
  { name: "Internet Fixes", url: "/wifi-connected-but-no-internet-phone" },
  { name: "Modem Online Light Blinking", url: "/modem-online-light-blinking" },
];

const troubleshootingSteps = [
  {
    title: "Remove Coaxial Cable Splitters",
    description: "Trace the coaxial cable from the back of the modem back to the wall socket. Remove any intermediate splitters or cable TV adapters, and connect the RG6 cable directly from the wall plate to the modem.",
    tip: "Each open port on a coaxial splitter attenuates the incoming radio frequency signal by -3.5dB to -7dB, frequently dropping upstream power levels out of specification."
  },
  {
    title: "Inspect Coaxial Pin and Connector Tightness",
    description: "Unplug the coaxial connector. Ensure the center copper conductor pin is perfectly straight, shiny, and extends exactly 1/16th of an inch beyond the collar. Reconnect and hand-tighten until snug.",
    tip: "Loose F-type connectors act as antennas, introducing RF noise from cellular antennas and electrical lines into the shielding."
  },
  {
    title: "Inspect ONT Fiber Cable Bend Radius",
    description: "If utilizing a fiber optic connection, verify that the thin SC/APC fiber patch cord connecting your wall plate to the ONT is completely straight. Ensure there are no tight coils, kinks, or cable pinches.",
    tip: "Fiber cables use light refraction. Bending the cable beyond a 30mm radius scatters light, dropping signal levels below the ONT receiver threshold."
  },
  {
    title: "Power Cycle the Modem First, Then the Router",
    description: "Disconnect the power plug from the wall outlet. Wait 2 minutes for the ISP local CMTS to clear your MAC address binding. Reconnect power and wait for the 'Online' LED to turn solid before powering your router.",
  }
];

const faqs = [
  {
    question: "Why is my modem's online light blinking while the power light is solid?",
    answer: "A blinking online light indicates that the modem has completed physical Layer 1 downstream sync, but is failing to negotiate upstream channel bonding (DOCSIS Layer 2) or secure its provisioning boot file from the ISP."
  },
  {
    question: "What is an Upstream T3 or T4 Timeout?",
    answer: "T3/T4 timeouts are formal DOCSIS protocol errors indicating that the modem sent ranging requests to the ISP central server but received no acknowledgement. This is caused by electrical noise leaking into neighborhood cable taps."
  },
  {
    question: "Can an old Ethernet cable cause a blinking online light?",
    answer: "No. The online light represents the connection between the modem and the ISP's external coaxial or fiber network. The Ethernet cable only handles local LAN traffic between the modem and your router."
  }
];

const commonCauses = [
  {
    title: "RF Signal Attenuation",
    desc: "Excessive coaxial splitters dropping downstream signal power below the required -15dBmV DOCSIS minimum threshold."
  },
  {
    title: "T3 Upstream Timeouts",
    desc: "Ingress RF noise leaking into local neighborhood coaxial distribution taps, blocking upstream ranging responses."
  },
  {
    title: "Fiber LOS Red Light",
    desc: "Optical patch cord micro-bends or dust on the SC/APC connector scattering the light signal, causing optical sync dropouts."
  },
  {
    title: "Provisioning Block",
    desc: "The ISP CMTS failing to push the configuration boot profile to the modem due to an unprovisioned MAC status."
  }
];

const quickFixChecklist = [
  "Bypass all multi-way coaxial splitters and connect directly to the main line.",
  "Check the F-connector on the modem and hand-tighten it securely.",
  "Ensure the green fiber optical cable tip is firmly clicked into the ONT port.",
  "Unplug the modem power cord for 2 full minutes to force re-ranging.",
  "Verify if your neighbors are experiencing a local ISP outage."
];

export default function ModemOnlineLightBlinkingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Modem Online Light Blinking? DOCSIS Channel Bonding & Signal Fix (2026)"
      intro="Is your cable modem or fiber ONT failing to sync with the network, leaving you with a flashing 'Online' or 'PON' light? Learn how to diagnose coaxial attenuation, resolve DOCSIS T3 timeouts, clear ingress RF noise, and troubleshoot fiber ONT registration loops."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Important: Physical Line Handling Caution",
        text: "Fiber optic cables transmit invisible infrared laser light that can cause permanent retinal damage. Never look directly into the end of a disconnected fiber patch cord or ONT port. Coaxial lines can carry minor electrical current; avoid handling wet cables."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If bypassing splitters does not resolve the blinking online light, your upstream transmit power has likely exceeded 54dBmV or downstream power has dropped below -15dBmV. Contact your ISP and specifically request an audit of your line's Upstream Transmit Power and Signal-to-Noise Ratio (SNR) levels."
      severityLevel="high"
    >
      <div className="space-y-6">
        {/* Quick Answer Snippet for AI Search Engines */}
        <section className="glass-card p-5 border border-red-950/20 bg-red-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wide">Quick Diagnostic Summary</h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li><strong>Symptoms:</strong> The modem's 'Online', 'Sync', or 'PON' light flashes continuously, dropping all WAN internet routing.</li>
            <li><strong>Most Likely Cause:</strong> Coaxial RF signal attenuation from cable splitters, or high ingress noise leaking into neighborhood distribution taps.</li>
            <li><strong>Fastest Safe Fix:</strong> Remove all multi-way coaxial splitters, hand-tighten the F-connector on the wall plate and modem, and power cycle the modem for 2 minutes.</li>
          </ul>
        </section>

        <ConnectionOptimizerClient mode="modem-sync" />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Symptoms vs. Root Causes Diagnostic Table</h2>
          <p>
            Modems operate on physical radio frequencies. Use this diagnostic table to determine which part of the sync process is failing based on LED behaviors:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed LED Status</th>
                  <th className="px-3 py-2 text-left">Likely Physical/Protocol Cause</th>
                  <th className="px-3 py-2 text-left">Network Standard</th>
                  <th className="px-3 py-2 text-left">Primary Diagnostic Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono">Power solid, Downstream blinking</td>
                  <td className="px-3 py-2">Fails to secure lock on primary downstream frequency</td>
                  <td className="px-3 py-2">DOCSIS 3.0 / 3.1</td>
                  <td className="px-3 py-2">Bypass all splitters, tighten F-connector</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Downstream solid, Upstream blinking</td>
                  <td className="px-3 py-2">Fails channel bonding (T3 upstream ranging timeout)</td>
                  <td className="px-3 py-2">DOCSIS 3.0 / 3.1</td>
                  <td className="px-3 py-2">Check tapped lines for ingress noise</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Down/Up solid, Online blinking</td>
                  <td className="px-3 py-2">Auth fail (TFTP boot file download timed out)</td>
                  <td className="px-3 py-2">DOCSIS 3.0 / 3.1</td>
                  <td className="px-3 py-2">ISP must provision MAC address</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">PON light solid off, LOS blinking RED</td>
                  <td className="px-3 py-2">Optical power below -28dBm (broken fiber path)</td>
                  <td className="px-3 py-2">GPON Fiber ONT</td>
                  <td className="px-3 py-2">Check fiber patch cord bends / call ISP</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">What Happens Internally During Modem Sync?</h2>
          <p>
            When you power on a DOCSIS cable modem, it initiates a highly structured, step-by-step synchronization sequence with the ISP's Cable Modem Termination System (CMTS). 
          </p>
          <p>
            First, the modem scans the physical coaxial spectrum to find a downstream channel (Layer 1). Once locked, it reads the Upstream Channel Descriptor (UCD) packets to identify the return path frequency. It then begins a process called **Ranging**, sending a series of ping requests to the CMTS and adjusting its upstream transmit power until the signals match. Once ranging is successful, the modem uses DHCP to request an IP address, then downloads its specific configuration boot profile (which caps its upload and download speeds) via TFTP. 
          </p>
          <p>
            If any step in this sequence is interrupted—such as high downstream attenuation causing a ranging failure, or neighborhood electrical noise drowning out ranging responses (triggering T3 timeouts)—the modem cannot establish dynamic channel bonding. The online light continues to blink, denying LAN-bound traffic access to the wider internet.
          </p>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Deep Diagnostics & Internal Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If your physical ports are negotiation slower than usual, read our <a href="/ethernet-slower-than-wifi" className="text-[var(--brand-400)] hover:underline">Ethernet Slower than WiFi Analysis</a>.</li>
              <li>Learn how to optimize routing targets with our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet Guide</a>.</li>
              <li>Verify your gateway configuration endpoints at the <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Gateway Portal</a>.</li>
              <li>Analyze your wireless dropouts using the <a href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">WiFi Disconnection Walkthrough</a>.</li>
              <li>Check your physical WAN link status using the <a href="/router-blinking-orange" className="text-[var(--brand-400)] hover:underline">Router Blinking Orange Guide</a>.</li>
            </ul>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">When Hardware is Physically Failing</h2>
          <p>
            If your modem regularly drops sync during hot days or peak hours despite direct coax connections, the device's physical circuitry may be failing:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>F-Port Solder Joint Fatigue:</strong> Repeatedly twisting coaxial cables can crack the internal solder joints linking the F-port connector to the modem's printed circuit board (PCB). This creates a high-resistance barrier that attenuates RF signal power.
            </li>
            <li>
              <strong>SoC Thermal Degradation:</strong> Modems contain signal processors that run warm. If the ventilation slots gather dust, the processor throttles its frequency decoding chips, leading to demodulation errors and sync loss.
            </li>
            <li>
              <strong>Capacitor Failure:</strong> Degraded power supply filter capacitors inside the modem fail to deliver smooth DC power, corrupting the delicate analog tuner circuits responsible for locking channel frequencies.
            </li>
          </ul>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Commercial Intent: Fiber vs. Cable Upgrades</h2>
          <p>
            If your neighborhood's coaxial infrastructure is aging and subject to continuous RF noise leaks, upgrading to **Fiber Optic (GPON/XGS-PON)** internet is the most permanent resolution. Fiber optic lines utilize glass conductors to transmit light, making them immune to cellular, radio, or electromagnetic interference.
          </p>
          <p>
            If fiber is unavailable, consider upgrading your cable modem to a **DOCSIS 3.1** unit. DOCSIS 3.1 modems utilize Orthogonal Frequency Division Multiplexing (OFDM) to bundle thousands of micro-carriers, allowing them to route data around frequency blocks affected by local RF noise, providing more stable connections than older DOCSIS 3.0 systems.
          </p>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
