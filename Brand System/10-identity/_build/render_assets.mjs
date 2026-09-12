/**
 * render_assets.mjs — raster exports for the Biggy Smallz Spitmasters
 * identity: transparent PNGs of every mark, the social profile pictures,
 * and the favicon set. One Chromium session for the whole run.
 *
 * Run:  node render_assets.mjs
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW_HOST = process.env.PW_HOST
  ?? 'C:/Users/takal/TK Studio/Websites/imago-dei/package.json';
const { chromium } = createRequire(pathToFileURL(PW_HOST))('playwright');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const SVG = path.join(ROOT, 'svg');

const CHARCOAL = '#171412';
const BONE = '#F3E8D5';
const EMBER = '#E6531A';

const out = (...p) => {
  const f = path.join(ROOT, ...p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  return f;
};

/** Read an SVG file and pull its viewBox aspect ratio. */
function readSvg(name) {
  const src = fs.readFileSync(path.join(SVG, name), 'utf8');
  const m = src.match(/viewBox="([\d.\-\s]+)"/);
  const [, , w, h] = m[1].trim().split(/\s+/).map(Number);
  return { src, w, h, aspect: w / h };
}

const browser = await chromium.launch();
const page = await browser.newPage();

/** Screenshot an exact-size page built from arbitrary body markup. */
async function shoot(file, width, height, body, { opaque = false } = {}) {
  await page.setViewportSize({
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  });
  await page.setContent(
    `<!doctype html><meta charset="utf-8"><style>
       html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}
       svg{display:block}
     </style>${body}`,
    { waitUntil: 'load' },
  );
  await page.screenshot({ path: file, omitBackground: !opaque });
  console.log('  ', path.relative(ROOT, file));
}

// ------------------------------------------------------- transparent PNGs
const PNG_ASSETS = [
  'spit-icon', 'spit-icon-small', 'wordmark-stacked',
  'wordmark-horizontal', 'lockup-stacked',
];
const PNG_WIDTHS = [512, 1024, 2048];

console.log('png/');
for (const asset of PNG_ASSETS) {
  for (const colour of ['bone', 'charcoal']) {
    const { src, aspect } = readSvg(`${asset}-${colour}.svg`);
    for (const w of PNG_WIDTHS) {
      const h = Math.round(w / aspect);
      await shoot(
        out('png', `${asset}-${colour}-${w}.png`), w, h,
        `<div style="width:${w}px;height:${h}px">${
          src.replace(/width="[\d.]+" height="[\d.]+"/,
                      `width="${w}" height="${h}"`)}</div>`,
      );
    }
  }
}

// ------------------------------------------------------ social / profile
// TK's call 2026-09-12: the spit sits at 68% of canvas width, not 42%.
const PFP = 1080;
const PFP_SCALE = 0.68;

const profiles = [
  { name: 'profile-ember', bg: EMBER, icon: 'spit-icon-charcoal.svg' },
  { name: 'profile-charcoal', bg: CHARCOAL, icon: 'spit-icon-bone.svg' },
];

console.log('social/');
for (const p of profiles) {
  const { src, aspect } = readSvg(p.icon);
  const w = Math.round(PFP * PFP_SCALE);
  const h = Math.round(w / aspect);
  const body = `<div style="width:${PFP}px;height:${PFP}px;background:${p.bg};
      display:flex;align-items:center;justify-content:center">
      ${src.replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" height="${h}"`)}
    </div>`;
  await shoot(out('social', `${p.name}-1080.png`), PFP, PFP, body,
              { opaque: true });
}

// circle-crop proof: the same two files under a real circular mask, at the
// sizes the platforms actually display them
const CROP_SIZES = [320, 120, 56, 40, 28];
{
  // each row sits on the UI colour it will actually appear against, so the
  // check is "does it survive the crop AND the surrounding chrome"
  const beds = { 'profile-ember': '#0d0b0a', 'profile-charcoal': '#F3E8D5' };
  const cards = profiles.map((p) => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:18px;
                background:${beds[p.name]};padding:26px 0;border-radius:4px">
      <div style="display:flex;align-items:center;gap:20px">
        ${CROP_SIZES.map((s) => `<img src="${p.name}-1080.png"
          width="${s}" height="${s}"
          style="border-radius:50%;display:block">`).join('')}
      </div>
      <div style="font:600 11px/1 system-ui;letter-spacing:.16em;
                  text-transform:uppercase;color:#77716A">${p.name}
        &nbsp;·&nbsp; on ${p.name === 'profile-ember' ? 'dark UI' : 'light UI'}</div>
    </div>`).join('');
  const body = `<!doctype html><meta charset="utf-8">
    <style>html,body{margin:0}</style>
    <div id="sheet" style="width:760px;padding:44px;
      background:#0d0b0a;display:flex;flex-direction:column;gap:40px;
      box-sizing:border-box">
      <div style="font:600 11px/1 system-ui;letter-spacing:.18em;
                  text-transform:uppercase;color:#E6531A">
        Circle-crop check — 320 / 120 / 56 / 40 / 28 px</div>
      ${cards}</div>`;
  // written next to the PNGs so the relative <img> srcs resolve under file://
  const tmp = out('social', '_crop-check.tmp.html');
  fs.writeFileSync(tmp, body, 'utf8');
  await page.setViewportSize({ width: 760, height: 1000 });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.locator('#sheet').screenshot({
    path: out('social', '_circle-crop-check.png'),
  });
  fs.unlinkSync(tmp);
  console.log('   social/_circle-crop-check.png');
}

// ----------------------------------------------------------- favicon set
// TK's call 2026-09-12: favicon uses the condensed cut; the 180px
// apple-touch icon keeps the approved small-size variant.
console.log('favicon/');
const FAVICONS = [
  { size: 16, icon: 'spit-icon-condensed-bone.svg', scale: 0.84 },
  { size: 32, icon: 'spit-icon-condensed-bone.svg', scale: 0.84 },
  { size: 48, icon: 'spit-icon-condensed-bone.svg', scale: 0.84 },
  { size: 180, icon: 'spit-icon-small-bone.svg', scale: 0.72,
    name: 'apple-touch-icon-180.png' },
];
for (const f of FAVICONS) {
  const { src, aspect } = readSvg(f.icon);
  const w = f.size * f.scale;
  const h = w / aspect;
  const body = `<div style="width:${f.size}px;height:${f.size}px;
      background:${CHARCOAL};display:flex;align-items:center;
      justify-content:center">
      ${src.replace(/width="[\d.]+" height="[\d.]+"/,
                    `width="${w}" height="${h}"`)}</div>`;
  await shoot(out('favicon', f.name ?? `favicon-${f.size}.png`),
              f.size, f.size, body, { opaque: true });
}

// an SVG favicon too — modern browsers prefer it. Carries its own charcoal
// field, so it stays legible on a light tab bar.
{
  const { src } = readSvg('spit-icon-condensed-bone.svg');
  const inner = src.match(/<g transform[\s\S]*<\/g>/)[0];
  fs.writeFileSync(out('favicon', 'favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" `
    + `width="100" height="100" role="img" `
    + `aria-label="Biggy Smallz Spitmasters">
`
    + `  <!-- Biggy Smallz Spitmasters favicon — condensed cut, `
    + `bone on charcoal. TK Studio. -->
`
    + `  <rect width="100" height="100" fill="${CHARCOAL}"/>
`
    + `  <g transform="translate(8 32.42) scale(0.4884)">${inner}</g>
`
    + `</svg>
`, 'utf8');
  console.log('   favicon/favicon.svg');
}

await browser.close();
console.log('done.');
