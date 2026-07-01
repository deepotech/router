"use client";

import { useEffect } from "react";

interface WebVitalMetric {
  name: string;
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
}

/**
 * Dispatch point for sending metrics to external analytics providers
 * (e.g. Vercel Analytics, Google Analytics, Datadog).
 * Wire up the body of this function when analytics is configured.
 */
function sendToAnalytics(_metric: WebVitalMetric) {
  // Example:
  // if (typeof window !== "undefined" && (window as any).gtag) {
  //   (window as any).gtag("event", _metric.name, {
  //     event_category: "Web Vitals",
  //     value: Math.round(_metric.value),
  //     non_interaction: true,
  //   });
  // }
}

function getRating(name: string, value: number): WebVitalMetric["rating"] {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
    INP: [200, 500],
  };
  const t = thresholds[name];
  if (!t) return undefined;
  if (value <= t[0]) return "good";
  if (value <= t[1]) return "needs-improvement";
  return "poor";
}

export function WebVitals() {
  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    const observeMetric = (type: string, callback: (entry: PerformanceEntry) => void) => {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            callback(entry);
          }
        });
        observer.observe({ type, buffered: true });
        return observer;
      } catch {
        return null;
      }
    };

    const report = (name: string, value: number) => {
      const metric: WebVitalMetric = { name, value, rating: getRating(name, value) };

      if (process.env.NODE_ENV === "development") {
        const color = metric.rating === "good" ? "color:green" : metric.rating === "needs-improvement" ? "color:orange" : "color:red";
        console.log(`%c[Web Vital] ${name}: ${Math.round(value)}ms (${metric.rating ?? "–"})`, color);
      }

      // Only send to analytics if a provider is configured
      sendToAnalytics(metric);
    };

    const observers: (PerformanceObserver | null)[] = [];

    // LCP
    observers.push(
      observeMetric("largest-contentful-paint", (e) => {
        report("LCP", (e as PerformanceEventTiming).startTime);
      })
    );

    // FCP
    observers.push(
      observeMetric("paint", (e) => {
        if (e.name === "first-contentful-paint") report("FCP", e.startTime);
      })
    );

    // CLS
    let clsValue = 0;
    observers.push(
      observeMetric("layout-shift", (e) => {
        if (!(e as any).hadRecentInput) {
          clsValue += (e as any).value;
          report("CLS", clsValue);
        }
      })
    );

    // TTFB
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navEntry) {
      report("TTFB", navEntry.responseStart - navEntry.requestStart);
    }

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return null;
}
