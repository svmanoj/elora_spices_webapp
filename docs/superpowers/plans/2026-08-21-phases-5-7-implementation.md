# Phases 5-7 (Images, SEO/AEO & Responsive QA/Bug Fixes) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete Phase 5 (Stock image optimization & WebP handling), Phase 6 (SEO/AEO meta, schema.org, robots.txt, sitemap.xml), and Phase 7 (Responsive QA across all screen sizes and fixing navigation active-link bugs).

**Architecture:** Vanilla HTML5, CSS3 (CSS custom properties, flexbox, CSS grid, media queries), and Modular ES JavaScript modules. Images processed to lightweight WebP format. IntersectionObserver used for accurate scroll-spy navigation.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES modules), WebP, Schema.org JSON-LD.

**Spec:** `references/masterplan.md`

## Global Constraints

- **No Frameworks:** Only vanilla HTML, CSS, JS.
- **Copy & Compliance Rules:** NEVER use "100% pesticide-free" or "zero chemicals" anywhere in copy or alt text. Use "naturally inspired", "responsible farming", "naturally cultivated".
- **Color Palette:** Emerald Green `#0B6B4A`, Gold `#C9A227` sparingly, White/Off-white surface `#FFFFFF` / `#F7F9F8`.
- **Typography:** Playfair Display / Lora (headings) + DM Sans / Inter (body). `font-display: swap`.
- **Responsive Design:** Mobile-first approach, tested clean at mobile (<768px), tablet (768px-1024px), desktop (>1024px).

---

### Task 1: Navigation Active Link & Scroll-Spy Bug Fix

**Files:**
- Modify: `js/modules/nav.js`
- Modify: `css/layout.css`
- Test: Manual browser check & script check on navigation scroll spy

**Interfaces:**
- Consumes: Navigation links (`.nav__link`, `.mobile-drawer__link`), section anchors (`#hero`, `#our-story`, `#natural-farming`, `#products`, `#vision-mission`, `#contact`).
- Produces: Robust `IntersectionObserver`-based or calculated scroll-spy that highlights exact active nav item during scroll and click navigation, resolving sticky active state on Home.

- [ ] **Step 1: Inspect current nav scroll spy logic in `js/modules/nav.js`**
- [ ] **Step 2: Update scroll spy using `IntersectionObserver` or refined `scroll` offset calculation**
  - Fix section mapping: Ensure sections without explicit nav links (e.g. `#journey`, `#why-elora`, `#commitment`) do NOT cause incorrect nav highlights or clear active highlight prematurely.
  - Implement dynamic threshold or `IntersectionObserver` to track the visible section in the viewport accurately.
  - Add click event handler for nav links to set active link immediately on click and prevent scroll jitter.
- [ ] **Step 3: Test navigation on scroll and click across section transitions**
- [ ] **Step 4: Commit navigation bug fix**

---

### Task 2: Phase 5 - Stock Image Optimization & WebP Asset Sourcing

**Files:**
- Create/Update: `assets/images/hero-1.webp`, `assets/images/hero-2.webp`, `assets/images/hero-3.webp`
- Create/Update: `assets/images/natural-farming.webp`, `assets/images/founder-jeevan.webp`, `assets/images/founder-balaji.webp`
- Create/Update: `assets/images/products/*.webp` (11 product images)
- Modify: `index.html` (update all `<img>` tags to use local WebP assets with proper alt text and loading attributes)

**Interfaces:**
- Consumes: High-resolution images from Unsplash/Pexels.
- Produces: Optimized local `.webp` images in `assets/images/` and updated image references in `index.html`.

- [ ] **Step 1: Source and download stock images for Hero, Philosophy, Founders, and Products**
- [ ] **Step 2: Convert images to optimized WebP format (target <150KB per image, <300KB for hero)**
- [ ] **Step 3: Update `index.html` image tags with local WebP paths, `width`/`height` attributes, and `loading="lazy"` (except hero `loading="eager"`)**
- [ ] **Step 4: Verify image loading and visual presentation in index.html**
- [ ] **Step 5: Commit Phase 5 image optimization changes**

---

### Task 3: Phase 6 - SEO & AEO Optimization Pass

**Files:**
- Modify: `index.html` (meta tags, title, Schema.org JSON-LD)
- Create: `robots.txt`
- Create: `sitemap.xml`

**Interfaces:**
- Consumes: Product metadata, company information, canonical URL (`https://eloraspices.com`).
- Produces: Valid JSON-LD structured data for `Organization` and 11 `Product` entities, meta tags, search engine indexing files.

- [ ] **Step 1: Enhance `index.html` meta headers (OpenGraph, Twitter Cards, canonical URL, language, viewport)**
- [ ] **Step 2: Add comprehensive Schema.org JSON-LD for Organization & all 11 Products**
- [ ] **Step 3: Generate root `robots.txt` and `sitemap.xml` files**
- [ ] **Step 4: Verify alt text compliance (ensure keyword-rich, natural descriptions, zero forbidden phrases)**
- [ ] **Step 5: Commit Phase 6 SEO/AEO changes**

---

### Task 4: Phase 7 - Responsive QA & Cross-Screen Polishing

**Files:**
- Modify: `css/layout.css`
- Modify: `css/components.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: All CSS layout rules, breakpoints (<768px, 768px-1024px, >1024px).
- Produces: Fully responsive layout across mobile, tablet, and desktop viewports with touch-friendly controls.

- [x] **Step 1: Test and refine Mobile View (<768px)**
  - Check drawer navigation open/close animations and focus management.
  - Verify card flip behavior on mobile touch devices (tap to flip).
  - Ensure zero horizontal overflow and proper font scaling.
- [x] **Step 2: Test and refine Tablet View (768px - 1024px)**
  - Check product grid layout (2-3 columns), founders cards, hero text bounds.
- [x] **Step 3: Test and refine Desktop View (>1024px)**
  - Ensure nav links hover effect, container max-width alignment, hero carousel smooth transitions.
- [x] **Step 4: Commit Phase 7 Responsive QA changes**
