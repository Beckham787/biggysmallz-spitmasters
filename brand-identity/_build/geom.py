"""Shape assembly: traced layers -> the identity's shapes, as boolean-clean
fill-only paths (skia-pathops). No strokes anywhere in the output."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pathops
from svgelements import Move, Line, CubicBezier, QuadraticBezier, Close, Arc
from layers import load

def to_pathops(sp):
    p = pathops.Path(); started = False
    for seg in sp.segments():
        if isinstance(seg, Move):
            if started: p.close()
            p.moveTo(seg.end.x, seg.end.y); started = True
        elif isinstance(seg, Line):
            p.lineTo(seg.end.x, seg.end.y)
        elif isinstance(seg, CubicBezier):
            p.cubicTo(seg.control1.x, seg.control1.y, seg.control2.x, seg.control2.y, seg.end.x, seg.end.y)
        elif isinstance(seg, QuadraticBezier):
            p.quadTo(seg.control.x, seg.control.y, seg.end.x, seg.end.y)
        elif isinstance(seg, Close):
            p.close(); started = False
        elif isinstance(seg, Arc):
            for c in seg.as_cubic_curves():
                p.cubicTo(c.control1.x, c.control1.y, c.control2.x, c.control2.y, c.end.x, c.end.y)
    if started: p.close()
    p.simplify(fix_winding=True)
    return p

def union(*ps):
    return pathops.op(ps[0], ps[1], pathops.PathOp.UNION) if len(ps) == 2 else union(union(ps[0], ps[1]), *ps[2:]) if len(ps) > 2 else ps[0]
def diff(a, b): return pathops.op(a, b, pathops.PathOp.DIFFERENCE)

def transform(p, k=1.0, dx=0.0, dy=0.0):
    out = pathops.Path()
    pen = out.getPen()
    class T:
        def __init__(s, pen): s.pen = pen
        def moveTo(s, pt): s.pen.moveTo((pt[0]*k+dx, pt[1]*k+dy))
        def lineTo(s, pt): s.pen.lineTo((pt[0]*k+dx, pt[1]*k+dy))
        def curveTo(s, *pts): s.pen.curveTo(*[(x*k+dx, y*k+dy) for x, y in pts])
        def qCurveTo(s, *pts): s.pen.qCurveTo(*[(x*k+dx, y*k+dy) if (x, y) is not None else None for x, y in pts])
        def closePath(s): s.pen.closePath()
        def endPath(s): s.pen.endPath()
    p.draw(T(pen))
    return out

def outset(p, w):
    """Grow a shape by w (for knock-out gaps in single ink)."""
    s = pathops.Path(); p.draw(s.getPen())
    s.stroke(2*w, pathops.LineCap.ROUND_CAP, pathops.LineJoin.ROUND_JOIN, 4)
    s.convertConicsToQuads()
    return union(p, s)

def d(p):
    """SVG path data, 1dp (0.1 source px: well below anything visible)."""
    from fontTools.pens.svgPathPen import SVGPathPen
    pen = SVGPathPen(None, ntos=lambda v: ("%.1f" % v).rstrip("0").rstrip("."))
    p.draw(pen)
    return pen.getCommands()

L = {n: to_pathops(load(n)) for n in ["name", "tools", "ribbon", "ribbon_text", "est", "rules", "name_straight"]}
GAP = 12   # single-ink knock-out gap between ribbon and tools, source px

def tools_clean():  # tools never overlap the ribbon, in any version
    return diff(L["tools"], L["ribbon"])

def shapes():
    """Every shape as {layer_role: path}. Roles: ink (name/tools/est -> dark or
    light value), red (ribbon, rules), paper (ribbon lettering, always white)."""
    t = tools_clean()
    S = {}
    S["lockup"] = {"ink": union(L["name"], t, L["est"]), "red": union(diff(L["ribbon"], L["ribbon_text"]), L["rules"]), "paper": L["ribbon_text"]}
    S["mark"] = {"ink": t, "red": diff(L["ribbon"], L["ribbon_text"]), "paper": L["ribbon_text"]}
    S["mark-small"] = {"ink": t, "red": L["ribbon"]}
    # wordmark: his straightened letters over the ribbon, name width = ribbon width
    rb = L["ribbon"].bounds; nb = L["name_straight"].bounds
    k = (rb[2]-rb[0]) / (nb[2]-nb[0])
    name = transform(L["name_straight"], k, rb[0]-nb[0]*k, rb[1]-60-(nb[3]*k))
    S["wordmark"] = {"ink": name, "red": diff(L["ribbon"], L["ribbon_text"]), "paper": L["ribbon_text"]}
    # wordmark-wide: name left, ribbon right, name cap height = ribbon lettering height
    tb = L["ribbon_text"].bounds
    k2 = (tb[3]-tb[1]) / (nb[3]-nb[1])
    rib_x = rb[0]
    name2 = transform(L["name_straight"], k2, rib_x - 70 - (nb[2]*k2), (tb[1]) - nb[1]*k2)
    S["wordmark-wide"] = {"ink": name2, "red": diff(L["ribbon"], L["ribbon_text"]), "paper": L["ribbon_text"]}
    return S

def single(shape):
    """One ink: everything in currentColor, ribbon lettering knocked out, and a
    gap cut around the ribbon so tools don't merge into it."""
    s = shape
    red = s["red"]
    ribbon_full = union(red, s["paper"]) if "paper" in s else red
    ink = diff(s["ink"], outset(ribbon_full, GAP))
    return union(ink, red)   # paper (lettering) stays a hole
