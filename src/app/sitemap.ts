import { readdirSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { absolute, siteUrlIsConfigured } from "@/lib/seo";
import { POSTS, blogLastModified } from "@/lib/blog";

// The public website's sitemap — DISCOVERED, not hand-listed.
//
// ── Why this walks the filesystem ────────────────────────────────────────
//
// This used to be an array of seven paths maintained by hand, and that is a
// list which is correct exactly until someone adds a page. A new page is then
// live, linked from the footer and crawlable, but absent from the sitemap —
// and nothing fails, nothing warns, and the omission is invisible until
// somebody thinks to compare the two by eye. The Refund & Cancellation page
// was the first to prove it.
//
// So the routes are read from `src/app` itself: every directory that contains
// a `page.tsx` IS a route, which is the App Router's own rule, so the sitemap
// cannot disagree with what the site actually serves. Add a page and it is in
// the sitemap on the next build with no edit here.
//
// This runs at build time on the server (the sitemap is static), so reading
// the directory is free and never happens on a request.
//
// ── What is deliberately excluded ────────────────────────────────────────
//
// `api/` is a route but not a page. Route GROUPS — `(marketing)` — and
// dynamic segments — `[id]`, `[...slug]` — are not URLs as written, and the
// private `_folder` convention is not routable at all. `not-found.tsx` is not
// a `page.tsx` and so never appears. If a dynamic route is ever added, it has
// to be enumerated explicitly: a sitemap cannot invent its parameters, and
// `DYNAMIC_SEGMENT` below makes that a visible skip rather than a wrong URL.
//
// When no real domain is configured the sitemap is empty rather than full of
// localhost URLs — see robots.ts, which stops advertising it at the same time.

/** The App Router directory this site's routes are read from. */
const APP_DIR = path.join(process.cwd(), "src", "app");

/** `[id]`, `[...slug]`, `[[...opt]]` — a parameterised segment. */
const DYNAMIC_SEGMENT = /^\[.*\]$/;

/** `(marketing)` — organises files without appearing in the URL. */
const ROUTE_GROUP = /^\(.*\)$/;

/** Directory names that are never part of the public page tree. */
const NOT_A_PAGE = new Set(["api"]);

/**
 * Every static page route under `src/app`, as URL paths.
 *
 * Returns "/" for `src/app/page.tsx` and "/features" for
 * `src/app/features/page.tsx`. A route group contributes nothing to the path
 * but is still descended into, which is how `(marketing)/about-us/page.tsx`
 * would correctly yield "/about-us".
 */
function discoverRoutes(dir = APP_DIR, prefix = ""): string[] {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    // The directory not being readable must not fail a build. An empty
    // sitemap is a recoverable mistake; a failed deploy of an otherwise
    // correct site is not a trade worth making — the same reasoning as the
    // origin warning in lib/site-config.
    return [];
  }

  const found: string[] = [];

  // A directory is a route only if it holds a page. `.tsx` and `.ts` both
  // count, because either is a valid page module.
  if (entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(e.name))) {
    found.push(prefix === "" ? "/" : prefix);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("_") || name.startsWith(".")) continue;
    if (NOT_A_PAGE.has(name)) continue;
    // A parameterised route has no single URL, so it is skipped rather than
    // guessed at. Enumerate it here explicitly if one is ever added.
    if (DYNAMIC_SEGMENT.test(name)) continue;

    found.push(
      ...discoverRoutes(
        path.join(dir, name),
        // A route group adds a folder but not a path segment.
        ROUTE_GROUP.test(name) ? prefix : `${prefix}/${name}`,
      ),
    );
  }

  return found;
}

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
  "/blog": { changeFrequency: "weekly", priority: 0.8 },
  "/faq": { changeFrequency: "monthly", priority: 0.8 },
  "/about-us": { changeFrequency: "yearly", priority: 0.6 },
  "/contact-us": { changeFrequency: "yearly", priority: 0.6 },
  "/privacy-policy": { changeFrequency: "yearly", priority: 0.3 },
  "/terms-and-conditions": { changeFrequency: "yearly", priority: 0.3 },
  "/refund-and-cancellation": { changeFrequency: "yearly", priority: 0.3 },
};

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
      ...(HINTS[route] ?? FALLBACK),
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
