import { LegalPage } from "@/components/marketing/legal-page";
import { JsonLd } from "@/components/marketing/json-ld";
import { PRIVACY_POLICY } from "@/lib/legal/content";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Insoora handles information when you use our website and the platform for insurance agents, sub-agents and their customers — what is stored, who can reach it and for how long.",
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
