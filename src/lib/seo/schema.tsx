import { cn } from "@/lib/utils";

// =============================================================
// JSON-LD Schema builders for structured data
// =============================================================

// Inject raw JSON-LD into a <script> tag
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---- WebSite schema (root level) ----
export function generateWebSiteSchema(SITE_NAME: string, SITE_URL: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateSemanticArticleSchema(
  title: string,
  description: string,
  url: string,
  publishedAt: Date,
  updatedAt: Date,
  trustScore: number,
  SITE_NAME: string,
  SITE_URL: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "datePublished": publishedAt.toISOString(),
    "dateModified": updatedAt.toISOString(),
    "proficiencyLevel": "Beginner",
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": trustScore * 100,
        "bestRating": 100
      },
      "author": { "@type": "Organization", "name": "RouterVia Governance" }
    }
  };
}

// ---- BreadcrumbList schema ----
export function buildBreadcrumbSchema(
  items: { label: string; href: string }[],
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };
}

// ---- FAQPage schema ----
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ---- HowTo schema ----
export function buildHowToSchema(
  name: string,
  description: string,
  steps: { title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

// ---- Product schema (for router pages) ----
export function buildProductSchema(data: {
  name: string;
  description: string;
  brand: string;
  image?: string;
  url: string;
  ratingValue?: number;
  ratingCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    brand: {
      "@type": "Brand",
      name: data.brand,
    },
    ...(data.image && { image: data.image }),
    url: data.url,
    ...(data.ratingValue && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.ratingValue.toFixed(1),
        bestRating: "5",
        worstRating: "1",
        ratingCount: data.ratingCount || 10,
      }
    })
  };
}

// Deterministic rating helper to provide realistic stable ratings
export function calculateRouterRating(routerId: number) {
  const ratingValue = 4.0 + ((routerId * 3) % 10) * 0.1;
  const ratingCount = 5 + (routerId * 7) % 45;
  return { ratingValue, ratingCount };
}

