// 全站互動：手機選單開關、案例淡入動畫、黃色按鈕的光澤提示。
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '關閉' : '選單';
    nav.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
  matchMedia('(min-width:901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const projects = [...document.querySelectorAll('[data-reveal]')];
  const buttons = [...document.querySelectorAll('[data-cue]')];
  let revealObserver, cueObserver;
  function setupMotion() {
    revealObserver?.disconnect();
    cueObserver?.disconnect();
    if (motionPreference.matches || !('IntersectionObserver' in window)) {
      projects.forEach(item => item.classList.remove('reveal-ready', 'is-visible'));
      buttons.forEach(button => button.classList.remove('is-cued'));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold: 0.08, rootMargin: '0px 0px -24px 0px'});
    projects.forEach((item, index) => {
      // Keep above-the-fold content visible; enhance only upcoming content.
      if (item.getBoundingClientRect().top < innerHeight) return;
      item.style.setProperty('--reveal-delay', `${index % 4 * 80}ms`);
      item.classList.add('reveal-ready');
      revealObserver.observe(item);
    });
    cueObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-cued');
        cueObserver.unobserve(entry.target);
      });
    }, {threshold: 0.7});
    buttons.forEach(button => cueObserver.observe(button));
  }
  setupMotion();
  motionPreference.addEventListener('change', setupMotion);
})();