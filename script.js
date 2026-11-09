(function () {
  "use strict";

  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };
  var $$ = function (selector, context) {
    return Array.prototype.slice.call(
      (context || document).querySelectorAll(selector)
    );
  };

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* ---------------- Menú móvil ---------------- */
  function initMobileNav() {
    var nav = $(".nav");
    var menu = nav ? $("ul", nav) : null;
    if (!nav || !menu) return;

    if (!menu.id) menu.id = "navMenu";

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Abrir menú");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", menu.id);
    toggle.innerHTML = "<span></span><span></span><span></span>";
    nav.appendChild(toggle);

    function setOpen(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }

    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("open"));
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target)) setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 640) setOpen(false);
    });
  }

  /* ---------------- Buscadores ---------------- */
  function initSearch(config) {
    var input = document.getElementById(config.inputId);
    var empty = document.getElementById(config.emptyId);
    if (!input) return;

    var items = $$(config.itemSelector);
    // Grupos (bloques y carreras), del más interno al más externo
    var groups = $$("[data-search-group]").reverse();

    function labelOf(el) {
      var group = el.closest("[data-search-label]");
      return group ? group.getAttribute("data-search-label") : "";
    }

    input.addEventListener("input", function () {
      var query = normalize(input.value.trim());
      var visible = 0;

      items.forEach(function (item) {
        var text = normalize(item.textContent + " " + labelOf(item));
        var match = !query || text.indexOf(query) !== -1;
        item.classList.toggle("is-hidden", !match);
        if (match) visible++;
      });

      groups.forEach(function (group) {
        var label = normalize(group.getAttribute("data-search-label") || "");
        var labelMatch = Boolean(query && label && label.indexOf(query) !== -1);
        var hasVisible = $$(config.itemSelector + ":not(.is-hidden), [data-search-group]:not(.is-hidden)", group).length > 0;
        var show = !query || labelMatch || hasVisible;
        group.classList.toggle("is-hidden", !show);
        if (labelMatch && !hasVisible) visible++;

        if (group.tagName === "DETAILS") group.open = Boolean(query && show);
      });

      if (empty) empty.hidden = visible !== 0;
    });
  }

  /* ---------------- Copiar al portapapeles ---------------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return legacyCopy(text);
        }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch (error) {
      return false;
    }
  }

  function initCopyButtons() {
    var links = $$('.foot-col a[href*="wa.me"], .foot-col a[href^="mailto:"]');

    links.forEach(function (link) {
      var text = link.textContent.trim();
      if (!text) return;

      link.classList.add("copy-target");

      var button = document.createElement("button");
      button.type = "button";
      button.className = "copy-btn";
      button.textContent = "Copiar";
      button.setAttribute("aria-label", "Copiar " + text);

      button.addEventListener("click", function (event) {
        event.preventDefault();
        copyText(text).then(function (ok) {
          button.textContent = ok ? "¡Copiado!" : "No se pudo";
          button.classList.toggle("copied", ok);
          window.setTimeout(function () {
            button.textContent = "Copiar";
            button.classList.remove("copied");
          }, 1600);
        });
      });

      link.insertAdjacentElement("afterend", button);
    });
  }

  /* ---------------- Formulario de contacto ---------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var status = document.getElementById("formStatus");
    var mailBtn = document.getElementById("mailBtn");

    var waFooter = $('.foot-col a[href*="wa.me"]');
    var mailFooter = $('.foot-col a[href^="mailto:"]');

    var phone = waFooter
      ? waFooter.href.split("wa.me/")[1].split("?")[0]
      : "5493410000001";
    var email = mailFooter
      ? mailFooter.href.replace("mailto:", "").split("?")[0]
      : "cetufeti@gmail.com";

    function setStatus(message, isError) {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle("error", Boolean(isError));
    }

    var DOMINIO = "@frsn.utn.edu.ar";

    function validarMailFacultad(field) {
      var value = field.value.trim().toLowerCase();
      var usuario = value.slice(0, -DOMINIO.length);
      var ok =
        value.length > DOMINIO.length &&
        value.slice(-DOMINIO.length) === DOMINIO &&
        /^[a-z0-9._%+-]+$/.test(usuario);
      field.setCustomValidity(
        ok || value === "" ? "" : "Usá tu mail de la facultad (termina en " + DOMINIO + ")."
      );
    }

    form.elements.email.addEventListener("input", function () {
      validarMailFacultad(form.elements.email);
    });

    function collect() {
      var name = form.elements.nombre;
      var lastName = form.elements.apellido;
      var mail = form.elements.email;
      var year = form.elements.anio;
      var career = form.elements.carrera;
      var message = form.elements.mensaje;
      var fields = [name, lastName, mail, year, career, message];

      validarMailFacultad(mail);

      var valid = true;
      fields.forEach(function (field) {
        var fieldValid = field.checkValidity();
        field.classList.toggle("invalid", !fieldValid);
        if (!fieldValid) valid = false;
      });

      if (!valid) {
        form.reportValidity();
        setStatus("Revisá los campos marcados antes de enviar.", true);
        return null;
      }

      var fullName = name.value.trim() + " " + lastName.value.trim();

      var lines = [
        "Hola, soy " + fullName + ".",
        "Carrera: " + career.value,
        "Año: " + year.value,
        "Mail: " + mail.value.trim().toLowerCase(),
        "",
        message.value.trim(),
      ];

      return {
        name: fullName,
        text: lines.join("\n"),
      };
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = collect();
      if (!data) return;

      var url =
        "https://wa.me/" + phone + "?text=" + encodeURIComponent(data.text);
      window.open(url, "_blank", "noopener");
      // No se borra el formulario: si la persona cierra WhatsApp sin
      // enviar, no pierde lo que escribió. Para empezar de nuevo está
      // el botón "Borrar".
      setStatus("Abriendo WhatsApp con tu mensaje, " + data.name + "…", false);
    });

    if (mailBtn) {
      mailBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var data = collect();
        if (!data) return;

        var url =
          "mailto:" +
          email +
          "?subject=" +
          encodeURIComponent("Consulta de " + data.name) +
          "&body=" +
          encodeURIComponent(data.text);
        window.location.href = url;
        setStatus("Abriendo tu cliente de email…", false);
      });
    }

    form.addEventListener("reset", function () {
      $$(".invalid", form).forEach(function (field) {
        field.classList.remove("invalid");
        field.setCustomValidity("");
      });
      setStatus("", false);
    });
  }

  /* ---------------- Links pendientes ("Próximamente") ---------------- */
  // Los links con href="#" todavía no tienen material: se muestran
  // deshabilitados. Al poner el link real, se activan solos.
  function initPendingLinks() {
    $$('a.res-link[href="#"], a.group-card[href="#"]').forEach(function (link) {
      link.classList.add("is-pending");
      link.removeAttribute("target");
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.title = "Todavía no hay material cargado";

      if (link.classList.contains("group-card")) {
        var join = $(".g-join", link);
        if (join) join.textContent = "Próximamente";
      } else {
        var badge = document.createElement("span");
        badge.className = "soon";
        badge.textContent = "Próximamente";
        link.appendChild(badge);
      }

      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
    });
  }

  /* ---------------- Peso de los PDF ---------------- */
  // Muestra el tamaño de cada PDF propio para que nadie descargue
  // algo enorme con datos móviles sin saberlo.
  function formatSize(bytes) {
    var mb = bytes / (1024 * 1024);
    if (mb >= 1) return mb.toFixed(mb >= 10 ? 0 : 1).replace(".", ",") + " MB";
    return Math.max(1, Math.round(bytes / 1024)) + " KB";
  }

  function initPdfSizes() {
    if (!window.fetch || location.protocol === "file:") return;

    $$('a.res-link[href$=".pdf"]').forEach(function (link) {
      if (/^https?:/i.test(link.getAttribute("href"))) return;

      fetch(link.href, { method: "HEAD" })
        .then(function (response) {
          var length = Number(response.headers.get("content-length"));
          if (!response.ok || !length) return;
          var size = document.createElement("span");
          size.className = "res-size";
          size.textContent = formatSize(length);
          link.appendChild(size);
        })
        .catch(function () {});
    });
  }

  /* ---------------- Animaciones al hacer scroll ---------------- */
  function initReveal() {
    if (!("IntersectionObserver" in window) || reduceMotion) return;

    var targets = $$(
      ".hero h1, .hero .lead, .cta-row, .section-head, .subject, .roster-row, .group-card, .contact-form, .foot-col"
    );
    if (!targets.length) return;

    targets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------- Volver arriba ---------------- */
  function initBackToTop() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "to-top";
    button.setAttribute("aria-label", "Volver arriba");
    button.innerHTML = "&uarr;";
    document.body.appendChild(button);

    function update() {
      button.classList.toggle("show", window.scrollY > 400);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  }

  function init() {
    initMobileNav();
    initPendingLinks();
    initPdfSizes();
    initReveal();
    initBackToTop();
    initCopyButtons();
    initContactForm();

    initSearch({
      inputId: "resourceSearch",
      emptyId: "resourceEmpty",
      itemSelector: ".subject",
    });

    initSearch({
      inputId: "groupSearch",
      emptyId: "groupEmpty",
      itemSelector: ".group-card",
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
