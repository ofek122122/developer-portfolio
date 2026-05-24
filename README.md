# Ofek Karavani — Developer Portfolio

Bilingual (Hebrew + English) single-page portfolio for Ofek Karavani, freelance
full-stack developer based in Ashdod, Israel.

Built with React 18 + TypeScript (strict), Vite, Tailwind CSS v3,
Framer Motion, react-i18next, and lucide-react. Deploys as a static SPA on
Vercel with one serverless function for the contact form.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## Quality gates

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # vite build (output: dist/)
npm run preview    # preview the production build locally
```

Both `typecheck` and `build` must pass with zero errors before any change is
considered done.

## Project layout

```
api/
  contact.ts            Vercel serverless function — POST handler for the form
src/
  components/
    layout/             Header, Footer, LanguageToggle
    sections/           Hero, About, Projects, Services, Testimonials, Contact
    shared/             Container, Button, SectionHeading, GradientText,
                        AnimatedReveal, ProjectCard
  data/                 projects.ts, services.ts, testimonials.ts
  hooks/                useReducedMotion
  i18n/                 he.json, en.json, index.ts (i18next config)
  lib/                  utils (cn)
  types/                shared TS types
  index.css             design tokens + base styles
  App.tsx               composes Header + sections + Footer
  main.tsx              entry
public/
  logo.png              OK monogram, dark ink, transparent background
  logo-light.png        OK monogram, white, transparent background (for dark surfaces)
  images/projects/      project screenshots (paths referenced from data/projects.ts)
scripts/
  make-logo-transparent.py   regenerate the transparent logos from a flat source
```

## Editing content

All user-facing content lives outside the components — touch one of these to
update the site:

- **Copy / strings** — `src/i18n/he.json` and `src/i18n/en.json`. Keep keys
  identical across both files.
- **Projects** — `src/data/projects.ts`. Add a `liveUrl`, `repoUrl`, real
  screenshot under `public/images/projects/`, etc.
- **Services & pricing** — `src/data/services.ts`.
- **Testimonials** — `src/data/testimonials.ts`. Entries with `{{placeholder}}`
  tokens are filtered out at runtime; the section shows a "Coming soon" card
  until at least one real testimonial is added.
- **Tech list / stats** — top of `src/components/sections/About.tsx`.
- **Design tokens** — CSS variables in `src/index.css`, mapped through
  `tailwind.config.ts`.

## Environment variables

Set these on Vercel (Project Settings → Environment Variables):

| Var | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes (for prod email) | Auth for the [Resend](https://resend.com) API. Without it, the contact endpoint logs the submission and returns success — useful for dev. |
| `CONTACT_TO_EMAIL` | no | Override the destination address. Defaults to `ofek.karavani1@gmail.com`. |

Never commit these. Use `.env.local` for local dev (gitignored).

## Deploy

The repo is configured for Vercel:

- `vercel.json` declares the `vite` framework, `npm run build`, output `dist/`,
  and the SPA rewrite (`/((?!api/).*)` → `/index.html`) so deep links work.
- `api/contact.ts` is auto-deployed as a serverless function at
  `POST /api/contact`.

Steps:

```bash
# one-time:
vercel link
# every deploy:
vercel --prod
```

Or push to a GitHub branch connected to the Vercel project.

## Default language

The site loads in **English** by default. To switch the default to **Hebrew**,
change `fallbackLng: 'en'` → `'he'` in `src/i18n/index.ts:15`. Visitors who
have used the toggle keep their persisted choice (stored in `localStorage`
under `portfolio_lang`).

## Pre-launch checklist

Things still on placeholders, in order of how visible they are:

- [ ] **Project screenshots** — drop real images into
      `public/images/projects/` matching the filenames in `data/projects.ts`.
      Until they exist, cards show a gradient placeholder with the title.
- [ ] **Testimonials** — replace the `{{CLIENT_NAME_*}}` tokens in
      `src/data/testimonials.ts` with real client quotes (bilingual).
- [ ] **Momenties live URL** — set `liveUrl` on the `momenties` entry in
      `src/data/projects.ts` (or leave it as `undefined` for repo-only).
- [ ] **Pricing tiers** — adjust `startingPrice` strings in
      `src/data/services.ts` if `₪2,000` / `₪4,000` aren't the desired anchors.
- [ ] **About stats** — adjust `15+ / 10+ / 3+` in
      `src/components/sections/About.tsx`.
- [ ] **LinkedIn** — not currently linked. Add to the `SOCIAL` array in
      `src/components/layout/Footer.tsx` if/when ready.
- [ ] **Resend API key** — set `RESEND_API_KEY` on Vercel to enable real email
      delivery from the contact form.
