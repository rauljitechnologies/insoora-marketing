import path from "node:path";
import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

// Content Security Policy.
//
// Much tighter than the product's, because this deployment does much less:
// there is no payment gateway, no PDF viewer and no WebAssembly, so none of
// the origins and relaxations those need are listed.
//
//   script-src  'self' plus the inline bootstrap Next emits. 'unsafe-inline'
//               is required because Next's framework scripts are injected
//               inline without a nonce; a nonce-based policy needs every page
//               to become dynamic, which would cost these seven pages the
//               static rendering that is the point of splitting them out.
//               'unsafe-eval' is DEV ONLY — fast refresh and the dev overlay
//               need it, production does not.
//   style-src   'unsafe-inline' is unavoidable: the pages set inline styles
//               for gradients and animation delays.
//   img/font    self and data: URIs only. Inter is self-hosted by next/font,
//               so no external host is needed.
//   connect-src 'self' plus Google Analytics. The contact form posts to this
//               host's own /api/enquiries, which relays to the product
//               server-side, so the form itself needs no other origin.
//
// ── Why the Google origins are listed ────────────────────────────────────
//
// They were not, and the policy and the page disagreed. GA4 (G-C683RQCP76)
// and the Tag Manager container (GTM-5943B5QG) load from
// www.googletagmanager.com, and `script-src 'self' 'unsafe-inline'` has no
// googletagmanager.com in it — so the browser refused both scripts outright,
// and `connect-src 'self'` would have blocked the measurement beacons even
// if they had loaded.
//
// The visible effect was the worst possible shape: the consent banner asked
// a visitor for permission to set analytics cookies, the visitor clicked
// Accept, and the CSP then blocked everything the consent was for. Nothing
// errored anywhere a human would look, and the GA property simply recorded
// no traffic.
//
// Listed as exact origins rather than a wildcard, and ONLY the three things
// GA4 actually needs: the tag scripts, the measurement endpoint, and the
// no-JS pixel fallback. `region1.google-analytics.com` and its siblings are
// why the collection entry is a wildcard subdomain — GA4 routes beacons to a
// regional host, and a bare www.google-analytics.com silently drops them for
// visitors it routes elsewhere.
//
// This widens the policy, so it is worth being explicit about what it does
// NOT do: no new frame-src (no GTM preview iframe), no unsafe-eval added to
// production, and no wildcard on script-src. A container that is changed in
// the GTM UI to inject a third-party tag from some other origin will still
// be blocked here — deliberately. That is a redeploy, not a dashboard edit.

/** Where the GA4 and Tag Manager scripts are served from. */
const GOOGLE_TAGS = "https://www.googletagmanager.com";

// ── The Website Translator ───────────────────────────────────────────────
//
// The footer carries Google's Website Translator (see
// components/marketing/language-translate.tsx), which is a THIRD-PARTY
// SCRIPT THAT REWRITES THE PAGE. That is a materially bigger grant than the
// analytics tags above: GA4 reads the page and phones home, whereas this
// one loads code that edits the DOM and ships the page's text to Google to
// be translated.
//
// It is listed as exact origins and only the ones it actually asks for,
// each of which was found by loading the widget and reading the violations
// rather than by guessing from documentation:
//
//   translate.google.com        the loader, and the toolbar iframe
//   translate.googleapis.com    the translation calls and the widget's CSS
//   translate-pa.googleapis.com the supported-language list. A SEPARATE
//                               host from the one above, fetched by
//                               injecting a <script> (JSONP) — so it needs
//                               script-src, not just connect-src. Blocked,
//                               the control renders with zero options: a
//                               dropdown that opens onto nothing.
//   www.gstatic.com             the widget's static assets and sprites
//   fonts.gstatic.com           serves the Translate product logo as an SVG
//                               IMAGE as well as font faces, so it is on
//                               img-src and font-src both.
//
// Deliberately NOT added: 'unsafe-eval'. It turned out not to be needed —
// the widget loads, lists its languages and translates the page without it.
// If a future version does need it, the right answer is to drop the widget
// rather than allow arbitrary string evaluation on every page of the site.
//
// ── Three things stay blocked, on purpose ────────────────────────────────
//
// Translating a page still produces a handful of CSP refusals in the
// console, and they are all TELEMETRY rather than function. Translation
// works correctly with every one of them blocked, verified in a browser:
//
//   www.google.com/images/cleardot.gif   a 1x1 tracking pixel
//   translate.google.com/gen204?…        a logging beacon, requested over
//                                        plain HTTP — which on an HTTPS
//                                        site is mixed content a browser
//                                        would refuse anyway, and which no
//                                        policy here should invite
//
// Allowing them would widen the policy to buy Google better analytics about
// our visitors, which is the opposite of what the consent gate above exists
// for. The refusals in the console are the policy working, not a defect —
// do not "fix" them by adding the origins.
const GOOGLE_TRANSLATE = [
  "https://translate.google.com",
  "https://translate.googleapis.com",
  "https://translate-pa.googleapis.com",
  "https://www.gstatic.com",
].join(" ");

/** Hosts the widget pulls images and faces from. */
const GOOGLE_STATIC = "https://fonts.gstatic.com";

/** Where GA4 sends measurement beacons. The wildcard covers the regional
 *  collection hosts (`region1.`, `region2.`, …) GA4 routes visitors to. */
const GOOGLE_COLLECT = "https://*.google-analytics.com https://www.google-analytics.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${GOOGLE_TAGS} ${GOOGLE_TRANSLATE}${isProduction ? "" : " 'unsafe-eval'"}`,
  `style-src 'self' 'unsafe-inline' ${GOOGLE_TRANSLATE}`,
  `img-src 'self' data: ${GOOGLE_TAGS} ${GOOGLE_COLLECT} ${GOOGLE_TRANSLATE} ${GOOGLE_STATIC}`,
  `font-src 'self' data: ${GOOGLE_STATIC}`,
  `connect-src 'self' ${GOOGLE_TAGS} ${GOOGLE_COLLECT} ${GOOGLE_TRANSLATE}`,
  // The translated-page toolbar is an iframe Google injects into this
  // document. `frame-ancestors 'none'` below still stops anyone framing US.
  `frame-src ${GOOGLE_TRANSLATE}`,
  "form-action 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  // Not `same-origin` as on the product: the sign-in and Get Started links
  // leave for another host, and the product's access log is more useful with
  // the referring page than without it. Origin only — never the path.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
  // HSTS is production-only on purpose: sent over plain http://localhost it
  // would pin the dev machine to HTTPS for a year.
  ...(isProduction
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : []),
];

// The public pages moved to descriptive URLs (/about → /about-us and so on).
// 308s rather than 307s: the move is permanent, and a crawler that caches the
// redirect stops asking for the old path.
//
// /admin-portal is a RETIREMENT rather than a move. It was a public tour of
// the back office, and the back office is operated by this company rather
// than by an agency — so the page was marketing a portal no visitor can ever
// sign into, and every public link to it has been removed.
//
// A 308 and not a 404, because the page was live, indexed and listed in the
// sitemap: a 404 discards whatever signal the URL had accumulated and breaks
// any link already pointing at it. /agency-management-portal is the nearest
// honest destination — it is the page about how administration actually
// works for an agency, and it is a marketing page rather than the
// authenticated application, which is the thing a retired admin URL must
// never redirect a stranger into.
//
// The page module and its route are deleted rather than left behind a
// redirect, so the sitemap (which discovers routes from the filesystem) and
// llms.txt (which reads the page collection) both drop it with no edit.
const MOVED_PAGES: { source: string; destination: string }[] = [
  { source: "/about", destination: "/about-us" },
  { source: "/contact", destination: "/contact-us" },
  { source: "/privacy", destination: "/privacy-policy" },
  { source: "/terms", destination: "/terms-and-conditions" },
  { source: "/admin-portal", destination: "/agency-management-portal" },
];

const nextConfig: NextConfig = {
  // This app sits inside the product's repository, which has its own
  // package-lock.json one directory up. Turbopack infers a workspace root
  // from the nearest lockfiles, picks the parent, and then resolves the
  // PARENT's src/ — the build fails on the product's server modules, which
  // this deployment neither has nor needs. Pinning the root to this folder
  // is what keeps the two apps genuinely separate while they share a repo.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  async redirects() {
    return MOVED_PAGES.map((p) => ({ ...p, permanent: true }));
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
