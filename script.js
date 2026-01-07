const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalLink = document.getElementById('modalLink');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.project-card').forEach(card => {
  const btn = card.querySelector('.project-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title || '';
    modalDescription.textContent = card.dataset.description || '';
    modalTech.textContent = card.dataset.tech || '';
    modalLink.href = card.dataset.link || '#';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
