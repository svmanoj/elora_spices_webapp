# Elora Spices — Website

Single-page static site for Elora Spices: a modern farm-to-home spice brand.

## Tech stack

HTML5, CSS3, and vanilla JavaScript (ES modules). No frameworks, no bundler.

## Folder structure

```
elora-spices-website/
├── index.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── animations.css
├── js/
│   ├── main.js
│   └── modules/
│       ├── nav.js
│       ├── hero-carousel.js
│       ├── card-flip.js
│       ├── scroll-animations.js
│       └── form-handler.js
├── assets/
│   ├── images/
│   └── icons/
├── README.md
└── .gitignore
```

## Architecture

**CSS load order** (linked in `index.html` in this sequence — later files may override earlier ones):

1. `tokens.css` — brand custom properties (palette, spacing, type, radius, shadow)
2. `base.css` — reset, element defaults, document typography
3. `layout.css` — page structure, container, sticky nav, breakpoints
4. `components.css` — reusable UI blocks
5. `animations.css` — keyframes, transitions, motion

**JavaScript:** `js/main.js` is the only entry point (`type="module"`, `defer`). It imports each file under `js/modules/` and calls that module's `init()` on `DOMContentLoaded`. Feature modules do not import each other and do not assign to `window`. Init order: nav → hero-carousel → card-flip → scroll-animations → form-handler.

Serve the site over HTTP (for example `npx serve .`) so ES modules load; `file://` often blocks them.
