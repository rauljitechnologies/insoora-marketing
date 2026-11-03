import { readdirSync } from "node:fs";
import path from "node:path";

// Every static page route this site serves, read from `src/app` itself.
//
// ── Why it is discovered rather than listed ──────────────────────────────
//
// This logic began in `sitemap.ts`, which used to carry a hand-written array
// of seven paths — a list that is correct exactly until someone adds a page.
// A new page is then live, linked from the footer and crawlable, but absent
// from the sitemap, and nothing fails and nothing warns. The Refund &
// Cancellation page was the first to prove it.
//
// It is extracted here because there is now a second consumer with a stronger
// need. `lib/solutions` validates that every internal link on the twelve
// landing pages points at a page that actually exists, and the only
// trustworthy source for "exists" is the route tree — a list maintained
// beside the links would fail in exactly the way it is supposed to catch.
//
// The App Router's own rule is that a directory containing a `page` module IS
// a route, so a set built this way cannot disagree with what the site serves.
//
// ── Server only, by nature rather than by directive ──────────────────────
//
// This reads the filesystem, so it belongs to the build and the server. It is
// imported by `sitemap.ts` (static, built once), by `lib/solutions` (whose
// validation runs at module evaluation) and by the root layout through that —
// all server-side. It must never be pulled into a client component; nothing
// here is marked `"use client"` and nothing in the client tree imports it.

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
 *
 * ── What is deliberately excluded ────────────────────────────────────────
 *
 * `api/` is a route but not a page. Route GROUPS are not URLs as written, and
 * neither are dynamic segments — `[slug]` has no single path, so it is
 * skipped rather than guessed at, and any consumer that needs those has to
 * enumerate them itself (the sitemap reads the blog collection; see
 * `BLOG_PREFIX` in lib/solutions). The private `_folder` convention is not
 * routable at all, and `not-found.tsx` is not a `page` module so never
 * appears.
 */
export function discoverRoutes(dir = APP_DIR, prefix = ""): string[] {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    // The directory not being readable must not fail a build. An empty route
    // set is a recoverable mistake; a failed deploy of an otherwise correct
    // site is not a trade worth making — the same reasoning as the origin
    // warning in lib/site-config.
    //
    // Note what this means for `lib/solutions`: if discovery ever returned
    // nothing, link validation would have no routes to check against. It
    // handles that case explicitly rather than rejecting every link.
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

/** The route set, as a `Set` for membership tests. Computed once per process. */
let cached: Set<string> | undefined;

export function siteRoutes(): Set<string> {
  cached ??= new Set(discoverRoutes());
  return cached;
}
