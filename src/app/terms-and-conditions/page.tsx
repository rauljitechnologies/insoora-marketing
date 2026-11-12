import { LegalPage } from "@/components/marketing/legal-page";
import { JsonLd } from "@/components/marketing/json-ld";
import { TERMS } from "@/lib/legal/content";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, webPageSchema } from "@/lib/seo";

// One definition, read twice: by `pageMetadata` and by `webPageSchema`.
const SEO = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you create an Insoora account or use the platform to upload, read and store insurance policy documents, and who is responsible for what.",
  path: "/terms-and-conditions",
};

export const metadata = pageMetadata(SEO);

export default function TermsPage() {
  return (
    <>
      {/* `WebPage` and the trail, not `Article` — see the note on
          /privacy-policy for the distinction. */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema(SEO),
          breadcrumbSchema([{ name: "Terms & Conditions", path: "/terms-and-conditions" }]),
        )}
      />
      <LegalPage doc={TERMS} trail={[{ name: "Terms & Conditions", href: "/terms-and-conditions" }]} />
    </>
  );
}
