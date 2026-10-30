# Image assets

## Served folders (WebP only in the UI)

| Path | Use |
|------|-----|
| `client/kids/*.webp` | Tickles & Giggles product photos |
| `client/bliss/*.webp` | Bliss n Blush product photos |
| `hero/*.webp` | Landing hero |

The catalog helpers (`kidsAsset` / `blissAsset` / `heroAsset`) always resolve to `.webp` in these folders.

## Naming

Use short kebab-case names only, e.g. `shop-display.webp`, `home-bar.webp`.

Avoid Instagram caption filenames (spaces, emojis, long titles) — rename before dropping into `client/`.

## Optional JPEG originals

`.jpg` files may remain in `client/` for archival, but the app does not link them.

## Re-export from originals

```bash
npm run optimize:images
```

Writes/updates WebPs under `client/{kids,bliss}` and `hero/`.
