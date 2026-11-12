import type { Post } from "../types";

// The feature-checklist article for general insurance specifically.
//
// Its angle, and what keeps it from being a restatement of the buyer's guide:
// general insurance is several different shapes of policy, and most of what
// goes wrong is software that models one shape and stores the rest as text.
// So the article is organised by line of business rather than by feature.

export const post: Post = {
  slug: "general-insurance-management-software-features",
  title: "General Insurance Management Software: Features Every Agency Needs",
  metaTitle: "General Insurance Software: The Features That Matter",
  description:
    "What general insurance software has to model per line of business — motor IDV and NCB, health sums insured, travel periods — and the features that follow.",
  excerpt:
    "A general insurance book is not one shape. The features worth paying for are the ones that model a motor schedule as a motor schedule instead of flattening every line into insurer, number and date.",
  published: "2026-10-29",
  updated: "2026-10-29",
  accent: "green",
  category: "choosing",
  art: "lines",
  audience: "General insurance agencies",
  // This article carries /general-insurance-management-software's own primary keyword in
  // its H1, so it has to point at it — see `productLinks` in lib/blog/types.
  productLinks: ["general-insurance-management-software"],
  related: [
    "best-insurance-management-software-india",
    "manage-multiple-insurance-policies-one-dashboard",
    "track-insurance-policy-renewals-and-important-dates",
  ],
  sections: [
    {
      heading: "Why general insurance breaks generic software",
      blocks: [
        {
          kind: "text",
          text: "Life insurance is relatively uniform: a policy, a term, a sum assured, a premium. General insurance is not one product, it is several, and they do not share a shape.",
        },
        {
          kind: "text",
          text: "A motor schedule carries a vehicle with a registration number, an engine and chassis number, five separate insured-declared-value components and two premium streams. A health policy carries coverages with sums insured and person counts, a floater, and a TPA. A travel policy may run eleven days rather than a year. A shop fire policy carries a location and a set of perils. Software that stores \"insurer, policy number, premium, expiry\" and puts the rest in a notes field has thrown away most of each of them.",
        },
        {
          kind: "callout",
          tone: "note",
          title: "The test for whether a product models your lines",
          text: "Ask where the vehicle registration number goes, and then ask whether you can search by it. A product that stores it in a text field you cannot search has stored it the way a spreadsheet does, which is to say it has not helped.",
        },
      ],
    },
    {
      heading: "Motor: the line most of a retail book is",
      blocks: [
        {
          kind: "text",
          text: "If your agency is mostly two-wheelers and private cars, this is the section to evaluate a product on. A motor schedule is the densest document in retail insurance and the one most expensive to retype.",
        },
        {
          kind: "table",
          columns: ["Field group", "What it contains", "Why it has to be a real field"],
          rows: [
            [
              "The vehicle",
              "Registration number, make, model, variant, sub-type, fuel type, manufacturing year, engine number, chassis number, cubic capacity, seating capacity, gross vehicle weight, financier.",
              "Half of these are how a customer or a workshop identifies the policy. Registration number in particular must be searchable.",
            ],
            [
              "The IDV breakdown",
              "Vehicle IDV, electrical accessories, non-electrical accessories, CNG or LPG kit, trailer, and the total.",
              "One total cannot be checked. A breakdown can be validated against its own sum, and a mismatch is a reliable signal that something was misread.",
            ],
            [
              "The premium split",
              "Own damage and third party separately, add-on premium, discount, no-claim bonus discount, loading, net premium, GST, final premium.",
              "A single premium figure answers no question a customer asks. The split is what lets you explain a renewal quote going up.",
            ],
            [
              "No-claim bonus",
              "The percentage earned.",
              "A late renewal can forfeit it. That is a monetary loss to the customer and an avoidable one, and it only becomes visible if the percentage was captured.",
            ],
            [
              "Two cover periods",
              "The policy's own period, and separately the third-party period on a long-term policy.",
              "A one-year own-damage cover inside three years of third party has two expiry dates. Software with one expiry field cannot represent it, and will either nag you two years early or go quiet for two years.",
            ],
            [
              "Continuity",
              "Previous insurer, previous policy number, previous expiry.",
              "What establishes an unbroken history, which is what the no-claim bonus rests on.",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Long-term motor is the single best stress test",
          text: "Take a bundled policy — one year own damage, three or five years third party — and put it into any product you are evaluating. How it handles the two periods tells you more about the quality of its data model than an hour of demo.",
        },
      ],
    },
    {
      heading: "Health, travel and the commercial lines",
      blocks: [
        {
          kind: "h3",
          text: "Health",
        },
        {
          kind: "text",
          text: "The structural requirement is that a policy can have several coverages, each with its own sum insured and its own number of persons. A family floater is one policy covering four people with one sum insured shared between them; software that models it as four policies has created three records that will all come up for renewal and only one of which exists.",
        },
        {
          kind: "list",
          items: [
            "Coverages with a sum insured and a person count each, and add-ons separately.",
            "The TPA, where the schedule names one — it is who the customer actually rings at a hospital.",
            "Nominee and relationship where stated.",
            "Waiting periods are in the policy wording rather than the schedule, so expect no software that reads schedules to hold them. Keep them where you keep the wording.",
          ],
        },
        {
          kind: "h3",
          text: "Travel",
        },
        {
          kind: "text",
          text: "One requirement, and it is a hard one for weak software: the cover period can be days. Any system that calculates expiry as a year from the start date will be eleven and a half months wrong about every travel policy you hold, and the error is in the safe-looking direction — it will tell you the policy is live long after the traveller came home.",
        },
        {
          kind: "h3",
          text: "Property, marine and personal accident",
        },
        {
          kind: "text",
          text: "Worth being realistic here. Most products built for retail general insurance will classify these and read their schedule fields — insurer, number, period, coverages, sums insured — and will not model the asset the way they model a vehicle. For a small agency holding a handful of shop and PA policies alongside a motor book, that is usually enough and is better than the folder they are in now.",
        },
        {
          kind: "text",
          text: "For an agency whose business is commercial lines, it is not. Open marine covers with declarations, group schemes with member lists and per-voyage certificates are workflows rather than fields, and a retail records product does not have them. Ask directly, and treat a vague answer as a no.",
        },
      ],
    },
    {
      heading: "The features that follow from modelling the lines properly",
      blocks: [
        {
          kind: "text",
          text: "Everything in this list is downstream of the data model. A product that stored each line properly can do all of it; a product that flattened them cannot do any of it, whatever the feature page says.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "One renewal list across a mixed book",
              text: "A car policy, a family floater and a shop fire policy in one thirty-day list, each with a correct date. This only works if every expiry came off its own schedule.",
            },
            {
              title: "Search by the thing, not just the number",
              text: "By vehicle registration for motor, by insured name for health, by insurer across everything. A customer who rings about \"the Alto\" is not going to read you a policy number.",
            },
            {
              title: "A customer view that spans lines",
              text: "One policyholder with a bike, a car, a health floater and a shop policy is one record with four policies — and that view is what makes a renewal call a conversation about their cover rather than about one product.",
            },
            {
              title: "Premium figures that can be explained",
              text: "When a renewal quote is higher, the answer is in the breakdown: own damage up, NCB reset, a new add-on. A single stored figure cannot produce that answer.",
            },
            {
              title: "Documents retrievable by policy and year",
              text: "The schedule for the 2024 car policy, not \"the folder from 2024\". The document has to belong to the policy record.",
            },
            {
              title: "Exports that match the screen",
              text: "CSV or Excel of a filtered list, carrying the fields of the lines in it, and following the same access as the person who ran it.",
            },
          ],
        },
      ],
    },
    {
      heading: "What to ask about documents that are not policies",
      blocks: [
        {
          kind: "text",
          text: "A general insurance agency's folder is not all schedules. It has renewal notices, endorsements, premium receipts, cover notes and proposal forms, and they are not interchangeable.",
        },
        {
          kind: "list",
          items: [
            "An endorsement changes a policy that already exists. Software that treats it as a new policy has created a duplicate and a wrong renewal date.",
            "A renewal notice is the insurer's invitation, not evidence of cover. Storing it as the policy is a mistake that only shows up at a claim.",
            "A premium receipt proves payment and carries no cover details worth extracting.",
            "A cover note is temporary. It should not sit in the records as the current policy after the schedule arrives.",
          ],
        },
        {
          kind: "text",
          text: "Ask whether the product distinguishes these kinds, and what it does with a document it cannot classify. The right answer is that the kinds are separate and an unclassifiable document waits for a human, rather than being filed as a policy on a guess.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Also ask what happens to a non-insurance document",
          text: "Somebody will upload a registration certificate or an invoice. A product that rejects it before extraction has saved you a malformed policy record; one that extracts it anyway has put noise in the book that somebody has to find and delete.",
        },
      ],
    },
    {
      heading: "A short checklist to take to a demo",
      blocks: [
        {
          kind: "text",
          text: "Eleven questions, in the order they are worth asking. Any vendor should be able to answer all of them in a live screen.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Show me a motor policy with its full IDV breakdown and both premium streams.",
            "Now show me a long-term motor policy with separate third-party dates.",
            "Show me a family floater with four people under one sum insured.",
            "Show me an eleven-day travel policy and tell me when it expires.",
            "Search for a policy by vehicle registration number.",
            "Show me one customer who holds four policies across three insurers.",
            "Show me the original PDF for a policy from two years ago.",
            "Show me everything that expires in the next thirty days, across all lines.",
            "Upload a registration certificate and show me what happens to it.",
            "Show me what a sub-agent with the least access can see.",
            "Export the filtered list, and the documents.",
          ],
        },
        {
          kind: "text",
          text: "Insoora is our product and it answers the first ten of those, with the honest caveats this site states elsewhere: no commission, no claims, no quoting, no insurer integration, and commercial lines classified rather than modelled. The eleventh is worth running yourself rather than watching.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What features does general insurance management software need?",
      a: "Beyond the common policy fields: a vehicle modelled as a vehicle with a searchable registration number and the full IDV breakdown, health coverages with their own sums insured and person counts, cover periods read from the schedule so short-period and long-term policies land correctly, document kinds distinguished from one another, a customer view spanning lines of business, and one renewal list across the whole mixed book.",
    },
    {
      q: "How should software handle a long-term motor policy?",
      a: "With two separate periods: the policy's own cover dates and the third-party cover dates. A one-year own-damage cover inside three years of third party has two expiry dates, and a product with a single expiry field will either prompt you two years early or stay silent for two years.",
    },
    {
      q: "Does a family floater need one record or several?",
      a: "One policy, with a coverage carrying a sum insured and a person count. Modelling it as several policies creates records that will all appear for renewal when only one policy exists, and it breaks the customer view that is the point of having a client record.",
    },
    {
      q: "Is retail general insurance software suitable for commercial lines?",
      a: "Partly. Commercial property, marine and personal accident policies are usually classified and their schedule fields read, which is better than a folder. But open marine covers with declarations, group schemes with member lists and per-voyage certificates are workflows rather than fields, and a retail records product does not have them — ask directly and read a vague answer as a no.",
    },
    {
      q: "Why does the premium breakdown matter if I only need the total?",
      a: "Two reasons. It can be validated — the components should add up to the total, and a mismatch is a reliable sign something was misread. And it is the only way to explain a renewal quote that went up, because the answer is always in a component: own damage, a reset no-claim bonus, a new add-on.",
    },
    {
      q: "Should the software read policy wordings as well as schedules?",
      a: "Almost none do, and it is fair not to expect it. Waiting periods, grace periods and reinstatement terms live in the wording document rather than the schedule, so keep those where you keep the wording and do not rely on a schedule-reading system to surface them.",
    },
  ],
};
