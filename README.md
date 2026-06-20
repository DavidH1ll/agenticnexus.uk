# agenticnexus.uk

Personal portfolio and blog for **David Hill** — IT Technician at Active Office, Kilmarnock, Scotland. Twenty years in IT infrastructure and security; now building toward agentic systems, open-source tools, and the stack that comes after.

- **Live URL:** https://agenticnexus.uk
- **Repo:** https://github.com/DavidH1ll/agenticnexus.uk
- **Cloudflare Pages project:** `agenticnexus-uk`
- **Custom domain:** `agenticnexus.uk` (attached)
- **Formspree form ID:** `mojzznbq` (env: `NEXT_PUBLIC_FORMSPREE_ID`)

This README is the **handoff document** — designed to be read end-to-end by any future agent or developer picking this project up. It covers the build, the design decisions, the constraints, and how to extend.

---

## 1. Tech stack

- **Next.js 14** (App Router, static export via `output: 'export'`)
- **Tailwind CSS 3** (custom design tokens as CSS variables, RGB triplets for opacity)
- **MDX** via `next-mdx-remote/rsc` + `gray-matter` + `remark-gfm`
- **Formspree** for the contact form (`@formspree/react`)
- **`react-icons`** for inline icons
- **`next/font`** for Inter + JetBrains Mono
- **Cloudflare Pages** for hosting

No backend, no server, no DB. Fully static export in `out/`.

## 2. File structure

```
agenticnexus.uk/
├── src/
│   ├── app/
│   │   ├── layout.js                  # root layout, nav, footer, fonts, metadata
│   │   ├── page.js                    # / — Hero + selected work + "From the blog"
│   │   ├── about/page.js              # /about — bio + skills + quote + "Currently"
│   │   ├── work/
│   │   │   ├── page.js                # /work — timeline + case study grid
│   │   │   └── [slug]/page.js         # /work/<slug> — MDX case study renderer
│   │   ├── blog/
│   │   │   ├── page.js                # /blog — index, newest first
│   │   │   └── [slug]/page.js         # /blog/<slug> — MDX post renderer
│   │   ├── credentials/page.js        # /credentials — training + wins
│   │   ├── contact/page.js            # /contact — form + direct links
│   │   ├── development/page.js        # /development — UNLISTED dev scratchpad
│   │   ├── not-found.js
│   │   ├── sitemap.js                 # excludes /development
│   │   ├── robots.js
│   │   ├── icon.svg                   # DH monogram favicon
│   │   └── globals.css                # design tokens + prose-mdx + utilities
│   ├── components/
│   │   ├── Nav.js                     # sticky header, pulsing dot, mobile menu
│   │   ├── Footer.js                  # location, email, socials
│   │   ├── ContactForm.js             # @formspree/react form
│   │   ├── MdxComponents.js           # custom MDX components
│   │   └── NeuralBg.js                # client canvas — brain-shaped node animation on hero
│   ├── content/
│   │   ├── work/                      # MDX case studies
│   │   │   ├── agenticnexus-uk.mdx
│   │   │   ├── flappy-bird-pygame.mdx
│   │   │   ├── hundred-days-of-python.mdx
│   │   │   └── neovim-toolchain.mdx
│   │   └── blog/                      # MDX blog posts
│   │       ├── the-ai-safety-paradox.mdx
│   │       ├── mastering-vibe-coding.mdx
│   │       ├── architect-vs-engineer-2026.mdx
│   │       ├── bicycle-for-the-mind-being-sold-for-parts.mdx
│   │       ├── the-solopreneurs-grand-march.mdx
│   │       ├── the-automation-ascendancy.mdx
│   │       ├── metas-open-ai-hardware.mdx
│   │       └── openai-swarm-intelligence.mdx
│   └── lib/
│       ├── content.js                 # MDX loaders (work + blog)
│       ├── data.js                    # profile, experience, themes, skills, credentials
│       └── dev.js                     # dev area projects (unlisted)
├── public/
│   └── avatars/david.jpg              # GitHub avatar (~280 KB)
├── next.config.js                     # withMDX wrapper + output: 'export'
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json                      # @/* path alias
├── package.json
├── package-lock.json
└── README.md                          # this file
```

## 3. Routes

| Path | Purpose | In nav? | In sitemap? | Indexed? |
|------|---------|---------|-------------|----------|
| `/` | Hero + selected work + "From the blog" | ✓ | ✓ | ✓ |
| `/about` | Bio + skills + quote + "Currently" | ✓ | ✓ | ✓ |
| `/work` | Experience timeline + case study grid | ✓ | ✓ | ✓ |
| `/work/[slug]` | MDX case study | ✓ | ✓ | ✓ |
| `/blog` | Blog index (newest first) | ✓ | ✓ | ✓ |
| `/blog/[slug]` | MDX blog post | ✓ | ✓ | ✓ |
| `/credentials` | Training + selected wins | ✓ | ✓ | ✓ |
| `/contact` | Formspree form + direct links | ✓ | ✓ | ✓ |
| `/development` | Unlisted dev scratchpad | ❌ | ❌ | ❌ |
| `/404` | Custom 404 | n/a | n/a | n/a |
| `/sitemap.xml` | SEO sitemap | n/a | n/a | n/a |
| `/robots.txt` | SEO robots | n/a | n/a | n/a |

## 4. Content model

### 4a. Adding a case study

Create `src/content/work/<slug>.mdx`:

```mdx
---
title: "Project name"
year: "2026"
role: "Solo project"
summary: "One-sentence pitch."
stack: ["Python", "Flask"]
link: "https://github.com/you/repo"
---

## Context

...

## Approach

...

## Outcome

...
```

It will appear on `/work` and at `/work/<slug>` automatically. Posts are sorted by `date` (descending) — case studies don't currently use `date` in frontmatter, just `year`.

### 4b. Adding a blog post

Create `src/content/blog/<slug>.mdx`:

```mdx
---
title: "Post title"
date: "2026-06-17"
summary: "One-sentence pitch shown on the index and in the post header."
---

Body in MDX. Tables, task lists, strikethrough, and autolinks all work (remark-gfm is enabled).
```

Posts are sorted by `date` (descending) and appear on `/blog` and at `/blog/<slug>`. The 2 most recent also appear in the "From the blog" section on the home page.

### 4c. Editing structured data

`src/lib/data.js` exports:

- `profile` — name, location, email, tagline, socials
- `experience` — 4 roles
- `themes` — 4 "What I work on" cards on `/about`
- `skills` — 5 skill groups
- `credentials` — training + wins
- (No `education` export — removed during the build)

`src/lib/dev.js` exports `devProjects` — array of objects for the unlisted `/development` page.

Each `devProjects` entry shape:

```js
{
  slug: 'project-name',
  title: 'Project name',
  status: 'In progress',  // or 'On hold', 'Abandoned', 'Shipped'
  description: 'What it is.',
  link: null,             // or '/project-name/' if files are in public/
}
```

## 5. Design system

- **Palette** — defined in `src/app/globals.css` as RGB triplets (e.g. `--obsidian: 11 15 20`) so Tailwind opacity modifiers work. Token names: `obsidian`, `slate`, `slate-soft`, `border`, `text`, `muted`, `accent`, `accent-soft`, `accent-glow`, `amber`, `emerald`.
- **Typography** — Inter (sans) for everything, JetBrains Mono (mono) for code, dates, inline metadata, and decorative `.label-mono` captions. Display scale uses `clamp()` for fluid sizing (`text-display-xl`, `text-display-lg`, `text-display-md`).
- **Components** — `.card`, `.pill`, `.label-mono`, `.prose-mdx` (with GFM table support) defined in `globals.css` via `@layer components`.
- **Hero animation** — `<NeuralBg />` (`src/components/NeuralBg.js`), a client-side canvas drawing a brain-shaped constellation of nodes (cerebrum + frontal + cerebellum ellipses) with mouse-repulsion, visibility-aware RAF, and `prefers-reduced-motion` support. Replaced the old grid background.
- **Active-link indicator** — pulsing cyan dot via `nav-link[data-active='true']::before`.

## 6. Environment variables

| Variable | Where | Value | Required for |
|---|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Cloudflare Pages → Settings → Environment variables | `mojzznbq` | Contact form. If unset, the form shows a fallback message instead. |

The env var must be set BEFORE building — `NEXT_PUBLIC_*` vars are baked into the JS at build time. If you set it in Cloudflare AFTER a build, the form on the deployed build won't work until you trigger a rebuild.

## 7. Deployment — Cloudflare Pages

**Project name:** `agenticnexus-uk`
**Repo:** `DavidH1ll/agenticnexus.uk`
**Production branch:** `main`
**Build settings (under Settings → Builds):**

- Build command: `npm run build`
- Build output directory: `out`
- Node version: `20` (current value is `22`, both work)
- Framework preset: any — the manual settings override the preset

**Custom domain:** `agenticnexus.uk` is attached via Custom domains in the Pages project. If the zone is on Cloudflare DNS, it's automatic. Otherwise add the CNAME.

**Environment variables:** `NEXT_PUBLIC_FORMSPREE_ID` = `mojzznbq` in Settings → Environment variables, applied to Production.

**Triggers a build:** every push to `main` auto-builds via webhook. Manual builds via Deployments tab → "Retry deployment" rebuilds the same commit.

## 8. Local development

```bash
npm install
npm run dev
```

Dev server at `http://localhost:3000`. Live reload on save.

To test the production build locally (recommended before pushing):

```bash
NEXT_PUBLIC_FORMSPREE_ID=mojzznbq npm run build
npx serve out
```

## 9. Build history

Chronological — commit hashes from `git log --oneline`. Last commit at the top.

| Commit | Summary |
|---|---|
| `7da8800` | **Brain animation polish** — bigger nodes, glow halos, denser network. |
| `a127c6c` | **Brain shape** — neural network constrained to cerebrum + frontal + cerebellum ellipses via `inBrain()` mask. |
| `74191e6` | **Neural bg** — `NeuralBg.js` client component replaces hero `.grid-bg` with an interactive canvas node animation. |
| `7994b6a` | **Godot removed** — 35 MB `.wasm` exceeded Cloudflare's 25 MB static asset limit; bundle and `public/_headers` deleted. Will revisit via R2 or LFS. |
| `f8e3ffb` | **Godot re-nested** — moved Godot build to `/development/godot-2d-experiment/` to match the unlisted dev area (later removed in `7994b6a`). |
| `c069309` | **Godot deploy** — 40 MB Godot 4 HTML5 export in `public/godot-2d-experiment/`, `public/_headers` for COOP/COEP, `dev.js` link set. (Superseded by `7994b6a`.) |
| `1ac9ee9` | **Unlisted /development dev area** — noindex, nofollow, not in nav, not in sitemap. Seeded with Godot + Rust projects. (Godot entry removed in `7994b6a`; only Rust remains.) |
| `f463d0d` | **Mobile menu** — hamburger button for <md screens, auto-close on route change + Esc, icon morphs to X. |
| `2400ca1` | **Meta post LinkedIn attribution removed** — "How I built…" treated as original (hashtags kept). |
| `4ea2b20` | **Meta post** — "How I built and deployed a production-grade Next.js portfolio in 2 hours for $5.42" — about this site. |
| `e41657a` | **"Available for new work" removed** — user didn't want to risk employer relations. Just "Ayr, Scotland" remains. |
| `c4f9ad0` | **GFM tables** — `remark-gfm` plugin, `prose-mdx` table styles. |
| `32c2488` | **Sample blog post removed** — "Twenty years on, starting again" deleted at user request. |
| `2132df7` | **8 LinkedIn articles imported** — voice preserved exactly, LinkedIn headline stripped, "Originally published on LinkedIn" closing note added. |
| `1020b1e` | **Blog added** — `/blog`, `/blog/[slug]`, content loader extended, nav updated, home page "From the blog" section. |
| `606f053` | **Sitemap + robots** — `/sitemap.xml`, `/robots.txt`. |
| `4de3c73` | **All pages + case studies** — home, about, work, credentials, contact, 4 case study MDX files, not-found. |
| `de185f8` | **Layout shell** — jsconfig, layout.js, Nav, Footer, MdxComponents, data.js, content.js, avatar. |
| `2d313cf` | **Design system** — globals.css (CSS variables as RGB triplets), tailwind.config.js (display scale, font families). |
| `efa402d` | **Build setup** — MDX, content, form deps; `next.config.js` with `withMDX` and `output: 'export'`. |
| `b7c255d` | (Pre-build) Original holding page. |
| `d9a7a2d` | (Pre-build) Initial commit. |

Post-commit fixes not in their own commits:
- **WGM Engineering removal** — CV was tailored for a WGM application; references stripped from the build. Done in `4ff32ac`.
- **LinkedIn added** to socials, footer, contact page — done in commit `4de3c73` (build 4) before the LinkedIn URL was known; URL added later in chat.
- **Formspree migration** — switched from hand-rolled `fetch` to `@formspree/react` with `useForm` + `ValidationError`. Env var set in Cloudflare.
- **Cloudflare build settings fix** — was using `npx @cloudflare/next-on-pages@1` (dynamic Next.js preset); changed to `npm run build` + `out` (static export).

## 10. Constraints — things NOT to do

These are decisions the user explicitly made. Don't change them without asking.

- **No phone number anywhere.** The CV has `07470491956` — it stays in the CV. The portfolio has no phone.
- **No street address.** Only "Ayr, Scotland" appears. Not "Ayr, South Ayrshire".
- **No WGM Engineering references.** The CV is tailored for a WGM application; the portfolio is the general personal site.
- **No LinkedIn headline.** Don't use "Information Security Leader | ISO 27001 Expert | AI-Enabled IT Professional" anywhere — the portfolio is positioned around "IT Technician at Active Office".
- **No "available for new work" / "open to opportunities" status.** User doesn't want to risk employer relations. The hero shows only "Ayr, Scotland" as a location label.
- **Don't link `/development` from anywhere on the public site.** It has `noindex,nofollow`, isn't in the nav, isn't in the sitemap. Bookmark the URL.
- **Don't sanitize the user's whimsical British voice** in any imported LinkedIn post — phrases like "my dear reader", "wouldn't you know", "rather like", "spiffing", "startled pheasants" are part of their brand.
- **No code comments.** Project convention — keep code self-documenting.

## 11. Quirks & gotchas

- **Custom color opacity** — Tailwind opacity modifiers (`bg-accent/40`) require color tokens to be defined as RGB triplets, not hex. The CSS variables in `globals.css` are `11 15 20` not `#0b0f14`. If you change the palette, keep this format.
- **GFM tables** — `next-mdx-remote` doesn't parse pipe tables by default. Both `[slug]/page.js` files (work and blog) pass `remarkGfm` via `options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}`. If you add another MDX renderer, copy this.
- **Formspree env var timing** — `NEXT_PUBLIC_FORMSPREE_ID` is read at build time. Setting it in Cloudflare after a build won't affect that build — you need to push a new commit (or hit Retry) to bake it in.
- **NeuralBg node budget** — `NODE_TARGET = 80` in `NeuralBg.js`, capped to `(w * h) / 16000`. Mouse-repulsion is disabled on touch devices (`hover: none`). RAF pauses on `document.hidden`. Honoured `prefers-reduced-motion` for node pulse.
- **Dead grid-bg utilities** — `.grid-bg` and `.grid-bg-mask` are still defined in `globals.css` but no page uses them (replaced by `<NeuralBg />` in `74191e6`). Safe to delete.
- **Development is noindex** — the `/development` page has `<meta name="robots" content="noindex, nofollow">` via the Next.js metadata API (`robots: { index: false, follow: false }` in `export const metadata`).
- **`hiddenPaths` export in `sitemap.js`** — currently a dead export. The actual exclusion is done in the same file's `sitemap()` function. Can be cleaned up.
- **The `experience[0].company` "Active Office" role** is the current job. Update if David changes roles.

## 12. Open items

- **About-page bio** — currently a draft written from the CV (3 paragraphs in `src/app/about/page.js`). User wants to edit it themselves.
- **Case study MDX files** — drafted from public GitHub READMEs. User to edit the prose.
- **Godot export** — the 2D experiment was removed (`7994b6a`) because the 35 MB `.wasm` exceeded Cloudflare's 25 MB static asset limit. To host a Godot HTML5 build again, put it on R2 (or LFS) and link from `/development` — not in `public/`.
- **The "Currently" block on the about page** — says "Learning Rust, Building agentic workflows, Writing on the open web". Update as these change.
- **LinkedIn URLs** — not added to blog post frontmatter because David hasn't provided them. If he wants cross-linking, add `sourceUrl: 'https://www.linkedin.com/...'` to each post's frontmatter and render it in `src/app/blog/[slug]/page.js`.
- **Formspree features not enabled** — reCAPTCHA (spam protection), auto-responder (sends visitor a confirmation email). Can be enabled in the Formspree dashboard without code changes.
- **Analytics** — none configured. Plausible or Umami would be the move.
- **NODE_VERSION in Cloudflare** — set to `22`. Works but `20` is LTS and more conservative.

## 13. Common tasks

### Add a new blog post

1. Create `src/content/blog/<slug>.mdx` with frontmatter (`title`, `date`, `summary`) and body in MDX.
2. Push to `main` — Cloudflare auto-builds and deploys.
3. Verify the post appears at `/blog` and the home page's "From the blog" section.

### Add a new case study

1. Create `src/content/work/<slug>.mdx` with frontmatter (`title`, `year`, `role`, `summary`, `stack`, `link`).
2. Use `## Context`, `## Approach`, `## Outcome`, `## Stack` headings.
3. Push.

### Add a new dev area project

1. Edit `src/lib/dev.js` and add an entry to `devProjects`.
2. Push.

### Add a new dev project with hosted assets

1. Drop the static assets into `public/<project-slug>/`.
2. Edit `src/lib/dev.js` and set the entry's `link` to `/<project-slug>/`.
3. If the project needs special headers (COOP/COEP for threading, MIME type overrides), recreate `public/_headers` — it was deleted along with the Godot bundle in `7994b6a`. Cloudflare Pages reads `_headers` from the project root or `public/`.
4. Push.

### Re-deploy a build without code changes

Two options:

1. **Retry the latest deployment** in Cloudflare → Deployments → click latest → "Retry deployment" (rebuilds the same commit with current env vars).
2. **Empty commit** — `git commit --allow-empty -m "rebuild" && git push`.

### Add a Cloudflare env var

1. Pages project → Settings → Environment variables → Add variable.
2. **Important:** set the var BEFORE pushing a new commit. `NEXT_PUBLIC_*` vars are baked at build time.

## 14. License

Source: MIT. Content (case study prose, blog posts, bio): all rights reserved by David Hill.
