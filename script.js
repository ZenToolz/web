// ---- Your folders, in display order ----
// HUDTextures excluded. Display label can differ from folder name.
const FOLDERS = [
  { folder: "ARMS",         label: "ARMS" },
  { folder: "BODY",         label: "BODY" },
  { folder: "BOS-CAM",      label: "BOS-CAM" },
  { folder: "COUPLE",       label: "COUPLE" },
  { folder: "F + F",        label: "F + F" },
  { folder: "FT-TL",        label: "FT-TL" },
  { folder: "HEAD",         label: "HEAD" },
  { folder: "LEGS",         label: "LEGS" },
  { folder: "M + F",        label: "M + F" },
  { folder: "PIN",          label: "PIN" },
  { folder: "POWER",        label: "POWER" },
  { folder: "ROPE-POST",    label: "ROPE-POST" },
  { folder: "ST-FN",        label: "ST-FN" },
  { folder: "SUB",          label: "SUB" }
];

const VIDEO_BASE = "videos";

// ---- Build a video element (Gyazo style) ----
function makeVideo(src) {
  const v = document.createElement("video");
  v.src = src;
  v.muted = true;
  v.loop = true;
  v.autoplay = true;
  v.playsInline = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.preload = "none";
  v.loading = "lazy";
  return v;
}

// ---- Load each folder's list.json, build menu + sections ----
async function build() {
  const menuEl = document.getElementById("menu");
  const sectionsEl = document.getElementById("sections");

  for (const { folder, label } of FOLDERS) {
    const encoded = encodeURIComponent(folder);
    let files = [];

    try {
      const res = await fetch(`${VIDEO_BASE}/${encoded}/list.json`);
      if (res.ok) files = await res.json();
    } catch (e) {
      console.warn("Missing list.json for", folder);
      continue;
    }

    if (!files.length) continue;

    const firstSrc = `${VIDEO_BASE}/${encoded}/${encodeURIComponent(files[0])}`;

    // ----- Menu cover -----
    const cover = document.createElement("div");
    cover.className = "menu-cover";
    cover.dataset.target = "sec-" + encoded;
    cover.appendChild(makeVideo(firstSrc));

    const lbl = document.createElement("div");
    lbl.className = "label";
    lbl.textContent = label;
    cover.appendChild(lbl);

    cover.addEventListener("click", () => {
      const target = document.getElementById("sec-" + encoded);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    menuEl.appendChild(cover);

    // ----- Section -----
    const section = document.createElement("section");
    section.className = "section";
    section.id = "sec-" + encoded;

    const h2 = document.createElement("h2");
    h2.className = "section-title";
    h2.textContent = label;
    section.appendChild(h2);

    const grid = document.createElement("div");
    grid.className = "tile-grid";

    for (const file of files) {
      const src = `${VIDEO_BASE}/${encoded}/${encodeURIComponent(file)}`;

      const tile = document.createElement("div");
      tile.className = "tile";
      tile.appendChild(makeVideo(src));

      const cap = document.createElement("div");
      cap.className = "caption";
      cap.textContent = file.replace(/\.[^.]+$/, ""); // filename without extension
      tile.appendChild(cap);

      grid.appendChild(tile);
    }

    section.appendChild(grid);
    sectionsEl.appendChild(section);
  }
}

build();