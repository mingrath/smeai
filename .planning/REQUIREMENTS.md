# Requirements: SMEAI

**Defined:** 2026-02-17
**Core Value:** SME owners can discover practical, cost-effective AI solutions they can actually use — and reach Ohm when they need help implementing them.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Landing & Branding

- [ ] **LAND-01**: Landing page communicates SMEAI's value proposition in Thai within 5 seconds
- [ ] **LAND-02**: About section tells Ohm's vet-to-AI story with credentials and photo
- [ ] **LAND-03**: Site uses mobile-first responsive design (tested on Android mid-range devices)
- [ ] **LAND-04**: Link to existing portfolio website is visible from landing page
- [ ] **LAND-05**: Personal branding conveys relatable practitioner tone, not corporate

### Content & Articles

- [ ] **CONT-01**: User can browse articles organized by categories and tags
- [ ] **CONT-02**: Article pages have table of contents, estimated reading time, and visual breaks
- [ ] **CONT-03**: Articles are Thai-primary with Tinglish SEO keywords in titles and meta
- [ ] **CONT-04**: Every article has a `lastReviewed` date displayed prominently
- [ ] **CONT-05**: Content collection uses Zod schema validation for consistent frontmatter
- [ ] **CONT-06**: Article listing page with pagination/filtering by category
- [ ] **CONT-07**: RSS feed available for article subscription

### Project Showcase

- [ ] **SHOW-01**: Project showcase displays as a grid of portfolio cards
- [ ] **SHOW-02**: Individual case study pages follow Problem → Solution → Results structure
- [ ] **SHOW-03**: Case studies include at least one concrete business metric
- [ ] **SHOW-04**: Featured projects appear on the homepage

### Video Content

- [ ] **VIDE-01**: YouTube videos use lazy-load facade pattern (thumbnail + click-to-play)
- [ ] **VIDE-02**: Video content has companion written articles for SEO value
- [ ] **VIDE-03**: Video listing page shows all video content with metadata

### Contact & Lead Generation

- [ ] **LEAD-01**: Contact information (LINE, email, phone) displayed on contact page
- [ ] **LEAD-02**: Contact links accessible from every page (header/footer)

### SEO & Performance

- [ ] **SEO-01**: Every page has proper meta tags, Open Graph with `og:locale=th_TH`, and canonical URLs
- [ ] **SEO-02**: Structured data (Article schema, BreadcrumbList) on relevant pages
- [ ] **SEO-03**: XML sitemap auto-generated at build time
- [ ] **SEO-04**: Cloudflare Analytics integrated (cookieless, PDPA-compliant)
- [ ] **SEO-05**: Self-hosted Noto Sans Thai + Inter fonts via Fontsource
- [ ] **SEO-06**: Core Web Vitals pass (Lighthouse mobile score 90+)
- [ ] **SEO-07**: Site deployed on Cloudflare Pages with CI/CD from GitHub

### Search

- [ ] **SRCH-01**: Pagefind client-side search indexes all content at build time
- [ ] **SRCH-02**: Search supports Thai text queries and mixed Thai-English queries

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Interactive Tools

- **TOOL-01**: AI Cost Calculator with 3-5 inputs producing concrete baht estimates
- **TOOL-02**: ROI Estimator for AI implementation
- **TOOL-03**: AI tool comparison tables with Thai context

### Content Enhancements

- **CENH-01**: AI glossary with plain Thai explanations, linked from articles
- **CENH-02**: Content series / learning paths with guided article sequences
- **CENH-03**: Industry-specific AI guides (clinic, retail, services)

### Lead Generation Enhancements

- **LGEN-01**: LINE QR code for mobile users on contact page
- **LGEN-02**: LINE OA broadcast opt-in for recurring content updates
- **LGEN-03**: CTA at end of every article and case study linking to LINE

### Showcase Enhancements

- **SENH-01**: Live demo embeds (sandboxed iframes) for deployable projects

### Content Features

- **CFEA-01**: Dark mode toggle
- **CFEA-02**: English language content support (bilingual)

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts / authentication | Content is public, no login needed. Adds massive complexity. |
| E-commerce / payment processing | Consulting handled offline via LINE/phone |
| Booking / calendar system | Thai business culture prefers LINE chat over self-service booking |
| Comment system on articles | Moderation overhead, low quality comments hurt credibility. Social engagement happens on LINE/Facebook. |
| Headless CMS (Contentful, Sanity) | Single-author site — Markdown in Git is simpler, free, version-controlled |
| Server-side rendering / database | Static site covers all requirements. No auth, no dynamic data. |
| AI chatbot on the site | Expensive to maintain quality. Bad chatbot damages credibility more than no chatbot. |
| Gated content (email for downloads) | Thai market shows low tolerance for gated content. Hurts SEO. |
| Complex contact forms with serverless backend | Simple links match Thai business convention. Zero maintenance. |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAND-01 | — | Pending |
| LAND-02 | — | Pending |
| LAND-03 | — | Pending |
| LAND-04 | — | Pending |
| LAND-05 | — | Pending |
| CONT-01 | — | Pending |
| CONT-02 | — | Pending |
| CONT-03 | — | Pending |
| CONT-04 | — | Pending |
| CONT-05 | — | Pending |
| CONT-06 | — | Pending |
| CONT-07 | — | Pending |
| SHOW-01 | — | Pending |
| SHOW-02 | — | Pending |
| SHOW-03 | — | Pending |
| SHOW-04 | — | Pending |
| VIDE-01 | — | Pending |
| VIDE-02 | — | Pending |
| VIDE-03 | — | Pending |
| LEAD-01 | — | Pending |
| LEAD-02 | — | Pending |
| SEO-01 | — | Pending |
| SEO-02 | — | Pending |
| SEO-03 | — | Pending |
| SEO-04 | — | Pending |
| SEO-05 | — | Pending |
| SEO-06 | — | Pending |
| SEO-07 | — | Pending |
| SRCH-01 | — | Pending |
| SRCH-02 | — | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 0
- Unmapped: 30

---
*Requirements defined: 2026-02-17*
*Last updated: 2026-02-17 after initial definition*
