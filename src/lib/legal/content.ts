// Privacy Policy and Terms & Conditions content.
//
// Held as data rather than markup so both pages share one renderer, the
// numbering and anchors stay consistent, and the table of contents is derived
// rather than maintained by hand.
//
// IMPORTANT — these are a drafting starting point, not finished legal text.
// `review` marks a statement that cannot be published until someone confirms
// it against the real business: a legal entity name, a hosting region, a
// retention period. Those notes render as visible callouts (see
// `LEGAL_REVIEW_VISIBLE`) precisely so they cannot be shipped unnoticed.
// Nothing here was invented to fill a gap — where a fact is unknown, the
// section says so instead of guessing.

export interface LegalSection {
  heading: string;
  /** Paragraphs, in order. */
  body: string[];
  /** Optional bullet list, rendered after the paragraphs. */
  list?: string[];
  /** What a human must confirm before this section can be published. */
  review?: string;
}

export interface LegalDocument {
  title: string;
  /** Shown under the title; the date the wording last changed. */
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Whether the "needs review" callouts are shown.
 *
 * On by default, and the only way to turn them off is to set
 * LEGAL_REVIEW_FLAGS=off in the environment — a deliberate act by whoever has
 * actually completed the review, rather than something that quietly flips
 * when the site is built for production.
 */
export const LEGAL_REVIEW_VISIBLE = process.env.LEGAL_REVIEW_FLAGS !== "off";

/** Changed when the wording changes, not when the page is edited. */
const LAST_UPDATED = "13 October 2026";

export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  updated: LAST_UPDATED,
  intro:
    "How Insoora handles information when you use our website and the platform for insurance agents, sub-agents and their customers.",
  sections: [
    {
      heading: "Who we are",
      body: [
        "This Privacy Policy explains how Insoora (“we”, “us”) handles information when you use our website and the Insoora platform for insurance agents, sub-agents and their customers.",
      ],
      review: "Insert the legal entity name, registered address and grievance officer details.",
    },
    {
      heading: "Information we collect",
      body: ["We collect only what is needed to run the service:"],
      list: [
        "Account information: name, email address, mobile number and role (agent, sub-agent, customer or admin).",
        "Insurance policy documents uploaded by agents, and the details extracted from them (such as policy number, insurer, insured name, vehicle registration, dates and premium).",
        "Contact form enquiries: name, email, optional phone, enquiry type and message.",
        "Basic technical data such as IP address, browser type and sign-in times, used for security.",
      ],
      review: "Confirm against the database schema and logs which fields are actually stored.",
    },
    {
      heading: "How we use information",
      body: [
        "We use information to provide and secure the service — reading uploaded policies, organizing them by customer, showing renewal dates, signing users in, processing subscriptions and responding to enquiries. We do not sell personal information.",
      ],
    },
    {
      heading: "Policy documents and extracted data",
      body: [
        "Policy documents are uploaded by agents who confirm they are authorized to do so. Details are extracted automatically and may contain errors; the original document remains the source of truth. Customers can see only the policies their agent has shared with them.",
      ],
    },
    {
      heading: "Storage and access controls",
      body: [
        "Documents are kept in private storage and opened through short-lived links. Access is limited by role, and connections use HTTPS.",
      ],
      review: "Confirm hosting region, storage provider and encryption-at-rest status before stating them.",
    },
    {
      heading: "Third-party services",
      body: [
        "We use service providers to host the platform, store files, process payments and send email. They process data only to provide those services to us.",
      ],
      review: "List the actual providers in use (hosting, storage, OCR, payment gateway, email).",
    },
    {
      heading: "Data retention and deletion",
      body: [
        "We keep information for as long as an account is active and as needed for legal and accounting obligations. You can request deletion of your account information.",
      ],
      review: "Set specific retention periods for documents, extracted data, logs and contact enquiries.",
    },
    {
      heading: "Your rights and requests",
      body: [
        "You may ask to access, correct or delete your personal information, or withdraw consent, by contacting us. Customers should contact their agent first for corrections to policy records.",
      ],
      review: "Confirm obligations under India’s Digital Personal Data Protection Act, 2023 with legal counsel.",
    },
    {
      heading: "Cookies and analytics",
      body: ["We use cookies that are necessary to keep you signed in and to protect the service."],
      review: "State whether any analytics or marketing cookies are used; add a consent banner if so.",
    },
    {
      heading: "Contact for privacy questions",
      body: ["For privacy questions or requests, use our Contact Us page and choose “Account support”."],
      review: "Add a dedicated privacy email address once confirmed.",
    },
    {
      heading: "Changes to this policy",
      body: [
        "We may update this policy. Material changes will be announced on the website or by email before they take effect, and the date above will change.",
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  title: "Terms & Conditions",
  updated: LAST_UPDATED,
  intro: "The terms that apply when you create an account or use the Insoora platform.",
  sections: [
    {
      heading: "Acceptance of terms",
      body: [
        "By creating an account or using Insoora you agree to these Terms. If you use Insoora for an agency, you confirm you can accept them on its behalf.",
      ],
      review: "Insert the contracting legal entity name.",
    },
    {
      heading: "Accounts",
      body: [
        "You are responsible for keeping your sign-in details confidential and for activity under your account. Tell us promptly if you suspect unauthorized access.",
      ],
    },
    {
      heading: "Permitted use",
      body: ["Use Insoora only to manage insurance policies you are authorized to handle. You must not:"],
      list: [
        "upload documents you have no right to share;",
        "attempt to access other users’ data;",
        "interfere with or reverse-engineer the service;",
        "use the service for unlawful purposes.",
      ],
    },
    {
      heading: "Your documents and data",
      body: [
        "You keep ownership of documents and information you upload. You confirm you have the customer’s permission to upload their policies, and you grant us the limited rights needed to store, process and display them to authorized users.",
      ],
    },
    {
      heading: "Automated extraction accuracy",
      body: [
        "Policy details are extracted automatically and may be incomplete or incorrect, especially from unclear documents. Fields may be marked for review. You are responsible for checking important details — such as policy numbers, dates and coverage — against the original document before relying on them.",
      ],
    },
    {
      heading: "Subscriptions and billing",
      body: ["Paid plans are billed as shown at checkout. Prices and plan features may change with notice."],
      review: "Define billing cycle, taxes (GST), refund and cancellation rules. None are assumed here.",
    },
    {
      heading: "Availability and changes",
      body: [
        "We aim to keep Insoora available but do not guarantee uninterrupted service. We may add, change or remove features and will give reasonable notice of significant changes.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The Insoora software, design and brand belong to us. These Terms do not transfer any of those rights to you.",
      ],
    },
    {
      heading: "Suspension and termination",
      body: [
        "You may stop using Insoora at any time. We may suspend or close accounts that breach these Terms or put the service or other users at risk.",
      ],
      review: "Decide what happens to documents after an account is closed and for how long they can be exported.",
    },
    {
      heading: "Liability",
      body: ["Insoora is a record-keeping tool and does not provide insurance advice."],
      review: "Liability limits, indemnity, governing law and dispute resolution require legal drafting.",
    },
    {
      heading: "Contact",
      body: ["Questions about these Terms can be sent through our Contact Us page."],
    },
  ],
};

/** A stable anchor per section: "1-who-we-are". */
export function sectionId(index: number, heading: string): string {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${index + 1}-${slug}`;
}
