/*
 * Aviators Market — Testimonial Management (vanilla JS, DEMO MODE)
 * Fictional sample records held in memory only. No network, no storage, no auth.
 * Every action here is simulated; production must persist status changes and
 * enforce administrator authorization server-side (see INTEGRATION-NOTES.md).
 */
(function () {
  "use strict";

  var DEMO_REVIEWER = "demo-reviewer (sample)";

  /* ---------- fictional sample data ---------- */
  function sampleData() {
    return [
      {
        id: "AMT-SAMPLE-0148", submittedAt: "2025-06-11T14:22:00", fullName: "Marguerite Okafor-Lind", email: "m.okafor-lind@example.com",
        company: "Okafor-Lind Aero Partners", role: "Aircraft Owner / Seller", city: "Bozeman", region: "Montana", country: "United States",
        category: "Selling an Aircraft", rating: 5,
        original: "Listed our 1978 Piper Arrow after a year of trying other sites. Within three weeks I had two serious inquiries from people who had actually read the logbook summary. The sale closed in early June. The listing tools made it easy to post the panel photos and the annual inspection details.",
        details: "1978 Piper PA-28R-201 Arrow III", result: "Successfully Sold My Aircraft", tenure: "Less Than 6 Months",
        photos: ["sample-attachment-0148-a.jpg", "sample-attachment-0148-b.jpg"],
        display: "Display My First Name and Last Initial", contactBefore: false, followUp: true, consent: true, photoAuth: true,
        review: "pending", published: false, reviewedAt: null, publishedAt: null, reviewer: null,
        edited: null, customerContacted: false, notes: [], history: []
      },
      {
        id: "AMT-SAMPLE-0147", submittedAt: "2025-06-09T09:05:00", fullName: "Desmond Varga", email: "dvarga.avionics@example.net",
        company: "Northline Avionics Supply", role: "Avionics Supplier", city: "Wichita", region: "Kansas", country: "United States",
        category: "Advertising Aviation Products or Services", rating: 4,
        original: "we advertise refurbished navcom units here and get steady inquires from shops and owners. would like more filters for buyers but overall its been worth it for our small shop.",
        details: "Refurbished navcom radios and audio panels", result: "Received Qualified Buyer Inquiries", tenure: "1–3 Years",
        photos: [], display: "Display My Company Name", contactBefore: true, followUp: false, consent: true, photoAuth: null,
        review: "approved", published: false, reviewedAt: "2025-06-10T11:40:00", publishedAt: null, reviewer: DEMO_REVIEWER,
        edited: null, customerContacted: false,
        notes: [{ at: "2025-06-10T11:38:00", by: DEMO_REVIEWER, text: "Customer asked to be contacted before publishing. Minor spelling fixes needed." }],
        history: [{ at: "2025-06-10T11:40:00", by: DEMO_REVIEWER, action: "Approved", detail: "" }]
      },
      {
        id: "AMT-SAMPLE-0145", submittedAt: "2025-06-04T17:48:00", fullName: "Ines Castellano", email: "ines.castellano@example.org",
        company: "", role: "Aircraft Buyer", city: "Guadalajara", region: "Jalisco", country: "Mexico",
        category: "Buying an Aircraft", rating: 5,
        original: "I was looking for a Cessna 172 with a clean damage history. The search let me compare several listings side by side and I contacted two sellers directly. I bought one in May and had it ferried home with no surprises.",
        details: "1999 Cessna 172R", result: "Successfully Purchased an Aircraft", tenure: "First-Time User",
        photos: ["sample-attachment-0145-a.jpg"], display: "Display My First Name Only", contactBefore: false, followUp: true, consent: true, photoAuth: true,
        review: "approved", published: true, reviewedAt: "2025-06-05T10:12:00", publishedAt: "2025-06-06T08:30:00", reviewer: DEMO_REVIEWER,
        edited: null, customerContacted: false, notes: [],
        history: [
          { at: "2025-06-05T10:12:00", by: DEMO_REVIEWER, action: "Approved", detail: "" },
          { at: "2025-06-06T08:30:00", by: DEMO_REVIEWER, action: "Published", detail: "Published original text." }
        ]
      },
      {
        id: "AMT-SAMPLE-0143", submittedAt: "2025-05-29T12:10:00", fullName: "Tobias Wren", email: "tobias.wren@example.com",
        company: "Wren Rotor Services", role: "Aviation Service Provider", city: "Calgary", region: "Alberta", country: "Canada",
        category: "Promoting My Aviation Business", rating: 3,
        original: "Good exposure for our maintenance shop. We got a few calls. Hard to say how many came from the site.",
        details: "Helicopter maintenance and inspections", result: "Increased Business Exposure", tenure: "6–12 Months",
        photos: [], display: "Display My Full Name", contactBefore: false, followUp: true, consent: true, photoAuth: null,
        review: "clarification", published: false, reviewedAt: "2025-05-30T15:02:00", publishedAt: null, reviewer: DEMO_REVIEWER,
        edited: null, customerContacted: false,
        notes: [{ at: "2025-05-30T15:01:00", by: DEMO_REVIEWER, text: "Ask whether any specific work came from inquiries so the story has an outcome. Do not add one ourselves." }],
        history: [{ at: "2025-05-30T15:02:00", by: DEMO_REVIEWER, action: "Clarification requested", detail: "Asked customer for a concrete example of an inquiry outcome." }]
      },
      {
        id: "AMT-SAMPLE-0141", submittedAt: "2025-05-22T08:33:00", fullName: "Sample Entry Rejected", email: "rejected.sample@example.com",
        company: "", role: "Other", city: "", region: "", country: "",
        category: "Other", rating: 1,
        original: "This text is a fictional example of a submission that did not describe an experience with the marketplace and was promotional in nature.",
        details: "", result: "", tenure: "",
        photos: [], display: "Display My Full Name", contactBefore: false, followUp: false, consent: true, photoAuth: null,
        review: "rejected", published: false, reviewedAt: "2025-05-23T09:00:00", publishedAt: null, reviewer: DEMO_REVIEWER,
        edited: null, customerContacted: false, notes: [],
        history: [{ at: "2025-05-23T09:00:00", by: DEMO_REVIEWER, action: "Rejected", detail: "Not a genuine marketplace experience (sample)." }]
      },
      {
        id: "AMT-SAMPLE-0139", submittedAt: "2025-05-18T19:20:00", fullName: "Priya Raghunathan", email: "praghunathan@example.net",
        company: "Skyfield UAS Imaging", role: "UAS / Drone Professional", city: "Pune", region: "Maharashtra", country: "India",
        category: "Selling Parts or Equipment", rating: 4,
        original: "Sold two spare gimbal cameras and a set of batteries we no longer needed. Buyers asked good questions and payment was straightforward. Would use again for surplus equipment.",
        details: "Surplus gimbal cameras and flight batteries", result: "Sold Parts or Equipment", tenure: "1–3 Years",
        photos: ["sample-attachment-0139-a.png", "sample-attachment-0139-b.png", "sample-attachment-0139-c.png"],
        display: "Display My Company Name", contactBefore: false, followUp: false, consent: true, photoAuth: true,
        review: "pending", published: false, reviewedAt: null, publishedAt: null, reviewer: null,
        edited: null, customerContacted: false, notes: [], history: []
      },
      {
        id: "AMT-SAMPLE-0136", submittedAt: "2025-05-07T13:15:00", fullName: "Callum Achterberg", email: "c.achterberg@example.org",
        company: "Achterberg Aircraft Brokerage", role: "Aircraft Broker / Dealer", city: "Rotterdam", region: "South Holland", country: "Netherlands",
        category: "Generating Buyer Leads", rating: 5,
        original: "We list most of our inventory here now. LeadVision helped us see which listings were getting attention so we could update photos and pricing. Lead quality has been better than the general classified sites we tried.",
        details: "Piston singles and light twins brokerage", result: "Received Qualified Buyer Inquiries", tenure: "3–5 Years",
        photos: [], display: "Display My Full Name", contactBefore: false, followUp: true, consent: true, photoAuth: null,
        review: "approved", published: true, reviewedAt: "2025-05-08T09:45:00", publishedAt: "2025-05-09T14:00:00", reviewer: DEMO_REVIEWER,
        edited: { text: "We list most of our inventory here now. LeadVision helped us see which listings were getting attention, so we could update photos and pricing. Lead quality has been better than the general classified sites we tried.", substantive: false, customerConfirmed: false, at: "2025-05-08T10:02:00", by: DEMO_REVIEWER },
        customerContacted: false, notes: [],
        history: [
          { at: "2025-05-08T09:45:00", by: DEMO_REVIEWER, action: "Approved", detail: "" },
          { at: "2025-05-08T10:02:00", by: DEMO_REVIEWER, action: "Publication version prepared", detail: "Minor correction: punctuation." },
          { at: "2025-05-09T14:00:00", by: DEMO_REVIEWER, action: "Published", detail: "Published edited version." }
        ]
      },
      {
        id: "AMT-SAMPLE-0132", submittedAt: "2025-04-26T10:02:00", fullName: "Ruth Ann Delacroix", email: "radelacroix@example.com",
        company: "", role: "Aircraft Buyer", city: "Lafayette", region: "Louisiana", country: "United States",
        category: "Buying Parts or Equipment", rating: 2,
        original: "Found the propeller I needed but the seller took a while to answer. The site itself was fine. Still working on getting the overhaul paperwork sorted.",
        details: "Two-blade fixed pitch propeller", result: "Still Working Toward My Goal", tenure: "Less Than 6 Months",
        photos: [], display: "Display My First Name and Last Initial", contactBefore: true, followUp: true, consent: true, photoAuth: null,
        review: "pending", published: false, reviewedAt: null, publishedAt: null, reviewer: null,
        edited: null, customerContacted: false, notes: [], history: []
      }
    ];
  }

  var records = [];
  var state = { filter: "all", search: "", sort: "newest", selectedId: null };

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }
  function svgNS(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }
  function nowIso() { var d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19); }
  function fmtDate(iso, withTime) {
    if (!iso) return "\u2014";
    var d = new Date(iso);
    var opts = { year: "numeric", month: "short", day: "numeric" };
    if (withTime) { opts.hour = "numeric"; opts.minute = "2-digit"; }
    return d.toLocaleString("en-US", opts);
  }
  function statusKey(r) { return r.published ? "published" : r.review; }
  var STATUS_LABEL = { pending: "Pending Review", approved: "Approved", published: "Published", clarification: "Needs Clarification", rejected: "Rejected" };
  function statusBadge(key, label) { return el("span", "amtm-status amtm-status-" + key, label || STATUS_LABEL[key]); }
  function stars(n, large) {
    var wrap = el("span", "amtm-stars" + (large ? " amtm-stars-lg" : ""));
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", n + " out of 5 stars");
    for (var i = 1; i <= 5; i++) {
      var s = svgNS("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false" });
      if (i > n) s.setAttribute("class", "amtm-star-off");
      s.appendChild(svgNS("path", { d: "M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" }));
      wrap.appendChild(s);
    }
    return wrap;
  }
  function location(r) { return [r.city, r.region, r.country].filter(Boolean).join(", "); }
  function publicName(r) {
    var parts = r.fullName.trim().split(/\s+/);
    switch (r.display) {
      case "Display My Full Name": return r.fullName;
      case "Display My First Name and Last Initial": return parts[0] + (parts.length > 1 ? " " + parts[parts.length - 1].charAt(0) + "." : "");
      case "Display My First Name Only": return parts[0];
      case "Display My Company Name": return r.company || "(company name missing)";
      default: return parts[0];
    }
  }
  function publicationText(r) { return r.edited ? r.edited.text : r.original; }
  function find(id) { for (var i = 0; i < records.length; i++) if (records[i].id === id) return records[i]; return null; }
  function log(r, action, detail) { r.history.push({ at: nowIso(), by: DEMO_REVIEWER, action: action, detail: detail || "" }); }

  var toastTimer = null;
  function toast(msg) {
    var t = $("amtm-toast");
    t.textContent = "Demo only: " + msg;
    t.classList.add("amtm-is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("amtm-is-visible"); }, 3600);
  }

  /* ---------- summary + filters ---------- */
  var SUMMARY = [
    { key: "all", label: "Total Submissions", color: "var(--amtm-navy)" },
    { key: "pending", label: "Pending Review", color: "var(--amtm-s-pending-bd)" },
    { key: "approved", label: "Approved", color: "var(--amtm-s-approved)" },
    { key: "published", label: "Published", color: "var(--amtm-s-published)" },
    { key: "clarification", label: "Needs Clarification", color: "var(--amtm-s-clar)" },
    { key: "rejected", label: "Rejected", color: "var(--amtm-s-rejected)" }
  ];
  var FILTERS = [
    { key: "pending", label: "Pending Review" }, { key: "approved", label: "Approved" },
    { key: "published", label: "Published" }, { key: "rejected", label: "Rejected" },
    { key: "clarification", label: "Needs Clarification" }, { key: "all", label: "All Submissions" }
  ];
  function count(key) { return key === "all" ? records.length : records.filter(function (r) { return statusKey(r) === key; }).length; }

  function renderSummary() {
    var grid = $("amtm-summary-grid");
    grid.textContent = "";
    SUMMARY.forEach(function (s) {
      var b = el("button", "amtm-stat");
      b.type = "button";
      b.style.setProperty("--amtm-stat-color", s.color);
      b.setAttribute("aria-pressed", state.filter === s.key ? "true" : "false");
      b.setAttribute("aria-label", s.label + ": " + count(s.key) + " (sample data). Show these.");
      b.appendChild(el("span", "amtm-stat-label", s.label));
      b.appendChild(el("span", "amtm-stat-value", count(s.key)));
      b.appendChild(el("span", "amtm-stat-sample", "Sample data"));
      b.addEventListener("click", function () { setFilter(s.key); });
      grid.appendChild(b);
    });
  }
  function renderFilters() {
    var wrap = $("amtm-filters");
    wrap.textContent = "";
    FILTERS.forEach(function (f) {
      var b = el("button", "amtm-filter");
      b.type = "button";
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", state.filter === f.key ? "true" : "false");
      b.tabIndex = state.filter === f.key ? 0 : -1;
      b.dataset.amtmFilter = f.key;
      b.appendChild(el("span", "", f.label));
      b.appendChild(el("span", "amtm-filter-count", count(f.key)));
      b.addEventListener("click", function () { setFilter(f.key); });
      wrap.appendChild(b);
    });
  }
  $("amtm-filters").addEventListener("keydown", function (e) {
    if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].indexOf(e.key) === -1) return;
    e.preventDefault();
    var idx = FILTERS.findIndex(function (f) { return f.key === state.filter; });
    if (e.key === "Home") idx = 0; else if (e.key === "End") idx = FILTERS.length - 1;
    else idx = (idx + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + FILTERS.length) % FILTERS.length;
    setFilter(FILTERS[idx].key);
    var btn = $("amtm-filters").querySelector('[data-amtm-filter="' + FILTERS[idx].key + '"]');
    if (btn) btn.focus();
  });
  function setFilter(key) { state.filter = key; renderAll(); }

  /* ---------- queue ---------- */
  function visible() {
    var q = state.search.trim().toLowerCase();
    var list = records.filter(function (r) {
      if (state.filter !== "all" && statusKey(r) !== state.filter) return false;
      if (!q) return true;
      return [r.fullName, r.company, r.id, r.original, r.edited ? r.edited.text : ""].join(" \n ").toLowerCase().indexOf(q) !== -1;
    });
    list.sort(function (a, b) {
      switch (state.sort) {
        case "oldest": return a.submittedAt.localeCompare(b.submittedAt);
        case "rating-high": return b.rating - a.rating || b.submittedAt.localeCompare(a.submittedAt);
        case "rating-low": return a.rating - b.rating || b.submittedAt.localeCompare(a.submittedAt);
        case "name": return a.fullName.localeCompare(b.fullName);
        default: return b.submittedAt.localeCompare(a.submittedAt);
      }
    });
    return list;
  }
  function renderQueue() {
    var list = visible();
    var tbody = $("amtm-tbody");
    tbody.textContent = "";
    list.forEach(function (r) {
      var tr = el("tr", "amtm-row" + (r.id === state.selectedId ? " amtm-is-selected" : ""));
      tr.addEventListener("click", function (e) { if (!e.target.closest("button")) select(r.id); });
      tr.appendChild(el("td", "amtm-cell-date", fmtDate(r.submittedAt)));
      var nameTd = el("td", "amtm-cell-name", r.fullName);
      nameTd.appendChild(el("span", "amtm-cell-id", r.id));
      tr.appendChild(nameTd);
      tr.appendChild(el("td", r.company ? "" : "amtm-cell-muted", r.company || "\u2014"));
      var rt = el("td"); rt.appendChild(stars(r.rating)); tr.appendChild(rt);
      tr.appendChild(el("td", "", r.category));
      var st = el("td"); st.appendChild(statusBadge(statusKey(r))); tr.appendChild(st);
      var act = el("td");
      var b = el("button", "amtm-button amtm-review-button", "Review");
      b.type = "button";
      b.setAttribute("aria-label", "Review submission " + r.id + " from " + r.fullName);
      b.addEventListener("click", function () { select(r.id, true); });
      act.appendChild(b); tr.appendChild(act);
      tbody.appendChild(tr);
    });
    $("amtm-table").hidden = list.length === 0;
    $("amtm-empty").hidden = list.length !== 0;
    var filterLabel = (FILTERS.find(function (f) { return f.key === state.filter; }) || {}).label;
    $("amtm-result-count").textContent = "Showing " + list.length + " of " + records.length + " sample submissions \u00B7 " + filterLabel + (state.search ? " \u00B7 matching \u201C" + state.search + "\u201D" : "");
  }

  $("amtm-search").addEventListener("input", function (e) { state.search = e.target.value; renderQueue(); });
  $("amtm-sort").addEventListener("change", function (e) { state.sort = e.target.value; renderQueue(); });
  $("amtm-clear").addEventListener("click", function () { state.filter = "all"; state.search = ""; $("amtm-search").value = ""; renderAll(); $("amtm-search").focus(); });
  $("amtm-reset").addEventListener("click", function () {
    openDialog({
      title: "Reset demo data?",
      build: function (c) { c.appendChild(el("p", "", "All simulated actions, notes and edits made in this tab will be discarded and the fictional sample records restored.")); },
      confirmLabel: "Reset sample data", confirmClass: "amtm-button-navy",
      onConfirm: function () { records = sampleData(); state.selectedId = null; renderAll(); toast("sample data restored."); return true; }
    });
  });

  /* ---------- detail ---------- */
  var detail = $("amtm-detail");
  var lastTrigger = null;
  function select(id, focus) {
    lastTrigger = document.activeElement;
    state.selectedId = id;
    renderQueue();
    renderDetail();
    if (window.matchMedia("(max-width: 767px)").matches) detail.classList.add("amtm-is-open-mobile");
    if (focus || window.matchMedia("(max-width: 1180px)").matches) {
      detail.focus({ preventScroll: true });
      if (!window.matchMedia("(max-width: 767px)").matches) detail.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }
  function closeMobile() {
    detail.classList.remove("amtm-is-open-mobile");
    if (lastTrigger && document.body.contains(lastTrigger)) lastTrigger.focus();
  }

  function dlRow(dl, term, value, isPrivate) {
    var dt = el("dt", "", term);
    if (isPrivate) dt.appendChild(el("span", "amtm-private", "Private"));
    dl.appendChild(dt);
    dl.appendChild(el("dd", "", value === "" || value === null || value === undefined ? "\u2014" : value));
  }
  function block(title, extra) {
    var b = el("section", "amtm-block");
    var h = el("h3", "amtm-block-title", title);
    if (extra) h.appendChild(extra);
    b.appendChild(h);
    return b;
  }
  function flag(kind, text) {
    var f = el("div", "amtm-flag amtm-flag-" + kind);
    var m = el("span", "amtm-flag-mark"); m.setAttribute("aria-hidden", "true");
    f.appendChild(m); f.appendChild(el("span", "", text));
    return f;
  }
  function yesNo(v) { return v ? "Yes" : "No"; }

  function publishBlockers(r) {
    var out = [];
    if (r.review !== "approved") out.push("Only approved testimonials can be published.");
    if (r.contactBefore && !r.customerContacted) out.push("Customer asked to be contacted before publishing. Record that contact first.");
    if (r.edited && r.edited.substantive && !r.edited.customerConfirmed) out.push("Substantive edits require recorded customer confirmation.");
    if (r.display === "Display My Company Name" && !r.company) out.push("Company display selected but no company name on file.");
    if (r.photos.length && !r.photoAuth) out.push("Photo authorization missing.");
    if (!r.consent) out.push("Publication consent missing.");
    return out;
  }

  function renderDetail() {
    var r = find(state.selectedId);
    var body = $("amtm-detail-body");
    body.textContent = "";
    $("amtm-detail-placeholder").hidden = !!r;
    body.hidden = !r;
    if (!r) { detail.classList.remove("amtm-is-open-mobile"); return; }

    var close = el("button", "amtm-button amtm-button-secondary amtm-button-sm amtm-detail-close", "Back to queue");
    close.type = "button";
    close.addEventListener("click", closeMobile);
    body.appendChild(close);

    var top = el("div", "amtm-detail-top");
    top.appendChild(el("p", "amtm-detail-id", r.id + " \u00B7 Sample record"));
    top.appendChild(el("h2", "amtm-detail-name", r.fullName));
    var sts = el("div", "amtm-detail-statuses");
    sts.appendChild(el("span", "amtm-detail-statuses-label", "Review:"));
    sts.appendChild(statusBadge(r.review));
    sts.appendChild(el("span", "amtm-detail-statuses-label", "Publication:"));
    sts.appendChild(r.published ? statusBadge("published") : statusBadge("unpublished", "Unpublished"));
    top.appendChild(sts);
    top.appendChild(stars(r.rating, true));
    body.appendChild(top);

    /* actions */
    var ab = block("Actions");
    var actions = el("div", "amtm-actions");
    var blockers = publishBlockers(r);
    function act(label, cls, enabled, fn, why) {
      var b = el("button", "amtm-button amtm-action-button " + cls, label);
      b.type = "button";
      b.disabled = !enabled;
      if (!enabled && why) b.title = why;
      b.addEventListener("click", fn);
      actions.appendChild(b);
    }
    var canDecide = !r.published && (r.review === "pending" || r.review === "clarification");
    act("Approve Testimonial", "amtm-button-navy", canDecide, function () { doApprove(r); }, "Available for Pending Review or Needs Clarification");
    act("Reject Testimonial", "amtm-button-danger", !r.published && r.review !== "rejected", function () { doReject(r); }, r.published ? "Unpublish first" : "Already rejected");
    act("Request Clarification", "amtm-button-secondary", !r.published && (r.review === "pending" || r.review === "approved"), function () { doClarify(r); }, "Not available in the current state");
    act("Prepare for Publication", "amtm-button-secondary", r.review !== "rejected" && !r.published, function () { doPrepare(r); }, r.published ? "Unpublish before editing" : "Rejected testimonials cannot be prepared");
    if (r.published) act("Unpublish Testimonial", "amtm-button-danger", true, function () { doUnpublish(r); });
    else act("Publish Testimonial", "amtm-button-primary", blockers.length === 0, function () { doPublish(r); }, blockers.join(" "));
    if (r.review === "rejected") act("Return to Pending Review", "amtm-button-secondary", true, function () { doReturnPending(r); });

    if (r.contactBefore && !r.customerContacted && !r.published) {
      var g = el("div", "amtm-gate");
      g.appendChild(flag("warn", "Customer requested contact before publishing. Publishing is blocked until contact is recorded."));
      var cb = el("button", "amtm-button amtm-button-secondary amtm-button-sm", "Record Pre-Publication Contact");
      cb.type = "button"; cb.style.marginTop = "8px";
      cb.addEventListener("click", function () { doRecordContact(r); });
      g.appendChild(cb);
      actions.appendChild(g);
    }
    if (r.edited && r.edited.substantive && !r.edited.customerConfirmed) {
      var g2 = el("div", "amtm-gate");
      g2.appendChild(flag("warn", "Publication version contains substantive edits. Customer confirmation is required before publishing."));
      var cb2 = el("button", "amtm-button amtm-button-secondary amtm-button-sm", "Record Customer Confirmation of Edits");
      cb2.type = "button"; cb2.style.marginTop = "8px";
      cb2.addEventListener("click", function () { doConfirmEdits(r); });
      g2.appendChild(cb2);
      actions.appendChild(g2);
    }
    if (!r.published && blockers.length) {
      var hint = el("p", "amtm-action-hint", "Publish is unavailable: " + blockers.join(" "));
      actions.appendChild(hint);
    } else if (!r.published) {
      actions.appendChild(el("p", "amtm-action-hint", "Approval does not publish. Publishing is a separate confirmed action."));
    }
    ab.appendChild(actions);
    body.appendChild(ab);

    /* testimonial texts */
    var tb = block("Original Testimonial");
    tb.appendChild(el("p", "amtm-quote", r.original));
    tb.appendChild(el("p", "amtm-text-meta", r.original.length.toLocaleString("en-US") + " characters \u00B7 preserved exactly as submitted"));
    body.appendChild(tb);

    if (r.edited) {
      var eb = block("Publication Version");
      eb.appendChild(el("p", "amtm-quote amtm-quote-edited", r.edited.text));
      eb.appendChild(el("p", "amtm-text-meta", (r.edited.substantive ? "Substantive edit" : "Minor correction") + " \u00B7 prepared " + fmtDate(r.edited.at, true) + " by " + r.edited.by));
      if (r.edited.substantive) eb.appendChild(r.edited.customerConfirmed ? flag("ok", "Customer confirmation recorded.") : flag("warn", "Awaiting customer confirmation."));
      body.appendChild(eb);
    }

    /* public preview */
    var pb = block("Public Display Preview");
    var pp = el("div", "amtm-public-preview");
    pp.appendChild(stars(r.rating));
    var q = el("p", "amtm-quote", publicationText(r)); q.style.marginTop = "8px";
    pp.appendChild(q);
    pp.appendChild(el("p", "amtm-public-by", publicName(r)));
    var sub = [r.category, location(r)].filter(Boolean).join(" \u00B7 ");
    if (sub) pp.appendChild(el("p", "amtm-public-sub", sub));
    pb.appendChild(pp);
    pb.appendChild(el("p", "amtm-text-meta", "Shows how the record would appear if published. Email, notes and history are never public. Location display must be confirmed as appropriate."));
    body.appendChild(pb);

    /* customer */
    var cbk = block("Customer");
    var dl = el("dl", "amtm-dl");
    dlRow(dl, "Full name", r.fullName);
    dlRow(dl, "Email", r.email, true);
    dlRow(dl, "Company", r.company);
    dlRow(dl, "Location", location(r));
    dlRow(dl, "Role", r.role);
    dlRow(dl, "Customer tenure", r.tenure);
    cbk.appendChild(dl);
    body.appendChild(cbk);

    var xb = block("Experience");
    var dl2 = el("dl", "amtm-dl");
    dlRow(dl2, "Experience", r.category);
    dlRow(dl2, "Rating", r.rating + " of 5");
    dlRow(dl2, "Result", r.result);
    dlRow(dl2, "Aircraft / product", r.details);
    dlRow(dl2, "Submitted", fmtDate(r.submittedAt, true));
    xb.appendChild(dl2);
    body.appendChild(xb);

    var phb = block("Uploaded Photographs");
    if (!r.photos.length) phb.appendChild(el("p", "amtm-hint", "No photographs submitted."));
    else {
      var grid = el("div", "amtm-photos");
      r.photos.forEach(function (ref) {
        var fig = el("figure", "amtm-photo");
        var art = el("div", "amtm-photo-art");
        var s = svgNS("svg", { viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false" });
        s.appendChild(svgNS("rect", { x: "6", y: "10", width: "36", height: "28", rx: "5", fill: "none", stroke: "currentColor", "stroke-width": "2.4" }));
        s.appendChild(svgNS("path", { d: "M8 34l10-9 7 6 6-5 9 8", fill: "none", stroke: "currentColor", "stroke-width": "2.4" }));
        art.appendChild(s);
        fig.appendChild(art);
        fig.appendChild(el("figcaption", "amtm-photo-cap", ref));
        grid.appendChild(fig);
      });
      phb.appendChild(grid);
      phb.appendChild(el("p", "amtm-text-meta", "Sample attachment references only. Production images load from private storage for authorized reviewers."));
    }
    body.appendChild(phb);

    var pref = block("Display Preferences & Consent");
    var dl3 = el("dl", "amtm-dl");
    dlRow(dl3, "Display as", r.display);
    dlRow(dl3, "Public name", publicName(r));
    dlRow(dl3, "Contact before publishing", yesNo(r.contactBefore) + (r.contactBefore ? (r.customerContacted ? " (contact recorded)" : " (not yet contacted)") : ""));
    dlRow(dl3, "Follow-up permission", yesNo(r.followUp));
    dlRow(dl3, "Publication consent", r.consent ? "Given at submission" : "Not given");
    dlRow(dl3, "Photo authorization", r.photoAuth === null ? "Not applicable" : (r.photoAuth ? "Given at submission" : "Not given"));
    pref.appendChild(dl3);
    body.appendChild(pref);

    var rv = block("Review Record");
    var dl4 = el("dl", "amtm-dl");
    dlRow(dl4, "Review status", STATUS_LABEL[r.review]);
    dlRow(dl4, "Publication status", r.published ? "Published" : "Unpublished");
    dlRow(dl4, "Review date", r.reviewedAt ? fmtDate(r.reviewedAt, true) : "");
    dlRow(dl4, "Publication date", r.publishedAt ? fmtDate(r.publishedAt, true) : "");
    dlRow(dl4, "Reviewer", r.reviewer);
    rv.appendChild(dl4);
    body.appendChild(rv);

    /* notes */
    var nb = block("Internal Notes", el("span", "amtm-private", "Never public"));
    var notes = el("div", "amtm-notes");
    if (!r.notes.length) notes.appendChild(el("p", "amtm-hint", "No internal notes yet."));
    r.notes.slice().reverse().forEach(function (n) {
      var d = el("div", "amtm-note");
      d.appendChild(el("p", "amtm-note-meta", fmtDate(n.at, true) + " \u00B7 " + n.by));
      d.appendChild(el("p", "amtm-note-text", n.text));
      notes.appendChild(d);
    });
    nb.appendChild(notes);
    var nf = el("form", "amtm-note-form");
    var nl = el("label", "amtm-sr-only", "Add internal note"); nl.htmlFor = "amtm-note-input";
    var ta = el("textarea", "amtm-textarea"); ta.id = "amtm-note-input"; ta.placeholder = "Add a private note for other reviewers"; ta.maxLength = 1000;
    var nerr = el("p", "amtm-dialog-error"); nerr.hidden = true; nerr.setAttribute("role", "alert");
    var nbtn = el("button", "amtm-button amtm-button-navy amtm-button-sm", "Add Note"); nbtn.type = "submit";
    nf.appendChild(nl); nf.appendChild(ta); nf.appendChild(nerr); nf.appendChild(nbtn);
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = ta.value.trim();
      if (!v) { nerr.textContent = "Write a note before adding it."; nerr.hidden = false; ta.focus(); return; }
      r.notes.push({ at: nowIso(), by: DEMO_REVIEWER, text: v });
      log(r, "Internal note added", "");
      renderDetail();
      toast("note added in this tab only.");
      var again = $("amtm-note-input"); if (again) again.focus();
    });
    nb.appendChild(nf);
    body.appendChild(nb);

    /* history */
    var hb = block("Review History");
    var hl = el("ol", "amtm-history");
    var submitted = el("li", "amtm-history-item");
    submitted.appendChild(el("p", "amtm-history-action", "Submitted \u00B7 Pending Review"));
    submitted.appendChild(el("p", "amtm-history-meta", fmtDate(r.submittedAt, true) + " \u00B7 customer"));
    hl.appendChild(submitted);
    r.history.forEach(function (h) {
      var li = el("li", "amtm-history-item");
      li.appendChild(el("p", "amtm-history-action", h.action));
      li.appendChild(el("p", "amtm-history-meta", fmtDate(h.at, true) + " \u00B7 " + h.by));
      if (h.detail) li.appendChild(el("p", "amtm-history-detail", h.detail));
      hl.appendChild(li);
    });
    hb.appendChild(hl);
    hb.appendChild(el("p", "amtm-text-meta", "Demo history exists only in this tab. Production must write an immutable server-side audit log."));
    body.appendChild(hb);
  }

  /* ---------- dialog ---------- */
  var dialog = $("amtm-dialog");
  var dlgConfig = null;
  var dlgReturn = null;
  function openDialog(cfg) {
    dlgConfig = cfg;
    dlgReturn = document.activeElement;
    $("amtm-dialog-title").textContent = cfg.title;
    var c = $("amtm-dialog-content"); c.textContent = "";
    cfg.build(c);
    var err = $("amtm-dialog-error"); err.hidden = true; err.textContent = "";
    var confirm = $("amtm-dialog-confirm");
    confirm.textContent = cfg.confirmLabel || "Confirm";
    confirm.className = "amtm-button " + (cfg.confirmClass || "amtm-button-primary");
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
    var first = c.querySelector("textarea, input, select");
    (first || confirm).focus();
  }
  function closeDialog() {
    if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open");
  }
  dialog.addEventListener("close", function () {
    dlgConfig = null;
    if (dlgReturn && document.body.contains(dlgReturn)) dlgReturn.focus();
    else if (detail) detail.focus();
  });
  $("amtm-dialog-cancel").addEventListener("click", closeDialog);
  $("amtm-dialog-form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!dlgConfig) return;
    var res = dlgConfig.onConfirm();
    if (res === true) { closeDialog(); }
    else if (typeof res === "string") { var err = $("amtm-dialog-error"); err.textContent = res; err.hidden = false; }
  });
  function noteField(c, label, hint, required) {
    var f = el("div", "amtm-field");
    var l = el("label", "amtm-label", label + (required ? "" : " (optional)")); l.htmlFor = "amtm-dialog-note";
    var t = el("textarea", "amtm-textarea"); t.id = "amtm-dialog-note"; t.maxLength = 1000;
    f.appendChild(l);
    if (hint) { var h = el("p", "amtm-hint", hint); h.id = "amtm-dialog-note-hint"; t.setAttribute("aria-describedby", h.id); f.appendChild(h); }
    f.appendChild(t);
    c.appendChild(f);
    return t;
  }
  function checkField(c, id, text) {
    var l = el("label", "amtm-check");
    var i = el("input"); i.type = "checkbox"; i.id = id;
    l.appendChild(i); l.appendChild(el("span", "", text));
    c.appendChild(l);
    return i;
  }
  function addNote(r, text) { if (text) r.notes.push({ at: nowIso(), by: DEMO_REVIEWER, text: text }); }
  function after(r, msg) { renderAll(); toast(msg); }

  /* ---------- actions ---------- */
  function doApprove(r) {
    var note;
    openDialog({
      title: "Approve testimonial " + r.id + "?",
      build: function (c) {
        c.appendChild(el("p", "", "This marks the testimonial as approved for publication. It will not be published. Publishing is a separate action."));
        if (r.contactBefore) c.appendChild(flag("info", "Customer asked to be contacted before publishing."));
        note = noteField(c, "Internal note", "Private. Never shown publicly.", false);
      },
      confirmLabel: "Approve Testimonial", confirmClass: "amtm-button-navy",
      onConfirm: function () {
        r.review = "approved"; r.reviewedAt = nowIso(); r.reviewer = DEMO_REVIEWER;
        addNote(r, note.value.trim()); log(r, "Approved", note.value.trim() ? "Note added." : "");
        after(r, "testimonial approved (not published)."); return true;
      }
    });
  }
  function doReject(r) {
    var note;
    openDialog({
      title: "Reject testimonial " + r.id + "?",
      build: function (c) {
        c.appendChild(el("p", "", "Rejected testimonials remain private and cannot be published. The submission is kept, not deleted."));
        note = noteField(c, "Reason for rejection", "Required. Private internal record.", true);
      },
      confirmLabel: "Reject Testimonial", confirmClass: "amtm-button-primary",
      onConfirm: function () {
        var v = note.value.trim();
        if (!v) { note.focus(); return "Enter a reason for rejection."; }
        r.review = "rejected"; r.reviewedAt = nowIso(); r.reviewer = DEMO_REVIEWER;
        addNote(r, v); log(r, "Rejected", v);
        after(r, "testimonial rejected and kept private."); return true;
      }
    });
  }
  function doClarify(r) {
    var note;
    openDialog({
      title: "Request clarification for " + r.id,
      build: function (c) {
        c.appendChild(el("p", "", "The submission will be marked Needs Clarification and remain unpublished. No message is sent in this demo."));
        if (!r.followUp) c.appendChild(flag("warn", "Customer did not give follow-up permission. Confirm contact is appropriate."));
        note = noteField(c, "What information is needed?", "Required. Private internal note.", true);
      },
      confirmLabel: "Request Clarification", confirmClass: "amtm-button-navy",
      onConfirm: function () {
        var v = note.value.trim();
        if (!v) { note.focus(); return "Describe the information needed from the customer."; }
        r.review = "clarification"; r.reviewedAt = nowIso(); r.reviewer = DEMO_REVIEWER;
        addNote(r, v); log(r, "Clarification requested", v);
        after(r, "marked Needs Clarification."); return true;
      }
    });
  }
  function doReturnPending(r) {
    var note;
    openDialog({
      title: "Return " + r.id + " to Pending Review?",
      build: function (c) {
        c.appendChild(el("p", "", "The submission will re-enter the review queue. It stays private."));
        note = noteField(c, "Reason", "Required. Private internal record.", true);
      },
      confirmLabel: "Return to Pending Review", confirmClass: "amtm-button-navy",
      onConfirm: function () {
        var v = note.value.trim();
        if (!v) { note.focus(); return "Enter a reason."; }
        r.review = "pending"; addNote(r, v); log(r, "Returned to Pending Review", v);
        after(r, "returned to Pending Review."); return true;
      }
    });
  }
  function doPrepare(r) {
    var ta, minor, subst, confirmed;
    openDialog({
      title: "Prepare for Publication \u00B7 " + r.id,
      build: function (c) {
        c.appendChild(el("p", "", "Create a publication-ready version. The original submission is preserved unchanged. Limit edits to spelling, punctuation and formatting; never add statements or outcomes the customer did not make."));
        var of = el("div", "amtm-field");
        of.appendChild(el("p", "amtm-label", "Original (read only)"));
        of.appendChild(el("div", "amtm-original-ref", r.original));
        c.appendChild(of);
        var f = el("div", "amtm-field");
        var l = el("label", "amtm-label", "Publication version"); l.htmlFor = "amtm-edit-text";
        ta = el("textarea", "amtm-textarea"); ta.id = "amtm-edit-text"; ta.maxLength = 2000; ta.style.minHeight = "160px";
        ta.value = publicationText(r);
        f.appendChild(l); f.appendChild(ta); c.appendChild(f);
        var fs = el("fieldset", "amtm-radio-row"); fs.style.border = "0"; fs.style.padding = "0"; fs.style.margin = "0";
        fs.appendChild(el("legend", "amtm-label", "Type of edit"));
        function radio(id, text, checked) {
          var lab = el("label", "amtm-check");
          var i = el("input"); i.type = "radio"; i.name = "amtm-edit-type"; i.id = id; i.checked = !!checked;
          lab.appendChild(i); lab.appendChild(el("span", "", text)); fs.appendChild(lab); return i;
        }
        var wasSubst = r.edited && r.edited.substantive;
        minor = radio("amtm-edit-minor", "Minor correction (spelling, punctuation, formatting; meaning unchanged)", !wasSubst);
        subst = radio("amtm-edit-subst", "Substantive edit (wording or meaning changed; requires customer confirmation)", wasSubst);
        c.appendChild(fs);
        confirmed = checkField(c, "amtm-edit-confirmed", "Customer has already confirmed these substantive edits");
        confirmed.checked = !!(r.edited && r.edited.customerConfirmed);
        var sync = function () { confirmed.closest("label").hidden = !subst.checked; };
        minor.addEventListener("change", sync); subst.addEventListener("change", sync); sync();
      },
      confirmLabel: "Save Publication Version", confirmClass: "amtm-button-navy",
      onConfirm: function () {
        var v = ta.value.trim();
        if (v.length < 30) { ta.focus(); return "The publication version must be at least 30 characters."; }
        var isSubst = subst.checked;
        if (v === r.original.trim()) {
          r.edited = null;
          log(r, "Publication version reset", "Will publish original text.");
          after(r, "publication version matches original; original will be used."); return true;
        }
        r.edited = { text: v, substantive: isSubst, customerConfirmed: isSubst ? confirmed.checked : false, at: nowIso(), by: DEMO_REVIEWER };
        log(r, "Publication version prepared", (isSubst ? "Substantive edit" : "Minor correction") + (isSubst && confirmed.checked ? "; customer confirmation recorded." : isSubst ? "; awaiting customer confirmation." : "."));
        after(r, "publication version saved; original preserved."); return true;
      }
    });
  }
  function doRecordContact(r) {
    var note;
    openDialog({
      title: "Record pre-publication contact",
      build: function (c) {
        c.appendChild(el("p", "", "Confirm that Aviators Market contacted this customer before publication, as they requested. No message is sent from this demo."));
        note = noteField(c, "Contact summary", "Required. Private internal note.", true);
      },
      confirmLabel: "Record Contact", confirmClass: "amtm-button-navy",
      onConfirm: function () {
        var v = note.value.trim();
        if (!v) { note.focus(); return "Summarize the contact with the customer."; }
        r.customerContacted = true; addNote(r, v); log(r, "Pre-publication contact recorded", v);
        after(r, "pre-publication contact recorded."); return true;
      }
    });
  }
  function doConfirmEdits(r) {
    var note;
    openDialog({
      title: "Record customer confirmation of edits",
      build: function (c) {
        c.appendChild(el("p", "", "Confirm that the customer reviewed and approved the substantive edits to the publication version."));
        note = noteField(c, "How was confirmation received?", "Required. Private internal note.", true);
      },
      confirmLabel: "Record Confirmation", confirmClass: "amtm-button-navy",
      onConfirm: function () {
        var v = note.value.trim();
        if (!v) { note.focus(); return "Describe how the customer confirmed the edits."; }
        r.edited.customerConfirmed = true; addNote(r, v); log(r, "Customer confirmed substantive edits", v);
        after(r, "customer confirmation recorded."); return true;
      }
    });
  }
  function doPublish(r) {
    var chk;
    var blockers = publishBlockers(r);
    if (blockers.length) { toast(blockers[0]); return; }
    openDialog({
      title: "Publish testimonial " + r.id + "?",
      build: function (c) {
        c.appendChild(el("p", "", "In production this makes the testimonial eligible to appear on the public Aviators Market Testimonials page. In this demo nothing leaves this tab."));
        var prev = el("div", "amtm-public-preview");
        prev.appendChild(stars(r.rating));
        var q = el("p", "amtm-quote", publicationText(r)); q.style.marginTop = "8px"; prev.appendChild(q);
        prev.appendChild(el("p", "amtm-public-by", publicName(r)));
        c.appendChild(prev);
        c.appendChild(el("p", "amtm-hint", r.edited ? "The prepared publication version will be used. The original stays on record." : "The original text will be used."));
        chk = checkField(c, "amtm-publish-ack", "I have reviewed the text, display name and photographs, and confirm this testimonial should be published.");
      },
      confirmLabel: "Publish Testimonial", confirmClass: "amtm-button-primary",
      onConfirm: function () {
        if (!chk.checked) { chk.focus(); return "Confirm you have reviewed the testimonial before publishing."; }
        r.published = true; r.publishedAt = nowIso();
        log(r, "Published", r.edited ? "Published edited version." : "Published original text.");
        after(r, "marked Published. The public website is not affected."); return true;
      }
    });
  }
  function doUnpublish(r) {
    var note;
    openDialog({
      title: "Unpublish testimonial " + r.id + "?",
      build: function (c) {
        c.appendChild(el("p", "", "This removes the testimonial from public display without deleting the submission. It returns to Approved."));
        note = noteField(c, "Reason for unpublishing", "Required. Private internal record.", true);
      },
      confirmLabel: "Unpublish Testimonial", confirmClass: "amtm-button-primary",
      onConfirm: function () {
        var v = note.value.trim();
        if (!v) { note.focus(); return "Enter a reason for unpublishing."; }
        r.published = false; addNote(r, v); log(r, "Unpublished", v);
        after(r, "marked Unpublished. The public website is not affected."); return true;
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && detail.classList.contains("amtm-is-open-mobile") && !dialog.open) closeMobile();
  });

  function renderAll() { renderSummary(); renderFilters(); renderQueue(); renderDetail(); }

  records = sampleData();
  renderAll();
})();
