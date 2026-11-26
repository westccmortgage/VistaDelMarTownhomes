(() => {
  const root = document.documentElement;

  /* ---------- scroll lock (on <html> only) ---------- */
  const locks = new Set();
  const setLock = (key, on) => {
    if (on) locks.add(key); else locks.delete(key);
    root.classList.toggle('is-locked', locks.size > 0);
  };

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  const mq = window.matchMedia('(max-width: 900px)');

  const setMenu = (open, returnFocus) => {
    if (!toggle || !nav) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    setLock('menu', open);
    if (!open && returnFocus) toggle.focus();
  };
  const menuOpen = () => !!nav && nav.classList.contains('is-open');

  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(!menuOpen()));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('click', (e) => {
      if (menuOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    const onMq = () => { if (!mq.matches && menuOpen()) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else mq.addListener(onMq);
  }

  /* ---------- lightbox ---------- */
  const modal = document.getElementById('plan-modal');
  const image = document.getElementById('plan-modal-image');
  const title = document.getElementById('plan-modal-title');
  const copy = document.getElementById('plan-modal-copy');
  const caption = document.getElementById('plan-modal-caption');
  const fullLink = document.getElementById('plan-modal-full');

  if (modal && image && title && copy) {
    const defaultCaption = caption ? caption.textContent : '';
    const closeBtn = modal.querySelector('.plan-modal__close');
    let lastTrigger = null;

    const openModal = (trigger) => {
      lastTrigger = trigger;
      const src = trigger.dataset.image || '';
      image.alt = trigger.dataset.title || 'Vista Del Mar project plan';
      image.src = src;
      title.textContent = trigger.dataset.title || 'Project Plan';
      copy.textContent = trigger.dataset.copy || '';
      if (caption) caption.textContent = trigger.dataset.caption || defaultCaption;
      if (fullLink) fullLink.href = src;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      setLock('modal', true);
      closeBtn?.focus();
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      setLock('modal', false);
      image.removeAttribute('src');
      lastTrigger?.focus();
    };

    document.querySelectorAll('[data-image]').forEach((trigger) => {
      trigger.addEventListener('click', () => openModal(trigger));
    });
    modal.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModal));

    document.addEventListener('keydown', (event) => {
      if (!modal.classList.contains('is-open')) return;
      if (event.key === 'Escape') { closeModal(); return; }
      if (event.key === 'Tab') {
        const items = [closeBtn, fullLink].filter(Boolean);
        const i = items.indexOf(document.activeElement);
        event.preventDefault();
        const next = event.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
        items[next].focus();
      }
    });
  }

  /* Esc closes the menu (modal handler above takes priority when the modal is open) */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen() && !(modal && modal.classList.contains('is-open'))) setMenu(false, true);
  });

  /* ---------- unit-mix table: swipe hint + edge fade ---------- */
  const wrap = document.getElementById('table-wrap');
  const frame = document.getElementById('table-frame');
  const hint = document.getElementById('swipe-hint');
  if (wrap && frame) {
    const update = () => {
      const overflow = wrap.scrollWidth - wrap.clientWidth > 2;
      const more = overflow && wrap.scrollLeft + wrap.clientWidth < wrap.scrollWidth - 2;
      frame.classList.toggle('has-more', more);
      if (hint) hint.hidden = !more;
    };
    wrap.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  }
})();
