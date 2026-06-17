(function () {
  const toggle = document.querySelector(".nav__toggle");
  const panel = document.querySelector(".nav__panel");
  const navLinks = document.querySelectorAll(".nav__links a, .nav__cta");

  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      panel.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        panel.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const form = document.querySelector(".contact__form");
  if (form) {
    const status = form.querySelector(".form-status");
    const btn = form.querySelector('button[type="submit"]');
    const config = window.NEUROKIDS_GOOGLE_FORM;

    function isGoogleFormConfigured() {
      return (
        config &&
        config.action &&
        config.entries &&
        config.entries.nome &&
        config.entries.email &&
        config.entries.mensagem
      );
    }

    function showStatus(message, type) {
      if (!status) return;
      status.textContent = message;
      status.hidden = false;
      status.classList.remove("form-status--success", "form-status--error");
      status.classList.add(type === "error" ? "form-status--error" : "form-status--success");
    }

    function clearStatus() {
      if (!status) return;
      status.hidden = true;
      status.textContent = "";
      status.classList.remove("form-status--success", "form-status--error");
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearStatus();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!isGoogleFormConfigured()) {
        showStatus(
          "Formulário em configuração. Entre em contato pelo WhatsApp ou e-mail.",
          "error"
        );
        return;
      }

      const original = btn.textContent;
      btn.textContent = "Enviando...";
      btn.disabled = true;

      const payload = new FormData();
      payload.append(config.entries.nome, form.nome.value.trim());
      payload.append(config.entries.email, form.email.value.trim());
      if (form.telefone.value.trim()) {
        payload.append(config.entries.telefone, form.telefone.value.trim());
      }
      payload.append(config.entries.mensagem, form.mensagem.value.trim());

      try {
        await fetch(config.action, {
          method: "POST",
          mode: "no-cors",
          body: payload
        });

        showStatus("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");
        form.reset();
      } catch {
        showStatus("Não foi possível enviar. Tente novamente ou use o WhatsApp.", "error");
      } finally {
        btn.textContent = original;
        btn.disabled = false;
      }
    });
  }

  const conveniosSlider = document.querySelector(".convenios__slider");
  if (conveniosSlider) {
    const viewport = conveniosSlider.querySelector(".convenios__viewport");
    const track = conveniosSlider.querySelector(".convenios__track");
    const prevBtn = conveniosSlider.querySelector(".convenios__nav--prev");
    const nextBtn = conveniosSlider.querySelector(".convenios__nav--next");
    const items = conveniosSlider.querySelectorAll(".convenios__item");
    let page = 0;
    const perPage = 4;

    function getMaxPage() {
      return Math.max(0, Math.ceil(items.length / perPage) - 1);
    }

    function getStepWidth() {
      return viewport.clientWidth;
    }

    function updateConveniosSlider() {
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      const itemWidth = (viewport.clientWidth - gap * (perPage - 1)) / perPage;
      items.forEach((item) => {
        item.style.width = `${itemWidth}px`;
      });
      page = Math.min(page, getMaxPage());
      track.style.transform = `translateX(-${page * getStepWidth()}px)`;
      prevBtn.disabled = page === 0;
      nextBtn.disabled = page >= getMaxPage();
    }

    prevBtn.addEventListener("click", () => {
      if (page > 0) {
        page -= 1;
        updateConveniosSlider();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (page < getMaxPage()) {
        page += 1;
        updateConveniosSlider();
      }
    });

    window.addEventListener("resize", updateConveniosSlider);
    updateConveniosSlider();
  }
})();
