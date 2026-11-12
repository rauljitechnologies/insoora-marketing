import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Eyebrow, GradientText, PageHead, Panel, Section, SectionHead } from "@/components/marketing/section";
import {
  BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand, PrimaryAction, SecondaryAction,
} from "@/components/marketing/cta";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { Shot, SolutionBand } from "@/components/marketing/solution-sections";
import { ACCENT_CHIP } from "@/lib/accents";
import type { SolutionPage } from "@/lib/solutions/types";
import {
  breadcrumbSchema, jsonLdGraph, pageMetadata, softwareSchema, webPageSchema,
} from "@/lib/seo";
import { appHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// The shell every solution and portal page is served through.
//
// A route file for one of these is four lines: import the content module,
// export `solutionMetadata(page)`, render `<SolutionRoute page={page} />`.
// Everything that must be identical across twelve pages — the canonical, the
// Open Graph card, the breadcrumb trail and the schema that describes it, the
// one H1, the contents list, the FAQ markup, the closing band — happens here
// once, so no page can ship without any of it.
//
// The pages still differ, because what they differ IN is their section
// sequence (see lib/solutions/types.ts) and not their chrome. A visitor
// moving from /insurance-crm-software to /customer-portal should recognise
// the site immediately and not recognise the page.

/**
 * The page's metadata.
 *
 * `path` is derived from the slug rather than written again in the route
 * file, which is what makes a canonical URL impossible to get wrong: the
 * directory name under `src/app` and the `slug` in the content module are the
 * same string, and if they ever disagree the build fails in `lib/solutions`
 * (see `assertRoutesExist`).
 */
export function solutionMetadata(page: SolutionPage): Metadata {
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: `/${page.slug}`,
  });
}

/**
 * The trail, as both the visible breadcrumb and the schema.
 *
 * Two shelves: a solution page sits under Features (it is one capability of
 * the product, described at length) and a portal page under Product in
 * Action (it is one role's screens). Both parents are real pages that really
 * link back, which is the only thing that makes a breadcrumb trail true.
 */
function trailOf(page: SolutionPage): { name: string; path: string }[] {
  const parent =
    page.group === "portal"
      ? { name: "Product in Action", path: "/product-in-action" }
      : { name: "Features", path: "/features" };
  return [parent, { name: page.nav.label, path: `/${page.slug}` }];
}

export function SolutionRoute({ page }: { page: SolutionPage }) {
  const trail = trailOf(page);

  return (
    <>
      {/* `webPageSchema` is the node describing THIS PAGE.

          Without it these pages carried three nodes — the product, a trail
          and a list of questions — all of which describe things ON the page
          while nothing described the page. The blog articles already had one
          through `mainEntityOfPage`, which is how the gap became visible.
          It ties itself to the WebSite node by `@id`, so the graph resolves
          to one connected document rather than four loose assertions.

          The FAQ entries ride on that same node, which promotes it to
          `["WebPage", "FAQPage"]`. They were a separate `faqSchema` node,
          and a separate node meant each of these pages described itself
          twice — once as a WebPage and once as an anonymous FAQPage — with
          nothing joining the two. The validity rule is unchanged and is why
          the array is the one the accordion renders: the markup only holds
          when every question and answer is visible on the page carrying it,
          and the accordion keeps all of them in the server-rendered HTML
          whether or not a panel is open. */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: `/${page.slug}`,
            // The same two strings the <title> and meta description use, so
            // the markup cannot describe the page differently from the way
            // the page describes itself in a result.
            title: page.metaTitle,
            description: page.description,
            faqs: page.faqs,
          }),
          softwareSchema(),
          breadcrumbSchema(trail),
        )}
      />

      <PageHead
        trail={trail.map((t) => ({ name: t.name, href: t.path }))}
        accent={page.accent}
        badge={page.badge}
        title={
          <>
            {page.h1.lead} <GradientText>{page.h1.highlight}</GradientText>
          </>
        }
        lede={page.lede}
        checks={page.checks}
        // The site's own primary/secondary pair, at the inner-page size.
        //
        // These were a ChipLink and a plain bordered button, which put the
        // conversion action — Get Started — in the quietest control the
        // design system has, directly beside a heavier-looking one. A chip is
        // the right shape for the in-page jumps the About and How It Works
        // heroes use it for ("Why we built it", "Start at step 1"); it is the
        // wrong shape for the thing the page most wants pressed.
        //
        // `md` rather than the home page's `lg`: this hero's H1 tops out at
        // 46px against the home page's 60px, and an lg button under it
        // outweighs the headline.
        actions={
          <>
            <PrimaryAction href={appHref("/agent/register")} external size="md">
              Get Started
              <ArrowRight aria-hidden className="size-4" />
            </PrimaryAction>
            <SecondaryAction href="/contact-us" size="md">
              Request a walkthrough
            </SecondaryAction>
          </>
        }
        aside={<Shot name={page.heroShot} />}
      />

      {/* A contents list, on the pages long enough to need one.

          Five sections is the threshold because four fit on two scrolls and a
          contents list for them is furniture. Above that a reader arriving
          from a search result is several screens from the section they came
          for, and the chips also give the page a set of internal links worth
          following — which is the other half of why the features page has
          one. Each chip wears its section's hue, so the list doubles as the
          page's colour key. */}
      {page.sections.length >= 5 && (
        <Section className="!pb-10 !pt-10">
          <Panel className="gap-5 !p-6 sm:!p-8">
            <Eyebrow accent={page.accent}>On this page</Eyebrow>
            <nav aria-label="Sections on this page">
              <ul className="flex flex-wrap gap-2">
                {page.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        "inline-flex rounded-full border bg-background px-3.5 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5",
                        ACCENT_CHIP[s.accent],
                      )}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Panel>
        </Section>
      )}

      {page.sections.map((section, i) => (
        <SolutionBand key={section.id} section={section} index={i} />
      ))}

      {/* ── FAQ ──

          Two columns on a wide screen, each its own accordion, exactly as the
          home page does it — so opening a question in the left column does
          not shove the right one down the page. */}
      <Section id="faq" tone={page.sections.length % 2 === 1 ? "surface" : "background"} className="border-t border-border">
        <SectionHead
          eyebrow="Frequently asked questions"
          accent="orange"
          title="Questions this page should answer"
          aside={
            <span className="flex flex-wrap items-center gap-2.5 text-sm text-foreground/70">
              Something missing?
              <ChipLink href="/contact-us" accent="orange">
                Ask us
              </ChipLink>
            </span>
          }
        />
        <div className="mt-7 grid items-start gap-3 rail:grid-cols-2 rail:gap-x-6">
          {[
            page.faqs.slice(0, Math.ceil(page.faqs.length / 2)),
            page.faqs.slice(Math.ceil(page.faqs.length / 2)),
          ].map((column, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-background">
              <FaqAccordion items={column} />
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          <Link
            href="/faq"
            className="inline-flex min-h-6 items-center font-semibold text-primary hover:underline"
          >
            Read every question about the platform
          </Link>
        </p>
      </Section>

      {/* ── Where to go next ──

          Real links with the reason to follow them, not a row of chips. Three
          or four per page, chosen in the content module, and every `href`
          checked against the site's own route set at build time (see
          `assertRoutesExist`) — a landing page whose internal links 404 is
          worse than one with none. */}
      <Section id="next" tone={page.sections.length % 2 === 1 ? "background" : "surface"} className="border-t border-border">
        <SectionHead
          eyebrow="Keep reading"
          accent={page.accent}
          title="Where to go next"
          lede="The pages that cover the next part of this, with what each one adds."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 shell:grid-cols-3">
          {page.related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-hover group flex flex-col gap-2 rounded-2xl border border-border bg-background p-5 transition-transform hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="flex items-center gap-1.5 text-[15px] font-semibold text-foreground">
                {link.label}
                <ArrowRight
                  aria-hidden
                  className="size-4 text-primary transition-transform group-hover:translate-x-0.5"
                />
              </span>
              <span className="text-[13px] leading-relaxed text-muted">{link.text}</span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow={page.cta.eyebrow}
        title={page.cta.title}
        lede={page.cta.lede}
        actions={
          <>
            <BandPrimaryAction href={appHref("/agent/register")} external>
              Get Started
            </BandPrimaryAction>
            <BandSecondaryAction href={page.cta.secondary.href}>
              {page.cta.secondary.label}
            </BandSecondaryAction>
          </>
        }
      />
    </>
  );
}
