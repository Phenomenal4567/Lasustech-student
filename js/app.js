/* ============================================================
   Scholar Portal — app.js
   Vanilla JS. All data is local/sample. Nothing is sent anywhere.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- small helpers ---------- */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function toast(msg) {
    var t = $("#toast");
    if (!t) { return; }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ============================================================
     LOGIN (index.html) — demo only, no real auth, no storage
     ============================================================ */
  var loginForm = $("#loginForm");
  if (loginForm) {
    var pwToggle = $("#pwToggle");
    if (pwToggle) {
      pwToggle.addEventListener("click", function () {
        var pw = $("#password");
        if (pw.type === "password") { pw.type = "text"; pwToggle.textContent = "Hide"; }
        else { pw.type = "password"; pwToggle.textContent = "Show"; }
      });
    }
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Purely a demo redirect. We deliberately do NOT read, keep,
      // or transmit the password anywhere.
      window.location.href = "dashboard.html";
    });
  }

  /* ============================================================
     SIDEBAR + MOBILE NAV (app shell)
     ============================================================ */
  var sidebar   = $("#sidebar");
  var overlay   = $("#overlay");
  var hamburger = $("#hamburger");

  function openSidebar()  { if (sidebar) { sidebar.classList.add("open"); } if (overlay) { overlay.classList.add("show"); } }
  function closeSidebar() { if (sidebar) { sidebar.classList.remove("open"); } if (overlay) { overlay.classList.remove("show"); } }

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      if (sidebar && sidebar.classList.contains("open")) { closeSidebar(); }
      else { openSidebar(); }
    });
  }
  if (overlay) { overlay.addEventListener("click", closeSidebar); }

  // Close the mobile sidebar when a link is tapped
  $$(".side-nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.innerWidth <= 900) { closeSidebar(); }
    });
  });

  /* ============================================================
     USER DROPDOWN MENU
     ============================================================ */
  var userBtn  = $("#userBtn");
  var userMenu = $("#userMenu");
  if (userBtn && userMenu) {
    userBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      userMenu.classList.toggle("open");
    });
    document.addEventListener("click", function () { userMenu.classList.remove("open"); });
    userMenu.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  /* ============================================================
     TABS (results.html and any .tabs block)
     ============================================================ */
  $$(".tabs").forEach(function (group) {
    var buttons = $$(".tab-btn", group);
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        // panels live as siblings after the tabs container
        var scope = group.parentNode;
        $$(".tab-panel", scope).forEach(function (p) {
          p.classList.toggle("active", p.id === target);
        });
      });
    });
  });

  /* ============================================================
     COURSE REGISTRATION (courses.html)
     ============================================================ */
  var courseTable = $("#courseTable");
  if (courseTable) {
    var selCount  = $("#selCount");
    var unitTotal = $("#unitTotal");

    function recalc() {
      var count = 0, units = 0;
      $$("input[type=checkbox]", courseTable).forEach(function (cb) {
        if (cb.checked) { count += 1; units += parseInt(cb.getAttribute("data-units"), 10) || 0; }
      });
      if (selCount)  { selCount.textContent  = count; }
      if (unitTotal) { unitTotal.textContent = units; }
    }
    $$("input[type=checkbox]", courseTable).forEach(function (cb) {
      cb.addEventListener("change", recalc);
    });
    recalc();

    // Filter courses by code/title
    var courseFilter = $("#courseFilter");
    if (courseFilter) {
      courseFilter.addEventListener("input", function () {
        var q = courseFilter.value.toLowerCase().trim();
        $$("tbody tr", courseTable).forEach(function (row) {
          var text = row.textContent.toLowerCase();
          row.style.display = text.indexOf(q) !== -1 ? "" : "none";
        });
      });
    }

    var registerBtn = $("#registerBtn");
    if (registerBtn) {
      registerBtn.addEventListener("click", function () {
        var n = selCount ? selCount.textContent : "0";
        var u = unitTotal ? unitTotal.textContent : "0";
        toast("Registered " + n + " courses (" + u + " units) — demo only, nothing submitted.");
      });
    }
    var printBtn = $("#printBtn");
    if (printBtn) { printBtn.addEventListener("click", function () { window.print(); }); }
  }

  /* ============================================================
     PAYMENTS (payments.html)
     ============================================================ */
  $$(".payBtn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.getAttribute("data-item") || "item";
      var amt  = btn.getAttribute("data-amt")  || "";
      toast("Demo: ₦" + amt + " payment for " + item + " would start here. No real charge.");
    });
  });

  var histFilter = $("#histFilter");
  var histTable  = $("#histTable");
  if (histFilter && histTable) {
    histFilter.addEventListener("change", function () {
      var v = histFilter.value;
      $$("tbody tr", histTable).forEach(function (row) {
        var s = row.getAttribute("data-status");
        row.style.display = (v === "all" || v === s) ? "" : "none";
      });
    });
  }

})();
