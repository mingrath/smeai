# Roadmap: SMEAI

## Overview

SMEAI delivers a Thai-primary knowledge hub and consulting lead generator for SME owners exploring AI adoption. The roadmap progresses from a deployable site skeleton through landing page, content system, project showcase, video integration, and finally search and performance polish -- each phase adding a complete, verifiable capability that builds on the previous. By Phase 6 completion, Thai SME owners can discover articles, view project case studies, watch video content, search across all content, and contact Ohm for consulting -- all on a fast, SEO-optimized, mobile-first static site.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Site Shell** - Deployable skeleton with layout, Thai typography, mobile-first design, deployment pipeline, and persistent contact links
- [x] **Phase 2: Landing Page & Contact** - Homepage value proposition, about section, portfolio link, and dedicated contact page
- [ ] **Phase 3: Content System & Articles** - Full article pipeline with content collections, Zod schema, categories/tags, reading experience, SEO meta, structured data, sitemap, and RSS
- [ ] **Phase 4: Project Showcase** - Portfolio grid, case study pages with business outcomes, and featured projects on homepage
- [ ] **Phase 5: Video Integration** - Lazy YouTube embeds, companion written articles, and video listing page
- [ ] **Phase 6: Search & Performance** - Pagefind client-side search with Thai support and Core Web Vitals audit

## Phase Details

### Phase 1: Foundation & Site Shell
**Goal**: Visitors see a deployable, mobile-responsive site skeleton with Thai typography, persistent contact links, and analytics -- served from Cloudflare Pages with CI/CD
**Depends on**: Nothing (first phase)
**Requirements**: LAND-03, LAND-05, SEO-04, SEO-05, SEO-07, LEAD-02
**Success Criteria** (what must be TRUE):
  1. Site is live on Cloudflare Pages and auto-deploys from GitHub on push to main
  2. Every page renders correctly on a mid-range Android phone (mobile-first responsive layout)
  3. Contact links (LINE, email) are accessible from header or footer on every page
  4. Thai text renders with self-hosted Noto Sans Thai + Inter fonts at proper line-height
  5. Cloudflare Analytics is collecting pageview data (cookieless, PDPA-compliant)
**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md -- Project Setup & Design System
- [x] 01-02-PLAN.md -- Layout Shell & Deployment

### Phase 2: Landing Page & Contact
**Goal**: A visitor landing on the homepage understands what SMEAI offers within 5 seconds, learns about Ohm's background, and can reach a dedicated contact page
**Depends on**: Phase 1
**Requirements**: LAND-01, LAND-02, LAND-04, LEAD-01
**Success Criteria** (what must be TRUE):
  1. Homepage hero communicates SMEAI's value proposition in Thai within 5 seconds of page load
  2. About section tells Ohm's vet-to-AI story with credentials and photo in a relatable (not corporate) tone
  3. Link to existing portfolio website is visible from the landing page
  4. Contact page displays LINE, email, and phone information clearly
**Plans:** 2 plans

Plans:
- [x] 02-01-PLAN.md -- Contact Constants & Contact Page
- [x] 02-02-PLAN.md -- Homepage Sections (Hero, About, Services, CTA)

### Phase 3: Content System & Articles
**Goal**: Ohm can publish Thai-language articles via Markdown with validated frontmatter, and visitors can browse articles by category, read with a polished experience, and subscribe via RSS
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. User can browse articles organized by categories and tags, with pagination on listing pages
  2. Each article page displays table of contents, estimated reading time, lastReviewed date, and has visual breaks for readability
  3. Every page has proper meta tags (og:locale=th_TH, canonical URLs, Open Graph) and article pages have Article and BreadcrumbList structured data
  4. XML sitemap is auto-generated at build time and includes all published content
  5. RSS feed is available and validates correctly for article subscription
**Plans:** 3 plans

Plans:
- [ ] 03-01-PLAN.md -- Content Foundation & Feed Infrastructure
- [ ] 03-02-PLAN.md -- Article Pages, SEO Enhancement & Layout
- [ ] 03-03-PLAN.md -- Article Listing & Category Browsing

### Phase 4: Project Showcase
**Goal**: Visitors can browse Ohm's AI projects as portfolio cards, read detailed case studies with business outcomes, and see featured projects highlighted on the homepage
**Depends on**: Phase 3
**Requirements**: SHOW-01, SHOW-02, SHOW-03, SHOW-04
**Success Criteria** (what must be TRUE):
  1. Project showcase page displays a grid of portfolio cards with project thumbnails and descriptions
  2. Individual case study pages follow Problem -> Solution -> Results structure with at least one concrete business metric
  3. Featured projects appear on the homepage, pulling from the project collection
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Video Integration
**Goal**: Visitors can watch YouTube video content without page performance penalty, and every video has a companion written article for SEO value
**Depends on**: Phase 3
**Requirements**: VIDE-01, VIDE-02, VIDE-03
**Success Criteria** (what must be TRUE):
  1. YouTube videos load using facade pattern (static thumbnail shown first, iframe loads only on click) with no performance penalty on initial page load
  2. Every video entry has a companion written article linked bidirectionally (video page links to article, article embeds or links to video)
  3. Video listing page displays all video content with title, thumbnail, and metadata
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

### Phase 6: Search & Performance
**Goal**: Visitors can search across all site content in Thai and mixed Thai-English, and the site passes Core Web Vitals thresholds on mobile
**Depends on**: Phase 4, Phase 5
**Requirements**: SRCH-01, SRCH-02, SEO-06
**Success Criteria** (what must be TRUE):
  1. Pagefind search indexes all content at build time and presents results in a search dialog
  2. Search returns relevant results for Thai text queries and mixed Thai-English queries
  3. Lighthouse mobile score is 90+ across all page types (landing, article, listing, contact)
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Site Shell | 2/2 | ✓ Complete | 2026-02-18 |
| 2. Landing Page & Contact | 2/2 | ✓ Complete | 2026-02-18 |
| 3. Content System & Articles | 0/3 | In progress | - |
| 4. Project Showcase | 0/TBD | Not started | - |
| 5. Video Integration | 0/TBD | Not started | - |
| 6. Search & Performance | 0/TBD | Not started | - |
