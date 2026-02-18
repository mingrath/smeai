---
phase: 04-project-showcase
plan: 01
subsystem: content
tags: [astro-content-collections, zod, json-ld, seo, projects]

# Dependency graph
requires:
  - phase: 03-content-system
    provides: "Content config pattern with glob loader, ArticleCard/ArticleJsonLd component patterns"
provides:
  - "Projects content collection with Zod schema"
  - "3 seed project case study files with Thai content"
  - "ProjectCard component for grid display"
  - "ProjectJsonLd component for SEO structured data"
affects: [04-02-showcase-pages, homepage-projects-section]

# Tech tracking
tech-stack:
  added: []
  patterns: [projects-collection-glob-loader, project-card-with-metric-display, creative-work-json-ld]

key-files:
  created:
    - src/content/projects/sme-ai-chatbot.md
    - src/content/projects/retail-inventory-forecast.md
    - src/content/projects/clinic-line-bot.md
    - src/components/project/ProjectCard.astro
    - src/components/seo/ProjectJsonLd.astro
  modified:
    - src/content.config.ts

key-decisions:
  - "Projects schema includes metric + metricLabel for business impact display"
  - "Accent colors for industry badges to differentiate from article category badges (primary)"
  - "CreativeWork JSON-LD type for projects (not Article) with 3-level breadcrumb"
  - "Thumbnail placeholder uses Heroicons squares-2x2 SVG on primary-100 background"

patterns-established:
  - "Project slug derivation: project.id.split('/').pop()! (same as articles)"
  - "Project URLs: /showcase/{slug}/ (separate from /articles/ namespace)"
  - "Industry badge styling: accent colors (vs primary for article categories)"

# Metrics
duration: 3min
completed: 2026-02-18
---

# Phase 4 Plan 1: Projects Collection & Components Summary

**Projects content collection with Zod schema, 3 Thai case study seed files, and ProjectCard + ProjectJsonLd components for showcase display**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-18T05:32:22Z
- **Completed:** 2026-02-18T05:35:47Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Projects collection defined alongside articles in content.config.ts with full Zod schema (title, description, thumbnail, client, industry, metric, metricLabel, tags, pubDate, featured, draft, seoTitle, seoKeywords)
- 3 seed project case studies created with Thai Problem/Solution/Results structure and concrete business metrics
- ProjectCard component with thumbnail placeholder, industry badge (accent colors), title, description, and prominent metric display
- ProjectJsonLd component emitting CreativeWork + BreadcrumbList structured data following ArticleJsonLd pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Add projects collection and seed files** - `e938070` (feat)
2. **Task 2: Create ProjectCard and ProjectJsonLd components** - `6776dd7` (feat)

## Files Created/Modified
- `src/content.config.ts` - Added projects collection with Zod schema alongside articles
- `src/content/projects/sme-ai-chatbot.md` - AI chatbot for e-commerce (40% response time reduction)
- `src/content/projects/retail-inventory-forecast.md` - ML inventory forecasting (25% overstock reduction)
- `src/content/projects/clinic-line-bot.md` - LINE Bot for clinic scheduling (60% admin workload reduction)
- `src/components/project/ProjectCard.astro` - Card component with thumbnail, industry badge, metric display
- `src/components/seo/ProjectJsonLd.astro` - CreativeWork + BreadcrumbList JSON-LD structured data

## Decisions Made
- Projects schema includes `metric` + `metricLabel` as separate string fields for flexible display formatting
- Used accent colors (`bg-accent-100`, `text-accent-600`) for industry badges to visually differentiate from article category badges which use primary colors
- `CreativeWork` JSON-LD type for projects (not `Article`) with 3-level breadcrumb (home > showcase > project)
- Thumbnail placeholder uses Heroicons `squares-2x2` outline SVG centered on `bg-primary-100 dark:bg-primary-900/30` background
- No `thumbnail` field in seed files -- placeholder fallback renders instead

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Projects collection and seed content ready for Plan 02 (showcase listing page, individual project pages, homepage section)
- ProjectCard component ready for grid display on showcase listing and homepage
- ProjectJsonLd ready for individual project page SEO
- All 3 seed projects have `featured: true` for homepage section testing

## Self-Check: PASSED

All 6 files verified present. Both commit hashes (e938070, 6776dd7) confirmed. Content validation passed: projects collection exported, featured flags set, CollectionEntry type used, CreativeWork + BreadcrumbList JSON-LD present.

---
*Phase: 04-project-showcase*
*Completed: 2026-02-18*
