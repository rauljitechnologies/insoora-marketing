import type { Accent } from "@/lib/accents";

// The content model behind the twelve solution and portal pages.
//
// ── Why these are data and not twelve hand-written pages ─────────────────
//
// The brief asks for eight keyword-led landing pages and four portal
// showcases, each with its own metadata, its own H1, real feature copy, use
// cases, a workflow, FAQs, internal links and a CTA. Written as twelve JSX
// files that is somewhere north of four thousand lines of markup, twelve
// copies of the same heading rhythm, and twelve chances for one of them to
// drift a step out of the design system the way the inner pages did before
// `components/marketing/section.tsx` existed.
//
// So the pages are data and the layout is one renderer, for the same three
// reasons the blog is (see lib/blog/types.ts):
//
//   1. The compiler enforces the shape. A page that forgets its description,
//      points `related` at a route that does not exist or writes a table row
//      with the wrong number of cells fails `tsc`.
//   2. The checks a search audit would make by hand can run at build time.
//      `index.ts` refuses a duplicate title, a duplicate meta description, a
//      description outside the length a result snippet will show, and — the
//      one that matters most here — two pages claiming the same primary
//      keyword. See the note there.
//   3. A section's SHAPE is a decision, taken per page.
//
// Point 3 is the thing this model exists to protect. The brief is explicit
// that twelve pages must not be one template twelve times, and the honest
// way to hold that line is to make "what shape is this section" an
// enumerated choice rather than a default. A page is a sequence of SECTIONS,
// each of which is one of eight kinds — a split with a product screen, a card
// grid, a numbered workflow, a comparison table, a screen gallery, use cases,
// a limits block, plain prose — and no two pages in `pages/` use the same
// sequence. That is a property you can read off the data, and
// `assertDistinctShapes` in index.ts fails the build if it stops being true.
//
// What is deliberately NOT here: anything a page could use to claim something
// the product does not do. There is no `stat` block, no `logos` block, no
// `rating` and no `testimonial`, because the site has no verified figures,
// customer logos, ratings or consented testimonials to put in them (see
// lib/testimonials.ts, which drops unverified entries rather than render
// them). A block type is an invitation; these pages are not invited to
// invent.

/**
 * A product screen, by name.
 *
 * Every one of these is a hand-drawn preview in `components/marketing/
 * product-shots.tsx`, built from the product's own tokens with an invented
 * policy and labelled "Sample data". A page names the screen it wants and the
 * renderer resolves it, which is what keeps the content modules free of JSX —
 * and what makes a swap to genuine cleared screenshots a change in one file.
 */
export type ShotName =
  | "policyList"
  | "extracted"
  | "vault"
  | "renewalTimeline"
  | "searchExport"
  | "agentDashboard"
  | "uploadQueue"
  | "reviewFlag"
  | "customerMatch"
  | "policyHistory"
  | "roleAccess"
  | "exportBuilder"
  | "templateRule"
  | "customerMobile"
  | "subAgentTeam"
  | "customerRenewals"
  | "agentCustomers";

/** A card in a `cards` section: an icon, a claim, and the detail behind it. */
export interface SolutionCard {
  /** An icon name from the renderer's registry — see `ICONS` in
   *  `components/marketing/solution-sections.tsx`. A name rather than a
   *  component so a content module imports nothing and stays serialisable. */
  icon: IconName;
  title: string;
  text: string;
}

/** The icons these pages may draw from. A closed set, so a typo is a type
 *  error rather than a blank square, and so the page vocabulary stays small
 *  enough to read as one family. */
export type IconName =
  | "upload" | "scan" | "folder" | "clock" | "search" | "users" | "team"
  | "lock" | "download" | "table" | "bell" | "shield" | "phone" | "car"
  | "heart" | "building" | "check" | "history" | "keyboard" | "chart"
  | "file" | "link" | "eye" | "settings";

/**
 * One band of a page.
 *
 * Every variant carries `id`, `accent`, `eyebrow` and `heading`: the id is a
 * scroll target and an internal link, and the accent is the section's chapter
 * colour — the rule the home page is built on and the one the inner pages
 * used to ignore (see lib/accents).
 */
interface SectionBase {
  /** Unique within the page. Becomes the `#anchor` and a contents-list link. */
  id: string;
  accent: Accent;
  eyebrow: string;
  heading: string;
  lede?: string;
}

export type SolutionSection =
  /**
   * Copy beside a product screen. The workhorse, and the only kind a page may
   * use more than twice — the renderer alternates its side, so three of these
   * in a row read as a rhythm rather than a repetition.
   */
  | (SectionBase & {
      kind: "split";
      paragraphs: string[];
      bullets?: string[];
      shot: ShotName;
      /** What this capability does NOT do. Rendered as the warning rule the
       *  features page uses. Optional, but a section describing a capability
       *  without one is usually a section that is overclaiming. */
      limit?: string;
    })
  /** A grid of icon cards. For "what you get" sets of four to six. */
  | (SectionBase & { kind: "cards"; cards: SolutionCard[] })
  /** A numbered workflow, inside the tinted panel. */
  | (SectionBase & {
      kind: "steps";
      steps: { title: string; text: string }[];
      /** The screen that sits beside the steps, when one helps. */
      shot?: ShotName;
    })
  /** A comparison or reference table. Every row must match `columns`. */
  | (SectionBase & {
      kind: "table";
      columns: string[];
      rows: string[][];
      note?: string;
    })
  /** Two or three screens with a caption each — the brief's "show the real
   *  interface, readable and prominent" section. */
  | (SectionBase & {
      kind: "screens";
      shots: { shot: ShotName; title: string; text: string }[];
    })
  /** Who this is for and what changes for them. Three or four. */
  | (SectionBase & {
      kind: "usecases";
      cases: {
        who: string;
        situation: string;
        outcome: string;
        /** Makes the outcome a link.
         *
         *  Added for the section at the top of
         *  /insurance-agent-management-software, whose entire job is to send
         *  two of its three readers to a different page. Telling someone the
         *  agency page covers their case and then making them scroll to the
         *  foot of the wrong page to find it is not routing them anywhere.
         *  Validated against the real route set like every other link. */
        href?: string;
      }[];
    })
  /** The limits, collected. Every page has exactly one of these, enforced in
   *  index.ts: a landing page that lists only strengths is the kind this site
   *  does not publish. */
  | (SectionBase & { kind: "limits"; items: { title: string; text: string }[] })
  /** Plain prose, for the sections that are an argument rather than a list. */
  | (SectionBase & { kind: "prose"; paragraphs: string[]; h3?: { heading: string; paragraphs: string[] }[] });

/** The kind discriminator, for the shape checks in index.ts. */
export type SectionKind = SolutionSection["kind"];

/** A question and its answer. Feeds both the page and its FAQPage schema. */
export interface SolutionFaq {
  q: string;
  a: string;
}

/** An internal link out of this page, with the reason to follow it. */
export interface SolutionLink {
  /** A path on this site. Validated against the real route set in index.ts. */
  href: string;
  label: string;
  text: string;
}

/**
 * One published landing page.
 *
 * `group` decides which shelf the page sits on in the header and the footer,
 * and nothing else: both kinds render through the same component.
 */
export interface SolutionPage {
  /** The URL path segment. `/insurance-crm-software`, not `insurance-crm-software`. */
  slug: string;
  group: "solution" | "portal";
  /** The `<title>`. Written for a search result, so it may differ from the H1
   *  and usually carries the keyword earlier than a headline should. */
  metaTitle: string;
  /** The meta description. 70–165 characters, checked at build time. */
  description: string;
  /** The page's chapter colour: the hero wash, the badge, the first section. */
  accent: Accent;
  /** The pill above the H1. */
  badge: string;
  /**
   * The H1, split so the renderer can fill the second half with the brand
   * gradient — the site's one display flourish, which every page's H1 wears
   * so the headings read as one family.
   */
  h1: { lead: string; highlight: string };
  lede: string;
  /** Up to four short reassurances under the lede. */
  checks: string[];
  /** The screen beside the hero copy. */
  heroShot: ShotName;
  /** How this page is named in the header dropdown and the footer. */
  nav: { label: string; hint: string };
  /**
   * Which footer column a solution page sits in.
   *
   * The footer splits the eight across Product and Solutions rather than
   * listing them as one column of eight, which would tower over its
   * neighbours — the column band is deliberately flat. "product" is for the
   * three that describe the core record (what a policy record is, how it
   * gets created, how it is organised by customer); "solutions" is for the
   * five that describe a job done around it.
   *
   * Declared per page rather than derived from the array's order. A footer
   * that changes because somebody reordered an import list is a footer that
   * will one day be wrong without anybody editing it.
   *
   * Required on a solution page, meaningless on a portal tour — the portals
   * have a column of their own.
   */
  footerColumn?: "product" | "solutions";
  /**
   * The one query this page is written to answer.
   *
   * Unique across the collection, enforced in index.ts. The brief's own page
   * list assigns "Insurance Agent Management Software" to two different URLs
   * and "Insurance Agency Management Software" to two more; that check is
   * what forced each of those four pages to be given a distinct query, and it
   * is what will catch the next one.
   */
  primaryKeyword: string;
  /** The queries the page also answers. May repeat across pages — a
   *  secondary keyword is a topic the page touches, not a claim on a SERP. */
  secondaryKeywords: string[];
  sections: SolutionSection[];
  faqs: SolutionFaq[];
  related: SolutionLink[];
  cta: {
    eyebrow: string;
    title: string;
    lede: string;
    /** The second action on the band. The first is always Get Started. */
    secondary: { href: string; label: string };
  };
}
