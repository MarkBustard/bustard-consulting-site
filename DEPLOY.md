# Bustard Consulting — Website

Static marketing site for Bustard Consulting. No build step or server is
required: every page is plain HTML that loads React from a CDN and renders
on the client.

## Structure

```
index.html          Homepage
practice.html        Practice
services.html        Services
experience.html      Experience (project archive, modals, carousels, video)
contact.html         Contact
css/
  tokens.css         Design tokens (colours, fonts, hairlines)
js/
  direction-shared.jsx   Shared brand components (wordmark, sweeps, marks)
  direction-c.jsx        Homepage
  layout.jsx             Shared nav / header / footer
  experience-data.jsx    Project data
  experience-ui.jsx      Experience page interactive components
assets/
  favicon.svg, wordmark*.svg, portrait-duotone.webp
  sweeps/            Architectural sweep line-art
  creds/, creds-trimmed/   Client logos
  experience/        Project imagery + experience/videos/ (case-study clips)
```

## Deploy to Vercel (via GitHub)

1. Create a new GitHub repository and push these files (with `index.html` at
   the repo root).
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Build command: **none**. Output directory:
   **`./`** (root). Deploy.

The site is fully static, so Vercel serves the files as-is.

## Before deploying — optimise the videos

The case-study clips in `assets/experience/videos/` are the largest assets.
Run the included script once (needs [ffmpeg](https://ffmpeg.org)) to re-encode
them for web (H.264 MP4, audio stripped, capped at 1920px, fast-start):

```
bash optimise-media.sh
```

It backs originals up to `assets/experience/videos/_originals/` — delete that
folder once you're happy, then commit. (The images in `assets/` are already
web-sized and need no further compression.)

## Note on the in-browser transform

Pages load `@babel/standalone` to transform the `.jsx` files in the browser.
This keeps the source directly editable with zero tooling and is fine for a
site of this size. If you later want the fastest possible first paint, the
`.jsx` files can be precompiled to plain `.js` with any bundler (esbuild,
Vite, etc.) and the `<script type="text/babel">` tags swapped for plain
`<script>` — no code changes required.
