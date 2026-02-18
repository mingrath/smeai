# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-17)

**Core value:** SME owners can discover practical, cost-effective AI solutions they can actually use -- and reach Ohm when they need help implementing them.
**Current focus:** Phase 4 complete -- Project Showcase. Ready for Phase 5.

## Current Position

Phase: 4 of 6 (Project Showcase) -- COMPLETE
Plan: 2 of 2 in current phase (04-02 complete)
Status: Phase complete, ready for Phase 5
Last activity: 2026-02-18 -- Completed 04-02 (Showcase Pages & Homepage Featured Projects)

Progress: [███████░░░] 75%

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: 3.4min
- Total execution time: 0.53 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 11min | 5.5min |
| 02-landing-page | 2 | 5min | 2.5min |
| 03-content-system | 3 | 10min | 3.3min |
| 04-project-showcase | 2 | 6min | 3min |

**Recent Trend:**
- Last 5 plans: 4min, 4min, 2min, 3min, 3min
- Trend: stable

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: 6 phases derived from 30 requirements (comprehensive depth). Video and Showcase can execute in parallel after Content System.
- [Research]: Astro 5.x + Preact + Tailwind v4 + Cloudflare Pages stack confirmed. Thai-first, mobile-first, content-first approach.
- [Phase 1]: Tailwind v4 is CSS-first (no config file). Use @tailwindcss/vite, not @astrojs/tailwind. Fontsource variable fonts. CF Analytics auto-injects for Pages projects.
- [01-01]: Biome v2.4 schema differs significantly from v2.0 -- uses css.parser.tailwindDirectives, assist.actions.source for organizeImports
- [01-01]: Manual project scaffold needed when .planning/ exists (create-astro rejects non-empty dirs)
- [01-01]: Biome file includes scoped to src/** plus root configs to avoid linting generated .astro/ types
- [01-02]: Component scripts use astro:after-swap for view transitions compatibility
- [01-02]: Heroicons SVGs inlined directly (no icon library dependency)
- [01-02]: GitHub repo created as public at mingrath/smeai, pushed to main
- [02-01]: Single CONTACT const object in src/lib/contact.ts as single source of truth for all contact info
- [02-01]: Phone added to full variant only (compact stays LINE + email for clean header)
- [02-02]: Hard-coded service cards with inline SVG icons (Astro can't dynamically map string keys to SVGs at build time)
- [02-02]: Photo placeholder with Thai initials ("โอม") -- ready to swap for real photo with commented-out Image import
- [03-01]: Content config at src/content.config.ts (Astro 5 location, not src/content/config.ts)
- [03-01]: Thai word counting via Intl.Segmenter at 200 WPM instead of space-based splitting
- [03-01]: Article slugs derived from filename via article.id.split('/').pop() for flat URL structure
- [03-01]: 4 initial categories: ai-basics, tools, case-studies, news
- [03-02]: seoTitle used for page title when present (Tinglish SEO), Thai title otherwise
- [03-02]: JSON-LD via set:html={JSON.stringify(schema)} to avoid entity escaping
- [03-02]: TOC renders h2/h3 only, deeper headings ignored for clean navigation
- [03-02]: Thai dates via toLocaleDateString('th-TH') producing Buddhist Era years (e.g., 2569)
- [03-03]: Rest param [...page] for clean /articles/ first page URL (not /articles/1/)
- [03-03]: Category pages generated for all slugs via flatMap, empty categories show Thai empty state
- [03-03]: Reading time omitted from article cards for performance (no render() per card)
- [04-01]: Projects schema includes metric + metricLabel for business impact display
- [04-01]: Accent colors for industry badges to differentiate from article category badges (primary)
- [04-01]: CreativeWork JSON-LD type for projects (not Article) with 3-level breadcrumb
- [04-01]: Thumbnail placeholder uses Heroicons squares-2x2 SVG on primary-100 background
- [04-02]: No TableOfContents for case studies -- shorter format than articles
- [04-02]: Flat listing (no pagination) for showcase -- portfolio is small
- [04-02]: FeaturedProjects uses bg-surface-100/900 for alternating section rhythm
- [04-02]: Conditional render: FeaturedProjects hides entirely when no featured projects exist

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-18
Stopped at: Completed 04-02-PLAN.md -- Phase 04 complete, ready for Phase 05
Resume file: None
