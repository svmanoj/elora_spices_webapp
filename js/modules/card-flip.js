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
}
