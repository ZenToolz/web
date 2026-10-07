// ---- Folder list ----
// folder = folder name on disk (inside /videos/)
// label  = display name shown on the cover
// page   = html file to link to
// Menu order, top-left to bottom-right.
// Rearrange these lines to reorder the buttons on the index page.
const MENU_IMAGE_BASE = "images/menu";

// Rows of the menu — each inner array is one visual row.
// Reorder items or move them between rows freely.
const MENU_ROWS = [
  // Row 1
  ["ST-FN", "ARMS", "LEGS"],
  // Row 2
  ["HEAD", "POWER", "ROPE-POST"],
  // Row 3
  ["BODY", "SUB", "FT-TL"],
  // Row 4 (only 2)
  ["PIN", "BOS-CAM"],
  // Row 5
  ["COUPLE", "F-F", "M-F"]
];

// Lookup table for label, page, image
const FOLDER_INFO = {
  "ST-FN":     { label: "ST/FN",     page: "st-fn.html",     img: "ST-FN.png" },
  "ARMS":      { label: "ARMS",      page: "arms.html",      img: "ARMS.png" },
  "LEGS":      { label: "LEGS",      page: "legs.html",      img: "LEGS.png" },
  "HEAD":      { label: "HEAD",      page: "head.html",      img: "HEAD.png" },
  "POWER":     { label: "POWER",     page: "power.html",     img: "POWER.png" },
  "ROPE-POST": { label: "ROPE/POST", page: "rope-post.html", img: "ROPE-POST.png" },
  "BODY":      { label: "BODY",      page: "body.html",      img: "BODY.png" },
  "SUB":       { label: "SUB",       page: "sub.html",       img: "SUB.png" },
  "FT-TL":     { label: "FT-TL",     page: "ft-tl.html",     img: "FT-TL.png" },
  "COUPLE":    { label: "COUPLE",    page: "couple.html",    img: "COUPLE.png" },
  "F-F":       { label: "F + F",     page: "f-f.html",       img: "F-F.png" },
  "PIN":       { label: "PIN",       page: "pin.html",       img: "PIN.png" },
  "BOS-CAM":   { label: "BOS/CAM",   page: "bos-cam.html",   img: "BOS-CAM.png" },
  "M-F":       { label: "M + F",     page: "m-f.html",       img: "M-F.png" }
};

function buildMenu() {
  const menuEl = document.getElementById("menu");

  for (const row of MENU_ROWS) {
    const rowEl = document.createElement("div");
    rowEl.className = "menu-row";

    for (const key of row) {
      const info = FOLDER_INFO[key];
      if (!info) continue;

      const cover = document.createElement("a");
      cover.className = "menu-cover";
      cover.href = info.page;

      const image = document.createElement("img");
      image.src = `${MENU_IMAGE_BASE}/${encodeURIComponent(info.img)}`;
      image.alt = info.label;
      cover.appendChild(image);

      rowEl.appendChild(cover);
    }

    menuEl.appendChild(rowEl);
  }
}

buildMenu();