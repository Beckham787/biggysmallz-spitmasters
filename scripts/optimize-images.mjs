/**
 * optimize-images.mjs — downscale source images in /public/images for the web.
 *
 * The supplied photos are full-resolution PNGs (several ~4 MB). They are
 * resized to a sensible max dimension and recompressed in place, keeping the
 * SAME filename so the "swap by filename" workflow in lib/gallery.ts is
 * unaffected. Next/Image still serves further-optimized webp/avif variants.
 *
 * Run once after adding new originals:  node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "images");
const MAX_EDGE = 1800; // longest side, px

const files = (await readdir(DIR)).filter((f) => /\.png$/i.test(f));
let saved = 0;

for (const file of files) {
  const full = path.join(DIR, file);
  const before = (await stat(full)).size;
  const tmp = full + ".tmp";

  await sharp(full)
    .rotate() // respect EXIF orientation
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    // Lossless: keep full colour fidelity for these photography-led images
    // (no palette quantization, which would band the gradients).
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmp);

  await rename(tmp, full);
  const after = (await stat(full)).size;
  saved += before - after;
  console.log(
    `${file}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(
      after /
      1024 /
      1024
    ).toFixed(2)}MB`,
  );
}

console.log(`\nDone. Saved ${(saved / 1024 / 1024).toFixed(1)}MB across ${files.length} files.`);
