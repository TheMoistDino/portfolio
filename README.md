# View the web portfolio at
## https://portfolio.darrenluu.com/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Image optimization (WebP)

This project can serve WebP images (preferred) while falling back to original formats. A helper script is provided to generate WebP copies of images.

Requirements:
- ImageMagick (`magick`) on PATH for Windows PowerShell.

Convert images under `src/assets` (or `public`) to WebP:

```powershell
.
\scripts\convert-images.ps1 -Path "src/assets" -Quality 80
```

After running that script, the code will automatically try to load the `.webp` sibling via the `<picture>` element; if a `.webp` file is not present the browser will load the original image.

Node-based conversion (preferred)

If you prefer an npm-based converter (works cross-platform) use the included Node script which uses `sharp`:

Install dependencies first (on your machine):

```powershell
npm ci
npm install --save-dev sharp
```

Then run the converter (defaults to `src/assets`):

```powershell
npm run convert-images -- --path src/assets,public --quality 80
```

The script will create `.webp` siblings next to each source image and skip existing up-to-date `.webp` files.
