"""Rebuild everything in brand-identity/ from clean, in order.
   python3 _build/build_all.py
Needs: Python 3.11+, potrace (CLI), and these pip packages:
   numpy scipy scikit-image pillow svgelements skia-pathops fonttools brotli playwright
   then:  python3 -m playwright install chromium
Every file outside _build/ is generated. Hand-editing one means the next
rebuild silently reverts it: change the scripts instead.
"""
import os, sys, subprocess, shutil, json
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, "..")
def run(script):
    print("·", script); subprocess.run([sys.executable, os.path.join(HERE, script)], check=True, stdout=subprocess.DEVNULL)
for s in ["trace.py", "straighten.py", "build_svg.py", "build_raster.py", "build_tests.py", "build_guide.py"]:
    run(s)
# bios: the copy lives with the verbal identity (brand/_build/bios.py); the spec wants it here too
bios_script = os.path.join(ROOT, "..", "brand", "_build", "bios.py")
subprocess.run([sys.executable, bios_script], check=True, stdout=subprocess.DEVNULL)
shutil.copyfile(os.path.join(ROOT, "..", "brand", "bios.md"), os.path.join(ROOT, "bios.md"))
os.makedirs(os.path.join(ROOT, "svg", "_working"), exist_ok=True)
open(os.path.join(ROOT, "svg", "_working", "README.txt"), "w").write(
 "DO NOT SHIP anything from this folder.\n\n"
 "The spec keeps live-text editing copies here. This identity has none: the lettering\n"
 "is Martin's own, traced from the 2017 logo, not set in a font. To change a shape,\n"
 "edit the scripts in _build/ (trace.py, straighten.py, geom.py) and rebuild.\n")
run("write_readme.py")
print("done")
