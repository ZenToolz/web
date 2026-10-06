// ---- Config ----
// Each folder page sets these before loading folder.js:
//   window.FOLDER = "ST-FN";
//   window.FOLDER_LABEL = "ST/FN";
const VIDEO_BASE = "videos";

function makeVideo(src, withControls) {
  const v = document.createElement("video");
  v.src = src;
  v.muted = true;
  v.loop = true;
  v.autoplay = !withControls;
  v.playsInline = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  if (!withControls) v.preload = "none";
  return v;
}

// filename -> caption: strip extension + "P# - " prefix
function displayName(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/^P\d+\s*-\s*/i, "");
}

// extract P# from filename, or 0
function pageNumber(name) {
  const m = name.match(/^P(\d+)\s*-/i);
  return m ? parseInt(m[1], 10) : 0;
}

async function buildFolder() {
  const folder = window.FOLDER;
  const label = window.FOLDER_LABEL || folder;
  const encoded = encodeURIComponent(folder);

  document.getElementById("folder-title").textContent = label;

  let files = [];
  const res = await fetch(`${VIDEO_BASE}/${encoded}/list.json`);
  if (res.ok) files = await res.json();

  // group files by P# (preserve order of appearance within each group)
  const groups = new Map();
  for (const f of files) {
    const p = pageNumber(f);
    if (!groups.has(p)) groups.set(p, []);
    groups.get(p).push(f);
  }

  // sorted page numbers, only positive ones count as real "pages"
  const sortedPages = [...groups.keys()].sort((a, b) => a - b);
  const realPages = sortedPages.filter(p => p > 0);
  const totalPages = realPages.length;

  document.getElementById("folder-sub").textContent =
    totalPages ? `${totalPages} menu page${totalPages === 1 ? "" : "s"}` : "";

  const gridHost = document.getElementById("grid");
  gridHost.innerHTML = "";

  // flat list for lightbox order
  const flat = [];

  sortedPages.forEach(p => {
    const groupFiles = groups.get(p);

    // ---- heading ----
    const heading = document.createElement("h2");
    heading.className = "page-heading";

    if (p > 0) {
      const pageIdx = realPages.indexOf(p) + 1; // 1-based
      heading.textContent = `──── Page ${pageIdx} / ${totalPages} ────`;
    } else {
      heading.textContent = `──── Other ────`;
    }
    gridHost.appendChild(heading);

    // ---- 3-per-row grid for this group ----
    const grid = document.createElement("div");
    grid.className = "tile-grid";

    groupFiles.forEach(file => {
      const idx = flat.length;
      flat.push(file);

      const src = `${VIDEO_BASE}/${encoded}/${encodeURIComponent(file)}`;
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.appendChild(makeVideo(src));

      const cap = document.createElement("div");
      cap.className = "caption";
      cap.textContent = displayName(file);
      tile.appendChild(cap);

      tile.addEventListener("click", () => openLightbox(flat, idx));
      grid.appendChild(tile);
    });

    gridHost.appendChild(grid);
  });

  setupLightbox(flat, encoded);
}

// ---------- Lightbox ----------
let lbFiles = [], lbIndex = 0, lbEncoded = "";
let lbEl, lbVideo, lbCaption, lbPlayBtn;

function setupLightbox(files, encoded) {
  lbFiles = files;
  lbEncoded = encoded;

  lbEl = document.getElementById("lightbox");
  lbVideo = document.getElementById("lb-video");
  lbCaption = document.getElementById("lb-caption");
  lbPlayBtn = document.getElementById("lb-play");

  document.getElementById("lb-close").addEventListener("click", closeLightbox);
  document.getElementById("lb-prev").addEventListener("click", () => step(-1));
  document.getElementById("lb-next").addEventListener("click", () => step(1));

  lbEl.addEventListener("click", e => {
    if (e.target === lbEl) closeLightbox();
  });

  lbPlayBtn.addEventListener("click", () => {
    if (lbVideo.paused) { lbVideo.play(); lbPlayBtn.textContent = "❚❚"; }
    else { lbVideo.pause(); lbPlayBtn.textContent = "▶"; }
  });

  document.addEventListener("keydown", e => {
    if (!lbEl.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
}

function openLightbox(files, idx) {
  lbFiles = files;
  lbIndex = idx;
  loadCurrent();
  lbEl.classList.add("open");
}

function closeLightbox() {
  lbEl.classList.remove("open");
  lbVideo.pause();
  lbVideo.removeAttribute("src");
  lbVideo.load();
}

function step(dir) {
  lbIndex = (lbIndex + dir + lbFiles.length) % lbFiles.length;
  loadCurrent();
}

function loadCurrent() {
  const file = lbFiles[lbIndex];
  const src = `${VIDEO_BASE}/${lbEncoded}/${encodeURIComponent(file)}`;
  lbVideo.src = src;
  lbVideo.muted = true;
  lbVideo.loop = true;
  lbVideo.play().catch(() => {});
  lbPlayBtn.textContent = "❚❚";
  lbCaption.textContent = displayName(file);
}

buildFolder();