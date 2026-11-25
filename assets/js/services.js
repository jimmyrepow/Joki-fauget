/* ============================================================
   Joki Fauget — services.js
   Merender 5 kategori layanan dan 3 layanan unggulan dari
   assets/js/data.js ke dalam halaman.
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var CHECK =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var esc = JF.utils.escapeHtml;

  function checkList(items) {
    return items
      .map(function (item) {
        return "<li>" + CHECK + "<span>" + esc(item) + "</span></li>";
      })
      .join("");
  }

  /* ---------- 5 kategori layanan ---------- */
  function serviceCard(service, compact) {
    var column = compact ? "col-12 col-sm-6 col-lg-4" : "col-12 col-md-6";
    var items = compact ? service.items.slice(0, 3) : service.items;
    var wide = !compact && service.wide ? " is-wide" : "";

    return (
      '<div class="' + column + ' reveal">' +
      '<article class="service-card card-lift' +
      (compact ? " is-compact" : wide) + '">' +
      '<div class="service-head">' +
      '<div class="icon-box">' + service.icon + "</div>" +
      '<span class="service-num">' + esc(service.num) + "</span>" +
      "</div>" +
      "<h3>" + esc(service.title) + "</h3>" +
      '<p class="service-desc">' +
      esc(compact ? service.short || service.desc : service.desc) +
      "</p>" +
      '<ul class="feature-list">' + checkList(items) + "</ul>" +
      '<a href="#konsultasi" class="btn-line" data-service="' +
      esc(service.value) + '">' +
      esc(service.cta) +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
      "</a>" +
      "</article></div>"
    );
  }

  /* ---------- Visual layanan unggulan ---------- */
  function featuredVisual(type) {
    if (type === "web") {
      return (
        '<div class="fv fv-web" aria-hidden="true">' +
        '<div class="fv-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="fv-url"></span></div>' +
        '<div class="fv-body">' +
        '<div class="fv-line w-70 strong"></div><div class="fv-line w-90"></div><div class="fv-line w-50"></div>' +
        '<div class="fv-row"><span class="fv-btn"></span><span class="fv-btn ghost"></span></div>' +
        '<div class="fv-blocks"><span></span><span></span><span></span></div>' +
        "</div></div>"
      );
    }
    if (type === "dash") {
      return (
        '<div class="fv fv-dash" aria-hidden="true">' +
        '<div class="fv-panel-head"><span>Ringkasan</span><span class="fv-tag">LIVE</span></div>' +
        '<div class="fv-metrics"><div><small>Total</small><b>1.248</b></div><div><small>Rapi</small><b>100%</b></div></div>' +
        '<div class="fv-bars"><span></span><span></span><span></span><span></span><span></span><span></span></div>' +
        "</div>"
      );
    }
    return (
      '<div class="fv fv-doc" aria-hidden="true">' +
      '<div class="fv-sheet">' +
      '<div class="fv-line w-60 strong"></div>' +
      '<div class="fv-line w-90"></div><div class="fv-line w-80"></div><div class="fv-line w-90"></div>' +
      '<div class="fv-line w-40"></div>' +
      '<div class="fv-line w-90"></div><div class="fv-line w-70"></div>' +
      "</div>" +
      '<div class="fv-badge-doc">PDF</div>' +
      "</div>"
    );
  }

  function featuredCard(item) {
    return (
      '<div class="col-12 col-md-6 col-lg-4 reveal">' +
      '<article class="featured-card">' +
      '<div class="featured-visual">' + featuredVisual(item.visual) + "</div>" +
      '<p class="featured-label">' + esc(item.label) + "</p>" +
      '<h3 class="featured-title">' + esc(item.title) + "</h3>" +
      '<p class="featured-desc">' + esc(item.desc) + "</p>" +
      '<ul class="featured-points">' +
      item.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") +
      "</ul>" +
      "</article></div>"
    );
  }

  JF.services = {
    init: function () {
      var servicesGrid = document.getElementById("servicesGrid");
      if (servicesGrid) {
        servicesGrid.innerHTML = JF.data.services
          .map(function (service) { return serviceCard(service, false); })
          .join("");
      }

      var compactGrid = document.getElementById("servicesCompactGrid");
      if (compactGrid) {
        compactGrid.innerHTML = JF.data.services
          .map(function (service) { return serviceCard(service, true); })
          .join("");
      }

      var featuredGrid = document.getElementById("featuredGrid");
      if (featuredGrid) {
        featuredGrid.innerHTML = JF.data.featured.map(featuredCard).join("");
      }

      /* Elemen baru hasil render perlu ikut animasi reveal */
      if (JF.ui && typeof JF.ui.observeReveal === "function") {
        JF.ui.observeReveal(document.querySelectorAll(".reveal:not(.in)"));
      }
    }
  };
})(window.JF);
