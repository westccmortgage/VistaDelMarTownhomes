(() => {
  const modal = document.getElementById('plan-modal');
  if (!modal) return;

  const visual = document.getElementById('plan-modal-visual');
  const title = document.getElementById('plan-modal-title');
  const copy = document.getElementById('plan-modal-copy');
  const classNames = ['site','clusters','floor','elev','foundation','details'];

  const setPlan = (plan) => {
    classNames.forEach(name => visual.classList.remove('sprite-frame--' + name));
    visual.classList.add('sprite-frame--' + (classNames.includes(plan) ? plan : 'site'));
  };

  const openModal = (trigger) => {
    setPlan(trigger.dataset.plan || 'site');
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
  };

  document.querySelectorAll('[data-plan]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
