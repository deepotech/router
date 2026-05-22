import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import IpCheckerToolShell from "@/components/tools/IpCheckerToolShell";

export const metadata: Metadata = buildMetadata({
  title: "Public IP Checker | Find Your Internet IP Address — RouterVia",
  description:
    "Scan and find your public internet IP address, ISP, and geographic network location.",
  canonical: "/public-ip-checker",
  keywords: [
    "public ip checker",
    "public ip lookup",
    "internet ip checker",
    "find public ip address",
    "external ip lookup",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "Public IP Checker", url: "/public-ip-checker" },
];

const faqs = [
  {
    question: "What is a public internet IP?",
    answer: "A public internet IP address is a globally unique IP address assigned by your ISP. It is the address used by other internet servers to communicate with your local network over the public web.",
  },
  {
    question: "What is the difference between a private and a public IP?",
    answer: "A public IP is assigned to your network gateway (your modem) and is visible to the internet. A private IP (such as 192.168.1.5) is assigned to individual devices by your router and is only valid within your local network.",
  },
  {
    question: "How accurate is IP geolocation?",
    answer: "IP geolocation generally provides accurate results at the country, state, and city levels. However, it cannot resolve precise physical coordinates or show your exact house address, because the registry points to the nearest ISP distribution hub.",
  },
];

export default function PublicIpCheckerPage() {
  return (
    <IpCheckerToolShell
      h1="Public IP Checker"
      intro="Scan and find your public internet IP address, ISP, and geographic network location."
      seoVariant="public-ip-checker"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    />
  );
}
