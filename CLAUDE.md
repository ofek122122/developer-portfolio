# CLAUDE.md

> Read this file first, every session. It defines the project, the stack, the
> conventions, and the design system. Do not deviate without being asked.

## Project

A personal developer portfolio for **Ofek Karavani** — a freelance full-stack
web developer based in Israel (Ashdod). The site is **bilingual (Hebrew +
English) with a language toggle**, has a **bold, colorful, animated, image-rich**
visual style, and its primary goal is to **showcase work and convert visitors
into client leads via a contact form**. Hebrew is the default language and
primary audience (Israeli businesses); English is the secondary toggle.

Positioning: Ofek builds **everything** — marketing websites, landing pages,
e-commerce, web/mobile apps, and custom systems/automation — and is open to new
kinds of projects.

Single-page application with smooth-scroll sections (not multi-route), plus one
serverless function for the contact form.

## Brand

- **Wordmark:** "Ofek Karavani" (compact mark: "OK").
- **Logo:** an **"OK" monogram** — minimalist, geometric, single-color ink. File
  lives at `public/logo.svg` (or `public/logo.png`). Render it in ink
  (`--ink`) on light surfaces and in white when placed over the dark/gradient
  hero or dark header. Do not stretch or recolor with multiple colors; it is a
  clean monochrome mark.

## Tech stack (do not swap without asking)

- **React 18 + TypeScript** (strict mode)
- **Vite** — build tool
- **Tailwind CSS v3** — styling
- **shadcn/ui** — base components (Button, Card, Dialog, etc.)
- **Framer Motion** (`motion`) — all animations
- **react-i18next** + **i18next** — bilingual content
- **lucide-react** — icons
- Deployment target: **Vercel** (static SPA + one serverless function in `/api`
  for the contact form)

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build (must pass before "done")
npm run preview    # preview the build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

**Definition of done for any task:** `npm run typecheck` and `npm run build`
both pass with zero errors. Run them before reporting completion.

## Code conventions

- TypeScript **strict**; never use `any`. Type all props and data.
- **Functional components + hooks only.** No class components.
- One component per file, **PascalCase** filename matching the component.
- Co-locate small component-specific types in the same file; shared types go in
  `src/types/`.
- **Tailwind utility-first.** No inline `style={{}}` except for genuinely
  dynamic values (e.g. a computed transform).
- **Never hardcode colors** in components. Use the CSS variables / Tailwind
  theme tokens defined in `src/index.css` and `tailwind.config.ts`.
- **No hardcoded user-facing strings in JSX.** Every visible string comes from
  the i18n files via the `t()` function.
- Keep content data (projects, services, testimonials) in **typed data files**
  under `src/data/` so it is trivial to edit without touching components.
- Prefer composition over large components. If a component passes ~150 lines,
  consider splitting.

## i18n & RTL (critical)

- Two locales: **`he` (default)** and **`en`**.
- All copy lives in `src/i18n/he.json` and `src/i18n/en.json`. Keep keys
  identical across both files.
- Language toggle in the header. Persist the choice to `localStorage`.
- On language change:
  - set `document.documentElement.lang` to `he` / `en`
  - set `document.documentElement.dir` to `rtl` for `he`, `ltr` for `en`
- Use **logical** spacing/positioning (`ms-*`, `me-*`, `ps-*`, `pe-*`,
  `start-*`, `end-*`) and the `rtl:` / `ltr:` Tailwind variants. Avoid raw
  `left`/`right` and `ml`/`mr` where direction matters.
- **Fonts:** Hebrew -> `Heebo`. Latin / display -> `Space Grotesk` for headings,
  `Inter` for body. Load via `@fontsource` packages or Google Fonts and switch
  the font stack with `lang`/`dir` so Hebrew always renders in Heebo.
- Test every section in **both** languages and **both** directions before
  marking a UI task complete.

## Design system

Bold and colorful with motion and rich imagery. A vivid, modern palette on a
light base, with saturated gradients used intentionally (hero, CTAs, section
accents). These are **starting tokens** — keep them centralized so they are
easy to tune.

Define as CSS variables in `src/index.css` and map them in `tailwind.config.ts`:

```
--background:    #FAFAFB   /* near-white base            */
--surface:       #FFFFFF   /* cards                      */
--ink:           #0F172A   /* primary text + logo        */
--muted:         #64748B   /* secondary text             */
--primary:       #7C3AED   /* violet                     */
--secondary:     #EC4899   /* magenta / pink             */
--accent:        #06B6D4   /* cyan pop                   */
--warm:          #F97316   /* orange, gradient end       */
--ring:          #7C3AED
```

- **Signature gradient:** `linear-gradient(135deg, #7C3AED, #EC4899, #F97316)`.
  Use for the hero headline highlight, primary CTA, and one or two accents — not
  everywhere.
- **Headings:** Space Grotesk, heavy weight, large and confident.
- **Body:** Inter (Latin) / Heebo (Hebrew), comfortable line-height.
- **Imagery:** the site should feel alive and visual — large hero visual,
  real project screenshots, generous use of high-quality images. Use tasteful
  placeholders until real assets are added.
- **Radius:** rounded-2xl on cards, rounded-full on pills/buttons.
- **Elevation:** soft, colored shadows (e.g. shadow tinted with primary) over
  flat gray ones.
- **Dark mode:** optional, only if time allows. Light mode is the priority.

### Motion guidelines

- Library: **Framer Motion**.
- **Entrance:** sections and cards fade + rise on scroll into view
  (`whileInView`, `viewport={{ once: true }}`), staggered for lists.
- **Hero:** animated signature gradient and/or floating accent shapes; headline
  reveals word-by-word or with a gradient sweep. Consider subtle parallax.
- **Hover:** buttons and project cards lift / scale slightly with spring easing.
- Respect **`prefers-reduced-motion`** — disable non-essential motion when set.
- Keep it smooth and tasteful; bold != chaotic. Avoid janky or layout-shifting
  animations.

## Suggested file structure

```
api/
  contact.ts     Vercel serverless function for the contact form
src/
  components/
    layout/      Header, Footer, LanguageToggle, ThemeProvider
    sections/    Hero, About, Projects, Services, Testimonials, Contact
    ui/          shadcn/ui components
    shared/      SectionHeading, GradientText, AnimatedReveal, ProjectCard...
  data/
    projects.ts
    services.ts
    testimonials.ts
  i18n/
    index.ts     i18next config
    he.json
    en.json
  types/
  hooks/
  lib/           utils (cn, etc.)
  index.css      tokens + base styles
  App.tsx
  main.tsx
```

## Content data shapes

Keep these typed and in `src/data/`. Text fields are bilingual objects.

```ts
type Localized = { he: string; en: string };

type Project = {
  id: string;
  title: Localized;
  description: Localized;
  tags: string[];          // e.g. ["React", "Tailwind", "Landing Page"]
  category: Localized;     // e.g. {he: "דף נחיתה", en: "Landing Page"}
  image: string;           // path under /public (real screenshot ideally)
  liveUrl?: string;
  repoUrl?: string;
  year: number;
  featured?: boolean;
};

type Service = {
  id: string;
  title: Localized;
  description: Localized;
  bullets: Localized[];    // what's included
  startingPrice?: string;  // display string, e.g. "₪2,000"; note VAT in copy
  icon: string;            // lucide icon name
};

type Testimonial = {
  id: string;
  name: string;
  role: Localized;         // role + company
  quote: Localized;
  avatar?: string;
};
```

## Contact form

- A real, styled contact form (name, email, message) in the Contact section.
- Submit to a **Vercel serverless function** at `api/contact.ts` that emails the
  submission to `CONTACT_TO_EMAIL` (default: ofek.karavani1@gmail.com) using a
  mail provider such as **Resend** (`RESEND_API_KEY` env var). Validate input,
  handle loading/success/error states, and show localized feedback.
- Simpler fallback if no mail provider: post to a form service (e.g. Formspree)
  via `{{FORM_ENDPOINT}}`. Pick the serverless approach by default.
- Never commit API keys; read them from environment variables only.

## Accessibility & quality

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`).
- All interactive elements keyboard-accessible with visible focus rings.
- Color contrast AA on text. Don't rely on color alone for meaning.
- Images need `alt` (localized where meaningful).
- Mobile-first responsive; verify at 360px, 768px, 1280px.
- Lazy-load below-the-fold images; keep the bundle lean.

## Do / Don't

**Do**
- Centralize everything (tokens, copy, content) so it's editable in one place.
- Keep sections modular and self-contained.
- Verify RTL + both languages on every UI change.
- Run typecheck + build before saying a task is finished.

**Don't**
- Don't hardcode strings, colors, or content inside components.
- Don't introduce new dependencies without a clear reason.
- Don't add a traditional backend/database — the only server code is the single
  Vercel contact-form function.
- Don't commit secrets or contact API keys; use env vars / placeholders.

## Git workflow

The repo lives at **`github.com/ofek122122/developer-portfolio`** (private).
The default branch is **`main`**; production deploys to Vercel from `main`.

**Branching**
- Work on a topic branch off `main`. Naming:
  - `feature/<short-slug>` — new section, component, or capability
  - `fix/<short-slug>` — bug or regression fix
  - `chore/<short-slug>` — tooling, deps, docs
- Keep branches short-lived. Rebase onto `main` before opening a PR.

**Commit messages**
- Lower-case, imperative present tense, ≤ 72 chars in the subject.
- Format: `<scope>: <subject>` — scope is the section or layer being changed.
  - `hero: split masthead onto two lines`
  - `services: fix nested <a> in loud signal block`
  - `i18n: tighten hero sub copy for both locales`
  - `chore: add Playwright artifacts to .gitignore`
- Body (optional) explains the *why*. Wrap at 72 columns.
- No fluff like "minor tweaks" or "wip" on `main`-bound commits.

**Pull requests**
- Open via `gh pr create`. CI must be green (`npm run typecheck && npm run build`).
- For UI changes, attach before/after screenshots from Playwright audit.
- Verify both `EN` and `HE` (RTL) before merging.
- Squash-merge into `main` so history stays linear.

**Hard rules**
- Never commit `.env*`, API keys, or anything under
  `.playwright-mcp/`, `dist/`, `node_modules/`, or root-level screenshot files
  (`desktop-*.jpeg`, `mobile-*.jpeg`).
- Never force-push to `main`. Force-push only on your own topic branches.
- Don't `git commit --no-verify`. If a hook fails, fix the underlying problem.
- Use the existing `gh` auth (account `ofek122122`); don't change git config.
