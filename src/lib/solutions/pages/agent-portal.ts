import type { SolutionPage } from "../types";

// The agent portal tour. A portal page's job is different from a solution
// page's: it is not arguing a case, it is answering "what will I actually be
// looking at". So it leads with screens rather than with copy, and every
// section below names real destinations in the product's own words — the
// nine nav entries an agent account has, the six states a document can be in
// on the dashboard, the three counts on the alert bell.
//
// All of it is drawn, not screenshotted. Every figure carries a "Sample data"
// marker and an invented policy, because a screenshot of a signed-in agent
// screen would carry a real policyholder's name, number and premium. See the
// note at the top of components/marketing/product-shots.tsx.

export const page: SolutionPage = {
  slug: "agent-portal",
  group: "portal",
  metaTitle: "Agent Portal — Every Screen an Insurance Agent Works In",
  description:
    "A screen-by-screen tour of the Insoora agent portal: dashboard, upload, policies, customers, sub-agents, exports and profile, drawn with sample data.",
  accent: "blue",
  badge: "Nine destinations, drawn with sample data",
  h1: {
    lead: "The agent portal, screen by screen, with",
    highlight: "nothing invented but the policies.",
  },
  lede:
    "This is where an insurance agent works: upload documents, read what came out of them, fix what was flagged, find a customer, see what expires this month, take a list away as a spreadsheet. Nine destinations, and every one of them is drawn below with an invented policy rather than described in the abstract.",
  checks: [
    "Nine real destinations, named as the product names them",
    "Six document states on the dashboard",
    "Three alert counts, not a vague bell",
    "Every figure below is sample data",
  ],
  heroShot: "agentDashboard",
  nav: {
    label: "Agent portal",
    hint: "Every screen an agent works in",
  },
  primaryKeyword: "Insurance Agent Portal",
  secondaryKeywords: [
    "Insurance Agent Dashboard",
    "Insurance Agent Portal Software",
    "Policy Upload Portal for Agents",
  ],
  sections: [
    {
      kind: "screens",
      id: "the-three-you-live-in",
      accent: "blue",
      eyebrow: "Start with these three",
      heading: "The screens an agent opens every day",
      lede:
        "Of the nine destinations, three carry almost all the work. The other six are things you do occasionally.",
      shots: [
        {
          shot: "agentDashboard",
          title: "Dashboard",
          text: "Your plan and credit position, how many documents are processing, how many came out clean, how many need review, and what failed.",
        },
        {
          shot: "uploadQueue",
          title: "Upload Policies",
          text: "One file or a few hundred, processed together, with the state of each one visible as it goes.",
        },
        {
          shot: "policyList",
          title: "Policies",
          text: "The whole book, searchable by customer, insurer or policy number and filterable by expiry window.",
        },
      ],
    },
    {
      kind: "split",
      id: "dashboard",
      accent: "purple",
      eyebrow: "The landing screen",
      heading: "What the dashboard actually counts",
      lede:
        "Six states, and they are six because a document can fail in more than one way and the differences matter.",
      paragraphs: [
        "Every document you have uploaded sits in one of six states: uploaded in total, currently processing, successfully processed, skipped, needing review, or failed. Lumping \"needs review\" together with \"failed\" would be the obvious simplification and the wrong one — a flagged field is two minutes of your attention, and a failed file is a document that has to be sourced again.",
        "Beside the counts is the plan position: which plan the account is on, its status, and how many policy credits remain against the limit. On a sub-agent's screen those figures are the agency's, because it is the agency's credits a sub-agent's uploads spend.",
        "The alert bell carries three counts rather than one: policies expiring soon, extractions still waiting for review, and policies not yet shared with their customer. Those are the three backlogs that quietly turn into lapses, and a single undifferentiated notification count would hide which one you are behind on.",
      ],
      bullets: [
        "Six document states, counted separately",
        "Plan, status and remaining policy credits",
        "Three alert counts: expiring, awaiting review, unshared",
      ],
      shot: "agentDashboard",
      limit:
        "There is no revenue figure, no target, no growth chart and no league table. The dashboard counts documents and credits, which is what the platform actually knows.",
    },
    {
      kind: "steps",
      id: "a-policy-through-the-portal",
      accent: "red",
      eyebrow: "One policy, end to end",
      heading: "What you do with a document that just arrived",
      lede:
        "Five actions in the portal. Two of them you will usually skip, because the document read cleanly.",
      steps: [
        {
          title: "Upload it",
          text: "From the Upload Policies screen, alone or in a batch. The file is checked and classified as an insurance document before any extraction runs; a duplicate of something you already hold is recognised rather than charged for again.",
        },
        {
          title: "Read what came out",
          text: "The extracted fields are shown beside the document they were read from — policy number, insurer, insured name, the period dates, the premium breakdown, and the vehicle or coverages where the line of business has them.",
        },
        {
          title: "Confirm, or fix what was flagged",
          text: "A field the parser could not read confidently is marked rather than guessed. You confirm or correct it against the page. By default nothing is written to the policy record until a person confirms it.",
        },
        {
          title: "Check who it was filed under",
          text: "The mobile number on the document is matched against the numbers you hold, and the policy is filed under that customer. If nothing matched, the policy waits in a queue for you to assign rather than landing on a near-enough name.",
        },
        {
          title: "Share it, if the customer has a login",
          text: "Sharing a policy is what makes it visible in that policyholder's own portal. Until then it is visible only to your agency — which is why unshared policies are one of the three alert counts.",
        },
      ],
      shot: "reviewFlag",
    },
    {
      kind: "split",
      id: "customers",
      accent: "teal",
      eyebrow: "The screen that answers phone calls",
      heading: "Customers, and whether they can help themselves",
      lede:
        "The customer list has one column most people do not expect, and it is the useful one.",
      paragraphs: [
        "Search by name or by mobile number, open a policyholder, and every policy they hold and have held is there, by year, each with the document it was read from. That is the screen that answers \"what cover do I actually have?\" without opening a shared drive.",
        "The column worth noticing is the portal state: whether this customer has a login and uses it, has been given one and never signed in, or has none at all. That is the list of people who will keep ringing you for copies of their own policies, and it is actionable rather than informational.",
        "Contact numbers are masked by default. Seeing them in full is a capability an agency grants deliberately, which means a reviewing role can be staffed without handing over customers' phone numbers.",
      ],
      bullets: [
        "Search by name or mobile number",
        "Every policy a customer holds, by year, with its document",
        "Portal state per customer: active, invited, or no login",
      ],
      shot: "agentCustomers",
      limit:
        "There are no custom fields, tags, segments or notes on a customer. The record holds what the platform stores, and there is no deduplication tool — the same person under two mobile numbers stays two records until merged by hand.",
    },
    {
      kind: "cards",
      id: "the-other-six",
      accent: "orange",
      eyebrow: "The rest of the sidebar",
      heading: "The six destinations you use less often",
      lede:
        "Named as the portal names them, including the two that only appear if the account was granted them.",
      cards: [
        {
          icon: "search",
          title: "Search",
          text: "A search across the agency's policies from the top bar of any screen, rather than only from the policy list.",
        },
        {
          icon: "bell",
          title: "Renewals",
          text: "Policies ending within the next thirty days, sorted by date and built from the expiry on each schedule.",
        },
        {
          icon: "team",
          title: "Sub-Agents",
          text: "Your team and what each person was granted. Appears only on a main agent account with sub-agent management.",
        },
        {
          icon: "download",
          title: "Exports",
          text: "CSV and Excel downloads of policy and renewal lists, following the same access rules as the screen. A granted capability.",
        },
        {
          icon: "settings",
          title: "Plan & Credits",
          text: "The subscription and policy credit position, and top-ups. Main agent only — a sub-agent can never reach billing.",
        },
        {
          icon: "users",
          title: "Profile",
          text: "Your own details and password. The one destination every account has regardless of what was granted.",
        },
      ],
    },
    {
      kind: "limits",
      id: "limits",
      accent: "green",
      eyebrow: "About these pictures",
      heading: "What you are looking at, and what you are not",
      lede:
        "Two things to be clear about before you judge the product on this page.",
      items: [
        {
          title: "These are drawings, not screenshots",
          text: "Every figure on this page is built in markup from the product's own colours, type and components, with an invented policy and a \"Sample data\" marker. They are faithful to the real screens' structure and are not photographs of them.",
        },
        {
          title: "Why there are no real screenshots",
          text: "A screenshot of a signed-in agent screen carries a real policyholder's name, mobile number, policy number and premium. Publishing one would expose a customer's records to make a marketing page look more convincing, and no amount of cropping makes that a reasonable trade.",
        },
        {
          title: "Your sidebar may be shorter",
          text: "Sub-Agents, Exports and Plan & Credits appear only where the account has them. A sub-agent sees what its agency granted, and every page re-checks that on the server rather than relying on what the sidebar showed.",
        },
        {
          title: "The product changes",
          text: "A drawing can drift from the screen it describes. If something here does not match what you see after signing in, the product is right and this page is behind — tell us and we will fix the page.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is in the Insoora agent portal?",
      a: "Nine destinations: a dashboard, Upload Policies, Policies, Customers, Renewals, Search, Sub-Agents, Exports, Plan & Credits and Profile. Sub-Agents, Exports and Plan & Credits appear only on accounts that have them — a sub-agent sees what its agency granted it.",
    },
    {
      q: "Are these real screenshots of the product?",
      a: "No, and deliberately. Every figure on this page is drawn in markup from the product's own design tokens with an invented policy and a \"Sample data\" marker. A screenshot of a signed-in screen would carry a real policyholder's name, number and premium.",
    },
    {
      q: "Can a sub-agent use the same portal?",
      a: "Yes — main agents and sub-agents share one portal. A sub-agent starts with read access and gets only the capabilities the agency granted: upload, process, review, confirm, assign a policy to a customer, export to CSV or Excel, and reveal masked contact numbers. Billing and sub-agent management can never be granted.",
    },
    {
      q: "What do the six counts on the dashboard mean?",
      a: "They are the states a document can be in: total uploaded, currently processing, successfully processed, skipped, needing review, and failed. Needing review is a flagged field waiting for your confirmation; failed is a document that could not be processed at all.",
    },
    {
      q: "What does the alert bell show?",
      a: "Three counts rather than one: policies expiring soon, extractions still waiting for review, and policies not yet shared with their customer. They are kept separate because they are three different backlogs needing three different actions.",
    },
    {
      q: "Does the agent portal work on a phone?",
      a: "The portals are responsive and the agent portal has a phone navigation bar with shortened labels. Uploading and reviewing a dense motor schedule is genuinely easier on a larger screen, and it is fair to expect the phone to be for looking things up rather than for working through a batch.",
    },
  ],
  related: [
    {
      href: "/customer-portal",
      label: "The customer portal",
      text: "The other end of the same records, read-only.",
    },
    {
      href: "/agency-management-portal",
      label: "The agency view",
      text: "What changes in this portal once there are sub-agents in it.",
    },
    {
      href: "/product-in-action",
      label: "Every screen on the site",
      text: "The full gallery, including the screens this page had no room for.",
    },
    {
      href: "/insurance-agent-management-software",
      label: "Working on your own",
      text: "The same portal for a solo agent, and what the first week looks like.",
    },
    {
      href: "/how-it-works",
      label: "The seven steps",
      text: "What happens to a document between upload and renewal.",
    },
    {
      href: "/features",
      label: "Every feature, with its limits",
      text: "The complete capability list in detail.",
    },
  ],
  cta: {
    eyebrow: "The real one is better than a drawing",
    title: "Create an agent account and open the actual portal.",
    lede: "Upload three policies; the screens above are the ones you will land on.",
    secondary: { href: "/product-in-action", label: "See every screen" },
  },
};
