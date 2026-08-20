/*
  Entry point: the only file that imports feature modules and calls init().
  Modules must not import each other. Nothing is assigned to window.

  Init order on DOMContentLoaded:
  1. nav              — sticky header, mobile drawer, in-page links
  2. hero-carousel    — hero motion / auto-rotating imagery
  3. card-flip        — product card front/back interaction
  4. scroll-animations — IntersectionObserver reveals
  5. form-handler     — contact form submit, validation, status
*/

import { init as initNav } from './modules/nav.js';
import { init as initHeroCarousel } from './modules/hero-carousel.js';
import { init as initCardFlip } from './modules/card-flip.js';
import { init as initScrollAnimations } from './modules/scroll-animations.js';
import { init as initFormHandler } from './modules/form-handler.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroCarousel();
  initCardFlip();
  initScrollAnimations();
  initFormHandler();
});
