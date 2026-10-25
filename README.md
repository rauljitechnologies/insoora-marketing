# Insoora — marketing site

The seven public pages (`/`, `/features`, `/faq`, `/about-us`, `/contact-us`,
`/privacy-policy`, `/terms-and-conditions`), as their own Next.js app so they
can be deployed and scaled apart from the product.

It lives inside the product's repository but shares nothing with it at build
time: its own `package.json`, its own `node_modules`, its own `tsconfig.json`
with its own `@/*` root, and `turbopack.root` pinned to this folder so the
parent's lockfile cannot drag the product's server code into the graph. The
parent's `tsconfig`, `eslint.config.mjs`, `.dockerignore` and
`outputFileTracingExcludes` all exclude `marketing/`, so neither app builds,
lints or type-checks the other.

## What is here, and what is not

Every page is **statically rendered** — nothing reads a cookie, a session or a
database, and there is no Prisma client, no S3, no OCR and no AI dependency.
That is the point of the split: these seven pages are the ones a stranger
hits, and they are now plain static files on a CDN.

There is exactly one dynamic route: `app/api/enquiries/route.ts`, which
**relays** the Contact Us form to the product's `/api/enquiries` server-side.
Enquiries are still rows in the product's database, still validated by the
product, still rate-limited per IP by the product — this is a pipe, not a
second implementation. Posting at the product directly from the browser would
have meant opening CORS on an endpoint whose cross-site rejection is the CSRF
defence protecting every other route on that host.

The relay does do one thing of its own: it enforces the form's honeypot. The
field was rendered off-screen on the page but never submitted, so it caught
nothing. It is checked here and then **deleted from the body before
forwarding**, so the product receives exactly the request it received before —
this side cannot see the product's request schema and does not guess at it. A
submission with the trap filled in is answered with a 202 and discarded.

## Configuration

Two variables (see `.env.example`), and they are **not** both required:

| Variable | Required? | What it is |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | **Yes, in production** | The product's origin. Every "Sign in" / "Get Started" link points into it, and the enquiry relay posts to it. |
| `NEXT_PUBLIC_SITE_URL` | No — it is the indexing switch | This site's own domain. Canonicals, Open Graph URLs, `sitemap.xml` and `robots.txt` are built from it. |

Both are `NEXT_PUBLIC_` and therefore **inlined at build time** — changing
either needs a redeploy, not a restart.

### No localhost in production, by construction

Both variables used to fall back to `http://localhost:*` in every
environment, and that is what shipped: the deployed site served
`http://localhost:3000/agent/register` on every primary button and
`http://localhost:3100` as its own canonical and JSON-LD `@id`, because
neither variable was ever set on the deployment.

So `lib/site-config.ts` now resolves them like this:

- **`NEXT_PUBLIC_APP_URL`** — the variable, or the dev fallback outside
  production. A **production build fails** if it is unset or points at
  localhost. There is no honest fallback: this deployment cannot discover the
  product's hostname, and a guess sends every converting visitor to a dead
  URL. The build error names the variable.
- **`NEXT_PUBLIC_SITE_URL`** — the variable, else
  `VERCEL_PROJECT_PRODUCTION_URL`, else `VERCEL_URL`, else the dev fallback.
  Vercel sets those two itself, so canonicals are always a real, reachable,
  self-referencing origin even before the domain is connected.

An empty or whitespace-only value counts as unset, so a blank variable in a
dashboard takes the fallback rather than failing the build.

### Indexing

Indexing is gated on `NEXT_PUBLIC_SITE_URL` being set **explicitly**, not
merely on the resolved URL being non-localhost:

- **unset** → canonicals use the Vercel production host, every page is
  `noindex, nofollow`, `robots.txt` is `Disallow: /`, and the sitemap is
  empty. That is what keeps the `*.vercel.app` copy out of the index, so it
  never has to be de-indexed and redirected later.
- **set** → that domain becomes canonical and the whole site becomes
  indexable.

**Set it only once the domain actually resolves.** Setting it to a domain
whose DNS is not live yet makes seven indexable pages whose canonical points
at nothing.

## Deploying to Vercel

1. New project from this repository.
2. **Root Directory** → `marketing`. ("Include files outside the root
   directory" can stay off — this app needs nothing above it.)
3. Framework preset: Next.js. Build command, output and install command are
   all the defaults.
4. Environment variables, for Production **and** Preview:
   - `NEXT_PUBLIC_APP_URL` — required; the build fails without it.
   - `NEXT_PUBLIC_SITE_URL` — leave unset until the custom domain resolves.
5. Add the domain here when it is ready; the product keeps its own hostname.
   Then set `NEXT_PUBLIC_SITE_URL` to it and redeploy to switch indexing on.

The product's own deployment is unaffected — it is still the repository root,
and it still builds exactly as before.

## Before this is a public launch

Two things are deliberately unfinished and visible on the page:

- **The legal pages are drafts.** `lib/legal/content.ts` marks every statement
  that needs a real fact or a legal decision, and those render as "Needs
  review" callouts with a draft banner at the top of the document. Complete
  the review, then set `LEGAL_REVIEW_FLAGS=off`. Nothing was invented to fill
  those gaps, which is why they are visible rather than silent.
- **There are no product screenshots.** Every product visual on the site is
  drawn in markup from an invented policy and labelled as sample data. A real
  screenshot of a signed-in screen would carry a real policyholder's name,
  number and premium. Replace them with cleared screenshots when there are
  some.

## Local development

```bash
npm install
npm run dev        # http://localhost:3100
```

Port 3100, so it can run beside the product's `next dev` on 3000. With no
`.env.local`, `NEXT_PUBLIC_APP_URL` falls back to `http://localhost:3000`, so
the sign-in links reach a product running locally.

```bash
npm run build      # production build
npm run typecheck
npm run lint
```

## Known duplication

Nine files are copies of the product's, not imports: `lib/utils.ts`,
`lib/contact.ts`, `lib/faq.ts`, `lib/legal/content.ts`, `lib/seo.ts`,
`components/brand.tsx`, `components/ui/index.tsx`, `app/globals.css` and the
icon assets. Two separate deployments cannot import across a repository
boundary without a workspace or a published package, and neither was worth
introducing for this.

Three of them are the ones to watch, because a stale copy is *visible*:

- **`lib/contact.ts`** — the phone number and postal address. If this and the
  product's disagree, the site publishes a number nobody answers.
- **`lib/legal/content.ts`** — the Privacy Policy and Terms text.
- **`components/brand.tsx`** / **`app/globals.css`** — the logo and the design
  tokens. A drift here shows up as the site and the product looking like two
  products.

`app/globals.css` is **no longer byte-identical** to the product's. It used to
be, for diffability, and it carried the whole portal design system with it:
the `.portal-customer` and `.portal-agent` token blocks, the agent portal's
"aurora console" (~500 lines of surfaces, nav markers, panels and keyframes),
the upload queue's live-processing animations, and a set of entrance utilities,
skeletons and scrollbar styling. None of it is reachable on this host — no
element here carries those classes — but hand-written CSS is not tree-shaken
the way Tailwind utilities are, so all of it was being emitted into the
stylesheet every visitor downloads. Removing it took the file from 1528 to 644
lines and the built CSS from 88.8 kB to 74.0 kB (13.8 → 11.3 kB brotli).

What the two files still share, and what is therefore worth diffing, is
everything the shared `components/ui` primitives read: the `:root` token set,
the type and radius scales, the breakpoint scale, the focus and safe-area
rules, and `.card-hover`. The removed block is listed in a comment at the top
of the file.
