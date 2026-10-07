# Gulf Horizon International Services — website

Bilingual (English / Arabic RTL) marketing site built from the Figma design, using React + Vite, Tailwind CSS v4 and Framer Motion.

- English pages: `/`, `/deployments`, `/about`, `/contact`, `/dmw-license`, `/privacy`, `/terms`
- Arabic pages: the same paths under `/ar` (e.g. `/ar/about`). The EN/عربي toggle in the nav switches between them.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Contact form (FormSubmit)

The contact form posts to [FormSubmit](https://formsubmit.co), so there's no backend to run.

1. Set the inbox in `src/config.js` (`FORMSUBMIT_EMAIL`), or set the env var `VITE_FORMSUBMIT_EMAIL` in your hosting dashboard before building.
2. Deploy, then submit the form once. FormSubmit emails that inbox an **activation link**. Click it, and every submission after that is delivered.
3. Optional: once it's activated, FormSubmit gives you a random alias (like `a1b2c3...`). Use that as `FORMSUBMIT_EMAIL` so the real address isn't in the page source.

## Deploy

### Vercel
Import the repo in Vercel. It detects Vite on its own: build command `npm run build`, output directory `dist`. `vercel.json` already rewrites every route to `index.html`, so deep links like `/ar/contact` work.

### Hostinger (or any Apache host)
1. Run `npm run build`.
2. Upload **the contents of** `dist/` to `public_html/`. Include the hidden `.htaccess` file, which comes from `public/.htaccess` and handles client-side routes.

## Project layout

```
src/
  App.jsx               routes (EN + /ar)
  i18n.jsx              language from URL, useLang(), useContent()
  config.js             FormSubmit settings
  content/              all copy, one file per page: { en: {...}, ar: {...} }
  components/           Nav, Footer, CtaSection, shared UI (ui.jsx), page sections
  motion/               reusable animation primitives (Reveal, SplitText, CountUp, Tilt, Parallax…)
  pages/                one component per page
  assets/               images and SVGs exported from Figma
```

To change any text, edit the matching file in `src/content/`. English and Arabic sit side by side there.
