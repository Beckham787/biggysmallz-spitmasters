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
