# royto.tech

The marketing site for **Royto**, an AI agency for small and mid-sized businesses — based in Raleigh, working anywhere.

Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · Motion · Lenis.
No CMS, no UI kit, and no runtime network requests — fonts are self-hosted,
every illustration is inline SVG, and there are no third-party scripts.

---

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build; must pass clean before deploying
npm run start   # serve the production build locally
npm run lint    # ESLint; currently silent
```

## Deploy

Built for **Vercel**. Import the repo, keep the defaults (Next.js is detected),
and deploy — there is no `vercel.json` because nothing needs one.

Set the production domain to `royto.tech`. `SITE_URL` in
[`src/content/site.ts`](src/content/site.ts) feeds canonical URLs, the sitemap,
`robots.txt` and the OG card, so change it there if the domain changes.

---

## Changing copy without touching JSX

**All copy lives in `src/content/`.** Every page reads from these files; none of
it is written inline in a component. Edit the text, save, done.

| File | What's in it |
|---|---|
| `site.ts` | Nav, footer, contact email, social links, site metadata, founder name |
| `pages.ts` | Each page's `<title>`, meta description, H1 and lede |
| `home.ts` | Hero, and the founding-client line it carries |
| `home-sections.ts` | How it works (with prices), included/not, approval, founder, final CTA, About page |
| `capabilities.ts` | The six areas — pain line, status, how you buy it — the homepage index and the /what-we-automate map |
| `products.ts` | The Royto Social package page (/royto-social) |
| `pricing.ts` | The two lanes, agency tiers, the package index lines, typical engagement, the example audit map and monthly numbers |
| `faq.ts` | FAQ entries (`pricing: true` also shows them on /pricing; `home: false` keeps one off the homepage) |
| `contact.ts` | Contact intents — the `?for=` values, their ledes, message prompts and email subjects |
| `websites.ts` | The homepage Websites section, the three packages, and /websites |
| `lead-package.ts` | Never miss a lead — the flagship package page and its pricing |
| `packages.ts` | The three package summaries — the homepage row and the /packages hub |
| `legal.ts` | Privacy, Terms, and the /work holding page |

Two things to know when editing:

- **The hero headline has authored line breaks.** `hero.headline` is the full
  string (used by screen readers); `hero.headlineLines` is what renders. Change
  both together. They're authored rather than measured so the reveal is pure
  CSS and paints without waiting for JavaScript.
- **Status tags are load-bearing.** `status` on a capability and `stage` on a
  product drive the "Available now" / "On the roadmap" tags. They
  are not decoration — the site must never let a planned thing read as shipping.

---

## Placeholders to fill before launch

Every one is greppable:

```bash
grep -rn "TODO(placeholder)\|TODO(copy)\|TODO(review)" src/
```

| What | Where | Notes |
|---|---|---|
| `CONTACT_EMAIL` | [`src/content/site.ts:9`](src/content/site.ts) | `hello@royto.tech`. Confirm the mailbox exists and is monitored. Every CTA and the form fallback point here. |
| **SMTP credentials** | Vercel → Settings → Environment Variables | The contact form sends over SMTP via Namecheap Private Email. Needs `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` (and optionally `SMTP_PORT`, `CONTACT_TO`). **Until these are set the form returns a 502 and tells the visitor to email instead** — it will never claim to have sent something it didn't. |
| Social URLs | [`src/content/site.ts:41`](src/content/site.ts) | LinkedIn / Instagram / Facebook are guesses. Verify each, and delete any account Royto doesn't hold. |
| Founder photo | [`src/components/ui/FounderPortrait.tsx`](src/components/ui/FounderPortrait.tsx) | Renders a designed placeholder with "Photo to come". Replace the component body; keep the frame and 4:5 ratio. |
| Privacy page | [`src/content/legal.ts`](src/content/legal.ts) | Real draft written from what the site actually does, marked "Draft — review before launch" on the page. `noindex` and disallowed in `robots.ts` until reviewed — lift both then. |
| Terms page | [`src/content/legal.ts`](src/content/legal.ts) | Same treatment. Engagement terms live in the written scope, not here. |
| `/work` | [`src/app/work/page.tsx`](src/app/work/page.tsx) | Honestly empty holding page, `noindex`. The first founding-client write-up goes here; nothing invented in the meantime. |
| Capability examples | [`src/content/capabilities.ts:36`](src/content/capabilities.ts) | The copy deck doesn't supply these seven (six areas plus custom builds), so they were written to match its voice. **The only non-deck prose on the site — read them before launch.** |

---

## Contact form

Submissions go to `POST /api/contact`, which validates them and sends an email
over SMTP using **Namecheap Private Email** — the same mailbox the domain's MX
records already point at. No third-party email service.

Set these in Vercel → Settings → Environment Variables (all environments):

| Variable | Value |
|---|---|
| `SMTP_HOST` | `mail.privateemail.com` |
| `SMTP_PORT` | `465` (implicit TLS) or `587` (STARTTLS) |
| `SMTP_USER` | the full mailbox address, e.g. `hello@royto.tech` |
| `SMTP_PASSWORD` | that mailbox's password |
| `CONTACT_TO` | optional; defaults to `CONTACT_EMAIL` |

For local development put the same values in `.env.local` (git-ignored).

Two deliberate behaviours:

- **It never reports a false success.** If SMTP is unconfigured or the send
  fails, the route returns 502 and the form shows the `mailto:` fallback. An
  enquiry is never silently swallowed — which is exactly what the earlier
  placeholder implementation did.
- **`replyTo` is the enquirer**, so hitting reply in your mail client answers
  them directly rather than answering yourself.
- **The subject line says what it's about.** Contextual buttons link to
  `/contact?for=website|social|founding`; the form pre-selects the intent and
  the email arrives as e.g. `Website quote — Acme (Jane)`. Anything unknown is
  filed as an audit request.

## How it's put together

```
src/
├── app/                    routes, sitemap, robots, OG image, contact endpoint
│   └── _og-fonts/          TTF copies of Archivo/Plex for the OG renderer
├── components/
│   ├── layout/             Nav, Footer, ThemeScript, SmoothScroll, StructuredData
│   ├── motion/             Reveal, Magnetic, CountUp, Cursor
│   ├── hero/               FlowCanvas + hero composition
│   ├── diagrams/           the capability micro-diagrams (six areas + custom builds)
│   ├── sections/           one file per page section; PackagePage is the one template for the three package pages (breadcrumb + More-packages strip built in); PageRail is the sticky on-this-page bar
│   └── ui/                 Button, Card, Tag, Wordmark, PageHeader, FounderPortrait
├── content/                all copy (see above)
├── lib/                    motion system, fonts, theme + media-query hooks
└── styles/globals.css      design tokens, base layer, CSS-driven animation
```

### Things that will surprise you

- **Most animation is CSS, not JavaScript.** `Reveal`, the hero entrance, the
  six micro-diagrams, the nav and the footer all animate through CSS with a
  single shared `IntersectionObserver`. Routing them through Motion put the
  library on the hydration critical path and pushed the hero's paint past 3.4s
  on a throttled phone. Motion is still used where it earns its place: the
  accordion and the form. (Included / not included was the last section
  drawing its marks through Motion; it is CSS now.)
- **`src/styles/globals.css` is the design system.** Colour tokens are raw
  custom properties on `:root`, redefined for dark under both
  `prefers-color-scheme` and `[data-theme]`. Tailwind's `@theme` block points
  at them. Don't add colours, radii or shadows that aren't in `brand.md`. The
  one addition is `--gold-ink`, the gold equivalent of `--teal-ink`: gold text
  on the gold-soft tag ground was 3.3:1, below AA, and only went unnoticed
  because those tags were inside reveal wrappers Lighthouse couldn't see.
- **The Flow Canvas markup is the finished graph.** It renders fully drawn with
  the sensitive branch resolved to gold, and JavaScript rewinds it only when
  the animation can actually run. So reduced-motion visitors, no-JS visitors
  and background tabs all see something meaningful rather than an empty frame.
- **A CSS `transform` animation overrides an SVG `transform` attribute.**
  Position SVG elements with a wrapping `<g>` if their own transform is
  animated, or they will snap to the origin.

---

## Verified

Measured on the production build, not assumed.

| Check | Result |
|---|---|
| `npm run build` | Clean — no TS errors, no ESLint warnings |
| Lighthouse `/` mobile | Perf 94–95 across three runs · A11y 100 · Best Practices 100 · SEO 100 (12 Sep 2026, every-business homepage with the packages row). The LCP element is the nav wordmark with a ~2.6 s simulated render delay — the framework floor below, not page content — so the score moves with run-to-run noise rather than with what is on the page. |
| Lighthouse `/` desktop | Perf 100 · A11y 100 · Best Practices 100 · SEO 100 |
| Interior pages, mobile | 93–95 Perf, 100 across the other three (/packages 94). `/pricing` sits at 93 after the restructure added the Royto Social block and the example audit map; converting its Included section from Motion to the CSS reveal did not move the score — the LCP is the framework floor described below, not app animation. `/contact` is server-rendered on demand (it reads `?for=`) |
| Responsive | No horizontal overflow at 375 / 768 / 1440 / 1920, both themes, all 7 pages |
| Keyboard | Every focusable on every page has a 2px teal ring at 3px offset; skip link first |
| Reduced motion | Zero animations running, all reveals visible, canvas static |
| Honesty | No testimonials, logos, case studies or invented metrics on any page |

### Core Web Vitals: measure them on a real browser

Measured in Chrome at 4× CPU throttling with slow-4G network emulation, reading
the actual `largest-contentful-paint` and `layout-shift` entries:

| Page | FCP | LCP | CLS |
|---|---|---|---|
| `/` | 840ms | **944ms** | 0 |
| `/what-we-automate` | 652ms | **1444ms** | 0 |
| `/pricing` | 288ms | **1116ms** | 0 |
| `/contact` | 316ms | **1020ms** | 0 |

All comfortably inside the 2.0s LCP / 0.02 CLS budget.

**Lighthouse reports LCP as ~3.1s for the same page.** That number comes from
its *simulated* throttling model, not an observed paint. Three things were
tried against it and none moved it, so don't repeat them:

- Compressing the hero entrance timings — no change (the LCP element ends up
  being one with zero animation delay, so the choreography was never the cause)
- `font-display: optional` — no change, and marginally worse
- `content-visibility: auto` on below-the-fold sections — no change, and it
  **broke** the reveal animations by collapsing the subtree layout that the
  IntersectionObserver depends on

The remaining gap is the framework's own critical path. A bare Next 16 page with
no client components scores 98 on the same run, and the app adds roughly 30KB
gzipped on top of a 213KB floor — so there is little left to win in app code.
Treat the real-browser figures above as the truth about user experience and the
Lighthouse score as a lab signal.

---

## Licence

Private. © 2026 Royto.
