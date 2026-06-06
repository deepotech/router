import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "Default Router Passwords List & Recovery Guide",
  description:
    "Find default router passwords and usernames for TP-Link, ASUS, Netgear, and other brands. Learn how to recover or reset a forgotten router password.",
  canonical: "/router-password",
  keywords: [
    "router password",
    "default router password",
    "forgot router password",
    "router default password",
    "router default login",
  ],
});

export default async function RouterPasswordPage() {
  const breadcrumbs = [
    { name: "Router Password", url: "/router-password" }
  ];

  // ---- Structured Data (JSON-LD) ----
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/router-password#webpage`,
    "url": `${APP_URL}/router-password`,
    "name": "Default Router Passwords List & Recovery Guide",
    "description": "Find default router passwords and usernames for TP-Link, ASUS, Netgear, and other brands. Learn how to recover or reset a forgotten router password.",
    "about": {
      "@type": "Thing",
      "name": "Router Admin Credentials",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/router-password#itemlist`,
    "name": "Popular Password Guides",
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "Router Brands Directory",
          "url": `${APP_URL}/routers`,
        },
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "IP Address Directory",
          "url": `${APP_URL}/ips`,
        },
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": "Router Login Guide",
          "url": `${APP_URL}/router-login`,
        },
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": "How to Reset a Router Guide",
          "url": `${APP_URL}/router-reset`,
        },
      },
    ],
  };

  const faqs = [
    {
      question: "What is a default router password?",
      answer: "A default router password is the pre-configured password set by the manufacturer during assembly. It protects the router's settings page until the user changes it.",
    },
    {
      question: "How do I find my router's default password?",
      answer: "Check the physical sticker on the back or bottom of your router. The sticker lists the default login URL/IP, username, and password unique to your device.",
    },
    {
      question: "Why is default router password not working?",
      answer: "If the default credentials do not work, it indicates that the administrator password was modified during initial setup. You must factory reset the router to restore defaults.",
    },
    {
      question: "What is the difference between admin password and Wi-Fi password?",
      answer: "The admin password protects access to the router's configuration dashboard. The Wi-Fi password is the security key devices use to connect to your wireless network.",
    },
    {
      question: "Can I recover a changed router password without resetting?",
      answer: "No, routers do not store password recovery questions locally. If you forget a customized admin password, a physical factory reset is the only way to recover access.",
    },
    {
      question: "What is the default password for TP-Link routers?",
      answer: "Most TP-Link routers use 'admin' as both the default username and password. Modern models require you to create a custom password during the first login.",
    },
    {
      question: "What is the default password for ASUS routers?",
      answer: "Most ASUS routers use 'admin' for both the username and password. Newer AiMesh systems require you to change these credentials during the initial setup wizard.",
    },
    {
      question: "Is 'admin' a safe password?",
      answer: "No, 'admin' is highly insecure. Anyone connected to your network can log in and hijack your router settings. Always change the default admin credentials immediately.",
    },
    {
      question: "How do I change my router admin password?",
      answer: "Log into the admin page, go to System Tools, Administration, or Management settings, locate the Password section, enter your old password, and save a new, strong password.",
    },
    {
      question: "What is WPS and should I disable it?",
      answer: "WPS (Wi-Fi Protected Setup) allows devices to connect without a password via a PIN. Because WPS PINs are vulnerable to brute-force attacks, you should disable WPS in your settings.",
    },
  ];

  const troubleshootingSteps = [
    {
      title: "Locate Router Bottom Sticker",
      description: "Inspect the physical sticker on your router to find the specific username and password designated by the manufacturer.",
      tip: "Take a photo of the sticker so you don't have to turn the router over in the future.",
    },
    {
      title: "Try Common Defaults",
      description: "If the sticker is missing or unreadable, test common generic pairings such as admin/admin or admin/password in the login fields.",
    },
    {
      title: "Perform a Factory Hardware Reset",
      description: "If custom credentials were set and forgotten, press and hold the physical Reset button on the back of the router for 10-15 seconds using a paperclip.",
      tip: "The router must remain powered on during the reset process.",
    },
    {
      title: "Log In and Update Settings",
      description: "After the reboot, log in with the factory default credentials and navigate to Management Settings to configure a secure custom admin password.",
    },
  ];

  const quickFixChecklist = [
    "Locate the default access credentials on the physical router label",
    "Change the default 'admin' password to a secure custom key",
    "Ensure your administrative password is different from your Wi-Fi password",
    "Disable WPS PIN authentication in the router configurations",
    "Check brand-specific credential sheets if sticker details are missing",
    "Export a configuration backup file after updating credentials",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />

      <TroubleshootingArticleShell
        h1="Router Default Passwords & Recovery Guide"
        intro="Find default router passwords and usernames for TP-Link, ASUS, Netgear, and other brands. Learn how to recover or reset a forgotten router password."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
      >
        {/* Section 1: Default Passwords Table */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Info size={18} className="text-[var(--brand-400)]" />
            Common Manufacturer Default Credentials
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
              <thead>
                <tr className="text-[var(--text-primary)] font-semibold text-left">
                  <th className="pb-3 pr-4">Brand</th>
                  <th className="pb-3 px-4">Default Username</th>
                  <th className="pb-3 pl-4">Default Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">TP-Link</td>
                  <td className="py-2.5 px-4 font-mono">admin</td>
                  <td className="py-2.5 pl-4 font-mono">admin / (create on login)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">ASUS</td>
                  <td className="py-2.5 px-4 font-mono">admin</td>
                  <td className="py-2.5 pl-4 font-mono">admin</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Netgear</td>
                  <td className="py-2.5 px-4 font-mono">admin</td>
                  <td className="py-2.5 pl-4 font-mono">password</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">D-Link</td>
                  <td className="py-2.5 px-4 font-mono">admin / Admin</td>
                  <td className="py-2.5 pl-4 font-mono">(leave blank)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[var(--text-primary)]">Linksys</td>
                  <td className="py-2.5 px-4 font-mono">admin</td>
                  <td className="py-2.5 pl-4 font-mono">admin / admin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: How to Find Router Password */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">How to Find Your Default Router Password</h2>
          <p>
            When a router is manufactured, the vendor flashes default credentials onto the internal firmware and prints these details onto a physical label. This label is typically located on the bottom or back panel of the router chassis. Look for terms like <strong>Admin Password</strong>, <strong>Access Key</strong>, or <strong>Default Key</strong>.
          </p>
          <p>
            If you cannot find a sticker on your router, search the user manual or reference online databases for your specific brand and model. Standard credentials are often highly predictable across product lines from the same manufacturer.
          </p>
        </div>

        {/* Section 3: Reset vs Recover */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Password Reset vs. Password Recovery</h2>
          <p>
            If you change the default administrative password and subsequently forget it, there is no built-in password recovery mechanism. Unlike online email accounts or subscription services, local router operating systems do not communicate with external password recovery servers, nor do they support recovery email addresses.
          </p>
          <p>
            The only method to restore access to your admin dashboard is to perform a <strong>Factory Reset</strong>. This resets the router back to its default configurations, allowing you to log in using the original username and password listed on the sticker. Note that a reset will also erase your custom Wi-Fi network names (SSID) and security keys.
          </p>
          <p>
            To learn how to reset your device without damaging the hardware, check our detailed{" "}
            <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Reset Walkthrough
            </Link>{" "}
            or diagnose loading page timeouts in our{" "}
            <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline font-semibold">
              Router Login Troubleshooting Guide
            </Link>.
          </p>
        </div>

        {/* Section 4: Brand Tables */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Default Logins by Brand</h2>
          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">TP-Link Default Passwords</h3>
              <p>Common login IP is 192.168.0.1. Default username is <strong>admin</strong> and default password is <strong>admin</strong>. On modern models, you will be forced to specify a custom password upon first connection.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">ASUS Default Passwords</h3>
              <p>Default login IP is 192.168.1.1. Default username and password are both <strong>admin</strong>. The setup wizard requires updates to these default credentials immediately.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Netgear Default Passwords</h3>
              <p>Default login IP is 192.168.1.1. Default username is <strong>admin</strong> and default password is <strong>password</strong>. You will be prompted to change these details during initial setup.</p>
            </div>
          </div>
        </div>

        {/* Section 5: Security Best Practices */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Security Best Practices</h2>
          <p>
            Default credentials are publicly known, making them a significant security vulnerability. If anyone gains access to your Wi-Fi network (or if remote management is accidentally enabled), they can log into the admin dashboard using default credentials and take full control of your network.
          </p>
          <p>
            Follow these essential router security steps:
          </p>
          <ul>
            <li>
              <strong>Change default credentials immediately:</strong> Select a custom, complex password for the administrator login panel.
            </li>
            <li>
              <strong>Make admin and Wi-Fi passwords different:</strong> Never use the same password for Wi-Fi access and admin console access.
            </li>
            <li>
              <strong>Disable WPS:</strong> Wi-Fi Protected Setup has known security flaws. Disable it to prevent unauthorized network entry.
            </li>
          </ul>
        </div>

        {/* Section 6: Cluster Internal Linking Hub */}
        <div className="mb-10 p-6 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
            <Link2 size={16} className="text-[var(--brand-400)]" />
            Router Access Cluster Navigation
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Router Directory", href: "/routers" },
              { label: "IP Address Directory", href: "/ips" },
              { label: "Router Login Guide", href: "/router-login" },
              { label: "Default Router Passwords", href: "/router-password" },
              { label: "How to Reset a Router", href: "/router-reset" },
              { label: "Router Admin Hub", href: "/router-admin" },
              { label: "Login Issues Diagnoses", href: "/router-login-not-working" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </TroubleshootingArticleShell>
    </>
  );
}
