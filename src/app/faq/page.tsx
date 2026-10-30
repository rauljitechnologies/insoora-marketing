import { ArrowRight, MessagesSquare, Route, Sparkles } from "lucide-react";
import { Eyebrow, GradientText, PageHead, Panel, Section } from "@/components/marketing/section";
import { BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand } from "@/components/marketing/cta";
import { ACCENT_CHIP, ACCENT_TILE } from "@/lib/accents";
import { cn } from "@/lib/utils";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { FAQS, faqsByCategory } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { appHref } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "How Insoora extracts data from insurance policy PDFs, which documents it supports, how bulk upload, policy search, renewal tracking, customer access, exports and document security work.",
  path: "/faq",
});

export default function FaqPage() {
  const GROUPS = faqsByCategory();

  return (
    <>
      {/* FAQPage markup built from the same array the page renders. Google's
          guidelines require every question and answer to be visible on the
          page carrying the schema — the accordion renders all of them into the
          HTML and hides the closed ones with CSS, so that holds. */}
      <JsonLd
        data={jsonLdGraph(
          faqSchema(FAQS.map((f) => ({ q: f.q, a: f.a }))),
          breadcrumbSchema([{ name: "FAQ", path: "/faq" }]),
        )}
      />

      <PageHead
        trail={[{ name: "FAQ", href: "/faq" }]}
        accent="orange"
        badge={`${FAQS.length} answers about how Insoora actually behaves`}
        title={
          <>
            Frequently asked <GradientText>questions</GradientText>
          </>
        }
        lede="How extraction works, what Insoora supports, who can see which documents, and where the limits are. Every answer describes the product as it behaves today."
      />

      {/* ── The shelves ──
             Sixteen questions in one undivided accordion is a list nobody
             scans: someone who arrived wanting to know where their data is
             stored had to read past four answers about extraction to find
             out whether the question was even answered. The groups give the
             page an outline, and the jump chips give it five internal links
             worth following.

             Note that EVERY answer is still rendered into the HTML, in one
             accordion per group — Radix renders collapsed content and hides
             it with CSS — so the FAQPage schema above, which is built from
             the same array, stays valid. ── */}
      <Section className="!pb-10">
        <Panel className="gap-5 !p-6 sm:!p-8">
          <Eyebrow accent="orange">Jump to a topic</Eyebrow>
          <nav aria-label="Question topics">
            <ul className="flex flex-wrap gap-2">
              {GROUPS.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5",
                      ACCENT_CHIP[g.accent],
                    )}
                  >
                    {g.label}
                    <span className="rounded-full bg-background/70 px-1.5 text-[11px] font-bold tabular-nums">
                      {g.items.length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Panel>
      </Section>

      <Section className="!pt-0">
        {/* Each group's heading is the <h2> the accordion's <h3> questions
            sit under, which is what keeps the outline from jumping 1 → 3.
            The page used to carry one `sr-only` H2 for the whole list. */}
        <div className="flex flex-col gap-10">
          {GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-balance text-[22px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground sm:text-[26px]">
                  {g.label}
                </h2>
                <span className="text-sm text-muted">
                  {g.items.length} {g.items.length === 1 ? "answer" : "answers"}
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background shadow-card">
                <FaqAccordion items={g.items} />
              </div>
            </section>
          ))}
        </div>

        {/* The three onward routes. Cards on the page's own background with
            an accent tile and a chip, rather than grey boxes ending in a
            plain blue text link — the same shape the home page uses to send a
            reader on to the next page. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 shell:grid-cols-3">
          <div className="card-hover flex flex-col items-start gap-3 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.orange)}>
              <MessagesSquare className="size-5" />
            </span>
            <h2 className="text-[17px] font-semibold text-foreground">Still have a question?</h2>
            <p className="text-sm leading-relaxed text-muted">
              Send a message and we&apos;ll reply by email, or call us on the number on the contact
              page.
            </p>
            <ChipLink href="/contact-us" accent="orange" className="mt-1">
              Contact Us
            </ChipLink>
          </div>
          <div className="card-hover flex flex-col items-start gap-3 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.purple)}>
              <Sparkles className="size-5" />
            </span>
            <h2 className="text-[17px] font-semibold text-foreground">Want the detail instead?</h2>
            <p className="text-sm leading-relaxed text-muted">
              The features page covers each capability and its limits at length, with previews of the
              screens involved.
            </p>
            <ChipLink href="/features" accent="purple" className="mt-1">
              Explore Features
            </ChipLink>
          </div>
          <div className="card-hover flex flex-col items-start gap-3 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.blue)}>
              <Route className="size-5" />
            </span>
            <h2 className="text-[17px] font-semibold text-foreground">Prefer it in order?</h2>
            <p className="text-sm leading-relaxed text-muted">
              Half of these answers describe one step of the same workflow. The how it works page
              walks all seven in sequence, with the screen for each.
            </p>
            <ChipLink href="/how-it-works" accent="blue" className="mt-1">
              See how it works
            </ChipLink>
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Get started today"
        title="Answered everything? Try it on your own PDFs."
        lede="Create an agent account and upload a few policies to see how they read."
        actions={
          <>
            <BandPrimaryAction href={appHref("/agent/register")} external>
              Get Started
              <ArrowRight aria-hidden className="size-4" />
            </BandPrimaryAction>
            <BandSecondaryAction href="/contact-us">Contact Us</BandSecondaryAction>
          </>
        }
      />
    </>
  );
}
