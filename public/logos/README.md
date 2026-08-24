# "As Seen On" / "Catch Me On" logos

Drop the official logo files here using these exact names (PNG or SVG with a
transparent background works best). They render at ~48-64px tall, `object-contain`,
so any aspect ratio is fine.

**As seen on**
- `come-dine-with-me-sa.png` — Come Dine With Me (SA)
- `ultimate-braai-master.png` — Ultimate Braai Master
- `rate-my-plate.png` — Rate My Plate (Mzansi Magic, DStv 161) — derived from
  the supplied `rate-my-plate.jpeg` (light artwork on solid black): the black
  was knocked out to transparency and the empty margins trimmed, so it picks up
  whatever background it sits on. The source JPEG is kept alongside it and is
  no longer referenced.
- Rise FM ("Fun Food Friday" appearance, 3 July 2026) is in the "As seen
  on" list as a text credit linking straight to the episode
  (iono.fm/e/1692201), not a logo -- the only source was a low-res
  Instagram screenshot crop that didn't hold up next to the others here.
  `rise-fm.png` is still sitting in this folder from that attempt but is no
  longer referenced anywhere; safe to delete once someone with delete
  access on this machine gets to it, or swap it back in via
  `lib/site-config.ts` if an official RISE fm logo file turns up.

**Catch me on**
- `mozambique-barbecue-festival.png` — Mozambique Barbecue Festival
- `south-africa-barbecue-festival.png` — South Africa Barbecue Festival —
  cropped from the event's official ticketing banner (webtickets.co.za), same
  EmberRock Group hexagon-badge family as the Mozambique logo. Lower source
  resolution than the others; fine at the ~64px render size, would need a
  cleaner source to use any larger.

The paths are wired in `lib/site-config.ts` (`asSeenOn`, `catchMeOn`). To
change a filename, update it there. Until a file exists, that item shows its
name only.
