"""Step 1: trace Martin's 2017 logo (public/logo.png, 1600x1183, the only
source that exists) into clean vector layers. No source file or designer is
known (TK, 2026-09-23), so the raster IS the source. Output: _build/layers/*.svg
Layers: name (arched BIGGY SMALLZ), tools, ribbon, ribbon_text, est, rules.
The speckle texture inside SPITMASTERS is removed by filling small holes.
"""
import subprocess, os, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

HERE=os.path.dirname(os.path.abspath(__file__))
SRC=os.path.join(HERE,"source","logo-2017.png")
OUT=os.path.join(HERE,"layers"); os.makedirs(OUT,exist_ok=True)
S=2  # upscale factor before tracing -> smoother curves

im=np.array(Image.open(SRC).convert("RGBA")).astype(int)
r,g,b,a=[im[...,i] for i in range(4)]
opaque=a>128
white=opaque&(r>190)&(g>190)&(b>190)
red=opaque&(r>90)&(g<80)&(b<90)&(r-g>50)
grey=opaque&(abs(r-g)<24)&(abs(g-b)<30)&(r>55)&(r<170)
H,W=r.shape

def comp_bbox(mask):
    ys,xs=np.nonzero(mask); return ys.min(),ys.max(),xs.min(),xs.max()

# ribbon = the large red component in the middle band
lab,n=ndi.label(red)
sizes=ndi.sum(red,lab,range(1,n+1))
rib_id=int(np.argmax(sizes))+1
ribbon_red=lab==rib_id
y0,y1,x0,x1=comp_bbox(ribbon_red)
band=np.zeros_like(red); band[y0:y1+1,x0:x1+1]=True
ribbon_text=white&band
# fill speckle holes in the letters (holes < 400 px are texture, letter
# counters like the A's are larger and survive)
def fill_small_holes(m,maxarea):
    holes=ndi.binary_fill_holes(m)&~m
    hl,hn=ndi.label(holes)
    if hn==0: return m
    hs=ndi.sum(holes,hl,range(1,hn+1))
    small=np.isin(hl,[i+1 for i,s in enumerate(hs) if s<maxarea])
    return m|small
ribbon_text=fill_small_holes(ribbon_text,400)
# also close hairline speckle notches on letter edges
ribbon_text=ndi.binary_closing(ribbon_text,structure=np.ones((3,3)),iterations=1)&band
ribbon=ndi.binary_fill_holes(ribbon_red|ribbon_text)
# remove tiny red specks outside
# name: white above the ribbon ; est: white below the ribbon
name=white.copy(); name[y0-20:,:]=False
est=white.copy(); est[:y1+20,:]=False
rules=red&~ribbon; rules[:y1+20,:]=False
tools=grey|((r<120)&(g<120)&(b<120)&opaque&~red&~white)  # dark grey edge pixels
tools&=~ribbon
tools=ndi.binary_opening(tools,structure=np.ones((3,3)))
# drop specks: keep components > 300px
def keep_big(m,minarea):
    l,n=ndi.label(m)
    if n==0: return m
    s=ndi.sum(m,l,range(1,n+1))
    return np.isin(l,[i+1 for i,v in enumerate(s) if v>=minarea])
name=keep_big(name,300); est=keep_big(est,40); rules=keep_big(rules,200); tools=keep_big(tools,500)
# Production minimum (deliverable-spec): "a true point drops out of a stitch.
# Blunt the tips deliberately and record the number." The braai fork's tines
# taper to true points. An opening with a 6px disk, applied ONLY inside the
# fork head, trims just the needle tip back to where the tine is 6px wide.
# Tried 20px (the spec's 1.5%-of-mark floor) and 10px first: both cut the
# tines so short the fork stopped reading as Martin's fork, which a faithful
# redraw can't do. So the tines stay below the 1.5% floor along their length;
# that is recorded as a known production limit in the guide, not hidden.
TINE_FLOOR=6
fork_head=np.zeros_like(tools); fork_head[280:560,380:720]=True
yy,xx=np.mgrid[-TINE_FLOOR//2:TINE_FLOOR//2+1,-TINE_FLOOR//2:TINE_FLOOR//2+1]
disk=(xx**2+yy**2)<=(TINE_FLOOR/2)**2
blunted=ndi.binary_opening(tools&fork_head,structure=disk)
removed=int((tools&fork_head&~blunted).sum())
tools=(tools&~fork_head)|blunted
print("tine blunting: removed",removed,"px of tine tip thinner than",TINE_FLOOR,"px")

def trace(mask,name_):
    img=Image.fromarray((mask*255).astype("uint8")).resize((W*S,H*S),Image.LANCZOS)
    img=img.filter(ImageFilter.GaussianBlur(1.2*S)).point(lambda v:255 if v>127 else 0)
    # potrace traces black -> invert
    inv=Image.eval(img,lambda v:255-v).convert("1")
    bmp=os.path.join(OUT,name_+".bmp"); inv.save(bmp)
    svg=os.path.join(OUT,name_+".svg")
    subprocess.run(["potrace","-s","--flat","-a","1.0","-O","0.4","-t","8","-o",svg,bmp],check=True)
    os.remove(bmp)
    return svg
for m,nm in ((name,"name"),(tools,"tools"),(ribbon,"ribbon"),(ribbon_text,"ribbon_text"),(est,"est"),(rules,"rules")):
    trace(m,nm); print(nm,int(m.sum()))
print("size",W,H,"scale",S)
