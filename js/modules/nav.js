/* Nav module: sticky header shadow, mobile drawer toggle, smooth in-page anchor links with scroll-spy. */

/**
 * Mapping of sections to their corresponding primary navigation anchor IDs.
 * Sections without a dedicated top-level nav link map to their logical parent section.
 */
const SECTION_MAP = {
  'hero': 'hero',
  'natural-farming': 'natural-farming',
  'journey': 'natural-farming',
  'our-story': 'our-story',
  'vision-mission': 'vision-mission',
  'products': 'products',
  'why-elora': 'products',
  'commitment': 'products',
  'contact': 'contact',
};

export function init() {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = drawer?.querySelectorAll('.mobile-drawer__link');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('main > section[id]');

  if (!header || !hamburger || !drawer) return;

  /* ── State variables ── */
  let ticking = false;
  let isProgrammaticScroll = false;
  let scrollSuspendTimer = null;
  let scrollEndDebounceTimer = null;
  let currentActiveId = null;

  /* ── Active nav link styling ── */
  function setActiveNavLink(targetId) {
    if (!targetId || currentActiveId === targetId) return;
    currentActiveId = targetId;
    const hash = `#${targetId}`;

    navLinks.forEach((link) => {
      link.classList.toggle('nav__link--active', link.getAttribute('href') === hash);
    });

    if (drawerLinks) {
      drawerLinks.forEach((link) => {
        link.classList.toggle('mobile-drawer__link--active', link.getAttribute('href') === hash);
      });
    }
  }

  /* ── Scroll-spy: calculate active section ── */
  function updateActiveNavLink() {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );

    // Edge case 1: Top of page -> Home (#hero)
    if (scrollY < 50) {
      setActiveNavLink('hero');
      return;
    }

    // Edge case 2: Scrolled to or near bottom of page -> Contact (#contact)
    if (viewportHeight + scrollY >= docHeight - 50) {
      setActiveNavLink('contact');
      return;
    }

    // Section in viewport logic: reference offset below sticky header
    const headerHeight = header.offsetHeight || 64;
    const referenceY = Math.min(200, Math.max(headerHeight + 20, viewportHeight * 0.25));

    let activeSectionId = null;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= referenceY && rect.bottom > referenceY) {
        activeSectionId = section.id;
        break;
      }
    }

    // Fallback: choose section closest to reference line
    if (!activeSectionId && sections.length > 0) {
      let closestDist = Infinity;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const dist = Math.abs(rect.top - referenceY);
        if (dist < closestDist) {
          closestDist = dist;
          activeSectionId = section.id;
        }
      }
    }

    if (activeSectionId) {
      const mappedTarget = SECTION_MAP[activeSectionId] || activeSectionId;
      setActiveNavLink(mappedTarget);
    }
  }

  /* ── Sticky header shadow and scroll listener ── */
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }

        if (!isProgrammaticScroll) {
          updateActiveNavLink();
        } else {
          // Debounce completion of programmatic scroll
          if (scrollEndDebounceTimer) clearTimeout(scrollEndDebounceTimer);
          scrollEndDebounceTimer = setTimeout(() => {
            isProgrammaticScroll = false;
          }, 120);
        }

        ticking = false;
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  /* ── Suspend scroll-spy during programmatic smooth scroll ── */
  function suspendScrollSpy(duration = 1000) {
    isProgrammaticScroll = true;
    if (scrollSuspendTimer) clearTimeout(scrollSuspendTimer);
    if (scrollEndDebounceTimer) clearTimeout(scrollEndDebounceTimer);

    scrollSuspendTimer = setTimeout(() => {
      isProgrammaticScroll = false;
    }, duration);
  }

  function resumeScrollSpy() {
    if (isProgrammaticScroll) {
      isProgrammaticScroll = false;
      if (scrollSuspendTimer) clearTimeout(scrollSuspendTimer);
      if (scrollEndDebounceTimer) clearTimeout(scrollEndDebounceTimer);
      updateActiveNavLink();
    }
  }

  window.addEventListener('wheel', resumeScrollSpy, { passive: true });
  window.addEventListener('touchmove', resumeScrollSpy, { passive: true });
  window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
      resumeScrollSpy();
    }
  }, { passive: true });

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

  /* Close drawer on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('mobile-drawer--open')) {
      closeDrawer();
      hamburger.focus();
    }
  });

  /* ── Smooth in-page anchor links handling ── */
  function handleAnchorClick(e, link) {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = (href === '#' || href === '#top') ? 'hero' : href.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement || targetId === 'hero') {
      e.preventDefault();

      // Update active link immediately
      const mappedTarget = SECTION_MAP[targetId] || targetId;
      setActiveNavLink(mappedTarget);

      // Close mobile drawer if opened
      closeDrawer();

      // Temporarily suspend scroll-spy so it doesn't flicker during scroll transit
      suspendScrollSpy(1200);

      // Smooth scroll to target
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }

      // Update URL hash without causing an instant jump
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  }

  // Attach click handler to all in-page anchors
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href === '#' && !link.classList.contains('nav__logo') && !link.classList.contains('footer__logo')) {
        return;
      }
      handleAnchorClick(e, link);
    });
  });
}
