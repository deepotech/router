import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for smaller Railway containers + faster cold starts
  output: "standalone",

  // Mark server-only heavy packages to avoid bundling them into edge runtime
  serverExternalPackages: ["@prisma/client", "prisma", "ioredis", "bullmq"],

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
  },

  // Compiler options for production optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for Next.js 15
  experimental: {
    // Partial Pre-rendering for hybrid static/dynamic rendering
    ppr: false,
    // Throttling static generation concurrency to prevent database connection pool exhaustion
    staticGenerationMaxConcurrency: 4,
    // Limit CPU threads for worker pools to prevent DB exhaustion
    cpus: 4,
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/192-168-1-1",
        destination: "/ips/192-168-1-1",
        permanent: true,
      },
      {
        source: "/192-168-0-1",
        destination: "/ips/192-168-0-1",
        permanent: true,
      },
      {
        source: "/router-password-recovery",
        destination: "/router-password",
        permanent: true,
      },
      {
        source: "/my-ip",
        destination: "/what-is-my-ip",
        permanent: true,
      },
      {
        source: "/check-my-ip",
        destination: "/what-is-my-ip",
        permanent: true,
      },
      {
        source: "/public-ip-checker",
        destination: "/what-is-my-ip",
        permanent: true,
      },

    ];
  },
};

export default nextConfig;
