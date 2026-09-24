"""Step 5: the mandatory tests (Machine/deliverable-spec.md), as files.
- social/_circle-crop-check.png   ships to the client
- _build/tests/reduction.png       every shape, 150->16px, on every ground
- _build/tests/contrast.json       WCAG ratio of every pairing the brand uses
- _build/tests/production.json     thinnest detail per shape, as % of width
"""
import os, sys, json, base64, itertools
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.morphology import skeletonize
import render
ROOT = os.path.join(HERE, ".."); T = os.path.join(HERE, "tests"); os.makedirs(T, exist_ok=True)
SVG = lambda n: open(os.path.join(ROOT, "svg", n + ".svg")).read()
B64 = lambda p: "data:image/png;base64," + base64.b64encode(open(p, "rb").read()).decode()
CSS = "body{margin:0;font:14px/1.3 sans-serif;color:#555}h1{font:600 18px sans-serif;margin:16px 20px;color:#222}.row{display:flex;align-items:center;gap:28px;padding:14px 20px}.lab{width:190px;font-size:12px}.cell{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px}"

# ---- circle crop
sizes = [320, 120, 56, 40, 28]
rows = ""
for ui, uiname, fg in (("#FFFFFF", "light UI", "#666"), ("#000000", "dark UI", "#aaa")):
    for prof in ("profile-badge-white", "profile-badge-black", "profile-mark-white", "profile-mark-black"):
        src = B64(os.path.join(ROOT, "social", prof + ".png"))
        cells = "".join(f'<div class="cell"><img src="{src}" style="width:{s}px;height:{s}px;border-radius:50%"><span>{s}px</span></div>' for s in sizes)
        rows += f'<div class="row" style="background:{ui};color:{fg}"><div class="lab">{prof}<br>on {uiname}</div>{cells}</div>'
H = 8 * 370 + 60
html = f'<!doctype html><html><head><style>{CSS}</style></head><body style="background:#eee"><h1>Circle-crop check — profile pictures under a real circle, at the sizes the platforms use</h1>{rows}</body></html>'
render.html_to_png(html, 1060, H, os.path.join(ROOT, "social", "_circle-crop-check.png"), workdir=T)

# ---- reduction
sizes = [150, 80, 48, 32, 24, 16]
rows = ""
for shape in ("lockup", "mark", "mark-small", "wordmark", "wordmark-wide"):
    for gname, g, v in (("white", "#FFFFFF", "charcoal"), ("bone", "#F4EFE6", "charcoal"), ("jacket black", "#161517", "white")):
        svg = SVG(f"{shape}-{v}"); vw, vh = render.svg_box(svg)
        cells = ""
        for s in sizes:
            w, h = (s, s * vh / vw) if vw >= vh else (s * vw / vh, s)
            inner = svg.replace("<svg ", f'<svg style="width:{w:.1f}px;height:{h:.1f}px;display:block" ', 1)
            cells += f'<div class="cell" style="width:{max(s,40)}px">{inner}<span>{s}px</span></div>'
        rows += f'<div class="row" style="background:{g};color:{"#aaa" if v=="white" else "#666"}"><div class="lab">{shape}<br>{v} on {gname}</div>{cells}</div>'
html = f'<!doctype html><html><head><style>{CSS}</style></head><body style="background:#eee"><h1>Reduction test — longest side 150 / 80 / 48 / 32 / 24 / 16 px</h1>{rows}</body></html>'
render.html_to_png(html, 900, 15 * 180 + 60, os.path.join(T, "reduction.png"), workdir=T)

# ---- contrast
def lum(h):
    c = [int(h[i:i+2], 16) / 255 for i in (1, 3, 5)]
    c = [v/12.92 if v <= 0.03928 else ((v+0.055)/1.055)**2.4 for v in c]
    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]
def ratio(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True); return round((la+0.05)/(lb+0.05), 2)
P = {"Spitmasters Red": "#952926", "Charcoal": "#3F3F41", "White": "#FFFFFF", "Jacket Black": "#161517", "Bone": "#F4EFE6"}
pairs = []
for a, b in itertools.combinations(P, 2):
    r = ratio(P[a], P[b])
    pairs.append({"a": a, "b": b, "ratio": r, "body_text": r >= 4.5, "large_text": r >= 3.0})
json.dump(pairs, open(os.path.join(T, "contrast.json"), "w"), indent=1)

# ---- production: thinnest detail per shape, as % of the shape's width
prod = {}
for shape in ("lockup", "mark", "mark-small", "wordmark", "wordmark-wide"):
    a = np.array(Image.open(os.path.join(ROOT, "png", f"{shape}-charcoal-2048.png")))
    alpha = a[..., 3] > 128
    ink = alpha & (a[..., 0] < 200)          # charcoal + red, not the white lettering
    letters = alpha & (a[..., 0] >= 200)     # white lettering inside the ribbon
    out = {}
    for nm, m in (("ink", ink), ("lettering", letters)):
        if m.sum() == 0: continue
        dt = ndi.distance_transform_edt(m); sk = skeletonize(m); w = 2 * dt[sk]
        out[nm] = {"p1_pct": round(100 * np.percentile(w, 1) / 2048, 2), "p5_pct": round(100 * np.percentile(w, 5) / 2048, 2), "median_pct": round(100 * np.median(w) / 2048, 2)}
    # gaps (background inside the ink's hull): spatula slots, counters
    prod[shape] = out
json.dump(prod, open(os.path.join(T, "production.json"), "w"), indent=1)
# single-ink proof: the -single files rendered black on white, no colour at all
for shape in ("lockup", "mark"):
    svg = SVG(f"{shape}-single"); vw, vh = render.svg_box(svg)
    render.html_to_png(render.place(svg, 900, round(900*vh/vw)+40, bg="#fff", pad=0.02).replace("html,body{", "html,body{color:#000;"), 900, round(900*vh/vw)+40, os.path.join(T, f"single-ink-{shape}.png"), workdir=T)
def trim(path, bg=(238, 238, 238)):
    im = Image.open(path).convert("RGB"); a = np.array(im)
    rows = np.where((np.abs(a.astype(int) - bg).sum(axis=2) > 6).any(axis=1))[0]
    im.crop((0, 0, im.size[0], rows.max() + 12)).save(path)
trim(os.path.join(T, "reduction.png")); trim(os.path.join(ROOT, "social", "_circle-crop-check.png"))
# ---- fidelity: how much of the 2017 silhouette the redraw keeps (Route 1 = faithful)
src = np.array(Image.open(os.path.join(HERE, "source", "logo-2017.png")).convert("RGBA"))[..., 3] > 128
svg = SVG("lockup-charcoal"); vw, vh = render.svg_box(svg)
tmp = os.path.join(T, "_fid.png"); render.html_to_png(render.place(svg, round(vw), round(vh)), round(vw), round(vh), tmp, transparent=True, workdir=T)
red = np.array(Image.open(tmp))[..., 3] > 128; os.remove(tmp)
canvas = np.zeros_like(src); h, w = red.shape
x0 = int(round(__import__("geom").shapes()["lockup"]["ink"].bounds[0]))
canvas[:h, x0:x0 + w] = red[:src.shape[0], :src.shape[1] - x0]
fid = {"silhouette_iou": round(float((canvas & src).sum() / (canvas | src).sum()), 4),
       "px_only_in_2017": int((src & ~canvas).sum()), "px_only_in_redraw": int((canvas & ~src).sum()), "px_2017_total": int(src.sum()),
       "note": "differences = speckle texture, fork needle tips (blunted 6px), anti-aliased edges"}
json.dump(fid, open(os.path.join(T, "fidelity.json"), "w"), indent=1)
render.close()
print(json.dumps(prod, indent=0)); print([ (p["a"],p["b"],p["ratio"]) for p in pairs])
