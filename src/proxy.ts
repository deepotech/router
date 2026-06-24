import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * C-4 Fix: Remove X-Frame-Options for /embed/* routes so they can be
 * embedded in third-party iframes. All other routes keep the DENY header
 * set by next.config.ts.
 *
 * Why Proxy instead of next.config.ts headers():
 *   - next.config.ts can only SET or OVERRIDE a header, not DELETE it.
 *   - "ALLOWALL" is not a standards-defined X-Frame-Options value.
 *   - CSP `frame-ancestors *` alone is sufficient for modern browsers.
 *   - Proxy can call response.headers.delete() which is the only
 *     reliable way to strip a header set by the global security rule.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/embed/")) {
    // Remove the global X-Frame-Options: DENY so iframes are permitted.
    response.headers.delete("X-Frame-Options");
    // CSP frame-ancestors covers modern browsers (Chrome, Firefox, Safari).
    // This is the W3C-recommended replacement for X-Frame-Options.
    response.headers.set("Content-Security-Policy", "frame-ancestors *;");
  }

  return response;
}

export const config = {
  // Run only on /embed/* paths — skip API routes, static files, etc.
  matcher: ["/embed/:path*"],
};
