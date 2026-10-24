import { Car, CircleCheck, HeartPulse, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// "Who it's for": three cards, each with an illustrated panel beside the copy.
//
// The design puts a photograph of a person in each panel. There are none to
// publish, and a stock photo of a model standing in for "an agent" is the
// thing that makes a product site feel generic — so each panel shows that
// user's own view of the product instead: the agent's book of business, the
// agency's team, the customer's phone.
//
// The figures inside (48 clients, 6 agents, 312 policies) are sample data in a
// mocked interface, not claims about Insoora's usage — the section heading
// and the panel framing both make that plain, and no number on this page is
// presented as a statistic about the business.

const TEAM = [
  { i: "AK", bg: "bg-[#2563EB]" },
  { i: "SP", bg: "bg-[#0EA5E9]" },
  { i: "RJ", bg: "bg-[#16A34A]" },
  { i: "+3", bg: "bg-[#64748B]" },
];

const PHONE_POLICIES = [
  { icon: Car, t: "Car · Active", bg: "bg-[#E8F0FE]", fg: "text-[#2563EB]" },
  { icon: HeartPulse, t: "Health · Active", bg: "bg-[#FEE2E2]", fg: "text-[#DC2626]" },
  { icon: ShieldCheck, t: "Term · Active", bg: "bg-[#DCFCE7]", fg: "text-[#16A34A]" },
];

/** The agent's own view: a client count and the book growing year on year. */
function AgentPanel() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="grid size-[4.75rem] place-items-center rounded-full border-[3px] border-[#BFDBFE] bg-background text-[26px] font-extrabold text-[#1D4ED8] shadow-[0_14px_28px_-12px_rgba(30,64,175,.55)]">
        RM
      </span>
      <div className="flex min-w-[7.5rem] flex-col gap-1.5 rounded-xl bg-background p-3 shadow-[0_14px_28px_-16px_rgba(30,64,175,.5)]">
        <span className="text-[10px] text-muted">My clients</span>
        <strong className="text-xl leading-none text-foreground">48</strong>
        <span className="flex h-[22px] items-end gap-[3px]">
          {["40%", "60%", "50%", "80%", "100%"].map((h, i) => (
            <span
              key={i}
              className={cn("w-2 rounded-[2px]", ["bg-[#BFDBFE]", "bg-[#93C5FD]", "bg-[#93C5FD]", "bg-[#3B82F6]", "bg-[#2563EB]"][i])}
              style={{ height: h }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/** The agency's view: the team, and one shared book between them. */
function AgencyPanel() {
  return (
    <div className="flex flex-col items-center gap-3.5">
      <div className="flex">
        {TEAM.map((t) => (
          <span
            key={t.i}
            className={cn(
              "-ml-3 grid size-[50px] place-items-center rounded-full border-[3px] border-background text-[15px] font-bold text-white shadow-[0_10px_20px_-10px_rgba(15,23,42,.5)] first:ml-0",
              t.bg,
            )}
          >
            {t.i}
          </span>
        ))}
      </div>
      <div className="flex min-w-[8.75rem] flex-col gap-1.5 rounded-xl bg-background p-3 shadow-[0_14px_28px_-16px_rgba(3,105,161,.5)]">
        <span className="text-[10px] text-muted">Team · 6 agents</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
          <span className="size-[7px] rounded-full bg-[#16A34A]" />
          312 shared policies
        </span>
      </div>
    </div>
  );
}

/** The customer's view: their own policies, on their own phone. */
function CustomerPanel() {
  return (
    <div className="h-[13.125rem] w-[7.375rem] rounded-[22px] bg-sidebar p-1.5 shadow-[0_22px_40px_-18px_rgba(15,23,42,.6)] [transform:rotate(-4deg)]">
      <div className="flex h-full flex-col gap-[7px] rounded-[17px] bg-background px-2 py-3">
        <span className="mb-1 h-1 w-[30px] self-center rounded-full bg-border" />
        <strong className="text-[10px] text-foreground">My Policies</strong>
        {PHONE_POLICIES.map((p) => (
          <span key={p.t} className="flex items-center gap-1.5 rounded-[7px] bg-surface p-1.5 text-[8.5px] font-semibold text-foreground">
            <span className={cn("grid size-4 place-items-center rounded-[5px]", p.bg, p.fg)}>
              <p.icon className="size-2.5" />
            </span>
            {p.t}
          </span>
        ))}
        <span
          className="mt-auto rounded-[7px] px-1.5 py-1.5 text-center text-[8.5px] font-semibold text-white"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          Download PDF
        </span>
      </div>
    </div>
  );
}

const USERS = [
  {
    Panel: AgentPanel,
    grad: "radial-gradient(circle at 30% 20%,#DBEAFE,#EFF6FF 70%)",
    t: "Individual Insurance Agents",
    d: "Stay organized, save time and manage all your clients' policies in one place.",
    pts: ["Upload and extract PDFs", "Track renewals easily", "Serve clients better"],
  },
  {
    Panel: AgencyPanel,
    grad: "radial-gradient(circle at 30% 20%,#BAE6FD,#F0F9FF 70%)",
    t: "Agencies and Teams",
    d: "Help your team work together with organized policy records and access set by role.",
    pts: ["Sub-agent access", "Centralized customer data", "Better team productivity"],
  },
  {
    Panel: CustomerPanel,
    grad: "radial-gradient(circle at 30% 20%,#E9D5FF,#FAF5FF 70%)",
    t: "Customers",
    d: "View your assigned policies, check renewal dates and download your own documents.",
    pts: ["Access your own policies", "Stay informed on renewals", "Download documents"],
  },
];

export function AudienceCards() {
  return (
    <div className="grid gap-4 shell:grid-cols-3">
      {USERS.map((u) => (
        <div key={u.t} className="grid overflow-hidden rounded-2xl border border-border bg-background sm:grid-cols-[42%_1fr] shell:grid-cols-1">
          <div
            aria-hidden
            className="grid min-h-[16rem] place-items-center overflow-hidden p-4"
            style={{ background: u.grad }}
          >
            <u.Panel />
          </div>
          <div className="flex flex-col gap-2.5 p-5">
            <h3 className="text-base font-semibold text-foreground">{u.t}</h3>
            <p className="text-[13px] leading-relaxed text-muted">{u.d}</p>
            <ul className="mt-1 flex flex-col gap-2">
              {u.pts.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] text-foreground/80">
                  <CircleCheck className="size-4 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
