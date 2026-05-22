import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import IpCheckerToolShell from "@/components/tools/IpCheckerToolShell";

export const metadata: Metadata = buildMetadata({
  title: "Check My IP Address Online | Free Public IP Checker — RouterVia",
  description:
    "Check your current public IP address, ISP, and approximate location instantly.",
  canonical: "/check-my-ip",
  keywords: [
    "check my ip",
    "check ip address",
    "ip checker",
    "public ip checker",
    "online ip check",
    "my ip details",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "Check My IP", url: "/check-my-ip" },
];

const faqs = [
  {
    question: "How do I check my IP address?",
    answer: "You can check your public IP address instantly by visiting this page. Our server-side tool reads the incoming connection headers and details your external IP, ISP provider, approximate city, and timezone without exposing browser scripts.",
  },
  {
    question: "Is this IP checker accurate?",
    answer: "The IP address displayed is 100% accurate, as it is the exact address communicating with our web servers. The geographic location (city, region, country) is based on global GeoIP registration databases, which are usually accurate to the city level.",
  },
  {
    question: "Does restarting my router change my IP?",
    answer: "For most home networks, yes. ISPs generally assign dynamic IP addresses that reset. Restarting your router or leaving it unplugged for a few minutes will release the old IP address lease, forcing your ISP to assign a new one.",
  },
];

export default function CheckMyIpPage() {
  return (
    <IpCheckerToolShell
      h1="Check My IP Address"
      intro="Check your current public IP address, ISP, and approximate location instantly."
      seoVariant="check-my-ip"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    />
  );
}
