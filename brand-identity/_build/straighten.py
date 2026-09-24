"""Step 2: set Martin's own arched letters on a straight line, for the
wordmark. Each letter of BIGGY SMALLZ is cut out of the 2017 logo, turned
upright about the arch's centre, and placed at the same arc spacing, so the
straight version uses his exact letterforms rather than a substitute font.
Output: _build/layers/name_straight.svg
"""
import os, subprocess, math
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
HERE=os.path.dirname(os.path.abspath(__file__))
SRC=os.path.join(HERE,"source","logo-2017.png")
U=3
im=np.array(Image.open(SRC).convert("RGBA")).astype(int)
r,g,b,a=[im[...,i] for i in range(4)]
white=(a>128)&(r>190)&(g>190)&(b>190)
white[560:,:]=False
lab,n=ndi.label(white)
sizes=ndi.sum(white,lab,range(1,n+1))
ids=[i+1 for i,s in enumerate(sizes) if s>300]
cents=[ndi.center_of_mass(white,lab,i) for i in ids]
assert len(ids)==11, len(ids)
# least-squares circle through letter centroids
ys=np.array([c[0] for c in cents]); xs=np.array([c[1] for c in cents])
A=np.c_[2*xs,2*ys,np.ones(len(xs))]; bb=xs**2+ys**2
cx,cy,c0=np.linalg.lstsq(A,bb,rcond=None)[0]; R=math.sqrt(c0+cx**2+cy**2)
order=np.argsort(np.arctan2(ys-cy,xs-cx))
Hh=260; out_w=2000
canvas=np.zeros((Hh*U,out_w*U),dtype=np.uint8)
thetas=[]; items=[]
for k in order:
    i=ids[k]; y,x=cents[k]
    th=math.atan2(x-cx,cy-y)       # angle from vertical (+ = right)
    rr=math.hypot(x-cx,y-cy)
    m=(lab==i)
    sl=ndi.find_objects(m.astype(int))[0]
    pad=40
    y0,y1=max(sl[0].start-pad,0),sl[0].stop+pad; x0,x1=max(sl[1].start-pad,0),sl[1].stop+pad
    crop=Image.fromarray((m[y0:y1,x0:x1]*255).astype("uint8")).resize(((x1-x0)*U,(y1-y0)*U),Image.LANCZOS)
    # rotate upright about the letter's centroid (PIL rotates CCW for +deg)
    cyl,cxl=(y-y0)*U,(x-x0)*U
    rot=crop.rotate(math.degrees(th),resample=Image.BICUBIC,center=(cxl,cyl))
    items.append((th,rr,np.array(rot),cyl,cxl))
    thetas.append(th)
Rm=np.mean([it[1] for it in items])
s0=Rm*thetas[0]
for th,rr,arr,cyl,cxl in items:
    X=(Rm*th-s0+60)*U       # arc length -> x
    Y=(60+(Rm-rr)+80)*U       # radial offset -> y (keeps each letter's own height relationship)
    h,w=arr.shape
    top=int(round(Y-cyl)); left=int(round(X-cxl))
    t0,l0=max(top,0),max(left,0)
    sub=arr[t0-top:t0-top+min(h,canvas.shape[0]-t0), l0-left:l0-left+min(w,canvas.shape[1]-l0)]
    canvas[t0:t0+sub.shape[0], l0:l0+sub.shape[1]]=np.maximum(canvas[t0:t0+sub.shape[0], l0:l0+sub.shape[1]],sub)
img=Image.fromarray(canvas).filter(ImageFilter.GaussianBlur(1.2*U)).point(lambda v:255 if v>127 else 0)
bb=img.getbbox(); img=img.crop((bb[0]-4*U,bb[1]-4*U,bb[2]+4*U,bb[3]+4*U))
inv=Image.eval(img,lambda v:255-v).convert("1")
bmp=os.path.join(HERE,"layers","name_straight.bmp"); inv.save(bmp)
subprocess.run(["potrace","-s","--flat","-a","1.0","-O","0.4","-t","8","-o",os.path.join(HERE,"layers","name_straight.svg"),bmp],check=True)
os.remove(bmp)
print("arch centre",round(cx),round(cy),"R",round(R),"letters",len(ids),"span deg",round(math.degrees(thetas[-1]-thetas[0]),1),"scale",U)
