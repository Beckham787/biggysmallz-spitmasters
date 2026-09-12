/**
 * shot.mjs — render an HTML file to PNG with Playwright/Chromium.
 *
 * Usage: node shot.mjs <input.html> <output.png> [width] [height] [scale] [--opaque]
 *
 * Clips to the element with id="stage" when one exists, so a page can carry
 * its own padding without it landing in the export. Transparent by default.
 */
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Playwright lives in the imago-dei repo's node_modules; resolve from there
// rather than adding a dependency to this brand-assets folder.
const PW_HOST = process.env.PW_HOST
  ?? 'C:/Users/takal/TK Studio/Websites/imago-dei/package.json';
const { chromium } = createRequire(pathToFileURL(PW_HOST))('playwright');

const [input, output, w = '1200', h = '900', scale = '2', ...flags] =
  process.argv.slice(2);
const opaque = flags.includes('--opaque');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Math.ceil(+w), height: Math.ceil(+h) },
  deviceScaleFactor: +scale,
});
await page.goto(pathToFileURL(path.resolve(input)).href, {
  waitUntil: 'networkidle',
});
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(250);

const stage = await page.$('#stage');
await (stage ?? page).screenshot({
  path: path.resolve(output),
  omitBackground: !opaque,
  ...(stage ? {} : { fullPage: true }),
});
await browser.close();
console.log('  rendered', path.basename(output));
