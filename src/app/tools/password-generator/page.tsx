import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import PasswordGeneratorClient from "@/components/tools/PasswordGeneratorClient";

export const metadata: Metadata = buildMetadata({
  title: "Secure Password Generator — WiFi & Router Admin Passwords | RouterVia",
  description:
    "Generate cryptographically secure random passwords for your router WiFi and admin panel. Uses the Web Crypto API — passwords are generated locally, never sent to servers.",
  canonical: "/tools/password-generator",
  keywords: [
    "password generator",
    "wifi password generator",
    "secure password generator",
    "random password generator",
    "strong password generator",
    "router password generator",
    "wpa2 password",
    "admin password generator",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "Password Generator", url: "/tools/password-generator" },
];

const faqs = [
  {
    question: "How secure is a randomly generated password?",
    answer:
      "Security depends on length and character diversity. A 16-character password using uppercase, lowercase, numbers, and symbols has approximately 95^16 ≈ 4.4 × 10^31 possible combinations. At a rate of 1 trillion guesses per second, it would take over a trillion years to brute-force — effectively uncrackable. Our generator uses the browser's cryptographic random number generator (crypto.getRandomValues) for true randomness.",
  },
  {
    question: "What is the recommended password length for a WiFi network?",
    answer:
      "The minimum WPA2/WPA3 password length is 8 characters, but this is far too short. We recommend at least 16 characters for home networks and 20+ characters for business or sensitive networks. Longer passwords provide exponentially more security — each additional character multiplies the possible combinations by the size of the character set.",
  },
  {
    question: "Should I use symbols in my WiFi password?",
    answer:
      "Symbols greatly improve password security by expanding the character set from 62 (alphanumeric) to 94 characters. However, some old router firmware and network devices have trouble with certain special characters. Safe symbols that work universally include: ! @ # $ % ^ & * ( ) - _ = +. Avoid using quotes, backslashes, and angle brackets as they can cause parsing issues in router configuration interfaces.",
  },
  {
    question: "Is it safe to use a password generated on this website?",
    answer:
      "Yes — this generator runs entirely in your browser using JavaScript. Passwords are generated locally by the Web Crypto API and are never transmitted to our servers. You can verify this by disconnecting your internet and refreshing the page — the generator will still work. For maximum security, close the tab after copying your password.",
  },
  {
    question: "What is the difference between WPA2 and WPA3 password security?",
    answer:
      "WPA2 uses CCMP-AES encryption with a Pre-Shared Key (PSK) that is vulnerable to offline dictionary attacks. If an attacker captures the 4-way handshake during authentication, they can try billions of password guesses per second offline. WPA3 uses SAE (Simultaneous Authentication of Equals), which requires active interaction for every authentication attempt, making offline brute-force attacks computationally infeasible regardless of password length.",
  },
  {
    question: "How often should I change my router's WiFi password?",
    answer:
      "Best practice recommendations: (1) Change immediately when you first set up the router — never leave the factory default. (2) Change whenever you suspect unauthorized access. (3) Change when a trusted person who knew the password leaves the household or organization. (4) Change every 12–24 months as a precautionary measure. Router admin panel passwords should be changed separately from the WiFi password and should be unique.",
  },
  {
    question: "What makes a password hard to crack?",
    answer:
      "Three factors determine crackability: (1) Length — each extra character multiplies the attack space exponentially. (2) Randomness — predictable patterns (dictionary words, keyboard walks like 'qwerty123') are checked first by attackers. (3) Character diversity — mixing character classes prevents simple dictionary attacks. The strongest passwords are completely random strings of 16+ characters — exactly what this generator produces.",
  },
];

export default function PasswordGeneratorPage() {
  return (
    <NetworkingToolShell
      h1="Password Generator"
      intro="Generate cryptographically secure random passwords for your router WiFi and admin panel. Uses the browser's Web Crypto API — passwords are generated locally and never sent to our servers."
      toolType="password"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <PasswordGeneratorClient />
    </NetworkingToolShell>
  );
}
