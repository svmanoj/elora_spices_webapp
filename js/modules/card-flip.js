/* Card flip: product card front/back interaction via touch, hover, and keyboard. */

const FLIPPED_CLASS = 'product-card--flipped';

export function init() {
  const cards = document.querySelectorAll('.product-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    /* Ensure proper accessibility attributes */
    if (!card.hasAttribute('role')) {
      card.setAttribute('role', 'button');
    }
    card.setAttribute('aria-expanded', 'false');

    /* Click / Touch tap to flip */
    card.addEventListener('click', () => {
      const isFlipped = card.classList.toggle(FLIPPED_CLASS);
      card.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
    });

    /* Keyboard: Enter/Space to flip, Escape to unflip */
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isFlipped = card.classList.toggle(FLIPPED_CLASS);
        card.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
      } else if (e.key === 'Escape' && card.classList.contains(FLIPPED_CLASS)) {
        card.classList.remove(FLIPPED_CLASS);
        card.setAttribute('aria-expanded', 'false');
      }
    });

    /* Flip back when focus leaves the card (keyboard accessibility) */
    card.addEventListener('blur', () => {
      card.classList.remove(FLIPPED_CLASS);
      card.setAttribute('aria-expanded', 'false');
    });

    /* Flip back when mouse leaves card (desktop hover helper) */
    card.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        card.classList.remove(FLIPPED_CLASS);
        card.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* Close flipped cards when clicking/tapping outside any card (mobile/touch) */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.product-card')) {
      cards.forEach((card) => {
        if (card.classList.contains(FLIPPED_CLASS)) {
          card.classList.remove(FLIPPED_CLASS);
          card.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}
