import type { SolutionPage } from "../types";

// ── A note on what this page deliberately does NOT target ────────────────
//
// The brief's CRM keyword list includes "Insurance Lead Management Software".
// Insoora has no lead management: no pipeline, no stages, no quotations, no
// campaign sending, no call logging. Targeting that query would put a page in
// front of someone looking for a sales pipeline and spend their click
// discovering it is not here.
//
// So the query is not targeted and the absence is stated twice on the page —
// once in the opening section, which draws the distinction between a client
// CRM and a sales CRM, and once in the limits. A reader who wants a pipeline
// should be able to work out in ten seconds that this is not it. That is
// worth more than the visit.

export const page: SolutionPage = {
  slug: "insurance-crm-software",
  group: "solution",
  metaTitle: "Insurance CRM Software for Agents in India — Client Records",
  description:
    "A client-record CRM for insurance agents: every policyholder with every policy they hold, their documents, their renewal dates and their own portal login.",
  accent: "teal",
  badge: "A client CRM, not a sales pipeline",
  h1: {
    lead: "Insurance CRM software organised around",
    highlight: "the customer, not the deal.",
  },
  lede:
    "Insoora holds one record per policyholder: every policy they hold and have held, every document, every expiry date, and a login of their own if you want them to have one. What it does not hold is a sales pipeline — and it is better to say so on this page than to let you find out on the third screen.",
  checks: [
    "One record per policyholder",
    "Every policy they hold, by year",
    "Policies matched by mobile number",
    "Optional portal login per customer",
  ],
  heroShot: "agentCustomers",
  nav: {
    label: "Insurance CRM",
    hint: "One record per policyholder, with every policy",
  },
  footerColumn: "product",
  primaryKeyword: "Insurance CRM Software India",
  secondaryKeywords: [
    "CRM Software for Insurance Agents",
    "Insurance Agency CRM Software",
    "Insurance Customer Management Software",
    "Insurance Client Database Software",
    "Insurance Agent CRM System",
  ],
  sections: [
    {
      kind: "split",
      id: "two-kinds-of-crm",
      accent: "teal",
      eyebrow: "Read this first",
      heading: "Two different things are called an insurance CRM",
      lede:
        "They solve different problems, and buying the wrong one is the most common mistake in this category.",
      paragraphs: [
        "A sales CRM manages people who have not bought yet. It has leads, stages, follow-up tasks, quotations, call logs and campaign sending, and it is judged on how many prospects it converts.",
        "A client CRM manages people who have already bought. It has one record per policyholder, every policy under it, the documents, the dates, and the question \"what does this customer actually hold?\" answered in one screen. It is judged on whether you can service a book of business without opening a shared drive.",
        "Insoora is the second kind. For an agent whose real problem is that four hundred policyholders are spread across a spreadsheet, a WhatsApp history and a folder of PDFs, the client record is the thing that was missing — and a pipeline would not have helped.",
      ],
      bullets: [
        "Search the customer list by name or mobile number",
        "Open a customer and see every policy they hold and have held",
        "See at a glance which policyholders have a portal login and which have never signed in",
      ],
      shot: "customerMatch",
      limit:
        "There are no leads, no deal stages, no quotations, no task assignment, no email or SMS campaigns and no call logging. If you are shopping for a pipeline to convert prospects, this is not that product.",
    },
    {
      kind: "cards",
      id: "what-the-record-holds",
      accent: "blue",
      eyebrow: "The client record",
      heading: "What is on a policyholder in Insoora",
      lede:
        "Only fields the platform actually stores. There is no custom-field builder and no notes timeline.",
      cards: [
        {
          icon: "users",
          title: "Identity and contact",
          text: "Name and mobile number, which is also the key a policy uses to find its customer and the number a policyholder registers their portal login with.",
        },
        {
          icon: "shield",
          title: "Every policy held",
          text: "All policies assigned to this customer across lines of business, each with its insurer, number, premium and dates.",
        },
        {
          icon: "history",
          title: "Previous years",
          text: "Policies stack by year, so last year's cover and the document that proved it are one click away rather than one search of an inbox.",
        },
        {
          icon: "file",
          title: "The documents themselves",
          text: "Every uploaded PDF stays attached to the policy it was read from, in private storage, downloadable by whoever is authorised.",
        },
        {
          icon: "clock",
          title: "What expires when",
          text: "Each policy's expiry as read off its schedule, which is what puts this customer on a renewal list without anybody setting a reminder.",
        },
        {
          icon: "link",
          title: "Portal account state",
          text: "Whether this policyholder has a login, has been given one and never used it, or has none — the column that tells you who still rings you for a copy of their own policy.",
        },
      ],
    },
    {
      kind: "usecases",
      id: "use-cases",
      accent: "purple",
      eyebrow: "Who this changes something for",
      heading: "Three situations, and what is different",
      cases: [
        {
          who: "Solo agent, 300 policies",
          situation:
            "A customer rings to ask what cover they have. The answer is in a spreadsheet for the policy number and a Downloads folder for the document, and the spreadsheet was last tidied in March.",
          outcome:
            "Search the name, open the customer, read every policy they hold and send the PDF — without leaving the screen or trusting a sheet.",
        },
        {
          who: "Agency with sub-agents",
          situation:
            "Three people sell, each keeps their own list, and nobody can say how many policies the agency holds or which of them expire next month.",
          outcome:
            "One book of business. Everyone uploads into it, the agency sees all of it, and each person's access is granted rather than assumed.",
        },
        {
          who: "An agent taking over a book",
          situation:
            "Policies are inherited as a folder of PDFs with no index, and the only way to know what is in there is to open four hundred files.",
          outcome:
            "Upload the folder. Each document is read, filed under a matched customer, and the ones that cannot be matched are queued for you to assign instead of being lost.",
        },
      ],
    },
    {
      kind: "split",
      id: "matching",
      accent: "orange",
      eyebrow: "How a policy finds its person",
      heading: "The mobile number is the key",
      lede:
        "This is the mechanism worth understanding before you upload anything, because it is where a customer record comes from.",
      paragraphs: [
        "When a policy is extracted, Insoora reads the mobile number off the document and matches it against the numbers you hold on record. A match files the policy under that customer. No match, and the policy waits in a queue for an agent to assign it — it is never attached to a nearby-looking name.",
        "The same number is how a policyholder registers for their own portal. They sign up with the number their agent already holds, which is what ties the login to the right book of policies without anyone issuing credentials by email.",
        "The practical consequence: the quality of your customer records depends on the mobile numbers being right. An agency whose numbers are current gets most policies filed automatically; one whose numbers are five years old gets a longer assignment queue.",
      ],
      bullets: [
        "A matched policy is filed under the customer automatically",
        "An unmatched policy waits to be assigned rather than guessing",
        "A policyholder registers with the number already on their record",
      ],
      shot: "roleAccess",
      limit:
        "There is no deduplication wizard and no fuzzy name matching. Two records for the same person with two different mobile numbers stay two records until somebody merges them by hand.",
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "What is not here",
      heading: "The parts of a CRM Insoora does not have",
      lede:
        "A list long enough to disqualify the product for some buyers, which is the point of publishing it.",
      items: [
        {
          title: "No lead or pipeline management",
          text: "No leads, stages, opportunities, quotations, proposals or conversion reporting. Insoora starts at the policy that has already been issued.",
        },
        {
          title: "No outbound messaging",
          text: "It does not send renewal emails, SMS, WhatsApp messages or campaigns, and does not log calls. The renewal list tells you who to contact; contacting them is still you.",
        },
        {
          title: "No custom fields or notes",
          text: "The customer record holds what the platform stores. You cannot add a field, a tag, a segment or a notes timeline of your own.",
        },
        {
          title: "No commission or brokerage tracking",
          text: "Premium figures are recorded as the document states them. Insoora does not calculate commission, split it between sub-agents, or reconcile what an insurer paid you.",
        },
      ],
    },
    {
      kind: "prose",
      id: "choosing",
      accent: "green",
      eyebrow: "Choosing between the two",
      heading: "Which kind of CRM you actually need",
      paragraphs: [
        "The question that settles it is not about features. It is about where your time goes in a normal week.",
        "If most of it goes on finding new customers — chasing enquiries, following up on quotes, keeping track of who you called — then the thing you are missing is a pipeline, and a client record will not give you one.",
        "If most of it goes on servicing customers you already have — finding last year's policy, telling someone what they hold, working out what expires next month, re-typing a schedule into a sheet — then the thing you are missing is a client record, and a pipeline will not give you one either.",
      ],
      h3: [
        {
          heading: "Can you use both?",
          paragraphs: [
            "Yes, and plenty of agencies do: a pipeline tool for prospects and a policy system for the book. There is no integration between Insoora and any CRM, so the handover is manual — you upload the policy PDF once the sale has closed.",
            "That is a real cost and worth naming. It is also a smaller cost than it sounds, because the handover happens once per policy rather than once per conversation.",
          ],
        },
        {
          heading: "What to test before you decide",
          paragraphs: [
            "Upload five policies from the insurers you actually sell, from the oldest-looking documents you have. Extraction quality on your layouts is the only thing about this product that cannot be judged from a page like this one, and it is the thing the whole value depends on.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is Insoora a CRM for insurance agents?",
      a: "It is a client-record CRM: one record per policyholder with every policy they hold, the documents, the expiry dates and an optional portal login. It is not a sales CRM — there is no lead management, no pipeline, no quotation tool and no campaign sending.",
    },
    {
      q: "Can I import my existing customer list?",
      a: "There is no customer-list importer. In practice the customers arrive with the policies: upload the policy PDFs and each one is filed under a customer matched by the mobile number on the document, with unmatched policies queued for you to assign.",
    },
    {
      q: "Does it send renewal reminders to customers?",
      a: "No. Insoora builds a renewal list of policies expiring within the next thirty days and shows a policyholder how long their own cover has left in their portal, but it does not send email, SMS or WhatsApp on your behalf.",
    },
    {
      q: "Can customers see their own records?",
      a: "Yes, if you give them a login. The customer portal is strictly read-only: a policyholder sees a year-wise history of the policies their agent has shared with them and can download the documents, and can only ever see their own.",
    },
    {
      q: "Does the CRM work for an agency with several agents?",
      a: "Yes. An agency account can add sub-agents who upload into one shared book of business, with capabilities granted per person — upload, export, or view only. The agency sees everything; the plan and policy credits belong to the agency.",
    },
    {
      q: "Is there commission tracking for sub-agents?",
      a: "No. Insoora records the premium figures as they appear on the policy document and attributes each upload to the person who made it, but it does not calculate, split or reconcile commission.",
    },
  ],
  related: [
    {
      href: "/insurance-policy-management-software",
      label: "Policy management",
      text: "The same records organised by policy rather than by customer.",
    },
    {
      href: "/customer-portal",
      label: "The customer portal",
      text: "What a policyholder sees when you give them a login.",
    },
    {
      href: "/insurance-agency-management-software",
      label: "Running an agency",
      text: "One book of business across several people, with access granted per person.",
    },
    {
      href: "/insurance-renewal-management-software",
      label: "Renewal tracking",
      text: "Turning a customer record into next month's working list.",
    },
    {
      href: "/blog/how-customers-can-keep-insurance-policies-organized",
      label: "Guide: for policyholders",
      text: "What to tell a customer who wants to keep track of their own cover.",
    },
    {
      href: "/faq",
      label: "Every question answered",
      text: "How extraction, access, storage and pricing actually work.",
    },
  ],
  cta: {
    eyebrow: "Start with the book you have",
    title: "Your customer records are already inside your policy PDFs.",
    lede: "Upload the documents and the client list builds itself, one matched policy at a time.",
    secondary: { href: "/insurance-policy-management-software", label: "See policy management" },
  },
};
