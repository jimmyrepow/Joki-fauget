# Joki Fauget — Landing Page

Situs tiga halaman (HTML + Bootstrap 5 via CDN) tanpa build tool:
Beranda, Layanan, dan Portfolio. Semua file dipisah per tanggung jawab agar
mudah dirawat, dan setiap halaman punya satu tujuan yang jelas.

## Struktur

```
index.html                 Beranda: hero, ringkasan layanan, preview portfolio, alur, FAQ ringkas, form
layanan.html               Katalog: 5 layanan lengkap, unggulan, estimasi biaya, keunggulan, FAQ lengkap
portfolio.html             Bukti: filter + 8 contoh project, modal detail, form
assets/
  css/
    tokens.css             SEMUA warna & token tema (light + dark)
    base.css               reset, tipografi, container, utility
    buttons.css            varian tombol
    navbar.css             header, menu, tombol tema
    hero.css               hero + mockup dashboard CSS
    cards.css              kartu dasar (.card-lift)
    services.css           section Layanan
    featured.css           tiga layanan unggulan (showcase visual)
    portfolio.css          filter, kartu project, modal detail
    workflow.css           Alur Kerja + Keunggulan
    pricing.css            kartu paket + kotak catatan
    faq.css                accordion FAQ
    contact.css            CTA akhir + form konsultasi
    footer.css             footer
    animations.css         reveal halus + prefers-reduced-motion
    responsive.css         mobile/tablet/desktop + hover:none
  js/
    config.js              PUSAT PENGATURAN (brand, kontak, tema, pesan)
    utils.js               helper: $, $$, escapeHtml()/escapeAttr(), waLink()
    data.js                PUSAT ISI: 5 layanan, 3 unggulan, portfolio, FAQ
    theme.js               pengalih terang/gelap
    site.js                menaruh nilai config ke dalam halaman
    services.js            merender layanan & layanan unggulan dari data.js
    ui.js                  header, menu mobile, reveal, menu aktif, CTA
    portfolio.js           filter + modal portfolio
    faq.js                 accordion FAQ
    form.js                validasi + kirim WhatsApp / pesan siap salin
    main.js                titik masuk, memanggil semua modul
  img/
    favicon.svg
    apple-touch-icon.png   ikon iOS 180x180
    og-image.png           pratinjau saat link dibagikan (1200x630)
    paper-texture.svg      tekstur kertas untuk background terang
    paper-texture-dark.svg tekstur kertas untuk background navy
    portfolio/*.svg        8 thumbnail demo (ukuran 800x500)
```

Semua teks dari `data.js` dan atribut data-attr di-escape lewat
`JF.utils.escapeHtml()`/`escapeAttr()` sebelum masuk ke `innerHTML`, kecuali
ikon SVG yang memang ditulis tetap di dalam kode.

Urutan `<link>` dan `<script>` di ketiga file HTML **tidak boleh diubah**:
`tokens.css` harus paling awal, `responsive.css` paling akhir, dan `main.js`
dimuat setelah semua modul.

## Peta halaman

| Halaman | Isi |
| --- | --- |
| `index.html` | Beranda: hero, 5 kartu layanan ringkas, 3 preview portfolio, cara pemesanan, 3 poin kepercayaan, 5 FAQ, form |
| `layanan.html` | 5 layanan lengkap, 3 unggulan, estimasi biaya, 6 keunggulan, 9 FAQ, form |
| `portfolio.html` | Filter + 8 contoh project, modal detail, form |

Menu aktif dihitung dari `data-page` pada `<body>` (`home`, `services`,
`portfolio`). Tautan lintas halaman memakai nama file, sedangkan `#konsultasi`
tetap tersedia di setiap halaman.

### Tombol “Lihat Portfolio” di Beranda

Kartu preview memakai tautan langsung:

- Tombol `.btn-preview-link` mengarah ke `portfolio.html` di semua skenario.
- Tidak ada deteksi HTTP, peningkatan tautan, notifikasi fallback, atau
  kartu bergetar (`.notice`) lagi.
- Link tetap bekerja melalui `file://` maupun HTTP(S) selama ketiga file HTML
  berada dalam satu folder.
- Semua animasi tetap mengikuti `prefers-reduced-motion`.

## Yang paling sering diubah

| Kebutuhan | File |
| --- | --- |
| Nomor WhatsApp, Instagram, nama brand, tahun | `assets/js/config.js` |
| Warna brand / warna tema gelap | `assets/css/tokens.css` |
| Daftar layanan, portfolio & FAQ | `assets/js/data.js` |
| Thumbnail portfolio | `assets/img/portfolio/` + field `image`/`alt` di `data.js` |
| Tekstur & warna background | `assets/img/paper-texture*.svg` + file CSS terkait |
| Teks Beranda | `index.html` |
| Teks halaman Layanan | `layanan.html` |
| Teks halaman Portfolio | `portfolio.html` |

### Kontak form konsultasi

- Jika `contact.whatsapp` diisi, tombol **Kirim Permintaan** membuka WhatsApp
  dengan pesan yang sudah tersusun.
- Jika kosong, tautan WhatsApp disembunyikan, pesan muncul di textarea
  `#messagePreview` yang siap disalin, dan tombol **Salin pesan** tersedia.
  Tombol Instagram memakai handle dari `contact.instagram`. Tidak ada nomor
  WhatsApp palsu.
- Field wajib memakai `required`, `aria-required`, `aria-describedby`, dan
  pesan error `role="alert"`; status sukses ada di `#formOkText` dengan
  `role="status" aria-live="polite"`.

### Nomor WhatsApp

`assets/js/config.js` → `contact.whatsapp`, format kode negara tanpa `+`
(contoh `"6281234567890"`). Selama masih kosong, form tetap berjalan dan
menampilkan pesan siap salin — tidak ada nomor palsu.

### Gambar & tekstur

- Thumbnail portfolio memakai SVG flat 800x500. Tambah item baru cukup
  duplikasi objek di `JF.data.portfolio` dan isi `image` serta `alt`.
- Tekstur kertas berupa halftone + serat halus, tile 240x240 px, opasitas
  `0.022–0.055` (sudah ada di dalam SVG). Dipasang lewat token
  `--paper-texture` di `tokens.css`, lalu dipakai `base.css` dan komponen
  terkait; token berganti otomatis saat tema gelap aktif.
- `og-image.png` memakai path relatif. Setelah deploy, ubah `og:image` di
  ketiga file HTML menjadi URL absolut agar terbaca oleh WhatsApp/Instagram.

### Animasi & kenyamanan

- Reveal: `translateY(12px)` dan 0.45s, delay maksimal 0.25s.
- Hover diubah tipis (1–2px); efek hover dimatikan pada perangkat sentuh
  lewat `@media (hover: none)` di `responsive.css`.
- Tombol punya umpan balik tekan `:active { transform: scale(...) }`.
- `prefers-reduced-motion` mematikan seluruh animasi bagi pengguna yang
  memintanya.

### Tema terang/gelap

- Dipilih dari tombol di navbar, disimpan di `localStorage` (kunci `jf-theme`).
- Bila belum pernah memilih, tema memakai `config.theme.default` (`"light"`).
- Jika default diubah ke `"dark"`, ubah juga nilai `saved || "light"` pada
  skrip anti-kedip di `<head>` setiap halaman agar tidak berkedip.
- Skrip kecil di `<head>` menerapkan tema sebelum render agar tidak berkedip,
  menambah kelas `js` ke `<html>`, dan memvalidasi nilai tersimpan.
- Kelas `js` hanya dipakai untuk reveal; tanpa itu konten tetap terlihat.

Komponen memakai token (`--surface`, `--text`, `--line`, `--accent`,
`--accent-text`, `--header-offset`, `--paper-texture`, dst.),
jadi menambah warna baru cukup di `tokens.css` pada kedua blok tema.

## Menambah modul JS baru

1. Buat `assets/js/nama.js` dengan pola:

   ```js
   window.JF = window.JF || {};
   (function (JF) {
     "use strict";
     JF.nama = { init: function () { /* ... */ } };
   })(window.JF);
   ```

2. Muat di ketiga file HTML sebelum `main.js`.
3. Daftarkan `"nama"` di array `MODULES` pada `assets/js/main.js`.
