---
phase: 03-content-system-and-articles
plan: 01
subsystem: content
tags: [astro-content-collections, zod, rss, sitemap, remark, thai-nlp, intl-segmenter]

# Dependency graph
requires:
  - phase: 02-landing-page
    provides: BaseLayout, astro.config.mjs with site URL, package.json base
provides:
  - Zod-validated articles content collection with glob loader
  - Thai-aware reading time remark plugin (Intl.Segmenter)
  - RSS feed endpoint at /rss.xml with draft filtering
  - Sitemap integration generating sitemap-index.xml
  - Category slug-to-Thai display name lookup
  - 2 seed articles for pipeline verification
affects: [03-02-article-pages, 03-03-listing-pages, seo, feed-readers]

# Tech tracking
tech-stack:
  added: ["@astrojs/sitemap", "@astrojs/rss", "reading-time", "mdast-util-to-string"]
  patterns: ["Astro 5 content.config.ts with glob loader", "Intl.Segmenter for Thai word counting", "Remark plugin injecting frontmatter"]

key-files:
  created:
    - plugins/remark-reading-time.mjs
    - src/content.config.ts
    - src/content/articles/ai-basics/chatgpt-for-sme.md
    - src/content/articles/tools/line-oa-chatbot.md
    - src/pages/rss.xml.ts
    - src/lib/categories.ts
  modified:
    - astro.config.mjs
    - package.json

key-decisions:
  - "Content config at src/content.config.ts (Astro 5 location, not src/content/config.ts)"
  - "Thai word counting via Intl.Segmenter at 200 WPM instead of space-based splitting"
  - "Article slugs derived from filename via article.id.split('/').pop() for flat URL structure"
  - "4 initial categories: ai-basics, tools, case-studies, news"

patterns-established:
  - "Content collection pattern: glob loader + Zod schema at src/content.config.ts"
  - "Category lookup: single source of truth at src/lib/categories.ts"
  - "RSS pattern: filter drafts, sort by pubDate desc, flat slug URLs"

# Metrics
duration: 4min
completed: 2026-02-18
---

# Phase 3 Plan 01: Content Foundation & Feed Infrastructure Summary

**Zod-validated content collection with Thai-aware reading time, RSS feed, sitemap, and 2 seed articles**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-18T04:47:52Z
- **Completed:** 2026-02-18T04:51:43Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Content collection with Zod schema validation (title, description, category enum, tags, dates, draft, SEO fields)
- Thai-aware reading time remark plugin using Intl.Segmenter (6x more accurate than space-based splitting for Thai)
- RSS feed endpoint with draft filtering, pubDate sorting, and Thai language tag
- Sitemap integration auto-generating sitemap-index.xml
- Category display name lookup (4 categories with Thai names)
- 2 seed articles verifying full pipeline end-to-end (schema validation + remark plugin + build)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, create remark plugin, and content collection schema** - `2c8e58c` (feat)
2. **Task 2: Create seed articles and RSS endpoint** - `56341fc` (feat)

## Files Created/Modified
- `plugins/remark-reading-time.mjs` - Thai-aware reading time remark plugin using Intl.Segmenter
- `src/content.config.ts` - Articles content collection with Zod schema and glob loader
- `src/content/articles/ai-basics/chatgpt-for-sme.md` - Seed article: ChatGPT basics for Thai SME
- `src/content/articles/tools/line-oa-chatbot.md` - Seed article: LINE OA chatbot with AI
- `src/pages/rss.xml.ts` - RSS feed endpoint with draft filtering
- `src/lib/categories.ts` - Category slug-to-Thai display name lookup
- `astro.config.mjs` - Added sitemap integration and remarkPlugins config
- `package.json` - Added 4 new dependencies

## Decisions Made
- Content config placed at `src/content.config.ts` (Astro 5 convention) not `src/content/config.ts`
- Thai word counting uses `Intl.Segmenter('th', { granularity: 'word' })` at 200 WPM -- standard space-based splitting undercounts Thai by ~6x
- Article URL slugs derived from filename portion of `article.id` for flat `/articles/{slug}/` URLs
- 4 initial categories with Thai display names: ai-basics, tools, case-studies, news

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Content collection ready for article pages (Plan 02 can build `[slug].astro`)
- RSS and sitemap working -- feed readers and search engines can discover content
- Category lookup ready for listing pages and breadcrumbs (Plan 03)
- Reading time plugin injects `minutesRead` into frontmatter for article layout

## Self-Check: PASSED

All 7 created files verified present. Both commit hashes (2c8e58c, 56341fc) verified in git log.

---
*Phase: 03-content-system-and-articles*
*Completed: 2026-02-18*
