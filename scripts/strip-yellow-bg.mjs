// One-off: isolate the Mozambique Barbecue Festival hexagon badge from its
// yellow field + black letterbox. The yellow appears both OUTSIDE and INSIDE
// the hexagon (same colour), so colour alone can't separate them. Instead we
// flood-fill from the image edges through "background" pixels (yellow OR pure
// black letterbox); the dark-charcoal hexagon outline (~rgb(55,53,52)) is not
// background, so it walls the fill off and the interior yellow is preserved.
import sharp from "sharp";
import path from "node:path";

const dir = "public/logos";
const inFile = path.join(dir, "mozambique-barbecue-festival.jpg");
const outFile = path.join(dir, "mozambique-barbecue-festival.png");

const { data, info } = await sharp(inFile)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

const isBackground = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const yellow = r > 200 && g > 185 && b < 195 && r - b > 45 && g - b > 40;
  const blackBar = r < 25 && g < 25 && b < 25; // letterbox
  return yellow || blackBar;
};

// Iterative flood fill from every border pixel.
const seen = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) {
  stack.push(x, x + (h - 1) * w);
}
for (let y = 0; y < h; y++) {
  stack.push(y * w, w - 1 + y * w);
}

while (stack.length) {
  const p = stack.pop();
  if (seen[p]) continue;
  if (!isBackground(p * c)) continue;
  seen[p] = 1;
  const x = p % w, y = (p / w) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < w - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - w);
  if (y < h - 1) stack.push(p + w);
}

// Everything reached from the edge becomes transparent.
for (let p = 0; p < w * h; p++) {
  if (seen[p]) data[p * c + 3] = 0;
}

await sharp(data, { raw: { width: w, height: h, channels: c } })
  .png()
  .trim()
  .toFile(outFile);

console.log("wrote", outFile);
