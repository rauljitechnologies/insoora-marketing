import type { SolutionPage } from "../types";

// The pillar page of the eight. Everything else on this shelf is one part of
// what this page describes whole, which is why its `related` block points
// outward to four of them rather than back up to /features.

export const page: SolutionPage = {
  slug: "insurance-policy-management-software",
  group: "solution",
  metaTitle: "Insurance Policy Management Software for Indian Agents | Insoora",
  description:
    "Insurance policy management software that reads policy PDFs, files each one under its customer and builds a renewal list from the policy's own expiry date.",
  accent: "blue",
  badge: "The core of the platform",
  h1: {
    lead: "Insurance policy management software that starts from",
    highlight: "the policy document itself.",
  },
  lede:
    "Most policy management software asks you to type a policy in. Insoora reads the PDF you were already sent, extracts the fields, files the record under the right customer and keeps the original document attached to it — so the record and its evidence never separate.",
  checks: [
    "Policy records built from the document",
    "One customer, every policy they hold",
    "Expiry dates taken from the schedule",
    "Original PDF kept against every record",
  ],
  heroShot: "policyList",
  nav: {
    label: "Policy management",
    hint: "Policy records built from the document itself",
  },
  primaryKeyword: "Insurance Policy Management Software",
  secondaryKeywords: [
    "Insurance Policy Management System",
    "Insurance Policy Tracking Software",
    "Insurance Policy Record Management",
    "Digital Insurance Policy Register",
    "Insurance Business Management Software",
  ],
  sections: [
    {
      kind: "split",
      id: "what-a-policy-record-is",
      accent: "blue",
      eyebrow: "What you are managing",
      heading: "A policy record, and the document it came from",
      lede:
        "The unit of work in Insoora is not a row in a register. It is a policy record with its source document still attached.",
      paragraphs: [
        "When a policy PDF is uploaded, Insoora parses the document's own text layer — or runs OCR over the page when it is a scan with no text — and extracts the fields an agent would otherwise retype: policy number, insurer, insured name, cover start and expiry dates, premium, and vehicle or asset details where the policy has them.",
        "Those fields become a policy record. The original PDF stays attached to it, which is the part that matters when a customer disputes a figure or a claim needs the schedule: the record is a reading of the document, and the document is always there to re-read.",
        "The policy list is the screen an agent works from. It is searchable by customer, insurer, policy number and status, filterable by expiry window, sortable, and its filters live in the URL — so a filtered view can be bookmarked or sent to a colleague who has the same access.",
      ],
      bullets: [
        "Fields the parser cannot read confidently are flagged for review, not filled in with a guess",
        "Every record shows the extracted value beside the page it was read from",
        "Policies are classified by line of business: motor, health, life, travel, property, marine and personal accident",
      ],
      shot: "extracted",
      limit:
        "Insoora does not issue policies, quote premiums, connect to an insurer's system or submit a renewal. It manages the records of policies that have already been issued. Nothing here talks to an insurer.",
    },
    {
      kind: "cards",
      id: "capabilities",
      accent: "purple",
      eyebrow: "What the record gives you",
      heading: "Six things that stop being manual",
      lede:
        "Each of these is a consequence of the record being derived from the document rather than typed beside it.",
      cards: [
        {
          icon: "scan",
          title: "No re-keying",
          text: "The fields come out of the PDF. An agent confirms what was read instead of transcribing a schedule into a form.",
        },
        {
          icon: "search",
          title: "Findable in one search",
          text: "Search by customer, insurer, policy number or status, then filter by expiry window and sort the result.",
        },
        {
          icon: "history",
          title: "Year-on-year history",
          text: "A customer's policies stack up by year with each year's original document kept against it.",
        },
        {
          icon: "bell",
          title: "Renewals from the schedule",
          text: "The 30-day renewal list is built from the expiry date printed on the policy, not from a reminder someone set.",
        },
        {
          icon: "lock",
          title: "Access decided by role",
          text: "Agents, sub-agents, policyholders and administrators each reach only what their role permits, checked on the server.",
        },
        {
          icon: "download",
          title: "Your data, exportable",
          text: "Authorised agents export policy and renewal lists as CSV or Excel, following the same access rules as the screen.",
        },
      ],
    },
    {
      kind: "steps",
      id: "lifecycle",
      accent: "teal",
      eyebrow: "The lifecycle",
      heading: "What happens to one policy, from PDF to renewal",
      lede:
        "Five stages. The first four happen once per document; the fifth happens every day without anyone doing anything.",
      steps: [
        {
          title: "The document arrives",
          text: "Upload one PDF or a few hundred. Each file is checked, classified as an insurance document or rejected before any extraction runs, and queued.",
        },
        {
          title: "The fields are read",
          text: "Deterministic rules run first — label and value pairs, tables, date and amount parsers, arithmetic checks such as net premium plus GST, and per-insurer templates. Most normal policies are extracted without any AI call at all.",
        },
        {
          title: "Anything unclear is flagged",
          text: "A field the parser could not read confidently is marked for review and shown beside the page it came from. You confirm or correct it; the document stays the source of truth.",
        },
        {
          title: "It files itself under the customer",
          text: "The mobile number on the policy is matched against the numbers you hold on record. A policy that cannot be matched waits to be assigned rather than landing on the wrong customer.",
        },
        {
          title: "It appears on the renewal list",
          text: "From the expiry date on the schedule. A policy uploaded a year ago and forgotten about still turns up thirty days before it ends.",
        },
      ],
      shot: "reviewFlag",
    },
    {
      kind: "split",
      id: "customer-view",
      accent: "pink",
      eyebrow: "The other end",
      heading: "The policyholder sees the same records",
      lede:
        "A policy record is only half useful if the customer still has to ring you for a copy of their own policy.",
      paragraphs: [
        "Every policyholder can be given a login to their own portal, where they see a year-wise history of the policies their agent has shared with them and can download the original PDFs. The portal is strictly read-only: a customer account holds no write permission anywhere in the system, so there is no action there that could change a record.",
        "A policyholder sees only the policies assigned to them, never another customer's. That boundary is enforced on the server for every request, not by hiding a button.",
      ],
      bullets: [
        "A year-wise list of everything shared with them, with the documents",
        "How long each cover has left, read from the policy",
        "Registration by the mobile number their agent already holds on record",
      ],
      shot: "vault",
      limit:
        "The customer portal cannot renew, pay for, endorse or cancel a policy. It shows records and documents. Renewing is still a conversation with the agent.",
    },
    {
      kind: "table",
      id: "register-vs-software",
      accent: "orange",
      eyebrow: "The comparison that matters",
      heading: "A spreadsheet register against a policy record",
      lede:
        "Most Indian agencies manage policies in Excel today, and it works until one of these five things happens.",
      columns: ["The situation", "In a spreadsheet register", "With a policy record"],
      rows: [
        [
          "A customer asks for last year's policy",
          "Search a shared drive or an email thread for a filename nobody standardised.",
          "Open the customer, open the year, download the document kept against that record.",
        ],
        [
          "A policy was endorsed mid-term",
          "The sheet still shows the old expiry. Nothing anywhere flags the disagreement.",
          "Re-read the revised document and the record updates with it; the old document is still there.",
        ],
        [
          "Two people are entering policies",
          "Two copies of the sheet, or one that is locked whenever the other has it open.",
          "One book of business. Sub-agents upload into it and the agency sees all of it.",
        ],
        [
          "You want to know what expires in March",
          "Sort by a date column that was typed by hand, and hope every row was typed right.",
          "Filter by expiry window. The dates were read off the schedules.",
        ],
        [
          "A figure is questioned",
          "The cell says ₹12,450 and nothing says where that came from.",
          "The field is shown beside the page of the PDF it was extracted from.",
        ],
      ],
      note:
        "None of this makes a spreadsheet wrong for a book of forty policies maintained by one person. It makes it a liability for four hundred maintained by four.",
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "Before you commit a book of business",
      heading: "What this software does not do",
      lede:
        "Stated here rather than discovered after you have uploaded three hundred policies.",
      items: [
        {
          title: "It is not connected to any insurer",
          text: "There is no integration with an insurer's portal or API. Insoora reads the documents an insurer has already issued. It cannot fetch a policy, issue one, or submit a renewal on your behalf.",
        },
        {
          title: "Extraction accuracy depends on the document",
          text: "Insurer-issued digital PDFs read best. Photographs of printed policies and low-quality scans read worst. Insoora publishes no accuracy percentage because it does not measure one it could stand behind.",
        },
        {
          title: "There is no commission or accounting module",
          text: "Policy and premium figures are recorded as they appear on the document. Insoora does not calculate commission, raise invoices, reconcile brokerage or post to a ledger.",
        },
        {
          title: "Security has stated gaps",
          text: "Policy PDFs sit in private storage behind expiring links and all traffic is over HTTPS, but there is no multi-factor authentication yet, no security certification, no penetration test, and no published data-retention schedule.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is insurance policy management software?",
      a: "Insurance policy management software keeps the records of policies an agent or agency has sold: who holds each policy, with which insurer, what it covers, what it cost and when it ends, with the policy document attached. Insoora builds those records by reading the policy PDF rather than asking you to type the details in, and tracks expiry from the date printed on the schedule.",
    },
    {
      q: "Does Insoora replace my insurer's portal?",
      a: "No. Insurer portals are where policies are issued and serviced; Insoora is where the policies you have already sold are organised. There is no integration between the two — you upload the PDF the insurer issued, and Insoora reads it.",
    },
    {
      q: "Which types of insurance policies can it manage?",
      a: "Policies are classified by line of business: motor, health, life, travel, property, marine and personal accident. Extraction quality is highest on insurer-issued digital PDFs from Indian insurers and lower on scans and photographs, and it is honest to expect motor and health layouts to read better than unusual commercial ones.",
    },
    {
      q: "Can two people manage the same book of policies?",
      a: "Yes. An agency account can add sub-agents who upload into the same book of business. The agency sees all of it; each sub-agent sees and does only what its granted capabilities allow, and the plan and policy credits belong to the agency rather than to any individual.",
    },
    {
      q: "What happens to a policy whose expiry date could not be read?",
      a: "The field is flagged as needing review rather than guessed at, and the policy waits for a human to confirm the date beside the page it was read from. Until it is confirmed, that policy's place on the renewal list is only as reliable as the extraction — which is why confirming flagged fields is the one habit the renewal list depends on.",
    },
    {
      q: "Can I get my policy data out again?",
      a: "Authorised agents export policy and renewal lists as CSV or Excel. An export follows the same access rules as the screen it came from, so it can never contain a policy the person could not already open.",
    },
  ],
  related: [
    {
      href: "/insurance-policy-entry-software",
      label: "Policy entry and data extraction",
      text: "How the fields actually come out of a PDF, and what happens when they cannot be read.",
    },
    {
      href: "/insurance-renewal-management-software",
      label: "Renewal and expiry tracking",
      text: "Which dates matter, where they come from, and why a list beats a reminder.",
    },
    {
      href: "/insurance-crm-software",
      label: "Customer and client records",
      text: "The same records organised by policyholder rather than by policy.",
    },
    {
      href: "/agent-portal",
      label: "The agent portal, screen by screen",
      text: "Every screen an agent works in, drawn with sample data.",
    },
    {
      href: "/features",
      label: "Every feature, with its limits",
      text: "The full capability list, each one with what it does not do.",
    },
    {
      href: "/blog/organize-insurance-policy-documents-digitally",
      label: "Guide: organizing policy documents",
      text: "A filing method that works whether or not you use software for it.",
    },
  ],
  cta: {
    eyebrow: "Try it on your own policies",
    title: "Upload three policy PDFs and see what it reads.",
    lede: "That is the only honest way to judge how well it handles your insurers' layouts.",
    secondary: { href: "/how-it-works", label: "See the seven steps" },
  },
};
