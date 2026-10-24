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

export interface FaqItem {
  q: string;
  a: string;
  /** Which page the answer belongs to first; the home page shows `home`. */
  home?: boolean;
}

export const FAQS: FaqItem[] = [
  {
    q: "How does Insoora extract data from an insurance policy PDF?",
    a: "When you upload a policy PDF, Insoora reads the document's text layer, or runs OCR when the page is a scan, and picks out the fields an agent needs: policy number, insurer, insured name, start and expiry dates, premium and asset or vehicle details. The extracted fields are saved against the customer with the original PDF attached, so the document and the record stay together.",
    home: true,
  },
  {
    q: "Which insurance documents does Insoora support?",
    a: "Motor, health, life, travel and home policy PDFs issued by Indian insurers. Layouts differ from insurer to insurer, so accuracy is highest on insurer-issued digital PDFs and lower on photographs of printed policies or poor-quality scans. Insoora does not claim to read every layout correctly on the first attempt.",
    home: true,
  },
  {
    q: "Can I upload multiple policy PDFs at once?",
    a: "Yes. Bulk upload accepts many PDFs in one go and shows the state of each file — read, needs review, or failed — so you only open the ones that need your attention instead of checking every policy by hand.",
    home: true,
  },
  {
    q: "What happens when an extracted field is unclear?",
    a: "The field is marked as needing review rather than filled in with a guess. Insoora shows the extracted value beside the policy document it came from, and you confirm or correct it. The original PDF always remains the source of truth.",
    home: true,
  },
  {
    q: "How does Insoora track policy renewals?",
    a: "The expiry date is taken from the policy document itself, not from a reminder someone set by hand. Agents see a renewals list of policies ending within the next 30 days, sorted by date, so a lapse is visible before it happens.",
    home: true,
  },
  {
    q: "Can customers see their own policy documents?",
    a: "Yes. A policyholder signs in to their own portal and sees a year-wise history of the policies their agent has shared with them, and can download the original PDFs. A customer can only ever see policies assigned to them — never another customer's records.",
    home: true,
  },
  {
    q: "How are uploaded policy documents protected?",
    a: "Policy PDFs are kept in private storage and are not publicly reachable. Each download is served through a link that expires within minutes, all traffic travels over HTTPS, and access is decided by role: agents, sub-agents, policyholders and administrators each see only what their role allows.",
    home: true,
  },
  {
    q: "Can I search and filter policies?",
    a: "Yes. Policies can be searched and filtered by customer, insurer, policy number, status and expiry window, and the results can be sorted. The same filters drive the renewals view, so a search can be turned into a working list.",
  },
  {
    q: "Can I export policy data?",
    a: "Authorized agents can export policy and renewal lists as CSV or Excel for their own records. Exports follow the same access rules as the screen they came from, so an export never contains a policy the person could not already see.",
  },
  {
    q: "Who is Insoora for?",
    a: "Individual insurance agents who manage policies on their own, agencies whose sub-agents upload into one shared book of business, and the policyholders those agents serve. It is built for the Indian insurance market and the PDFs Indian insurers issue.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Insoora runs in a web browser. Agents create an account, sign in and upload policy PDFs; policyholders sign in to a separate portal to view the documents shared with them.",
  },
  {
    q: "How do I create an account?",
    a: "Agents register from the website and sign in to the agent portal. Policyholder logins are created by the agent, or by registering on the customer portal with the mobile number the agent holds on record, which is how a policy finds its customer.",
  },
];

/** The entries the home page shows. */
export const HOME_FAQS = FAQS.filter((f) => f.home);
