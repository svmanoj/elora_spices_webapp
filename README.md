# Elora Spices — Website

Single-page static site for Elora Spices (Phase 1 / MVP). HTML5, CSS3, and vanilla JavaScript — no frameworks.

## Structure

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

## Local preview

Open `index.html` via a local static server so ES modules load correctly (file:// will often block them).

```bash
npx serve .
```

Then visit the URL printed in the terminal.

## CSS load order

Stylesheets are linked in this order: `tokens` → `base` → `layout` → `components` → `animations`.

## JavaScript

`js/main.js` is loaded as `type="module"` with `defer`. It imports each feature module and calls `init()` on `DOMContentLoaded`.
