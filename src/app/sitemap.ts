import type { MetadataRoute } from "next";
import { absolute, siteUrlIsConfigured } from "@/lib/seo";
import { discoverRoutes } from "@/lib/site-routes";
import { ALL_LANDING_PAGES } from "@/lib/solutions";
import { POSTS, blogLastModified } from "@/lib/blog";

// The public website's sitemap — DISCOVERED, not hand-listed.
//
// ── Why this walks the filesystem ────────────────────────────────────────
//
// The routes come from `discoverRoutes` in lib/site-routes, which reads
// `src/app` itself: every directory containing a `page` module IS a route,
// which is the App Router's own rule, so the sitemap cannot disagree with
// what the site serves. Add a page and it appears here on the next build with
// no edit to this file. That module carries the full rationale and the list
// of what it deliberately skips; it lives there rather than here because
// lib/solutions also needs it, to check that the internal links on the twelve
// landing pages point at pages that exist.
//
// This runs at build time on the server (the sitemap is static), so reading
// the directory is free and never happens on a request.
//
// Dynamic segments are skipped by discovery — a sitemap cannot invent a
// parameter — so `/blog/[slug]` contributes nothing on its own and the
// articles are enumerated from the published collection below.
//
// When no real domain is configured the sitemap is empty rather than full of
// localhost URLs — see robots.ts, which stops advertising it at the same time.

/**
 * How often a page really changes, and how much it matters, by path.
 *
 * Hints only, and only honest ones are given: the home page does change most
 * often, the legal pages barely ever. A path with no entry gets the fallback
 * — so a newly added page lands in the sitemap with sensible values and can
 * be tuned here afterwards, which is the opposite of the old behaviour where
 * a new page was simply missing.
 */
const HINTS: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = {
  "/": { changeFrequency: "monthly", priority: 1 },
  "/features": { changeFrequency: "monthly", priority: 0.9 },
  "/how-it-works": { changeFrequency: "monthly", priority: 0.9 },
  "/product-in-action": { changeFrequency: "monthly", priority: 0.8 },
  "/blog": { changeFrequency: "weekly", priority: 0.8 },
  "/faq": { changeFrequency: "monthly", priority: 0.8 },
  "/about-us": { changeFrequency: "yearly", priority: 0.6 },
  "/contact-us": { changeFrequency: "yearly", priority: 0.6 },
  "/privacy-policy": { changeFrequency: "yearly", priority: 0.3 },
  "/terms-and-conditions": { changeFrequency: "yearly", priority: 0.3 },
  "/refund-and-cancellation": { changeFrequency: "yearly", priority: 0.3 },
};

/**
 * The twelve landing pages, hinted from the collection rather than listed.
 *
 * Twelve more entries typed into `HINTS` by hand would be twelve chances to
 * mistype a slug, and a mistyped key does not fail — it silently falls
 * through to `FALLBACK` while looking like it was tuned. Reading them off the
 * collection also means the next page added gets the right hint for free.
 *
 * Solutions sit a notch above portals because a solution page is the one a
 * search result should land on; a portal tour is a page somebody reaches from
 * it. Both sit below /features, which is still the shelf they hang from.
 */
const LANDING_HINTS = Object.fromEntries(
  ALL_LANDING_PAGES.map((p) => [
    `/${p.slug}`,
    { changeFrequency: "monthly" as const, priority: p.group === "solution" ? 0.8 : 0.75 },
  ]),
);

const FALLBACK = { changeFrequency: "monthly" as const, priority: 0.5 };

/**
 * Why most entries carry NO `lastModified`.
 *
 * Every page used to be stamped with `new Date()` — the moment of the build.
 * That is not a modification date, it is a deployment date, and publishing it
 * as `lastmod` tells a crawler that all eight pages were rewritten every time
 * anything shipped. A `lastmod` that always says "just now" is worse than
 * none: it is unreliable, crawlers learn to ignore it, and it costs the signal
 * on the pages where the date IS real.
 *
 * File mtimes would be no better. A CI checkout writes every file at clone
 * time, so on Vercel they all carry the build date wearing a different hat.
 *
 * So the rule here is: a date is emitted only where something actually
 * records when the content changed. The articles have hand-maintained
 * `published`/`updated` fields, and /blog changes when the collection does.
 * The eight static pages have no such record, so they get no `lastmod` — which
 * the sitemap protocol permits, and which is the honest answer.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrlIsConfigured()) return [];

  // The static pages, discovered from the filesystem. `/blog` is found here
  // too — it is a real `page.tsx` — and is given its date below.
  const staticRoutes: MetadataRoute.Sitemap = discoverRoutes()
    // Stable order: "/" first, then alphabetically. An unstable sitemap
    // produces a diff on every deploy and tells a crawler nothing by changing.
    .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
    .map((route) => ({
      url: absolute(route),
      ...(HINTS[route] ?? LANDING_HINTS[route] ?? FALLBACK),
      // The listing genuinely changes when a post is added or revised, and
      // nothing else makes it change. That is a real date.
      ...(route === "/blog" ? { lastModified: blogLastModified() } : {}),
    }));

  // The articles. `/blog/[slug]` is a DYNAMIC segment, which `discoverRoutes`
  // deliberately skips — it cannot invent parameters — so this is the explicit
  // enumeration that note asks for. It reads the published collection, which
  // means a post cannot go live without appearing here, and a draft that has
  // not been added to the collection cannot appear here while being
  // unreachable.
  const posts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: absolute(`/blog/${post.slug}`),
    lastModified: post.updated,
    changeFrequency: "yearly" as const,
    // Below the pillar pages and above the legal ones. An article is worth
    // crawling; it is not more important than the features page.
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
