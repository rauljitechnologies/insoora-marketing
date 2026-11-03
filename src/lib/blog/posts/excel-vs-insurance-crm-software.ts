import type { Post } from "../types";

// The comparison article, and the one where a vendor is most tempted to put a
// thumb on the scale.
//
// So it is written to be genuinely losable: there is a section on what Excel
// is better at, it names the volume below which a spreadsheet is the right
// answer, and the verdict is conditional rather than a conclusion. An article
// that cannot reach "keep the spreadsheet" is not a comparison.

export const post: Post = {
  slug: "excel-vs-insurance-crm-software",
  title: "Excel vs Insurance CRM Software: Which Is Better for Insurance Agents?",
  metaTitle: "Excel vs Insurance CRM Software: An Honest Comparison",
  description:
    "An honest comparison for insurance agents: what a spreadsheet does better, where it breaks, and the four signals that say it is time to move.",
  excerpt:
    "Below a certain size a spreadsheet is the right answer, and it is worth saying so on a software company's website. Here is where the line actually is, and what crossing it looks like.",
  published: "2026-11-04",
  updated: "2026-11-04",
  accent: "orange",
  category: "choosing",
  art: "grid",
  audience: "Agents running a book in Excel",
  related: [
    "best-crm-software-for-insurance-agents-india",
    "best-insurance-management-software-india",
    "manage-multiple-insurance-policies-one-dashboard",
  ],
  sections: [
    {
      heading: "What Excel is genuinely better at",
      blocks: [
        {
          kind: "text",
          text: "Starting here, because the honest version of this comparison has to. A spreadsheet is not a primitive version of a CRM; it is a different tool that is better at several things, and some of them matter to an agency.",
        },
        {
          kind: "list",
          items: [
            "It is instant. No account, no onboarding, no decision about who owns the data. Open it and type.",
            "It has no schema. If you want a column for \"customer's brother-in-law referred them\", you have one in four seconds. No software will let you do that.",
            "It calculates. Ad-hoc arithmetic across a book — total premium by insurer, commission at 15%, a what-if on next year — is what spreadsheets are for, and most policy systems have no equivalent.",
            "It is yours, completely. One file, on your machine, openable in twenty years, with nobody to cancel it or change its pricing.",
            "Everybody already knows it. Training cost: zero. That is not a small advantage in a three-person agency.",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "The honest threshold",
          text: "Under roughly fifty policies, maintained by one person who remembers them, a well-kept spreadsheet plus a disciplined folder is genuinely the right answer. Buying software at that size buys you a login and a monthly cost. We would rather say that than sell you something you will stop using.",
        },
      ],
    },
    {
      heading: "Where it breaks, and why it is always the same four places",
      blocks: [
        {
          kind: "text",
          text: "Spreadsheets do not degrade gradually in this application. They work, and then four specific things start happening, and all four are structural rather than disciplinary — more care does not fix them.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "The document and the row come apart",
              text: "The row says policy 7741920883 expires on 2 December. The PDF is in a folder somewhere. Nothing connects them, so when a figure is questioned the only recourse is to find the document again by memory. Within a year the folder has four hundred files and the connection is gone.",
            },
            {
              title: "Two people cannot hold it at once",
              text: "The shared-drive version locks when someone has it open; the emailed version becomes two versions. Every agency that has grown past one person entering policies has independently discovered this, and the usual resolution — one person does all the entry — turns that person into the bottleneck.",
            },
            {
              title: "The dates were typed, so some of them are wrong",
              text: "Not through carelessness. The common shortcut is to read the start date and add a year, which is correct for most policies and wrong for exactly the ones that matter: short-period travel cover, long-term motor, anything endorsed mid-term. The sheet cannot tell you which rows are the wrong ones.",
            },
            {
              title: "Access is all or nothing",
              text: "A junior who needs to answer customer calls needs to read the sheet, and reading the sheet means being able to overwrite it. There is no read-only row, no masked column, no record of who changed what. For a book of four hundred customers' personal details, that is a real exposure and not a theoretical one.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The failure that costs money",
          text: "Of the four, the third is the one that produces a loss. A lapsed motor policy is uninsured driving, and a late renewal can forfeit an accumulated no-claim bonus — a direct monetary loss to your customer, caused by a date nobody could have known was wrong.",
        },
      ],
    },
    {
      heading: "Side by side, without the thumb on the scale",
      blocks: [
        {
          kind: "table",
          columns: ["", "A spreadsheet register", "Policy/CRM software"],
          rows: [
            [
              "Setup",
              "Minutes. No decisions.",
              "An account, a decision about who owns it, and getting the existing book in.",
            ],
            [
              "Cost",
              "Effectively nothing beyond what you already pay for.",
              "A subscription, or per policy processed. Ask for the annual figure at your volume.",
            ],
            [
              "Getting a policy in",
              "Typing eight or nine fields, chosen by whoever is typing.",
              "Typing, importing, or reading the PDF. Which one it is matters more than any other difference.",
            ],
            [
              "Fields kept per policy",
              "As many as the columns you were willing to maintain. Realistically eight.",
              "As many as the document states, if it was read rather than typed.",
            ],
            [
              "Finding last year's document",
              "A search of a folder, by a filename nobody standardised.",
              "Open the customer, open the year.",
            ],
            [
              "Ad-hoc calculation",
              "Excellent. This is what it is for.",
              "Usually absent. Export to a spreadsheet and do it there.",
            ],
            [
              "Several people",
              "One at a time, or two versions.",
              "One shared book, with access granted per person.",
            ],
            [
              "Audit of changes",
              "None.",
              "Usually some, to varying depth. Worth asking about specifically.",
            ],
            [
              "Customer self-service",
              "Not possible.",
              "A read-only portal, where offered.",
            ],
            [
              "If you stop paying",
              "Nothing happens. The file is yours.",
              "Depends entirely on the export. Test it before you commit.",
            ],
          ],
        },
        {
          kind: "text",
          text: "Read the last row twice. It is the asymmetry that should make you test an export during a trial rather than afterwards: the spreadsheet's great advantage is that it cannot be taken away, and the only way software matches it is if you can leave whenever you want.",
        },
      ],
    },
    {
      heading: "The four signals that it is time to move",
      blocks: [
        {
          kind: "text",
          text: "Not volume. Volume is a poor trigger because a tidy book of three hundred is easier than a messy book of eighty. These four are the real ones, and any single one of them is enough.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "A renewal has lapsed because nobody was watching a date. This is the signal that matters most, and it is the one agencies most often explain away as a one-off.",
            "A second person has started entering policies. The sheet has already become two sheets or a queue, whether or not anyone has said so.",
            "You cannot find a document in under a minute. Not sometimes — ever. Pick a policy from two years ago at random and time yourself honestly.",
            "Somebody who should not be able to change the register can change the register. Usually a new joiner who needed to answer phones.",
          ],
        },
        {
          kind: "text",
          text: "If none of those four is true, the spreadsheet is still working and the right decision is to keep it and spend the money elsewhere. If two of them are true, the sheet stopped working a while ago and the cost is already being paid in a form that does not appear on an invoice.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Do this either way",
          text: "Adopt a filename convention today: policy number, then the vehicle registration or line of business, then the year. It costs a minute per policy, it fixes the single worst thing about the spreadsheet approach, and it makes a later migration dramatically cheaper. There is no version of this decision where that habit is wasted.",
        },
      ],
    },
    {
      heading: "If you do move: how not to make it worse",
      blocks: [
        {
          kind: "text",
          text: "The migration is where most of the value is lost, and the losses are predictable.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Do not import the spreadsheet",
              text: "This is counter-intuitive and it is the most important line in this section. Your sheet contains eight fields per policy, some of them typed dates that are wrong. Importing it produces a system that is exactly as incomplete as the sheet, and it buries the wrong dates under a layer of apparent authority. Upload the documents instead and let the records be built from them; the sheet becomes a cross-check rather than a source.",
            },
            {
              title: "Register as the business, not as yourself",
              text: "In most of these products the account that signs up holds the plan, the data and the billing, and cannot be handed to a colleague later. Use an address the business controls.",
            },
            {
              title: "Current year first, archive later",
              text: "The current year is what the renewal list has to be right about. Older years are a useful history and not an emergency, and doing them in batches by customer means each batch completes something.",
            },
            {
              title: "Keep the sheet, read-only, until you have checked",
              text: "Rename it, mark it read-only, and compare the new system's current-year policy count and renewal dates against it once, deliberately. That comparison is what catches the fifteen policies nobody moved. Then stop maintaining it — two half-current registers is worse than either one alone.",
            },
          ],
        },
      ],
    },
    {
      heading: "The verdict, conditionally",
      blocks: [
        {
          kind: "text",
          text: "There is no general answer, and an article from a software company that reached one would be worth distrusting. There are three answers.",
        },
        {
          kind: "list",
          items: [
            "Small, single-handed, tidy: keep the spreadsheet. Add the filename convention and read your expiry dates off the schedules. You are fine.",
            "Growing, or more than one person entering, or documents you cannot find: move. The sheet is not the problem to be solved with more discipline; it has stopped being able to do the job.",
            "Large and already on software that only stores fields: the question is not Excel any more, it is whether your system keeps the documents with the records — and if it does not, you have a spreadsheet with a login.",
          ],
        },
        {
          kind: "text",
          text: "Insoora is our product and it belongs to the second row: it reads policy PDFs into records, keeps the document attached, matches policies to customers by the mobile number on the document, and builds a renewal list from the expiry dates on the schedules. It does not calculate, does not do commission, does not send anything and has no insurer integration. If what your spreadsheet is really doing for you is arithmetic, the honest answer is that you will keep using a spreadsheet for that part.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is Excel good enough for managing insurance policies?",
      a: "Under roughly fifty policies maintained by one person, yes — a well-kept sheet plus a disciplined folder genuinely works, and buying software at that size mostly buys a monthly cost. Above that it breaks in four structural ways that more care does not fix: the document separates from the row, two people cannot hold it at once, typed expiry dates go wrong on exactly the policies that matter, and access is all-or-nothing.",
    },
    {
      q: "What does Excel do better than insurance CRM software?",
      a: "Ad-hoc calculation, which is what it is for and which most policy systems have no equivalent of. Also: instant setup, no schema so any column you want exists immediately, zero training cost, and complete ownership — nobody can cancel a file on your own machine.",
    },
    {
      q: "When should an insurance agent move off a spreadsheet?",
      a: "When any one of four things is true: a renewal has lapsed because nobody was watching a date, a second person has started entering policies, you cannot find a two-year-old document in under a minute, or somebody who should not be able to change the register can change it. Volume is a poor trigger — a tidy book of three hundred is easier than a messy book of eighty.",
    },
    {
      q: "Should I import my spreadsheet into new software?",
      a: "Usually not, and this is the most common mistake. The sheet holds eight fields per policy, some of them typed dates that are wrong, and importing it produces a system exactly as incomplete as the sheet while making the wrong dates look authoritative. Upload the policy documents instead and let the records be built from them, then use the sheet as a cross-check.",
    },
    {
      q: "Can I keep using Excel alongside new software?",
      a: "For calculation, yes — export a list and do the arithmetic in a spreadsheet, which is the right tool for it. As a second register, no: two half-current registers is worse than either one alone, because neither can answer the renewal question and both look like they can. Pick one as authoritative on a date and make the other read-only.",
    },
    {
      q: "What is the real risk of a typed expiry date?",
      a: "A lapse nobody could have predicted. The common shortcut is to read the start date and add a year, which is right for most policies and wrong for short-period travel cover, long-term motor and anything endorsed mid-term — and the sheet cannot tell you which rows are the wrong ones. A lapsed motor policy is uninsured driving, and a late renewal can forfeit an accumulated no-claim bonus.",
    },
  ],
};
