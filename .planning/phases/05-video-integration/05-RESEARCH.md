# Phase 5: Video Integration - Research

**Researched:** 2026-02-18
**Domain:** YouTube embed performance, Astro content collections, video SEO structured data
**Confidence:** HIGH

## Summary

Video integration for this Astro 5 site requires three interconnected pieces: a performance-optimized YouTube embed component (facade pattern), a new `videos` content collection with bidirectional references to the existing `articles` collection, and VideoObject JSON-LD structured data for SEO.

The facade pattern is well-established in the Astro ecosystem with two mature options. The recommended approach uses `astro-lazy-youtube-embed` (v0.5.5, actively maintained, zero external JS dependencies, srcdoc-based) which aligns with the project's minimal-JS philosophy. Astro 5's `reference()` function provides native cross-collection linking with type safety, making bidirectional video-article references straightforward. Google's VideoObject schema has clear required fields (name, thumbnailUrl, uploadDate) that map directly to video frontmatter.

**Primary recommendation:** Use `astro-lazy-youtube-embed` for the facade component, `reference()` for cross-collection linking, and hand-built VideoObject JSON-LD following the existing ArticleJsonLd/ProjectJsonLd pattern.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro-lazy-youtube-embed` | 0.5.5 | YouTube facade component | Zero external JS, srcdoc-based, privacy-enhanced mode by default, actively maintained (Jan 2026), Astro-native component |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Astro `reference()` | built-in (Astro 5.x) | Cross-collection linking between videos and articles | Defining video-article bidirectional references in content.config.ts |
| Zod (via `astro/zod`) | built-in | Schema validation for videos collection | Video frontmatter validation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `astro-lazy-youtube-embed` | `astro-embed` (YouTube component) | `astro-embed` uses `lite-youtube-embed` custom element (external JS dependency). Larger community (375 stars) but adds JS payload. `astro-lazy-youtube-embed` uses native srcdoc with zero JS |
| `astro-lazy-youtube-embed` | Custom hand-rolled srcdoc facade | Would work but reinvents tested thumbnail fetching, play button styling, privacy mode, and responsive sizing that the package handles |
| `reference()` | Manual string slug matching | Loses type safety, validation, and getEntry/getEntries convenience |

**Installation:**
```bash
npm install astro-lazy-youtube-embed
```

No other new dependencies needed. Everything else (Zod, reference, content collections) is built into Astro 5.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/
│   ├── articles/
│   │   └── {category}/{slug}.md        # existing — add optional `video` reference
│   ├── projects/
│   │   └── {slug}.md                   # existing, unchanged
│   └── videos/
│       └── {slug}.md                   # NEW — video entries with companion article ref
├── content.config.ts                   # add videos collection + update articles schema
├── pages/
│   ├── articles/[slug].astro           # existing — add video embed if linked
│   └── videos/
│       ├── index.astro                 # NEW — video listing page
│       └── [slug].astro                # NEW — video detail page
├── components/
│   └── video/
│       ├── VideoCard.astro             # NEW — card for listing page
│       ├── YouTubeFacade.astro         # NEW — wrapper around astro-lazy-youtube-embed
│       └── CompanionArticleLink.astro  # NEW — link to companion article
├── layouts/
│   └── VideoLayout.astro               # NEW — video detail layout
└── components/seo/
    └── VideoJsonLd.astro               # NEW — VideoObject structured data
```

### Pattern 1: Videos Content Collection with Cross-References
**What:** Define a `videos` collection that references `articles` via `reference()`, and optionally update `articles` to reference back to `videos`.
**When to use:** Every video entry has a companion article.

**Schema definition in content.config.ts:**
```typescript
import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const videos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/videos" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    youtubeId: z.string(),
    duration: z.string().optional(),           // ISO 8601 e.g. "PT5M30S"
    companionArticle: reference("articles"),    // required link to article
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoKeywords: z.array(z.string()).default([]),
  }),
});

// Update articles schema to optionally reference a video
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
    video: reference("videos").optional(),     // NEW: optional back-reference
  }),
});

export const collections = { articles, projects, videos };
```

### Pattern 2: YouTube Facade Component (Wrapper)
**What:** A thin Astro wrapper around `astro-lazy-youtube-embed` that standardizes styling and provides consistent aspect ratio.
**When to use:** Every video embed across the site.

```astro
---
// src/components/video/YouTubeFacade.astro
import { YouTube } from 'astro-lazy-youtube-embed';

interface Props {
  videoId: string;
  title: string;
}

const { videoId, title } = Astro.props;
---

<div class="aspect-video rounded-xl overflow-hidden">
  <YouTube
    videoId={videoId}
    title={title}
    thumbnailRes="sd"
  />
</div>
```

**Source:** [astro-lazy-youtube-embed docs](https://github.com/insin/astro-lazy-youtube-embed)

### Pattern 3: Resolving Cross-Collection References
**What:** Using `getEntry()` to resolve video-article links at build time.
**When to use:** On video detail pages (resolve companion article) and article detail pages (resolve linked video).

```astro
---
// In video detail page: resolve companion article
import { getEntry } from 'astro:content';

const companionArticle = await getEntry(video.data.companionArticle);
// companionArticle.data.title, companionArticle.id available
---

<a href={`/articles/${companionArticle.id.split('/').pop()}/`}>
  {companionArticle.data.title}
</a>
```

```astro
---
// In article detail page: resolve linked video (if exists)
import { getEntry } from 'astro:content';

const linkedVideo = article.data.video
  ? await getEntry(article.data.video)
  : null;
---

{linkedVideo && (
  <YouTubeFacade videoId={linkedVideo.data.youtubeId} title={linkedVideo.data.title} />
)}
```

**Source:** [Astro Content Collections API Reference](https://docs.astro.build/en/reference/modules/astro-content/)

### Pattern 4: VideoObject JSON-LD Structured Data
**What:** Schema.org VideoObject JSON-LD matching the existing ArticleJsonLd/ProjectJsonLd pattern.
**When to use:** On every video detail page.

```astro
---
// src/components/seo/VideoJsonLd.astro
interface Props {
  title: string;
  description: string;
  youtubeId: string;
  pubDate: Date;
  duration?: string;
  url: string;
  tags: string[];
}

const { title, description, youtubeId, pubDate, duration, url, tags } = Astro.props;

const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VideoObject",
      "name": title,
      "description": description,
      "thumbnailUrl": thumbnailUrl,
      "uploadDate": pubDate.toISOString().substring(0, 10),
      ...(duration && { "duration": duration }),
      "embedUrl": embedUrl,
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
          "name": "วิดีโอ",
          "item": new URL("/videos/", Astro.site).href,
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

**Source:** [Google VideoObject Structured Data](https://developers.google.com/search/docs/appearance/structured-data/video)

### Pattern 5: Video Listing Page (follows showcase/index.astro pattern)
**What:** Grid listing of all videos with thumbnails, titles, and metadata.
**When to use:** The `/videos/` index page.

```astro
---
// src/pages/videos/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import VideoCard from '../../components/video/VideoCard.astro';

const videos = await getCollection('videos', ({ data }) => !data.draft);
const sorted = videos.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout title="วิดีโอ" description="วิดีโอสอนการใช้ AI สำหรับธุรกิจ SME ไทย">
  <section class="py-12 md:py-16">
    <div class="max-w-5xl mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-3">
          วิดีโอ
        </h1>
        <p class="text-lg text-surface-600 dark:text-surface-400">
          วิดีโอสอนการใช้ AI สำหรับธุรกิจ SME
        </p>
      </div>

      {sorted.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((video) => (
            <VideoCard video={video} />
          ))}
        </div>
      ) : (
        <div class="text-center py-12">
          <p class="text-surface-500 dark:text-surface-400 text-lg">
            ยังไม่มีวิดีโอ
          </p>
        </div>
      )}
    </div>
  </section>
</BaseLayout>
```

### Anti-Patterns to Avoid
- **Direct YouTube `<iframe>` embed:** Never embed YouTube iframes directly in Astro components or markdown. Always use the facade pattern.
- **Manual slug matching for cross-references:** Do not use raw string fields and manual `find()` calls to link videos and articles. Use `reference()` for type-safe, validated linking.
- **Storing YouTube thumbnails locally:** Thumbnails are available at predictable URLs (`https://i.ytimg.com/vi/{id}/hqdefault.jpg`). Don't download and commit them.
- **Using YouTube Data API for basic metadata:** The YouTube Data API requires API keys and has quotas. For a static site with content author-provided metadata (title, description, duration), frontmatter is sufficient. Only the thumbnail URL needs to be derived from the video ID.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YouTube lazy embed | Custom srcdoc facade from scratch | `astro-lazy-youtube-embed` | Handles thumbnail resolution fallbacks, play button SVG, privacy-enhanced mode, responsive sizing, accessibility labels |
| Cross-collection references | Manual string slug matching + filtering | Astro `reference()` + `getEntry()`/`getEntries()` | Type-safe, validated at build time, returns proper typed objects |
| Video thumbnail URLs | Custom thumbnail fetch/cache logic | Derive from `https://i.ytimg.com/vi/{youtubeId}/hqdefault.jpg` | YouTube provides predictable thumbnail URLs for all videos; no API needed |
| VideoObject JSON-LD | Third-party SEO plugin | Hand-write following existing ArticleJsonLd pattern | The project already has a clean JSON-LD pattern; just add a new component |

**Key insight:** The YouTube facade problem is deceptively complex (responsive sizing, thumbnail resolution fallback, play button styling, accessibility, privacy mode). The `astro-lazy-youtube-embed` package solves all of this with zero external JS dependencies, using the native srcdoc iframe attribute.

## Common Pitfalls

### Pitfall 1: YouTube Thumbnail Resolution Not Available
**What goes wrong:** Using `maxresdefault.jpg` (1280px) for thumbnails, but some videos (especially older ones or those uploaded at lower resolutions) don't have maxres thumbnails, resulting in a broken image.
**Why it happens:** YouTube only generates maxres thumbnails for videos uploaded at 1080p or higher.
**How to avoid:** Use `sd` (640px) or `hq` (480px) as the default `thumbnailRes` prop. These are always available. The `astro-lazy-youtube-embed` component handles this via the `thumbnailRes` prop.
**Warning signs:** Broken thumbnail images on some video cards or embed placeholders.

### Pitfall 2: Circular Reference Between Collections
**What goes wrong:** Defining `video: reference("videos")` on articles AND `companionArticle: reference("articles")` on videos creates a maintenance burden where both frontmatter files must be updated to stay in sync.
**Why it happens:** True bidirectional references require updating two files for every link change.
**How to avoid:** Make the video the "owner" of the relationship. Video frontmatter has a required `companionArticle` reference. Article frontmatter has an optional `video` back-reference. Alternatively, the article back-reference can be resolved at build time by querying the videos collection to find any video referencing a given article, avoiding the need for the article to store the reference at all.
**Warning signs:** Mismatched links where a video points to article A but article A doesn't point back.

### Pitfall 3: entry.id Format in Astro 5 Glob Loader
**What goes wrong:** Using `entry.slug` instead of `entry.id` for routing, or assuming `entry.id` is just the filename without the directory prefix.
**Why it happens:** Astro 5 changed from slug to id. With glob loader, `entry.id` includes the relative path from the base directory (e.g., `my-video.md` for flat collections, or `category/my-article.md` for nested ones).
**How to avoid:** For flat collections like videos, `entry.id` will be just the filename (e.g., `chatgpt-intro`). For nested collections like articles, use `entry.id.split('/').pop()!` to extract the slug, following the existing pattern in `[slug].astro`.
**Warning signs:** 404 pages or incorrect URL paths.

### Pitfall 4: Missing Duration in VideoObject JSON-LD
**What goes wrong:** Omitting the `duration` field from VideoObject structured data, reducing eligibility for video rich results in Google Search.
**Why it happens:** Duration is not available via YouTube's oEmbed API (only via the full Data API which requires keys). Content authors must manually add it to frontmatter.
**How to avoid:** Make `duration` optional in the schema (some authors may not add it immediately) but document the ISO 8601 duration format (e.g., `PT5M30S` for 5 minutes 30 seconds) in seed content and encourage authors to include it.
**Warning signs:** Video rich results not appearing in Google Search Console despite having other required fields.

### Pitfall 5: Privacy and GDPR Concerns
**What goes wrong:** Using `www.youtube.com/embed/` instead of `www.youtube-nocookie.com/embed/`, which sets tracking cookies before user interaction.
**Why it happens:** Defaulting to standard YouTube embed URL.
**How to avoid:** `astro-lazy-youtube-embed` uses privacy-enhanced mode (`youtube-nocookie.com`) by default. Don't pass the `cookie` prop unless specifically needed.
**Warning signs:** GDPR compliance issues flagged by cookie scanners.

## Code Examples

Verified patterns from official sources:

### Video Frontmatter Example
```markdown
---
title: "ChatGPT เบื้องต้น สำหรับเจ้าของธุรกิจ SME"
description: "สอนใช้ ChatGPT ตั้งแต่เริ่มต้น สำหรับเจ้าของธุรกิจ SME ที่ไม่มีพื้นฐาน IT"
youtubeId: "dQw4w9WgXcQ"
duration: "PT12M45S"
companionArticle: ai-basics/chatgpt-for-sme
tags: ["chatgpt", "เริ่มต้น", "sme"]
pubDate: 2026-02-15
draft: false
seoTitle: "ChatGPT Tutorial for Thai SME"
seoKeywords: ["chatgpt tutorial", "sme thai", "ai เริ่มต้น"]
---

## เนื้อหาในวิดีโอ

สรุปเนื้อหาจากวิดีโอ สำหรับ SEO value...
```

**Source:** Follows existing article frontmatter pattern in `src/content/articles/ai-basics/chatgpt-for-sme.md`

### Companion Article Reference Format
The `companionArticle` value is the article's `entry.id` in the articles collection. For an article at `src/content/articles/ai-basics/chatgpt-for-sme.md`, the id is `ai-basics/chatgpt-for-sme` (relative path from glob base, without extension).

**Source:** [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/)

### VideoCard Component
```astro
---
// src/components/video/VideoCard.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  video: CollectionEntry<'videos'>;
}

const { video } = Astro.props;
const { data } = video;
const slug = video.id;
const thumbnailUrl = `https://i.ytimg.com/vi/${data.youtubeId}/hqdefault.jpg`;

const dateFormatted = data.pubDate.toLocaleDateString('th-TH', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
---

<a
  href={`/videos/${slug}/`}
  class="group block rounded-xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors overflow-hidden"
>
  <!-- Thumbnail with play button overlay -->
  <div class="aspect-video relative overflow-hidden">
    <img
      src={thumbnailUrl}
      alt={data.title}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
    <!-- Play button overlay -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors">
        <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Content area -->
  <div class="p-5">
    <time datetime={data.pubDate.toISOString()} class="text-xs text-surface-400 dark:text-surface-500">
      {dateFormatted}
    </time>
    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mt-1 mb-2 line-clamp-2">
      {data.title}
    </h3>
    <p class="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 leading-relaxed">
      {data.description}
    </p>
  </div>
</a>
```

**Source:** Follows established pattern from `src/components/project/ProjectCard.astro`

### Video Detail Page
```astro
---
// src/pages/videos/[slug].astro
import { getCollection, getEntry, render } from 'astro:content';
import VideoLayout from '../../layouts/VideoLayout.astro';

export async function getStaticPaths() {
  const videos = await getCollection('videos', ({ data }) => !data.draft);
  return videos.map((video) => ({
    params: { slug: video.id },
    props: { video },
  }));
}

const { video } = Astro.props;
const { Content, headings, remarkPluginFrontmatter } = await render(video);
const companionArticle = await getEntry(video.data.companionArticle);
---

<VideoLayout
  video={video}
  companionArticle={companionArticle}
  headings={headings}
  readingTime={remarkPluginFrontmatter.minutesRead}
>
  <Content />
</VideoLayout>
```

**Source:** Follows established pattern from `src/pages/showcase/[slug].astro`

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Direct YouTube `<iframe>` embed | Facade pattern (srcdoc or lite-youtube-embed) | 2020+ (post Core Web Vitals) | 224x faster initial render, no JS on page load |
| `entry.slug` for routing | `entry.id` for routing | Astro 5.0 (Dec 2024) | Must use `.id` not `.slug` in content collections |
| Legacy content collections (src/content/) | Content Layer API with glob() loader | Astro 5.0 (Dec 2024) | defineCollection requires loader, schema defined differently |
| Manual string references between collections | `reference()` function with type safety | Astro 2.5+ (mature in 5.x) | Build-time validation, typed getEntry/getEntries |

**Deprecated/outdated:**
- `entry.slug`: Replaced by `entry.id` in Astro 5. The codebase already uses `entry.id` correctly.
- Direct YouTube embeds: A performance anti-pattern since Core Web Vitals became a ranking factor.

## Open Questions

1. **Bidirectional reference strategy: one-way or two-way?**
   - What we know: Astro `reference()` supports both. Video can reference article (required). Article can optionally reference video back.
   - What's unclear: Is maintaining the back-reference in article frontmatter worth the maintenance burden? Or should we compute it at build time by querying the videos collection?
   - Recommendation: **Two-way explicit references.** Add optional `video: reference("videos")` to articles schema. The explicit approach is simpler to implement, easier to reason about, and the maintenance burden is minimal since adding a video always involves editing both the video and article files anyway. Build-time computation adds complexity for little gain.

2. **Video content body: transcript vs. summary?**
   - What we know: Each video `.md` file has a markdown body (the companion article provides full SEO text content). The video body serves as supplementary text on the video page.
   - What's unclear: Should the video body be a full transcript, a summary of key points, or timestamps/chapters?
   - Recommendation: **Summary with key points.** A full transcript is too much maintenance. A summary with headers gives the video page enough content for SEO while the companion article provides the deep-dive text.

3. **Navigation integration: where does "Videos" appear?**
   - What we know: The Header component has navigation links. A new "Videos" section needs to be accessible.
   - What's unclear: Whether to add it as a top-level nav item alongside "Articles" and "Showcase", or as a sub-section.
   - Recommendation: **Top-level nav item.** It's a primary content type alongside articles and projects. Add to Header and MobileNav.

## Sources

### Primary (HIGH confidence)
- [Astro Content Collections Guide](https://docs.astro.build/en/guides/content-collections/) - reference() function, glob() loader, schema definition
- [Astro Content Collections API Reference](https://docs.astro.build/en/reference/modules/astro-content/) - getEntry, getEntries, render, getCollection
- [Google VideoObject Structured Data](https://developers.google.com/search/docs/appearance/structured-data/video) - Required/recommended fields, JSON-LD format
- [astro-lazy-youtube-embed GitHub](https://github.com/insin/astro-lazy-youtube-embed) - v0.5.5, props API, srcdoc approach, privacy mode

### Secondary (MEDIUM confidence)
- [Astro Embed YouTube docs](https://astro-embed.netlify.app/components/youtube/) - lite-youtube-embed alternative approach
- [Using Reference in Content Collections (suzza.dev)](https://suzza.dev/explainers/reference/) - Practical reference() usage example verified against official docs
- [web.dev embed best practices](https://web.dev/articles/embed-best-practices) - Facade pattern performance rationale
- [YouTube thumbnail URL patterns (SitePoint)](https://www.sitepoint.com/youtube-video-thumbnail-urls/) - Thumbnail URL structure verified

### Tertiary (LOW confidence)
- YouTube oEmbed API metadata availability - Duration NOT available via oEmbed, needs manual entry or YouTube Data API (multiple sources agree)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - `astro-lazy-youtube-embed` verified on GitHub (v0.5.5, Jan 2026), Astro `reference()` verified in official docs
- Architecture: HIGH - All patterns follow established codebase conventions (ProjectCard, ProjectLayout, ProjectJsonLd). Cross-verified with official Astro docs.
- Pitfalls: HIGH - Thumbnail resolution, entry.id format, privacy mode all verified from multiple sources. Bidirectional reference strategy based on official Astro docs.

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days - stable domain, no fast-moving APIs)
