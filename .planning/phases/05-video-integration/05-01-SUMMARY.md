---
phase: 05-video-integration
plan: 01
subsystem: content, ui
tags: [youtube, astro-lazy-youtube-embed, video, json-ld, zod, content-collection]

# Dependency graph
requires:
  - phase: 03-content-system
    provides: "Articles content collection, content.config.ts, BaseLayout, ArticleLayout patterns"
  - phase: 04-project-showcase
    provides: "ProjectCard/ProjectJsonLd/ProjectLayout patterns to follow for video equivalents"
provides:
  - "Videos content collection with Zod schema and cross-reference to articles"
  - "YouTubeFacade component wrapping astro-lazy-youtube-embed"
  - "VideoCard component for listing grids"
  - "CompanionArticleLink component for article cross-linking"
  - "VideoJsonLd component with VideoObject + BreadcrumbList structured data"
  - "VideoLayout for video detail pages"
  - "2 seed video entries with companion article back-references"
affects: [05-video-integration, seo, navigation]

# Tech tracking
tech-stack:
  added: [astro-lazy-youtube-embed]
  patterns: [youtube-facade-pattern, video-article-cross-reference, video-json-ld]

key-files:
  created:
    - src/content/videos/chatgpt-intro.md
    - src/content/videos/line-oa-chatbot-setup.md
    - src/components/video/YouTubeFacade.astro
    - src/components/video/VideoCard.astro
    - src/components/video/CompanionArticleLink.astro
    - src/components/seo/VideoJsonLd.astro
    - src/layouts/VideoLayout.astro
  modified:
    - src/content.config.ts
    - src/content/articles/ai-basics/chatgpt-for-sme.md
    - src/content/articles/tools/line-oa-chatbot.md
    - src/layouts/BaseLayout.astro
    - package.json

key-decisions:
  - "BaseLayout ogType extended to accept video.other for proper Open Graph video type"
  - "Videos collection uses flat loader (no subdirectories) so video.id is the slug directly"
  - "thumbnailRes=sd (640px) for YouTube facade to avoid broken maxresdefault on lower-res uploads"

patterns-established:
  - "Video-article cross-reference: companionArticle reference() in videos, optional video reference() in articles"
  - "YouTube facade pattern: thin wrapper around astro-lazy-youtube-embed with consistent aspect-video + rounded styling"
  - "Video card pattern: YouTube thumbnail with red play button overlay, date, title, description"

# Metrics
duration: 3min
completed: 2026-02-18
---

# Phase 5 Plan 01: Video Collection & Components Summary

**Videos content collection with Zod cross-references, astro-lazy-youtube-embed facade, and 5 reusable video components/layouts**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-18T06:02:26Z
- **Completed:** 2026-02-18T06:06:11Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Videos content collection with Zod schema including companionArticle reference and bidirectional article back-references
- Complete video component library: YouTubeFacade, VideoCard, CompanionArticleLink, VideoJsonLd, VideoLayout
- 2 seed video entries linked to existing articles with validated cross-references
- VideoObject + BreadcrumbList JSON-LD structured data for SEO

## Task Commits

Each task was committed atomically:

1. **Task 1: Install package, define schema, seed entries** - `694e722` (feat)
2. **Task 2: Create video components and VideoLayout** - `479772e` (feat)

## Files Created/Modified
- `src/content.config.ts` - Added videos collection with reference(), article video back-reference
- `src/content/videos/chatgpt-intro.md` - First seed video entry (ChatGPT tutorial)
- `src/content/videos/line-oa-chatbot-setup.md` - Second seed video entry (LINE OA chatbot)
- `src/content/articles/ai-basics/chatgpt-for-sme.md` - Added video back-reference
- `src/content/articles/tools/line-oa-chatbot.md` - Added video back-reference
- `src/components/video/YouTubeFacade.astro` - Thin wrapper around astro-lazy-youtube-embed
- `src/components/video/VideoCard.astro` - Video card with YouTube thumbnail and play overlay
- `src/components/video/CompanionArticleLink.astro` - Styled link to companion article
- `src/components/seo/VideoJsonLd.astro` - VideoObject + BreadcrumbList JSON-LD
- `src/layouts/VideoLayout.astro` - Full video detail page layout
- `src/layouts/BaseLayout.astro` - Extended ogType to accept video.other
- `package.json` - Added astro-lazy-youtube-embed dependency

## Decisions Made
- Extended BaseLayout ogType union to include `video.other` for proper Open Graph video type support
- Videos use flat content directory (no subdirectories) so video.id maps directly to slug
- Used `thumbnailRes="sd"` (640px) for YouTube facade to avoid broken maxresdefault on lower-res uploads
- Privacy-enhanced mode is default from astro-lazy-youtube-embed (youtube-nocookie.com)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Extended BaseLayout ogType for video.other**
- **Found during:** Task 1 (planning ahead for VideoLayout)
- **Issue:** BaseLayout ogType prop only accepts `'website' | 'article'` but VideoLayout needs `'video.other'`
- **Fix:** Extended the union type to `'website' | 'article' | 'video.other'`
- **Files modified:** src/layouts/BaseLayout.astro
- **Verification:** Build passes, TypeScript resolves
- **Committed in:** 694e722 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential for VideoLayout to compile. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All video components and layouts ready for Plan 02 to wire up pages and navigation
- VideoCard ready for listing grid on /videos/ page
- VideoLayout ready for /videos/[slug] dynamic pages
- CompanionArticleLink ready for bidirectional article-video navigation

## Self-Check: PASSED

All 9 created/modified files verified present on disk. Both task commits (694e722, 479772e) verified in git log. Build passes cleanly.

---
*Phase: 05-video-integration*
*Completed: 2026-02-18*
