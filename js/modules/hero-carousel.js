/* Hero carousel: auto-rotating background slides with crossfade. */

const INTERVAL_MS = 6000; // Time per slide
const ACTIVE_CLASS = 'hero__slide--active';

export function init() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.hero__slide');
  if (slides.length < 2) return;

  let current = 0;
  let timer = null;
  let isPaused = false;

  function goTo(index) {
    slides[current].classList.remove(ACTIVE_CLASS);
    current = index % slides.length;
    slides[current].classList.add(ACTIVE_CLASS);
  }

  function next() {
    goTo(current + 1);
  }

  function startAutoPlay() {
    if (timer) return;
    timer = setInterval(() => {
      if (!isPaused) next();
    }, INTERVAL_MS);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  /* Pause on hover/focus for accessibility */
  carousel.addEventListener('mouseenter', () => { isPaused = true; });
  carousel.addEventListener('mouseleave', () => { isPaused = false; });

  /* Pause when tab is not visible to save resources */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  /* Respect reduced motion */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return;

  motionQuery.addEventListener('change', (e) => {
    if (e.matches) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  startAutoPlay();
}
