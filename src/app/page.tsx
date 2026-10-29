import Link from "next/link";
import {
  ArrowRight, Calendar, Check, Eye, FolderOpen, Keyboard, Lock,
  Search, ShieldCheck, Upload, Users, type LucideIcon,
} from "lucide-react";
import {
  Container, Eyebrow, GradientText, H2, Panel, Section, SectionHead,
} from "@/components/marketing/section";
import {
  BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand, PrimaryAction, SecondaryAction,
} from "@/components/marketing/cta";
import { ACCENT_TILE } from "@/lib/accents";
import { ExtractionPreview } from "@/components/marketing/extraction-preview";
import { AccessScene, MessyScene } from "@/components/marketing/scene-visuals";
import { FeatureCards } from "@/components/marketing/feature-cards";
import { AudienceCards } from "@/components/marketing/audience-cards";
import { Testimonials } from "@/components/marketing/testimonials";
import { ProductTabs } from "@/components/marketing/product-tabs";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { HOME_FAQS } from "@/lib/faq";
import {
  jsonLdGraph, organizationSchema, pageMetadata, softwareSchema, webSiteSchema,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { appHref } from "@/lib/site-config";

export const metadata = {
  ...pageMetadata({
    title: "Insurance Policy Management Software for Agents",
    description:
      "Insoora turns insurance policy PDFs into organized policy records, customer histories and renewal reminders — so agents stop re-entering data their documents already contain.",
    path: "/",
  }),
  title: { absolute: "Insoora — Insurance Policy Management Software for Agents" },
};

// ── Content ─────────────────────────────────────────────
//
// Every claim describes what the application does today. There are no customer
// counts, no testimonials, no accuracy percentages, no insurer partnerships and
// no certifications, because none exist to cite. Figures that appear inside the
// mocked interfaces are sample data in a drawn screen, never a statistic about
// the business.
//
// Each section owns one accent colour, as the design does — the page reads as
// a sequence of chapters instead of one blue wash.

const HERO_CHECKS = [
  "Save hours of manual work",
  "Organize all policies in one place",
  "Track renewals easily",
  "Secure and private",
];

const PROBLEMS: { icon: LucideIcon; t: string; d: string; tile: string }[] = [
  { icon: Keyboard, t: "Manual data entry", d: "Re-entering policy details from PDFs takes time and can lead to errors.", tile: ACCENT_TILE.red },
  { icon: Search, t: "Hard to search", d: "Finding a specific policy means opening multiple PDF files manually.", tile: ACCENT_TILE.blue },
  { icon: FolderOpen, t: "Scattered records", d: "Customer policies are often stored in different folders and devices.", tile: ACCENT_TILE.orange },
  { icon: Calendar, t: "Missing renewals", d: "Tracking expiry dates in spreadsheets is difficult and risky.", tile: ACCENT_TILE.green },
];

const STEPS: { n: string; t: string; d: string; dot: string }[] = [
  { n: "1", t: "Upload policy PDFs", d: "Upload single or multiple insurance PDF files securely from the agent portal.", dot: "bg-[#DC2626] shadow-[0_0_0_4px_#DC262622]" },
  { n: "2", t: "Extract and organize", d: "The system reads the PDF, extracts key policy details and files them under the right customer. Anything unclear is flagged, not guessed.", dot: "bg-[#7C3AED] shadow-[0_0_0_4px_#7C3AED22]" },
  { n: "3", t: "Manage and track", d: "View all policies, search by customer, and track renewal dates from the date on the policy itself.", dot: "bg-[#16A34A] shadow-[0_0_0_4px_#16A34A22]" },
];

const STEP_ROWS = [
  { k: "Policy Number", v: "1412769663" },
  { k: "Insurer", v: "HDFC Life" },
  { k: "Premium", v: "₹12,450" },
  { k: "Expiry", v: "10 Jan 2027" },
];

const MINI_POLICIES = [
  { n: "Rahul Mehta", i: "HDFC Life", d: "10 Jan 2027" },
  { n: "Priya Shah", i: "ICICI Lombard", d: "22 Feb 2027" },
  { n: "Amit Patel", i: "Star Health", d: "05 Mar 2027" },
];

const SECURITY: { icon: LucideIcon; t: string; d: string; tile: string }[] = [
  { icon: Lock, t: "Private file storage", d: "Policy PDFs are stored privately, have no public URL, and are not shared without permission.", tile: ACCENT_TILE.green },
  { icon: Users, t: "Role-based access", d: "Agents, sub-agents and customers see only the data they are authorized to, checked on the server.", tile: ACCENT_TILE.blue },
  { icon: ShieldCheck, t: "Encrypted connections", d: "All data between your browser and the platform is transmitted over HTTPS.", tile: ACCENT_TILE.purple },
  { icon: Eye, t: "You stay in control", d: "Extracted values are shown beside the page they came from, so you confirm before relying on them.", tile: ACCENT_TILE.orange },
];

export default function HomePage() {
  const half = Math.ceil(HOME_FAQS.length / 2);
  const faqColumns = [HOME_FAQS.slice(0, half), HOME_FAQS.slice(half)];

  return (
    <>
      <JsonLd data={jsonLdGraph(organizationSchema(), webSiteSchema(), softwareSchema())} />

      {/* ── Hero ── */}
      <section
        id="top"
        className="scroll-mt-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 500px at 80% 10%,#DBEAFE,transparent 70%),radial-gradient(700px 400px at 0% 100%,#EFF6FF,transparent 70%),#F8FBFF",
        }}
      >
        <Container className="py-12 sm:py-16 shell:py-24">
          <div className="grid items-center gap-12 rail:grid-cols-2 rail:gap-12">
            <div className="pv-rise flex flex-col items-start gap-5">
              <span className="flex items-center gap-1.5 rounded-full bg-danger-soft px-3 py-1.5 text-[13px] font-semibold text-[#B91C1C]">
                <span className="rounded bg-danger px-1.5 py-px text-[10px] font-bold text-white">PDF</span>
                AI-powered Insurance Document Management
              </span>
              <h1 className="text-balance text-[38px] font-extrabold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[48px] shell:text-[60px]">
                Insurance policies, organized <GradientText>automatically.</GradientText>
              </h1>
              <p className="max-w-[32.5rem] text-pretty text-lg leading-relaxed text-foreground/70">
                Turn insurance PDFs into organized policy records, customer histories and renewal
                reminders &mdash; without repetitive manual work.
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Sign-up lives in the product, on its own origin — `external`
                    makes it a plain anchor rather than a <Link>. */}
                <PrimaryAction href={appHref("/agent/register")} external>
                  Get Started
                  <ArrowRight aria-hidden className="size-4" />
                </PrimaryAction>
                <SecondaryAction href="/features">Explore Features</SecondaryAction>
              </div>
              <ul className="mt-1 grid gap-2.5 sm:grid-cols-2 sm:gap-x-7">
                {HERO_CHECKS.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hidden below `sm`: at phone width the stacked cards would be a
                third of the screen tall and add nothing the headline has not
                already said. */}
            <div className="hidden sm:block">
              <ExtractionPreview />
            </div>
          </div>
        </Container>
      </section>

      {/* ── The problem ── */}
      <Section id="problem">
        <div className="grid items-center gap-10 rail:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow accent="red">The problem</Eyebrow>
            <H2>
              Stop spending hours organizing information already inside your PDFs.
            </H2>
            <p className="text-pretty text-base leading-relaxed text-foreground/70">
              Important policy details are hidden inside PDF files. Manual entry and scattered
              documents make it difficult to stay organized and track renewals.
            </p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {PROBLEMS.map((p) => (
                <div
                  key={p.t}
                  className="card-hover flex flex-col gap-2.5 rounded-2xl border border-border bg-background p-5 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <span aria-hidden className={cn("grid size-10 place-items-center rounded-md", p.tile)}>
                    <p.icon className="size-5" />
                  </span>
                  <h3 className="text-[15px] font-semibold text-foreground">{p.t}</h3>
                  <span className="text-[13px] leading-relaxed text-muted">{p.d}</span>
                </div>
              ))}
            </div>
          </div>
          <MessyScene />
        </div>
      </Section>

      {/* ── How it works ── */}
      <Section id="how-it-works" className="!pt-0">
        <Panel className="gap-9">
          <div className="flex flex-col gap-2.5">
            <Eyebrow accent="blue">How it works</Eyebrow>
            <H2>
              From policy PDF to organized records in three steps.
            </H2>
            <p className="text-base text-foreground/70">
              A simple process to extract, organize and manage your insurance policy information.
            </p>
          </div>
          <div className="grid gap-6 shell:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.t} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <span className={cn("grid size-[30px] flex-none place-items-center rounded-full text-sm font-bold text-white", s.dot)}>
                    {s.n}
                  </span>
                  <span className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-foreground">{s.t}</h3>
                    <span className="text-sm leading-relaxed text-muted">{s.d}</span>
                  </span>
                </div>
                {/* Each step's own little illustration, so the three read as a
                    process rather than three paragraphs in boxes. */}
                <div aria-hidden className="h-[10.625rem] rounded-2xl border border-border bg-background">
                  {i === 0 && (
                    <div className="grid h-full place-items-center">
                      <div className="flex h-[8.125rem] w-[6.875rem] flex-col gap-1.5 rounded-md border border-border bg-surface p-3 shadow-[12px_12px_0_-1px_#EEF2F7]">
                        <span className="self-start rounded-[5px] bg-danger px-1.5 py-[3px] text-[10px] font-bold text-white">PDF</span>
                        {["90%", "70%", "80%"].map((w, k) => (
                          <span key={k} className="block h-[5px] rounded-[3px] bg-border" style={{ width: w }} />
                        ))}
                        <span
                          className="mt-auto grid size-[34px] self-center place-items-center rounded-md text-white"
                          style={{ backgroundImage: "var(--gradient-brand)" }}
                        >
                          <Upload className="size-4" />
                        </span>
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="flex h-full flex-col justify-center gap-[7px] p-4">
                      {STEP_ROWS.map((r) => (
                        <div key={r.k} className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-xs">
                          <Check className="size-3.5 text-[#16A34A]" strokeWidth={3} />
                          <span className="flex-1 text-muted">{r.k}</span>
                          <strong className="text-foreground">{r.v}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div className="flex h-full flex-col gap-1.5 px-4 py-3.5">
                      <strong className="mb-0.5 text-[13px] text-foreground">All Policies</strong>
                      <div className="grid grid-cols-[1.2fr_1fr_1fr] px-0.5 text-[11px] text-muted">
                        <span>Policyholder</span>
                        <span>Insurer</span>
                        <span className="text-right">Renewal</span>
                      </div>
                      {MINI_POLICIES.map((m) => (
                        <div key={m.n} className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-border/60 px-0.5 py-[7px] text-xs">
                          <span className="font-semibold text-foreground">{m.n}</span>
                          <span className="text-foreground/70">{m.i}</span>
                          <span className="text-right font-semibold text-accent-orange">{m.d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Section>

      {/* ── Key features ── */}
      <Section id="features">
        <SectionHead
          eyebrow="Key features"
          accent="purple"
          title="Everything you need to keep insurance policies organized."
          aside={<ChipLink href="/features" accent="purple">See all features</ChipLink>}
        />
        <div className="mt-8">
          <FeatureCards />
        </div>
      </Section>

      {/* ── Product in action ── */}
      <Section id="product" className="!pt-0">
        <Panel>
          <div className="flex flex-col gap-2.5">
            <Eyebrow accent="red">Product in action</Eyebrow>
            <H2>
              A closer look at the Insoora experience.
            </H2>
            <p className="text-base text-foreground/70">
              See how insurance PDFs are uploaded, extracted and organized into easy-to-manage
              records. Every view below is drawn with an invented policy &mdash; no customer&apos;s
              records appear on this page.
            </p>
          </div>
          <ProductTabs />
        </Panel>
      </Section>

      {/* ── Who it's for ── */}
      <Section id="who-its-for">
        <div className="flex flex-col gap-2.5">
          <Eyebrow accent="teal">Who it&apos;s for</Eyebrow>
          <H2>
            One platform, three kinds of users.
          </H2>
          <p className="text-base text-foreground/70">
            Insoora is designed to make insurance policy management simple for everyone involved.
          </p>
        </div>
        <div className="mt-8">
          <AudienceCards />
        </div>
      </Section>

      {/* ── What the product is for ──

          Renders nothing in production today: every entry is still
          illustrative, and `visibleTestimonials()` drops unverified entries
          outside a preview. So this is a no-op on the live site until a real,
          consented testimonial is added — which is the intent. See
          lib/testimonials. */}
      <Testimonials />

      {/* ── Security and trust ── */}
      <Section id="security" className="!pt-0">
        <div className="flex flex-col gap-2.5">
          <Eyebrow accent="green">Security &amp; trust</Eyebrow>
          <H2>
            Your policy documents are personal. We treat them that way.
          </H2>
          <p className="text-base text-foreground/70">
            Insoora is built with privacy and security in mind. Your documents stay confidential
            and accessible only to authorized users.
          </p>
        </div>
        <div className="mt-8 grid items-stretch gap-5 rail:grid-cols-2">
          <AccessScene />
          <div className="grid gap-4 sm:grid-cols-2">
            {SECURITY.map((s) => (
              <div key={s.t} className="flex flex-col gap-2.5 rounded-2xl border border-border bg-background p-5">
                <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", s.tile)}>
                  <s.icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">{s.t}</h3>
                <span className="text-sm leading-relaxed text-muted">{s.d}</span>
              </div>
            ))}
          </div>
        </div>
        {/* The limits, in the same section as the claims. A security block
            listing only strengths is the one a reader should not trust. */}
        <div className="mt-4 rounded-2xl border border-warning/30 bg-warning-soft/50 p-5 sm:p-6">
          <h3 className="text-[15px] font-semibold text-foreground">What we do not claim</h3>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-foreground/80">
            Insoora holds no security certification and has not been penetration tested. There is no
            multi-factor authentication on accounts yet, and no published data-retention schedule. No
            system is &ldquo;100% secure&rdquo;, and extracted policy data can be wrong &mdash; which is why
            the original PDF is kept and shown beside every field.{" "}
            <Link href="/privacy-policy" className="font-semibold text-primary hover:underline">
              Our Privacy Policy
            </Link>{" "}
            sets out what is stored and who can reach it.
          </p>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq" className="!pt-0">
        <SectionHead
          eyebrow="Frequently asked questions"
          accent="orange"
          title="Questions agents ask before signing up."
          aside={
            <span className="flex flex-wrap items-center gap-2.5 text-sm text-foreground/70">
              Still have questions?
              <ChipLink href="/contact-us" accent="orange">Contact us</ChipLink>
            </span>
          }
        />
        {/* Two columns, as in the design. Each is its own accordion so opening
            a question on the left does not shove the right column down. */}
        <div className="mt-7 grid items-start gap-3 rail:grid-cols-2 rail:gap-x-6">
          {faqColumns.map((column, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-background">
              <FaqAccordion items={column} />
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          <Link
            href="/faq"
            className="inline-flex min-h-6 items-center font-semibold text-primary hover:underline"
          >
            Read all frequently asked questions
          </Link>
        </p>
      </Section>

      {/* ── Conversion ── */}
      <CtaBand
        eyebrow="Get started today"
        title="Spend less time typing. Stay on top of policy renewals."
        lede="Join Insoora and turn your insurance PDFs into organized, searchable records."
        actions={
          <>
            <BandPrimaryAction href={appHref("/agent/register")} external>
              Get Started
              <ArrowRight aria-hidden className="size-4" />
            </BandPrimaryAction>
            <BandSecondaryAction href="/contact-us">Contact Us</BandSecondaryAction>
          </>
        }
      />
    </>
  );
}
