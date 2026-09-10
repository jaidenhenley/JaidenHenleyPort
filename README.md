# Jaiden Henley Portfolio

A personal portfolio built to showcase my iOS projects, case studies, and the work I've done through the Apple Developer Academy and outside of it. I wanted one place that felt more complete than a resume and gave people a better sense of how I build, think through products, and present my work.

[View live portfolio](https://jaidenhenley.com)

## Stack

Astro 5, TypeScript, and plain CSS. No UI framework and no CSS framework. The site is fully static and ships almost no JavaScript: only a small scroll-animation controller, the theme toggle, and analytics.

Originally hand-written HTML, CSS, and JavaScript. Rebuilt in Astro so the case studies could be generated from data instead of maintained as five near-identical pages.

## Running it

```bash
cd site
npm install
npm run dev
```

The dev server prints the URL it actually bound to. It is usually http://localhost:4321, but it will pick the next free port if that one is taken, so read the startup output rather than assuming.

```bash
npm run build      # static output to site/dist
npm run preview    # serve the built output
```

Requires Node 20 or newer. Astro compiles `.astro` files, so the site cannot be opened directly from the filesystem or served with Live Server from the repo root. Use `npm run dev`, or point a static server at `site/dist` after a build.

## Layout

```
site/                     the Astro app
  src/
    pages/                one file per route, plus [project].astro
    layouts/              page shells
    components/           header, footer, cards, device frame, code block
    data/                 all case study content
    assets/               images processed at build time
    styles/               design tokens and motion
  public/                 copied as-is: CNAME, resume PDF, videos, analytics
images/                   original source art, not published
.github/workflows/        deploy to GitHub Pages
```

## How the case studies work

Every case study renders from one template, `src/pages/[project].astro`, driven by three data files:

- `data/projects.ts` is the single source of truth for the project list. Title, summary, tags, app icon, and App Store link all live here, and both the home page and the case study index read from it.
- `data/case-studies.ts` holds the long-form content: the problem, the approach, technical highlights, screenshots, stats, and the closing reflection.
- `data/code-snippets.ts` holds the real Swift and Python samples and the forward-looking notes.

Adding a project means adding an entry to each file. No new page, no new markup. The next-case-study link and the numbering update themselves.

## Details worth knowing

**Device frames.** Screenshots and demo videos render inside a real iPhone 16 Pro frame, not a CSS approximation. The frame art is MIT licensed from [weirdapps/mockups](https://github.com/weirdapps/mockups), and its license sits next to the file in `src/assets/frames/`. The screen cutout is exactly 1206x2622, the device's native resolution, so captures taken on an iPhone drop in at 1:1. The frame draws its own Dynamic Island, which means captures that lack one still look right.

**Motion.** Content fades and rises into view on scroll, with travel and duration scaled to what an element is: body copy barely moves, a device mockup carries more weight. Everything is gated behind a `js` class set before first paint, so content stays visible if scripting fails, and `prefers-reduced-motion` drops the movement entirely.

**Navigation.** Astro's View Transitions keep the header in place between pages instead of reloading the whole document.

**Theme.** Light by default regardless of the operating system setting. Dark mode applies only when someone chooses it, and the choice persists.

**Legacy URLs.** The build emits flat `.html` files, so every URL the original site published still resolves. The two that could not, `caseStudies.html` and `bridgeprofessionals.html`, redirect to the case study index.

## Content

- CoastCast, a Michigan beach conditions app with a Python backend
- QuickStudy, an on-device AI flashcard tool
- Take Flight, a 5-in-1 SpriteKit game set on Belle Isle
- CommonSight, a civic reporting app for Detroit neighborhoods
- Roasting Plant, a coffee ordering app and my first solo project

Plus a resume, contact form, and the privacy and support pages the App Store requires.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, injects the Firebase Analytics keys from repository secrets, builds `site/`, and publishes `site/dist` to GitHub Pages. The custom domain comes from `site/public/CNAME`.

Analytics stays inert until those secrets are substituted, so local development and forks never report to Firebase.
