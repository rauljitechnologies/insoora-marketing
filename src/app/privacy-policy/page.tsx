import { LegalPage } from "@/components/marketing/legal-page";
import { JsonLd } from "@/components/marketing/json-ld";
import { PRIVACY_POLICY } from "@/lib/legal/content";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, webPageSchema } from "@/lib/seo";

// One definition, read twice: by `pageMetadata` and by `webPageSchema`.
const SEO = {
  title: "Privacy Policy",
  description:
    "What Insoora collects, why, where it is processed, who can reach it and how long it is kept — written against how the platform is actually built.",
  path: "/privacy-policy",
};

export const metadata = pageMetadata(SEO);

export default function PrivacyPage() {
  return (
    <>
      {/* A `WebPage` node and the trail, and deliberately NOT `Article`.
          The two assert different things and only one of them would be
          false here: `WebPage` says this URL is a page with this name and
          this description, which is true of a draft; `Article` would make it
          a published editorial document with an author and a publication
          date, and this document is a draft pending legal review — the page
          says so at the top. The distinction is worth keeping straight,
          because an earlier note here refused both on the strength of the
          reasoning that only applies to the second. */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema(SEO),
          breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }]),
        )}
      />
      <LegalPage doc={PRIVACY_POLICY} trail={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
    </>
  );
}
