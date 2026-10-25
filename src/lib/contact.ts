// The business's public contact details.
//
// One definition, read by the website footer, the Contact Us page and the
// JSON-LD in lib/seo.ts. Published details that disagree with each other are
// worse than none at all — a visitor who dials a stale number does not check
// the other three places it appears — so there is exactly one place to edit.

export const CONTACT = {
  name: "Insoora",

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
