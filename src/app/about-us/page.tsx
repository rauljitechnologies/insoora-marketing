import { ArrowRight, BellRing, Check, Eye, History, Target, TriangleAlert, type LucideIcon } from "lucide-react";
import {
  Card, GradientText, PageHead, Panel, Section, SectionHead,
} from "@/components/marketing/section";
import { BandPrimaryAction, BandSecondaryAction, CtaBand } from "@/components/marketing/cta";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata } from "@/lib/seo";
import { ACCENT_TILE, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Insoora is insurance policy management software for Indian insurance agents: it reads policy PDFs, files them under the customer and tracks renewals. Built in Godhra, Gujarat.",
  path: "/about-us",
});

const GOALS: { icon: LucideIcon; title: string; body: string; accent: Accent }[] = [
  {
    icon: History,
    title: "Complete policy history",
    body: "Every customer's policies, across insurers and years, in one place.",
    accent: "blue",
  },
  {
    icon: BellRing,
    title: "Reliable renewal workflow",
    body: "Upcoming expiries surfaced early, from the date on the policy itself.",
    accent: "orange",
  },
  {
    icon: Eye,
    title: "Honest automation",
    body: "Clear flags when a document is unclear, never a silent guess.",
    accent: "green",
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
        accent="purple"
        badge="Built in Godhra, Gujarat"
        title={
          <>
            We&apos;re building the simplest way for insurance agents to keep policies{" "}
            <GradientText>in order.</GradientText>
          </>
        }
        lede="Insoora reads insurance policy PDFs, organizes them by customer and year, and keeps upcoming renewals in view. Built in Godhra, Gujarat, for the Indian insurance market."
      />

      {/* ── Problem and mission, side by side: they are a pair, and reading
             one without the other loses the point.

             Each card now leads with its own accent tile — red for the thing
             that is wrong, blue for what we intend to do about it — so the
             pair reads as a contrast at a glance rather than as two
             identically-dressed boxes. ── */}
      <Section>
        <div className="grid gap-5 rail:grid-cols-2 rail:gap-6">
          <Card className="card-hover flex flex-col gap-3">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.red)}>
              <TriangleAlert className="size-5" />
            </span>
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
          <Card className="card-hover flex flex-col gap-3 border-primary/25 bg-primary-soft/40">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.blue)}>
              <Target className="size-5" />
            </span>
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

      {/* ── Roadmap ──
             A tinted panel rather than a full-width `tone="surface"` band: the
             home page groups a self-contained set of steps this way, and it
             gives the page the raised/recessed rhythm the inner pages had
             none of. ── */}
      <Section className="!pt-0">
        <Panel className="gap-8">
          <SectionHead
            eyebrow="Roadmap"
            accent="purple"
            title="What we're working towards"
          />
          <div className="grid gap-4 rail:grid-cols-3">
            {GOALS.map((g) => (
              <Card key={g.title} className="card-hover flex flex-col gap-3">
                <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE[g.accent])}>
                  <g.icon className="size-5" />
                </span>
                <h3 className="text-[15px] font-semibold text-foreground">{g.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{g.body}</p>
              </Card>
            ))}
          </div>
        </Panel>
      </Section>

      {/* ── Who we build for ── */}
      <Section className="!pt-0">
        <SectionHead
          eyebrow="Who it's for"
          accent="teal"
          title="Who we build for"
        />
        <ul className="mt-8 flex flex-col gap-3">
          {AUDIENCE.map((a) => (
            <li
              key={a.lead}
              className="card-hover flex items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-card sm:items-center sm:p-5"
            >
              <span aria-hidden className={cn("grid size-8 shrink-0 place-items-center rounded-full", ACCENT_TILE.green)}>
                <Check className="size-4" strokeWidth={3} />
              </span>
              <p className="text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-foreground">{a.lead}</span> {a.rest}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Conversion: the same band that closes the home page. ── */}
      <CtaBand
        eyebrow="See it for yourself"
        title={<>See how it fits your workflow.</>}
        lede="Explore the features, or tell us how you manage policies today."
        actions={
          <>
            <BandPrimaryAction href="/features">
              Explore Features
              <ArrowRight aria-hidden className="size-4" />
            </BandPrimaryAction>
            <BandSecondaryAction href="/contact-us">Contact Us</BandSecondaryAction>
          </>
        }
      />
    </>
  );
}
