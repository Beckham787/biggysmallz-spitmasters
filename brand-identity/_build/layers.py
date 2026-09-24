"""Load traced layers as absolute path data in source-pixel units (1600x1183)."""
import os, re
from svgelements import SVG, Path, Matrix
HERE=os.path.dirname(os.path.abspath(__file__))
SCALE={"name_straight":3}
def load(name):
    S=SCALE.get(name,2)
    svg=SVG.parse(os.path.join(HERE,"layers",name+".svg"),reify=True)
    d=[]
    for el in svg.elements():
        if isinstance(el,Path):
            p=Path(el)*Matrix.scale(0.75/S)  # potrace writes pt; svgelements reads pt as 4/3 px -> back to source px
            p.reify()
            d.append(p)
    whole=Path()
    for p in d: whole+=p
    return whole
def fmt(path, dx=0, dy=0, k=1.0):
    p=Path(path)*Matrix(f"translate({dx},{dy}) scale({k})") if (dx or dy or k!=1) else Path(path)
    p.reify()
    s=p.d()
    # round numbers to 2dp for small, stable files
    return re.sub(r"-?\d+\.\d+", lambda m: ("%.2f"%float(m.group())).rstrip("0").rstrip("."), s)
LAYERS=["name","tools","ribbon","ribbon_text","est","rules"]
