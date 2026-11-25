/* ============================================================
   Joki Fauget — data.js
    SEMUA ISI LAYANAN, PORTFOLIO & FAQ ADA DI SINI.
    Ubah/tambah item di array di bawah, tampilan menyesuaikan
    otomatis di semua halaman (tidak perlu menyentuh file HTML).

   Catatan: ikon memakai SVG inline (bukan emoji), mengikuti
   gaya visual brand.
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var ICONS = {
    akademik:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/><path d="M7 8h1.5M7 11h1.5M16 8h1.5M16 11h1.5"/></svg>',
    web:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18"/><path d="M6.2 6.3h.01M8.6 6.3h.01"/><path d="M8.5 12l-1.8 2 1.8 2M15.5 12l1.8 2-1.8 2"/></svg>',
    data:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V9M9.3 20V5M14.7 20v-8M20 20V3"/><path d="M2.5 20h19"/></svg>',
    desain:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18"/><path d="M7.5 13.5h5M7.5 16.5h9"/><circle cx="17" cy="6.5" r="1"/></svg>',
    multimedia:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M10 9.2l5 2.8-5 2.8z"/></svg>'
  };

  /* --------------------------------------------------------
     5 KATEGORI LAYANAN
     -------------------------------------------------------- */
  var services = [
    {
      num: "01",
      tone: "akademik",
      icon: ICONS.akademik,
      title: "Bantuan Akademik",
      desc: "Pendampingan untuk berbagai kebutuhan belajar, penyusunan materi, dan pengembangan karya akademik.",
      short: "Tugas, esai, skripsi, dan pendampingan belajar.",
      cta: "Konsultasi Akademik",
      value: "Akademik",
      items: [
        "Tugas sekolah dan kuliah",
        "Esai dan makalah",
        "Jurnal dan karya ilmiah",
        "Skripsi: konsultasi, editing, formatting, analisis",
        "PPT presentasi",
        "Review dan proofreading"
      ]
    },
    {
      num: "02",
      tone: "web",
      icon: ICONS.web,
      title: "Website & Programming",
      desc: "Pengembangan website, sistem, dan solusi programming sesuai kebutuhan project.",
      short: "Website, sistem informasi, coding, dan database.",
      cta: "Konsultasi Website",
      value: "Website & Programming",
      items: [
        "Landing page dan company profile",
        "Website booking dan toko online",
        "Sistem informasi dan website custom",
        "CRUD dan database",
        "Bantuan coding dan debugging"
      ]
    },
    {
      num: "03",
      tone: "data",
      icon: ICONS.data,
      title: "Data Processing",
      desc: "Membantu mengolah data menjadi informasi yang lebih terstruktur, mudah dipahami, dan siap digunakan.",
      short: "Excel, analisis, grafik, dan dashboard.",
      cta: "Konsultasi Data",
      value: "Olah Data",
      items: [
        "Input dan rekap data",
        "Excel dan spreadsheet",
        "Data cleaning",
        "Analisis data, grafik, dan visualisasi",
        "Dashboard dan pengolahan laporan"
      ]
    },
    {
      num: "04",
      tone: "desain",
      icon: ICONS.desain,
      title: "Dokumen & Desain",
      desc: "Berbagai kebutuhan dokumen dan desain visual yang rapi, menarik, dan sesuai kebutuhan.",
      short: "PPT, poster, CV, dan formatting dokumen.",
      cta: "Konsultasi Desain",
      value: "Dokumen & Desain",
      items: [
        "Editing dan formatting dokumen",
        "Desain presentasi dan poster",
        "CV dan portofolio",
        "Layout dokumen",
        "Desain visual lainnya"
      ]
    },
    {
      num: "05",
      tone: "multimedia",
      icon: ICONS.multimedia,
      title: "Multimedia & Kreatif",
      desc: "Solusi editing dan kebutuhan kreatif untuk konten maupun project.",
      short: "Editing video, gambar, dan konten kreatif.",
      cta: "Konsultasi Project",
      value: "Multimedia & Kreatif",
      wide: true,
      items: [
        "Editing video",
        "Video presentasi",
        "Editing gambar",
        "Konten media sosial",
        "Kebutuhan multimedia dan kreatif lainnya"
      ]
    }
  ];

  /* --------------------------------------------------------
     3 LAYANAN UNGGULAN (showcase visual)
     -------------------------------------------------------- */
  var featured = [
    {
      visual: "web",
      label: "Website Development",
      title: "Landing page sampai sistem informasi",
      desc: "Struktur rapi, responsif, dan siap dipakai — dari company profile sampai dashboard internal.",
      points: ["Responsif", "Struktur data jelas", "Mudah dirawat"]
    },
    {
      visual: "dash",
      label: "Data Processing",
      title: "Dari data mentah jadi laporan siap pakai",
      desc: "Input, cleaning, analisis, sampai visualisasi dan dashboard agar data mudah dibaca.",
      points: ["Excel & spreadsheet", "Analisis", "Visualisasi"]
    },
    {
      visual: "doc",
      label: "Academic & Creative Support",
      title: "Pendampingan akademik dan desain dokumen",
      desc: "Formatting, editing, presentasi, sampai kebutuhan visual untuk tugas maupun project.",
      points: ["Formatting", "Editing", "Desain presentasi"]
    }
  ];

  /* --------------------------------------------------------
     PORTFOLIO (semua item di sini masih DEMO, bukan klien asli)
     -------------------------------------------------------- */
  var categories = [
    { key: "all", label: "Semua" },
    { key: "web", label: "Website" },
    { key: "data", label: "Data" },
    { key: "akademik", label: "Akademik" },
    { key: "desain", label: "Desain" },
    { key: "multimedia", label: "Multimedia" }
  ];

  var portfolio = [
    {
      title: "Landing Page Kafe",
      category: "web",
      categoryLabel: "Website",
      mock: "web",
      image: "assets/img/portfolio/landing-page-kafe.svg",
      alt: "Tampilan demo landing page kafe dengan menu dan tombol pemesanan",
      desc: "Halaman promosi satu halaman dengan menu, galeri, dan tombol pemesanan.",
      points: ["Desain responsif", "Bagian menu dan galeri", "Tombol pesan ke WhatsApp"]
    },
    {
      title: "Company Profile Studio",
      category: "web",
      categoryLabel: "Website",
      mock: "web",
      image: "assets/img/portfolio/company-profile-studio.svg",
      alt: "Tampilan demo company profile studio kreatif dengan daftar layanan",
      desc: "Profil usaha dengan halaman layanan, portofolio, dan formulir kontak.",
      points: ["Struktur halaman jelas", "Formulir kontak", "Optimasi tampilan mobile"]
    },
    {
      title: "Dashboard Penjualan",
      category: "data",
      categoryLabel: "Data",
      mock: "dash",
      image: "assets/img/portfolio/dashboard-penjualan.svg",
      alt: "Tampilan demo dashboard penjualan dengan metrik dan grafik batang",
      desc: "Rekap penjualan bulanan dengan ringkasan angka dan grafik tren.",
      points: ["Ringkasan metrik", "Grafik tren bulanan", "Filter periode"]
    },
    {
      title: "Rekap Data Survei",
      category: "data",
      categoryLabel: "Data",
      mock: "table",
      image: "assets/img/portfolio/rekap-data-survei.svg",
      alt: "Tampilan demo tabel rekap data survei dengan status dan skor",
      desc: "Data mentah kuesioner dirapikan menjadi tabel rekap siap analisis.",
      points: ["Pembersihan data", "Tabel rekap", "Ringkasan hasil"]
    },
    {
      title: "Formatting Skripsi",
      category: "akademik",
      categoryLabel: "Akademik",
      mock: "doc",
      image: "assets/img/portfolio/formatting-skripsi.svg",
      alt: "Tampilan demo dokumen skripsi yang sudah diatur margin dan pedoman penulisannya",
      desc: "Penyesuaian format halaman, daftar isi, sitasi, dan penomoran sesuai pedoman kampus.",
      points: ["Format sesuai pedoman", "Daftar isi otomatis", "Pemeriksaan sitasi"]
    },
    {
      title: "Poster Kegiatan",
      category: "desain",
      categoryLabel: "Desain",
      mock: "poster",
      image: "assets/img/portfolio/poster-kegiatan.svg",
      alt: "Tampilan demo poster kegiatan Malam Kreatif dengan hierarki teks jelas",
      desc: "Poster acara dengan hierarki informasi yang jelas dan mudah dibaca.",
      points: ["Hierarki teks", "Versi cetak dan media sosial", "Revisi sesuai masukan"]
    },
    {
      title: "CV & Portofolio",
      category: "desain",
      categoryLabel: "Desain",
      mock: "doc",
      image: "assets/img/portfolio/cv-portofolio.svg",
      alt: "Tampilan demo CV satu halaman dengan bagian profil, pengalaman, dan keahlian",
      desc: "CV satu halaman dan portofolio ringkas untuk kebutuhan melamar kerja.",
      points: ["Tata letak rapi", "Versi PDF", "Mudah diperbarui"]
    },
    {
      title: "Video Profil Produk",
      category: "multimedia",
      categoryLabel: "Multimedia",
      mock: "video",
      image: "assets/img/portfolio/video-profil-produk.svg",
      alt: "Tampilan demo editor video dengan timeline potongan klip",
      desc: "Video pendek berisi potongan produk, teks penjelas, dan musik latar.",
      points: ["Editing dan transisi", "Teks penjelas", "Format vertikal dan horizontal"]
    }
  ];

  /* --------------------------------------------------------
      FAQ — 5 pertama tampil ringkas di Beranda,
      semua tampil lengkap di halaman Layanan.
      -------------------------------------------------------- */
  var faqs = [
    {
      q: "Layanan apa saja yang tersedia?",
      a: "Tersedia lima kategori: Bantuan Akademik, Website & Programming, Data Processing, Dokumen & Desain, serta Multimedia & Kreatif. Pilih kategori yang paling mendekati kebutuhan Anda, lalu jelaskan detailnya di form konsultasi."
    },
    {
      q: "Bagaimana cara memesan?",
      a: "Cukup isi form konsultasi dengan topik, detail, dan kontak yang bisa dihubungi. Setelah itu Anda akan diarahkan untuk melanjutkan komunikasi melalui WhatsApp atau Instagram."
    },
    {
      q: "Bisa konsultasi dulu sebelum memesan?",
      a: "Bisa. Gunakan kolom detail pada form untuk menjelaskan kebutuhan, lalu kami bantu arahkan kategori dan cakupan pekerjaan yang paling sesuai."
    },
    {
      q: "Berapa biayanya?",
      a: "Biaya disesuaikan dengan jenis pekerjaan, kompleksitas, dan tenggat waktu. Kami belum mencantumkan angka tetap agar estimasi bisa dibuat lebih tepat setelah kebutuhan Anda jelas."
    },
    {
      q: "Apakah revisi termasuk?",
      a: "Termasuk selama masih dalam batas cakupan yang disepakati di awal. Jelaskan preferensi dan contoh referensi sejak awal agar hasil lebih dekat dengan harapan Anda."
    },
    {
      q: "Berapa lama pengerjaannya?",
      a: "Waktu pengerjaan bergantung pada kompleksitas dan antrean project. Perkiraan waktu akan disampaikan setelah detail pekerjaan diterima dan cakupannya disetujui bersama."
    },
    {
      q: "Bisa meminta layanan yang tidak ada dalam daftar?",
      a: "Bisa. Selama masih berkaitan dengan akademik, website, data, dokumen/desain, atau multimedia, tulis permintaan Anda pada kolom detail. Kami akan membantu menentukan apakah bisa dikerjakan."
    },
    {
      q: "File atau data dikirim seperti apa?",
      a: "Kirim file pendukung melalui kanal komunikasi yang digunakan setelah form diisi. Pastikan file mudah dibuka dan sertakan catatan singkat mengenai bagian yang perlu dibantu."
    },
    {
      q: "Pengerjaannya bisa dilakukan online?",
      a: "Ya. Seluruh proses konsultasi, pengiriman file, revisi, dan serah terima hasil dapat dilakukan secara online."
    }
  ];

  JF.data = {
    services: services,
    featured: featured,
    categories: categories,
    portfolio: portfolio,
    faqs: faqs
  };
})(window.JF);
