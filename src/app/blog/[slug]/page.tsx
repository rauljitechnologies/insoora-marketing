import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { Breadcrumb, Container } from "@/components/marketing/section";
import { BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand } from "@/components/marketing/cta";
import { JsonLd } from "@/components/marketing/json-ld";
import { ART_ALT, BlogArt } from "@/components/marketing/blog-art";
import { BlogProse, inline, sectionId } from "@/components/marketing/blog-prose";
import { ACCENT_CHIP, ACCENT_TEXT, heroWash } from "@/lib/accents";
import {
  CATEGORIES,
  POSTS,
  formatPostDate,
  postBySlug,
  readingMinutes,
  relatedPosts,
} from "@/lib/blog";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  pageMetadata,
} from "@/lib/seo";
import { appHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// One article.
//
// Statically generated for every slug in the collection — `generateStaticParams`
// below enumerates them, so these are prerendered HTML files like the rest of
// the site rather than rendered per request.
//
// `dynamicParams = false` is what makes an unknown slug a real 404 at build
// time rather than an attempt to render a post that does not exist. Without
// it, /blog/anything-at-all would be a server render that then calls
// `notFound()` — the same outcome for a reader, but a dynamic route and a
// soft-404 risk for a crawler.

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    // The article's own generated card, named explicitly. Without this the
    // shared site card wins: `pageMetadata` declares `openGraph`, and that
    // replaces whatever the colocated `opengraph-image.tsx` contributed —
    // the same shallow-merge rule that left seven pages with no card at all.
    // `blogPostingSchema` points at this same URL, so the share preview and
    // the structured data cannot disagree.
    image: {
      url: `/blog/${post.slug}/opengraph-image`,
      alt: `${post.title} — an Insoora guide`,
    },
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const minutes = readingMinutes(post);
  const related = relatedPosts(post);
  const revised = post.updated !== post.published;

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          blogPostingSchema({
            slug: post.slug,
            title: post.title,
            description: post.description,
            published: post.published,
            updated: post.updated,
            sectionLabel: CATEGORIES[post.category],
          }),
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          // Only when the article actually carries a Q&A block. The markup is
          // valid only if every question and answer is visible on the page,
          // and it is built from the same array rendered below.
          ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
        )}
      />

      <article>
        <header
          className="overflow-hidden border-b border-[#E6EEFB]"
          style={{ background: heroWash(post.accent) }}
        >
          <Container className="py-11 sm:py-14">
            <div className="grid items-center gap-10 rail:grid-cols-[minmax(0,1fr)_22rem] rail:gap-14">
              <div className="pv-rise flex min-w-0 flex-col items-start">
                <Breadcrumb
                  trail={[
                    { name: "Blog", href: "/blog" },
                    { name: post.title, href: `/blog/${post.slug}` },
                  ]}
                />
                <span
                  className={cn(
                    "mt-5 inline-flex items-center rounded-full border px-3 py-1.5 text-[13px] font-semibold",
                    ACCENT_CHIP[post.accent],
                  )}
                >
                  {CATEGORIES[post.category]}
                </span>
                <h1 className="mt-4 max-w-3xl text-balance text-[31px] font-extrabold leading-[1.08] tracking-[-0.032em] text-foreground sm:text-[39px] shell:text-[44px]">
                  {post.title}
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/70">
                  {post.excerpt}
                </p>

                {/* The byline. No person is named — see `blogPostingSchema`
                    for why — so this carries the facts that are verifiable:
                    who it is for, when it was published, and how long it is. */}
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                  <span>
                    Published{" "}
                    <time dateTime={post.published} className="font-medium text-foreground/80">
                      {formatPostDate(post.published)}
                    </time>
                  </span>
                  {revised && (
                    <span>
                      Updated{" "}
                      <time dateTime={post.updated} className="font-medium text-foreground/80">
                        {formatPostDate(post.updated)}
                      </time>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock aria-hidden className="size-4" />
                    {minutes} min read
                  </span>
                  <span>Written for {post.audience.toLowerCase()}</span>
                </div>
              </div>

              <div className="hidden overflow-hidden rounded-2xl border border-border shadow-card rail:block">
                <BlogArt art={post.art} accent={post.accent} alt={ART_ALT[post.art]} />
              </div>
            </div>
          </Container>
        </header>

        <Container className="py-12 sm:py-14">
          <div className="grid gap-10 rail:grid-cols-[minmax(0,1fr)_15rem] rail:gap-14">
            {/* The body comes FIRST in the source order, so a screen reader
                and a crawler reach the article before the navigation aside —
                the contents rail is placed to the right visually by `order`
                on a wide screen only. */}
            <div className="flex min-w-0 flex-col gap-12">
              <BlogProse sections={post.sections} accent={post.accent} />

              {post.faqs?.length ? (
                <section id="faqs" className="scroll-mt-24 border-t border-border pt-10">
                  <h2 className="text-balance text-[24px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground sm:text-[29px]">
                    Common questions
                  </h2>
                  <dl className="mt-6 flex flex-col gap-6">
                    {post.faqs.map((faq) => (
                      <div key={faq.q}>
                        <dt className="text-[17px] font-semibold text-foreground">{faq.q}</dt>
                        <dd className="mt-2 text-[17px] leading-[1.75] text-foreground/80">
                          {inline(faq.a)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6 text-sm text-muted">
                Questions about any of this?
                <ChipLink href="/contact-us" accent={post.accent}>
                  Contact Us
                </ChipLink>
              </div>
            </div>

            {/* Contents. Sticky on a wide screen, a plain list above the text
                on anything narrower — the same construction as the legal
                pages, and capped so a long list cannot run past the viewport
                while stuck. */}
            <nav
              aria-label="Contents"
              className="order-first h-max rounded-2xl border border-border bg-surface p-4 rail:order-last rail:sticky rail:top-24 rail:max-h-[calc(100dvh-8rem)] rail:overflow-y-auto rail:overscroll-contain"
            >
              <p className={cn("text-[13px] font-bold uppercase tracking-[0.08em]", ACCENT_TEXT[post.accent])}>
                In this article
              </p>
              <ol className="mt-3 flex flex-col gap-1.5">
                {post.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#${sectionId(i, section.heading)}`}
                      className="flex gap-2 rounded-md px-1 py-1 text-sm leading-snug text-foreground/75 transition-colors hover:bg-background hover:text-primary"
                    >
                      <span className="shrink-0 tabular-nums text-muted">{i + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
                {post.faqs?.length ? (
                  <li>
                    <a
                      href="#faqs"
                      className="flex gap-2 rounded-md px-1 py-1 text-sm leading-snug text-foreground/75 transition-colors hover:bg-background hover:text-primary"
                    >
                      <span className="shrink-0 tabular-nums text-muted">
                        {post.sections.length + 1}.
                      </span>
                      Common questions
                    </a>
                  </li>
                ) : null}
              </ol>
            </nav>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-12 sm:py-14">
          <Container>
            <h2 className="text-[22px] font-bold tracking-[-0.025em] text-foreground sm:text-[26px]">
              Keep reading
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((other) => (
                <article
                  key={other.slug}
                  className="group relative flex gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-card has-[a:focus-visible]:-translate-y-0.5 has-[a:focus-visible]:shadow-card"
                >
                  <div className="hidden w-28 shrink-0 overflow-hidden rounded-xl border border-border sm:block">
                    <BlogArt art={other.art} accent={other.accent} alt={ART_ALT[other.art]} />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className={cn("text-[12px] font-bold uppercase tracking-[0.07em]", ACCENT_TEXT[other.accent])}>
                      {CATEGORIES[other.category]}
                    </span>
                    <h3 className="text-balance text-[17px] font-bold leading-snug text-foreground">
                      <Link
                        href={`/blog/${other.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:text-primary"
                      >
                        {other.title}
                      </Link>
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-primary">
                      Read
                      <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        eyebrow="Insoora"
        title="Let the policy document fill in the record"
        lede="Upload a policy PDF and Insoora extracts the fields, files them under the customer, and tracks the expiry date it read off the schedule."
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
