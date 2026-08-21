/* Card flip: product card front/back interaction via click and keyboard. */

const FLIPPED_CLASS = 'product-card--flipped';

export function init() {
  const cards = document.querySelectorAll('.product-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    /* Click to flip */
    card.addEventListener('click', () => {
      card.classList.toggle(FLIPPED_CLASS);
    });

    /* Keyboard: Enter/Space to flip */
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle(FLIPPED_CLASS);
      }
    });

    /* Flip back when focus leaves the card (click elsewhere) */
    card.addEventListener('mouseleave', () => {
      /* Only auto-unflip on mouse leave for desktop — mobile stays until re-tap */
      if (window.matchMedia('(hover: hover)').matches) {
        card.classList.remove(FLIPPED_CLASS);
      }
    });
  });

  /* Close flipped card when clicking outside any card (mobile) */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.product-card')) {
      cards.forEach((card) => card.classList.remove(FLIPPED_CLASS));
    }
  });
}
