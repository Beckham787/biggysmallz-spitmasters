"""Playwright + Chromium renderer (the studio pipeline): SVG/HTML -> PNG at the
exact pixel size, transparent where asked."""
import os, base64
from playwright.sync_api import sync_playwright
_pw = None; _browser = None
def browser():
    global _pw, _browser
    if _browser is None:
        _pw = sync_playwright().start(); _browser = _pw.chromium.launch()
    return _browser
def close():
    global _pw, _browser
    if _browser: _browser.close(); _pw.stop(); _browser = None
def html_to_png(html, w, h, out, transparent=False, workdir=None):
    """Write html next to its assets and goto() it (setContent can't load file://)."""
    page = browser().new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
    wd = workdir or os.path.dirname(os.path.abspath(out))
    tmp = os.path.join(wd, "_render_tmp.html"); open(tmp, "w").write(html)
    page.goto("file://" + tmp); page.wait_for_timeout(50)
    page.screenshot(path=out, omit_background=transparent, clip={"x": 0, "y": 0, "width": w, "height": h})
    page.close(); os.remove(tmp)
def svg_box(svg_text):
    import re
    m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg_text); return float(m.group(1)), float(m.group(2))
def place(svg_text, w, h, bg=None, pad=0.0, fit="contain", rounded=0, circle=False):
    """HTML page that draws one svg centred in w x h with optional background."""
    b = f"background:{bg};" if bg else "background:transparent;"
    shape = "border-radius:50%;" if circle else (f"border-radius:{rounded}px;" if rounded else "")
    inner = svg_text.replace("<svg ", '<svg style="width:100%;height:100%;display:block" preserveAspectRatio="xMidYMid meet" ', 1)
    return (f'<!doctype html><html><head><style>html,body{{margin:0;padding:0;background:transparent}}'
            f'#f{{width:{w}px;height:{h}px;{b}{shape}display:flex;align-items:center;justify-content:center;overflow:hidden}}'
            f'#m{{width:{w*(1-2*pad)}px;height:{h*(1-2*pad)}px}}</style></head><body><div id="f"><div id="m">{inner}</div></div></body></html>')
