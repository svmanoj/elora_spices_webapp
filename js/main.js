/* Entry point: import feature modules and initialize them after the DOM is ready. */

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
