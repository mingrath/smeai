# SMEAI

Thai-primary knowledge hub and consulting lead generator for SME owners exploring AI adoption.

**Live:** [smeaithai.com](https://smeaithai.com)

## What This Is

A static site that publishes Thai-language articles, project case studies, and video content teaching business owners how to use AI affordably. Visitors learn to implement AI themselves or contact Ohm for consulting.

## Features

- **Thai-first content** --- Articles, case studies, and videos in Thai with Tinglish SEO keywords
- **Article system** --- Categories, tags, table of contents, reading time, RSS feed
- **Project showcase** --- Case studies with Problem/Solution/Results format and business metrics
- **Video integration** --- YouTube facade pattern with zero performance penalty and bidirectional article cross-linking
- **Search** --- Pagefind build-time search with native Thai word segmentation
- **Dark mode** --- System-aware with manual toggle
- **SEO** --- Structured data (Article, VideoObject, BreadcrumbList), Open Graph, XML sitemap, canonical URLs
- **Performance** --- Lighthouse 100/100 mobile (LCP <1.5s, TBT 0ms, CLS 0)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 5](https://astro.build) (static output) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) with OKLCH color system |
| Components | [Preact](https://preactjs.com) (islands) |
| Search | [Pagefind](https://pagefind.app) v1.4 with Thai segmenter |
| Fonts | Noto Sans Thai + Inter via [Fontsource](https://fontsource.org) (self-hosted) |
| Linting | [Biome](https://biomejs.dev) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Analytics | Cloudflare Web Analytics (cookieless, PDPA-compliant) |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Deploy to Cloudflare Pages
npx wrangler pages deploy ./dist --project-name=smeai --branch=main
```

## Project Structure

```
src/
  components/     # Reusable Astro/Preact components
  content/        # Markdown content collections (articles, projects, videos)
  layouts/        # Page layouts (Base, Article, Project, Video)
  pages/          # File-based routing
  styles/         # Global CSS with Tailwind
  utils/          # TypeScript utilities
```

## Content

Content is managed as Markdown files in `src/content/` with Zod-validated frontmatter schemas:

- **Articles** (`src/content/articles/`) --- Thai AI education content
- **Projects** (`src/content/projects/`) --- Case studies with business metrics
- **Videos** (`src/content/videos/`) --- YouTube video metadata with article cross-links

## License

Private repository. All rights reserved.
