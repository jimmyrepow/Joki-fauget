/* ============================================================
   Joki Fauget — form.js
   Form konsultasi: validasi per field, susun pesan rapi, lalu
   arahkan ke channel kontak yang diatur di config.js.
   Bila nomor WhatsApp belum diisi, pesan ditampilkan di kolom
   siap salin agar tetap bisa dikirim lewat Instagram/manual.
   ============================================================ */
window.JF = window.JF || {};

(function (JF) {
  "use strict";

  var utils = JF.utils;
  var REQUIRED = { nama: 1, kategori: 1, detail: 10, kontak: 1 };
  var lastMessage = "";

  function showError(field, show) {
    var message = document.querySelector('[data-err="' + field + '"]');
    var input = document.getElementById(field);
    if (message) message.classList.toggle("show", show);
    if (input) {
      input.classList.toggle("is-invalid", show);
      input.setAttribute("aria-invalid", show ? "true" : "false");
    }
  }

  function validate() {
    var checks = [
      { id: "nama", ok: function (value) { return value.length > 0; } },
      { id: "kategori", ok: function (value) { return value.length > 0; } },
      { id: "detail", ok: function (value) { return value.length >= 10; } },
      { id: "kontak", ok: function (value) { return value.length > 0; } }
    ];

    var ok = true;
    checks.forEach(function (check) {
      var input = document.getElementById(check.id);
      var value = input ? String(input.value).trim() : "";
      var valid = !!input && check.ok(value);
      showError(check.id, !valid);
      if (!valid) ok = false;
    });

    return ok;
  }

  function initLiveValidation() {
    Object.keys(REQUIRED).forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;

      function clear() {
        if (input.classList.contains("is-invalid")) showError(id, false);
      }
      input.addEventListener("input", clear);
      input.addEventListener("change", clear);
    });
  }

  function value(id) {
    var el = document.getElementById(id);
    return el ? String(el.value).trim() : "";
  }

  function buildMessage() {
    var deadline = value("deadline");
    var budget = value("budget");

    return (
      "Halo Joki Fauget, saya ingin konsultasi kebutuhan berikut.\n\n" +
      "Nama: " + value("nama") + "\n" +
      "Kategori: " + value("kategori") + "\n" +
      "Kontak: " + value("kontak") + "\n" +
      (deadline ? "Deadline: " + deadline + "\n" : "") +
      (budget ? "Budget: " + budget + "\n" : "") +
      "\nDetail kebutuhan:\n" + value("detail")
    );
  }

  function showNotice(okBox, text, withFallback) {
    var notice = document.getElementById("formOkText");
    var actions = document.getElementById("formOkActions");
    var preview = document.getElementById("messagePreview");

    if (notice) notice.textContent = text;
    if (actions) actions.classList.toggle("d-none", !withFallback);
    if (preview) {
      preview.value = withFallback ? lastMessage : "";
      preview.hidden = !withFallback;
    }
    okBox.classList.add("show");
  }

  function initSubmit() {
    var form = document.getElementById("waForm");
    var okBox = document.getElementById("formOk");
    if (!form || !okBox) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      okBox.classList.remove("show");
      lastMessage = "";

      if (!validate()) {
        var firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var message = buildMessage();
      var link = utils.waLink(message);

      if (link) {
        window.open(link, "_blank", "noopener");
        showNotice(okBox, JF.config.messages.sent, false);
        form.reset();
      } else {
        lastMessage = message;
        showNotice(okBox, JF.config.messages.missingNumber, true);
      }
    });
  }

  function initHint() {
    var hint = document.getElementById("formHint");
    if (!hint) return;
    hint.textContent = utils.waLink()
      ? "Pesan akan dibuka di WhatsApp dengan isi yang sudah tersusun otomatis."
      : "Nomor WhatsApp belum tersedia. Setelah submit, salin pesan atau kirim lewat Instagram.";
  }

  function copyFallback(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    var copied = false;
    try {
      copied = document.execCommand("copy") === true;
    } catch (e) {
      copied = false;
    }
    document.body.removeChild(field);
    return copied;
  }

  function initCopy() {
    var button = document.getElementById("copyMessage");
    if (!button) return;

    function feedback(copied) {
      var original = "Salin pesan";
      button.textContent = copied ? "Tersalin" : "Salin gagal";
      window.setTimeout(function () {
        button.textContent = original;
      }, 1800);
    }

    button.addEventListener("click", function () {
      if (!lastMessage) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(lastMessage)
          .then(function () { feedback(true); })
          .catch(function () { feedback(copyFallback(lastMessage)); });
      } else {
        feedback(copyFallback(lastMessage));
      }
    });
  }

  JF.form = {
    init: function () {
      initLiveValidation();
      initHint();
      initSubmit();
      initCopy();
    }
  };
})(window.JF);
