document.addEventListener("DOMContentLoaded", () => {

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

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });


  // ===== MODAL / PROYECTOS =====
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  const modalLink = document.getElementById("modalLink");
  const closeModal = document.querySelector(".close-modal");

  if (modal) {
    document.querySelectorAll(".project-card").forEach((card) => {

      card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title || "";
        modalDescription.textContent = card.dataset.description || "";
        modalTech.textContent = card.dataset.tech || "";
        modalLink.href = card.dataset.link || "#";

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") card.click();
      });
    });

    const close = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeModal) closeModal.addEventListener("click", close);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
  }


  // ===== I18N =====
  const translations = {
    es: {
      "nav.about": "Sobre mí",
      "nav.services": "Servicios",
      "nav.projects": "Proyectos",
      "nav.contact": "Contacto",

      "about.title": "Sobre mí",
      "services.title": "Servicios",
      "projects.title": "Proyectos",
      "contact.title": "Contacto",
      "contact.text": "Escríbeme para trabajar juntos"
    },

    en: {
      "nav.about": "About",
      "nav.services": "Services",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      "about.title": "About me",
      "services.title": "Services",
      "projects.title": "Projects",
      "contact.title": "Contact",
      "contact.text": "Reach out to work together"
    }
  };

  let currentLang = "es";

  function setLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = translations[lang]?.[key];

      if (value !== undefined) {
        el.textContent = value;
      }
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


  // ===== INIT LANGUAGE =====
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
