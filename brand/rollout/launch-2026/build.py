"""Biggy Smallz Spitmasters — website launch posters (promo). Locked palette,
Oswald + Source Serif 4, real photos, the live site's own screenshot.
Three sizes per poster: S 26px labels/CTA, M 34px reading, L headline."""
from playwright.sync_api import sync_playwright
import os
H = os.path.dirname(os.path.abspath(__file__))
BASE = """@font-face{font-family:Oswald;font-weight:700;src:url(oswald-latin-700-normal.woff2)}
@font-face{font-family:Oswald;font-weight:600;src:url(oswald-latin-600-normal.woff2)}
@font-face{font-family:SS4;font-weight:400;src:url(source-serif-4-latin-400-normal.woff2)}
@font-face{font-family:SS4;font-style:italic;src:url(source-serif-4-latin-400-italic.woff2)}
html,body{margin:0;overflow:hidden;background:#161517;color:#fff}
.s{font:600 26px/1.2 Oswald;letter-spacing:.14em;text-transform:uppercase}
.m{font:400 34px/1.35 SS4;color:#F4EFE6}.mi{font:italic 400 34px/1.35 SS4;color:#F4EFE6}
.l{font:700 LSIZEpx/.95 Oswald;text-transform:uppercase;margin:0}
.rule{width:90px;height:7px;background:#952926;flex:none}
.cta{display:flex;align-items:center;gap:18px}
img{display:block}
.phone{border-radius:56px;border:3px solid #3F3F41;background:#161517;padding:14px;box-shadow:0 30px 80px rgba(0,0,0,.55)}
.phone .scr{border-radius:44px;overflow:hidden}
"""
def page(w,h,L,body,css):
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{BASE.replace("LSIZE",str(L))}html,body{{width:{w}px;height:{h}px}}{css}</style></head><body>{body}</body></html>'
URL="biggysmallzspitmasters.co.za"
T={}
# A · the site on a phone
def phoneA(w,h,story):
    ph_w = 440 if not story else 540
    L = 104 if not story else 128
    return page(w,h,L,f"""
<div class="glow"></div>
<div class="phone ph"><div class="scr"><img src="site-mobile.png" style="width:{ph_w}px"></div></div>
<div class="p"><img class="badge" src="lockup-white.svg"><div class="s">The new website</div><h1 class="l">Now<br>serving<br>online.</h1>
<div class="mi">Spitbraai to 7 courses, brought to wherever your table is.</div>
<div class="sp"></div>
<div class="cta s"><span class="rule"></span>Book a date</div><div class="s url">{URL}</div></div>""",
f""".glow{{position:absolute;inset:0;background:radial-gradient(circle at {'80% 60%' if not story else '50% 85%'},rgba(149,41,38,.38),rgba(22,21,23,0) 55%)}}
.url{{letter-spacing:.04em;color:#F4EFE6;margin-top:-10px}}
.p{{position:absolute;{'left:72px;top:72px;bottom:80px;width:460px' if not story else 'left:80px;right:80px;top:230px;height:760px'};display:flex;flex-direction:column;gap:26px}}
.sp{{flex:1}}
.badge{{width:{'170' if not story else '190'}px;margin-bottom:6px}}
.ph{{position:absolute;{'left:566px;top:200px' if not story else 'left:255px;top:1060px'}}}""")
# B · the carve, full bleed
def carveB(w,h,story):
    ph = 780 if not story else 1240
    return page(w,h,62,f"""
<div class="ph"></div><div class="fade"></div>
<div class="p"><div class="s">The new website is live</div><h1 class="l">{URL}</h1>
<div class="m">See the events. Check the menu. Book your date.</div>
<div class="row"><div class="cta s"><span class="rule"></span>Link in bio</div></div></div>
<img class="b" src="lockup-white.svg">""",
f""".ph{{position:absolute;left:0;top:0;width:{w}px;height:{ph}px;background:url(carve.jpg) center 40%/cover}}
.fade{{position:absolute;left:0;right:0;top:{ph-260}px;height:260px;background:linear-gradient(rgba(22,21,23,0),#161517)}}
.p{{position:absolute;left:72px;right:72px;top:{ph+20}px;display:flex;flex-direction:column;gap:24px}}
.l{{letter-spacing:.005em;white-space:nowrap}}
.b{{position:absolute;right:64px;bottom:{'64' if not story else '280'}px;width:190px}}
.row{{margin-top:12px}}""")
T["launch-A-phone-1080x1350"]=(1080,1350,phoneA(1080,1350,False))
T["launch-A-phone-story-1080x1920"]=(1080,1920,phoneA(1080,1920,True))
T["launch-B-carve-1080x1350"]=(1080,1350,carveB(1080,1350,False))
T["launch-B-carve-story-1080x1920"]=(1080,1920,carveB(1080,1920,True))
if __name__=="__main__":
    os.makedirs(os.path.join(H,"launch"),exist_ok=True)
    with sync_playwright() as p:
        b=p.chromium.launch()
        for n,(w,h,html) in T.items():
            open(os.path.join(H,"_l.html"),"w").write(html)
            pg=b.new_page(viewport={"width":w,"height":h});pg.goto("file://"+os.path.join(H,"_l.html"));pg.wait_for_timeout(600)
            # overflow check: headline must fit its box
            print(n, pg.evaluate("(()=>{const l=document.querySelector('.l');const r=l.getBoundingClientRect();return [Math.round(r.right),l.scrollWidth>l.clientWidth]})()"))
            pg.screenshot(path=os.path.join(H,"launch",n+".png"));pg.close()
        b.close()
    os.remove(os.path.join(H,"_l.html"))
