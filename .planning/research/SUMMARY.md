# Project Research Summary

**Project:** SMEAI
**Domain:** AI Knowledge Hub and Consulting Lead Generator for Thai SMEs
**Researched:** 2026-02-17
**Confidence:** HIGH

## Executive Summary

SMEAI is a content-driven static website that serves two purposes: educate Thai SME owners about practical AI adoption, and generate consulting leads for Ohm (Mingrath Mekavichai). The product type is a well-understood pattern -- a professional knowledge hub with portfolio showcase -- but the Thai SME market context introduces specific requirements around language, contact conventions (LINE-first), mobile-dominant browsing (98%), and content tone (conversational, not academic). Research confirms that Astro on Cloudflare Pages is the optimal stack: zero JavaScript by default gives excellent mobile performance for Thai users on varying network speeds, Content Collections with Zod validation provides a robust authoring pipeline, and Cloudflare's free tier with Bangkok edge nodes eliminates hosting costs entirely. The owner's existing experience with React patterns (from the MeowMed project) transfers directly through Preact's compat layer at 1/13th the bundle size.

The recommended approach is to build Thai-first, content-first, and mobile-first. The site should launch as a minimal but polished content hub (landing page, articles, portfolio, contact) before adding interactive tools or search. The critical differentiation from Thai competitors -- none of whom combine knowledge content, portfolio showcase, and interactive tools in one place -- comes from practical cost-focused content written in natural Thai, LINE-first contact flow, and eventually interactive cost calculators that no competitor offers. The architecture is purely static with no backend, database, or server. Interactive elements (calculators, search) are isolated Preact islands that load only when needed.

The key risks are content-related, not technical. The biggest danger is writing for technologists instead of SME owners -- using AI jargon that impresses developers but alienates the actual audience. The second risk is Thai content that reads like translated English, which hurts both readability and SEO. The third risk is content staleness in the fast-moving AI domain. All three are preventable with content strategy work done before the first article is written: establish a Thai voice guide, define article templates with mandatory business-outcome sections, and build freshness tracking into the content schema from day one.

## Key Findings

### Recommended Stack

The stack centers on Astro 5.17.x as the static site framework, chosen because it ships zero JS by default, has first-class Markdown/MDX support with Content Collections, and is now a Cloudflare company guaranteeing long-term support on the recommended hosting platform. Preact (3KB) handles interactive islands instead of React (40KB+), which matters for Thai mobile users. Tailwind CSS v4 with the typography plugin handles styling with good Thai text support. Biome replaces ESLint + Prettier as a single fast linter/formatter.

**Core technologies:**
- **Astro 5.17.x:** Static site framework -- zero JS default, built-in Content Collections with Zod, native MDX support, Cloudflare-aligned
- **Preact 10.28.x:** Interactive islands -- 3KB gzipped, React-compatible API, loads only where interactivity is needed
- **Tailwind CSS 4.1.x:** Utility-first styling -- CSS-first config in v4, 5x faster builds via Lightning CSS, good Thai typography support
- **TypeScript 5.8.x:** Type safety -- stable version, native Astro support (avoid TS 6.0 beta)
- **Cloudflare Pages (free tier):** Hosting -- unlimited bandwidth, Bangkok edge node, auto-deploy from GitHub, zero cost
- **Pagefind:** Client-side search -- build-time indexing, Thai text support, zero hosting cost (add after 10+ articles)
- **Biome 2.4:** Linting and formatting -- single binary, 20-100x faster than ESLint + Prettier

**Critical version notes:** Stay on Astro 5.x (Astro 6 is beta with breaking changes). Stay on TypeScript 5.8.x (TS 6.0 is a bridge release). Use `@tailwindcss/vite` plugin, not the deprecated `@astrojs/tailwind`.

### Expected Features

**Must have (table stakes) -- launch blockers:**
- Landing page with clear Thai value proposition (mobile-first, conversational tone)
- Blog/article system with categories and tags (MDX-based, Zod-validated)
- Mobile-responsive design (90%+ of Thai traffic is mobile)
- Contact information with LINE as primary channel (floating button, QR code)
- Project showcase / portfolio with business outcomes (not tech specs)
- SEO fundamentals (Thai meta tags, OG locale, E-E-A-T compliance, structured data)
- Article reading experience (TOC, reading time, visual breaks, proper Thai line-height)
- About / credibility section (personal brand, vet-to-AI story)
- Fast page load (Core Web Vitals, sub-3-second on Thai mobile)

**Should have (differentiators) -- add after validation:**
- Interactive AI cost calculator (no Thai competitor has this)
- Video content with companion articles (YouTube lazy embed + written depth)
- Article search via Pagefind (add when article count exceeds ~20)
- AI glossary in plain Thai (link terms from articles)
- Content series / learning paths (guided article sequences)
- LINE broadcast opt-in (80-90% read rate vs email's 10-15%)

**Defer (v2+):**
- Live demo embeds of projects (high complexity, needs demo-safe deployments)
- Comparison tools (need traffic data to know which comparisons to build)
- Multi-language / bilingual content (doubles content effort, dilutes Thai SEO)
- User accounts, comment system, booking system, e-commerce (all anti-features per research)

### Architecture Approach

The architecture is purely static with no server, database, or backend. Content lives as MDX/YAML files validated by Zod schemas at build time. Pages are pre-built HTML served from Cloudflare's CDN with sub-50ms TTFB. Interactive tools (calculators, search) run as isolated Preact islands that hydrate only when scrolled into view (`client:visible`), keeping article pages at zero JavaScript. The project uses separate Content Collections per content type (articles, projects, tools, videos) with cross-references via slug strings. Lead generation is zero-backend: direct LINE deep links and email addresses, no forms.

**Major components:**
1. **Pages and Layouts** -- File-based routing in `src/pages/`, shared structure in `BaseLayout.astro` and `ArticleLayout.astro`
2. **Content Collections** -- Typed MDX/YAML in `src/content/` with Zod schemas in `src/content.config.ts` (articles, projects, tools, videos)
3. **Static Components** -- Zero-JS Astro components for cards, CTAs, navigation, organized by domain (`components/articles/`, `components/projects/`)
4. **Interactive Islands** -- Preact TSX in `src/islands/` for cost calculators, search dialog, comparison tools
5. **Build-Time Services** -- Pagefind search indexing, Sharp image optimization, sitemap/RSS generation, OG image creation

### Critical Pitfalls

1. **Writing for technologists instead of SME owners** -- Lead with business outcomes ("saved 40% on costs"), not mechanisms ("deployed a transformer-based chatbot"). Create article templates with mandatory Problem/Solution/Cost/Next Steps sections. Test drafts with a non-technical reader.

2. **Thai content that reads like translated English** -- Write natively in Thai, research actual Thai search queries (Thai+English "Tinglish" mix), use conversational tone. Thai word segmentation affects SEO indexing, so keyword research must happen before writing.

3. **AI content becoming stale within months** -- Add `lastReviewed` frontmatter field from day one, build 90-day review cycles, categorize content by decay speed (evergreen vs time-sensitive). Link to tool pricing pages instead of stating prices inline.

4. **Portfolio showcases that don't convert** -- Structure as Problem -> Solution -> Results -> CTA. Include specific metrics (baht saved, hours reduced). End every showcase with a contextual LINE contact CTA.

5. **Ignoring LINE as primary contact channel** -- Make LINE the most prominent contact method everywhere. Use LINE Official Account (not personal). Place LINE button on every page, include QR code for mobile. Thai business runs on LINE.

6. **YouTube embeds destroying page performance** -- Never use raw iframes. Use facade pattern (static thumbnail + click-to-load). Each raw YouTube embed adds ~1MB and 1-2 seconds of load time. Build the lazy embed component in the foundation phase.

7. **Interactive tools that are over-engineered or under-useful** -- Maximum 3-5 inputs. Results in concrete baht amounts, not abstract scores. Build ONE tool first, validate it generates contacts, then build more. This is a later phase, not MVP.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Design System

**Rationale:** Everything depends on the base layout, styling, and deployment pipeline. The architecture research shows `BaseLayout.astro` is the root dependency. Thai typography setup, mobile-first design, and the Cloudflare deployment pipeline must work before any content can be published. This phase also establishes LINE as the primary contact mechanism -- a pitfall that is cheapest to fix at the foundation level and most expensive to retrofit.

**Delivers:** Deployable site skeleton with header, footer, navigation, Thai typography, mobile-responsive layout, LINE floating button, Cloudflare Pages CI/CD, analytics, SEO helpers, and base meta tag setup.

**Addresses:** [T1] Landing page structure, [T3] Mobile-responsive design, [T4] Contact information (LINE), [T8] About/credibility section, [T9] Fast performance baseline.

**Avoids:** Pitfall 5 (LINE not primary contact), Pitfall 6 (YouTube embeds -- build lazy component now), desktop-first design trap, no-analytics-from-day-one trap.

### Phase 2: Content System and Articles

**Rationale:** The content system is the core value delivery mechanism. Architecture research confirms Content Collections with Zod schemas are the backbone. This phase must establish content schemas with `lastReviewed` fields (preventing Pitfall 3), article templates with business-outcome framing (preventing Pitfall 1), and category/tag structure designed for 100+ articles (preventing flat content structure debt). The article reading experience (TOC, reading time, visual breaks, Thai line-height) is required before any content goes live.

**Delivers:** Full article pipeline -- content schema, article layout with TOC and reading time, category/tag pages, RSS feed, first 3-5 seed articles, and content voice guide for Thai writing.

**Addresses:** [T2] Blog/article system, [T6] SEO fundamentals, [T7] Article reading experience, content freshness tracking.

**Avoids:** Pitfall 1 (jargon-heavy content -- templates enforce structure), Pitfall 2 (translated English -- voice guide established), Pitfall 3 (staleness -- `lastReviewed` in schema from day one).

### Phase 3: Project Showcase and Case Studies

**Rationale:** Architecture dependency map shows this depends on Phase 1 (layouts) and Phase 2 (content patterns established). Portfolio is a table-stakes feature for a consulting site and the primary trust-building mechanism. Must be structured around business outcomes per Pitfall 4 prevention.

**Delivers:** Project collection schema, portfolio grid page, individual case study pages with Problem/Solution/Results/CTA structure, featured projects on homepage.

**Addresses:** [T5] Project showcase, homepage assembly with featured content.

**Avoids:** Pitfall 4 (portfolio not converting -- mandatory business outcome sections and contextual CTAs).

### Phase 4: Homepage Assembly and Polish

**Rationale:** The homepage pulls from all content collections (featured articles, featured projects, value proposition). It should be assembled after the content it features exists. This phase also handles the contact page, CTA components embedded across all pages, sitemap generation, OG image generation, and a Core Web Vitals audit.

**Delivers:** Complete homepage (hero + featured articles + featured projects + CTA), contact page, OG image generation, sitemap, performance audit.

**Addresses:** [T1] Landing page (full assembly), comprehensive SEO, cross-page CTAs, performance optimization.

**Avoids:** Building a homepage that showcases empty collections, missing OG images for social sharing on LINE/Facebook.

### Phase 5: Search and Content Discovery

**Rationale:** Pagefind requires content to exist before it can index. Research shows this should be added when article count exceeds ~10-20. This phase adds site-wide search, content series/learning paths, AI glossary, and improved content navigation.

**Delivers:** Pagefind search integration, search dialog island, content series with next/previous navigation, glossary page with term linking, pagination on listing pages.

**Addresses:** [T10] Article search, [D5] AI glossary, [D6] Content series / learning paths.

**Avoids:** Building search before there is content to search, client-side content scanning performance trap.

### Phase 6: Video Integration

**Rationale:** Depends on the lazy YouTube embed component (built in Phase 1) and the article system (Phase 2). Video metadata is a separate YAML collection cross-referenced with articles via slugs.

**Delivers:** Video collection schema, video listing page, article-video cross-linking, lazy YouTube embeds in articles.

**Addresses:** [D2] Video + companion articles.

**Avoids:** Pitfall 6 (YouTube performance -- lazy component already exists from Phase 1).

### Phase 7: Interactive Tools

**Rationale:** Research is unanimous that interactive tools should come after the content hub is validated. Tools are high-effort features with risk of low completion rates (Pitfall 7). Build ONE tool first (Cost Calculator), validate it generates contacts, then consider more. This phase introduces Preact islands and nanostores.

**Delivers:** Cost Calculator island, tool collection schema, tool pages, potential ROI estimator.

**Addresses:** [D1] Interactive cost calculators.

**Avoids:** Pitfall 7 (over-engineered tools -- start with one, max 3-5 inputs, results in concrete baht).

### Phase Ordering Rationale

- **Foundation first:** Every other phase depends on layouts, styling, deployment, and the LINE contact mechanism. Starting here prevents the most expensive-to-retrofit pitfalls (desktop-first design, missing LINE, no analytics).
- **Content before showcase:** Article writing patterns and schemas establish conventions that project case studies follow. The content voice guide prevents the two most critical pitfalls (jargon and translated Thai).
- **Homepage after content exists:** The homepage aggregates featured content. Building it before content exists creates a chicken-and-egg problem and placeholder-heavy design.
- **Search after content volume:** Pagefind is pointless with 5 articles. Wait until there is enough content for search to add value.
- **Tools last:** Research is clear -- interactive tools are enhancement, not foundation. The content hub must prove its value before investing in calculators. This also defers the highest-complexity work until patterns are established.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Content System):** Thai SEO keyword research and content voice guide need specific attention. Thai word segmentation and "Tinglish" keyword strategy are domain-specific and under-documented.
- **Phase 7 (Interactive Tools):** Cost calculator inputs, pricing models, and output formats need user research with actual Thai SME owners. No established pattern for Thai-market AI cost estimation tools.

Phases with standard patterns (skip deep research):
- **Phase 1 (Foundation):** Astro + Tailwind + Cloudflare Pages setup is extremely well-documented with official guides.
- **Phase 3 (Showcase):** Portfolio/case study patterns are well-established in consulting website design.
- **Phase 5 (Search):** Pagefind integration with Astro has clear documentation and community examples.
- **Phase 6 (Video):** Lazy YouTube embed pattern is well-documented. YAML collection for metadata is straightforward.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommendations backed by official documentation and multiple community sources. Astro + Cloudflare alignment is confirmed by Cloudflare's acquisition of Astro. Version compatibility verified. |
| Features | MEDIUM-HIGH | Table stakes features well-validated against Thai competitors. Differentiators based on competitive gap analysis. Anti-features well-reasoned but would benefit from direct SME owner interviews. |
| Architecture | HIGH | Purely static architecture is the simplest correct choice. Content Collections, islands pattern, and file-based routing are all official Astro patterns with extensive documentation. |
| Pitfalls | HIGH | Pitfalls sourced from multiple verified references covering Thai SEO, LINE business patterns, consulting website conversion, and performance. Thai market specifics (mobile dominance, LINE preference, PDPA) are well-documented. |

**Overall confidence:** HIGH

### Gaps to Address

- **Thai content voice guide:** No template exists yet. Must be created during Phase 2 planning with specific examples of good vs bad Thai AI content tone. Consider reviewing top-performing Thai business blogs for voice patterns.
- **Thai SEO keyword research:** Specific keyword clusters for AI+SME in Thai have not been researched. Google Trends Thailand and Search Console data will be needed during Phase 2 execution.
- **Cost calculator pricing models:** What inputs and outputs make sense for a Thai SME AI cost estimator is unknown. Validate with 3-5 real SME owners before building in Phase 7.
- **LINE Official Account setup:** Specific LINE OA features, auto-reply configuration, and rich menu setup not researched in detail. Low risk -- LINE OA documentation is comprehensive.
- **PDPA compliance scope:** Research confirms cookieless analytics avoids PDPA consent requirements, but if any data collection is added later, a proper PDPA assessment is needed.

## Sources

### Primary (HIGH confidence)
- [Astro Official Documentation](https://docs.astro.build/) -- Content Collections, Islands Architecture, Project Structure, i18n, View Transitions, Deploy to Cloudflare
- [Astro joins Cloudflare](https://blog.cloudflare.com/astro-joins-cloudflare/) -- Strategic alignment confirmation
- [Astro 6 Beta Announcement](https://astro.build/blog/astro-6-beta/) -- Version roadmap, why to stay on v5
- [Tailwind CSS Official Astro Guide](https://tailwindcss.com/docs/installation/framework-guides/astro) -- v4 integration via @tailwindcss/vite
- [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/) -- Free tier specs
- [Biome Official Site](https://biomejs.dev/) -- v2.4 features
- [Pagefind Official Site](https://pagefind.app/) -- Static search capabilities
- [TypeScript 5.8 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/) -- Version stability
- [Digital 2025: Thailand](https://datareportal.com/reports/digital-2025-thailand) -- 98% mobile browsing stats
- [LINE Thailand Business Integration](https://www.lycorp.co.jp/en/story/20260106/lineth_forbusiness.html) -- LINE dominance in Thai business

### Secondary (MEDIUM confidence)
- [Astro vs Next.js comparisons](https://senorit.de/en/blog/astro-vs-nextjs-2025) -- Performance benchmarks
- [Thai SEO State 2025](https://blog.applabx.com/the-state-of-seo-in-thailand-in-2025/) -- Thai word segmentation, SEO challenges
- [LINE as Thailand's Top MarTech Tool](https://blog.ourgreenfish.com/the-business-mind/line-thailands-top-martech-tool-how-to-use-it/) -- 80-90% read rates
- [AI era: 40% of Thai SMEs embrace AI](https://www.nationthailand.com/business/tech/40050024) -- Market validation
- [Thai Light/Dark Mode Research](https://so03.tci-thaijo.org/index.php/JMMS/article/view/261810) -- Thai user preference data
- [Consulting Website Conversion](https://www.consultingsuccess.com/consulting-website) -- Portfolio and lead generation patterns
- [Content Freshness and Rankings](https://ahrefs.com/blog/fresh-content/) -- Google freshness signals

### Competitor Analysis (Direct observation)
- [AI Thailand (ai.in.th)](https://www.ai.in.th/en/) -- Developer-focused, API playground
- [Investree Knowledge Hub](https://www.investree.co.th/) -- Bilingual, finance-oriented
- [AIGEN Corp](https://aigencorp.com/en/) -- Enterprise-focused, bilingual

---
*Research completed: 2026-02-17*
*Ready for roadmap: yes*
