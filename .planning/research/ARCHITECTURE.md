# Architecture Research

**Domain:** Content-driven AI knowledge hub + consulting lead generator
**Researched:** 2026-02-17
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CDN / Edge Layer                             │
│                   (Cloudflare Pages / Vercel)                        │
│                  Serves pre-built static HTML/CSS/JS                 │
├──────────────────────────────────────────────────────────────────────┤
│                         Astro Static Site                            │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Pages    │  │  Layouts   │  │  Components  │  │   Islands   │  │
│  │  (.astro)  │  │  (.astro)  │  │   (.astro)   │  │ (.tsx React)│  │
│  └─────┬──────┘  └─────┬──────┘  └──────┬───────┘  └──────┬──────┘  │
│        │               │                │                 │         │
├────────┴───────────────┴────────────────┴─────────────────┴─────────┤
│                       Content Layer                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Articles │  │ Projects │  │  Tools   │  │  Videos  │            │
│  │  (MDX)   │  │  (MDX)   │  │  (YAML)  │  │  (YAML)  │            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
├──────────────────────────────────────────────────────────────────────┤
│                      Build-Time Services                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Pagefind    │  │  Image       │  │  Sitemap /   │              │
│  │  (Search     │  │  Optimization│  │  RSS / SEO   │              │
│  │   Index)     │  │  (astro:     │  │  Generation  │              │
│  │              │  │   assets)    │  │              │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└──────────────────────────────────────────────────────────────────────┘
```

This is a **purely static architecture**. There is no server, no database, and no backend. All content lives in the repository as Markdown/MDX/YAML files. The site is pre-built at deploy time and served from a global CDN. Interactive elements (calculators, search) run as isolated JavaScript "islands" on otherwise static HTML pages.

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Pages** | Routing, page-level data loading, SEO meta | `.astro` files in `src/pages/` -- one file per route or `[...slug].astro` for collections |
| **Layouts** | Shared page structure (header, footer, nav, meta tags) | `BaseLayout.astro`, `ArticleLayout.astro`, `ProjectLayout.astro` |
| **Static Components** | Reusable UI blocks (cards, badges, breadcrumbs, CTAs) | `.astro` files -- zero JavaScript, pure HTML/CSS |
| **Islands (React)** | Interactive tools: cost calculators, ROI estimators, search bar | `.tsx` files hydrated via `client:visible` or `client:idle` directives |
| **Content Collections** | Typed, validated content: articles, projects, videos, tools | MDX/YAML in `src/content/`, schemas in `src/content.config.ts` |
| **Build-Time Services** | Search indexing, image optimization, sitemap/RSS generation | Astro integrations run during `astro build` |

## Recommended Project Structure

```
smeai/
├── public/                          # Static assets (no processing)
│   ├── fonts/                       # Thai web fonts (Sarabun/Noto Sans Thai)
│   ├── og/                          # Pre-made Open Graph images
│   ├── favicon.svg
│   ├── robots.txt
│   └── manifest.webmanifest
├── src/
│   ├── assets/                      # Images processed by Astro
│   │   ├── images/                  # Article/project images
│   │   └── icons/                   # SVG icons
│   ├── components/                  # Reusable UI components
│   │   ├── common/                  # Header, Footer, Nav, SEO, CTA
│   │   ├── articles/                # ArticleCard, ArticleList, TagList
│   │   ├── projects/                # ProjectCard, ProjectGrid, CaseStudy
│   │   ├── tools/                   # ToolCard, ToolEmbed wrapper
│   │   ├── video/                   # VideoCard, LazyYouTube
│   │   └── contact/                 # ContactLinks, LineButton
│   ├── content/                     # Content collections (data files)
│   │   ├── articles/                # MDX blog posts / tutorials
│   │   ├── projects/                # MDX case studies / portfolio items
│   │   ├── tools/                   # YAML tool definitions
│   │   └── videos/                  # YAML video metadata
│   ├── islands/                     # Interactive React components
│   │   ├── CostCalculator.tsx       # AI cost estimator
│   │   ├── ROIEstimator.tsx         # ROI calculator
│   │   ├── ComparisonTool.tsx       # Tool/service comparison
│   │   └── SearchDialog.tsx         # Pagefind search UI
│   ├── layouts/                     # Page layout templates
│   │   ├── BaseLayout.astro         # HTML shell, fonts, meta
│   │   ├── ArticleLayout.astro      # Article reading layout
│   │   └── ProjectLayout.astro      # Case study layout
│   ├── pages/                       # File-based routing
│   │   ├── index.astro              # Landing / home page
│   │   ├── articles/
│   │   │   ├── index.astro          # Article listing
│   │   │   ├── [...slug].astro      # Individual articles
│   │   │   └── tag/[tag].astro      # Tag-based filtering
│   │   ├── projects/
│   │   │   ├── index.astro          # Project showcase grid
│   │   │   └── [...slug].astro      # Individual case studies
│   │   ├── tools/
│   │   │   ├── index.astro          # Tools directory
│   │   │   └── [...slug].astro      # Individual tool pages
│   │   ├── videos/
│   │   │   └── index.astro          # Video content listing
│   │   └── contact.astro            # Contact info page
│   ├── styles/                      # Global styles
│   │   └── global.css               # Tailwind base + Thai typography
│   └── lib/                         # Utility functions
│       ├── content.ts               # Content query helpers
│       ├── seo.ts                   # SEO/meta tag helpers
│       └── utils.ts                 # Date formatting, slug helpers
├── src/content.config.ts            # Content collection schemas
├── astro.config.mjs                 # Astro configuration
├── tailwind.config.mjs              # Tailwind + Thai typography
├── tsconfig.json                    # TypeScript config
└── package.json
```

### Structure Rationale

- **`src/components/` by domain:** Group components by what they describe (articles, projects, tools) rather than by type (buttons, cards). This keeps related UI close together and makes it obvious where to add new components for a content type.
- **`src/islands/` separate from `src/components/`:** Islands ship JavaScript to the client. Keeping them in a dedicated folder makes the JavaScript boundary explicit -- you can glance at this folder to know exactly what JavaScript your site ships.
- **`src/content/` with multiple collections:** Each content type (articles, projects, tools, videos) is its own collection with its own schema. This gives type-safe querying and independent validation per content type.
- **`src/pages/` mirrors URL structure:** The folder layout directly maps to URLs (`/articles/`, `/projects/`, `/tools/`), making routing predictable.
- **`src/lib/` for shared logic:** Content query helpers and utilities stay framework-agnostic and testable.

## Architectural Patterns

### Pattern 1: Content Collections with Zod Schemas

**What:** Define strongly-typed schemas for each content type. Astro validates all content at build time and provides full TypeScript inference when querying.
**When to use:** Every content type in the project.
**Trade-offs:** Small upfront effort defining schemas, but prevents runtime errors and makes refactoring safe.

**Example:**
```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    category: z.enum(['chatbot', 'agent', 'dashboard', 'automation', 'tutorial', 'guide']),
    readingTime: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    description: z.string(),
    industry: z.string(),
    heroImage: z.string(),
    technologies: z.array(z.string()),
    results: z.array(z.string()),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    completedDate: z.coerce.date(),
    format: z.enum(['case-study', 'portfolio-card', 'live-demo']),
  }),
});

const tools = defineCollection({
  loader: file('./src/content/tools/tools.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    islandComponent: z.string(),  // Maps to React component in src/islands/
    category: z.enum(['calculator', 'estimator', 'comparison']),
    featured: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  loader: file('./src/content/videos/videos.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    youtubeId: z.string(),
    publishedDate: z.coerce.date(),
    relatedArticle: z.string().optional(),  // slug of related article
    tags: z.array(z.string()),
    duration: z.string(),  // "12:34" format
  }),
});

export const collections = { articles, projects, tools, videos };
```

### Pattern 2: Islands Architecture for Interactive Tools

**What:** Interactive tools (calculators, estimators, search) are React components hydrated as isolated islands on otherwise static pages. The rest of the page is pure HTML with zero JavaScript.
**When to use:** Any component that requires user input, state management, or dynamic calculation.
**Trade-offs:** React adds bundle weight for those specific islands, but the rest of the site ships zero JS. Use `client:visible` so tools only load when scrolled into view.

**Example:**
```astro
---
// src/pages/tools/cost-calculator.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import CostCalculator from '../../islands/CostCalculator.tsx';
---
<BaseLayout title="AI Cost Calculator" description="Estimate your AI implementation costs">
  <section class="prose prose-lg mx-auto">
    <h1>AI Cost Calculator for SMEs</h1>
    <p>Estimate how much your AI project will cost...</p>
  </section>

  <!-- Only this component ships JavaScript. It loads when scrolled into view. -->
  <CostCalculator client:visible />

  <section class="prose prose-lg mx-auto">
    <h2>Need help estimating?</h2>
    <p>Contact Ohm for a detailed consultation...</p>
  </section>
</BaseLayout>
```

### Pattern 3: Lazy YouTube Embeds

**What:** YouTube videos render as static thumbnail images with a play button overlay. The actual YouTube iframe only loads when the user clicks play. This dramatically improves page load performance.
**When to use:** Every YouTube embed on the site.
**Trade-offs:** Slight delay when user clicks play (iframe loads then). Worth it because embedding multiple YouTube iframes directly can add 1-2 seconds to page load and destroy Core Web Vitals.

**Example:**
```astro
---
// src/components/video/LazyYouTube.astro
interface Props {
  videoId: string;
  title: string;
}
const { videoId, title } = Astro.props;
const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
---
<div class="aspect-video relative cursor-pointer group" data-youtube-id={videoId}>
  <img src={thumbnailUrl} alt={title} loading="lazy" class="w-full h-full object-cover rounded-lg" />
  <button
    class="absolute inset-0 flex items-center justify-center"
    aria-label={`Play: ${title}`}
  >
    <svg class="w-16 h-16 text-red-600 group-hover:scale-110 transition-transform" ...>
      <!-- YouTube play button SVG -->
    </svg>
  </button>
</div>
<script>
  document.querySelectorAll('[data-youtube-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-youtube-id');
      el.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1"
        class="w-full h-full rounded-lg" frameborder="0" allowfullscreen allow="autoplay"></iframe>`;
    });
  });
</script>
```

### Pattern 4: Build-Time Search with Pagefind

**What:** Pagefind indexes all content at build time and creates a static search index served alongside the site. Search runs entirely client-side with no server/API needed.
**When to use:** Site-wide content search across articles, projects, and tool descriptions.
**Trade-offs:** Index size grows with content, but Pagefind loads index chunks on-demand (only the chunks containing your search terms). Typical index is ~100KB for hundreds of pages.

## Data Flow

### Content Publishing Flow (Author Time)

```
Author writes MDX/YAML
        │
        v
src/content/{collection}/
        │
        v
git commit + push
        │
        v
CI/CD triggers `astro build`
        │
        ├──> Content Collections validated against Zod schemas
        │        (build fails if content doesn't match schema)
        │
        ├──> Pages generated from content (static HTML)
        │
        ├──> Images optimized (WebP, responsive sizes)
        │
        ├──> Pagefind indexes all rendered HTML
        │
        └──> Sitemap + RSS generated
                │
                v
        Deploy to CDN (Cloudflare Pages)
                │
                v
        Site live at edge locations worldwide
```

### User Request Flow (Runtime)

```
User visits /articles/how-to-use-claude-code
        │
        v
CDN serves pre-built HTML + CSS (< 50ms TTFB)
        │
        v
Browser renders static content immediately
        │
        ├──> No JavaScript needed for reading
        │
        ├──> If page has an island (e.g., embedded calculator):
        │        │
        │        v
        │    client:visible triggers when island scrolls into view
        │        │
        │        v
        │    React component hydrates (island-specific JS loads)
        │
        └──> If user opens search:
                 │
                 v
             Pagefind loads index chunk on-demand
                 │
                 v
             Search runs client-side, results rendered instantly
```

### Key Data Flows

1. **Content to Page:** MDX file --> Astro Content Collection (validated) --> `getCollection()` query --> rendered in `.astro` page template --> static HTML
2. **Interactive Tool:** YAML tool definition --> page loads tool metadata --> React island component hydrates on scroll --> user interacts with calculator/estimator
3. **Search:** All HTML --> Pagefind build-time indexing --> user types query --> Pagefind loads relevant index chunk --> results displayed client-side
4. **Lead Generation:** CTA components on every page --> link to `/contact` --> displays LINE ID, email, phone (no form, no backend)
5. **Video Integration:** YAML video metadata --> video listing page and article embeds --> lazy YouTube thumbnail --> click loads iframe

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100 articles | Current architecture is perfect. Build times under 30s. Pagefind index tiny. |
| 100-500 articles | Still fine. Build times 1-2 minutes. Consider tag/category pages for navigation. Pagefind handles this easily. |
| 500-2000 articles | Build times may reach 3-5 minutes. Use Astro's incremental builds if available. Split content collections by category for faster schema validation. |
| 2000+ articles | Evaluate whether to move to SSR/hybrid mode for very dynamic listings. Or use Astro's content loader API to fetch from a headless CMS instead of local files. |

### Scaling Priorities

1. **First bottleneck: Build time.** As content grows, build time increases linearly. Mitigation: Cloudflare Pages has generous build limits; Astro builds are fast. This won't be a problem until 500+ pages.
2. **Second bottleneck: Content authoring friction.** Writing MDX files in a code editor works for a solo author (Ohm) but doesn't scale to guest contributors. Mitigation: Can add a headless CMS (Tina, Decap) later without changing the site architecture -- Astro's content loaders abstract the data source.

## Anti-Patterns

### Anti-Pattern 1: Shipping a Full React App

**What people do:** Use `client:load` on every component, or wrap the entire page in a React provider, effectively turning Astro into a React SPA.
**Why it's wrong:** Defeats the purpose of Astro. The site ships hundreds of KB of JavaScript, loses the performance advantage, and search engines see a loading spinner instead of content.
**Do this instead:** Default to `.astro` components (zero JS). Only use React for genuinely interactive elements (calculators, search). Use `client:visible` or `client:idle` instead of `client:load` where possible.

### Anti-Pattern 2: Monolithic Content Collection

**What people do:** Put all content (articles, projects, videos, tools) into a single collection with a discriminated `type` field.
**Why it's wrong:** Schemas become complex unions, queries require constant filtering, and type inference gets messy. Adding a new content type means modifying a shared schema.
**Do this instead:** One collection per content type. Each has its own schema, its own folder, and its own query patterns. Cross-reference between collections using slug strings (not Astro references, which add coupling).

### Anti-Pattern 3: Client-Side Data Fetching for Content

**What people do:** Fetch article listings or project data via `fetch()` in the browser, treating the static site like a SPA that loads data on mount.
**Why it's wrong:** Content already exists at build time. Fetching it at runtime adds latency, requires a data endpoint, and means search engines can't index the content.
**Do this instead:** Query content with `getCollection()` in the `.astro` frontmatter. Data is embedded in the HTML at build time. Pages are instantly readable with zero round-trips.

### Anti-Pattern 4: Over-Engineering Contact/Lead Generation

**What people do:** Build custom contact forms with serverless functions, validation, spam protection, and email forwarding infrastructure.
**Why it's wrong:** For a solo consultant, this adds complexity, potential failure points, and maintenance burden. Thai business culture strongly favors LINE for communication.
**Do this instead:** Display LINE ID, email, and phone number directly. Use `line://ti/p/[LINE_ID]` deep links. The goal is zero friction to contact, not form completion rates.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Cloudflare Pages** | Git-triggered deploys, CDN hosting | Free tier: unlimited bandwidth. Build command: `astro build`. Output: `dist/` |
| **YouTube** | Lazy-load embeds via thumbnail + click-to-iframe | No API key needed. Use `lite-youtube-embed` or custom component. |
| **Google Analytics / Plausible** | Script tag in `BaseLayout.astro` | Plausible preferred: privacy-friendly, lightweight, no cookie banner needed. |
| **Pagefind** | Astro integration runs at build time | `@astrojs/pagefind` or `astro-pagefind` package. Zero runtime cost until user searches. |
| **LINE** | Deep link: `line://ti/p/{LINE_ID}` | Static link, no integration needed. Works on mobile. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Content Collections <--> Pages** | `getCollection()` / `getEntry()` at build time | Type-safe. Collections are the single source of truth. |
| **Astro Components <--> React Islands** | Props passed via Astro template | Islands are self-contained. They receive initial data as props and manage their own state. |
| **Articles <--> Videos** | `relatedArticle` slug field in video YAML | Loose coupling via slug string. Video pages can link to articles and vice versa. |
| **Articles <--> Projects** | Tags and category overlap | No direct reference. Use shared tags for "related content" queries at build time. |
| **Tools Collection <--> Island Components** | `islandComponent` field maps to React component name | YAML defines the tool metadata; the actual interactive UI lives in `src/islands/`. |

## Build Order (Dependency Map)

The following shows which components depend on which, informing the phase build order:

```
Phase 1: Foundation
├── BaseLayout.astro (everything depends on this)
├── Tailwind + Thai typography setup
├── Header / Footer / Nav components
├── SEO helpers (meta tags, OpenGraph)
└── Cloudflare Pages deployment pipeline

Phase 2: Content System
├── Content collection schemas (content.config.ts)
├── Article collection + ArticleLayout
├── Article listing page + individual article pages
├── Tag/category filtering
└── RSS feed generation
        │
        ├── Depends on: Phase 1 (layouts, styling, SEO)
        │
Phase 3: Project Showcase
├── Project collection + ProjectLayout
├── Project grid / listing page
├── Individual case study pages
├── Portfolio card component
└── Featured projects on homepage
        │
        ├── Depends on: Phase 1 (layouts), Phase 2 (content patterns established)
        │
Phase 4: Video + Interactive Tools
├── Video collection (YAML)
├── Lazy YouTube embed component
├── Video listing page
├── React islands: CostCalculator, ROIEstimator
├── Tool collection + tool pages
└── Article-video cross-linking
        │
        ├── Depends on: Phase 1 (layouts), Phase 2 (content patterns)
        │   Islands are independent but follow established page patterns
        │
Phase 5: Search, Polish, Lead Gen
├── Pagefind integration
├── Search dialog island
├── Contact page with LINE/email/phone links
├── CTA components embedded across all pages
├── Sitemap generation
├── Performance audit + Core Web Vitals
└── Homepage assembly (hero + featured content from all collections)
        │
        ├── Depends on: All prior phases (search indexes all content,
        │   homepage pulls from all collections, CTAs go on every page)
```

## Sources

- [Astro Official Docs: Content Collections](https://docs.astro.build/en/guides/content-collections/) -- HIGH confidence (official docs)
- [Astro Official Docs: Islands Architecture](https://docs.astro.build/en/concepts/islands/) -- HIGH confidence (official docs)
- [Astro Official Docs: Project Structure](https://docs.astro.build/en/basics/project-structure/) -- HIGH confidence (official docs)
- [Astro Official Docs: i18n Routing](https://docs.astro.build/en/guides/internationalization/) -- HIGH confidence (official docs)
- [shadcn/ui Astro Installation](https://ui.shadcn.com/docs/installation/astro) -- HIGH confidence (official docs)
- [Astro-Pagefind Integration](https://github.com/shishkin/astro-pagefind) -- MEDIUM confidence (community project, well-maintained)
- [astro-lazy-youtube-embed](https://github.com/insin/astro-lazy-youtube-embed) -- MEDIUM confidence (community project)
- [Astro vs Next.js comparison](https://pagepro.co/blog/astro-nextjs/) -- MEDIUM confidence (multiple sources agree)
- [Cloudflare Pages deployment costs](https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison) -- MEDIUM confidence (multiple sources agree)
- [Island Architecture with Interactive Calculator example](https://medium.com/@ignatovich.dm/island-architecture-in-astro-a-example-with-an-interactive-pricing-calculator-785a218d1902) -- MEDIUM confidence (single source, pattern verified in official docs)

---
*Architecture research for: SMEAI -- AI Knowledge Hub for Thai SMEs*
*Researched: 2026-02-17*
