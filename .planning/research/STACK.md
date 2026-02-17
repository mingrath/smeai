# Stack Research

**Domain:** Thai-primary AI knowledge hub and consulting lead generator (content-driven static site)
**Researched:** 2026-02-17
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.17.x (stable) | Static site framework | Purpose-built for content sites. Ships zero JS by default, 40% faster than Next.js for static content, built-in Content Collections with Zod validation, native Markdown/MDX support. Astro joined Cloudflare in 2025, making it the best-supported framework on Cloudflare Pages. Use 5.x stable -- Astro 6 is still beta (requires Node 22+, Zod 4, breaking changes to i18n). Upgrade to 6 after stable release. |
| TypeScript | 5.8.x | Type safety | Current stable version. TypeScript 6.0 beta dropped Feb 2026 but is a bridge release to the Go-based TS 7.0. Stay on 5.8.x for stability; Astro 5 supports it natively. |
| Tailwind CSS | 4.1.x | Utility-first styling | CSS-first configuration in v4 (no more tailwind.config.js). 5x faster full builds, 100x faster incremental builds via Lightning CSS engine. Integrates with Astro via @tailwindcss/vite plugin. Thai text spacing and line-breaking work well with Tailwind's typography plugin. |
| Preact | 10.28.x | Interactive islands | 3KB gzipped vs React's 40KB+. Same API as React via compat layer. Astro's islands architecture loads Preact only where interactivity is needed (client:visible, client:idle directives). Perfect for cost calculators, ROI tools, and interactive demos that don't justify React's bundle size. |
| MDX | via @astrojs/mdx | Rich content authoring | Lets Thai articles embed interactive components (calculators, comparison tables, live demos) directly in Markdown. Authors write .mdx files with frontmatter validated by Zod schemas. |

### Content & SEO

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | latest | XML sitemap generation | Always. Auto-generates sitemap at build time from all routes. Required for Thai-keyword SEO indexing. |
| @astrojs/rss | latest | RSS feed | Always. Enables content subscription. Low effort, high value for recurring visitors. |
| astro-seo | latest | SEO meta component | Always. Single `<SEO />` component instead of manually writing 12+ meta tags per page. Enforces best practices (title length, OG tags, canonical URLs). |
| Pagefind | latest | Client-side search | After 10+ articles exist. Indexes at build time, runs entirely client-side. Zero hosting cost, supports Thai text tokenization. ~300KB initial load, then tiny chunks per query. |
| @astrojs/mdx | latest | MDX support | Always. Required for embedding Preact components in articles. |

### Fonts & Icons

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource/noto-sans-thai | latest | Thai font (self-hosted) | Always. Eliminates Google Fonts external request. Noto Sans Thai supports weights 100-900 (variable). Self-hosting is ~30% faster than CDN and privacy-preserving. |
| @fontsource/inter | latest | English/UI font | Always. Clean, modern variable font that pairs well with Noto Sans Thai. |
| astro-icon | latest | SVG icon component | Always. Zero-runtime SVG icons from 275,000+ Iconify sets. Server-rendered to static HTML -- no JS shipped. Use Lucide icon set for consistency. |

### Image & Media

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | latest | Image processing | Always (Astro default). Converts to WebP/AVIF, generates responsive srcsets. Runs at build time only. |
| Astro `<Image />` | built-in | Responsive images | Always. Replaces `<img>` tags. Auto-generates width/height to prevent CLS, lazy loads by default. |
| Astro `<Picture />` | built-in | Multi-format images | For hero images and project showcase cards. Generates WebP + AVIF + fallback. |

### State & Interactivity

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| nanostores | latest | Cross-island state | Only if interactive tools need shared state (e.g., calculator inputs affecting multiple display components). 286 bytes. Works across Astro + Preact islands. |
| @nanostores/preact | latest | Preact bindings | Paired with nanostores for reactive UI state in Preact islands. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Biome | Linting + formatting | v2.4. Single binary replaces ESLint + Prettier. 20-100x faster. 97% Prettier-compatible output. 449 lint rules. One config file (biome.json) instead of 4. Already used in meowmed project. |
| Satori + sharp | OG image generation | Generates social media cards from JSX templates at build time. Satori renders to SVG, sharp converts to PNG. One-time setup, auto-generates per article. |
| Astro View Transitions | Page transitions | Built-in. Two lines of code for SPA-like navigation with fade animations. 85%+ browser support in 2025. Zero additional JS if using native browser API. |

### Infrastructure

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Cloudflare Pages | Free tier | Hosting & CDN | Unlimited bandwidth, unlimited requests, 500 builds/month free. Astro is now a Cloudflare company -- first-class support guaranteed. Global CDN with edge nodes in Asia (including Thailand). Custom domains included. Zero cost for a static site. |
| GitHub | — | Source control & CI | Cloudflare Pages connects directly to GitHub for auto-deploy on push. Free for public/private repos. |
| Cloudflare Analytics | Free tier | Privacy-friendly analytics | No cookies, GDPR-compliant, free. Replaces Google Analytics without consent banner overhead. Sufficient for consulting lead funnel metrics. |

## Installation

```bash
# Create project
npm create astro@latest smeai -- --template minimal

# Core framework
npm install astro @astrojs/mdx @astrojs/sitemap @astrojs/rss

# Interactive islands
npm install preact @astrojs/preact

# Styling
npm install @tailwindcss/vite @tailwindcss/typography

# Content & SEO
npm install astro-seo astro-icon pagefind

# Fonts (self-hosted)
npm install @fontsource/noto-sans-thai @fontsource-variable/inter

# State management (only if needed for interactive tools)
npm install nanostores @nanostores/preact

# OG image generation
npm install satori satori-html sharp

# Dev dependencies
npm install -D typescript @biomejs/biome
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro 5.x | Next.js 15+ | If the site evolves to need server-side user accounts, payments, or complex dynamic features. Next.js bundles 40KB+ React runtime even for static pages -- overkill for a content site. |
| Astro 5.x | Hugo | If build speed is the only concern and you never need interactive components. Hugo is faster to build but has no component system -- Thai interactive tools (calculators, ROI estimators) would require separate JS bundles. |
| Astro 5.x | Astro 6 beta | When Astro 6.0 stable ships. v6 brings first-class Cloudflare Workers runtime in dev, stable live content collections, and CSP support. Requires Node 22+ and Zod 4 migration. |
| Preact | React | If you need a specific React-only library with no Preact compat. Preact's compat layer covers 95%+ of React libraries. The 13x smaller bundle matters for Thai users on mobile networks. |
| Preact | Svelte | If you prefer Svelte's syntax. Works equally well in Astro islands. Preact chosen because the owner already knows React patterns from meowmed project. |
| Tailwind CSS v4 | CSS Modules | If you strongly prefer scoped CSS without utility classes. Astro supports CSS Modules natively. Tailwind chosen for rapid prototyping and consistent design tokens. |
| Biome | ESLint + Prettier | If you need niche ESLint plugins (e.g., accessibility-specific rules). Biome covers 95% of use cases 20x faster. |
| Cloudflare Pages | Vercel | If you need edge functions with complex middleware. Vercel's free tier has bandwidth limits (100GB/month); Cloudflare's is unlimited. For a Thai content site, Cloudflare's Bangkok edge node provides better latency. |
| Cloudflare Pages | Netlify | If you prefer Netlify's UI or forms. Netlify free tier: 100GB bandwidth, 300 build minutes. Cloudflare: unlimited bandwidth, 500 builds. Cloudflare wins on cost. |
| Pagefind | Algolia | If you need faceted search, analytics, or personalization. Algolia's free tier (10K searches/month) is generous but adds a third-party dependency. Pagefind is zero-cost and self-hosted. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Next.js (for this project) | Ships React runtime (40KB+) even for static pages. Requires Node.js server for SSR/ISR. Overkill complexity for a content site with no auth, no database, no dynamic routes. | Astro -- zero JS by default, built for content |
| WordPress | Requires PHP hosting, database, security patching, plugin updates. Monthly hosting costs $5-20+. Attack surface for a simple content site. Contradicts "cost-effective AI" brand message. | Astro + Markdown -- zero hosting cost, zero maintenance |
| Google Fonts CDN | Extra DNS lookup + TCP connection adds 100-300ms latency. Sends user data to Google. Thai ISPs sometimes throttle Google CDN. | Fontsource self-hosted fonts -- bundled at build time |
| React (full) | 40KB+ gzipped runtime for interactive islands. Thai mobile users on 3G/4G pay a real cost for this. React Server Components are irrelevant for a static site. | Preact (3KB) with compat layer |
| Gatsby | Effectively abandoned. Build times are slow. GraphQL data layer adds unnecessary complexity for Markdown content. | Astro -- faster builds, simpler data loading, active development |
| Create React App | Deprecated. Single-page app architecture is terrible for SEO. No SSG support. | Astro -- SSG-first with perfect SEO |
| Contentful / Sanity / other headless CMS | Adds complexity, API dependency, and potential cost for a single-author site. Markdown files in Git are simpler, version-controlled, and free. | Astro Content Collections with Markdown/MDX files in the repo |
| @astrojs/tailwind integration | Deprecated for Tailwind v4. Only exists for v3 legacy projects. | @tailwindcss/vite plugin (official Tailwind v4 approach) |
| Google Analytics | Requires cookie consent banner (Thai PDPA compliance). Sends user data to Google. Blocked by ad blockers. | Cloudflare Analytics -- cookieless, privacy-compliant, free |

## Stack Patterns by Variant

**If adding bilingual (Thai + English) content later:**
- Use Astro's built-in i18n routing with directory-based organization (`/th/articles/...` and `/en/articles/...`)
- Content Collections support language-based filtering via file paths
- Do NOT add i18n from day one -- build Thai-only first, add English as a separate content collection later
- Because: i18n adds routing complexity; defer until there's proven demand for English content

**If interactive tools become complex (multi-step calculators, AI demos):**
- Keep Preact for the UI layer
- Use nanostores for cross-component state
- Consider adding @astrojs/preact with `compat: true` if React libraries are needed
- Because: Astro islands isolate JS to specific components, so complex tools don't bloat article pages

**If content volume exceeds 200+ articles:**
- Add Pagefind for client-side search (if not already added)
- Consider collection-based pagination with Astro's `paginate()` helper
- Monitor build times -- Astro 5.x handles 1000+ pages in under 30 seconds
- Because: Static site build times scale linearly with page count

**If consulting leads require tracking:**
- Add Cloudflare Web Analytics (already free) for page view tracking
- Use UTM parameters on LINE/email links for source attribution
- Do NOT add complex analytics tools -- the funnel is simple (read article -> contact via LINE/email)
- Because: Over-instrumented analytics adds maintenance burden without proportional value for a small consulting practice

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| astro@5.17.x | typescript@5.8.x | Astro 5 requires TS 5.x. Do NOT use TS 6.0 beta yet. |
| astro@5.17.x | @tailwindcss/vite@4.1.x | Requires Astro 5.2+ for native Tailwind v4 support via Vite plugin. |
| astro@5.17.x | preact@10.28.x | Stable combination. @astrojs/preact adapter handles integration. |
| @tailwindcss/vite@4.1.x | @tailwindcss/typography@latest | Typography plugin v4 uses CSS-first config. Import via `@plugin "@tailwindcss/typography"` in CSS. |
| astro@5.17.x | @biomejs/biome@2.4.x | No direct integration needed -- Biome runs independently. Configure in biome.json. |
| sharp@latest | astro@5.17.x | Astro uses sharp by default for image optimization. No extra config needed. |
| pagefind@latest | astro@5.17.x | Runs post-build on the dist/ output. Framework-agnostic. |
| astro@5.17.x | node@20.x or 22.x | Astro 5 supports Node 18+. Use Node 20 LTS or 22 LTS. Astro 6 will require Node 22+. |

## Sources

- [Astro vs Next.js comparison (Senorit, 2026)](https://senorit.de/en/blog/astro-vs-nextjs-2025) -- Performance benchmarks, SEO comparison (MEDIUM confidence)
- [Astro vs Next.js for Blogs (Sourabh Yadav, 2026)](https://sourabhyadav.com/blog/astro-vs-nextjs-for-blogs-2026/) -- Blog-specific comparison (MEDIUM confidence)
- [Astro official blog: Astro 6 Beta](https://astro.build/blog/astro-6-beta/) -- Astro 6 beta announcement (HIGH confidence)
- [Astro GitHub releases](https://github.com/withastro/astro/releases) -- v5.17.2 confirmed as latest stable (HIGH confidence)
- [Astro joins Cloudflare announcement](https://blog.cloudflare.com/astro-joins-cloudflare/) -- Strategic alignment (HIGH confidence)
- [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/) -- Zod schema validation (HIGH confidence)
- [Tailwind CSS v4 Astro setup (Tailkits, 2026)](https://tailkits.com/blog/astro-tailwind-setup/) -- Integration method (MEDIUM confidence)
- [Tailwind CSS official Astro guide](https://tailwindcss.com/docs/installation/framework-guides/astro) -- @tailwindcss/vite plugin (HIGH confidence)
- [Astro i18n recipe](https://docs.astro.build/en/recipes/i18n/) -- Directory-based i18n (HIGH confidence)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) -- Free tier specs (HIGH confidence)
- [Cloudflare Pages pricing](https://www.freetiers.com/directory/cloudflare-pages) -- Unlimited bandwidth confirmed (MEDIUM confidence)
- [Biome official site](https://biomejs.dev/) -- v2.4 features, 449 rules (HIGH confidence)
- [Nanostores GitHub](https://github.com/nanostores/nanostores) -- 286 bytes, Preact support (HIGH confidence)
- [Astro sharing state between islands](https://docs.astro.build/en/recipes/sharing-state-islands/) -- Nanostores recommended (HIGH confidence)
- [Fontsource Noto Sans Thai](https://fontsource.org/fonts/noto-sans-thai/install) -- Thai font availability (HIGH confidence)
- [Pagefind official site](https://pagefind.app/) -- Static search capabilities (HIGH confidence)
- [Astro SEO complete guide (BetterLink, Dec 2025)](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/) -- SEO integration patterns (MEDIUM confidence)
- [Astro image optimization guide (BetterLink, Dec 2025)](https://eastondev.com/blog/en/posts/dev/20251203-astro-image-optimization-guide/) -- Sharp + responsive images (MEDIUM confidence)
- [Astro View Transitions docs](https://docs.astro.build/en/guides/view-transitions/) -- Browser API, 85%+ support (HIGH confidence)
- [Preact vs React (Alphabold, 2026)](https://www.alphabold.com/preact-vs-react/) -- Bundle size comparison (MEDIUM confidence)
- [TypeScript 5.8 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/) -- Current stable TS (HIGH confidence)
- [Astro Cloudflare deploy guide](https://docs.astro.build/en/guides/deploy/cloudflare/) -- Deployment method (HIGH confidence)
- [Web Almanac 2025 Fonts chapter](https://almanac.httparchive.org/en/2025/fonts) -- Self-hosting trend data (HIGH confidence)

---
*Stack research for: SMEAI -- Thai-primary AI knowledge hub*
*Researched: 2026-02-17*
