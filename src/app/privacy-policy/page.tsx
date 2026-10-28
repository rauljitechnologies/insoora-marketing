import { LegalPage } from "@/components/marketing/legal-page";
import { JsonLd } from "@/components/marketing/json-ld";
import { PRIVACY_POLICY } from "@/lib/legal/content";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What Insoora collects, why, where it is processed, who can reach it and how long it is kept — written against how the platform is actually built.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      {/* Breadcrumbs only. No Article or WebPage schema: this document is a
          draft pending legal review (the page says so at the top), and
          marking it up as a published article would overstate it. */}
      <JsonLd data={jsonLdGraph(breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }]))} />
      <LegalPage doc={PRIVACY_POLICY} trail={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
    </>
  );
}
