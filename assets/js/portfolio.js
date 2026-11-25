/* ============================================================
   Joki Fauget — portfolio.js
   Merender filter + kartu portfolio dari JF.data, lalu menangani
   filter kategori dan modal detail.
   Isi portfolio: assets/js/data.js
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var $$ = JF.utils.$$;
  var esc = JF.utils.escapeHtml;
  var ARROW =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CHECK_ICON =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  /* ---------- Preview dekoratif bila sebuah item tidak punya gambar ---------- */
  function previewMock(type) {
    if (type === "web") {
      return (
        '<div class="pf-mock">' +
        '<div class="h"></div><div class="l"></div><div class="l s"></div>' +
        '<div class="pf-cols"><span class="a"></span><span class="b"></span><span class="c"></span></div>' +
        "</div>"
      );
    }
    if (type === "dash") {
      return (
        '<div class="pf-mock">' +
        '<div class="h"></div><div class="l s"></div>' +
        '<div class="pf-bars"><span></span><span></span><span></span><span></span><span></span></div>' +
        "</div>"
      );
    }
    if (type === "table") {
      return (
        '<div class="pf-mock">' +
        '<div class="h"></div>' +
        '<div class="pf-table"><i></i><i></i><i></i><i></i><i></i></div>' +
        "</div>"
      );
    }
    if (type === "poster") {
      return (
        '<div class="pf-poster">' +
        '<div class="pf-poster-head"></div>' +
        '<div class="pf-poster-line"></div>' +
        '<div class="pf-poster-line short"></div>' +
        '<div class="pf-poster-block"></div>' +
        "</div>"
      );
    }
    if (type === "video") {
      return (
        '<div class="pf-video">' +
        '<div class="pf-video-screen"><span class="pf-play"></span></div>' +
        '<div class="pf-timeline"><i></i><i></i><i></i><i></i></div>' +
        "</div>"
      );
    }
    return (
      '<div class="pf-doc">' +
      '<div class="h"></div><div class="l"></div><div class="l"></div>' +
      '<div class="l s"></div><div class="l"></div>' +
      "</div>"
    );
  }

  function card(item, index, preview) {
    var action = preview
      ? '<a href="portfolio.html" class="btn-preview-link" aria-label="Buka portfolio lengkap">Lihat Portfolio ' + ARROW + "</a>"
      : '<button type="button" class="btn-detail" aria-label="Lihat detail ' + esc(item.title) + '"' +
        ' data-title="' + esc(item.title) + '"' +
        ' data-cat="' + esc(item.categoryLabel) + '"' +
        ' data-desc="' + esc(item.desc) + '"' +
        ' data-image="' + esc(item.image || "") + '"' +
        ' data-alt="' + esc(item.alt) + '"' +
        ' data-points="' + esc(item.points.join("|")) + '">Lihat Detail</button>';

    return (
      '<div class="col-12 col-sm-6 col-lg-4 reveal' +
      (index % 3 === 1 ? " d1" : index % 3 === 2 ? " d2" : "") +
      '" data-category="' + esc(item.category) + '">' +
      '<article class="portfolio-card card-lift">' +
      '<div class="pf-preview ' + esc(item.mock) + '">' +
      '<span class="pf-badge">Demo Project</span>' +
      (item.image
        ? '<img class="pf-img" src="' + esc(item.image) + '" alt="' + esc(item.alt) +
          '" width="800" height="500" loading="lazy" decoding="async" />'
        : previewMock(item.mock)) +
      "</div>" +
      '<div class="pf-body">' +
      '<p class="pf-tag">' + esc(item.categoryLabel) + "</p>" +
      "<h3>" + esc(item.title) + "</h3>" +
      "<p>" + esc(item.desc) + "</p>" +
      action +
      "</div></article></div>"
    );
  }

  function filterButton(cat, index) {
    var active = index === 0;
    return (
      '<button type="button" class="filter-btn' + (active ? " active" : "") +
      '" data-filter="' + esc(cat.key) + '" aria-pressed="' + (active ? "true" : "false") +
      '">' + esc(cat.label) + "</button>"
    );
  }

  function render() {
    var bar = document.getElementById("filterBar");
    var grid = document.getElementById("portfolioGrid");

    if (bar) {
      bar.innerHTML = JF.data.categories.map(filterButton).join("");
    }
    if (grid) {
      grid.innerHTML = JF.data.portfolio
        .map(function (item, index) { return card(item, index, false); })
        .join("");
    }

    var previewGrid = document.getElementById("portfolioPreviewGrid");
    if (previewGrid) {
      previewGrid.innerHTML = JF.data.portfolio
        .slice(0, 3)
        .map(function (item, index) { return card(item, index, true); })
        .join("");
    }
  }

  /* ---------- Filter ---------- */
  function initFilter() {
    var bar = document.getElementById("filterBar");
    var grid = document.getElementById("portfolioGrid");
    var empty = document.getElementById("pfEmpty");
    if (!bar || !grid) return;

    var total = JF.data.portfolio.length;

    bar.addEventListener("click", function (event) {
      var button = event.target.closest(".filter-btn");
      if (!button) return;

      var filter = button.getAttribute("data-filter");

      $$(".filter-btn", bar).forEach(function (other) {
        other.classList.remove("active");
        other.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      var shown = 0;
      $$("#portfolioGrid > [data-category]").forEach(function (column) {
        var match =
          filter === "all" || column.getAttribute("data-category") === filter;

        column.classList.toggle("hide", !match);

        if (match) {
          shown++;
          column.classList.remove("in");
          void column.offsetWidth;
          column.classList.add("in");
        }
      });

      if (empty) {
        empty.textContent = shown
          ? "Menampilkan " + shown + " dari " + total + " contoh project."
          : "Belum ada contoh pada kategori ini.";
      }
    });
  }

  /* ---------- Modal detail ---------- */
  function initModal() {
    var modalEl = document.getElementById("pfModal");
    if (!modalEl || !window.bootstrap) return;

    var modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    var title = document.getElementById("pfModalTitle");
    var cat = document.getElementById("pfModalCat");
    var desc = document.getElementById("pfModalDesc");
    var image = document.getElementById("pfModalImg");
    var list = document.getElementById("pfModalPoints");
    if (!title || !cat || !desc || !list) return;

    document.addEventListener("click", function (event) {
      var button = event.target.closest(".btn-detail");
      if (!button || !button.hasAttribute("data-title")) return;

      title.textContent = button.getAttribute("data-title") || "";
      cat.textContent = button.getAttribute("data-cat") || "";
      desc.textContent = button.getAttribute("data-desc") || "";

      var source = button.getAttribute("data-image") || "";
      if (image) {
        if (source) {
          image.src = source;
          image.alt = button.getAttribute("data-alt") || "";
          image.hidden = false;
        } else {
          image.hidden = true;
          image.removeAttribute("src");
          image.alt = "";
        }
      }

      list.textContent = "";
      (button.getAttribute("data-points") || "").split("|").forEach(function (point) {
        if (!point.trim()) return;
        var item = document.createElement("li");
        var span = document.createElement("span");
        item.innerHTML = CHECK_ICON;
        span.textContent = point;
        item.appendChild(span);
        list.appendChild(item);
      });

      modal.show();
    });
  }

  JF.portfolio = {
    init: function () {
      render();
      initFilter();
      initModal();
    }
  };
})(window.JF);
