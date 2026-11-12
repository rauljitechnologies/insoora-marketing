import { LegalPage } from "@/components/marketing/legal-page";
import { JsonLd } from "@/components/marketing/json-ld";
import { REFUND_POLICY } from "@/lib/legal/content";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, webPageSchema } from "@/lib/seo";

// The Refund & Cancellation page.
//
// It exists because the product takes money: there is a payment gateway, a
// plan, policy credits and refund records in the platform, and a paid service
// with no published cancellation or refund terms is a gap a customer feels
// before anyone else does.
//
// It is NOT a finished policy, and the page says so in its first section
// rather than in a footnote. What the platform can do is described from the
// code; the commercial rules — whether a refund is offered, on what basis,
// within what window — are the business's to set, and every section that
// depends on one carries a review callout instead of an invented rule.

// One definition, read twice: by `pageMetadata` and by `webPageSchema`.
const SEO = {
  title: "Refund & Cancellation Policy",
  description:
    "How cancellation and refunds work for Insoora's paid plans and policy credits, including duplicate charges and failed payments. A draft awaiting approval.",
  path: "/refund-and-cancellation",
};

export const metadata = pageMetadata(SEO);

export default function RefundPage() {
  return (
    <>
      {/* `WebPage` and the trail, not `Article` — the same reasoning as the
          other two legal pages, set out in full on /privacy-policy. This
          document is an unapproved draft; naming the page is true of a
          draft, calling it a published article is not. */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema(SEO),
          breadcrumbSchema([{ name: "Refund & Cancellation Policy", path: "/refund-and-cancellation" }]),
        )}
      />
      <LegalPage
        doc={REFUND_POLICY}
        trail={[{ name: "Refund & Cancellation", href: "/refund-and-cancellation" }]}
      />
    </>
  );
}
