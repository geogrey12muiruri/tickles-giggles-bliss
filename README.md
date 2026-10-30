# Tickles & Giggles · Bliss n Blush

Landing preview for two Nairobi shops. Same UI as the working design; packaged for a **clean static export** on GitHub Pages.

## What’s different from the Shofy fork

- Renamed package / docs for this brand
- Non-landing SSR/demo routes archived under `src/_archived_pages/` (static export)
- Image sources stay in `public/assets/img/client|hero`; the UI serves WebP from `public/assets/img/optimized/`
- GitHub Pages workflow + `output: "export"`

The landing composition, components, and styles are unchanged from the client design work.

## Install (you run this)

```bash
rm -rf node_modules .next out
npm install
npm run dev
```

Commit the regenerated `package-lock.json` after install.

## Image optimization

```bash
npm run optimize:images
```

Adds/refreshes WebPs under `public/assets/img/optimized/`. See `public/assets/img/README.md`.

## Build / Pages

```bash
npm run build          # -> out/
npm run build:pages    # basePath=/tickles-giggles-bliss
```

Clean repo (recommended — this started as a fork):

```bash
git remote rename origin shofy-fork
gh repo create parrot-sketch/tickles-giggles-bliss --public --source=. --remote=origin --push
```

Then set **Settings → Pages → GitHub Actions**.
