document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 🔥 ANALYTICS / TRACKING
  // =========================
  function trackEvent(eventName, data = {}) {
    // Base de analítica (listo para GA4 / PostHog / Plausible)
    console.log("[analytics]", eventName, data);

    // Ejemplo futuro:
    // gtag('event', eventName, data);
  }


  // =========================
  // ✨ REVEAL ANIMATIONS
  // =========================
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);

          trackEvent("section_reveal", {
            section: entry.target.className
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });


  // =========================
  // 🪟 MODAL DE PROYECTOS
  // =========================
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  const modalLink = document.getElementById("modalLink");
  const closeModalBtn = document.querySelector(".close-modal");

  function openModal(card) {
    modalTitle.textContent = card.dataset.title || "";
    modalDescription.textContent = card.dataset.description || "";
    modalTech.textContent = card.dataset.tech || "";
    modalLink.href = card.dataset.link || "#";

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    trackEvent("project_open", {
      title: card.dataset.title,
      tech: card.dataset.tech
    });
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";

    trackEvent("modal_close");
  }

  if (modal) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => openModal(card));

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openModal(card);
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }


  // =========================
  // 🌐 I18N (MULTIIDIOMA)
  // =========================
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
  };

  let currentLang = "es";

  function updateToggleButton() {
    const btn = document.getElementById("languageToggle");
    if (!btn) return;

    btn.textContent = currentLang === "es" ? "🇺🇸 EN" : "🇪🇸 ES";
  }

  function setLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = translations[lang]?.[key];

      if (value) el.textContent = value;
    });

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);

    updateToggleButton();

    trackEvent("language_change", { lang });
  }


  // =========================
  // 🌍 INIT LANGUAGE
  // =========================
  const langBtn = document.getElementById("languageToggle");

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const newLang = currentLang === "es" ? "en" : "es";
      setLanguage(newLang);
    });
  }

  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);


  // =========================
  // 📈 NAV TRACKING (GROWTH)
  // =========================
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("nav_click", {
        section: link.getAttribute("href")
      });
    });
  });


  // =========================
  // ⚡ PAGE LOAD METRICS
  // =========================
  window.addEventListener("load", () => {
    trackEvent("page_loaded", {
      loadTime: performance.now()
    });
  });

});
