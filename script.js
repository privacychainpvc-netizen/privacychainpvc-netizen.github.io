const wpBtn = document.getElementById('whitepaper-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

if (wpBtn && modal && closeBtn) {
  wpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}
