// Reusable: flood-fill the connected near-white background from the image
// edges and make it transparent, then trim. Flood fill (rather than a global
// white->alpha) preserves any light areas *inside* the subject (e.g. cream
// horn highlights) because they're walled off by the subject's dark outline.
//
// Usage: node scripts/strip-white-bg.mjs <in> <out> [threshold=238]
import sharp from "sharp";

const [, , inFile, outFile, thrArg] = process.argv;
const THR = Number(thrArg ?? 238); // a pixel is "white" if r,g,b all >= THR

if (!inFile || !outFile) {
  console.error("usage: strip-white-bg.mjs <in> <out> [threshold]");
  process.exit(1);
}

const { data, info } = await sharp(inFile)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

const isWhite = (i) =>
  data[i] >= THR && data[i + 1] >= THR && data[i + 2] >= THR;

const seen = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, x + (h - 1) * w);
for (let y = 0; y < h; y++) stack.push(y * w, w - 1 + y * w);

while (stack.length) {
  const p = stack.pop();
  if (seen[p] || !isWhite(p * c)) continue;
  seen[p] = 1;
  const x = p % w, y = (p / w) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < w - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - w);
  if (y < h - 1) stack.push(p + w);
}

for (let p = 0; p < w * h; p++) if (seen[p]) data[p * c + 3] = 0;

await sharp(data, { raw: { width: w, height: h, channels: c } })
  .png()
  .trim()
  .toFile(outFile);

console.log("wrote", outFile);
