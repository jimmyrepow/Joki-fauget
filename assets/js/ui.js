/* ============================================================
   Joki Fauget — ui.js
   Perilaku antarmuka umum:
   1. Shadow header saat halaman discroll
   2. Tutup menu mobile setelah link diklik
   3. Animasi reveal saat elemen masuk viewport
   4. Highlight menu aktif sesuai section yang terlihat
    5. CTA layanan yang otomatis memilih kategori di form
    6. Notifikasi informasi untuk tautan yang belum tersedia
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var $ = JF.utils.$;
  var $$ = JF.utils.$$;
  var revealObserver = null;

  /* ---------- 1. Header shadow ---------- */
  function initHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    function updateOffset() {
      var height = Math.ceil(header.getBoundingClientRect().height) + 12;
      document.documentElement.style.setProperty(
        "--header-offset",
        height + "px"
      );
    }

    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateOffset);
    window.addEventListener("load", updateOffset);
    updateOffset();
    onScroll();
  }

  /* ---------- 2. Tutup menu mobile ---------- */
  function initMobileNav() {
    var navMenu = document.getElementById("navMenu");
    if (!navMenu) return;

    $$("#navMenu a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navMenu.classList.contains("show") && window.bootstrap) {
          bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
      });
    });
  }

  /* ---------- 3. Animasi reveal ---------- */
  function observeReveal(nodes) {
    var elements = Array.prototype.slice.call(nodes || []);
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) {
        el.classList.add("in");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }

    elements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- 4. Highlight menu aktif ---------- */
  function initActiveNav() {
    var page = document.body.getAttribute("data-page") || "home";
    var links = $$(".nav-link-custom");

    function setActive(name) {
      links.forEach(function (link) {
        var on = link.getAttribute("data-page") === name;
        link.classList.toggle("active", on);
        if (on) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }

    setActive(page);
    if (page !== "home") return;

    var sectionMap = { beranda: "home", faq: "faq" };
    var sections = Object.keys(sectionMap)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(sectionMap[entry.target.id] || page);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- 5. CTA membawa pilihan kategori ---------- */
  function initServicePreference() {
    var select = document.getElementById("kategori");
    if (!select) return;

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-service]");
      if (!trigger) return;

      var value = trigger.getAttribute("data-service");
      Array.prototype.forEach.call(select.options, function (option) {
        if (option.value === value) select.value = value;
      });
    });
  }

  /* ---------- 6. Notifikasi informasi ringan ---------- */
  function showInfo(message, options) {
    options = options || {};

    var previous = $(".info-toast");
    if (previous && previous.parentNode) previous.parentNode.removeChild(previous);

    var toast = document.createElement("div");
    toast.className = "info-toast";
    toast.setAttribute("role", "status");
    toast.innerHTML =
      '<span class="toast-icon">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>' +
      "</span>" +
      '<div class="toast-body"><h6>Informasi</h6><p></p><div class="toast-actions"></div></div>' +
      '<button type="button" class="toast-close" aria-label="Tutup notifikasi">&times;</button>';

    var body = toast.querySelector(".toast-body");
    var text = body ? body.querySelector("p") : null;
    var actions = body ? body.querySelector(".toast-actions") : null;
    if (text) text.textContent = message;

    (options.actions || []).forEach(function (action) {
      if (!actions) return;
      var link = document.createElement("a");
      link.href = action.href || "#";
      link.textContent = action.label;
      if (action.primary) link.className = "primary";
      actions.appendChild(link);
    });

    document.body.appendChild(toast);
    window.requestAnimationFrame(function () { toast.classList.add("show"); });

    function hide() {
      toast.classList.remove("show");
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 250);
    }

    var close = toast.querySelector(".toast-close");
    if (close) close.addEventListener("click", hide);

    var timer = window.setTimeout(hide, options.duration || 8000);
    toast.addEventListener("mouseenter", function () { window.clearTimeout(timer); });
    toast.addEventListener("mouseleave", function () {
      timer = window.setTimeout(hide, 3000);
    });

    return toast;
  }

  JF.ui = {
    init: function () {
      initHeader();
      initMobileNav();
      initActiveNav();
      initServicePreference();
      observeReveal($$(".reveal"));
    },
    observeReveal: observeReveal,
    showInfo: showInfo
  };
})(window.JF);
