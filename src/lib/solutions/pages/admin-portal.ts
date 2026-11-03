import type { SolutionPage } from "../types";

// ── The most carefully scoped page on the site ───────────────────────────
//
// The brief asks for an admin portal showcase AND rules out publishing
// sensitive administrative functionality, infrastructure details, internal
// URLs and security configuration. Those two requirements point in opposite
// directions, and this page resolves them one way: it describes what the back
// office is FOR and who operates it, and it shows exactly one screen — a
// business overview of counts and a work queue, drawn with invented agency
// names.
//
// What is deliberately absent: the payment gateway settings screen, the
// storage screen, the AI and OCR provider screens, platform settings, and the
// audit log's contents. Those exist, they are named here as categories so the
// page is not pretending otherwise, and none of them is drawn. A screenshot
// of a gateway configuration screen is a disclosure, not a design decision.
//
// The other thing this page exists to correct: an agency owner searching for
// an "admin portal" usually assumes they get one. They do not. The back
// office operates across every tenant's data and is staffed by the company
// that runs the platform. Saying so in the first section is the single most
// useful sentence on the page.

export const page: SolutionPage = {
  slug: "admin-portal",
  group: "portal",
  metaTitle: "Admin Portal — Who Operates Insoora and What They Can See | Insoora",
  description:
    "What the Insoora back office is for, who staffs it, which five admin roles exist, and what an operator can and cannot reach in an agency's records.",
  accent: "red",
  badge: "Operated by us, not by your agency",
  h1: {
    lead: "The admin portal is ours, and this page explains",
    highlight: "what we can see.",
  },
  lede:
    "The back office is not a portal an agency is given. It is where the company running Insoora keeps the platform working — accepting borderline documents, writing insurer rules, answering enquiries, and keeping an audit trail of who did what. If you are about to put your book of business on this platform, what you want from this page is an honest account of that access.",
  checks: [
    "Five staff roles, not one god account",
    "Every privileged action written to an audit log",
    "Configuration screens are not shown here, on purpose",
    "The one screen below uses invented agency names",
  ],
  heroShot: "adminConsole",
  nav: {
    label: "Admin portal",
    hint: "Who operates the platform, and what they can see",
  },
  primaryKeyword: "Insurance Platform Admin Portal",
  secondaryKeywords: [
    "Insurance Software Administration",
    "Insurance Back Office Operations",
    "Insurance Platform Audit Logs",
  ],
  sections: [
    {
      kind: "split",
      id: "whose-portal",
      accent: "red",
      eyebrow: "The correction most readers need",
      heading: "You do not get an admin portal. We have one.",
      lede:
        "Worth settling in the first paragraph, because the assumption runs the other way.",
      paragraphs: [
        "Insoora has three portals. An agent signs into the agent portal, a policyholder into the customer portal, and the company that operates the platform signs into the back office. An agency owner's own administrative screens — the team, the plan, the credits — are inside the agent portal, not here.",
        "The back office is different in kind from the other two, and the difference is the thing to understand: its queries are not tenant-scoped. An agent portal session can only ever reach one agency's data by construction. A back-office session is a session that can look across every agency's data, because the work it exists to do — accepting a borderline document, writing a rule for a stubborn insurer layout, investigating why an upload failed — cannot be done from inside one tenant.",
        "That is a genuine trust relationship and it should be treated as one. The rest of this page is about the controls on it rather than about features.",
      ],
      bullets: [
        "Three portals: agent, customer, back office",
        "Your agency's own administration lives in the agent portal",
        "Back-office queries are not tenant-scoped — that is what the role is for",
      ],
      shot: "adminConsole",
      limit:
        "There is no white-label or reseller arrangement in which an agency gets its own back office across other agencies' data. The back office is one, and it belongs to the operator of the platform.",
    },
    {
      kind: "cards",
      id: "five-roles",
      accent: "purple",
      eyebrow: "Not one god account",
      heading: "The five staff roles, and what separates them",
      lede:
        "The useful fact here is that the roles are different from each other. A support account cannot change anything, and only one role reaches payment credentials.",
      cards: [
        {
          icon: "settings",
          title: "Super admin",
          text: "Everything, including payment gateway credentials and changing another account's role. The smallest role by headcount and the one with the fewest holders.",
        },
        {
          icon: "shield",
          title: "Admin",
          text: "Operational administration across agencies, plans and extraction configuration — but not gateway credentials and not role changes.",
        },
        {
          icon: "eye",
          title: "Support",
          text: "Read-only. Can see users, usage and billing in order to answer a question, cannot change anything, and never sees payment credentials.",
        },
        {
          icon: "check",
          title: "Reviewer",
          text: "Works on documents: reading, processing, reviewing and confirming extractions, plus export. No user administration and no billing.",
        },
        {
          icon: "file",
          title: "Viewer",
          text: "Document read access and nothing else. The role for somebody who needs to look at a case without being able to act on it.",
        },
      ],
    },
    {
      kind: "screens",
      id: "the-one-screen",
      accent: "blue",
      eyebrow: "One screen, and why only one",
      heading: "The business overview, with invented agencies",
      lede:
        "This is the screen an operator starts the day on: counts, and a queue of agencies that need something done. The configuration screens are discussed below and deliberately not drawn.",
      shots: [
        {
          shot: "adminConsole",
          title: "Business overview",
          text: "How many agencies, how many policies processed, how many extractions awaiting review, how many website enquiries unanswered — and the queue of what needs an operator today.",
        },
        {
          shot: "templateRule",
          title: "An insurer rule, mid-test",
          text: "The one configuration screen shown, because it is the one that explains how a stubborn insurer layout gets read: a human writes a rule and tests it against a document before saving.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-is-not-shown",
      accent: "orange",
      eyebrow: "The absences are the point",
      heading: "What this page does not show you, and why",
      lede:
        "A marketing page that walks you through a payment gateway configuration screen has told you something about the company publishing it.",
      paragraphs: [
        "The back office has screens for payment gateway settings, document storage, the AI and OCR providers, platform settings and the audit log. They are named here so that this page is not pretending they do not exist. None of them is drawn, and none of them will be.",
        "The reason is not that they are embarrassing. It is that a screenshot of a configuration surface tells a reader which fields exist, how they are grouped and what a valid value looks like — and for a security or payment surface that is reconnaissance rather than marketing. The brief for this website rules it out and it would be the right call anyway.",
        "What a reader is entitled to is the shape of the thing: there is a back office, five roles with genuinely different reach, privileged actions are recorded, and configuration is done by a person who has to test a rule before saving it. That is on this page. The field layouts are not.",
      ],
      h3: [
        {
          heading: "On the audit log",
          paragraphs: [
            "Privileged actions are written to an audit log, and reading that log is itself a separate permission rather than something every staff role has.",
            "What this page will not do is publish what the log records field by field, or show it. A log is worth having because it is complete and because tampering with it would show; neither property is improved by describing its schema on a public page.",
          ],
        },
        {
          heading: "On the limits of this reassurance",
          paragraphs: [
            "An audit log is a record, not a prevention. It tells you after the fact that a privileged action happened; it does not stop one. Role separation is the control that narrows who could take the action in the first place, and the honest position is that both are in place and neither is a guarantee.",
            "Insoora holds no security certification and has not been penetration tested. Those two sentences belong on this page more than on any other.",
          ],
        },
      ],
    },
    {
      kind: "table",
      id: "operator-reach",
      accent: "teal",
      eyebrow: "Concretely",
      heading: "What an operator can reach in your agency's data",
      lede:
        "The question behind every visit to a page like this. Answered row by row.",
      columns: ["Your data", "Can the back office reach it?", "Which role"],
      rows: [
        [
          "Your policy records and extracted fields",
          "Yes. Reviewing a failed or borderline extraction is the core back-office job.",
          "Reviewer, Admin, Super admin; Viewer and Support can read",
        ],
        [
          "Your uploaded policy documents",
          "Yes, through the same scoped download route everything else uses. There is no bypass that serves bytes without re-deriving the caller.",
          "Roles with document read access",
        ],
        [
          "Your customers' contact details",
          "Yes, where the role includes revealing them. Masking is the default, and unmasking is a separate permission rather than a property of being staff.",
          "Roles granted it explicitly",
        ],
        [
          "Your plan, credits, subscriptions and payments",
          "Yes, as records — to answer a billing question or correct a credit balance.",
          "Admin and Super admin; Support read-only",
        ],
        [
          "Payment gateway credentials",
          "One role only, and never Support.",
          "Super admin",
        ],
        [
          "Changing another account's role",
          "One role only.",
          "Super admin",
        ],
        [
          "Your password",
          "No. Passwords are stored hashed and cannot be read back by anybody, including us.",
          "Nobody",
        ],
      ],
      note:
        "If what you need is a contractual commitment about operator access rather than a description of it, the Privacy Policy is the document to read and the office is the place to ask. A table on a marketing page is not a data processing agreement.",
    },
    {
      kind: "limits",
      id: "limits",
      accent: "green",
      eyebrow: "Stated plainly",
      heading: "What this page is not claiming",
      lede:
        "The four things a reader could reasonably over-read from everything above.",
      items: [
        {
          title: "Role separation is not isolation",
          text: "Five roles with different reach is better than one account with everything. It is not a guarantee that no operator can see your records — the back office exists precisely because somebody has to be able to.",
        },
        {
          title: "No certification, no penetration test",
          text: "Insoora holds no security certification of any kind, has not been penetration tested, and does not claim IRDAI approval or any government certification. There is also no multi-factor authentication on accounts yet.",
        },
        {
          title: "No published retention schedule",
          text: "Nothing is deleted automatically, because the platform is built to keep policy records findable for years. A deletion request is handled by hand, and some records may still be retained where law, tax, an unresolved dispute or a backup's expiry cycle requires it.",
        },
        {
          title: "The screen above is invented",
          text: "The agency names, counts and queue entries are fictional and the screen is drawn in markup rather than captured. No real agency's position appears on this website.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Do I get an admin portal for my agency?",
      a: "No. Insoora has three portals — agent, customer and the back office — and the back office belongs to the company that operates the platform. Your agency's own administration, meaning your team, your plan and your credits, is inside the agent portal.",
    },
    {
      q: "Can Insoora staff see my customers' policies?",
      a: "Yes, where a staff member's role includes document and policy read access, because reviewing failed and borderline extractions is the work the back office exists to do. There are five staff roles with genuinely different reach, revealing masked contact numbers is a separate permission, and privileged actions are written to an audit log.",
    },
    {
      q: "What are the five admin roles?",
      a: "Super admin, admin, support, reviewer and viewer. Only super admin reaches payment gateway credentials or can change another account's role. Support is read-only and never sees payment credentials. Reviewer works on documents and extractions. Viewer can read documents and nothing else.",
    },
    {
      q: "Why are there no screenshots of the admin configuration screens?",
      a: "Because a screenshot of a payment, storage or provider configuration screen shows which fields exist, how they are grouped and what a valid value looks like. For a security surface that is reconnaissance rather than marketing. The screens are named on this page and deliberately not drawn.",
    },
    {
      q: "Is there an audit log?",
      a: "Yes, and reading it is a separate permission rather than something every staff role has. It records privileged actions. It is a record rather than a prevention — it tells you after the fact that something happened, and role separation is what narrows who could have done it.",
    },
    {
      q: "Can anyone at Insoora read my password?",
      a: "No. Passwords are stored hashed and cannot be read back by anybody, including us. There is no multi-factor authentication on accounts yet, which is stated plainly rather than implied away.",
    },
  ],
  related: [
    {
      href: "/privacy-policy",
      label: "What is stored and who can reach it",
      text: "The document that actually governs this, rather than describing it.",
    },
    {
      href: "/agent-portal",
      label: "The portal you do get",
      text: "All nine destinations an agent account works in.",
    },
    {
      href: "/agency-management-portal",
      label: "Your own administration",
      text: "The team and capability screens inside the agent portal.",
    },
    {
      href: "/insurance-document-management-software",
      label: "How document access works",
      text: "Private storage, server-derived scope, and five-minute viewer links.",
    },
    {
      href: "/about-us",
      label: "Who operates the platform",
      text: "The company behind Insoora and where it is built.",
    },
    {
      href: "/contact-us",
      label: "Ask a direct question",
      text: "If you need a commitment rather than a description, ask the office.",
    },
  ],
  cta: {
    eyebrow: "Ask before you commit",
    title: "If operator access is your question, ask it directly.",
    lede: "A page can describe the controls. Only a conversation can answer what your business needs committed in writing.",
    secondary: { href: "/privacy-policy", label: "Read the Privacy Policy" },
  },
};
