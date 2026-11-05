import type { Post } from "../types";

// The "one dashboard" article.
//
// The risk with this title is writing a page about dashboards — tiles,
// charts, widgets — when the thing that makes one dashboard possible is
// upstream of it: every policy having been read into the same shape. So the
// article is mostly about that, and it says plainly which numbers belong on a
// dashboard and which are decoration.

export const post: Post = {
  slug: "manage-multiple-insurance-policies-one-dashboard",
  title: "How to Manage Multiple Insurance Policies in One Dashboard",
  metaTitle: "How to Manage Multiple Insurance Policies in One Dashboard",
  description:
    "What has to be true before one dashboard can show a whole insurance book, which five numbers are worth putting on it, and which are decoration.",
  excerpt:
    "A single dashboard is not a design problem. It is a consequence of every policy having been read into the same shape — and of resisting the four numbers that look useful and are not.",
  published: "2026-10-27",
  updated: "2026-10-27",
  accent: "teal",
  category: "agent-workflow",
  art: "dashboard",
  audience: "Agents working across several systems",
  related: [
    "what-is-insurance-policy-management-software",
    "track-insurance-policy-renewals-and-important-dates",
    "general-insurance-management-software-features",
  ],
  sections: [
    {
      heading: "What 'one dashboard' is actually solving",
      blocks: [
        {
          kind: "text",
          text: "The complaint behind this question is rarely about dashboards. It is that answering one simple question requires four places: a spreadsheet for the policy numbers, a folder for the documents, a WhatsApp history for what the customer last asked, and an insurer portal for anything current.",
        },
        {
          kind: "text",
          text: "So the goal is not a screen with tiles on it. The goal is that one screen can answer the three questions an agent asks a hundred times a week — what does this customer hold, where is that document, and what expires soon — without opening anything else. A dashboard is what that looks like at the end; it is not how you get there.",
        },
        {
          kind: "callout",
          tone: "note",
          title: "Why the insurer portals cannot be the answer",
          text: "An agent selling six insurers has six portals, each with its own login, its own layout and only its own policies. No amount of discipline makes six partial views into one book of business, which is why the records have to live somewhere that is not an insurer's system.",
        },
      ],
    },
    {
      heading: "The prerequisite: every policy in the same shape",
      blocks: [
        {
          kind: "text",
          text: "One dashboard requires that a motor policy, a health floater and a shop fire policy can appear in one list and be sorted by the same column. That is a data problem, and it has four parts.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Every policy has a real expiry date",
              text: "Read from its own schedule, not calculated. The moment one policy's date was assumed rather than read, the sorted list is no longer trustworthy — and it will be the travel policy or the long-term motor policy that is wrong.",
            },
            {
              title: "Every policy belongs to a customer",
              text: "Matched to a person, not sitting loose. In practice the mobile number on the document is the key: match it against the numbers you hold, and anything that does not match waits to be assigned rather than being attached to a near-enough name.",
            },
            {
              title: "Every policy has its document attached",
              text: "Not in a folder named after the month. On the record, so that \"where is that document\" is answered by opening the policy rather than by a search of a drive.",
            },
            {
              title: "Every line of business keeps its own fields",
              text: "This is the part people get backwards. One dashboard does not require flattening every policy into the same four fields — it requires a shared spine (customer, insurer, number, period, premium) with each line keeping its own detail underneath. Flattening is what makes a dashboard possible and useless at the same time.",
            },
          ],
        },
        {
          kind: "text",
          text: "Get those four right and the dashboard is almost incidental. Get any of them wrong and no interface can compensate: a list sorted by a column half of whose values were guessed is worse than no list, because it looks complete.",
        },
      ],
    },
    {
      heading: "The five numbers worth putting on it",
      blocks: [
        {
          kind: "text",
          text: "Dashboards fail by containing too much. Five numbers, each of which should change what you do today.",
        },
        {
          kind: "table",
          columns: ["The number", "What it tells you", "The action it implies"],
          rows: [
            [
              "Expiring in the next 30 days",
              "The work that has a deadline.",
              "Open the list and start calling, oldest date first.",
            ],
            [
              "Waiting for review",
              "How many extracted fields nobody has confirmed.",
              "Clear it. Every unconfirmed expiry date is a policy the renewal list is wrong about.",
            ],
            [
              "Not yet shared with the customer",
              "Policies the policyholder cannot see in their own portal.",
              "Share them, or accept that those customers will keep ringing for copies.",
            ],
            [
              "Failed documents",
              "Files that could not be processed at all.",
              "Source the document again. These do not resolve themselves.",
            ],
            [
              "Policies already expired",
              "Lapses that have happened.",
              "Either renew or mark closed. An expired policy left live makes every count above it slightly false.",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The test for whether a number belongs",
          text: "Say the number out loud and then say what you would do about it. If the second half is \"nothing\" or \"feel good\", it is decoration. Total policies ever processed is the clearest example: it only ever goes up, and it has never once changed anybody's afternoon.",
        },
      ],
    },
    {
      heading: "The four that look useful and are not",
      blocks: [
        {
          kind: "text",
          text: "Worth naming, because they are what most dashboards in this category are full of.",
        },
        {
          kind: "list",
          items: [
            "Total policies, all time. A monotonically increasing number with no action attached. It is a vanity metric and it takes the space a renewal count needed.",
            "Premium under management. Tempting, and usually misleading: it mixes lines of business with different premium scales, it double-counts a renewal against the policy it replaced, and it is not your income.",
            "A monthly growth chart. Three points of data is not a trend, and for a small agency monthly policy counts are dominated by the timing of a few renewals.",
            "A per-person league table. It measures who uploaded, which is a measure of who did the filing — not of who sold. In an agency where one person uploads for the others it is actively wrong.",
          ],
        },
        {
          kind: "text",
          text: "None of these is forbidden information. They are just not operational, and a dashboard is an operational screen. Put them in an export if somebody wants them at year end.",
        },
      ],
    },
    {
      heading: "What to do when the policies are in two systems",
      blocks: [
        {
          kind: "text",
          text: "Most agencies arrive at this question halfway through: some policies in a spreadsheet, some in new software, and a period where neither view is complete. That period is the dangerous one, and it is worth being deliberate about.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Pick one system as authoritative, on a date",
              text: "From the first of the month, every new policy goes in the new system and nowhere else. Two systems both kept half-current is the state to avoid, because then neither can answer the renewal question and both look like they can.",
            },
            {
              title: "Move the current year first",
              text: "Not the archive. The current year is what the renewal list has to be right about, and it is the half that pays for itself in the first month. Twelve months of policies is a finite, visible piece of work.",
            },
            {
              title: "Keep the old register read-only",
              text: "Rename it, do not delete it. It stays as the record of the years not yet moved, and marking it read-only is what stops somebody helpfully adding a new policy to it in March.",
            },
            {
              title: "Backfill the archive in batches",
              text: "By customer rather than by year, so that each batch finishes something: one customer's five years is a complete history, where one year across all customers is five incomplete ones.",
            },
            {
              title: "Then check the two agree, once",
              text: "Export the policy list from the new system and compare the count and the renewal dates against the old register for the current year. Do this once, deliberately, rather than trusting it — this is the step that catches the fifteen policies nobody moved.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The failure mode to watch for",
          text: "An agency that enters new business in the new system and never backfills ends up with a dashboard that is accurate about this year and silent about the customer's last five. The renewal list works; the renewal conversation does not, because the history a customer expects you to know is in the old folder.",
        },
      ],
    },
    {
      heading: "Who else should see a version of it",
      blocks: [
        {
          kind: "text",
          text: "One more consequence of having everything in one shape: other people can be given their own view of it, which removes work rather than displaying it.",
        },
        {
          kind: "text",
          text: "A policyholder with a read-only login can see their own policies, how long each has left and the documents — which is the \"send me a copy of my policy\" call, removed. A sub-agent can be given a view of the agency's book with upload but not confirm, or read without seeing unmasked phone numbers. In both cases the point is not transparency for its own sake; it is that a question somebody else can answer themselves stops arriving as an interruption.",
        },
        {
          kind: "list",
          items: [
            "The customer's view should be read-only. A customer who can edit a record creates a different problem from the one you were solving.",
            "A sub-agent's view should be granted capability by capability rather than as a role, so a reviewing role can exist without access to customers' phone numbers.",
            "Nobody's view should be enforced by hiding a button. If it is not checked on the server, it is not access control.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How do I see all my insurance policies in one dashboard?",
      a: "The dashboard is the easy part; the prerequisite is that every policy has an expiry date read from its own schedule, belongs to a matched customer, has its document attached, and keeps its own line-of-business fields under a shared spine. With those four true, one list across motor, health, travel and commercial policies works. Without them, the list looks complete and is not.",
    },
    {
      q: "Can I manage policies from different insurers in one place?",
      a: "Yes, and it is the main reason to have a records system at all. An agent selling six insurers has six portals, each showing only its own policies; one book of business has to live somewhere that is not an insurer's system.",
    },
    {
      q: "Which numbers should an insurance dashboard show?",
      a: "Five that imply an action: policies expiring in the next thirty days, extracted fields waiting for review, policies not yet shared with their customer, documents that failed to process, and policies already expired. If you cannot say what you would do about a number, it is decoration.",
    },
    {
      q: "Why is total premium under management a poor dashboard metric?",
      a: "It mixes lines of business with completely different premium scales, it double-counts a renewal against the policy it replaced, and it is not your income. It is not forbidden information — it just belongs in a year-end export rather than on an operational screen.",
    },
    {
      q: "Should I move my whole archive into a new system before using it?",
      a: "No. Move the current year first, because that is what the renewal list must be correct about and it is the half that pays for itself immediately. Then backfill older years in batches by customer, so each batch completes one customer's history rather than leaving everyone's half done.",
    },
    {
      q: "Can my customers see their own policies in the same system?",
      a: "They can be given a read-only view of their own records — the policies shared with them, how long each has left, and the documents to download. Keep it read-only: a customer who can change a record has created a different problem from the one a portal was solving.",
    },
  ],
};
