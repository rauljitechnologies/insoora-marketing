import type { Post } from "../types";

// The data-entry article, and the one most at risk of being an advert.
//
// What keeps it from being one: more than half of it is advice that works
// without any software at all — the field shortlist, the entry-at-source
// habit, the single-pass rule — because an agency that cannot buy software
// this quarter can still halve the work. The software section is last and
// states its limits.

export const post: Post = {
  slug: "reduce-manual-insurance-policy-data-entry",
  title: "Insurance Policy Entry Software: How to Reduce Manual Data Entry",
  metaTitle: "How to Reduce Manual Insurance Policy Data Entry",
  description:
    "Where policy data entry time actually goes, four habits that cut it without new software, and what reading documents instead of typing them changes.",
  excerpt:
    "Most advice about data entry is about typing faster. The work that disappears is the work you stop doing at all — and four of the five ways to do that need no software.",
  published: "2026-10-25",
  updated: "2026-10-25",
  accent: "purple",
  category: "agent-workflow",
  art: "keyboard",
  audience: "Agents entering policies by hand",
  related: [
    "what-is-insurance-policy-management-software",
    "ocr-in-insurance-how-digital-policy-extraction-works",
    "organize-insurance-policy-documents-digitally",
    "insurance-policy-details-explained",
  ],
  sections: [
    {
      heading: "Where the time actually goes",
      blocks: [
        {
          kind: "text",
          text: "Ask an agent how long it takes to enter a policy and you will be told three or four minutes. Watch them do thirty and the average is closer to seven, because the three or four minutes is the typing and the rest is everything around it.",
        },
        {
          kind: "table",
          columns: ["The step", "Roughly", "Can it be removed?"],
          rows: [
            [
              "Finding the document",
              "30–90 seconds",
              "Yes, almost entirely — this is a filing problem, not an entry problem.",
            ],
            [
              "Reading the schedule to locate the fields",
              "60–120 seconds",
              "Yes, if the fields are read off the document rather than located by eye.",
            ],
            [
              "Typing the fields",
              "90–180 seconds",
              "Yes, if the document is read. No, if you are typing.",
            ],
            [
              "Deciding which customer it belongs to",
              "20–60 seconds",
              "Mostly — matching on the mobile number from the document does this.",
            ],
            [
              "Re-checking a number you are unsure of",
              "30+ seconds, sometimes several times",
              "Partly. Flagging an uncertain field concentrates the checking instead of spreading it.",
            ],
            [
              "Filing the document somewhere findable",
              "30–60 seconds",
              "Yes, if the document is attached to the record it produced.",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "The unmeasured cost",
          text: "None of the above counts the cost of the fields you skipped. Faced with forty fields on a motor schedule and a sheet with eight columns, everyone keeps the eight — and the other thirty-two stay inside the PDF, unsearchable, until somebody needs the chassis number.",
        },
      ],
    },
    {
      heading: "Four habits that cut the work without new software",
      blocks: [
        {
          kind: "text",
          text: "Worth doing first, whatever you decide about software, because three of them are prerequisites for software working well anyway.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Enter at source, in one pass",
              text: "The expensive pattern is: policy arrives, gets saved to be dealt with later, and \"later\" becomes a batch of forty. A batch costs more per policy than the same forty done on arrival, because every one of them needs the document found again and the context rebuilt. One policy on arrival is three minutes; the same policy in a Saturday batch is seven.",
            },
            {
              title: "Decide your field shortlist once, deliberately",
              text: "If you are going to type, choose which fields in advance rather than deciding per policy — and choose them for retrieval, not for completeness. Policy number, insurer, customer, mobile, line of business, start, expiry, final premium, and for motor the registration number. Nine fields, typed consistently, beat fifteen typed when there was time.",
            },
            {
              title: "Name the file before you save it",
              text: "A convention, applied every time, and it is worth a minute: policy number, then the vehicle registration or the line of business, then the year. `7741920883-GJ06KQ9835-2026.pdf`. This single habit removes the first row of the table above, and it is the difference between a folder you can search and one you can only scroll.",
            },
            {
              title: "Never type a date you have not looked at",
              text: "The common shortcut is to read the start date and add a year. It is right most of the time and wrong about short-period cover, long-term motor and anything endorsed mid-term — which are exactly the policies where being wrong matters. Read the expiry off the schedule, every time.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "If you do only one of these",
          text: "Do the filename convention. It costs a minute a policy, it pays back the first time a customer rings, and it makes every later decision — including whether to buy software — cheaper.",
        },
      ],
    },
    {
      heading: "What reading a document instead of typing it changes",
      blocks: [
        {
          kind: "text",
          text: "This is the step change, and it is worth being precise about what the change is, because \"faster data entry\" is not it.",
        },
        {
          kind: "text",
          text: "Software that reads a policy PDF parses the document's text layer — the characters are in the file and can be read exactly — or runs OCR over pages that are scans with no text. It then extracts fields by rule: label-and-value pairs, values inline in a sentence, period expressions, table cells, and patterns written for a particular insurer's layout. Dates and amounts are normalised, and the figures are checked against each other: net premium plus tax against the final premium, the IDV components against the total.",
        },
        {
          kind: "text",
          text: "Three things follow, and only the first is about speed.",
        },
        {
          kind: "list",
          items: [
            "The typing goes. Entry becomes a review pass: confirm what was read, correct what was flagged.",
            "The field shortlist goes with it. A system reading the document has no reason to keep eight fields rather than forty, so the chassis number and the no-claim bonus percentage are there whether or not anyone would have typed them.",
            "The figures get provenance. The extracted value is shown beside the page it came from, so a disputed premium is a question with an answer rather than an argument about a spreadsheet cell.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The one thing to insist on",
          text: "Ask what happens to a field the system could not read confidently. Flagged for a human is the only safe answer. A system that fills an uncertain field with a plausible value has produced a record that looks correct and is not, and a wrong expiry date is invisible until the cover has lapsed.",
        },
      ],
    },
    {
      heading: "Review is still work. Make it the right amount.",
      blocks: [
        {
          kind: "text",
          text: "The honest version of automated entry is not zero effort. It is a different, smaller effort, and agencies that get no benefit are usually the ones that did not organise this part.",
        },
        {
          kind: "h3",
          text: "Review in batches, not per policy",
        },
        {
          kind: "text",
          text: "The instinct is to upload one policy and confirm it immediately. Upload the morning's policies together and confirm them in one pass instead: the context is the same for all of them, and a run of ten confirmations takes a fraction of ten separate interruptions.",
        },
        {
          kind: "h3",
          text: "Decide who confirms before you delegate uploading",
        },
        {
          kind: "text",
          text: "Uploading is mechanical. Confirming carries judgement — whether an expiry date is right, whether a premium figure is the one the customer paid — and it is the step a customer may later dispute. Letting a junior upload while a senior confirms is the arrangement most agencies want for the first few hundred policies, and it is much easier to loosen later than to tighten after three hundred unchecked records.",
        },
        {
          kind: "h3",
          text: "Treat the review count as an inbox",
        },
        {
          kind: "text",
          text: "Flagged fields accumulate silently and they are the one backlog that makes other things wrong. A renewal list built on sixty unconfirmed expiry dates is a renewal list that is sixty policies untrustworthy. End the week at zero.",
        },
      ],
    },
    {
      heading: "What still has to be typed",
      blocks: [
        {
          kind: "text",
          text: "Every product in this space has an edge where reading stops working, and it is worth planning for rather than discovering.",
        },
        {
          kind: "list",
          items: [
            "Photographs of printed policies. A creased page photographed at an angle in poor light is the weakest case for OCR, and a careful human often reads it better. For a handful of old policies, typing is the faster route.",
            "Unusual commercial layouts. A product built around retail motor and health will read a bespoke commercial schedule less well, because nobody has written rules for a layout it has seen twice.",
            "Anything in the policy wording. Waiting periods, grace periods and reinstatement terms are not on the schedule, so no schedule-reading system will surface them.",
            "Facts that are not in the document at all. Who referred the customer, what they asked for, which competitor they were comparing against. If you want that recorded, you are typing it.",
          ],
        },
        {
          kind: "text",
          text: "A reasonable expectation for a retail general insurance book is that the great majority of insurer-issued digital PDFs read with a short review, scans read with a longer one, and a small tail needs typing. Nobody can give you a number for your book but your own documents.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to find your own number",
          text: "Take five policies — your insurers, including the worst scan you own — and put them through whatever you are evaluating. Count the fields that came out right, the fields flagged, and the fields wrong but confident. That third number is the one that matters, and it is the one no vendor publishes.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How can I reduce manual insurance policy data entry?",
      a: "Four changes need no software: enter each policy on arrival rather than in batches, fix a short field list in advance and type it consistently, name every document file by policy number and year so it is findable, and always read the expiry date off the schedule instead of adding a year to the start date. Beyond that, software that reads the PDF removes the typing itself and replaces it with a review pass.",
    },
    {
      q: "Is automated policy data entry accurate enough to trust?",
      a: "On insurer-issued digital PDFs, usually yes with a review pass; on photographs of printed policies, considerably less. The question that matters more than accuracy is what the system does when it is unsure — flagging the field for a human is safe, filling it with a plausible guess is not, because a wrong value that looks confident is invisible until it causes a problem.",
    },
    {
      q: "Does automation mean nobody has to check the data?",
      a: "No, and a vendor suggesting otherwise is overselling. The work changes shape: instead of transcribing forty fields you confirm what was read and correct what was flagged. Doing that in batches, and keeping the flagged count at zero at the end of each week, is what makes the saving real.",
    },
    {
      q: "Which fields are worth typing if I am not using software?",
      a: "Nine, chosen for retrieval rather than completeness: policy number, insurer, customer name, mobile number, line of business, cover start, cover expiry, final premium, and the vehicle registration number for motor. Nine typed consistently are worth more than fifteen typed when there was time.",
    },
    {
      q: "Why is entering a policy on arrival cheaper than in a batch?",
      a: "Because most of the cost is around the typing, not in it. A policy done on arrival needs no document hunt and no context rebuild; the same policy in a Saturday batch of forty needs both. The per-policy time roughly doubles in a batch, which is the opposite of what batching usually does.",
    },
    {
      q: "Will OCR read a photo of a printed policy taken on a phone?",
      a: "Sometimes, with noticeably lower accuracy, and this is the weakest case in the whole category. A creased page shot at an angle in poor light is often read better by a person. For a small number of old policies in that condition, typing them is the faster and safer route.",
    },
  ],
};
