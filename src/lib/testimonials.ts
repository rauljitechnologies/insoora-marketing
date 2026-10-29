// Testimonials.
//
// ── The rule this file exists to enforce ─────────────────────────────────
//
// A testimonial is a claim that a named person said something about this
// product. There are two kinds of entry below and they are not interchangeable:
//
//   verified: true   A real statement, from a real customer, who consented to
//                    it being published. Renders everywhere, always.
//   verified: false  An illustrative sample written to design against. Renders
//                    ONLY in a preview, ALWAYS carrying a visible label, and
//                    never in production unless someone deliberately switches
//                    it on.
//
// The flag is not decoration. `visibleTestimonials()` is the only way the
// section gets its entries, and it drops unverified ones in production — so
// a sample cannot reach a visitor by being forgotten about, which is exactly
// how fabricated social proof normally ships.
//
// ── What is deliberately absent ──────────────────────────────────────────
//
// No star ratings. No "verified buyer" badges. No customer counts. No company
// affiliations. No job titles at real firms. None of those can be stated
// truthfully today, and each is independently the kind of claim that draws a
// consumer-protection complaint rather than a search penalty.
//
// There is also NO `Review` or `AggregateRating` structured data anywhere in
// this codebase, and there must not be. Marking up a fictional testimonial as
// a Review is the single most direct route to a manual action, and an
// aggregate rating with no ratings behind it is simply a false statement in
// machine-readable form. When real testimonials arrive, Review markup is a
// separate decision to be taken deliberately — not something to switch on
// because the entries stopped being fictional.
//
// ── Replacing the samples with real ones ─────────────────────────────────
//
// 1. Collect the statement and written consent to publish it, with the name
//    and role as the person wants them shown.
// 2. Add the entry below with `verified: true`.
// 3. Delete the sample entries, or leave them — they stop rendering in
//    production either way.
//
// Nothing else has to change. The section renders whatever survives the
// filter, and renders nothing at all when that is empty.

/** Which side of the product the speaker is on. Drives the card's accent. */
export type TestimonialSide = "agent" | "policyholder";

export interface Testimonial {
  /** The statement, in the speaker's own words. */
  quote: string;
  /** How the speaker is named. */
  name: string;
  /**
   * What the speaker does — a ROLE, never an employer.
   *
   * No company names: naming a firm claims that firm endorses Insoora, which
   * needs that firm's consent and not just the individual's.
   */
  role: string;
  side: TestimonialSide;
  /**
   * TRUE only for a real statement from a real, consenting customer.
   *
   * Setting this to `true` on invented content is the one change in this
   * repository that turns a design placeholder into a false advertising
   * claim. There is no other guard — the filter trusts this field.
   */
  verified: boolean;
}

/**
 * Whether illustrative samples may be shown.
 *
 * Off in production by default, so the samples below are a development and
 * preview aid that cannot reach a customer by accident.
 *
 * `SAMPLE_TESTIMONIALS=on` forces them on anywhere, which exists for one
 * purpose: showing the finished design to stakeholders on a real deployment
 * before any genuine testimonial has been collected. They still carry their
 * labels when it is set — the switch controls visibility, never honesty.
 */
export const SAMPLES_VISIBLE =
  process.env.NODE_ENV !== "production" || process.env.SAMPLE_TESTIMONIALS === "on";

/**
 * The entries.
 *
 * All three are fictional. The names are invented, the people do not exist,
 * and the statements are written in the conditional — "can help", "can make
 * it easier" — because a sample must not describe an experience nobody has
 * had. That phrasing is load-bearing, not timid: a placeholder written as
 * "Insoora saved me six hours a week" is a fabricated result even while it
 * sits behind a flag, and it is the sentence someone eventually pastes into
 * an advertisement.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A centralized workspace can help an agency keep policy documents and customer records in one place, instead of spread across a laptop, an inbox and a phone.",
    name: "Aarav Patel",
    role: "Illustrative agency profile",
    side: "agent",
    verified: false,
  },
  {
    quote:
      "A clear digital portal can make it easier for a policyholder to find and review their own insurance information without having to call anyone.",
    name: "Neha Shah",
    role: "Illustrative policyholder profile",
    side: "policyholder",
    verified: false,
  },
  {
    quote:
      "Structured policy records can support more organized document management, and make an expiry date something the system knows rather than something a person has to remember.",
    // NOT "Rahul Mehta", which the brief suggested. That name is already the
    // fictional policyholder in twelve places across the product mockups —
    // with an insurer, policy numbers and an expiry date beside it. The same
    // invented person appearing both as sample policy data AND as someone
    // giving a testimonial would read as a real customer whose records happen
    // to be on display, which is the exact impression this file exists to
    // prevent. Testimonial names are kept disjoint from mock-data personas:
    // Rahul Mehta, Priya Shah, Amit Patel, Kiran Rao, Neha Desai and Ronak
    // Shah are all taken.
    name: "Meera Joshi",
    role: "Illustrative agency profile",
    side: "agent",
    verified: false,
  },
];

/**
 * The entries that may actually be rendered, in order.
 *
 * Real testimonials always. Samples only where `SAMPLES_VISIBLE` allows it.
 * An empty result means the section renders nothing, which is the correct
 * production state until the first real testimonial is collected — an empty
 * space is honest, and a page with no social proof is a smaller problem than
 * a page with invented social proof.
 */
export function visibleTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.verified || SAMPLES_VISIBLE);
}

/** True when anything on show is illustrative, so the section must say so. */
export function hasSamples(entries: Testimonial[]): boolean {
  return entries.some((t) => !t.verified);
}
