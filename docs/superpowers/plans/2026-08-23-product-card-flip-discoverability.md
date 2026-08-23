# Product Card Flip Discoverability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile discoverability of the product card flip interaction in the "Our Products" section by adding a persistent affordance icon and a one-time peek animation.

**Architecture:** Vanilla HTML5, CSS3 (custom properties, media queries, `::after` pseudo-elements), and modular ES JavaScript. The flip interaction already works — this adds visual cues only. No new files; modifications to existing CSS and JS modules only.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES modules).

**Spec:** Inline requirements (bounded task — no separate spec doc).

## Global Constraints

- **No Frameworks:** Only vanilla HTML, CSS, JS.
- **Copy & Compliance Rules:** NEVER use "100% pesticide-free" or "zero chemicals" anywhere in copy or alt text.
- **Color Palette:** Emerald Green `#0B6B4A`, Gold `#C9A227` sparingly, White/Off-white surface `#FFFFFF` / `#F7F9F8`.
- **SVG Conventions:** All inline SVGs use `fill="none"`, `stroke` for rendering, `stroke-width="1.5"`, `aria-hidden="true"`. Use `stroke="currentColor"` to inherit color context.
- **Card Flip:** Existing click/hover/keyboard flip logic in `js/modules/card-flip.js` must NOT be modified — only additive changes.

---

### Task 1: Add Persistent Affordance Icon (CSS-only)

**Files:**
- Modify: `css/components.css` — add `.product-card__front::after` pseudo-element styles

**Interfaces:**
- Consumes: Existing `.product-card__front` structure (11 product cards)
- Produces: A visible "tap to flip" icon on mobile, hover-revealed on desktop, positioned bottom-right corner of card front

- [ ] **Step 1: Add CSS `::after` pseudo-element for flip hint in `css/components.css`**

Append to the end of `css/components.css`:

```css
/* Product card flip affordance hint (CSS-only, no extra markup) */
.product-card__front::after {
  content: '';
  position: absolute;
  bottom: var(--space-sm);
  right: var(--space-sm);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85) url("data:image/svg+xml,...") no-repeat center;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 2;
}

/* Desktop: reveal on hover only */
@media (hover: hover) and (pointer: fine) {
  .product-card__front::after {
    opacity: 0;
  }
  .product-card:hover .product-card__front::after {
    opacity: 1;
  }
}
```

- [ ] **Step 2: Verify icon is visible on mobile viewport (<768px) and hidden on desktop until hover**

Open the site, resize browser to <768px — all 11 cards should show the icon. At desktop width, icon should appear only on card hover.

- [ ] **Step 3: Commit**

```bash
git add css/components.css
git commit -m "feat(products): add persistent flip-hint icon to product cards"
```

---

### Task 2: Add One-Time Peek Animation (JS)

**Files:**
- Modify: `js/modules/card-flip.js` — add peek logic at end of `init()`

**Interfaces:**
- Consumes: `.product-card` elements, `.product-card--flipped` class, `IntersectionObserver` API, `sessionStorage`
- Produces: A one-time visual demo of the flip on the first card when `#products` grid first scrolls into view

- [ ] **Step 1: Add peek animation logic to `js/modules/card-flip.js`**

Append the following to the end of the `init()` function, after the existing `document.addEventListener('click', ...)` block:

```javascript
  /* One-time peek animation: flip first card briefly on first scroll into view */
  if (
    !sessionStorage.getItem('productCardPeekDone') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const grid = document.querySelector('.products__grid');
    if (grid) {
      const peekObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const firstCard = grid.querySelector('.product-card');
              if (firstCard) {
                firstCard.classList.add(FLIPPED_CLASS);
                firstCard.setAttribute('aria-expanded', 'true');
                setTimeout(() => {
                  firstCard.classList.remove(FLIPPED_CLASS);
                  firstCard.setAttribute('aria-expanded', 'false');
                }, 700);
              }
              sessionStorage.setItem('productCardPeekDone', '1');
              peekObserver.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      peekObserver.observe(grid);
    }
  }
```

- [ ] **Step 2: Verify peek fires once on first scroll into #products**

- Open the site in a fresh session (clear sessionStorage)
- Scroll down to the "Our Products" section
- The first card should flip to its back face, then flip back after ~700ms
- Scroll away and scroll back — peek should NOT fire again
- Reload the page — peek should NOT fire again

- [ ] **Step 3: Verify reduced-motion respect**

- Enable "Reduce motion" in OS/browser accessibility settings
- Reload the page, scroll to #products
- Peek should NOT fire — cards should remain in their default state

- [ ] **Step 4: Verify no interference with existing flip logic**

- Tap/click a card — it should flip normally
- Tap again or tap outside — it should flip back
- On desktop, hover should flip cards as before
- Keyboard: Enter/Space to flip, Escape to unflip — all still working

- [ ] **Step 5: Commit**

```bash
git add js/modules/card-flip.js
git commit -m "feat(products): add one-time peek animation for card flip discoverability"
```

---

### Task 3: Final Verification & Ledger Update

**Files:**
- Create: `.superpowers/sdd/2026-08-23-product-card-flip-discoverability/progress.md`

**Interfaces:**
- Consumes: Git commit hashes from Tasks 1 and 2
- Produces: Updated SDD ledger entry

- [ ] **Step 1: Run full checklist verification**

| Check | Expected |
|-------|----------|
| Mobile viewport (<768px): icon visible on all 11 cards | Pass |
| Desktop viewport: icon hidden by default | Pass |
| Desktop viewport: icon appears on card hover | Pass |
| First scroll into #products: first card flips then unflips | Pass |
| Scroll away + scroll back: peek does NOT fire | Pass |
| Page reload (same session): peek does NOT fire | Pass |
| `prefers-reduced-motion: reduce`: peek skipped entirely | Pass |
| Existing click/tap flip: still works | Pass |
| Existing hover flip (desktop): still works | Pass |
| Existing keyboard flip: still works | Pass |
| No JS console errors | Pass |

- [ ] **Step 2: Create SDD ledger**

Create `.superpowers/sdd/2026-08-23-product-card-flip-discoverability/progress.md`:

```markdown
# SDD ledger — plan: docs/superpowers/plans/2026-08-23-product-card-flip-discoverability.md

## Pre-flight Check
Scan clean. Two tasks defined: persistent icon (CSS-only) and peek animation (JS).

## Todos
- [x] Task 1: Add persistent affordance icon (CSS `::after` pseudo-element)
- [x] Task 2: Add one-time peek animation (JS) (commit `<hash>`)
- [x] Task 3: Final verification & ledger update (commit `<hash>`)

## Rulings
- **Ruling:** Flip-hint icon uses CSS `::after` pseudo-element on `.product-card__front` — zero extra HTML markup, no duplication across 11 cards.
- **Ruling:** Peek animation gated via `sessionStorage('productCardPeekDone')` — fires exactly once per browser session.
- **Ruling:** `prefers-reduced-motion: reduce` check skips peek animation entirely; icon remains visible.
- **Ruling:** No existing card-flip.js handlers were modified — all changes are additive.
```

- [ ] **Step 3: Commit ledger and finalize**

```bash
git add .superpowers/sdd/2026-08-23-product-card-flip-discoverability/progress.md
git commit -m "docs(sdd): add product card flip discoverability ledger"
```
