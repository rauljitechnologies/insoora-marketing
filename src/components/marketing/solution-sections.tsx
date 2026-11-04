import Link from "next/link";
import {
  ArrowRight, BarChart3, BellRing, Building2, Car, CheckCircle2, Clock, Download, Eye,
  FileText, FolderClock, FolderOpen, HeartPulse, Keyboard, Link2, Lock,
  ScanText, Search, Settings2, ShieldCheck, Smartphone, Table2, Upload,
  Users, UsersRound, type LucideIcon,
} from "lucide-react";
import {
  AgentCustomersShot, AgentDashboardShot, CustomerMatchShot,
  CustomerMobileShot, CustomerRenewalsShot, CustomerVaultShot, ExportBuilderShot,
  ExtractedDetailsShot, PolicyHistoryShot, PolicyListShot, RenewalTimelineShot,
  ReviewFlagShot, RoleAccessShot, SearchExportShot, SubAgentTeamShot,
  TemplateRuleShot, UploadQueueShot,
} from "@/components/marketing/product-shots";
import { Eyebrow, H2, Panel, Section } from "@/components/marketing/section";
import { ACCENT_CHIP, ACCENT_TEXT, ACCENT_TILE } from "@/lib/accents";
import type { IconName, ShotName, SolutionSection } from "@/lib/solutions/types";
import { cn } from "@/lib/utils";

// How one band of a solution page is drawn.
//
// Eight renderers, one per section kind, and they are deliberately eight
// different shapes rather than one component taking a `variant` prop. A card
// grid and a numbered workflow and a comparison table are not three skins of
// the same layout, and the moment they share one they start converging — the
// table grows a card border, the steps lose their connector, and the page
// becomes the undifferentiated wall the brief rules out.
//
// What they DO share is everything that must not drift: `Section` for the
// vertical rhythm and the alternating band, `Eyebrow` and `H2` for the
// heading scale, and `lib/accents` for the chapter colour. So the eight
// shapes are visibly one design system.

/**
 * The icon vocabulary these pages may draw from.
 *
 * A name-to-component table rather than letting a content module import
 * `lucide-react` itself. Two reasons: the content stays plain data (the same
 * property that would let a CMS payload be mapped onto it), and the set of
 * icons the pages can use is closed — twelve pages each reaching for whatever
 * glyph seemed apt is how a site ends up with four different "document"
 * icons.
 */
const ICONS: Record<IconName, LucideIcon> = {
  upload: Upload,
  scan: ScanText,
  folder: FolderOpen,
  clock: Clock,
  search: Search,
  users: Users,
  team: UsersRound,
  lock: Lock,
  download: Download,
  table: Table2,
  bell: BellRing,
  shield: ShieldCheck,
  phone: Smartphone,
  car: Car,
  heart: HeartPulse,
  building: Building2,
  check: CheckCircle2,
  history: FolderClock,
  keyboard: Keyboard,
  chart: BarChart3,
  file: FileText,
  link: Link2,
  eye: Eye,
  settings: Settings2,
};

/**
 * The product screens, by name.
 *
 * The one place a page's `shot: "uploadQueue"` becomes a component. If
 * cleared screenshots ever replace the drawings, this table is what gets
 * repointed — no content module and no page layout changes.
 */
// Typed to accept an optional `className` because `CustomerMobileShot`
// takes one — a device drawing needs to be centred in its column where a
// browser frame fills it. A component declaring no props is assignable to
// this, so the other seventeen are unaffected.
const SHOTS: Record<ShotName, (props: { className?: string }) => React.ReactElement> = {
  policyList: PolicyListShot,
  extracted: ExtractedDetailsShot,
  vault: CustomerVaultShot,
  renewalTimeline: RenewalTimelineShot,
  searchExport: SearchExportShot,
  agentDashboard: AgentDashboardShot,
  uploadQueue: UploadQueueShot,
  reviewFlag: ReviewFlagShot,
  customerMatch: CustomerMatchShot,
  policyHistory: PolicyHistoryShot,
  roleAccess: RoleAccessShot,
  exportBuilder: ExportBuilderShot,
  templateRule: TemplateRuleShot,
  customerMobile: CustomerMobileShot,
  subAgentTeam: SubAgentTeamShot,
  customerRenewals: CustomerRenewalsShot,
  agentCustomers: AgentCustomersShot,
};

/** Renders the named screen. Exported because the hero needs one too. */
export function Shot({ name }: { name: ShotName }) {
  const Component = SHOTS[name];
  return <Component />;
}

/** The heading block every section opens with. */
function Head({ section }: { section: SolutionSection }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Eyebrow accent={section.accent}>{section.eyebrow}</Eyebrow>
      <H2>{section.heading}</H2>
      {section.lede && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/70">
          {section.lede}
        </p>
      )}
    </div>
  );
}

/**
 * "What it does not do", as the features page draws it.
 *
 * A left rule in the warning hue rather than a callout box, because it is
 * part of the argument and not an aside from it. A limit in a tinted panel
 * reads as a disclaimer someone was made to add; a limit in the body reads as
 * the page telling you what you asked.
 */
function Limit({ text }: { text: string }) {
  return (
    <div className="mt-5 max-w-2xl border-l-2 border-warning/50 pl-4">
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-warning">
        What it does not do
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

/**
 * One section of a page.
 *
 * `index` decides the band tone and, for a `split`, which side the screen
 * sits on. Both are derived rather than authored: a content module choosing
 * its own background would be choosing it without knowing what is above it,
 * and that is how a page ends up with two white bands in a row.
 */
export function SolutionBand({
  section,
  index,
}: {
  section: SolutionSection;
  index: number;
}) {
  const odd = index % 2 === 1;
  const tone = odd ? "surface" : "background";

  switch (section.kind) {
    // ── Copy beside a screen ───────────────────────────────────────────
    case "split":
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <div className="grid gap-8 rail:grid-cols-2 rail:items-center rail:gap-12">
            <div className={cn(odd && "rail:order-2")}>
              <Head section={section} />
              <div className="mt-4 flex max-w-2xl flex-col gap-3">
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-[15px] leading-relaxed text-foreground/85">
                    {p}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 flex max-w-2xl flex-col gap-2.5">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <CheckCircle2
                        aria-hidden
                        className={cn("mt-0.5 size-4 shrink-0", ACCENT_TEXT[section.accent])}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.limit && <Limit text={section.limit} />}
            </div>
            <div className={cn("min-w-0", odd && "rail:order-1")}>
              <Shot name={section.shot} />
            </div>
          </div>
        </Section>
      );

    // ── Icon cards ─────────────────────────────────────────────────────
    case "cards":
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <Head section={section} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 shell:grid-cols-3">
            {section.cards.map((card) => {
              const Icon = ICONS[card.icon];
              return (
                <div
                  key={card.title}
                  className="card-hover flex flex-col gap-2.5 rounded-2xl border border-border bg-background p-5 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <span
                    aria-hidden
                    className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE[section.accent])}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-[15px] font-semibold text-foreground">{card.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted">{card.text}</p>
                </div>
              );
            })}
          </div>
        </Section>
      );

    // ── A numbered workflow ────────────────────────────────────────────
    //
    // Inside the tinted panel, which is what the home page does with its
    // three steps. The connector between the markers is drawn rather than
    // implied: five boxes with numbers in them is a list, and a sequence has
    // to look like one.
    case "steps":
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <Panel className="gap-8">
            <Head section={section} />
            <div
              className={cn(
                "grid gap-8",
                section.shot ? "rail:grid-cols-[1.1fr_1fr] rail:items-center rail:gap-12" : "",
              )}
            >
              <ol className="flex flex-col gap-0">
                {section.steps.map((step, i) => {
                  const last = i === section.steps.length - 1;
                  return (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex flex-none flex-col items-center">
                        <span
                          className={cn(
                            "grid size-8 place-items-center rounded-full border-2 bg-background text-[13px] font-bold",
                            ACCENT_CHIP[section.accent],
                          )}
                        >
                          {i + 1}
                        </span>
                        {!last && <span aria-hidden className="w-0.5 flex-1 bg-border" />}
                      </span>
                      <span className={cn("flex flex-col gap-1", last ? "pb-0" : "pb-6")}>
                        <h3 className="text-[15px] font-semibold text-foreground">{step.title}</h3>
                        <span className="max-w-xl text-sm leading-relaxed text-muted">{step.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
              {section.shot && (
                <div className="min-w-0">
                  <Shot name={section.shot} />
                </div>
              )}
            </div>
          </Panel>
        </Section>
      );

    // ── A comparison table ─────────────────────────────────────────────
    //
    // `overflow-x-auto` on the wrapper and nothing clever: a five-column
    // table of sentences does not fit a phone, and a table that reflows into
    // stacked cards loses the comparison it exists to make. Scrolling it
    // sideways is the honest answer and the one a reader expects.
    case "table":
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <Head section={section} />
          {/* `tabIndex={0}` with a role and a name is not decoration: a
              region that scrolls must be reachable by keyboard, and a div
              with `overflow-x-auto` is not focusable by default — so a
              keyboard-only reader could see the clipped column and have no
              way to reach it. Naming the region from the section heading is
              what stops a screen reader announcing an unlabelled "region".

              The hint below it is for everyone else: on a phone the table is
              cut off at the container edge with no affordance saying it
              moves, and a reader who does not try is simply missing a
              column. */}
          <div
            role="region"
            aria-label={section.heading}
            tabIndex={0}
            className="mt-7 overflow-x-auto rounded-2xl border border-border bg-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface">
                  {section.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="px-4 py-3 text-[13px] font-bold text-foreground sm:px-5"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {section.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={cn(
                          "px-4 py-3.5 align-top text-sm leading-relaxed sm:px-5",
                          i === 0 ? "font-semibold text-foreground" : "text-muted",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2.5 text-[13px] text-muted rail:hidden" aria-hidden>
            Scroll the table sideways to see every column.
          </p>
          {section.note && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{section.note}</p>}
        </Section>
      );

    // ── A gallery of screens ───────────────────────────────────────────
    //
    // Two per row, never three, and an odd one out goes wide with its
    // caption beside it — the same arrangement /product-in-action uses.
    //
    // Three-up was the first attempt and it was wrong for a reason worth
    // recording. These previews are built from the product's own components,
    // so their internal breakpoints are VIEWPORT media queries: at a desktop
    // width the policy table renders all five of its columns regardless of
    // how narrow the column it has been placed in is. In a three-up grid on
    // a 1440px screen that column is about 390px, and the status column was
    // simply clipped by the frame's `overflow-hidden`. A container query
    // would be the proper fix and would mean rewriting fourteen previews; two
    // columns gives each shot ~560px, which is what they were drawn for.
    case "screens": {
      const rows: (typeof section.shots)[] = [];
      for (let i = 0; i < section.shots.length; i += 2) {
        rows.push(section.shots.slice(i, i + 2));
      }
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <Head section={section} />
          <div className="mt-8 flex flex-col gap-10">
            {rows.map((row, r) =>
              row.length === 2 ? (
                <div key={r} className="grid gap-8 rail:grid-cols-2 rail:gap-10">
                  {row.map((s) => (
                    // `min-w-0`: a grid item defaults to `min-width: auto` and
                    // grows its track rather than letting a wide child shrink.
                    <figure key={s.title} className="m-0 flex min-w-0 flex-col gap-3">
                      <Shot name={s.shot} />
                      <figcaption>
                        <h3 className="text-[15px] font-semibold text-foreground">{s.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted">{s.text}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                // Capped and not full-bleed. The odd-one-out row is often the
                // phone mockup, which is an intrinsically narrow drawing —
                // stretched across a 1216px track it sat alone in the middle
                // of a few hundred pixels of nothing on either side, which is
                // exactly the blank area a wide row is supposed to avoid. A
                // 64rem cap keeps the caption and the figure within reading
                // distance of each other whatever the shot's natural width.
                <figure
                  key={r}
                  className="m-0 grid gap-6 rail:max-w-4xl rail:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] rail:items-center rail:gap-10"
                >
                  <figcaption className="rail:order-1">
                    <h3 className="text-[17px] font-semibold text-foreground">{row[0].title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{row[0].text}</p>
                  </figcaption>
                  <div className="min-w-0 rail:order-2">
                    <Shot name={row[0].shot} />
                  </div>
                </figure>
              ),
            )}
          </div>
        </Section>
      );
    }

    // ── Use cases ──────────────────────────────────────────────────────
    //
    // Three columns of who / what is happening / what changes, which is the
    // shape of a use case and not the shape of a feature card. The situation
    // is set in the muted ink and the outcome in the foreground, so the eye
    // lands on the half that is the point.
    case "usecases":
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <Head section={section} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 shell:grid-cols-3">
            {section.cases.map((c) => (
              <div
                key={c.who}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-5 shadow-card"
              >
                {/* `max-w-full` is load-bearing. `w-max` sizes the chip to
                    its max-content width — the label on ONE line, however
                    long — and a flex child's default `min-width: auto` then
                    refuses to shrink below it. "An owner who has to do all
                    the uploading" at 11px uppercase with letter-spacing is
                    about 300px, which is wider than a 360px phone's content
                    column: the card grew past the viewport and took the page
                    sideways with it. Capping the chip lets the label wrap,
                    which is what it should have done. */}
                <span
                  className={cn(
                    "w-max max-w-full rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase leading-snug tracking-[0.06em]",
                    ACCENT_CHIP[section.accent],
                  )}
                >
                  {c.who}
                </span>
                <p className="text-[13px] leading-relaxed text-muted">{c.situation}</p>
                {c.href ? (
                  <p className="mt-auto border-t border-border pt-3 text-sm font-medium leading-relaxed">
                    <Link
                      href={c.href}
                      className="group inline-flex items-start gap-1.5 text-foreground hover:text-primary"
                    >
                      {c.outcome}
                      <ArrowRight
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </p>
                ) : (
                  <p className="mt-auto border-t border-border pt-3 text-sm font-medium leading-relaxed text-foreground">
                    {c.outcome}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      );

    // ── The limits, collected ──────────────────────────────────────────
    //
    // Every page has one of these and it is not in the footer of the page —
    // it is a band like any other, with the same heading scale. A page that
    // puts its caveats in six-point grey at the bottom has written them for
    // its own protection; a page that gives them a section has written them
    // for the reader deciding whether to commit a book of business.
    case "limits":
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <Head section={section} />
          <div className="mt-7 grid gap-4 rail:grid-cols-2">
            {section.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-warning/30 bg-warning-soft/40 p-5"
              >
                <h3 className="text-[15px] font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>
      );

    // ── Prose ──────────────────────────────────────────────────────────
    case "prose":
      return (
        <Section id={section.id} tone={tone} className="border-t border-border">
          <Head section={section} />
          <div className="mt-4 flex max-w-3xl flex-col gap-3.5">
            {section.paragraphs.map((p) => (
              <p key={p} className="text-[15px] leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
          </div>
          {section.h3?.map((group) => (
            <div key={group.heading} className="mt-7 max-w-3xl">
              <h3 className="text-lg font-semibold text-foreground">{group.heading}</h3>
              <div className="mt-2 flex flex-col gap-3">
                {group.paragraphs.map((p) => (
                  <p key={p} className="text-[15px] leading-relaxed text-foreground/85">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </Section>
      );
  }
}
