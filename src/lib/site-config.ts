// The two origins this site needs to know about.
//
// The marketing site and the product are separate deployments now, so the
// site cannot reach the app with a path: "/agent/login" on the marketing
// host is a 404. Both origins are therefore configuration, and both are
// `NEXT_PUBLIC_` because the header's sign-in menu is a client component and
// has to build the same URLs the server-rendered footer does.
//
// `process.env.NEXT_PUBLIC_*` is read as a literal member expression on
// purpose — that is the form Next inlines at build time. Reading it through a
// variable or a helper would leave `undefined` in the browser bundle.

/**
 * This site's own public base URL, trailing slash stripped.
 *
 * Canonical URLs, Open Graph URLs, the sitemap and robots.txt are all built
 * from it. The dev fallback keeps those valid locally; in production it must
 * be the real domain, because a canonical pointing at localhost tells a
 * crawler to index nothing. Indexing stays off until it is set — see
 * `siteUrlIsConfigured`.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100").replace(/\/+$/, "");

/**
 * The product's base URL — where the three portals and the API live.
 *
 * Every "Sign in" and "Get Started" control on this site points into it, so
 * an unset value in production means the whole conversion path leads to a
 * 404. The dev fallback is the app's own `next dev` port.
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/** An absolute URL into the product, e.g. `appHref("/agent/login")`. */
export function appHref(path: string): string {
  return `${APP_URL}${path === "/" ? "" : path}`;
}

/** An absolute URL on this site ("/" or "/features"). */
export function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** True once a real domain is configured — guards indexing. */
export function siteUrlIsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL) && !/localhost|127\.0\.0\.1/.test(SITE_URL);
}
