/* Wache – persönliche Übersicht. Alle Daten bleiben in IndexedDB auf diesem Gerät. */
(function () {
  "use strict";
  var VERSION = "1.0.0";

  /* ---------- Icons ---------- */
  var IC = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    flame: '<path d="M12 2.5c1 3.5 5.5 5.5 5.5 10.5a5.5 5.5 0 0 1-11 0c0-2.2 1-3.8 2.2-5 0 2 1 3.3 2.3 3.3 0-3.3-1-5.8 1-8.8z"/>',
    building: '<path d="M3 21h18M5 21V10.5M19 21V10.5M9.5 21v-5h5v5M2.5 10.5 12 4l9.5 6.5z"/><path d="M12 8h.01"/>',
    paw: '<circle cx="5.5" cy="10.5" r="1.8"/><circle cx="9.3" cy="6" r="1.8"/><circle cx="14.7" cy="6" r="1.8"/><circle cx="18.5" cy="10.5" r="1.8"/><path d="M7.5 17.5c0-3.2 2.2-6 4.5-6s4.5 2.8 4.5 6c0 1.9-1.6 2.8-4.5 2.8s-4.5-.9-4.5-2.8z"/>',
    hospital: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 7.5v9M7.5 12h9"/>',
    radio: '<path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4"/><circle cx="12" cy="12" r="2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/>',
    truck: '<path d="M2 17V6.5a1 1 0 0 1 1-1h10.5V17M13.5 9.5h4.2l3.3 3.8V17h-1.7M2 17h1.8M8.8 17h6.4"/><circle cx="6.3" cy="17.3" r="2.2"/><circle cx="17.7" cy="17.3" r="2.2"/><path d="M5 9h5"/>',
    pulse: '<path d="M2.5 12h4l2.2-5.5 4.6 11 2.2-5.5h6"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    star: '<path d="M12 3.2l2.7 5.5 6 .9-4.4 4.2 1 6L12 17l-5.3 2.8 1-6-4.4-4.2 6-.9z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/>',
    check: '<path d="M5 12.5 10 17.5 19.5 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pencil: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/>',
    file: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9.5 9"/>',
    note: '<path d="M6 3.5h12A1.5 1.5 0 0 1 19.5 5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5z"/><path d="M8.5 9h7M8.5 13h7M8.5 17h4"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    up: '<path d="M6 15l6-6 6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    zin: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6M8 11h6M11 8v6"/>',
    zout: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6M8 11h6"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/>',
    map: '<path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M17.5 14.6c2.3.3 3.7 2 4 4.9"/>',
    drop: '<path d="M12 3c3.5 4.5 6 7.7 6 11a6 6 0 0 1-12 0c0-3.3 2.5-6.5 6-11z"/>',
    bolt: '<path d="M13 2.5 4.5 13.5H11L10 21.5l8.5-11H12z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12 20 3M16 7l3 3M14.5 8.5l2 2"/>',
    car: '<path d="M5 16.5V12l2-5h10l2 5v4.5M3.5 12h17M5 16.5h14"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>'
  };
  var SECTION_ICONS = ["flame", "building", "paw", "hospital", "radio", "info", "truck", "pulse", "phone", "users", "shield", "map", "drop", "bolt", "car", "key", "clock", "folder", "note", "star"];
  function ic(name, cls) { return '<svg class="i' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (IC[name] || IC.folder) + "</svg>"; }

  var COLORS = [
    { k: "red", c: "#e8392f", n: "Rot" }, { k: "orange", c: "#ff8a1f", n: "Orange" }, { k: "yellow", c: "#ffd23f", n: "Gelb" },
    { k: "green", c: "#2fbf71", n: "Grün" }, { k: "blue", c: "#3d8bff", n: "Blau" }, { k: "purple", c: "#a66bff", n: "Lila" }
  ];
  function colorOf(k) { for (var i = 0; i < COLORS.length; i++) if (COLORS[i].k === k) return COLORS[i].c; return ""; }
  function colorName(k) {
    var custom = state.settings.colorNames && state.settings.colorNames[k];
    if (custom) return custom;
    for (var i = 0; i < COLORS.length; i++) if (COLORS[i].k === k) return COLORS[i].n;
    return "";
  }
  function tint(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  /* ---------- Standarddaten ---------- */
  var NRW = ["Bielefeld", "Bochum", "Bonn", "Bottrop", "Dortmund", "Duisburg", "Düsseldorf", "Essen", "Gelsenkirchen", "Hagen", "Hamm", "Herne", "Köln", "Krefeld", "Leverkusen", "Mönchengladbach", "Mülheim an der Ruhr", "Münster", "Oberhausen", "Remscheid", "Solingen", "Wuppertal",
    "Städteregion Aachen", "Kreis Borken", "Kreis Coesfeld", "Kreis Düren", "Ennepe-Ruhr-Kreis", "Kreis Euskirchen", "Kreis Gütersloh", "Kreis Heinsberg", "Kreis Herford", "Hochsauerlandkreis", "Kreis Höxter", "Kreis Kleve", "Kreis Lippe", "Märkischer Kreis", "Kreis Mettmann", "Kreis Minden-Lübbecke", "Oberbergischer Kreis", "Kreis Olpe", "Kreis Paderborn", "Kreis Recklinghausen", "Rhein-Erft-Kreis", "Rheinisch-Bergischer Kreis", "Rhein-Kreis Neuss", "Rhein-Sieg-Kreis", "Kreis Siegen-Wittgenstein", "Kreis Soest", "Kreis Steinfurt", "Kreis Unna", "Kreis Viersen", "Kreis Warendorf", "Kreis Wesel"];

  function defaults() {
    var sections = [
      { id: "wache", name: "Telefonliste Wache", type: "phone", icon: "flame", color: "red" },
      { id: "rathaus", name: "Telefonliste Rathaus", type: "phone", icon: "building", color: "blue" },
      { id: "tier", name: "Tierrettung", type: "phone", icon: "paw", color: "green" },
      { id: "kh", name: "Krankenhäuser", type: "phone", icon: "hospital", color: "orange" },
      { id: "ls", name: "Leitstellen NRW", type: "phone", icon: "radio", color: "yellow" },
      { id: "info", name: "Wichtige Informationen", type: "docs", icon: "info", color: "blue" },
      { id: "aao", name: "AAO Feuerwehr", type: "docs", icon: "truck", color: "red" },
      { id: "mb", name: "Meldebilder Rettungsdienst", type: "docs", icon: "pulse", color: "orange" }
    ];
    var items = [
      { id: uid(), sec: "ls", name: "Notruf Feuerwehr und Rettungsdienst", num: "112", note: "Europaweit, kostenlos", color: "red", pin: true },
      { id: uid(), sec: "ls", name: "Notruf Polizei", num: "110", note: "", color: "blue", pin: false }
    ];
    NRW.forEach(function (n) {
      items.push({ id: uid(), sec: "ls", name: "Leitstelle " + n, num: "", note: "", color: "", pin: false, ph: true });
    });
    return {
      v: 1,
      settings: { title: "Wache", subtitle: "Meine Einsatz-Übersicht", lockAfter: 1, colorNames: {} },
      sections: sections,
      items: items
    };
  }

  /* ---------- Speicher (IndexedDB) ---------- */
  var db;
  function openDB() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open("wache", 1);
      r.onupgradeneeded = function () {
        var d = r.result;
        if (!d.objectStoreNames.contains("kv")) d.createObjectStore("kv");
        if (!d.objectStoreNames.contains("files")) d.createObjectStore("files", { keyPath: "id" });
        if (!d.objectStoreNames.contains("blobs")) d.createObjectStore("blobs");
      };
      r.onsuccess = function () { db = r.result; res(db); };
      r.onerror = function () { rej(r.error); };
    });
  }
  function tx(store, mode, fn) {
    return new Promise(function (res, rej) {
      var t = db.transaction(store, mode), s = t.objectStore(store), out;
      var req = fn(s);
      if (req) req.onsuccess = function () { out = req.result; };
      t.oncomplete = function () { res(out); };
      t.onerror = function () { rej(t.error); };
      t.onabort = function () { rej(t.error || new Error("abgebrochen")); };
    });
  }
  var kvGet = function (k) { return tx("kv", "readonly", function (s) { return s.get(k); }); };
  var kvSet = function (k, v) { return tx("kv", "readwrite", function (s) { return s.put(v, k); }); };
  var kvDel = function (k) { return tx("kv", "readwrite", function (s) { return s.delete(k); }); };
  var blobGet = function (k) { return tx("blobs", "readonly", function (s) { return s.get(k); }); };
  var blobSet = function (k, v) { return tx("blobs", "readwrite", function (s) { return s.put(v, k); }); };
  var blobDel = function (k) { return tx("blobs", "readwrite", function (s) { return s.delete(k); }); };
  var fileAll = function () { return tx("files", "readonly", function (s) { return s.getAll(); }); };
  var filePut = function (m) { return tx("files", "readwrite", function (s) { return s.put(m); }); };
  var fileDel = function (id) { return tx("files", "readwrite", function (s) { return s.delete(id); }); };
  function clearAll() {
    return Promise.all(["kv", "files", "blobs"].map(function (n) { return tx(n, "readwrite", function (s) { return s.clear(); }); }));
  }

  var state, files = [], bgURL = "", tileURLs = {};
  function save() {
    return kvSet("state", state).catch(function () { toast("Speichern fehlgeschlagen. Ist der Speicher voll?"); });
  }

  /* ---------- Helfer ---------- */
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function sec(id) { for (var i = 0; i < state.sections.length; i++) if (state.sections[i].id === id) return state.sections[i]; return null; }
  function telHref(n) { return "tel:" + String(n || "").replace(/[^\d+]/g, ""); }
  function digits(s) { return String(s || "").replace(/\D/g, ""); }
  function low(s) { return String(s || "").toLocaleLowerCase("de"); }
  function fmtSize(b) { return b > 1048576 ? (b / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(b / 1024)) + " KB"; }
  function fmtDate(t) { var d = new Date(t); return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }); }
  function byName(a, b) { return (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || String(a.name || a.title || "").localeCompare(String(b.name || b.title || ""), "de"); }
  function secItems(id) { return state.items.filter(function (x) { return x.sec === id; }); }
  function secFiles(id) { return files.filter(function (f) { return f.sec === id; }); }
  function secCount(s) { return secItems(s.id).filter(function (x) { return !x.ph; }).length + secFiles(s.id).length; }

  var toastT;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2000);
  }
  function copyText(text, btn) {
    var ok = function () {
      toast("Kopiert: " + text);
      if (btn) { btn.classList.add("done"); btn.innerHTML = ic("check"); setTimeout(function () { btn.classList.remove("done"); btn.innerHTML = ic("copy"); }, 1200); }
    };
    var fallback = function () {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
      try { document.execCommand("copy"); ok(); } catch (e) { toast(text); }
      ta.remove();
    };
    try { navigator.clipboard.writeText(text).then(ok, fallback); } catch (e) { fallback(); }
  }

  /* ---------- Dialoge ---------- */
  function closeSheet() { $("sheet").innerHTML = ""; }
  function dialog(html, onMount) {
    $("sheet").innerHTML = '<div class="overlay" id="ov"><div class="dlg" role="dialog" aria-modal="true">' + html + "</div></div>";
    $("ov").addEventListener("click", function (e) { if (e.target.id === "ov") closeSheet(); });
    if (onMount) onMount($("sheet").querySelector(".dlg"));
  }
  function confirmBox(title, text, okLabel, danger) {
    return new Promise(function (res) {
      dialog('<h3>' + esc(title) + '</h3><p style="margin:0;color:var(--muted)">' + esc(text) + '</p><div class="actions"><span class="sp"></span><button class="btn ghost" type="button" id="cNo">Abbrechen</button><button class="btn ' + (danger ? "red" : "on") + '" type="button" id="cOk">' + esc(okLabel) + "</button></div>",
        function () {
          $("cNo").onclick = function () { closeSheet(); res(false); };
          $("cOk").onclick = function () { closeSheet(); res(true); };
        });
    });
  }
  function colorPicker(cur) {
    var h = '<div class="field"><span class="flabel">Farbe</span><div class="colors" id="fColor" data-v="' + esc(cur || "") + '">';
    h += '<button type="button" class="sw none' + (!cur ? " on" : "") + '" data-c="" aria-label="Keine Farbe"><span></span></button>';
    COLORS.forEach(function (c) {
      h += '<button type="button" class="sw' + (cur === c.k ? " on" : "") + '" data-c="' + c.k + '" aria-label="' + esc(colorName(c.k)) + '" title="' + esc(colorName(c.k)) + '"><span style="background:' + c.c + '"></span></button>';
    });
    return h + '</div><span class="flabel" id="fColorName" style="font-weight:400">' + esc(cur ? colorName(cur) : "Keine Farbe") + "</span></div>";
  }
  function bindColorPicker(root) {
    var box = root.querySelector("#fColor"); if (!box) return;
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".sw"); if (!b) return;
      box.dataset.v = b.dataset.c;
      box.querySelectorAll(".sw").forEach(function (x) { x.classList.toggle("on", x === b); });
      root.querySelector("#fColorName").textContent = b.dataset.c ? colorName(b.dataset.c) : "Keine Farbe";
    });
  }

  /* ---------- Navigation ---------- */
  var route = "start", query = "", editMode = {}, filterColor = {}, flashId = null;
  function go(r) {
    if (location.hash !== "#" + r) location.hash = r; else render();
    $("side").classList.remove("open");
  }
  window.addEventListener("hashchange", function () {
    route = (location.hash || "#start").slice(1) || "start";
    if (query) { query = ""; $("search").value = ""; }
    render(); $("view").scrollTop = 0;
  });

  function renderNav() {
    var h = '<button class="navbtn' + (route === "start" && !query ? " on" : "") + '" type="button" data-go="start">' + ic("home") + '<span class="lbl">Start</span></button><div class="navsep"></div>';
    state.sections.forEach(function (s) {
      h += '<button class="navbtn' + (route === "s-" + s.id && !query ? " on" : "") + '" type="button" data-go="s-' + s.id + '">' + ic(s.icon) +
        '<span class="lbl">' + esc(s.name) + '</span><span class="n">' + (secCount(s) || "") + "</span></button>";
    });
    $("nav").innerHTML = h;
    $("navSettings").innerHTML = ic("gear") + '<span class="lbl">Einstellungen</span>';
    $("navSettings").classList.toggle("on", route === "settings");
    $("lockNow").innerHTML = ic("lock") + '<span class="lbl">Jetzt sperren</span>';
    $("brandTitle").textContent = state.settings.title || "Wache";
    $("brandSub").textContent = state.settings.subtitle || "";
  }

  function render() {
    renderNav();
    var v = $("view");
    if (query) return renderSearch(v);
    if (route === "settings") return renderSettings(v);
    if (route.indexOf("s-") === 0 && sec(route.slice(2))) return renderSection(v, sec(route.slice(2)));
    renderStart(v);
  }

  /* ---------- Start ---------- */
  function isStandalone() { return window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches; }
  function renderStart(v) {
    var st = state.settings, h = "";
    if (!isStandalone() && !st.hideInstall) {
      h += '<div class="banner"><span class="sp"><b>Als App installieren:</b> Tippe in Safari auf Teilen und dann auf „Zum Home-Bildschirm“. Danach startet die Übersicht im Vollbild und auch ohne Internet.</span><button class="btn ghost" type="button" id="hideInstall">Ausblenden</button></div>';
    }
    h += '<div class="hero' + (bgURL ? " img" : "") + '"' + (bgURL ? ' style="background-image:url(' + bgURL + ')"' : "") + '><span class="eyebrow">' + esc(st.subtitle || "Übersicht") + "</span><h1>" + esc(st.title || "Wache") + "</h1><p>" + esc(todayLong()) + "</p></div>";
    h += '<div class="tiles">';
    state.sections.forEach(function (s) {
      var c = colorOf(s.color) || "#8d97a5", n = secCount(s), img = tileURLs[s.id];
      h += '<button class="tile' + (img ? " bgimg" : "") + '" type="button" data-go="s-' + s.id + '"' + (img ? ' style="background-image:url(' + img + ')"' : "") + '>' +
        '<span class="ti" style="background:' + tint(c, 0.16) + ";color:" + c + '">' + ic(s.icon) + "</span>" +
        "<span><b>" + esc(s.name) + "</b><small>" + countLabel(s, n) + "</small></span></button>";
    });
    h += "</div>";

    var pinned = state.items.filter(function (x) { return x.pin && x.num; }).sort(byName);
    h += '<div class="h2"><h2>Angeheftet</h2><span class="sub">Schnellzugriff aus allen Listen</span></div>';
    if (pinned.length) {
      h += '<div class="quick">' + pinned.map(function (x) {
        var s = sec(x.sec);
        return '<div class="qcard"><span class="stripe" style="background:' + (colorOf(x.color) || "var(--line)") + '"></span><div class="m"><b>' + esc(x.name) + '</b><a class="num" href="' + telHref(x.num) + '">' + esc(x.num) + '</a><div class="from">' + esc(s ? s.name : "") + '</div></div><button class="copy" type="button" data-copy="' + esc(x.num) + '" aria-label="Nummer kopieren">' + ic("copy") + "</button></div>";
      }).join("") + "</div>";
    } else {
      h += '<div class="empty">Hefte wichtige Nummern an, dann stehen sie hier ganz oben. Das geht beim Bearbeiten eines Eintrags mit „Auf Startseite anheften“.</div>';
    }
    v.innerHTML = h;
    var hi = $("hideInstall"); if (hi) hi.onclick = function () { state.settings.hideInstall = true; save(); render(); };
  }
  function countLabel(s, n) {
    if (s.type === "phone") return n === 1 ? "1 Nummer" : n + " Nummern";
    return n === 1 ? "1 Eintrag" : n + " Einträge";
  }
  function todayLong() { return new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); }

  /* ---------- Bereich ---------- */
  function renderSection(v, s) {
    var c = colorOf(s.color) || "#8d97a5", ed = !!editMode[s.id];
    var h = '<div class="sechead"><span class="ti" style="background:' + tint(c, 0.16) + ";color:" + c + '">' + ic(s.icon) + "</span><h1>" + esc(s.name) + '</h1><div class="btnrow">';
    if (s.type === "phone") h += '<button class="btn red" type="button" id="addItem">' + ic("plus") + "Nummer</button>";
    else h += '<button class="btn red" type="button" id="addFile">' + ic("plus") + 'PDF oder Bild</button><button class="btn" type="button" id="addItem">' + ic("note") + "Text</button>";
    h += '<button class="btn' + (ed ? " on" : "") + '" type="button" id="editToggle">' + ic(ed ? "check" : "pencil") + (ed ? "Fertig" : "Bearbeiten") + "</button></div></div>";
    if (ed) h += '<div class="banner"><span class="sp">Bearbeiten ist an. Tippe auf einen Eintrag, um ihn zu ändern oder zu löschen.</span></div>';

    if (s.type === "phone") h += phoneList(s, ed);
    else h += docsList(s, ed);
    v.innerHTML = h;

    $("editToggle").onclick = function () { editMode[s.id] = !ed; render(); };
    $("addItem").onclick = function () { s.type === "phone" ? editPhone(s) : editText(s); };
    var af = $("addFile"); if (af) af.onclick = function () { pickFiles(s); };
    if (flashId) {
      var el = v.querySelector('[data-id="' + flashId + '"]');
      if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); }
      flashId = null;
    }
  }

  function phoneRow(x, ed, showSec) {
    var c = colorOf(x.color), s = showSec ? sec(x.sec) : null;
    return '<div class="row' + (ed ? " editable" : "") + '" data-id="' + x.id + '"' + (ed ? ' data-edit="' + x.id + '"' : (showSec ? ' data-jump="' + x.id + '"' : "")) + '>' +
      '<span class="stripe" style="background:' + (c || "transparent") + '"></span>' +
      '<div class="m"><div class="nm">' + mk(x.name) + (x.pin ? '<span class="pinned" title="Angeheftet">' + ic("star") + "</span>" : "") + "</div>" +
      (x.note ? '<div class="note">' + mk(x.note) + "</div>" : "") +
      (s ? '<div class="note">' + esc(s.name) + "</div>" : "") +
      (c && !showSec ? '<div class="note" style="color:' + c + '">' + esc(colorName(x.color)) + "</div>" : "") + "</div>" +
      '<div class="nums">' + (x.num ? '<a class="num" href="' + telHref(x.num) + '">' + mk(x.num) + "</a>" : '<span class="note">Nummer fehlt</span>') +
      (x.num2 ? '<span class="num2">' + mk(x.num2) + "</span>" : "") + "</div>" +
      (x.num ? '<button class="copy" type="button" data-copy="' + esc(x.num) + '" aria-label="Nummer kopieren">' + ic("copy") + "</button>" : '<span style="width:44px;flex:none"></span>') +
      "</div>";
  }
  function phoneList(s, ed) {
    var all = secItems(s.id), used = {}, fc = filterColor[s.id] || "";
    all.forEach(function (x) { if (x.color) used[x.color] = (used[x.color] || 0) + 1; });
    var h = "";
    if (Object.keys(used).length) {
      h += '<div class="chips" id="chips"><button class="chip' + (!fc ? " on" : "") + '" type="button" data-fc="">Alle <span class="note">' + all.length + "</span></button>";
      COLORS.forEach(function (c) {
        if (!used[c.k]) return;
        h += '<button class="chip' + (fc === c.k ? " on" : "") + '" type="button" data-fc="' + c.k + '"><span class="dot" style="background:' + c.c + '"></span>' + esc(colorName(c.k)) + " " + used[c.k] + "</button>";
      });
      h += "</div>";
    }
    var list = all.filter(function (x) { return !fc || x.color === fc; }).sort(byName);
    if (!all.length) return h + '<div class="empty"><b>Noch keine Nummern</b>Tippe oben auf „Nummer“, um die erste einzutragen.</div>';
    return h + '<div class="list">' + list.map(function (x) { return phoneRow(x, ed); }).join("") + "</div>";
  }

  function textCard(x, ed, showSec) {
    var c = colorOf(x.color), s = showSec ? sec(x.sec) : null;
    var tag = ed ? "button" : "div";
    return "<" + tag + ' class="card"' + (ed ? ' type="button" data-edit="' + x.id + '"' : "") + ' data-id="' + x.id + '"' + (showSec ? ' data-jump="' + x.id + '"' : "") + ">" +
      (c ? '<span class="stripe" style="background:' + c + '"></span>' : "") +
      "<b>" + mk(x.title) + (x.pin ? '<span class="pinned">' + ic("star") + "</span>" : "") + "</b>" +
      (x.text ? '<div class="txt">' + (showSec ? snippet(x.text) : mk(x.text)) + "</div>" : "") +
      '<span class="meta">' + (s ? esc(s.name) + " · " : "") + "Geändert " + fmtDate(x.updated || Date.now()) + "</span></" + tag + ">";
  }
  function fileCard(f, ed, showSec) {
    var c = colorOf(f.color), s = showSec ? sec(f.sec) : null, isPdf = f.mime === "application/pdf";
    return '<div class="file" data-id="' + f.id + '">' + (c ? '<span class="stripe" style="background:' + c + '"></span>' : "") +
      '<button class="thumb" type="button" data-open="' + f.id + '" aria-label="' + esc(f.name) + ' öffnen">' + (f.thumb ? '<img src="' + f.thumb + '" alt="">' : ic(isPdf ? "file" : "image")) + "</button>" +
      '<button class="fm" type="button" data-open="' + f.id + '" style="text-align:left"><b>' + mk(f.name) + "</b><span>" + (isPdf ? "PDF" + (f.pages ? " · " + f.pages + " S." : "") : "Bild") + " · " + fmtSize(f.size) + (s ? " · " + esc(s.name) : "") + "</span>" +
      (showSec && query && f.text ? '<span class="snip">' + snippet(f.text) + "</span>" : "") + "</button>" +
      (ed ? '<button class="fedit" type="button" data-fedit="' + f.id + '" aria-label="Datei bearbeiten">' + ic("pencil") + "</button>" : "") + "</div>";
  }
  function docsList(s, ed) {
    var texts = secItems(s.id).sort(byName), fl = secFiles(s.id).sort(byName);
    if (!texts.length && !fl.length) return '<div class="empty"><b>Noch nichts hier</b>Füge PDFs oder Fotos aus der Dateien-App hinzu, oder schreib einen Text.</div>';
    var h = "";
    if (fl.length) h += '<div class="subh">Dokumente</div><div class="files">' + fl.map(function (f) { return fileCard(f, ed); }).join("") + "</div>";
    if (texts.length) h += '<div class="subh">Texte</div><div class="cards">' + texts.map(function (x) { return textCard(x, ed); }).join("") + "</div>";
    return h;
  }

  /* ---------- Bearbeiten ---------- */
  function field(id, label, val, type, extra) {
    if (type === "area") return '<div class="field"><label for="' + id + '">' + label + '</label><textarea id="' + id + '"' + (extra || "") + ">" + esc(val) + "</textarea></div>";
    return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + (type || "text") + '" value="' + esc(val) + '"' + (extra || "") + "></div>";
  }
  function actions(isEdit) {
    return '<div class="actions">' + (isEdit ? '<button class="btn danger" type="button" id="fDel">Löschen</button>' : "") +
      '<span class="sp"></span><button class="btn ghost" type="button" id="fCancel">Abbrechen</button><button class="btn red" type="submit">Speichern</button></div>';
  }
  function wireForm(root, onSave, onDel) {
    bindColorPicker(root);
    $("fCancel").onclick = closeSheet;
    var del = $("fDel"), armed = false;
    if (del) del.onclick = function () {
      if (!armed) { armed = true; del.textContent = "Wirklich löschen?"; return; }
      onDel(); closeSheet();
    };
    root.querySelector("form").onsubmit = function (e) { e.preventDefault(); if (onSave() !== false) closeSheet(); };
    var first = root.querySelector("input:not([type=checkbox]), textarea");
    if (first && !("ontouchstart" in window)) first.focus();
  }
  function req(id) {
    var el = $(id), v = el.value.trim();
    el.closest(".field").classList.toggle("bad", !v);
    return v;
  }

  function editPhone(s, x) {
    var v = x || { color: "", pin: false };
    dialog('<form novalidate><h3>' + (x ? "Nummer ändern" : "Neue Nummer") + " · " + esc(s.name) + "</h3>" +
      field("fName", "Name oder Stelle", v.name) +
      field("fNum", "Telefonnummer", v.num, "tel", ' class="num" inputmode="tel" autocomplete="off"') +
      field("fNum2", "Zweite Nummer, z. B. Fax oder Handy (optional)", v.num2, "tel", ' class="num" inputmode="tel" autocomplete="off"') +
      field("fNote", "Notiz (optional), z. B. Zuständigkeit oder Erreichbarkeit", v.note) +
      colorPicker(v.color) +
      '<label class="toggle"><input type="checkbox" id="fPin"' + (v.pin ? " checked" : "") + "> Auf Startseite anheften</label>" +
      actions(!!x) + "</form>",
      function (root) {
        wireForm(root, function () {
          var name = req("fName"); if (!name) { toast("Bitte einen Namen eintragen"); return false; }
          var o = x || { id: uid(), sec: s.id };
          o.name = name; o.num = $("fNum").value.trim(); o.num2 = $("fNum2").value.trim(); o.note = $("fNote").value.trim();
          o.color = $("fColor").dataset.v; o.pin = $("fPin").checked; delete o.ph;
          if (!x) state.items.push(o);
          save(); render(); toast("Gespeichert");
        }, function () {
          state.items = state.items.filter(function (i) { return i !== x; }); save(); render(); toast("Gelöscht");
        });
      });
  }

  function editText(s, x) {
    var v = x || { color: "", pin: false };
    dialog('<form novalidate><h3>' + (x ? "Text ändern" : "Neuer Text") + " · " + esc(s.name) + "</h3>" +
      field("fTitle", "Überschrift", v.title) + field("fText", "Inhalt", v.text, "area") + colorPicker(v.color) +
      '<label class="toggle"><input type="checkbox" id="fPin"' + (v.pin ? " checked" : "") + "> Oben anheften</label>" + actions(!!x) + "</form>",
      function (root) {
        wireForm(root, function () {
          var t = req("fTitle"); if (!t) { toast("Bitte eine Überschrift eintragen"); return false; }
          var o = x || { id: uid(), sec: s.id, kind: "text" };
          o.title = t; o.text = $("fText").value; o.color = $("fColor").dataset.v; o.pin = $("fPin").checked; o.updated = Date.now();
          if (!x) state.items.push(o);
          save(); render(); toast("Gespeichert");
        }, function () {
          state.items = state.items.filter(function (i) { return i !== x; }); save(); render(); toast("Gelöscht");
        });
      });
  }

  function editFile(f) {
    dialog('<form novalidate><h3>Datei bearbeiten</h3>' + field("fName", "Name", f.name) + colorPicker(f.color) +
      '<div class="field"><label for="fSec">Bereich</label><select id="fSec">' + state.sections.filter(function (s) { return s.type === "docs"; }).map(function (s) {
        return '<option value="' + s.id + '"' + (s.id === f.sec ? " selected" : "") + ">" + esc(s.name) + "</option>";
      }).join("") + "</select></div>" + actions(true) + "</form>",
      function (root) {
        wireForm(root, function () {
          var n = req("fName"); if (!n) return false;
          f.name = n; f.color = $("fColor").dataset.v; f.sec = $("fSec").value;
          filePut(f).then(function () { render(); toast("Gespeichert"); });
        }, function () {
          Promise.all([fileDel(f.id), blobDel(f.id)]).then(function () {
            files = files.filter(function (x) { return x !== f; }); render(); toast("Gelöscht");
          });
        });
      });
  }

  /* ---------- Dateien ---------- */
  var pdfReady = function () {
    if (window.pdfjsLib) { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js"; return true; }
    return false;
  };
  function pickFiles(s) {
    var inp = document.createElement("input");
    inp.type = "file"; inp.accept = "application/pdf,image/*"; inp.multiple = true;
    inp.onchange = function () {
      var list = Array.prototype.slice.call(inp.files || []);
      if (!list.length) return;
      toast(list.length === 1 ? "Wird hinzugefügt …" : list.length + " Dateien werden hinzugefügt …");
      list.reduce(function (p, file) { return p.then(function () { return addFile(s, file); }); }, Promise.resolve())
        .then(function () { render(); toast(list.length === 1 ? "Hinzugefügt" : list.length + " Dateien hinzugefügt"); })
        .catch(function (e) { render(); toast("Fehler beim Hinzufügen: " + (e && e.message || e)); });
    };
    inp.click();
  }
  function addFile(s, file) {
    return file.arrayBuffer().then(function (buf) {
      var isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
      var meta = { id: uid(), sec: s.id, name: file.name.replace(/\.(pdf|jpe?g|png|heic|webp|gif)$/i, ""), mime: isPdf ? "application/pdf" : (file.type || "image/jpeg"), size: file.size, added: Date.now(), color: "", text: "", thumb: "" };
      var work = isPdf ? pdfInfo(buf.slice(0)).then(function (info) { meta.pages = info.pages; meta.text = info.text; meta.thumb = info.thumb; }, function () {})
        : imgThumb(new Blob([buf], { type: meta.mime })).then(function (t) { meta.thumb = t; }, function () {});
      return work.then(function () { return blobSet(meta.id, { buf: buf, mime: meta.mime }); })
        .then(function () { return filePut(meta); })
        .then(function () { files.push(meta); });
    });
  }
  function imgThumb(blob) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(blob), img = new Image();
      img.onload = function () {
        var w = 480, h = Math.round(img.height * (w / img.width));
        var cv = document.createElement("canvas"); cv.width = w; cv.height = Math.min(h, 640);
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url); res(cv.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("Bild nicht lesbar")); };
      img.src = url;
    });
  }
  function pdfInfo(buf) {
    if (!pdfReady()) return Promise.reject(new Error("PDF-Modul fehlt"));
    return window.pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise.then(function (doc) {
      var n = doc.numPages, text = [], thumb = "";
      var first = doc.getPage(1).then(function (p) {
        var vp = p.getViewport({ scale: 1 }), sc = 480 / vp.width, v2 = p.getViewport({ scale: sc });
        var cv = document.createElement("canvas"); cv.width = Math.round(v2.width); cv.height = Math.round(Math.min(v2.height, 640));
        var ctx = cv.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height);
        return p.render({ canvasContext: ctx, viewport: v2 }).promise.then(function () { thumb = cv.toDataURL("image/jpeg", 0.7); });
      });
      var chain = Promise.resolve();
      for (var i = 1; i <= Math.min(n, 60); i++) (function (i) {
        chain = chain.then(function () {
          return doc.getPage(i).then(function (p) { return p.getTextContent(); }).then(function (tc) {
            text.push(tc.items.map(function (it) { return it.str; }).join(" "));
          });
        });
      })(i);
      return Promise.all([first, chain]).then(function () {
        doc.destroy();
        return { pages: n, text: text.join("\n").replace(/\s+/g, " ").slice(0, 200000), thumb: thumb };
      });
    });
  }

  /* ---------- Anzeige von PDFs und Bildern ---------- */
  var viewerState = null;
  function openFile(id) {
    var f = files.find(function (x) { return x.id === id; }); if (!f) return;
    var vw = $("viewer");
    vw.innerHTML = '<div class="vbar"><button class="iconbtn" type="button" id="vClose" aria-label="Schließen">' + ic("back") + '</button><span class="t">' + esc(f.name) + '</span><span class="pg" id="vPg"></span>' +
      '<button class="iconbtn" type="button" id="vOut" aria-label="Verkleinern">' + ic("zout") + '</button><button class="iconbtn" type="button" id="vIn" aria-label="Vergrößern">' + ic("zin") + "</button></div>" +
      '<div class="vbody" id="vBody"><div class="vmsg">Wird geöffnet …</div></div>';
    vw.hidden = false;
    $("vClose").onclick = closeViewer;
    blobGet(id).then(function (rec) {
      if (!rec) { $("vBody").innerHTML = '<div class="vmsg">Datei nicht gefunden.</div>'; return; }
      if (f.mime === "application/pdf") return openPdf(rec.buf);
      var url = URL.createObjectURL(new Blob([rec.buf], { type: rec.mime }));
      viewerState = { url: url, zoom: 1, img: true };
      $("vBody").innerHTML = '<img class="full" id="vImg" src="' + url + '" alt="' + esc(f.name) + '">';
      var setZ = function () { var im = $("vImg"); im.style.maxWidth = viewerState.zoom === 1 ? "100%" : "none"; im.style.width = viewerState.zoom === 1 ? "" : (viewerState.zoom * 100) + "%"; };
      $("vIn").onclick = function () { viewerState.zoom = Math.min(4, viewerState.zoom + 0.5); setZ(); };
      $("vOut").onclick = function () { viewerState.zoom = Math.max(1, viewerState.zoom - 0.5); setZ(); };
    }).catch(function (e) { $("vBody").innerHTML = '<div class="vmsg">Konnte nicht geöffnet werden: ' + esc(e && e.message) + "</div>"; });
  }
  function openPdf(buf) {
    if (!pdfReady()) { $("vBody").innerHTML = '<div class="vmsg">PDF-Anzeige ist noch nicht geladen. Bitte einmal mit Internet öffnen.</div>'; return; }
    window.pdfjsLib.getDocument({ data: new Uint8Array(buf.slice(0)) }).promise.then(function (doc) {
      viewerState = { doc: doc, zoom: 1, rendered: {}, tasks: {} };
      return doc.getPage(1).then(function (p1) {
        viewerState.base = p1.getViewport({ scale: 1 });
        layoutPdf();
        $("vIn").onclick = function () { viewerState.zoom = Math.min(4, +(viewerState.zoom + 0.25).toFixed(2)); layoutPdf(); };
        $("vOut").onclick = function () { viewerState.zoom = Math.max(0.5, +(viewerState.zoom - 0.25).toFixed(2)); layoutPdf(); };
      });
    }).catch(function (e) { $("vBody").innerHTML = '<div class="vmsg">PDF konnte nicht geöffnet werden: ' + esc(e && e.message) + "</div>"; });
  }
  function layoutPdf() {
    var vs = viewerState, body = $("vBody"), n = vs.doc.numPages;
    var avail = Math.min(body.clientWidth - 32, 1400);
    var w = Math.round(avail * vs.zoom), ratio = vs.base.height / vs.base.width;
    var keep = body.scrollTop / Math.max(1, body.scrollHeight);
    var h = '<div class="vpages">';
    for (var i = 1; i <= n; i++) h += '<div class="vpage" data-p="' + i + '" style="width:' + w + "px;height:" + Math.round(w * ratio) + 'px"></div>';
    body.innerHTML = h + "</div>";
    body.scrollTop = keep * body.scrollHeight;
    vs.rendered = {}; vs.width = w;
    if (vs.io) vs.io.disconnect();
    vs.io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var p = +en.target.dataset.p;
        if (en.isIntersecting) { renderPage(p, en.target); $("vPg").textContent = p + " / " + n; }
      });
    }, { root: body, rootMargin: "600px 0px" });
    body.querySelectorAll(".vpage").forEach(function (el) { vs.io.observe(el); });
    $("vPg").textContent = "1 / " + n;
  }
  function renderPage(p, el) {
    var vs = viewerState; if (!vs || vs.rendered[p]) return;
    vs.rendered[p] = true;
    var w = vs.width;
    vs.doc.getPage(p).then(function (page) {
      if (viewerState !== vs || vs.width !== w) return;
      var vp1 = page.getViewport({ scale: 1 }), dpr = Math.min(window.devicePixelRatio || 1, 2);
      var scale = (w / vp1.width) * dpr;
      var maxPx = 4096; if (vp1.width * scale > maxPx) scale = maxPx / vp1.width;
      if (vp1.height * scale > maxPx) scale = Math.min(scale, maxPx / vp1.height);
      var vp = page.getViewport({ scale: scale });
      var cv = document.createElement("canvas"); cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
      el.style.height = Math.round(w * vp1.height / vp1.width) + "px";
      el.innerHTML = ""; el.appendChild(cv);
      return page.render({ canvasContext: cv.getContext("2d"), viewport: vp }).promise;
    }).catch(function () { vs.rendered[p] = false; });
  }
  function closeViewer() {
    var vs = viewerState;
    if (vs) { if (vs.io) vs.io.disconnect(); if (vs.doc) vs.doc.destroy(); if (vs.url) URL.revokeObjectURL(vs.url); }
    viewerState = null; $("viewer").hidden = true; $("viewer").innerHTML = "";
  }

  /* ---------- Suche ---------- */
  var qTokens = [];
  function hit(text) {
    var t = low(text), d = digits(text);
    return qTokens.every(function (q) { return t.indexOf(q) !== -1 || (/^\d{3,}$/.test(q) && d.indexOf(q) !== -1); });
  }
  function mk(text) {
    var s = esc(text);
    if (!query || !qTokens.length) return s;
    qTokens.forEach(function (q) {
      if (!q) return;
      var re = new RegExp("(" + esc(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      s = s.replace(re, "<mark>$1</mark>");
    });
    return s;
  }
  function snippet(text) {
    var t = String(text || ""), lt = low(t), pos = -1;
    qTokens.some(function (q) { pos = lt.indexOf(q); return pos !== -1; });
    if (pos === -1) return mk(t.slice(0, 160)) + (t.length > 160 ? " …" : "");
    var a = Math.max(0, pos - 60), b = Math.min(t.length, pos + 100);
    return (a ? "… " : "") + mk(t.slice(a, b)) + (b < t.length ? " …" : "");
  }
  function renderSearch(v) {
    var groups = [];
    state.sections.forEach(function (s) {
      var its = secItems(s.id).filter(function (x) {
        return hit([x.name, x.num, x.num2, x.note, x.title, x.text, colorName(x.color)].join(" "));
      }).sort(byName);
      var fl = secFiles(s.id).filter(function (f) { return hit(f.name + " " + (f.text || "") + " " + colorName(f.color)); });
      if (its.length || fl.length || hit(s.name)) groups.push({ s: s, its: its, fl: fl });
    });
    var total = groups.reduce(function (a, g) { return a + g.its.length + g.fl.length; }, 0);
    var h = '<div class="sechead"><span class="ti" style="background:var(--surface2)">' + ic("search") + "</span><h1>" + total + (total === 1 ? " Treffer" : " Treffer") + ' für „' + esc(query) + '“</h1></div>';
    if (!groups.length) h += '<div class="empty"><b>Nichts gefunden</b>Prüfe die Schreibweise oder suche nach einem Teil des Namens oder der Nummer.</div>';
    h += '<div class="results">';
    groups.forEach(function (g) {
      h += '<div class="rgroup"><h3>' + ic(g.s.icon) + '<button type="button" data-go="s-' + g.s.id + '" style="text-transform:inherit;letter-spacing:inherit;font:inherit">' + mk(g.s.name) + "</button></h3>";
      var phones = g.its.filter(function (x) { return g.s.type === "phone"; });
      var texts = g.its.filter(function (x) { return g.s.type !== "phone"; });
      if (phones.length) h += '<div class="list">' + phones.map(function (x) { return phoneRow(x, false, true); }).join("") + "</div>";
      if (g.fl.length) h += '<div class="files" style="margin-top:10px">' + g.fl.map(function (f) { return fileCard(f, false, true); }).join("") + "</div>";
      if (texts.length) h += '<div class="cards" style="margin-top:10px">' + texts.map(function (x) { return textCard(x, false, true); }).join("") + "</div>";
      if (!g.its.length && !g.fl.length) h += '<div class="snip">Bereich öffnen</div>';
      h += "</div>";
    });
    v.innerHTML = h + "</div>";
  }

  /* ---------- Einstellungen ---------- */
  function renderSettings(v) {
    var st = state.settings;
    var h = '<div class="sechead"><span class="ti" style="background:var(--surface2)">' + ic("gear") + "</span><h1>Einstellungen</h1></div><div class=\"set\">";

    h += '<div class="panel"><h2>Name und Startbild</h2>' + field("sTitle", "Titel", st.title) + field("sSub", "Untertitel", st.subtitle) +
      '<div class="btnrow"><button class="btn" type="button" id="sBg">' + ic("image") + (bgURL ? "Startbild ändern" : "Startbild wählen") + "</button>" +
      (bgURL ? '<button class="btn danger" type="button" id="sBgDel">Startbild entfernen</button>' : "") + "</div></div>";

    h += '<div class="panel"><h2>Bereiche</h2><p>Reihenfolge, Name, Symbol, Farbe und Kachelbild. Neue Bereiche kannst du jederzeit anlegen.</p><div>';
    state.sections.forEach(function (s, i) {
      var c = colorOf(s.color) || "#8d97a5";
      h += '<div class="secrow"><span class="mini" style="color:' + c + '">' + ic(s.icon) + '</span><span class="lbl">' + esc(s.name) + "<small>" + (s.type === "phone" ? "Telefonliste" : "Dokumente und Texte") + " · " + countLabel(s, secCount(s)) + "</small></span>" +
        '<button class="mini" type="button" data-mv="' + i + '" data-d="-1" aria-label="Nach oben"' + (i === 0 ? " disabled" : "") + ">" + ic("up") + "</button>" +
        '<button class="mini" type="button" data-mv="' + i + '" data-d="1" aria-label="Nach unten"' + (i === state.sections.length - 1 ? " disabled" : "") + ">" + ic("down") + "</button>" +
        '<button class="mini" type="button" data-sed="' + s.id + '" aria-label="Bearbeiten">' + ic("pencil") + "</button></div>";
    });
    h += '</div><div class="btnrow"><button class="btn" type="button" id="sAddSec">' + ic("plus") + "Neuer Bereich</button></div></div>";

    h += '<div class="panel"><h2>Bedeutung der Farben</h2><p>Gib jeder Farbe eine eigene Bedeutung, z. B. Rot = Sofort anrufen.</p>';
    COLORS.forEach(function (c) {
      h += '<div class="secrow"><span class="mini"><span style="width:20px;height:20px;border-radius:50%;background:' + c.c + '"></span></span><div class="field" style="flex:1"><input id="cn-' + c.k + '" data-cn="' + c.k + '" value="' + esc((st.colorNames || {})[c.k] || "") + '" placeholder="' + c.n + '" aria-label="Bedeutung ' + c.n + '"></div></div>';
    });
    h += "</div>";

    h += '<div class="panel"><h2>Sperre</h2><p>Die App fragt beim Öffnen nach deiner PIN.</p><div class="field"><label for="sLock">Automatisch sperren, wenn die App im Hintergrund war</label><select id="sLock">' +
      [[0, "Sofort"], [1, "Nach 1 Minute"], [5, "Nach 5 Minuten"], [15, "Nach 15 Minuten"], [60, "Nach 1 Stunde"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (+st.lockAfter === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
      }).join("") + '</select></div><div class="btnrow"><button class="btn" type="button" id="sPin">' + ic("key") + "PIN ändern</button></div></div>";

    h += '<div class="panel"><h2>Sicherung</h2><p>Deine Daten liegen nur auf diesem iPad. Speichere ab und zu eine Sicherung in der Dateien-App, z. B. vor einem iPad-Wechsel. Die Datei enthält alles inklusive PDFs und ist nicht verschlüsselt.</p>' +
      '<div class="btnrow"><button class="btn" type="button" id="sExp">Sicherung erstellen</button><button class="btn" type="button" id="sImp">Sicherung einspielen</button></div><p id="sLast">' + (st.lastBackup ? "Letzte Sicherung: " + fmtDate(st.lastBackup) : "Noch keine Sicherung erstellt.") + "</p></div>";

    h += '<div class="panel"><h2>Speicher</h2><p id="sStore">Wird berechnet …</p></div>';
    h += '<div class="panel"><h2>Alles zurücksetzen</h2><p>Löscht alle Nummern, Texte, Dateien und die PIN von diesem iPad.</p><div class="btnrow"><button class="btn danger" type="button" id="sWipe">Alles löschen</button></div></div>';
    h += '<p style="color:var(--muted);font-size:13px;margin:0">Version ' + VERSION + "</p></div>";
    v.innerHTML = h;

    $("sTitle").onchange = function () { st.title = this.value.trim() || "Wache"; save(); renderNav(); };
    $("sSub").onchange = function () { st.subtitle = this.value.trim(); save(); renderNav(); };
    $("sBg").onclick = function () { pickImage(function (buf, mime) { return blobSet("bg", { buf: buf, mime: mime }).then(loadImages).then(function () { render(); toast("Startbild gespeichert"); }); }); };
    var bd = $("sBgDel"); if (bd) bd.onclick = function () { blobDel("bg").then(loadImages).then(render); };
    v.querySelectorAll("[data-cn]").forEach(function (inp) {
      inp.onchange = function () { st.colorNames = st.colorNames || {}; st.colorNames[inp.dataset.cn] = inp.value.trim(); save(); };
    });
    $("sLock").onchange = function () { st.lockAfter = +this.value; save(); toast("Gespeichert"); };
    $("sPin").onclick = function () { showLock("change1"); };
    $("sAddSec").onclick = function () { editSection(); };
    $("sExp").onclick = exportBackup;
    $("sImp").onclick = importBackup;
    $("sWipe").onclick = wipeDialog;
    storageInfo();
  }
  function pickImage(cb) {
    var inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
    inp.onchange = function () {
      var f = inp.files && inp.files[0]; if (!f) return;
      shrinkImage(f, 1800).then(function (r) { return cb(r.buf, r.mime); }).catch(function () { toast("Bild konnte nicht gelesen werden"); });
    };
    inp.click();
  }
  function shrinkImage(file, max) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var sc = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement("canvas"); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
        cv.toBlob(function (b) { if (!b) return rej(); b.arrayBuffer().then(function (buf) { res({ buf: buf, mime: "image/jpeg" }); }); }, "image/jpeg", 0.82);
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(); };
      img.src = url;
    });
  }
  function storageInfo() {
    var el = $("sStore"); if (!el) return;
    var parts = [files.length + (files.length === 1 ? " Datei" : " Dateien") + ", " + state.items.filter(function (x) { return !x.ph; }).length + " Einträge."];
    var est = navigator.storage && navigator.storage.estimate ? navigator.storage.estimate() : Promise.resolve(null);
    var per = navigator.storage && navigator.storage.persisted ? navigator.storage.persisted() : Promise.resolve(null);
    Promise.all([est, per]).then(function (r) {
      if (r[0] && r[0].usage != null) parts.push("Belegt: " + fmtSize(r[0].usage) + (r[0].quota ? " von etwa " + fmtSize(r[0].quota) : "") + ".");
      if (r[1] === true) parts.push("Der Speicher ist als dauerhaft markiert.");
      if ($("sStore")) $("sStore").textContent = parts.join(" ");
    }).catch(function () { el.textContent = parts.join(" "); });
  }

  function editSection(s) {
    var v = s || { name: "", type: "phone", icon: "folder", color: "blue" };
    var iconsHtml = '<div class="field"><span class="flabel">Symbol</span><div class="icons" id="fIcons" data-v="' + v.icon + '">' + SECTION_ICONS.map(function (n) {
      return '<button type="button" data-ic="' + n + '"' + (n === v.icon ? ' class="on"' : "") + ' aria-label="' + n + '">' + ic(n) + "</button>";
    }).join("") + "</div></div>";
    var typeHtml = s ? "" : '<div class="field"><label for="fType">Art</label><select id="fType"><option value="phone">Telefonliste</option><option value="docs">Dokumente und Texte</option></select></div>';
    var hasImg = s && tileURLs[s.id];
    dialog('<form novalidate><h3>' + (s ? "Bereich bearbeiten" : "Neuer Bereich") + "</h3>" + field("fName", "Name", v.name) + typeHtml + iconsHtml + colorPicker(v.color) +
      (s ? '<div class="field"><span class="flabel">Kachelbild auf der Startseite</span><div class="btnrow"><button class="btn" type="button" id="fTile">' + ic("image") + (hasImg ? "Bild ändern" : "Bild wählen") + "</button>" + (hasImg ? '<button class="btn danger" type="button" id="fTileDel">Bild entfernen</button>' : "") + "</div></div>" : "") +
      actions(!!s) + "</form>",
      function (root) {
        root.querySelector("#fIcons").addEventListener("click", function (e) {
          var b = e.target.closest("[data-ic]"); if (!b) return;
          this.dataset.v = b.dataset.ic; this.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
        });
        var ft = $("fTile");
        if (ft) ft.onclick = function () { pickImage(function (buf, mime) { return blobSet("tile-" + s.id, { buf: buf, mime: mime }).then(loadImages).then(function () { closeSheet(); render(); toast("Kachelbild gespeichert"); }); }); };
        var ftd = $("fTileDel");
        if (ftd) ftd.onclick = function () { blobDel("tile-" + s.id).then(loadImages).then(function () { closeSheet(); render(); }); };
        wireForm(root, function () {
          var n = req("fName"); if (!n) { toast("Bitte einen Namen eintragen"); return false; }
          var o = s || { id: uid(), type: $("fType").value };
          o.name = n; o.icon = $("fIcons").dataset.v; o.color = $("fColor").dataset.v;
          if (!s) state.sections.push(o);
          save(); render(); toast("Gespeichert");
        }, function () {
          var cnt = secCount(s);
          if (cnt) {
            setTimeout(function () {
              confirmBox("Bereich löschen?", "„" + s.name + "“ enthält " + countLabel(s, cnt) + ". Alles darin wird gelöscht.", "Bereich löschen", true).then(function (ok) { if (ok) deleteSection(s); });
            }, 0);
          } else deleteSection(s);
        });
      });
  }
  function deleteSection(s) {
    var fl = secFiles(s.id);
    state.items = state.items.filter(function (x) { return x.sec !== s.id; });
    state.sections = state.sections.filter(function (x) { return x !== s; });
    Promise.all(fl.map(function (f) { return Promise.all([fileDel(f.id), blobDel(f.id)]); }).concat([blobDel("tile-" + s.id)])).then(function () {
      files = files.filter(function (f) { return f.sec !== s.id; });
      save(); loadImages().then(render); toast("Bereich gelöscht");
    });
  }

  /* ---------- Sicherung ---------- */
  function b64(buf) {
    var bytes = new Uint8Array(buf), s = "", chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    return btoa(s);
  }
  function unb64(str) {
    var bin = atob(str), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }
  function exportBackup() {
    toast("Sicherung wird erstellt …");
    var keys = files.map(function (f) { return f.id; }).concat(["bg"], state.sections.map(function (s) { return "tile-" + s.id; }));
    Promise.all(keys.map(function (k) { return blobGet(k).then(function (r) { return r ? { k: k, mime: r.mime, data: b64(r.buf) } : null; }); }))
      .then(function (blobs) {
        var out = { app: "wache", v: 1, created: new Date().toISOString(), state: state, files: files, blobs: blobs.filter(Boolean) };
        var name = "Wache-Sicherung-" + new Date().toISOString().slice(0, 10) + ".json";
        var file = new File([JSON.stringify(out)], name, { type: "application/json" });
        var done = function () { state.settings.lastBackup = Date.now(); save(); render(); };
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: name }).then(done, function (e) { if (e && e.name !== "AbortError") downloadFile(file, done); });
        } else downloadFile(file, done);
      }).catch(function () { toast("Sicherung fehlgeschlagen"); });
  }
  function downloadFile(file, done) {
    var a = document.createElement("a"); a.href = URL.createObjectURL(file); a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 30000);
    done();
  }
  function importBackup() {
    var inp = document.createElement("input"); inp.type = "file"; inp.accept = "application/json,.json";
    inp.onchange = function () {
      var f = inp.files && inp.files[0]; if (!f) return;
      f.text().then(function (t) {
        var d = JSON.parse(t);
        if (d.app !== "wache" || !d.state || !Array.isArray(d.state.sections)) throw new Error("bad");
        return confirmBox("Sicherung einspielen?", "Alle aktuellen Einträge und Dateien auf diesem iPad werden durch die Sicherung vom " + fmtDate(d.created) + " ersetzt. Deine PIN bleibt gleich.", "Ersetzen", true).then(function (ok) {
          if (!ok) return;
          var pin;
          return kvGet("pin").then(function (p) { pin = p; return clearAll(); })
            .then(function () { return kvSet("pin", pin); })
            .then(function () { state = d.state; return kvSet("state", state); })
            .then(function () { return Promise.all((d.files || []).map(filePut)); })
            .then(function () { return Promise.all((d.blobs || []).map(function (b) { return blobSet(b.k, { buf: unb64(b.data), mime: b.mime }); })); })
            .then(loadAll).then(function () { render(); toast("Sicherung eingespielt"); });
        });
      }).catch(function () { toast("Das ist keine gültige Wache-Sicherung"); });
    };
    inp.click();
  }
  function wipeDialog(fromLock) {
    var html = '<h3>Alles löschen?</h3><p style="margin:0;color:var(--muted)">Das löscht alle Nummern, Texte, Dateien und die PIN von diesem iPad. Das lässt sich nicht rückgängig machen. Schreib zur Bestätigung LÖSCHEN.</p>' +
      '<div class="field"><input id="wipeTxt" autocomplete="off" autocapitalize="characters" aria-label="Bestätigung"></div><div class="actions"><span class="sp"></span><button class="btn ghost" type="button" id="wNo">Abbrechen</button><button class="btn red" type="button" id="wOk">Alles löschen</button></div>';
    var mount = function () {
      $("wNo").onclick = fromLock === true ? function () { showLock("unlock"); } : closeSheet;
      $("wOk").onclick = function () {
        if ($("wipeTxt").value.trim().toUpperCase() !== "LÖSCHEN") { toast("Bitte LÖSCHEN eintippen"); return; }
        clearAll().then(function () { location.hash = ""; location.reload(); });
      };
    };
    if (fromLock === true) { $("lock").innerHTML = '<div class="dlg" style="width:min(460px,100%)">' + html + "</div>"; mount(); }
    else dialog(html, mount);
  }

  /* ---------- PIN-Sperre ---------- */
  var pinRec = null, pinBuf = "", pinFirst = "", lockMode = "", unlocked = false, hiddenAt = 0;
  function hashPin(pin, salt) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey("raw", enc.encode(pin), "PBKDF2", false, ["deriveBits"]).then(function (key) {
      return crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt, iterations: 150000, hash: "SHA-256" }, key, 256);
    }).then(function (bits) { return b64(bits); });
  }
  function showLock(mode) {
    lockMode = mode; pinBuf = "";
    var lk = $("lock");
    if (mode === "unlock") { unlocked = false; $("app").hidden = true; closeSheet(); closeViewer(); }
    var titles = {
      setup1: ["PIN festlegen", "Wähle eine PIN mit 4 bis 8 Ziffern. Sie schützt deine Übersicht beim Öffnen."],
      setup2: ["PIN wiederholen", "Gib die gleiche PIN noch einmal ein."],
      unlock: [state.settings.title || "Wache", "PIN eingeben"],
      change1: ["Aktuelle PIN", "Gib zuerst deine aktuelle PIN ein."],
      change2: ["Neue PIN", "Wähle eine neue PIN mit 4 bis 8 Ziffern."],
      change3: ["Neue PIN wiederholen", "Gib die neue PIN noch einmal ein."]
    };
    var t = titles[mode];
    var auto = mode === "unlock" || mode === "change1";
    lk.innerHTML = '<div class="lockbox"><img src="icons/icon-192.png" width="72" height="72" alt=""><div><h1>' + esc(t[0]) + "</h1><p>" + esc(t[1]) + '</p></div><div class="dots" id="dots"></div><div class="lockerr" id="lockErr"></div><div class="pad" id="pad">' +
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) { return '<button type="button" data-k="' + n + '">' + n + "</button>"; }).join("") +
      (mode.indexOf("change") === 0 ? '<button type="button" class="txt" data-k="cancel">Abbrechen</button>' : (auto ? '<span></span>' : '<span></span>')) +
      '<button type="button" data-k="0">0</button><button type="button" class="txt" data-k="del">Löschen</button></div>' +
      (auto ? "" : '<button class="btn red" type="button" id="pinOk" style="min-width:200px">Weiter</button>') +
      (mode === "unlock" ? '<button class="linkbtn" type="button" id="forgot">PIN vergessen?</button>' : "") + "</div>";
    lk.hidden = false;
    drawDots();
    $("pad").onclick = function (e) { var b = e.target.closest("[data-k]"); if (b) pinKey(b.dataset.k); };
    var ok = $("pinOk"); if (ok) ok.onclick = function () { pinSubmit(); };
    var fg = $("forgot"); if (fg) fg.onclick = function () { wipeDialog(true); };
    checkLockout();
  }
  function drawDots() {
    var d = $("dots"); if (!d) return;
    var auto = lockMode === "unlock" || lockMode === "change1";
    var n = auto && pinRec ? pinRec.len : Math.max(4, pinBuf.length);
    var h = ""; for (var i = 0; i < n; i++) h += '<i class="' + (i < pinBuf.length ? "f" : "") + '"></i>';
    d.innerHTML = h;
  }
  function pinKey(k) {
    if (k === "cancel") { hideLock(); return; }
    if (k === "del") { pinBuf = pinBuf.slice(0, -1); drawDots(); return; }
    if (lockedOutUntil > Date.now()) return;
    if (pinBuf.length >= 8) return;
    pinBuf += k; drawDots(); $("lockErr").textContent = "";
    var auto = lockMode === "unlock" || lockMode === "change1";
    if (auto && pinRec && pinBuf.length === pinRec.len) setTimeout(pinSubmit, 80);
  }
  function lockErr(msg) {
    $("lockErr").textContent = msg; pinBuf = ""; drawDots();
    var d = $("dots"); d.classList.remove("shake"); void d.offsetWidth; d.classList.add("shake");
  }
  var lockedOutUntil = 0, lockoutTimer;
  function checkLockout() {
    clearInterval(lockoutTimer);
    var tick = function () {
      var s = Math.ceil((lockedOutUntil - Date.now()) / 1000);
      if (s > 0 && $("lockErr")) $("lockErr").textContent = "Zu viele Fehlversuche. Bitte " + s + " Sekunden warten.";
      else { clearInterval(lockoutTimer); if ($("lockErr") && lockedOutUntil) $("lockErr").textContent = ""; }
    };
    if (lockedOutUntil > Date.now()) { tick(); lockoutTimer = setInterval(tick, 1000); }
  }
  function pinSubmit() {
    var p = pinBuf;
    if (lockMode === "setup1" || lockMode === "change2") {
      if (p.length < 4) return lockErr("Mindestens 4 Ziffern");
      pinFirst = p; return showLock(lockMode === "setup1" ? "setup2" : "change3");
    }
    if (lockMode === "setup2" || lockMode === "change3") {
      if (p !== pinFirst) { var back = lockMode === "setup2" ? "setup1" : "change2"; showLock(back); return lockErr("Die PINs stimmen nicht überein. Bitte neu festlegen."); }
      var salt = crypto.getRandomValues(new Uint8Array(16));
      var wasChange = lockMode === "change3";
      return hashPin(p, salt).then(function (h) {
        pinRec = { salt: b64(salt), hash: h, len: p.length, fails: 0, until: 0 };
        return kvSet("pin", pinRec);
      }).then(function () { hideLock(); toast(wasChange ? "PIN geändert" : "PIN gespeichert"); });
    }
    if (lockMode === "unlock" || lockMode === "change1") {
      return hashPin(p, new Uint8Array(unb64(pinRec.salt))).then(function (h) {
        if (h === pinRec.hash) {
          pinRec.fails = 0; pinRec.until = 0; lockedOutUntil = 0; kvSet("pin", pinRec);
          if (lockMode === "change1") showLock("change2"); else hideLock();
        } else {
          pinRec.fails = (pinRec.fails || 0) + 1;
          if (pinRec.fails >= 5) { pinRec.until = Date.now() + Math.min(300, 30 * Math.pow(2, pinRec.fails - 5)) * 1000; lockedOutUntil = pinRec.until; }
          kvSet("pin", pinRec);
          lockErr("Falsche PIN"); checkLockout();
        }
      });
    }
  }
  function hideLock() {
    $("lock").hidden = true; $("lock").innerHTML = ""; unlocked = true; $("app").hidden = false; render();
  }
  document.addEventListener("visibilitychange", function () {
    if (!pinRec) return;
    if (document.hidden) {
      hiddenAt = Date.now();
      if (unlocked && +state.settings.lockAfter === 0) showLock("unlock");
    } else if (unlocked && hiddenAt && Date.now() - hiddenAt >= (+state.settings.lockAfter || 0) * 60000) {
      showLock("unlock");
    } else if (unlocked) { tickClock(); render(); }
  });

  /* ---------- Bilder laden ---------- */
  function urlFrom(rec) { return rec ? URL.createObjectURL(new Blob([rec.buf], { type: rec.mime })) : ""; }
  function loadImages() {
    if (bgURL) URL.revokeObjectURL(bgURL);
    Object.keys(tileURLs).forEach(function (k) { URL.revokeObjectURL(tileURLs[k]); });
    tileURLs = {};
    return Promise.all([blobGet("bg")].concat(state.sections.map(function (s) { return blobGet("tile-" + s.id); }))).then(function (r) {
      bgURL = urlFrom(r[0]);
      state.sections.forEach(function (s, i) { if (r[i + 1]) tileURLs[s.id] = urlFrom(r[i + 1]); });
    });
  }
  function loadAll() {
    return kvGet("state").then(function (s) {
      state = s || defaults();
      state.settings = state.settings || {};
      if (!s) return save();
    }).then(fileAll).then(function (f) { files = f || []; }).then(loadImages);
  }

  /* ---------- Uhr ---------- */
  function tickClock() {
    var d = new Date();
    $("clock").textContent = d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    $("date").textContent = d.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
  }

  /* ---------- Ereignisse ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-copy],[data-go],[data-edit],[data-open],[data-fedit],[data-fc],[data-mv],[data-sed],[data-jump]");
    if (!t) return;
    if (t.closest("a") && !t.dataset.copy) return;
    if (t.dataset.copy != null) { e.stopPropagation(); copyText(t.dataset.copy, t.classList.contains("copy") ? t : null); return; }
    if (t.dataset.go) { go(t.dataset.go); return; }
    if (t.dataset.open) { openFile(t.dataset.open); return; }
    if (t.dataset.fedit) { var f = files.find(function (x) { return x.id === t.dataset.fedit; }); if (f) editFile(f); return; }
    if (t.dataset.fc != null) { filterColor[route.slice(2)] = t.dataset.fc; render(); return; }
    if (t.dataset.mv) {
      var i = +t.dataset.mv, j = i + +t.dataset.d, a = state.sections;
      if (j < 0 || j >= a.length) return;
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp; save(); render(); return;
    }
    if (t.dataset.sed) { editSection(sec(t.dataset.sed)); return; }
    if (t.dataset.edit) {
      var x = state.items.find(function (i) { return i.id === t.dataset.edit; }); if (!x) return;
      var s = sec(x.sec); if (s.type === "phone") editPhone(s, x); else editText(s, x);
      return;
    }
    if (t.dataset.jump && !e.target.closest("a")) {
      var it = state.items.find(function (i) { return i.id === t.dataset.jump; });
      if (it) { flashId = it.id; query = ""; $("search").value = ""; route = "s-" + it.sec; if (location.hash !== "#" + route) location.hash = route; else render(); }
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (!$("viewer").hidden) closeViewer(); else closeSheet(); }
    if (!$("lock").hidden && /^[0-9]$/.test(e.key)) pinKey(e.key);
    if (!$("lock").hidden && e.key === "Backspace") pinKey("del");
    if (!$("lock").hidden && e.key === "Enter" && $("pinOk")) pinSubmit();
  });
  var searchT;
  $("search").addEventListener("input", function () {
    var v = this.value;
    clearTimeout(searchT);
    searchT = setTimeout(function () {
      query = v.trim(); qTokens = low(query).split(/\s+/).filter(Boolean);
      render(); $("view").scrollTop = 0;
    }, 90);
  });
  $("menuBtn").innerHTML = ic("menu");
  $("menuBtn").onclick = function () { $("side").classList.toggle("open"); };
  document.querySelector(".sicon").innerHTML = ic("search");
  $("lockNow").onclick = function () { showLock("unlock"); };
  $("view").addEventListener("click", function () { $("side").classList.remove("open"); });

  /* ---------- Start ---------- */
  route = (location.hash || "#start").slice(1) || "start";
  openDB().then(loadAll).then(function () { return kvGet("pin"); }).then(function (p) {
    pinRec = p || null;
    tickClock(); setInterval(tickClock, 10000);
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
    if (!pinRec) showLock("setup1");
    else { lockedOutUntil = pinRec.until || 0; showLock("unlock"); }
  }).catch(function (e) {
    document.body.innerHTML = '<div style="padding:40px;font:16px system-ui;color:#eee">Die Übersicht konnte nicht starten. Der Speicher ist nicht verfügbar (privates Surfen?).<br><br>' + esc(e && e.message) + "</div>";
  });

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
