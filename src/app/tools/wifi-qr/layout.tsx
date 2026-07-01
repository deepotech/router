import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "WiFi QR Code Generator | Share Network Instantly",
  description:
    "Generate a scannable QR code for your WiFi network. Share your WiFi password instantly with guests — no typing needed. Supports WPA2, WPA3, WEP, and open networks.",
  canonical: "/tools/wifi-qr",
  keywords: [
    "wifi qr code generator",
    "wifi qr code",
    "share wifi qr",
    "wifi password qr",
    "network qr code",
    "qr code wifi",
  ],
});

export default function WifiQrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
