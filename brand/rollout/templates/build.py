"""Biggy Smallz Spitmasters — Stage 7 rollout templates.
Every template: the locked palette only, Oswald + Source Serif 4, real photos
and real copy (Martin's own captions from lib/case-studies.ts and the site).
Rendered by Chromium at the platform's exact canvas size.
"""
from playwright.sync_api import sync_playwright
import os
H = os.path.dirname(os.path.abspath(__file__))
PAL = {"black": "#161517", "char": "#3F3F41", "red": "#952926", "bone": "#F4EFE6", "white": "#FFFFFF"}
BASE = """@font-face{font-family:Oswald;font-weight:700;src:url(oswald-latin-700-normal.woff2)}
@font-face{font-family:Oswald;font-weight:600;src:url(oswald-latin-600-normal.woff2)}
@font-face{font-family:SS4;font-weight:400;src:url(source-serif-4-latin-400-normal.woff2)}
@font-face{font-family:SS4;font-style:italic;src:url(source-serif-4-latin-400-italic.woff2)}
html,body{margin:0;overflow:hidden}
/* the three sizes every template uses: S (labels, CTA), M (reading), L (headline) */
.s{font:600 26px/1.2 Oswald;letter-spacing:.14em;text-transform:uppercase}
.m{font:400 34px/1.35 SS4}.mi{font:italic 400 34px/1.35 SS4}
.l{font:700 68px/.98 Oswald;text-transform:uppercase;margin:0}
.rule{width:90px;height:7px;background:#952926}
img{display:block}
"""
def page(w, h, body, css):
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{BASE}html,body{{width:{w}px;height:{h}px}}{css}</style></head><body>{body}</body></html>'

T = {}
# 1 · SHOWCASE — a recent event (dark)
T["01-showcase-wedding-1080x1350"] = (1080, 1350, page(1080, 1350, """
<div class="ph"></div>
<div class="p"><div class="s">Recently</div><h1 class="l">Wedding · Moyres Venue</h1>
<div class="mi">“A wedding as beautiful as the setting deserved a table to match.”</div>
<div class="cta s"><span class="rule"></span>See the full event · link in bio</div></div>
<img class="b" src="lockup-white.svg">""", """
body{background:#161517;color:#fff}
.ph{position:absolute;left:0;top:0;width:1080px;height:780px;background:url(wedding.png) center 30%/cover}
.p{position:absolute;left:72px;right:330px;top:830px;display:flex;flex-direction:column;gap:22px}
.mi{color:#F4EFE6}.cta{display:flex;align-items:center;gap:18px;margin-top:10px}
.b{position:absolute;right:64px;bottom:64px;width:190px}"""))
# 2 · SHOWCASE — a plated course (the quiet, menu-card voice, on Bone)
T["02-showcase-menu-1080x1350"] = (1080, 1350, page(1080, 1350, """
<div class="ph"></div>
<div class="p"><div class="s">On the menu · 7-year anniversary dinner</div><h1 class="l">Reverse-seared rib eye</h1>
<div class="m">Fondant potato, broccolini, bok choy, red wine jus.</div>
<div class="cta s"><span class="rule"></span>Book a date · link in bio</div></div>
<img class="b" src="lockup-charcoal.svg">""", """
body{background:#F4EFE6;color:#161517}
.ph{position:absolute;left:72px;top:72px;width:936px;height:700px;background:url(ribeye.png) center 55%/cover}
.p{position:absolute;left:72px;right:330px;top:830px;display:flex;flex-direction:column;gap:22px}
.s{color:#3F3F41}.m{color:#3F3F41}.cta{display:flex;align-items:center;gap:18px;margin-top:10px}
.b{position:absolute;right:64px;bottom:64px;width:190px}"""))
# 3 · BEHIND THE SCENES — the crew (dark, full photo)
T["03-behind-the-scenes-1080x1350"] = (1080, 1350, page(1080, 1350, """
<div class="ph"></div><div class="fade"></div>
<div class="p"><div class="s">Behind the scenes</div><h1 class="l">The crew,<br>back of house</h1>
<div class="mi">Chef @biggy013 and team.</div></div>
<img class="b" src="lockup-white.svg">""", """
body{background:#161517;color:#fff}
.ph{position:absolute;inset:0;bottom:300px;background:url(crew.jpg) center 35%/cover}
.fade{position:absolute;left:0;right:0;top:760px;height:300px;background:linear-gradient(rgba(22,21,23,0),#161517)}
.p{position:absolute;left:72px;right:330px;bottom:72px;display:flex;flex-direction:column;gap:22px}
.mi{color:#F4EFE6}
.b{position:absolute;right:64px;bottom:64px;width:190px}"""))
# 4 · PROMO — book a date (Martin's own line, on a red band)
T["04-promo-book-a-date-1080x1350"] = (1080, 1350, page(1080, 1350, """
<div class="ph"></div>
<div class="band"><h1 class="l">Site braais. Travel cooks.<br>Noma yini, we got you!</h1></div>
<div class="p"><div class="m">Spitbraai to 7 courses, brought to wherever your table is.</div>
<div class="cta s"><span class="rule"></span>Book a date · biggysmallzspitmasters.co.za</div></div>
<img class="b" src="lockup-white.svg">""", """
body{background:#161517;color:#fff}
.ph{position:absolute;left:0;top:0;width:1080px;height:700px;background:url(carve.jpg) center 45%/cover}
.band{position:absolute;left:0;right:0;top:700px;height:250px;background:#952926;display:flex;align-items:center;padding:0 72px;box-sizing:border-box}
.p{position:absolute;left:72px;right:320px;top:1000px;display:flex;flex-direction:column;gap:26px}
.m{color:#F4EFE6}.cta{display:flex;align-items:center;gap:18px}.rule.w{background:#F4EFE6}
.b{position:absolute;right:64px;bottom:64px;width:190px}"""))
# 5 · FULL REVEAL — the identity on one board
T["05-full-reveal-1080x1350"] = (1080, 1350, page(1080, 1350, """
<div class="top"><img class="badge" src="lockup-charcoal.svg"><div class="pos"><div class="s">The identity</div>
<div class="mi">The “Get in my belly” experience: spitbraai made personal, brought to wherever your table is.</div></div></div>
<div class="row sw"><i style="background:#952926"></i><i style="background:#3F3F41"></i><i style="background:#161517"></i><i style="background:#F4EFE6;outline:2px solid #3F3F41;outline-offset:-2px"></i><i style="background:#FFFFFF;outline:2px solid #3F3F41;outline-offset:-2px"></i></div>
<div class="row ty"><div class="l">Oswald</div><div class="m">Source Serif 4, for everything you read.</div></div>
<div class="row ap"><div class="ph a"></div><div class="ph b2"></div><div class="dk"><img src="lockup-white.svg"></div><div class="cuts"><img src="mark-charcoal.svg"><img class="fav" src="favicon-48.png"></div></div>
""", """
body{background:#F4EFE6;color:#161517}
.top{position:absolute;left:72px;right:72px;top:72px;display:flex;gap:44px;align-items:center}
.badge{width:330px}.pos{display:flex;flex-direction:column;gap:18px}.s{color:#3F3F41}.mi{color:#3F3F41}
.row{position:absolute;left:72px;right:72px}
.sw{top:430px;height:130px;display:flex;gap:14px}.sw i{flex:1;display:block}
.ty{top:600px;display:flex;align-items:baseline;gap:34px}.ty .m{color:#3F3F41}
.ap{top:720px;height:558px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:14px}
.ph{background-size:cover;background-position:center}.a{background-image:url(biggy.jpg);background-position:center 25%}.b2{background-image:url(ribeye.png)}
.dk{background:#161517;display:flex;align-items:center;justify-content:center}.dk img{width:62%}
.cuts{background:#FFFFFF;display:flex;align-items:center;justify-content:space-evenly}.cuts img{width:46%}.cuts .fav{width:48px;image-rendering:auto}"""))
# 6 · LINK SHARE (OG) — Facebook/WhatsApp link preview, 1200x630
T["06-link-share-og-1200x630"] = (1200, 630, page(1200, 630, """
<div class="ph"></div><div class="p"><img src="lockup-white.svg"><h1 class="l">Get in my belly.</h1>
<div class="s">biggysmallzspitmasters.co.za</div></div>""", """
body{background:#161517;color:#fff}
.ph{position:absolute;left:0;top:0;width:600px;height:630px;background:url(biggy.jpg) center 22%/cover}
.p{position:absolute;left:600px;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;text-align:center}
.p img{width:300px}.l{font-size:64px}"""))

if __name__ == "__main__":
    os.makedirs(os.path.join(H, "out"), exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, (w, h, html) in T.items():
            open(os.path.join(H, "_t.html"), "w").write(html)
            pg = b.new_page(viewport={"width": w, "height": h}); pg.goto("file://" + os.path.join(H, "_t.html")); pg.wait_for_timeout(500)
            pg.screenshot(path=os.path.join(H, "out", name + ".png")); pg.close()
        b.close()
    os.remove(os.path.join(H, "_t.html"))
    print(len(T), "templates")
