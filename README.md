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

## Configuration

Two variables, both required in production (see `.env.example`):

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | This site's own domain. Canonicals, Open Graph URLs, `sitemap.xml` and `robots.txt` are built from it. |
| `NEXT_PUBLIC_APP_URL` | The product's domain. Every "Sign in" / "Get Started" link points into it, and the enquiry relay posts to it. |

Both are `NEXT_PUBLIC_` and therefore **inlined at build time** — changing
either needs a redeploy, not a restart.

Until `NEXT_PUBLIC_SITE_URL` is set to a real, non-localhost domain, every
page is `noindex` and the sitemap is empty. That is deliberate: it stops a
Vercel preview URL being indexed next to the real site.

## Deploying to Vercel

1. New project from this repository.
2. **Root Directory** → `marketing`. ("Include files outside the root
   directory" can stay off — this app needs nothing above it.)
3. Framework preset: Next.js. Build command, output and install command are
   all the defaults.
4. Environment variables: the two above, for Production and Preview.
5. Add the apex domain here; the product keeps its own hostname.

The product's own deployment is unaffected — it is still the repository root,
and it still builds exactly as before.

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

`app/globals.css` is the product's file verbatim, including the
`.portal-agent` and `.portal-customer` theme blocks that nothing here renders.
They are a few hundred bytes of unused custom properties, and keeping the file
byte-identical makes it diffable against the product's copy — which matters
more than the bytes.
# insoora-marketing
