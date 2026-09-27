"""Biggy Smallz Spitmasters — Mozambique Barbecue Festival 2026 (promo).
Facts from the festival's own 2026 poster (site: /mozambique): 3 October 2026,
12h00, Campus da UEM, Maputo; tickets arena.co.mz. Fifth year (2022–2026)."""
from playwright.sync_api import sync_playwright
import os
H=os.path.dirname(os.path.abspath(__file__))
BASE=open(os.path.join(H,"launch.py")).read().split('BASE = """')[1].split('"""')[0]
def page(w,h,L,body,css):
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{BASE.replace("LSIZE",str(L))}html,body{{width:{w}px;height:{h}px}}{css}</style></head><body>{body}</body></html>'
FACT='3 October · 12h00 · Campus da UEM, Maputo'
def A(w,h,story):
    ph=820 if not story else 1180
    top=ph-40
    return page(w,h,112 if not story else 124,f"""
<div class="ph"></div><div class="fade"></div>
<div class="p"><div class="s">Mozambique Barbecue Festival · Year five</div>
<h1 class="l">Maputo,<br>we're back.</h1>
<div class="m">{FACT}</div>
<div class="cta s"><span class="rule"></span>Tickets · arena.co.mz</div></div>
<img class="b" src="lockup-white.svg">""",f"""
.ph{{position:absolute;left:0;top:0;width:{w}px;height:{ph}px;background:url(moz-lamb.png) center 38%/cover}}
.fade{{position:absolute;left:0;right:0;top:{ph-300}px;height:300px;background:linear-gradient(rgba(22,21,23,0),#161517)}}
.p{{position:absolute;left:72px;right:{'300' if not story else '72'}px;top:{top}px;display:flex;flex-direction:column;gap:22px}}
.b{{position:absolute;right:64px;bottom:{'64' if not story else '270'}px;width:{'190' if not story else '200'}px}}""")
def B(w,h,story):
    if not story:
        return page(w,h,300,f"""
<div class="ph"></div>
<div class="top"><div class="s eb">Mozambique Barbecue Festival · 12h00 · Campus da UEM</div>
<div class="row"><h1 class="l">03<span class="mo">Oct</span></h1>
<div class="col"><div class="m">Five years on the coals in Maputo. Come find my corner.</div>
<div class="cta s"><span class="rule"></span>Tickets · arena.co.mz</div></div>
<img class="b" src="lockup-white.svg"></div></div>""",""".ph{position:absolute;left:0;top:600px;width:1080px;height:750px;background:url(moz-stall.png) center 22%/cover}
.top{position:absolute;left:64px;right:64px;top:64px;display:flex;flex-direction:column;gap:26px}
.eb{color:#F4EFE6}
.row{display:flex;gap:40px;align-items:flex-start}
.l{line-height:.82;letter-spacing:-.01em}.mo{display:block;font-size:.42em;line-height:1;letter-spacing:.04em}
.col{display:flex;flex-direction:column;gap:28px;width:420px;flex:none;padding-top:14px}.cta{white-space:nowrap}
.b{width:150px;position:absolute;right:0;top:330px}""")
    return page(w,h,330,f"""
<div class="ph"></div>
<div class="p"><div class="s">Mozambique Barbecue Festival · 12h00 · Campus da UEM</div>
<h1 class="l">03<span class="mo">Oct</span></h1>
<div class="m">Five years on the coals in Maputo. Come find my corner.</div>
<div class="sp"></div>
<div class="cta s"><span class="rule"></span>Tickets · arena.co.mz</div>
<img class="b" src="lockup-white.svg"></div>""",""".ph{position:absolute;left:0;top:960px;width:1080px;height:960px;background:url(moz-stall.png) center 25%/cover}
.p{position:absolute;left:80px;right:80px;top:220px;height:700px;display:flex;flex-direction:column;gap:22px}
.l{line-height:.82;letter-spacing:-.01em}.mo{display:block;font-size:.42em;line-height:1;letter-spacing:.04em}
.sp{flex:1}.b{width:170px;position:absolute;right:0;top:120px}""")
T={"mozambique-A-lamb-1080x1350":(1080,1350,A(1080,1350,False)),"mozambique-A-lamb-story-1080x1920":(1080,1920,A(1080,1920,True)),
   "mozambique-B-date-1080x1350":(1080,1350,B(1080,1350,False)),"mozambique-B-date-story-1080x1920":(1080,1920,B(1080,1920,True))}
if __name__=="__main__":
    os.makedirs(os.path.join(H,"moz"),exist_ok=True)
    with sync_playwright() as p:
        b=p.chromium.launch()
        for n,(w,h,html) in T.items():
            open(os.path.join(H,"_m.html"),"w").write(html)
            pg=b.new_page(viewport={"width":w,"height":h});pg.goto("file://"+os.path.join(H,"_m.html"));pg.wait_for_timeout(700)
            print(n,pg.evaluate("(()=>{const o=[];document.querySelectorAll('.l,.m,.s').forEach(e=>{const r=e.getBoundingClientRect();if(r.right>innerWidth-40||r.bottom>innerHeight-40||e.scrollWidth>e.clientWidth+1)o.push(e.className+':'+Math.round(r.right)+','+Math.round(r.bottom))});return o})()"))
            pg.screenshot(path=os.path.join(H,"moz",n+".png"));pg.close()
        b.close()
    os.remove(os.path.join(H,"_m.html"))
