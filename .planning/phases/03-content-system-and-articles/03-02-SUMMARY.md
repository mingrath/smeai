---
phase: 03-content-system-and-articles
plan: 02
subsystem: ui, seo
tags: [astro, seo, og-tags, json-ld, structured-data, toc, article-layout, thai-typography]

# Dependency graph
requires:
  - phase: 03-content-system-and-articles/01
    provides: content collection schema, remark reading time plugin, seed articles, categories.ts
  - phase: 01-foundation
    provides: BaseLayout, Header, Footer, MobileNav, global.css prose styles
provides:
  - Enhanced BaseLayout with canonical URLs, full OG meta, RSS discovery, sitemap link
  - ArticleJsonLd component (Article + BreadcrumbList JSON-LD)
  - ArticleLayout wrapper with TOC, reading time, dates, prose styling
  - TableOfContents component with h2/h3 nesting via buildToc()
  - ArticleMeta component with Thai date formatting and category badge
  - Dynamic [slug].astro route generating individual article pages
affects: [03-content-system-and-articles/03, category-listing, article-index]

# Tech tracking
tech-stack:
  added: []
  patterns: [JSON-LD structured data via set:html, buildToc utility for heading nesting, Thai date formatting via Intl.DateTimeFormat]

key-files:
  created:
    - src/components/seo/ArticleJsonLd.astro
    - src/components/article/TableOfContents.astro
    - src/components/article/ArticleMeta.astro
    - src/layouts/ArticleLayout.astro
    - src/pages/articles/[slug].astro
  modified:
    - src/layouts/BaseLayout.astro

key-decisions:
  - "seoTitle used for page <title> when present, Thai title used otherwise"
  - "JSON-LD uses set:html={JSON.stringify(schema)} to avoid HTML entity escaping"
  - "TOC only renders h2 and h3 headings (deeper ignored for simplicity)"
  - "Thai dates rendered via toLocaleDateString('th-TH') producing Buddhist Era years"

patterns-established:
  - "ArticleJsonLd: Reusable JSON-LD component pattern with @graph array for multiple schema types"
  - "BaseLayout SEO props: Optional ogType/publishedTime/modifiedTime/tags passed down from page layouts"
  - "buildToc: Map-based parent tracking for heading hierarchy"

# Metrics
duration: 4min
completed: 2026-02-18
---

# Phase 3, Plan 02: Article Pages, SEO Enhancement & Layout Summary

**Full article reading experience with SEO-enhanced BaseLayout, JSON-LD structured data, Thai TOC, reading time, and dynamic [slug] route**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-18T04:54:13Z
- **Completed:** 2026-02-18T04:57:55Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Enhanced BaseLayout with canonical URLs, full Open Graph meta tags, article-specific OG tags, RSS auto-discovery, and sitemap link across all pages
- Created ArticleJsonLd component emitting Article + BreadcrumbList JSON-LD via @graph array
- Built complete article reading experience: TableOfContents with nested h2/h3, ArticleMeta with Thai dates and reading time, ArticleLayout wrapper with prose styling
- Created dynamic [slug].astro route generating pages for both seed articles with correct SEO metadata

## Task Commits

Each task was committed atomically:

1. **Task 1: Enhance BaseLayout with SEO Props and Create SEO Components** - `6bcdb0e` (feat)
2. **Task 2: Create ArticleLayout, Article Sub-Components, and Article Page Route** - `b710a03` (feat)

## Files Created/Modified

- `src/layouts/BaseLayout.astro` - Extended Props interface with OG/article fields, added canonical URL, full OG tags, RSS discovery, sitemap link
- `src/components/seo/ArticleJsonLd.astro` - Article + BreadcrumbList JSON-LD structured data component
- `src/components/article/TableOfContents.astro` - TOC with buildToc() for h2/h3 nesting, Thai "สารบัญ" label
- `src/components/article/ArticleMeta.astro` - Reading time, category badge, Thai dates, tags display
- `src/layouts/ArticleLayout.astro` - Article page wrapper using BaseLayout, composing all article sub-components
- `src/pages/articles/[slug].astro` - Dynamic route with getStaticPaths, render(), reading time from remark plugin

## Decisions Made

- seoTitle from frontmatter used for page `<title>` when present (English Tinglish for SEO), otherwise Thai title used
- JSON-LD rendered via `set:html={JSON.stringify(schema)}` to avoid HTML entity escaping in script tags
- TOC filters to h2 and h3 only (deeper headings ignored for clean sidebar-friendly rendering)
- Thai dates rendered via `toLocaleDateString('th-TH')` which produces Buddhist Era year format (e.g., 2569)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Article pages fully functional with SEO metadata, JSON-LD, TOC, reading time, and Thai dates
- Ready for Plan 03: article listing/index page, category filtering, and pagination
- Category badge links to `/articles/category/{slug}/` (route to be created in Plan 03)
- Back link points to `/articles/` (index page to be created in Plan 03)

## Self-Check: PASSED

All 6 files verified present. Both commits (6bcdb0e, b710a03) verified in git log.

---
*Phase: 03-content-system-and-articles*
*Completed: 2026-02-18*
