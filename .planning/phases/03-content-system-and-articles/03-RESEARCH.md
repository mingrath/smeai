# Phase 3: Content System & Articles - Research

**Researched:** 2026-02-18
**Domain:** Astro 5 content collections, Zod schema validation, Markdown rendering, RSS feeds, XML sitemaps, SEO structured data, Thai reading time estimation, pagination
**Confidence:** HIGH

## Summary

Phase 3 transforms the existing static site (Astro 5.17.2, Tailwind v4, Thai typography) into a content-driven platform. The core mechanism is Astro 5's Content Layer API with `glob()` loader for local Markdown files, validated by Zod schemas at build time. Articles are Thai-primary with Tinglish SEO keywords in frontmatter. The content collection lives in `src/content/articles/` with category-based subdirectories.

The key technical findings are: (1) Astro 5's content collections use `src/content.config.ts` (not `src/content/config.ts`) with `glob()` and `file()` loaders -- content can live anywhere, not just `src/content/`; (2) the `render()` function returns both a `<Content />` component and a `headings` array (with `depth`, `slug`, `text`), which provides everything needed for table of contents; (3) the standard `reading-time` npm package uses space-based word splitting, which undercounts Thai words by approximately 6x -- a custom remark plugin using `Intl.Segmenter('th', { granularity: 'word' })` is required for accurate Thai reading time estimation; (4) `@astrojs/sitemap` auto-generates XML sitemaps at build time with zero configuration beyond `site` (already set); (5) `@astrojs/rss` provides an `rss()` helper for generating RSS feeds from content collections.

SEO implementation requires extending `BaseLayout.astro` with canonical URLs, Open Graph article tags (`og:type`, `article:published_time`, `article:tag`), and JSON-LD structured data (Article schema + BreadcrumbList) injected via Astro's `set:html` directive. The existing `og:locale=th_TH` is already set in BaseLayout.

**Primary recommendation:** Define a single `articles` content collection with `glob()` loader and a comprehensive Zod schema. Build a custom Thai-aware remark plugin for reading time using `Intl.Segmenter`. Use `@astrojs/sitemap` integration (auto) and `@astrojs/rss` endpoint (manual). Create an `ArticleLayout.astro` that handles TOC, reading time, lastReviewed display, and JSON-LD structured data. Paginate article listings using Astro's built-in `paginate()` in `[...page].astro` files.

---

## Standard Stack

### Core (New for Phase 3)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @astrojs/sitemap | 3.7.x | Auto-generate XML sitemap at build time | Official Astro integration. Zero-config with `site` already set. Generates `sitemap-index.xml` + numbered files. |
| @astrojs/rss | 4.0.x | Generate RSS feed endpoint | Official Astro package. `rss()` helper maps content collections to RSS items. Supports full content inclusion. |
| reading-time | 1.5.x | Base reading time calculation utilities | Provides `readingTime()` function, but Thai text requires custom `wordBound` or manual word counting via `Intl.Segmenter`. |
| mdast-util-to-string | 4.x | Extract plain text from Markdown AST | Required by the remark reading-time plugin to convert AST nodes to countable text. |

### Already Installed (from Phase 1)

| Library | Version | Purpose | Relevance to Phase 3 |
|---------|---------|---------|----------------------|
| astro | 5.17.2 | Framework | Content collections, `render()`, `getCollection()`, `getStaticPaths()`, `paginate()` |
| tailwindcss | 4.1.18 | Styling | Article page layout, prose styling, dark mode |
| @tailwindcss/typography | 0.5.19 | Prose classes | `prose` + `prose-lg` for rendered Markdown article content |
| @fontsource-variable/noto-sans-thai | 5.2.8 | Thai font | Article body text rendering |

### Not Needed

| Instead of | Why Not |
|------------|---------|
| astro-seo (npm package) | Hand-crafted meta tags in BaseLayout are simpler and give full control. The package adds abstraction without meaningful reduction in code. |
| markdown-it + sanitize-html (for RSS content) | Only needed if including full HTML content in RSS. Start with description-only RSS; add full content later if needed. |
| rehype-slug + rehype-autolink-headings | Astro already generates heading IDs/slugs automatically for Markdown content. No extra plugins needed. |

**Installation:**
```bash
npm install @astrojs/sitemap @astrojs/rss reading-time mdast-util-to-string
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── content/
│   └── articles/                    # Markdown articles organized by category
│       ├── ai-basics/
│       │   ├── what-is-ai.md
│       │   └── chatgpt-for-sme.md
│       ├── tools/
│       │   ├── canva-ai.md
│       │   └── notion-ai.md
│       └── case-studies/
│           └── clinic-ai-adoption.md
├── content.config.ts                # Collection definitions + Zod schemas
├── components/
│   ├── common/
│   │   └── ... (existing)
│   ├── article/                     # NEW: article-specific components
│   │   ├── TableOfContents.astro    # TOC from headings array
│   │   ├── TOCHeading.astro         # Recursive heading renderer
│   │   ├── ArticleMeta.astro        # Reading time + dates display
│   │   └── Pagination.astro         # Prev/next page links
│   └── seo/                         # NEW: SEO components
│       ├── ArticleJsonLd.astro      # Article + BreadcrumbList JSON-LD
│       └── BaseHead.astro           # Enhanced <head> with OG + canonical
├── layouts/
│   ├── BaseLayout.astro             # MODIFY: accept SEO props, add canonical + OG
│   └── ArticleLayout.astro          # NEW: wraps BaseLayout with article chrome
├── lib/
│   ├── contact.ts                   # existing
│   └── reading-time.ts             # NEW: Thai-aware reading time utility
├── pages/
│   ├── index.astro                  # existing
│   ├── contact.astro                # existing
│   ├── articles/
│   │   ├── [...page].astro          # Article listing with pagination
│   │   ├── [slug].astro             # Individual article pages
│   │   └── category/
│   │       └── [...page].astro      # Category-filtered listing with pagination
│   └── rss.xml.ts                   # RSS feed endpoint
└── styles/
    └── global.css                   # MODIFY: add article-specific prose overrides
plugins/
└── remark-reading-time.mjs          # Custom remark plugin for Thai reading time
```

### Pattern 1: Content Collection with Zod Schema

**What:** Define an `articles` collection in `src/content.config.ts` using `glob()` loader pointed at `src/content/articles/`. Zod schema validates every frontmatter field at build time.

**When to use:** Always -- this is the foundation of the content system.

**Example:**
```typescript
// src/content.config.ts
// Source: https://docs.astro.build/en/guides/content-collections/
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    lastReviewed: z.coerce.date(),
    draft: z.boolean().default(false),
    // Tinglish SEO: English keywords for search visibility
    seoTitle: z.string().optional(),        // English/Tinglish title for <title> tag
    seoKeywords: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
```

### Pattern 2: Article Page with Render

**What:** Use `getStaticPaths()` + `render()` to generate static article pages with heading extraction.

**When to use:** For every individual article page.

**Example:**
```astro
---
// src/pages/articles/[slug].astro
// Source: https://docs.astro.build/en/reference/modules/astro-content/
import { getCollection, render } from 'astro:content';
import ArticleLayout from '../../layouts/ArticleLayout.astro';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }));
}

const { article } = Astro.props;
const { Content, headings, remarkPluginFrontmatter } = await render(article);
---

<ArticleLayout
  article={article}
  headings={headings}
  readingTime={remarkPluginFrontmatter.minutesRead}
>
  <Content />
</ArticleLayout>
```

### Pattern 3: Paginated Article Listing

**What:** Use `[...page].astro` with `paginate()` for article listing pages.

**When to use:** Article index and category pages.

**Example:**
```astro
---
// src/pages/articles/[...page].astro
// Source: https://docs.astro.build/en/reference/routing-reference/
import { getCollection } from 'astro:content';
import type { GetStaticPathsOptions } from 'astro';

export async function getStaticPaths({ paginate }: GetStaticPathsOptions) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const sorted = articles.sort((a, b) =>
    b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return paginate(sorted, { pageSize: 12 });
}

const { page } = Astro.props;
---

<!-- page.data = articles for this page -->
<!-- page.currentPage, page.lastPage, page.url.prev, page.url.next -->
```

### Pattern 4: Recursive Table of Contents

**What:** Transform flat `headings` array from `render()` into nested TOC using `buildToc()` + recursive `Astro.self`.

**When to use:** Article pages with h2+ headings.

**Example:**
```typescript
// buildToc utility function
// Source: https://kld.dev/building-table-of-contents/
interface TocHeading {
  depth: number;
  slug: string;
  text: string;
  subheadings: TocHeading[];
}

function buildToc(headings: { depth: number; slug: string; text: string }[]): TocHeading[] {
  const toc: TocHeading[] = [];
  const parentHeadings = new Map<number, TocHeading>();

  headings.forEach((h) => {
    const heading: TocHeading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1)?.subheadings.push(heading);
    }
  });

  return toc;
}
```

```astro
---
// TOCHeading.astro - recursive component
const { heading } = Astro.props;
---
<li>
  <a href={`#${heading.slug}`}>{heading.text}</a>
  {heading.subheadings.length > 0 && (
    <ul>
      {heading.subheadings.map((sub) => (
        <Astro.self heading={sub} />
      ))}
    </ul>
  )}
</li>
```

### Pattern 5: JSON-LD Structured Data

**What:** Create reusable Astro components that inject JSON-LD `<script>` tags using `set:html`.

**When to use:** Article pages (Article schema + BreadcrumbList) and all pages (WebSite schema).

**Example:**
```astro
---
// src/components/seo/ArticleJsonLd.astro
// Source: https://frodeflaten.com/posts/adding-structured-data-to-blog-posts-using-astro/
interface Props {
  title: string;
  description: string;
  pubDate: Date;
  lastReviewed: Date;
  url: string;
  category: string;
  tags: string[];
}

const { title, description, pubDate, lastReviewed, url, category, tags } = Astro.props;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": title,
      "description": description,
      "datePublished": pubDate.toISOString().substring(0, 10),
      "dateModified": lastReviewed.toISOString().substring(0, 10),
      "author": {
        "@type": "Person",
        "name": "Mingrath Mekavichai",
      },
      "keywords": tags,
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": new URL("/", Astro.site).href },
        { "@type": "ListItem", "position": 2, "name": "Articles", "item": new URL("/articles", Astro.site).href },
        { "@type": "ListItem", "position": 3, "name": category, "item": new URL(`/articles/category/${category}`, Astro.site).href },
        { "@type": "ListItem", "position": 4, "name": title },
      ],
    },
  ],
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Anti-Patterns to Avoid

- **Storing articles in `src/pages/`:** Content collections provide schema validation, querying, and the render pipeline. File-based routing for articles loses all of this.
- **Using `type: "content"` (legacy):** Astro 5 uses `loader: glob()`. The old `type` field is legacy and removed in Astro 6.
- **Putting `content.config.ts` inside `src/content/`:** Astro 5 moved this to `src/content.config.ts` (project root of `src/`). The old location still works but is deprecated.
- **Using `getCollection()` without filtering drafts:** Always filter `({ data }) => !data.draft` in production-facing queries.
- **Hard-coding reading time with space-based splitting:** Thai text does not use spaces between words. The standard `reading-time` package will report "1 min read" for a 2000-word Thai article.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| XML sitemap generation | Custom sitemap builder | `@astrojs/sitemap` integration | Handles route discovery, pagination, proper XML formatting, `sitemap-index.xml` generation. One-line config. |
| RSS feed generation | Custom XML templating | `@astrojs/rss` with `rss()` helper | Handles XML escaping, date formatting, RSS 2.0 compliance, channel metadata. |
| Markdown rendering | Custom parser | Astro's built-in `render()` | Returns `<Content />` component + `headings` array. Handles remark/rehype plugin pipeline. |
| Heading slug generation | Custom slugify | Astro's built-in heading IDs | Automatically generates URL-friendly IDs for all Markdown headings. |
| Frontmatter validation | Custom validators | Zod via `defineCollection` schema | Build-time validation with TypeScript type generation. Catches errors before deployment. |
| Pagination math | Custom page calculation | Astro's `paginate()` function | Returns typed `page` prop with `data`, `currentPage`, `lastPage`, `url.prev`, `url.next`, `url.first`, `url.last`. |

**Key insight:** Astro 5's content layer provides an integrated pipeline from Markdown source to rendered HTML with validated types. Fighting this pipeline (e.g., custom Markdown parsing) creates maintenance burden with no benefit.

---

## Common Pitfalls

### Pitfall 1: Thai Reading Time Severely Undercounted

**What goes wrong:** The `reading-time` npm package splits text by whitespace to count words. Thai text uses no spaces between words, so a 2000-word article gets counted as ~15 "words" (one per space/newline), producing "1 min read" instead of "10 min read".

**Why it happens:** `reading-time` was designed for alphabetical languages. Its CJK optimization counts characters, but Thai is not classified as CJK.

**How to avoid:** Use `Intl.Segmenter('th', { granularity: 'word' })` in the remark plugin to accurately count Thai words. Filter by `isWordLike` to exclude punctuation. Use 200 WPM as the reading speed estimate (standard for online content).

**Warning signs:** All articles showing "1 min read" regardless of length.

**Implementation:**
```javascript
// Custom Thai-aware word counting
function countThaiWords(text) {
  const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
  const words = [...segmenter.segment(text)].filter(s => s.isWordLike);
  return words.length;
}

const WORDS_PER_MINUTE = 200;
const minutes = Math.ceil(countThaiWords(plainText) / WORDS_PER_MINUTE);
```

### Pitfall 2: Content Config File in Wrong Location

**What goes wrong:** Collections are not detected, `getCollection()` returns empty arrays, TypeScript types are not generated.

**Why it happens:** Astro 5 expects `src/content.config.ts` (at the `src/` level). The old Astro 4 location was `src/content/config.ts` (inside the content directory).

**How to avoid:** Always create the file at `src/content.config.ts`. If migrating from older examples, update the path.

**Warning signs:** "Collection X is not defined" errors at build time.

### Pitfall 3: Missing `z.coerce.date()` for Date Fields

**What goes wrong:** Zod validation fails because Markdown frontmatter dates are strings (e.g., `2024-01-15`), not JavaScript `Date` objects.

**Why it happens:** YAML parses dates as strings. `z.date()` expects a `Date` object.

**How to avoid:** Always use `z.coerce.date()` instead of `z.date()` for frontmatter date fields. The `coerce` variant converts strings to Date objects automatically.

**Warning signs:** Build errors like "Expected date, received string".

### Pitfall 4: Forgetting `site` in astro.config.mjs for RSS/Sitemap

**What goes wrong:** RSS feed URLs are broken (relative paths instead of absolute), sitemap has no base URL.

**Why it happens:** Both `@astrojs/rss` and `@astrojs/sitemap` require an absolute base URL from `Astro.site`.

**How to avoid:** Already handled -- `site: "https://smeai.pages.dev"` is set in `astro.config.mjs`.

**Warning signs:** RSS feed containing relative URLs like `/articles/post-1` instead of `https://smeai.pages.dev/articles/post-1`.

### Pitfall 5: Pagination Route Naming

**What goes wrong:** First page of articles generates at `/articles/1` instead of `/articles/`, breaking the expected URL pattern.

**Why it happens:** Using `[page].astro` instead of `[...page].astro`. The rest parameter (`...`) makes the first page generate at the base path (no number suffix).

**How to avoid:** Always use `[...page].astro` for paginated routes. This generates `/articles/`, `/articles/2/`, `/articles/3/`, etc.

**Warning signs:** 404 at `/articles/` while `/articles/1/` works.

### Pitfall 6: JSON-LD Escaping Issues

**What goes wrong:** JSON-LD script content gets HTML-escaped, producing `&quot;` instead of `"` in the JSON, which search engines cannot parse.

**Why it happens:** Astro escapes text content inside elements by default.

**How to avoid:** Use the `set:html` directive: `<script type="application/ld+json" set:html={JSON.stringify(schema)} />`. This injects raw JSON without escaping.

**Warning signs:** Structured data validation tools reporting parsing errors.

### Pitfall 7: Category Slug Mismatch

**What goes wrong:** Article category in frontmatter is "AI Basics" but the URL uses `ai-basics`, creating broken category links.

**Why it happens:** No normalization between display names and URL slugs.

**How to avoid:** Use slug-friendly category identifiers in frontmatter (`ai-basics`, `tools`, `case-studies`). Map to display names via a lookup object in code.

**Warning signs:** Category filter pages showing no articles.

---

## Code Examples

### Thai-Aware Reading Time Remark Plugin

```javascript
// plugins/remark-reading-time.mjs
// Custom implementation for Thai content
import { toString } from 'mdast-util-to-string';

const WORDS_PER_MINUTE = 200;

function countWords(text) {
  // Use Intl.Segmenter for Thai word segmentation
  const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
  const words = [...segmenter.segment(text)].filter(s => s.isWordLike);
  return words.length;
}

export function remarkReadingTime() {
  return function (tree, { data }) {
    const text = toString(tree);
    const words = countWords(text);
    const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
    data.astro.frontmatter.minutesRead = minutes;
  };
}
```

### RSS Feed Endpoint

```typescript
// src/pages/rss.xml.ts
// Source: https://docs.astro.build/en/recipes/rss/
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  return rss({
    title: 'SMEAI - AI สำหรับ SME ไทย',
    description: 'บทความและคำแนะนำเกี่ยวกับการใช้ AI ในธุรกิจ SME ไทย',
    site: context.site!,
    items: articles
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((article) => ({
        title: article.data.title,
        pubDate: article.data.pubDate,
        description: article.data.description,
        link: `/articles/${article.id}/`,
      })),
    customData: '<language>th</language>',
  });
}
```

### Enhanced BaseLayout Head with SEO

```astro
---
// Enhanced BaseLayout.astro <head> section
interface Props {
  title: string;
  description?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
}

const {
  title,
  description = 'AI สำหรับ SME ไทย - เรียนรู้และปรึกษา',
  ogType = 'website',
  ogImage,
  publishedTime,
  modifiedTime,
  tags = [],
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const ogImageURL = ogImage ? new URL(ogImage, Astro.site) : undefined;
---

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />

  <!-- Open Graph -->
  <meta property="og:title" content={`${title} | SMEAI`} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={ogType} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:locale" content="th_TH" />
  <meta property="og:site_name" content="SMEAI" />
  {ogImageURL && <meta property="og:image" content={ogImageURL} />}

  <!-- Article-specific OG tags -->
  {ogType === 'article' && publishedTime && (
    <meta property="article:published_time" content={publishedTime.toISOString()} />
  )}
  {ogType === 'article' && modifiedTime && (
    <meta property="article:modified_time" content={modifiedTime.toISOString()} />
  )}
  {ogType === 'article' && tags.map(tag => (
    <meta property="article:tag" content={tag} />
  ))}

  <!-- RSS auto-discovery -->
  <link
    rel="alternate"
    type="application/rss+xml"
    title="SMEAI Articles"
    href={new URL('rss.xml', Astro.site)}
  />

  <!-- Sitemap -->
  <link rel="sitemap" href="/sitemap-index.xml" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>{title} | SMEAI</title>
</head>
```

### Astro Config with Sitemap + Reading Time Plugin

```javascript
// astro.config.mjs
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://smeai.pages.dev',
  integrations: [preact(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Article Frontmatter Example

```markdown
---
title: "ChatGPT คืออะไร? ทำไม SME ไทยต้องรู้จัก"
description: "เรียนรู้พื้นฐาน ChatGPT และวิธีใช้งานจริงสำหรับธุรกิจ SME ไทย"
category: "ai-basics"
tags: ["chatgpt", "ai", "sme", "เริ่มต้น"]
pubDate: 2026-02-01
lastReviewed: 2026-02-15
draft: false
seoTitle: "ChatGPT for Thai SME - What is ChatGPT"
seoKeywords: ["chatgpt thai", "AI for SME", "chatgpt sme"]
---

## ChatGPT คืออะไร?

ChatGPT เป็นเครื่องมือ AI ที่พัฒนาโดย OpenAI...
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `src/content/config.ts` with `type: "content"` | `src/content.config.ts` with `loader: glob()` | Astro 5.0 (Dec 2024) | Content can live anywhere, not just `src/content/`. More flexible and faster builds. |
| `getCollection()` returns `{ slug }` | `getCollection()` returns `{ id }` | Astro 5.0 | Use `entry.id` instead of `entry.slug` for routing. |
| Manual remark plugin for heading IDs | Built-in heading ID generation | Astro 3+ | No need for `rehype-slug`. Headings automatically get URL-friendly IDs. |
| `Astro.props.frontmatter` in layouts | `remarkPluginFrontmatter` from `render()` | Astro 5.0 | Remark plugin data (like reading time) accessed via render result, not layout props. |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin | Tailwind v4 (2025) | Already configured in Phase 1. No changes needed. |

**Deprecated/outdated:**
- `type: "content"` / `type: "data"` in defineCollection: Replaced by `loader` property. Removed entirely in Astro 6.
- `src/content/config.ts` location: Still works in Astro 5 but deprecated. Use `src/content.config.ts`.
- `entry.slug`: Replaced by `entry.id` in Astro 5's content layer.
- `legacy.collections` flag: Removed in Astro 6.

---

## Open Questions

1. **Category taxonomy: static list vs. freeform**
   - What we know: Frontmatter `category` is a string. Could use `z.enum()` for a fixed list or `z.string()` for flexibility.
   - What's unclear: How many categories will exist? Will the user want to add categories without code changes?
   - Recommendation: Start with `z.enum()` for a fixed set (e.g., `ai-basics`, `tools`, `case-studies`, `news`). Add a display name lookup map. If taxonomy grows, switch to `z.string()` with a data file.

2. **OG images for articles**
   - What we know: Open Graph images are important for social sharing. Astro can generate OG images at build time using `@vercel/og` or `satori`.
   - What's unclear: Whether to implement OG image generation in this phase or defer.
   - Recommendation: Defer OG image generation to a future phase. For now, use a default site OG image. Add optional `ogImage` field to frontmatter for manual overrides.

3. **Thai reading speed WPM calibration**
   - What we know: English online reading is ~200-250 WPM. Thai reading speed research is limited. `Intl.Segmenter` accurately segments Thai words. Thai words tend to be shorter than English words.
   - What's unclear: The exact WPM for Thai online reading.
   - Recommendation: Use 200 WPM as starting point (same as English). The reading time is approximate -- "5 min read" vs "7 min read" matters less than "1 min read" (broken) vs reasonable estimate. Can be calibrated later.

4. **Full article content in RSS vs. description only**
   - What we know: Including full HTML content in RSS requires `markdown-it` + `sanitize-html` to convert Markdown body to HTML.
   - What's unclear: Whether RSS subscribers expect full content.
   - Recommendation: Start with description-only RSS (simpler, no extra dependencies). The `link` field brings readers to the full article. Add full content later if requested.

---

## Sources

### Primary (HIGH confidence)
- [Astro Content Collections Docs](https://docs.astro.build/en/guides/content-collections/) - glob() loader, Zod schemas, getCollection(), render()
- [Astro Content Collections API Reference](https://docs.astro.build/en/reference/modules/astro-content/) - defineCollection(), render() return type, CollectionEntry type
- [Astro RSS Recipe](https://docs.astro.build/en/recipes/rss/) - rss() helper, content collection integration, auto-discovery
- [Astro Sitemap Integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - installation, configuration, filtering
- [Astro Routing Reference](https://docs.astro.build/en/reference/routing-reference/) - paginate() function, Page type properties
- [Astro Reading Time Recipe](https://docs.astro.build/en/recipes/reading-time/) - remark plugin pattern, remarkPluginFrontmatter access
- [MDN Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) - Thai word segmentation API
- Local Node.js testing: `Intl.Segmenter('th')` confirmed working with accurate Thai word segmentation (Node.js in Astro build)

### Secondary (MEDIUM confidence)
- [Building a TOC from Astro headings](https://kld.dev/building-table-of-contents/) - buildToc() function, recursive Astro.self pattern
- [Adding structured data to Astro blog posts](https://frodeflaten.com/posts/adding-structured-data-to-blog-posts-using-astro/) - JSON-LD component pattern, set:html directive
- [Add JSON-LD structured data in Astro](https://johndalesandro.com/blog/astro-add-json-ld-structured-data-to-your-website-for-rich-search-results/) - @graph pattern, Article + BreadcrumbList schemas
- [reading-time npm](https://github.com/ngryman/reading-time) - API, CJK support notes, wordBound option
- [Astro SEO complete guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/) - canonical URL, OG tags, article metadata patterns

### Tertiary (LOW confidence)
- Thai reading speed: No authoritative source found for Thai-specific WPM. Using 200 WPM as reasonable default based on general online reading research.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries are official Astro integrations or well-established npm packages. Versions verified against npm registry.
- Architecture: HIGH - Patterns verified against official Astro docs (content collections, pagination, render API). TOC pattern verified from multiple community sources.
- Pitfalls: HIGH - Thai reading time issue confirmed via local Node.js testing (6x word undercount with space-based splitting). Config file location confirmed from official migration docs. JSON-LD escaping documented in official Astro docs.
- Thai WPM: LOW - No authoritative source for Thai-specific reading speed. Using reasonable default.

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days -- Astro content collections API is stable in v5)
