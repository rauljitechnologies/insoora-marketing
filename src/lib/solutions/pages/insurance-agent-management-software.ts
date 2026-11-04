import type { SolutionPage } from "../types";

// ── Why this page opens by sending some readers away ─────────────────────
//
// "Insurance agent management software" is two queries wearing one phrase:
// software FOR an agent to run their book, and software to manage a team OF
// agents. The brief's own page list assigns this query and
// /insurance-agency-management-software's query to overlapping URLs, and the
// keyword-uniqueness check in lib/solutions/index.ts is what forced the two
// to be separated properly rather than left to compete.
//
// The split taken here: this page is for the agent working alone, which is a
// real and distinct product experience (no sub-agents, no capability grants,
// no delegation decisions). The agency page is for the team. The first
// section says which is which in two sentences, because a reader who wants
// the other one should find it immediately rather than read six sections of
// the wrong page.

export const page: SolutionPage = {
  slug: "insurance-agent-management-software",
  group: "solution",
  metaTitle: "Insurance Agent Management Software for Solo Agents in India | Insoora",
  description:
    "Management software for an insurance agent working alone: every policy, customer and renewal in one place, built by reading the policy PDFs you already have.",
  accent: "blue",
  badge: "For an agent with no team",
  h1: {
    lead: "Insurance agent management software for the agent",
    highlight: "who is the whole agency.",
  },
  lede:
    "You sell, you service, you chase renewals, and you are also the filing system. Insoora is the part of that you should not have to be: upload the policy PDFs and it builds the records, the customer list and the renewal list, with the documents still attached.",
  checks: [
    "No team to set up, nothing to delegate",
    "Your whole book in one searchable list",
    "Renewals from the policies' own dates",
    "Customers can see their own policies",
  ],
  heroShot: "agentDashboard",
  nav: {
    label: "For solo agents",
    hint: "Running a book of business on your own",
  },
  primaryKeyword: "Insurance Agent Management Software",
  secondaryKeywords: [
    "Software for Insurance Agents",
    "Insurance Agent Software India",
    "Policy Management for Individual Agents",
    "Insurance Agent Record Keeping Software",
  ],
  sections: [
    {
      kind: "usecases",
      id: "which-page",
      accent: "blue",
      eyebrow: "Two different things get called this",
      heading: "Which of these are you looking for?",
      lede:
        "The phrase covers two products. Picking the right page now saves reading the wrong one.",
      cases: [
        {
          who: "Software for me",
          situation:
            "You are an insurance agent. You want your own policies, customers and renewals in one place instead of a spreadsheet, a folder and a WhatsApp history.",
          outcome: "This page. Keep reading.",
        },
        {
          who: "Software to manage my agents",
          situation:
            "You run an agency with sellers under you and want one shared book, with each person's access decided rather than assumed.",
          outcome: "The agency page covers that, including what can and cannot be delegated.",
          href: "/insurance-agency-management-software",
        },
        {
          who: "Just the screens, please",
          situation:
            "You have read enough description and want to see what the product actually looks like before deciding anything.",
          outcome: "The agent portal page is a screen-by-screen tour with sample data.",
          href: "/agent-portal",
        },
      ],
    },
    {
      kind: "split",
      id: "the-solo-problem",
      accent: "red",
      eyebrow: "What is actually different working alone",
      heading: "There is nobody to hand the filing to",
      lede:
        "The constraint is not volume. Plenty of solo agents hold four hundred policies. The constraint is that every task competes with selling.",
      paragraphs: [
        "In an agency, record-keeping can be somebody's job. Working alone it is always the thing that can wait — and the consequence is predictable: the records are current for the policies you sold this week and increasingly approximate for everything older.",
        "That is why reading documents matters more to a solo agent than to an agency. An agency can afford to type policies in, because somebody is paid to. On your own, the choice is between a complete record that cost you no typing and an incomplete one that cost you an evening.",
        "The other difference is that you are also the institutional memory. When a customer rings about a policy from three years ago, there is nobody else to ask — so the value of the document still being attached to the record is not tidiness, it is that the answer exists without you remembering it.",
      ],
      bullets: [
        "No capability grants to configure — you hold everything on your own account",
        "No review hand-off: you upload and you confirm, which is a two-minute pass per batch",
        "Add sub-agents later without moving anything; your book becomes the agency's book",
      ],
      shot: "uploadQueue",
      limit:
        "Insoora will not do the confirming for you. By default an extracted policy waits for a human to confirm it, and on your own that human is you. It replaces transcription, not judgement.",
    },
    {
      kind: "cards",
      id: "what-you-run",
      accent: "teal",
      eyebrow: "What you get to run",
      heading: "Six screens that are the whole job",
      lede:
        "No modules to buy, no setup wizard, nothing to configure before the first policy goes in.",
      cards: [
        {
          icon: "upload",
          title: "Upload",
          text: "One policy or a few hundred. Each file's state is visible, so a backlog becomes a number rather than a feeling.",
        },
        {
          icon: "shield",
          title: "Policies",
          text: "Your whole book, searchable by customer, insurer, policy number and status, filterable by expiry window.",
        },
        {
          icon: "users",
          title: "Customers",
          text: "One record per policyholder with everything they hold, and a column showing who has a portal login.",
        },
        {
          icon: "bell",
          title: "Renewals",
          text: "Policies ending in the next thirty days, from the dates on the schedules rather than from reminders you set.",
        },
        {
          icon: "download",
          title: "Exports",
          text: "CSV or Excel when an accountant, an insurer or your own records need a list.",
        },
        {
          icon: "settings",
          title: "Plan and credits",
          text: "Your subscription and policy credits, which on a solo account are yours alone rather than an agency's.",
        },
      ],
    },
    {
      kind: "steps",
      id: "first-week",
      accent: "purple",
      eyebrow: "Getting started honestly",
      heading: "What the first week actually looks like",
      lede:
        "Not a migration project. Five steps, and the first one is deliberately small.",
      steps: [
        {
          title: "Upload five policies, not five hundred",
          text: "Pick the insurers you sell most and the ugliest documents you have. Extraction quality on your layouts is the only thing about this product that a website cannot tell you, and five documents tell you most of it.",
        },
        {
          title: "Confirm them and see what was flagged",
          text: "What came out complete, and what needed a human. That ratio, on your documents, is the real decision — not any claim made on a landing page.",
        },
        {
          title: "Then upload the current year",
          text: "This year's book first, because that is what your renewal list needs to be right about. Each policy files itself under a customer matched on the mobile number from the document.",
        },
        {
          title: "Clear the assignment queue",
          text: "Policies whose number did not match anyone on record wait to be assigned rather than landing on the wrong customer. Clearing that queue is what turns a pile of policies into a customer list.",
        },
        {
          title: "Go back through the archive when you want",
          text: "Older years are optional and can be done in batches. History starts when a policy is uploaded, so there is no deadline — but nothing is recovered for years you never add.",
        },
      ],
      shot: "customerMatch",
    },
    {
      kind: "split",
      id: "customers-serve-themselves",
      accent: "green",
      eyebrow: "The part that gives you time back",
      heading: "Your customers can stop ringing you for copies",
      lede:
        "For a solo agent this is the feature with the clearest return, because every avoided call is your own hour.",
      paragraphs: [
        "A policyholder can be given a login to their own portal, where they see the policies you have shared with them, how long each one has left, and the original documents to download. They register with the mobile number you already hold on their record, which is how the login finds the right book of policies.",
        "The portal is strictly read-only. There is no renew button, no payment and no way to change anything — a customer account holds no write permission anywhere in the system. So it removes the \"can you send me my policy copy\" call without creating any risk that a customer changes a record.",
        "What it does not remove is the renewal conversation, and that is the right outcome. The customer who opens their portal and sees forty-five days left is a customer who rings you first.",
      ],
      bullets: [
        "A year-wise history of everything you have shared, with the documents",
        "Days remaining on each policy, read from the schedule",
        "Read-only: nothing in the portal can alter a record",
      ],
      shot: "customerMobile",
      limit:
        "You decide who gets a login and which policies are shared. A policy you have not shared is visible to nobody but you — which is also why \"not yet shared\" is one of the portal's own alert counts.",
    },
    {
      kind: "limits",
      id: "limits",
      accent: "orange",
      eyebrow: "What it will not do for you",
      heading: "Four things a solo agent will still be doing by hand",
      lede:
        "Worth knowing before you expect the software to cover them.",
      items: [
        {
          title: "Finding new customers",
          text: "There is no lead management, no pipeline, no quotation tool and no campaign sending. Insoora starts at the policy that has already been issued.",
        },
        {
          title: "Contacting anyone",
          text: "No email, SMS or WhatsApp is sent to you or to your customers. The renewal list tells you who to call; the call is yours.",
        },
        {
          title: "Your commission",
          text: "A commission rate printed on a document is stored with the policy, but there is no calculation, statement or reconciliation against what an insurer actually paid you.",
        },
        {
          title: "Anything an insurer does",
          text: "No connection to any insurer's system in either direction. No quoting, no issuing, no renewing, no premium collection, no claim intimation.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is Insoora worth it for a single agent with a few hundred policies?",
      a: "That depends on where your time goes. If you are retyping schedules into a spreadsheet and searching folders for last year's policy, the reading and filing is the part this removes. If your records are already complete and current, the gain is smaller — and the honest test is to upload five policies and see what extraction does with your insurers' layouts.",
    },
    {
      q: "Do I need to set anything up before I start?",
      a: "No. A solo account holds every capability on its own — there are no sub-agents to add and no permissions to grant. Create the account, upload a policy PDF, and confirm what was read.",
    },
    {
      q: "What if I take on a sub-agent later?",
      a: "Nothing moves. Your account is already the structure an agency uses: it holds the plan, the credits and the policies, and you add sub-agents to it and grant each one the capabilities you choose. The agency page sets out what can and cannot be delegated.",
    },
    {
      q: "How do my customers get their policies?",
      a: "You share a policy with a customer, and if you give them a portal login they can see it and download the document themselves. They register with the mobile number you already hold on their record. The portal is read-only, so they can never change anything.",
    },
    {
      q: "Can I export everything if I stop using it?",
      a: "Yes. Policy and renewal lists export as CSV or Excel, and the original policy documents remain downloadable. An export follows the same access rules as the screen it came from.",
    },
    {
      q: "What does it cost for one agent?",
      a: "No price is published on this website. Paid use takes two forms — a subscription for access to the platform, and policy credits consumed as documents are processed — and prices are shown in rupees with applicable taxes before you pay for anything. Create an account or call the office for the current terms.",
    },
  ],
  related: [
    {
      href: "/agent-portal",
      label: "The agent portal, screen by screen",
      text: "Every screen you would work in, drawn with sample data.",
    },
    {
      href: "/insurance-agency-management-software",
      label: "When you add a team",
      text: "What changes once there are sub-agents, and what cannot be delegated.",
    },
    {
      href: "/insurance-policy-entry-software",
      label: "How the typing disappears",
      text: "The extraction pipeline, and what it does when it cannot read a field.",
    },
    {
      href: "/insurance-renewal-management-software",
      label: "Renewals",
      text: "Where the thirty-day list comes from, and what it will not do.",
    },
    {
      href: "/refund-and-cancellation",
      label: "Cancelling",
      text: "How cancellation and refunds are handled. A draft awaiting business approval.",
    },
    {
      href: "/contact-us",
      label: "Ask before you commit",
      text: "Describe your book and we will tell you plainly whether this fits it.",
    },
  ],
  cta: {
    eyebrow: "Five policies is the whole test",
    title: "Upload five documents and judge it on those.",
    lede: "Your insurers' layouts are the only variable that matters, and nobody can tell you about them but your own PDFs.",
    secondary: { href: "/agent-portal", label: "See the agent portal" },
  },
};
