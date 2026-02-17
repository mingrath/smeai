# Pitfalls Research

**Domain:** AI Knowledge Hub / Consulting Lead Generator for Thai SMEs
**Researched:** 2026-02-17
**Confidence:** HIGH (multiple verified sources across all pitfall categories)

## Critical Pitfalls

Mistakes that cause rewrites, lost credibility, or fundamental failure of the site's dual purpose (educate + generate leads).

### Pitfall 1: Writing for Technologists Instead of SME Owners

**What goes wrong:**
Content uses AI/tech jargon ("LLM orchestration", "RAG pipeline", "fine-tuning hyperparameters") that impresses developers but alienates the actual target audience: Thai SME owners who want to know "can this save me money?" Many AI knowledge hubs become developer blogs disguised as business resources. The site attracts other developers instead of generating consulting leads.

**Why it happens:**
The creator (a technical person) writes from their own perspective. Technical accuracy feels like quality. The temptation is to explain HOW the AI works rather than WHAT it does for the business. This is the single most common consulting website mistake: making the site about yourself instead of about the client's problems.

**How to avoid:**
- Every article passes the "so what?" test: does it answer a business problem, not a technical curiosity?
- Use the framing: "You have [problem]. Here's how AI solves it for [cost]." not "Here's how [technology] works."
- Lead with outcomes (saved 40% on customer service costs) not mechanisms (deployed a transformer-based chatbot)
- Have a non-technical person read drafts before publishing
- Keep technical depth in collapsible sections or separate "deep dive" articles linked from the main piece

**Warning signs:**
- Analytics show high bounce rate on articles (visitors leave quickly)
- No contact inquiries despite decent traffic
- Comments/feedback ask "but what does this mean for my shop?"
- Most traffic comes from developers, not business owners

**Phase to address:**
Content Strategy / Foundation phase. Content voice and templates must be established before any articles are written. Create article templates with mandatory sections: Problem, Solution, Cost, Next Steps.

---

### Pitfall 2: Thai Content That Is Actually Translated English

**What goes wrong:**
Content reads like it was written in English and translated to Thai -- formal, stilted, using English-loan-word jargon where natural Thai expressions exist. Thai SME owners (especially outside Bangkok) disengage because the content feels foreign. Thai is written without spaces between words, and word segmentation affects both readability and SEO. Direct translation of AI terms often creates phrases nobody actually searches for in Thai.

**Why it happens:**
Most AI resources are English-first. The creator thinks in English technical terms and translates. SEO keyword research tools are weaker for Thai, so keywords are guessed rather than researched. Thai has a unique writing system without word boundaries, and Google's Thai word segmentation is imperfect -- meaning poorly phrased Thai content may not even be indexed correctly for the intended queries.

**How to avoid:**
- Write Thai content natively, not as translations. Think in Thai about the business problem first.
- Research actual Thai search queries: use Google Suggest, Google Trends (Thailand), and "People Also Ask" for Thai terms
- Mix Thai and transliterated English strategically -- Thai users commonly search using a mix (e.g., "AI ลดต้นทุน SME", "แชทบอท ร้านค้า"). Optimize for how people actually type.
- Use natural Thai tone: conversational, not academic. Thai business content that performs well uses a friendly, advisory tone ("พี่สอนน้อง" style)
- Test SEO by actually searching your target terms in Google Thailand and seeing what ranks

**Warning signs:**
- Google Search Console shows impressions but few clicks (snippets look unnatural)
- Thai visitors spend less time on page than expected
- Search rankings for Thai keywords are weak despite having relevant content
- Feedback that content "reads like a textbook"

**Phase to address:**
Content Strategy / Foundation phase. Establish Thai content voice guide, keyword research process, and editorial standards before writing articles. This should be a gating requirement.

---

### Pitfall 3: AI Content Becomes Stale Within Months

**What goes wrong:**
AI tools, pricing, and capabilities change rapidly. An article about "Best AI Chatbot Tools for Thai SMEs" written in February 2026 references tools that have changed pricing, been discontinued, or been surpassed by June 2026. Stale content destroys credibility for an AI consulting site -- if your knowledge hub is outdated, why would someone trust you to implement current solutions? Google's 2025 core updates also penalize stale content, favoring sites with fresh, maintained information.

**Why it happens:**
Static sites with markdown content have no built-in content freshness alerts. Once published, articles sit untouched. The creator focuses on writing new content rather than maintaining existing content. There's no system to flag when referenced tools, prices, or capabilities have changed. AI moves faster than any other tech domain -- pricing and feature changes happen monthly.

**How to avoid:**
- Add a `lastReviewed` frontmatter field to every article. Display "Last verified: [date]" prominently.
- Build a content review calendar: every article gets a 90-day review flag
- Categorize content by decay speed: "Evergreen" (concepts, strategy) vs "Time-sensitive" (tool comparisons, pricing, tutorials). Time-sensitive content gets 60-day review cycles.
- Use relative references where possible ("affordable tier" instead of "$20/month")
- When referencing specific tools, link to the tool's pricing page rather than stating prices inline
- Consider a "content health" page or dashboard showing last-reviewed dates for all articles

**Warning signs:**
- Articles reference discontinued tools or old pricing
- Comments or inquiries mention that information is outdated
- Search rankings drop for previously strong articles
- Competitor sites rank above you with fresher content on the same topic

**Phase to address:**
Content Pipeline phase and ongoing operations. The content management system (frontmatter schema, review workflow) must support freshness tracking from day one. This is architectural -- retrofitting review dates onto 50+ articles is painful.

---

### Pitfall 4: Portfolio Showcases That Don't Convert

**What goes wrong:**
Project showcases look impressive but fail to generate leads because they showcase technical achievement rather than business outcomes. A showcase of "MeowMed: Cat Health Platform built with Next.js and AI" impresses developers but tells an SME owner nothing about whether you can help their noodle shop or clinic. The showcase becomes a vanity gallery instead of a sales tool.

**Why it happens:**
Developers naturally focus on the technology stack and technical challenges. Case studies default to "what I built" rather than "what problem I solved and what results it achieved." Without clear CTAs, visitors admire the work and leave without taking action.

**How to avoid:**
- Structure every case study as: Problem → Solution → Results → "Could this work for your business?"
- Lead with the business problem and outcome, not the tech stack
- Include specific metrics: "reduced response time by 70%", "saved 15 hours/week", "cost: under 5,000 baht/month"
- End every showcase with a contextual CTA: "Running a clinic? Similar solutions start at [range]. Chat with me on LINE."
- Limit to 3-5 strong case studies rather than listing every project
- Include client quotes or testimonials where possible (even informal ones)

**Warning signs:**
- Portfolio page has traffic but zero contact inquiries
- Visitors spend time on showcase pages but don't navigate to contact
- Heat maps show users reading technical details but not scrolling to CTAs
- Portfolio traffic comes from developers, not business owners

**Phase to address:**
Portfolio/Showcase phase. Case study templates with mandatory business outcome sections must be created before any project is showcased.

---

### Pitfall 5: Ignoring LINE as the Primary Contact Channel

**What goes wrong:**
The site provides email, contact forms, or phone numbers as primary contact methods, treating LINE as secondary or omitting it. In Thailand, LINE has 50+ million active users and 80-90% message read rates compared to email's 10-15%. Thai SME owners communicate through LINE -- not email. A "Contact Us" page with only an email form loses the majority of potential leads.

**Why it happens:**
Western web patterns default to email forms and contact pages. The creator may think professional consulting requires formal email communication. LINE integration seems informal or secondary. But Thai business culture operates on LINE -- even B2B deals happen over LINE chat.

**How to avoid:**
- Make LINE the primary and most prominent contact method across the site
- Use LINE Official Account (not personal LINE) for professional presentation
- Place LINE contact prominently: sticky button, end of every article, end of every case study
- Include a LINE QR code for mobile users (since most Thai traffic is mobile)
- Set up auto-reply on LINE for after-hours: acknowledge receipt, promise response time
- Keep email as secondary for those who prefer it, but don't make visitors hunt for LINE

**Warning signs:**
- Low contact conversion despite good traffic
- The few inquiries that come through are from international visitors, not Thai SMEs
- Visitors screenshot your LINE ID from the contact page (meaning it's hard to find or add)

**Phase to address:**
Foundation/Layout phase. LINE integration is not a "nice to have" -- it's core infrastructure for lead generation in Thailand. Should be implemented in the first buildable phase alongside the layout.

---

### Pitfall 6: YouTube Embeds Destroying Page Performance

**What goes wrong:**
A page with 2-3 YouTube video embeds loads an additional 4-6 seconds and fails Core Web Vitals (LCP, CLS). Each YouTube embed loads ~1MB+ of scripts, styles, and the player. For a Thai audience where 98% browse on mobile phones, slow pages cause immediate abandonment. Google's mobile-first indexing means poor mobile performance directly tanks search rankings.

**Why it happens:**
YouTube provides a simple iframe embed code that "just works." Developers drop it in during content creation without measuring performance impact. The impact compounds when articles contain multiple video references. Nobody tests with throttled connections simulating Thai mobile networks outside Bangkok.

**How to avoid:**
- Never use raw YouTube iframes. Use a facade pattern: display a static thumbnail image with a play button, and load the YouTube player only when clicked.
- Libraries like `lite-youtube-embed` or `@paulirish/lite-youtube` reduce initial load from ~1MB to ~10KB per video
- Lazy-load all video embeds that are below the fold
- Set explicit `width` and `height` on video containers to prevent CLS
- Test pages with Lighthouse on mobile simulation (slow 4G) before publishing
- Consider a "video collection" page for heavy video content rather than embedding everywhere

**Warning signs:**
- Lighthouse mobile score drops below 80 on pages with videos
- LCP exceeds 2.5 seconds on video-heavy pages
- Users on mobile leave video pages faster than text-only pages
- Google Search Console reports CWV failures for video content pages

**Phase to address:**
Foundation/Component Library phase. The video embed component must be built with the facade pattern from the start. Do not use raw YouTube iframes even in prototypes -- the habit carries into production.

---

### Pitfall 7: Interactive Tools That Are Over-Engineered or Under-Useful

**What goes wrong:**
The site builds an "AI ROI Calculator" or "AI Readiness Assessment" that either (a) requires too many inputs and gets abandoned, (b) produces abstract percentages nobody understands, or (c) is so simple it provides no value. Interactive tools are high-effort features that often have the worst completion rates on the site. They become vanity features that took weeks to build but generate no leads.

**Why it happens:**
Interactive tools sound impressive in planning. The creator builds what's technically interesting rather than what's useful to the audience. Too many input fields create friction. Results that show "Your AI readiness score: 67%" mean nothing to an SME owner who wanted to know "should I use a chatbot?" There's a gap between what a developer thinks is a useful tool and what a business owner would actually use.

**How to avoid:**
- Start with ONE simple tool, validate it generates contacts, then build more
- Maximum 3-5 inputs. Every field adds friction and reduces completion.
- Results must be concrete and actionable: "Based on your inputs, a chatbot could save you approximately 15,000 baht/month. Here's how." not "Your score is 72/100."
- End every tool result with a personalized CTA: "Want exact numbers for your business? Chat with me on LINE."
- Pre-fill with sensible defaults for Thai SME scenarios
- Use plain Thai labels, not jargon ("จำนวนพนักงาน" not "Headcount FTE")

**Warning signs:**
- Tool completion rate below 40%
- Users start the tool but abandon mid-way
- Tool generates results views but no contact inquiries
- Most tool traffic comes from curiosity-seekers, not potential clients

**Phase to address:**
Interactive Tools phase (should be a later phase, not MVP). Build and validate the content hub first. Tools are enhancement, not foundation. When built, validate with 5 real SME owners before investing in polish.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding Thai text in components instead of content files | Faster initial development | Cannot update text without code changes, no future i18n path | Never -- use content files from day one |
| Skipping frontmatter schema validation | Faster article creation | Inconsistent metadata, broken SEO tags, missing review dates | Only for initial prototype with <5 articles |
| Using raw YouTube iframes | 2 minutes vs building facade component | Every video page fails CWV, compounds as content grows | Never |
| No image optimization pipeline | Publish images as-is | Ballooning page sizes, slow mobile loads, no WebP/AVIF | Only for first 1-2 articles while building the pipeline |
| Single flat content directory | Simple structure | Content becomes unnavigable at 30+ articles, no category routing | Only with <10 articles total |
| Skipping OG image generation | One less component to build | Every article shares the same generic preview on LINE/Facebook, lower click-through | MVP only -- build before content marketing push |
| No analytics from day one | Faster launch | Cannot measure what content works, blind optimization | Never -- even simple Plausible/Umami takes 10 minutes |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| LINE Official Account | Using personal LINE ID instead of Official Account | Create LINE Official Account (free tier available). Provides auto-reply, rich menus, analytics. Personal LINE has no business features. |
| YouTube Data API | Fetching video metadata at runtime on every page load | Fetch at build time and cache. YouTube API has rate limits (10,000 units/day). Runtime fetching adds latency and can fail. |
| Google Analytics / alternatives | Adding GA4 without cookie consent, violating PDPA (Thailand's data privacy law) | Use privacy-respecting analytics (Plausible, Umami) or implement proper PDPA consent banner before loading GA4. |
| LINE sharing buttons | Using generic share URLs that don't work on LINE | LINE uses its own sharing protocol (`https://line.me/R/share?text=`). Test sharing on actual LINE app on mobile. |
| Font loading (Noto Sans Thai) | Loading all font weights via Google Fonts CDN | Self-host via Fontsource, load only weights 400 and 700, use `font-display: swap`, subset to Thai + Latin only. Reduces FOIT/FOUT. |
| Open Graph tags | Missing `og:locale` for Thai content | Set `og:locale` to `th_TH`. Without it, social previews may render Thai text incorrectly or show garbled characters on some platforms. |

## Performance Traps

Patterns that work at small scale but fail as content grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No image optimization pipeline | Pages load fine with 5 articles, each with 1-2 images | Use sharp/vite-imagetools to auto-generate WebP/AVIF, set explicit dimensions, lazy-load below-fold images | At 20+ articles with 3+ images each (~60+ unoptimized images) |
| Building search by scanning all content at runtime | Works instantly with 10 articles | Use pre-built search index (Pagefind, Fuse.js with pre-built index). Generate at build time. | At 50+ articles, client-side scan causes multi-second delays |
| Thai font loading without subsetting | Imperceptible with cached font | Self-host, subset to used character ranges, preload critical font files | On first visit over slow mobile connection -- 500ms+ FOIT |
| No pagination on content listing pages | Fine with 10-15 article cards | Implement virtual scrolling or pagination at 12-16 items per page | At 30+ articles, listing page becomes slow and overwhelming on mobile |
| Unoptimized build times with many MDX files | 5-second builds with 10 articles | Use content collections with lazy compilation, incremental builds | At 100+ articles, builds exceed 60 seconds, slowing development |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing LINE Official Account admin URL or channel secret in client-side code | Attacker could send messages as your business, access chat history | Keep all LINE API credentials server-side only. Use environment variables, never commit to repo. |
| Not implementing PDPA-compliant data handling | Legal violation -- Thailand's PDPA (Personal Data Protection Act) has been enforced since June 2022. Fines up to 5 million baht. | If collecting any data (even analytics cookies), display consent banner. For a static site with no forms, use cookieless analytics (Plausible) to avoid PDPA entirely. |
| Contact form without rate limiting or honeypot | Spam flood through contact endpoints, if any exist | Since this project uses LINE/email links (no forms), this is mostly avoided. If adding any form later, use honeypot fields + rate limiting. |
| Serving mixed HTTP/HTTPS content | Browser warnings, broken padlock, loss of trust | Enforce HTTPS everywhere. Audit all embedded content (images, scripts, iframes) for HTTPS. |
| No Content Security Policy headers | XSS risk if any dynamic content is added later | Set CSP headers even on static sites. Allow-list YouTube embed domain, font sources, analytics domain. |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Desktop-first design tested on mobile as afterthought | 98% of Thai users on mobile get a cramped, unusable layout. Pinch-to-zoom on article text, tiny tap targets. | Design mobile-first. Test on actual Thai Android devices (Samsung Galaxy A series is the most common). Desktop is the enhancement. |
| Wall of text articles without visual breaks | Thai users are highly visual. Long text blocks cause immediate bounce, especially on mobile. | Break content with images, diagrams, bullet points every 2-3 paragraphs. Use infographics for comparisons. Thai content that performs well is visually rich. |
| Navigation that requires multiple taps to find content | SME owners with limited time abandon sites that require exploration. | Maximum 2 taps to any content. Flat navigation: Home, Articles (with categories), Showcase, Tools, Contact. No deep menu trees. |
| No clear next action after reading an article | User reads, learns something, and leaves. No conversion. | Every article ends with: related articles, a relevant case study link, and a LINE contact CTA. Guide the journey: Learn → See proof → Contact. |
| Search that doesn't understand Thai compound words | User searches "แชทบอทร้านค้า" but articles use "chatbot สำหรับร้านค้า". Search returns nothing. | Use a search solution that handles Thai text (Pagefind handles CJK languages). Test with actual Thai search queries from real users. |
| Category names that are too technical | Categories like "NLP", "Computer Vision", "Automation" mean nothing to SME owners | Use benefit-oriented categories: "ลดต้นทุน" (Reduce Costs), "เพิ่มยอดขาย" (Increase Sales), "บริการลูกค้า" (Customer Service) |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Article pages:** Often missing OG meta tags for Thai locale (`og:locale=th_TH`) -- verify that LINE/Facebook sharing shows correct Thai title, description, and image
- [ ] **Mobile layout:** Often missing touch target sizing -- verify all buttons/links are at least 44x44px for Thai mobile users
- [ ] **Thai typography:** Often missing proper line-height for Thai script -- Thai characters have taller ascenders/descenders than Latin. Verify with `line-height: 1.8` minimum for body text.
- [ ] **Content freshness:** Often missing `lastReviewed` dates -- verify every article shows when it was last verified as accurate
- [ ] **SEO:** Often missing structured data (Article schema, BreadcrumbList) -- verify with Google's Rich Results Test for Thai-language pages
- [ ] **LINE integration:** Often missing QR code for mobile -- verify LINE add-friend flow works on both mobile (tap) and desktop (QR scan)
- [ ] **Case studies:** Often missing business outcomes -- verify every showcase has at least one concrete metric (cost saved, time reduced, revenue impact)
- [ ] **Search:** Often missing Thai language testing -- verify search works with Thai-only queries, mixed Thai-English queries, and common misspellings
- [ ] **Analytics:** Often missing from day one -- verify tracking is live before any content marketing push
- [ ] **Favicon and PWA manifest:** Often forgotten -- verify site has proper favicon, apple-touch-icon, and web app manifest for Thai mobile users who add to home screen

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Jargon-heavy content alienating audience | MEDIUM | Audit all articles with a readability rubric. Rewrite introductions and conclusions first (most-read sections). Add "plain Thai summary" boxes to technical articles. 2-3 days for 20 articles. |
| Stale content damaging credibility | MEDIUM | Add `lastReviewed` to frontmatter schema. Bulk-audit all articles for outdated tool references. Prioritize articles with highest traffic. Mark unreviewed articles with "being updated" banner. 1-2 weeks for full audit. |
| YouTube embeds failing CWV | LOW | Replace all raw iframes with lite-youtube-embed component. Global find-and-replace in content files. Half-day fix for the component + automated content migration. |
| No LINE integration causing lost leads | LOW | Create LINE Official Account (30 minutes). Add sticky LINE button to layout (1 hour). Add LINE CTA to article template (30 minutes). Immediate impact. |
| Portfolio not converting | MEDIUM | Restructure existing case studies with Problem-Solution-Results template. Add business metrics. Add contextual CTAs. 1-2 days per case study rewrite. |
| Poor Thai SEO due to bad keyword targeting | HIGH | Requires keyword re-research, URL slug changes (which break links), meta tag rewrites, and content adjustments. Expensive to fix after 50+ articles are indexed. Do keyword research RIGHT in the content strategy phase. |
| Interactive tools abandoned by users | MEDIUM | Reduce inputs to 3-5 fields maximum. Change results to concrete baht amounts. Add smart defaults. A/B test completion rates. 2-3 days per tool redesign. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Jargon-heavy content | Content Strategy (early) | Review first 3 articles with a non-technical Thai reader before publishing more |
| Thai content that reads as translated English | Content Strategy (early) | Google Search Console shows Thai keyword impressions within 30 days of publishing |
| Content staleness | Content Pipeline / CMS Setup | Every article has `lastReviewed` field; build script warns on articles >90 days unreviewed |
| Portfolio not converting | Showcase / Portfolio phase | Track portfolio-page-to-contact conversion rate; target >2% |
| LINE not primary contact | Foundation / Layout phase | LINE is visible on every page without scrolling on mobile |
| YouTube embed performance | Foundation / Component Library | Lighthouse mobile score >90 on pages with video embeds |
| Over-engineered tools | Interactive Tools phase (late) | First tool has >50% completion rate before building second tool |
| Poor Thai SEO | Content Strategy (early) | Target keywords researched and documented before first article |
| Desktop-first design | Foundation / Layout phase | All layouts designed mobile-first; tested on Android mid-range device |
| No analytics | Foundation phase (day one) | Analytics capturing pageviews before any content marketing |
| PDPA non-compliance | Foundation phase | Privacy-respecting analytics chosen OR consent banner implemented before launch |
| Flat content structure | Content Architecture phase | Category system and URL structure designed for 100+ articles before publishing begins |

## Sources

- [The State of SEO in Thailand in 2025](https://blog.applabx.com/the-state-of-seo-in-thailand-in-2025/) - Thai SEO challenges, word segmentation, mobile dominance
- [The Technical & Cultural Nuances of SEO in Thailand](https://shentharindu.com/the-technical-cultural-nuances-of-seo-in-thailand/) - Thai content localization pitfalls
- [A Complete Guide for Doing SEO in Thai](https://www.ranktracker.com/blog/a-complete-guide-for-doing-seo-in-thai/) - Thai keyword research challenges
- [Digital 2025: Thailand](https://datareportal.com/reports/digital-2025-thailand) - 98% mobile browsing, 91.2% internet penetration
- [LINE: Thailand's Top MarTech Tool](https://blog.ourgreenfish.com/the-business-mind/line-thailands-top-martech-tool-how-to-use-it/) - LINE dominance in Thai business (80-90% read rates)
- [How LINE for Business in Thailand Drove 50% Sales Growth](https://www.lycorp.co.jp/en/story/20260106/lineth_forbusiness.html) - LINE business integration results
- [From Clicks to Conversations: Building a Lead System](https://adfinity.agency/blog/lead-generation-system-thailand-2025) - Thai lead conversion best practices
- [Why YouTube Embeds Hurt PageSpeed](https://www.contentpowered.com/blog/youtube-embeds-hurt-pagespeed/) - YouTube embed performance impact (up to 2s per embed)
- [The 10 Steps to Building a Client-Generating Consulting Website](https://www.consultingsuccess.com/consulting-website) - Consulting website conversion mistakes
- [Avoid These 6 Lead Generation Mistakes in Consulting](https://www.collective.com/blog/the-6-lead-generation-mistakes-to-avoid-in-your-solo-consulting-business) - Lead generation pitfalls
- [Content Hubs, Not Blogs: Structuring Evergreen Topic Authority in 2025](https://www.airwhistle.com/blog/content-hubs-not-blogs-structuring-evergreen-topic-authority-in-2025) - Content hub architecture
- [The Pillar Cluster Content Strategy That Doubled SEO Traffic](https://webwej.com/pillar-cluster-content-strategy-2025/) - Topic cannibalization prevention
- [Content Freshness: Best Practices for Automating Updates](https://cobbai.com/blog/knowledge-freshness-automation) - Content decay management
- [Fresh Content: Why Publish Dates Make or Break Rankings](https://ahrefs.com/blog/fresh-content/) - Google freshness signals
- [The Reality of AI Oversold and Underdelivered](https://www.isaca.org/resources/news-and-trends/industry-news/2025/the-reality-of-ai-oversold-and-underdelivered) - AI credibility crisis
- [Common Website Mistakes: 15 Things Costing You Conversions](https://simplestrat.com/blog/common-website-mistakes) - Jargon and clarity issues
- [7 Reasons NOT to Use a Static Site Generator](https://www.sitepoint.com/7-reasons-not-use-static-site-generator/) - Markdown CMS friction for non-technical contributors
- [Case Study Portfolio Tips for Success in 2025](https://www.artfolio.com/article/structuring-case-studies-inside-your-portfolio-to-solve-real-client-pain-points) - Portfolio trust-building mistakes

---
*Pitfalls research for: AI Knowledge Hub / Consulting Lead Generator for Thai SMEs*
*Researched: 2026-02-17*
