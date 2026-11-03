import { CATEGORIES, type Post, type PostBlock, type PostCategory } from "./types";
import { post as organizing } from "./posts/organize-insurance-policy-documents-digitally";
import { post as agency } from "./posts/insurance-agency-management-practical-guide";
import { post as renewals } from "./posts/track-insurance-policy-renewals-and-important-dates";
import { post as policyholders } from "./posts/how-customers-can-keep-insurance-policies-organized";
import { post as ocr } from "./posts/ocr-in-insurance-how-digital-policy-extraction-works";
import { post as buyersGuide } from "./posts/best-insurance-management-software-india";
import { post as whatIsIt } from "./posts/what-is-insurance-policy-management-software";
import { post as crmGuide } from "./posts/best-crm-software-for-insurance-agents-india";
import { post as generalFeatures } from "./posts/general-insurance-management-software-features";
import { post as dataEntry } from "./posts/reduce-manual-insurance-policy-data-entry";
import { post as oneDashboard } from "./posts/manage-multiple-insurance-policies-one-dashboard";
import { post as excelVsCrm } from "./posts/excel-vs-insurance-crm-software";

export * from "./types";

// The published collection.
//
// Imported explicitly rather than discovered from the filesystem. `sitemap.ts`
// walks directories because routes ARE directories — there is no other list to
// consult. Articles are different: a file sitting in `posts/` is a draft until
// someone adds it here, and that line is what makes "published" a decision
// rather than a side effect of saving a file. It also keeps the collection
// usable from a client component if one ever needs it, which a `readdirSync`
// module cannot be.
//
// Adding a post is two steps: write the file, add it below.

const ALL: Post[] = [
  organizing,
  agency,
  renewals,
  policyholders,
  ocr,
  buyersGuide,
  whatIsIt,
  crmGuide,
  generalFeatures,
  dataEntry,
  oneDashboard,
  excelVsCrm,
];

/**
 * Every published post, newest first.
 *
 * Ties are broken by title so the order is stable between builds. That is
 * load-bearing rather than tidy: the first five were published on one day and
 * the next seven on another, so without the tie-break the listing page and the
 * sitemap would reshuffle on every deploy for no reason — and a sitemap that
 * changes while nothing changed tells a crawler nothing.
 */
export const POSTS: Post[] = [...ALL].sort(
  (a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title),
);

// ── Build-time validation ────────────────────────────────────────────────
//
// This module is evaluated during the build, by the sitemap and by every blog
// route, so throwing here fails `next build` rather than shipping a broken
// page. Each check below is something the type system cannot express and that
// would otherwise surface as a 404, a malformed sitemap or a dead link.

function validate(posts: Post[]): void {
  const seen = new Set<string>();
  const slugs = new Set(posts.map((p) => p.slug));

  for (const p of posts) {
    if (seen.has(p.slug)) {
      throw new Error(`blog: two posts share the slug "${p.slug}" — one would be unreachable.`);
    }
    seen.add(p.slug);

    // A slug becomes a URL path segment. Anything outside this set either
    // needs escaping or silently changes the URL.
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) {
      throw new Error(`blog: slug "${p.slug}" is not a clean URL segment (lowercase, digits, single hyphens).`);
    }

    // `lastModified` in the sitemap and `datePublished` in the schema both
    // come from these, and both have to be real dates.
    for (const [field, value] of [["published", p.published], ["updated", p.updated]] as const) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
        throw new Error(`blog: "${p.slug}" has an invalid ${field} date: ${value}`);
      }
    }

    if (p.updated < p.published) {
      throw new Error(`blog: "${p.slug}" claims it was updated (${p.updated}) before it was published (${p.published}).`);
    }

    // A related link pointing at a slug that does not exist is a 404 that
    // nothing else would catch — the listing renders fine and only the link
    // is dead.
    for (const slug of p.related) {
      if (slug === p.slug) {
        throw new Error(`blog: "${p.slug}" lists itself as related.`);
      }
      if (!slugs.has(slug)) {
        throw new Error(`blog: "${p.slug}" links to a related post that does not exist: "${slug}"`);
      }
    }

    // A table with a ragged row renders as a broken grid, which is the kind
    // of thing nobody notices in a long article.
    for (const section of p.sections) {
      for (const block of section.blocks) {
        if (block.kind === "table") {
          for (const row of block.rows) {
            if (row.length !== block.columns.length) {
              throw new Error(
                `blog: "${p.slug}" has a table row with ${row.length} cells but ${block.columns.length} columns.`,
              );
            }
          }
        }
      }
    }
  }
}

validate(POSTS);

/** One post by slug, or undefined — the article route turns that into a 404. */
export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/**
 * The posts a given article points at.
 *
 * Validated above, so this cannot produce a dead link; the filter is for the
 * type, not for safety.
 */
export function relatedPosts(post: Post): Post[] {
  return post.related
    .map((slug) => postBySlug(slug))
    .filter((p): p is Post => p !== undefined);
}

/** Every word in a block, for the reading-time estimate. */
function blockWords(block: PostBlock): string {
  switch (block.kind) {
    case "text":
    case "h3":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "steps":
      return block.steps.map((s) => `${s.title} ${s.text}`).join(" ");
    case "table":
      return [...block.columns, ...block.rows.flat()].join(" ");
    case "callout":
      return `${block.title} ${block.text}`;
  }
}

/**
 * Reading time in whole minutes, counted from the article's own words.
 *
 * 220 words a minute, which is a common midpoint for adult silent reading of
 * non-technical prose. It is an estimate and is labelled as one on the page;
 * the point is to distinguish a four-minute read from a twelve-minute one,
 * not to be precise.
 */
export function readingMinutes(post: Post): number {
  const text = [
    post.excerpt,
    ...post.sections.flatMap((s) => [s.heading, ...s.blocks.map(blockWords)]),
    ...(post.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ].join(" ");

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * The collection grouped onto its shelves, in `CATEGORIES` order.
 *
 * Added when the collection reached twelve. Five articles are a list; twelve
 * are a list nobody scans, and the listing page was leading with one featured
 * card and then eleven identical ones in a flat grid — which also left a
 * half-empty row at the bottom, because eleven is odd.
 *
 * Grouping solves both. It gives a reader arriving from a search result a way
 * to find the two articles near the one they came for, and it gives the page
 * four headings and a contents nav instead of one undifferentiated wall.
 *
 * `exclude` drops the featured post, so the article at the top of the page
 * does not also appear in its shelf below. Empty groups are dropped rather
 * than rendered as a heading with nothing under it, so a category can be
 * declared before it has articles.
 */
export function postsByCategory(
  exclude?: string,
): { id: PostCategory; label: string; posts: Post[] }[] {
  return (Object.keys(CATEGORIES) as PostCategory[])
    .map((id) => ({
      id,
      label: CATEGORIES[id],
      posts: POSTS.filter((p) => p.category === id && p.slug !== exclude),
    }))
    .filter((group) => group.posts.length > 0);
}

/** A date as a reader should see it: "30 October 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The most recent publication or revision across the collection.
 *
 * This is the listing page's honest `lastModified` for the sitemap: /blog
 * changes when a post is added or revised, and at no other time.
 */
export function blogLastModified(): string {
  return POSTS.reduce((latest, p) => (p.updated > latest ? p.updated : latest), POSTS[0].updated);
}
