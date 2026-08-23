# SDD ledger — plan: docs/superpowers/plans/2026-08-23-product-card-flip-discoverability.md

## Pre-flight Check
Scan clean. Two tasks defined: persistent icon (CSS-only) and peek animation (JS).

## Todos
- [x] Task 1: Add persistent affordance icon (CSS `::after` pseudo-element)
- [x] Task 2: Add one-time peek animation (JS in card-flip.js)
- [x] Task 3: Final verification & ledger update (commit `08a27e5`)

## Rulings
- **Ruling:** Flip-hint icon uses CSS `::after` pseudo-element on `.product-card__front` — zero extra HTML markup, no duplication across 11 cards.
- **Ruling:** Peek animation gated via `sessionStorage('productCardPeekDone')` — fires exactly once per browser session.
- **Ruling:** `prefers-reduced-motion: reduce` check skips peek animation entirely; icon remains visible.
- **Ruling:** No existing card-flip.js handlers were modified — all changes are additive.
