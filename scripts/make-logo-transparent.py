"""Make the OK monogram transparent.

Reads public/logo.png (flat RGB, white bg) and writes:
  - public/logo.png       - dark ink "OK" on transparent bg
  - public/logo-light.png - white "OK" on transparent bg (for dark surfaces)

Uses luminance as alpha so anti-aliased edges blend cleanly into any background
(no white halo). Source pixels that are pure white become fully transparent;
pure-dark pixels become fully opaque ink/white.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "logo.png"
OUT_DARK = ROOT / "public" / "logo.png"
OUT_LIGHT = ROOT / "public" / "logo-light.png"

INK = (15, 23, 42)        # --ink #0F172A
WHITE = (255, 255, 255)

def build(target_rgb):
    src = Image.open(SRC).convert("RGB")
    w, h = src.size
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sp = src.load()
    op = out.load()
    r0, g0, b0 = target_rgb
    for y in range(h):
        for x in range(w):
            r, g, b = sp[x, y]
            # luminance 0..255 - higher = closer to white = more transparent
            lum = (r * 299 + g * 587 + b * 114) // 1000
            alpha = 255 - lum
            # Hard threshold: snap near-white pixels to fully transparent so
            # JPEG-like noise in the source white area does not show as faint
            # speckles on dark backgrounds.
            if alpha < 24:
                continue
            if alpha > 232:
                alpha = 255
            op[x, y] = (r0, g0, b0, alpha)
    return out

print(f"reading  {SRC}")
build(INK).save(OUT_DARK, "PNG", optimize=True)
print(f"wrote    {OUT_DARK} (dark ink, transparent)")
build(WHITE).save(OUT_LIGHT, "PNG", optimize=True)
print(f"wrote    {OUT_LIGHT} (white, transparent)")
