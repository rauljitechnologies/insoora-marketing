import { siteRoutes } from "@/lib/site-routes";
import { POSTS } from "@/lib/blog";
import type { SectionKind, SolutionPage } from "./types";

import { page as policyManagement } from "./pages/insurance-policy-management-software";
import { page as crm } from "./pages/insurance-crm-software";
import { page as generalInsurance } from "./pages/general-insurance-management-software";
import { page as policyEntry } from "./pages/insurance-policy-entry-software";
import { page as agencyManagement } from "./pages/insurance-agency-management-software";
import { page as renewals } from "./pages/insurance-renewal-management-software";
import { page as documents } from "./pages/insurance-document-management-software";
import { page as soloAgent } from "./pages/insurance-agent-management-software";
import { page as agentPortal } from "./pages/agent-portal";
import { page as customerPortal } from "./pages/customer-portal";
import { page as agencyPortal } from "./pages/agency-management-portal";

export * from "./types";

// The published collection of landing pages, and the checks that keep it
// honest.
//
// Imported explicitly rather than discovered from a directory, for the same
// reason the blog is (see lib/blog/index.ts): a file sitting in `pages/` is a
// draft until someone adds it below, and that line is what makes "published"
// a decision rather than a side effect of saving a file.
//
// ── Why the validation is here and not in a test ─────────────────────────
//
// This module is evaluated during the build — the root layout imports it to
// build the header and footer navigation, and `llms.txt` reads it — so
// throwing here fails `next build` rather than shipping the page. Every check
// below is something the type system cannot express and that would otherwise
// be invisible until a search audit, or until a visitor clicked a dead link.
//
// The checks are ordered from the cheapest mistake to the most expensive one.

/** The eight keyword-led pages, in the order they should be read. */
const SOLUTIONS: SolutionPage[] = [
  policyManagement,
  policyEntry,
  crm,
  generalInsurance,
  renewals,
  documents,
  agencyManagement,
  soloAgent,
];

/**
 * The role tours.
 *
 * Three, not four. There was an /admin-portal tour and it has been retired
 * from the public site: the back office is operated by this company rather
 * than by an agency, so a marketing page for it was describing a portal no
 * visitor can ever sign into. `next.config.ts` redirects the old URL to the
 * agency tour permanently — the page was live and in the sitemap, so a 404
 * would have been the wrong answer.
 *
 * The disclosures that page carried were the valuable part and have not been
 * dropped: who operates the platform, that its queries are not tenant-scoped,
 * the five staff roles and the audit log are now answers in lib/faq, which is
 * where a reader looks for them anyway.
 */
const PORTALS: SolutionPage[] = [agentPortal, customerPortal, agencyPortal];

export const SOLUTION_PAGES: SolutionPage[] = SOLUTIONS;
export const PORTAL_PAGES: SolutionPage[] = PORTALS;
export const ALL_LANDING_PAGES: SolutionPage[] = [...SOLUTIONS, ...PORTALS];

/** The solution pages that belong in one footer column. See `footerColumn`. */
export function solutionsInColumn(column: "product" | "solutions"): SolutionPage[] {
  return SOLUTIONS.filter((p) => p.footerColumn === column);
}

/** One page by slug, or undefined. */
export function landingPageBySlug(slug: string): SolutionPage | undefined {
  return ALL_LANDING_PAGES.find((p) => p.slug === slug);
}

/**
 * The keyword-to-page map, for the record.
 *
 * Exported because a keyword map that lives only in a planning document
 * drifts from the pages it describes within one release. This one is read off
 * the pages themselves, so it cannot.
 */
export function keywordMap(): { slug: string; primary: string; secondary: string[] }[] {
  return ALL_LANDING_PAGES.map((p) => ({
    slug: p.slug,
    primary: p.primaryKeyword,
    secondary: [...p.secondaryKeywords],
  }));
}

// ── Build-time validation ────────────────────────────────────────────────

/** `/blog/<slug>` is a dynamic route, so discovery cannot see it. */
const BLOG_PREFIX = "/blog/";

/**
 * Every path an internal link on one of these pages may point at.
 *
 * The static routes come from the filesystem (lib/site-routes), which is the
 * only trustworthy answer to "does this page exist" — a list maintained
 * beside the links would fail in exactly the way this check exists to catch.
 * Blog articles are added from the published collection, because the article
 * route is a dynamic segment and discovery deliberately skips it.
 */
function linkableRoutes(): Set<string> {
  const routes = siteRoutes();
  // Discovery returns an empty set if `src/app` could not be read — see the
  // note there on why that must not fail a build. With no routes to check
  // against, every link would be reported dead, so the check steps aside
  // rather than making a build fail for a reason that has nothing to do with
  // the links.
  if (routes.size === 0) return routes;
  return new Set([...routes, ...POSTS.map((p) => `${BLOG_PREFIX}${p.slug}`)]);
}

function fail(message: string): never {
  throw new Error(`solutions: ${message}`);
}

/** Normalised for comparison: keyword collisions are not case-sensitive. */
function key(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function validate(pages: SolutionPage[]): void {
  const routes = linkableRoutes();

  const slugs = new Set<string>();
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const keywords = new Map<string, string>();
  const shapes = new Map<string, string>();

  for (const p of pages) {
    // ── Identity ──────────────────────────────────────────────────────
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) {
      fail(`"${p.slug}" is not a clean URL segment (lowercase, digits, single hyphens).`);
    }
    if (slugs.has(p.slug)) fail(`two pages share the slug "${p.slug}" — one would be unreachable.`);
    slugs.add(p.slug);

    // The slug IS the directory name under `src/app`, because the canonical
    // URL is built from it (`solutionMetadata`). If the two ever disagree the
    // page serves a canonical pointing at a 404, which is the single worst
    // SEO defect a page can ship — so it is checked rather than trusted.
    if (routes.size > 0 && !routes.has(`/${p.slug}`)) {
      fail(
        `"${p.slug}" has no route. Create src/app/${p.slug}/page.tsx, or correct the slug — ` +
          `the canonical URL is built from it.`,
      );
    }

    // ── Metadata ──────────────────────────────────────────────────────
    const title = key(p.metaTitle);
    if (titles.has(title)) {
      fail(`"${p.slug}" and "${titles.get(title)}" have the same <title>. Two pages competing on one title is one page too many.`);
    }
    titles.set(title, p.slug);

    const description = key(p.description);
    if (descriptions.has(description)) {
      fail(`"${p.slug}" and "${descriptions.get(description)}" share a meta description.`);
    }
    descriptions.set(description, p.slug);

    // Description LENGTH is not checked here. `pageMetadata` in lib/seo
    // enforces it for every page on the site, including these twelve, and one
    // definition of the limit is worth more than a second copy that can drift
    // from it. What is checked here is uniqueness, which a function that sees
    // one page at a time cannot do.

    // ── The cannibalisation check ─────────────────────────────────────
    //
    // The one check in this file that is a judgement rather than a defect.
    //
    // Two pages targeting one query is not a build error in any mechanical
    // sense — both pages render, both are indexable, nothing 404s. It is
    // still the most expensive mistake available here, because the two pages
    // split the signal for that query and neither ranks as well as one would
    // have. And it is invisible: nobody notices by reading either page.
    //
    // It is also not hypothetical. The brief this shelf was built from
    // assigns "Insurance Agent Management Software" to two different URLs and
    // "Insurance Agency Management Software" to two more. This check is what
    // forced those four pages to be given four distinct queries and four
    // genuinely different angles, rather than being published as written and
    // left to compete.
    const kw = key(p.primaryKeyword);
    if (keywords.has(kw)) {
      fail(
        `"${p.slug}" and "${keywords.get(kw)}" both claim the primary keyword ` +
          `"${p.primaryKeyword}". Give one of them a different query and a different angle, ` +
          `or merge them — two pages on one query is how both of them rank worse.`,
      );
    }
    keywords.set(kw, p.slug);

    // ── Shape ─────────────────────────────────────────────────────────
    if (p.sections.length < 4) {
      fail(`"${p.slug}" has ${p.sections.length} sections. A landing page with less than four is a thin page.`);
    }
    if (p.faqs.length < 4) fail(`"${p.slug}" has ${p.faqs.length} FAQs; four is the floor.`);
    if (p.related.length < 3) {
      fail(`"${p.slug}" has ${p.related.length} outbound links; a page that links nowhere is a dead end.`);
    }
    // A solution page with no footer column is a page with no footer link,
    // which is the orphan this file's link checks exist to prevent — and it
    // would be invisible, because the page itself renders perfectly.
    if (p.group === "solution" && p.footerColumn === undefined) {
      fail(`"${p.slug}" has no footerColumn, so nothing in the footer would link to it.`);
    }

    if (p.checks.length > 4) {
      fail(`"${p.slug}" has ${p.checks.length} hero checks; the hero lays them out two-up and four is the most that fits.`);
    }

    const ids = new Set<string>();
    let limitSections = 0;

    for (const section of p.sections) {
      if (ids.has(section.id)) {
        fail(`"${p.slug}" has two sections with the id "${section.id}" — one anchor would be unreachable.`);
      }
      ids.add(section.id);

      if (section.kind === "limits") limitSections += 1;

      // A ragged row renders as a broken grid, which is the kind of thing
      // nobody notices in a long table.
      if (section.kind === "table") {
        for (const row of section.rows) {
          if (row.length !== section.columns.length) {
            fail(
              `"${p.slug}" section "${section.id}" has a row with ${row.length} cells ` +
                `but ${section.columns.length} columns.`,
            );
          }
        }
      }
    }

    // ── The limits section is mandatory ───────────────────────────────
    //
    // Every other check here prevents a defect. This one enforces an
    // editorial rule, and it is the rule this whole site is built on: a page
    // that lists only what a product does is a page the reader has to
    // discover is incomplete after they have committed a book of business to
    // it. The features page states a limit per feature; these pages state
    // them in a band of their own.
    //
    // Exactly one, not "at least one": two limits sections on one page means
    // the second one is a disclaimer nobody will reach.
    if (limitSections !== 1) {
      fail(
        `"${p.slug}" has ${limitSections} limits sections and must have exactly one. ` +
          `A landing page on this site states what the product does not do.`,
      );
    }

    // ── Section sequence ──────────────────────────────────────────────
    //
    // The brief is explicit that twelve pages must not be one template
    // rendered twelve times, and the honest way to hold that line is to make
    // it checkable. Two pages with the same sequence of section kinds have
    // the same skeleton, whatever their words say.
    //
    // It is a weak guarantee — nothing here stops two pages being boring in
    // different orders — but it is a real one, and it fails loudly the moment
    // somebody adds a page by copying the nearest file.
    const shape = p.sections.map((s) => s.kind as SectionKind).join(",");
    if (shapes.has(shape)) {
      fail(
        `"${p.slug}" has the same section sequence as "${shapes.get(shape)}" (${shape}). ` +
          `Compose it differently — twelve pages built from one skeleton is the template ` +
          `repetition this shelf exists to avoid.`,
      );
    }
    shapes.set(shape, p.slug);

    // ── Internal links ────────────────────────────────────────────────
    //
    // A landing page whose "where to go next" links 404 is worse than one
    // with none: the page looks maintained and is not. Checked against the
    // real route tree plus the published articles.
    if (routes.size > 0) {
      const outbound = [
        ...p.related.map((r) => r.href),
        p.cta.secondary.href,
        // A use case may route the reader onward; those links get the same
        // treatment as the ones in the "where to go next" block.
        ...p.sections.flatMap((s) =>
          s.kind === "usecases" ? s.cases.map((c) => c.href).filter((h) => h !== undefined) : [],
        ),
      ];
      for (const href of outbound) {
        if (!href.startsWith("/")) {
          fail(`"${p.slug}" links to "${href}", which is not a path on this site. External links do not belong in this block.`);
        }
        if (href.includes("#")) {
          fail(`"${p.slug}" links to "${href}". Point these at pages, not at anchors — an anchor that moves breaks silently.`);
        }
        if (!routes.has(href)) {
          fail(`"${p.slug}" links to "${href}", which is not a page on this site.`);
        }
        if (href === `/${p.slug}`) fail(`"${p.slug}" links to itself.`);
      }
    }
  }
}

validate(ALL_LANDING_PAGES);

/**
 * Every article's `productLinks` names a landing page that exists.
 *
 * Checked HERE rather than in lib/blog's own validator, and the direction of
 * the dependency is the reason: this module already imports `POSTS` (see
 * `linkableRoutes`), so lib/blog importing this one back would be a cycle.
 * This is also the module that knows which slugs exist, which is the fact
 * being checked.
 *
 * It matters because the resolver cannot complain. `productLinksForPost` in
 * explore-links maps slugs to pages and filters out anything it cannot
 * resolve — correct behaviour at render time, since a dead link is worse than
 * a missing one, but it means a typo costs an article its most important
 * internal link and nothing anywhere says so. The band simply renders one
 * card fewer. So it fails the build instead.
 */
function validateArticleProductLinks(): void {
  const slugs = new Set(ALL_LANDING_PAGES.map((p) => p.slug));
  for (const post of POSTS) {
    for (const slug of post.productLinks ?? []) {
      if (!slugs.has(slug)) {
        fail(
          `the article "${post.slug}" lists a productLink for "${slug}", which is not a landing page. ` +
            `Valid slugs: ${[...slugs].sort().join(", ")}.`,
        );
      }
    }
  }
}

validateArticleProductLinks();
