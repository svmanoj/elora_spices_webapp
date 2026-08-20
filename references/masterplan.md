# Elora Spices — Website Masterplan
**Freelance Build | Based on Apzara Digital Branding PRD v1.0**
Status: Draft v1 — for dev kickoff

---

## 1. Project Snapshot

- **Client:** Elora Spices (via Apzara Digital Branding)
- **Type:** Single-page static site, Phase 1 / MVP
- **Stack:** HTML5, CSS3, Vanilla JS — no frameworks
- **Positioning:** Modern farm-to-home brand, not a traditional masala/spice site
- **Colours:** Emerald Green `#0B6B4A` + White dominant, Gold `#C9A227` sparingly
- **Fonts:** Playfair Display / DM Serif (headings) + DM Sans / Inter (body), Google Fonts, `font-display: swap`

---

## 2. Scope Changes from Original PRD

These override the Apzara document where they conflict:

| Section | PRD Default | Our Build |
|---|---|---|
| S9 — Farm Stories / Gallery | Include | **Omitted entirely** — not building this section |
| S5/S6 — Vision & Mission | Full standalone sections | **Condensed** — smaller, tighter, less visual real estate than PRD spec. Combine into one compact block rather than two large sections |
| Hero | Static image + dark overlay | **Upgraded** — carousel or other attention-grabbing dynamic element (auto-rotating farm imagery, subtle parallax, or animated text reveal) instead of a single static banner |

Everything else (Farm-to-Pack journey, Founder profiles, Products grid with flip cards, Why Elora Spices, Commitment, Contact, Footer) stays per PRD.

**Revised section order:**
1. Hero (carousel/dynamic)
2. Natural Farming Philosophy
3. Farm-to-Pack Journey
4. Our Story (Founders)
5. Vision & Mission (combined, condensed)
6. Products (11 cards, flip interaction)
7. Why Elora Spices *(optional, include if time allows)*
8. Our Commitment
9. Contact
10. Footer

---

## 3. Asset Responsibility

**Client is sourcing and handing off** (per client's message):
- Logo (PNG + SVG)
- Favicon
- Domain access
- Business email
- Address
- Social media links
- Founder images

**We handle:**
- All other imagery — high-res stock (Unsplash/Pexels), compressed to WebP, lazy-loaded below the fold
- Keywords per PRD: tea plantation, spice farm, pepper vine, cardamom farm, turmeric harvest, natural farming India
- Icons (Font Awesome / Phosphor, free tier)

**Build approach for pending assets:** every client-owned asset gets a clean placeholder slot (logo in nav, favicon stub, footer social icons, founder photo frames) so swap-in at delivery is a drop-in replace, not a layout rebuild.

---

## 4. Development Approach

- **AI-assisted build** — using Claude Code for scaffolding, section implementation, and QA passes; still hand-reviewed for the specific brand rules below.
- **Standard code practices:**
  - Semantic HTML5 (proper landmarks, heading hierarchy)
  - Consistent CSS naming convention (BEM-style) + CSS custom properties for the brand palette (no framework)
  - Modular JS — separate concerns (nav, carousel, card-flip, scroll animations, form) rather than one monolith file
  - Accessible by default: alt text on all images, keyboard-navigable nav/drawer, sufficient colour contrast, focus states
- **Hard content rule:** No "100% pesticide-free" / "zero chemicals" anywhere — copy, alt text, or image captions. Use "naturally inspired," "responsible farming," "naturally cultivated" instead.
- **Copy:** Use PRD-provided copy verbatim (Section 06/07) — no improvising brand or product descriptions.

### Production code masking
On live deploy: minify + bundle CSS/JS, strip comments and console logs, no source maps published, obfuscate JS (e.g. via a JS obfuscator in the build step).
**One honest caveat:** browser dev tools can always inspect *rendered* HTML/CSS and *served* JS — that's how browsers work, and no static site can fully block this. What we *can* do is make the shipped code unreadable/hard to reverse-engineer (minified, obfuscated, no comments, no dev artifacts) — functionally equivalent to "nothing meaningful visible," even though technically something is always present in the network tab. Worth setting this expectation with the client so no one's surprised later.

---

## 5. SEO + AEO (built in during dev, not bolted on after)

- Semantic HTML structure (proper `<h1>`–`<h3>` hierarchy, one H1 per page)
- Meta title, description, Open Graph + Twitter Card tags
- `schema.org` structured data — `Organization`, `Product` (for the 11 items), `LocalBusiness` once address/contact confirmed
- Descriptive, keyword-natural alt text on every image (ties into farming/brand keywords, not generic)
- Clean anchor-based URLs (`#our-story`, `#products`, etc.) already fit AEO-friendly section framing
- `robots.txt` + `sitemap.xml`
- Fast load (Lighthouse >85 target from PRD) — this itself is an SEO ranking factor
- AEO angle: structure key brand facts (founders, philosophy, product list) so they're easily extractable by answer engines — clear declarative sentences near headings rather than only inside marketing copy

---

## 6. Performance

- WebP images, compressed, lazy-loaded below the fold
- IntersectionObserver for scroll animations — subtle, no jank
- Target Lighthouse performance >85
- Minimise render-blocking resources; fonts loaded with `swap`

---

## 7. Build Phases

| Phase | Work | Notes |
|---|---|---|
| 0 | Repo + Netlify link, folder structure, fonts, CSS tokens | |
| 1 | HTML skeleton, all sections (revised order), PRD copy in place | |
| 2 | CSS — palette, typography, layout per section | Vision/Mission built compact from the start |
| 3 | Hero carousel/dynamic element | |
| 4 | Interactions — sticky nav, mobile drawer, scroll animations, product card flip | Card flip is the client's specifically-called-out priority — polish this |
| 5 | Stock image sourcing + WebP optimization | Parallel to Phase 2–3 |
| 6 | SEO/AEO pass — meta, schema, alt text, sitemap | Woven in, not a separate bolt-on step |
| 7 | Responsive QA — mobile/tablet/desktop | |
| 8 | Contact form (Netlify Forms/Formspree), staging deploy | |
| 9 | Production build step — minify, obfuscate, strip source maps | Before going live only |
| 10 | Buffer — client asset swap-in (logo, favicon, footer links, founder photos) + review round | |

**Target:** first working draft ready to walk through tomorrow morning.

---

## 8. Open Questions for the Client

A few things worth confirming before or during the draft review, beyond what's already been settled:

1. Preferred form handler — Netlify Forms or Formspree — and where should submissions land (which email)?
2. WhatsApp number for the click-to-chat link (`https://wa.me/91XXXXXXXXXX` format)?
3. Any target launch date, or is staging review the only near-term deadline?
4. For the "Why Elora Spices" section (marked optional in PRD) — include in this round or defer?
5. Any preference between a carousel vs. other dynamic hero treatment (auto-rotate, parallax, animated text) — or open to dev's call?

---

*Prepared for internal dev use. Source PRD: Elora_Spices_Developer_Handoff_v1.pdf (Apzara Digital Branding, v1.0, Aug 2026).*
