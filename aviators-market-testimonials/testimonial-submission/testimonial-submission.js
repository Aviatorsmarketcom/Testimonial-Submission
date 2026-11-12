/*
 * Aviators Market — Testimonial Submission (vanilla JS, DEMO MODE)
 * No network requests, no storage. Selected files never leave the browser.
 * See INTEGRATION-NOTES.md for the production submission-service hook.
 */
(function () {
  "use strict";

  var AMTS_CONFIG = {
    demoMode: true,               // must remain true until a real service is connected
    submissionAdapter: null,      // future: function(payload, files) returning Promise<{ receiptId }>
    storyMin: 30,
    storyMax: 2000,
    maxPhotos: 3,
    maxPhotoBytes: 5 * 1024 * 1024,
    photoTypes: ["image/jpeg", "image/png", "image/webp"],
    photoExt: /\.(jpe?g|png|webp)$/i
  };

  var RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };

  function $(id) { return document.getElementById(id); }
  var form = $("amts-form");
  if (!form) return;

  var els = {
    name: $("amts-full-name"), email: $("amts-email"), company: $("amts-company"),
    role: $("amts-role"), category: $("amts-category"), story: $("amts-story"),
    consent: $("amts-consent"), photoConsent: $("amts-photo-consent"),
    photoConsentWrap: $("amts-photo-consent-wrap"),
    summary: $("amts-error-summary"), summaryList: $("amts-error-summary-list"),
    demoResult: $("amts-demo-result"), submit: $("amts-submit"), submitLabel: $("amts-submit-label"),
    ratingDesc: $("amts-rating-desc"), count: $("amts-story-count"), counter: $("amts-story-counter"),
    fill: $("amts-story-fill"), dropzone: $("amts-dropzone"), fileInput: $("amts-photo-input"),
    browse: $("amts-photo-browse"), photoList: $("amts-photo-list"), photoError: $("amts-photo-error"),
    confirmation: $("amts-confirmation"), formCard: $("amts-form-card")
  };

  var photos = []; // { id, file, url }
  var photoSeq = 0;
  var submitting = false;
  var attempted = false;

  /* ---------- helpers ---------- */
  function fieldWrap(el) { return el.closest(".amts-field"); }
  function setError(errorId, wrap, message) {
    var p = $(errorId);
    if (!p) return;
    if (message) { p.textContent = message; p.hidden = false; if (wrap) wrap.classList.add("amts-is-invalid"); }
    else { p.textContent = ""; p.hidden = true; if (wrap) wrap.classList.remove("amts-is-invalid"); }
  }
  function setInvalid(el, bad) { if (el) el.setAttribute("aria-invalid", bad ? "true" : "false"); }
  function formatBytes(b) { return b < 1024 * 1024 ? Math.max(1, Math.round(b / 1024)) + " KB" : (b / 1048576).toFixed(1) + " MB"; }
  function displayValue() { var r = form.querySelector('input[name="display"]:checked'); return r ? r.value : ""; }
  function ratingValue() { var r = form.querySelector('input[name="rating"]:checked'); return r ? Number(r.value) : 0; }
  function hideDemoResult() { els.demoResult.hidden = true; }

  /* ---------- rating ---------- */
  var starLabels = Array.prototype.slice.call(form.querySelectorAll(".amts-rating-star"));
  function paintStars(selected, preview) {
    starLabels.forEach(function (lab, i) {
      var n = i + 1;
      lab.classList.toggle("amts-is-on", !preview && n <= selected);
      lab.classList.toggle("amts-is-preview", !!preview && n <= preview);
      if (preview && n <= selected && n > preview) lab.classList.remove("amts-is-on");
      if (preview && n <= selected && n <= preview) lab.classList.add("amts-is-on");
    });
  }
  function updateRatingDesc(v) {
    if (v) { els.ratingDesc.textContent = v + " of 5 stars, " + RATING_LABELS[v]; els.ratingDesc.classList.remove("amts-is-empty"); }
    else { els.ratingDesc.textContent = "No rating selected"; els.ratingDesc.classList.add("amts-is-empty"); }
  }
  starLabels.forEach(function (lab, i) {
    lab.addEventListener("mouseenter", function () { paintStars(ratingValue(), i + 1); els.ratingDesc.textContent = (i + 1) + " of 5 stars, " + RATING_LABELS[i + 1]; els.ratingDesc.classList.remove("amts-is-empty"); });
  });
  $("amts-rating").addEventListener("mouseleave", function () { paintStars(ratingValue(), 0); updateRatingDesc(ratingValue()); });
  form.querySelectorAll('input[name="rating"]').forEach(function (r) {
    r.addEventListener("change", function () { paintStars(ratingValue(), 0); updateRatingDesc(ratingValue()); hideDemoResult(); if (attempted) validateRating(); });
  });
  updateRatingDesc(0);

  /* ---------- story counter ---------- */
  function updateCounter() {
    var len = els.story.value.length;
    els.count.textContent = len.toLocaleString("en-US");
    els.fill.style.transform = "scaleX(" + Math.min(1, len / AMTS_CONFIG.storyMax) + ")";
    els.fill.classList.toggle("amts-is-low", len > 0 && len < AMTS_CONFIG.storyMin);
    els.counter.classList.toggle("amts-is-ok", len >= AMTS_CONFIG.storyMin && len <= AMTS_CONFIG.storyMax - 100);
    els.counter.classList.toggle("amts-is-warn", (len > 0 && len < AMTS_CONFIG.storyMin) || len > AMTS_CONFIG.storyMax - 100);
  }
  els.story.addEventListener("input", function () { updateCounter(); hideDemoResult(); if (attempted) validateStory(); });
  updateCounter();

  /* ---------- display preference examples ---------- */
  function updateDisplayExamples() {
    var full = els.name.value.trim().replace(/\s+/g, " ");
    var parts = full ? full.split(" ") : [];
    var first = parts[0] || "";
    var lastInitial = parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() + "." : "";
    $("amts-display-full-ex").textContent = full ? "Shown as: " + full : "e.g. Your full name";
    $("amts-display-initial-ex").textContent = first ? "Shown as: " + first + (lastInitial ? " " + lastInitial : "") : "e.g. First name and last initial";
    $("amts-display-first-ex").textContent = first ? "Shown as: " + first : "e.g. First name";
    var comp = els.company.value.trim();
    $("amts-display-company-ex").textContent = comp ? "Shown as: " + comp : "Requires a company name";
  }
  function updateCompanyRequirement() {
    var req = displayValue() === "Display My Company Name";
    els.company.required = req;
    els.company.setAttribute("aria-required", req ? "true" : "false");
    $("amts-company-req").hidden = !req;
    $("amts-company-optional").hidden = req;
  }
  els.name.addEventListener("input", updateDisplayExamples);
  els.company.addEventListener("input", updateDisplayExamples);
  form.querySelectorAll('input[name="display"]').forEach(function (r) {
    r.addEventListener("change", function () { updateCompanyRequirement(); hideDemoResult(); if (attempted) { validateDisplay(); validateCompany(); } });
  });

  /* ---------- validators ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validateName() {
    var v = els.name.value.trim(), msg = "";
    if (!v) msg = "Enter your full name.";
    else if (v.length < 2) msg = "Your name must be at least 2 characters.";
    setError("amts-full-name-error", fieldWrap(els.name), msg); setInvalid(els.name, !!msg); return msg;
  }
  function validateEmail() {
    var v = els.email.value.trim(), msg = "";
    if (!v) msg = "Enter your email address.";
    else if (!EMAIL_RE.test(v)) msg = "Enter an email address in the format you@example.com.";
    setError("amts-email-error", fieldWrap(els.email), msg); setInvalid(els.email, !!msg); return msg;
  }
  function validateCompany() {
    var msg = (displayValue() === "Display My Company Name" && !els.company.value.trim()) ? "Enter your company name, or choose a different display option." : "";
    setError("amts-company-error", fieldWrap(els.company), msg); setInvalid(els.company, !!msg); return msg;
  }
  function validateRole() {
    var msg = els.role.value ? "" : "Select your role.";
    setError("amts-role-error", fieldWrap(els.role), msg); setInvalid(els.role, !!msg); return msg;
  }
  function validateCategory() {
    var msg = els.category.value ? "" : "Select what you used Aviators Market for.";
    setError("amts-category-error", fieldWrap(els.category), msg); setInvalid(els.category, !!msg); return msg;
  }
  function validateRating() {
    var msg = ratingValue() ? "" : "Select a rating from 1 to 5 stars.";
    setError("amts-rating-error", $("amts-rating-group"), msg); return msg;
  }
  function validateStory() {
    var len = els.story.value.trim().length, msg = "";
    if (!len) msg = "Tell us your story.";
    else if (len < AMTS_CONFIG.storyMin) msg = "Your story must be at least 30 characters. Add " + (AMTS_CONFIG.storyMin - len) + " more.";
    else if (els.story.value.length > AMTS_CONFIG.storyMax) msg = "Your story must be 2,000 characters or fewer.";
    setError("amts-story-error", fieldWrap(els.story), msg); setInvalid(els.story, !!msg); return msg;
  }
  function validateDisplay() {
    var msg = displayValue() ? "" : "Choose how we may display your testimonial.";
    setError("amts-display-error", $("amts-display-group"), msg); return msg;
  }
  function validateConsent() {
    var msg = els.consent.checked ? "" : "Confirm your consent to review and possible publication.";
    setError("amts-consent-error", fieldWrap(els.consent), msg); setInvalid(els.consent, !!msg); return msg;
  }
  function validatePhotoConsent() {
    var msg = (photos.length && !els.photoConsent.checked) ? "Confirm you own or have permission to submit these photographs." : "";
    setError("amts-photo-consent-error", fieldWrap(els.photoConsent), msg); setInvalid(els.photoConsent, !!msg); return msg;
  }

  var CHECKS = [
    { fn: validateName, target: "amts-full-name" },
    { fn: validateEmail, target: "amts-email" },
    { fn: validateCompany, target: "amts-company" },
    { fn: validateRole, target: "amts-role" },
    { fn: validateCategory, target: "amts-category" },
    { fn: validateRating, target: "amts-rating-1" },
    { fn: validateStory, target: "amts-story" },
    { fn: validateDisplay, target: "amts-display-full" },
    { fn: validateConsent, target: "amts-consent" },
    { fn: validatePhotoConsent, target: "amts-photo-consent" }
  ];

  [["amts-full-name", validateName], ["amts-email", validateEmail], ["amts-company", validateCompany]].forEach(function (p) {
    $(p[0]).addEventListener("blur", function () { if (attempted || $(p[0]).value) p[1](); });
    $(p[0]).addEventListener("input", function () { hideDemoResult(); if (attempted) p[1](); });
  });
  els.role.addEventListener("change", function () { hideDemoResult(); if (attempted) validateRole(); });
  els.category.addEventListener("change", function () { hideDemoResult(); if (attempted) validateCategory(); });
  els.consent.addEventListener("change", function () { hideDemoResult(); if (attempted) validateConsent(); });
  els.photoConsent.addEventListener("change", function () { hideDemoResult(); if (attempted) validatePhotoConsent(); });
  form.addEventListener("change", hideDemoResult);

  /* ---------- photos ---------- */
  function renderPhotos() {
    els.photoList.textContent = "";
    photos.forEach(function (p, idx) {
      var li = document.createElement("li");
      li.className = "amts-photo";
      var img = document.createElement("img");
      img.className = "amts-photo-img"; img.src = p.url; img.alt = "Selected photo " + (idx + 1) + " preview";
      var meta = document.createElement("div"); meta.className = "amts-photo-meta";
      var name = document.createElement("p"); name.className = "amts-photo-name"; name.textContent = p.file.name;
      var size = document.createElement("p"); size.className = "amts-photo-size"; size.textContent = formatBytes(p.file.size);
      meta.appendChild(name); meta.appendChild(size);
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "amts-photo-remove"; btn.textContent = "Remove";
      btn.setAttribute("aria-label", "Remove photo " + (idx + 1) + ", " + p.file.name);
      btn.addEventListener("click", function () { removePhoto(p.id); });
      li.appendChild(img); li.appendChild(meta); li.appendChild(btn);
      els.photoList.appendChild(li);
    });
    els.photoConsentWrap.hidden = photos.length === 0;
    els.photoConsent.required = photos.length > 0;
    els.photoConsent.setAttribute("aria-required", photos.length ? "true" : "false");
    if (!photos.length) { els.photoConsent.checked = false; setError("amts-photo-consent-error", els.photoConsentWrap, ""); }
    els.browse.textContent = photos.length >= AMTS_CONFIG.maxPhotos ? "Maximum Reached" : "Browse Files";
    els.browse.setAttribute("aria-disabled", photos.length >= AMTS_CONFIG.maxPhotos ? "true" : "false");
  }
  function removePhoto(id) {
    var i = photos.findIndex(function (p) { return p.id === id; });
    if (i < 0) return;
    URL.revokeObjectURL(photos[i].url);
    photos.splice(i, 1);
    renderPhotos();
    showPhotoError("");
    hideDemoResult();
    var next = els.photoList.querySelectorAll(".amts-photo-remove")[Math.min(i, photos.length - 1)];
    (next || els.browse).focus();
  }
  function showPhotoError(msg) { els.photoError.textContent = msg; els.photoError.hidden = !msg; }
  function addFiles(fileList) {
    var errors = [];
    Array.prototype.forEach.call(fileList, function (f) {
      var typeOk = AMTS_CONFIG.photoTypes.indexOf(f.type) !== -1 || (!f.type && AMTS_CONFIG.photoExt.test(f.name));
      if (!typeOk || !AMTS_CONFIG.photoExt.test(f.name)) { errors.push("\u201C" + f.name + "\u201D is not a JPG, PNG, or WebP image."); return; }
      if (f.size > AMTS_CONFIG.maxPhotoBytes) { errors.push("\u201C" + f.name + "\u201D is " + formatBytes(f.size) + ". Each photo must be 5 MB or smaller."); return; }
      if (photos.length >= AMTS_CONFIG.maxPhotos) { errors.push("You can add a maximum of three images. \u201C" + f.name + "\u201D was not added."); return; }
      photos.push({ id: ++photoSeq, file: f, url: URL.createObjectURL(f) });
    });
    renderPhotos();
    showPhotoError(errors.join(" "));
    hideDemoResult();
    if (attempted) validatePhotoConsent();
  }
  els.browse.addEventListener("click", function () {
    if (photos.length >= AMTS_CONFIG.maxPhotos) { showPhotoError("You can add a maximum of three images. Remove one to choose another."); return; }
    els.fileInput.click();
  });
  els.fileInput.addEventListener("change", function () { addFiles(els.fileInput.files); els.fileInput.value = ""; });
  ["dragenter", "dragover"].forEach(function (t) {
    els.dropzone.addEventListener(t, function (e) { e.preventDefault(); els.dropzone.classList.add("amts-is-dragging"); });
  });
  ["dragleave", "dragend"].forEach(function (t) {
    els.dropzone.addEventListener(t, function (e) { if (!els.dropzone.contains(e.relatedTarget)) els.dropzone.classList.remove("amts-is-dragging"); });
  });
  els.dropzone.addEventListener("drop", function (e) {
    e.preventDefault(); els.dropzone.classList.remove("amts-is-dragging");
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  });

  /* ---------- payload (for future adapter; never sent in demo) ---------- */
  function buildPayload() {
    var fd = new FormData(form);
    return {
      fullName: String(fd.get("fullName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      role: String(fd.get("role") || ""),
      city: String(fd.get("city") || "").trim(),
      region: String(fd.get("region") || "").trim(),
      country: String(fd.get("country") || "").trim(),
      category: String(fd.get("category") || ""),
      rating: ratingValue(),
      story: String(fd.get("story") || ""),
      result: String(fd.get("result") || ""),
      details: String(fd.get("details") || "").trim(),
      tenure: String(fd.get("tenure") || ""),
      displayPreference: displayValue(),
      contactBeforePublishing: $("amts-contact-before").checked,
      followUpPermission: $("amts-followup").checked,
      publicationConsent: els.consent.checked,
      photoAuthorization: photos.length ? els.photoConsent.checked : null,
      photoCount: photos.length
    };
  }

  /* ---------- submit ---------- */
  function showSummary(errors) {
    els.summaryList.textContent = "";
    errors.forEach(function (e) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "amts-error-summary-link"; a.href = "#" + e.target; a.textContent = e.msg;
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        var t = $(e.target);
        if (t) { t.focus(); (t.closest(".amts-field") || t).scrollIntoView({ block: "center", behavior: reduceMotion() ? "auto" : "smooth" }); }
      });
      li.appendChild(a); els.summaryList.appendChild(li);
    });
    els.summary.hidden = false;
    els.summary.focus();
  }
  function reduceMotion() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function setLoading(on) {
    submitting = on;
    els.submit.disabled = on;
    els.submit.classList.toggle("amts-is-loading", on);
    els.submit.setAttribute("aria-busy", on ? "true" : "false");
    els.submitLabel.textContent = on ? "Submitting\u2026" : "Submit My Testimonial";
  }

  // Production-only: call after the real service confirms receipt. Never called in demo mode.
  function showConfirmation() {
    if (AMTS_CONFIG.demoMode) return;
    els.formCard.hidden = true;
    els.confirmation.hidden = false;
    els.confirmation.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitting) return; // duplicate-submission guard
    attempted = true;
    hideDemoResult();
    var errors = [];
    CHECKS.forEach(function (c) { var m = c.fn(); if (m) errors.push({ msg: m, target: c.target }); });
    if (errors.length) { showSummary(errors); return; }
    els.summary.hidden = true;

    if (AMTS_CONFIG.demoMode || typeof AMTS_CONFIG.submissionAdapter !== "function") {
      // Demo: validated only. Nothing transmitted, nothing stored.
      els.demoResult.hidden = false;
      els.demoResult.focus();
      return;
    }

    // Future production path (inactive). The adapter must resolve only after the service confirms receipt.
    setLoading(true);
    AMTS_CONFIG.submissionAdapter(buildPayload(), photos.map(function (p) { return p.file; }))
      .then(function (receipt) { if (receipt && receipt.receiptId) showConfirmation(); else throw new Error("No receipt"); })
      .catch(function () {
        setLoading(false);
        showSummary([{ msg: "We could not submit your testimonial. Your entries are still here; please try again.", target: "amts-submit" }]);
      });
  });

  updateDisplayExamples();
  updateCompanyRequirement();
  renderPhotos();
})();
