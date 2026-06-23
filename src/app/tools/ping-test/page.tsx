import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import PingTestClient from "@/components/tools/PingTestClient";

export const metadata: Metadata = buildMetadata({
  title: "Ping Test Online — Check Latency & Packet Loss | RouterVia",
  description:
    "Free online ping test tool. Measure round-trip latency to any host or IP address, detect packet loss, and diagnose high ping issues instantly from your browser.",
  canonical: "/tools/ping-test",
  keywords: [
    "ping test",
    "online ping test",
    "ping tool",
    "latency checker",
    "check ping online",
    "packet loss test",
    "network latency test",
    "ping ip address",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "Ping Test", url: "/tools/ping-test" },
];

const faqs = [
  {
    question: "What is ping and how is it measured?",
    answer:
      "Ping is the round-trip time (RTT) it takes for a data packet to travel from your device to a remote server and back, measured in milliseconds (ms). Lower ping means less latency. A ping of 1–20ms is excellent, 20–50ms is good, 50–100ms is acceptable, and anything over 150ms introduces noticeable delays in real-time applications like gaming or video calls.",
  },
  {
    question: "Why is my ping so high?",
    answer:
      "High ping is caused by: (1) Physical distance to the server — data must travel further, increasing RTT. (2) Network congestion — routers along the path are overloaded. (3) Wi-Fi interference — wireless signals have higher jitter and latency than wired Ethernet. (4) Active VPN — VPN encryption adds overhead and routes traffic through distant servers. (5) ISP throttling or routing issues. Use a wired Ethernet connection and disable VPN for the lowest possible ping.",
  },
  {
    question: "What is a good ping for gaming?",
    answer:
      "For competitive online gaming: under 20ms is ideal (same-region servers), 20–50ms is very good, 50–100ms is acceptable for casual gaming, and 100–150ms will feel laggy in fast-paced games like FPS shooters. Above 150ms causes significant rubber-banding and delayed hit registration. For games like Valorant and CS2, pros typically play at under 30ms.",
  },
  {
    question: "What is packet loss and how does it affect gaming?",
    answer:
      "Packet loss occurs when data packets fail to reach their destination. Even 1–2% packet loss causes visible lag spikes, rubber-banding, and stuttering in games. 5% or more packet loss makes online gaming nearly unplayable. Common causes include: damaged or low-quality Ethernet cables, Wi-Fi channel congestion, router buffer overflows, and ISP network issues. Test with our Packet Loss Test tool for accurate measurement.",
  },
  {
    question: "What is the difference between latency and jitter?",
    answer:
      "Latency (ping) is the average time for a packet to complete a round trip. Jitter is the variation in latency between consecutive packets — an inconsistency that causes stuttering even when average ping is low. A connection with 50ms latency and 2ms jitter is smooth. A connection with 30ms average latency but 40ms jitter (ranging from 10ms to 50ms) will feel unstable and laggy in real-time applications.",
  },
  {
    question: "How can I reduce my ping?",
    answer:
      "Key strategies: (1) Use a wired Ethernet connection instead of Wi-Fi. (2) Connect to servers geographically closest to you. (3) Disable VPN — it routes traffic through additional hops. (4) Enable QoS on your router to prioritize gaming traffic. (5) Close bandwidth-heavy background applications. (6) Update router firmware. (7) Contact your ISP if ping is consistently high — it may indicate a routing or infrastructure issue.",
  },
  {
    question: "Why does this ping tool show different results than my system's ping command?",
    answer:
      "This browser-based tool uses HTTP HEAD requests rather than raw ICMP packets. HTTP pings include TCP connection setup and TLS handshake overhead, making them 5–30ms higher than ICMP pings. Additionally, many servers block ICMP but respond to HTTP. Use this tool for relative comparisons between hosts and for checking web service reachability. For precise network-level measurements, use the system ping command (ping google.com in Terminal).",
  },
];

export default function PingTestPage() {
  return (
    <NetworkingToolShell
      h1="Ping Test"
      intro="Test connectivity and measure round-trip latency to any host or IP address. Runs 4 consecutive probes and reports average latency and packet loss."
      toolType="ping"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <PingTestClient />
    </NetworkingToolShell>
  );
}
