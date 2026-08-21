/* Scroll animations: IntersectionObserver-based reveals. No jank. */

const REVEAL_CLASS = 'reveal';
const VISIBLE_CLASS = 'reveal--visible';
const STAGGER_CLASS = 'reveal--stagger';

/* Selectors for elements that should animate in on scroll */
const REVEAL_SELECTORS = [
  '.natural-farming__grid',
  '.journey__steps',
  '.founder-card',
  '.founders__quote',
  '.vision-mission__grid',
  '.principles__grid',
  '.product-card',
  '.why-card',
  '.commitment .section-heading',
  '.commitment .section-intro',
  '.contact__grid',
];

/* Elements whose children should stagger-animate */
const STAGGER_SELECTORS = [
  '.journey__steps',
  '.products__grid',
  '.principles__grid',
  '.why-elora__grid',
];

export function init() {
  /* Respect reduced motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Add reveal classes to target elements */
  REVEAL_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add(REVEAL_CLASS);
    });
  });

  STAGGER_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add(REVEAL_CLASS, STAGGER_CLASS);
    });
  });

  /* Create observer */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target); // animate once only
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  /* Observe all reveal elements */
  document.querySelectorAll(`.${REVEAL_CLASS}`).forEach((el) => {
    observer.observe(el);
  });
}
