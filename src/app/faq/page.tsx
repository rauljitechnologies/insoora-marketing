import { ArrowRight, MessagesSquare, Sparkles } from "lucide-react";
import { GradientText, PageHead, Section } from "@/components/marketing/section";
import { BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand } from "@/components/marketing/cta";
import { ACCENT_TILE } from "@/lib/accents";
import { cn } from "@/lib/utils";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { FAQS } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { appHref } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "How Insoora extracts data from insurance policy PDFs, which documents it supports, how bulk upload, policy search, renewal tracking, customer access, exports and document security work.",
  path: "/faq",
});

export default function FaqPage() {
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

      <Section>
        {/* The accordion's questions are <h3>, which is right on the home
            page where they sit under that section's <h2>. Here they followed
            the page <h1> directly, so the outline jumped 1 → 3. A heading
            that names the list fixes the outline; it is `sr-only` because
            the <h1> directly above it already says the same thing on screen. */}
        <h2 className="sr-only">All questions</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
          <FaqAccordion items={FAQS} />
        </div>

        {/* The two onward routes. Cards on the page's own background with an
            accent tile and a chip, rather than two grey boxes ending in a
            plain blue text link — the same shape the home page uses to send a
            reader on to the next page. */}
        <div className="mt-8 grid gap-4 rail:grid-cols-2">
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
