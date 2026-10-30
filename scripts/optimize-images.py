#!/usr/bin/env python3
"""Resize + convert source JPEGs into WebP beside them in client/hero folders.

Sources:
  public/assets/img/client/{kids,bliss}/*.jpg
  public/assets/img/hero/*.jpg

Outputs (same folder):
  *.webp

Usage:
  python3 scripts/optimize-images.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets" / "img"

WIDE_NAMES = {
    "shop-display.jpg",
    "home-bar.jpg",
    "formal-shop.jpg",
    "dining-gold.jpg",
    "im1.jpg",
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
    jobs = []

    hero = ROOT / "hero" / "im1.jpg"
    if hero.exists():
        jobs.append((hero, hero.with_suffix(".webp"), 1600, 78))

    for shop in ("kids", "bliss"):
        src_dir = ROOT / "client" / shop
        for src in sorted(src_dir.glob("*.jpg")):
            max_width = 1200 if src.name in WIDE_NAMES else 900
            jobs.append((src, src.with_suffix(".webp"), max_width, 76))

    for src, dest, max_width, quality in jobs:
        convert(src, dest, max_width, quality)

    print(f"done {len(jobs)} files")


if __name__ == "__main__":
    main()
