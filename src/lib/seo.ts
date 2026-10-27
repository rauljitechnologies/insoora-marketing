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

interface PageSeo {
  title: string;
  description: string;
  /** Route path, e.g. "/features". Used for the canonical and the OG URL. */
  path: string;
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
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const url = absolute(path);
  const indexable = siteUrlIsConfigured();

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
