// One-off: knock the solid black background out of the Ultimate Braai Master
// logo so only the red flame/ribbon and white text remain. Reads raw RGBA,
// drives alpha from luminance with a soft ramp (so anti-aliased edges fade
// rather than leaving a hard halo), then writes a trimmed PNG.
import sharp from "sharp";
import path from "node:path";

const dir = "public/logos";
const inFile = path.join(dir, "ultimate-braai-master.jpg");
const outFile = path.join(dir, "ultimate-braai-master.png");

// Luminance ramp: fully transparent at/below LO, fully opaque at/above HI.
const LO = 24; // pure-ish black background
const HI = 60; // start of real logo pixels

const { data, info } = await sharp(inFile)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i],
    g = data[i + 1],
    b = data[i + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  let a;
  if (lum <= LO) a = 0;
  else if (lum >= HI) a = 255;
  else a = Math.round(((lum - LO) / (HI - LO)) * 255);
  data[i + 3] = a;
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .trim() // crop away the now-transparent margins
  .toFile(outFile);

console.log("wrote", outFile);
