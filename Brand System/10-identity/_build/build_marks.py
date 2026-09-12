"""
build_marks.py — generate the Biggy Smallz Spitmasters identity SVGs.

Source geometry is the approved drawing (mark routes, Route A icon +
Route B wordmark). All wordmark text is converted to outlined paths so the
logo never depends on a font loading; live-text working copies are written
to svg/_working/ for future editing.

Run:  python build_marks.py
"""
import os
import typelib as T

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "svg")
WORK = os.path.join(OUT, "_working")

FRAUNCES = "Fraunces-900-opsz144.ttf"

CHARCOAL = "#171412"
BONE = "#F3E8D5"
EMBER = "#E6531A"

# variant name -> (type colour, rule colour)
VARIANTS = {
    "bone": (BONE, EMBER),
    "charcoal": (CHARCOAL, EMBER),
    "single": ("currentColor", "currentColor"),
}

HEADER = ("<!-- Biggy Smallz Spitmasters — {name} ({variant}). "
          "TK Studio. Text outlined; no font dependency. -->")


def write(path, body):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(body)
    print("  wrote", os.path.relpath(path, os.path.join(HERE, "..")))


def svg(view, inner, name, variant, title):
    x, y, w, h = view
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" '
        f'width="{w:g}" height="{h:g}" role="img" aria-label="{title}">\n'
        f'  {HEADER.format(name=name, variant=variant)}\n'
        f'  <title>{title}</title>\n'
        f'  <g transform="translate({-x:.4g} {-y:.4g})">\n{inner}\n  </g>\n'
        f'</svg>\n'
    )


def bbox_union(boxes):
    xs0 = min(b[0] for b in boxes)
    ys0 = min(b[1] for b in boxes)
    xs1 = max(b[2] for b in boxes)
    ys1 = max(b[3] for b in boxes)
    return xs0, ys0, xs1, ys1


# ---------------------------------------------------------------- the icon

def icon_parts(cut="standard"):
    """Return (shapes_template, ink_bbox) for The Spit.

    "standard"  the approved drawing, verbatim.
    "small"     the reduction variant: thicker rod, larger forms, holds
                under ~40px.
    "condensed" favicon-only cut. Same forms, shorter rod (2.4:1 instead
                of 3.7:1) so the mark sits ~40% larger inside a square.
                TK's call 2026-09-12 — the standard cut nearly vanishes
                at 16-32px. Never used as the logo.
    """
    small = cut == "small"
    if cut == "condensed":
        rod = dict(x=0, y=36, w=132, h=18, rx=3)
        tip = "M132 32 L172 45 L132 58 Z"
        big = dict(cx=36, cy=45, r=36)
        sml = dict(cx=100, cy=45, r=22)
        tipbox = (132, 32, 172, 58)
    elif not small:
        rod = dict(x=0, y=39, w=212, h=12, rx=3)
        tip = "M212 37.5 L254 45 L212 52.5 Z"
        big = dict(cx=78, cy=45, r=34)
        sml = dict(cx=139, cy=45, r=21)
        tipbox = (212, 37.5, 254, 52.5)
    else:
        rod = dict(x=0, y=37, w=206, h=16, rx=3)
        tip = "M206 34 L254 45 L206 56 Z"
        big = dict(cx=76, cy=45, r=36)
        sml = dict(cx=142, cy=45, r=22)
        tipbox = (206, 34, 254, 56)

    shapes = (
        '    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}"/>\n'
        '    <path d="{tip}"/>\n'
        '    <circle cx="{bcx}" cy="{bcy}" r="{br}"/>\n'
        '    <circle cx="{scx}" cy="{scy}" r="{sr}"/>'
    ).format(tip=tip,
             bcx=big["cx"], bcy=big["cy"], br=big["r"],
             scx=sml["cx"], scy=sml["cy"], sr=sml["r"], **rod)

    box = bbox_union([
        (rod["x"], rod["y"], rod["x"] + rod["w"], rod["y"] + rod["h"]),
        tipbox,
        (big["cx"] - big["r"], big["cy"] - big["r"],
         big["cx"] + big["r"], big["cy"] + big["r"]),
        (sml["cx"] - sml["r"], sml["cy"] - sml["r"],
         sml["cx"] + sml["r"], sml["cy"] + sml["r"]),
    ])
    return shapes, box


ICON_NAMES = {
    "standard": ("The Spit icon", "spit-icon"),
    "small": ("The Spit icon (small-size variant)", "spit-icon-small"),
    "condensed": ("The Spit icon (condensed favicon cut)",
                  "spit-icon-condensed"),
}


def build_icon(cut="standard"):
    shapes, box = icon_parts(cut)
    x0, y0, x1, y1 = box
    view = (x0, y0, x1 - x0, y1 - y0)
    name, slug = ICON_NAMES[cut]
    for variant, (col, _) in VARIANTS.items():
        inner = f'    <g fill="{col}">\n{shapes}\n    </g>'
        write(os.path.join(OUT, f"{slug}-{variant}.svg"),
              svg(view, inner, name, variant,
                  "Biggy Smallz Spitmasters"))
    return view, shapes


# ------------------------------------------------------------ the wordmark
# Stacked: three lines of Fraunces 900, each locked to 248 units wide so the
# block holds its shape at any size. Ember rule between BIGGY and SMALLZ.

STACK_LINES = [("BIGGY", 58, 60), ("SMALLZ", 58, 132), ("SPITMASTERS", 26, 170)]
STACK_RULE = dict(x=34, y=76, w=248, h=5, rx=2.5)
STACK_CX = 158
STACK_LEN = 248


def stacked_geometry():
    paths, boxes = [], []
    for text, size, baseline in STACK_LINES:
        d, _w, _x0, b = T.text_path(FRAUNCES, text, size, STACK_CX, baseline,
                                    anchor="middle", text_length=STACK_LEN)
        paths.append(d)
        boxes.append(b)
    boxes.append((STACK_RULE["x"], STACK_RULE["y"],
                  STACK_RULE["x"] + STACK_RULE["w"],
                  STACK_RULE["y"] + STACK_RULE["h"]))
    return paths, bbox_union(boxes)


def build_stacked():
    paths, box = stacked_geometry()
    x0, y0, x1, y1 = box
    view = (x0, y0, x1 - x0, y1 - y0)
    r = STACK_RULE
    for variant, (col, rule) in VARIANTS.items():
        inner = (
            f'    <g fill="{col}">\n'
            + "".join(f'      <path d="{d}"/>\n' for d in paths)
            + '    </g>\n'
            f'    <rect x="{r["x"]}" y="{r["y"]}" width="{r["w"]}" '
            f'height="{r["h"]}" rx="{r["rx"]}" fill="{rule}"/>'
        )
        write(os.path.join(OUT, f"wordmark-stacked-{variant}.svg"),
              svg(view, inner, "Stacked wordmark", variant,
                  "Biggy Smallz Spitmasters"))
    return view


# Horizontal: BIGGY SMALLZ on one line at 42 with -0.8 tracking; ember rule;
# SPITMASTERS beneath at 20, locked to 226 wide. All centred.

H_TOP = ("BIGGY SMALLZ", 42, -0.8)
H_CAP = ("SPITMASTERS", 20, 226)


def horizontal_geometry():
    top_w = T.natural_width(FRAUNCES, H_TOP[0], H_TOP[1], tracking=H_TOP[2])
    cx = top_w / 2.0
    d_top, _w, _x0, b_top = T.text_path(
        FRAUNCES, H_TOP[0], H_TOP[1], cx, 42, anchor="middle",
        tracking=H_TOP[2])
    d_cap, _w2, _x02, b_cap = T.text_path(
        FRAUNCES, H_CAP[0], H_CAP[1], cx, 84, anchor="middle",
        text_length=H_CAP[2])
    rule = dict(x=cx - H_CAP[2] / 2.0, y=56, w=H_CAP[2], h=4, rx=2)
    box = bbox_union([b_top, b_cap,
                      (rule["x"], rule["y"], rule["x"] + rule["w"],
                       rule["y"] + rule["h"])])
    return [d_top, d_cap], rule, box


def build_horizontal():
    paths, r, box = horizontal_geometry()
    x0, y0, x1, y1 = box
    view = (x0, y0, x1 - x0, y1 - y0)
    for variant, (col, rule) in VARIANTS.items():
        inner = (
            f'    <g fill="{col}">\n'
            + "".join(f'      <path d="{d}"/>\n' for d in paths)
            + '    </g>\n'
            f'    <rect x="{r["x"]:.4g}" y="{r["y"]}" width="{r["w"]}" '
            f'height="{r["h"]}" rx="{r["rx"]}" fill="{rule}"/>'
        )
        write(os.path.join(OUT, f"wordmark-horizontal-{variant}.svg"),
              svg(view, inner, "Horizontal wordmark", variant,
                  "Biggy Smallz Spitmasters"))
    return view


# --------------------------------------------------------- combined lockup
# The Spit above the stacked wordmark. Icon width is 68% of the wordmark
# width (TK's call, 2026-09-12); the gap below it is 0.62 of the icon height.

def build_lockup(ratio=0.68, slug="lockup-stacked"):
    ishapes, ibox = icon_parts("standard")
    ix0, iy0, ix1, iy1 = ibox
    iw, ih = ix1 - ix0, iy1 - iy0

    paths, wbox = stacked_geometry()
    wx0, wy0, wx1, wy1 = wbox
    ww = wx1 - wx0

    target_w = ww * ratio
    k = target_w / iw
    gap = (ih * k) * 0.62

    # icon sits centred above the wordmark's cap line
    tx = wx0 + (ww - target_w) / 2.0 - ix0 * k
    ty = wy0 - gap - (ih * k) - iy0 * k

    box = (wx0, wy0 - gap - ih * k, wx1, wy1)
    view = (box[0], box[1], box[2] - box[0], box[3] - box[1])
    r = STACK_RULE

    for variant, (col, rule) in VARIANTS.items():
        inner = (
            f'    <g fill="{col}">\n'
            f'      <g transform="translate({tx:.4g} {ty:.4g}) scale({k:.6g})">\n'
            f'  {ishapes}\n'
            f'      </g>\n'
            + "".join(f'      <path d="{d}"/>\n' for d in paths)
            + '    </g>\n'
            f'    <rect x="{r["x"]}" y="{r["y"]}" width="{r["w"]}" '
            f'height="{r["h"]}" rx="{r["rx"]}" fill="{rule}"/>'
        )
        write(os.path.join(OUT, f"{slug}-{variant}.svg"),
              svg(view, inner, "Combined lockup", variant,
                  "Biggy Smallz Spitmasters"))
    return view


# ------------------------------------------------- live-text working copies

def build_working_copies():
    """Editable copies with real <text>. NOT for production use."""
    warn = ("<!-- WORKING COPY — live text, requires Fraunces 900. "
            "Do not ship. Edit here, then re-run build_marks.py to "
            "regenerate the outlined production files. -->")
    r = STACK_RULE
    lines = "\n".join(
        f'  <text x="{STACK_CX}" y="{y}" font-family="Fraunces" '
        f'font-weight="900" font-size="{s}" textLength="{STACK_LEN}" '
        f'lengthAdjust="spacing" text-anchor="middle" fill="{BONE}">{t}</text>'
        for t, s, y in STACK_LINES)
    write(os.path.join(WORK, "wordmark-stacked-livetext.svg"),
          f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 188">\n'
          f'  {warn}\n{lines}\n'
          f'  <rect x="{r["x"]}" y="{r["y"]}" width="{r["w"]}" '
          f'height="{r["h"]}" rx="{r["rx"]}" fill="{EMBER}"/>\n</svg>\n')

    top_w = T.natural_width(FRAUNCES, H_TOP[0], H_TOP[1], tracking=H_TOP[2])
    cx = top_w / 2.0
    write(os.path.join(WORK, "wordmark-horizontal-livetext.svg"),
          f'<svg xmlns="http://www.w3.org/2000/svg" '
          f'viewBox="0 0 {top_w+8:.4g} 100">\n  {warn}\n'
          f'  <text x="{cx+4:.4g}" y="42" font-family="Fraunces" '
          f'font-weight="900" font-size="42" letter-spacing="-0.8" '
          f'text-anchor="middle" fill="{BONE}">BIGGY SMALLZ</text>\n'
          f'  <rect x="{cx+4-113:.4g}" y="56" width="226" height="4" rx="2" '
          f'fill="{EMBER}"/>\n'
          f'  <text x="{cx+4:.4g}" y="84" font-family="Fraunces" '
          f'font-weight="900" font-size="20" textLength="226" '
          f'lengthAdjust="spacing" text-anchor="middle" fill="{BONE}">'
          f'SPITMASTERS</text>\n</svg>\n')


if __name__ == "__main__":
    print("Building identity SVGs...")
    v = build_icon("standard");  print("  icon         viewBox", [round(n, 2) for n in v[0]])
    v = build_icon("small");     print("  icon small   viewBox", [round(n, 2) for n in v[0]])
    v = build_icon("condensed"); print("  icon cond.   viewBox", [round(n, 2) for n in v[0]])
    v = build_stacked();   print("  stacked      viewBox", [round(n, 2) for n in v])
    v = build_horizontal();print("  horizontal   viewBox", [round(n, 2) for n in v])
    v = build_lockup();    print("  lockup       viewBox", [round(n, 2) for n in v])
    build_working_copies()
    print("done.")
