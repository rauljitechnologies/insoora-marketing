import Link from "next/link";
import {
  ArrowRight, BellRing, CircleCheck, FileScan, Search, Smartphone,
  TriangleAlert, Upload, UserCheck,
} from "lucide-react";
import {
  Eyebrow, GradientText, PageHead, Panel, Section, SectionHead,
} from "@/components/marketing/section";
import {
  BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand,
} from "@/components/marketing/cta";
import { WorkflowRail, WorkflowStepRow, type WorkflowStep } from "@/components/marketing/workflow";
import {
  CustomerMatchShot, CustomerMobileShot, ExtractedDetailsShot, PolicyListShot,
  RenewalTimelineShot, ReviewFlagShot, UploadQueueShot,
} from "@/components/marketing/product-shots";
import { JsonLd } from "@/components/marketing/json-ld";
import { absolute, breadcrumbSchema, jsonLdGraph, pageMetadata, softwareSchema } from "@/lib/seo";
import { appHref } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "How It Works — From Policy PDF to Organized Record",
  description:
    "The seven steps an insurance policy takes through Insoora: upload the PDF, extract the fields, flag what is unclear, file it under the customer, search it, share it with the policyholder, and track the expiry date.",
  path: "/how-it-works",
});

// /how-it-works
//
// ── Why this is a page and not the home page's section ───────────────────
//
// The home page compresses the journey to three steps — upload, extract,
// manage — which is the right length for a hero-adjacent summary and the
// wrong length for someone deciding whether to move a book of business onto
// the product. Four of the seven things that actually happen are invisible
// in that version: the review of a flagged field, how a policy finds its
// customer, what the policyholder sees, and where the expiry date comes
// from. Those four are also the ones an agent asks about first.
//
// The home page section keeps its three steps and its `#how-it-works`
// anchor — nothing about that URL changes. This page is the long answer, and
// the footer's "How it works" link now points here rather than at an anchor
// a third of the way down another page.
//
// ── On the shape ─────────────────────────────────────────────────────────
//
// A vertical spine, not /features' alternating two-column grid. Both pages
// run a long list of sections, and running them in the same shape would make
// the second read as the first with different words. A sequence also wants a
// spine in a way a catalogue does not: the connecting line IS the claim that
// step 4 follows step 3.
//
// ── On what is NOT claimed ───────────────────────────────────────────────
//
// There are no automatic reminders here, because there are none in the
// product: the renewals view is a list an agent opens, built from the date on
// the document. Step 7 says that in as many words rather than leaving a
// reader to assume an email arrives. Nothing on this page describes a
// notification, an SMS, an insurer integration or a confidence percentage.

const STEPS: WorkflowStep[] = [
  { n: 1, icon: Upload, accent: "red", label: "Upload the PDF", hint: "One file or a whole batch", href: "#upload" },
  { n: 2, icon: FileScan, accent: "orange", label: "Read the fields", hint: "Text layer, or OCR on a scan", href: "#extract" },
  { n: 3, icon: TriangleAlert, accent: "purple", label: "Flag what is unclear", hint: "Never a silent guess", href: "#review" },
  { n: 4, icon: UserCheck, accent: "blue", label: "File it by customer", hint: "Matched on the mobile number", href: "#file" },
  { n: 5, icon: Search, accent: "teal", label: "Search and manage", hint: "Filter, sort, export", href: "#manage" },
  { n: 6, icon: Smartphone, accent: "pink", label: "Share with the customer", hint: "Only what you assign", href: "#share" },
  { n: 7, icon: BellRing, accent: "green", label: "Watch the expiries", hint: "From the policy's own date", href: "#renewals" },
];

interface StepContent {
  step: WorkflowStep;
  title: string;
  lead: string;
  detail: string[];
  /** The honest edge of this step. Every one has one; a seven-step diagram
   *  with no caveats anywhere is a sales deck, not an explanation. */
  caveat: string;
  shot: React.ReactNode;
}

const CONTENT: StepContent[] = [
  {
    step: STEPS[0],
    title: "You upload the policy document",
    lead: "Sign in to the agent portal and drop in a policy PDF — one, or the whole folder that built up this week. The batch processes together and each file reports its own state.",
    detail: [
      "Insurer-issued PDFs are the normal case. A photograph or a scan of a printed policy is accepted too, and goes down a different path at step 2.",
      "A file that cannot be read does not stop the others. It is reported as failed and stays in the batch view so you can see what happened to it rather than discovering the gap months later.",
    ],
    caveat:
      "Large files and long documents take longer. The batch view is where that progress is visible; there is no email when it finishes.",
    shot: <UploadQueueShot />,
  },
  {
    step: STEPS[1],
    title: "Insoora reads the fields off the page",
    lead: "The document's own text layer is parsed first: policy number, insurer, insured name, cover start and expiry, premium, and the vehicle or asset the policy covers.",
    detail: [
      "When a page carries no text layer — a scan, or a photograph of a printed schedule — OCR runs over the image and the result is parsed the same way.",
      "Each field is saved against the policy with the original PDF attached. The record and the document it came from never separate, which is what makes a disputed value checkable rather than arguable.",
    ],
    caveat:
      "Accuracy depends entirely on the document. Insurer-issued digital PDFs read best; a phone photograph of a creased printout reads worst. Insoora publishes no accuracy figure, because it does not measure one it could stand behind.",
    shot: <ExtractedDetailsShot />,
  },
  {
    step: STEPS[2],
    title: "Anything unclear is handed back, not guessed",
    lead: "A field the parser cannot read confidently is marked as needing review. It is shown beside the part of the document it came from, and you confirm it or correct it.",
    detail: [
      "This is the step most products skip, and skipping it is how a wrong expiry date ends up in a renewals list looking exactly as trustworthy as a right one.",
      "Confirming is one click. Correcting replaces the value on the record — never on the PDF, which stays as issued.",
    ],
    caveat:
      "A flagged field that is never confirmed stays unverified, and anything downstream of it — including the renewal date — is only as good as the extraction behind it.",
    shot: <ReviewFlagShot />,
  },
  {
    step: STEPS[3],
    title: "The policy is filed under the right customer",
    lead: "A policy finds its policyholder by the mobile number printed on the document, matched against the number you already hold for that customer.",
    detail: [
      "When it matches, the policy joins that customer's record and stacks up alongside whatever else they hold, across insurers and across years.",
      "In an agency, sub-agents upload into the same book of business. The agency sees all of it; each person sees only what their role allows.",
    ],
    caveat:
      "When no number matches — it was misread, or it is not the one on file — the policy waits in an unassigned list for an agent to pick the customer. It is not filed under a best guess.",
    shot: <CustomerMatchShot />,
  },
  {
    step: STEPS[4],
    title: "You search, filter and work the list",
    lead: "Find any policy by customer, insurer, policy number, status or expiry window, then sort the result and act on it.",
    detail: [
      "Filters live in the URL, so a view you built can be bookmarked or sent to a colleague with the same access and it opens the same way.",
      "The same filters drive the renewals view, which is what turns a search into this week's working list rather than a one-off lookup.",
    ],
    caveat:
      "Search covers the fields Insoora extracted and the customer record. It is not a full-text search inside the body of every PDF.",
    shot: <PolicyListShot />,
  },
  {
    step: STEPS[5],
    title: "Your customer opens their own copy",
    lead: "A policyholder signs in to their own portal and sees a year-wise history of the policies you have shared with them, with the original documents to download.",
    detail: [
      "They register with the mobile number you hold on record, which is the same number that filed the policy at step 4.",
      "That is one fewer call asking for a copy of last year's schedule, and one fewer document going out over WhatsApp.",
    ],
    caveat:
      "A customer can only ever open a policy assigned to them, and never another customer's records. Access is checked on the server for every request, not hidden in the interface.",
    shot: <CustomerMobileShot className="rail:py-2" />,
  },
  {
    step: STEPS[6],
    title: "Expiry dates stay in view",
    lead: "The renewals view lists policies ending within the next 30 days, sorted by date — built from the expiry printed on the policy itself, not from a reminder somebody remembered to set.",
    detail: [
      "Because the date comes from the document, a policy that was uploaded in March and forgotten about still appears when its month comes round.",
      "The list exports, so the week's renewals can leave the screen as a CSV and go into whatever you already use to make calls.",
    ],
    caveat:
      "Insoora does not send reminders. There is no automatic email, SMS or push notification — the renewals view is a list you open, and that is the whole of the mechanism.",
    shot: <RenewalTimelineShot />,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          softwareSchema(),
          breadcrumbSchema([{ name: "How It Works", path: "/how-it-works" }]),
          // HowTo markup, from the same seven steps the page renders. Each
          // `url` is the anchor the visible rail links to, so the structured
          // data and the page describe one object rather than two.
          {
            "@type": "HowTo",
            name: "How Insoora turns an insurance policy PDF into an organized record",
            description:
              "The seven steps a policy document takes through Insoora, from upload to renewal tracking.",
            step: CONTENT.map((c, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: c.title,
              text: c.lead,
              url: `${absolute("/how-it-works")}${c.step.href}`,
            })),
          },
        )}
      />

      <PageHead
        trail={[{ name: "How It Works", href: "/how-it-works" }]}
        accent="purple"
        badge="Seven steps, and where each one stops"
        title={
          <>
            What actually happens to a policy PDF{" "}
            <GradientText>after you upload it.</GradientText>
          </>
        }
        lede="No black box. Below is every step a document takes through Insoora — what is read, what is handed back to you, how it finds its customer, and where the renewal date comes from."
        checks={[
          "The original PDF is always kept",
          "Unclear fields are flagged, not guessed",
          "Access is checked on the server",
          "Nothing is shared without your action",
        ]}
        actions={
          <ChipLink href="#upload" accent="purple">
            Start at step 1
          </ChipLink>
        }
      />

      {/* ── The journey at a glance ──
             A rail rather than a paragraph summarising the seven sections
             below: a reader who only wants to know the shape of the thing
             gets it in one line, and a reader who came for step 3 can jump
             straight there. ── */}
      <Section className="!pb-10 !pt-10">
        <Panel className="gap-7">
          <div className="flex flex-col gap-2.5">
            <Eyebrow accent="purple">The whole journey</Eyebrow>
            <h2 className="text-balance text-[22px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground sm:text-[26px]">
              One document, seven stops.
            </h2>
          </div>
          <WorkflowRail steps={STEPS} />
        </Panel>
      </Section>

      {/* ── The seven steps, on a spine ── */}
      <Section className="!pt-4">
        <h2 className="sr-only">The seven steps in detail</h2>
        <ol className="flex flex-col">
          {CONTENT.map((c, i) => (
            <WorkflowStepRow key={c.step.n} step={c.step} last={i === CONTENT.length - 1}>
              <div className="grid gap-7 rail:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] rail:items-start rail:gap-12">
                <div className="min-w-0">
                  <Eyebrow accent={c.step.accent}>Step {c.step.n}</Eyebrow>
                  <h3 className="mt-2 text-balance text-[23px] font-bold leading-[1.18] tracking-[-0.025em] text-foreground sm:text-[27px]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{c.lead}</p>
                  <div className="mt-3.5 flex flex-col gap-3">
                    {c.detail.map((d) => (
                      <p key={d} className="text-sm leading-relaxed text-muted">
                        {d}
                      </p>
                    ))}
                  </div>
                  <div className="mt-5 border-l-2 border-warning/50 pl-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-warning">
                      Where this stops
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.caveat}</p>
                  </div>
                </div>
                <div className="min-w-0">{c.shot}</div>
              </div>
            </WorkflowStepRow>
          ))}
        </ol>
      </Section>

      {/* ── What the first week looks like ──
             The question the seven steps do not answer: what does a person
             actually do on day one. Three short cards rather than another
             long section — this is orientation, not another chapter. ── */}
      <Section tone="surface">
        <SectionHead
          eyebrow="Getting started"
          accent="teal"
          title="What the first week actually looks like"
          lede="No migration project and nothing to install. The honest answer is that you find out how well it reads your insurers by giving it your insurers' documents."
        />
        <ol className="mt-8 grid gap-4 rail:grid-cols-3">
          {[
            {
              n: "Day 1",
              t: "Upload ten policies you know well",
              d: "Pick a spread of insurers and a mix of digital PDFs and scans. You are testing the layouts you actually receive, not a demo file.",
            },
            {
              n: "Day 2",
              t: "Work the flagged fields",
              d: "Confirm or correct whatever came back for review. This is the step that tells you how much attention the product will really cost you each week.",
            },
            {
              n: "Week 1",
              t: "Open the renewals view",
              d: "Once a month or two of policies are in, the expiry list stops being empty and starts being the reason to open the product at all.",
            },
          ].map((s) => (
            <li
              key={s.n}
              className="card-hover flex flex-col gap-2.5 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6"
            >
              <span className="inline-flex w-max items-center rounded-full border border-[#A5F3FC] bg-[#ECFEFF] px-2.5 py-1 text-[12px] font-bold text-[#0E7490]">
                {s.n}
              </span>
              <h3 className="text-[16px] font-semibold text-foreground">{s.t}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── The four things the journey does NOT include ──
             Stated as its own section rather than buried as a caveat, because
             these are the four assumptions a reader most reliably arrives
             with, and each one is wrong. ── */}
      <Section className="!pt-0">
        <SectionHead
          eyebrow="Before you assume"
          accent="red"
          title="Four things this workflow does not do"
          lede="Each of these is something readers regularly expect from a product described this way. None of them is implemented, so none of them is promised."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              t: "It does not notify anyone",
              d: "No reminder email, no SMS, no push. The renewals view is a list you open. If a notification ever ships, this page will say so.",
            },
            {
              t: "It does not talk to insurers",
              d: "There is no integration with any insurer's system. Everything Insoora knows about a policy, it read off a document you gave it.",
            },
            {
              t: "It does not renew anything",
              d: "Insoora surfaces the expiry date. Issuing or renewing cover is between you, your customer and the insurer, exactly as it was.",
            },
            {
              t: "It does not learn your layouts by itself",
              d: "A stubborn insurer layout is fixed by an administrator writing a rule for it. No model is trained on your documents.",
            },
          ].map((x) => (
            <li
              key={x.t}
              className="flex gap-3 rounded-2xl border border-border bg-background p-5 shadow-card"
            >
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#FEE2E2] text-[#DC2626]">
                <TriangleAlert className="size-4" />
              </span>
              <span className="min-w-0">
                <h3 className="text-[15px] font-semibold text-foreground">{x.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.d}</p>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          The{" "}
          <Link href="/features" className="font-semibold text-primary hover:underline">
            features page
          </Link>{" "}
          covers each capability and its limits at length, and the{" "}
          <Link href="/faq" className="font-semibold text-primary hover:underline">
            FAQ
          </Link>{" "}
          answers the questions agents ask before signing up.
        </p>
      </Section>

      {/* ── Where it leads ── */}
      <Section tone="surface" className="!pt-0">
        <div className="grid gap-4 rail:grid-cols-3">
          {[
            {
              icon: CircleCheck,
              t: "See the screens",
              d: "Every view in the workflow above, drawn at full size with sample data.",
              href: "/product-in-action",
              label: "Product in action",
              accent: "blue" as const,
            },
            {
              icon: FileScan,
              t: "Read the detail",
              d: "Nine capabilities, each with what it does and where it stops.",
              href: "/features",
              label: "Explore features",
              accent: "purple" as const,
            },
            {
              icon: BellRing,
              t: "Ask a question",
              d: "Fifteen answers about extraction, access, storage and renewals.",
              href: "/faq",
              label: "Read the FAQ",
              accent: "orange" as const,
            },
          ].map((c) => (
            <div
              key={c.t}
              className="card-hover flex flex-col items-start gap-3 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6"
            >
              <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <c.icon className="size-5" />
              </span>
              <h3 className="text-[16px] font-semibold text-foreground">{c.t}</h3>
              <p className="text-sm leading-relaxed text-muted">{c.d}</p>
              <ChipLink href={c.href} accent={c.accent} className="mt-1">
                {c.label}
              </ChipLink>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Get started today"
        title="The only honest test is your own insurers' PDFs."
        lede="Create an agent account, upload a handful of policies you know by heart, and see how much of each one comes back right."
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
