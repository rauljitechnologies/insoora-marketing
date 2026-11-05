import type { SolutionPage } from "../types";

// The line-of-business page. Its job is to answer "does it understand MY kind
// of policy?", and the only useful way to answer that is with the actual
// fields the platform models per line — which is why this page leads with a
// table and not with a hero claim.
//
// Every field named below exists on the schema the product stores against a
// policy (Vehicle, Premium, Coverage, Addon and the Policy row itself). The
// page says which lines are modelled in detail and which are classified but
// thinly modelled, because "general insurance" covers commercial lines this
// product has not been built around and a page that implies otherwise would
// be selling to the wrong agency.

export const page: SolutionPage = {
  slug: "general-insurance-management-software",
  group: "solution",
  metaTitle: "General Insurance Management Software — Motor and Health",
  description:
    "General insurance software that models what each line actually carries: IDV and NCB on motor, sum insured and TPA on health, and the full premium breakdown.",
  accent: "green",
  badge: "Motor, health, travel, property, marine, PA",
  h1: {
    lead: "General insurance management software that knows",
    highlight: "a motor policy from a health one.",
  },
  lede:
    "A general insurance book is not one shape. A motor schedule carries an IDV breakdown, a no-claim bonus and a third-party period; a health policy carries a sum insured, a floater and a TPA. Insoora models them separately, because an extraction that flattens every line into insurer, number and date has thrown away most of the policy.",
  checks: [
    "Seven lines of business classified",
    "Motor: registration, IDV, NCB, TP period",
    "Health: sum insured, persons, TPA",
    "Full premium split, GST included",
  ],
  heroShot: "extracted",
  nav: {
    label: "General insurance",
    hint: "What each line of business actually carries",
  },
  footerColumn: "solutions",
  primaryKeyword: "General Insurance Management Software",
  secondaryKeywords: [
    "General Insurance Software",
    "General Insurance Agency Software",
    "Motor Insurance Management Software",
    "Health Insurance Policy Management Software",
    "Vehicle Insurance Policy Tracking Software",
    "General Insurance Policy Management Software",
  ],
  sections: [
    {
      kind: "table",
      id: "lines-of-business",
      accent: "green",
      eyebrow: "Start here",
      heading: "What is modelled, line by line",
      lede:
        "Every policy is classified into one of these. The middle column is what the platform stores beyond the common fields; the right column is how honestly you should expect it to read.",
      columns: ["Line of business", "Modelled beyond the common fields", "What to expect"],
      rows: [
        [
          "Motor",
          "Registration number, make, model, variant, fuel type, manufacturing year, engine and chassis number, cubic capacity, seating capacity, gross vehicle weight, the IDV breakdown (vehicle, electrical and non-electrical accessories, CNG/LPG kit, trailer, total), financier, no-claim bonus percentage, and separate third-party cover dates for long-term policies.",
          "The most thoroughly modelled line, and the one most Indian agents have most of. Own-damage and third-party premium are split out.",
        ],
        [
          "Health",
          "Coverages with a sum insured and number of persons each, add-ons, the TPA, and the nominee and relationship where the schedule states them.",
          "Well modelled. Family floaters come through as a coverage with a person count rather than as separate policies.",
        ],
        [
          "Life",
          "Product name, UIN, nominee and relationship, payment mode, and the policy term dates.",
          "Solid on the schedule fields. Bonus, fund value and unit statements are not policy-schedule data and are not read.",
        ],
        [
          "Travel",
          "Coverages with sums insured, geographical area, and the cover period — which on travel is often days rather than a year.",
          "Short-period cover is handled; the expiry date is taken from the schedule rather than assumed to be a year out.",
        ],
        [
          "Property",
          "Coverages and sums insured, add-ons, branch and geographical area.",
          "Classified and the schedule fields are read. The asset itself is not modelled the way a vehicle is.",
        ],
        [
          "Marine",
          "Coverages, sums insured and the cover period.",
          "Classified, thinly modelled. Open covers, declarations and per-voyage certificates are not supported as a workflow.",
        ],
        [
          "Personal accident",
          "Coverages with sum insured and number of persons, nominee details.",
          "Classified and read as a schedule. Group PA with a large member list is not a workflow this product has.",
        ],
      ],
      note:
        "A document that is not insurance at all — an RC, an invoice, a bank statement, a payslip — is rejected by a classifier before any extraction runs, so it never becomes a policy record. A borderline document waits for an administrator to accept or reject it.",
    },
    {
      kind: "split",
      id: "motor",
      accent: "blue",
      eyebrow: "The line most agents live in",
      heading: "Motor policies, in the detail a motor policy has",
      lede:
        "If your book is mostly two-wheelers and private cars, this is the section that decides whether the product is worth your time.",
      paragraphs: [
        "A motor schedule is a dense document. Insoora reads the vehicle out of it as a vehicle — registration number, make, model and variant, fuel type, year of manufacture, engine and chassis numbers, cubic capacity, seating capacity and the financier where one is named — rather than as a line of text in a notes field.",
        "The insured declared value is read as the breakdown it is on the schedule: the vehicle, electrical accessories, non-electrical accessories, a CNG or LPG kit and a trailer, each with its own figure, and the total. The same goes for premium, where own damage and third party are separate numbers before discounts, no-claim bonus, loading, GST and the final figure.",
        "Long-term third-party cover gets its own start and end dates, which is the detail that makes a bundled policy legible: a one-year own-damage cover sitting inside three years of third party has two expiry dates, and only one of them is the one you need to act on.",
      ],
      bullets: [
        "Registration number searchable, with a vehicles view of its own in the back office",
        "No-claim bonus percentage captured, so a late renewal's cost to the customer is visible",
        "Previous insurer, previous policy number and previous expiry where the schedule states them",
      ],
      shot: "policyList",
      limit:
        "Insoora does not value a vehicle, calculate an IDV, quote a premium or verify a registration against a government database. It reads what the schedule says.",
    },
    {
      kind: "cards",
      id: "premium-detail",
      accent: "purple",
      eyebrow: "The figures",
      heading: "Premium read as a breakdown, then checked",
      lede:
        "A single premium number is the least useful thing to store about a policy. These are read separately and then validated against each other.",
      cards: [
        {
          icon: "table",
          title: "The components",
          text: "Basic premium, own damage, third party and add-on premium, each as its own figure where the schedule separates them.",
        },
        {
          icon: "check",
          title: "Discounts and loading",
          text: "Discount, no-claim bonus discount and loading, so the net premium can be traced to how it was arrived at.",
        },
        {
          icon: "file",
          title: "Tax, split out",
          text: "GST, and CGST, SGST, IGST and cess where the document states them individually rather than as one total.",
        },
        {
          icon: "chart",
          title: "Arithmetic validation",
          text: "Net premium plus tax is checked against the final premium. A sum that does not add up is a signal the extraction needs a human, and it is treated as one.",
        },
        {
          icon: "eye",
          title: "Traceable to a page",
          text: "An extracted coverage records the page of the document it was read from, so a questioned figure can be checked against its source.",
        },
        {
          icon: "settings",
          title: "Per-insurer rules",
          text: "Where one insurer's layout labels a field unusually, an administrator can add aliases and patterns for that insurer and test them against a real document before saving.",
        },
      ],
    },
    {
      kind: "split",
      id: "one-book",
      accent: "teal",
      eyebrow: "A mixed book",
      heading: "Seven lines, one list to work from",
      lede:
        "The point of classifying lines separately is not to keep them apart. It is to let one list be trustworthy.",
      paragraphs: [
        "A general insurance agency's real question on a Monday morning is not \"show me motor\". It is \"what expires in the next thirty days\", and the answer has to include a car policy, a family floater and a shop fire policy in one list, each with a correct date.",
        "Because every expiry comes from its own schedule rather than from a convention — a year after the start date — a mixed book works. Short-period travel cover, a multi-year motor policy and a policy endorsed mid-term all land on the right day, and the one-year assumption that breaks all three is never made.",
        "The same holds for a customer. One policyholder with a bike, a car, a health floater and a shop policy is one record with four policies under it, not four records that happen to share a name.",
      ],
      bullets: [
        "Filter by line of business, insurer, status or expiry window",
        "One policyholder record spanning every line they hold",
        "Export a mixed list to CSV or Excel with the same access rules as the screen",
      ],
      shot: "searchExport",
      limit:
        "There is no per-line reporting beyond filtering and export: no premium-by-line dashboard, no growth comparison and no portfolio analysis.",
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "Where this product stops",
      heading: "What general insurance software this is not",
      lede:
        "\"General insurance\" is a wide category, and a product built for retail lines should say which parts of it it was not built for.",
      items: [
        {
          title: "Not a broking or commercial-lines system",
          text: "Open marine covers, declaration-based policies, group schemes with member lists, reinsurance and treaty business are not workflows here. Policies of those kinds are classified and their schedules read, but the product was not designed around them.",
        },
        {
          title: "No claims management",
          text: "There is no claim intimation, no claim file, no document checklist and no claim status tracking. Insoora manages policy records, not claims.",
        },
        {
          title: "No quoting, comparison or issuance",
          text: "It does not quote, compare insurers, calculate an IDV or premium, or issue cover. There is no connection to any insurer's system in either direction.",
        },
        {
          title: "No commission statements",
          text: "A commission rate stated on a document is stored with the policy, but there is no commission calculation, no brokerage statement, no sub-agent split and no reconciliation against what an insurer paid.",
        },
      ],
    },
    {
      kind: "usecases",
      id: "use-cases",
      accent: "orange",
      eyebrow: "Who it fits",
      heading: "Three general insurance books, three different gains",
      cases: [
        {
          who: "Mostly motor",
          situation:
            "Four hundred two-wheeler and car policies a year, each schedule retyped into a sheet as registration number, insurer, premium and date.",
          outcome:
            "The schedule is read once. Registration, IDV breakdown, NCB and both expiry dates come out of it, and the renewal list builds itself.",
        },
        {
          who: "Motor and health together",
          situation:
            "Two spreadsheets with different columns, because a health floater does not fit a motor sheet and nobody wanted one sheet with forty columns.",
          outcome:
            "One book. Each line keeps the fields it actually has, and the renewal list and the customer record span both.",
        },
        {
          who: "A small agency with a mixed book",
          situation:
            "Shop fire, marine and PA policies sit in a folder because they are too few to justify a sheet of their own, and are the ones most likely to lapse.",
          outcome:
            "They are uploaded with everything else, classified, filed under their customer, and appear on the same thirty-day list as the motor book.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is general insurance management software?",
      a: "It is software for managing non-life policies — motor, health, travel, property, marine and personal accident — across their records, documents and renewal dates. Insoora does this by reading the policy PDF, modelling the fields that line of business actually carries, and tracking expiry from the schedule.",
    },
    {
      q: "Does it handle motor insurance properly, or just store a policy number?",
      a: "Motor is the most thoroughly modelled line. The vehicle is stored as a vehicle — registration number, make, model, variant, fuel type, year, engine and chassis numbers, cubic capacity, seating capacity, financier — along with the full IDV breakdown, the no-claim bonus percentage, and separate third-party cover dates for long-term policies.",
    },
    {
      q: "Can it manage health insurance with family floaters?",
      a: "Yes. A health policy's coverages are read individually with a sum insured and a number of persons each, so a family floater comes through as one policy with a person count rather than as several policies sharing a number. The TPA and the nominee are captured where the schedule states them.",
    },
    {
      q: "Does it work for commercial lines and group policies?",
      a: "Partly, and it is worth being clear about the limit. Commercial property, marine and personal accident policies are classified and their schedules are read, but the product was designed around retail lines. Open covers, declaration-based policies and group schemes with member lists are not workflows it has.",
    },
    {
      q: "Does it calculate premium or IDV?",
      a: "No. It reads the premium breakdown and the IDV breakdown off the schedule and checks that the components add up to the stated total. It does not value a vehicle, rate a risk or quote anything.",
    },
    {
      q: "What happens if a document is not an insurance policy at all?",
      a: "A classifier rejects it before extraction runs, so an RC, an invoice, a bank statement or a payslip never becomes a policy record. A document that scores as borderline is held for an administrator to accept or reject rather than being processed on a guess.",
    },
  ],
  related: [
    {
      href: "/insurance-policy-management-software",
      label: "Policy management",
      text: "What a policy record is, and the lifecycle it goes through.",
    },
    {
      href: "/insurance-policy-entry-software",
      label: "How the fields are read",
      text: "The extraction pipeline, from text layer to confirmed record.",
    },
    {
      href: "/insurance-renewal-management-software",
      label: "Renewals across a mixed book",
      text: "Why a short-period travel policy and a multi-year motor policy both land correctly.",
    },
    {
      href: "/insurance-agency-management-software",
      label: "Running the agency",
      text: "One book of business shared across several people.",
    },
    {
      href: "/features",
      label: "Every feature, with its limits",
      text: "The complete capability list in detail.",
    },
    {
      href: "/blog/ocr-in-insurance-how-digital-policy-extraction-works",
      label: "Guide: how extraction works",
      text: "What OCR can and cannot read off an insurance document.",
    },
  ],
  cta: {
    eyebrow: "Test it on your hardest layout",
    title: "Upload the schedule you would least want to retype.",
    lede: "A dense motor schedule or a family floater is the fair test — not the tidiest PDF you own.",
    secondary: { href: "/product-in-action", label: "See every screen" },
  },
};
