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
//   connect-src 'self' alone. The contact form posts to this host's own
//               /api/enquiries, which relays to the product server-side —
//               the browser never talks to another origin.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
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
const MOVED_PAGES: { source: string; destination: string }[] = [
  { source: "/about", destination: "/about-us" },
  { source: "/contact", destination: "/contact-us" },
  { source: "/privacy", destination: "/privacy-policy" },
  { source: "/terms", destination: "/terms-and-conditions" },
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
