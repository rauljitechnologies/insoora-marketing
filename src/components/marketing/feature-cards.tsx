import {
  Calendar, Download, FileScan, History, Layers, Lock, Search, Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// The eight feature cards.
//
// Each one carries a small mock of the thing it describes above the words,
// on its own gradient. That is what stops eight cards from reading as one
// repeated template: the illustration differs per card because the feature
// does, and a reader scanning the grid can tell them apart without reading.
//
// Every value inside a mock is invented sample data. None of it is presented
// as a measurement of the product — there is no accuracy figure anywhere,
// because none is published.

interface Feature {
  icon: LucideIcon;
  t: string;
  d: string;
  /** The mock's header: a title and a short state. */
  vt: string;
  vb: string;
  rows: { k: string; v: string; dot: string }[];
  grad: string;
  tile: string;
  /** Shown when a capability is limited to one role. */
  status?: string;
}

const G = "bg-[#16A34A]", B = "bg-[#2563EB]", O = "bg-[#EA580C]", P = "bg-[#7C3AED]";

const FEATURES: Feature[] = [
  {
    icon: FileScan, t: "Automated data extraction",
    d: "Extract key details like policy number, policyholder, premium, dates and more.",
    vt: "HDFC_Term.pdf", vb: "Reading",
    rows: [{ k: "Policy No.", v: "1412769663", dot: G }, { k: "Premium", v: "₹12,450", dot: G }, { k: "Expiry", v: "10 Jan 27", dot: B }],
    grad: "from-[#FECACA] to-[#FFF1F2]", tile: "bg-[#FEE2E2] text-[#DC2626]",
  },
  {
    icon: Layers, t: "Bulk PDF upload",
    d: "Upload multiple policy PDFs and process them together to save time.",
    vt: "Bulk upload", vb: "4 files",
    rows: [{ k: "hdfc_term.pdf", v: "Done", dot: G }, { k: "icici_car.pdf", v: "Done", dot: G }, { k: "star_health.pdf", v: "72%", dot: O }],
    grad: "from-[#BAE6FD] to-[#F0F9FF]", tile: "bg-[#E0F2FE] text-[#0369A1]",
  },
  {
    icon: Search, t: "Advanced search & filters",
    d: "Search by customer, insurer, policy type, date and more.",
    vt: 'Search: "Mehta"', vb: "3 found",
    rows: [{ k: "Insurer", v: "HDFC Life", dot: B }, { k: "Type", v: "Term", dot: B }, { k: "Year", v: "2024", dot: B }],
    grad: "from-[#DDD6FE] to-[#F5F3FF]", tile: "bg-[#EDE9FE] text-[#7C3AED]",
  },
  {
    icon: Users, t: "Customer-wise organization",
    d: "Keep all policies organized against each customer.",
    vt: "Rahul Mehta", vb: "3 policies",
    rows: [{ k: "Term", v: "HDFC Life", dot: G }, { k: "Car", v: "Bajaj", dot: O }, { k: "Health", v: "Niva Bupa", dot: G }],
    grad: "from-[#BFDBFE] to-[#EFF6FF]", tile: "bg-[#DBEAFE] text-[#2563EB]",
  },
  {
    icon: History, t: "Historical policy access",
    d: "View and manage past policies anytime, with the original document attached.",
    vt: "Policy history", vb: "2019–26",
    rows: [{ k: "2026", v: "Renewed", dot: G }, { k: "2023", v: "Renewed", dot: G }, { k: "2019", v: "Issued", dot: B }],
    grad: "from-[#FBCFE8] to-[#FDF2F8]", tile: "bg-[#FCE7F3] text-[#DB2777]",
  },
  {
    icon: Calendar, t: "Expiry and renewal tracking",
    d: "Get a clear view of upcoming renewals, taken from the date on the policy itself.",
    vt: "Renewals", vb: "Next 30d",
    rows: [{ k: "Car · Kiran", v: "02 Dec", dot: O }, { k: "Term · Rahul", v: "10 Jan", dot: B }, { k: "Travel · Sana", v: "11 Jan", dot: B }],
    grad: "from-[#FED7AA] to-[#FFF7ED]", tile: "bg-[#FFEDD5] text-[#EA580C]",
  },
  {
    icon: Lock, t: "Secure document access",
    d: "Your documents stay private, reachable only by the people their role allows.",
    vt: "Access", vb: "Private",
    rows: [{ k: "Agent", v: "Full", dot: G }, { k: "Sub-agent", v: "Assigned", dot: B }, { k: "Customer", v: "Own only", dot: P }],
    grad: "from-[#BBF7D0] to-[#F0FDF4]", tile: "bg-[#DCFCE7] text-[#16A34A]",
  },
  {
    icon: Download, t: "Export to CSV / Excel",
    d: "Export policy records for reporting or backup, never wider than your own access.",
    vt: "policies.csv", vb: "Ready",
    rows: [{ k: "Rows", v: "248", dot: G }, { k: "Columns", v: "18", dot: G }, { k: "Format", v: "CSV / XLSX", dot: G }],
    grad: "from-[#99F6E4] to-[#F0FDFA]", tile: "bg-[#CCFBF1] text-[#0F766E]",
    status: "Agents only",
  },
];

export function FeatureCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 shell:grid-cols-3 rail:grid-cols-4">
      {FEATURES.map((f) => (
        <div
          key={f.t}
          className="card-hover flex flex-col overflow-hidden rounded-2xl border border-border bg-background hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-card-hover"
        >
          <div
            aria-hidden
            className={cn(
              "relative grid h-[9.375rem] place-items-center overflow-hidden bg-gradient-to-br p-4",
              f.grad,
            )}
          >
            <span className="absolute -right-[70px] -top-[70px] size-[11.25rem] rounded-full border border-white/70" />
            <div className="flex w-full max-w-[13.125rem] flex-col gap-1.5 rounded-xl bg-background p-2.5 shadow-[0_14px_28px_-16px_rgba(15,23,42,.35)]">
              <span className="flex items-center justify-between gap-1.5 text-[10px] font-bold text-foreground/80">
                {f.vt}
                <span className={cn("rounded-full px-1.5 py-0.5 font-semibold", f.tile)}>{f.vb}</span>
              </span>
              {f.rows.map((r) => (
                <span key={r.k} className="flex items-center gap-1.5 rounded-[7px] bg-surface px-1.5 py-1 text-[10px]">
                  <span className={cn("size-1.5 rounded-full", r.dot)} />
                  <span className="flex-1 truncate text-foreground/70">{r.k}</span>
                  <strong className="text-foreground">{r.v}</strong>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <span className="flex items-center gap-2.5">
              <span aria-hidden className={cn("grid size-[34px] flex-none place-items-center rounded-md", f.tile)}>
                <f.icon className="size-4.5" />
              </span>
              <h3 className="text-[15px] font-semibold text-foreground">{f.t}</h3>
            </span>
            <p className="text-sm leading-relaxed text-muted">{f.d}</p>
            {f.status && (
              <span className="mt-0.5 self-start rounded-full bg-secondary-soft px-2 py-0.5 text-[11px] font-semibold text-secondary">
                {f.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
