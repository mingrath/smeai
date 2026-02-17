# Phase 1: Foundation & Site Shell - Research

**Researched:** 2026-02-18
**Domain:** Astro 5 static site setup, Tailwind CSS v4, Thai typography, Cloudflare Pages deployment, mobile-first responsive layout
**Confidence:** HIGH

## Summary

Phase 1 creates a deployable site skeleton on Cloudflare Pages with Thai typography, mobile-first responsive layout, persistent contact links (LINE + email), and cookieless analytics. The stack is Astro 5.17.x + Tailwind CSS v4.1.x, with self-hosted Noto Sans Thai and Inter fonts via Fontsource. No SSR adapter is needed -- Astro produces pure static HTML by default, which Cloudflare Pages serves directly from its global CDN.

The key technical findings are: (1) Tailwind CSS v4 uses a completely CSS-first configuration model -- no `tailwind.config.js` file -- everything including custom colors, fonts, and dark mode is defined in the CSS file using `@theme` and `@custom-variant` directives; (2) Cloudflare Pages auto-injects the Web Analytics beacon for Pages projects with no manual snippet needed; (3) the scroll-away header pattern requires a small amount of JavaScript (CSS-only solutions via scroll-driven animations are Chromium-only); (4) Fontsource variable fonts provide a single file covering all weights 100-900, which is smaller than loading multiple static weight files.

**Primary recommendation:** Use `@fontsource-variable/noto-sans-thai` and `@fontsource-variable/inter` for optimal file size. Define the complete design system (colors, fonts, spacing, dark mode) in a single `src/styles/global.css` file using Tailwind v4's `@theme` directive. Deploy as a pure static site to Cloudflare Pages with no adapter.

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Warm & approachable aesthetic -- soft colors, rounded elements, friendly feel
- Blue-based color palette (conveys trust and technology) with warm accents
- Light mode as default with a dark mode toggle available
- Personal/relatable tone, not corporate -- the design should feel like a knowledgeable friend, not a consulting firm
- 4 top-level nav items: Home, Articles, Showcase, Contact
- Hamburger menu on mobile (top header)
- Header scrolls away on scroll (not sticky) -- gives more reading space on mobile
- Minimal footer: logo, copyright, social links -- single line or very compact
- Primary Thai font: Noto Sans Thai (self-hosted via Fontsource)
- English/UI font: Inter (self-hosted via Fontsource)
- Body text: 16px standard
- Headings: Same font (Noto Sans Thai Bold 700), body at Regular 400
- Content width: narrow (65ch) -- optimal reading line length, centered with generous margins
- Thai-appropriate line-height (1.8+ for body text due to taller ascenders/descenders)
- Channels: LINE + Email only (no phone)
- No floating button -- contact available in nav/footer only for a cleaner look
- No persistent sticky contact element

### Claude's Discretion
- Exact contact link placement (header vs footer vs both) -- pick based on lead generation best practices
- Contact link display style -- icons only vs icons + text depending on context (header compact, footer detailed)
- Exact blue shade and warm accent colors
- Dark mode implementation approach
- Spacing system and padding values
- Animation/transition patterns (subtle, not flashy)
- Exact Thai line-height and word-break CSS values

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.

</user_constraints>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.17.x | Static site framework | Zero JS by default, purpose-built for content sites. Astro joined Cloudflare -- first-class Pages support. |
| Tailwind CSS | 4.1.x | Utility-first CSS | CSS-first config via `@theme`. 5x faster builds. Integrates via `@tailwindcss/vite` plugin. |
| @tailwindcss/vite | 4.1.x | Vite plugin for Tailwind | Official v4 integration method. Replaces deprecated `@astrojs/tailwind`. |
| @tailwindcss/typography | latest | Prose styling for content | `prose` classes for rendered Markdown. Added via `@plugin` in CSS file. |
| TypeScript | 5.8.x | Type safety | Astro 5 native support. Use `strict` tsconfig preset. |

### Fonts (Self-Hosted)

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| @fontsource-variable/noto-sans-thai | latest | Thai font (variable) | Single file covers weights 100-900. CSS family name: `'Noto Sans Thai Variable'`. Supports `wdth` and `wght` axes. |
| @fontsource-variable/inter | latest | English/UI font (variable) | Single file covers weights 100-900. CSS family name: `'Inter Variable'`. |

### Development Tools

| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| @biomejs/biome | 2.4.x | Linting + formatting | Single binary. Astro `.astro` file support requires `experimentalFullSupportEnabled: true` in v2.3+. |
| Preact | 10.28.x | Future interactive islands | Install now for future phases. `@astrojs/preact` integration. Not used in Phase 1. |

### Infrastructure

| Technology | Tier | Purpose | Notes |
|------------|------|---------|-------|
| Cloudflare Pages | Free | Static hosting + CDN | Unlimited bandwidth, 500 builds/month. Auto-deploy from GitHub. Bangkok edge node. |
| Cloudflare Web Analytics | Free | Cookieless analytics | Auto-injected for Pages projects. No manual snippet needed. PDPA-compliant (no cookies). |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @fontsource-variable/* | @fontsource/* (static) | Static loads one file per weight. Variable loads one file for ALL weights. Variable is smaller when using 2+ weights. Use variable. |
| @tailwindcss/vite | @astrojs/tailwind | @astrojs/tailwind is deprecated for Tailwind v4. Do NOT use it. |
| Biome | ESLint + Prettier | Biome is 20-100x faster, single config file. Only miss niche ESLint plugins. |
| Manual beacon snippet | Cloudflare auto-injection | For Pages projects, auto-injection works. Manual snippet only needed for non-Pages sites. |

**Installation:**
```bash
# Create project (if starting fresh)
npm create astro@latest smeai -- --template minimal --typescript strict --skip-houston

# Core styling
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography

# Fonts (variable versions -- one file for all weights)
npm install @fontsource-variable/noto-sans-thai @fontsource-variable/inter

# Future interactive islands (install now, use later)
npm install preact
npx astro add preact

# Dev tools
npm install -D @biomejs/biome typescript
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 1)

```
smeai/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── icons/           # SVG icons (LINE, email, etc.)
│   ├── components/
│   │   └── common/
│   │       ├── Header.astro       # Nav + hamburger menu
│   │       ├── Footer.astro       # Logo, copyright, contact links
│   │       ├── MobileNav.astro    # Mobile hamburger menu overlay
│   │       ├── ThemeToggle.astro  # Dark mode toggle
│   │       └── ContactLinks.astro # LINE + Email links (reusable)
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML shell, fonts, meta, header/footer
│   ├── pages/
│   │   └── index.astro       # Placeholder home page
│   └── styles/
│       └── global.css         # Tailwind + @theme + Thai typography
├── astro.config.mjs
├── tsconfig.json
├── biome.json
└── package.json
```

### Pattern 1: Tailwind v4 CSS-First Configuration

**What:** All design tokens (colors, fonts, spacing, breakpoints) are defined in the CSS file using `@theme`, not in a JavaScript config file.
**When to use:** Always with Tailwind v4. There is no `tailwind.config.js`.

```css
/* src/styles/global.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Dark mode: class-based toggle */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* === Colors: Blue-based warm palette === */
  --color-primary-50: oklch(0.97 0.01 240);
  --color-primary-100: oklch(0.93 0.03 240);
  --color-primary-200: oklch(0.87 0.06 240);
  --color-primary-300: oklch(0.78 0.10 240);
  --color-primary-400: oklch(0.68 0.14 240);
  --color-primary-500: oklch(0.55 0.18 240);
  --color-primary-600: oklch(0.47 0.18 240);
  --color-primary-700: oklch(0.40 0.16 240);
  --color-primary-800: oklch(0.33 0.13 240);
  --color-primary-900: oklch(0.27 0.10 240);

  /* Warm accents */
  --color-accent-50: oklch(0.97 0.02 60);
  --color-accent-100: oklch(0.93 0.04 55);
  --color-accent-200: oklch(0.87 0.08 50);
  --color-accent-300: oklch(0.78 0.12 45);
  --color-accent-400: oklch(0.70 0.15 40);
  --color-accent-500: oklch(0.62 0.17 35);

  /* Neutral warm grays */
  --color-surface-50: oklch(0.98 0.005 80);
  --color-surface-100: oklch(0.96 0.005 80);
  --color-surface-200: oklch(0.92 0.008 80);
  --color-surface-700: oklch(0.40 0.010 80);
  --color-surface-800: oklch(0.27 0.010 80);
  --color-surface-900: oklch(0.18 0.010 80);
  --color-surface-950: oklch(0.12 0.010 80);

  /* === Fonts === */
  --font-sans: 'Noto Sans Thai Variable', 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  --font-heading: 'Noto Sans Thai Variable', 'Inter Variable', ui-sans-serif, sans-serif;
  --font-body: 'Noto Sans Thai Variable', 'Inter Variable', ui-sans-serif, system-ui, sans-serif;

  /* === Spacing base === */
  --spacing: 0.25rem;

  /* === Border radius (rounded, friendly feel) === */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;

  /* === Content width === */
  --container-prose: 65ch;
}
```

**Source:** [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) | [Tailwind CSS v4 Astro Setup](https://tailwindcss.com/docs/installation/framework-guides/astro)

### Pattern 2: Font Loading in Astro via Fontsource

**What:** Import Fontsource variable fonts in the BaseLayout to make them available site-wide. Use `font-display: swap` for optimal loading.
**When to use:** Always -- this is the only font loading pattern needed.

```astro
---
// src/layouts/BaseLayout.astro
import '@fontsource-variable/noto-sans-thai';
import '@fontsource-variable/inter';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'AI Knowledge Hub for Thai SMEs' } = Astro.props;
---
<!doctype html>
<html lang="th" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:locale" content="th_TH" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | SMEAI</title>

    <!-- Dark mode: prevent FOUC -->
    <script is:inline>
      document.documentElement.classList.toggle(
        'dark',
        localStorage.theme === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    </script>
  </head>
  <body class="bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100 font-body antialiased">
    <slot name="header" />
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

**Key detail:** The `is:inline` script tag prevents Astro from bundling the dark mode script -- it must run immediately in `<head>` before the page renders to avoid FOUC (Flash of Unstyled Content).

**Source:** [Fontsource Noto Sans Thai Install](https://fontsource.org/fonts/noto-sans-thai/install) | [Astro Custom Fonts Guide](https://docs.astro.build/en/guides/fonts/)

### Pattern 3: Dark Mode Toggle (Class Strategy)

**What:** Use Tailwind v4's `@custom-variant` to enable class-based dark mode. Toggle the `dark` class on `<html>` and persist preference to `localStorage`.
**When to use:** Required by user decision (light mode default, dark mode toggle).

```css
/* In global.css -- already shown in Pattern 1 */
@custom-variant dark (&:where(.dark, .dark *));
```

```astro
---
// src/components/common/ThemeToggle.astro
---
<button
  id="theme-toggle"
  type="button"
  class="p-2 rounded-lg text-surface-600 hover:bg-surface-200 dark:text-surface-400 dark:hover:bg-surface-800 transition-colors"
  aria-label="Toggle dark mode"
>
  <!-- Sun icon (shown in dark mode) -->
  <svg class="hidden dark:block w-5 h-5" ...><!-- sun SVG --></svg>
  <!-- Moon icon (shown in light mode) -->
  <svg class="block dark:hidden w-5 h-5" ...><!-- moon SVG --></svg>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
  });
</script>
```

**Source:** [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)

### Pattern 4: Scroll-Away Header

**What:** Header hides when scrolling down, reappears when scrolling up. Requires JavaScript -- the CSS scroll-driven animation approach is Chromium-only and not ready for production.
**When to use:** User-decided behavior for the site header.

```astro
---
// src/components/common/Header.astro
---
<header
  id="site-header"
  class="fixed top-0 left-0 right-0 z-50 bg-surface-50/95 dark:bg-surface-950/95 backdrop-blur-sm border-b border-surface-200 dark:border-surface-800 transition-transform duration-300"
>
  <nav class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
    <!-- Logo / brand -->
    <a href="/" class="font-heading font-bold text-xl text-primary-600 dark:text-primary-400">
      SMEAI
    </a>

    <!-- Desktop nav (hidden on mobile) -->
    <ul class="hidden md:flex items-center gap-6 text-sm font-medium">
      <li><a href="/" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</a></li>
      <li><a href="/articles" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Articles</a></li>
      <li><a href="/showcase" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Showcase</a></li>
      <li><a href="/contact" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a></li>
    </ul>

    <div class="flex items-center gap-2">
      <!-- Theme toggle -->
      <!-- Hamburger (mobile only) -->
      <button id="menu-toggle" class="md:hidden p-2" aria-label="Open menu">
        <svg class="w-6 h-6" ...><!-- hamburger icon --></svg>
      </button>
    </div>
  </nav>
</header>

<script>
  let lastScrollY = window.scrollY;
  let ticking = false;
  const header = document.getElementById('site-header');

  function updateHeader() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // Scrolling down & past threshold -- hide header
      header?.classList.add('-translate-y-full');
    } else {
      // Scrolling up -- show header
      header?.classList.remove('-translate-y-full');
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
</script>
```

**Why JS, not CSS-only:** The CSS scroll-driven animation approach (`@container style(--scroll-direction)`) works only in Chromium browsers. Safari and Firefox do not support it. The JS approach with `requestAnimationFrame` throttling is performant and works in all browsers.

**Source:** [Medium: Hide header on scroll](https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c) | [W3Schools: Hide navbar on scroll](https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp)

### Pattern 5: Hamburger Menu (Minimal JS)

**What:** Mobile hamburger menu with an overlay. Uses minimal JS for toggling -- just adding/removing a CSS class.
**When to use:** Mobile viewport (below `md:` breakpoint).

```astro
---
// src/components/common/MobileNav.astro
---
<div
  id="mobile-nav"
  class="fixed inset-0 z-40 bg-surface-50/98 dark:bg-surface-950/98 backdrop-blur-sm transform translate-x-full transition-transform duration-300 md:hidden"
>
  <nav class="flex flex-col items-center justify-center h-full gap-8 text-lg font-medium">
    <a href="/" class="hover:text-primary-600 transition-colors" data-nav-link>Home</a>
    <a href="/articles" class="hover:text-primary-600 transition-colors" data-nav-link>Articles</a>
    <a href="/showcase" class="hover:text-primary-600 transition-colors" data-nav-link>Showcase</a>
    <a href="/contact" class="hover:text-primary-600 transition-colors" data-nav-link>Contact</a>

    <!-- Contact links in mobile menu -->
    <div class="flex gap-4 mt-8 pt-8 border-t border-surface-200 dark:border-surface-800">
      <a href="https://line.me/ti/p/~LINE_ID" class="flex items-center gap-2 text-primary-600">
        <!-- LINE icon --> LINE
      </a>
      <a href="mailto:EMAIL" class="flex items-center gap-2 text-primary-600">
        <!-- Email icon --> Email
      </a>
    </div>
  </nav>
</div>

<script>
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  menuToggle?.addEventListener('click', () => {
    mobileNav?.classList.toggle('translate-x-full');
    mobileNav?.classList.toggle('translate-x-0');
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.add('translate-x-full');
      mobileNav?.classList.remove('translate-x-0');
    });
  });
</script>
```

### Anti-Patterns to Avoid

- **Using `@astrojs/tailwind` integration:** Deprecated for Tailwind v4. Use `@tailwindcss/vite` plugin in `astro.config.mjs` instead.
- **Creating `tailwind.config.js`:** Tailwind v4 is CSS-first. All config goes in `global.css` via `@theme`.
- **Using `client:load` on static components:** Header, footer, nav are pure `.astro` components. They ship zero JS to the client (the small scripts use `<script>` tags which Astro handles natively).
- **Loading fonts from Google Fonts CDN:** Adds 100-300ms latency + privacy concern + Thai ISPs sometimes throttle Google CDN. Use Fontsource self-hosted.
- **Installing `@astrojs/cloudflare` adapter:** Not needed for static sites. Astro builds to pure HTML by default. The adapter is only for SSR.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading + subsetting | Custom @font-face + manual subsetting | @fontsource-variable/* packages | Handles font-face declarations, subsetting, format negotiation. One import line. |
| CSS utility framework | Custom CSS system or plain CSS | Tailwind CSS v4 via @tailwindcss/vite | Design tokens, responsive utilities, dark mode, typography plugin -- all declarative in CSS. |
| Analytics beacon | Custom tracking or GA4 (requires cookie consent) | Cloudflare Web Analytics (auto-injected for Pages) | Zero config for Pages projects. Cookieless = no PDPA consent banner needed. |
| Dark mode persistence | Custom cookie/session storage | localStorage + `is:inline` script in `<head>` | 5 lines of inline JS. Prevents FOUC. Respects system preference as fallback. |
| Scroll-direction detection | Custom scroll event math | requestAnimationFrame-throttled scroll listener | 15 lines of JS. Smooth 60fps. No library needed. |

**Key insight:** Phase 1 has very little custom logic. The value is in correctly configuring and connecting well-tested tools, not building custom solutions.

---

## Common Pitfalls

### Pitfall 1: Tailwind v3 Config File in a v4 Project

**What goes wrong:** Creating a `tailwind.config.js` or `tailwind.config.mjs` file. Tailwind v4 ignores it entirely. Developers spend time debugging why their custom colors don't work.
**Why it happens:** Most tutorials online still reference v3. Tailwind v4 was released January 2025, so much content is outdated.
**How to avoid:** All customization goes in `global.css` using `@theme {}`. No config file exists.
**Warning signs:** Custom classes like `bg-primary-500` don't work despite being defined in config.

### Pitfall 2: Wrong Fontsource Package Name

**What goes wrong:** Installing `@fontsource/inter` (static) when you want `@fontsource-variable/inter` (variable), or vice versa. The CSS font-family names are different.
**Why it happens:** Fontsource has two package namespaces: `@fontsource/*` (static weights) and `@fontsource-variable/*` (variable fonts). Easy to mix up.
**How to avoid:** Use variable packages consistently. Font family names: `'Noto Sans Thai Variable'` and `'Inter Variable'` (with the word "Variable" in the name).
**Warning signs:** Fonts load in dev but look wrong or use wrong weights.

### Pitfall 3: Flash of Unstyled Content (FOUC) on Dark Mode

**What goes wrong:** Page flashes white then goes dark (or vice versa) on load because the dark mode script runs after the initial render.
**Why it happens:** Dark mode toggle script is bundled by Astro and loaded after HTML renders.
**How to avoid:** Use `<script is:inline>` in the `<head>` of BaseLayout.astro. The `is:inline` directive prevents Astro from bundling/deferring the script.
**Warning signs:** Visible flash of wrong theme on page load, especially on slow connections.

### Pitfall 4: Cloudflare Pages Default Node.js Version Too Old

**What goes wrong:** Build fails on Cloudflare Pages because the default Node.js version is too old for Astro 5.
**Why it happens:** Cloudflare Pages v2 build image defaults to Node.js 18.17.1. Astro 5 requires Node.js 18.17.1+ so this barely works, but some dependencies may need newer versions. The v3 build image defaults to Node.js 22.16.0.
**How to avoid:** Add a `.nvmrc` file to the project root with `20` (or `22`) to explicitly set the Node.js version. Or set `NODE_VERSION=20` environment variable in Cloudflare Pages dashboard.
**Warning signs:** Build errors mentioning unsupported Node.js features or engine requirements.

### Pitfall 5: Thai Text Line Breaking Issues

**What goes wrong:** Thai text breaks mid-word at line ends, creating unreadable text. Thai has no spaces between words, so the browser cannot determine word boundaries without dictionary-based segmentation.
**Why it happens:** CSS `word-break: break-all` breaks anywhere. Thai needs the browser's built-in Thai word segmentation (which all modern browsers support for Thai).
**How to avoid:** Set `lang="th"` on the `<html>` element. Do NOT set `word-break: break-all`. The browser's default behavior with `lang="th"` handles Thai line-breaking correctly. Use `overflow-wrap: break-word` as a safety net for long URLs or English words mixed in Thai text.
**Warning signs:** Words split at random positions in Thai text blocks.

### Pitfall 6: Missing `og:locale` for Thai Content

**What goes wrong:** Sharing links on LINE or Facebook shows garbled Thai text or missing metadata.
**Why it happens:** Without `og:locale="th_TH"`, social platforms may misinterpret the encoding or language of the page.
**How to avoid:** Add `<meta property="og:locale" content="th_TH" />` in the BaseLayout head.
**Warning signs:** Social previews show wrong characters or missing Thai title/description.

---

## Code Examples

### Complete `astro.config.mjs`

```javascript
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://smeai.dev', // Replace with actual domain
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Note:** No Cloudflare adapter needed. Astro defaults to static output. No `tailwind.config.js` needed.

### Complete `global.css` with Thai Typography

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */

@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Class-based dark mode toggle */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* === Color System: Blue-based trust palette with warm accents === */
  /* Primary: Blue (trust, technology) */
  --color-primary-50: oklch(0.97 0.01 240);
  --color-primary-100: oklch(0.93 0.03 240);
  --color-primary-200: oklch(0.87 0.06 240);
  --color-primary-300: oklch(0.78 0.10 240);
  --color-primary-400: oklch(0.68 0.14 240);
  --color-primary-500: oklch(0.55 0.18 240);
  --color-primary-600: oklch(0.47 0.18 240);
  --color-primary-700: oklch(0.40 0.16 240);
  --color-primary-800: oklch(0.33 0.13 240);
  --color-primary-900: oklch(0.27 0.10 240);
  --color-primary-950: oklch(0.20 0.08 240);

  /* Accent: Warm amber/orange */
  --color-accent-50: oklch(0.97 0.02 75);
  --color-accent-100: oklch(0.93 0.04 70);
  --color-accent-200: oklch(0.87 0.08 65);
  --color-accent-300: oklch(0.78 0.12 55);
  --color-accent-400: oklch(0.70 0.15 45);
  --color-accent-500: oklch(0.62 0.17 40);
  --color-accent-600: oklch(0.55 0.17 35);

  /* Surface: Warm-tinted neutrals (not cold gray) */
  --color-surface-50: oklch(0.985 0.004 80);
  --color-surface-100: oklch(0.965 0.005 80);
  --color-surface-200: oklch(0.925 0.007 80);
  --color-surface-300: oklch(0.87 0.010 75);
  --color-surface-400: oklch(0.70 0.012 70);
  --color-surface-500: oklch(0.55 0.012 65);
  --color-surface-600: oklch(0.45 0.012 65);
  --color-surface-700: oklch(0.37 0.010 70);
  --color-surface-800: oklch(0.27 0.010 75);
  --color-surface-900: oklch(0.20 0.008 80);
  --color-surface-950: oklch(0.14 0.006 80);

  /* === Typography === */
  --font-sans: 'Noto Sans Thai Variable', 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  --font-heading: 'Noto Sans Thai Variable', 'Inter Variable', ui-sans-serif, sans-serif;

  /* === Spacing (Tailwind default: 0.25rem) === */
  --spacing: 0.25rem;

  /* === Border radius (rounded, approachable) === */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
}

/* === Thai Typography Base Styles === */
@layer base {
  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    line-height: 1.8;                     /* Thai text needs taller line-height */
    overflow-wrap: break-word;             /* Safety net for long URLs in Thai content */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Headings: tighter line-height than body, bold weight */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.4;                     /* Headings can be tighter than body */
    letter-spacing: -0.01em;              /* Slight tightening for headings */
  }

  /* Prose content container */
  .prose-container {
    max-width: 65ch;
    margin-inline: auto;
    padding-inline: 1rem;
  }
}

/* === Prose customization for Thai content === */
@layer components {
  .prose {
    --tw-prose-body: var(--color-surface-800);
    --tw-prose-headings: var(--color-surface-900);
    --tw-prose-links: var(--color-primary-600);
    line-height: 1.8;
  }

  .dark .prose {
    --tw-prose-body: var(--color-surface-200);
    --tw-prose-headings: var(--color-surface-100);
    --tw-prose-links: var(--color-primary-400);
  }
}
```

### Thai Typography Values (Recommended)

| Property | Value | Rationale |
|----------|-------|-----------|
| `line-height` (body) | `1.8` | Thai characters have taller ascenders (vowels above) and descenders (vowels/tones below) than Latin. 1.6 causes overlapping diacritics. 1.8 provides comfortable reading. |
| `line-height` (headings) | `1.4` | Headings are shorter, so slightly tighter is acceptable. Still roomier than Latin defaults. |
| `overflow-wrap` | `break-word` | Safety net for long English URLs or technical terms mixed into Thai text. |
| `word-break` | DO NOT SET | Browser default with `lang="th"` on `<html>` handles Thai word segmentation correctly using dictionary lookup. Setting `break-all` breaks Thai text randomly. |
| `letter-spacing` (body) | `normal` (default) | Thai script has combining marks; letter-spacing can split marks from base characters. Do not adjust. |
| `letter-spacing` (headings) | `-0.01em` | Very slight tightening improves visual density for large heading text. Safe for Thai. |
| `font-display` | `swap` | Fontsource defaults to `swap`. Text renders immediately with system font, then swaps to custom font when loaded. Prevents invisible text (FOIT). |
| `lang` attribute | `th` | Required on `<html>`. Tells the browser to use Thai text segmentation rules for line breaking. |

**Source:** [W3C Thai Script Resources](https://www.w3.org/International/sealreq/thai/) | [MDN: Wrapping and breaking text](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Text/Wrapping_breaking_text)

### `biome.json` Configuration

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "html": {
    "experimentalFullSupportEnabled": true
  },
  "files": {
    "ignore": ["dist/", "node_modules/", ".astro/"]
  }
}
```

**Source:** [Biome v2.3 Astro support](https://biomejs.dev/blog/biome-v2-3/)

### Cloudflare Pages Deployment Setup

**No adapter needed for static sites.** Astro builds to `dist/` by default.

1. Push code to GitHub
2. In Cloudflare dashboard: Workers & Pages > Create > Pages > Import Git repository
3. Build settings:

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Node.js version | Set `NODE_VERSION=20` env var or add `.nvmrc` with `20` |

4. Enable Web Analytics: Workers & Pages > [project] > Metrics > Enable
   - Cloudflare auto-injects the beacon script. No manual snippet needed.

**`.nvmrc` file (project root):**
```
20
```

**Source:** [Astro Cloudflare Deploy Guide](https://docs.astro.build/en/guides/deploy/cloudflare/) | [Cloudflare Pages Astro Guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) | [Cloudflare Pages Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/)

### Contact Links Component

```astro
---
// src/components/common/ContactLinks.astro
interface Props {
  variant?: 'compact' | 'full';
}

const { variant = 'compact' } = Astro.props;
const LINE_URL = 'https://line.me/ti/p/~LINE_ID_HERE';
const EMAIL = 'mailto:contact@smeai.dev';
---

{variant === 'compact' ? (
  <!-- Icons only (for header) -->
  <div class="flex items-center gap-3">
    <a href={LINE_URL} target="_blank" rel="noopener" aria-label="Contact via LINE"
       class="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors">
      <!-- LINE SVG icon, 20x20 -->
    </a>
    <a href={EMAIL} aria-label="Send email"
       class="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors">
      <!-- Email SVG icon, 20x20 -->
    </a>
  </div>
) : (
  <!-- Icons + text (for footer) -->
  <div class="flex flex-col sm:flex-row items-center gap-4 text-sm">
    <a href={LINE_URL} target="_blank" rel="noopener"
       class="flex items-center gap-2 text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">
      <!-- LINE icon --> <span>LINE: @smeai</span>
    </a>
    <a href={EMAIL}
       class="flex items-center gap-2 text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">
      <!-- Email icon --> <span>contact@smeai.dev</span>
    </a>
  </div>
)}
```

**Placement recommendation (Claude's Discretion):** Contact links should appear in BOTH header (compact/icons-only) and footer (full with text). Lead generation best practice: every page should have visible contact without scrolling on mobile. The header provides immediate access; the footer provides it again at the end of content consumption.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JS config) | `@theme {}` in CSS file | Tailwind v4, Jan 2025 | No config file. All tokens in CSS. |
| `@tailwindcss/postcss` plugin | `@tailwindcss/vite` plugin | Tailwind v4 | Direct Vite integration, faster builds |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` in `astro.config.mjs` | Astro 5.2+, Jan 2025 | Old integration deprecated |
| `@import tailwindcss/base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 | Single import replaces three |
| `require()` plugin in config | `@plugin "@tailwindcss/typography"` | Tailwind v4 | Plugins declared in CSS |
| `darkMode: 'class'` in config | `@custom-variant dark (...)` in CSS | Tailwind v4 | CSS-first variant definition |
| Static font files per weight | Variable font single file | Fontsource variable packages | Smaller total size for 2+ weights |
| Cloudflare Pages v1 build image (Node 12) | v2 (Node 18) / v3 (Node 22) | 2024-2025 | Modern Node.js, faster builds |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Do not use with Tailwind v4. Replaced by `@tailwindcss/vite`.
- `tailwind.config.js` / `tailwind.config.mjs`: Not used in Tailwind v4. All config is CSS-first.
- Google Fonts CDN for Noto Sans Thai: Replaced by Fontsource self-hosting. Faster, private, reliable.

---

## Open Questions

1. **Exact OKLCH color values for the blue palette**
   - What we know: Blue-based palette in OKLCH format, warm accents (amber/orange). Tailwind v4 uses OKLCH by default.
   - What's unclear: The exact lightness/chroma values need visual testing in the browser. OKLCH is perceptually uniform, so the values in the code examples above are reasonable starting points but should be tuned visually.
   - Recommendation: Start with the values provided, tune during implementation by viewing the actual rendered output. OKLCH values are easy to adjust in the CSS file.

2. **LINE Official Account ID**
   - What we know: LINE is the primary contact channel. LINE deep link format: `https://line.me/ti/p/~LINE_ID`.
   - What's unclear: Whether Ohm has a LINE Official Account or will use a personal LINE ID.
   - Recommendation: Use a placeholder `LINE_ID_HERE` in code. User should create a LINE Official Account (free tier) for professional presentation, auto-reply, and analytics. Personal LINE ID works as fallback.

3. **Custom domain setup**
   - What we know: Cloudflare Pages supports custom domains. The `site` field in `astro.config.mjs` should be the final domain.
   - What's unclear: What domain will be used (smeai.dev? smeai.co.th? other?).
   - Recommendation: Use a placeholder domain in config. Custom domain is added in Cloudflare Pages dashboard after initial deployment. Works with both Cloudflare-registered and external domains.

4. **Biome v2.3+ Astro support stability**
   - What we know: Biome v2.3 added experimental Astro file support (format + lint JS/CSS/HTML in `.astro` files). Requires `experimentalFullSupportEnabled: true`.
   - What's unclear: How stable this is in practice -- edge cases with Astro-specific syntax may cause issues.
   - Recommendation: Enable it. If formatting produces unexpected results in `.astro` files, the fallback is to exclude `.astro` from Biome and format them manually. The JS/CSS linting in frontmatter/style blocks is likely stable.

---

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Astro Installation Guide](https://tailwindcss.com/docs/installation/framework-guides/astro) -- Official setup steps
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- @theme syntax, namespaces, examples
- [Tailwind CSS v4 Dark Mode](https://tailwindcss.com/docs/dark-mode) -- @custom-variant dark mode setup
- [Fontsource: Noto Sans Thai Install](https://fontsource.org/fonts/noto-sans-thai/install) -- Variable font import, weights 100-900
- [Fontsource: Inter Install](https://fontsource.org/fonts/inter/install) -- Variable font import
- [Astro: Deploy to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/) -- Static deploy, no adapter needed
- [Cloudflare Pages: Deploy Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) -- Build settings
- [Cloudflare Pages: Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/) -- Auto-injection for Pages
- [Cloudflare Pages: Build Image](https://developers.cloudflare.com/pages/configuration/build-image/) -- Node.js versions (v2: 18.17.1, v3: 22.16.0)
- [Astro: Using Custom Fonts](https://docs.astro.build/en/guides/fonts/) -- Fontsource integration
- [Biome v2.3 Blog Post](https://biomejs.dev/blog/biome-v2-3/) -- Astro file support (experimental)
- [W3C Thai Script Resources](https://www.w3.org/International/sealreq/thai/) -- Thai text layout requirements

### Secondary (MEDIUM confidence)
- [Tailkits: Astro Tailwind Setup 2026](https://tailkits.com/blog/astro-tailwind-setup/) -- Verified setup guide
- [MDN: Wrapping and breaking text](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Text/Wrapping_breaking_text) -- Thai text CSS properties
- [Medium: Hide header on scroll](https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c) -- Scroll-away header pattern
- [Bram.us: CSS Scroll-Driven Animations header](https://www.bram.us/2024/09/29/solved-by-css-scroll-driven-animations-hide-a-header-when-scrolling-up-show-it-again-when-scrolling-down/) -- CSS-only approach (Chromium-only)

### Tertiary (LOW confidence)
- None -- all findings verified with primary or secondary sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified against official docs and npm
- Architecture patterns: HIGH -- Tailwind v4 @theme syntax verified from official docs, font loading verified from Fontsource
- Thai typography: MEDIUM-HIGH -- line-height and word-break values based on W3C Thai script docs and practical experience. Thai-specific CSS standards are still being formalized by W3C.
- Dark mode: HIGH -- @custom-variant syntax verified from official Tailwind docs
- Cloudflare deployment: HIGH -- verified from both Astro and Cloudflare official docs
- Pitfalls: HIGH -- verified against multiple sources

**Research date:** 2026-02-18
**Valid until:** 2026-04-18 (60 days -- Tailwind v4 and Astro 5 are stable, no breaking changes expected)
