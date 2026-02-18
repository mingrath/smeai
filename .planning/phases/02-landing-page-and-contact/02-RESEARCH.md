# Phase 2: Landing Page & Contact - Research

**Researched:** 2026-02-18
**Domain:** Astro static pages, Thai-language landing page design, contact patterns
**Confidence:** HIGH

## Summary

This phase converts the placeholder `index.astro` into a multi-section landing page and adds a `/contact` page. The existing codebase (Astro 5.17.2, Tailwind v4, Noto Sans Thai, dark mode, header/footer/mobile-nav) provides a solid foundation. No new dependencies are needed -- Astro's built-in `<Image />` component handles image optimization, and all styling uses existing Tailwind v4 design tokens (primary-*, accent-*, surface-*).

The homepage needs a hero section, an about/story section, a services overview, and a CTA. The contact page is simple: direct links to LINE, email, and phone. No contact form is required. The Thai copy should be warm and practitioner-oriented -- positioning Ohm as a knowledgeable friend who happens to be both a vet and an AI expert, not as a faceless corporation.

**Primary recommendation:** Build the homepage as a single `index.astro` page that imports discrete section components (Hero, About, Services, CTA) from `src/components/landing/`. Add a standalone `src/pages/contact.astro` page. Use `<Image />` from `astro:assets` for Ohm's photo with `layout="constrained"`. All copy in Thai.

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 5.17.2 | Static site framework | Already installed; provides `<Image />` and `<Picture />` built-in |
| tailwindcss | 4.1.18 | Utility CSS | Already installed via Vite plugin; all design tokens defined |
| @fontsource-variable/noto-sans-thai | 5.2.8 | Thai font | Already imported in BaseLayout |
| @fontsource-variable/inter | 5.2.8 | Latin font | Already imported in BaseLayout |

### Supporting (Already Installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/typography | 0.5.19 | Prose styling | For the about section's narrative text |
| @astrojs/preact | 4.1.3 | Interactive components | Only if any section needs client-side interactivity (unlikely for this phase) |

### No New Dependencies Needed

No additional packages required. Astro's built-in image optimization (stable since 5.10) handles responsive images natively. Tailwind v4 handles all styling. Icons use inline SVGs (Heroicons pattern already established in Header/ContactLinks).

**Installation:** None required.

## Architecture Patterns

### Recommended Component Structure

```
src/
├── assets/
│   └── images/
│       └── ohm-profile.jpg       # Ohm's photo (processed by Astro Image)
├── components/
│   ├── common/                    # existing: Header, Footer, ContactLinks, etc.
│   └── landing/                   # NEW: homepage section components
│       ├── Hero.astro
│       ├── About.astro
│       ├── Services.astro
│       └── CallToAction.astro
├── pages/
│   ├── index.astro                # MODIFY: multi-section homepage
│   └── contact.astro              # NEW: contact information page
└── styles/
    └── global.css                 # existing (no changes needed)
```

### Pattern 1: Multi-Section Homepage in Astro

**What:** The homepage (`index.astro`) imports and composes section components. Each section is a self-contained `.astro` file with its own markup and scoped styles. Data (copy text) lives directly in the component -- no need for content collections for static marketing pages.

**When to use:** Landing pages with 3-6 distinct visual sections.

**Example:**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/landing/Hero.astro';
import About from '../components/landing/About.astro';
import Services from '../components/landing/Services.astro';
import CallToAction from '../components/landing/CallToAction.astro';
---
<BaseLayout title="Home">
  <Hero />
  <About />
  <Services />
  <CallToAction />
</BaseLayout>
```

**Key detail:** Each section component manages its own `<section>` tag with appropriate `id` for anchor linking (e.g., `id="about"`, `id="services"`). Padding/spacing is handled per-section, not in the page.

### Pattern 2: Section Component Internal Structure

**What:** Each section follows a consistent container pattern using the site's `max-w-5xl` constraint (matching Header's nav container).

**Example:**

```astro
---
// src/components/landing/Hero.astro
---
<section class="py-20 md:py-28">
  <div class="max-w-5xl mx-auto px-4">
    <!-- Section content here -->
  </div>
</section>
```

**Why `max-w-5xl`:** The Header already uses `max-w-5xl mx-auto px-4`. All page sections should match this container width for visual alignment. Do NOT use `prose-container` (65ch max) for landing sections -- that is too narrow. Reserve `prose-container` for article body text only.

### Pattern 3: Image Handling with astro:assets

**What:** Use Astro's built-in `<Image />` component for Ohm's profile photo. Store in `src/assets/images/` so Astro can optimize it (WebP conversion, responsive srcset generation).

**When to use:** Any image that should be optimized at build time.

**Example:**

```astro
---
import { Image } from 'astro:assets';
import ohmPhoto from '../../assets/images/ohm-profile.jpg';
---

<Image
  src={ohmPhoto}
  alt="โอม - มิ่งรัฐ เมฆวิชัย"
  width={400}
  height={400}
  class="rounded-2xl"
  loading="lazy"
/>
```

**Important notes:**
- Store in `src/assets/images/`, NOT `public/`. Files in `src/` get optimized (format conversion, resizing). Files in `public/` are served as-is.
- Width/height are auto-inferred from local imports but specifying them controls the output size.
- The `layout` property is available (stable since Astro 5.10) for responsive behavior. For a profile photo, use `layout="constrained"` with a max width.
- For the hero background/illustration (if used), consider `layout="full-width"`.
- Use `priority` prop (sets `loading="eager"` + `fetchpriority="high"`) for above-the-fold hero images. Use default lazy loading for below-fold images like the about section photo.

### Pattern 4: Responsive Image (Stable in Astro 5.10+)

**What:** The `layout` property on `<Image />` auto-generates `srcset` and `sizes` attributes.

**Configuration (optional, for global defaults):**

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    responsiveStyles: true,  // enables CSS for responsive images
    // layout: 'constrained',  // optional global default
  },
});
```

**Per-component usage:**

```astro
<Image
  src={ohmPhoto}
  alt="โอม"
  width={400}
  height={400}
  layout="constrained"
  fit="cover"
  position="center top"
/>
```

Layout options:
- `constrained` -- scales down to fit container, won't scale up beyond specified width. Best for profile photos.
- `full-width` -- scales to fill container width. Best for hero banners.
- `fixed` -- maintains exact dimensions. Rarely needed for responsive sites.

### Anti-Patterns to Avoid

- **Using `public/` for optimizable images:** Putting Ohm's photo in `public/` means no optimization. Always use `src/assets/` for images that should be WebP-converted and resized.
- **Using `prose-container` for landing sections:** The `prose-container` class limits width to 65ch (~580px). Landing page sections need `max-w-5xl` (1024px) for proper visual breathing room.
- **Client-side JavaScript for static content:** This phase has zero interactive elements. Every component should be `.astro` files (zero JS shipped). Do not use Preact components for static sections.
- **Hardcoding contact info in multiple places:** Contact details (LINE URL, email, phone) should be defined in one place and imported. The existing `ContactLinks.astro` already does this for LINE and email. Extend it or create a shared constants file rather than scattering raw strings.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manual WebP conversion, srcset | `<Image />` from `astro:assets` | Handles format conversion, responsive srcset, lazy loading automatically |
| Responsive images | Manual `<picture>` with sources | `<Image layout="constrained" />` | Auto-generates srcset/sizes based on layout type |
| Dark mode styling | Custom dark mode toggle logic | Existing `ThemeToggle.astro` + Tailwind `dark:` variants | Already implemented in Phase 1 |
| Contact link components | New contact components | Extend existing `ContactLinks.astro` | Already has LINE/email with compact/full variants |
| Thai font rendering | Custom font loading | Existing `@fontsource-variable/noto-sans-thai` | Already configured with proper line-height (1.8) |

**Key insight:** Phase 1 already solved the hard infrastructure problems (dark mode, Thai fonts, responsive header, scroll behavior). This phase is pure content and composition -- no new systems to build.

## Common Pitfalls

### Pitfall 1: Thai Text Line Length in Hero

**What goes wrong:** Thai text in large font sizes on wide screens becomes a single unreadable wall of text, or conversely, breaks awkwardly on mobile.
**Why it happens:** Thai has no word boundaries (no spaces between words), making line breaks unpredictable. CSS `word-break` and `overflow-wrap` don't help with Thai.
**How to avoid:** Keep hero headline SHORT (under 20 Thai characters if possible). Use explicit `<br>` tags or separate elements for controlled line breaks. The subheadline can be longer but should be constrained with `max-w-2xl` or similar.
**Warning signs:** Text reflowing oddly on resize, single-line hero text on desktop becoming 4+ lines on mobile.

### Pitfall 2: Image Aspect Ratio and Layout Shift

**What goes wrong:** Profile photo causes layout shift (CLS) when loading because dimensions aren't reserved.
**Why it happens:** Not specifying width/height, or using CSS that overrides the intrinsic aspect ratio.
**How to avoid:** Always specify `width` and `height` on `<Image />`. Astro auto-infers these from local imports, but explicit values are clearer. Use `layout="constrained"` to let it scale down gracefully.
**Warning signs:** Content jumping when images load, low CLS score in Lighthouse.

### Pitfall 3: Contact Links Not Working on Desktop

**What goes wrong:** `tel:` links open a useless popup on desktop browsers. LINE deep links (`line.me/ti/p/~username`) only work on mobile or redirect to QR code on desktop.
**Why it happens:** `tel:` and LINE URL schemes are mobile-native. Desktop behavior varies by browser/OS.
**How to avoid:** For the phone number, display it as selectable text with a `tel:` link -- on desktop users can copy it, on mobile it dials. For LINE, the `https://line.me/ti/p/~mingrath` format works: on mobile it opens LINE, on desktop it shows a QR code page. This is acceptable behavior. Consider showing the LINE ID as copyable text alongside the link.
**Warning signs:** Users on desktop clicking LINE and getting confused.

### Pitfall 4: Hero CTA Leading Nowhere

**What goes wrong:** Hero section has a "Contact" CTA button but there's nothing to scroll to or navigate to yet.
**Why it happens:** Building hero before contact page exists.
**How to avoid:** Implement the contact page first (or simultaneously). Hero CTA should link to `/contact`. Secondary CTA can use anchor `#about` to scroll to the about section.
**Warning signs:** Broken links, buttons that go nowhere.

### Pitfall 5: Dark Mode Contrast Issues with Custom Colors

**What goes wrong:** Text becomes invisible or hard to read in dark mode because sections use custom background colors that clash with the dark mode surface colors.
**Why it happens:** Using `bg-primary-*` or `bg-accent-*` backgrounds without checking dark mode contrast.
**How to avoid:** Stick to the surface color palette for backgrounds. Use primary/accent colors only for text highlights, borders, and small accents. Test every section in both light and dark mode.
**Warning signs:** Text disappearing when toggling dark mode.

## Code Examples

### Hero Section Structure

```astro
---
// src/components/landing/Hero.astro
---
<section class="py-20 md:py-28">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h1 class="text-3xl md:text-5xl font-bold text-surface-900 dark:text-surface-100 leading-tight mb-6">
      <!-- Thai headline: short, benefit-focused -->
      นำ AI มาใช้ในธุรกิจ<br class="hidden md:block" />อย่างคุ้มค่าและได้ผลจริง
    </h1>
    <p class="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
      <!-- Subheadline: who this is for + what they get -->
      ช่วย SME ไทยเริ่มใช้ AI ตั้งแต่ก้าวแรก ไม่ต้องเขียนโค้ด ไม่ต้องจ้างทีม IT
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/contact"
        class="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
      >
        ปรึกษาฟรี
      </a>
      <a
        href="#about"
        class="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-surface-300 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-semibold hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
      >
        รู้จักเรา
      </a>
    </div>
  </div>
</section>
```

**Design notes:**
- `text-center` for hero is standard for solo consultant pages
- `max-w-2xl` on subheadline prevents overly long lines
- `<br class="hidden md:block" />` creates a controlled line break on desktop only
- Two CTAs: primary (filled, links to `/contact`) and secondary (outlined, anchor to `#about`)
- Uses existing design tokens: `primary-600`, `surface-*`

### About Section with Photo

```astro
---
// src/components/landing/About.astro
import { Image } from 'astro:assets';
import ohmPhoto from '../../assets/images/ohm-profile.jpg';
---
<section id="about" class="py-16 md:py-24 bg-surface-100 dark:bg-surface-900">
  <div class="max-w-5xl mx-auto px-4">
    <div class="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
      <!-- Photo: 2 columns on md+ -->
      <div class="md:col-span-2 flex justify-center">
        <Image
          src={ohmPhoto}
          alt="โอม - มิ่งรัฐ เมฆวิชัย"
          width={400}
          height={400}
          class="rounded-2xl shadow-lg w-full max-w-xs"
          loading="lazy"
        />
      </div>
      <!-- Story: 3 columns on md+ -->
      <div class="md:col-span-3">
        <h2 class="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-6">
          จากสัตวแพทย์สู่ AI
        </h2>
        <div class="space-y-4 text-surface-700 dark:text-surface-300 leading-relaxed">
          <p>
            สวัสดีครับ ผมโอม สัตวแพทย์จุฬาฯ ที่หลงใหลเทคโนโลยี
            <!-- Story continues: Origin, Turning Point, How I Help -->
          </p>
          <p>
            <!-- Second paragraph: empathy + practical value -->
          </p>
        </div>
        <a
          href="https://mingrath.github.io"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-6 text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          ดูผลงานของผม
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

**Design notes:**
- Alternating background (`bg-surface-100` / `dark:bg-surface-900`) creates visual separation
- 2/3 grid split: photo is smaller, story text gets more space
- Portfolio link uses external-link icon pattern
- `loading="lazy"` since this section is below the fold

### Contact Page

```astro
---
// src/pages/contact.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Contact" description="ติดต่อ SMEAI - LINE, อีเมล, โทรศัพท์">
  <section class="py-20 md:py-28">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl md:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-4 text-center">
        ติดต่อเรา
      </h1>
      <p class="text-lg text-surface-600 dark:text-surface-400 text-center mb-12 leading-relaxed">
        พร้อมตอบคำถามและให้คำปรึกษาเรื่อง AI สำหรับธุรกิจของคุณ
      </p>

      <div class="space-y-6">
        <!-- LINE (primary contact for Thai users) -->
        <a
          href="https://line.me/ti/p/~mingrath"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 p-6 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          <!-- LINE icon -->
          <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-[#06C755] flex items-center justify-center">
            <svg class="w-6 h-6 text-white"><!-- LINE logo SVG --></svg>
          </div>
          <div>
            <div class="font-semibold text-surface-900 dark:text-surface-100">LINE</div>
            <div class="text-surface-500 dark:text-surface-400">@mingrath</div>
          </div>
        </a>

        <!-- Email -->
        <a
          href="mailto:mingrath@gmail.com"
          class="flex items-center gap-4 p-6 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white"><!-- Email icon SVG --></svg>
          </div>
          <div>
            <div class="font-semibold text-surface-900 dark:text-surface-100">Email</div>
            <div class="text-surface-500 dark:text-surface-400">mingrath@gmail.com</div>
          </div>
        </a>

        <!-- Phone -->
        <a
          href="tel:+66658256965"
          class="flex items-center gap-4 p-6 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white"><!-- Phone icon SVG --></svg>
          </div>
          <div>
            <div class="font-semibold text-surface-900 dark:text-surface-100">Phone</div>
            <div class="text-surface-500 dark:text-surface-400">065-825-6965</div>
          </div>
        </a>
      </div>
    </div>
  </section>
</BaseLayout>
```

**Design notes:**
- Card-based layout for each contact method (large click targets, mobile-friendly)
- LINE first -- it is the dominant messaging platform in Thailand
- Phone number formatted Thai-style (065-825-6965) with `tel:+66658256965` international format in the href
- `max-w-2xl` keeps the contact cards centered and readable
- Each card has a colored icon block matching the service's brand color (LINE green: `#06C755`)

### Contact Info Constants Pattern

```typescript
// src/lib/contact.ts
export const CONTACT = {
  line: {
    id: 'mingrath',
    url: 'https://line.me/ti/p/~mingrath',
    display: '@mingrath',
  },
  email: {
    address: 'mingrath@gmail.com',
    url: 'mailto:mingrath@gmail.com',
  },
  phone: {
    number: '0658256965',
    url: 'tel:+66658256965',
    display: '065-825-6965',
  },
  portfolio: {
    url: 'https://mingrath.github.io',
    label: 'ดูผลงาน',
  },
  github: {
    username: 'mingrath',
    url: 'https://github.com/mingrath',
  },
} as const;
```

**Why:** Contact info appears in Header (ContactLinks compact), Footer (ContactLinks full), Contact page, About section, and CTA section. A single source of truth prevents inconsistency. Update `ContactLinks.astro` to import from this file.

## Hero Section: Thai Copywriting Guidance

### Value Proposition Formula for SMEAI

Based on landing page copywriting research, the hero must answer three questions in under 5 seconds:

1. **What is this?** -- AI consulting for Thai SMEs
2. **Who is it for?** -- Small/medium business owners in Thailand
3. **Why should I care?** -- Practical, affordable, no technical skills needed

### Headline Structure (Thai)

The headline should be **benefit-focused, not feature-focused**:

| Approach | Example | Quality |
|----------|---------|---------|
| Bad: vague | "AI สำหรับธุรกิจ" (AI for business) | Too generic |
| Bad: jargon | "โซลูชัน AI ครบวงจร" (Full-service AI solutions) | Corporate, alienating |
| Good: benefit | "นำ AI มาใช้ในธุรกิจ อย่างคุ้มค่าและได้ผลจริง" | Clear benefit, practical tone |
| Good: pain | "ไม่ต้องจ้างทีม IT เพื่อเริ่มใช้ AI" | Addresses cost objection directly |

### Subheadline Guidelines

- Expand on WHO this is for (SME owners specifically)
- Address the primary objection (it's expensive / I need a tech team / it's complicated)
- Keep under 2 lines on mobile

### Tone Guidelines

- **Warm, not corporate:** Use "ผม" (I/me, casual), not "เรา" (we, corporate) -- this is a personal brand
- **Practical, not hype:** Focus on "คุ้มค่า" (cost-effective), "ได้ผลจริง" (actually works), not "ปฏิวัติ" (revolutionary)
- **Approachable:** Write like explaining to a friend who owns a business, not presenting at a conference
- **Pain-aware:** Thai SME owners worry about cost and complexity. Address these directly.

## About Section: Story Structure

### Three-Part Career Pivot Narrative

Based on research on effective consultant storytelling:

1. **Origin (1 sentence):** "ผมเรียนจบสัตวแพทย์จากจุฬาฯ" -- establishes credibility and relatability
2. **Turning Point (1-2 sentences):** What made Ohm fall in love with AI/tech. Frame as a PULL toward something exciting, not a rejection of veterinary medicine. Example: fascination with how technology can solve problems more efficiently.
3. **Bridge to Value (2-3 sentences):** How this unique background helps clients. Veterinary training teaches systematic problem-solving, attention to detail, handling real-world complexity -- all transferable to AI implementation. End with: "I help SME owners understand and use AI without needing a tech degree."

### Trust Signals to Include

- Chulalongkorn University (top Thai university) -- immediate credibility
- Veterinary degree -- shows intellectual rigor and problem-solving ability
- Working with real businesses -- mention if there are case studies
- Link to portfolio/GitHub -- shows actual work

### Tone for About Section

- First person (ผม/I)
- Conversational, like a LinkedIn "About" section, not a resume
- Include a personal touch (why veterinary medicine, what sparked the AI interest)
- Photo is critical -- humanizes the brand

## Contact Page: Design Decisions

### LINE-First Contact Hierarchy for Thailand

In the Thai market, LINE is the dominant communication platform (over 54 million users in Thailand). Contact information should be ordered by Thai user preference:

1. **LINE** (primary) -- most Thai business conversations happen here
2. **Email** (secondary) -- for formal/international communication
3. **Phone** (tertiary) -- for urgent matters

### LINE Link Behavior

The URL `https://line.me/ti/p/~mingrath` (personal LINE ID format with tilde `~`):
- **Mobile (LINE installed):** Opens LINE app, shows "Add Friend" profile
- **Mobile (LINE not installed):** Redirects to app store
- **Desktop browser:** Shows a page with QR code that can be scanned

This is the correct format for personal LINE accounts. Official accounts use `@` prefix instead.

### Phone Number Format

- **Display:** `065-825-6965` (Thai format with dashes for readability)
- **href:** `tel:+66658256965` (international E.164 format, drop leading 0, add +66)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/image` package | Built-in `astro:assets` | Astro 3.0 (2023) | No extra dependency needed |
| Experimental responsive images | Stable `layout` prop on `<Image />` | Astro 5.10 (2025) | Auto srcset/sizes generation |
| Manual `<picture>` with sources | `<Picture />` component | Astro 3.3 (2023) | Multi-format output (avif+webp) |
| `experimentalLayout` config | `image.layout` config | Astro 5.10 (2025) | Remove `experimental` prefix |

**Deprecated/outdated:**
- `@astrojs/image` integration: Replaced by built-in `astro:assets` since Astro 3.0. Do not install it.
- `experimental.responsiveImages: true` config flag: Removed in 5.10. Use `image.responsiveStyles: true` instead.

## Open Questions

1. **Ohm's Profile Photo**
   - What we know: Need a photo for the about section; Astro Image handles optimization
   - What's unclear: The actual photo file does not yet exist in the repo. Need Ohm to provide one.
   - Recommendation: Use a placeholder (solid color div with initials "โอม") during development. Replace with actual photo when available. Keep the `<Image />` code ready.

2. **Portfolio Website URL**
   - What we know: GitHub username is `mingrath`, so portfolio is likely `https://mingrath.github.io`
   - What's unclear: Is this the correct URL? Is the portfolio site live?
   - Recommendation: Use `https://mingrath.github.io` as the link. Verify during implementation.

3. **Services/Features Section Content**
   - What we know: SMEAI offers AI consulting for Thai SMEs
   - What's unclear: What specific services to highlight (chatbot setup? workflow automation? data analysis? training?)
   - Recommendation: Use 3-4 generic but realistic service cards. The planner should include placeholder content that can be refined. Examples: "วางแผน AI สำหรับธุรกิจ" (AI planning), "สร้าง Chatbot" (Build chatbots), "วิเคราะห์ข้อมูล" (Data analysis), "อบรมทีม" (Team training).

4. **SEO Meta Tags**
   - What we know: BaseLayout already has `<meta name="description">` and `og:locale`
   - What's unclear: Should we add Open Graph image, Twitter card, structured data (Person/Organization schema)?
   - Recommendation: Add basic OG tags (title, description, image) to BaseLayout. Structured data can be deferred to a later phase.

## Sources

### Primary (HIGH confidence)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) -- Image component usage, local vs public, import syntax
- [Astro Image API Reference](https://docs.astro.build/en/reference/modules/astro-assets/) -- Full Image/Picture props, getImage()
- [Astro 5.10 Blog Post](https://astro.build/blog/astro-5100/) -- Stable responsive images, layout property
- Existing codebase inspection -- BaseLayout, Header, Footer, ContactLinks, global.css

### Secondary (MEDIUM confidence)
- [Julian Shapiro Landing Page Guide](https://www.julian.com/guide/startup/landing-pages) -- Hero structure, value proposition formula
- [Melisa Liberman Consulting Landing Page](https://www.melisaliberman.com/blog/consulting-landing-page) -- Solo consultant page patterns
- [LINE URL Scheme Docs](https://developers.line.biz/en/docs/line-login/using-line-url-scheme/) -- LINE deep link formats
- [LINE Personal ID Link Format](https://sleepyninja.net/2017/09/how-to-create-web-link-for-adding-line-friend/) -- `line.me/ti/p/~username` format for personal accounts

### Tertiary (LOW confidence)
- Thai SME AI market sizing -- not verified with official data
- Specific Thai copywriting examples -- based on general landing page principles applied to Thai context

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- verified against installed packages and Astro docs; no new deps needed
- Architecture: HIGH -- patterns verified against Astro docs and existing codebase conventions
- Image handling: HIGH -- verified against Astro 5.10+ docs, project runs 5.17.2
- Thai copywriting: MEDIUM -- based on general copywriting principles applied to Thai; no Thai-specific UX research found
- Contact page patterns: HIGH -- LINE URL scheme verified with official docs, tel: format is standard
- Pitfalls: MEDIUM -- based on practical experience patterns, verified where possible

**Research date:** 2026-02-18
**Valid until:** 2026-04-18 (stable stack, no fast-moving dependencies)
