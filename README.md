# agenticnexus.uk

Personal portfolio for **David Hill** — twenty years in IT infrastructure and security, now building toward agentic systems, open-source tools, and the stack that comes after.

## Stack

- **Next.js 14** (App Router, static export)
- **Tailwind CSS**
- **MDX** via `next-mdx-remote` + `gray-matter`
- **`next/font`** for Inter and JetBrains Mono
- **`react-icons`** for inline icons
- **Formspree** for the contact form (no backend)

The site is built as a fully static bundle in `out/`, suitable for any static host.

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

This runs `next build` with `output: 'export'`, producing the static site in `out/`. Serve it locally with:

```bash
npx serve out
```

## Project layout

```
src/
  app/                # routes — /, /about, /work, /work/[slug], /credentials, /contact
  components/         # Nav, Footer, ContactForm, MdxComponents
  content/work/       # MDX case studies
  lib/                # content loader + structured data (experience, skills, credentials)
  styles/             # global CSS (tokens, prose styles, utilities)
public/               # static assets
```

### Adding a case study

Create a new `.mdx` file in `src/content/work/`:

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

It will appear on `/work` and at `/work/<slug>` automatically.

### Editing experience, skills, credentials

Structured content lives in `src/lib/data.js`. Edit the exported `experience`, `skills`, `credentials`, and `profile` objects.

## Contact form (Formspree)

The form on `/contact` posts to Formspree.

1. Create a form at <https://formspree.io/>.
2. Copy the form ID (the part after `/f/` in the endpoint URL).
3. Set the environment variable when building:

   **Cloudflare Pages:** in the Pages project → Settings → Environment variables, add:
   - Variable: `NEXT_PUBLIC_FORMSPREE_ID`
   - Value: `yourFormId`

4. Trigger a rebuild.

If the variable is missing, the form will display a fallback message telling visitors to email `hello@agenticnexus.uk` directly.

## Deploy to Cloudflare Pages

1. Push the repo to GitHub.
2. In Cloudflare, **Workers & Pages → Create application → Pages → Connect to Git**, pick the repo.
3. Build settings:
   - **Framework preset:** Next.js (Static Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 20
4. Add the `NEXT_PUBLIC_FORMSPREE_ID` environment variable (Production and Preview as needed).
5. Deploy. Cloudflare will build and publish to `<project>.pages.dev`.
6. **Custom domain:** in the Pages project → Custom domains, add `agenticnexus.uk`. Cloudflare will create the DNS records automatically if the domain is already on Cloudflare; otherwise follow the prompted instructions at your registrar.

### DNS quick reference (if not on Cloudflare DNS)

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `agenticnexus.uk` | `<project>.pages.dev` |

(CNAME flattening may be required at the apex — Cloudflare handles this automatically if the zone is on Cloudflare.)

## License

Source: MIT. Content (case study prose, bio): all rights reserved by David Hill.
