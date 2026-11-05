import type { SolutionPage } from "../types";

// The document page: what happens to the PDF itself, as opposed to the record
// read out of it.
//
// It is the one page on this shelf that can be specific about mechanism
// without overclaiming, because the mechanisms are architectural facts rather
// than quality claims: object keys are server-generated, downloads re-derive
// the caller's scope, the viewer's signed URL is short-lived and user-bound,
// duplicates are matched on a content hash. None of that is a promise about
// how well anything reads.
//
// What it must NOT do is drift into infrastructure disclosure. Bucket names,
// endpoints, key formats beyond the shape already published, and anything
// about credentials stay off a public page — the brief rules them out and
// they would be a genuine disclosure rather than a design choice. The
// providers named here (Cloudflare object storage, Singapore hosting) are
// already stated in the Privacy Policy and the FAQ, so naming them keeps the
// three surfaces consistent instead of adding anything.

export const page: SolutionPage = {
  slug: "insurance-document-management-software",
  group: "solution",
  metaTitle: "Insurance Document Management Software — Policy PDF Storage",
  description:
    "Insurance document management that keeps every policy PDF in private storage, named for the policy it belongs to, reachable only by people with access to it.",
  accent: "pink",
  badge: "Private storage, named documents",
  h1: {
    lead: "Insurance document management where the PDF stays",
    highlight: "attached to its policy.",
  },
  lede:
    "A policy record without its document is a claim with no evidence behind it. Insoora keeps every uploaded PDF in private storage, attached to the policy it was read from, named after that policy, and reachable only through a request that re-checks who is asking.",
  checks: [
    "Every PDF kept with its policy record",
    "Named for the policy, not for the sender",
    "No public URL, ever",
    "Duplicates matched by content, not filename",
  ],
  heroShot: "policyHistory",
  nav: {
    label: "Document management",
    hint: "Where the policy PDFs live, and who can reach them",
  },
  footerColumn: "solutions",
  primaryKeyword: "Insurance Document Management Software",
  secondaryKeywords: [
    "Insurance Policy Document Storage",
    "Insurance Document Repository",
    "Policy PDF Management Software",
    "Insurance Records Management",
  ],
  sections: [
    {
      kind: "split",
      id: "naming",
      accent: "pink",
      eyebrow: "The problem nobody calls document management",
      heading: "Every policy PDF arrives with a useless name",
      lede:
        "Policy.pdf, Document(3).pdf, IMG_20250114_WA0007.jpg, 576575767567.pdf. A folder of four hundred of those is a folder you cannot search.",
      paragraphs: [
        "Once a policy is confirmed, Insoora gives its documents a name derived from the policy itself: the policy number, the vehicle registration for a motor policy or the policy type otherwise, and the year — so a motor document is filed as something like 576575767567-GJ06KQ9835-2026.pdf and a health one as HLT-2026-4455667-HEALTH-2026.pdf. A second document on the same policy gets a v2 suffix so two files in one list are distinguishable.",
        "The name is metadata rather than a rewrite. The insurer's bytes are never touched and the stored object is never renamed, because renaming an object means copying it and deleting the original, and a delete is the one operation that can lose a policy. The uploaded filename is kept verbatim for audit and is never parsed for policy data — it is customer-supplied text and is treated as such.",
        "When a part of the name cannot be established — no policy number read, an unregistered vehicle, no usable date — the document keeps the name it arrived with and carries a reason, which the portals show as a badge rather than hiding. Fixing the data and re-confirming names it.",
      ],
      bullets: [
        "A name derived from the confirmed policy, not from what the sender called the file",
        "The original filename kept for audit and never used as data",
        "A \"name needs review\" badge instead of a silently wrong name",
      ],
      shot: "policyHistory",
      limit:
        "There is no rename button and no folder structure you control. Documents are filed against policies and customers, which is the only hierarchy there is — you cannot invent your own.",
    },
    {
      kind: "cards",
      id: "retrieval",
      accent: "blue",
      eyebrow: "Getting a document back",
      heading: "Six ways a PDF is found again",
      lede:
        "Finding the document is the actual job. Storing it was never the hard part.",
      cards: [
        {
          icon: "users",
          title: "By customer",
          text: "Open the policyholder and every policy they hold is there, each with the document it was read from.",
        },
        {
          icon: "history",
          title: "By year",
          text: "A customer's policies stack year by year, so last year's cover and the document that proved it are one click apart.",
        },
        {
          icon: "search",
          title: "By policy number or insurer",
          text: "Search across the book by customer, insurer, policy number or status, then filter and sort the result.",
        },
        {
          icon: "car",
          title: "By vehicle",
          text: "A motor policy's registration number is stored as a field and is searchable, with a vehicles view in the back office.",
        },
        {
          icon: "file",
          title: "By document kind",
          text: "Schedules, certificates, bonds, renewal notices, endorsements, premium receipts, cover notes and proposals are classified separately rather than lumped together as \"document\".",
        },
        {
          icon: "phone",
          title: "By the customer themselves",
          text: "A policyholder with a portal login downloads their own documents without asking you for a copy, which removes the request rather than speeding it up.",
        },
      ],
    },
    {
      kind: "split",
      id: "access",
      accent: "green",
      eyebrow: "Who can reach a document",
      heading: "No policy PDF has a public URL",
      lede:
        "The mechanism, stated plainly, because \"secure document storage\" means nothing on its own.",
      paragraphs: [
        "Stored objects are private and nothing in the store is publicly readable. Object keys are generated by the server from the document's own identifier and never from a filename a user supplied, so there is no guessable path and no way for a crafted filename to decide where bytes land.",
        "Every download goes through a request that re-derives the caller's scope on the server before any bytes are served — an agent gets their agency's documents, a policyholder gets only the policies assigned to them, and a sub-agent gets what the agency granted. Opening a document in the in-app viewer additionally needs a signed link that is bound to that user and expires in five minutes.",
        "The practical consequence is the one worth stating: a link to a policy PDF is not a link you can forward. It stops working, and it was never valid for anybody but the person who requested it.",
      ],
      bullets: [
        "Private storage, server-generated keys, no public read access",
        "Caller scope re-derived on the server for every download",
        "Viewer links user-bound and valid for five minutes",
        "All traffic over HTTPS",
      ],
      shot: "roleAccess",
      limit:
        "There is no document-level sharing with people outside the platform, no public link you can send, and no watermarking. Sharing a policy with someone who has no account means downloading it and sending it yourself.",
    },
    {
      kind: "prose",
      id: "duplicates",
      accent: "purple",
      eyebrow: "The same policy, uploaded twice",
      heading: "Why duplicates matter more in this product than in most",
      paragraphs: [
        "In most document systems a duplicate is untidy. Here it is also expensive: policy processing is metered, so a second copy of the same file would mean a second charge for reading a document that had already been read.",
        "So an upload is matched against the account's existing documents on the content itself — a SHA-256 hash of the bytes together with the byte length — rather than on the filename. A match returns the document already stored instead of writing a second copy or spending a second policy credit.",
        "The matching is scoped to the owning agency. Two different agencies holding the same insurer-issued file are not duplicates of each other, and neither one's upload tells the other anything.",
      ],
      h3: [
        {
          heading: "What this does not catch",
          paragraphs: [
            "It catches the same file twice. It does not catch the same policy arriving as two different files — a schedule from the insurer and a photograph of the printed copy are different bytes and will both be stored, correctly, as two documents on one policy.",
            "Nor does it merge records. If the same policy was uploaded twice before it was confirmed and ended up as two policy records, joining them is a manual correction.",
          ],
        },
        {
          heading: "Where the documents actually sit",
          paragraphs: [
            "Stated because it is the thing most often assumed wrongly. The application and its database are hosted in Singapore, and uploaded PDFs are held in Cloudflare's object storage — not in India, even though the product is built in Gujarat for Indian insurers.",
            "The Privacy Policy sets out which providers are involved and what each one does. There is no published retention schedule yet, and nothing is deleted automatically, because the platform is built to keep policy records findable for years.",
          ],
        },
      ],
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "Not a general document system",
      heading: "What this is not built to be",
      lede:
        "A document management system in the general sense does several things this one deliberately does not.",
      items: [
        {
          title: "Insurance documents only",
          text: "A classifier rejects anything that is not an insurance document before extraction runs — an RC, an invoice, a bank statement, a payslip, an agreement. You cannot use Insoora as a filing cabinet for the rest of your paperwork.",
        },
        {
          title: "No version control or e-signature",
          text: "There is no check-in and check-out, no revision history on a file, no annotation layer, no approval workflow and no signing. A revised policy is a new document on the policy, not a new version of the old file.",
        },
        {
          title: "No full-text search inside documents",
          text: "Search covers the fields that were extracted and the customer record. It does not search the body text of every stored PDF, so a phrase that appears in a policy wording is not findable.",
        },
        {
          title: "No external sharing and no retention policy",
          text: "Documents cannot be shared by link with anyone outside the platform. Nothing is deleted automatically and there is no published retention schedule — a deletion request is handled by hand and some records may still be kept where law, tax or a backup cycle requires it.",
        },
      ],
    },
    {
      kind: "screens",
      id: "screens",
      accent: "orange",
      eyebrow: "The screens",
      heading: "Documents, where you actually meet them",
      lede:
        "Three views, drawn with invented data: arriving, filed by year, and in a customer's own hands.",
      shots: [
        {
          shot: "uploadQueue",
          title: "Arriving",
          text: "A batch in progress, with the state of every file — read, needs review, failed — so a backlog is a finite piece of work.",
        },
        {
          shot: "vault",
          title: "Filed by year",
          text: "A customer's policies stacked year on year, each with the original document kept against it.",
        },
        {
          shot: "customerMobile",
          title: "In the customer's hand",
          text: "The policyholder's own portal on a phone, where they download their documents without asking you for a copy.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is insurance document management software?",
      a: "Software that stores policy documents so they can be found again by the policy and customer they belong to, rather than by remembering which folder they were saved in. Insoora keeps every uploaded PDF attached to the policy record extracted from it, names it after that policy, and controls who can open it by role.",
    },
    {
      q: "Are my policy PDFs publicly accessible?",
      a: "No. Stored objects are private with no public read access, their keys are generated by the server rather than from any filename a user supplied, and every download goes through a request that re-derives the caller's scope before serving bytes. The in-app viewer additionally uses a signed link bound to that user and valid for five minutes.",
    },
    {
      q: "How are policy documents named?",
      a: "Once a policy is confirmed, its documents are named from the policy itself: policy number, the vehicle registration for motor or the policy type otherwise, and the year. The stored object is never renamed and the insurer's bytes are never altered — the name is metadata that the portals show and that search matches. If a part cannot be established the document keeps its uploaded name and is badged as needing review.",
    },
    {
      q: "What happens if I upload the same policy twice?",
      a: "An upload is matched against your account's existing documents by a hash of the file's contents and its byte length, so the same file uploaded twice returns the document already stored rather than writing a second copy or spending a second policy credit. The matching is scoped to your agency — another agency holding the same insurer file is not a duplicate of yours.",
    },
    {
      q: "Can customers download their own policy documents?",
      a: "Yes, if their agent has given them a portal login and shared the policy with them. The customer portal is read-only: a policyholder sees a year-wise history of the policies shared with them and can download the original PDFs, and can only ever see their own.",
    },
    {
      q: "Where are the documents stored, and for how long?",
      a: "Uploaded PDFs are held in Cloudflare's object storage, and the application and database are hosted in Singapore — outside India, which is worth saying plainly because the opposite is usually assumed. Nothing is deleted automatically and there is no published retention schedule yet; a deletion request is handled by hand, and some records may still be retained where law, tax or a backup's expiry cycle requires it.",
    },
  ],
  related: [
    {
      href: "/insurance-policy-entry-software",
      label: "How the PDF is read",
      text: "The extraction pipeline that turns a document into a policy record.",
    },
    {
      href: "/insurance-policy-management-software",
      label: "The record it belongs to",
      text: "What a policy record holds, and why the document stays attached.",
    },
    {
      href: "/customer-portal",
      label: "The customer's copy",
      text: "How a policyholder reaches their own documents without asking you.",
    },
    {
      href: "/privacy-policy",
      label: "What is stored, and who can reach it",
      text: "The providers involved, the retention position and your rights.",
    },
    {
      href: "/blog/organize-insurance-policy-documents-digitally",
      label: "Guide: organizing documents",
      text: "A filing method that works whether or not you use software for it.",
    },
    {
      href: "/features",
      label: "Every feature, with its limits",
      text: "The complete capability list in detail.",
    },
  ],
  cta: {
    eyebrow: "Start with the folder you dread",
    title: "Upload the folder nobody has opened since last March.",
    lede: "Each document is read, named for its policy and filed under its customer.",
    secondary: { href: "/product-in-action", label: "See every screen" },
  },
};
