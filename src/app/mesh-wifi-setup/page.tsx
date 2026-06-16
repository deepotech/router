import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import {
  Wifi,
  Shield,
  Search,
  Monitor,
  Smartphone,
  AlertTriangle,
  CheckSquare,
  Link2,
  Terminal,
  Radio,
  Server,
  Globe,
  Sliders,
  Settings,
  HelpCircle,
  Info,
  ArrowRight,
  MapPin,
  ListOrdered
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Mesh WiFi Setup Guide: Placement & Configuration (2026)",
  description: "Learn how to set up your Mesh WiFi network for optimal coverage. Includes node placement rules, multi-floor planning, Ethernet backhaul setup, and troubleshooting.",
  canonical: "/mesh-wifi-setup",
  keywords: [
    "mesh wifi setup",
    "how to set up mesh wifi",
    "mesh node placement",
    "ethernet backhaul setup",
    "mesh router configuration",
    "multi-floor home wifi",
    "mesh troubleshooting",
    "best dns for mesh"
  ],
});

const breadcrumbs = [
  { name: "Mesh WiFi", url: "/mesh-wifi" },
  { name: "Setup Guide", url: "/mesh-wifi-setup" }
];

const troubleshootingSteps = [
  {
    title: "Placement Planning & Boundary Calculation",
    description: "Map out your home's square footage and identify structural load-bearing walls. Place the primary mesh node (the controller) in the geometric center of your home's primary usage area, elevated at least 3-5 feet off the floor on an open surface.",
    tip: "Keep the controller at least 3 feet away from brick walls, mirrors, large metal objects, and household appliances like microwaves or baby monitors."
  },
  {
    title: "Connect the Controller Node to the Modem",
    description: "Power down your ISP modem. Connect one end of a Cat6a/Cat8 Ethernet cable to the modem's WAN/LAN port and the other to the WAN port on your main mesh node. Power on the modem first, wait 2 minutes, then power on the mesh node.",
    tip: "Disable the Wi-Fi broadcast on your ISP-provided gateway to prevent co-channel interference and IP conflicts."
  },
  {
    title: "Position and Power Satellite Nodes (The 50% Rule)",
    description: "Plug in your satellite nodes in rooms that are located halfway between the main controller node and your previous dead zones. Do not place a satellite node directly inside a dead zone, as it will establish a weak, high-latency wireless backhaul link.",
    tip: "In multi-story homes, place nodes in a staggered zig-zag pattern rather than stacking them directly above one another on consecutive floors."
  },
  {
    title: "Configure Ethernet Backhaul Connections",
    description: "Run Cat6 Ethernet cables from the LAN ports of your main controller node (or an attached gigabit switch) directly to the WAN/LAN ports of each satellite node. Open the mesh system's app to verify the backhaul state has transitioned to 'Wired' or 'Ethernet'.",
    tip: "A wired backhaul completely eliminates signal loss over walls, ensuring full internet throughput at every node."
  },
  {
    title: "Configure Custom DNS & DHCP Reservation",
    description: "Log into the mesh control application. Go to WAN/LAN Settings, and replace the default ISP DNS addresses with high-performance public resolvers: Primary 1.1.1.1 (Cloudflare) and Secondary 8.8.8.8 (Google).",
    tip: "Assign static IP reservations for high-bandwidth client devices like gaming PCs, NAS servers, or consoles."
  }
];

const faqs = [
  {
    question: "What is the first step in setting up a Mesh WiFi system?",
    answer: "The first step is placing your main controller node next to your ISP modem and connecting them via an Ethernet cable. Next, download the manufacturer's mobile app (such as ASUS Router, TP-Link Deco, or Netgear Orbi) and follow the guided setup wizard to create your primary Wi-Fi network SSID and password."
  },
  {
    question: "Where should the main mesh router (controller node) be placed?",
    answer: "Place the main node in a central, elevated location in your home, such as on a desk or shelf in the living room. Avoid putting it on the floor, in a basement, inside a metal media cabinet, or behind heavy appliances, as this blocks radio waves at the source."
  },
  {
    question: "How far apart should mesh nodes be placed?",
    answer: "Generally, nodes should be placed no more than 30 to 45 feet apart in a standard drywall home. If your home has concrete, brick, or plaster walls, place them closer (within 20 to 25 feet) to maintain a strong wireless backhaul link. The control app will indicate if a node is too far."
  },
  {
    question: "Do mesh nodes need line-of-sight to work?",
    answer: "While direct line-of-sight is not strictly required, reducing the number of solid walls and floors between nodes significantly increases backhaul throughput and reduces latency. Placing nodes near open doorways or corridors helps the signal propagate efficiently."
  },
  {
    question: "How do I configure Ethernet backhaul for my mesh nodes?",
    answer: "To set up Ethernet backhaul, connect an Ethernet cable (Cat6 or better) from a LAN port on the main controller node to a LAN/WAN port on your satellite node. The system will automatically detect the physical connection and route node-to-node traffic over the cable instead of Wi-Fi."
  },
  {
    question: "Do I need an Ethernet switch to connect my mesh nodes?",
    answer: "If you have more than one satellite node and your main node only has one or two LAN ports, you will need a basic unmanaged Gigabit Ethernet switch. Plug the switch into the main controller node's LAN port, and then plug all satellite nodes into the switch."
  },
  {
    question: "What Wi-Fi channel settings are best for a mesh system?",
    answer: "Most modern mesh systems manage channels automatically, constantly scanning for and switching to clean frequencies to avoid interference. If your system allows manual settings, choose non-overlapping channels (1, 6, or 11) for 2.4 GHz, and clear, fixed channels (e.g., 36, 48, or 149) for 5 GHz."
  },
  {
    question: "How do I position mesh nodes in a multi-story home?",
    answer: "In a multi-floor home, place the main node on the middle floor if possible. Place satellite nodes on the floors above and below in a staggered, zig-zag layout rather than directly on top of each other. This maximizes vertical and diagonal signal penetration."
  },
  {
    question: "Why is my satellite node showing a yellow/orange connection status?",
    answer: "A yellow or orange status indicates that the satellite node has a weak wireless link back to the main controller or adjacent node. This is usually caused by excessive distance or thick walls. To fix this, move the satellite node closer to the main router."
  },
  {
    question: "Should I disable the Wi-Fi on my provider's modem-router gateway?",
    answer: "Yes, you should disable the Wi-Fi on your ISP's combination gateway. Leaving it active creates co-channel interference and can lead to a Double NAT configuration, causing gaming connection issues. Put the ISP gateway into 'Bridge Mode' if possible."
  },
  {
    question: "How do I update the firmware on my mesh nodes?",
    answer: "Open your mesh router's mobile app or local admin page and navigate to System > Firmware Update. The app will check for updates and allow you to install them on all nodes simultaneously. Do not power off the nodes during this process."
  },
  {
    question: "What DNS servers should I use for my mesh setup to reduce latency?",
    answer: "Configure your mesh router to use public DNS resolvers like Cloudflare (Primary: 1.1.1.1, Secondary: 1.0.0.1) or Google Public DNS (Primary: 8.8.8.8, Secondary: 8.8.4.4). Changing this on the main node pushes the settings system-wide, reducing page resolution latency."
  }
];

const commonCauses = [
  {
    title: "Placement Too Distant",
    desc: "Placing satellite nodes too far from the main controller node results in a weak wireless backhaul link, dropping speeds and causing clients to lose internet access."
  },
  {
    title: "ISP Gateway Wi-Fi Active",
    desc: "Leaving the Wi-Fi active on your ISP gateway creates massive signal overlap and channel congestion, degrading the performance of your new mesh system."
  },
  {
    title: "Structural Interference",
    desc: "Heavy structural barriers like concrete floors, brick chimneys, or foil-insulated walls absorb wireless signals, blocking node-to-node relay paths."
  },
  {
    title: "DHCP IP Conflicts",
    desc: "Failing to enable Bridge Mode on your ISP modem results in Double NAT, leading to IP address conflicts, firewall blocks, and lag on gaming networks."
  }
];

const quickFixChecklist = [
  "Execute the 50% placement rule: position nodes halfway between the primary router and dead zones.",
  "Run Cat6 Ethernet cabling to set up Ethernet backhaul for unthrottled gigabit speeds.",
  "Put your ISP modem-router into Bridge Mode to eliminate Double NAT conflicts.",
  "Configure custom DNS (1.1.1.1 / 8.8.8.8) on your mesh system's WAN configuration panel.",
  "Disable WPS and UPnP on the mesh router dashboard to close common security exploits."
];

// ─── SCHEMAS ────────────────────────────────────────────────────────────────

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${APP_URL}/mesh-wifi-setup#article`,
  url: `${APP_URL}/mesh-wifi-setup`,
  headline: "Mesh WiFi Setup Guide: Placement & Configuration (2026)",
  description: "Learn how to set up your Mesh WiFi network for optimal coverage. Includes node placement rules, multi-floor planning, Ethernet backhaul setup, and troubleshooting.",
  author: { "@type": "Organization", name: "RouterVia" },
  publisher: { "@type": "Organization", name: "RouterVia" },
  dateModified: new Date().toISOString().split("T")[0],
  proficiencyLevel: "Intermediate",
  about: [
    { "@type": "Thing", name: "Mesh WiFi Setup" },
    { "@type": "Thing", name: "Router Placement" },
    { "@type": "Thing", name: "Ethernet Backhaul" }
  ]
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${APP_URL}/mesh-wifi-setup#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Mesh WiFi",
      item: `${APP_URL}/mesh-wifi`
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Setup Guide",
      item: `${APP_URL}/mesh-wifi-setup`
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${APP_URL}/mesh-wifi-setup#howto`,
  name: "How to Deploy a Multi-Node Mesh WiFi Network",
  description: "A step-by-step technical walkthrough for setting up a whole home mesh WiFi network with wireless or wired backhaul.",
  totalTime: "PT15M",
  supply: [
    { "@type": "HowToSupply", name: "Mesh Controller Node" },
    { "@type": "HowToSupply", name: "Mesh Satellite Nodes" },
    { "@type": "HowToSupply", name: "Cat6 Ethernet Cables" }
  ],
  tool: [
    { "@type": "HowToTool", name: "ISP Modem" },
    { "@type": "HowToTool", name: "Mesh Control Application" }
  ],
  step: troubleshootingSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description
  }))
};

export default function MeshWifiSetupPage() {
  return (
    <>
      <TroubleshootingArticleShell
        h1="Mesh WiFi Setup Guide: Placement & Configuration (2026)"
        intro="Deploying a Mesh WiFi system is the single most effective way to eliminate dead zones and ensure stable, high-speed internet across your entire household. However, a mesh network is only as good as its configuration. Incorrect node placement, wireless backhaul bottlenecks, and co-channel interference can render premium hardware sluggish. In this guide, learn how to strategically plan your node coverage, optimize node placements, establish Ethernet backhaul links, and configure advanced settings for the best networking performance."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Setup Warning: Double NAT Risk",
          text: "If you plug your mesh system directly into an ISP combination modem-router gateway without putting the ISP gateway into Bridge Mode, you will create a Double NAT scenario. This causes firewall routing loops, slow loading, and errors on gaming consoles. Always enable Bridge Mode on your ISP gateway."
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="low"
        whenToContactISP="If you have put your ISP modem-router into Bridge Mode, configured your mesh nodes correctly, and have solid node-to-node backhaul readings, but still experience random dropouts or DNS errors, contact your ISP. The issue likely resides in their WAN lines, node congestion on their local nodes, or a faulty fiber termination box (ONT)."
      >
        <JsonLd data={techArticleSchema} />
        <JsonLd data={faqPageSchema} />
        <JsonLd data={howToSchema} />
        <JsonLd data={breadcrumbSchema} />

        <div className="space-y-10">
          {/* AI SNIPPET BOX */}
          <div className="glass-card p-6 border border-emerald-950/30 bg-emerald-950/5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
            <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <Shield size={16} className="text-emerald-400" />
              Quick Take: Setup Checklist for Maximum Speed
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              To achieve peak performance, always place satellite nodes no further than two rooms away 
              from another node. Ensure you disable the Wi-Fi on your ISP modem to prevent co-channel 
              interference. If possible, link the nodes via <strong>Ethernet Backhaul</strong> using Cat6 
              cables, and configure <strong>Cloudflare DNS (1.1.1.1)</strong> or <strong>Google Public DNS (8.8.8.8)</strong> 
              to reduce query latency.
            </p>
          </div>

          {/* SECTION 1 */}
          <section className="prose prose-invert max-w-none space-y-4" aria-label="Planning Coverage">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 1 — Planning Coverage</h2>
            <p>
              Before unboxing your mesh system, it is vital to analyze your home's layout, square footage, and building materials. A common mistake is buying too many or too few nodes. While a single node typically covers about 1,500 square feet, structural materials significantly dictate signal propagation.
            </p>
            <p>
              Drywall and wooden framing allow radio waves to pass with minimal signal loss. In contrast, concrete, brick, plaster with metal lath, and foil-insulated walls function as electromagnetic shields, absorbing high-frequency wireless energy. If your home has a central brick chimney or concrete support pillars, you must plan your node placements to route signals *around* these barriers rather than trying to punch through them.
            </p>
            <p>
              As a general rule, a 2-node system is ideal for most 2-story homes up to 3,000 square feet. For 3-story homes, L-shaped layouts, or homes with brick/concrete walls exceeding 3,500 square feet, a 3-node kit is required. Planning node locations near open hallways, stairwells, and doorways allows radio waves to bounce and travel efficiently.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="prose prose-invert max-w-none space-y-4" aria-label="Node Placement">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 2 — Node Placement</h2>
            <p>
              Node placement is the single most important factor determining the stability and speed of your mesh network. Many users place satellite nodes directly inside wireless dead zones (such as a back bedroom or basement). This is incorrect. A satellite node placed in a dead zone will receive a weak signal from the main router, resulting in a slow, drop-prone backhaul link that relays poor performance to your devices.
            </p>
            <p>
              Instead, follow the **50% Placement Rule**: position satellite nodes approximately halfway between the main controller node and the dead zone. The satellite must be placed where it still receives a strong, clean signal from the parent router. It then uses that strong connection to rebroadcast Wi-Fi into the neighboring dead zone.
            </p>
            <p>
              Elevation is also crucial. Keep all nodes elevated 3 to 5 feet off the floor on open surfaces like tables, shelves, or desks. Placing nodes on the floor, behind couches, or inside wooden or metal media cabinets dampens the signal. Keep nodes away from large metal objects, mirrors (which reflect radio waves), and appliances like microwaves and cordless phones that broadcast on the busy 2.4 GHz band.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="prose prose-invert max-w-none space-y-4" aria-label="Ethernet Backhaul Setup">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 3 — Ethernet Backhaul Setup</h2>
            <p>
              While wireless mesh systems are convenient, linking your nodes using physical network cables—a configuration known as **Ethernet Backhaul**—is the gold standard for network performance. A wired backhaul bypasses wireless interference and wall penetration loss entirely, guaranteeing 100% of your internet bandwidth reaches every node.
            </p>
            <p>
              To set up an Ethernet backhaul, connect one end of a Cat6 or Cat8 Ethernet cable to a LAN port on the main controller node. Connect the other end to the WAN or LAN port of your satellite node. If you have multiple satellite nodes, you can run them through a gigabit Ethernet switch. The cabling topology should look like this:
            </p>
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl font-mono text-[10px] text-[var(--text-secondary)] space-y-1">
              <div>Modem {"->"} Mesh Controller (WAN)</div>
              <div>Mesh Controller (LAN) {"->"} Gigabit Switch (Port 1)</div>
              <div>Gigabit Switch (Port 2) {"->"} Satellite Node 1 (LAN/WAN)</div>
              <div>Gigabit Switch (Port 3) {"->"} Satellite Node 2 (LAN/WAN)</div>
            </div>
            <p>
              Once connected physically, open your mesh system's mobile application. Under node status, verify that the connection type has changed from 'Wireless' to 'Wired' or 'Ethernet'. The main router will now transmit data packets over the cable, leaving the wireless bands completely clear for client devices like phones and smart plugs.
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="prose prose-invert max-w-none space-y-4" aria-label="Wireless Backhaul Optimization">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 4 — Wireless Backhaul Optimization</h2>
            <p>
              If running physical Ethernet cables through your walls is not feasible, you must optimize the **Wireless Backhaul** to prevent speed degradation. Traditional dual-band mesh systems must share the 5 GHz band for both client traffic and node-to-node relay, cutting maximum speeds by half.
            </p>
            <p>
              To prevent this, ensure you select a **Tri-Band or Quad-Band** mesh system. Tri-band systems reserve a dedicated, second 5 GHz band (or a clean 6 GHz band in newer WiFi 6E/7 systems) exclusively for backhaul communication. This ensures your client devices have full access to the primary 2.4 GHz and 5 GHz bands without speed throttling.
            </p>
            <p>
              To optimize the wireless backhaul link:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                Check the mesh app's signal quality indicator for each node. Adjust satellite positions until the link quality reads as 'Good' or 'Excellent'.
              </li>
              <li>
                Avoid stacking nodes vertically in multi-story homes. Place them in a staggered zig-zag pattern to allow signals to pass diagonally through floors.
              </li>
              <li>
                Ensure nodes are updated to the latest firmware, as manufacturers constantly release updates that improve backhaul pathing algorithms.
              </li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section className="prose prose-invert max-w-none space-y-4" aria-label="Channel Selection">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 5 — Channel Selection</h2>
            <p>
              Wi-Fi networks broadcast data packets on specific radio frequencies, known as **channels**. If multiple nearby routers (such as your neighbor's) are broadcasting on the same channel, co-channel interference occurs, causing packet loss and latency spikes.
            </p>
            <p>
              Most modern mesh systems feature dynamic channel optimization. The controller node continuously scans local airwaves and shifts system-wide channels to avoid congestion. However, you can manually optimize your mesh settings in the router's admin console:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <strong>2.4 GHz Band:</strong> Set the channel width to **20 MHz** (never 40 MHz in crowded areas) and select non-overlapping channels **1, 6, or 11**.
              </li>
              <li>
                <strong>5 GHz Band:</strong> Set the channel width to **80 MHz** or **160 MHz** (for maximum Wi-Fi 6 speed) and select clean, fixed channels like **36, 48, or 149**.
              </li>
              <li>
                <strong>DFS Channels (Dynamic Frequency Selection):</strong> If your mesh system supports it, enable DFS channels. These clean frequencies are reserved for radar systems but can be used by routers when unoccupied, bypassing neighbor congestion.
              </li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section className="prose prose-invert max-w-none space-y-4" aria-label="Multi-floor Homes">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 6 — Multi-floor Homes</h2>
            <p>
              Setting up Wi-Fi in a multi-story home presents unique engineering challenges because floors absorb radio signals much more aggressively than drywall partition walls. To achieve seamless whole-home coverage:
            </p>
            <p>
              Place the main controller node on the middle floor (e.g., the second floor of a 3-story home). This places it in the physical center of the home, allowing signals to propagate upward to the bedrooms and downward to the kitchen and basement.
            </p>
            <p>
              Stagger satellite nodes across floors. If the main router is on the middle floor toward the east side of the house, place the upstairs satellite on the west side, and the downstairs satellite in the center. This creates a staggered diagonal grid of coverage that bridges floors without dead zones.
            </p>
          </section>

          {/* SECTION 7 */}
          <section className="prose prose-invert max-w-none space-y-4" aria-label="Troubleshooting">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Section 7 — Troubleshooting Mesh Performance</h2>
            <p>
              If you experience slow speeds, high ping during gaming, or dropouts on your mesh satellites, try the following configurations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <strong>Put ISP Modem into Bridge Mode:</strong> Connect the WAN port of the main node to your ISP modem, log into the modem's settings, and toggle **Bridge Mode** on. This disables the modem's built-in router, preventing Double NAT conflicts.
              </li>
              <li>
                <strong>Toggle Fast Roaming:</strong> If older smart home devices (like smart plugs or light bulbs) repeatedly drop connection, disable 'Fast Roaming' (802.11r) in the mesh app. Some legacy hardware cannot parse fast transition protocols.
              </li>
              <li>
                <strong>Configure Custom DNS:</strong> Default ISP DNS servers can slow down page loading. Change your WAN settings to use Cloudflare DNS (1.1.1.1) or Google Public DNS (8.8.8.8) to lower response latency.
              </li>
            </ul>
            <p>
              To learn more about optimizing DNS configurations for low latency, consult our detailed <Link href="/dns" className="text-[var(--brand-400)] hover:underline font-semibold">DNS Guide</Link>, or check the <Link href="/best-dns-for-gaming" className="text-[var(--brand-400)] hover:underline font-semibold">Best DNS for Gaming</Link> and <Link href="/best-dns-servers" className="text-[var(--brand-400)] hover:underline font-semibold">Best DNS Servers</Link> lists.
            </p>
          </section>

          {/* SECTION 8: RELATED GUIDES */}
          <div className="mb-10 p-5 glass-card border border-[var(--border-subtle)] rounded-2xl">
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
              <Link2 size={16} className="text-[var(--brand-400)]" /> Related Guides &amp; Network Optimizations
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: "Mesh WiFi Technology Hub", href: "/mesh-wifi" },
                { label: "WiFi Extenders vs Mesh WiFi", href: "/wifi-extender-vs-mesh" },
                { label: "WiFi Security Hardening Guide", href: "/wifi-security" },
                { label: "How to Set Up Guest WiFi", href: "/guest-wifi-setup" },
                { label: "WPA3 vs WPA2 Security Comparison", href: "/wpa3-vs-wpa2" },
                { label: "How to Change WiFi Password", href: "/change-wifi-password" },
                { label: "Router Settings & Optimizations", href: "/router-settings" },
                { label: "Router Admin Login Portal Guide", href: "/router-login" }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--brand-400)] px-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--brand-800)] transition-all font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
