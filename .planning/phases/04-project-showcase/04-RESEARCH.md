# Phase 4: Project Showcase - Research

**Researched:** 2026-02-18
**Domain:** Astro 5 content collections, portfolio grid UI, case study pages, JSON-LD structured data, homepage integration
**Confidence:** HIGH

## Summary

Phase 4 adds a projects content collection to the existing SMEAI site, following the exact same patterns already established for articles in Phase 3. The codebase already has a `/showcase` link in both desktop and mobile navigation, so the routing expectation is already in place.

The implementation is straightforward: define a `projects` collection in the existing `content.config.ts` using the same `glob()` loader pattern, create a Zod schema with fields tailored for case studies (problem/solution/results structure, business metrics, featured flag), build card and layout components mirroring the article pattern, and add a `FeaturedProjects` landing section to the homepage. No new dependencies are needed.

The most important architectural decision is that **project case study content lives in markdown** (same as articles) with structured frontmatter for the metadata shown on cards and the homepage. The Problem -> Solution -> Results narrative lives in the markdown body, not in frontmatter fields. This keeps frontmatter lean and lets the writer use rich formatting in the case study body.

**Primary recommendation:** Mirror the articles collection pattern exactly -- `glob()` loader, Zod schema in `content.config.ts`, seed markdown files, `ProjectCard.astro` component, `ProjectLayout.astro` layout, listing page at `/showcase/`, detail pages at `/showcase/[slug]`, and a `FeaturedProjects.astro` homepage section.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro` | ^5.0.0 | Static site generator, content collections, `glob()` loader | Already in project |
| `astro/zod` | (bundled) | Schema validation for projects collection | Already in project, used by articles |
| `tailwindcss` | ^4.1.18 | Styling for card grid, layout, responsive | Already in project |
| `@tailwindcss/typography` | ^0.5.19 | Prose styling for case study markdown body | Already in project |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `astro:assets` `Image` component | (bundled) | Optimized project thumbnail images | When displaying project thumbnails on cards and detail pages |
| `reading-time` (via remark plugin) | ^1.5.0 | Reading time for case study pages | Already configured, works automatically on markdown |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Markdown files per project | Single JSON file with `file()` loader | JSON loses markdown body for case study narrative; markdown is better for long-form content with headings |
| `image()` schema helper for thumbnails | `z.string()` for public path references | `image()` enables build-time optimization but requires colocated images; `z.string()` is simpler for initial implementation with placeholder/public images |
| Separate `featured` boolean in frontmatter | Querying by tag or order | Explicit `featured: true` is clearest, easiest to filter |

**Installation:**
```bash
# No new packages needed -- everything is already in the project
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── content/
│   ├── articles/           # Existing
│   │   ├── ai-basics/
│   │   └── tools/
│   └── projects/           # NEW
│       ├── project-slug-1.md
│       ├── project-slug-2.md
│       └── project-slug-3.md
├── components/
│   ├── article/            # Existing
│   ├── landing/            # Existing (add FeaturedProjects.astro)
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── FeaturedProjects.astro  # NEW
│   │   └── CallToAction.astro
│   ├── project/            # NEW
│   │   └── ProjectCard.astro
│   └── seo/
│       ├── ArticleJsonLd.astro     # Existing
│       └── ProjectJsonLd.astro     # NEW
├── layouts/
│   ├── BaseLayout.astro    # Existing
│   ├── ArticleLayout.astro # Existing
│   └── ProjectLayout.astro # NEW
├── pages/
│   ├── index.astro         # Modify (add FeaturedProjects)
│   ├── showcase/           # NEW
│   │   ├── index.astro     # Project listing grid
│   │   └── [slug].astro    # Individual case study
│   └── articles/           # Existing
└── lib/
    ├── categories.ts       # Existing
    └── contact.ts          # Existing
```

### Pattern 1: Projects Content Collection Schema

**What:** Define the `projects` collection in `content.config.ts` alongside `articles`
**When to use:** This is the foundation -- do this first

```typescript
// Source: existing content.config.ts pattern + Astro docs
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["ai-basics", "tools", "case-studies", "news"]),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    lastReviewed: z.coerce.date(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoKeywords: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Thumbnail: use public path string for simplicity (no colocated images yet)
    thumbnail: z.string().optional(),
    thumbnailAlt: z.string().default(""),
    // Case study metadata
    client: z.string(),
    industry: z.string(),
    // Business metric (SHOW-03 requirement)
    metric: z.string(),
    metricLabel: z.string(),
    // Tags for filtering / display
    tags: z.array(z.string()).default([]),
    // Dates
    pubDate: z.coerce.date(),
    // Featured flag for homepage (SHOW-04 requirement)
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // SEO
    seoTitle: z.string().optional(),
    seoKeywords: z.array(z.string()).default([]),
  }),
});

export const collections = { articles, projects };
```

### Pattern 2: Entry ID and Slug Extraction (Established Pattern)

**What:** Astro 5's `glob()` loader generates `entry.id` as a slugified path (e.g., `project-slug-1`). The existing codebase uses `article.id.split('/').pop()!` to extract the slug from nested article paths.
**When to use:** For projects stored flat in `src/content/projects/`, `entry.id` is already the slug directly. But use `.split('/').pop()!` for safety/consistency.

```typescript
// Source: existing [slug].astro pattern in the codebase
export async function getStaticPaths() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.map((project) => ({
    params: { slug: project.id.split('/').pop()! },
    props: { project },
  }));
}
```

### Pattern 3: ProjectCard Component (Mirror ArticleCard)

**What:** A card component displaying project thumbnail, title, description, metric, and tags
**When to use:** On the showcase listing page and the FeaturedProjects homepage section

```astro
---
// Source: mirrors existing ArticleCard.astro pattern
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const { data } = project;
const slug = project.id.split('/').pop()!;
---

<a
  href={`/showcase/${slug}/`}
  class="group block rounded-xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors overflow-hidden"
>
  {/* Thumbnail placeholder or image */}
  <div class="aspect-video bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
    {data.thumbnail ? (
      <img src={data.thumbnail} alt={data.thumbnailAlt} class="w-full h-full object-cover" />
    ) : (
      <span class="text-surface-400 dark:text-surface-500 text-sm">Project Preview</span>
    )}
  </div>
  <div class="p-5">
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 dark:bg-accent-600/20 text-accent-600 dark:text-accent-300">
        {data.industry}
      </span>
    </div>
    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
      {data.title}
    </h3>
    <p class="text-sm text-surface-600 dark:text-surface-400 line-clamp-3 mb-4 leading-relaxed">
      {data.description}
    </p>
    {/* Business metric highlight */}
    <div class="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
      <span class="text-xl font-bold">{data.metric}</span>
      <span class="text-surface-500 dark:text-surface-400 font-normal">{data.metricLabel}</span>
    </div>
  </div>
</a>
```

### Pattern 4: Case Study Markdown Structure (Problem -> Solution -> Results)

**What:** SHOW-02 requires Problem -> Solution -> Results structure. This lives in the markdown body.
**When to use:** Every project markdown file follows this template

```markdown
---
title: "ชื่อโปรเจกต์"
description: "สรุปสั้นๆ"
thumbnail: "/images/projects/project-name.jpg"
thumbnailAlt: "รูปภาพโปรเจกต์"
client: "ชื่อลูกค้า"
industry: "อุตสาหกรรม"
metric: "40%"
metricLabel: "ลดเวลาตอบลูกค้า"
tags: ["chatbot", "line", "retail"]
pubDate: 2026-01-15
featured: true
draft: false
---

## ปัญหา

[Description of the client's problem]

## วิธีแก้ปัญหา

[Description of the AI solution implemented]

## ผลลัพธ์

[Business outcomes with concrete metrics]
```

### Pattern 5: FeaturedProjects Homepage Section

**What:** Query projects with `featured: true` and display on homepage
**When to use:** Added to `index.astro` between Services and CallToAction

```astro
---
// Source: mirrors existing landing component pattern
import { getCollection } from 'astro:content';
import ProjectCard from '../project/ProjectCard.astro';

const featured = (await getCollection('projects', ({ data }) => !data.draft && data.featured))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 3);
---

<section id="projects" class="py-16 md:py-24 bg-surface-100 dark:bg-surface-900">
  <div class="max-w-5xl mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-4">
        ผลงาน
      </h2>
      <p class="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed">
        ตัวอย่างโปรเจกต์ AI ที่ช่วยธุรกิจ SME จริง
      </p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>
    <div class="text-center mt-8">
      <a href="/showcase/" class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline">
        ดูผลงานทั้งหมด
      </a>
    </div>
  </div>
</section>
```

### Pattern 6: Project JSON-LD (Structured Data)

**What:** JSON-LD for case study pages using schema.org CreativeWork
**When to use:** On each individual project page for SEO

```astro
---
// Source: mirrors existing ArticleJsonLd.astro pattern + schema.org/CreativeWork
interface Props {
  title: string;
  description: string;
  pubDate: Date;
  url: string;
  tags: string[];
}

const { title, description, pubDate, url, tags } = Astro.props;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "headline": title,
      "description": description,
      "datePublished": pubDate.toISOString().substring(0, 10),
      "author": {
        "@type": "Person",
        "name": "Mingrath Mekavichai",
      },
      "publisher": {
        "@type": "Organization",
        "name": "SMEAI",
        "url": Astro.site?.href,
      },
      "mainEntityOfPage": url,
      "keywords": tags,
      "inLanguage": "th",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "หน้าแรก",
          "item": new URL("/", Astro.site).href,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "ผลงาน",
          "item": new URL("/showcase/", Astro.site).href,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
        },
      ],
    },
  ],
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Anti-Patterns to Avoid

- **Putting case study narrative in frontmatter:** Problem/Solution/Results belong in the markdown body, not as frontmatter fields. Frontmatter is for metadata, not long-form content.
- **Creating a separate "project types" system like categories:** Projects don't need a category taxonomy like articles do. The `industry` and `tags` fields provide enough organization for a small portfolio.
- **Using `entry.slug` instead of `entry.id`:** In Astro 5 with the content layer, use `entry.id` (not `entry.slug` which was the Astro 4 pattern). This is already established in the codebase.
- **Hardcoding featured projects on the homepage:** Always query the collection with `featured: true` filter rather than hardcoding project slugs. This keeps the homepage dynamic as projects are added/removed.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manual image resizing/compression | Astro `<Image />` from `astro:assets` | Handles format conversion, lazy loading, responsive sizes |
| Pagination (if needed later) | Custom pagination logic | Astro's built-in `paginate()` in `getStaticPaths` | Already proven in articles pattern |
| Reading time calculation | Word count divider | Existing `remarkReadingTime` plugin | Already configured in `astro.config.mjs` |
| Structured data generation | Manual JSON string construction | JSON-LD via `set:html={JSON.stringify(schema)}` | Established pattern in ArticleJsonLd.astro |

**Key insight:** This phase requires zero new libraries. Every capability needed is already in the project or bundled with Astro. The work is purely creating new content, components, and pages following established patterns.

## Common Pitfalls

### Pitfall 1: entry.id Including Directory Path
**What goes wrong:** If projects are organized in subdirectories (e.g., `src/content/projects/ai/chatbot.md`), `entry.id` becomes `ai/chatbot` not just `chatbot`. Using this directly as a URL slug creates nested routes.
**Why it happens:** Astro 5's `glob()` loader generates IDs from the full relative path.
**How to avoid:** Keep project files flat in `src/content/projects/` (no subdirectories). Use `entry.id.split('/').pop()!` consistently as the existing codebase does.
**Warning signs:** 404 errors on project detail pages, URLs with unexpected path segments.

### Pitfall 2: Missing Featured Projects on Homepage
**What goes wrong:** FeaturedProjects section renders empty because no seed projects have `featured: true`.
**Why it happens:** Content is added later but the component expects data.
**How to avoid:** Seed at least 2-3 project markdown files with `featured: true` during implementation. Add an empty state message/fallback in the component.
**Warning signs:** Blank section on homepage, layout shift.

### Pitfall 3: Thumbnail Images Not Found in Production
**What goes wrong:** Project cards show broken images because thumbnail paths reference local dev paths or are missing.
**Why it happens:** Using absolute paths to `src/` directory or missing image files. Public path images skip optimization.
**How to avoid:** For initial implementation, use `z.string().optional()` for thumbnails with a graceful fallback (colored placeholder like About section's avatar). When real images are available, consider migrating to `image()` schema helper with colocated images.
**Warning signs:** Broken image icons in cards, console 404 errors.

### Pitfall 4: Forgetting to Export Updated collections Object
**What goes wrong:** Build error or projects collection not found at runtime.
**Why it happens:** Adding the `projects` collection definition but not including it in the `export const collections` object.
**How to avoid:** Always check that the export includes all collections: `export const collections = { articles, projects };`
**Warning signs:** Build error: "Collection 'projects' does not exist."

### Pitfall 5: Inconsistent Thai/English in UI
**What goes wrong:** Mix of Thai and English labels in the project showcase that feels inconsistent with the rest of the site.
**Why it happens:** The site is Thai-first but the header nav uses English labels ("Home", "Articles", "Showcase", "Contact"). Body content and descriptions are in Thai.
**How to avoid:** Follow the existing convention: English for navigation labels, Thai for page titles, headings, descriptions, and body content. Project card metadata (metric labels, industry) should be in Thai.
**Warning signs:** Jarring language switches within the same component.

### Pitfall 6: ogType Not Set for Case Study Pages
**What goes wrong:** Social sharing previews show generic "website" instead of rich article-like cards.
**Why it happens:** Forgetting to pass `ogType="article"` to BaseLayout for case study detail pages.
**How to avoid:** Mirror the ArticleLayout pattern: pass `ogType="article"`, `publishedTime`, and `tags` to BaseLayout.
**Warning signs:** Social media previews lacking rich formatting.

## Code Examples

Verified patterns from the existing codebase:

### Querying and Filtering a Collection (Existing Pattern)

```typescript
// Source: src/pages/articles/[...page].astro
import { getCollection } from 'astro:content';

const articles = await getCollection('articles', ({ data }) => !data.draft);
const sorted = articles.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
```

### Rendering Markdown Content (Existing Pattern)

```typescript
// Source: src/pages/articles/[slug].astro
import { getCollection, render } from 'astro:content';

const { article } = Astro.props;
const { Content, headings, remarkPluginFrontmatter } = await render(article);
// In template: <Content />
```

### Card Grid Layout (Existing Pattern)

```html
<!-- Source: src/pages/articles/[...page].astro -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {page.data.map((article) => (
    <ArticleCard article={article} />
  ))}
</div>
```

### Homepage Section Pattern (Existing Pattern)

```astro
<!-- Source: src/pages/index.astro -->
<BaseLayout title="Home" description="...">
  <Hero />
  <About />
  <Services />
  <!-- FeaturedProjects goes here -->
  <CallToAction />
</BaseLayout>
```

### JSON-LD via set:html (Existing Pattern)

```astro
<!-- Source: src/components/seo/ArticleJsonLd.astro -->
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Slug Extraction from entry.id (Existing Pattern)

```typescript
// Source: used consistently in ArticleCard.astro, [slug].astro, rss.xml.ts
const slug = entry.id.split('/').pop()!;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `type: 'content'` / `type: 'data'` | `glob()` / `file()` loaders in `content.config.ts` | Astro 5.0 | 5x faster Markdown builds, schema in same file |
| `entry.slug` | `entry.id` (slugified automatically by glob loader) | Astro 5.0 | No separate slug property; id IS the slug |
| Collections in `src/content/config.ts` | Collections in `src/content.config.ts` (root of `src/`) | Astro 5.0 | File moved one level up |
| `getEntryBySlug()` | `getEntry('collection', id)` | Astro 5.0 | Unified API, no slug-specific function |

**Deprecated/outdated:**
- `type: 'content'` and `type: 'data'` properties in collection definitions -- replaced by loader specification
- `entry.slug` -- use `entry.id` instead in Astro 5
- `getEntryBySlug()` -- use `getEntry()` with the collection name and id

## Open Questions

1. **Thumbnail Image Strategy**
   - What we know: The `image()` schema helper works with `glob()` loader and enables build-time optimization. Public path strings (`/images/projects/...`) are simpler but skip optimization.
   - What's unclear: Whether the initial seed projects will have actual images or just placeholders.
   - Recommendation: Start with `z.string().optional()` for thumbnails with a colored placeholder fallback (like the About section). Migrate to `image()` helper when real project screenshots are available. This avoids blocking on image assets.

2. **Number of Seed Projects**
   - What we know: Need at least 1 project to test the full pipeline. Need at least 2-3 with `featured: true` for a good homepage section.
   - What's unclear: How many real projects Ohm wants to showcase initially.
   - Recommendation: Create 3 seed project markdown files with realistic but draft content. Mark 2-3 as `featured: true`.

3. **Showcase Page - Flat List vs. Pagination**
   - What we know: Articles use pagination with 12 per page. Portfolio sites typically have fewer projects than blog posts.
   - What's unclear: How many projects will exist long-term.
   - Recommendation: Start with a simple flat listing at `/showcase/index.astro` (no pagination). The portfolio is unlikely to exceed 20 projects in the near term. Pagination can be added later using the established `[...page].astro` pattern if needed.

## Sources

### Primary (HIGH confidence)
- [Astro Content Collections Guide](https://docs.astro.build/en/guides/content-collections/) - Collection definition, glob loader, schema, querying
- [Astro Content Collections API Reference](https://docs.astro.build/en/reference/modules/astro-content/) - getCollection, getEntry, render, CollectionEntry type, entry.id behavior
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) - image() schema helper, Image component, content collection images
- [Schema.org CreativeWork](https://schema.org/CreativeWork) - JSON-LD type for portfolio/case study pages
- Existing codebase: `src/content.config.ts`, `src/pages/articles/[slug].astro`, `src/components/article/ArticleCard.astro`, `src/layouts/ArticleLayout.astro`, `src/components/seo/ArticleJsonLd.astro` - Established patterns to mirror

### Secondary (MEDIUM confidence)
- [Astro Content Loader API Reference](https://docs.astro.build/en/reference/content-loader-reference/) - Loader internals, image() helper compatibility with glob
- [Astro Portfolio Themes](https://astro.build/themes/?categories%5B%5D=portfolio) - Community patterns for portfolio structure

### Tertiary (LOW confidence)
- None -- all findings verified against official docs or existing codebase patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies; everything reuses existing project setup
- Architecture: HIGH - Direct mirror of established articles pattern; verified against Astro 5 docs
- Pitfalls: HIGH - Based on real patterns observed in the codebase (entry.id behavior, slug extraction, Thai content conventions)

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (stable -- no fast-moving dependencies)
