import type { Metadata } from "next";
import { SITE_URL, absolute, siteUrlIsConfigured } from "@/lib/site-config";
import { CONTACT, addressOneLine, socialHrefs, streetAddress } from "@/lib/contact";

// Search and AI-answer metadata for the public website.
//
// One module so that a page's title, its canonical URL, its Open Graph card
// and its JSON-LD cannot drift apart — an answer engine that reads a different
// product description from the schema than from the page is being given two
// stories, and the inconsistency is itself a quality signal.
//
// Nothing here is invented. There are no ratings, no review counts, no prices,
// no awards and no customer numbers, because none of those exist yet; schema
// fields that would require them are simply absent rather than filled with
// plausible values.

/**
 * The site's public base URL.
 *
 * Now that the site is its own deployment, this is read straight from
 * `NEXT_PUBLIC_SITE_URL` (see lib/site-config) rather than falling back to
 * the app's origin — the two are different hosts. Kept as a function because
 * every page, the sitemap and the JSON-LD already call it.
 */
export function siteUrl(): string {
  return SITE_URL;
}

// `absolute` and `siteUrlIsConfigured` live in lib/site-config, which the
// client components can also import. Re-exported here so the pages, robots.ts
// and sitemap.ts keep importing them from the one SEO module.
export { absolute, siteUrlIsConfigured };

/** The product, described once. Metadata, JSON-LD and the pages all use this. */
export const PRODUCT = {
  name: "Insoora",
  /** One sentence, in the same words everywhere — consistency is what lets an
   *  answer engine quote the product without paraphrasing it into something
   *  we did not claim. */
  tagline: "Insurance policy management and document intelligence software.",
  summary:
    "Insoora reads insurance policy PDFs, extracts the policy details, files them under the right customer and tracks upcoming renewals, so insurance agents stop re-entering information their documents already contain.",
  category: "BusinessApplication",
  audience: "Insurance agents, insurance agencies and their policyholders in India",
} as const;

/**
 * The Open Graph card every page shares.
 *
 * ── Why this is declared by hand ──────────────────────────────────────────
 *
 * `app/opengraph-image.tsx` is a file convention, and a file convention
 * contributes to the metadata of the segment it sits in. Metadata objects are
 * merged SHALLOWLY (see `generate-metadata.md`, "Merging"): a nested field
 * like `openGraph` defined in a later segment REPLACES the earlier one
 * wholesale rather than being merged key by key.
 *
 * `pageMetadata` returns an `openGraph` object, so every page that called it
 * overwrote the root segment's contribution — including the `images` entry it
 * never set. The result was that the home page had a card (it shares the root
 * segment with the image file) and the other seven pages had none: sharing
 * /features anywhere produced a bare text link, and `summary_large_image`
 * with no image is the worst-looking Twitter card there is.
 *
 * So the card is named explicitly here and spread into both `openGraph` and
 * `twitter` below. A relative URL is correct — `metadataBase` in the root
 * layout resolves it to an absolute one, which both networks require.
 *
 * The hand-written reference loses the cache-busting query Next appends to
 * the file-convention form. That is the right trade: a stale card after an
 * image change is a one-off, a missing card is on every share forever.
 */
export const OG_IMAGE_ALT =
  "Insoora — your insurance, always with you. Insurance policy management software that reads policy PDFs, organizes them by customer and tracks renewals";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
} as const;

interface PageSeo {
  title: string;
  description: string;
  /** Route path, e.g. "/features". Used for the canonical and the OG URL. */
  path: string;
  /**
   * A card of this page's own, replacing the shared one.
   *
   * Needed because `openGraph` here REPLACES whatever a colocated
   * `opengraph-image.tsx` contributed (the shallow-merge rule described on
   * `OG_IMAGE`). The blog articles each generate their own card, and without
   * this they would silently inherit the site-wide one — which is the exact
   * bug `OG_IMAGE` was added to fix, one segment deeper.
   */
  image?: { url: string; alt: string };
}

/**
 * Metadata for one public page.
 *
 * Every page gets its own title and description, a self-referencing canonical,
 * and an Open Graph card. Indexing is allowed only once a real domain is
 * configured: letting a staging host get indexed creates the duplicate content
 * the brief asks us to avoid, and it is the kind of thing nobody notices until
 * the wrong hostname is ranking.
 */
export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
  const url = absolute(path);
  const indexable = siteUrlIsConfigured();
  const card = image ? { ...OG_IMAGE, url: image.url, alt: image.alt } : OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: PRODUCT.name,
      title,
      description,
      url,
      locale: "en_IN",
      images: [card],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [card],
    },
  };
}

// ── JSON-LD ───────────────────────────────────────────────
//
// Emitted only where the visible page supports it, which is why
// `breadcrumbSchema` takes the trail the page actually renders and
// `faqSchema` is used on the FAQ page alone.

/** The organisation behind the product. Only fields we can actually fill. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl()}/#organization`,
    name: CONTACT.name,
    url: siteUrl(),
    description: PRODUCT.summary,
    // The profiles that are the same business elsewhere. This is how an
    // answer engine ties the site to the Facebook page and the Instagram
    // account rather than treating the three as unrelated — and every URL
    // here is also a visible, crawlable link in the footer, which is what
    // keeps the markup and the page telling the same story.
    sameAs: socialHrefs(),
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.state,
      addressCountry: "IN",
      streetAddress: streetAddress(),
      postalCode: CONTACT.address.postalCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
  };
}

/** The website itself. */
export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    name: PRODUCT.name,
    url: siteUrl(),
    description: PRODUCT.summary,
    publisher: { "@id": `${siteUrl()}/#organization` },
    inLanguage: "en-IN",
  };
}

/**
 * The product as software.
 *
 * No `aggregateRating` and no `offers`: there are no published reviews and no
 * public price, and inventing either is the single most common way a rich
 * result gets a manual action.
 */
export function softwareSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${siteUrl()}/#software`,
    name: PRODUCT.name,
    applicationCategory: PRODUCT.category,
    operatingSystem: "Web browser",
    url: siteUrl(),
    description: PRODUCT.summary,
    featureList: [
      "Automated policy data extraction from PDFs",
      "Bulk policy upload",
      "Customer-wise policy organization",
      "Historical policy access",
      "Expiry and renewal tracking",
      "Role-based document access",
      "CSV and Excel export",
    ],
    publisher: { "@id": `${siteUrl()}/#organization` },
  };
}

/** Breadcrumbs, from the trail the page renders. Home is always first. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/**
 * FAQPage, for the FAQ page only.
 *
 * Google's guidelines limit FAQ rich results, and the markup is only valid
 * when every question and answer is visible on the page — so this is built
 * from the same array the page renders, never from a separate list.
 */
export function faqSchema(entries: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.q,
      acceptedAnswer: { "@type": "Answer", text: e.a },
    })),
  };
}

/** Wraps one or more schema objects into a single `@graph` document. */
export function jsonLdGraph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** The organisation's postal address on one line, for human-readable copy. */
export const contactOneLine = addressOneLine;

// ── Blog ─────────────────────────────────────────────────────────────────

/**
 * One article, as `BlogPosting`.
 *
 * ── On `author` ──────────────────────────────────────────────────────────
 *
 * The organisation, not a person. Schema.org wants an author and Google reads
 * it, but no individual byline has been verified for these articles — and the
 * rest of this site refuses to invent facts it cannot stand behind, which
 * includes staff writers. Naming the company is both true and checkable: it
 * resolves to the same `@id` as the Organization node on every page, so the
 * publisher and the author are visibly one entity rather than two claims.
 *
 * ── On dates ─────────────────────────────────────────────────────────────
 *
 * `datePublished` and `dateModified` come from the post's own hand-written
 * fields. They are not build timestamps and not file mtimes: a date that
 * moves every deploy tells a crawler the article was rewritten when it was
 * not, which is a freshness signal we would not have earned.
 *
 * `image` is the article's own generated card (`/blog/<slug>/opengraph-image`),
 * so a result that shows a thumbnail shows that article's, not the site's.
 */
export function blogPostingSchema(post: {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  sectionLabel: string;
}) {
  const url = absolute(`/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.published,
    dateModified: post.updated,
    author: { "@id": `${siteUrl()}/#organization` },
    publisher: { "@id": `${siteUrl()}/#organization` },
    image: absolute(`/blog/${post.slug}/opengraph-image`),
    articleSection: post.sectionLabel,
    inLanguage: "en-IN",
    isAccessibleForFree: true,
  };
}

/** The blog itself, as a `Blog` listing its posts. */
export function blogSchema(posts: { slug: string; title: string; published: string }[]) {
  return {
    "@type": "Blog",
    "@id": `${absolute("/blog")}#blog`,
    name: `${PRODUCT.name} Blog`,
    description:
      "Practical guides on organizing insurance policy documents, running an agency, tracking renewals and how policy data extraction works.",
    url: absolute("/blog"),
    publisher: { "@id": `${siteUrl()}/#organization` },
    inLanguage: "en-IN",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${absolute(`/blog/${p.slug}`)}#article`,
      headline: p.title,
      url: absolute(`/blog/${p.slug}`),
      datePublished: p.published,
    })),
  };
}
