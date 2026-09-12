"""
build_ico.py — bundle favicon.ico from the individually rendered PNGs.

Each size is rendered natively by render_assets.mjs rather than downscaled
from one image, so the 16px entry keeps the condensed cut's hand-set
proportions instead of inheriting a blurred 48px reduction.

Run after render_assets.mjs:  python build_ico.py
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
FAV = os.path.join(HERE, "..", "favicon")

SIZES = [48, 32, 16]  # largest first — Pillow keys the base image off it

imgs = [Image.open(os.path.join(FAV, f"favicon-{s}.png")).convert("RGBA")
        for s in SIZES]
out = os.path.join(FAV, "favicon.ico")
imgs[0].save(out, format="ICO", sizes=[(s, s) for s in SIZES],
             append_images=imgs[1:])

check = Image.open(out)
print("wrote favicon/favicon.ico —", sorted(check.info["sizes"]))
