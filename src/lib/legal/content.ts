// Privacy Policy, Terms & Conditions and the Refund & Cancellation draft.
//
// Held as data rather than markup so the three pages share one renderer, the
// numbering and anchors stay consistent, and each table of contents is
// derived rather than maintained by hand.
//
// ── What "verified" means in this file ────────────────────────────────────
//
// Every factual statement below about what the platform stores, where it
// stores it and what protects it was read out of the product's own source
// before it was written here — the Prisma schema, the download and upload
// routes, the settings models and the deployment blueprint. Where the code
// says a control is OFF BY DEFAULT, this text says so too rather than
// describing the configuration somebody might have chosen.
//
// `review` marks a statement that cannot be finished without a fact or a
// decision that is NOT in the code: a company identification number, a
// designated officer, a commercial refund rule. Those render as visible
// callouts (see `LEGAL_REVIEW_VISIBLE`) precisely so they cannot ship
// unnoticed. Nothing here was invented to fill a gap — where a fact is
// unknown, the section says so instead of guessing.
//
// IMPORTANT — this is drafting grounded in the implementation, not legal
// advice, and publishing it does not make the business compliant with the
// DPDP Act, the SPDI Rules or the Consumer Protection Act.

import { CONTACT } from "@/lib/contact";

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
  /** The same date as YYYY-MM-DD, for the `datetime` attribute.
   *
   *  `<time>13 October 2026</time>` with no `datetime` is not machine
   *  readable — the element's own text is only valid as a date in a handful
   *  of formats, and a long-form English date is not one of them. Held
   *  beside the printed form so the two cannot drift. */
  updatedIso: string;
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

/** Changed when the wording changes, not when the page is edited. Both
 *  forms of the same date: one for a reader, one for a parser.
 *
 *  One pair per document rather than one shared pair, because they do not
 *  change together. Dating the Terms to the day the privacy policy was
 *  rewritten would announce a change to them that nobody made. */
const PRIVACY_UPDATED = "29 October 2026";
const PRIVACY_UPDATED_ISO = "2026-10-29";
const TERMS_UPDATED = "29 October 2026";
const TERMS_UPDATED_ISO = "2026-10-29";
const REFUND_UPDATED = "29 October 2026";
const REFUND_UPDATED_ISO = "2026-10-29";

/** The one sentence that identifies the operator, used by all three documents.
 *
 *  Reads `lib/contact` rather than repeating the company name, so the footer
 *  attribution and the legal documents cannot disagree about who runs the
 *  service. */
const OPERATOR = `Insoora is a software product ${CONTACT.managedBy.replace(/^Managed by /, "managed by ")}`;

export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  updated: PRIVACY_UPDATED,
  updatedIso: PRIVACY_UPDATED_ISO,
  intro:
    "What Insoora collects, why, where it is processed, who can reach it and how long it is kept — written against how the platform is actually built.",
  sections: [
    {
      heading: "Who we are and what this covers",
      body: [
        `${OPERATOR}. It is a policy management and document organization tool for insurance agents, their sub-agents and their customers.`,
        "Insoora is not an insurance company, an insurer, an insurance broker or a licensed insurance intermediary. We do not underwrite policies, sell insurance, collect premiums on an insurer's behalf or decide claims. Your policy is a contract between you and your insurer; Insoora only helps the people you deal with keep the paperwork in order.",
        "This policy covers two things: this public website (www.insoora.com) and the signed-in platform (app.insoora.com). Where they differ — and on cookies they differ a lot — the section says which one it is talking about.",
      ],
      review:
        "Confirm the full registered name, the Corporate Identity Number (CIN), the registered office address and the GSTIN of the contracting company, and add them here. None of those has been verified, so none is printed. Also confirm whether any Insoora or Raulji Technologies entity holds an IRDAI registration — if it does, this section and the Terms both need redrafting by counsel, because the IRDAI (Protection of Policyholders’ Interests, Operations and Allied Matters of Insurers) Regulations, 2024 would then apply directly rather than only flowing down through the agents who use the platform.",
    },
    {
      heading: "Information we collect",
      body: [
        "We collect what the service needs to work. The list below was checked field by field against the platform's database schema, so it describes what is actually stored rather than a general category.",
        "Account and sign-in information:",
      ],
      list: [
        "Your name, email address, mobile number and role (agency/agent, sub-agent, customer, or platform staff), and an agency or company name where you give one.",
        "Your password, stored only as a bcrypt hash — never the password itself. If you set an mPIN for quick sign-in, it is hashed the same way.",
        "A date of birth, for customer accounts only. It is collected so support can verify who is asking before discussing a policy. Agents and staff accounts do not have one.",
        "For a sub-agent, which agency the account belongs to and which permissions that agency granted it.",
        "Sign-in records: the time of your last sign-in, and for each active session an expiry time, the IP address and the browser user-agent string. The session cookie's value is stored only as a SHA-256 hash.",
      ],
      review:
        "This list is accurate against the schema as read on 29 October 2026. It must be re-read whenever a migration adds a column that holds personal data — a new field is otherwise collected without being disclosed.",
    },
    {
      heading: "Policy documents and the details read out of them",
      body: [
        "When an agent uploads an insurance policy PDF, we store the file itself and the details read out of it. Specifically:",
      ],
      list: [
        "The document: the uploaded file, the name it arrived under, its size, page count, content type and a SHA-256 checksum, plus the processing state and any error recorded while reading it.",
        "The policyholder record the document is filed under: name, postal address, city, state, PIN code, mobile number, email address and date of birth where the document or the agent supplies them.",
        "PAN and Aadhaar numbers, where present. These are encrypted at rest with AES-256-GCM; only the last four digits are kept in readable form, so a record can be matched and displayed without exposing the full number.",
        "The policy: insurer, policy number, policy type and product name, issue, start and expiry dates, status, UIN and invoice number, nominee name and relationship, premium and tax amounts, coverage, add-ons and — for motor policies — vehicle and registration details.",
        "Processing records: which extraction runs were attempted, the confidence of individual extracted fields, corrections a person made afterwards, and files in an upload batch that were refused (for example a duplicate or an oversized scan) along with the reason.",
      ],
      review:
        "PAN and especially Aadhaar need a legal decision before this is published, and it is the most significant one on this page. Section 57 of the Aadhaar Act was struck down in Justice K.S. Puttaswamy v. Union of India (2018), and the Supreme Court held that collection and storage of identity information for private purposes cannot be handed to private parties. Encrypting the number does not by itself make storing it lawful. Counsel should decide whether Insoora should store Aadhaar numbers at all, or stop at the last four digits, or drop the field entirely — and if the field is retained, on what lawful basis. Until that decision is made this paragraph describes a practice that may need to change.",
    },
    {
      heading: "Website, support and billing information",
      body: ["Separately from the platform, we hold:"],
      list: [
        "Contact form enquiries: your name, email address, optional phone number, enquiry type and message, plus the IP address and browser user-agent of the submission, which are kept only to investigate abuse and are never shown publicly.",
        "Support conversations and requests you send us, including anything you choose to put in them.",
        "Billing records for paid accounts: the amount charged, the currency, the order and payment reference, the payment status, any discount applied, and refund details where a refund was made. We do not store your card number, UPI ID or bank details — those are handled by the payment gateway and never reach us.",
        "Security and operational logs, and an audit trail of significant actions in the platform — including who opened or downloaded which document, and when.",
      ],
    },
    {
      heading: "Why we process it",
      body: ["We process this information to:"],
      list: [
        "create and maintain user accounts, and sign you in;",
        "organize insurance documents and file them under the right policyholder;",
        "read policy details out of uploaded documents and display them;",
        "associate each document with the correct customer record and account;",
        "let authorized users search, open, download and export their own records, and track upcoming expiries and renewals;",
        "operate, monitor and secure the service, and investigate misuse;",
        "take payment for paid plans, apply credits and handle refunds;",
        "answer enquiries and provide support; and",
        "meet obligations that apply to us under law.",
      ],
    },
    {
      heading: "We do not sell your data, and we do not use it for advertising",
      body: [
        "Uploaded insurance documents and the policy data read out of them are not sold, rented or traded, and are not used for advertising, ad targeting, profiling or unrelated marketing. We do not share them with data brokers, and we do not share them with insurers or anyone else to generate leads.",
        "That is a commitment about what we do with the data, not a claim that it is never disclosed to anyone. It can be disclosed in the limited circumstances in the next two sections — to the service providers that run the platform, and where the law requires it.",
      ],
    },
    {
      heading: "Service providers we actually use",
      body: [
        "Running the platform means other companies process some data on our behalf. These are the ones actually in use, read from the deployment configuration rather than listed generically:",
      ],
      list: [
        "Application hosting: Render, in its Singapore region.",
        "Database: Neon (managed PostgreSQL), kept in the same Singapore region as the application.",
        "Document storage: Cloudflare R2, an S3-compatible object store. The bucket is private and requires no public access.",
        "Payments: Cashfree Payments, which processes card, UPI and other payment instrument details directly. Payment credentials are never sent to the browser and the gateway's raw response is stored with secrets stripped out.",
        "Website analytics: Google Analytics 4 and Google Tag Manager — on this public website only, and only if you accept analytics cookies. See the cookies section.",
      ],
      review:
        "Confirm that written data-processing terms are in place with Render, Neon, Cloudflare and Cashfree, and that each is named on an internal register of processors. The DPDP Rules, 2025 require a Data Fiduciary to have contractual provisions obliging its processors to take reasonable security safeguards (Rule 6(1)(f)); that rule commences on 13 May 2027, so this is a prepare-now obligation rather than a live one.",
    },
    {
      heading: "Reading documents: where extraction happens",
      body: [
        "Policy details are read out of your documents on our own servers by default. The primary engine is deterministic — it works from the document's own text and from per-insurer templates — and where a page has no usable text it is put through optical character recognition that runs in the application itself (Tesseract).",
        "The platform can also be configured to use third-party document and AI services: AWS Textract, Google Document AI or Azure Document Intelligence for OCR, and OpenAI, DeepSeek or Anthropic for extraction. All of these are off unless an administrator explicitly turns them on and supplies credentials. In the current production configuration AI extraction is disabled and the default processing mode is local-only, so document content is not sent to an external AI provider.",
        "If that changes — if a cloud OCR or AI provider is switched on — then document content would be sent to that provider for processing, and this section and the provider list above must be updated before it is.",
      ],
      review:
        "This describes the configuration as deployed. Whoever enables a cloud OCR or AI provider in the admin panel must update this section on the same day, because the admin panel can change what leaves our servers without any code change.",
    },
    {
      heading: "Where your data is processed",
      body: [
        "Insoora's servers, database and document storage are outside India. The application and the database run in Singapore, and documents are held in Cloudflare's object storage.",
        "We say this plainly because it matters and because the opposite is often assumed: your policy documents and policy data are not stored exclusively in India.",
      ],
      review:
        "Confirm the Cloudflare R2 bucket's actual location or jurisdiction hint — R2 reports its region as “auto”, so the storage location is not evident from the configuration and has to be read from the Cloudflare dashboard. Also note for counsel: Rule 15 of the DPDP Rules, 2025 permits transfer outside India subject to any requirements the Central Government may specify by order; no such order is known at the date above, and Rule 15 itself commences on 13 May 2027.",
    },
    {
      heading: "When we may have to disclose information",
      body: [
        "We may disclose information where we are legally required to, or where disclosure is otherwise lawfully permitted — for example in response to a valid order, summons or statutory demand from a court, a regulator or a law enforcement agency, or where it is necessary to establish, exercise or defend a legal claim, or to investigate fraud or a threat to the safety of the service or its users.",
        "This is not a route for commercial sharing, and it is not a licence for us to hand over documents on request without checking that the request is valid.",
      ],
    },
    {
      heading: "Who can see what: roles and access",
      body: [
        "Access depends on the role of the account and on the relationships between accounts:",
      ],
      list: [
        "An agency (agent) account holds the plan and the records, and can see the policies it and its sub-agents uploaded.",
        "A sub-agent belongs to exactly one agency and works inside it. What a sub-agent may do — upload, assign a policy to a customer, export — is a set of permissions the agency grants, and every one of them is checked on the server for each request.",
        "A customer sees only the policies an agent has assigned to that customer's account. The customer role is read-only: it can view and download, and cannot upload, edit, assign or export.",
        "Platform staff roles (administrator, support, reviewer, viewer) can reach records across accounts, because operating and supporting the service requires it.",
      ],
      review:
        "Two things to settle rather than assert. First, administrative access is not currently restricted to named individuals with documented justification — there is a role model, but no access-review process. Second, you should decide and then state how long staff retain access and who reviews it.",
    },
    {
      heading: "How we protect it",
      body: [
        "These are the protections that exist in the code today. Nothing is listed here that was not verified.",
      ],
      list: [
        "Everything travels over HTTPS, and in production the session cookie is marked Secure and is bound to a single host. Sessions expire after 12 hours.",
        "Passwords and mPINs are stored as bcrypt hashes. Session tokens are stored only as SHA-256 hashes, so the stored value cannot be replayed as a cookie.",
        "PAN and Aadhaar numbers are encrypted at rest with AES-256-GCM. So are the credentials the platform holds for storage, OCR, AI and payment providers; the admin screens show a masked hint and never return the secret.",
        "Uploaded documents are held in private object storage. Their storage keys are generated by the server and never derived from a filename you supply, there are no public or permanent document URLs, and the bucket needs no public access.",
        "Every download is streamed through a route that authenticates the request and checks authorization first, and responses are marked private and no-store. Where the platform issues a link to view a file, that link is signed, bound to the requesting user's account, and expires in five minutes.",
        "Access to a document is resolved through the record that owns it, so a request for someone else's document does not resolve at all — and it returns “not found” rather than “forbidden”, which avoids confirming that an identifier exists.",
        "The platform checks the request origin on state-changing requests (a CSRF defence), and rate-limits uploads and enquiries.",
        "Significant actions are written to an audit log, which is on by default, and that includes recording every document download.",
      ],
      review:
        "Several things must NOT be claimed, and are not: Insoora has not been independently audited or certified, has no ISO 27001 certification, has not been penetration-tested, and does not use end-to-end encryption. No system is completely secure. Three gaps need work rather than wording: (1) Rule 8 of the SPDI Rules, 2011 — in force today — expects security practices documented to ISO 27001 or another notified standard, audited annually; that documentation does not exist yet. (2) There is no written incident-response or breach-notification procedure, and from 13 May 2027 Rule 7 of the DPDP Rules will require affected individuals to be told without delay and the Data Protection Board to be given full details within 72 hours. (3) Backups exist by way of the managed database and object store, but there is no documented, tested restore procedure.",
    },
    {
      heading: "How long we keep it",
      body: [
        "The platform is built to keep policy records available, because that is what it is for: an agent needs to find a policy issued years ago, and a customer needs the document for a claim. So by default nothing is deleted automatically. The platform has settings for a retention period and for clearing out failed uploads, and both are switched off in the default configuration — which means uploaded documents, extracted policy data and the audit trail are kept for as long as the account exists and the records are needed.",
        "Two specifics worth stating. If a customer's subscription lapses, the customer may lose the ability to open and download policies, but the policies themselves are not deleted. And the stored PDF is normally a compressed version of the file you uploaded: compression is on by default and the compressed copy replaces the original, so the stored document is the insurer's document but is not necessarily byte-for-byte the file that was sent to us.",
        "We will not promise indefinite storage, and we will not promise instant deletion. When a deletion request is made, records may still be retained where we are required to keep them by law, where they are needed for accounting or tax, where they are needed to resolve a dispute, or for the time it takes for backups to expire on their normal cycle.",
      ],
      review:
        "This is honest about there being no retention schedule, which is not the same as having one. The business needs to decide and then document: how long a closed account's documents and extracted data are kept; how long security and audit logs are kept; how long contact enquiries are kept; and how long backups are retained. Note two DPDP points for the schedule, both commencing 13 May 2027: Rule 6(1)(e) requires logs and personal data to be retained for one year for breach detection and investigation, and Rule 8(3) requires personal data and processing logs to be kept for at least one year. The Third Schedule's three-year erasure duty does not apply to Insoora — it is limited to e-commerce entities with at least two crore registered users, online gaming intermediaries with at least fifty lakh, and social media intermediaries with at least two crore.",
    },
    {
      heading: "Your choices and requests",
      body: [
        "You can ask us to give you a copy of the personal information we hold about you, to correct it if it is wrong, to delete it, or to withdraw a consent you gave. You can also ask what we are doing with it and why.",
        "If you are a policyholder and a policy record is wrong, start with your insurance agent. The agent holds the record, uploaded the document and is the only one who can change the policy details — and for anything about the policy itself, the insurer's own document and the insurer's own records are authoritative, not ours.",
        "To make a request, use the Contact Us page and choose “Account support”, or call the office number. We will ask for enough information to be satisfied that the request is really coming from you, because acting on an unverified request about someone else's policy data would be the worse failure.",
      ],
      review:
        "This describes the only intake that exists, and that is itself the gap: there is no dedicated privacy or data-request route, no request-tracking workflow in the platform, no record of who asked for what and when, and no defined response time. Rule 14 of the DPDP Rules, 2025 will require the means of making such a request to be published, and a grievance redressal system that responds within ninety days; Rule 9 will require the business contact information of a Data Protection Officer or of a person who can answer questions about processing to be published on the site and repeated in every reply. Both commence 13 May 2027. Separately and already in force, Rule 5(9) of the SPDI Rules, 2011 requires a designated Grievance Officer's name and contact details to be published on the website, with grievances resolved within one month — that designation has not been made.",
    },
    {
      heading: "Cookies and analytics",
      body: [
        "On the signed-in platform, cookies are used only to keep you signed in and to protect the service against cross-site request forgery. Those are necessary for it to work, and there is no analytics or advertising tag inside the platform.",
        "On this public website we would like to count visits and see which pages are read, using Google Analytics 4 loaded through Google Tag Manager. Those are not necessary cookies, so they do not load until you accept them. Until you choose, no analytics script is loaded and no analytics cookie is set; if you decline, the choice is remembered and nothing loads. You can change your mind at any time from the “Cookie settings” link in the footer.",
        "Google Analytics gives us visitor counts and page reports. It is not used to identify you, and it never sees a policy document or any detail extracted from one — it runs on these public marketing pages only.",
      ],
      review:
        "Two standing cautions. Google Tag Manager can be made to load a new tag from its own dashboard without any change to this website's code, so this section and the provider list must be re-read whenever a tag is added to container GTM-5943B5QG — the consent gate blocks the container until consent, but it cannot vet what the container then fires. And confirm with counsel whether the consent wording and the decline path are sufficient for visitors outside India, since this gate was built to the stricter prior-consent standard rather than to a specifically Indian requirement.",
    },
    {
      heading: "Children",
      body: [
        "Insoora is a business tool for insurance agents and their customers. It is not directed at children, and accounts are intended for adults. We do not knowingly create an account for a child.",
        "An uploaded policy document may legitimately contain a child's details — a child named as an insured person or a nominee on a family policy, for example. We process that as part of the document, and not to profile or advertise to anyone.",
        "If you believe a child's personal data has reached us in a way it should not have, contact us and we will look into it.",
      ],
      review:
        "A decision is needed, with counsel, before the DPDP children's provisions commence on 13 May 2027. Rule 10 will require verifiable parental consent before processing a child's personal data, with due diligence that the person consenting is an identifiable adult; the Act treats anyone under 18 as a child, and bars tracking, behavioural monitoring and targeted advertising directed at children. The platform has no age gate and no parental-consent mechanism, and the position of child data arriving incidentally inside a policy document — rather than being collected from the child — needs a legal view rather than an assumption.",
    },
    {
      heading: "Contact us about privacy",
      body: [
        `For any question or request about privacy, use the Contact Us page and choose “Account support”, or call ${CONTACT.phone}. The contact person for enquiries is ${CONTACT.contactPerson}.`,
        `Our office is at ${CONTACT.address.street}, ${CONTACT.address.street2}, ${CONTACT.address.city}, ${CONTACT.address.state} ${CONTACT.address.postalCode}, ${CONTACT.address.country}.`,
      ],
      review:
        "No email address is published because there is no monitored mailbox for this yet, and publishing an address that bounces is worse than publishing none. Set up a privacy mailbox and add it here. Note that the platform has no email-sending provider configured at all, which means replies to enquiries are sent manually and the password-reset flow's delivery route should be confirmed. Also confirm whether the contact person named above is to be formally designated as Grievance Officer — this policy deliberately claims no statutory role for him.",
    },
    {
      heading: "Changes to this policy",
      body: [
        "We may update this policy as the platform changes or as the law commences in stages. When we make a material change we will say so on the website, and the date at the top of this page will change.",
        "This page is versioned in the website's source code, so the wording that was live on any given date can be established if it is ever disputed.",
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  title: "Terms & Conditions",
  updated: TERMS_UPDATED,
  updatedIso: TERMS_UPDATED_ISO,
  intro: "The terms that apply when you create an Insoora account or use the platform.",
  sections: [
    {
      heading: "Who you are contracting with",
      body: [
        `${OPERATOR}. These Terms are between you and that company.`,
        "By creating an account or using Insoora you agree to them. If you are using Insoora for an agency or a business, you confirm you are authorized to accept these Terms on its behalf, and “you” then means that organisation as well as you personally.",
      ],
      review:
        "Insert the contracting company's full registered name, CIN, registered office and GSTIN once confirmed, and state the governing law and the courts or forum for disputes. None of those is asserted here.",
    },
    {
      heading: "What Insoora is — and what it is not",
      body: [
        "Insoora is a policy management and document organization tool. It stores insurance policy documents, reads details out of them, files them against the right policyholder and helps you find them again and see what is due for renewal.",
        "Insoora is not an insurance company, an insurer, an insurance broker or a licensed insurance intermediary. We do not sell insurance, give insurance advice, underwrite risk, collect premium on an insurer's behalf, or decide claims.",
        "Insoora is not a substitute for the insurer's own documents. The insurer's policy schedule, its endorsements, its terms and its records are authoritative. Insoora does not guarantee that cover exists, that a claim will be approved, that a policy will be renewed, or anything else that is the insurer's decision. If what Insoora shows you and what your insurer's document says disagree, the insurer's document governs.",
      ],
    },
    {
      heading: "Accounts and the roles in them",
      body: [
        "The platform has distinct roles and the responsibilities differ:",
      ],
      list: [
        "An agency or agent account is the account of record. It holds the plan, it owns the policy records it and its sub-agents create, and it is responsible for what is uploaded under it.",
        "A sub-agent acts within one agency and only within the permissions that agency grants. The agency is responsible for which permissions it grants and to whom.",
        "A customer account is read-only: it views and downloads the policies an agent has assigned to it.",
        "You are responsible for keeping your sign-in details, and your mPIN if you set one, confidential, and for what happens under your account. Tell us promptly if you think someone else has access.",
      ],
    },
    {
      heading: "Uploading documents: your authority to do so",
      body: [
        "This is the most important obligation in these Terms, because it is the one the platform cannot check for you.",
        "When you upload a document you confirm that you have the right to upload it and to have us process the personal information in it. If the document is somebody else's policy, that means you have the permission or other lawful basis you need to share their policy and their personal details with us — and if the law requires their consent, that you have it.",
        "You must not upload a document you have no right to share, and you must not use the platform to collect or hold policy data about people you have no relationship with. If you are an insurance agent or intermediary, you remain responsible for your own obligations to your policyholders and to your regulator in respect of the information you handle; using Insoora does not transfer those to us.",
      ],
      review:
        "Counsel should confirm how this obligation should be worded for agents who are themselves IRDAI-regulated intermediaries. Under the IRDAI (Protection of Policyholders’ Interests, Operations and Allied Matters of Insurers) Regulations, 2024, information collected during solicitation is to be kept confidential and not shared with a third party without the policyholder's explicit consent, subject to stated exceptions. Whether and how that flows down to an agent's use of Insoora, and whether a written arrangement between the agency and Insoora is needed, is a legal question and not one to answer in marketing copy.",
    },
    {
      heading: "Automated extraction can be wrong — check it",
      body: [
        "Policy details are read out of documents automatically, using a mixture of text parsing, per-insurer templates and optical character recognition, and optionally AI. It makes mistakes. A faint scan, an unusual layout, a handwritten endorsement or a format we have not seen before can all produce a field that is incomplete, mis-read or placed in the wrong box, and a confidence score is not a guarantee.",
        "Some extractions are saved automatically when every check passes, and others are held for review. Either way, you are responsible for checking anything that matters — policy numbers, names, dates, premium, sum insured and coverage — against the original PDF before you rely on it, quote it to a customer, or act on it.",
        "Do not use an extracted field as the basis for a claim, a renewal, or advice to a policyholder without verifying it against the insurer's own document.",
      ],
    },
    {
      heading: "Acceptable use",
      body: ["You must not:"],
      list: [
        "upload documents you have no right to share, or data you have no lawful basis to process;",
        "attempt to reach another account's data, or to escalate the permissions your role has;",
        "probe, scan, overload, interfere with or circumvent any part of the service or its security controls;",
        "reverse-engineer the platform, or copy it or its design;",
        "upload malware, or files whose purpose is to break the processing pipeline;",
        "use the service to break the law, or to do anything that would put us or other users in breach of it.",
      ],
    },
    {
      heading: "Your documents and data stay yours",
      body: [
        "You keep ownership of the documents and information you upload. You give us the limited permission we need to store them, process them, read details out of them, and display them to the users who are authorized to see them — and to make backups. That permission exists so we can run the service for you and for no other purpose: we do not sell your data and we do not use it for advertising.",
        "You can export your records. If you stop using Insoora, see the section on suspension and closure below for what happens to what we hold.",
      ],
    },
    {
      heading: "Paid plans, credits and billing",
      body: [
        "Some use of Insoora is paid. Where it is, the plan, what it includes and the price are shown before you pay, and payment is taken through our payment gateway. Prices are in Indian rupees, and applicable taxes are as shown at the time of payment.",
        "Cancellation, refunds and billing are dealt with in the Refund & Cancellation Policy, which forms part of these Terms.",
        "We may change prices or what a plan includes. If we do, we will give notice before the change takes effect for you.",
      ],
      review:
        "Confirm the billing cycle, the GST treatment and the invoice format, and confirm that the Refund & Cancellation Policy has been approved by the business before either page is published. Both are commercial decisions and neither is assumed here.",
    },
    {
      heading: "Availability, changes and support",
      body: [
        "We work to keep Insoora available and we do not guarantee that it will be uninterrupted or error-free. It needs maintenance, dependencies fail, and the service can be unavailable planned or otherwise. We have not published a service level or an uptime commitment, and nothing here is one.",
        "We may add, change or remove features. Where a change significantly reduces what the service does for you, we will give reasonable notice.",
        "Support is provided through the Contact Us page and the office phone number, during business hours.",
      ],
      review:
        "If an uptime or support-response commitment is ever offered to agencies, it belongs in a written agreement with them and this section must then be revised. Do not publish a service level the deployment cannot meet — the production application currently runs on a single small instance.",
    },
    {
      heading: "Suspension, closure and what happens to your records",
      body: [
        "You can stop using Insoora at any time, and you can ask us to close your account.",
        "We may suspend or restrict an account where it is in breach of these Terms, where it puts the service, other users or their data at risk, where payment is overdue, or where we are required to. Where it is reasonable to do so we will tell you why and give you a chance to put it right, and we will not use suspension as a way to avoid a refund that is due.",
        "If a customer's subscription lapses, the ability to open and download policies may stop, but the policy records are not deleted for that reason. On account closure, records are deleted or retained as described in the Privacy Policy's retention section — which is honest that there is not yet a documented retention schedule.",
      ],
      review:
        "Decide and then state: how long after closure a user can still export their records, how long records are kept afterwards, and the notice period before suspension for non-payment. Suspension and termination terms should be reviewed by counsel for fairness, including against the unfair-contract-terms provisions of the Consumer Protection Act, 2019.",
    },
    {
      heading: "Our intellectual property",
      body: [
        "The Insoora software, its interface and design, its name and its brand belong to us. These Terms let you use the service; they do not transfer any of those rights to you, and they do not permit you to copy, resell or white-label the platform.",
      ],
    },
    {
      heading: "Responsibility and liability",
      body: [
        "Insoora is a record-keeping and document-organization tool. It does not give insurance advice, and it is not responsible for the content of an insurer's policy or for an insurer's decisions.",
        "We are responsible for running the service with reasonable care and skill. We are not responsible for a loss that results from your own failure to verify extracted information against the original document, from your uploading something you had no right to upload, or from your not keeping your sign-in details secure.",
      ],
      review:
        "This section is deliberately short and contains NO limitation of liability, exclusion, cap or indemnity. Those require legal drafting and cannot be copied in from a template: an exclusion that is too broad is liable to be unenforceable and, against a consumer, may be an unfair term under the Consumer Protection Act, 2019. Counsel should draft the liability, indemnity, governing law and dispute-resolution clauses, along with force majeure and the consequences of termination.",
    },
    {
      heading: "Privacy",
      body: [
        "How we handle personal information is set out in our Privacy Policy, which forms part of these Terms. Please read it — it is specific about what is collected, where it is processed and what is not yet settled.",
      ],
    },
    {
      heading: "Contact and complaints",
      body: [
        `Questions about these Terms, or a complaint, can be sent through the Contact Us page or by calling ${CONTACT.phone}. The contact person for enquiries is ${CONTACT.contactPerson}.`,
      ],
      review:
        "A named Grievance Officer with published contact details is required now under Rule 5(9) of the SPDI Rules, 2011, and a published grievance-redressal route responding within ninety days will be required under Rule 14(3) of the DPDP Rules, 2025 from 13 May 2027. If Insoora is an “e-commerce entity” supplying services digitally — which needs confirming — the Consumer Protection (E-Commerce) Rules, 2020 also require a grievance officer's name, designation and contact to be displayed, acknowledgement of a complaint within forty-eight hours and redressal within one month. None of those is in place yet.",
    },
    {
      heading: "Changes to these Terms",
      body: [
        "We may update these Terms. When we make a material change we will say so on the website and change the date at the top of this page before it takes effect. Continuing to use Insoora after that means you accept the updated Terms.",
      ],
    },
  ],
};

export const REFUND_POLICY: LegalDocument = {
  title: "Refund & Cancellation Policy",
  updated: REFUND_UPDATED,
  updatedIso: REFUND_UPDATED_ISO,
  intro:
    "How cancellation and refunds work for Insoora's paid plans and policy credits. This page is a draft prepared for business approval and is not yet a committed policy.",
  sections: [
    {
      heading: "This page is a draft awaiting approval",
      body: [
        "Insoora is digital software sold as a subscription, with policy credits that can be topped up. There is nothing physical to return, so this page has no shipping or goods-return procedure.",
        "The wording below sets out what the platform can actually do today. The commercial terms — whether a refund is offered at all, on what basis, and in what timeframe — are decisions for the business, and the sections that depend on them are marked. Until they are settled and this notice is removed, treat this page as a proposal and not as a promise.",
      ],
      review:
        "This entire page must be approved by the business, and reviewed by counsel against the Consumer Protection Act, 2019, before it is published as a committed policy. Do not remove this section until that has happened.",
    },
    {
      heading: "What you are paying for",
      body: [
        "Paid use of Insoora takes two forms: a subscription that gives an account access to the platform, and policy credits that are consumed as documents are processed. Prices are in Indian rupees and are shown, with applicable taxes, before you pay.",
      ],
      review:
        "Confirm the plan names, the price points, the billing interval, whether billing is recurring or a manual renewal, and whether a free tier or trial is offered. Confirm also whether credits expire. None of this is stated here because none of it has been confirmed; do not publish this page with the commercial detail missing.",
    },
    {
      heading: "Cancelling a subscription",
      body: [
        "You can cancel a subscription from your account, or by contacting us. Cancelling stops the subscription from continuing beyond the period you have already paid for; it is not in itself a request for money back.",
        "Your policy records are not deleted because you cancelled. If a customer subscription lapses, the ability to open and download documents may stop while the records themselves are kept — see the Privacy Policy's retention section.",
      ],
      review:
        "Confirm whether access continues to the end of the paid period or ends immediately on cancellation, and whether a cancelled subscription can be reinstated. Confirm also that cancelling in the account genuinely prevents any further charge at the gateway, including any recurring mandate.",
    },
    {
      heading: "Refunds",
      body: [
        "Where a refund is agreed, it is processed back to the original payment method through our payment gateway, and any policy credits that the payment delivered and that have not been used may be reversed with it. A refund can be full or partial.",
        "Refunds are processed by us on request rather than automatically, so a refund starts with you telling us: use the Contact Us page or call the office, and include the payment reference and what went wrong.",
      ],
      review:
        "The eligibility rules are the central missing decision and nothing is assumed: state whether there is a cooling-off window, whether unused credits are refundable, whether a part-used subscription period is refundable, and the timeframe within which an agreed refund is returned. Note that a blanket “no refunds under any circumstances” rule should not be published — it would not answer the duplicate-charge and failed-transaction cases below, and a term purporting to exclude every refund in every circumstance risks being an unfair term under the Consumer Protection Act, 2019.",
    },
    {
      heading: "Duplicate charges, failed payments and wrong amounts",
      body: [
        "These are not discretionary, and they are dealt with separately from the refund rules above.",
        "If you were charged twice for the same thing, if you were charged an amount that does not match what was shown, or if money left your account but the payment did not complete and nothing was credited to your account, tell us with the payment reference and we will investigate with the payment gateway and put it right. Where money was taken and nothing was delivered, it is returned.",
        "A payment that fails at the gateway and is never captured is usually released by your bank or payment provider on its own timeline, which we do not control.",
      ],
      review:
        "Confirm the investigation and resolution timeframe you are willing to commit to, and who handles these cases. Confirm also the reconciliation route with the payment gateway.",
    },
    {
      heading: "Your rights as a consumer",
      body: [
        "Nothing on this page takes away rights you have under Indian consumer law, including under the Consumer Protection Act, 2019. If you believe a charge is wrong, or that the service was not delivered as described, you can take it up with us and you can take it further.",
      ],
      review:
        "Counsel should confirm whether Insoora is an “e-commerce entity” for the purposes of the Consumer Protection (E-Commerce) Rules, 2020 — it sells a service digitally, which suggests it may be. If it is, the Rules require published identity and contact details, clear pricing and charge disclosure, a named grievance officer, acknowledgement of a complaint within forty-eight hours and redressal within one month, and they prohibit refusing to take back services or refund where the service is defective or not as advertised.",
    },
    {
      heading: "How to ask",
      body: [
        `Use the Contact Us page, or call ${CONTACT.phone}. The contact person for enquiries is ${CONTACT.contactPerson}. Include the payment reference and the account the payment was for, so we can find it.`,
      ],
      review:
        "A dedicated billing mailbox should be published here once one exists. No email address is printed because there is no monitored mailbox yet.",
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
