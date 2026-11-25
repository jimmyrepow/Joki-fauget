/* ============================================================
   Joki Fauget — utils.js
   Helper kecil yang dipakai bersama oleh modul lain.
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  /* Selector singkat */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call(
      (scope || document).querySelectorAll(selector)
    );
  }

  /* Escape teks/atribut sebelum dimasukkan ke innerHTML. */
  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* Buat link wa.me dari sebuah pesan.
     Mengembalikan null bila nomor belum diisi di config.js */
  function waLink(message) {
    var number = (JF.config.contact && JF.config.contact.whatsapp) || "";
    if (!number) return null;

    var text = message || JF.config.messages.default || "";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
  }

  JF.utils = {
    $: $,
    $$: $$,
    escapeHtml: escapeHtml,
    escapeAttr: escapeHtml,
    waLink: waLink
  };
})(window.JF);
