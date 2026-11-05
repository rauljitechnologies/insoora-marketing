import type { Post } from "../types";

// The CRM counterpart to the buyer's guide, and the same editorial rule
// applies: no ranked list of products we have not tested.
//
// What this one adds is the distinction the query hides. "CRM for insurance
// agents" is searched by two kinds of agent wanting two incompatible
// products, and the article's real work is helping the reader find out which
// one they are in the first two minutes.

export const post: Post = {
  slug: "best-crm-software-for-insurance-agents-india",
  title: "Best CRM Software for Insurance Agents in India: How to Choose",
  metaTitle: "CRM Software for Insurance Agents in India — How to Choose",
  description:
    "Two different products are sold as insurance CRM. How to tell which one your agency needs, what to test, and the questions that separate them.",
  excerpt:
    "The first decision is not which CRM. It is which kind of CRM — the one that manages prospects, or the one that manages the customers you already have. Buying the wrong one is the most common mistake in this category.",
  published: "2026-11-04",
  updated: "2026-11-04",
  accent: "pink",
  category: "choosing",
  art: "crm",
  audience: "Agents comparing CRM options",
  related: [
    "excel-vs-insurance-crm-software",
    "best-insurance-management-software-india",
    "insurance-agency-management-practical-guide",
  ],
  sections: [
    {
      heading: "Two products, one phrase",
      blocks: [
        {
          kind: "text",
          text: "Ten minutes of research into insurance CRM software will turn up products that appear to be competitors and are not. One set is built to convert prospects; the other is built to service policyholders. They share a category name and almost nothing else.",
        },
        {
          kind: "table",
          columns: ["", "A sales CRM", "A client CRM"],
          rows: [
            [
              "Who is in it",
              "People who have not bought yet: enquiries, referrals, leads from a campaign.",
              "People who have bought: policyholders, with the policies they hold.",
            ],
            [
              "The central object",
              "A deal or an opportunity, moving through stages.",
              "A customer, with policies and documents under them.",
            ],
            [
              "What it is judged on",
              "Conversion rate, follow-up discipline, pipeline value.",
              "Whether you can answer what a customer holds, and what expires when.",
            ],
            [
              "Typical features",
              "Stages, tasks, quotations, call logging, email and WhatsApp campaigns, dashboards of pipeline.",
              "Policy records, document storage, renewal lists, year-on-year history, a customer portal.",
            ],
            [
              "What it does badly",
              "Servicing. A closed deal usually becomes a note, and the policy document ends up in a drive.",
              "Prospecting. There is nowhere to put somebody who has not bought anything.",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The question that decides it",
          text: "Where does your week actually go? If most of it goes on finding new customers, you need a pipeline and a client record will not give you one. If most of it goes on servicing customers you already have — finding last year's policy, telling someone what they hold, working out what expires next month — you need a client record and a pipeline will not help.",
        },
        {
          kind: "text",
          text: "Plenty of agencies end up running both, with a manual handover: the pipeline tool holds the prospect, and once the policy is issued the document goes into the records system. That is a real cost and a smaller one than it sounds, because the handover happens once per policy rather than once per conversation.",
        },
      ],
    },
    {
      heading: "What a client CRM has to get right for insurance",
      blocks: [
        {
          kind: "text",
          text: "Generic CRMs can be bent into this shape, and the places they break are specific enough to be worth listing. If you are evaluating a general-purpose CRM for an insurance book, test these five things in particular.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "One customer, many policies, many years",
              text: "A policyholder with a bike, a car, a health floater and a shop policy is one record with four policies — and next year, eight. A CRM whose contact record holds one \"deal\" per person will model this as four contacts or four deals and lose the view that matters.",
            },
            {
              title: "The document lives with the policy",
              text: "Not as an attachment on a note, not in a linked drive folder. On the policy, so that opening a 2024 motor policy gives you the 2024 schedule. This is where generic CRMs fail most often and most quietly.",
            },
            {
              title: "Expiry as a first-class field",
              text: "Not a custom date field somebody has to remember to fill. A policy's expiry should be the thing a renewal view is built from, and it should have come off the schedule rather than been typed.",
            },
            {
              title: "Mobile number as the key",
              text: "In Indian retail insurance the mobile number is the practical identity: it is on the schedule, it is how a policy finds its customer, and it is how a policyholder proves which records are theirs. A CRM that treats email as the unique key will create duplicates for half your book.",
            },
            {
              title: "Access granted per person",
              text: "Three fixed roles is not enough once you have sub-agents. The useful shape is capabilities granted individually — someone who uploads but does not confirm, someone who reads but cannot see unmasked phone numbers.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Watch for custom fields doing structural work",
          text: "If a demo solves \"where does the IDV go?\" with a custom field, ask what happens to the five separate IDV components on a motor schedule, and whether the renewal view can filter on a custom date. Custom fields hold data; they rarely drive behaviour.",
        },
      ],
    },
    {
      heading: "The questions worth asking every vendor",
      blocks: [
        {
          kind: "text",
          text: "Six, and the value is as much in how precisely they are answered as in the answers.",
        },
        {
          kind: "list",
          items: [
            "How does a customer record get created — typed, imported, or derived from the policy document? If imported, from what, and what happens to a row that does not match anybody?",
            "What is the unique key on a customer, and what happens when the same person appears twice under two mobile numbers? Is there a merge, and who can run it?",
            "Can a policyholder see their own records, and if so, can they change anything? A read-only customer view removes calls; an editable one creates a different problem.",
            "What leaves the system automatically? Renewal emails and SMS are either a feature you want or a liability you did not ask for, and either way you should know before you import four hundred mobile numbers.",
            "Is contact information masked by default, and is seeing it in full a separate permission? This is what lets you staff a reviewing role without handing over your customers' phone numbers.",
            "Can you export every customer, every policy and every document yourself, today, without asking support?",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "On \"AI-powered\" in this category",
          text: "Ask what the model does, when it runs, and whether your data trains it. The useful answers are specific — \"it reads a field the rules could not\" — and the answer to be wary of is an adjective. A product that cannot say whether a third party sees your customers' data has not decided.",
        },
      ],
    },
    {
      heading: "A test that takes an afternoon",
      blocks: [
        {
          kind: "text",
          text: "Do not evaluate a client CRM on its contact screen. Evaluate it on the three things you will actually do a thousand times.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Build one real customer",
              text: "Take your most complicated policyholder — the one with four policies across three insurers and two years of history — and put all of it in. Note how long it took and how much of it you had to type.",
            },
            {
              title: "Then answer three questions from the system",
              text: "What does this customer hold today? What did they hold in 2024, and where is that document? What of theirs expires in the next sixty days? If any of the three takes more than a minute, the model is wrong for insurance.",
            },
            {
              title: "Then add a second user",
              text: "Invite a colleague and give them the least access the product allows. Check what they can actually see — not what the sidebar shows them, but what they can reach by typing a URL or running an export.",
            },
            {
              title: "Then try to leave",
              text: "Export everything, including documents. Ten minutes, on your own, or it is not an export.",
            },
          ],
        },
        {
          kind: "text",
          text: "An agency that runs this test on two products will usually find the decision has made itself by the end of step two.",
        },
      ],
    },
    {
      heading: "What Insoora is, in these terms",
      blocks: [
        {
          kind: "text",
          text: "Our product, disclosed as such, described in the vocabulary above rather than in a pitch.",
        },
        {
          kind: "text",
          text: "Insoora is a client CRM. One record per policyholder, every policy they hold and have held, the original documents attached, expiry dates read off the schedules, access granted capability by capability, and an optional read-only portal login for the policyholder. Customer records are built from the policies: upload the PDF and it is filed under a customer matched on the mobile number from the document, with unmatched policies queued for you to assign rather than guessed at.",
        },
        {
          kind: "list",
          items: [
            "No leads, stages, opportunities, quotations or conversion reporting.",
            "No email, SMS or WhatsApp sending, and no call logging.",
            "No custom fields, tags, segments or notes timeline.",
            "No commission calculation, split or reconciliation.",
            "No deduplication tool: two records for one person under two numbers stay two until merged by hand.",
          ],
        },
        {
          kind: "text",
          text: "That is a short feature list for something called a CRM, and it is the accurate one. If the gap between those two paragraphs is the gap between what you need and what we have, a sales CRM is the product to look at and this is the article that should have told you so.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is the best CRM for insurance agents in India?",
      a: "It depends on which of two products you need. A sales CRM manages prospects — leads, stages, quotations, follow-ups. A client CRM manages policyholders you already serve — their policies, documents and renewal dates. Decide which problem your week is actually spent on before comparing products, because the two sets barely overlap.",
    },
    {
      q: "Can I use a general-purpose CRM like a spreadsheet replacement for insurance?",
      a: "You can, and the places it breaks are predictable: one customer holding many policies across many years, policy documents belonging to a policy rather than to a note, and expiry dates that have to drive a renewal view rather than sit in a custom field. Test those three specifically before committing a book to it.",
    },
    {
      q: "Does an insurance CRM send renewal reminders to customers?",
      a: "Some do and some do not, and it is worth establishing which before importing hundreds of mobile numbers. Automated messaging is a feature if you want it and a liability if you did not ask for it. Insoora sends nothing — no email, SMS or WhatsApp to anyone.",
    },
    {
      q: "What should a customer record hold for an insurance agency?",
      a: "At minimum: name and mobile number, every policy that person holds and has held with insurer, number, premium and dates, the original document against each policy, and whether they have a portal login. Anything beyond that is useful; without those, the record cannot answer the questions an agent asks it.",
    },
    {
      q: "Is the mobile number really that important?",
      a: "In Indian retail insurance, yes. It appears on the schedule, so it is how an uploaded policy can be matched to the right customer, and it is how a policyholder can prove which records are theirs when claiming a portal login. A system keyed on email will create duplicates across a large part of a typical book.",
    },
    {
      q: "Should customers be able to edit their own records?",
      a: "Generally no. A read-only customer view removes the \"send me a copy of my policy\" call without creating any risk that a record is changed by someone outside the agency. If a customer spots something wrong they should contact you — which is a conversation worth having anyway.",
    },
  ],
};
