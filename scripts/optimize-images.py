#!/usr/bin/env python3
"""Resize + convert source photos into WebP for the landing page.

Sources (kept untouched for re-exports):
  public/assets/img/client/{kids,bliss}/*.jpg
  public/assets/img/hero/*

Outputs:
  public/assets/img/optimized/{kids,bliss,hero}/*.webp

Usage:
  python3 scripts/optimize-images.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets" / "img"

# Wider assets used in shop cards / hero get a higher max width.
WIDE_NAMES = {
    "shop-display.jpg",
    "home-bar.jpg",
    "formal-shop.jpg",
    "dining-gold.jpg",
}


def convert(src: Path, dest: Path, max_width: int, quality: int) -> None:
    with Image.open(src) as im:
        im = im.convert("RGB")
        width, height = im.size
        if width > max_width:
            next_height = int(height * (max_width / width))
            im = im.resize((max_width, next_height), Image.Resampling.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, "WEBP", quality=quality, method=6)
        print(
            f"{src.name:28} {width}x{height} -> {im.size[0]}x{im.size[1]}  "
            f"{src.stat().st_size // 1024}KB -> {dest.stat().st_size // 1024}KB"
        )


def main() -> None:
    jobs = [
        (ROOT / "hero" / "im1.jpg", ROOT / "optimized" / "hero" / "im1.webp", 1600, 78),
    ]

    for shop in ("kids", "bliss"):
        src_dir = ROOT / "client" / shop
        out_dir = ROOT / "optimized" / shop
        for src in sorted(src_dir.glob("*.jpg")):
            max_width = 1200 if src.name in WIDE_NAMES else 900
            jobs.append((src, out_dir / f"{src.stem}.webp", max_width, 76))

    for src, dest, max_width, quality in jobs:
        if not src.exists():
            print(f"skip missing {src}")
            continue
        convert(src, dest, max_width, quality)

    print(f"optimized {len(jobs)} assets -> {ROOT / 'optimized'}")


if __name__ == "__main__":
    main()
