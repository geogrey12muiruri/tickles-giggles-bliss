# Tickles & Giggles · Bliss n Blush

Clean landing preview (not a Shofy fork). Same client design; unused ecommerce/demo routes and template product images removed.

## Install

```bash
cd /home/parrot/kids_bliss/tickles-giggles-bliss
npm install
npm run dev
```

## GitHub Pages

```bash
npm run build:pages
gh repo create parrot-sketch/tickles-giggles-bliss --public --source=. --remote=origin --push
```

Then: **Settings → Pages → GitHub Actions**.

## Images

Sources: `public/assets/img/client|hero`  
Served: `public/assets/img/optimized`  

```bash
npm run optimize:images
```
