/**
 * Génère le logo et les icônes de l'application.
 *
 *   npm i --no-save @resvg/resvg-js && node scripts/generate-logo.mjs
 *
 * Le logo n'est pas un binaire opaque : il se décrit ici en SVG, avec les jetons
 * de la charte et la police Literata du recueil. Toute retouche passe par ce
 * fichier, puis par une nouvelle exécution.
 *
 * Sorties dans assets/ : logo.png, icon.png, splash-icon.png (fond bleu plein),
 * adaptive-icon.png (fond transparent, contenu dans la zone sûre Android — le
 * fond vient de `android.adaptiveIcon.backgroundColor` dans app.json), favicon.png.
 *
 * Passer un dossier en argument écrit en plus des aperçus aux tailles réelles
 * d'affichage (42, 82 et 112 px), pour juger la lisibilité.
 */

import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'assets');
const FONTS = path.join(ROOT, 'node_modules/@expo-google-fonts/literata');

/**
 * Jetons repris de src/theme/tokens.ts, thème bleu.
 *
 * L'or est celui du **mode sombre** (`COLORS.bleu.dark.gold`) et non celui du
 * mode clair : sur la couverture bleue, `#d8953d` ne donne que 2,13 de contraste
 * quand `#f9c46e` en donne 3,38. C'est le jeton prévu pour un or posé sur un
 * fond foncé, donc le bon ici.
 */
const C = {
  cover: '#0b66d6',
  /** Dos : la couverture assombrie, pour rester dans la même famille. */
  spine: '#08499a',
  gold: '#f9c46e',
  title: '#ffffff',
  /** Fond des icônes qui ne tolèrent pas la transparence (iOS, favicon). */
  iconBackground: '#ffffff',
};

/** Rectangle à rayons par coin : haut-gauche, haut-droit, bas-droit, bas-gauche. */
function roundRect(x, y, w, h, [tl, tr, br, bl]) {
  return [
    `M${x + tl},${y}`,
    `H${x + w - tr}`,
    tr ? `A${tr},${tr} 0 0 1 ${x + w},${y + tr}` : '',
    `V${y + h - br}`,
    br ? `A${br},${br} 0 0 1 ${x + w - br},${y + h}` : '',
    `H${x + bl}`,
    bl ? `A${bl},${bl} 0 0 1 ${x},${y + h - bl}` : '',
    `V${y + tl}`,
    tl ? `A${tl},${tl} 0 0 1 ${x + tl},${y}` : '',
    'Z',
  ].join(' ');
}

/** Croche : tête inclinée, hampe, crochet. */
function eighthNote(cx, cy, scale) {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <ellipse cx="-14" cy="26" rx="21" ry="16" transform="rotate(-22 -14 26)" fill="${C.gold}"/>
      <rect x="2" y="-34" width="7" height="62" fill="${C.gold}"/>
      <path d="M9,-34 C34,-22 38,-6 30,12 C34,-6 26,-18 9,-22 Z" fill="${C.gold}"/>
    </g>`;
}

/**
 * Le livre seul, centré dans un carré de `size`. `occupancy` règle la part du
 * carré qu'il occupe : l'icône adaptative Android exige que tout le contenu
 * tienne dans les 66 % centraux, d'où une valeur bien plus basse pour elle.
 */
function book(size, occupancy) {
  const H = size * occupancy;
  // Proportion du livre. Plus large qu'un in-octavo classique (0,79) pour que
  // « CHANTS », la ligne la plus large, garde une marge franche avec le dos.
  const W = H * 0.82;
  const x = (size - W) / 2;
  const y = (size - H) / 2;

  const spineW = W * 0.118;
  const r = W * 0.055;
  const coverX = x + spineW;
  const coverW = W - spineW;
  const cx = coverX + coverW / 2;

  // Pas de cadre intérieur : il bridait la largeur du titre et se transformait
  // en bruit dès 42 px. Les deux filets dorés suffisent à structurer la couverture.
  const ruleW = W * 0.28;
  const big = H * 0.112;
  const small = H * 0.053;
  const ls = W * 0.012;

  return `
    <path d="${roundRect(x, y, W, H, [r, r, r, r])}" fill="${C.spine}"/>
    <path d="${roundRect(coverX, y, coverW, H, [0, r, r, 0])}" fill="${C.cover}"/>

    <rect x="${cx - ruleW / 2}" y="${y + H * 0.203}" width="${ruleW}" height="${H * 0.0075}" fill="${C.gold}"/>

    <text x="${cx}" y="${y + H * 0.356}" text-anchor="middle" font-family="Literata"
          font-weight="600" font-size="${big}" letter-spacing="${ls}" fill="${C.title}">RECUEIL</text>
    <text x="${cx}" y="${y + H * 0.446}" text-anchor="middle" font-family="Literata"
          font-weight="500" font-size="${small}" letter-spacing="${W * 0.028}" fill="${C.title}">DE</text>
    <text x="${cx}" y="${y + H * 0.570}" text-anchor="middle" font-family="Literata"
          font-weight="600" font-size="${big}" letter-spacing="${ls}" fill="${C.title}">CHANTS</text>

    <rect x="${cx - ruleW / 2}" y="${y + H * 0.626}" width="${ruleW}" height="${H * 0.0075}" fill="${C.gold}"/>
    ${eighthNote(cx, y + H * 0.74, H * 0.0022)}`;
}

const svg = ({ size, occupancy, background }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : ''}
    ${book(size, occupancy)}
  </svg>`;

const fontFiles = [
  '500Medium/Literata_500Medium.ttf',
  '600SemiBold/Literata_600SemiBold.ttf',
].map((f) => path.join(FONTS, f));

function render(spec, out) {
  const png = new Resvg(svg(spec), {
    fitTo: { mode: 'width', value: spec.size },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Literata' },
  })
    .render()
    .asPng();
  fs.writeFileSync(out, png);
  console.log(
    '  ' + path.basename(out).padEnd(22) + spec.size + 'px  ' + (png.length / 1024).toFixed(1) + ' Ko'
  );
}

/**
 * Logo affiché dans l'application : fond transparent, le livre seul, occupant
 * presque tout le carré — il n'y a plus de fond pour l'encadrer.
 */
const LOGO = { occupancy: 0.94, background: null };
/** Icônes de lancement : iOS refuse la transparence, d'où un fond plein. */
const ICON = { occupancy: 0.8, background: C.iconBackground };

console.log('rendu :');
render({ size: 1024, ...LOGO }, path.join(ASSETS, 'logo.png'));
render({ size: 1024, ...ICON }, path.join(ASSETS, 'icon.png'));
render({ size: 1024, ...ICON }, path.join(ASSETS, 'splash-icon.png'));
// Icône adaptative Android : zone sûre de 66 %, fond fourni par app.json.
render({ size: 1024, occupancy: 0.52, background: null }, path.join(ASSETS, 'adaptive-icon.png'));
render({ size: 96, ...ICON }, path.join(ASSETS, 'favicon.png'));

const previewDir = process.argv[2];
if (previewDir) {
  for (const s of [42, 82, 112]) {
    render({ size: s, ...LOGO }, path.join(previewDir, `apercu-${s}.png`));
  }
}
