/**
 * latest-photos.mjs — get 1–4 photos ready for a lib/latest.ts entry.
 *
 *   node scripts/latest-photos.mjs <folder> <source>=<name> [<source>=<name> …]
 *   node scripts/latest-photos.mjs 2026-11-02-wedding "C:/…/IMG_1201.jpg=plated-lamb" …
 *
 * Writes public/images/latest/<folder>/<name>.jpg: rotated upright, longest
 * side 1200 px, progressive JPEG, metadata (incl. GPS) stripped. Steps the
 * quality down until the file is 300 KB or less; fails if it can't get there.
 * Name each file for what is in the frame ("plated-lamb"), not a guess at the
 * dish. Prints the src paths to paste into the entry.
 */
import sharp from "sharp";
import { mkdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const [folder, ...pairs] = process.argv.slice(2);
if (!folder || pairs.length < 1 || pairs.length > 4 || !/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(folder)) {
  console.error('Usage: node scripts/latest-photos.mjs <YYYY-MM-DD-occasion> "<source>=<name>" (1–4 photos)');
  process.exit(2);
}

const MAX_BYTES = 300 * 1024;
const outDir = path.join(process.cwd(), "public", "images", "latest", folder);
mkdirSync(outDir, { recursive: true });
let failed = 0;

for (const pair of pairs) {
  const at = pair.lastIndexOf("=");
  const src = pair.slice(0, at);
  const name = pair.slice(at + 1);
  if (at < 1 || !/^[a-z0-9-]+$/.test(name) || !existsSync(src)) {
    console.error(`skip "${pair}": need <existing file>=<lowercase-name>`);
    failed++;
    continue;
  }
  const out = path.join(outDir, `${name}.jpg`);
  let bytes = Infinity;
  for (const quality of [82, 76, 70, 64]) {
    await sharp(src)
      .rotate()
      .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(out);
    bytes = statSync(out).size;
    if (bytes <= MAX_BYTES) break;
  }
  const ok = bytes <= MAX_BYTES;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} /images/latest/${folder}/${name}.jpg  ${(bytes / 1024).toFixed(0)} KB`);
}
process.exit(failed ? 1 : 0);
