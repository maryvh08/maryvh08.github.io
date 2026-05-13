// ===== REVEAL =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


// ===== MODAL / PROYECTOS =====
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLink");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalTech.textContent = card.dataset.tech;
    modalLink.href = card.dataset.link;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter") card.click();
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}


// ===== CONTACT DRAWER =====
const openDrawerBtn = document.querySelector(".open-drawer");
const contactDrawer = document.getElementById("contactDrawer");
const closeDrawerBtn = document.querySelector(".close-drawer");

if (openDrawerBtn && contactDrawer) {
  openDrawerBtn.addEventListener("click", () => {
    contactDrawer.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

if (closeDrawerBtn && contactDrawer) {
  closeDrawerBtn.addEventListener("click", () => {
    contactDrawer.classList.remove("active");
    document.body.style.overflow = "";
  });
}

if (contactDrawer) {
  contactDrawer.addEventListener("click", (e) => {
    if (e.target === contactDrawer) {
      contactDrawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}


// ===== I18N (IDIOMAS) =====
const translations = {
  es: {
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    "hero.intro": "Hola, soy Marycarmen Vives",
    "hero.title": "Diseño y desarrollo web profesional",
    "hero.subtitle": "Creo experiencias digitales modernas y funcionales.",
    "hero.cta1": "Contáctame",
    "hero.cta2": "Descargar CV",

    "about.title": "Sobre mí",
    "about.text1": "Soy diseñadora web y frontend freelance...",
    "about.text2": "Me apasiona crear experiencias digitales claras.",

    "services.title": "Servicios",

    "projects.title": "Proyectos destacados",

    "contact.title": "¿Trabajamos juntos?",
    "contact.text": "Si tienes una idea o proyecto, hablemos."
  },

  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.intro": "Hi, I'm Marycarmen Vives",
    "hero.title": "Professional web design and development",
    "hero.subtitle": "I create modern and functional digital experiences.",
    "hero.cta1": "Contact me",
    "hero.cta2": "Download CV",

    "about.title": "About me",
    "about.text1": "I'm a freelance web designer and frontend developer...",
    "about.text2": "I love creating clear digital experiences.",

    "services.title": "Services",

    "projects.title": "Featured projects",

    "contact.title": "Let's work together?",
    "contact.text": "If you have an idea or project, let's talk."
  }
};

let currentLang = "es";

function setLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key] || "";
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  updateToggleButton();
}

function updateToggleButton() {
  const btn = document.getElementById("languageToggle");

  if (!btn) return;

  btn.textContent = currentLang === "es"
    ? "🇺🇸 EN"
    : "🇪🇸 ES";
}


// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("languageToggle");

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const newLang = currentLang === "es" ? "en" : "es";
      setLanguage(newLang);
    });
  }

  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);
});
