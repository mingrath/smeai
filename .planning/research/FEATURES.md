# Feature Research

**Domain:** AI-for-SME Knowledge Hub & Consulting Lead Generator (Thai Market)
**Researched:** 2026-02-17
**Confidence:** MEDIUM-HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| # | Feature | Why Expected | Complexity | Notes |
|---|---------|--------------|------------|-------|
| T1 | **Landing page with clear value proposition** | First 5 seconds decide if visitor stays or bounces. Thai SME owners must instantly understand "this helps me use AI affordably" | LOW | Hero section + 3 benefits + single CTA. Conversational Thai tone, not corporate. Must work on mobile (90%+ of Thai web traffic is mobile) |
| T2 | **Blog/article system with categories and tags** | Core content delivery mechanism. Every competitor (AI Thailand, Investree, Thaiger AI) has categorized articles | MEDIUM | Markdown-based for low-friction publishing. Categories by use case (chatbot, dashboard, automation) and industry. Thai-language content with "Tinglish" keywords for SEO |
| T3 | **Mobile-responsive design** | 90%+ of Thai web access is mobile. Non-negotiable | LOW | Mobile-first design. Light mode default (research shows Thai users prefer light mode for readability). Touch-friendly navigation |
| T4 | **Contact information display (LINE, email, phone)** | Thai business convention: LINE is primary contact channel (80-90% read rate vs 10-15% for email). Missing LINE = missed leads | LOW | Prominent LINE OA link, email, phone. Floating contact button on mobile. No complex forms -- direct links |
| T5 | **Project showcase / portfolio section** | Visitors need proof of competence. Every consulting site surveyed shows past work. "Show don't tell" is the universal pattern | MEDIUM | Mixed formats: portfolio cards for quick scan, expandable case studies for depth. Must show real projects (MeowMed, chatbots, clinic dashboards) |
| T6 | **SEO fundamentals for Thai market** | Google has 97-98% search market share in Thailand. Thai SME owners search in Thai + English mix ("Tinglish"). Without SEO, no organic traffic | MEDIUM | Meta tags, Open Graph, structured data with Thai-language schema markup. E-E-A-T compliance: author bio with credentials (vet degree + AI practitioner). Long-tail "Tinglish" keywords |
| T7 | **Article reading experience** | Users expect scannable content with headers, images, and clear structure. Thai users are "highly visual" -- walls of text perform poorly | LOW | Table of contents, estimated reading time, proper heading hierarchy. Break content with images/diagrams. Concise paragraphs |
| T8 | **About / credibility section** | E-E-A-T matters for SEO. Thai business culture values personal trust. Visitors must know who Ohm is and why to trust him | LOW | Professional photo, vet-to-AI story, credentials, link to existing portfolio. Personal branding builds stronger trust than corporate branding |
| T9 | **Fast page load performance** | Google Core Web Vitals affect ranking. Mobile users on varying Thai internet speeds expect sub-3-second loads | LOW | Static site generation. Image optimization. Lazy loading for embeds. CDN deployment |
| T10 | **Article search** | Standard blog expectation. Users searching for specific AI topics must find them quickly | MEDIUM | Client-side search (no server needed for static site). Search across titles, tags, content. Thai text search support |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| # | Feature | Value Proposition | Complexity | Notes |
|---|---------|-------------------|------------|-------|
| D1 | **Interactive AI cost calculators / ROI estimators** | No Thai competitor offers this. SME owners' primary question is "how much will this cost me?" Answering it interactively builds massive trust and qualifies leads | MEDIUM | Start with one: "Chatbot Cost Estimator" -- input business type, message volume, features needed, get ballpark cost range. Later add ROI calculator. Form factor: step-by-step wizard, not a dense form |
| D2 | **Video content with companion articles** | Combines YouTube reach (free hosting, discovery) with website depth (SEO, detailed steps). Competitors do one or the other, rarely both well | LOW-MEDIUM | YouTube embed + written companion that expands on video content. Companion article adds SEO value and serves readers who prefer text. Lazy-load embeds for performance |
| D3 | **Live demo embeds of real projects** | Most consulting sites show screenshots. Embedding actual working demos (chatbot widget, dashboard preview) is rare and powerful proof-of-concept | HIGH | Iframe embeds of deployed projects. Start with chatbot demo (lowest risk). Security considerations: sandbox iframes, read-only demos |
| D4 | **Comparison tools (AI tool vs tool)** | SME owners are overwhelmed by AI tool choices. Side-by-side comparisons with Thai context (pricing in THB, Thai language support) save them research time | MEDIUM | Static comparison tables initially, later interactive filters. Cover tools Ohm actually uses and recommends. Honest assessments build trust |
| D5 | **Thai-first AI glossary / jargon explainer** | AI terminology is intimidating in English, even more so for Thai SME owners. No Thai competitor has a comprehensive, accessible AI glossary | LOW | Simple glossary page. Link terms from articles. Use simple Thai explanations, not academic translations. Can grow organically with each new article |
| D6 | **Content series / learning paths** | Instead of random articles, guided sequences ("Week 1: Understand AI basics, Week 2: Find your use case, Week 3: Budget it") create return visits and build deeper trust | LOW-MEDIUM | Curated article sequences with "next article" navigation. Series landing pages. Progress feels natural without requiring user accounts |
| D7 | **Industry-specific AI guides** | Generic "AI for business" content is everywhere. Guides for specific Thai industries (clinics, restaurants, retail, services) with concrete examples are rare | LOW | Content strategy, not a feature build. Leverage Ohm's vet/clinic experience as anchor, expand to adjacent SME verticals. Category/tag system supports this |
| D8 | **Newsletter / LINE broadcast opt-in** | Builds owned audience. LINE OA broadcast has 80-90% read rate in Thailand vs 10-15% email. Returning visitors are warmer leads | LOW | Simple LINE "Add Friend" QR code / button (no backend needed). Optional email signup for those who prefer it. No complex automation needed for v1 |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| # | Feature | Why Requested | Why Problematic | Alternative |
|---|---------|---------------|-----------------|-------------|
| A1 | **User accounts / login system** | "Track reading progress", "save favorites" | Massive complexity increase. Backend required. Privacy/security obligations. Thai SME owners will not create accounts on an unknown site. Friction kills leads | Bookmark-friendly URLs. Browser localStorage for lightweight preferences (dark mode toggle). Content series for guided reading |
| A2 | **Comment system on articles** | "Build community", "engagement" | Moderation overhead is significant. Spam magnets. Low-quality comments hurt credibility. Thai social engagement happens on LINE/Facebook, not website comments | Link to LINE OA for discussion. "Share on Facebook/LINE" buttons. Community lives where users already are |
| A3 | **Booking / calendar system** | "Let clients book consultations directly" | Over-engineers the contact flow. Adds backend complexity and maintenance. Thai business culture prefers personal messaging (LINE chat) over self-service booking | Direct LINE chat link with message "Interested in consulting". Phone number for those who prefer calling. Low friction, high personal touch |
| A4 | **AI chatbot on the site itself** | "Practice what you preach by having your own chatbot" | Expensive to maintain with quality. Bad chatbot damages credibility more than no chatbot. Requires ongoing training data and monitoring | Showcase chatbot demos as portfolio items (iframed). Site itself stays simple and fast. Add chatbot only if it can be genuinely excellent |
| A5 | **E-commerce / payment processing** | "Sell courses or templates online" | Adds tax/legal obligations. Payment gateway complexity in Thailand. Distracts from consulting lead generation which is the primary revenue model | Free content builds trust and generates consulting leads worth far more than course sales. If courses later, use established Thai platforms (SkillLane, Udemy) |
| A6 | **Multi-language (bilingual) in v1** | "Reach English-speaking audience too" | Doubles content creation effort. Translation maintenance burden. Dilutes Thai SEO focus. Thai SME audience is the validated target | Thai-primary with English article slugs for SEO. Add English later (v2+) only if there is demonstrated demand from analytics |
| A7 | **Real-time analytics dashboard** | "Show live visitor counts, trending articles" | Vanity feature. Adds complexity. Irrelevant to SME visitors | Simple analytics via Plausible/Umami (privacy-friendly, lightweight). Internal-only, not public-facing |
| A8 | **Gated content (download whitepapers for email)** | "Capture leads with content gates" | Thai market shows low tolerance for gated content. Creates friction. Hurts SEO (gated content is not indexable). Small site cannot afford to gate its primary content | All content free and indexable. Lead generation through demonstrated value, not content hostage-taking. Contact CTA on every page instead |
| A9 | **Complex CMS admin panel** | "Need a GUI to manage content" | Over-engineers for a solo operator. Database-backed CMS adds hosting cost and maintenance. Security surface area | Markdown files in Git. VS Code or any editor for writing. Git-based workflow is faster for a technical operator like Ohm |

## Feature Dependencies

```
[T2] Blog/Article System
    ├── requires ──> [T7] Article Reading Experience
    ├── requires ──> [T6] SEO Fundamentals
    ├── enables ──> [T10] Article Search
    ├── enables ──> [D2] Video + Companion Articles
    ├── enables ──> [D5] AI Glossary
    ├── enables ──> [D6] Content Series / Learning Paths
    └── enables ──> [D7] Industry-Specific Guides

[T1] Landing Page
    ├── requires ──> [T3] Mobile-Responsive Design
    ├── requires ──> [T4] Contact Information
    └── requires ──> [T8] About / Credibility Section

[T5] Project Showcase
    └── enables ──> [D3] Live Demo Embeds

[D1] Interactive Cost Calculators
    └── standalone (no hard dependencies, but benefits from [T1] landing page traffic)

[D2] Video + Companion Articles
    └── requires ──> [T2] Blog/Article System

[D4] Comparison Tools
    └── requires ──> [T2] Blog/Article System (comparison pages are specialized articles)

[D8] Newsletter / LINE Opt-in
    └── requires ──> [T4] Contact Information (LINE OA setup)
```

### Dependency Notes

- **[T2] Blog System requires [T7] Reading Experience:** Articles without proper formatting, headings, and scanability will fail with Thai visual-preference audience.
- **[T5] Portfolio enables [D3] Live Demos:** Portfolio cards are the foundation; live demos are an enhancement layered on top.
- **[D1] Calculators are standalone:** Can be built and deployed independently of the content system. High impact, few dependencies. Good candidate for early differentiation.
- **[D6] Content Series requires [T2] Articles:** Series are curated sequences of existing articles -- you need articles first.
- **[D8] LINE Opt-in requires [T4] Contact Setup:** LINE OA account must be configured before any broadcast/opt-in features work.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what is needed to validate that Thai SME owners find value and make contact.

- [x] [T1] Landing page with clear value proposition -- first impression decides everything
- [x] [T2] Blog/article system with categories -- core content delivery, must work from day one
- [x] [T3] Mobile-responsive design -- 90% of Thai traffic is mobile
- [x] [T4] Contact information (LINE, email, phone) -- the conversion mechanism
- [x] [T5] Project showcase (portfolio cards) -- proof of competence
- [x] [T6] SEO fundamentals -- organic traffic is the growth engine
- [x] [T7] Article reading experience -- Thai users need visual, scannable content
- [x] [T8] About / credibility section -- E-E-A-T and personal trust
- [x] [T9] Fast page load -- Core Web Vitals, mobile performance

### Add After Validation (v1.x)

Features to add once the site has traffic and initial consulting leads.

- [ ] [T10] Article search -- add when article count exceeds ~20 (search becomes necessary)
- [ ] [D1] Interactive cost calculator -- add when analytics show visitors are comparing pricing pages elsewhere
- [ ] [D2] Video + companion articles -- add when Ohm starts producing video content
- [ ] [D5] AI glossary -- add when article count grows and term linking becomes valuable
- [ ] [D6] Content series / learning paths -- add when enough articles exist to form logical sequences
- [ ] [D8] LINE broadcast opt-in -- add when LINE OA is set up and there is content cadence to sustain it

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] [D3] Live demo embeds -- defer until portfolio includes deployable demo-safe versions of projects
- [ ] [D4] Comparison tools -- defer until there is clear demand from article analytics (which comparison topics get traffic)
- [ ] [D7] Industry-specific guides -- defer content expansion until core verticals (clinic/vet, general SME) are well-covered
- [ ] Dark mode toggle -- defer until user feedback requests it (Thai users prefer light mode by default)
- [ ] English language content -- defer until analytics show significant English-speaking traffic

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| [T1] Landing page | HIGH | LOW | **P1** |
| [T2] Blog/article system | HIGH | MEDIUM | **P1** |
| [T3] Mobile-responsive design | HIGH | LOW | **P1** |
| [T4] Contact information (LINE) | HIGH | LOW | **P1** |
| [T5] Project showcase | HIGH | MEDIUM | **P1** |
| [T6] SEO fundamentals | HIGH | MEDIUM | **P1** |
| [T7] Article reading experience | HIGH | LOW | **P1** |
| [T8] About / credibility section | MEDIUM | LOW | **P1** |
| [T9] Fast performance | HIGH | LOW | **P1** |
| [T10] Article search | MEDIUM | MEDIUM | **P2** |
| [D1] Cost calculators | HIGH | MEDIUM | **P2** |
| [D2] Video + companion articles | MEDIUM | LOW | **P2** |
| [D5] AI glossary | MEDIUM | LOW | **P2** |
| [D6] Content series | MEDIUM | LOW | **P2** |
| [D8] LINE opt-in | MEDIUM | LOW | **P2** |
| [D3] Live demo embeds | HIGH | HIGH | **P3** |
| [D4] Comparison tools | MEDIUM | MEDIUM | **P3** |
| [D7] Industry guides | MEDIUM | LOW | **P3** |

**Priority key:**
- P1: Must have for launch -- the site is incomplete without these
- P2: Should have, add when content volume and traffic justify them
- P3: Nice to have, future consideration based on validated demand

## Competitor Feature Analysis

| Feature | AI Thailand (ai.in.th) | Investree Knowledge Hub | Thaiger AI | AIGEN | **SMEAI (Our Approach)** |
|---------|----------------------|------------------------|------------|-------|--------------------------|
| Thai language content | Yes | Yes (bilingual) | Yes | Yes (bilingual) | Thai-primary, "Tinglish" SEO |
| Article categories | Basic | Yes, 3 categories | Yes | Minimal | Detailed: by use case, industry, skill level |
| Interactive tools | API playground | None | None | None | **Cost calculators, comparison tools** (differentiator) |
| Portfolio / case studies | Service listings | N/A (finance platform) | Blog only | Enterprise case studies | **Mixed format: cards + case studies + live demos** |
| Video content | None | None | None | None | **YouTube embeds with companion articles** |
| Contact method | Web form | Web form | Web form | Web form | **LINE-first (Thai convention), direct links** |
| Target audience | Developers | Investors/SMEs | Businesses | Enterprise | **SME owners specifically (technical + non-technical)** |
| Personal branding | Govt platform | Corporate | Corporate | Corporate | **Personal (Ohm's story, credentials)** -- builds trust |
| AI glossary | Technical API docs | None | None | None | **Plain-Thai glossary** for non-technical audience |
| Content depth | API reference | Surface-level | Marketing | Enterprise focus | **Practical how-to with real costs and tools** |

### Key Competitive Gaps We Fill

1. **No Thai competitor combines knowledge + portfolio + interactive tools** in a single site targeting SME owners
2. **LINE-first contact** matches how Thai businesses actually communicate (competitors all use web forms)
3. **Personal brand** of a vet-turned-AI-practitioner is more relatable to SME owners than corporate consulting brands
4. **Practical, cost-focused content** (actual prices in THB, real tool recommendations) vs competitors' vague "contact us for pricing"
5. **Interactive cost estimators** are entirely absent from the Thai AI consulting landscape

## Sources

- [AI Consulting for Small Business -- First Movers](https://firstmovers.ai/ai-consulting-small-business/) -- MEDIUM confidence
- [Consultant Websites: 20+ Examples -- Site Builder Report](https://www.sitebuilderreport.com/inspiration/consulting-websites) -- MEDIUM confidence
- [AI era dawns: 40% of Thai SMEs embrace AI -- Nation Thailand](https://www.nationthailand.com/business/tech/40050024) -- MEDIUM confidence
- [LINE: Thailand's Top MarTech Tool -- OurGreenFish](https://blog.ourgreenfish.com/the-business-mind/line-thailands-top-martech-tool-how-to-use-it) -- MEDIUM confidence
- [Digital Marketing & SEO Stats 2026 in Thailand -- Inspira](https://www.inspiradigitalagency.com/digital-marketing-seo-stats-thailand/) -- MEDIUM confidence
- [A Complete Guide for Doing SEO in Thailand -- RankTracker](https://www.ranktracker.com/blog/a-complete-guide-for-doing-seo-in-thailand/) -- MEDIUM confidence
- [How Google's E-E-A-T Will Impact SEO in 2026 -- Northern Kites](https://www.northernkites.com/how-googles-e-e-a-t-will-impact-seo-in-2026) -- MEDIUM confidence
- [Investree Knowledge Hub](https://www.investree.co.th/knowledge-hub-detail/artificial-intelligence-guide-unlocking-sme-potential) -- direct competitor analysis
- [AI for Thai Platform](https://aiforthai.in.th/) -- direct competitor analysis
- [AI Thailand](https://www.ai.in.th/en/) -- direct competitor analysis
- [AIGEN Corp](https://aigencorp.com/en/) -- direct competitor analysis
- [Light/Dark Mode for Thai Users -- TCI-Thaijo Research](https://so03.tci-thaijo.org/index.php/JMMS/article/view/261810) -- MEDIUM confidence (academic research)
- [Thailand Digital Economy AI Programs 2026 -- Pertama Partners](https://www.pertamapartners.com/funding/thailand-nsda-digital-economy) -- MEDIUM confidence
- [AI4SP ROI Calculator](https://ai4sp.org/ai-roi-calculator/) -- interactive tool reference

---
*Feature research for: SMEAI -- AI-for-SME Knowledge Hub & Consulting Lead Generator*
*Researched: 2026-02-17*
