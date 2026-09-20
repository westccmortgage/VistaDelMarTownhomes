(() => {
  const modal = document.getElementById('plan-modal');
  const image = document.getElementById('plan-modal-image');
  const title = document.getElementById('plan-modal-title');
  const copy = document.getElementById('plan-modal-copy');
  if (!modal || !image || !title || !copy) return;

  let lastTrigger = null;

  const openModal = (trigger) => {
    lastTrigger = trigger;
    image.src = trigger.dataset.image || '/assets/site-status.jpg';
    image.alt = trigger.dataset.title || 'Vista Del Mar project plan';
    title.textContent = trigger.dataset.title || 'Project Plan';
    copy.textContent = trigger.dataset.copy || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.plan-modal__close')?.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  };

  document.querySelectorAll('[data-image]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
