"""EXPLORATION ONLY — for TK, 2026-09-23. Martin said he would not want a spit
in the badge; TK asked to see one anyway. Replaces the grill spatula with a
spit rod (crank handle, pointed tip, a spit fork). Not part of the identity."""
import sys, math, os
OUT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(OUT, "..", "..", "..", "brand-identity", "_build"))
import geom, pathops
from geom import union, diff, d, transform
import cairosvg
t = geom.tools_clean()
keep = []
for c in t.contours:
    b = c.bounds; mx = (b[0]+b[2])/2; my = (b[1]+b[3])/2
    spatula = (mx > 850 and my < 620) or (mx < 700 and my > 880)
    if not spatula: keep.append(c)
fork = pathops.Path()
for c in keep: fork.addPath(c)
fork.simplify(fix_winding=True)
def poly(pts):
    p = pathops.Path(); p.moveTo(*pts[0])
    for q in pts[1:]: p.lineTo(*q)
    p.close(); return p
P0, P1 = (500, 992), (1182, 312)   # rod starts short of the old handle end so the crank clears the rules
L = math.dist(P0, P1); u = ((P1[0]-P0[0])/L, (P1[1]-P0[1])/L); n = (-u[1], u[0])
at = lambda s, o=0: (P0[0]+u[0]*s+n[0]*o, P0[1]+u[1]*s+n[1]*o)
W = 13   # half-width of the rod: ~ the fork's shaft
rod = poly([at(0, -W), at(L-60, -W), at(L, 0), at(L-60, W), at(0, W)])
crank = union(poly([at(0, -W), at(0, 90), at(26, 90), at(26, -W)]),            # arm, at right angles
              poly([at(-10, 66), at(-10, 108), at(110, 108), at(110, 66)]))        # handle, parallel to the rod
cs = L - 210                                                                      # spit fork collar
collar = poly([at(cs-16, -40), at(cs+16, -40), at(cs+16, 40), at(cs-16, 40)])
prongs = union(*[poly([at(cs, o-9), at(cs-150, o-3), at(cs-170, o), at(cs-150, o+3), at(cs, o+9)]) for o in (-28, 28)])
spit = union(rod, crank, collar, prongs)
spit = diff(spit, geom.L["ribbon"])
tools = union(fork, spit)
RED, CHAR = "#952926", "#3F3F41"
S = geom.shapes()["lockup"]
ink = union(geom.L["name"], tools, geom.L["est"])
lay = [(CHAR, ink), (RED, S["red"]), ("#FFFFFF", S["paper"])]
def page(layers, bg):
    bs = [p.bounds for _, p in layers]; x0 = min(b[0] for b in bs)-40; y0 = min(b[1] for b in bs)-40
    x1 = max(b[2] for b in bs)+40; y1 = max(b[3] for b in bs)+40
    body = "".join(f'<path fill="{f}" d="{d(transform(p,1,-x0,-y0))}"/>' for f, p in layers)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {x1-x0:.0f} {y1-y0:.0f}"><rect width="100%" height="100%" fill="{bg}"/><!-- EXPLORATION ONLY: spit variant for TK, not the logo -->{body}</svg>'
a = page(lay, "#FFFFFF"); open(OUT + "/lockup-spit-EXPLORATION.svg", "w").write(a)
cairosvg.svg2png(bytestring=a.encode(), write_to=OUT + "/lockup-spit-EXPLORATION.png", output_width=1200)
# side by side with the real one
real = page([(CHAR, union(geom.L["name"], geom.tools_clean(), geom.L["est"])), (RED, S["red"]), ("#FFFFFF", S["paper"])], "#FFFFFF")
cairosvg.svg2png(bytestring=real.encode(), write_to=OUT + "/_real.png", output_width=900)
cairosvg.svg2png(bytestring=a.encode(), write_to=OUT + "/_spit.png", output_width=900)
from PIL import Image, ImageDraw, ImageFont
A = Image.open(OUT + "/_real.png"); B = Image.open(OUT + "/_spit.png")
F = ImageFont.truetype(OUT + "/../../../brand-identity/_build/fonts/oswald-latin-700-normal.woff2", 34); f2 = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
C = Image.new("RGB", (1860, A.size[1]+130), "#F4EFE6"); dr = ImageDraw.Draw(C)
C.paste(A, (20, 90)); C.paste(B, (940, 90))
dr.text((20, 25), "THE LOGO (ROUTE 1, APPROVED)", fill="#3F3F41", font=F)
dr.text((940, 25), "EXPLORATION: SPATULA SWAPPED FOR A SPIT", fill="#952926", font=F)
dr.text((940, 90+A.size[1]+10), "For TK only. Martin said he wouldn't want this. Not part of the identity.", fill="#6d665f", font=f2)
C.save(OUT + "/spit-vs-logo.png")
os.remove(OUT + "/_real.png"); os.remove(OUT + "/_spit.png")
print("ok")
