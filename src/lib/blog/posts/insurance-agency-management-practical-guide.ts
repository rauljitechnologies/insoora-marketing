import type { Post } from "../types";

export const post: Post = {
  slug: "insurance-agency-management-practical-guide",
  title: "Insurance Agency Management: A Practical Guide for Agents",
  metaTitle: "Insurance Agency Management: A Practical Guide for Agents",
  description:
    "How a small insurance agency actually runs: the book of business, sub-agent handovers, renewal pipelines, commission tracking and the handful of systems worth having before you grow.",
  excerpt:
    "The hard part of running an agency is not selling. It is that everything you sold stays your responsibility — and the number of things you are responsible for only ever goes up.",
  published: "2026-10-30",
  updated: "2026-10-30",
  accent: "purple",
  category: "agent-workflow",
  art: "agency",
  audience: "Agents running or growing a book",
  related: [
    "track-insurance-policy-renewals-and-important-dates",
    "organize-insurance-policy-documents-digitally",
  ],
  sections: [
    {
      heading: "What an agency actually manages",
      blocks: [
        {
          kind: "text",
          text: "An insurance agency looks like a sales business and runs like an operations business. The sale is a day's work; the policy is a year's obligation, and it renews. After three or four years the proportion of your week spent on policies you already sold is larger than the proportion spent selling — and nobody warns you about the crossover, because it happens gradually.",
        },
        {
          kind: "text",
          text: "Underneath that, four things need managing, and they fail in different ways:",
        },
        {
          kind: "list",
          items: [
            "The book of business — every policy in force, who holds it, and when it ends. Fails by going stale: a policy lapses and nobody notices until the customer calls after an accident.",
            "The documents — the PDFs themselves. Fails by going missing, usually at claim time, usually for the one customer who needs it most.",
            "The people — sub-agents, a junior who does data entry, a family member who covers the phone. Fails at handover, when what one person knew was never written down.",
            "The money — commission earned, received and reconciled. Fails silently: under-payment is invisible unless you are checking, and most agents are not.",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "The growth problem in one sentence",
          text: "Everything that works at fifty policies because you remember it stops working at five hundred, and the failure is not dramatic — it is a slow rise in the number of things you find out about too late.",
        },
      ],
    },
    {
      heading: "The book of business is the asset",
      blocks: [
        {
          kind: "text",
          text: "An agency's value is not its office or its brand. It is the list of customers and what they hold, because that list is what produces renewal income and what any eventual buyer would be paying for. Treating it as an asset changes a few decisions.",
        },
        {
          kind: "h3",
          text: "It should exist outside anyone's head",
        },
        {
          kind: "text",
          text: "If the answer to \"who holds a health policy expiring next March\" is in one person's memory, the agency has a single point of failure with a personal life. The test is simple and uncomfortable: if you were unreachable for two weeks, could someone else run the renewals?",
        },
        {
          kind: "h3",
          text: "It should be exportable",
        },
        {
          kind: "text",
          text: "Data you cannot get out of a system is data you have lent to a vendor. Before committing a book of business to any software, check that you can export the policy list and download the documents in a usable form. This matters at exactly two moments — when you want to leave, and when the vendor does — and in both you will be glad you checked early.",
        },
        {
          kind: "h3",
          text: "It should be queryable, not just readable",
        },
        {
          kind: "text",
          text: "A list you can only read top to bottom answers one question at a time. The questions that actually run an agency are filters: everything expiring in the next thirty days, everything from one insurer, every motor policy for a customer whose number just called. If getting those answers means scrolling, the book is readable but not usable.",
        },
      ],
    },
    {
      heading: "Sub-agents, staff and the handover problem",
      blocks: [
        {
          kind: "text",
          text: "The first hire changes the shape of the business more than the tenth customer does. One person with everything in their head becomes two people who each know different things, and the gap between them is where work falls through.",
        },
        {
          kind: "h3",
          text: "Decide what a sub-agent can see",
        },
        {
          kind: "text",
          text: "This is the question most small agencies answer by accident — usually by sharing one login, which answers it as \"everything, permanently, untraceably\". It is worth answering deliberately instead.",
        },
        {
          kind: "table",
          columns: ["Arrangement", "What it gives you", "What it costs"],
          rows: [
            [
              "One shared login",
              "Nothing to set up",
              "No audit trail, no way to revoke one person, every customer visible to everyone",
            ],
            [
              "Separate logins, full access",
              "Who did what is traceable; access ends when an account is closed",
              "A departing sub-agent has seen the whole book",
            ],
            [
              "Separate logins, scoped access",
              "People see the customers they handle",
              "Someone has to decide and maintain the scoping",
            ],
          ],
        },
        {
          kind: "text",
          text: "For most agencies the middle row is the honest starting point and the bottom row is where you want to end up. The top row should not survive the first hire.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Offboarding is the part everyone forgets",
          text: "When a sub-agent leaves, three things need to happen the same day: their access ends, their customers are reassigned to a named person, and the customers are told who to call now. The third is the one that gets skipped, and it is the one customers notice.",
        },
        {
          kind: "h3",
          text: "Write down the five things you do most",
        },
        {
          kind: "text",
          text: "Not a manual — a page. How a new policy gets filed, how a renewal reminder goes out, how a claim intimation is handled, what happens when a customer changes their phone number, and who to call at each insurer. Those five cover most of a week, and writing them down is what makes a second person useful in days rather than months.",
        },
      ],
    },
    {
      heading: "Renewals: the pipeline that pays for everything",
      blocks: [
        {
          kind: "text",
          text: "Renewal income is the closest thing an agency has to predictable revenue, and it is entirely dependent on knowing a date and acting on it in time. A missed renewal is not a deferred sale — it is usually a lost customer, because the one who let their cover lapse has already gone somewhere else by the time you call.",
        },
        {
          kind: "text",
          text: "A renewal pipeline needs three properties, and most informal systems have only the first.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "It knows the dates — taken from the policy document, not from a reminder someone typed in.",
            "It shows what is coming before it arrives — a standing list of what expires in the next thirty days, not an alert on the day.",
            "It records what happened — contacted, waiting on the customer, renewed, lapsed. Without this, the same customer is called three times and another is called never.",
          ],
        },
        {
          kind: "text",
          text: "The third point is where calendar reminders fail. A reminder fires once and is dismissed; it does not carry state, and it cannot tell you on Friday which of Monday's twelve calls are still unresolved. Renewals are a pipeline with stages, not a set of alarms.",
        },
        {
          kind: "text",
          text: "We have written about the mechanics of that separately — the dates worth tracking, the timing of contact, and why the expiry date has to come from the document — in [How to Track Insurance Policy Renewals and Important Dates](/blog/track-insurance-policy-renewals-and-important-dates).",
        },
      ],
    },
    {
      heading: "Commission, reconciliation and knowing what you are owed",
      blocks: [
        {
          kind: "text",
          text: "Commission arrives from several insurers on several schedules, usually as a statement that does not line up with your own records. Reconciling it is dull, and skipping it is expensive in a way that compounds quietly: an error in a commission rate repeats on every policy at that rate until someone notices.",
        },
        {
          kind: "text",
          text: "The practical minimum is to record, per policy, what you expected and what arrived. That turns reconciliation into a filter — show me everything where expected and received do not match — instead of a comparison of two documents line by line.",
        },
        {
          kind: "list",
          items: [
            "Record the expected commission when the policy is filed, while the premium and the rate are in front of you.",
            "Mark payments against policies, not against months. A lump sum covering forty policies tells you nothing until it is broken down.",
            "Check the rate, not just the total. Totals look plausible when a rate is wrong; the discrepancy only shows up per policy.",
            "Keep the insurer's statement itself. When you query a shortfall, you will be asked which statement you are referring to.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Reconcile monthly, not annually",
          text: "A query raised within a month is a correction. The same query raised a year later is an argument about records nobody has to hand, and it is usually dropped — which is precisely why it is worth raising early.",
        },
      ],
    },
    {
      heading: "What to put in place, and in what order",
      blocks: [
        {
          kind: "text",
          text: "Agencies rarely fail from lacking sophisticated systems. They struggle because the basics were adopted in the wrong order — a CRM before a reliable policy list, automation before anyone agreed what the process was. A workable sequence:",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "One list of every policy in force",
              text: "Complete and current, outside anyone's head, with expiry dates taken from the documents. Nothing else works until this exists.",
            },
            {
              title: "One document store that is backed up",
              text: "Every policy PDF, findable from its record, reachable by more than one person, and not sitting in a personal chat folder.",
            },
            {
              title: "A standing renewals view",
              text: "What expires in the next thirty days, with a status per policy. This is the single highest-return thing on the list.",
            },
            {
              title: "Named accounts for every person",
              text: "No shared logins. Access scoped to what each role needs, and revocable on the day someone leaves.",
            },
            {
              title: "Commission recorded per policy",
              text: "Expected and received, so reconciliation becomes a filter rather than a chore.",
            },
            {
              title: "Customer self-service",
              text: "A way for a policyholder to get their own documents without calling you. Every call this prevents is time back, and it is the thing customers notice most.",
            },
          ],
        },
        {
          kind: "text",
          text: "The first three can be built with a spreadsheet, a disciplined folder and a recurring calendar block, and for a small book that is a perfectly respectable answer. The limits show up as volume grows: the list goes stale because updating it is manual, and the renewals view is only as current as the last time someone retyped it.",
        },
        {
          kind: "text",
          text: "Insoora is built around steps one through four and step six — the policy list is produced by reading the documents rather than typing them, renewals come from the extracted expiry dates, access is scoped by role, and policyholders get their own portal for the documents shared with them. It does not do commission reconciliation. If you want to see the pieces it does cover, they are set out on the [features page](/features), and the [FAQ](/faq) answers what it reads and where its limits are.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "When is an agency too big for a spreadsheet?",
      a: "Less a number than a symptom. The signs are that the spreadsheet is no longer current because updating it is someone's deferred task, that two people need it open at once, or that you have started keeping a second private list because you do not trust the first. Any one of those means the spreadsheet has stopped being the system of record.",
    },
    {
      q: "Should sub-agents be able to see the whole book of business?",
      a: "Generally no — not because of distrust, but because scoped access limits the damage of any single compromised login and makes a departure straightforward. The practical rule is that a person should see the customers they handle, and a supervisor should see their team's.",
    },
    {
      q: "What is the difference between an agency management system and a CRM?",
      a: "A CRM manages relationships and the sales pipeline — leads, conversations, follow-ups. An agency management system manages what you have already sold: policies in force, documents, renewals, and the obligations attached to them. Agencies usually feel the need for the second one first, because that is where things go wrong silently.",
    },
    {
      q: "How do I move a book of business into new software without losing anything?",
      a: "Move in one direction and keep the old system readable until the new one has been through a full renewal cycle. Check three things specifically after import: that policy counts match, that expiry dates survived the transfer in the right format, and that every record still points at its document. Date formats and broken document links are the two failures that show up late.",
    },
  ],
};
