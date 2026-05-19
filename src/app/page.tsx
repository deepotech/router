import Link from "next/link";
import { Wifi, Search, Server, Wrench, ShieldAlert, ArrowRight, Zap, Globe, BarChart2 } from "lucide-react";
import { GlobalSearch } from "@/components/ui/GlobalSearch";
import { APP_URL } from "@/lib/constants";
import { HomepageStatsService } from "@/server/services/homepage-stats.service";

export const metadata = {
  title: "RouterVia | Search Router Setups & Fixes",
  description: "Find your router's default IP, setup guides, and troubleshooting steps directly from our database.",
  alternates: {
    canonical: APP_URL,
  },
};

export default async function HomePage() {
  const stats = await HomepageStatsService.getRealCounts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--brand-500)]/20 blur-[120px] rounded-full pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-900)] border border-[var(--brand-700)] text-[var(--brand-300)] text-sm font-semibold mb-8 animate-fade-in-up">
            <Zap size={14} />
            <span>Fast, Local Search Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Find Your <span className="gradient-text">Router</span> <br className="hidden md:block" />
            Default IP & Login.
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Search through our database of {stats.routers > 0 ? stats.routers : "many"} router models, {stats.ips > 0 ? stats.ips : "common"} IPs, and {stats.problems > 0 ? stats.problems : "various"} troubleshooting guides.
          </p>

          <div className="max-w-2xl mx-auto text-left relative z-50 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            {/* The Global Search Component from Phase 4 */}
            <GlobalSearch />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <span className="text-sm text-[var(--text-muted)] font-medium w-full text-center mb-2">Popular Searches:</span>
            {["192.168.1.1", "TP-Link Login", "Connected, No Internet", "DNS Issues"].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:border-[var(--brand-500)] hover:text-[var(--brand-400)] transition-colors cursor-pointer">
                {tag}
              </span>
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

       {/* AUTHORITY SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6">
             The Database
           </h2>
           <p className="text-[var(--text-secondary)] max-w-3xl mx-auto mb-16 text-lg">
             RouterVia maps router configurations to their common IPs and troubleshooting steps, giving you direct answers.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
             <div className="text-center">
               <div className="text-4xl md:text-5xl font-extrabold text-[var(--brand-400)] mb-2">{stats.routers}</div>
               <p className="text-[var(--text-secondary)] font-medium">Router Models</p>
             </div>
             <div className="text-center">
               <div className="text-4xl md:text-5xl font-extrabold text-[var(--brand-400)] mb-2">{stats.ips}</div>
               <p className="text-[var(--text-secondary)] font-medium">Mapped IPs</p>
             </div>
             <div className="text-center">
               <div className="text-4xl md:text-5xl font-extrabold text-[var(--brand-400)] mb-2">{stats.problems}</div>
               <p className="text-[var(--text-secondary)] font-medium">Troubleshooting Guides</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
