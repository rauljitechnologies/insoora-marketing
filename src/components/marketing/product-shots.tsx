import { Check, Download, FileText, Minus, Search, ShieldCheck, TriangleAlert, Upload } from "lucide-react";
import { SampleTag } from "@/components/marketing/section";
import { cn } from "@/lib/utils";

// Interface previews for the website.
//
// These are hand-built from the product's own tokens rather than being
// screenshots, for three reasons: a screenshot of a signed-in screen would
// have to be scrubbed of a real policyholder's name, address and policy
// number before it could be published; a PNG goes stale the moment the real
// UI changes a colour; and an image costs a request and a layout shift where
// markup costs neither.
//
// Each one is `aria-hidden` with the surrounding copy carrying the meaning,
// and each one is labelled "Sample data" — the policy below is invented, and
// a visitor must not have to guess that.
//
// If genuine screenshots are ever approved for publication, these components
// are the place to swap them in: the sections that use them pass no data, so
// replacing the body of one changes nothing around it.
//
// The policies below are the same invented cast the home page mockups use —
// see the note in `product-tabs.tsx`. Two sets of fictional customers across
// one website is the kind of detail that makes a product look assembled
// rather than built.

/** A browser-chrome frame, so a preview reads as a screen and not as a card. */
function Frame({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border bg-background shadow-card", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </span>
        <figcaption className="ml-1 truncate text-xs font-medium text-muted">{label}</figcaption>
        <SampleTag className="ml-auto" />
      </div>
      <div aria-hidden>{children}</div>
    </figure>
  );
}

const POLICY_ROWS: { customer: string; insurer: string; number: string; expiry: string; state: "ok" | "review" | "soon" }[] = [
  { customer: "R. Mehta", insurer: "HDFC Life", number: "1412769663", expiry: "10 Jan 2027", state: "ok" },
  { customer: "K. Rao", insurer: "Royal Sundaram", number: "7741920883", expiry: "02 Dec 2026", state: "soon" },
  { customer: "P. Shah", insurer: "ICICI Lombard", number: "2201987764", expiry: "22 Feb 2027", state: "ok" },
  { customer: "N. Desai", insurer: "SBI Life", number: "4412998871", expiry: "18 Apr 2027", state: "review" },
];

const STATE_LABEL: Record<"ok" | "review" | "soon", { text: string; cls: string }> = {
  ok: { text: "Read", cls: "bg-success-soft text-success" },
  review: { text: "Needs review", cls: "bg-warning-soft text-warning" },
  soon: { text: "Expiring", cls: "bg-danger-soft text-danger" },
};

/** Agent policy management: the working list an agent lands on. */
export function PolicyListShot() {
  return (
    <Frame label="Agent portal — Policies">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="flex h-8 flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-xs text-muted">
          <Search className="size-3.5" />
          Search customer, insurer or policy number
        </span>
        <span className="hidden h-8 items-center rounded-lg border border-border px-2.5 text-xs font-medium text-muted sm:inline-flex">
          Expiring in 30 days
        </span>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border text-[11px] font-semibold text-muted">
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Insurer</th>
            <th className="hidden px-4 py-2 sm:table-cell">Policy no.</th>
            <th className="px-4 py-2">Expiry</th>
            <th className="px-4 py-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {POLICY_ROWS.map((r) => (
            <tr key={r.number} className="text-[12px]">
              <td className="px-4 py-2.5 font-semibold text-foreground">{r.customer}</td>
              <td className="px-4 py-2.5 text-muted">{r.insurer}</td>
              <td className="hidden px-4 py-2.5 font-mono text-[11px] text-muted sm:table-cell">{r.number}</td>
              <td className="px-4 py-2.5 tabular-nums text-muted">{r.expiry}</td>
              <td className="px-4 py-2.5 text-right">
                <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", STATE_LABEL[r.state].cls)}>
                  {STATE_LABEL[r.state].text}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

const EXTRACTED: { label: string; value: string; mono?: boolean; tone?: "review" }[] = [
  { label: "Policy number", value: "7741920883", mono: true },
  { label: "Insurer", value: "Royal Sundaram" },
  { label: "Insured name", value: "Kiran Rao" },
  { label: "Vehicle", value: "GJ06KQ9835", mono: true },
  { label: "Premium", value: "₹6,750" },
  { label: "Cover start", value: "03 Dec 2025" },
  { label: "Cover expiry", value: "02 Dec 2026" },
  { label: "Nominee", value: "Not read clearly", tone: "review" },
];

/** Extracted policy details, next to the document they came from. */
export function ExtractedDetailsShot() {
  return (
    <Frame label="Agent portal — Extracted details">
      <div className="grid sm:grid-cols-2">
        <div className="border-b border-border p-4 sm:border-b-0 sm:border-r">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-danger-soft text-[10px] font-bold text-danger">
              PDF
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-foreground">royal_car_kiran.pdf</span>
              <span className="block text-[11px] text-muted">1.4 MB · 2 pages</span>
            </span>
          </div>
          <div className="mt-3 space-y-1.5 rounded-lg border border-border bg-surface p-3">
            <span className="block text-[9px] font-semibold tracking-wide text-muted">
              ROYAL SUNDARAM GENERAL INSURANCE
            </span>
            <span className="block text-[11px] font-semibold text-foreground">Private Car Package Policy</span>
            {["88%", "72%", "91%", "64%", "80%", "58%"].map((w, i) => (
              <span key={i} className="block h-[3px] rounded-full bg-foreground/10" style={{ width: w }} />
            ))}
          </div>
        </div>
        <dl className="divide-y divide-border">
          {EXTRACTED.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-3 px-4 py-[7px]">
              <dt className="text-[11px] text-muted">{f.label}</dt>
              <dd
                className={cn(
                  "text-right text-[12px] font-semibold",
                  f.tone === "review" ? "text-warning" : "text-foreground",
                  f.mono && "font-mono text-[11px]",
                )}
              >
                {f.value}
                {f.tone === "review" && <span aria-hidden className="ml-1.5 inline-block size-1.5 rounded-full bg-accent-warning align-middle" />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Frame>
  );
}

const VAULT_YEARS: { year: string; count: string; current?: boolean }[] = [
  { year: "2024", count: "1 policy" },
  { year: "2025", count: "2 policies" },
  { year: "2026", count: "1 policy" },
  { year: "2027", count: "1 policy", current: true },
];

/** The policyholder's own view: only what their agent shared with them. */
export function CustomerVaultShot() {
  return (
    <Frame label="Customer portal — My policies">
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-[11px] font-bold text-primary">
            RM
          </span>
          <span>
            <span className="block text-xs font-semibold text-foreground">Rahul Mehta</span>
            <span className="block text-[11px] text-muted">4 policies shared by your agent</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-success">
            <ShieldCheck className="size-3" />
            Your records only
          </span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {VAULT_YEARS.map((y) => (
            <div
              key={y.year}
              className={cn(
                "rounded-lg border px-2 py-2 text-center",
                y.current ? "border-primary bg-primary-soft" : "border-border bg-surface",
              )}
            >
              <span className={cn("block text-[11px] font-bold tabular-nums", y.current ? "text-primary" : "text-muted")}>
                {y.year}
              </span>
              <span className="mt-0.5 block text-[10px] text-muted">{y.count}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border">
          {[
            { name: "Term plan — HDFC Life", year: "2027" },
            { name: "Car package — Bajaj Allianz", year: "2026" },
          ].map((d) => (
            <div key={d.name} className="flex items-center gap-2 px-3 py-2">
              <FileText className="size-3.5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1 truncate text-[11px] text-foreground">{d.name}</span>
              <span className="text-[10px] tabular-nums text-muted">{d.year}</span>
              <Download className="size-3.5 shrink-0 text-muted" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const TIMELINE: { label: string; date: string; tone: "past" | "due" | "future" }[] = [
  { label: "Policy issued", date: "03 Dec 2025", tone: "past" },
  { label: "Renewal reminder", date: "02 Nov 2026", tone: "due" },
  { label: "Cover expires", date: "02 Dec 2026", tone: "future" },
];

/** The renewal timeline, built from the dates on the policy itself. */
export function RenewalTimelineShot() {
  return (
    <Frame label="Agent portal — Renewals">
      <div className="p-4">
        <ol className="relative space-y-4 border-l border-border pl-5">
          {TIMELINE.map((t) => (
            <li key={t.label} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[1.4rem] top-1 size-2.5 rounded-full border-2 border-background",
                  t.tone === "due" ? "bg-accent-warning" : t.tone === "future" ? "bg-accent-danger" : "bg-accent-success",
                )}
              />
              <span className="block text-[12px] font-semibold text-foreground">{t.label}</span>
              <span className="block text-[11px] tabular-nums text-muted">{t.date}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg border border-border bg-surface px-3 py-2 text-[11px] leading-relaxed text-muted">
          Dates come from the policy document, not from a reminder set by hand.
        </p>
      </div>
    </Frame>
  );
}

/** Search and export: the end of the workflow. */
export function SearchExportShot() {
  return (
    <Frame label="Agent portal — Search and export">
      <div className="p-4">
        <span className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-xs text-muted">
          <Search className="size-3.5" />
          insurer:&ldquo;HDFC Life&rdquo; expiring:30d
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Customer", "Insurer", "Expiry window", "Status"].map((f) => (
            <span key={f} className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2.5">
          <span className="text-[11px] text-muted">
            <span className="font-semibold text-foreground">18 policies</span> match
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-[10px] font-semibold text-white">
            <Download className="size-3" />
            Export CSV
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          An export carries only the policies the person could already see.
        </p>
      </div>
    </Frame>
  );
}

// ── The second set ────────────────────────────────────────────────────────
//
// Added for /how-it-works, /product-in-action, and the four features on
// /features that had no screen of their own (history, secure access, export
// and insurer templates). Same rules as above: hand-built from the tokens,
// `aria-hidden` inside a labelled `Frame`, every value invented, and the same
// cast of fictional customers as `product-tabs.tsx` so a visitor moving
// between pages sees one consistent book of business.
//
// Deliberately NOT one shared table component with different data. A page
// that shows eight views of a product and draws all eight as the same grid
// has not shown eight views — it has shown one, eight times. Each of these
// is the shape the real screen is: a dashboard is tiles and a chart, an
// upload is a queue with progress, access is a matrix, history is a stack.

const STATS: { label: string; value: string; sub: string; tone: string; bar: string }[] = [
  { label: "Policies", value: "248", sub: "across 112 customers", tone: "text-[#2563EB]", bar: "bg-[#2563EB]" },
  { label: "Needs review", value: "6", sub: "fields flagged", tone: "text-[#C2410C]", bar: "bg-[#EA580C]" },
  { label: "Renewals · 30d", value: "11", sub: "earliest 02 Dec", tone: "text-[#B91C1C]", bar: "bg-[#DC2626]" },
  { label: "Customers", value: "112", sub: "9 added this month", tone: "text-[#15803D]", bar: "bg-[#16A34A]" },
];

/** Monthly uploads. A shape, not a claim — the axis carries no unit on
 *  purpose, because the only honest reading of it is "more in some months
 *  than others". */
const UPLOAD_BARS = [38, 52, 44, 68, 61, 83, 72, 95];

const ACTIVITY: { who: string; what: string; when: string; dot: string }[] = [
  { who: "Kiran Rao", what: "Car policy read · 13 of 14 fields", when: "12 min ago", dot: "bg-[#16A34A]" },
  { who: "Neha Desai", what: "Expiry date flagged for review", when: "1 hr ago", dot: "bg-[#EA580C]" },
  { who: "Rahul Mehta", what: "Term policy shared with customer", when: "Yesterday", dot: "bg-[#2563EB]" },
];

/** The agent's dashboard: the first screen after signing in. */
export function AgentDashboardShot() {
  return (
    <Frame label="Agent portal — Dashboard">
      <div className="flex flex-col gap-3 p-4">
        <div className="grid grid-cols-2 gap-2 min-[30rem]:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-surface p-2.5">
              <span className="block text-[10px] font-medium text-muted">{s.label}</span>
              <strong className={cn("mt-0.5 block text-[19px] leading-none tabular-nums", s.tone)}>
                {s.value}
              </strong>
              <span className="mt-1 block text-[9px] leading-tight text-muted">{s.sub}</span>
              <span className="mt-1.5 block h-[3px] overflow-hidden rounded-full bg-border">
                <span className={cn("block h-full w-2/3 rounded-full", s.bar)} />
              </span>
            </div>
          ))}
        </div>

        <div className="grid gap-3 min-[30rem]:grid-cols-[1fr_1.15fr]">
          <div className="rounded-xl border border-border p-3">
            <span className="block text-[10px] font-semibold text-foreground">Policies added</span>
            <span className="block text-[9px] text-muted">Last 8 months</span>
            <span className="mt-2.5 flex h-[3.25rem] items-end gap-[3px]">
              {UPLOAD_BARS.map((h, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex-1 rounded-t-[2px]",
                    i === UPLOAD_BARS.length - 1 ? "bg-[#2563EB]" : "bg-[#BFDBFE]",
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </span>
          </div>

          <div className="rounded-xl border border-border p-3">
            <span className="block text-[10px] font-semibold text-foreground">Recent activity</span>
            <ul className="mt-2 flex flex-col gap-2">
              {ACTIVITY.map((a) => (
                <li key={a.who} className="flex items-start gap-2">
                  <span aria-hidden className={cn("mt-1 size-1.5 shrink-0 rounded-full", a.dot)} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[10px] font-semibold text-foreground">{a.who}</span>
                    <span className="block truncate text-[9px] text-muted">{a.what}</span>
                  </span>
                  <span className="shrink-0 text-[9px] text-muted">{a.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Frame>
  );
}

const QUEUE: { file: string; size: string; pct: number; state: "done" | "working" | "review" | "failed" }[] = [
  { file: "hdfc_term_rahul.pdf", size: "1.2 MB", pct: 100, state: "done" },
  { file: "icici_car_priya.pdf", size: "860 KB", pct: 100, state: "done" },
  { file: "star_health_amit.pdf", size: "2.4 MB", pct: 100, state: "review" },
  { file: "sbi_endow_neha.pdf", size: "1.8 MB", pct: 62, state: "working" },
  { file: "scan_2019_torn.jpg", size: "4.1 MB", pct: 100, state: "failed" },
];

const QUEUE_STATE: Record<"done" | "working" | "review" | "failed", { text: string; chip: string; bar: string }> = {
  done: { text: "Read", chip: "bg-success-soft text-success", bar: "bg-[#16A34A]" },
  working: { text: "Reading…", chip: "bg-primary-soft text-primary", bar: "bg-[#2563EB]" },
  review: { text: "Needs review", chip: "bg-warning-soft text-warning", bar: "bg-[#EA580C]" },
  failed: { text: "Failed", chip: "bg-danger-soft text-danger", bar: "bg-[#DC2626]" },
};

/**
 * Bulk upload, mid-batch.
 *
 * It shows a FAILED file on purpose. A queue of five green ticks would say
 * the opposite of what the copy beside it says — that a file which cannot be
 * read is reported rather than quietly dropped, and that one failure does
 * not stop the batch.
 */
export function UploadQueueShot() {
  return (
    <Frame label="Agent portal — Upload">
      <div className="p-4">
        <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-primary/40 bg-primary-soft/40 px-4 py-5 text-center">
          <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-background text-primary shadow-card">
            <Upload className="size-4" />
          </span>
          <span className="text-[11px] font-semibold text-foreground">Drop policy PDFs here</span>
          <span className="text-[10px] text-muted">Many files at once · PDF, or a scan of one</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 text-[10px]">
          <span className="font-semibold text-foreground">5 files in this batch</span>
          <span className="text-muted">3 read · 1 reading · 1 failed</span>
        </div>

        <ul className="mt-2 flex flex-col gap-1.5">
          {QUEUE.map((q) => {
            const s = QUEUE_STATE[q.state];
            return (
              <li key={q.file} className="rounded-lg border border-border px-2.5 py-2">
                <span className="flex items-center gap-2">
                  <span className="grid size-5 shrink-0 place-items-center rounded bg-danger-soft text-[7px] font-bold text-danger">
                    PDF
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-foreground">{q.file}</span>
                  <span className="shrink-0 text-[9px] tabular-nums text-muted">{q.size}</span>
                  <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-semibold", s.chip)}>
                    {s.text}
                  </span>
                </span>
                <span className="mt-1.5 block h-[3px] overflow-hidden rounded-full bg-border">
                  <span className={cn("block h-full rounded-full", s.bar)} style={{ width: `${q.pct}%` }} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Frame>
  );
}

/**
 * A flagged field, beside the page it was read from.
 *
 * The one screen that explains the product's central promise — that an
 * unclear value is handed back rather than guessed — so it is drawn as the
 * real interaction: the region highlighted on the page, the value it
 * produced, and the two controls an agent actually gets.
 */
export function ReviewFlagShot() {
  return (
    <Frame label="Agent portal — Review a flagged field">
      <div className="grid sm:grid-cols-[1.05fr_1fr]">
        <div className="border-b border-border p-4 sm:border-b-0 sm:border-r">
          <span className="block text-[9px] font-semibold uppercase tracking-wide text-muted">
            Page 2 of 2 · policy schedule
          </span>
          <div className="mt-2 space-y-1.5 rounded-lg border border-border bg-surface p-3">
            {["86%", "70%"].map((w, i) => (
              <span key={i} className="block h-[3px] rounded-full bg-foreground/10" style={{ width: w }} />
            ))}
            {/* The highlighted region: the one line the parser was unsure of. */}
            <span className="relative block rounded border-2 border-warning bg-warning-soft px-1.5 py-1">
              <span className="block text-[9px] font-semibold text-foreground">
                Period of Insurance: 03/12/25 to 02/12/26
              </span>
              <span className="absolute -top-2 right-1 rounded-full bg-warning px-1.5 py-px text-[7px] font-bold text-white">
                LOW CONFIDENCE
              </span>
            </span>
            {["78%", "92%", "64%"].map((w, i) => (
              <span key={i} className="block h-[3px] rounded-full bg-foreground/10" style={{ width: w }} />
            ))}
          </div>
          <p className="mt-2 text-[9px] leading-relaxed text-muted">
            Two-digit years, and a format this insurer uses on some layouts and not others.
          </p>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <span className="inline-flex w-max items-center gap-1 rounded-full bg-warning-soft px-2 py-0.5 text-[9px] font-bold text-warning">
            <TriangleAlert className="size-2.5" />
            Needs your confirmation
          </span>
          <span className="text-[11px] font-semibold text-foreground">Cover expiry</span>
          <div className="rounded-lg border-2 border-warning/50 bg-background px-2.5 py-2">
            <span className="block text-[9px] text-muted">Read as</span>
            <span className="block font-mono text-[13px] font-bold text-foreground">02 Dec 2026</span>
          </div>
          <div className="mt-1 flex gap-1.5">
            <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#15803D] px-2 py-1.5 text-[9px] font-bold text-white">
              <Check className="size-2.5" strokeWidth={3} />
              Confirm
            </span>
            <span className="flex flex-1 items-center justify-center rounded-lg border border-border px-2 py-1.5 text-[9px] font-bold text-foreground">
              Correct it
            </span>
          </div>
          <p className="mt-1 text-[9px] leading-relaxed text-muted">
            Until this is confirmed, the renewals list treats the date as unverified. Nothing is
            written over the PDF — it stays the source of truth.
          </p>
        </div>
      </div>
    </Frame>
  );
}

/**
 * How a policy finds its customer.
 *
 * Drawn as the match itself rather than as a finished record, because the
 * matching rule — the mobile number on the document against the number the
 * agent holds — is the part of the workflow a reader most often assumes
 * works some other way. The unmatched row is as important as the matched one.
 */
export function CustomerMatchShot() {
  return (
    <Frame label="Agent portal — Filing a policy">
      <div className="flex flex-col gap-2.5 p-4">
        <div className="rounded-xl border border-border bg-surface p-2.5">
          <span className="block text-[9px] font-semibold uppercase tracking-wide text-muted">
            Read from the document
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[10px] text-muted">
              Insured <strong className="font-semibold text-foreground">Kiran Rao</strong>
            </span>
            <span className="text-[10px] text-muted">
              Mobile <strong className="font-mono font-semibold text-foreground">98•••••• 21</strong>
            </span>
          </span>
        </div>

        <span aria-hidden className="mx-auto h-4 w-px bg-border" />

        <div className="rounded-xl border-2 border-[#16A34A]/45 bg-success-soft/50 p-2.5">
          <span className="flex items-center gap-1.5">
            <span className="grid size-6 place-items-center rounded-full bg-[#DCFCE7] text-[9px] font-bold text-[#15803D]">
              KR
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold text-foreground">Kiran Rao</span>
              <span className="block text-[9px] text-muted">Customer on record · 2 policies</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-1.5 py-0.5 text-[8px] font-bold text-[#15803D]">
              <Check className="size-2.5" strokeWidth={3} />
              Matched
            </span>
          </span>
        </div>

        {/* The other outcome, in the same view. A diagram that only ever shows
            the happy path is the one a reader should not trust. */}
        <div className="rounded-xl border border-dashed border-warning/50 bg-warning-soft/40 p-2.5">
          <span className="flex items-center gap-1.5">
            <span className="grid size-6 place-items-center rounded-full bg-warning-soft text-warning">
              <TriangleAlert className="size-3" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold text-foreground">No number matched</span>
              <span className="block text-[9px] leading-tight text-muted">
                The policy waits in Unassigned until an agent picks the customer.
              </span>
            </span>
          </span>
        </div>
      </div>
    </Frame>
  );
}

const HISTORY_YEARS: { year: string; insurer: string; premium: string; note: string; tone: string }[] = [
  { year: "2027", insurer: "HDFC Life · Term", premium: "₹12,450", note: "Current", tone: "border-primary bg-primary-soft" },
  { year: "2026", insurer: "HDFC Life · Term", premium: "₹12,100", note: "Renewed", tone: "border-border bg-background" },
  { year: "2025", insurer: "HDFC Life · Term", premium: "₹11,800", note: "Renewed", tone: "border-border bg-background" },
  { year: "2024", insurer: "HDFC Life · Term", premium: "₹11,800", note: "Issued", tone: "border-border bg-background" },
];

/** A customer's policy, year by year, with the original PDF on every row. */
export function PolicyHistoryShot() {
  return (
    <Frame label="Agent portal — Policy history">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-[10px] font-bold text-primary">
            RM
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold text-foreground">Rahul Mehta</span>
            <span className="block text-[9px] text-muted">Term plan · 4 years on file</span>
          </span>
          <span className="ml-auto text-[9px] text-muted">Premium trend ↑ 5.5%</span>
        </div>

        <ol className="mt-3 flex flex-col gap-1.5">
          {HISTORY_YEARS.map((h) => (
            <li
              key={h.year}
              className={cn("flex items-center gap-2.5 rounded-lg border px-2.5 py-2", h.tone)}
            >
              <strong className="w-8 shrink-0 text-[11px] tabular-nums text-foreground">{h.year}</strong>
              <span className="min-w-0 flex-1 truncate text-[10px] text-muted">{h.insurer}</span>
              <span className="shrink-0 text-[10px] font-semibold tabular-nums text-foreground">{h.premium}</span>
              <span className="hidden shrink-0 text-[9px] text-muted min-[26rem]:inline">{h.note}</span>
              <span className="inline-flex shrink-0 items-center gap-0.5 rounded bg-danger-soft px-1 py-0.5 text-[7px] font-bold text-danger">
                PDF
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-3 rounded-lg border border-border bg-surface px-2.5 py-2 text-[9px] leading-relaxed text-muted">
          History begins at the first upload. Years that were never added cannot be recovered.
        </p>
      </div>
    </Frame>
  );
}

const ROLES = ["Agent", "Sub-agent", "Customer"] as const;
const CAPABILITIES: { label: string; allow: [boolean, boolean, boolean] }[] = [
  { label: "Upload a policy", allow: [true, true, false] },
  { label: "See the whole book", allow: [true, false, false] },
  { label: "See assigned policies", allow: [true, true, false] },
  { label: "See own policies", allow: [true, true, true] },
  { label: "Export a list", allow: [true, false, false] },
];

/**
 * Who can do what, as a matrix.
 *
 * The one honest way to draw role-based access: a grid where the empty cells
 * are as visible as the filled ones. A row of padlock icons would say
 * "secure" without saying anything a reader could check.
 */
export function RoleAccessShot() {
  return (
    <Frame label="Agent portal — Access by role">
      <div className="p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="pb-2 text-left text-[9px] font-semibold uppercase tracking-wide text-muted">
                Capability
              </th>
              {ROLES.map((r) => (
                <th key={r} className="pb-2 text-center text-[9px] font-semibold text-foreground">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {CAPABILITIES.map((c) => (
              <tr key={c.label}>
                <td className="py-[7px] pr-2 text-[10px] text-muted">{c.label}</td>
                {c.allow.map((ok, i) => (
                  <td key={ROLES[i]} className="py-[7px] text-center">
                    {ok ? (
                      <span className="inline-grid size-[18px] place-items-center rounded-full bg-success-soft text-success">
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="inline-grid size-[18px] place-items-center rounded-full bg-surface text-muted/50">
                        <Minus className="size-2.5" strokeWidth={3} />
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex items-start gap-2 rounded-lg bg-surface px-2.5 py-2">
          <ShieldCheck className="mt-px size-3 shrink-0 text-success" />
          <p className="text-[9px] leading-relaxed text-muted">
            Checked on the server for every request, not hidden in the interface. A download link is
            signed and expires within minutes.
          </p>
        </div>
      </div>
    </Frame>
  );
}

const EXPORT_FIELDS: { label: string; on: boolean }[] = [
  { label: "Policy number", on: true },
  { label: "Policyholder", on: true },
  { label: "Insurer", on: true },
  { label: "Premium", on: true },
  { label: "Cover expiry", on: true },
  { label: "Vehicle / asset", on: false },
  { label: "Nominee", on: false },
];

/** Choosing what goes into a CSV, and the scope line that bounds it. */
export function ExportBuilderShot() {
  return (
    <Frame label="Agent portal — Build an export">
      <div className="grid sm:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-border p-4 sm:border-b-0 sm:border-r">
          <span className="block text-[10px] font-semibold text-foreground">Columns</span>
          <ul className="mt-2 flex flex-col gap-1">
            {EXPORT_FIELDS.map((f) => (
              <li key={f.label} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "grid size-3.5 place-items-center rounded-[3px] border",
                    f.on ? "border-primary bg-primary text-white" : "border-border bg-background",
                  )}
                >
                  {f.on && <Check className="size-2" strokeWidth={4} />}
                </span>
                <span className={cn("text-[10px]", f.on ? "text-foreground" : "text-muted")}>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <span className="block text-[10px] font-semibold text-foreground">Format</span>
          <div className="flex gap-1.5">
            <span className="flex-1 rounded-lg border-2 border-primary bg-primary-soft px-2 py-1.5 text-center text-[9px] font-bold text-primary">
              CSV
            </span>
            <span className="flex-1 rounded-lg border border-border px-2 py-1.5 text-center text-[9px] font-semibold text-muted">
              Excel
            </span>
          </div>

          <div className="mt-1 rounded-lg border border-border bg-surface p-2.5">
            <span className="flex items-baseline justify-between text-[9px]">
              <span className="text-muted">Rows</span>
              <strong className="tabular-nums text-foreground">248</strong>
            </span>
            <span className="mt-0.5 flex items-baseline justify-between text-[9px]">
              <span className="text-muted">Columns</span>
              <strong className="tabular-nums text-foreground">5</strong>
            </span>
          </div>

          <span className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-2 py-2 text-[10px] font-bold text-white">
            <Download className="size-3" />
            Download policies.csv
          </span>

          <p className="text-[9px] leading-relaxed text-muted">
            The file carries only the policies this account could already open — an export cannot
            widen access.
          </p>
        </div>
      </div>
    </Frame>
  );
}

/**
 * The insurer rule editor.
 *
 * Drawn with the test result visible, because "test it against a real
 * document before saving" is the whole of what distinguishes this from a
 * settings form — and because it makes plain that a human writes the rule.
 * Nothing here learns anything.
 */
export function TemplateRuleShot() {
  return (
    <Frame label="Admin — Insurer template rule">
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[9px] font-bold text-primary">
            Royal Sundaram
          </span>
          <span className="text-[10px] font-semibold text-foreground">Cover expiry</span>
          <span className="ml-auto text-[9px] text-muted">Rule 4 of 11</span>
        </div>

        <div className="mt-2.5 flex flex-col gap-2">
          <label className="block">
            <span className="block text-[9px] font-semibold text-muted">Field aliases on this layout</span>
            <span className="mt-1 flex flex-wrap gap-1">
              {["Period of Insurance", "Valid upto", "Expiry Date"].map((a) => (
                <span key={a} className="rounded border border-border bg-surface px-1.5 py-0.5 text-[9px] text-foreground">
                  {a}
                </span>
              ))}
            </span>
          </label>

          <label className="block">
            <span className="block text-[9px] font-semibold text-muted">Pattern</span>
            <span className="mt-1 block overflow-x-auto rounded-lg border border-border bg-[#0F172A] px-2.5 py-2 font-mono text-[9px] leading-relaxed text-[#A5F3FC]">
              to\s+(\d{"{2}"}/\d{"{2}"}/\d{"{2,4}"})
            </span>
          </label>
        </div>

        <div className="mt-2.5 rounded-lg border border-[#16A34A]/40 bg-success-soft/60 p-2.5">
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-success">
            <Check className="size-2.5" strokeWidth={3} />
            Tested against royal_car_kiran.pdf
          </span>
          <span className="mt-1 block font-mono text-[11px] font-bold text-foreground">02 Dec 2026</span>
          <span className="mt-0.5 block text-[9px] text-muted">
            Matched on page 2. Save to apply to later policies from this insurer.
          </span>
        </div>

        <p className="mt-2.5 text-[9px] leading-relaxed text-muted">
          Written by an administrator, once. Insoora does not learn a layout on its own and trains no
          model on your documents.
        </p>
      </div>
    </Frame>
  );
}

const PHONE_ROWS: { t: string; sub: string; tone: string; fg: string }[] = [
  { t: "Term · HDFC Life", sub: "Renews 10 Jan 2027", tone: "bg-[#DCFCE7]", fg: "text-[#15803D]" },
  { t: "Car · Bajaj Allianz", sub: "Renews 19 Dec 2026", tone: "bg-[#FFEDD5]", fg: "text-[#C2410C]" },
  { t: "Health · Niva Bupa", sub: "Renews 14 Jul 2027", tone: "bg-[#DBEAFE]", fg: "text-[#1D4ED8]" },
];

/**
 * The customer portal, on a phone.
 *
 * The site has no visual anywhere showing the product at phone width, and
 * "your customer opens this on their phone" is a claim the page should be
 * able to show rather than assert. Drawn as a device rather than inside the
 * browser `Frame`, so it reads as the other end of the workflow.
 */
export function CustomerMobileShot({ className }: { className?: string }) {
  return (
    <figure className={cn("flex flex-col items-center gap-3", className)}>
      <div
        aria-hidden
        className="w-[13.5rem] rounded-[26px] bg-sidebar p-2 shadow-[0_34px_60px_-26px_rgba(15,23,42,.6)]"
      >
        <div className="flex flex-col gap-2 rounded-[19px] bg-background px-3 py-3.5">
          <span className="mx-auto h-1 w-9 rounded-full bg-border" />
          <span className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-primary-soft text-[9px] font-bold text-primary">
              RM
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-bold text-foreground">My policies</span>
              <span className="block text-[8px] text-muted">Shared by your agent</span>
            </span>
          </span>

          {PHONE_ROWS.map((r) => (
            <span key={r.t} className="flex items-center gap-2 rounded-xl border border-border p-2">
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-lg", r.tone, r.fg)}>
                <FileText className="size-3" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[9px] font-semibold text-foreground">{r.t}</span>
                <span className="block truncate text-[8px] text-muted">{r.sub}</span>
              </span>
              <Download className="size-3 shrink-0 text-muted" />
            </span>
          ))}

          <span
            className="mt-0.5 rounded-xl px-2 py-2 text-center text-[9px] font-bold text-white"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Download a copy
          </span>
        </div>
      </div>
      <figcaption className="flex items-center gap-2 text-xs text-muted">
        Customer portal on a phone
        <SampleTag />
      </figcaption>
    </figure>
  );
}
