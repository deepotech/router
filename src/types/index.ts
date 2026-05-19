// =============================================================
// GLOBAL SHARED TYPES
// =============================================================

// ---- Router / Brand ----

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  modelCount?: number;
}

export interface RouterModel {
  id: number;
  brandId: number;
  brand?: Pick<Brand, "name" | "slug">;
  name: string;
  slug: string;
  loginIps: string[];
  defaultUsername: string;
  defaultPassword: string;
  wifiSetupGuide: string;
  resetGuide: string;
  faqs: FAQ[];
  imageUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Problems ----

export type ProblemCategory =
  | "WIFI"
  | "DNS"
  | "SPEED"
  | "CONNECTION"
  | "SECURITY"
  | "HARDWARE"
  | "OTHER";

export interface ProblemFix {
  step: number;
  title: string;
  description: string;
}

export interface Problem {
  id: number;
  title: string;
  slug: string;
  category: ProblemCategory;
  excerpt: string;
  content: string;
  causes: string[];
  fixes: ProblemFix[];
  faqs: FAQ[];
  relatedSlugs: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- IP Address ----

export interface IpAddress {
  id: number;
  address: string;
  slug: string;
  commonBrands: string[];
  description: string;
  loginGuide: string;
  faqs: FAQ[];
  metaTitle: string | null;
  metaDescription: string | null;
}

// ---- Shared ----

export interface FAQ {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ---- AI ----

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ---- SEO ----

export interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

// ---- Tools ----

export type ToolId =
  | "ip-checker"
  | "dns-checker"
  | "ping-test"
  | "speed-test"
  | "port-checker"
  | "wifi-qr"
  | "password-generator";

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: string;
  href: string;
  category: "network" | "security" | "wifi";
}
