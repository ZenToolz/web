// ---- Folder list ----
// folder = folder name on disk (inside /videos/)
// label  = display name shown on the cover
// page   = html file to link to
const FOLDERS = [
  { folder: "ARMS",      label: "ARMS",      page: "arms.html" },
  { folder: "BODY",      label: "BODY",      page: "body.html" },
  { folder: "BOS-CAM",   label: "BOS-CAM",   page: "bos-cam.html" },
  { folder: "COUPLE",    label: "COUPLE",    page: "couple.html" },
  { folder: "F-F",       label: "F-F",       page: "f-f.html" },
  { folder: "FT-TL",     label: "FT-TL",     page: "ft-tl.html" },
  { folder: "HEAD",      label: "HEAD",      page: "head.html" },
  { folder: "LEGS",      label: "LEGS",      page: "legs.html" },
  { folder: "M-F",       label: "M-F",       page: "m-f.html" },
  { folder: "PIN",       label: "PIN",       page: "pin.html" },
  { folder: "POWER",     label: "POWER",     page: "power.html" },
  { folder: "ROPE-POST", label: "ROPE-POST", page: "rope-post.html" },
  { folder: "ST-FN",     label: "ST/FN",     page: "st-fn.html" },
  { folder: "SUB",       label: "SUB",       page: "sub.html" }
];

/*const VIDEO_BASE = "videos";

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
  return v;
}*/

const MENU_IMAGE_BASE = "images/menu";

async function buildMenu() {
  const menuEl = document.getElementById("menu");

  for (const { folder, label, page } of FOLDERS) {
    const encoded = encodeURIComponent(folder);
    const imgSrc = `${MENU_IMAGE_BASE}/${encoded}.png`;

    const cover = document.createElement("a");
    cover.className = "menu-cover";
    cover.href = page;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = label;
    cover.appendChild(img);

    menuEl.appendChild(cover);
  }
}

buildMenu();