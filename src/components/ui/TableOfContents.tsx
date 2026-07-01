"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AlignLeft, X } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

interface TableOfContentsProps {
  contentSelector: string;
}

export default function TableOfContents({ contentSelector }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Helper to slugify text securely
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const container = document.querySelector(contentSelector);
    if (!container) return;

    // Query elements strictly inside the targeted content selector
    const headingElements = container.querySelectorAll("h2, h3");

    // Only activate TOC if there are 3 or more H2 headings
    const h2Elements = Array.from(headingElements).filter(
      (el) => el.tagName.toLowerCase() === "h2"
    );

    if (h2Elements.length < 3) {
      setHeadings([]);
      return;
    }

    const items: HeadingItem[] = [];

    headingElements.forEach((el, index) => {
      let id = el.id;
      if (!id) {
        // Auto-assign slugified ID if it doesn't already have one
        const slug = slugify(el.textContent || `heading-${index}`);
        id = slug;
        el.id = slug;
      }

      items.push({
        id,
        text: el.textContent || "",
        level: el.tagName.toLowerCase() as "h2" | "h3",
      });
    });

    setHeadings(items);

    // Highlight headings using IntersectionObserver
    const observerOptions = {
      rootMargin: "-80px 0px -60% 0px", // Clearance offset for fixed header
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headingElements.forEach((el) => observer.observe(el));

    // Handle scroll progress computation
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const elementHeight = rect.height;
      const elementTop = -rect.top;
      const windowHeight = window.innerHeight;

      if (rect.top > windowHeight) {
        setScrollProgress(0);
      } else if (rect.bottom < 0) {
        setScrollProgress(100);
      } else {
        const totalHeight = elementHeight - windowHeight;
        const progress = (elementTop / totalHeight) * 100;
        setScrollProgress(Math.max(0, Math.min(100, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [contentSelector]);

  if (headings.length === 0) return null;

  // Handle smooth scroll with 72px header clearance offset
  const scrollToHeading = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 72;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Sticky Top Scroll Progress Bar */}
      <div 
        className="fixed top-16 left-0 right-0 h-[3px] bg-transparent z-40 pointer-events-none"
      >
        <div 
          className="h-full bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-400)] transition-transform duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop Sticky Table of Contents Sidebar Widget */}
      <nav 
        className="hidden lg:block sticky top-24 p-5 glass-card border border-[var(--border-subtle)] rounded-xl"
        aria-label="Table of contents"
      >
        <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2">
          <AlignLeft size={14} className="text-[var(--brand-400)]" />
          On This Page
        </h3>
        <ul className="space-y-2.5 max-h-[60vh] overflow-y-auto no-scrollbar">
          {headings.map((h) => (
            <li 
              key={h.id}
              className={cn(
                h.level === "h3" ? "pl-4 text-[11px]" : "text-xs font-medium"
              )}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => scrollToHeading(e, h.id)}
                className={cn(
                  "block py-0.5 transition-colors border-l-2 pl-2 hover:text-[var(--text-primary)]",
                  activeId === h.id
                    ? "text-[var(--brand-400)] border-[var(--brand-500)] font-semibold"
                    : "text-[var(--text-muted)] border-transparent"
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Floating Drawer Table of Contents */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-full bg-[var(--brand-600)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--brand-500)] transition-colors border border-[var(--border-strong)]"
          aria-label="Toggle Table of Contents"
        >
          {mobileOpen ? <X size={20} /> : <AlignLeft size={20} />}
        </button>

        {mobileOpen && (
          <div className="absolute bottom-16 right-0 w-72 max-h-96 overflow-y-auto bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl shadow-2xl p-4 animate-fade-in-up">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3 border-b border-[var(--border-subtle)] pb-2 flex items-center gap-1.5">
              <AlignLeft size={12} /> Jump to section
            </h4>
            <ul className="space-y-3">
              {headings.map((h) => (
                <li 
                  key={h.id}
                  className={cn(
                    h.level === "h3" ? "pl-3 text-[11px]" : "text-xs"
                  )}
                >
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => scrollToHeading(e, h.id)}
                    className={cn(
                      "block transition-colors",
                      activeId === h.id
                        ? "text-[var(--brand-400)] font-bold"
                        : "text-[var(--text-secondary)]"
                    )}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
