import { Calendar, Eye, File, Grid2x2, Lock, Search, User, Users } from "lucide-react";
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
