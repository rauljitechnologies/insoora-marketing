import type { Accent } from "@/lib/accents";

// The website's questions and answers.
//
// One list, used three ways: the FAQ page renders all of it, the home page
// renders the first few, and lib/seo.ts builds the FAQPage structured data
// from the same entries. Google's FAQ markup is only valid when the question
// and answer are both visible on the page that carries the schema, so sharing
// the source is not a convenience here — it is what keeps the markup legal.
//
// Answers are plain strings rather than JSX so the schema can use them
// verbatim, and they are written to be self-contained: an answer engine quotes
// one paragraph, not the page around it, so each one has to make sense alone.
//
// Every answer below describes what the system actually does today. Where
// something is a limitation, it says so — "accuracy is lower on photographs"
// is more useful to a reader than a claim we would have to walk back.

/**
 * The shelves the FAQ page groups its answers onto.
 *
 * Fourteen questions in one undivided accordion is a list nobody scans: a
 * reader who came to find out where their data is stored has to read past
 * four answers about extraction to discover whether the question is even
 * answered. Five groups is enough to divide sixteen questions and few
 * enough that the group nav fits on one line.
 *
 * Each carries its own accent, so the FAQ page follows the same
 * one-hue-per-chapter rule as every other page on the site.
 */
export const FAQ_CATEGORIES = {
  extraction: { label: "Reading documents", accent: "red" },
  managing: { label: "Managing policies", accent: "blue" },
  access: { label: "Customers and access", accent: "pink" },
  privacy: { label: "Data, privacy and security", accent: "green" },
  account: { label: "Accounts and pricing", accent: "orange" },
} as const satisfies Record<string, { label: string; accent: Accent }>;

export type FaqCategory = keyof typeof FAQ_CATEGORIES;

export interface FaqItem {
  q: string;
  a: string;
  /** Which shelf this sits on, on the FAQ page. */
  category: FaqCategory;
  /** Which page the answer belongs to first; the home page shows `home`. */
  home?: boolean;
}

export const FAQS: FaqItem[] = [
  {
    q: "How does Insoora extract data from an insurance policy PDF?",
    a: "When you upload a policy PDF, Insoora reads the document's text layer, or runs OCR when the page is a scan, and picks out the fields an agent needs: policy number, insurer, insured name, start and expiry dates, premium and asset or vehicle details. The extracted fields are saved against the customer with the original PDF attached, so the document and the record stay together.",
    category: "extraction",
    home: true,
  },
  {
    q: "Which insurance documents does Insoora support?",
    a: "Motor, health, life, travel and home policy PDFs issued by Indian insurers. Layouts differ from insurer to insurer, so accuracy is highest on insurer-issued digital PDFs and lower on photographs of printed policies or poor-quality scans. Insoora does not claim to read every layout correctly on the first attempt.",
    category: "extraction",
    home: true,
  },
  {
    q: "Can I upload multiple policy PDFs at once?",
    a: "Yes. Bulk upload accepts many PDFs in one go and shows the state of each file — read, needs review, or failed — so you only open the ones that need your attention instead of checking every policy by hand.",
    category: "extraction",
    home: true,
  },
  {
    q: "What happens when an extracted field is unclear?",
    a: "The field is marked as needing review rather than filled in with a guess. Insoora shows the extracted value beside the policy document it came from, and you confirm or correct it. The original PDF always remains the source of truth.",
    category: "extraction",
    home: true,
  },
  {
    q: "How does Insoora track policy renewals?",
    a: "The expiry date is taken from the policy document itself, not from a reminder someone set by hand. Agents see a renewals list of policies ending within the next 30 days, sorted by date, so a lapse is visible before it happens.",
    category: "managing",
    home: true,
  },
  {
    q: "Can customers see their own policy documents?",
    a: "Yes. A policyholder signs in to their own portal and sees a year-wise history of the policies their agent has shared with them, and can download the original PDFs. A customer can only ever see policies assigned to them — never another customer's records.",
    category: "access",
    home: true,
  },
  {
    q: "How are uploaded policy documents protected?",
    a: "Policy PDFs are kept in private storage and are not publicly reachable. Each download is served through a link that expires within minutes, all traffic travels over HTTPS, and access is decided by role: agents, sub-agents, policyholders and administrators each see only what their role allows.",
    category: "privacy",
    home: true,
  },
  {
    q: "Can I search and filter policies?",
    a: "Yes. Policies can be searched and filtered by customer, insurer, policy number, status and expiry window, and the results can be sorted. The same filters drive the renewals view, so a search can be turned into a working list.",
    category: "managing",
  },
  {
    q: "Can I export policy data?",
    a: "Authorized agents can export policy and renewal lists as CSV or Excel for their own records. Exports follow the same access rules as the screen they came from, so an export never contains a policy the person could not already see.",
    category: "managing",
  },
  {
    // Added because the privacy policy now discloses this and the FAQ is
    // where people actually look for it. It is also the answer most likely to
    // be assumed wrongly: a product built in Gujarat for Indian insurers is
    // taken to keep its data in India, and it does not.
    q: "Where is my data stored?",
    a: "Insoora's application, database and document storage run outside India — the application and database are hosted in Singapore, and uploaded PDFs are held in Cloudflare's object storage. We say so plainly because a product built in India for Indian insurers is often assumed to store its data in India. The Privacy Policy sets out the providers involved and what each one does.",
    category: "privacy",
  },
  {
    q: "Does the Insoora website use cookies?",
    a: "The signed-in platform uses only the cookies needed to keep you signed in and to protect the service. The public website would also like to use Google Analytics to count visits, and that is not necessary for the site to work — so it loads only if you accept it. Nothing analytics-related is loaded until you choose, declining is remembered, and you can change your mind from the Cookie settings link in the footer.",
    category: "privacy",
  },
  {
    q: "Who is Insoora for?",
    a: "Individual insurance agents who manage policies on their own, agencies whose sub-agents upload into one shared book of business, and the policyholders those agents serve. It is built for the Indian insurance market and the PDFs Indian insurers issue.",
    category: "account",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Insoora runs in a web browser. Agents create an account, sign in and upload policy PDFs; policyholders sign in to a separate portal to view the documents shared with them.",
    category: "account",
  },
  {
    q: "How do I create an account?",
    a: "Agents register from the website and sign in to the agent portal. Policyholder logins are created by the agent, or by registering on the customer portal with the mobile number the agent holds on record, which is how a policy finds its customer.",
    category: "account",
  },
  {
    // The brief asks for "free onboarding and current payment status", and
    // the honest answer is that no price is published anywhere on this site.
    // The shape of the charging is in the Refund & Cancellation draft (a
    // subscription plus policy credits); the numbers are a business decision
    // that has not been made public, and inventing one here would be the
    // single most damaging thing this page could do.
    q: "What does Insoora cost?",
    a: "No price is published on this website. Paid use takes two forms — a subscription that gives an account access to the platform, and policy credits consumed as documents are processed — and prices are shown in rupees, with applicable taxes, before you pay for anything. The plan names, price points and billing interval are not stated here because they have not been published, and the Refund & Cancellation page is still a draft awaiting business approval. Create an agent account or call us if you need the current commercial terms.",
    category: "account",
  },
  {
    // Deletion is listed in the brief and was the one privacy topic the FAQ
    // did not cover. The answer mirrors the Privacy Policy's retention
    // section exactly, including the part that is uncomfortable: there is no
    // documented retention schedule, and this page says so rather than
    // implying a tidy one exists.
    q: "Can I have my data deleted?",
    a: "You can ask us for a copy of the personal information we hold about you, to correct it, to delete it, or to withdraw a consent — send the Contact Us form with \u201cAccount support\u201d selected, or call the office, and we will confirm it is really you before acting. Two honest caveats: nothing is deleted automatically today, because the platform is built to keep policy records findable for years, and on a deletion request some records may still be retained where law, tax, an unresolved dispute or a backup's normal expiry cycle requires it. Insoora has no published retention schedule yet and does not pretend otherwise.",
    category: "privacy",
  },
];

/** The entries the home page shows. */
export const HOME_FAQS = FAQS.filter((f) => f.home);

/**
 * The questions grouped onto their shelves, in `FAQ_CATEGORIES` order.
 *
 * Empty groups are dropped rather than rendered as a heading with nothing
 * under it, so a category can be declared before it has questions.
 */
export function faqsByCategory(): { id: FaqCategory; label: string; accent: Accent; items: FaqItem[] }[] {
  return (Object.keys(FAQ_CATEGORIES) as FaqCategory[])
    .map((id) => ({
      id,
      label: FAQ_CATEGORIES[id].label,
      accent: FAQ_CATEGORIES[id].accent as Accent,
      items: FAQS.filter((f) => f.category === id),
    }))
    .filter((group) => group.items.length > 0);
}
