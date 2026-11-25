/* ============================================================
   Joki Fauget — theme.js
   Pengalih tema terang/gelap:
   - tema awal diterapkan oleh skrip kecil di <head> (anti-kedip)
   - tombol #themeToggle membalik tema & menyimpannya
    - bila pengguna belum memilih, tema memakai config.theme.default
   - meta theme-color ikut diperbarui untuk browser mobile
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var config = JF.config.theme;
  var root = document.documentElement;
  var media = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  function stored() {
    if (!config.remember) return null;
    try {
      var value = localStorage.getItem(config.storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return media && media.matches ? "dark" : "light";
  }

  function resolveTheme() {
    var saved = stored();
    if (saved) return saved;
    if (config.default === "light" || config.default === "dark") {
      return config.default;
    }
    return systemTheme();
  }

  function updateMetaColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    var color = theme === "dark" ? config.colors.dark : config.colors.light;
    if (color) meta.setAttribute("content", color);
  }

  function updateButton(theme) {
    var button = document.getElementById("themeToggle");
    if (!button) return;

    var isDark = theme === "dark";
    button.setAttribute("aria-pressed", isDark ? "true" : "false");
    button.setAttribute(
      "aria-label",
      isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap"
    );
    button.setAttribute(
      "title",
      isDark ? "Tema terang" : "Tema gelap"
    );
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    updateMetaColor(theme);
    updateButton(theme);

    if (persist && config.remember) {
      try {
        localStorage.setItem(config.storageKey, theme);
      } catch (e) {
        /* localStorage diblokir: tema tetap jalan untuk sesi ini */
      }
    }
  }

  function initToggle() {
    var button = document.getElementById("themeToggle");
    if (!button) return;

    button.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      apply(current === "dark" ? "light" : "dark", true);
    });
  }

  /* Ikuti perubahan tema OS selama pengguna belum memilih sendiri */
  function initSystemWatcher() {
    if (!media || !media.addEventListener) return;

    media.addEventListener("change", function (event) {
      if (stored()) return;
      if (config.default === "light" || config.default === "dark") return;
      apply(event.matches ? "dark" : "light", false);
    });
  }

  JF.theme = {
    init: function () {
      apply(resolveTheme(), false);
      initToggle();
      initSystemWatcher();
    }
  };
})(window.JF);
