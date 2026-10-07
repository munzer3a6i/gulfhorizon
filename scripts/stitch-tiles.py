#!/usr/bin/env python3
"""Stitch Figma screenshot tiles (saved by the harness as mcp-Figma-blob-*.png) into one image.
Usage: stitch-tiles.py <out_path> <W> <H> '<json [[x,y,w,h],...]>' <since_epoch> [quality]
Tiles are matched to regions by their exact pixel size (the export script makes sizes unique).
"""
import glob, json, os, sys
from PIL import Image

out, W, H, regions, since = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), json.loads(sys.argv[4]), float(sys.argv[5])
quality = int(sys.argv[6]) if len(sys.argv) > 6 else 86
blobs = [p for p in glob.glob('/root/.claude/projects/-home-user-gulfhorizon/*/tool-results/mcp-Figma-blob-*.png') if os.path.getmtime(p) >= since]
by_size = {}
for p in blobs:
    im = Image.open(p)
    by_size.setdefault(im.size, []).append(p)
canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
missing = []
for x, y, w, h in regions:
    c = by_size.get((w, h), [])
    if len(c) != 1:
        missing.append(((x, y, w, h), len(c)))
        continue
    canvas.paste(Image.open(c[0]).convert('RGBA'), (x, y))
if missing:
    sys.exit(f'unmatched regions: {missing}')
os.makedirs(os.path.dirname(out), exist_ok=True)
if out.endswith(('.jpg', '.jpeg')):
    canvas.convert('RGB').save(out, quality=quality, optimize=True, progressive=True)
else:
    canvas.save(out, optimize=True)
print(out, canvas.size, os.path.getsize(out), 'bytes')
