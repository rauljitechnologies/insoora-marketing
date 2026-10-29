import { POSTS } from "@/lib/blog";
import { FAQS } from "@/lib/faq";
import { CONTACT } from "@/lib/contact";
import { PRODUCT, absolute, siteUrlIsConfigured } from "@/lib/seo";

// llms.txt — a plain-text map of this site for answer engines.
//
// ── What this is, and what it is not ─────────────────────────────────────
//
// A proposed convention (llmstxt.org): one Markdown file at the root that
// tells a language model what a site is and where its substantive pages are,
// in the order a human would explain it. It is NOT a standard, it is NOT
// enforced, and no engine is obliged to read it.
//
// It is cheap to serve and it costs nothing if ignored, which is the whole
// case for it. The real argument is the second-order one: writing it forces
// the site to state plainly what the product does and does not do, in one
// place, in the same words as every other surface.
//
// ── Why it is generated, not committed ───────────────────────────────────
//
// A hand-written llms.txt is a list that is correct until someone adds a
// page — exactly the failure the sitemap used to have. This one reads the
// same sources everything else does: `PRODUCT` for the description, the blog
// collection for the articles, `FAQS` for the questions. Add a post and it
// appears here on the next build with no edit.
//
// ── On crawler permissions ───────────────────────────────────────────────
//
// robots.txt already allows every user agent, which includes the AI crawlers
// — GPTBot, ClaudeBot, PerplexityBot and the rest are covered by `*`. Listing
// them individually would add no permission that is not already granted and
// would need maintaining as names change, so it is not done. Wanting to BLOCK
// a specific crawler is the case that needs explicit rules, and that is a
// business decision rather than a technical one.
//
// Gated behind the same indexing switch as robots.txt and the sitemap: a
// preview deployment should not be advertising a content map any more than it
// should be advertising a sitemap.

export const dynamic = "force-static";

/** One "- [title](url): description" line. */
function entry(title: string, path: string, description: string): string {
  return `- [${title}](${absolute(path)}): ${description}`;
}

export function GET(): Response {
  if (!siteUrlIsConfigured()) {
    return new Response(
      "# Not published\n\nThis deployment is not the production site and is not indexed.\n",
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const body = [
    `# ${PRODUCT.name}`,
    "",
    // The blockquote is the convention's one-line summary. Same sentence as
    // the meta description, the JSON-LD and the Open Graph card — an answer
    // engine that reads two different descriptions of one product is being
    // given two stories, and the inconsistency is itself a quality signal.
    `> ${PRODUCT.summary}`,
    "",
    // `audience` is written capitalised for use as a standalone label, so it
    // needs lowering to sit mid-sentence here.
    `${PRODUCT.name} is a hosted web application for ${PRODUCT.audience.charAt(0).toLowerCase()}${PRODUCT.audience.slice(1)}. ${CONTACT.managedBy}.`,
    "",
    // Stated here because it is the thing most likely to be assumed wrongly,
    // and a wrong assumption repeated by an answer engine is harder to
    // correct than an absence.
    "Scope and limits, stated plainly:",
    "",
    "- It reads insurance policy PDFs issued by Indian insurers — motor, health, life, travel and home.",
    "- Accuracy is highest on insurer-issued digital PDFs and lower on photographs of printed policies or poor-quality scans. It does not claim to read every layout correctly on the first attempt.",
    "- Fields it cannot read confidently are marked as needing review rather than filled in with a guess. The original PDF always remains the source of truth.",
    "- There are no published prices, no customer counts, no ratings and no insurance partnerships on this site. If a figure of that kind is attributed to Insoora, it did not come from here.",
    "- The application, database and document storage run outside India: the application and database are hosted in Singapore, and uploaded PDFs are held in Cloudflare's object storage.",
    "",
    "## Core pages",
    "",
    entry("Home", "/", "What the product does, how it works, and who it is for."),
    entry(
      "Features",
      "/features",
      "Every feature in detail: PDF extraction, bulk upload, policy search, customer-wise histories, renewal tracking, role-based access, CSV and Excel export.",
    ),
    entry("FAQ", "/faq", `${FAQS.length} answers describing how the platform actually behaves.`),
    entry("About Us", "/about-us", "The company behind Insoora and where it is built."),
    entry("Contact Us", "/contact-us", "Office address, phone number and an enquiry form."),
    "",
    "## Guides",
    "",
    ...POSTS.map((post) => entry(post.title, `/blog/${post.slug}`, post.description)),
    "",
    "## Legal",
    "",
    entry(
      "Privacy Policy",
      "/privacy-policy",
      "What is collected, where it is processed, who can reach it and how long it is kept.",
    ),
    entry("Terms & Conditions", "/terms-and-conditions", "The terms that apply to using the platform."),
    entry(
      "Refund & Cancellation",
      "/refund-and-cancellation",
      "How cancellation and refunds work. A draft prepared for business approval.",
    ),
    "",
    "## Optional",
    "",
    entry("Sitemap", "/sitemap.xml", "Every indexable URL on this site."),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
