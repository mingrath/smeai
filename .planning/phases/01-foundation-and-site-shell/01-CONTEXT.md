# Phase 1: Foundation & Site Shell - Context

**Gathered:** 2026-02-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Deployable site skeleton on Cloudflare Pages with base layout, Thai typography, mobile-first responsive design, CI/CD pipeline from GitHub, Cloudflare Analytics, and persistent contact links (LINE, email) accessible from every page. No content pages yet -- just the shell that all future phases build on.

</domain>

<decisions>
## Implementation Decisions

### Visual Design Direction
- Warm & approachable aesthetic -- soft colors, rounded elements, friendly feel
- Blue-based color palette (conveys trust and technology) with warm accents
- Light mode as default with a dark mode toggle available
- Personal/relatable tone, not corporate -- the design should feel like a knowledgeable friend, not a consulting firm

### Navigation & Layout Structure
- 4 top-level nav items: Home, Articles, Showcase, Contact
- Hamburger menu on mobile (top header)
- Header scrolls away on scroll (not sticky) -- gives more reading space on mobile
- Minimal footer: logo, copyright, social links -- single line or very compact

### Thai Typography & Spacing
- Primary Thai font: Noto Sans Thai (self-hosted via Fontsource)
- English/UI font: Inter (self-hosted via Fontsource)
- Body text: 16px standard
- Headings: Same font (Noto Sans Thai Bold 700), body at Regular 400
- Content width: narrow (65ch) -- optimal reading line length, centered with generous margins
- Thai-appropriate line-height (1.8+ for body text due to taller ascenders/descenders)

### Contact Links Placement
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

</decisions>

<specifics>
## Specific Ideas

No specific site references provided -- open to whatever fits the warm + blue + approachable direction. Should feel like a knowledgeable Thai friend sharing AI knowledge, not a corporate consulting pitch.

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-and-site-shell*
*Context gathered: 2026-02-18*
