"""
build_guide.py — assemble brand-guide.html from guide.src.html.

Inlines subsetted woff2 fonts as base64 and every mark as real inline SVG,
so the finished page is one file that works with no network. It gets opened
on a phone at the handover.

Run:  python build_guide.py
"""
import base64
import io
import os
import re

from fontTools import subset
from fontTools.ttLib import TTFont

import typelib as T

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SVG = os.path.join(ROOT, "svg")
FONTS = os.path.join(HERE, "fonts")

EMBER = "#E6531A"
BONE = "#F3E8D5"
FRAUNCES = "Fraunces-900-opsz144.ttf"

DISPLAY_CHARS = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    " .,'’&?!—–:;()/"
)
TEXT_CHARS = (
    "".join(chr(c) for c in range(0x20, 0x7F))
    + " ·×–—‘’“”…°"
)


# ------------------------------------------------------------------- fonts

def subset_b64(filename, text):
    """Subset a TTF to `text`, compress to woff2, return a data: URI."""
    font = TTFont(os.path.join(FONTS, filename))
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    opts.drop_tables += ["DSIG"]
    sub = subset.Subsetter(options=opts)
    sub.populate(text=text)
    sub.subset(font)
    font.flavor = "woff2"
    buf = io.BytesIO()
    font.save(buf)
    raw = buf.getvalue()
    print(f"   {filename:26s} -> {len(raw)/1024:6.1f} KB woff2")
    return "data:font/woff2;base64," + base64.b64encode(raw).decode("ascii")


# --------------------------------------------------------------------- svg

def read_svg(name):
    with open(os.path.join(SVG, name), encoding="utf-8") as fh:
        return fh.read()


def inline(name, cls=None, style=None, label=None):
    """Return an SVG file's markup ready to drop into the page.

    Strips the width/height attributes so CSS controls size, drops the
    <title> for decorative copies, and marks those aria-hidden so the same
    mark repeated twenty times isn't read out twenty times.
    """
    src = read_svg(name)
    src = re.sub(r'\s+width="[\d.]+"\s+height="[\d.]+"', "", src, count=1)
    src = re.sub(r"\s*<!--.*?-->\s*", "\n  ", src, flags=re.S)
    if label:
        src = src.replace("<svg", f'<svg role="img"', 1)
        src = re.sub(r"<title>.*?</title>", f"<title>{label}</title>", src,
                     flags=re.S)
    else:
        src = re.sub(r"\s*<title>.*?</title>", "", src, flags=re.S)
        src = src.replace('role="img"', 'aria-hidden="true" focusable="false"',
                          1)
        src = re.sub(r'\s+aria-label="[^"]*"', "", src, count=1)
    attrs = ""
    if cls:
        attrs += f' class="{cls}"'
    if style:
        attrs += f' style="{style}"'
    if attrs:
        src = src.replace("<svg", "<svg" + attrs, 1)
    return src.strip()


# The eyebrow marker: the spit's own rod-and-tip terminal, at the drawing's
# real proportions (12-unit rod, 42-unit tip). Not a generic arrow.
TIP = (
    '<svg viewBox="70 0 64 15" aria-hidden="true" focusable="false" '
    'xmlns="http://www.w3.org/2000/svg"><g fill="currentColor">'
    '<rect x="70" y="1.5" width="22" height="12"/>'
    '<path d="M92 0 L134 7.5 L92 15 Z"/></g></svg>'
)


def wrong_wordmark():
    """A deliberately broken lockup for the 'never' section: SPITMASTERS
    demoted to a caption under an oversized BIGGY SMALLZ."""
    top_w = T.natural_width(FRAUNCES, "BIGGY SMALLZ", 42, tracking=-0.8)
    cx = top_w / 2.0
    d_top, _w, _x, b_top = T.text_path(FRAUNCES, "BIGGY SMALLZ", 42, cx, 42,
                                       anchor="middle", tracking=-0.8)
    d_cap, _w2, _x2, b_cap = T.text_path(FRAUNCES, "SPITMASTERS", 8, cx, 60,
                                         anchor="middle", text_length=96)
    x0 = min(b_top[0], b_cap[0]) - 2
    y0 = min(b_top[1], b_cap[1]) - 2
    x1 = max(b_top[2], b_cap[2]) + 2
    y1 = max(b_top[3], b_cap[3]) + 2
    return (
        f'<svg viewBox="0 0 {x1-x0:.4g} {y1-y0:.4g}" aria-hidden="true" '
        f'focusable="false" xmlns="http://www.w3.org/2000/svg">'
        f'<g transform="translate({-x0:.4g} {-y0:.4g})" fill="currentColor">'
        f'<path d="{d_top}"/><path d="{d_cap}"/></g></svg>'
    )


# ------------------------------------------------------------------- build

def main():
    print("Embedding fonts...")
    tokens = {
        "FONT_FRAUNCES": subset_b64(FRAUNCES, DISPLAY_CHARS),
        "FONT_ARCHIVO_400": subset_b64("Archivo-400.ttf", TEXT_CHARS),
        "FONT_ARCHIVO_600": subset_b64("Archivo-600.ttf", TEXT_CHARS),
    }

    fav = read_svg("../favicon/favicon.svg").encode("utf-8")
    tokens["FAVICON_DATA"] = ("data:image/svg+xml;base64,"
                              + base64.b64encode(fav).decode("ascii"))

    print("Inlining marks...")
    tokens.update({
        # hero
        "SVG_ICON_SINGLE_D": inline("spit-icon-single.svg"),
        "SVG_WORDMARK_STACKED_BONE_HERO": inline(
            "wordmark-stacked-bone.svg", cls="hero-mark",
            label="Biggy Smallz Spitmasters"),
        # the icon
        "SVG_ICON_BONE_A": inline("spit-icon-bone.svg",
                                  style="max-width:300px"),
        "SVG_ICON_CHARCOAL_A": inline("spit-icon-charcoal.svg",
                                      style="max-width:300px"),
        "SVG_ICON_BONE_B": inline("spit-icon-bone.svg"),
        "SVG_ICON_SMALL_BONE": inline("spit-icon-small-bone.svg"),
        "SVG_ICON_CONDENSED_BONE": inline("spit-icon-condensed-bone.svg",
                                          style="max-width:68%"),
        # reduction strip — width is 85% of each box
        "SVG_ICON_SMALL_BONE_R1": inline("spit-icon-small-bone.svg",
                                         style="width:102px"),
        "SVG_ICON_SMALL_BONE_R2": inline("spit-icon-small-bone.svg",
                                         style="width:54px"),
        "SVG_ICON_SMALL_BONE_R3": inline("spit-icon-small-bone.svg",
                                         style="width:34px"),
        "SVG_ICON_CONDENSED_BONE_R4": inline("spit-icon-condensed-bone.svg",
                                             style="width:20px"),
        "SVG_ICON_CONDENSED_BONE_R5": inline("spit-icon-condensed-bone.svg",
                                             style="width:14px"),
        # wordmark
        "SVG_WORDMARK_STACKED_BONE": inline("wordmark-stacked-bone.svg",
                                            style="max-width:210px"),
        "SVG_WORDMARK_HORIZONTAL_BONE": inline(
            "wordmark-horizontal-bone.svg", style="max-width:330px"),
        "SVG_LOCKUP_BONE": inline("lockup-stacked-bone.svg",
                                  style="max-width:190px"),
        "SVG_LOCKUP_CHARCOAL": inline("lockup-stacked-charcoal.svg",
                                      style="max-width:190px"),
        # clear space
        "SVG_ICON_BONE_CS": inline("spit-icon-bone.svg",
                                   style="width:56%;margin:0 auto"),
        "SVG_WORDMARK_STACKED_BONE_CS": inline(
            "wordmark-stacked-bone.svg", style="width:46%;margin:0 auto"),
        # never
        "SVG_ICON_SINGLE_N1": inline("spit-icon-single.svg",
                                     style="max-width:200px"),
        "SVG_ICON_SINGLE_N2": inline("spit-icon-single.svg",
                                     style="max-width:200px"),
        "SVG_ICON_SINGLE_N3": inline("spit-icon-single.svg",
                                     style="max-width:200px"),
        "SVG_WORDMARK_WRONG": wrong_wordmark().replace(
            "<svg", '<svg style="max-width:220px"', 1),
    })
    for k in "ABCDEFG":
        tokens["SVG_TIP" + ("" if k == "A" else "_" + k)] = TIP
    tokens["SVG_TIP"] = TIP

    with open(os.path.join(HERE, "guide.src.html"), encoding="utf-8") as fh:
        page = fh.read()

    missing = set(re.findall(r"\{\{(\w+)\}\}", page)) - set(tokens)
    if missing:
        raise SystemExit(f"unfilled placeholders: {sorted(missing)}")

    for key, val in tokens.items():
        page = page.replace("{{%s}}" % key, val)

    out = os.path.join(ROOT, "brand-guide.html")
    with open(out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(page)
    print(f"\nwrote brand-guide.html  ({len(page.encode('utf-8'))/1024:.0f} KB)")


if __name__ == "__main__":
    main()
