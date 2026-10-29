import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { GradientText, PageHead, Section } from "@/components/marketing/section";
import { BandPrimaryAction, BandSecondaryAction, CtaBand } from "@/components/marketing/cta";
import { JsonLd } from "@/components/marketing/json-ld";
import { ART_ALT, BlogArt } from "@/components/marketing/blog-art";
import { ACCENT_CHIP } from "@/lib/accents";
import { CATEGORIES, POSTS, formatPostDate, readingMinutes } from "@/lib/blog";
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
    "Practical guides for insurance agents and policyholders: organizing policy documents, running an agency, tracking renewals, and how policy data extraction actually works.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const [lead, ...rest] = POSTS;

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
        lede="Filing policy documents, keeping a book of business current, tracking renewals, and understanding what software can and cannot read off a policy PDF. Written to be useful whether or not you ever use Insoora."
      />

      <Section>
        <h2 className="sr-only">All articles</h2>

        {/* The newest post gets the wide card. With five articles a flat grid
            of five is a 3 + 2 that leaves a hole; leading with one and
            gridding the rest fills the row and gives the page a focal point. */}
        <PostCard post={lead} featured />

        <div className="mt-6 grid gap-6 sm:grid-cols-2 shell:grid-cols-2">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

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
