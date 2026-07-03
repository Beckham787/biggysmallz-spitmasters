/**
 * recent-event.ts — the homepage's "Recently" spotlight.
 *
 * One real, recent event, told with a bit of depth — not a gallery grid.
 * To swap in a new event after the next job, just replace the values below.
 * `image` is the lead shot; `supportingImage` is optional and can be left
 * undefined if there's no second shot worth pairing with it.
 */

export const recentEvent = {
  eyebrow: "Recently",
  image: "wedding-rob-leah-plating",
  imageAlt:
    "Biggy and Chef Sikolethu plating together at the table, wedding guests soft-focus in the background, roses on the linen.",
  supportingImage: "wedding-rob-leah-spread",
  supportingImageAlt:
    "The full harvest-style spread laid out for Rob & Leah's wedding at Moyres Venue.",
  caption: "Rob & Leah's wedding, Moyres Venue — June 2026",
  detail: "Biggy and Chef Sikolethu, plating together before the toast.",
} as const;
