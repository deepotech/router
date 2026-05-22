import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import IpCheckerToolShell from "@/components/tools/IpCheckerToolShell";

export const metadata: Metadata = buildMetadata({
  title: "My IP Address | Instant Public IP Lookup Tool — RouterVia",
  description:
    "View your public IP address, carrier details, and network routing location instantly.",
  canonical: "/my-ip",
  keywords: [
    "my ip",
    "my public ip",
    "show my ip",
    "display my ip",
    "view my ip address",
    "what is my ip numbers",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "My IP", url: "/my-ip" },
];

const faqs = [
  {
    question: "What is my IP address used for?",
    answer: "Your public IP address identifies your network interface on the web, enabling websites to send requested assets (like pages, media, or API responses) back to your browser. It is also used to enforce security rules and localized features.",
  },
  {
    question: "Can two users share the same IP?",
    answer: "Yes, multiple devices on the same home network share one public IP address via a router system called NAT. On a larger scale, ISPs use Carrier-Grade NAT (CGNAT) to assign a single public IP address to many different households simultaneously.",
  },
  {
    question: "Is my IP private?",
    answer: "Your public IP address is visible to every web server you visit and is not private. However, your private local IP address (like 192.168.x.x) is kept secure behind your router's firewall and is not exposed to the public internet.",
  },
];

export default function MyIpPage() {
  return (
    <IpCheckerToolShell
      h1="My IP Address"
      intro="View your public IP address, carrier details, and network routing location instantly."
      seoVariant="my-ip"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    />
  );
}
