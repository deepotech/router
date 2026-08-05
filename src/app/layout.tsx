import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "@/lib/constants";
import { WebVitals } from "@/components/analytics/WebVitals";
import { JsonLd, generateWebSiteSchema, generateOrganizationSchema } from "@/lib/seo/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080b14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  alternates: {
    canonical: APP_URL,
  },
  keywords: [
    "router login",
    "router troubleshooting",
    "WiFi fix",
    "network problems",
    "IP address",
    "default password",
    "router setup",
    "AI networking assistant",
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/images/og-default.png"],
  },
  verification: {
    google: "FdJqO1S1B1SIjLYoPg7T8LpxEgB3-JvDBMZQdNZZRpM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebSiteSchema(APP_NAME, APP_URL);
  const orgSchema = generateOrganizationSchema(APP_NAME, APP_URL);

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="58ACA590DE44B78968BA7E25B8C83CD6" />
        <JsonLd data={websiteSchema} />
        <JsonLd data={orgSchema} />
      </head>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R1SGC424YM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R1SGC424YM');
        `}
      </Script>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
