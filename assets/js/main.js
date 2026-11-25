/* ============================================================
   Joki Fauget — main.js
   Titik masuk: menjalankan semua modul setelah DOM siap.
    Modul yang didaftarkan di sini (urutan eksekusi):
    theme -> site -> services -> portfolio -> faq -> ui -> form
    (services, portfolio & faq merender konten dari data.js sebelum
    ui memasang animasi reveal dan menu aktif.)
    Menambah fitur baru: buat file modul dengan JF.nama = { init },
    muat di semua halaman sebelum main.js, lalu daftarkan di bawah.
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var MODULES = ["theme", "site", "services", "portfolio", "faq", "ui", "form"];

  function boot() {
    MODULES.forEach(function (name) {
      var module = JF[name];
      if (module && typeof module.init === "function") {
        module.init();
      } else {
        console.warn("[Joki Fauget] Modul tidak ditemukan:", name);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window.JF);
