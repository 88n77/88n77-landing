const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { menu?.setAttribute('aria-expanded','false'); if (mobileNav) mobileNav.hidden = true; }
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); mobileNav.hidden = !open; });
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// Progressive enhancement: content stays visible without JS or observer support.
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const items = [...document.querySelectorAll('.social-section-heading, .social-menu > a, .section-heading, .tile-grid > .tile, .brand-about-heading, .brand-about-copy, .contact-box, .services-head, .service-card, .process-grid > article')];
  let observer;
  const reveal = item => item.classList.add('is-revealed');
  const revealAll = () => { items.forEach(reveal); observer?.disconnect(); };
  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -32px 0px' });
    items.forEach(item => {
      const siblings = [...item.parentElement.children];
      const stagger = item.matches('.tile, .social-menu > a, .service-card') ? Math.min(siblings.indexOf(item) + 1, 3) * 80 : 0;
      item.style.setProperty('--reveal-delay', `${stagger}ms`);
      item.classList.add('reveal-ready');
      item.addEventListener('focusin', () => { reveal(item); observer.unobserve(item); }, { once: true });
      observer.observe(item);
    });
    motion.addEventListener('change', event => { if (event.matches) revealAll(); });
    window.addEventListener('pageshow', event => { if (event.persisted) revealAll(); });
  } catch { revealAll(); }
})();
