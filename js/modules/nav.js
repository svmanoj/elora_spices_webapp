/* Nav module: sticky header shadow, mobile drawer toggle, smooth in-page anchor links. */

export function init() {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = drawer?.querySelectorAll('.mobile-drawer__link');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!header || !hamburger || !drawer) return;

  /* ── Sticky header shadow on scroll ── */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  /* ── Mobile drawer toggle ── */
  function openDrawer() {
    hamburger.classList.add('nav__hamburger--open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('mobile-drawer--open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('body--drawer-open');
  }

  function closeDrawer() {
    hamburger.classList.remove('nav__hamburger--open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('mobile-drawer--open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('body--drawer-open');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('nav__hamburger--open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  /* Close drawer on link click */
  if (drawerLinks) {
    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* Close drawer on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('mobile-drawer--open')) {
      closeDrawer();
      hamburger.focus();
    }
  });

  /* ── Active nav link tracking on scroll ── */
  const sections = document.querySelectorAll('main > section[id]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((link) => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }
}
