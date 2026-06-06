import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

// ---- SEO Metadata ----
export const metadata: Metadata = buildMetadata({
  title: "How to Factory Reset a Router: Step-by-Step Instructions",
  description:
    "Learn how to factory reset your wireless router. Compare soft reset vs hard reset, find reset button locations, and configure your router post-reset.",
  canonical: "/router-reset",
  keywords: [
    "router reset",
    "factory reset router",
    "how to reset router",
    "router reset button",
    "restore router settings",
  ],
});

export default async function RouterResetPage() {
  const breadcrumbs = [
    { name: "Router Reset", url: "/router-reset" }
  ];

  // ---- Structured Data (JSON-LD) ----
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/router-reset#webpage`,
    "url": `${APP_URL}/router-reset`,
    "name": "How to Factory Reset a Router: Step-by-Step Instructions",
    "description": "Learn how to factory reset your wireless router. Compare soft reset vs hard reset, find reset button locations, and configure your router post-reset.",
    "about": {
      "@type": "Thing",
      "name": "Router Factory Reset",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${APP_URL}/router-reset#itemlist`,
    "name": "Popular Reset Guides",
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
          "name": "Default Router Passwords Guide",
          "url": `${APP_URL}/router-password`,
        },
      },
    ],
  };

  const faqs = [
    {
      question: "What does resetting a router do?",
      answer: "A factory reset deletes all custom configuration settings from the router's non-volatile memory (NVRAM). This restores default Wi-Fi names (SSID), security passwords, admin credentials, port forwarding rules, and custom subnets to factory defaults.",
    },
    {
      question: "What is the difference between restart and reset?",
      answer: "A restart (reboot or power cycle) simply turns the router off and on again to clear temporary system memory without changing your configurations. A reset restores the device back to its original factory settings, erasing all custom configurations.",
    },
    {
      question: "How long do I hold the reset button?",
      answer: "For most routers, you must press and hold the physical Reset button using a paperclip for 10 to 15 seconds while the device is powered on. Release the button when the LED indicators flash or turn solid.",
    },
    {
      question: "Where is the reset button located?",
      answer: "The Reset button is typically a small pinhole located on the back or bottom panel of the router, labeled 'Reset' or 'Restore'. Some models feature a combined WPS/Reset button.",
    },
    {
      question: "What is the 30-30-30 reset rule?",
      answer: "The 30-30-30 rule is a legacy hard reset method: hold the reset button for 30 seconds, unplug power for 30 seconds while holding the button, and plug power back in while holding the button for another 30 seconds. Most modern routers do not require this.",
    },
    {
      question: "How do I log in after resetting?",
      answer: "Once the router restarts, connect your computer to the router's default Wi-Fi network (credentials are printed on the bottom label) or use an Ethernet cable, and navigate to the default gateway IP (usually 192.168.1.1 or 192.168.0.1) in a browser.",
    },
    {
      question: "Does a reset delete router firmware?",
      answer: "No, a factory reset does not roll back or delete the installed firmware version. It only clears custom user configurations and settings database entries, retaining the current firmware version.",
    },
    {
      question: "Will my ISP settings be deleted after reset?",
      answer: "If you have a DSL connection requiring PPPoE login credentials, or a static IP configuration from your ISP, those details will be deleted. You must re-enter your ISP credentials to restore internet access.",
    },
    {
      question: "Can I reset a router from the admin page?",
      answer: "Yes, this is known as a soft reset. Log into the router's admin panel, navigate to Administration or System Tools, click 'Factory Defaults' or 'Restore', and confirm to start the reset process.",
    },
    {
      question: "How do I restore my router backup settings?",
      answer: "Log into the admin page, go to System Tools > Backup & Restore, click 'Choose File' under Restore Settings, select your previously exported configuration file, and click Restore to apply.",
    },
  ];

  const troubleshootingSteps = [
    {
      title: "Locate Pinhole Button",
      description: "Find the small recessed hole labeled 'Reset' on the back or bottom of your router.",
      tip: "Avoid using sharp objects like needles that can damage the internal button. Use a bent paperclip or toothpick instead.",
    },
    {
      title: "Hold for 10-15 Seconds",
      description: "While the router is powered on, insert the paperclip and hold the button down firmly. Keep it pressed down for 10 to 15 seconds.",
    },
    {
      title: "Observe LED Indicators",
      description: "Keep holding the button until the LED lights on the front of the router turn off, flash rapidly, or turn solid amber, indicating the memory sweep has started.",
    },
    {
      title: "Wait for System Reboot",
      description: "Release the button and wait 1 to 2 minutes for the router to complete its reboot cycle and re-initialize LAN interfaces.",
      tip: "Never power off or unplug the router during the reboot cycle.",
    },
  ];

  const quickFixChecklist = [
    "Verify the router is plugged into power before attempting reset",
    "Identify the recessed physical reset button hole",
    "Hold the reset button down for at least 10 full seconds",
    "Wait for the front panel lights to cycle and stabilize",
    "Connect to the default Wi-Fi network using credentials on the bottom sticker",
    "Open your browser and navigate to the default gateway IP to begin setup",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={itemListSchema} />

      <TroubleshootingArticleShell
        h1="How to Reset Your Router"
        intro="Step-by-step instructions to factory reset your wireless router, find the physical reset button, execute soft vs hard resets, and restore settings."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        quickFixChecklist={quickFixChecklist}
        severityLevel="low"
      >
        {/* Section 1: Soft Reset vs Hard Reset */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Soft Reset vs. Hard Reset</h2>
          <p>
            When troubleshooting network connectivity issues, it is important to choose the appropriate reset method.
          </p>
          <ul>
            <li>
              <strong>Soft Reset (Reboot):</strong> Involves power cycling the router (unplugging the power cord for 30 seconds and plugging it back in) or clicking &quot;Reboot&quot; in the admin panel. This clears the router&apos;s active RAM, flushing temporary cache blocks and system processes without erasing your custom network configurations.
            </li>
            <li>
              <strong>Hard Reset (Factory Reset):</strong> Completely wipes the router&apos;s non-volatile random-access memory (NVRAM). This restores the operating system back to its default factory settings, erasing custom SSIDs, Wi-Fi keys, admin passwords, port forwarding rules, and DHCP settings.
            </li>
          </ul>
        </div>

        {/* Section 2: Factory Reset Guide */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Factory Reset Step-by-Step Instructions</h2>
          <p>
            To restore your router back to its factory default configuration, you must execute a physical hard reset. Follow the detailed steps below:
          </p>
          <ol>
            <li>
              Keep your router plugged into power.
            </li>
            <li>
              Locate the recessed physical <strong>Reset</strong> pinhole on the back panel of your device.
            </li>
            <li>
              Insert a bent paperclip or toothpick into the pinhole, press down until you feel the button click, and hold it down for 10-15 seconds.
            </li>
            <li>
              Observe the LED lights on the front of the router. Once they blink rapidly or turn solid amber, release the paperclip.
            </li>
            <li>
              Wait 1 to 2 minutes for the router to complete its reboot cycle and broadcast the default Wi-Fi network SSID.
            </li>
          </ol>
        </div>

        {/* Section 3: Reset Button Locations */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Reset Button Locations</h2>
          <p>
            Because accidental factory resets can disrupt home network connections, manufacturers place the reset button behind a recessed pinhole to prevent accidental presses. Common locations include:
          </p>
          <ul>
            <li>
              <strong>Back Panel:</strong> Positioned adjacent to the WAN (yellow/blue) port or power inputs.
            </li>
            <li>
              <strong>Bottom Panel:</strong> Recessed into the cooling vents of the router chassis.
            </li>
            <li>
              <strong>Combined WPS Button:</strong> Some models feature a dual-purpose WPS/Reset button. Pressing for 1 second activates WPS, while holding for 10 seconds triggers a factory reset.
            </li>
          </ul>
        </div>

        {/* Section 4: Post Reset Setup */}
        <div className="mb-10 prose-dark">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Post-Reset Setup Guidelines</h2>
          <p>
            After a factory reset, your router will no longer recognize your old Wi-Fi password. Follow these steps to re-configure your network:
          </p>
          <ol>
            <li>
              Connect your computer to the router using an Ethernet cable (recommended) or connect to the default Wi-Fi name printed on the bottom sticker.
            </li>
            <li>
              Open a browser and navigate to the default gateway IP address (typically <strong>192.168.1.1</strong> or <strong>192.168.0.1</strong>). Refer to our <Link href="/ips" className="text-[var(--brand-400)] hover:underline font-semibold">IP Address Directory</Link> if you are unsure.
            </li>
            <li>
              Log in using the default admin credentials listed on the sticker. If you have trouble accessing this page, consult our <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline font-semibold">Router Login Troubleshooting Guide</Link>.
            </li>
            <li>
              Run the Quick Setup wizard to establish your internet connection, specify a custom Wi-Fi network name (SSID), and set a secure Wi-Fi security key.
            </li>
            <li>
              Navigate to System Management to change the administrative password from the default &quot;admin&quot; value to a secure, custom password.
            </li>
          </ol>
        </div>

        {/* Section 5: Brand Instructions */}
        <div className="mb-10 glass-card p-6 border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Reset Steps by Brand</h2>
          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">TP-Link Router Reset</h3>
              <p>Locate the Reset/WPS button on the back. Press and hold for 10 seconds until the SYS LED flashes rapidly. Release the button and wait for the router to restart.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">ASUS Router Reset</h3>
              <p>Hold the Reset button for 5-10 seconds until the power LED starts blinking slowly. Release the button, wait for the router to reboot, and configure via http://router.asus.com.</p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">Netgear Router Reset</h3>
              <p>Insert a paperclip into the Restore Factory Settings hole. Hold for 7-10 seconds until the power LED blinks amber. Release the button and wait for reboot.</p>
            </div>
          </div>
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
