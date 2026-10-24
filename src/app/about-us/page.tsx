import Link from "next/link";
import { BellRing, Check, Eye, History, type LucideIcon } from "lucide-react";
import { Card, PageHead, Section, SectionHead } from "@/components/marketing/section";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Insoora is insurance policy management software for Indian insurance agents: it reads policy PDFs, files them under the customer and tracks renewals. Built in Godhra, Gujarat.",
  path: "/about-us",
});

const GOALS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: History,
    title: "Complete policy history",
    body: "Every customer's policies, across insurers and years, in one place.",
  },
  {
    icon: BellRing,
    title: "Reliable renewal workflow",
    body: "Upcoming expiries surfaced early, from the date on the policy itself.",
  },
  {
    icon: Eye,
    title: "Honest automation",
    body: "Clear flags when a document is unclear, never a silent guess.",
  },
];

const AUDIENCE: { lead: string; rest: string }[] = [
  { lead: "Independent insurance agents", rest: "managing motor, health and life policies." },
  { lead: "Agencies with sub-agents", rest: "who need one organized book of business." },
  { lead: "Their customers", rest: "who want their policy copies without asking each time." },
];

export default function AboutPage() {
  return (
    <>
      {/* The organisation schema lives here as well as on the home page: this
          is the page that actually describes the company, so it is the one a
          crawler should be able to read it from. */}
      <JsonLd
        data={jsonLdGraph(
          organizationSchema(),
          breadcrumbSchema([{ name: "About Us", path: "/about-us" }]),
        )}
      />

      <PageHead
        trail={[{ name: "About Us", href: "/about-us" }]}
        title="We're building the simplest way for insurance agents to keep policies in order."
        lede="Insoora reads insurance policy PDFs, organizes them by customer and year, and keeps upcoming renewals in view. Built in Godhra, Gujarat, for the Indian insurance market."
      />

      {/* ── Problem and mission, side by side: they are a pair, and reading
             one without the other loses the point. ── */}
      <Section>
        <div className="grid gap-5 rail:grid-cols-2 rail:gap-6">
          <Card className="flex flex-col gap-3">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">The problem</h2>
            <p className="text-[15px] leading-relaxed text-muted">
              An agent&apos;s day is full of documents. Every policy PDF already holds the policy number,
              dates, premium and insured details — yet agents still type that information into
              spreadsheets, then hunt for the PDF when a customer asks for a copy.
            </p>
            <p className="text-[15px] leading-relaxed text-muted">
              Renewals are tracked in calendars or memory. When something slips, a customer can be left
              without cover.
            </p>
          </Card>
          <Card className="flex flex-col gap-3 border-primary/25 bg-primary-soft/40">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">Our mission</h2>
            <p className="text-[15px] leading-relaxed text-foreground/80">
              Remove repetitive data entry from insurance work, so agents spend their time advising
              customers instead of copying details from one screen to another.
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/80">
              Less retyping also means fewer typos in policy numbers and dates — the details that matter
              most when a claim or renewal comes up.
            </p>
          </Card>
        </div>
      </Section>

      {/* ── Roadmap ── */}
      <Section tone="surface">
        <SectionHead title="What we're working towards" />
        <div className="mt-8 grid gap-4 rail:grid-cols-3">
          {GOALS.map((g) => (
            <Card key={g.title} className="flex flex-col gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <g.icon className="size-5" />
              </span>
              <p className="text-[15px] font-semibold text-foreground">{g.title}</p>
              <p className="text-sm leading-relaxed text-muted">{g.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Who we build for ── */}
      <Section>
        <SectionHead title="Who we build for" />
        <ul className="mt-8 flex flex-col gap-3">
          {AUDIENCE.map((a) => (
            <li
              key={a.lead}
              className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-card sm:items-center sm:p-5"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                <Check className="size-4" />
              </span>
              <p className="text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-foreground">{a.lead}</span> {a.rest}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── CTA ── */}
      <Section tone="dark">
        <div className="flex flex-col items-start gap-5 rail:flex-row rail:items-center rail:justify-between">
          <div>
            <h2 className="text-balance text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
              See how it fits your workflow.
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-[15px] leading-relaxed text-sidebar-text">
              Explore the features, or tell us how you manage policies today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/features"
              className="inline-flex h-11 items-center rounded-md bg-background px-5 text-sm font-semibold text-primary transition-transform hover:-translate-y-px"
            >
              Explore Features
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex h-11 items-center rounded-md border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
