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
// So the localhost fallbacks are scoped to development. In production an
// unset variable falls back to the origin recorded in `.env.example` — this
// project's own stated configuration, not a hostname invented here — and the
// build logs a loud warning naming the variable.
//
// It deliberately does NOT fail the build. That was the first attempt, on the
// reasoning that a failed deploy is seen in a log and a bad link is seen by a
// customer. It is the wrong trade: it blocks every deploy of a site whose
// seven pages are otherwise correct and whose only defect is one link's
// destination, and it blocks it hardest exactly when nobody yet knows the
// product's final hostname. A warning that is read at leisure beats a
// deployment that cannot happen.
//
// `process.env.NEXT_PUBLIC_*` is read as a literal member expression on
// purpose — that is the form Next inlines at build time. Reading it through a
// variable or a helper would leave `undefined` in the browser bundle.

// ── The production defaults ──────────────────────────────────────────────
//
// Both are the values committed in `.env.example`, which is where this
// project records its intended hostnames. Neither is verified to resolve:
// at the time of writing `app.insoora.com` and `www.insoora.com` both fail
// DNS, because the custom domain has not been connected yet.
//
// That is fine for `DEFAULT_SITE_URL`, which only ever supplies a canonical
// on a page that is `noindex` anyway (see `siteUrlIsConfigured`), and on
// Vercel it is never reached at all — the two `VERCEL_*` hosts come first.
//
// It is NOT fine for `DEFAULT_APP_URL`: until that origin serves the product,
// "Sign in" and "Get Started" lead somewhere that does not answer. Setting
// `NEXT_PUBLIC_APP_URL` to the origin the product is really on is the one
// piece of configuration this deployment cannot work out for itself.
const DEFAULT_SITE_URL = "https://www.insoora.com";
const DEFAULT_APP_URL = "https://app.insoora.com";

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
 * The configured origin, or the right fallback for the environment.
 *
 * `name` is the variable a human has to set; it is quoted back to them in the
 * build log, which is the entire purpose of the warning. The warning fires
 * once per build (this module is evaluated once per bundle), goes to stderr,
 * and does not fail the build.
 */
function resolveOrigin(
  value: string | undefined,
  name: string,
  { production, development }: { production: string; development: string },
): string {
  // Anything explicitly configured and not pointing at a loopback address
  // wins outright, in every environment.
  if (value && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(value)) return normalize(value);

  if (!IS_PRODUCTION) return normalize(value ?? development);

  console.warn(
    `\n⚠  ${name} is not set to a public origin.\n` +
      `   Falling back to ${production} (from .env.example).\n` +
      `   If that is not where this points in production, set ${name} in the\n` +
      `   deployment's environment variables — Vercel → Project → Settings →\n` +
      `   Environment Variables, for Production and Preview — and redeploy.\n`,
  );
  return normalize(production);
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

export const SITE_URL = resolveOrigin(
  present(process.env.NEXT_PUBLIC_SITE_URL) ?? (VERCEL_HOST ? `https://${VERCEL_HOST}` : undefined),
  "NEXT_PUBLIC_SITE_URL",
  { production: DEFAULT_SITE_URL, development: "http://localhost:3100" },
);

/**
 * The product's base URL — where the three portals and the API live.
 *
 * Every "Sign in" and "Get Started" control on this site points into it, and
 * `/api/enquiries` relays the contact form to it server-side. This is the one
 * value that genuinely has to be set: unset, the whole conversion path leads
 * to `DEFAULT_APP_URL`, which is this project's intended host but is not yet
 * answering. The build warns rather than failing, so check the deploy log.
 *
 * `NEXT_PUBLIC_` because the header's sign-in menu is a client component and
 * has to build the same URLs the server-rendered footer does.
 */
export const APP_URL = resolveOrigin(
  present(process.env.NEXT_PUBLIC_APP_URL),
  "NEXT_PUBLIC_APP_URL",
  { production: DEFAULT_APP_URL, development: "http://localhost:3000" },
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
