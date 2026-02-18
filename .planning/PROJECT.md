# SMEAI

## What This Is

A Thai-primary knowledge hub and consulting lead generator for SME owners exploring AI adoption. The site publishes Thai-language articles, project case studies, and video content that teach business owners how to use AI affordably — while showcasing real projects Ohm has built. Visitors learn to implement AI themselves or contact Ohm for consulting.

Shipped as a static site on Astro 5 + Tailwind v4 + Cloudflare Pages with build-time search, structured data, and Lighthouse 100/100 mobile performance.

## Core Value

SME owners can discover practical, cost-effective AI solutions they can actually use — and reach Ohm when they need help implementing them.

## Requirements

### Validated

- ✓ Landing page communicates value proposition in Thai within 5 seconds — v1.0
- ✓ About section with vet-to-AI story, credentials, and photo — v1.0
- ✓ Mobile-first responsive design — v1.0
- ✓ Portfolio link visible from landing page — v1.0
- ✓ Relatable practitioner tone, not corporate — v1.0
- ✓ Article system with categories, tags, TOC, reading time, lastReviewed — v1.0
- ✓ Thai-primary articles with Tinglish SEO keywords — v1.0
- ✓ Zod schema validation for content frontmatter — v1.0
- ✓ Article listing with pagination and category filtering — v1.0
- ✓ RSS feed for article subscription — v1.0
- ✓ Project showcase grid with business metrics — v1.0
- ✓ Case study pages (Problem → Solution → Results) — v1.0
- ✓ Featured projects on homepage — v1.0
- ✓ YouTube facade pattern (lazy-load, zero perf penalty) — v1.0
- ✓ Bidirectional video-article cross-linking — v1.0
- ✓ Video listing page with metadata — v1.0
- ✓ Contact info (LINE, email, phone) on contact page — v1.0
- ✓ Contact links in header/footer on every page — v1.0
- ✓ SEO meta tags, Open Graph (og:locale=th_TH), canonical URLs — v1.0
- ✓ Structured data (Article, CreativeWork, VideoObject, BreadcrumbList) — v1.0
- ✓ XML sitemap auto-generated at build time — v1.0
- ✓ Cloudflare Analytics (cookieless, PDPA-compliant) — v1.0
- ✓ Self-hosted Noto Sans Thai + Inter fonts via Fontsource — v1.0
- ✓ Core Web Vitals pass (Lighthouse mobile 100/100) — v1.0
- ✓ Deployed on Cloudflare Pages with CI/CD from GitHub — v1.0
- ✓ Pagefind client-side search with Thai segmentation — v1.0
- ✓ Search supports Thai and mixed Thai-English queries — v1.0

### Active

(None — start next milestone to define)

### Out of Scope

- User accounts / authentication — content is public, no login needed
- E-commerce / payment processing — consulting handled offline via LINE/phone
- Booking / calendar system — Thai business culture prefers LINE chat
- Comment system — moderation overhead, social engagement on LINE/Facebook
- AI chatbot on site — expensive to maintain quality, bad chatbot hurts credibility
- Gated content — Thai market shows low tolerance, hurts SEO

## Context

**Shipped:** v1.0 MVP (2026-02-18)
**Codebase:** Astro 5.17.2 + Preact + Tailwind v4 (CSS-first) + Cloudflare Pages
**LOC:** ~2,531 across Astro components, TypeScript utilities, CSS, and Markdown content
**Content:** 4 seed articles (ai-basics, tools categories), 3 seed projects, 2 seed videos
**Performance:** Lighthouse mobile 100/100 on all page types (LCP <1.5s, TBT 0ms, CLS 0)
**Search:** Pagefind v1.4.0 with native Thai word segmentation, lazy-loaded UI (~40KB on demand)

**Known limitation:** Pagefind segments Thai during indexing but not in browser queries. Long Thai phrases without spaces may get poor results. Short queries (1-3 words) work well.

**Content to add:** Real articles, real project case studies, real YouTube video IDs (seed content uses placeholders).

## Constraints

- **Language**: Thai-primary content and UI
- **Content**: Markdown in Git — low friction, free, version-controlled
- **Cost**: Static hosting on Cloudflare Pages (free tier)
- **Simplicity**: No backend, no database, no auth

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Thai-primary language | Target audience is Thai SME owners | ✓ Good — all UI and content in Thai |
| Astro 5 + Tailwind v4 + Cloudflare Pages | Static, fast, free hosting, Thai font support | ✓ Good — 100/100 Lighthouse |
| No user accounts | Content is public, reduces complexity | ✓ Good — zero maintenance auth |
| Simple contact links over forms | Minimize friction, match Thai culture (LINE) | ✓ Good — zero server-side code |
| OKLCH color system | Modern, perceptually uniform, dark mode support | ✓ Good — consistent theming |
| Fontsource variable fonts | Self-hosted, no Google Fonts latency, PDPA-compliant | ✓ Good — preloaded, no FOIT |
| Content collections with Zod schemas | Type-safe frontmatter, build-time validation | ✓ Good — catches errors early |
| Pagefind for search | Build-time indexing, Thai support, zero runtime cost | ✓ Good — native Thai segmenter |
| YouTube facade pattern | Zero performance penalty, privacy (nocookie) | ✓ Good — no YouTube requests on load |
| Biome over ESLint | Faster, simpler config, Astro experimental support | ✓ Good — single tool for lint+format |
| `is:inline` for SearchDialog | Bypass Vite bundling of runtime Pagefind import | ✓ Good — necessary workaround |

---
*Last updated: 2026-02-18 after v1.0 milestone*
