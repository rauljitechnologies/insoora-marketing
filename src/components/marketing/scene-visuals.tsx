import { ArrowRight, Calendar, Eye, File, FolderOpen, Grid2x2, Lock, Search, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Two illustrated scenes from the design file: the mess an agent works in
// today, and the access model that replaces it.
//
// Both are drawn in markup rather than placed as images. The design shows
// photographs of people in these slots; there are none to publish and none
// will be invented, so each scene shows the work instead of the worker — which
// is also the thing a visitor actually needs to recognise.
//
// Everything here is `aria-hidden`: the copy beside each scene carries the
// meaning, and a screen reader has no use for a rotated PDF thumbnail.

const MESSY: { x: string; y: string; r: string; t: string; f: string }[] = [
  { x: "6%", y: "10%", r: "-9deg", t: "Term_Rahul.pdf", f: "Downloads" },
  { x: "24%", y: "22%", r: "5deg", t: "Health_policy_scan.pdf", f: "WhatsApp" },
  { x: "14%", y: "40%", r: "-3deg", t: "Car_ins_2025(1).pdf", f: "Desktop/old" },
];

/** The spreadsheet rows, with the inconsistencies that make the point: a
 *  missing date, a date already past, and three different date formats. */
const SHEET: { n: string; d: string; cls: string }[] = [
  { n: "Rahul Mehta", d: "10/01/27", cls: "text-foreground/80" },
  { n: "Priya S.", d: "??", cls: "bg-warning-soft font-semibold text-warning" },
  { n: "Amit Patel", d: "Expired", cls: "bg-danger-soft font-semibold text-danger" },
  { n: "Neha D", d: "18-4-27", cls: "text-foreground/80" },
];

export function MessyScene() {
  return (
    <div
      aria-hidden
      className="relative h-[21rem] overflow-hidden rounded-3xl border border-border shell:h-[27rem]"
      style={{
        background:
          "radial-gradient(420px 300px at 70% 30%,#FEE2E2,transparent 70%),radial-gradient(400px 300px at 20% 90%,#DBEAFE,transparent 70%),var(--surface)",
      }}
    >
      {MESSY.map((p) => (
        <div
          key={p.t}
          className="absolute flex h-[11.5rem] w-[9.25rem] flex-col gap-[7px] rounded-xl border border-border bg-background p-3.5 shadow-[0_18px_30px_-18px_rgba(15,23,42,.35)]"
          style={{ left: p.x, top: p.y, transform: `rotate(${p.r})` }}
        >
          <span className="self-start rounded-[5px] bg-danger px-1.5 py-[3px] text-[10px] font-bold text-white">PDF</span>
          <strong className="text-[11px] text-foreground/80">{p.t}</strong>
          {["90%", "70%", "82%", "60%"].map((w, i) => (
            <span key={i} className="block h-[5px] rounded-[3px] bg-border" style={{ width: w }} />
          ))}
          <span className="mt-auto text-[10px] text-muted">{p.f}</span>
        </div>
      ))}

      {/* The spreadsheet the renewals really live in. */}
      <div className="absolute right-[6%] top-[9%] w-[min(15.6rem,52%)] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_40px_-22px_rgba(15,23,42,.4)] [transform:rotate(2deg)]">
        <div className="flex items-center gap-1.5 border-b border-border bg-success-soft px-2.5 py-2 text-[11px] font-semibold text-success">
          <Grid2x2 className="size-3.5" />
          renewals_final_v3.xlsx
        </div>
        {SHEET.map((r) => (
          <div key={r.n} className="grid grid-cols-[1.3fr_1fr] border-b border-border/60 text-[11px] last:border-b-0">
            <span className="border-r border-border/60 px-2.5 py-[7px] text-foreground/80">{r.n}</span>
            <span className={cn("px-2.5 py-[7px]", r.cls)}>{r.d}</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[8%] left-[8%] flex items-center gap-2.5 rounded-xl border border-danger/30 bg-background px-3.5 py-2.5 shadow-[0_16px_30px_-16px_rgba(220,38,38,.45)]">
        <span className="grid size-[30px] place-items-center rounded-[9px] bg-danger-soft text-danger">
          <Calendar className="size-4" />
        </span>
        <span className="flex flex-col">
          <strong className="text-[12px] text-foreground">Renewal missed</strong>
          <span className="text-[11px] text-muted">Car policy expired 3 days ago</span>
        </span>
      </div>

      <div className="absolute right-[4%] top-[52%] flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-[12px] text-muted shadow-[0_16px_30px_-16px_rgba(15,23,42,.35)]">
        <Search className="size-3.5 text-muted/70" />
        &ldquo;Priya Shah policy&rdquo;
        <span className="font-semibold text-danger">0 results</span>
      </div>
    </div>
  );
}

/** Who can reach a document, as a diagram: the file at the centre, the four
 *  kinds of principal around it, and what each one is limited to. */
const NODES: { x: string; y: string; icon: typeof User; t: string; s: string; bg: string; fg: string }[] = [
  { x: "6%", y: "12%", icon: User, t: "Agent", s: "Full access", bg: "bg-[#E8F0FE]", fg: "text-[#2563EB]" },
  { x: "58%", y: "10%", icon: Users, t: "Sub-agent", s: "Assigned only", bg: "bg-[#E0F2FE]", fg: "text-[#0369A1]" },
  { x: "4%", y: "66%", icon: Eye, t: "Customer", s: "Own policies", bg: "bg-[#F3E8FF]", fg: "text-[#7C3AED]" },
  { x: "60%", y: "64%", icon: File, t: "Private storage", s: "Not public", bg: "bg-[#DCFCE7]", fg: "text-[#16A34A]" },
];

export function AccessScene() {
  return (
    <div
      aria-hidden
      className="relative grid min-h-[23.75rem] place-items-center overflow-hidden rounded-2xl"
      style={{
        background: "radial-gradient(360px 260px at 50% 45%,#3B82F6,transparent 70%),#0F1F4D",
      }}
    >
      <span className="absolute size-80 rounded-full border border-dashed border-[#BFDBFE]/35" />
      <span className="absolute size-56 rounded-full border border-[#BFDBFE]/25" />
      <div className="pv-float grid h-[7.875rem] w-[6.875rem] place-items-center rounded-[26px_26px_54px_54px] bg-gradient-to-b from-[#60A5FA] to-[#1D4ED8] text-white shadow-[0_0_0_10px_rgba(96,165,250,.15),0_30px_50px_-16px_rgba(0,0,0,.6)]">
        <Lock className="size-12" />
      </div>
      {NODES.map((n) => (
        <div
          key={n.t}
          className="absolute flex items-center gap-2 rounded-xl bg-background px-3 py-2 shadow-[0_16px_30px_-14px_rgba(0,0,0,.55)]"
          style={{ left: n.x, top: n.y }}
        >
          <span className={cn("grid size-[26px] place-items-center rounded-lg", n.bg, n.fg)}>
            <n.icon className="size-3.5" />
          </span>
          <span className="flex flex-col">
            <strong className="text-[11px] text-foreground">{n.t}</strong>
            <span className="text-[10px] text-muted">{n.s}</span>
          </span>
        </div>
      ))}
      <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-[#DBEAFE]">
        <span className="size-[7px] rounded-full bg-[#4ADE80]" />
        HTTPS · Encrypted in transit
      </span>
    </div>
  );
}

// ── Two more scenes, for /about-us ───────────────────────────────────────
//
// Both are drawn here rather than reusing the pair above. `MessyScene` and
// `AccessScene` are the home page's, and putting the same illustration at
// the top of the About page is the thing that makes a site read as one
// template with the words swapped. These two make the About page's own two
// arguments — what the manual path costs, and what replaces it — and they
// are shaped to answer each other.

const MANUAL_CHAIN: { icon: typeof File; t: string; s: string }[] = [
  { icon: File, t: "A PDF arrives", s: "Email, WhatsApp, or on paper" },
  { icon: Eye, t: "Open and read it", s: "Find the eight fields that matter" },
  { icon: Grid2x2, t: "Type it into a sheet", s: "Policy number, dates, premium" },
  { icon: FolderOpen, t: "File the document", s: "Somewhere findable, in theory" },
  { icon: Calendar, t: "Remember the renewal", s: "For the next eleven months" },
];

/**
 * The manual path, as a chain — and the link that breaks.
 *
 * Deliberately the same SHAPE as the seven-step rail on /how-it-works, so
 * the two pages argue with each other: a chain of five hand-worked links
 * ending in a break, against a connected run of seven that does not. That
 * contrast is the About page's whole case, and making it visually rather
 * than in a paragraph is the difference between showing and asserting.
 *
 * Nothing here is a statistic. There is no "agents lose N hours a week"
 * figure anywhere on this site, because none has been measured.
 */
export function ManualChainScene() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-3xl border border-border p-5 sm:p-7"
      style={{
        background:
          "radial-gradient(420px 260px at 85% 0%,#FEE2E2,transparent 70%),radial-gradient(360px 240px at 0% 100%,#FFEDD5,transparent 70%),var(--surface)",
      }}
    >
      <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#B91C1C]">
        <span className="size-1.5 rounded-full bg-[#DC2626]" />
        Every policy, by hand
      </span>

      <ol className="mt-4 flex flex-col gap-2">
        {MANUAL_CHAIN.map((m, i) => (
          <li key={m.t} className="relative flex items-center gap-3">
            {/* The connector between links. Hidden on the last, where the
                chain is supposed to end — and does not. */}
            {i < MANUAL_CHAIN.length - 1 && (
              <span className="absolute left-[1.0625rem] top-[2.25rem] h-2 w-px bg-border" />
            )}
            <span className="grid size-[2.125rem] flex-none place-items-center rounded-xl border border-border bg-background text-muted shadow-[0_8px_16px_-10px_rgba(15,23,42,.4)]">
              <m.icon className="size-4" />
            </span>
            <span className="flex min-w-0 flex-col">
              <strong className="text-[13px] leading-tight text-foreground">{m.t}</strong>
              <span className="text-[11px] leading-tight text-muted">{m.s}</span>
            </span>
          </li>
        ))}
      </ol>

      {/* The break. The point of the whole illustration. */}
      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-danger/35 bg-background px-3.5 py-3 shadow-[0_14px_28px_-16px_rgba(220,38,38,.4)]">
        <span className="grid size-7 flex-none place-items-center rounded-lg bg-danger-soft text-danger">
          <Calendar className="size-3.5" />
        </span>
        <span className="flex flex-col">
          <strong className="text-[12px] leading-tight text-foreground">
            One link fails and the customer finds out
          </strong>
          <span className="text-[11px] leading-snug text-muted">
            A typo in a date, a PDF in the wrong folder, a renewal nobody remembered.
          </span>
        </span>
      </div>
    </div>
  );
}

const ORDERED_FIELDS = [
  { k: "Policy number", v: "1412769663" },
  { k: "Insurer", v: "HDFC Life" },
  { k: "Expiry", v: "10 Jan 2027" },
];

/**
 * The transformation, in one frame: a loose pile of documents on the left,
 * one organized record on the right, the brand ramp running between them.
 *
 * This is the About page's hero visual, and it is the only place on the
 * site that states the product's whole proposition as a picture. Kept
 * deliberately simple — three documents and one record — because a busy
 * illustration at the top of a page is read as decoration and skipped.
 */
export function OrderScene() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-3xl border border-[#E6EEFB] p-5 sm:p-7"
      style={{
        background:
          "radial-gradient(420px 280px at 15% 10%,#EDE9FE,transparent 70%),radial-gradient(420px 280px at 95% 95%,#DBEAFE,transparent 70%),#FBFCFF",
      }}
    >
      <div className="flex items-center gap-3 sm:gap-5">
        {/* The pile. Three cards fanned, the front one legible. */}
        <div className="relative h-[9.5rem] flex-1">
          {[
            { r: "-8deg", x: "0", y: "10px", z: "z-0", o: "opacity-60" },
            { r: "4deg", x: "10px", y: "5px", z: "z-10", o: "opacity-80" },
            { r: "-2deg", x: "20px", y: "0", z: "z-20", o: "" },
          ].map((c, i) => (
            <div
              key={i}
              className={cn(
                "absolute flex h-[8.75rem] w-[6.25rem] flex-col gap-1.5 rounded-xl border border-border bg-background p-2.5 shadow-[0_18px_30px_-20px_rgba(15,23,42,.45)]",
                c.z,
                c.o,
              )}
              style={{ transform: `translate(${c.x}, ${c.y}) rotate(${c.r})` }}
            >
              <span className="self-start rounded bg-danger px-1.5 py-px text-[9px] font-bold text-white">PDF</span>
              {["88%", "64%", "78%", "52%", "70%"].map((w, k) => (
                <span key={k} className="block h-[4px] rounded-full bg-border" style={{ width: w }} />
              ))}
            </div>
          ))}
        </div>

        {/* The ramp. The brand gradient, doing the one job it is for. */}
        <span
          className="grid size-9 flex-none place-items-center rounded-full text-white shadow-[0_12px_24px_-10px_rgba(124,58,237,.8)]"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          <ArrowRight className="size-4" />
        </span>

        {/* The record. */}
        <div className="flex-1 rounded-2xl border border-border bg-background p-3 shadow-[0_24px_44px_-24px_rgba(37,99,235,.45)]">
          <span className="flex items-center justify-between gap-2">
            <strong className="text-[11px] text-foreground">Rahul Mehta</strong>
            <span className="rounded-full bg-success-soft px-1.5 py-px text-[9px] font-semibold text-success">
              Filed
            </span>
          </span>
          <span className="mt-2 flex flex-col gap-1">
            {ORDERED_FIELDS.map((f) => (
              <span key={f.k} className="flex justify-between gap-2 rounded-md bg-surface px-1.5 py-1 text-[9.5px]">
                <span className="text-muted">{f.k}</span>
                <strong className="text-foreground">{f.v}</strong>
              </span>
            ))}
          </span>
          <span className="mt-2 flex items-center gap-1 text-[9px] text-muted">
            <File className="size-2.5" />
            Original PDF kept
          </span>
        </div>
      </div>

      <p className="mt-5 text-center text-[12px] font-medium text-muted">
        Scattered documents in. One searchable record out — with the document still attached.
      </p>
    </div>
  );
}
