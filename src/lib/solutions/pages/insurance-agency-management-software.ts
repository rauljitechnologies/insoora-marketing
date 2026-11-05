import type { SolutionPage } from "../types";

// The agency page: several people, one book of business.
//
// ── The distinction this page has to hold ────────────────────────────────
//
// There is no AGENCY role in the product. An AGENT account IS the agency —
// it holds the plan, the policy credits and every policy — and a SUB_AGENT is
// an employee of exactly one agent. A page that implied a fourth portal for
// agencies would be describing software that does not exist, so this page
// says what the structure really is in its first section.
//
// It is also the page that has to stay distinct from three neighbours:
// /insurance-agent-management-software (the same product for one person with
// no team), /agency-management-portal (the same structure shown screen by
// screen) and /insurance-crm-software (the same records organised by
// customer). Each of those is linked from here with the reason to go.

export const page: SolutionPage = {
  slug: "insurance-agency-management-software",
  group: "solution",
  metaTitle: "Insurance Agency Management Software for Teams in India",
  description:
    "Agency management software for insurance teams: one shared book of business, sub-agents with granted capabilities, and the agency's plan covering every upload.",
  accent: "purple",
  badge: "For an agency with a team",
  h1: {
    lead: "Insurance agency management software built around",
    highlight: "one shared book of business.",
  },
  lede:
    "An agency's problem is not that policies are hard to store. It is that three people are storing them in three places, nobody can say what the agency holds, and the person who knows where last year's policy is went on leave. Insoora gives the agency one book, and gives each person exactly the access the agency granted them.",
  checks: [
    "One book of business, several people",
    "Capabilities granted per sub-agent",
    "The agency owns the plan and the credits",
    "Every upload attributed to who made it",
  ],
  heroShot: "subAgentTeam",
  nav: {
    label: "Agency management",
    hint: "One book of business across a team",
  },
  footerColumn: "solutions",
  primaryKeyword: "Insurance Agency Management Software",
  secondaryKeywords: [
    "Insurance Agency Management System",
    "Insurance Broker Management Software",
    "Insurance Agency Reporting Software",
    "Insurance Business Management Software",
  ],
  sections: [
    {
      kind: "split",
      id: "structure",
      accent: "purple",
      eyebrow: "How an agency is actually modelled",
      heading: "The agency is the account. Sub-agents belong to it.",
      lede:
        "Worth reading before anything else on this page, because it explains what you can and cannot delegate.",
      paragraphs: [
        "There is no separate agency portal and no agency role. The main agent account IS the agency: it holds the plan, it holds the policy credits, and it holds every policy anyone on the team uploads. A sub-agent is an employee of exactly one agency and has no plan, no credits and no book of its own.",
        "That is a deliberately simple structure and it has one consequence worth stating: a sub-agent cannot take their policies with them. The records belong to the agency, which is usually the point of having an agency account at all — but it also means Insoora is not the right shape for a loose network of independent agents who each want to own their own data.",
        "A sub-agent starts with read access and nothing else. Everything else is granted individually by the main agent, and anything to do with money or with the team itself cannot be granted at all.",
      ],
      bullets: [
        "The agency's plan and policy credits cover every sub-agent's uploads",
        "Capabilities are granted per person, not per job title",
        "Billing and sub-agent management stay with the main agent and cannot be delegated",
      ],
      shot: "roleAccess",
      limit:
        "Nested structures are not supported. There are no branches, no regions and no sub-agents of sub-agents — the hierarchy is exactly two levels deep.",
    },
    {
      kind: "usecases",
      id: "use-cases",
      accent: "blue",
      eyebrow: "What changes",
      heading: "Three agencies, three things that stop happening",
      cases: [
        {
          who: "Three sellers, three sheets",
          situation:
            "Each person keeps their own spreadsheet. The agency's total book is a question nobody can answer without an afternoon of merging columns, and two people have the same customer twice.",
          outcome:
            "One book. Everyone uploads into it, the agency sees all of it, and a customer's policies gather under one record however many people sold them.",
        },
        {
          who: "An owner who has to do all the uploading",
          situation:
            "Only the owner is trusted with the system, so every policy any of the team sells comes back to one person as a WhatsApp forward to be entered later. Later is a backlog.",
          outcome:
            "Sub-agents are granted upload — and only upload, if that is the decision. Policies arrive as they are sold and the owner reviews rather than transcribes.",
        },
        {
          who: "A junior who should see but not change",
          situation:
            "Somebody new needs to answer customer calls about existing policies, which means read access to the whole book, which in a spreadsheet means edit access to the whole book.",
          outcome:
            "Read access is the default a sub-agent starts with. Nothing is granted until the agency grants it, and nothing can be edited without the grant.",
        },
      ],
    },
    {
      kind: "steps",
      id: "granting",
      accent: "teal",
      eyebrow: "Delegating, concretely",
      heading: "What an agency can hand to a sub-agent",
      lede:
        "Eight capabilities, granted one at a time. This is the whole list — there is nothing else to give, and two things that cannot be given.",
      steps: [
        {
          title: "Read the book",
          text: "Every sub-agent has this from the moment the account exists. They can see the agency's policies and documents without being granted anything.",
        },
        {
          title: "Upload policies",
          text: "The capability most agencies grant first, and often the only one. The uploads spend the agency's credits and the resulting policies belong to the agency.",
        },
        {
          title: "Process, review and confirm",
          text: "Three separate grants. An agency can let someone upload documents but keep the confirming of extracted fields with a senior person, which is the arrangement most agencies want while they are learning how well their insurers read.",
        },
        {
          title: "Assign a policy to a customer",
          text: "For the policies whose mobile number did not match anyone on record. Granting this lets a sub-agent clear the assignment queue; withholding it keeps that judgement central.",
        },
        {
          title: "Export to CSV, and to Excel",
          text: "Two grants rather than one. An export carries the same access rules as the screen it came from, so it can never contain a policy the person could not already open.",
        },
        {
          title: "Reveal masked contact details",
          text: "Contact numbers are masked by default. Seeing them in full is a capability, which means an agency can staff a reviewing role without handing over its customers' phone numbers.",
        },
        {
          title: "What cannot be granted",
          text: "Billing and sub-agent management. A sub-agent can never buy credits, change the plan, see payment settings, or add or remove another sub-agent — those stay with the main agent regardless of what else was granted.",
        },
      ],
      shot: "subAgentTeam",
    },
    {
      kind: "screens",
      id: "screens",
      accent: "orange",
      eyebrow: "The screens an owner works in",
      heading: "What running the agency looks like",
      lede:
        "Three views, drawn with invented data. The team, the book, and the export an accountant will ask for.",
      shots: [
        {
          shot: "subAgentTeam",
          title: "The team",
          text: "Who is on the agency, what each person was granted, and how many policies each has uploaded.",
        },
        {
          shot: "agentDashboard",
          title: "The agency dashboard",
          text: "The plan and credit position, how many documents are processing, how many need review, and what failed.",
        },
        {
          shot: "exportBuilder",
          title: "An export",
          text: "Policy and renewal lists as CSV or Excel, with the fields chosen, following the exporter's own access.",
        },
      ],
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "Where this is not agency software",
      heading: "What an agency will not find here",
      lede:
        "The gaps most likely to matter to an agency owner, named rather than left to be discovered.",
      items: [
        {
          title: "No commission or payout management",
          text: "A commission rate stated on a document is stored with the policy, and each upload is attributed to the person who made it. There is no commission calculation, no split between sub-agents, no payout statement and no reconciliation against what an insurer paid.",
        },
        {
          title: "No performance reporting",
          text: "There is no league table, no target, no per-sub-agent revenue view and no growth comparison. Policies can be filtered and exported; what you do with the export is yours.",
        },
        {
          title: "No branches or regions",
          text: "The structure is two levels: an agency and its sub-agents. A multi-branch business cannot model its branches, and a network of independent agents cannot each own their own book.",
        },
        {
          title: "No task assignment or internal messaging",
          text: "Insoora does not assign work, track follow-ups, send internal notes or notify a sub-agent that something needs doing. The review queue is a shared list, not a workflow engine.",
        },
      ],
    },
    {
      kind: "cards",
      id: "what-you-get",
      accent: "green",
      eyebrow: "What the agency does get",
      heading: "Six things that come with one shared book",
      cards: [
        {
          icon: "team",
          title: "Attribution on every policy",
          text: "Each policy records the agency it belongs to and the person who uploaded it, with an assignment history where it changed hands.",
        },
        {
          icon: "search",
          title: "One search across everything",
          text: "The whole agency's book by customer, insurer, policy number, status or expiry window — not three people's sheets merged by hand.",
        },
        {
          icon: "bell",
          title: "One renewal list",
          text: "Policies ending in the next thirty days across the whole agency, built from the dates on the schedules.",
        },
        {
          icon: "users",
          title: "Customers that gather",
          text: "A policyholder served by two sub-agents is one record with both policies under it, matched by mobile number.",
        },
        {
          icon: "download",
          title: "Exports for whoever asks",
          text: "CSV and Excel, with the same access rules as the screen, for an accountant or an audit.",
        },
        {
          icon: "lock",
          title: "Access that is granted, not assumed",
          text: "Every capability is an explicit decision, re-checked on the server for each request rather than enforced by hiding a button.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is insurance agency management software?",
      a: "Software that lets an agency run one shared book of business across several people: policies and customers in one place, access granted per person, and renewals tracked for the whole book rather than per seller. Insoora does this part; it does not do commission, payouts or performance reporting.",
    },
    {
      q: "Is there a separate agency portal?",
      a: "No, and it matters. The main agent account is the agency — it holds the plan, the credits and every policy — and sub-agents work inside the same agent portal with whatever capabilities the agency granted them. There are three portals in total: agent, customer and the back office.",
    },
    {
      q: "How many sub-agents can an agency add?",
      a: "There is no limit stated on this website. What is metered is policy processing, through the agency's plan and policy credits, rather than the number of people with logins — but the current commercial terms are not published here, so confirm them before planning around that.",
    },
    {
      q: "Can a sub-agent see the whole agency's policies?",
      a: "A sub-agent starts with read access to the agency's book and nothing else. Whether they can upload, confirm extractions, assign policies, export or see unmasked contact numbers is granted capability by capability by the main agent.",
    },
    {
      q: "Who owns the policies a sub-agent uploads?",
      a: "The agency. Policies uploaded by a sub-agent belong to the agency account, which also pays for the processing. A sub-agent has no book of its own and cannot take records with it.",
    },
    {
      q: "Does it track commission for sub-agents?",
      a: "No. Each policy is attributed to the person who uploaded it and a commission rate printed on the document is stored, but there is no commission calculation, split, statement or reconciliation anywhere in the product.",
    },
  ],
  related: [
    {
      href: "/agency-management-portal",
      label: "The agency screens",
      text: "The same structure shown screen by screen, with sample data.",
    },
    {
      href: "/insurance-agent-management-software",
      label: "Working on your own",
      text: "The same product for one agent with no team — a shorter setup and fewer decisions.",
    },
    {
      href: "/insurance-crm-software",
      label: "The customer side",
      text: "One record per policyholder, however many people in the agency serve them.",
    },
    {
      href: "/insurance-renewal-management-software",
      label: "Renewals for the whole book",
      text: "One thirty-day list across every seller and every line of business.",
    },
    {
      href: "/blog/insurance-agency-management-practical-guide",
      label: "Guide: running an agency",
      text: "A practical account of the operational side, software aside.",
    },
    {
      href: "/contact-us",
      label: "Ask about your structure",
      text: "If your agency has branches or a network, say so and we will tell you plainly whether this fits.",
    },
  ],
  cta: {
    eyebrow: "Set up the agency first",
    title: "Create the agency account, then add your team.",
    lede: "The plan and the credits sit with the agency, so start there and grant capabilities afterwards.",
    secondary: { href: "/agency-management-portal", label: "See the agency screens" },
  },
};
