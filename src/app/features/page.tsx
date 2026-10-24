import Link from "next/link";
import {
  BellRing, FileSearch, FileStack, FolderClock, Layers, Lock,
  SlidersHorizontal, Table2, Users, type LucideIcon,
} from "lucide-react";
import { PageHead, Section, SectionHead } from "@/components/marketing/section";
import {
  CustomerVaultShot, ExtractedDetailsShot, PolicyListShot,
  RenewalTimelineShot, SearchExportShot,
} from "@/components/marketing/product-shots";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, softwareSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { appHref } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Features — Insurance PDF Extraction, Policy Records and Renewals",
  description:
    "Every Insoora feature in detail: automated insurance PDF data extraction, bulk upload, policy search, customer-wise histories, renewal tracking, role-based document access and CSV or Excel export.",
  path: "/features",
});

const TRAIL = [{ name: "Features", href: "/features" }];

// Each feature is written to stand on its own, because that is how an answer
// engine will quote it: the heading is the question a reader is really asking,
// and the first sentence answers it without needing the page around it.
//
// `limits` is not a disclaimer bolted on — it is the part an agent evaluating
// the product actually needs, and omitting it is how a features page becomes
// something the user has to discover is wrong after signing up.
interface Feature {
  icon: LucideIcon;
  id: string;
  title: string;
  lead: string;
  detail: string[];
  limits: string;
  status?: string;
  shot?: "policies" | "extracted" | "vault" | "renewals" | "search";
}

const FEATURES: Feature[] = [
  {
    icon: FileSearch,
    id: "extraction",
    title: "Automated policy data extraction",
    lead: "Insoora reads an insurance policy PDF and pulls out the fields an agent would otherwise type: policy number, insurer, insured name, cover start and expiry dates, premium, and vehicle or asset details.",
    detail: [
      "The document's own text layer is parsed first. When a page is a scan with no text, OCR runs over the image and the result is parsed the same way.",
      "Each extracted field is saved against the customer with the original PDF attached, so the record and the document it came from never separate.",
      "A field the parser cannot read confidently is marked as needing review rather than filled in with a guess, and is shown beside the document for you to confirm.",
    ],
    limits:
      "Accuracy depends on the document. Insurer-issued digital PDFs read best; photographs of printed policies and low-quality scans read worst. Insoora publishes no accuracy figure because it does not measure one it could stand behind.",
    shot: "extracted",
  },
  {
    icon: Layers,
    id: "bulk-upload",
    title: "Bulk policy upload",
    lead: "Upload many policy PDFs in one action and let them process together, instead of handling one document at a time.",
    detail: [
      "The uploader shows the state of every file in the batch — read, needs review, or failed — so your attention goes only to the ones that need it.",
      "A file that fails does not stop the rest of the batch.",
    ],
    limits: "Very large files and very long documents take longer to process; the batch view is where progress is visible.",
    shot: "policies",
  },
  {
    icon: SlidersHorizontal,
    id: "search",
    title: "Policy search, filters and sorting",
    lead: "Find any policy by customer, insurer, policy number, status or expiry window, then sort the result.",
    detail: [
      "The same filters drive the renewals view, so a search can be turned straight into a working list for the week.",
      "Results are paginated and keep their filters in the URL, so a filtered view can be bookmarked or shared with a colleague who has the same access.",
    ],
    limits: "Search covers the fields Insoora extracted and the customer record — it is not a full-text search inside the body of every PDF.",
    shot: "search",
  },
  {
    icon: Users,
    id: "customer-records",
    title: "Customer-wise policy organization",
    lead: "Every policy is linked to its policyholder, so one search shows everything that customer holds and has ever held.",
    detail: [
      "A policy finds its customer by the mobile number on the document, matched against the number the agent holds on record.",
      "For an agency, sub-agents upload into the same book of business, and the agency sees the whole of it while each person sees only what their role allows.",
    ],
    limits: "Matching depends on the mobile number being read correctly and being the one on file; when it is not, the policy waits for an agent to assign it.",
    shot: "vault",
  },
  {
    icon: FolderClock,
    id: "history",
    title: "Historical policy access",
    lead: "Each customer's policies stack up year by year, with the original PDF kept against every past policy.",
    detail: [
      "A past year's document can be opened, downloaded or shared without going back through email or a shared drive.",
      "Policyholders see the same history in their own portal, for the policies their agent has shared with them.",
    ],
    limits: "History begins when a policy is uploaded. Insoora cannot recover documents for years that were never added to it.",
  },
  {
    icon: BellRing,
    id: "renewals",
    title: "Expiry and renewal tracking",
    lead: "The renewals list is built from the expiry date printed on the policy itself, not from a reminder someone remembered to set.",
    detail: [
      "Policies ending within the next 30 days appear on the renewals view, sorted by date.",
      "Because the date comes from the document, a policy that was uploaded and then forgotten still appears.",
    ],
    limits:
      "If the expiry date was one of the fields flagged for review and never confirmed, that policy's renewal date is only as good as the extraction. Confirming flagged fields is what keeps the list trustworthy.",
    shot: "renewals",
  },
  {
    icon: Lock,
    id: "secure-access",
    title: "Secure document access",
    lead: "Policy PDFs are held in private storage with no public URL, and every download is served through a link that expires within minutes.",
    detail: [
      "Access is decided by role and checked on the server for every request: agents, sub-agents, policyholders and administrators each reach only what their role permits.",
      "A policyholder can only ever open a policy assigned to them, and never another customer's records.",
    ],
    limits:
      "Insoora holds no security certification, has not been penetration tested, and does not yet offer multi-factor authentication. Those are stated plainly rather than implied away.",
  },
  {
    icon: Table2,
    id: "exports",
    title: "CSV and Excel export",
    lead: "Authorized agents export policy and renewal lists as CSV or Excel for their own records and reporting.",
    detail: [
      "An export follows the same access rules as the screen it came from, so it can never contain a policy the person could not already open.",
    ],
    limits: "Export is an agent capability. Policyholder accounts download their own documents but do not export lists.",
    status: "Agents only",
  },
  {
    icon: FileStack,
    id: "templates",
    title: "Insurer template rules and extraction review",
    lead: "An administrator can add per-insurer field aliases, regular expressions and validation rules, and test them against a real document before saving.",
    detail: [
      "This is how a stubborn insurer layout gets read correctly: the rule is written once for that insurer, and later policies from them are parsed with it.",
      "A separate corrections view shows where extraction was changed by hand, which is what tells an administrator a new rule is worth writing.",
    ],
    limits:
      "These rules are configured deliberately by an administrator. Insoora does not learn an insurer's layout on its own, and no machine-learning model is trained on your documents.",
    status: "Admin configured",
  },
];

const SHOTS = {
  policies: PolicyListShot,
  extracted: ExtractedDetailsShot,
  vault: CustomerVaultShot,
  renewals: RenewalTimelineShot,
  search: SearchExportShot,
} as const;

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(softwareSchema(), breadcrumbSchema([{ name: "Features", path: "/features" }]))} />

      <PageHead
        trail={TRAIL}
        title="Everything Insoora does, and where each feature stops."
        lede="Insoora reads insurance policy PDFs, files them under the right customer and tracks renewals. Below is each capability in detail — including the limits, because those are what you need before you commit a book of business to it."
      />

      {/* A contents list: nine features is long enough that a reader arriving
          from a search result deserves a way to jump to the one they came for,
          and the anchors give the page internal links worth following. */}
      <Section className="!py-10">
        <nav aria-label="Features on this page">
          <ul className="flex flex-wrap gap-2">
            {FEATURES.map((f) => (
              <li key={f.id}>
                <a
                  href={`#${f.id}`}
                  className="inline-flex rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                >
                  {f.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {/* Alternating text and preview, so nine features do not read as nine
          identical cards. The preview side is empty for the features that
          have no screen of their own, and the text then takes the full width. */}
      {FEATURES.map((f, i) => {
        const Shot = f.shot ? SHOTS[f.shot] : null;
        return (
          <Section
            key={f.id}
            id={f.id}
            tone={i % 2 === 1 ? "surface" : "background"}
            className="border-t border-border"
          >
            <div
              className={cn(
                "grid gap-8 rail:items-center rail:gap-12",
                Shot && "rail:grid-cols-2",
              )}
            >
              <div className={cn(Shot && i % 2 === 1 && "rail:order-2")}>
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary"
                >
                  <f.icon className="size-5" />
                </span>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                    {f.title}
                  </h2>
                  {f.status && (
                    <span className="rounded-full bg-secondary-soft px-2.5 py-1 text-[11px] font-semibold text-secondary">
                      {f.status}
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/85">{f.lead}</p>
                <div className="mt-4 flex max-w-2xl flex-col gap-3">
                  {f.detail.map((d) => (
                    <p key={d} className="text-sm leading-relaxed text-muted">
                      {d}
                    </p>
                  ))}
                </div>
                <div className="mt-5 max-w-2xl border-l-2 border-warning/50 pl-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-warning">
                    What it does not do
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.limits}</p>
                </div>
              </div>
              {Shot && (
                <div className={cn(i % 2 === 1 && "rail:order-1")}>
                  <Shot />
                </div>
              )}
            </div>
          </Section>
        );
      })}

      <Section tone="dark" className="border-t border-border">
        <SectionHead
          title="Try it with your own policy PDFs."
          lede="Create an agent account and upload a few documents — that is the only honest way to judge how well it reads your insurers' layouts."
          className="[&_h2]:text-white [&_p]:text-sidebar-text"
        />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Sign-up is on the product's origin — a plain anchor. */}
          <a
            href={appHref("/agent/register")}
            className="inline-flex h-11 items-center rounded-md bg-background px-5 text-sm font-semibold text-primary transition-transform hover:-translate-y-px"
          >
            Get Started
          </a>
          <Link
            href="/faq"
            className="inline-flex h-11 items-center rounded-md border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            Read the FAQ
          </Link>
        </div>
      </Section>
    </>
  );
}
