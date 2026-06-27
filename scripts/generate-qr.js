// Run: node scripts/generate-qr.js
// Output: public/qr-menu.svg
const QRCode = require("qrcode");
const fs    = require("fs");
const path  = require("path");

const URL = "https://www.tastybites.au/menu";

// ── Colors ───────────────────────────────────────────────────────────────────
const GOLD        = "#c9943a";
const GOLD_LIGHT  = "#e8c060";
const RED_FINDER  = "#cc2200";   // top-left finder
const GRN_FINDER  = "#1a6e30";   // top-right + bottom-left finders
const GOLD_MODULE = "#c9943a";   // all other dark modules
const WHITE       = "#ffffff";
const DARK_BG     = "#0b1410";
const DARK_GREEN  = "#162b1e";

// ── Layout ───────────────────────────────────────────────────────────────────
const CARD = 900;

// White QR panel
const PX = 65, PY = 65, PW = 770, PH = 614, PRX = 22;

// QR display area centred within panel
const QR_SIZE = 558;
const QR_X    = PX + Math.round((PW - QR_SIZE) / 2);  // 171
const QR_Y    = PY + Math.round((PH - QR_SIZE) / 2);  // 93

const MARGIN  = 4;   // QR spec quiet zone (4 modules)
const BRAND_Y = PY + PH;          // 679
const MX      = CARD / 2;         // 450

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const qr = QRCode.create(URL, { errorCorrectionLevel: "H" });
  const { modules } = qr;
  const N     = modules.size;          // 33 modules for our URL at EC-H
  const VB    = N + 2 * MARGIN;        // coordinate-space size (41)
  const scale = QR_SIZE / VB;          // px per module-unit

  // ── Classify each dark module into a color bucket ─────────────────────────
  function moduleColor(r, c) {
    if (!modules.get(r, c)) return null;          // light module — skip
    if (r <= 6 && c <= 6)      return "red";      // top-left finder
    if (r <= 6 && c >= N - 7)  return "green";    // top-right finder
    if (r >= N - 7 && c <= 6)  return "green";    // bottom-left finder
    return "gold";
  }

  // ── Build horizontal-run stroke paths per color ───────────────────────────
  // Uses the same format as the qrcode library's own SVG renderer:
  // each row = one horizontal stroke per contiguous dark run, centered
  // at y = row + 0.5 with stroke-width = 1 in module units. After
  // scale(), adjacent rows share exact pixel boundaries → no gaps.
  const dPath = { red: "", green: "", gold: "" };
  for (let r = 0; r < N; r++) {
    let runStart = -1, runColor = null;
    for (let c = 0; c <= N; c++) {
      const col = c < N ? moduleColor(r, c) : null;
      if (col !== runColor) {
        if (runStart >= 0 && runColor) {
          dPath[runColor] += `M${runStart + MARGIN} ${r + MARGIN + 0.5}h${c - runStart}`;
        }
        runStart = col ? c : -1;
        runColor = col;
      }
    }
  }

  // ── Logo ──────────────────────────────────────────────────────────────────
  const LOGO = Math.floor(QR_SIZE * 0.21);
  const LR   = LOGO / 2;
  const LCX  = QR_X + QR_SIZE / 2;
  const LCY  = QR_Y + QR_SIZE / 2;
  const logo64 = fs
    .readFileSync(path.join(process.cwd(), "public", "tasty-bites-logo.png"))
    .toString("base64");

  // ── Decorative side S-curves ──────────────────────────────────────────────
  const MY   = PY + PH / 2;          // panel vertical mid = 372
  const CY1  = PY  + 110;            // curve upper anchor on panel edge
  const CY2  = PY  + PH - 110;       // curve lower anchor on panel edge
  const TIP  = 28;                   // x-tip for left ornament
  const TIPR = CARD - 28;            // x-tip for right ornament

  const leftCurve = [
    `M${PX} ${CY1}`,
    `C${PX - 52} ${CY1} ${TIP} ${MY - 85} ${TIP} ${MY}`,
    `C${TIP} ${MY + 85} ${PX - 52} ${CY2} ${PX} ${CY2}`,
  ].join(" ");
  const rightCurve = [
    `M${PX + PW} ${CY1}`,
    `C${PX + PW + 52} ${CY1} ${TIPR} ${MY - 85} ${TIPR} ${MY}`,
    `C${TIPR} ${MY + 85} ${PX + PW + 52} ${CY2} ${PX + PW} ${CY2}`,
  ].join(" ");

  const qrTransform = `translate(${QR_X},${QR_Y}) scale(${scale.toFixed(8)})`;
  const pct = (Math.PI * (LR + 13) ** 2 / QR_SIZE ** 2 * 100).toFixed(1);

  // ── SVG ───────────────────────────────────────────────────────────────────
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${CARD}" height="${CARD}" viewBox="0 0 ${CARD} ${CARD}">
  <defs>
    <linearGradient id="bgGrad" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${DARK_GREEN}"/>
      <stop offset="100%" stop-color="${DARK_BG}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${CARD}" height="${CARD}" rx="22" fill="url(#bgGrad)"/>

  <!-- Outer double gold border -->
  <rect x="10" y="10" width="${CARD-20}" height="${CARD-20}" rx="18"
        fill="none" stroke="${GOLD}" stroke-width="3" stroke-opacity="0.95"/>
  <rect x="17" y="17" width="${CARD-34}" height="${CARD-34}" rx="13"
        fill="none" stroke="${GOLD}" stroke-width="1" stroke-opacity="0.4"/>

  <!-- QR Panel shadow -->
  <rect x="${PX+4}" y="${PY+6}" width="${PW}" height="${PH}" rx="${PRX}"
        fill="#000" fill-opacity="0.45"/>

  <!-- QR Panel (white) + gold border -->
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="${PRX}" fill="${WHITE}"/>
  <rect x="${PX-4}" y="${PY-4}" width="${PW+8}" height="${PH+8}" rx="${PRX+3}"
        fill="none" stroke="${GOLD}" stroke-width="4" stroke-opacity="0.9"/>

  <!-- QR modules (colored) -->
  <g transform="${qrTransform}" shape-rendering="crispEdges">
    <path stroke="${RED_FINDER}"  stroke-width="1" fill="none" d="${dPath.red}"/>
    <path stroke="${GRN_FINDER}"  stroke-width="1" fill="none" d="${dPath.green}"/>
    <path stroke="${GOLD_MODULE}" stroke-width="1" fill="none" d="${dPath.gold}"/>
  </g>

  <!-- Logo: outer halo → gold ring → image -->
  <circle cx="${LCX}" cy="${LCY}" r="${LR + 14}" fill="${WHITE}"/>
  <circle cx="${LCX}" cy="${LCY}" r="${LR + 9}"
          fill="${WHITE}" stroke="${GOLD}" stroke-width="2.5" stroke-opacity="0.8"/>
  <image xlink:href="data:image/png;base64,${logo64}"
         x="${LCX - LR}" y="${LCY - LR}" width="${LOGO}" height="${LOGO}"
         preserveAspectRatio="xMidYMid meet"/>

  <!-- Side decorative S-curves -->
  <path d="${leftCurve}"  fill="none" stroke="${GOLD}" stroke-width="2.5" stroke-opacity="0.8"/>
  <path d="${rightCurve}" fill="none" stroke="${GOLD}" stroke-width="2.5" stroke-opacity="0.8"/>
  <!-- Left fleur ornament -->
  <text x="${TIP}" y="${MY + 9}" font-size="24" fill="${GOLD}" fill-opacity="0.9"
        text-anchor="middle" font-family="Georgia, serif">⚜</text>
  <!-- Right fleur ornament -->
  <text x="${TIPR}" y="${MY + 9}" font-size="24" fill="${GOLD}" fill-opacity="0.9"
        text-anchor="middle" font-family="Georgia, serif">⚜</text>

  <!-- "Tasty Bites Menu" -->
  <text x="${MX}" y="${BRAND_Y + 68}"
        font-family="Georgia, 'Palatino Linotype', serif"
        font-size="58" font-weight="bold"
        fill="${GOLD_LIGHT}" text-anchor="middle">Tasty Bites Menu</text>

  <!-- Divider with fleur -->
  <line x1="${MX - 135}" y1="${BRAND_Y + 87}" x2="${MX - 16}" y2="${BRAND_Y + 87}"
        stroke="${GOLD}" stroke-width="1" stroke-opacity="0.55"/>
  <text x="${MX}" y="${BRAND_Y + 95}" font-size="18" fill="${GOLD}" fill-opacity="0.85"
        text-anchor="middle" font-family="Georgia, serif">⚜</text>
  <line x1="${MX + 16}" y1="${BRAND_Y + 87}" x2="${MX + 135}" y2="${BRAND_Y + 87}"
        stroke="${GOLD}" stroke-width="1" stroke-opacity="0.55"/>

  <!-- "SCAN TO VIEW OUR MENU" pill -->
  <rect x="${MX - 195}" y="${BRAND_Y + 112}" width="390" height="54" rx="27"
        fill="#0b1810" stroke="${GOLD}" stroke-width="1.5" stroke-opacity="0.65"/>

  <!-- Phone icon inside pill -->
  <g transform="translate(${MX - 178},${BRAND_Y + 121})">
    <!-- Phone outline -->
    <rect x="0" y="0" width="24" height="33" rx="3.5"
          fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <!-- Screen area -->
    <rect x="3" y="4" width="18" height="20" rx="1"
          fill="${GOLD}" fill-opacity="0.1"/>
    <!-- Mini QR on screen: top-left block -->
    <rect x="4"  y="5"  width="6" height="6" rx="0.5" fill="${GOLD}"/>
    <rect x="5"  y="6"  width="4" height="4" rx="0.5" fill="#0b1810"/>
    <rect x="6"  y="7"  width="2" height="2" fill="${GOLD}"/>
    <!-- top-right block -->
    <rect x="11" y="5"  width="6" height="6" rx="0.5"
          fill="none" stroke="${GOLD}" stroke-width="0.8"/>
    <rect x="12.5" y="6.5" width="3" height="3" fill="${GOLD}"/>
    <!-- bottom-left block -->
    <rect x="4"  y="13" width="6" height="6" rx="0.5"
          fill="none" stroke="${GOLD}" stroke-width="0.8"/>
    <rect x="5.5" y="14.5" width="3" height="3" fill="${GOLD}"/>
    <!-- bottom-right dots -->
    <rect x="12" y="13" width="2" height="2" fill="${GOLD}"/>
    <rect x="15" y="13" width="2" height="2" fill="${GOLD}"/>
    <rect x="12" y="16" width="2" height="2" fill="${GOLD}"/>
    <rect x="15" y="16" width="2" height="4" fill="${GOLD}"/>
    <!-- Home button -->
    <circle cx="12" cy="29.5" r="2.5"
            fill="none" stroke="${GOLD}" stroke-width="1"/>
  </g>

  <text x="${MX + 22}" y="${BRAND_Y + 144}"
        font-family="Arial, 'Helvetica Neue', sans-serif"
        font-size="13.5" font-weight="bold" letter-spacing="2.2"
        fill="${GOLD_LIGHT}" text-anchor="middle">SCAN TO VIEW OUR MENU</text>

</svg>`;

  const outPath = path.join(process.cwd(), "public", "qr-menu.svg");
  fs.writeFileSync(outPath, svg, "utf8");
  console.log(`✓ Saved → public/qr-menu.svg  (${CARD}×${CARD}px)`);
  console.log(`  Modules: ${N}×${N}  |  EC-H  |  Logo: ~${pct}% coverage (limit 30%)`);
}

main().catch(e => { console.error(e); process.exit(1); });
