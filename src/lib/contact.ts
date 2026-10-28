// The business's public contact details.
//
// One definition, read by the website footer, the Contact Us page and the
// JSON-LD in lib/seo.ts. Published details that disagree with each other are
// worse than none at all — a visitor who dials a stale number does not check
// the other three places it appears — so there is exactly one place to edit.

export const CONTACT = {
  name: "Insoora",

  /**
   * The company behind the product, as it must be printed.
   *
   * "Insoora" is the product and the brand; it is not a legal person. Every
   * public page that attributes the service, and the legal documents that have
   * to name a contracting party, use this string — so the attribution cannot
   * say one thing in the footer and another in the Terms.
   *
   * Supplied by the business. Deliberately NOT accompanied by a CIN, a
   * registered office or a GSTIN: none of those has been verified here, and a
   * wrong company identifier on a legal page is worse than an absent one. The
   * legal documents carry a review flag naming exactly which of those is
   * still missing.
   */
  legalEntity: "Raulji Technologies Private Limited",

  /** How the attribution reads wherever it is shown. One string, one wording. */
  managedBy: "Managed by Raulji Technologies Private Limited",

  /**
   * The person the business asked us to name as its contact.
   *
   * A CONTACT PERSON and nothing more. The business confirmed the name may be
   * published in that capacity and did not confirm any statutory role, so no
   * page here calls him a Grievance Officer, a Data Protection Officer, a
   * director or a lawyer. The SPDI Rules 2011 require a designated Grievance
   * Officer's name and contact to be published (Rule 5(9)); that designation
   * is a decision for the business and is flagged as outstanding rather than
   * asserted by naming this person into the role.
   */
  contactPerson: "Ronak Shah",

  /** As it should be printed, with the spacing an Indian mobile is read in. */
  phone: "+91 81530 77965",
  /** The same number for `tel:`, which must carry no spaces. */
  phoneHref: "tel:+918153077965",

  address: {
    street: "201 Prem Prakash Tower",
    /** The landmark line. "B/h" is how it is written locally — behind. */
    street2: "B/h Ankleshwar Mahadev Road",
    city: "Godhra",
    state: "Gujarat",
    postalCode: "389001",
    country: "India",
  },
} as const;

/**
 * The address as the lines it should be printed on.
 *
 * City, state and PIN share a line the way an Indian postal address is
 * written; anything left blank is dropped rather than rendered as a gap.
 */
export function addressLines(): string[] {
  const { street, street2, city, state, postalCode, country } = CONTACT.address;
  const locality = [city, state].filter(Boolean).join(", ");
  return [
    street,
    street2,
    postalCode ? `${locality} ${postalCode}` : locality,
    country,
  ].filter(Boolean);
}

/** The address on one line, for a meta description or a schema.org field. */
export function addressOneLine(): string {
  return addressLines().join(", ");
}

/** Just the street lines, for schema.org's `streetAddress`. */
export function streetAddress(): string {
  const { street, street2 } = CONTACT.address;
  return [street, street2].filter(Boolean).join(", ");
}

/**
 * A Google Maps link for the office.
 *
 * A SEARCH by address rather than a link to a place ID: there may not be a
 * verified listing yet, and a search always resolves to something a visitor
 * can use, whereas a wrong or missing place ID resolves to nothing.
 *
 * Derived from `CONTACT.address` rather than written out, because it was
 * previously a hardcoded query string in the footer — so a corrected address
 * would have left the directions link pointing at the old one. The house
 * number is dropped: "201" in a maps query narrows the search to a street
 * number Maps may not hold, and the tower plus the road is what actually
 * finds the building.
 */
export function mapsSearchHref(): string {
  const { street, street2, city, postalCode } = CONTACT.address;
  const query = [street.replace(/^\d+\s+/, ""), street2.replace(/^B\/h\s+/i, ""), city, postalCode]
    .filter(Boolean)
    .join(" ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * One public social profile.
 *
 * `id` keys the glyph in `components/marketing/social-links` — adding a
 * platform here without drawing its glyph there is a type error rather than
 * a blank square in the footer.
 */
export interface SocialProfile {
  id: "facebook" | "instagram" | "youtube";
  label: string;
  href: string;
  /** The handle as it is printed, where the page has room for it. */
  handle: string;
}

/**
 * The business's public social profiles, in the order they are shown.
 *
 * Read by the footer, the Contact Us page and `sameAs` in the JSON-LD — the
 * same one-definition rule as the phone number above. `sameAs` is the field
 * an answer engine uses to decide that this site and that Instagram account
 * are the same business, so only profiles we actually control belong here:
 * a wrong entry does not merely fail to help, it ties the brand to somebody
 * else's account.
 */
export const SOCIAL: readonly SocialProfile[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/insooraofficial",
    handle: "@insooraofficial",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/insooraofficial",
    handle: "@insooraofficial",
  },
  {
    id: "youtube",
    label: "YouTube",
    // The handle URL, not a /channel/UC… id: it is the one a visitor can
    // read and retype, and it survives the channel being renamed.
    href: "https://www.youtube.com/@insooraofficial",
    handle: "@insooraofficial",
  },
];

/** Just the URLs, for schema.org's `sameAs`. */
export function socialHrefs(): string[] {
  return SOCIAL.map((s) => s.href);
}
