/* ============================================================
   Joki Fauget — site.js
   Menyuntikkan nilai dari config.js ke dalam halaman:
     [data-site="..."]            -> teks dari config.site
     [data-contact="..."]         -> teks dari config.contact
     [data-link="instagram"]      -> href profil Instagram
      [data-link="whatsapp"]       -> href WhatsApp (disembunyikan bila kosong)
   Jadi mengubah nama brand, tahun, atau akun sosial cukup
   dilakukan di config.js.
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var $$ = JF.utils.$$;

  function applyText(attribute, source) {
    $$("[" + attribute + "]").forEach(function (el) {
      var key = el.getAttribute(attribute);
      var value = source[key];
      if (value !== undefined && value !== null && value !== "") {
        el.textContent = value;
      }
    });
  }

  function initText() {
    var site = JF.config.site;
    var year = site.year || String(new Date().getFullYear());

    applyText("data-site", {
      name: site.name,
      tagline: site.tagline,
      description: site.description,
      note: site.note,
      footerTag: site.footerTag,
      year: year
    });

    applyText("data-contact", {
      instagramHandle: JF.config.contact.instagramHandle,
      email: JF.config.contact.email
    });

    if (
      document.body.getAttribute("data-page") === "home" &&
      site.title
    ) {
      document.title = site.title;
    }
  }

  function initInstagram() {
    var handle = JF.config.contact.instagram;
    $$('[data-link="instagram"]').forEach(function (el) {
      if (handle) el.setAttribute("href", "https://instagram.com/" + handle);
    });
  }

  function initWhatsApp() {
    var links = $$('[data-link="whatsapp"]');
    if (!links.length) return;

    var url = JF.utils.waLink();
    links.forEach(function (el) {
      if (url) {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else {
        /* Nomor belum diisi: sembunyikan agar tidak ada nomor palsu */
        el.hidden = true;
        el.setAttribute("aria-hidden", "true");
      }
    });
  }

  JF.site = {
    init: function () {
      initText();
      initInstagram();
      initWhatsApp();
    }
  };
})(window.JF);
