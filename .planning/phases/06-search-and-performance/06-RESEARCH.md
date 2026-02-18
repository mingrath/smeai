# Phase 6: Search & Performance - Research

**Researched:** 2026-02-18
**Domain:** Client-side static search (Pagefind) + Core Web Vitals optimization
**Confidence:** HIGH

## Summary

Phase 6 integrates Pagefind build-time search indexing into the existing Astro static site and audits/optimizes for Lighthouse 90+ mobile scores. The site is Thai-primary (`lang="th"`) with occasional English terms, running on Astro 5 + Preact + Tailwind v4 + Cloudflare Pages.

Pagefind v1.4.0 (current) natively supports Thai language segmentation during indexing and ships Thai UI translations out of the box. The `astro-pagefind` integration (v1.8.5) automates index generation as part of the Astro build pipeline, eliminating manual postbuild scripts. The search UI can be presented in a modal dialog with Cmd/Ctrl+K keyboard shortcut, following the established pattern from Astro Starlight.

For performance, the site is already well-positioned: Astro's static output ships zero JS by default, fonts are self-hosted via Fontsource, and YouTube embeds use the facade pattern. The primary remaining work is font preloading, auditing for render-blocking resources, and verifying Core Web Vitals across all page types. Since the site has no images beyond a favicon SVG, image optimization is not currently a factor.

**Primary recommendation:** Use `astro-pagefind` integration for automated build-time indexing with `--force-language th`, build a custom search dialog using the native `<dialog>` element with Pagefind's default UI embedded inside, and preload the primary Thai font file to improve LCP.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| pagefind | 1.4.0 | Build-time static search indexing | De facto standard for static site search; zero-runtime-cost indexing, ~40KB JS+WASM bundle loaded on demand |
| astro-pagefind | 1.8.5 | Astro integration that auto-runs Pagefind after build | Eliminates manual postbuild scripts; provides `<Search>` component; handles dev mode |
| @pagefind/default-ui | (bundled) | Pre-built search input + results UI | Ships with Pagefind; Thai translations built-in; CSS-variable-themeable for dark mode |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | The existing stack (Astro, Tailwind, Fontsource) already covers all performance needs |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| astro-pagefind | Manual `npx pagefind --site dist` postbuild | More control but requires manual dev-mode setup; astro-pagefind handles both |
| Pagefind default UI | Custom search UI via Pagefind JS API | Full design control but significant implementation effort; default UI is sufficient with CSS theming |
| Pagefind | Fuse.js / Lunr.js / Flexsearch | These require shipping the entire search index to the client; Pagefind loads only relevant index chunks (~40KB total) |

**Installation:**
```bash
npm install astro-pagefind
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   └── search/
│       └── SearchDialog.astro    # Modal dialog wrapping Pagefind UI
├── layouts/
│   ├── BaseLayout.astro          # Add search trigger button + dialog
│   ├── ArticleLayout.astro       # Add data-pagefind-body to article content
│   ├── ProjectLayout.astro       # Add data-pagefind-body to project content
│   └── VideoLayout.astro         # Add data-pagefind-body to video content
├── pages/
│   └── (existing pages)          # Listing pages: data-pagefind-body on content sections
└── styles/
    └── global.css                # Add Pagefind CSS variable overrides for theme
```

### Pattern 1: astro-pagefind Integration Setup
**What:** Register astro-pagefind as an Astro integration so it automatically indexes after build
**When to use:** Always -- this replaces manual postbuild scripts
**Example:**
```typescript
// astro.config.mjs
// Source: https://github.com/shishkin/astro-pagefind
import pagefind from "astro-pagefind";

export default defineConfig({
  integrations: [preact(), sitemap(), pagefind()],
  // ...
});
```

### Pattern 2: Selective Content Indexing with data-pagefind-body
**What:** Mark only main content areas for indexing; exclude navigation, footer, UI chrome
**When to use:** On every layout that contains searchable content
**Example:**
```astro
<!-- ArticleLayout.astro -->
<article data-pagefind-body>
  <h1 data-pagefind-meta="title">{data.title}</h1>
  <div data-pagefind-ignore>
    <!-- Table of contents, meta UI -- not searchable -->
    <TableOfContents headings={headings} />
  </div>
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <slot />
  </div>
</article>
```

**Critical behavior:** Once `data-pagefind-body` exists on ANY page, pages without it are excluded from the index entirely. This is usually desired (e.g., the homepage and contact page don't need to appear in search results). If they should appear, add `data-pagefind-body` to those pages too.

### Pattern 3: Search Dialog with Cmd/Ctrl+K
**What:** Native `<dialog>` element containing Pagefind's default UI, triggered by keyboard shortcut and header button
**When to use:** Site-wide, rendered once in BaseLayout
**Example:**
```astro
<!-- SearchDialog.astro -->
<!-- Source: Adapted from Astro Starlight Search.astro pattern -->
<button id="search-trigger" type="button" aria-label="Search">
  <svg><!-- magnifier icon --></svg>
  <kbd>⌘K</kbd>
</button>

<dialog id="search-dialog">
  <div id="pagefind-container"></div>
</dialog>

<script>
  function initSearch() {
    const dialog = document.getElementById('search-dialog');
    const trigger = document.getElementById('search-trigger');

    // Cmd/Ctrl+K shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        dialog.open ? dialog.close() : dialog.showModal();
      }
    });

    trigger?.addEventListener('click', () => dialog?.showModal());

    // Lazy-load Pagefind UI on first dialog open
    let initialized = false;
    dialog?.addEventListener('open', async () => {
      if (initialized) return;
      const { PagefindUI } = await import('@pagefind/default-ui');
      new PagefindUI({
        element: '#pagefind-container',
        showSubResults: true,
        showImages: false,
        translations: { /* Thai strings auto-detected from lang="th" */ },
      });
      initialized = true;
    });
  }

  initSearch();
  document.addEventListener('astro:after-swap', initSearch);
</script>
```

### Pattern 4: Pagefind CSS Theming for Dark Mode
**What:** Override Pagefind's CSS custom properties to match the site's design system
**When to use:** In global.css or scoped styles
**Example:**
```css
/* Source: https://pagefind.app/docs/ui/ */
:root {
  --pagefind-ui-scale: 0.9;
  --pagefind-ui-primary: oklch(0.55 0.18 240);  /* primary-500 */
  --pagefind-ui-background: oklch(0.985 0.004 80); /* surface-50 */
  --pagefind-ui-border: oklch(0.925 0.007 80);  /* surface-200 */
  --pagefind-ui-tag: oklch(0.93 0.03 240);  /* primary-100 */
  --pagefind-ui-text: oklch(0.2 0.008 80);  /* surface-900 */
  --pagefind-ui-font: "Noto Sans Thai Variable", "Inter Variable", ui-sans-serif, sans-serif;
  --pagefind-ui-border-radius: 0.5rem;
}

.dark {
  --pagefind-ui-primary: oklch(0.68 0.14 240);  /* primary-400 */
  --pagefind-ui-background: oklch(0.14 0.006 80); /* surface-950 */
  --pagefind-ui-border: oklch(0.27 0.01 75);  /* surface-800 */
  --pagefind-ui-tag: oklch(0.27 0.1 240);  /* primary-900 */
  --pagefind-ui-text: oklch(0.965 0.005 80);  /* surface-100 */
}
```

### Pattern 5: Force Thai Language Indexing
**What:** Configure Pagefind to index the entire site as Thai, ensuring Thai segmenter is applied globally
**When to use:** When the site is primarily one language (Thai) with some English mixed in
**Example:**
```yaml
# pagefind.yml (or via astro-pagefind config)
force_language: th
```

Since the HTML already has `lang="th"`, Pagefind auto-detects this. However, `force-language: th` ensures a single unified index (not split by language), which is simpler and correct for this site.

### Pattern 6: Font Preloading for LCP
**What:** Preload the primary Thai variable font to eliminate FOIT/FOUT and improve LCP
**When to use:** In BaseLayout `<head>` for the main font files
**Example:**
```astro
---
// Source: https://fontsource.org/docs/getting-started/preload
import notoSansThaiWoff2 from '@fontsource-variable/noto-sans-thai/files/noto-sans-thai-latin-wght-normal.woff2?url';
---
<head>
  <link rel="preload" as="font" type="font/woff2" href={notoSansThaiWoff2} crossorigin="anonymous" />
</head>
```

**Note:** Only preload the Thai font (primary); Inter is secondary and used for Latin fallback. Over-preloading hurts performance.

### Anti-Patterns to Avoid
- **Indexing navigation/footer:** Use `data-pagefind-body` to scope indexing to content areas only; otherwise search results include repeated boilerplate text
- **Eagerly loading Pagefind JS:** Pagefind's JS+WASM bundle (~40KB) should load lazily on dialog open, not on every page load
- **Using `is:inline` for the search script:** Pagefind's dynamic `import()` works better with Astro's processed scripts; only the initial keyboard listener should be inline if needed
- **Preloading all font files:** Only preload the critical Thai woff2; preloading both Thai and Inter (and all subsets) increases load time

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Full-text search | Custom inverted index | Pagefind | Handles segmentation, chunked loading, ranking, highlighting out of the box |
| Search UI | Custom input + results component | @pagefind/default-ui | Includes debouncing, highlighting, pagination, keyboard nav, a11y, Thai translations |
| Thai word segmentation | Custom dictionary-based splitter | Pagefind extended (via npx) | Built-in Thai segmenter since v1.4.0; handles edge cases |
| Search dialog/modal | Custom overlay with focus trap | Native `<dialog>` element | Built-in backdrop, focus trapping, Escape to close, accessibility |
| Performance profiling | Manual Chrome DevTools runs | Lighthouse CLI / Cloudflare Observatory | Automated, repeatable, CI-friendly |

**Key insight:** Pagefind is a solved problem. The entire search feature (indexing, UI, Thai support, dark mode) is configuration, not code. The only custom code is the dialog wrapper and keyboard shortcut.

## Common Pitfalls

### Pitfall 1: Pages Disappearing from Search After Adding data-pagefind-body
**What goes wrong:** Adding `data-pagefind-body` to article layouts causes other pages (listing, showcase, videos) to silently disappear from search results
**Why it happens:** Pagefind's rule: once ANY page has `data-pagefind-body`, pages WITHOUT it are excluded entirely
**How to avoid:** Deliberately decide which page types should be searchable. Add `data-pagefind-body` to all of them. For pages that should NOT be searchable (e.g., contact, homepage), intentionally omit it.
**Warning signs:** Build log shows fewer indexed pages than expected

### Pitfall 2: Thai Query Segmentation Not Working in Browser
**What goes wrong:** Users type a Thai phrase without spaces and get zero results
**Why it happens:** Pagefind v1.4.0 supports Thai segmentation during INDEXING but does NOT yet segment the SEARCH QUERY in the browser. The indexed content is properly segmented into Thai words, but the user's input must match those segments.
**How to avoid:** This is a known limitation. Mitigation: (1) Thai queries with natural spacing between concept words will work; (2) Short queries (1-2 Thai words) work well since they match word segments; (3) Document in search placeholder text that users can use spaces between words for better results.
**Warning signs:** Long Thai phrases without spaces return no results while shorter queries work

### Pitfall 3: Pagefind Bundle Not Found in Dev Mode
**What goes wrong:** Search throws 404 errors during `astro dev` because the Pagefind index hasn't been built yet
**Why it happens:** Pagefind indexes the BUILD output; dev mode doesn't produce static HTML
**How to avoid:** Use `astro-pagefind` integration which handles dev-mode gracefully (serves a previously built index). Alternative: run `npm run build` once before dev. Accept that search may show stale results in dev mode.
**Warning signs:** Console 404 errors for `/pagefind/pagefind.js`

### Pitfall 4: Font Preload Without crossorigin Attribute
**What goes wrong:** Browser downloads the font TWICE -- once from preload, once from CSS @font-face
**Why it happens:** Fonts fetched via CSS use CORS; preload `<link>` must match with `crossorigin="anonymous"` or the browser treats them as different requests
**How to avoid:** Always add `crossorigin="anonymous"` to font preload links
**Warning signs:** Network tab shows duplicate font downloads; LCP not improving despite preload

### Pitfall 5: Render-Blocking Fontsource CSS
**What goes wrong:** Fontsource imports in the frontmatter create render-blocking CSS chunks
**Why it happens:** Astro processes CSS imports and may inline them or create blocking link tags
**How to avoid:** Fontsource variable font imports via the Astro frontmatter (as currently done in BaseLayout) are bundled by Vite into the main CSS. This is actually fine for Astro static builds since the CSS is already minimal. Verify with Lighthouse that font CSS is not flagged.
**Warning signs:** Lighthouse flags "render-blocking resources" pointing to font CSS

### Pitfall 6: Pagefind Default UI Overriding Site Styles
**What goes wrong:** Pagefind's built-in CSS resets conflict with Tailwind or site styles
**Why it happens:** Pagefind UI ships with `resetStyles: true` by default, applying CSS resets
**How to avoid:** Set `resetStyles: false` if conflicts occur, then style manually. Or scope the Pagefind UI inside the `<dialog>` to isolate its styles.
**Warning signs:** Search results look different from rest of site; fonts revert to system default inside search

## Code Examples

Verified patterns from official sources:

### Astro Config with astro-pagefind
```typescript
// astro.config.mjs
// Source: https://github.com/shishkin/astro-pagefind
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

export default defineConfig({
  site: "https://smeai.pages.dev",
  integrations: [preact(), sitemap(), pagefind()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Article Layout with Search Indexing Attributes
```astro
<!-- ArticleLayout.astro - key additions -->
<article class="py-12 md:py-16" data-pagefind-body>
  <div class="prose-container">
    <h1
      class="text-3xl md:text-4xl font-bold"
      data-pagefind-meta="title"
    >
      {data.title}
    </h1>

    <!-- Meta info: exclude from search index -->
    <div data-pagefind-ignore>
      <ArticleMeta ... />
    </div>

    <!-- Table of Contents: exclude from search -->
    <div data-pagefind-ignore>
      <TableOfContents headings={headings} />
    </div>

    <!-- Article body: this IS the searchable content -->
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <slot />
    </div>
  </div>
</article>
```

### Pagefind UI Initialization (Lazy Loaded)
```javascript
// Source: https://pagefind.app/docs/ui-usage/
// Lazy-load on dialog open for zero impact on initial page load
async function initPagefindUI() {
  const { PagefindUI } = await import("@pagefind/default-ui");
  new PagefindUI({
    element: "#pagefind-container",
    showSubResults: true,
    showImages: false,
    autofocus: true,
    debounceTimeoutMs: 300,
    // Thai auto-detected from html lang="th"
    // Translations loaded automatically for Thai
  });
}
```

### Pagefind Custom Metadata for Different Content Types
```astro
<!-- For pages where auto-detection of title from h1 is not enough -->
<meta data-pagefind-default-meta="image[content]" content="/og-default.png" property="og:image">

<!-- Inline metadata for content type filtering -->
<div data-pagefind-filter="content_type:article">...</div>
<div data-pagefind-filter="content_type:project">...</div>
<div data-pagefind-filter="content_type:video">...</div>
```

### Font Preload in BaseLayout Head
```astro
---
// Source: https://fontsource.org/docs/getting-started/preload
import notoSansThaiWoff2 from '@fontsource-variable/noto-sans-thai/files/noto-sans-thai-latin-wght-normal.woff2?url';
---
<head>
  <!-- Preload critical Thai font for faster LCP -->
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    href={notoSansThaiWoff2}
    crossorigin="anonymous"
  />
  <!-- Rest of head... -->
</head>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Algolia/ElasticSearch for static sites | Pagefind build-time indexing | 2022 (Pagefind launch) | Zero runtime cost, no external service, works offline |
| Manual `npx pagefind` postbuild | astro-pagefind integration | 2023 | Automated build, dev-mode support, component API |
| No Thai support in Pagefind | Thai segmenter + translations | Pagefind v1.4.0 (Sep 2024) | Thai content now properly word-segmented during indexing |
| @astrojs/image for optimization | astro:assets (built-in) | Astro 3.0 (Aug 2023) | No extra integration needed; automatic width/height/format optimization |
| @fontsource static imports | @fontsource + ?url preload | 2024 | Vite's ?url import enables proper preload link generation |
| Lighthouse audits → insights | Lighthouse "insight mode" default | Lighthouse v12.7 (Jun 2025) | Focus shifted from audits to actionable insights; still measures CWV |

**Deprecated/outdated:**
- `@astrojs/image`: Removed in Astro 3.0, replaced by built-in `astro:assets`
- Manual Pagefind postbuild scripts: Replaced by `astro-pagefind` integration for Astro projects
- Pagefind without Thai support: Pre-v1.4.0 versions lack Thai segmenter

## Open Questions

1. **Thai font file path for preload**
   - What we know: Fontsource provides woff2 files at `@fontsource-variable/noto-sans-thai/files/` but the exact filename for the Thai subset (not just Latin) needs verification
   - What's unclear: Whether the Thai characters are in a separate subset file or bundled with the main file for variable fonts
   - Recommendation: Check the actual file listing in `node_modules/@fontsource-variable/noto-sans-thai/files/` at plan execution time; preload the file that contains Thai glyphs (likely `noto-sans-thai-thai-wght-normal.woff2`)

2. **Pagefind query segmentation for Thai**
   - What we know: Pagefind v1.4.0 segments Thai during INDEXING but does NOT segment the search query in the browser
   - What's unclear: How severe this limitation is in practice for typical Thai SME queries (which tend to be 1-3 word queries with natural spacing)
   - Recommendation: Test after implementation with realistic Thai queries. If problematic, consider using `processTerm` callback to add spaces around common Thai word patterns, or accept the limitation and guide users via placeholder text

3. **Cloudflare Analytics script impact on Lighthouse**
   - What we know: Cloudflare auto-injects analytics JS for Pages projects; community reports occasional Lighthouse warnings about render-blocking Cloudflare scripts
   - What's unclear: Whether the current auto-injected script affects the Lighthouse 90+ target
   - Recommendation: Run Lighthouse on the deployed Cloudflare Pages URL (not localhost) to capture the real impact. If problematic, Cloudflare's script is typically async and has minimal impact

## Sources

### Primary (HIGH confidence)
- [Pagefind official docs - Multilingual](https://pagefind.app/docs/multilingual/) - Thai segmenter support, language detection, force-language
- [Pagefind official docs - UI configuration](https://pagefind.app/docs/ui/) - CSS variables, dark mode theming, translations, processTerm
- [Pagefind official docs - Indexing](https://pagefind.app/docs/indexing/) - data-pagefind-body, data-pagefind-ignore, data-pagefind-meta
- [Pagefind official docs - CLI config](https://pagefind.app/docs/config-options/) - force_language, exclude_selectors, site directory
- [Pagefind official docs - JS API](https://pagefind.app/docs/api/) - search(), debouncedSearch(), filters, preload
- [Pagefind official docs - Metadata](https://pagefind.app/docs/metadata/) - auto metadata, custom metadata, default metadata
- [Pagefind v1.4.0 release notes](https://github.com/Pagefind/pagefind/releases) - Thai translations (PR #801), Thai segmenter (PR #807)
- [astro-pagefind GitHub](https://github.com/shishkin/astro-pagefind) - v1.8.5, Astro integration API, component usage
- [Fontsource preload docs](https://fontsource.org/docs/getting-started/preload) - ?url import pattern, preload best practices
- [Pagefind official docs - UI usage](https://pagefind.app/docs/ui-usage/) - PagefindUI initialization, lazy loading

### Secondary (MEDIUM confidence)
- [Astro Starlight Search.astro](https://github.com/withastro/starlight/blob/main/packages/starlight/components/Search.astro) - Dialog+Cmd/K pattern, Pagefind integration in Astro, verified by reading source
- [Syntackle Pagefind + Astro guide](https://syntackle.com/blog/pagefind-search-in-astro-site/) - Build scripts, configuration, two approaches compared
- [Astro performance optimization guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-performance-optimization/) - Lighthouse 90+ techniques, Islands Architecture, font optimization
- [Chrome Lighthouse render-blocking docs](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources) - Eliminate render-blocking resources

### Tertiary (LOW confidence)
- [Pagefind CJK GitHub issue #987](https://github.com/Pagefind/pagefind/issues/987) - Query segmentation limitations; discusses CJK but applies to Thai similarly
- Community blog posts on font preloading with Astro - Multiple sources agree on approach but specific Fontsource file paths need local verification

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Pagefind is the established choice for static site search; astro-pagefind is the standard Astro integration; Thai support confirmed in v1.4.0 release notes
- Architecture: HIGH - data-pagefind-body pattern, dialog+keyboard shortcut, and CSS theming are all documented patterns; verified against Starlight's implementation
- Pitfalls: HIGH - Thai query segmentation limitation confirmed in official docs; font preload gotchas verified across multiple sources; data-pagefind-body exclusion behavior documented officially
- Performance: MEDIUM - Astro is inherently performant for static sites; specific Lighthouse score depends on deployed environment with Cloudflare's injected scripts

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days - Pagefind is stable; Thai support is released)
