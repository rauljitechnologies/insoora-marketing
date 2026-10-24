import Link from "next/link";
import { PageHead, Section } from "@/components/marketing/section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { FAQS } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

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
        title="Frequently asked questions"
        lede="How extraction works, what Insoora supports, who can see which documents, and where the limits are. Every answer describes the product as it behaves today."
      />

      <Section>
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
          <FaqAccordion items={FAQS} />
        </div>

        <div className="mt-8 grid gap-4 rail:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="text-[15px] font-semibold text-foreground">Still have a question?</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Send a message and we&apos;ll reply by email, or call us on the number on the contact
              page.
            </p>
            <Link href="/contact-us" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
              Contact Us
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="text-[15px] font-semibold text-foreground">Want the detail instead?</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              The features page covers each capability and its limits at length, with previews of the
              screens involved.
            </p>
            <Link href="/features" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
              Explore Features
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
