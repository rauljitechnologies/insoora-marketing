import Link from "next/link";
import {
  ArrowRight, Download, FileScan, Gauge, Layers, Search, ShieldCheck, Smartphone,
} from "lucide-react";
import {
  Eyebrow, GradientText, PageHead, Panel, Section, SectionHead,
} from "@/components/marketing/section";
import {
  BandPrimaryAction, BandSecondaryAction, ChipLink, CtaBand,
} from "@/components/marketing/cta";
import {
  AgentDashboardShot, CustomerMobileShot, CustomerVaultShot, ExportBuilderShot,
  ExtractedDetailsShot, PolicyHistoryShot, PolicyListShot, RenewalTimelineShot,
  ReviewFlagShot, RoleAccessShot, SearchExportShot, UploadQueueShot,
} from "@/components/marketing/product-shots";
import { ProductTabs } from "@/components/marketing/product-tabs";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, softwareSchema } from "@/lib/seo";
import { ACCENT_TILE, type Accent } from "@/lib/accents";
import { appHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Product in Action — Every Screen in Insoora",
  description:
    "See the Insoora agent dashboard, bulk PDF upload, extracted policy details, review queue, policy list and search, customer portal, renewal tracking and CSV export — every screen, drawn with sample data.",
  path: "/product-in-action",
});

// /product-in-action
//
// ── Why a gallery and not another tabbed widget ──────────────────────────
//
// The home page already carries `ProductTabs`: one app frame, six views, one
// at a time. That is the right shape there — a visitor skimming a long home
// page gets a sense of the product without a twelve-screen scroll.
//
// It is the wrong shape for a page whose entire job is showing the screens.
// A tab strip shows one view and hides eleven; it cannot be scanned, cannot
// be linked to a particular screen, and five of the six panels contribute
// nothing to the page a crawler or an answer engine reads. So this page is a
// GALLERY — every screen rendered at once, at full size, grouped into the
// three acts of the actual workflow, each with a caption saying what it is
// and what it is not.
//
// The tabbed widget still appears, once, near the foot: it is the one place
// a reader can flick between views side by side, which a static gallery
// genuinely cannot do.
//
// ── On the screens themselves ────────────────────────────────────────────
//
// None of these is a screenshot. Every one is drawn in markup from the
// product's own design tokens, with an invented policy on it, and every one
// carries a "Sample data" marker in its own chrome — see the note at the top
// of `product-shots.tsx`. No production record, no real policyholder, no
// genuine insurance PDF appears anywhere on this site, and the band below
// the hero says so in plain words rather than in a footnote.

interface Shot {
  id: string;
  icon: typeof Gauge;
  accent: Accent;
  title: string;
  body: string;
  /** What this screen does NOT show. A gallery with twelve captions and no
   *  limits anywhere is a brochure. */
  note: string;
  shot: React.ReactNode;
  /** `wide` takes the full column with the caption beside it; the rest sit
   *  two-up. Varying the rhythm is what stops twelve figures reading as one
   *  repeated card. */
  wide?: boolean;
}

const ACTS: { id: string; eyebrow: string; accent: Accent; title: string; lede: string; shots: Shot[] }[] = [
  {
    id: "getting-documents-in",
    eyebrow: "Act one",
    accent: "red",
    title: "Getting documents in",
    lede: "Everything Insoora knows, it read off a document somebody gave it. These are the three screens that happen between a PDF arriving and a record existing.",
    shots: [
      {
        id: "upload",
        icon: Layers,
        accent: "red",
        title: "Bulk upload",
        body: "Drop in one policy or a folder of them. Each file reports its own state — read, needs review, or failed — so your attention goes only where it is needed.",
        note: "A failed file is reported, not hidden. One failure does not stop the rest of the batch, and nothing is retried silently.",
        shot: <UploadQueueShot />,
        wide: true,
      },
      {
        id: "extracted",
        icon: FileScan,
        accent: "orange",
        title: "Extracted details, beside the document",
        body: "The fields Insoora read, shown next to the PDF they came from. The record and the document never separate, so any value can be checked against its source.",
        note: "No confidence percentage is published on this screen or anywhere else — only whether a field was read cleanly or flagged.",
        shot: <ExtractedDetailsShot />,
      },
      {
        id: "review",
        icon: ShieldCheck,
        accent: "purple",
        title: "The review queue",
        body: "A field that could not be read confidently is handed back with the region of the page it came from highlighted. You confirm it, or you correct it.",
        note: "Correcting changes the record, never the PDF. The document stays exactly as the insurer issued it.",
        shot: <ReviewFlagShot />,
      },
    ],
  },
  {
    id: "working-the-book",
    eyebrow: "Act two",
    accent: "blue",
    title: "Working the book",
    lede: "Once documents are in, the product stops being an extractor and starts being a place to work. This is the part an agent actually opens every day.",
    shots: [
      {
        id: "dashboard",
        icon: Gauge,
        accent: "blue",
        title: "The agent dashboard",
        body: "What is in the book, what needs attention, and what is expiring — the four counts an agent checks first, with recent activity beside them.",
        note: "Every figure here is sample data in a drawn screen. None of it is a statistic about Insoora's usage; the site publishes no customer counts.",
        shot: <AgentDashboardShot />,
        wide: true,
      },
      {
        id: "policies",
        icon: Search,
        accent: "teal",
        title: "The policy list",
        body: "Every policy in one list, searchable by customer, insurer or policy number and filterable by status and expiry window.",
        note: "Search covers the extracted fields and the customer record — not the full text inside every PDF.",
        shot: <PolicyListShot />,
      },
      {
        id: "search",
        icon: Search,
        accent: "purple",
        title: "Search, filter, export",
        body: "Filters live in the URL, so a view you built can be bookmarked or handed to a colleague with the same access and it opens the same way.",
        note: "An export can never be wider than the screen it came from.",
        shot: <SearchExportShot />,
      },
      {
        id: "history",
        icon: Layers,
        accent: "pink",
        title: "A customer's policy history",
        body: "One customer's cover, year by year, across insurers — with the original document kept against every past policy.",
        note: "History starts at the first upload. Years that were never added to Insoora cannot be recovered by it.",
        shot: <PolicyHistoryShot />,
      },
      {
        id: "export",
        icon: Download,
        accent: "green",
        title: "Building an export",
        body: "Choose the columns, choose CSV or Excel, and take the list into whatever you already use for calls and reporting.",
        note: "Export is an agent capability. Policyholder accounts download their own documents but do not export lists.",
        shot: <ExportBuilderShot />,
      },
    ],
  },
  {
    id: "the-other-end",
    eyebrow: "Act three",
    accent: "green",
    title: "What your customer sees",
    lede: "The policyholder's side is a different product with the same documents behind it: no book of business, no search across customers, just their own cover.",
    shots: [
      {
        id: "customer-portal",
        icon: Smartphone,
        accent: "pink",
        title: "The customer portal",
        body: "A year-wise history of the policies their agent has shared with them, with the original PDFs to download.",
        note: "A customer can only ever open a policy assigned to them, and never another customer's records.",
        shot: <CustomerVaultShot />,
      },
      {
        id: "renewals",
        icon: ArrowRight,
        accent: "orange",
        title: "Renewal tracking",
        body: "Built from the expiry date printed on the policy, not from a reminder somebody set. A policy uploaded and forgotten still appears when its month arrives.",
        note: "Insoora sends no reminder emails, SMS or push notifications. The renewals view is a list you open.",
        shot: <RenewalTimelineShot />,
      },
      {
        id: "access",
        icon: ShieldCheck,
        accent: "green",
        title: "Who can reach what",
        body: "Access is decided by role and checked on the server for every request — agents, sub-agents and policyholders each reach only what their role permits.",
        note: "Insoora holds no security certification, has not been penetration tested, and does not yet offer multi-factor authentication.",
        shot: <RoleAccessShot />,
        wide: true,
      },
    ],
  },
];

function ShotFigure({ shot, wide }: { shot: Shot; wide?: boolean }) {
  return (
    <article
      id={shot.id}
      className={cn(
        "scroll-mt-24",
        wide && "grid gap-7 rail:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] rail:items-center rail:gap-12",
      )}
    >
      <div className={cn(!wide && "mb-4")}>
        <span aria-hidden className={cn("grid size-10 place-items-center rounded-xl", ACCENT_TILE[shot.accent])}>
          <shot.icon className="size-4.5" />
        </span>
        <h3 className="mt-3 text-balance text-[19px] font-bold leading-snug tracking-[-0.02em] text-foreground sm:text-[21px]">
          {shot.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{shot.body}</p>
        <p className="mt-3 border-l-2 border-border pl-3 text-[13px] leading-relaxed text-muted">
          {shot.note}
        </p>
      </div>
      <div className="min-w-0">{shot.shot}</div>
    </article>
  );
}

export default function ProductInActionPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          softwareSchema(),
          breadcrumbSchema([{ name: "Product in Action", path: "/product-in-action" }]),
        )}
      />

      <PageHead
        trail={[{ name: "Product in Action", href: "/product-in-action" }]}
        accent="red"
        badge="Eleven screens, drawn with sample data"
        title={
          <>
            Every screen in Insoora, <GradientText>at full size.</GradientText>
          </>
        }
        lede="The agent dashboard, bulk upload, extraction and review, the policy list, a customer's history, the renewals view, exports and the customer's own portal — the whole product, in the order the work happens."
        actions={
          <>
            <ChipLink href="#getting-documents-in" accent="red">
              Start the tour
            </ChipLink>
            <ChipLink href="/how-it-works" accent="purple">
              Read how it works
            </ChipLink>
          </>
        }
        aside={<AgentDashboardShot />}
      />

      {/* ── The disclosure, immediately and in full width ──
             A page of eleven interface images has to say what they are before
             a visitor has scrolled past the first one. A footnote at the
             bottom would be read after the damage. ── */}
      <Section className="!pb-0 !pt-10">
        <div className="flex flex-col gap-2.5 rounded-2xl border border-warning/30 bg-warning-soft/60 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
          <span
            aria-hidden
            className="grid size-11 flex-none place-items-center rounded-xl bg-background text-warning shadow-card"
          >
            <ShieldCheck className="size-5" />
          </span>
          <p className="text-sm leading-relaxed text-foreground/85">
            <strong className="font-semibold text-foreground">Every screen below is a drawing, not a screenshot.</strong>{" "}
            The policies, names, numbers and premiums on them are invented, and each view carries a
            &ldquo;Sample data&rdquo; marker in its own chrome. No production record, no real
            policyholder and no genuine insurance document appears anywhere on this website — which
            is also why these are built in markup rather than exported as images.
          </p>
        </div>
      </Section>

      {/* ── The three acts ── */}
      {ACTS.map((act, i) => (
        <Section key={act.id} id={act.id} tone={i % 2 === 1 ? "surface" : "background"}>
          <SectionHead
            eyebrow={`${act.eyebrow} · ${act.title}`}
            accent={act.accent}
            title={act.title}
            lede={act.lede}
          />
          {/* Wide figures break the grid and take the full column; the rest
              pair up. The rhythm is the point — twelve equal cards would be
              one card shown twelve times. */}
          <div className="mt-9 flex flex-col gap-12">
            {(() => {
              const out: React.ReactNode[] = [];
              let pair: Shot[] = [];
              const flush = () => {
                if (pair.length === 0) return;
                out.push(
                  <div key={`pair-${out.length}`} className="grid gap-10 rail:grid-cols-2 rail:gap-12">
                    {pair.map((s) => (
                      <ShotFigure key={s.id} shot={s} />
                    ))}
                  </div>,
                );
                pair = [];
              };
              for (const s of act.shots) {
                if (s.wide) {
                  flush();
                  out.push(<ShotFigure key={s.id} shot={s} wide />);
                } else {
                  pair.push(s);
                  if (pair.length === 2) flush();
                }
              }
              flush();
              return out;
            })()}
          </div>
        </Section>
      ))}

      {/* ── The responsive story ──
             A claim the rest of the site makes in words and has never shown:
             the customer side is opened on a phone far more often than on a
             desktop. A device beside a browser frame is the one composition
             that says it without a sentence. ── */}
      <Section className="!pt-0">
        <Panel className="gap-9">
          <div className="flex flex-col gap-2.5">
            <Eyebrow accent="pink">On any screen</Eyebrow>
            <h2 className="text-balance text-[24px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground sm:text-[28px]">
              Your customer will open this on a phone.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/70">
              The agent portal is a working tool and earns a desk. The policyholder&apos;s side is
              opened at a dealership counter or in a hospital corridor, and it is built for that.
            </p>
          </div>
          <div className="grid items-center gap-9 rail:grid-cols-[minmax(0,1fr)_auto] rail:gap-12">
            <CustomerVaultShot />
            <CustomerMobileShot />
          </div>
        </Panel>
      </Section>

      {/* ── The tabbed widget, once ──
             Kept because flicking between views side by side is the one thing
             a static gallery cannot do. It is the last thing on the page
             rather than the first, so the crawlable gallery above is what
             carries the content. ── */}
      <Section tone="surface" className="!pt-0">
        <SectionHead
          eyebrow="Side by side"
          accent="blue"
          title="Flick between the views"
          lede="The same product in one frame, six views, switchable — useful for comparing two screens without scrolling between them."
        />
        <div className="mt-8">
          <ProductTabs />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Want the reasoning behind each of these screens rather than the screen itself? The{" "}
          <Link href="/how-it-works" className="font-semibold text-primary hover:underline">
            how it works
          </Link>{" "}
          page walks the same workflow step by step, and{" "}
          <Link href="/features" className="font-semibold text-primary hover:underline">
            features
          </Link>{" "}
          sets out what each capability does and where it stops.
        </p>
      </Section>

      <CtaBand
        eyebrow="Get started today"
        title="These are drawings. Yours would have your policies on them."
        lede="Create an agent account and upload a few of your own PDFs — it is the only way to find out how well Insoora reads the insurers you actually deal with."
        actions={
          <>
            <BandPrimaryAction href={appHref("/agent/register")} external>
              Get Started
              <ArrowRight aria-hidden className="size-4" />
            </BandPrimaryAction>
            <BandSecondaryAction href="/features">See the features</BandSecondaryAction>
          </>
        }
      />
    </>
  );
}
