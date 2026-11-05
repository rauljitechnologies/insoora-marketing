import type { Post } from "../types";

// A reference article rather than a how-to.
//
// It sits on the "How it works" shelf and not "For agents", which is a
// deliberate call: the agent-workflow articles are all "do this task" —
// organise the documents, chase the renewals, stop retyping. This one is
// "understand this thing", which is what that shelf already holds (what the
// software is, how OCR works). The title names agents because they are the
// ones who have to read a schedule correctly every day, not because the
// article is a workflow.
//
// ── On accuracy ──────────────────────────────────────────────────────────
//
// Everything below describes what Indian policy documents ordinarily contain
// and what the words on them mean. There are no statistics, no claims about
// how many agents do anything, and no regulatory citations beyond naming the
// regulator and the two schemes (IDV, NCB) that every motor policy carries.
// Where a field is NOT universal the text says so — the brief is explicit
// that the article must not imply every field exists in every policy, and
// that is also simply true: a health policy has no IDV and a motor policy has
// no nominee in the life-insurance sense.
//
// The product claims are held to the same line as the rest of the site: the
// renewals section says a list is BUILT from the expiry date and visible when
// someone opens it. It does not say a reminder is sent, because nothing sends
// one.

export const post: Post = {
  slug: "insurance-policy-details-explained",
  title:
    "Insurance Policy Details Explained: 15 Important Fields Every Agent Should Understand",
  // The H1 above is 84 characters, which is right for a headline and far too
  // long for a result snippet — hence a separate, shorter `metaTitle`. The
  // 60-character ceiling is enforced in lib/seo.
  metaTitle: "Insurance Policy Details Explained: 15 Key Fields",
  description:
    "What each field on an Indian insurance policy schedule means, where to find it, why it matters, and which fields apply only to certain policy types.",
  excerpt:
    "A policy schedule is the one page that actually describes the contract. Here is what each field on it means, which ones differ by policy type, and what to check before you file it.",
  published: "2026-11-06",
  updated: "2026-11-06",
  accent: "pink",
  category: "how-it-works",
  art: "schedule",
  audience: "Agents, agency teams and policyholders",
  related: [
    "ocr-in-insurance-how-digital-policy-extraction-works",
    "organize-insurance-policy-documents-digitally",
    "track-insurance-policy-renewals-and-important-dates",
  ],
  sections: [
    {
      heading: "The short answer",
      blocks: [
        {
          kind: "text",
          text: "An insurance policy document records who the insurer is, who is covered, what is covered, for how long, for how much, and at what price. Those facts live on one or two pages called the policy schedule. Everything else in the document — usually most of its length — is standard wording that explains how the contract behaves.",
        },
        {
          kind: "text",
          text: "If you can read a schedule confidently, you can file a policy correctly, answer a customer's question without opening the PDF twice, and spot the handful of mistakes that actually cause problems later. This article goes through the fields one at a time, says where each tends to appear, and is explicit about which ones do not apply to every kind of policy.",
        },
        {
          kind: "callout",
          tone: "note",
          title: "This is general explanation, not advice",
          text: "Terminology and layout vary between insurers and between products, and the wording in your customer's document governs their cover — not a summary on a website. Nothing here is individual insurance, legal or financial advice. When a specific policy's meaning matters, read that policy and ask the insurer.",
        },
      ],
    },
    {
      heading: "What is an insurance policy schedule?",
      blocks: [
        {
          kind: "text",
          text: "The schedule is the personalised part of the contract. It is the page that names your customer, their vehicle or their sum insured, their dates and their premium. Two people holding the same product from the same insurer get identical policy wording and completely different schedules.",
        },
        {
          kind: "text",
          text: "The policy wording — sometimes called the terms and conditions, or the policy document proper — is the opposite. It is the same for everyone who buys that product: what is covered, what is excluded, how to claim, how disputes are handled. It is long, it is rarely read, and it is where the answer lives when a claim gets difficult.",
        },
        {
          kind: "table",
          columns: ["", "Policy schedule", "Policy wording"],
          rows: [
            ["What it is", "The specific contract for one customer", "The standard terms of the product"],
            ["Changes per customer", "Yes — every field", "No — identical for every buyer"],
            ["Typical length", "One to three pages", "Ten to sixty pages"],
            ["What you file from it", "Almost everything", "Rarely anything"],
            ["When you need it", "Daily — renewals, queries, records", "At claim time, or when a dispute starts"],
          ],
        },
        {
          kind: "text",
          text: "There is a third thing worth knowing about: an endorsement. An endorsement is a document issued after the policy starts that changes something on the schedule — a corrected registration number, an added rider, a change of address. The endorsement overrides the original schedule for whatever it touches, which is why a policy with endorsements has to be read as the schedule plus everything issued after it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A schedule on its own can be out of date",
          text: "If a policy has been endorsed, the original schedule still shows the original values. Filing only the first PDF and trusting it is how an agent ends up quoting a registration number or a sum insured that was corrected months ago. Keep the endorsements with the policy.",
        },
      ],
    },
    {
      heading: "15 important insurance policy details",
      blocks: [
        {
          kind: "text",
          text: "Each of these appears on most schedules, but not all of them appear on all of them — the notes say which. Field names differ between insurers; the meanings do not.",
        },
        {
          kind: "h3",
          text: "1. Policy number",
        },
        {
          kind: "text",
          text: "The insurer's unique reference for this contract. It is usually at the top of the schedule, often in the header band or beside the insurer's logo, and it is the number you quote for anything — a claim, an endorsement, a renewal, a complaint. Applies to every policy. Verify it character by character: policy numbers are arbitrary strings, so no amount of context tells you that a 0 should have been an O, and this is the single field most worth double-checking against the PDF.",
        },
        {
          kind: "h3",
          text: "2. Insurance company (the insurer)",
        },
        {
          kind: "text",
          text: "The company carrying the risk, named in full somewhere in the header or the footer. Applies to every policy. Worth separating in your records from the intermediary who sold it — the insurer pays the claim, the agent or broker arranges the cover, and on some documents both names appear with similar prominence.",
        },
        {
          kind: "h3",
          text: "3. Policyholder name",
        },
        {
          kind: "text",
          text: "The person or entity who owns the contract and pays the premium. Applies to every policy. Check the spelling against identity documents rather than against what the customer told you over the phone; a mismatched name is a routine cause of friction at claim time, and it is trivially fixable by endorsement before a claim and awkward afterwards.",
        },
        {
          kind: "h3",
          text: "4. Insured person or insured asset",
        },
        {
          kind: "text",
          text: "What the cover actually attaches to, which is not always the policyholder. On a family health policy it is a list of members with their dates of birth. On a motor policy it is a vehicle. On a fire policy it is a building and its contents at a stated address. Applies to every policy, but takes a completely different shape in each line — which is exactly why a records system that only stores a customer name loses the information that matters.",
        },
        {
          kind: "h3",
          text: "5. Policy type and product name",
        },
        {
          kind: "text",
          text: "The line of business — motor, health, life, travel, property, marine, personal accident — and usually a marketing product name alongside it. Applies to every policy. The line of business determines which of the remaining fields even exist, so it is the first thing to establish when you are reading an unfamiliar document.",
        },
        {
          kind: "h3",
          text: "6. Policy start date",
        },
        {
          kind: "text",
          text: "When cover begins, often shown with a time as well as a date. Applies to every policy. On the schedule it usually sits in a period-of-insurance block beside the expiry date. Note that a start date is not the same as the date the policy was issued or paid for, and the two can differ by days.",
        },
        {
          kind: "h3",
          text: "7. Policy expiry date",
        },
        {
          kind: "text",
          text: "When cover ends — the most operationally important date on the document, because everything about renewal hangs off it. Applies to every policy. It is commonly printed as \"valid up to\" or as the second half of a period-of-insurance line, and it frequently carries a time: cover to midnight on a date is not the same as cover to midday. Read the date off the schedule rather than calculating it as a year from the start, because short-period and long-period policies both exist.",
        },
        {
          kind: "h3",
          text: "8. Premium amount",
        },
        {
          kind: "text",
          text: "What the customer pays. Applies to every policy. The schedule usually breaks it down — a base or net premium, the individual covers, GST, and a total. The total is the figure the customer recognises; the breakdown is the figure you need when they ask why the price moved at renewal. Record which one you are storing, because a records system holding net premium for some policies and gross for others produces reports that cannot be read.",
        },
        {
          kind: "h3",
          text: "9. Sum insured",
        },
        {
          kind: "text",
          text: "The maximum the insurer will pay. Applies to most general insurance; on a life policy the equivalent is usually called the sum assured. This is the field most often confused with premium, and they are opposite ends of the contract: the premium is the small number the customer pays, the sum insured is the large number the insurer might pay. On a family floater health policy the sum insured is normally shared across every member rather than held by each of them, which is a distinction worth being able to explain.",
        },
        {
          kind: "h3",
          text: "10. IDV — Insured Declared Value",
        },
        {
          kind: "text",
          text: "The agreed current value of a vehicle, and the amount payable if it is stolen or written off. Applies to motor policies only — there is no IDV on a health, life or travel policy. It falls each year as the vehicle depreciates, and it is the motor equivalent of a sum insured rather than an extra field. Check it at renewal: an IDV set too low underpays a total-loss claim, and one set too high raises the premium without raising what a claim will actually pay.",
        },
        {
          kind: "h3",
          text: "11. Vehicle registration and identification details",
        },
        {
          kind: "text",
          text: "Registration number, engine number, chassis number, make, model, variant, year of manufacture, cubic capacity and seating capacity. Applies to motor policies only. The registration number is the field customers quote and the one most often mistyped; the engine and chassis numbers are what actually identify the vehicle at claim time. A new vehicle may be insured before registration, in which case the registration field reads as applied-for and has to be endorsed once the number is issued — a policy left in that state is a real problem at claim time.",
        },
        {
          kind: "h3",
          text: "12. Add-ons, riders and extensions",
        },
        {
          kind: "text",
          text: "Optional covers bought on top of the base product: zero-depreciation, engine protection or roadside assistance on motor; critical illness or accidental death riders on life and health; baggage or trip-cancellation extensions on travel. Not universal — a plain base policy has none. They are usually listed in their own block with a premium against each, and they are the single most common thing missing from a hand-typed record, because whoever typed it copied the headline fields and stopped.",
        },
        {
          kind: "h3",
          text: "13. Deductible, excess and co-payment",
        },
        {
          kind: "text",
          text: "The part of a claim the customer bears. Motor policies carry a compulsory excess and may carry a voluntary one chosen to reduce the premium. Health policies may carry a deductible, or a co-payment expressed as a percentage, or a room-rent limit that behaves like one in practice. Not universal and easy to overlook, and it is the field that most often surprises a customer at claim time — which makes it worth reading aloud at the point of sale rather than leaving in the document.",
        },
        {
          kind: "h3",
          text: "14. Nominee details",
        },
        {
          kind: "text",
          text: "Who receives the benefit if the insured dies. Standard on life insurance and on personal accident cover, normally present on health policies, and not a meaningful field on an ordinary motor own-damage or property policy — though motor policies do carry compulsory personal accident cover for the owner-driver, which has a nominee of its own. Where it applies it is worth confirming at renewal, because nominations go stale after a marriage, a death or a birth and nobody thinks to update them.",
        },
        {
          kind: "h3",
          text: "15. Terms, conditions and exclusions",
        },
        {
          kind: "text",
          text: "What the policy does not cover, and the conditions attached to what it does. Applies to every policy. Some of this is on the schedule as a short list of special conditions or warranties specific to this contract; the bulk is in the policy wording. Waiting periods on health cover, the pre-existing disease clause, and geographical limits on travel cover are the exclusions that generate the most questions. Nothing in a records system substitutes for the wording itself, which is the practical argument for keeping the original PDF attached to the record rather than only the fields you extracted from it.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "No-claim bonus, where it applies",
          text: "Motor and health policies often show an NCB — a discount earned by not claiming, shown as a percentage. It is not in the fifteen because it is a pricing adjustment rather than a term of cover, but it is worth capturing: it carries over when a customer switches insurer, and a customer who loses proof of it loses money.",
        },
      ],
    },
    {
      heading: "What differs between motor, health, life and travel",
      blocks: [
        {
          kind: "text",
          text: "Roughly half the schedule is common to every line and the rest is specific. This is the part that makes a single flat template for policy records a bad idea.",
        },
        {
          kind: "table",
          columns: ["Detail", "Motor", "Health", "Life", "Travel"],
          rows: [
            ["Policy number, insurer, policyholder", "Yes", "Yes", "Yes", "Yes"],
            ["Start and expiry dates", "Yes", "Yes", "Yes — long term", "Yes — trip dates"],
            ["Premium", "Yes", "Yes", "Yes — recurring", "Yes — one-off"],
            ["Sum insured / assured", "Via IDV", "Yes", "Yes — sum assured", "Yes — per benefit"],
            ["IDV", "Yes", "No", "No", "No"],
            ["Vehicle details", "Yes", "No", "No", "No"],
            ["Members covered", "No", "Yes — with ages", "The life assured", "Travellers"],
            ["Nominee", "For the PA cover", "Usually", "Yes — central", "Usually"],
            ["Deductible / co-pay", "Compulsory excess", "Often", "No", "Sometimes"],
            ["Geography", "Usually India", "Usually India", "n/a", "Yes — the destination"],
          ],
        },
        {
          kind: "text",
          text: "Life insurance is the outlier on dates. A term or endowment policy runs for decades with premiums due annually or monthly, so the date that matters day to day is the next premium due date rather than an expiry. Travel is the other extreme: cover is measured in days and tied to a trip, and an expired travel policy is simply a finished one rather than a lapse to chase.",
        },
      ],
    },
    {
      heading: "How to verify a policy before you file it",
      blocks: [
        {
          kind: "text",
          text: "A short pass over the schedule at the point it arrives costs a minute and saves the conversation where a customer discovers a mistake at claim time.",
        },
        {
          kind: "list",
          items: [
            "Policy number — read it against the PDF character by character, not from memory.",
            "Insurer and product — the company carrying the risk, not only the intermediary.",
            "Policyholder name — spelled as it is on identity documents.",
            "Who or what is insured — every member on a family policy, or the vehicle's registration, engine and chassis numbers.",
            "Start and expiry dates — read off the document, including the time where one is printed.",
            "Premium — and note whether you are recording the net figure or the gross.",
            "Sum insured, or IDV on a motor policy — and sanity-check the IDV against the vehicle's age.",
            "Add-ons and riders — each one listed, because this is what hand-typed records usually drop.",
            "Deductible, excess or co-payment — the number the customer will be surprised by otherwise.",
            "Nominee — present where the line of business calls for it, and still current.",
            "Endorsements — anything issued after the schedule, filed with it.",
            "The original PDF — kept, not just the fields read out of it.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Check the dates against the previous policy, not just the new one",
          text: "On a renewal, the new start date should follow the old expiry date with no gap. A one-day gap is a break in cover, and on motor policies a break can also cost the customer their accumulated no-claim bonus. Comparing the two documents catches it; reading the new one alone does not.",
        },
      ],
    },
    {
      heading: "Common mistakes when reading policy documents",
      blocks: [
        {
          kind: "text",
          text: "These are ordinary, repeatable errors rather than exotic ones, and all of them come from a schedule being read quickly.",
        },
        {
          kind: "list",
          items: [
            "Confusing premium with sum insured. They are the two most prominent numbers on the page and they mean opposite things. If a record shows a sum insured of ₹14,000 something has been transposed.",
            "Reading the issue date as the start date. A document issued on the 3rd may provide cover from the 10th, and filing the wrong one makes every renewal calculation a week early.",
            "Taking the expiry date as a year after the start. Short-period and multi-year policies both exist, and motor third-party cover on a new vehicle commonly runs for a different term than own-damage cover on the same document.",
            "Missing the endorsements. The schedule is the original contract; the endorsements are the corrections. A record built from the schedule alone can be confidently wrong.",
            "Mistyping the policy number. There is no context to catch an error in an arbitrary string, so a single wrong character survives every later check.",
            "Dropping the add-ons. Base cover gets recorded and the riders the customer actually paid extra for do not, which turns into an argument at claim time.",
            "Reading a family floater sum insured as per-member. It is normally shared across the family, and explaining it as per-person oversells the cover.",
          ],
        },
      ],
    },
    {
      heading: "Where digital policy records help",
      blocks: [
        {
          kind: "text",
          text: "None of the above is difficult. It is just repetitive, and it is repetitive at exactly the moment an agent is busy — which is why it gets skipped and why the errors above are so consistent across the trade.",
        },
        {
          kind: "text",
          text: "Keeping policies as structured records rather than as a folder of PDFs changes three things in practice. The fields become searchable, so answering \"what is Priya's policy number\" does not mean opening files until you find the right one. The records sit under the customer rather than under a filename, so a household's four policies are visible together. And the expiry dates become a list you can sort, instead of a date buried on page one of each document.",
        },
        {
          kind: "text",
          text: "[Insoora](/insurance-policy-management-software) is built around that: it reads the schedule out of a policy PDF, files the record under the right customer with the original document attached, and builds a renewals view from the expiry date it read. Fields it cannot read confidently are marked for review rather than filled in with a guess — which matters most for precisely the fields this article says to check twice. [How the extraction actually works](/blog/ocr-in-insurance-how-digital-policy-extraction-works) covers where it is reliable and where it is not.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What a records system does not do",
          text: "It does not issue policies, settle claims, or connect to an insurer's systems. It does not send renewal reminders on its own — the renewals list is there when someone opens it, and acting on it is still a person's job. And it does not replace reading the policy wording: extracted fields are a convenience, and the original PDF stays the source of truth.",
        },
        {
          kind: "text",
          text: "If the manual side is what you are trying to reduce, [cutting down policy data entry](/blog/reduce-manual-insurance-policy-data-entry) is the practical companion to this article, and [organizing policy documents digitally](/blog/organize-insurance-policy-documents-digitally) covers the filing structure underneath it.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Where can I find my insurance policy number?",
      a: "On the policy schedule, almost always on the first page — commonly in the header band at the top, beside or under the insurer's logo. It is also quoted on renewal notices, premium receipts and any endorsement issued against the policy. If you have several documents from the same insurer, the policy number is what tells them apart.",
    },
    {
      q: "What is the difference between premium and sum insured?",
      a: "The premium is what you pay the insurer; the sum insured is the maximum the insurer will pay you. They are the two largest numbers on a schedule and they mean opposite things — a health policy might carry a sum insured of ₹5,00,000 for a premium of ₹12,000 a year. On life insurance the sum insured is usually called the sum assured, and on motor policies the equivalent for the vehicle itself is the IDV.",
    },
    {
      q: "What is a policy schedule?",
      a: "The personalised page of the contract: your name, what is covered, the dates, the premium and the sum insured. It is what makes your policy yours. The rest of the document is the policy wording, which is identical for everyone who buys the same product and sets out the terms, conditions and exclusions.",
    },
    {
      q: "Where is the policy expiry date mentioned?",
      a: "In the period-of-insurance block on the schedule, usually as the second of a pair of dates, and often labelled \"valid up to\" or \"to\". It frequently carries a time as well as a date. Read it off the document rather than assuming a year from the start date — short-period and multi-year policies both exist, and on a motor policy the third-party and own-damage components can run for different terms.",
    },
    {
      q: "Is IDV applicable to every insurance policy?",
      a: "No. IDV — Insured Declared Value — appears only on motor insurance. It is the agreed current value of the vehicle and the amount payable if it is stolen or declared a total loss, and it decreases each year as the vehicle depreciates. Health, life and travel policies have no IDV; their equivalent is the sum insured or sum assured.",
    },
    {
      q: "Do all insurance policies contain nominee details?",
      a: "No. A nominee is central to life insurance and to personal accident cover, and is normally present on health policies. An ordinary motor own-damage or property policy has no nominee in that sense — although the compulsory personal accident cover for an owner-driver that sits on a motor policy does have one. Where a nominee applies, it is worth confirming at renewal, because nominations go out of date after a marriage, a birth or a death.",
    },
    {
      q: "Why should I keep the original policy PDF?",
      a: "Because the extracted fields are a convenience and the document is the contract. Exclusions, waiting periods, special conditions and the exact wording of a cover are in the policy document, not in a summary of it. Keeping the original also lets anyone check a field against its source when a value looks wrong — which is the only reliable way to catch a mistyped policy number.",
    },
    {
      q: "How can an insurance agent organize policy documents?",
      a: "File by customer rather than by document, so a household's policies sit together; record the fields you need to search on — policy number, insurer, expiry date, premium, sum insured — rather than all of them; keep every endorsement with the policy it amends; and keep the original PDF attached to the record. Doing it by hand in a spreadsheet works at small volumes. Policy management software does the same thing by reading the fields off the document instead of asking someone to type them.",
    },
  ],
};
