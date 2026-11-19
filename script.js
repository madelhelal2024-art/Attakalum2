(() => {
  'use strict';
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const links = [...document.querySelectorAll('.main-nav a')];
  const closeMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'فتح القائمة');
  };
  toggle?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
  });
  links.forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (nav?.classList.contains('open') && !event.target.closest('.site-header')) closeMenu();
  });
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const active = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      links.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + active.target.id;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
  const whatsapp = 'https://wa.me/201023201001?text=';
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.href = whatsapp + encodeURIComponent('مرحبًا، ' + link.dataset.whatsapp + '، أرجو إرسال التفاصيل.');
  });
  document.querySelectorAll('[data-level]').forEach(link => link.addEventListener('click', () => {
    const label = document.querySelector('#contact-title');
    if (label) label.setAttribute('data-selected-level', link.dataset.level);
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
