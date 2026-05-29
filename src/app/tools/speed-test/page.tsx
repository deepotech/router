import { Gauge } from "lucide-react";
import { SpeedTestTool } from "@/components/tools/SpeedTestTool";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Internet Speed Test: Test Wi-Fi Speed & Latency",
  description: "Check your internet speed instantly. Measure download, upload, ping, and jitter. Includes deep diagnostics and recommended configurations.",
  alternates: {
    canonical: `${APP_URL}/tools/speed-test`,
  },
  keywords: [
    "internet speed test",
    "wifi speed test",
    "broadband speed checker",
    "test internet speed",
    "ping test",
    "gaming latency test",
    "internet performance checker"
  ]
};

const breadcrumbs = [
  { label: "Tools", href: "/tools" },
  { label: "Speed Test", href: "/tools/speed-test" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a good ping for online gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good ping is generally under 30ms. Pings between 30ms and 60ms are highly acceptable for casual gaming, while anything above 100ms can result in noticeable lag, input delays, and matchmaking disadvantages in competitive fast-paced lobbies."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my upload speed so much slower than my download speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asymmetric connections (like cable coax or DSL) allocate the majority of frequency bandwidth to download channels, as most users consume far more media than they upload. Symmetrical speeds, where upload equals download, are typically only available on Fiber-to-the-Home (FTTH) networks."
      }
    },
    {
      "@type": "Question",
      "name": "Why is Wi-Fi slower than a direct wired Ethernet cable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wi-Fi operates over shared radio frequencies prone to interference from walls, household appliances, and neighboring networks. Direct Ethernet connections utilize dedicated copper shielding, eliminating packet collisions, signal attenuation, and high latency spikes."
      }
    },
    {
      "@type": "Question",
      "name": "What internet speed do I need for standard online gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gaming requires very little bandwidth; a stable 5 Mbps to 15 Mbps download and 2 Mbps to 5 Mbps upload is sufficient. However, gaming requires low latency (ping under 40ms) and zero packet loss to remain smooth and responsive under network demands."
      }
    },
    {
      "@type": "Question",
      "name": "Why is packet loss bad for my internet connection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Packet loss happens when data blocks fail to reach their target. In TCP/IP, the receiving device must wait and ask for a retransmission, slowing down page loads. In real-time UDP applications (like voice calls or gaming), lost packets present as choppy audio, teleporting characters, or total dropouts."
      }
    }
  ]
};

export default function SpeedTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <Breadcrumb items={breadcrumbs} className="mb-4" />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/20 border border-amber-800/40 flex items-center justify-center">
              <Gauge size={24} className="text-amber-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Internet <span className="gradient-text">Speed Test</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Accurately analyze your connection download, upload, ping, and packet jitter using our high-speed global testing engine.
          </p>
        </div>

        {/* Interactive Speed Test Tool Panel */}
        <div className="max-w-3xl mx-auto">
          <SpeedTestTool />
        </div>

        {/* Long-Form Educational SEO Content */}
        <section className="max-w-4xl mx-auto space-y-12 border-t border-[var(--border-subtle)] pt-16">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
            <h2 className="text-xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Understanding Broadband Performance Metrics
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)]">
              Learn how download bandwidth, upload throughput, packet jitter, and latency affect your day-to-day internet experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            
            {/* Section 1 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">1</span>
                What Is Internet Speed?
              </h3>
              <p>
                Internet speed represents the capacity of your connection to transmit data packets between your local network device and the external web. It is measured in **Mbps (Megabits per second)** or **Gbps (Gigabits per second)**. Rather than representing physical acceleration, it represents **bandwidth volume**—the total amount of information routed down your link in a single second.
              </p>
            </article>

            {/* Section 2 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">2</span>
                What Is a Good Download Speed?
              </h3>
              <p>
                A download speed above **100 Mbps** is considered excellent for most household networks. For single-user browsing and HD streaming, **25 Mbps** is the FCC broadband standard. However, smart homes, multi-device households, and 4K UHD streaming setups require higher parameters (e.g. **250 Mbps to 1 Gbps**) to ensure multiple nodes do not congest the link.
              </p>
            </article>

            {/* Section 3 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">3</span>
                What Causes High Ping and Jitter?
              </h3>
              <p>
                **Ping (latency)** is the round-trip travel time for a packet of data from your client PC to a server and back. High ping is caused by physical distance to the host, bad routing choices by your ISP, Wi-Fi channel interference, or router bufferbloat—where heavy downstream traffic keeps timing-critical packets waiting in queues.
              </p>
            </article>

            {/* Section 4 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">4</span>
                How to Improve Your Wi-Fi Speed
              </h3>
              <p>
                To immediately boost your Wi-Fi speeds:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-[var(--text-muted)] font-semibold">
                <li>Migrate high-bandwidth systems strictly to the <strong>5 GHz or 6 GHz</strong> wireless bands.</li>
                <li>Reposition your wireless router to an elevated, central location free from physical obstructions.</li>
                <li>Log in to your admin console and fix channels to clean non-overlapping frequencies.</li>
              </ul>
            </article>

            {/* Section 5 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">5</span>
                The Impact of Custom DNS on Gaming Latency
              </h3>
              <p>
                Changing your recursive DNS resolver does not change your raw physical ping during active gameplay. However, setting manual high-speed resolvers (like Cloudflare 1.1.1.1 or Google DNS) speeds up initial server name lookup connections and lookup metrics, making voice lobbies join faster and avoiding DNS timeout timeouts.
              </p>
            </article>

            {/* Section 6 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">6</span>
                Wired Ethernet vs. Wireless Wi-Fi
              </h3>
              <p>
                Wired Ethernet cables provide a dedicated, shielded channel for network packets. While modern Wi-Fi 6E/7 offers massive wireless throughput, it is still subject to collision-avoidance delays (CSMA/CA) and radio noise. Direct Ethernet eliminates packet drops, lowers ping jitter, and locks maximum duplex speeds.
              </p>
            </article>

            {/* Section 7 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">7</span>
                Broadband Technologies: Fiber vs. DSL vs. 5G
              </h3>
              <p>
                **Fiber (FTTH)** uses light signals over glass cables, offering symmetrical speeds up to 10 Gbps and lowest latency. **DSL** relies on legacy copper telephone wires and drops speed quickly over distance. **5G Home Internet** routes packets wirelessly to cellular masts, providing fast speeds but fluctuating depending on weather and cell congestion.
              </p>
            </article>

            {/* Section 8 */}
            <article className="space-y-2.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">8</span>
                Why Upload Speed Matters More Than You Think
              </h3>
              <p>
                While download gets the most attention, upload speed is vital. Outgoing packets handle cloud synchronization, file shares, video calls, smart home security cameras, and outgoing gaming packets. If upload is completely choked, download traffic will also halt because TCP packet receipt acknowledgments cannot return to the sender.
              </p>
            </article>

            {/* Section 9 */}
            <article className="space-y-2.5 text-left md:col-span-2 p-5 border border-amber-900/30 bg-amber-950/5 rounded-2xl relative overflow-hidden">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-amber-800/40 flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">9</span>
                How ISPs Throttle and Manage Traffic
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Some Internet Service Providers implement **traffic shaping** or **bandwidth throttling** during peak traffic hours. They detect specific high-bandwidth protocols (like video streaming, cloud transfers, or P2P networks) and artificially restrict data throughput. Running a speed test using different ports or using a VPN forces the ISP&apos;s deep packet inspection (DPI) to classify your traffic under standard encrypted categories, bypassing targeted caps.
              </p>
            </article>

            {/* Section 10 */}
            <article className="space-y-2.5 text-left md:col-span-2 p-5 border border-cyan-900/30 bg-cyan-950/5 rounded-2xl relative overflow-hidden">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--bg-elevated)] border border-cyan-800/40 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-400">10</span>
                How to Reduce System Packet Loss
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Packet loss signifies that data blocks were dropped between your device and the destination target. In home networks, this is usually caused by **congested routers**, **bent or degraded network cables**, or **RF wireless signals bouncing off metallic objects**. You can resolve this by replacing old Cat5 wires with Cat6, configuring Quality of Service (QoS) bandwidth limits, and avoiding mesh system overload.
              </p>
            </article>

          </div>
        </section>
      </div>
    </>
  );
}
