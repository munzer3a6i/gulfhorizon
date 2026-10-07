#!/usr/bin/env python3
"""Assemble base64 chunk files (<name>.<idx>.b64) into a binary file.
Usage: assemble-chunks.py <chunk_dir> <name> <out_path> <expected_total_b64_len>
"""
import base64, glob, os, re, sys

chunk_dir, name, out_path, expected = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
parts = []
for p in glob.glob(os.path.join(chunk_dir, f"{name}.*.b64")):
    m = re.search(r"\.(\d+)\.b64$", p)
    parts.append((int(m.group(1)), p))
parts.sort()
idxs = [i for i, _ in parts]
if idxs != list(range(len(idxs))):
    sys.exit(f"missing chunks: have {idxs}")
data = "".join(open(p).read().strip() for _, p in parts)
if len(data) != expected:
    sys.exit(f"length mismatch: got {len(data)} expected {expected}")
raw = base64.b64decode(data)
os.makedirs(os.path.dirname(out_path), exist_ok=True)
open(out_path, "wb").write(raw)
print(f"wrote {out_path} ({len(raw)} bytes)")
