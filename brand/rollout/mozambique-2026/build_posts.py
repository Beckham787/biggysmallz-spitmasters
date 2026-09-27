"""Mozambique 2026 — feed-post series in the "03 OCT" layout TK picked.
Facts: festival's 2026 poster/caption (3 Oct, 12h00, Campus da UEM, Maputo;
tickets arena.co.mz; "um mestre do fogo" is the festival's own caption)."""
from playwright.sync_api import sync_playwright
import os
H=os.path.dirname(os.path.abspath(__file__))
BASE=open(os.path.join(H,"launch.py")).read().split('BASE = """')[1].split('"""')[0]
EB="Mozambique Barbecue Festival · 3 October · Campus da UEM"
def post(big, small, line, photo, pos, L=300, wide=False):
    head = f'<h1 class="l">{big}<span class="mo">{small}</span></h1>'
    col = f'<div class="col"><div class="m">{line}</div><div class="cta s"><span class="rule"></span>Tickets · arena.co.mz</div></div>'
    inner = (head + col) if not wide else head
    after = '' if not wide else col
    css = f""".ph{{position:absolute;left:0;top:600px;width:1080px;height:750px;background:url({photo}) {pos}/cover}}
.top{{position:absolute;left:64px;right:64px;top:64px;display:flex;flex-direction:column;gap:26px}}
.eb{{color:#F4EFE6}}
.row{{display:flex;gap:40px;align-items:flex-start}}
.l{{line-height:.82;letter-spacing:-.01em}}.mo{{display:block;font-size:{'.42em' if not wide else '1em'};line-height:1;letter-spacing:.04em}}
.col{{display:flex;flex-direction:column;gap:28px;width:{'420px' if not wide else '660px'};flex:none;padding-top:14px}}.cta{{white-space:nowrap}}
.b{{width:150px;position:absolute;right:0;top:{'330' if not wide else '300'}px}}"""
    body=f"""<div class="ph"></div><div class="top"><div class="s eb">{EB}</div><div class="row">{inner}</div>{after}<img class="b" src="lockup-white.svg"></div>"""
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{BASE.replace("LSIZE",str(L))}html,body{{width:1080px;height:1350px}}{css}</style></head><body>{body}</body></html>'
T={
 "mozambique-post-1-five-years":post("05","Years","Every October since 2022, on the coals in Maputo.","moz-crew.jpg","center 40%"),
 "mozambique-post-2-12h00":post("12","H00","From midday. Come hungry.","moz-field.jpg","center 60%"),
 "mozambique-post-3-mestre":post("Mestre","do fogo",'“A master of fire.” The festival’s words, not ours.',"moz-slice.jpg","center 30%",L=136,wide=True),
}
if __name__=="__main__":
    os.makedirs(os.path.join(H,"moz"),exist_ok=True)
    with sync_playwright() as p:
        b=p.chromium.launch()
        for n,html in T.items():
            open(os.path.join(H,"_m.html"),"w").write(html)
            pg=b.new_page(viewport={"width":1080,"height":1350});pg.goto("file://"+os.path.join(H,"_m.html"));pg.wait_for_timeout(700)
            print(n,pg.evaluate("(()=>{const o=[];document.querySelectorAll('.l,.m,.s,.b').forEach(e=>{const r=e.getBoundingClientRect();if(r.right>1040||r.bottom>600&&!e.classList.contains('ph'))o.push(e.className+':'+Math.round(r.right)+','+Math.round(r.bottom))});return o})()"))
            pg.screenshot(path=os.path.join(H,"moz",n+"-1080x1350.png"));pg.close()
        b.close()
    os.remove(os.path.join(H,"_m.html"))
