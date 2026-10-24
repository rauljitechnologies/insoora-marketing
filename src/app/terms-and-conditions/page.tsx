import { LegalPage } from "@/components/marketing/legal-page";
import { JsonLd } from "@/components/marketing/json-ld";
import { TERMS } from "@/lib/legal/content";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that apply when you create a Insoora account or use the platform to upload, read and store insurance policy documents.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([{ name: "Terms & Conditions", path: "/terms-and-conditions" }]),
        )}
      />
      <LegalPage doc={TERMS} trail={[{ name: "Terms & Conditions", href: "/terms-and-conditions" }]} />
    </>
  );
}
