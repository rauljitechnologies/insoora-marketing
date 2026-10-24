"use client";

import { Tabs } from "radix-ui";
import {
  Calendar, ChartLine, Download, FileScan, FileText, Grid2x2, Layers, List,
  Search, Upload, User, Users, type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/brand";
import { cn } from "@/lib/utils";

// "Product in action": one app frame, six views, switched by a tab bar.
//
// Radix Tabs because the keyboard contract is easy to get wrong by hand:
// arrow keys move along the bar, Home/End jump to the ends, and only the
// active tab is in the tab order. `activationMode="manual"` so arrowing
// across does not swap the panel under a keyboard user on every keypress.
//
// Each tab carries its own colour, as in the design — six identical blue tabs
// would lose the one cue that tells you which view you are in at a glance.
//
// Every row is an invented policy. A screenshot of a signed-in screen would
// carry a real policyholder's name, policy number and premium; this does not,
// and the section's own heading says so.
//
// The invented cast is shared with the home page's mockups and with
// `product-shots.tsx` on /features, so a visitor moving between them sees one
// consistent book of business rather than three unrelated ones:
//
//   Rahul Mehta  HDFC Life term 1412769663 · Bajaj Allianz car 8812001934
//                · Niva Bupa health 5590214477
//   Priya Shah   ICICI Lombard car 2201987764
//   Amit Patel   Star Health health 3321098876
//   Neha Desai   SBI Life endowment 4412998871
//   Kiran Rao    Royal Sundaram car 7741920883
//   Sana Khan    Tata AIG travel
//
// Today, for every "days left" figure on this page, is mid-October 2026.

type Status = "Active" | "Pending" | "Due" | "Done" | "Verified";

const STATUS: Record<Status, string> = {
  Active: "bg-[#DCFCE7] text-[#15803D]",
  Verified: "bg-[#DCFCE7] text-[#15803D]",
  Done: "bg-[#DBEAFE] text-[#1D4ED8]",
  Pending: "bg-[#FFEDD5] text-[#C2410C]",
  Due: "bg-[#FEE2E2] text-[#B91C1C]",
};

/** Per-tab accent, matching the design's tab bar.
 *
 *  Every class is written out in full. Tailwind scans source text for complete
 *  class names, so a value built at runtime (`bg-[${hex}]`, or
 *  `data-[state=active]:${tone.bg}`) produces no CSS at all — the tab would
 *  simply render unstyled. These strings are the whole class, deliberately. */
const TONE = [
  { idle: "border-[#2563EB]/25 text-[#2563EB]", active: "data-[state=active]:border-[#2563EB] data-[state=active]:bg-[#2563EB]", bg: "bg-[#2563EB]" },
  { idle: "border-[#DC2626]/25 text-[#DC2626]", active: "data-[state=active]:border-[#DC2626] data-[state=active]:bg-[#DC2626]", bg: "bg-[#DC2626]" },
  { idle: "border-[#7C3AED]/25 text-[#7C3AED]", active: "data-[state=active]:border-[#7C3AED] data-[state=active]:bg-[#7C3AED]", bg: "bg-[#7C3AED]" },
  { idle: "border-[#EA580C]/25 text-[#EA580C]", active: "data-[state=active]:border-[#EA580C] data-[state=active]:bg-[#EA580C]", bg: "bg-[#EA580C]" },
  { idle: "border-[#0891B2]/25 text-[#0891B2]", active: "data-[state=active]:border-[#0891B2] data-[state=active]:bg-[#0891B2]", bg: "bg-[#0891B2]" },
  { idle: "border-[#16A34A]/25 text-[#16A34A]", active: "data-[state=active]:border-[#16A34A] data-[state=active]:bg-[#16A34A]", bg: "bg-[#16A34A]" },
];

interface Panel {
  id: string;
  label: string;
  icon: LucideIcon;
  nav: number;
  title: string;
  action: string;
  actionIcon: LucideIcon;
  search: string;
  cols: string[];
  rows: { cells: string[]; status: Status }[];
}

const PANELS: Panel[] = [
  {
    id: "policies", label: "Policy List", icon: List, nav: 2,
    title: "All Policies", action: "Upload PDF", actionIcon: Upload,
    search: "Search by policy number, customer or insurer…",
    cols: ["Policy Number", "Policyholder", "Insurer", "Policy Type", "Premium", "Renewal Date"],
    rows: [
      { cells: ["1412769663", "Rahul Mehta", "HDFC Life", "Term Insurance", "₹12,450", "10 Jan 2027"], status: "Active" },
      { cells: ["2201987764", "Priya Shah", "ICICI Lombard", "Car Insurance", "₹8,200", "22 Feb 2027"], status: "Active" },
      { cells: ["3321098876", "Amit Patel", "Star Health", "Health Insurance", "₹18,500", "05 Mar 2027"], status: "Active" },
      { cells: ["4412998871", "Neha Desai", "SBI Life", "Endowment", "₹15,000", "18 Apr 2027"], status: "Pending" },
    ],
  },
  {
    id: "extracted", label: "Extracted Details", icon: FileScan, nav: 1,
    title: "Extracted Details · HDFC Life", action: "Save Record", actionIcon: FileText,
    search: "Search extracted fields…",
    // "Confidence" is the product's own notion — a field it is unsure about is
    // flagged rather than saved silently, which is what the Pending row is.
    cols: ["Field", "Extracted value", "Source page", "Confidence"],
    rows: [
      { cells: ["Policy Number", "1412769663", "Page 1", "High"], status: "Verified" },
      { cells: ["Policyholder", "Rahul Mehta", "Page 1", "High"], status: "Verified" },
      { cells: ["Premium", "₹12,450 / year", "Page 2", "High"], status: "Verified" },
      { cells: ["Expiry Date", "10 Jan 2027", "Page 2", "Medium"], status: "Pending" },
    ],
  },
  {
    id: "customer", label: "Customer View", icon: User, nav: 3,
    title: "Rahul Mehta · 3 policies", action: "Share Access", actionIcon: Users,
    search: "Search this customer's policies…",
    cols: ["Policy", "Insurer", "Type", "Premium", "Renewal Date"],
    rows: [
      { cells: ["1412769663", "HDFC Life", "Term Insurance", "₹12,450", "10 Jan 2027"], status: "Active" },
      { cells: ["8812001934", "Bajaj Allianz", "Car Insurance", "₹7,900", "19 Dec 2026"], status: "Due" },
      { cells: ["5590214477", "Niva Bupa", "Health Insurance", "₹21,300", "14 Jul 2027"], status: "Active" },
    ],
  },
  {
    id: "renewals", label: "Renewal Tracking", icon: Calendar, nav: 4,
    title: "Renewals · next 90 days", action: "Export List", actionIcon: Download,
    search: "Filter by month or customer…",
    cols: ["Policyholder", "Insurer", "Policy Type", "Premium", "Renewal Date", "Days left"],
    rows: [
      { cells: ["Kiran Rao", "Royal Sundaram", "Car Insurance", "₹6,750", "02 Dec 2026", "49"], status: "Due" },
      { cells: ["Rahul Mehta", "Bajaj Allianz", "Car Insurance", "₹7,900", "19 Dec 2026", "66"], status: "Due" },
      { cells: ["Rahul Mehta", "HDFC Life", "Term Insurance", "₹12,450", "10 Jan 2027", "88"], status: "Active" },
      { cells: ["Sana Khan", "Tata AIG", "Travel", "₹3,100", "11 Jan 2027", "89"], status: "Active" },
    ],
  },
  {
    id: "bulk", label: "Bulk Upload", icon: Layers, nav: 1,
    title: "Bulk Upload · 4 files", action: "Add Files", actionIcon: Upload,
    search: "Search uploaded files…",
    cols: ["File name", "Size", "Insurer detected", "Fields found"],
    rows: [
      { cells: ["hdfc_term_rahul.pdf", "1.2 MB", "HDFC Life", "14 / 14"], status: "Done" },
      { cells: ["icici_car_priya.pdf", "860 KB", "ICICI Lombard", "12 / 13"], status: "Done" },
      { cells: ["star_health_amit.pdf", "2.4 MB", "Star Health", "11 / 14"], status: "Pending" },
      { cells: ["sbi_endow_neha.pdf", "1.8 MB", "Reading…", "—"], status: "Pending" },
    ],
  },
  {
    id: "export", label: "Export Data", icon: Download, nav: 5,
    title: "Export Records", action: "Download CSV", actionIcon: Download,
    search: "Choose fields to export…",
    cols: ["Export", "Format", "Records", "Created"],
    rows: [
      { cells: ["All active policies", "CSV", "248", "Today, 10:42"], status: "Done" },
      { cells: ["Renewals Q1 2027", "Excel", "37", "12 Oct 2026"], status: "Done" },
      { cells: ["Customer list", "CSV", "112", "01 Oct 2026"], status: "Done" },
    ],
  },
];

const APP_NAV: { t: string; icon: LucideIcon }[] = [
  { t: "Dashboard", icon: Grid2x2 },
  { t: "Upload PDF", icon: Upload },
  { t: "Policies", icon: FileText },
  { t: "Customers", icon: Users },
  { t: "Renewals", icon: Calendar },
  { t: "Reports", icon: ChartLine },
];

export function ProductTabs() {
  return (
    <Tabs.Root defaultValue={PANELS[0].id} activationMode="manual" className="flex flex-col gap-7">
      <Tabs.List aria-label="Views inside Insoora" className="flex gap-2 overflow-x-auto pb-1">
        {PANELS.map((p, i) => (
          <Tabs.Trigger
            key={p.id}
            value={p.id}
            className={cn(
              "flex flex-none items-center gap-1.5 rounded-md border bg-background px-3.5 py-2.5 text-[13px] font-semibold transition-colors",
              TONE[i].idle,
              "data-[state=active]:text-white",
              TONE[i].active,
            )}
          >
            <p.icon className="size-4" />
            {p.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {PANELS.map((p, i) => (
        <Tabs.Content key={p.id} value={p.id}>
          <div className="grid overflow-hidden rounded-2xl border border-border bg-background shadow-[0_30px_60px_-40px_rgba(30,64,175,.5)] shell:grid-cols-[210px_minmax(0,1fr)]">
            <aside aria-hidden className="hidden flex-col gap-1 border-r border-border bg-[#FBFDFF] p-5 shell:flex">
              <span className="mb-3 flex items-center gap-2 text-[15px] font-extrabold uppercase tracking-[0.05em] text-foreground">
                <BrandMark className="size-7" />
                Insoora
              </span>
              {APP_NAV.map((n, k) => (
                <span
                  key={n.t}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-[13px] font-medium",
                    k === p.nav ? "bg-primary-soft text-primary" : "text-foreground/70",
                  )}
                >
                  <n.icon className="size-4" />
                  {n.t}
                </span>
              ))}
            </aside>

            <div className="flex min-w-0 flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <strong className="text-lg text-foreground">{p.title}</strong>
                <span
                  aria-hidden
                  className={cn(
                    "flex items-center gap-1.5 rounded-[9px] px-3 py-2 text-[13px] font-semibold text-white",
                    TONE[i].bg,
                  )}
                >
                  <p.actionIcon className="size-3.5" />
                  {p.action}
                </span>
              </div>
              <div aria-hidden className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-[13px] text-muted">
                <Search className="size-3.5" />
                {p.search}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[39rem] border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-surface text-left text-muted">
                      {p.cols.map((c) => (
                        <th key={c} className="whitespace-nowrap px-2 py-2.5 text-[12px] font-semibold">{c}</th>
                      ))}
                      <th className="whitespace-nowrap px-2 py-2.5 text-[12px] font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.rows.map((r) => (
                      <tr key={r.cells[0]} className="border-t border-border/60">
                        {r.cells.map((c) => (
                          <td key={c} className="whitespace-nowrap px-2 py-3 text-foreground/80">{c}</td>
                        ))}
                        <td className="px-2 py-3">
                          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", STATUS[r.status])}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
