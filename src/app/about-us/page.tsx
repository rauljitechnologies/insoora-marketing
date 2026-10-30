import Link from "next/link";
import {
  ArrowRight, BellRing, Building2, Check, Eye, FileSearch, FolderClock, History,
  MapPin, Phone, ShieldCheck, Target, TriangleAlert, Users, type LucideIcon,
} from "lucide-react";
import {
  Card, Eyebrow, GradientText, PageHead, Panel, Section, SectionHead,
} from "@/components/marketing/section";
import { BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand } from "@/components/marketing/cta";
import { ManualChainScene, OrderScene } from "@/components/marketing/scene-visuals";
import {
  AgentDashboardShot, CustomerMobileShot, RoleAccessShot,
} from "@/components/marketing/product-shots";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata } from "@/lib/seo";
import { CONTACT, addressLines, mapsSearchHref } from "@/lib/contact";
import { ACCENT_TILE, type Accent } from "@/lib/accents";
import { appHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Insoora is insurance policy management software for Indian insurance agents: it reads policy PDFs, files them under the customer and tracks renewals. Built in Godhra, Gujarat, by Raulji Technologies Private Limited.",
  path: "/about-us",
});

// /about-us
//
// ── What this page may and may not say ───────────────────────────────────
//
// There is no team size here, no customer count, no founding story, no
// market share, no award and no funding round. None of those has been
// verified, and an About page is exactly where an unverifiable claim does
// the most damage — it is the page a reader opens specifically to find out
// whether the company behind the product is real.
//
// What it can say, it says plainly and in one place: the product is managed
// by Raulji Technologies Private Limited, it is built in Godhra, Gujarat,
// and the address and telephone on the "Built in India" band are the same
// ones in `lib/contact` that the footer, the Contact page and the
// Organization schema all read. A visitor can dial the number.
//
// ── Why the page is shaped the way it is ─────────────────────────────────
//
// It used to be: a hero with no visual, two cards, three roadmap cards, and
// three one-line bullet points under "Who we build for". That last section
// was the thinnest thing on the site — three sentences where the brief asks
// for the three audiences to be distinguished — and the page as a whole
// made the product's argument entirely in prose.
//
// Now it runs: the transformation as a picture, the manual chain against
// the five frictions, the mission, five principles each with its own
// mechanism, the company, the three audiences as alternating sections with
// the screen each one actually uses, and the roadmap.

const FRICTIONS: { icon: LucideIcon; t: string; d: string; accent: Accent }[] = [
  {
    icon: FileSearch,
    t: "The data is already written down",
    d: "Every policy PDF holds the policy number, the dates, the premium and the insured's details — and an agent types all of it into a spreadsheet anyway.",
    accent: "red",
  },
  {
    icon: FolderClock,
    t: "The documents scatter",
    d: "One policy arrives by email, the next over WhatsApp, the one after that as a photograph of a printout. They end up in four places and one of them is a phone.",
    accent: "orange",
  },
  {
    icon: Users,
    t: "Nothing is organized by customer",
    d: "A folder per year or a folder per insurer is not the question anyone asks. The question is always \"what does this person hold?\" — and that answer has to be assembled by hand.",
    accent: "purple",
  },
  {
    icon: BellRing,
    t: "Renewals live in memory",
    d: "An expiry date in a spreadsheet is only as reliable as the person who typed it and the day they happen to look at the sheet.",
    accent: "pink",
  },
  {
    icon: History,
    t: "Last year's copy takes ten minutes to find",
    d: "A customer asks for a document from two renewals ago, and the search runs through an inbox, a drive and a drawer.",
    accent: "teal",
  },
];

/** The product principles. Each one is a mechanism, not an adjective —
 *  "organized by customer" is a thing the software does and a reader can
 *  check, where "powerful" and "seamless" are not. */
const PRINCIPLES: { icon: LucideIcon; t: string; d: string; proof: string; accent: Accent }[] = [
  {
    icon: FileSearch,
    t: "The document is the source",
    d: "Every field Insoora holds was read off a policy PDF, and that PDF stays attached to the record forever.",
    proof: "Nothing is typed in from a form nobody checks.",
    accent: "red",
  },
  {
    icon: Eye,
    t: "Unclear is a state, not a guess",
    d: "A value the parser is not confident about is flagged and shown beside the page it came from, for a person to confirm.",
    proof: "A wrong date never arrives looking as trustworthy as a right one.",
    accent: "purple",
  },
  {
    icon: Users,
    t: "Organized the way it is asked for",
    d: "Policies are filed under the policyholder, across insurers and across years, because that is the unit every real question is about.",
    proof: "One customer, one page, their whole history.",
    accent: "blue",
  },
  {
    icon: BellRing,
    t: "Expiry comes from the policy",
    d: "The renewals view is built from the date printed on the document, so a policy uploaded and forgotten still surfaces when its month comes round.",
    proof: "No reminder for anyone to forget to set.",
    accent: "orange",
  },
  {
    icon: ShieldCheck,
    t: "Access is decided, then checked",
    d: "Agents, sub-agents and policyholders reach only what their role permits, and the check runs on the server for every single request.",
    proof: "Not hidden in the interface — refused by it.",
    accent: "green",
  },
];

const AUDIENCES: {
  id: string;
  eyebrow: string;
  accent: Accent;
  t: string;
  d: string;
  pts: string[];
  href: string;
  cta: string;
  shot: React.ReactNode;
}[] = [
  {
    id: "agents",
    eyebrow: "Who we serve · 01",
    accent: "blue",
    t: "Independent insurance agents",
    d: "You hold motor, health and life policies for a few dozen to a few hundred people, and the whole book lives in your own head, your own folders and your own spreadsheet. Insoora gives it somewhere to live that is not any of those.",
    pts: [
      "Upload a backlog in batches rather than one file at a time",
      "Ask \"what does this customer hold?\" and get an answer in one search",
      "Open the month's expiries instead of trusting a calendar entry",
    ],
    href: "/how-it-works",
    cta: "See the workflow",
    shot: <AgentDashboardShot />,
  },
  {
    id: "agencies",
    eyebrow: "Who we serve · 02",
    accent: "green",
    t: "Agencies with sub-agents",
    d: "Several people adding policies to one book of business, and a principal who needs to see all of it without every person seeing everything. That is a permissions problem before it is a software problem, which is why access is the part built first.",
    pts: [
      "Sub-agents upload into the same book, not into separate islands",
      "Each role reaches only what it is allowed to, checked server-side",
      "An export can never be wider than the screen it came from",
    ],
    href: "/features#secure-access",
    cta: "How access works",
    shot: <RoleAccessShot />,
  },
  {
    id: "policyholders",
    eyebrow: "Who we serve · 03",
    accent: "pink",
    t: "The customers those agents serve",
    d: "The person who actually owns the cover, and who currently has to message their agent to get a copy of their own policy. They sign in with the mobile number their agent already holds and read their own year-wise history.",
    pts: [
      "Their own policies, and never another customer's",
      "Original documents to download, not screenshots of them",
      "Renewal dates visible without asking anyone",
    ],
    href: "/product-in-action#customer-portal",
    cta: "See the customer portal",
    shot: <CustomerMobileShot />,
  },
];

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
        badge={
          <>
            <MapPin aria-hidden className="size-3.5" />
            Built in Godhra, Gujarat
          </>
        }
        title={
          <>
            We&apos;re building the simplest way for insurance agents to keep policies{" "}
            <GradientText>in order.</GradientText>
          </>
        }
        lede="Insoora reads insurance policy PDFs, organizes them by customer and year, and keeps upcoming renewals in view. Built in Godhra, Gujarat, for the Indian insurance market and the documents Indian insurers actually issue."
        actions={
          <>
            <ChipLink href="#mission" accent="purple">
              Why we built it
            </ChipLink>
            <ChipLink href="#company" accent="blue">
              Who is behind it
            </ChipLink>
          </>
        }
        aside={<OrderScene />}
      />

      {/* ── The problem ──
             Five frictions beside the manual chain. The list makes the
             argument in words and the illustration makes it in one shape;
             neither repeats the other, which is the test for whether a
             visual is earning its place. ── */}
      <Section id="problem">
        <div className="grid items-start gap-10 rail:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] rail:gap-14">
          <div>
            <Eyebrow accent="red">The problem</Eyebrow>
            <h2 className="mt-2.5 text-balance text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[34px]">
              An agent&apos;s day is full of documents that already contain the answer.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70">
              None of what follows is a failure of effort. It is what happens when the system of
              record is a folder, a spreadsheet and a good memory — all three of which work right up
              until the day one of them does not.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {FRICTIONS.map((f) => (
                <li
                  key={f.t}
                  className="card-hover flex gap-3.5 rounded-2xl border border-border bg-background p-4 shadow-card sm:p-5"
                >
                  <span
                    aria-hidden
                    className={cn("grid size-10 shrink-0 place-items-center rounded-xl", ACCENT_TILE[f.accent])}
                  >
                    <f.icon className="size-[1.125rem]" />
                  </span>
                  <span className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-foreground">{f.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{f.d}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rail:sticky rail:top-24">
            <ManualChainScene />
          </div>
        </div>
      </Section>

      {/* ── Our mission ──
             Its own band, on the dark-ish panel, rather than one of a pair of
             cards. A mission statement competing for attention with the
             problem beside it is read as neither. ── */}
      <Section id="mission" className="!pt-0">
        <Panel className="gap-6 !border-primary/15 !bg-[#F3F6FF]">
          <div className="flex max-w-3xl flex-col gap-3.5">
            <span
              aria-hidden
              className={cn("grid size-12 place-items-center rounded-2xl", ACCENT_TILE.blue)}
            >
              <Target className="size-5" />
            </span>
            <Eyebrow accent="blue">Our mission</Eyebrow>
            <p className="text-balance text-[22px] font-bold leading-[1.3] tracking-[-0.02em] text-foreground sm:text-[27px]">
              Take the repetitive data entry out of insurance work, so an agent spends their time
              advising customers rather than copying details from one screen to another.
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/75">
              Less retyping also means fewer typos in policy numbers and dates — the two details that
              matter most at exactly the moment they are hardest to fix, when a claim or a renewal is
              already in motion. That is the whole of the ambition. We are not trying to replace the
              agent in the relationship; we are trying to stop the paperwork from being the part of it
              that takes the longest.
            </p>
          </div>
        </Panel>
      </Section>

      {/* ── Why Insoora ──
             Five principles, each paired with the mechanism that makes it
             true. A principle with no mechanism under it is a slogan. ── */}
      <Section id="principles" tone="surface">
        <SectionHead
          eyebrow="Why Insoora"
          accent="purple"
          title="Five things the product refuses to get wrong"
          lede="Each of these is a decision with a mechanism behind it, not a value on a wall. Every one is visible in the product and described at length on the features page."
          aside={
            <ChipLink href="/features" accent="purple">
              See all features
            </ChipLink>
          }
        />
        <ul className="mt-9 grid gap-4 sm:grid-cols-2 shell:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.t}
              className={cn(
                "card-hover flex flex-col gap-3 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6",
                // The first principle takes two columns on the widest layout:
                // five cards in a three-column grid otherwise leaves a hole,
                // and the document-is-the-source rule is the one the other
                // four follow from.
                i === 0 && "shell:col-span-2",
              )}
            >
              <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE[p.accent])}>
                <p.icon className="size-5" />
              </span>
              <h3 className="text-[17px] font-semibold text-foreground">{p.t}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{p.d}</p>
              <p className="mt-auto flex items-start gap-2 border-t border-border pt-3 text-[13px] font-medium leading-relaxed text-foreground/75">
                <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-success" strokeWidth={3} />
                {p.proof}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Built in India ──
             The company, with the details a reader can actually verify. Every
             value comes from `lib/contact`, the same definition the footer,
             the Contact page and the Organization schema read, so this band
             cannot drift out of step with them. ── */}
      <Section id="company" className="!pt-0">
        <Panel className="gap-8">
          <div className="grid items-start gap-9 rail:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] rail:gap-14">
            <div className="flex flex-col gap-3.5">
              <Eyebrow accent="orange">Built in India</Eyebrow>
              <h2 className="text-balance text-[26px] font-bold leading-[1.18] tracking-[-0.025em] text-foreground sm:text-[31px]">
                A product from Godhra, for the way Indian insurance actually works.
              </h2>
              <p className="text-[15px] leading-relaxed text-foreground/80">
                Insoora is managed by{" "}
                <strong className="font-semibold text-foreground">{CONTACT.legalEntity}</strong> and
                built in Godhra, Gujarat. It is designed around insurance-related document management
                — the PDFs Indian insurers issue, the mobile number that identifies a policyholder,
                and the renewal cycle an agent works to.
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/80">
                That focus is a deliberate limit as much as a claim. Insoora is not a general
                document system that happens to accept insurance papers, and it is not built for a
                market whose policy layouts and identifiers work differently.
              </p>
              {/* The thing an About page is most often used to find out, and
                  the thing this one will not invent. */}
              <p className="mt-1 flex gap-2.5 rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-muted">
                <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-warning" />
                <span>
                  You will not find a team size, a customer count, a founding year or an award on this
                  page. None of those has been verified, and an About page is the worst possible place
                  to put a number nobody checked.
                </span>
              </p>
            </div>

            {/* The verifiable details, as a card a visitor can act on. */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6">
              <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.orange)}>
                <Building2 className="size-5" />
              </span>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">
                  The company
                </p>
                <p className="mt-1 text-[15px] font-semibold text-foreground">{CONTACT.legalEntity}</p>
                <p className="text-sm text-muted">Insoora is its product and brand name.</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">Office</p>
                <address className="mt-1 text-[15px] not-italic leading-relaxed text-foreground/85">
                  {addressLines().map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={mapsSearchHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Get directions
                  <ArrowRight aria-hidden className="size-3.5" />
                </a>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">Reach us</p>
                <a
                  href={CONTACT.phoneHref}
                  className="mt-1 inline-flex min-h-9 items-center gap-2 text-[15px] font-semibold text-primary hover:underline"
                >
                  <Phone aria-hidden className="size-4" />
                  {CONTACT.phone}
                </a>
                <p className="text-sm text-muted">
                  Contact person:{" "}
                  <span className="font-medium text-foreground">{CONTACT.contactPerson}</span>
                </p>
                <ChipLink href="/contact-us" accent="orange" className="mt-3">
                  Contact Us
                </ChipLink>
              </div>
            </div>
          </div>
        </Panel>
      </Section>

      {/* ── Who we serve ──
             Three alternating sections, each with the screen that audience
             actually opens — not three one-line bullets, which is what this
             was, and not three identical cards, which is what it would
             otherwise have become. ── */}
      <Section id="who-we-serve" tone="surface" className="!pb-0">
        <SectionHead
          eyebrow="Who we serve"
          accent="teal"
          title="Three kinds of user, three different products behind one login"
          lede="An agent, an agency principal and a policyholder want almost nothing in common from the same set of documents — so each one gets a different view of them."
        />
      </Section>
      {AUDIENCES.map((a, i) => (
        <Section key={a.id} id={a.id} tone="surface" className={cn(i === 0 && "!pt-10")}>
          <div className="grid items-center gap-9 rail:grid-cols-2 rail:gap-14">
            <div className={cn("min-w-0", i % 2 === 1 && "rail:order-2")}>
              <Eyebrow accent={a.accent}>{a.eyebrow}</Eyebrow>
              <h3 className="mt-2 text-balance text-[24px] font-bold leading-[1.18] tracking-[-0.025em] text-foreground sm:text-[28px]">
                {a.t}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{a.d}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {a.pts.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted">
                    <span
                      aria-hidden
                      className="mt-1 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <ChipLink href={a.href} accent={a.accent} className="mt-5">
                {a.cta}
              </ChipLink>
            </div>
            <div className={cn("flex min-w-0 justify-center", i % 2 === 1 && "rail:order-1")}>
              {a.shot}
            </div>
          </div>
        </Section>
      ))}

      {/* ── Roadmap ── */}
      <Section className="!pt-4">
        <Panel className="gap-8">
          <SectionHead
            eyebrow="Roadmap"
            accent="purple"
            title="What we're working towards"
            lede="Three directions, stated as intentions rather than as a dated plan — because a roadmap with dates on a page like this is a promise nobody authorised."
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
          <p className="text-sm leading-relaxed text-muted">
            Where the product stops today is written down rather than implied — see{" "}
            <Link href="/features" className="font-semibold text-primary hover:underline">
              each feature&apos;s limits
            </Link>{" "}
            and{" "}
            <Link href="/how-it-works" className="font-semibold text-primary hover:underline">
              the four things the workflow does not do
            </Link>
            .
          </p>
        </Panel>
      </Section>

      {/* ── Conversion: the same band that closes every page. ── */}
      <CtaBand
        eyebrow="See it for yourself"
        title={<>See how it fits your workflow.</>}
        lede="Create an agent account and upload a few of your own policy PDFs, or tell us how you manage policies today."
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
