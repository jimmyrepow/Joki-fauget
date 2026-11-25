/* ============================================================
   Joki Fauget — config.js
   ============================================================
   SATU TEMPAT UNTUK SEMUA PENGATURAN.
    Cukup ubah nilai di file ini, tidak perlu menyentuh
    file HTML atau file lain.
   ============================================================ */
window.JF = window.JF || {};

window.JF.config = {
  /* --------------------------------------------------------
     1. IDENTITAS SITUS
     -------------------------------------------------------- */
  site: {
    name: "Joki Fauget",                                        // nama brand
    tagline: "Tugas & Project",                                 // sub-nama di bawah brand
    description:
      "Solusi berbagai kebutuhan akademik, digital, data, dokumen, dan kreatif.",
    note: "Bisa konsultasi dulu sebelum memesan.",
    footerTag: "Tugas Beres, Project Tuntas.",                   // teks kanan di copyright
    year: "",                                                   // kosong = pakai tahun berjalan otomatis
    title: "Joki Fauget — Tugas Beres, Project Tuntas."         // judul tab browser
  },

  /* --------------------------------------------------------
     2. KONTAK
     WhatsApp: kode negara tanpa "+" dan tanpa spasi.
     Contoh: "6281234567890"
     Jika dikosongkan (""), form tetap berjalan: pesan akan
     ditampilkan untuk disalin, dan tidak ada nomor palsu.
     -------------------------------------------------------- */
  contact: {
    whatsapp: "",
    instagram: "joki.tugas.pdg",
    instagramHandle: "@joki.tugas.pdg",
    email: ""                                                   // opsional
  },

  /* --------------------------------------------------------
     3. TEMA
     default: "system" (ikut perangkat) | "light" | "dark"
      storageKey harus sama dengan kunci di <head> setiap halaman.
     -------------------------------------------------------- */
  theme: {
    default: "light",
    storageKey: "jf-theme",
    remember: true,
    colors: {
      light: "#FFF5DF",                                         // meta theme-color tema terang
      dark: "#0B1727"                                          // meta theme-color tema gelap
    }
  },

  /* --------------------------------------------------------
     4. PESAN WHATSAPP & FORM
     -------------------------------------------------------- */
  messages: {
    default:
      "Halo Joki Fauget, saya ingin konsultasi mengenai kebutuhan tugas atau project saya.",
    sent: "Pesan sudah disiapkan. Lanjutkan pengiriman di WhatsApp.",
    missingNumber:
      "Nomor WhatsApp belum dikonfigurasi. Salin pesan di bawah atau kirim lewat Instagram:"
  }
};
