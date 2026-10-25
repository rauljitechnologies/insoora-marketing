// The two origins this site needs to know about.
//
// The marketing site and the product are separate deployments, so the site
// cannot reach the app with a path: "/agent/login" on the marketing host is a
// 404. Both origins are therefore configuration.
//
// ── Why there is no localhost fallback in production ─────────────────────
//
// There used to be one on both values, and it shipped. The deployed site
// served `http://localhost:3000/agent/register` on every "Get Started", and
// `http://localhost:3100` as its own canonical, Open Graph and JSON-LD `@id`
// URLs — because the environment variables were never set on the deployment
// and the fallbacks silently took over. A localhost link in production is not
// a degraded link, it is a dead one, and a localhost canonical tells a crawler
// to index nothing.
//
// So the fallbacks are now scoped to development, and a production build that
// cannot resolve an origin FAILS rather than inventing one. A build error names
// the variable to set; a localhost link in production is discovered by a
// visitor. See `requireOrigin` below.
//
// `process.env.NEXT_PUBLIC_*` is read as a literal member expression on
// purpose — that is the form Next inlines at build time. Reading it through a
// variable or a helper would leave `undefined` in the browser bundle.

const IS_PRODUCTION = process.env.NODE_ENV === "production";

/** Trailing slashes stripped, so `${origin}${path}` never doubles up. */
function normalize(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/**
 * An empty or whitespace-only variable counts as UNSET.
 *
 * A dashboard that stores a variable with no value, or a shell that exports
 * `FOO=`, both yield `""` — and `""` is a string, so `??` happily keeps it and
 * every fallback below is skipped. That is how a "set it to blank to use the
 * default" instruction turns into a build failure instead.
 */
function present(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * The configured origin, or a hard failure in a production build.
 *
 * `name` is the variable a human has to set — it is quoted back to them in
 * the build log, which is the whole point of failing here rather than later.
 */
function requireOrigin(value: string | undefined, name: string, devFallback: string): string {
  if (value && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(value)) return normalize(value);

  if (!IS_PRODUCTION) return normalize(value ?? devFallback);

  throw new Error(
    `${name} is not set to a public https:// origin.\n\n` +
      `This production build would otherwise emit localhost URLs on every ` +
      `page, which is what previously shipped. Set ${name} in the deployment's ` +
      `environment variables (Vercel → Project → Settings → Environment ` +
      `Variables, for Production and Preview) and redeploy. See .env.example.`,
  );
}

/**
 * This site's own public base URL.
 *
 * Canonical URLs, Open Graph URLs, the sitemap and robots.txt are all built
 * from it. Resolution order:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — the real domain, once it is connected. This
 *      is also the only value that switches indexing on; see
 *      `siteUrlIsConfigured`.
 *   2. `VERCEL_PROJECT_PRODUCTION_URL` — the deployment's own stable
 *      production host, which Vercel sets for us. Not a domain we invented
 *      and not a preview URL, so the canonicals a crawler sees are at least
 *      self-referencing and reachable while the real domain is pending.
 *   3. `VERCEL_URL` — this one deployment's host. Last resort; a preview.
 *
 * Steps 2 and 3 are bare hostnames, so they get the scheme added.
 *
 * Deliberately NOT `NEXT_PUBLIC_`-only: this value is read on the server
 * (metadata, robots.txt, sitemap.xml, JSON-LD) and nowhere in the browser,
 * so the Vercel-provided variables are available to it.
 */
const VERCEL_HOST =
  present(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? present(process.env.VERCEL_URL);

export const SITE_URL = requireOrigin(
  present(process.env.NEXT_PUBLIC_SITE_URL) ?? (VERCEL_HOST ? `https://${VERCEL_HOST}` : undefined),
  "NEXT_PUBLIC_SITE_URL",
  "http://localhost:3100",
);

/**
 * The product's base URL — where the three portals and the API live.
 *
 * Every "Sign in" and "Get Started" control on this site points into it, and
 * `/api/enquiries` relays the contact form to it server-side. There is no
 * fallback for it in production and there cannot be a sensible one: this
 * deployment has no way to discover the product's hostname, and guessing it
 * would send every visitor who presses the site's primary button to a dead
 * URL. Required, therefore — the build says so.
 *
 * `NEXT_PUBLIC_` because the header's sign-in menu is a client component and
 * has to build the same URLs the server-rendered footer does.
 */
export const APP_URL = requireOrigin(
  present(process.env.NEXT_PUBLIC_APP_URL),
  "NEXT_PUBLIC_APP_URL",
  "http://localhost:3000",
);

/** An absolute URL into the product, e.g. `appHref("/agent/login")`. */
export function appHref(path: string): string {
  return `${APP_URL}${path === "/" ? "" : path}`;
}

/** An absolute URL on this site ("/" or "/features"). */
export function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/**
 * True once this site's real domain is configured — the indexing gate.
 *
 * Keyed on `NEXT_PUBLIC_SITE_URL` being set explicitly, NOT merely on
 * `SITE_URL` having resolved to something non-localhost. That distinction is
 * the point: a Vercel host (resolution steps 2 and 3 above) gives the pages
 * valid, self-referencing canonicals, but it must not be indexed, or the
 * `*.vercel.app` copy competes with the real domain the moment that domain is
 * connected — and then has to be de-indexed and redirected. Until someone
 * sets the real domain here, every page is `noindex`, robots.txt disallows
 * everything and the sitemap is empty.
 */
export function siteUrlIsConfigured(): boolean {
  const configured = present(process.env.NEXT_PUBLIC_SITE_URL);
  return configured !== undefined && !/localhost|127\.0\.0\.1/.test(configured);
}
