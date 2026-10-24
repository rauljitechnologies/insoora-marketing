import { Car, HeartPulse, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { cn } from "@/lib/utils";

// The hero's product visual: a policy PDF open in the app, with the record the
// product made of it floating beside it, and the renewals it feeds below.
//
// Built from markup rather than an exported image. A screenshot of a signed-in
// screen would carry a real policyholder's name, policy number and premium,
// which is not something to publish; markup stays sharp on every display,
// re-themes with the tokens, costs no image request and shifts no layout.
//
// The policy is invented. Two cards float on a slow 7s cycle, offset so they
// never rise together — the global reduced-motion rule stops both.
//
// ── Composition ──
// The three pieces are placed so that nothing important is ever covered. They
// used to sit on a loose diagonal, and the renewals card landed squarely on
// the bottom two rows of the extracted card — hiding the flagged expiry row,
// which is the one row on this whole visual that says something the rest of
// the page does not. The document now holds the left, and the two cards stack
// against a shared right edge: they read as a column rather than three things
// dropped on the canvas, and their vertical ranges can no longer meet.
//
// One honest change from the design: the design's card is badged "Verified"
// with seven clean fields. The product flags a field it could not read
// confidently rather than guessing, so the expiry row here carries that state.
// A hero showing only green fields would contradict what the rest of the page
// says about how extraction behaves.

const EXTRACTED: { k: string; v: string; flagged?: boolean }[] = [
  { k: "Policy Number", v: "1412769663" },
  { k: "Insurer", v: "HDFC Life" },
  { k: "Policyholder", v: "Rahul Mehta" },
  { k: "Product", v: "Click 2 Protect" },
  { k: "Premium", v: "₹12,450 / year" },
  { k: "Start Date", v: "10 Jan 2024" },
  { k: "Expiry Date", v: "10 Jan 2027", flagged: true },
];

const RENEWALS: { icon: typeof Car; t: string; n: string; d: string; bg: string; fg: string }[] = [
  { icon: Car, t: "Car Insurance", n: "5 policies", d: "Jan 2027", bg: "bg-[#E8F0FE]", fg: "text-[#2563EB]" },
  { icon: HeartPulse, t: "Health Insurance", n: "3 policies", d: "Feb 2027", bg: "bg-[#FEE2E2]", fg: "text-[#DC2626]" },
  { icon: ShieldCheck, t: "Term Insurance", n: "2 policies", d: "Mar 2027", bg: "bg-[#DCFCE7]", fg: "text-[#16A34A]" },
];

const SIDE = ["Dashboard", "Upload PDF", "Policies", "Customers", "Renewals", "Reports"];
const DOC_LINES = ["92%", "76%", "88%", "60%", "84%", "70%", "90%", "52%"];

export function ExtractionPreview() {
  return (
    <div aria-hidden className="pv-rise relative min-h-[26rem] [--delay:150ms] sm:min-h-[27.5rem]">
      {/* ── The document, in the app, on a device ── */}
      <div className="absolute left-0 top-6 h-[21rem] w-[58%] rounded-[22px] bg-sidebar p-2.5 shadow-[0_40px_70px_-30px_rgba(15,23,42,.55)]">
        <div className="grid h-full grid-cols-[34%_1fr] overflow-hidden rounded-[14px] bg-background">
          <div className="flex flex-col gap-2 border-r border-border bg-surface p-2.5">
            <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-foreground">
              <BrandMark className="size-[18px]" />
              Insoora
            </span>
            {SIDE.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "truncate rounded-md px-1.5 py-1 text-[10px]",
                  i === 2 ? "bg-primary-soft font-semibold text-primary" : "text-muted",
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 p-4">
            <span className="self-start border-2 border-danger px-1.5 py-0.5 text-[12px] font-extrabold leading-none text-danger">
              HDFC
              <br />
              Life
            </span>
            <strong className="text-[11px] text-foreground">Life Insurance Policy</strong>
            {DOC_LINES.map((w, i) => (
              <span key={i} className="block h-[5px] rounded-[3px] bg-border" style={{ width: w }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── What was read out of it ── */}
      <div className="pv-float absolute right-0 top-0 flex w-[min(20rem,54%)] flex-col gap-1.5 rounded-2xl border border-border bg-background p-3.5 shadow-[0_30px_60px_-28px_rgba(30,64,175,.45)]">
        <div className="mb-1 flex items-center justify-between gap-2">
          <strong className="text-[13px] text-foreground">Extracted Policy Details</strong>
          <span className="rounded-full bg-success-soft px-2 py-[3px] text-[10px] font-semibold text-success">
            Read
          </span>
        </div>
        {EXTRACTED.map((x) => (
          <div
            key={x.k}
            className={cn(
              "flex justify-between gap-2 rounded-lg px-2 py-1.5 text-[11px]",
              x.flagged ? "bg-warning-soft" : "bg-surface",
            )}
          >
            <span className="text-muted">{x.k}</span>
            <span className={cn("text-right font-semibold", x.flagged ? "text-warning" : "text-foreground")}>
              {x.v}
              {x.flagged && <span className="ml-1.5 text-[9px] font-medium">· check</span>}
            </span>
          </div>
        ))}
      </div>

      {/* ── And what it feeds ── */}
      <div className="pv-float absolute bottom-0 right-0 flex w-[min(20rem,54%)] flex-col gap-2 rounded-2xl border border-border bg-background p-3.5 shadow-[0_30px_60px_-28px_rgba(30,64,175,.45)] [--delay:1200ms]">
        <strong className="text-[13px] text-foreground">Upcoming Renewals</strong>
        {RENEWALS.map((r) => (
          <div key={r.t} className="flex items-center gap-2 text-[11px]">
            <span className={cn("grid size-6 shrink-0 place-items-center rounded-[7px]", r.bg, r.fg)}>
              <r.icon className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1 truncate font-semibold text-foreground">{r.t}</span>
            <span className="shrink-0 text-muted">{r.n}</span>
            <span className="shrink-0 font-semibold text-accent-orange">{r.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
