# Portfolio

A portfolio that looks like a small desktop OS: a dock, draggable windows, and each project opens as an app. A plain "Simple view" at `/simple` shows the same content on one page and is the default on phones.

Built with Next.js (static export), React, TypeScript and Tailwind CSS. Deployed to GitHub Pages.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

## Edit the content

| What | Where |
| --- | --- |
| Projects | `src/content/projects.ts` (screenshots in `public/projects/<slug>/`) |
| Name, bio, skills, experience, links | `src/content/profile.ts` |
| Resume and CV downloads | add `public/resume.pdf` (1 page) and `public/cv.pdf` (full). Each download option appears once its file exists; restart `npm run dev` after adding one. |
| Colors, blur, corner radius | the tokens at the top of `src/app/globals.css` |

## How it is put together

- `src/components/os/`: the desktop shell (`Desktop`, `MenuBar`, `Dock`, `Window`)
- `src/store/windows.ts`: which windows are open, where they are, and which is on top
- `src/apps/`: one component per app. To add an app, add it to `meta.ts`, `registry.tsx` and `components/os/icons.tsx`.
- `src/app/simple/` and `src/app/projects/[slug]/`: the plain pages
- `/?open=<project slug>` opens that project in a window; `/?open=resume` (or `about`, `blackjack`, `settings`) opens that app

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `out/` to GitHub Pages. In the repo settings, set Pages > Source to "GitHub Actions".

The site is served at `portfolio.darrenluu.com` (set in `public/CNAME` and `SITE_URL` in `src/content/profile.ts`). The domain's DNS needs a `CNAME` record for `portfolio` pointing to `<github-username>.github.io`.
