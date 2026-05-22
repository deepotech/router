import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import IpCheckerToolShell from "@/components/tools/IpCheckerToolShell";

export const metadata: Metadata = buildMetadata({
  title: "What Is My IP Address? | Free IP Lookup Tool — RouterVia",
  description:
    "Instantly discover your public IP address, ISP, location, and timezone using RouterVia's free IP lookup tool.",
  canonical: "/what-is-my-ip",
  keywords: [
    "what is my ip",
    "what is my ip address",
    "discover my ip",
    "find my ip address",
    "public ip lookup",
    "check my ip",
    "routervia ip lookup",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "What Is My IP", url: "/what-is-my-ip" },
];

const faqs = [
  {
    question: "What is a public IP address?",
    answer: "A public IP address is a unique numerical label assigned by your Internet Service Provider (ISP) that identifies your network router on the global internet. It allows external servers and websites to route data back to your devices.",
  },
  {
    question: "Can websites see my public IP address?",
    answer: "Yes, every website you connect to can see your public IP address. It is required for sending web traffic back to your browser. Websites also use it to estimate your location, target ads, and prevent security abuse.",
  },
  {
    question: "Why does my IP address geolocation change?",
    answer: "Most home connections use dynamic IP addresses, which are rotated by your ISP. When your router restarts or your IP lease expires, you get a new IP. Additionally, IP geolocation represents your ISP's routing office location rather than your precise physical home coordinates.",
  },
];

export default function WhatIsMyIpPage() {
  return (
    <IpCheckerToolShell
      h1="What Is My IP Address?"
      intro="Instantly discover your public IP address, ISP, location, and timezone using RouterVia's free IP lookup tool."
      seoVariant="what-is-my-ip"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    />
  );
}
