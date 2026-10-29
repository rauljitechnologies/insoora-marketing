import type { Accent } from "@/lib/accents";

// The blog's content model.
//
// ── Why typed modules and not Markdown or a CMS ──────────────────────────
//
// There is no CMS behind this site and no content collection to read from:
// every page is a static React component, the whole deployment has seven
// runtime dependencies, and the one existing body of long-form prose — the
// three legal documents — is already a typed module in `lib/legal/content.ts`
// rendered by one component. The blog follows that, for three reasons.
//
//   1. Nothing new to install. MDX would mean `@next/mdx` plus a remark
//      toolchain, or `gray-matter` plus a Markdown renderer, to get something
//      this site can already do.
//   2. The compiler enforces the shape. A post that forgets its description,
//      misspells an accent or points `related` at a slug that does not exist
//      fails `tsc`, not review. With front-matter none of that is checked.
//   3. The sitemap can be derived from real data. `sitemap.ts` discovers
//      static routes by walking the filesystem and deliberately SKIPS dynamic
//      segments, so `/blog/[slug]` contributes nothing on its own. It reads
//      this collection instead, which means a post cannot be published
//      without appearing in the sitemap — and cannot appear in the sitemap
//      without being published.
//
// The cost is that writing a post means writing TypeScript, which is a real
// cost if a non-developer ever has to publish one. At that point the right
// move is a CMS, and `PostBlock` below is deliberately a plain data shape
// that a CMS payload could be mapped onto without touching the renderer.

/**
 * One piece of an article body.
 *
 * A closed union rather than a string of HTML or Markdown: the renderer
 * decides how each kind looks, so every article is typographically identical
 * and no post can inject markup that breaks the page or the CSP.
 */
export type PostBlock =
  /** A paragraph. */
  | { kind: "text"; text: string }
  /** A sub-heading inside a section. Renders as an H3. */
  | { kind: "h3"; text: string }
  /** A bulleted list, or a numbered one when `ordered`. */
  | { kind: "list"; items: string[]; ordered?: boolean }
  /** Numbered steps with a title and an explanation each. */
  | { kind: "steps"; steps: { title: string; text: string }[] }
  /** A comparison or reference table. Every row must match `columns`. */
  | { kind: "table"; columns: string[]; rows: string[][] }
  /** An aside. `note` is neutral, `tip` is advice, `warning` is a pitfall. */
  | { kind: "callout"; tone: "note" | "tip" | "warning"; title: string; text: string };

/** One H2 section of an article. These become the table of contents. */
export interface PostSection {
  heading: string;
  blocks: PostBlock[];
}

/** A question and answer at the foot of an article. */
export interface PostFaq {
  q: string;
  a: string;
}

/**
 * One published article.
 *
 * ── On dates ─────────────────────────────────────────────────────────────
 *
 * `published` and `updated` are written by hand as ISO dates and are the real
 * ones. They are NOT derived from file mtimes and NOT defaulted to the build
 * date: a checkout on a CI runner has the clone time on every file, so an
 * mtime-derived date would claim every article was revised on every deploy.
 * `updated` is only ever bumped when the prose actually changes.
 *
 * ── On authorship ────────────────────────────────────────────────────────
 *
 * There is no `author` field, and that is deliberate. The brief for this site
 * allows author information "only when verified", and no individual byline
 * has been verified for these articles. The `BlogPosting` schema therefore
 * names the ORGANISATION as author, which is both true and checkable —
 * inventing a staff writer with a title and a headshot is exactly the kind of
 * unverifiable detail the rest of this site refuses to fabricate.
 */
export interface Post {
  /** The URL segment: `/blog/<slug>`. Must be unique across the collection. */
  slug: string;
  /** The H1 on the page, and the headline on the listing card. */
  title: string;
  /** The `<title>` tag, when it should differ from the H1 — usually to add
   *  keywords a headline should not carry. Falls back to `title`. */
  metaTitle?: string;
  /** The meta description. One sentence or two, written for a search result
   *  rather than as a summary of the summary. */
  description: string;
  /** The standfirst under the H1, and the card summary on the listing. */
  excerpt: string;
  /** ISO date, e.g. "2026-10-30". */
  published: string;
  /** ISO date. Equal to `published` until the article is genuinely revised. */
  updated: string;
  /** The article's hue, used by the hero wash, the chips and the card. */
  accent: Accent;
  /** The shelf this sits on. Shown as a label; see `CATEGORIES`. */
  category: PostCategory;
  /** Which original illustration heads the article. See `blog-art.tsx`. */
  art: PostArt;
  /** Who the article is written for, in a few words. Shown on the card. */
  audience: string;
  sections: PostSection[];
  faqs?: PostFaq[];
  /** Slugs of genuinely related articles. Validated at build time by
   *  `relatedPosts`, which throws rather than rendering a dead link. */
  related: string[];
}

/** The shelves. Kept to three: a label only earns its place if it actually
 *  divides the collection, and five posts do not support more than this. */
export const CATEGORIES = {
  "agent-workflow": "For agents",
  "policyholder": "For policyholders",
  "how-it-works": "How it works",
} as const;

export type PostCategory = keyof typeof CATEGORIES;

/** The named original illustrations. One per article. */
export type PostArt = "filing" | "agency" | "renewals" | "wallet" | "ocr";
