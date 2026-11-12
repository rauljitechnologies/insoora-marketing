import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PORTAL_PAGES, SOLUTION_PAGES } from "@/lib/solutions";
import type { PostCategory } from "@/lib/blog";
import { cn } from "@/lib/utils";

// A compact band of internal links, with the reason to follow each one.
//
// ── Why this exists as a component ───────────────────────────────────────
//
// Twelve pages were added to this site and only two things linked to them:
// the header, whose dropdown triggers are BUTTONS and therefore invisible to
// a crawler, and the footer. Everything else on the site pointed inward at
// the seven original pages. That is a site where a third of the content is
// reachable from one place — an orphan shelf in all but name, and the kind of
// structure that looks fine in a sitemap and reads as thin to anything
// following links.
//
// So the pages that logically sit above each shelf now link down into it: the
// home page to all of them, /features to the eight capability pages,
// /product-in-action to the three portal tours, and every article to the two
// or three product pages its subject actually belongs to.
//
// ── Why the links are generated ──────────────────────────────────────────
//
// Every list here is read from `lib/solutions`, so a page cannot be published
// without these bands picking it up, and a page cannot be retired while they
// still point at it. The /admin-portal retirement is the case in point: it
// was removed from the collection, and every one of these lists dropped it
// with no edit.
//
// ── On anchor text ───────────────────────────────────────────────────────
//
// The visible label is the page's `nav.label` — "Policy management",
// "Renewal management" — and NOT its primary keyword. Eleven links reading
// "Insurance Policy Management Software" across one page is exact-match
// anchor stuffing, it reads badly to a human, and the keyword is already the
// destination's own title and H1 where it belongs. The hint underneath is
// what actually tells a reader whether to click.

export interface ExploreLink {
  href: string;
  label: string;
  hint: string;
}

/** The eight capability pages. */
export function solutionLinks(): ExploreLink[] {
  return SOLUTION_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.nav.label, hint: p.nav.hint }));
}

/** The portal tours. */
export function portalLinks(): ExploreLink[] {
  return PORTAL_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.nav.label, hint: p.nav.hint }));
}

/**
 * The product pages an article's shelf belongs to.
 *
 * Keyed on the article's CATEGORY rather than carried per post, deliberately.
 * A per-post field would be better targeted and would also be twelve more
 * places to forget to update when a page is renamed or retired; the category
 * already encodes what the article is about, and a reader of a renewals
 * article wants the renewals page whichever renewals article they are on.
 *
 * The slugs are resolved against the live collection below, so a mapping that
 * names a page which no longer exists yields nothing rather than a dead link.
 */
const BY_CATEGORY: Record<PostCategory, string[]> = {
  "agent-workflow": [
    "insurance-policy-management-software",
    "insurance-renewal-management-software",
    "agent-portal",
  ],
  "policyholder": ["customer-portal", "insurance-crm-software"],
  "how-it-works": [
    "insurance-policy-entry-software",
    "insurance-document-management-software",
  ],
  "choosing": [
    "insurance-policy-management-software",
    "insurance-crm-software",
    "insurance-agency-management-software",
  ],
};

/**
 * The product pages one article should link to.
 *
 * The article's own `productLinks` come FIRST and the category's follow,
 * deduplicated. First because an override is only ever set to name the page
 * the article competes with for a query (see `productLinks` in lib/blog/
 * types), and that is the link that should lead.
 *
 * Capped at three. The band is a row of cards under an article, and a reader
 * who is offered six "related product" links follows none of them; three is
 * also what the internal-linking brief asks for. The cap bites only on an
 * article that sets an override, which is the trade: its most relevant page
 * displaces its category's third.
 *
 * Slugs are resolved against the live collection, so a mapping naming a page
 * that no longer exists yields nothing rather than a dead link.
 */
export function productLinksForPost(post: {
  category: PostCategory;
  productLinks?: string[];
}): ExploreLink[] {
  const all = [...SOLUTION_PAGES, ...PORTAL_PAGES];
  const slugs = [...new Set([...(post.productLinks ?? []), ...BY_CATEGORY[post.category]])];
  return slugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p) => p !== undefined)
    .slice(0, 3)
    .map((p) => ({ href: `/${p.slug}`, label: p.nav.label, hint: p.nav.hint }));
}

/**
 * The band itself.
 *
 * One row per link on a phone, two up from `sm`, three from `shell`. Each is
 * a whole-card link rather than a heading link with a stretched pseudo
 * element: there is no selectable prose in these, so nothing is lost by the
 * card being the target, and it gives a 64px-tall hit area on a phone.
 */
export function ExploreLinks({
  items,
  className,
  columns = 3,
}: {
  items: ExploreLink[];
  className?: string;
  /** Three fits eight links as 3+3+2; two suits a shorter list beside copy. */
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3 sm:grid-cols-2",
        columns === 3 ? "shell:grid-cols-3" : "",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="card-hover group flex h-full flex-col gap-1 rounded-xl border border-border bg-background px-4 py-3 transition-transform hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <span className="flex items-center gap-1.5 text-[15px] font-semibold text-foreground">
              {item.label}
              <ArrowRight
                aria-hidden
                className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5"
              />
            </span>
            <span className="text-[13px] leading-snug text-muted">{item.hint}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
