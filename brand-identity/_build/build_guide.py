"""Step 6: brand-guide.html — one self-contained file. No network: fonts are
subset and embedded as base64 woff2, every mark is inline SVG."""
import os, sys, io, re, json, base64
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from fontTools.ttLib import TTFont
from fontTools import subset
ROOT = os.path.join(HERE, "..")
SVG = lambda n: re.sub(r"<!--.*?-->", "", open(os.path.join(ROOT, "svg", n + ".svg")).read())
SYMBOLS = {}
def inline(n, w=None, h=None, style=""):
    """Each mark is embedded once as a <symbol>; every use references it."""
    s = SVG(n)
    vb = re.search(r'viewBox="([^"]+)"', s).group(1)
    if n not in SYMBOLS:
        inner = re.sub(r"^<svg[^>]*>", "", s.strip()).replace("</svg>", "")
        SYMBOLS[n] = f'<symbol id="s-{n}" viewBox="{vb}">{inner}</symbol>'
    size = (f"width:{w}px;" if w else "") + (f"height:{h}px;" if h else "")
    return (f'<svg role="img" aria-label="{n}" viewBox="{vb}" style="{size}display:block;max-width:100%;height:auto;{style}">'
            f'<use href="#s-{n}"/></svg>')

# ---- the numbers the guide states, in one place, so words and artwork agree
MIN = {  # smallest size each cut holds, read off _build/tests/reduction.png; print = where the
         # 5th-percentile ink detail reaches PRINT_FLOOR_MM (production.json)
    "lockup": 80, "mark": 48, "mark-small": 16, "wordmark": 80, "wordmark-wide": 150}
PRINT_FLOOR_MM = 0.2
prod = json.load(open(os.path.join(HERE, "tests", "production.json")))
MIN_MM = {k: max(10, round(PRINT_FLOOR_MM / (prod[k]["ink"]["p5_pct"] / 100))) for k in MIN}
contrast = json.load(open(os.path.join(HERE, "tests", "contrast.json")))
json.dump({"min_px": MIN, "min_mm": MIN_MM, "print_floor_mm": PRINT_FLOOR_MM}, open(os.path.join(HERE, "tests", "minimums.json"), "w"), indent=1)

# ---- fonts: subset to the characters the page uses, base64 woff2, pinned timestamps
def font_face(fname, family, weight, style="normal", text=""):
    f = TTFont(os.path.join(HERE, "fonts", fname), recalcTimestamp=False)
    opts = subset.Options(); opts.flavor = "woff2"; opts.layout_features = ["kern", "liga"]
    sub = subset.Subsetter(opts); sub.populate(text=text); sub.subset(f)
    f["head"].modified = f["head"].created = 3600 * 24 * 365 * 100   # pinned: reproducible bytes
    buf = io.BytesIO(); f.flavor = "woff2"; f.save(buf, reorderTables=False)
    return (f"@font-face{{font-family:'{family}';font-weight:{weight};font-style:{style};font-display:block;"
            f"src:url(data:font/woff2;base64,{base64.b64encode(buf.getvalue()).decode()}) format('woff2')}}")

RED, CHAR, WHITE, BLACK, BONE = "#952926", "#3F3F41", "#FFFFFF", "#161517", "#F4EFE6"
never = [
  ("Stretched", 'width:66%;transform:scaleX(1.45);transform-origin:left center', "lockup-charcoal", "Never stretch or squash it. Scale it evenly, or not at all."),
  ("Recoloured", 'filter:hue-rotate(160deg) saturate(1.4)', "lockup-charcoal", "The ribbon is Spitmasters Red. Always. No other colour."),
  ("Shadowed", 'filter:drop-shadow(10px 12px 6px rgba(0,0,0,.55))', "lockup-charcoal", "No shadows, glows, bevels or outlines. It's flat, like the embroidery on the jacket."),
  ("The favicon cut as the logo", '', "mark-small-charcoal", "The blank ribbon is only for 32px and below. At any size where the word can be read, use the mark."),
]
cuts = [
  ("lockup", "The badge", "The primary logo. The Instagram profile, the jacket, menus, proposals, signage, anything that has room.", MIN["lockup"]),
  ("mark", "The mark", "The badge without the name, for when the name is already said nearby, or the space is small: the WhatsApp avatar, a stamp on a box, a sleeve.", MIN["mark"]),
  ("wordmark", "The wordmark", "His own letters set straight, over the ribbon. For a letterhead or a page header, where the arch would waste space.", MIN["wordmark"]),
  ("wordmark-wide", "The wide wordmark", "One line, for short wide spaces: the site header, an email signature, a banner.", MIN["wordmark-wide"]),
  ("mark-small", "The favicon cut", "The ribbon without its lettering; in the favicon it is cropped square around the tools, so the ribbon runs edge to edge. <b>Only for 32px and below</b>, where the lettering turns to noise anyway. Never the logo.", MIN["mark-small"]),
]
red_sizes = [150, 80, 48, 32, 24, 16]
def reduction_row(n, bg):
    cells = "".join(f'<figure style="width:{max(s,36)}px">{inline(n, w=s)}<figcaption>{s}</figcaption></figure>' for s in red_sizes)
    return f'<div class="red" style="background:{bg}">{cells}</div>'
# clear space: drawn in the lockup's own units, x = measured height of the ribbon lettering
import geom
_lb = geom.L["ribbon_text"].bounds; X = _lb[3] - _lb[1]
inline("lockup-charcoal")
_vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', SVG("lockup-charcoal")).group(1).split()]
LW, LH = _vb[2], _vb[3]
CLEAR = (f'<svg viewBox="{-X-20:.0f} {-X-20:.0f} {LW+2*X+40:.0f} {LH+2*X+40:.0f}" style="width:100%;max-width:560px;height:auto;display:block" role="img" aria-label="clear space">'
         f'<rect x="{-X:.1f}" y="{-X:.1f}" width="{LW+2*X:.1f}" height="{LH+2*X:.1f}" fill="none" stroke="{RED}" stroke-width="4" stroke-dasharray="18 12"/>'
         f'<rect x="0" y="0" width="{LW:.1f}" height="{LH:.1f}" fill="none" stroke="#bbb" stroke-width="3"/>'
         f'<use href="#s-lockup-charcoal" width="{LW:.1f}" height="{LH:.1f}"/>'
         f'<rect x="{-X:.1f}" y="{-X:.1f}" width="{X:.1f}" height="{X:.1f}" fill="{RED}" opacity=".18"/>'
         f'<text x="{-X/2:.1f}" y="{-X/2+22:.1f}" font-family="Oswald" font-size="64" fill="{RED}" text-anchor="middle">x</text></svg>')
pal = [("Spitmasters Red", RED, "Sampled from the 2017 logo. The ribbon, the rules, one accent per page.", "10%"),
       ("Charcoal", CHAR, "Sampled from the 2017 logo. The name, the tools, text on light grounds.", "25%"),
       ("Jacket Black", BLACK, "After his chef jacket. The dark ground: nights, the fire, the site.", "25%"),
       ("Bone", BONE, "A warm paper for plated menus and proposals. The quiet ground.", "20%"),
       ("White", WHITE, "The logo's own ground, and the ribbon lettering.", "20%")]
def cr(a, b):
    for p in contrast:
        if {p["a"], p["b"]} == {a, b}: return p
used_pairs = [("Charcoal", "White"), ("Charcoal", "Bone"), ("White", "Jacket Black"), ("Jacket Black", "Bone"), ("Spitmasters Red", "White"), ("Spitmasters Red", "Bone"), ("Spitmasters Red", "Jacket Black"), ("Spitmasters Red", "Charcoal")]
HEX = {n: h for n, h, _, _ in pal}
pair_rows = ""
for a, b in used_pairs:
    p = cr(a, b); ok = p["body_text"]
    fg, bg = (HEX[a], HEX[b])
    verdict = "text ✓" if ok else ("graphics only ✗ text" if p["large_text"] is False else "large text only")
    pair_rows += f'<tr><td><span class="sw" style="background:{bg};color:{fg}">Aa</span></td><td>{a} on {b}</td><td class="n">{p["ratio"]:.2f}:1</td><td>{verdict}</td></tr>'

body = f"""
<header class="hero"><div class="wrap">{inline('lockup-white', style='width:min(560px,100%)')}
<p class="eyebrow">Brand guide · v1 · 2026</p><h1>Get in my belly.</h1>
<p class="lede">Biggy Smallz Spitmasters: spitbraai made personal, brought to wherever your table is.</p></div></header>
<main class="wrap">
<section><h2>1 · The mark, and what it means</h2>
<p>This is the badge Martin "Biggy" Mhlongo has worn since 2017, on his chef jacket, on camera, and at the fire. It isn't a new logo. It's his, redrawn cleanly so it can be used anywhere, at any size.</p>
<ul><li><b>His name, arched over the top</b>: the business is a person.</li>
<li><b>The braai fork and the grill spatula, crossed</b>: the tools of the fire.</li>
<li><b>The ribbon: SPITMASTERS</b>: what he's known for.</li>
<li><b>EST. 2017</b>: the year it started.</li></ul>
<div class="pair"><div class="tile light">{inline('lockup-charcoal')}</div><div class="tile dark">{inline('lockup-white')}</div></div>
<p class="note">Redrawn from the only file that exists (the site's 1600px logo). No original vector or designer is known. The speckle texture inside the ribbon lettering has been cleaned out, and the fork's needle tips are rounded off for stitching. Nothing else was changed.</p></section>

<section><h2>2 · The cuts, and when to use each</h2>
{"".join(f'<div class="cut"><div class="tile light">{inline(n+"-charcoal")}</div><div><h3>{t}</h3><p>{d}</p><p class="min">' + ('Only at 16–32px on screen · not for print' if n=='mark-small' else f'Smallest: {m}px on screen · {MIN_MM[n]}mm in print') + '</p></div></div>' for n,t,d,m in cuts)}
</section>

<section><h2>3 · The reduction test</h2>
<p>Every cut, drawn below at 150, 80, 48, 32, 24 and 16px, which is where browser tabs and WhatsApp lists actually show it. This is why the smallest sizes above are what they are.</p>
{"".join(f'<h3>{t}</h3>'+reduction_row(n+'-charcoal', WHITE)+reduction_row(n+'-white', BLACK) for n,t,_,_ in cuts)}
<p>The badge's name is readable down to 80px. The mark's lettering reads to 48px. Below that, only the ribbon and the crossed tools survive, which is exactly what the favicon cut keeps.</p></section>

<section><h2>4 · Clear space and minimum size</h2>
<p>Keep a clear margin around every cut equal to <b>the height of the ribbon</b>'s lettering, <b>x</b>. The dashed red line is the edge of the clear space. The grey line is the artwork's own edge. Nothing else goes inside it: no text, no edge of the page, no other logo.</p>
<div class="tile light">{CLEAR}</div>
<table><tr><th>Cut</th><th>Screen</th><th>Print</th></tr>
{"".join(f'<tr><td>{t}</td><td class="n">{MIN[n]}px</td><td class="n">{MIN_MM[n]}mm</td></tr>' for n,t,_,_ in cuts if n!='mark-small')}<tr><td>The favicon cut</td><td class="n">16–32px only</td><td class="n">not for print</td></tr></table>
<p class="note">Print minimums are where the finest detail (the fork's tines, the EST. 2017 lettering) reaches {PRINT_FLOOR_MM}mm. <b>Embroidery:</b> the fork's tines and the EST. 2017 lettering are thinner than the 1.5%-of-width stitching guideline at any size. It's already stitched well on the jacket, so have the digitiser confirm before stitching it smaller than that, and use the mark for small embroidery.</p></section>

<section><h2>5 · Colour</h2>
<div class="swatches">{"".join(f'<div class="swatch"><div class="chip" style="background:{h}"></div><b>{n}</b><code>{h}</code><span>{d}</span><span class="ratio">about {r} of a page</span></div>' for n,h,d,r in pal)}</div>
<h3>Every pairing, measured</h3>
<table class="pairs">{pair_rows}</table>
<p class="note">Red is never text on Jacket Black or Charcoal: both measure under 3:1. The ribbon works on a dark ground because its lettering is white on red (8.01:1).</p></section>

<section><h2>6 · Type</h2>
<div class="type"><p class="disp">GET IN MY BELLY.</p><p class="meta">Oswald · 600 and 700 · capitals · headlines, menus, signage. The loud voice, cut from the same cloth as the ribbon's lettering.</p>
<p class="txt">From spitbraai to 7 courses, brought to wherever your table is. Weddings, milestone birthdays, site functions and festivals, cooked over the fire and plated for your guests.</p>
<p class="txt"><i>Yours in flavour,</i><br>Biggy</p>
<p class="meta">Source Serif 4 · 400, italic and 600 · everything you read: menus, proposals, the site. The quiet voice.</p></div></section>

<section><h2>7 · Never</h2>
<div class="never">{"".join(f'<figure><div class="tile light nv"><div style="{st}">{inline(n)}</div></div><figcaption><b>✗ {t}.</b> {d}</figcaption></figure>' for t,st,n,d in never)}</div></section>
</main><footer class="wrap"><p>Biggy Smallz Spitmasters · brand guide · built by TK Studio from brand-identity/_build/. Files: svg/ (source of truth), png/, social/, favicon/. Yours in flavour.</p></footer>
"""
chars = re.sub(r"<[^>]+>", " ", body) + " GET IN MY BELLY.,0123456789·–—'\"()%:✓✗"
chars = chars + chars.upper() + chars.lower()   # CSS text-transform needs both cases
faces = "".join([
    font_face("oswald-latin-600-normal.woff2", "Oswald", 600, text=chars),
    font_face("oswald-latin-700-normal.woff2", "Oswald", 700, text=chars),
    font_face("source-serif-4-latin-400-normal.woff2", "Source Serif 4", 400, text=chars),
    font_face("source-serif-4-latin-400-italic.woff2", "Source Serif 4", 400, "italic", text=chars),
    font_face("source-serif-4-latin-600-normal.woff2", "Source Serif 4", 600, text=chars)])
css = f"""{faces}
:root{{--red:{RED};--char:{CHAR};--black:{BLACK};--bone:{BONE}}}
*{{box-sizing:border-box}}html{{-webkit-text-size-adjust:100%}}
body{{margin:0;background:var(--bone);color:var(--char);font:17px/1.55 'Source Serif 4',Georgia,serif}}
.wrap{{max-width:980px;margin:0 auto;padding:0 20px}}
h1,h2,h3,.disp,.eyebrow,th{{font-family:Oswald,'Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.02em;color:var(--black)}}
.hero{{background:var(--black);color:#fff;padding:48px 0 40px}}.hero h1{{color:#fff;font-size:clamp(40px,9vw,84px);line-height:1;margin:18px 0 8px}}
.eyebrow{{color:#c9bfb4;font-size:14px;margin:28px 0 0}}.lede{{font-size:20px;max-width:34em;color:#eee;margin:0}}
section{{padding:40px 0;border-bottom:1px solid #d8d0c4}}h2{{font-size:28px;margin:0 0 12px}}h3{{font-size:18px;margin:22px 0 8px}}
.tile{{padding:24px;border-radius:6px;display:flex;align-items:center;justify-content:center}}.light{{background:#fff}}.dark{{background:var(--black)}}
.pair{{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}}
.cut{{display:grid;grid-template-columns:minmax(0,260px) 1fr;gap:20px;align-items:center;margin:16px 0}}
.min{{font-family:Oswald,sans-serif;font-size:14px;color:var(--red);text-transform:uppercase}}
.red{{display:flex;align-items:center;gap:18px;padding:14px;flex-wrap:wrap;border-radius:4px;margin:4px 0}}
.red figure{{margin:0;display:flex;flex-direction:column;align-items:center;gap:4px}}.red figcaption{{font:12px Oswald,sans-serif;color:#8a8580}}
.clear .cs{{outline:{"{"}0{"}"};position:relative;padding:0;max-width:520px;width:100%}}
table{{border-collapse:collapse;width:100%;margin:14px 0;font-size:15px}}td,th{{padding:8px 6px;border-bottom:1px solid #e3dbd0;text-align:left}}.n{{font-variant-numeric:tabular-nums}}
.sw{{display:inline-block;width:46px;padding:4px 0;text-align:center;font-family:Oswald,sans-serif;border:1px solid #ddd;border-radius:3px}}
.swatches{{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px}}.swatch{{display:flex;flex-direction:column;gap:3px;font-size:14px}}
.chip{{height:74px;border-radius:6px;border:1px solid #d8d0c4}}code{{font-size:13px}}.ratio{{font-family:Oswald,sans-serif;text-transform:uppercase;font-size:12px;color:#8a8580}}
.disp{{font-size:clamp(34px,8vw,64px);font-weight:700;margin:0;color:var(--red)}}.meta{{font-family:Oswald,sans-serif;text-transform:uppercase;font-size:13px;color:#8a8580}}.txt{{font-size:19px;max-width:34em}}
.never{{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}}.never figure{{margin:0}}.nv{{height:170px;overflow:hidden}}.nv>div{{width:100%}}
figcaption{{font-size:14px;margin-top:6px}}.note{{font-size:14px;color:#6d665f}}footer{{padding:30px 20px 60px;font-size:13px;color:#8a8580}}
@media (max-width:560px){{.pair,.cut{{grid-template-columns:1fr}}body{{font-size:16px}}}}
"""
# clear-space box: drawn from the ribbon lettering's measured height, as a fraction of the badge
html = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Biggy Smallz Spitmasters — brand guide</title><style>{css}</style></head><body><svg width="0" height="0" style="position:absolute" aria-hidden="true">{"".join(SYMBOLS[k] for k in sorted(SYMBOLS))}</svg>{body}</body></html>\n'
open(os.path.join(ROOT, "brand-guide.html"), "w").write(html)
print("guide", round(len(html)/1024), "KB")
