import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import IpCheckerToolShell from "@/components/tools/IpCheckerToolShell";

export const metadata: Metadata = buildMetadata({
  title: "What Is My IP Address? | Free IP Checker Tool — RouterVia",
  description:
    "Instantly find your public IP address, ISP, location, and timezone for free. Our IP Checker tool works on any device — no login required.",
  canonical: "/tools/ip-checker",
  keywords: [
    "what is my ip",
    "my ip address",
    "ip checker",
    "public ip address",
    "find my ip",
    "ip location",
    "my public ip",
    "ip address lookup",
    "what is my public ip",
    "check ip address",
    "ip address finder",
    "my isp",
    "ip geolocation",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "IP Checker", url: "/tools/ip-checker" },
];

const faqs = [
  {
    question: "What is my IP address?",
    answer: "Your IP address is a unique number assigned to your internet connection by your Internet Service Provider (ISP). It identifies your device on the internet and allows websites and servers to send data back to you. Click 'Check My IP' above to instantly see yours.",
  },
  {
    question: "What is the difference between a public IP and a private IP?",
    answer: "A public IP address is the address visible to the internet, assigned by your ISP. A private IP (like 192.168.1.x) is used only within your local network and is assigned by your router. This tool detects your public IP — the one websites see when you connect.",
  },
  {
    question: "Can websites see my IP address?",
    answer: "Yes. Every website you visit can see your public IP address. It is used for routing traffic, serving localized content, fraud detection, and rate limiting. Using a VPN masks your real IP from the sites you visit.",
  },
  {
    question: "Does my IP address reveal my exact location?",
    answer: "Your IP can reveal your approximate city or region and your ISP. It does not reveal your exact home address or GPS coordinates. Accuracy varies depending on how your ISP allocates addresses.",
  },
  {
    question: "Why does my IP address change?",
    answer: "Most ISPs assign dynamic IP addresses that change periodically — when you restart your router or after a lease period expires. Connecting via a different network (mobile data, café Wi-Fi) will always show a different IP.",
  },
  {
    question: "How do I hide my IP address?",
    answer: "Use a VPN (Virtual Private Network) to route your traffic through a server elsewhere. The Tor browser also masks your IP through multiple relay nodes. Proxy servers are another option but are generally less secure than VPNs.",
  },
];

export default function IpCheckerPage() {
  return (
    <IpCheckerToolShell
      h1="What Is My IP Address?"
      intro="Instantly find your public IP address, ISP, location, and timezone. Free — no login required."
      seoVariant="default"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    />
  );
}
