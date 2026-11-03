import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Eyebrow, GradientText, H2, PageHead, Panel, Section } from "@/components/marketing/section";
import { BandPrimaryAction, BandSecondaryAction, CtaBand } from "@/components/marketing/cta";
import { JsonLd } from "@/components/marketing/json-ld";
import { ART_ALT, BlogArt } from "@/components/marketing/blog-art";
import { ACCENT_CHIP, type Accent } from "@/lib/accents";
import { CATEGORIES, POSTS, type PostCategory, formatPostDate, postsByCategory, readingMinutes } from "@/lib/blog";
import { blogSchema, breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { appHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// The blog listing.
//
// Static like every other page on this site: the collection is a typed module
// (see lib/blog), so there is nothing to fetch and nothing to revalidate. A
// new post is a deploy, which is also what puts it in the sitemap.

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides for insurance agents and policyholders: organizing policy documents, running an agency, tracking renewals, choosing software, and how policy extraction works.",
  path: "/blog",
});

/** Each shelf's hue, so a group heading and its chip are the same colour —
 *  the one-hue-per-chapter rule the rest of the site follows. */
const SHELF_ACCENT: Record<PostCategory, Accent> = {
  "agent-workflow": "blue",
  "how-it-works": "teal",
  "choosing": "red",
  "policyholder": "green",
};

/** One line saying who each shelf is for. A heading alone makes the reader
 *  infer the difference between "For agents" and "How it works"; they can,
 *  slowly, which is the definition of a label that needed a sentence. */
const SHELF_LEDE: Record<PostCategory, string> = {
  "agent-workflow":
    "The work itself: filing documents so they can be found, keeping a book of business current, and staying ahead of renewal dates.",
  "how-it-works":
    "The machinery, explained plainly — what this category of software is, and what actually happens to a policy PDF when something reads it.",
  "choosing":
    "Comparisons and evaluation. No ranked lists of products we have not tested; what to test instead, and the questions that separate them.",
  "policyholder":
    "For the people whose policies these are. Worth sending to a customer who wants to keep track of their own cover.",
};

export default function BlogIndexPage() {
  const [lead] = POSTS;
  // The featured article is excluded from its own shelf, so it appears once.
  const shelves = postsByCategory(lead.slug);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          blogSchema(POSTS.map((p) => ({ slug: p.slug, title: p.title, published: p.published }))),
          breadcrumbSchema([{ name: "Blog", path: "/blog" }]),
        )}
      />

      <PageHead
        trail={[{ name: "Blog", href: "/blog" }]}
        accent="blue"
        badge={
          <>
            <BookOpen aria-hidden className="size-3.5" />
            {POSTS.length} guides
          </>
        }
        title={
          <>
            Guides for the work <GradientText>after the sale</GradientText>
          </>
        }
        lede="Filing policy documents, keeping a book of business current, tracking renewals, choosing between the products in this market, and understanding what software can and cannot read off a policy PDF. Written to be useful whether or not you ever use Insoora — including the comparisons, which carry no ranked lists of products we have not tested."
      />

      <Section>
        {/* The newest post gets the wide card: leading with one gives the page
            a focal point, and the remaining eleven are grouped rather than
            gridded flat.

            They used to be a flat grid, which was right at five articles and
            stopped being right at twelve — eleven identical cards in two
            columns is a wall, and eleven is odd, so it also left a half-empty
            row at the bottom. Grouping by shelf gives the page four headings,
            a contents nav, and a way for a reader who arrived on one article
            to find the two nearest it. */}
        <h2 className="sr-only">Latest article</h2>
        <PostCard post={lead} featured />
      </Section>

      <Section tone="surface" className="!pt-0">
        <Panel className="gap-5 !p-6 sm:!p-8">
          <Eyebrow accent="blue">On this page</Eyebrow>
          <nav aria-label="Article categories">
            <ul className="flex flex-wrap gap-2">
              {shelves.map((shelf) => (
                <li key={shelf.id}>
                  <a
                    href={`#${shelf.id}`}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border bg-background px-3.5 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5",
                      ACCENT_CHIP[SHELF_ACCENT[shelf.id]],
                    )}
                  >
                    {shelf.label}
                    <span className="text-xs opacity-70">{shelf.posts.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Panel>
      </Section>

      {shelves.map((shelf, i) => (
        <Section
          key={shelf.id}
          id={shelf.id}
          tone={i % 2 === 0 ? "background" : "surface"}
          className="border-t border-border !pt-12"
        >
          <div className="flex flex-col gap-2.5">
            <Eyebrow accent={SHELF_ACCENT[shelf.id]}>
              {shelf.posts.length} {shelf.posts.length === 1 ? "article" : "articles"}
            </Eyebrow>
            <H2>{shelf.label}</H2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/70">
              {SHELF_LEDE[shelf.id]}
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {shelf.posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      ))}

      <CtaBand
        eyebrow="Try it on your own policies"
        title="Stop re-typing what the policy already says"
        lede="Upload a policy PDF and Insoora reads the fields, files them under the customer and tracks the expiry date."
        actions={
          <>
            <BandPrimaryAction href={appHref("/agent/register")} external>
              Get Started
            </BandPrimaryAction>
            <BandSecondaryAction href="/features">See the features</BandSecondaryAction>
          </>
        }
      />
    </>
  );
}

/**
 * One article card.
 *
 * The whole card is NOT a link. The heading is, and the card is styled to
 * respond to that link's hover and focus via `group-has-focus-visible` — so a
 * keyboard user gets the same affordance a mouse user does without the card
 * swallowing the text selection and the date into one enormous click target.
 */
function PostCard({ post, featured = false }: { post: (typeof POSTS)[number]; featured?: boolean }) {
  const minutes = readingMinutes(post);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-card transition-all",
        "hover:-translate-y-0.5 hover:shadow-pop has-[a:focus-visible]:-translate-y-0.5 has-[a:focus-visible]:shadow-pop",
        featured && "shell:flex-row",
      )}
    >
      <div className={cn("shrink-0 overflow-hidden border-b border-border", featured && "shell:w-[22rem] shell:border-b-0 shell:border-r")}>
        <BlogArt
          art={post.art}
          accent={post.accent}
          alt={ART_ALT[post.art]}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6", featured && "shell:justify-center shell:p-9")}>
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] font-semibold",
              ACCENT_CHIP[post.accent],
            )}
          >
            {CATEGORIES[post.category]}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] text-muted">
            <Clock aria-hidden className="size-3.5" />
            {minutes} min read
          </span>
        </div>

        <h3
          className={cn(
            "text-balance font-bold leading-[1.2] tracking-[-0.02em] text-foreground",
            featured ? "text-[22px] sm:text-[27px]" : "text-[19px]",
          )}
        >
          {/* `after:absolute after:inset-0` stretches this one link over the
              card, so the whole card is clickable while only the heading is
              in the accessibility tree as a link. */}
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        <p className={cn("text-pretty leading-relaxed text-foreground/70", featured ? "text-[16px]" : "text-[15px]")}>
          {post.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2 text-[13px] text-muted">
          <time dateTime={post.published}>{formatPostDate(post.published)}</time>
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            Read
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
