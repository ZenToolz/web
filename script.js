// ---- Folder list ----
// folder = folder name on disk (inside /videos/)
// label  = display name shown on the cover
// page   = html file to link to
// Menu order, top-left to bottom-right.
// Rearrange these lines to reorder the buttons on the index page.
const FOLDERS = [
  // Row 1
  { folder: "ST-FN",     label: "ST/FN",     page: "st-fn.html",     img: "ST-FN.png" },
  { folder: "ARMS",      label: "ARMS",      page: "arms.html",      img: "ARMS.png" },
  { folder: "LEGS",      label: "LEGS",      page: "legs.html",      img: "LEGS.png" },

  // Row 2
  { folder: "HEAD",      label: "HEAD",      page: "head.html",      img: "HEAD.png" },
  { folder: "POWER",     label: "POWER",     page: "power.html",     img: "POWER.png" },
  { folder: "ROPE-POST", label: "ROPE/POST", page: "rope-post.html", img: "ROPE-POST.png" },

  // Row 3
  { folder: "BODY",      label: "BODY",      page: "body.html",      img: "BODY.png" },
  { folder: "SUB",       label: "SUB",       page: "sub.html",       img: "SUB.png" },
  { folder: "FT-TL",     label: "FT-TL",     page: "ft-tl.html",     img: "FT-TL.png" },

  // Row 4 (2 items)
  { folder: "COUPLE",    label: "COUPLE",    page: "couple.html",    img: "COUPLE.png" },
  { folder: "F-F",       label: "F + F",     page: "f-f.html",       img: "F-F.png" },

  // Row 5
  { folder: "PIN",       label: "PIN",       page: "pin.html",       img: "PIN.png" },
  { folder: "BOS-CAM",   label: "BOS/CAM",   page: "bos-cam.html",   img: "BOS-CAM.png" },
  { folder: "M-F",       label: "M + F",     page: "m-f.html",       img: "M-F.png" }
];

const MENU_IMAGE_BASE = "images/menu";

function buildMenu() {
  const menuEl = document.getElementById("menu");

  for (const { label, page, img } of FOLDERS) {
    const cover = document.createElement("a");
    cover.className = "menu-cover";
    cover.href = page;

    const image = document.createElement("img");
    image.src = `${MENU_IMAGE_BASE}/${encodeURIComponent(img)}`;
    image.alt = label;
    cover.appendChild(image);

    menuEl.appendChild(cover);
  }
}

buildMenu();