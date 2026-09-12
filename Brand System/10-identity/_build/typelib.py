"""
typelib — shape text with HarfBuzz and emit outlined SVG paths.

Used to convert the Biggy Smallz Spitmasters wordmark from live text into
vector outlines, so the logo never depends on a font loading.

Replicates SVG's textLength + lengthAdjust="spacing" behaviour: the delta
between the natural shaped advance and the requested length is distributed
evenly across the n-1 inter-glyph gaps, exactly as a browser does.
"""
import os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.misc.transform import Transform

FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")

_cache = {}


def _load(name):
    if name in _cache:
        return _cache[name]
    path = os.path.join(FONT_DIR, name)
    with open(path, "rb") as fh:
        data = fh.read()
    face = hb.Face(data)
    font = hb.Font(face)
    tt = TTFont(path)
    upem = tt["head"].unitsPerEm
    _cache[name] = (font, tt, upem)
    return _cache[name]


def shape(fontname, text, features=None):
    """Return (glyph_ids, x_advances_in_font_units, upem)."""
    font, tt, upem = _load(fontname)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, features or {})
    gids = [i.codepoint for i in buf.glyph_infos]
    advs = [p.x_advance for p in buf.glyph_positions]
    offs = [(p.x_offset, p.y_offset) for p in buf.glyph_positions]
    return gids, advs, offs, upem


def natural_width(fontname, text, size, tracking=0.0):
    """Width in user units at `size`, with `tracking` px added per gap."""
    gids, advs, offs, upem = shape(fontname, text)
    s = size / upem
    w = sum(advs) * s
    if len(gids) > 1:
        w += tracking * (len(gids) - 1)
    return w


def text_path(fontname, text, size, x, y, anchor="start",
              text_length=None, tracking=0.0):
    """
    Outline `text` as a single SVG path `d` string.

    x, y      baseline origin (y = baseline, SVG coordinates)
    anchor    "start" | "middle" | "end"
    text_length  if set, emulates textLength + lengthAdjust="spacing"
    tracking  extra px per inter-glyph gap (applied before text_length)

    Returns (d, width, x_start, ink_bounds).
    """
    font, tt, upem = _load(fontname)
    glyphset = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    gids, advs, offs, _ = shape(fontname, text)
    s = size / upem

    n = len(gids)
    adv_px = [a * s for a in advs]
    gaps = [tracking] * max(n - 1, 0)

    width = sum(adv_px) + sum(gaps)
    if text_length is not None and n > 1:
        delta = (text_length - width) / (n - 1)
        gaps = [g + delta for g in gaps]
        width = text_length
    elif text_length is not None:
        width = text_length

    if anchor == "middle":
        x0 = x - width / 2.0
    elif anchor == "end":
        x0 = x - width
    else:
        x0 = x

    parts = []
    bpen = BoundsPen(glyphset)
    pen_x = x0
    for i, gid in enumerate(gids):
        gname = order[gid]
        ox, oy = offs[i]
        t = Transform(s, 0, 0, -s, pen_x + ox * s, y - oy * s)
        spen = SVGPathPen(glyphset, ntos=lambda v: f"{v:.2f}")
        glyphset[gname].draw(TransformPen(spen, t))
        d = spen.getCommands()
        if d:
            parts.append(d)
        glyphset[gname].draw(TransformPen(bpen, t))
        pen_x += adv_px[i]
        if i < n - 1:
            pen_x += gaps[i]

    return " ".join(parts), width, x0, bpen.bounds
