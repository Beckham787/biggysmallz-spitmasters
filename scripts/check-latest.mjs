/**
 * check-latest.mjs — `npm run check:latest`.
 *
 * Fails (exit 1) when the newest entry in lib/latest.ts is more than
 * STALE_AFTER_DAYS old, so the monthly Keep sweep catches a site that has
 * stopped matching Instagram. Also fails on entries that would break the page
 * or the brand rules: a date label that doesn't match its date, a missing
 * photo, a photo over 300 KB, empty alt text, more than 4 photos, a banned
 * word, or a link that isn't a real Instagram/site link. A missing
 * Instagram link is a warning (TK supplies it), not a failure.
 *
 *   npm run check:latest                     check against today (SA time)
 *   npm run check:latest -- --now 2026-11-11 check as if it were that date
 *
 * Loads lib/latest.ts directly: Node 22.18+/24 strips the types.
 */
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_IMAGE_BYTES = 300 * 1024;
const BANNED = [
  /\bpassionate\b/i, /\bpremium\b/i, /\bbespoke\b/i, /\bworld[- ]class\b/i,
  /\bhands[- ]on\b/i, /\bper person\b/i, /\bR\s?\d/,
  // Words that go stale on their own. ("New" alone is allowed: "New Year's Eve".)
  /\bthis week\b/i, /\bjust (in|landed|now)\b/i, /\bbrand[- ]new\b/i,
];

/** Returns { errors, warnings, newest, age } for a list of entries. */
export function checkLatest(entries, lib, now = new Date()) {
  const errors = [];
  const warnings = [];
  const slugs = new Set();

  if (entries.length === 0) errors.push("lib/latest.ts has no entries.");

  for (const e of entries) {
    const at = `[${e.slug}]`;
    if (slugs.has(e.slug)) errors.push(`${at} duplicate slug`);
    slugs.add(e.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date) || Number.isNaN(Date.parse(e.date))) {
      errors.push(`${at} date "${e.date}" is not YYYY-MM-DD`);
    } else if (lib.formatDateLabel(e.date) !== e.dateLabel) {
      errors.push(`${at} dateLabel "${e.dateLabel}" does not match date ${e.date} (expected "${lib.formatDateLabel(e.date)}")`);
    }
    if (lib.daysSince(e.date, now) < 0) errors.push(`${at} date ${e.date} is in the future`);
    if (e.kind !== "event" && e.kind !== "post") errors.push(`${at} kind must be "event" or "post"`);
    for (const field of ["title", "occasion", "line"]) {
      if (!e[field] || !String(e[field]).trim()) errors.push(`${at} ${field} is empty`);
      for (const re of BANNED) if (re.test(e[field] ?? "")) errors.push(`${at} ${field} uses a banned word (${re})`);
    }
    if (!Array.isArray(e.images) || e.images.length < 1 || e.images.length > 4) {
      errors.push(`${at} needs 1–4 images`);
    }
    for (const img of e.images ?? []) {
      if (!img.alt || img.alt.trim().length < 10) errors.push(`${at} ${img.src}: alt text missing or too short`);
      if (!img.src?.startsWith("/images/")) { errors.push(`${at} ${img.src}: must be a local path under /images/`); continue; }
      const file = path.join(SITE, "public", img.src);
      if (!existsSync(file)) { errors.push(`${at} ${img.src}: file not found in public/`); continue; }
      const bytes = statSync(file).size;
      if (bytes > MAX_IMAGE_BYTES) errors.push(`${at} ${img.src}: ${(bytes / 1024).toFixed(0)} KB, over 300 KB`);
    }
    if (e.instagramUrl === undefined) warnings.push(`${at} no instagramUrl yet (TODO: TK pastes the post link)`);
    else if (!/^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/?$/.test(e.instagramUrl)) {
      errors.push(`${at} instagramUrl "${e.instagramUrl}" is not an instagram.com/p/… or /reel/… link`);
    }
    if (e.href !== undefined && !e.href.startsWith("/")) errors.push(`${at} href must be a path on this site`);
  }

  const newest = [...entries].sort((a, b) => b.date.localeCompare(a.date))[0];
  const age = newest ? lib.daysSince(newest.date, now) : Infinity;
  if (newest && age > lib.STALE_AFTER_DAYS) {
    errors.push(
      `STALE: the newest entry (${newest.slug}, ${newest.dateLabel}) is ${age} days old; the limit is ${lib.STALE_AFTER_DAYS}. Add the latest Instagram post (docs/latest-howto.md).`,
    );
  }
  return { errors, warnings, newest, age };
}

// CLI — only when run directly, so the check can also be imported by tests.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const lib = await import(pathToFileURL(path.join(SITE, "lib", "latest.ts")).href);
  const i = process.argv.indexOf("--now");
  // --now YYYY-MM-DD means noon on that day in South Africa.
  const now = i > -1 ? new Date(`${process.argv[i + 1]}T10:00:00Z`) : new Date();
  if (Number.isNaN(now.getTime())) {
    console.error("--now needs a date, e.g. --now 2026-11-11");
    process.exit(2);
  }
  const { errors, warnings, newest, age } = checkLatest(lib.latestEntries, lib, now);
  for (const w of warnings) console.log(`warn  ${w}`);
  for (const e of errors) console.log(`FAIL  ${e}`);
  if (newest) console.log(`newest: ${newest.dateLabel} (${newest.slug}), ${age} day(s) old, limit ${lib.STALE_AFTER_DAYS}`);
  console.log(errors.length ? `check:latest FAILED (${errors.length})` : `check:latest ok (${lib.latestEntries.length} entr${lib.latestEntries.length === 1 ? "y" : "ies"})`);
  process.exit(errors.length ? 1 : 0);
}
