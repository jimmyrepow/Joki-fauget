/* ============================================================
   Joki Fauget — faq.js
   Accordion FAQ: satu panel terbuka pada satu waktu, tinggi
   panel dihitung otomatis dan disesuaikan saat resize.
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var $$ = JF.utils.$$;
  var esc = JF.utils.escapeHtml;

  var CHEVRON =
    '<svg class="faq-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  function render() {
    var list = document.getElementById("faqList");
    if (!list || !JF.data || !JF.data.faqs) return;

    var limit = parseInt(list.getAttribute("data-limit"), 10) || 0;
    var items = limit > 0 ? JF.data.faqs.slice(0, limit) : JF.data.faqs;

    list.innerHTML = items
      .map(function (faq, index) {
        var panelId = "faq-panel-" + index;
        var buttonId = "faq-btn-" + index;
        var delay = index > 0 ? " d" + Math.min(index, 4) : "";
        return (
          '<div class="faq reveal' + delay + '">' +
          '<button type="button" class="faq-btn" id="' + buttonId +
          '" aria-expanded="false" aria-controls="' + panelId + '">' +
          "<span>" + esc(faq.q) + "</span>" + CHEVRON +
          "</button>" +
          '<div class="faq-panel" id="' + panelId +
          '" role="region" aria-labelledby="' + buttonId + '">' +
          '<div class="faq-panel-inner">' + esc(faq.a) + "</div>" +
          "</div></div>"
        );
      })
      .join("");
  }

  function openItem(item) {
    var button = item.querySelector(".faq-btn");
    var panel = item.querySelector(".faq-panel");
    if (!button || !panel) return;

    item.classList.add("open");
    button.setAttribute("aria-expanded", "true");
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  function closeItem(item) {
    var button = item.querySelector(".faq-btn");
    var panel = item.querySelector(".faq-panel");
    if (!button || !panel) return;

    item.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = null;
  }

  function initAccordion() {
    $$(".faq").forEach(function (item) {
      var button = item.querySelector(".faq-btn");
      if (!button) return;

      button.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");

        $$(".faq.open").forEach(function (other) {
          if (other !== item) closeItem(other);
        });

        if (isOpen) closeItem(item);
        else openItem(item);
      });
    });
  }

  function initResizeHandler() {
    window.addEventListener("resize", function () {
      $$(".faq.open .faq-panel").forEach(function (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      });
    });
  }

  JF.faq = {
    init: function () {
      render();
      initAccordion();
      initResizeHandler();
    }
  };
})(window.JF);
