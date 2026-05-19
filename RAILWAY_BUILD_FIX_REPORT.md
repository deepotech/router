# Railway Build Fix Report — DATABASE_URL Resilience

## Overview
Next.js prerendering attempts to execute data-fetching logic during the `npm run build` phase. Because Railway's Docker build environment does not always have access to runtime environment variables (like `DATABASE_URL` via Neon), Prisma throws a `PrismaClientInitializationError`. This caused hard crashes during static site generation and sitemap compilation.

This patch fully decouples the build phase from the database, allowing the Next.js build to succeed entirely without a database connection. The application gracefully degrades to static fallbacks during build and relies on runtime environment variables when deployed.

## Changes Implemented

### 1. Build-Time Database Guards
- **Created `src/lib/server/env-safe.ts`**: Introduces `hasDatabase`, a boolean check that verifies the existence of `DATABASE_URL` before any Prisma logic fires.
- **Created `src/lib/server/safe-db.ts`**: Provides a `safeDb` wrapper function to catch all DB queries and return a fallback value safely if the connection is missing or throws an error.

### 2. Static Generation Hardening
All `generateStaticParams` and `generateMetadata` instances were updated to fail-open (returning empty arrays or fallback metadata objects):
- `src/app/ips/[ip]/page.tsx`
- `src/app/routers/[brand]/page.tsx`
- `src/app/routers/[brand]/[model]/layout.tsx`
- `src/app/routers/[brand]/[model]/login/page.tsx`
- `src/app/routers/[brand]/[model]/reset/page.tsx`
- `src/app/routers/[brand]/[model]/setup/page.tsx`
- `src/app/problems/[slug]/page.tsx`
- `src/app/compare/[slug]/page.tsx`
- `src/app/search/page.tsx`

### 3. Sitemap Hardening
Sitemaps often iterate over large datasets during build. They have been secured to prevent crashing:
- `src/app/routers/sitemap.ts`
- `src/app/problems/sitemap.ts`
*(They now return `[]` if the database is inaccessible, ensuring the XML files build without bringing down the compiler.)*

### 4. Dynamic Route Conversions
Heavily database-reliant hub pages have been converted from `revalidate` ISR to full dynamic rendering using `export const dynamic = "force-dynamic"`. This completely circumvents Next.js's attempt to statically generate them during the build phase:
- `/routers` (`src/app/routers/page.tsx`)
- `/problems` (`src/app/problems/page.tsx`)
- `/search` (`src/app/search/page.tsx`)

## Verification Results
A local test was executed by temporarily removing `.env` and `.env.local` to completely hide the `DATABASE_URL`.
- **Command Run:** `npm run build`
- **Result:** **✅ SUCCESS (Exit code: 0)**
- **Behavior:** Prisma still logged internal warnings (`Environment variable not found: DATABASE_URL`), but the app successfully intercepted the errors. All 25 static workers completed their tasks and generated the optimized production build (`.next`) successfully.

## Remaining Risks & Next Steps
- **Prisma Client Generation:** We are currently running `prisma generate` before `next build`. This is safe because Prisma Generation only requires the `schema.prisma` file, not a live database.
- **Railway Configuration:** The application will now reliably build. Once the image boots up in the Railway container, it will successfully establish the Prisma connection using the real `DATABASE_URL`.
- **Action Required:** Ensure `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_NAME`, `OPENAI_API_KEY`, and `REDIS_URL` are set inside the Railway UI under **Variables**.
