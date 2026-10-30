# Image assets

## Folders

| Path | Role |
|------|------|
| `client/kids`, `client/bliss` | **Source** photos. Keep originals here. |
| `hero` | **Source** hero photos. |
| `optimized/{kids,bliss,hero}` | **Served** WebP derivatives used by the landing page. |

The app catalog points at `optimized/`. Do not wire UI to the source folders.

## Re-optimize after adding photos

```bash
python3 scripts/optimize-images.py
```

Requires Pillow (`pip install pillow` if needed).

## Guidelines

- Prefer photographing / exporting near the display size (shop cards ~1200px wide, grid ~900px).
- Drop new `.jpg` files into the matching `client/` or `hero/` folder, then run the script.
- Commit both the source and the generated WebP so deploys do not depend on CI image tooling.
