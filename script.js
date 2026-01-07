// ===== REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== MODAL / DRAWER =====
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalLink = document.getElementById('modalLink');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalTech.textContent = card.dataset.tech;
    modalLink.href = card.dataset.link;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter') card.click();
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
// ===== CONTACT DRAWER =====
const openDrawerBtn = document.querySelector('.open-drawer');
const contactDrawer = document.getElementById('contactDrawer');
const closeDrawerBtn = document.querySelector('.close-drawer');

if (openDrawerBtn) {
  openDrawerBtn.addEventListener('click', () => {
    contactDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (closeDrawerBtn) {
  closeDrawerBtn.addEventListener('click', () => {
    contactDrawer.classList.remove('active');
    document.body.style.overflow = '';
  });
}

contactDrawer.addEventListener('click', e => {
  if (e.target === contactDrawer) {
    contactDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }
});

