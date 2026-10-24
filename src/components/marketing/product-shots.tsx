import { Download, FileText, Search, ShieldCheck } from "lucide-react";
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
