import Link from "next/link";
import { Wifi, Search, Server, Wrench, ShieldAlert, ArrowRight, Zap, Globe, Clock, ChevronRight } from "lucide-react";
import { GlobalSearch } from "@/components/ui/GlobalSearch";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { APP_URL } from "@/lib/constants";
import { StatsService } from "@/server/services/stats.service";
import { ArticlesService } from "@/server/services/articles.service";
import { TrendingService } from "@/server/services/trending.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";
import { Badge } from "@/components/ui/Badge";

export const metadata = buildMetadata({
  title: "RouterVia — Router Admin Login, Setup Guides & IP Address Database",
  description: "Access your router admin setup page. Find default router IPs, login usernames, passwords, and step-by-step troubleshooting guides for TP-Link, D-Link, Netgear, and more.",
  canonical: "/",
});

// force dynamic to prevent build-time Prisma errors
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch stats, latest articles, and trending searches in parallel
  const [stats, latestArticles, trendingSearches] = await Promise.all([
    StatsService.getHomepageStats(),
    ArticlesService.getLatestArticles({ limit: 6 }),
    TrendingService.getTrendingSearches(6),
  ]);

  const breadcrumbs = [{ label: "Home", href: "/" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, APP_URL);

  const faqItems = [
    {
      question: "How do I find my router's default IP address?",
      answer: "You can find your router's default IP (default gateway) by opening Command Prompt on Windows and typing 'ipconfig', or checking Network Settings on macOS/mobile. Common default IPs include 192.168.1.1, 192.168.0.1, and 192.168.8.1.",
    },
    {
      question: "What is the default admin username and password for routers?",
      answer: "Most routers use 'admin' as both the default username and password. Other brands might leave the password blank or use 'password'. Check your router's physical label or search our database for your specific brand and model.",
    },
    {
      question: "How do I log in to my router configuration page?",
      answer: "Connect your device to the router's WiFi network or via an ethernet cable. Open a web browser, enter the router's IP address (e.g., http://192.168.1.1) in the address bar, and enter the default admin credentials when prompted.",
    },
  ];
  const faqSchema = buildFaqSchema(faqItems);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RouterVia",
    "url": APP_URL,
    "logo": `${APP_URL}/images/og-default.png`,
    "description": "AI-powered router troubleshooting and network diagnostics platform.",
  };

  const badgeColors: Record<string, "brand" | "success" | "warning" | "danger" | "outline" | "default"> = {
    IP: "success",
    Problem: "danger",
    Firmware: "brand",
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={organizationSchema} />

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-32 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--brand-500)]/20 blur-[120px] rounded-full pointer-events-none"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-900)]/50 border border-[var(--brand-700)] text-[var(--brand-300)] text-sm font-semibold mb-8 animate-fade-in-up">
                <Zap size={14} />
                <span>Fast, Local Search Engine</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                Find Your <span className="gradient-text">Router</span> <br className="hidden md:block" />
                Default IP & Login.
              </h1>
              
              <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Search through our database of {stats.routerModels > 0 ? stats.routerModels : "many"} router models, {stats.ipAddresses > 0 ? stats.ipAddresses : "common"} IPs, and {stats.troubleshootingGuides > 0 ? stats.troubleshootingGuides : "various"} troubleshooting guides.
              </p>

              <div className="max-w-2xl mx-auto text-left relative z-50 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <GlobalSearch />
              </div>

              {/* Trending Searches Grid */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up max-w-3xl mx-auto" style={{ animationDelay: "400ms" }}>
                <span className="text-sm text-[var(--text-muted)] font-medium w-full text-center mb-2">Trending Searches:</span>
                {trendingSearches.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-500)] hover:text-[var(--brand-400)] text-sm text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK ACTIONS GRID */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <Link href="/routers" className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-900)] border border-[var(--brand-700)] flex items-center justify-center mb-6 group-hover:bg-[var(--brand-600)] transition-colors">
                    <Server size={28} className="text-[var(--brand-300)] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    Router Database <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--brand-400)] transition-colors" />
                  </h3>
                  <p className="text-[var(--text-secondary)]">Find default passwords, login IPs, and setup guides for various router models.</p>
                </Link>

                <Link href="/problems" className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-rose-950 border border-rose-800 flex items-center justify-center mb-6 group-hover:bg-rose-600 transition-colors">
                    <ShieldAlert size={28} className="text-rose-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    Troubleshooting <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:text-rose-400 transition-colors" />
                  </h3>
                  <p className="text-[var(--text-secondary)]">Step-by-step guides to fix Wi-Fi disconnects, slow speeds, and DNS resolution failures.</p>
                </Link>

                <Link href="/tools" className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                    <Wrench size={28} className="text-emerald-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    Networking Tools <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:text-emerald-400 transition-colors" />
                  </h3>
                  <p className="text-[var(--text-secondary)]">Run speed tests, check IP addresses, test port forwarding, and generate secure passwords.</p>
                </Link>

              </div>
            </div>
          </section>

          {/* LATEST TROUBLESHOOTING GUIDES SECTION */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)]">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                    Latest Troubleshooting Guides
                  </h2>
                  <p className="text-[var(--text-secondary)] mt-2">
                    Recently updated router configurations, IP address setups, and network diagnostics.
                  </p>
                </div>
                <Link
                  href="/latest"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-400)] hover:text-[var(--brand-300)] hover:underline transition-colors"
                >
                  View All Guides <ChevronRight size={16} />
                </Link>
              </div>

              {latestArticles.length === 0 ? (
                <div className="glass-card p-12 text-center text-[var(--text-muted)]">
                  No articles found in the database.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={article.href}
                      className="glass-card p-6 flex flex-col justify-between hover:border-[var(--brand-500)] hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant={badgeColors[article.type] || "default"}>
                            {article.type}
                          </Badge>
                          <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(article.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6">
                          {article.excerpt}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[var(--brand-400)] flex items-center gap-1 group-hover:underline">
                        Read full guide <ChevronRight size={14} />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* AUTHORITY SECTION */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30">
            <div className="max-w-7xl mx-auto text-center">
               <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6">
                 The Database
               </h2>
               <p className="text-[var(--text-secondary)] max-w-3xl mx-auto mb-16 text-lg">
                 RouterVia maps router configurations to their common IPs and troubleshooting steps, giving you direct answers.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                 <div className="text-center">
                   <div className="text-4xl md:text-5xl font-extrabold text-[var(--brand-400)] mb-2">{stats.routerModels}</div>
                   <p className="text-[var(--text-secondary)] font-medium">Router Models</p>
                 </div>
                 <div className="text-center">
                   <div className="text-4xl md:text-5xl font-extrabold text-[var(--brand-400)] mb-2">{stats.ipAddresses}</div>
                   <p className="text-[var(--text-secondary)] font-medium">Mapped IPs</p>
                 </div>
                 <div className="text-center">
                   <div className="text-4xl md:text-5xl font-extrabold text-[var(--brand-400)] mb-2">{stats.troubleshootingGuides}</div>
                   <p className="text-[var(--text-secondary)] font-medium">Troubleshooting Guides</p>
                 </div>
               </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
