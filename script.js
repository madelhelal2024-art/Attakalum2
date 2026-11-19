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
  const levelDialog = document.getElementById('level-dialog');
  const closeLevel = document.querySelector('[data-close-level]');
  document.querySelectorAll('[data-level]').forEach(link => link.addEventListener('click', event => {
    const card = link.closest('.level-card');
    if (!card || typeof levelDialog?.showModal !== 'function') return;
    event.preventDefault();
    document.getElementById('dialog-level-name').textContent = card.querySelector('h3')?.textContent || '';
    document.getElementById('dialog-level-focus').textContent = card.querySelector('.level-key')?.textContent || '';
    document.getElementById('dialog-level-writing').textContent = card.querySelector('.level-content p:not(.level-key)')?.textContent || '';
    document.getElementById('dialog-level-cta').href = whatsapp + encodeURIComponent('مرحبًا، أريد معرفة المزيد عن مستوى «' + link.dataset.level + '» في سلسلة التكلّم.');
    levelDialog.showModal();
    closeLevel?.focus();
  }));
  closeLevel?.addEventListener('click', () => levelDialog?.close());
  levelDialog?.addEventListener('click', event => {
    if (event.target === levelDialog) levelDialog.close();
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
