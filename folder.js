// ---- Config ----
// Each folder page sets these two before loading folder.js:
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
  if (withControls) v.controls = false; // we use custom button
  else v.preload = "none";
  return v;
}

function stripExt(name) {
  return name.replace(/\.[^.]+$/, "");
}

// Compute "N menu pages" from filenames like "P1 - ...", "P2 - ..."
function countMenuPages(files) {
  let max = 0;
  for (const f of files) {
    const m = f.match(/^P(\d+)\s*-/i);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max;
}

async function buildFolder() {
  const folder = window.FOLDER;
  const label = window.FOLDER_LABEL || folder;
  const encoded = encodeURIComponent(folder);

  const titleEl = document.getElementById("folder-title");
  const subEl = document.getElementById("folder-sub");
  const gridEl = document.getElementById("grid");

  titleEl.textContent = label;

  let files = [];
  const res = await fetch(`${VIDEO_BASE}/${encoded}/list.json`);
  if (res.ok) files = await res.json();

  const pages = countMenuPages(files);
  subEl.textContent = pages
    ? `${pages} menu page${pages === 1 ? "" : "s"}`
    : `${files.length} clips`;

  // Build tiles
  files.forEach((file, idx) => {
    const src = `${VIDEO_BASE}/${encoded}/${encodeURIComponent(file)}`;

    const tile = document.createElement("div");
    tile.className = "tile";

    const v = makeVideo(src);
    tile.appendChild(v);

    const cap = document.createElement("div");
    cap.className = "caption";
    cap.textContent = stripExt(file);
    tile.appendChild(cap);

    tile.addEventListener("click", () => openLightbox(files, idx));
    gridEl.appendChild(tile);
  });

  setupLightbox(files, encoded, label);
}

// ---------- Lightbox ----------
let lbFiles = [], lbIndex = 0, lbEncoded = "", lbLabel = "";
let lbEl, lbVideo, lbCaption, lbPlayBtn;

function setupLightbox(files, encoded, label) {
  lbFiles = files; lbEncoded = encoded; lbLabel = label;

  lbEl = document.getElementById("lightbox");
  lbVideo = document.getElementById("lb-video");
  lbCaption = document.getElementById("lb-caption");
  lbPlayBtn = document.getElementById("lb-play");

  document.getElementById("lb-close").addEventListener("click", closeLightbox);
  document.getElementById("lb-prev").addEventListener("click", () => step(-1));
  document.getElementById("lb-next").addEventListener("click", () => step(1));

  // click outside video closes
  lbEl.addEventListener("click", (e) => {
    if (e.target === lbEl) closeLightbox();
  });

  // play/pause button
  lbPlayBtn.addEventListener("click", () => {
    if (lbVideo.paused) { lbVideo.play(); lbPlayBtn.textContent = "❚❚"; }
    else { lbVideo.pause(); lbPlayBtn.textContent = "▶"; }
  });

  document.addEventListener("keydown", (e) => {
    if (!lbEl.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
}

function openLightbox(files, idx) {
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
  lbCaption.textContent = stripExt(file);
}

buildFolder();