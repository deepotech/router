import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";

export const metadata: Metadata = buildMetadata({
  title: "Router Keeps Restarting? Fix Random Reboots (2026 Guide) — RouterVia",
  description:
    "Is your router randomly rebooting? Fix overheating, faulty power adapters, firmware corruption, ISP provisioning loops, capacitor aging, and power surge damage with our complete 2026 guide.",
  canonical: "/router-keeps-restarting",
  keywords: [
    "router keeps restarting",
    "router randomly rebooting",
    "router power cycling",
    "router overheating fix",
    "router firmware corruption",
    "router capacitor failure",
    "power surge router damage",
    "faulty power adapter router",
  ],
});

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Router Problems", url: "/router-login" },
  { name: "Router Keeps Restarting", url: "/router-keeps-restarting" },
];

const troubleshootingSteps = [
  {
    title: "Verify Power Adapter Voltage and Amperage",
    description:
      "Check the label on your router's DC power adapter. Compare the output voltage (V) and current (A) against the requirements printed on the router's label or in the manual. A common mismatch: a 1.5A adapter powering a router requiring 2.0A will cause brownout reboots under load when the processor spikes.",
    tip: "Even adapters with correct voltage can fail to deliver rated current if their internal capacitors have aged. Use a multimeter to measure actual output under load if reboots persist.",
  },
  {
    title: "Improve Router Ventilation and Cooling",
    description:
      "Move the router to an open area with at least 3 inches of clearance on all sides. Remove it from TV cabinets, drawers, and enclosed shelving. Use compressed air to clear dust from ventilation slots. Most consumer routers thermal shutdown at 85-95°C CPU temperature.",
    tip: "Touch the router chassis after a reboot cycle while it's cool — excessive heat retention or hot spots on the housing indicate ventilation blockage.",
  },
  {
    title: "Flush NVRAM Partition via Hard Factory Reset",
    description:
      "Press and hold the physical reset button on the rear panel for 15 seconds while powered. This clears old NVRAM variables from previous firmware flashes that cause kernel crashes.",
  },
  {
    title: "Disable UPnP and Port Forwarding Overload",
    description:
      "Log into the admin panel, navigate to WAN settings, and disable UPnP. Stale NAT mapping allocations can overflow the router conntrack table, triggering kernel panics.",
    tip: "High-volume torrent or gaming traffic creates thousands of temporary NAT mappings that overwhelm legacy memory tables.",
  },
  {
    title: "Inspect Internal Capacitors for Bulging",
    description:
      "If the router is out of warranty, open the chassis. Inspect the electrolytic capacitors on the motherboard. Bulging tops, leaking electrolyte, or tilted casings indicate capacitor failure. Replace the capacitors or upgrade the router.",
  },
  {
    title: "Disable TR-069 ISP Remote Management",
    description:
      "In the router settings, go to Administration → TR-069 or Remote Management. Disable remote provisioning updates. Some ISPs push bad firmware files that trigger boot loops.",
  },
  {
    title: "Use a Dedicated Surge Protector or UPS",
    description:
      "Plug the router's power supply into a surge protector or UPS. High line voltage fluctuations or utility grid sags cause sensitive SoCs to reset.",
  },
  {
    title: "Re-flash Firmware in Rescue Recovery Mode",
    description:
      "If your router is boot-looping immediately upon power-on, boot into its Recovery Mode (usually accessed by holding the reset button while inserting the power cord). Upload a fresh, uncorrupted firmware file via the Web UI interface.",
  },
];

const faqs = [
  {
    question: "Why does my router restart only under heavy download load?",
    answer:
      "When you download files or stream high-definition media, the router's CPU operates at peak utilization, which spikes both its temperature and the current drawn from the power supply. If the power adapter's capacitors are degraded or the SoC cooling is insufficient, the system brownouts or thermal shuts down.",
  },
  {
    question: "Can a bad firmware update cause a router reboot loop?",
    answer:
      "Yes. If firmware variables are corrupt or incompatible with legacy NVRAM configurations, the operating system kernel will trigger a kernel panic. The hardware Watchdog Timer (WDT) monitors this freeze and cuts power to reboot the device.",
  },
  {
    question: "How do I know if my modem is failing instead of the router?",
    answer:
      "Check the status LEDs on both devices. If the modem's link or online lights flash before a reset while the router's power light remains solid, the modem is dropping sync due to coaxial signal noise or GPON ONT authentication timeouts.",
  },
  {
    question: "Why does my router reboot during power fluctuations?",
    answer:
      "Consumer routers have minimal input power regulation. If your home's electrical line drops below 110V (a brownout) or experiences a spike, the DC converter cannot maintain the stable voltage required by the CPU, triggering a reset.",
  },
  {
    question: "Does overheating cause permanent damage to routers?",
    answer:
      "Modern SoCs have thermal shutdown thresholds to prevent permanent damage. However, prolonged operation at high temperatures (70°C+) accelerates capacitor aging, reducing their capacitance and eventually causing hardware failure.",
  },
  {
    question: "What is TR-069 and how can it cause a reboot loop?",
    answer:
      "TR-069 is a protocol ISPs use to manage devices remotely. If the ISP's auto-configuration server (ACS) pushes an incompatible configuration profile, the router may crash, reboot, and request the profile again, creating a loop.",
  },
  {
    question: "How do I know if my power adapter is faulty?",
    answer:
      "If the adapter is hot to the touch, emits a high-pitched whining noise, or fails to power the router under heavy traffic, it is likely faulty. You can verify this by replacing it with a matching 12V adapter from an old device.",
  },
  {
    question: "Can conntrack table overflow restart a router?",
    answer:
      "Yes. If your router has limited RAM (e.g. 128MB) and you run applications that open thousands of concurrent connections, the NAT conntrack table will fill up. If the router cannot drop old connections fast enough, it crashes.",
  },
  {
    question: "What is a Watchdog Timer (WDT) in routers?",
    answer:
      "A Watchdog Timer is a hardware chip that requires the router's firmware to send a pulse at regular intervals. If the firmware freezes due to a bug, no pulse is sent, and the WDT cuts power to force a system reboot.",
  },
  {
    question: "Why does my router reboot when I plug in an Ethernet cable?",
    answer:
      "This indicates a physical short circuit or ground loop. If the Ethernet cable has damaged pins or the connected device has a faulty power supply, current can leak into the router's ground plane, triggering a reboot.",
  },
  {
    question: "How do I access router Rescue Mode?",
    answer:
      "Unplug the power. Hold the physical reset button. While holding it, plug the power cable back in. Keep holding it for 10-15 seconds until the power light flashes slowly, indicating the recovery web server is active.",
  },
  {
    question: "Should I install custom firmware if my router keeps restarting?",
    answer:
      "If the restarting is caused by stock firmware bugs, custom firmware (like OpenWrt or DD-WRT) can resolve it. However, if the restarts are caused by overheating or a failing power adapter, custom firmware will not fix it.",
  },
];

const quickFixChecklist = [
  "Verify the power adapter matches the router's voltage and amperage requirements",
  "Move the router to an open, well-ventilated area to prevent overheating",
  "Use compressed air to clean dust from the router's ventilation slots",
  "Perform a hard factory reset to clear corrupt NVRAM variables",
  "Disable UPnP to prevent conntrack table overflow under load",
  "Check the motherboard capacitors for visible bulging or leaking",
  "Disable TR-069 remote management in the administration panel",
  "Plug the router into a surge protector or UPS to stabilize input voltage",
  "Reinstall the latest stable firmware version via Ethernet",
  "Replace the DC power adapter with a known-good matching unit",
];

const commonCauses = [
  {
    title: "Thermal SoC Shutdown",
    desc: "Obstructed air vents trigger emergency thermal protection routines on the dual-core processor, shutting down the board to prevent permanent silicon fusion.",
  },
  {
    title: "Power Supply Sag (Brownout)",
    desc: "Degraded transformer brick capacitors fail to maintain steady DC output when the router's radio amplifiers pull peak current during heavy packet routing.",
  },
  {
    title: "Conntrack Table Overflow",
    desc: "Thousands of concurrent NAT connections from active clients exhaust the router's RAM buffer, forcing kernel watchdog loops.",
  },
  {
    title: "ISP Provisioning Loop",
    desc: "The upstream ONT or cable tap drops signal synchronization, triggering aggressive DHCP requests that crash unstable router WAN daemons.",
  },
  {
    title: "NVRAM Corruption",
    desc: "Leftover configuration parameters from older firmware versions cause database conflicts in the system partition, leading to kernel panics.",
  },
  {
    title: "Capacitor Aging",
    desc: "Electrolytic capacitors dry out or bulge over years of operation, introducing voltage ripple that destabilizes the router's CPU.",
  },
];

export default function RouterKeepsRestartingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Router Keeps Restarting? Causes & 10 Proven Fixes"
      intro="Is your router randomly power cycling, rebooting under load, or stuck in a boot loop? Router instability ruins online gaming, drops work video calls, and disrupts smart home devices. This comprehensive guide details the hardware and software causes of router restarts — including thermal throttling, power supply sag, capacitor failure, and NVRAM corruption — and how to fix them."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Check Power Mismatch First",
        text: "Using a power adapter from a different device (like an old modem or external hard drive) is the number one cause of boot loops. Even if the plug fits, the voltage or amperage may not match, starving the router CPU of power under load.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if you are using their provided gateway device and it continues to reboot after a factory reset. Request a replacement unit, as the internal flash memory or capacitors have likely degraded. Mention: 'The gateway's hardware watchdog is triggering restarts under normal download load, and I need a replacement unit.'"
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
            Quick Answer — Fix Router Restarting
          </h2>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li>
              <strong>Thermal Shutdown:</strong> Ensure the router is out of closed cabinets and dust-free; SoCs automatically reboot at ~90°C to prevent damage.
            </li>
            <li>
              <strong>Check Power Adapter:</strong> Verify the power adapter matches the router's required specs (e.g. 12V / 2.0A). Mismatched current causes brownouts.
            </li>
            <li>
              <strong>NVRAM Flush:</strong> Hold the reset button for 15 seconds to clear corrupt firmware database entries that cause boot loops.
            </li>
            <li>
              <strong>Capacitor Failure:</strong> If the router is 3+ years old and restarts frequently, its internal capacitors are likely failing or bulging.
            </li>
            <li>
              <strong>Disable UPnP:</strong> Turn off UPnP in the router WAN settings to prevent memory overflows from high-volume peer-to-peer applications.
            </li>
          </ul>
        </section>

        <article className="prose prose-invert max-w-none space-y-8 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          {/* Section 1: Overheating & Thermal Throttling */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Thermal Overheating & SoC Protection Loops
            </h2>
            <p>
              Modern wireless routers are compact computers. They contain high-speed processors (SoCs), RAM buffers, and radio frequency amplifiers. As routers pack more antennas and support higher standards (like WiFi 6E and WiFi 7), they generate significant heat.
            </p>
            <p className="mt-3">
              Consumer routers are passively cooled, relying on vents and internal heat sinks to dissipate heat. If the router is placed in an enclosed space (like a TV cabinet or shelf), air cannot circulate, and internal junction temperatures will rise.
            </p>
            <p className="mt-3">
              When the CPU temperature crosses the safety threshold (typically 85°C to 95°C), the SoC triggers a hardware protection interrupt, cutting power to the board to prevent permanent silicon damage. The router then reboots, works until it warms up again, and re-triggers the shutdown, creating a cycle of drops.
            </p>
            <p className="mt-3">
              To resolve this:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Move the router out of closed cabinets or drawers.</li>
              <li>Position it on a hard, flat surface (never on carpets or soft fabrics, which block bottom intake vents).</li>
              <li>Use a can of compressed air to clean dust out of the vents.</li>
              <li>Elevate the router slightly by placing rubber feet on the bottom to improve under-chassis airflow.</li>
            </ul>
          </section>

          {/* Section 2: Faulty Power Adapters & Current Sag */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Faulty Power Adapters & Current Sag (Power Supply Sag)
            </h2>
            <p>
              A router's DC power adapter (the power brick) converts high-voltage AC current from your wall outlet into low-voltage DC current (typically 12V or 5V) for the router's motherboard.
            </p>
            <p className="mt-3">
              When the router is idle, it consumes very little power. However, when you start a large download, stream video, or connect multiple devices, the router's CPU spikes to high utilization and its radio amplifiers increase transmit power. This sudden demand pulls more current (amperes) from the power adapter.
            </p>
            <p className="mt-3">
              If the power adapter's internal transformer coils have degraded or its capacitors have aged, it cannot maintain the stable voltage rail under load. The output voltage will drop (sag) below the minimum threshold (for example, dropping from 12V to 9V). This starves the router's CPU, triggering a **Brownout Reset** identical to power-cycling the device.
            </p>
            <p className="mt-3">
              Verify your adapter's specifications match the router's label. If you suspect the adapter is failing, replace it with a high-quality regulated DC power supply matching the exact voltage and meeting or exceeding the required current rating.
            </p>
          </section>

          {/* Section 3: Capacitor Aging & Board-Level Failures */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Capacitor Aging & Board-Level Hardware Failure
            </h2>
            <p>
              Electrolytic capacitors are used on a router's motherboard to smooth out input voltage and filter out high-frequency electrical noise. These capacitors are filled with liquid electrolyte.
            </p>
            <p className="mt-3">
              Over 3 to 5 years of continuous operation at high temperatures, the liquid electrolyte inside the capacitors dries out, or high voltage spikes cause them to fail. This is known as **Capacitor Aging**.
            </p>
            <p className="mt-3">
              Bulging tops, brown crusty deposits on the motherboard, or tilted casings indicate capacitor failure. When capacitors lose their capacitance, they fail to regulate voltage, allowing voltage ripple to reach the CPU, triggering spontaneous restarts.
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-3 py-2 text-left">Capacitor State</th>
                    <th className="px-3 py-2 text-left">Visual Indicators</th>
                    <th className="px-3 py-2 text-left">Electrical Impact</th>
                    <th className="px-3 py-2 text-left">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr>
                    <td className="px-3 py-2 font-semibold">Healthy</td>
                    <td className="px-3 py-2">Flat metal top, no residue</td>
                    <td className="px-3 py-2">Stable voltage regulation</td>
                    <td className="px-3 py-2">No action required</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Bulging / Domed</td>
                    <td className="px-3 py-2 text-amber-400">Metal top curved upward</td>
                    <td className="px-3 py-2">High voltage ripple, unstable CPU</td>
                    <td className="px-3 py-2">Replace capacitor or upgrade router</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Leaking / Failed</td>
                    <td className="px-3 py-2 text-red-400">Brown crusty residue on top or base</td>
                    <td className="px-3 py-2">Zero voltage smoothing, reboot loops</td>
                    <td className="px-3 py-2">Replace router immediately</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Firmware Panic Loops */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Firmware Panic Loops and NVRAM Corruption
            </h2>
            <p>
              Your router stores its settings in a dedicated non-volatile memory partition called **NVRAM (Non-Volatile RAM)**. When you upgrade your router's firmware, the new operating system attempts to read settings from NVRAM.
            </p>
            <p className="mt-3">
              If the settings structure has changed between versions, old configuration variables can conflict with the new code, triggering a **Kernel Panic** (the router equivalent of a Blue Screen of Death). When a kernel panic occurs, the hardware's Watchdog Timer (WDT) detects the freeze and reboots the system to recover, creating a boot loop.
            </p>
            <p className="mt-3">
              To resolve firmware corruption:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Perform a factory reset: Press and hold the physical reset button on the back of the router for 15 seconds.</li>
              <li>If the router is boot-looping and you cannot access the admin panel, boot the router into **Rescue Mode**.</li>
              <li>Rescue Mode runs a minimal bootloader web server, allowing you to upload a clean firmware file directly to flash memory.</li>
            </ol>
          </section>

          {/* Section 5: TR-069 & ISP Management Loops */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              TR-069 and ISP Remote Provisioning Loops
            </h2>
            <p>
              If your router was provided by your internet service provider, it likely has **TR-069 (Technical Report 069)** enabled. TR-069 is a protocol that allows the ISP's Auto-Configuration Server (ACS) to manage, monitor, and configure your gateway remotely.
            </p>
            <p className="mt-3">
              If the ACS server pushes a configuration file containing invalid syntax or incompatible settings, the router's configuration parser may crash. During startup, the router contacts the ACS server, receives the bad configuration file, crashes, restarts, and repeats the cycle.
            </p>
            <p className="mt-3">
              If your restarts began immediately after your ISP pushed a network update, log into the router settings (if accessible), navigate to **CWMP** or **TR-069 Settings**, and disable the service. Alternatively, contact your ISP's support team and request them to clear pending configuration profiles for your MAC address.
            </p>
          </section>

          {/* Related Troubleshooting Guides */}
          <section className="glass-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-2xl">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Related Troubleshooting Guides
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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
                <a href="/router-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">
                  Router Keeps Disconnecting Guide
                </a>
              </li>
              <li>
                <a href="/why-is-my-router-so-slow" className="text-[var(--brand-400)] hover:underline">
                  Why Is My Router So Slow?
                </a>
              </li>
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
                <a href="/internet-keeps-dropping" className="text-[var(--brand-400)] hover:underline">
                  Internet Keeps Dropping Guide
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
                <a href="/wifi-security" className="text-[var(--brand-400)] hover:underline">
                  WiFi Security & WPA3 Guide
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
