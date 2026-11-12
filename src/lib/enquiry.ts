// The contact form's contract: its fields, its rules, and the translation
// between what the form collects and what the product's API accepts.
//
// ── Why this is one module and not two ───────────────────────────────────
//
// The form validates on the client for a fast answer and the route validates
// again on the server, which is the one that counts. Those two rule sets used
// to be written out twice — matching by hand, and matching only until someone
// edited one of them. A field that passes in the browser and fails on the
// server is a submission a visitor cannot complete and cannot understand.
//
// So the rules live here, once, and both sides import them. `validate` runs
// unchanged in both places: there is no "client version" to drift.
//
// It is deliberately free of anything server-only — no `fs`, no `process.env`,
// no email — because the form is a client component and imports it directly.

// ── Enquiry types ────────────────────────────────────────────────────────
//
// Nine options, which is what the business asked for. The form had four.
//
// ── Why each one carries a `relay` value ─────────────────────────────────
//
// An enquiry is stored by the PRODUCT, at app.insoora.com/api/enquiries; this
// site only relays to it (see app/api/enquiries/route.ts). That endpoint's
// request schema is not visible from this deployment, and the four values
// below in `RelayType` are the ones the form has been sending successfully —
// so they are the only four known to be accepted.
//
// Sending "billing" or "partnership" upstream on the strength of them reading
// like plausible enum members would risk every submission of that kind being
// rejected by a validator nobody here can inspect. A contact form that 400s
// on two of its nine options is worse than one with coarser storage.
//
// So the nine are what the visitor picks and what both emails report, and
// `relay` is what the product is told. The precise choice is never lost: it
// is printed in the notification email and appended to the relayed message
// (see `relayMessage`). When the product's schema is confirmed to accept the
// full set, widen `RelayType` and delete `relay` — the form does not change.

/** The four values the product's `/api/enquiries` is known to accept. */
export type RelayType = "product" | "agency" | "support" | "other";

export interface EnquiryType {
  /** The value in the <select>, and the key in the stored payload. */
  value: string;
  /** As the visitor reads it. Also what the emails print. */
  label: string;
  /** What the product is told this is. See the note above. */
  relay: RelayType;
}

export const ENQUIRY_TYPES: readonly EnquiryType[] = [
  { value: "demo", label: "Product Demo", relay: "product" },
  { value: "product", label: "General Product Enquiry", relay: "product" },
  { value: "agent-registration", label: "Agent Registration Support", relay: "support" },
  { value: "agency", label: "Agency / Team Enquiry", relay: "agency" },
  { value: "customer-portal", label: "Customer Portal Support", relay: "support" },
  { value: "technical", label: "Technical Support", relay: "support" },
  { value: "partnership", label: "Partnership Enquiry", relay: "other" },
  { value: "billing", label: "Billing / Account Support", relay: "support" },
  { value: "other", label: "Other", relay: "other" },
];

/** One enquiry type by its form value, or undefined if it is not one of ours. */
export function enquiryType(value: string): EnquiryType | undefined {
  return ENQUIRY_TYPES.find((t) => t.value === value);
}

// ── Limits ───────────────────────────────────────────────────────────────

/** The message's ceiling, shown as a live count beside the field.
 *
 *  1000 characters is about 150 words — long enough to describe an agency's
 *  current filing setup, short enough that the field cannot be used to paste
 *  a policy document into, which the warning above it asks people not to do. */
export const MAX_MESSAGE = 1000;

/** A floor, because "hi" is not an enquiry anyone can answer. */
export const MIN_MESSAGE = 10;

/** Per-field ceilings, enforced on both sides.
 *
 *  These are not UX limits — `maxLength` on the inputs handles the typing —
 *  they are the server's refusal to read an unbounded string into a database
 *  row or an email body. A real agency name is not 500 characters. */
export const MAX_FIELD = 200;

// ── The fields ───────────────────────────────────────────────────────────

/**
 * One submission, as the form holds it and as the server reads it.
 *
 * Every value is a string, including the optional ones, which are "" rather
 * than undefined — a controlled React input cannot hold undefined without
 * warning, and a single shape means `validate` has no absent-vs-empty case to
 * handle.
 */
export interface EnquiryFields {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  type: string;
  message: string;
  /** The privacy consent checkbox. Required: false is not submittable. */
  consent: boolean;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export const EMPTY_ENQUIRY: EnquiryFields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  // No default selection. The business asked for enquiry type to be REQUIRED,
  // and a <select> that arrives pre-set to "Product Demo" is not a required
  // field — it is a field with a default that most people will submit
  // unread, which makes the answer noise in every notification email.
  type: "",
  message: "",
  consent: false,
};

/** The order errors are reported in, which is also the order focus moves to
 *  the first bad field on a failed submit. Matches the visual order. */
export const FIELD_ORDER: (keyof EnquiryFields)[] = [
  "name",
  "email",
  "phone",
  "company",
  "website",
  "type",
  "message",
  "consent",
];

// ── Validation ───────────────────────────────────────────────────────────

/**
 * Deliberately lenient. An email regex cannot decide whether an address
 * exists, and every attempt to make one stricter rejects somebody's real
 * address — so this checks the shape ("something@something.tld") and nothing
 * more. Whether the mailbox answers is discovered by replying to it.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Indian mobile numbers, with or without +91 and with spaces or hyphens
 *  wherever people put them. Optional field, so blank passes. */
const PHONE = /^\+?[0-9\s-]{10,18}$/;

/**
 * A website, as people actually type one.
 *
 * Accepts "agency.com", "www.agency.com" and "https://agency.com" alike.
 * Requiring a scheme would reject the form most people write, and this is an
 * optional field on a contact form — the cost of a loose rule here is a
 * malformed string in an email, and the cost of a strict one is a visitor
 * fighting a field they did not have to fill in.
 */
const WEBSITE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

/**
 * Every rule, in one function, run on both sides.
 *
 * Returns a map of field to message. An empty object means submittable.
 */
export function validate(f: EnquiryFields): EnquiryErrors {
  const e: EnquiryErrors = {};

  const name = f.name.trim();
  if (name.length < 2) e.name = "Enter your full name.";
  else if (name.length > MAX_FIELD) e.name = `Keep this under ${MAX_FIELD} characters.`;

  const email = f.email.trim();
  if (!email) e.email = "Enter your business email address.";
  else if (!EMAIL.test(email)) e.email = "Enter an email like name@agency.com.";
  else if (email.length > MAX_FIELD) e.email = `Keep this under ${MAX_FIELD} characters.`;

  const phone = f.phone.trim();
  if (phone && !PHONE.test(phone)) e.phone = "Enter a 10-digit mobile number, or leave blank.";

  if (f.company.trim().length > MAX_FIELD) e.company = `Keep this under ${MAX_FIELD} characters.`;

  const website = f.website.trim();
  if (website && !WEBSITE.test(website)) e.website = "Enter a website like agency.com, or leave blank.";
  else if (website.length > MAX_FIELD) e.website = `Keep this under ${MAX_FIELD} characters.`;

  if (!f.type) e.type = "Choose what your enquiry is about.";
  else if (!enquiryType(f.type)) e.type = "Choose one of the listed options.";

  const message = f.message.trim();
  if (message.length < MIN_MESSAGE) {
    e.message = `Tell us a little more (at least ${MIN_MESSAGE} characters).`;
  } else if (message.length > MAX_MESSAGE) {
    e.message = `Keep this under ${MAX_MESSAGE} characters.`;
  }

  // Not a formality. The Privacy Policy is what tells someone what happens to
  // what they type here, and consent that was never given is not consent —
  // so the server checks this too rather than trusting a checkbox that only
  // ever existed in the browser.
  if (!f.consent) e.consent = "Please confirm you have read the Privacy Policy.";

  return e;
}

// ── What the product is told ─────────────────────────────────────────────

/**
 * The message as the product stores it: what the visitor wrote, plus the
 * three things the form now collects that the product's schema has no field
 * for.
 *
 * Appended as a labelled block rather than interleaved, so the visitor's own
 * words are still the first thing a reader sees in the record. The block is
 * omitted entirely when there is nothing to add, which is the common case for
 * someone who filled in only the required fields.
 *
 * This exists because the alternative is losing the information. The precise
 * enquiry type, the agency's name and its website are all asked for by the
 * business; the product is the system of record; and until its schema accepts
 * them, the honest place to put them is in the one free-text field it does
 * accept. See the note on `ENQUIRY_TYPES`.
 */
export function relayMessage(f: EnquiryFields): string {
  const type = enquiryType(f.type);
  const extra: string[] = [];

  // Only when it adds something. "Enquiry type: General Product Enquiry"
  // beside a stored type of "product" is worth printing; the company and the
  // website are only printed when given.
  if (type) extra.push(`Enquiry type: ${type.label}`);
  if (f.company.trim()) extra.push(`Company / agency: ${f.company.trim()}`);
  if (f.website.trim()) extra.push(`Website: ${f.website.trim()}`);

  if (extra.length === 0) return f.message.trim();
  return `${f.message.trim()}\n\n— Submitted from the website contact form —\n${extra.join("\n")}`;
}

// ── The reference ────────────────────────────────────────────────────────

/**
 * A short reference for one submission, shown to the visitor and printed in
 * both emails.
 *
 * ── Why it exists ────────────────────────────────────────────────────────
 *
 * It is the only thing that ties the three records of an enquiry together:
 * the row in the product's database, the notification in the business's
 * mailbox, and the confirmation in the visitor's. Without it, "I sent a
 * message on Tuesday" is the whole of what support has to go on.
 *
 * ── Why it is generated here and not upstream ────────────────────────────
 *
 * The product may well mint an id of its own, but this deployment never sees
 * it: the relay returns the upstream body verbatim and its shape is not
 * guaranteed. More importantly, the reference has to exist even when the
 * upstream store is the thing that failed — that is exactly the case where
 * somebody will need it.
 *
 * ── On the format ────────────────────────────────────────────────────────
 *
 * `INS-20261109-4F7K2Q`: the date so a human can sort them, then six
 * characters of randomness. Crockford's alphabet minus the vowels, so the
 * reference cannot spell anything and cannot be misread between I/1, O/0 or
 * U/V when somebody reads it down a phone line.
 *
 * `crypto.getRandomValues` rather than `Math.random` — not because this is a
 * secret, but because a predictable reference is a guessable one, and these
 * are quoted in support conversations.
 */
const REFERENCE_ALPHABET = "0123456789ACDEFGHJKLMNPQRSTWXYZ";

export function enquiryReference(now = new Date()): string {
  const date = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");

  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  // Modulo over a 31-character alphabet leaves a very slight bias towards its
  // first few characters. Irrelevant for a human-readable support reference,
  // and called out so nobody later mistakes this for a token generator.
  const random = Array.from(bytes, (b) => REFERENCE_ALPHABET[b % REFERENCE_ALPHABET.length]).join("");

  return `INS-${date}-${random}`;
}
