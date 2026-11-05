import type { Post } from "../types";

// ── Why this article does not contain a ranked list ──────────────────────
//
// The query is "best insurance management software in India", and the
// convention for answering it is a numbered list of ten products with a
// paragraph each, a feature grid, and the publisher's own product at number
// one. Almost none of those lists are written by anyone who has used more
// than one of the products.
//
// This site cannot publish that. Ranking competitors we have not tested
// against documents we have not seen would be inventing findings, which the
// rest of the site refuses to do for its own product and cannot start doing
// for anyone else's. So the article answers the question a different way:
// what "best" has to mean for an insurance book, how to test for it, and the
// seven questions that actually separate these products.
//
// It also says in its second paragraph that Insoora is ours. A buyer's guide
// published by a vendor that does not disclose that is the main reason nobody
// trusts buyer's guides.

export const post: Post = {
  slug: "best-insurance-management-software-india",
  title: "Best Insurance Management Software in India: A Buyer's Guide for 2026",
  metaTitle: "Best Insurance Management Software in India: Buyer's Guide",
  description:
    "How to judge insurance management software for an Indian agency: the seven questions that separate the products, and a two-hour test that settles it.",
  excerpt:
    "There is no ranked list in this article, and that is deliberate. Here is what to test instead, in what order, and the questions that actually separate one of these products from another.",
  published: "2026-11-02",
  updated: "2026-11-02",
  accent: "red",
  category: "choosing",
  art: "buying",
  audience: "Agents and agency owners comparing options",
  related: [
    "excel-vs-insurance-crm-software",
    "what-is-insurance-policy-management-software",
    "general-insurance-management-software-features",
  ],
  sections: [
    {
      heading: "Why this article has no top ten",
      blocks: [
        {
          kind: "text",
          text: "Search for the best insurance management software in India and you will find a dozen articles ranking ten products each. Read four of them and you will notice the rankings disagree, the descriptions are paraphrased from the vendors' own websites, and the publisher's product is at number one in every list it appears in.",
        },
        {
          kind: "text",
          text: "We are not going to add a thirteenth. Insoora is our product — that disclosure belongs in the second paragraph, not in a footnote — and we have not run four hundred policies through our competitors' extraction engines. Ranking them would be inventing findings, and the one claim this site will not make is a measurement it has not taken.",
        },
        {
          kind: "text",
          text: "What we can do is tell you what the decision actually turns on, because it is not the feature grid. Two products with identical feature lists can differ by a factor of five in how much work they save you, and the difference lives in places a comparison table cannot show.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The shortest version of this article",
          text: "Shortlist two or three products. Upload the same five policy PDFs to each — your own, from the insurers you actually sell, including the worst-looking scan you own. Count how many fields came out right. That number, on your documents, outweighs every other difference between them.",
        },
      ],
    },
    {
      heading: "What 'best' has to mean for an insurance book",
      blocks: [
        {
          kind: "text",
          text: "Before comparing anything, it is worth being precise about what you are buying. \"Insurance management software\" covers at least four different products, and agencies routinely buy one when they needed another.",
        },
        {
          kind: "table",
          columns: ["What it is", "The problem it solves", "Who should be buying it"],
          rows: [
            [
              "Policy and client records",
              "You cannot say what your book holds, what expires next month, or where last year's policy document is.",
              "Almost every retail agency. This is the base layer and the one most agencies are missing.",
            ],
            [
              "A sales pipeline",
              "You lose track of prospects, quotes and follow-ups before they convert.",
              "Agencies whose constraint is finding customers rather than servicing them.",
            ],
            [
              "Commission and accounting",
              "You cannot reconcile what insurers paid you against what you sold, or split it between sub-agents.",
              "Agencies large enough that commission disputes cost real money.",
            ],
            [
              "Quoting and issuance",
              "You want to compare premiums and issue cover without leaving one screen.",
              "Brokers with insurer integrations. This usually comes from a broking platform, not a records product.",
            ],
          ],
        },
        {
          kind: "text",
          text: "Most products do one of these well and gesture at the others. A product that claims all four either has a long implementation or is overstating something, and the honest way to find out which is to ask the vendor to show you the third one in a live screen rather than in a slide.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Be specific about commission before you sign",
          text: "\"Commission management\" means anything from storing a percentage against a policy to reconciling an insurer's payout statement line by line. Those are months of work apart. Ask which one, and ask to see it with a real statement.",
        },
      ],
    },
    {
      heading: "The seven questions that actually separate these products",
      blocks: [
        {
          kind: "text",
          text: "Feature lists converge; these do not. Ask all seven of every vendor on your shortlist, and write the answers down — half the value is in which questions they answer precisely and which they answer with an adjective.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "How does a policy get into the system?",
              text: "Typed into a form, imported from a per-insurer template, or read out of the PDF? This is the question with the largest effect on how much time the product saves and the one most likely to be answered vaguely. \"Easy data entry\" means typing.",
            },
            {
              title: "What happens to a field it cannot read?",
              text: "There are two possible answers and only one of them is safe. Either the field is flagged for a human, or it is filled with a best guess. A product that guesses silently will put a wrong expiry date on a policy and you will find out when the cover has lapsed.",
            },
            {
              title: "Where does the expiry date come from?",
              text: "Read off the policy schedule, or calculated as a year after the start date? The second is right for most policies and wrong for exactly the ones that matter: short-period travel cover, long-term motor, and anything endorsed mid-term.",
            },
            {
              title: "Is the original document kept, and attached to the record?",
              text: "If the PDF is discarded after import, every figure in the system is a claim with nothing behind it. When a customer disputes a premium, you want the page it was read from, not a cell in a database.",
            },
            {
              title: "Can you get your data out?",
              text: "Ask specifically: can you export every policy and every document, today, without asking support? A product you cannot leave is a product that does not have to keep earning you.",
            },
            {
              title: "Who can see what, and who decides?",
              text: "If you have sub-agents, ask what a sub-agent can do before you grant anything, what you can grant, and what cannot be granted at all. \"Role-based access\" with three fixed roles is a different product from one where capabilities are granted individually.",
            },
            {
              title: "Where is the data, and what is the deletion position?",
              text: "Which country hosts the application, the database and the documents; what happens on a deletion request; whether there is a published retention schedule. A vendor who has not thought about this will say \"it's secure\", which is not an answer to any of the three.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "A note on certifications",
          text: "Some vendors in this market advertise ISO certificates, IRDAI association or \"bank-grade security\". Ask for the certificate number and the scope, and check what the scope actually covers — a certificate held by a hosting provider is not held by the software. Insoora holds no security certification and says so; a vendor claiming one should be able to produce it in a minute.",
        },
      ],
    },
    {
      heading: "The two-hour test",
      blocks: [
        {
          kind: "text",
          text: "Everything above is preparation. This is the part that decides it, and it is worth protecting two hours for because no demo substitutes for it.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Pick five documents, badly",
              text: "Not your tidiest PDFs. One dense motor schedule from the insurer you sell most, one health policy with a family floater, one scan or photograph of a printed policy, one policy from the insurer whose layout you find hardest to read, and one short-period or long-term policy with unusual dates.",
            },
            {
              title: "Upload the same five to each product",
              text: "In a trial account, yourself, without the vendor driving. A demo where somebody else uploads a document they chose tells you about their document.",
            },
            {
              title: "Count fields, not impressions",
              text: "For each policy, count how many fields came out correct, how many were flagged for review, and how many were wrong but confident. The third number is the dangerous one — a wrong value nobody was asked to check is worse than a blank.",
            },
            {
              title: "Then try to find something",
              text: "Close the product, reopen it, and find the health policy by the customer's name. Then find the motor policy by registration number. Then find out what expires in the next thirty days. Retrieval is half the product and never appears in a demo.",
            },
            {
              title: "Finally, try to leave",
              text: "Export everything. If you cannot get a policy list and the documents out in ten minutes on your own, you have learned something more important than any feature.",
            },
          ],
        },
        {
          kind: "text",
          text: "Two products that look identical on a comparison page will usually be two or three fields apart per policy on step three, and the gap compounds: at four hundred policies a year, two fields per policy is eight hundred corrections.",
        },
      ],
    },
    {
      heading: "What price comparison is honestly worth",
      blocks: [
        {
          kind: "text",
          text: "Less than it looks, in this category, for a reason specific to it: the pricing models are not comparable.",
        },
        {
          kind: "list",
          items: [
            "Per user per month is predictable and punishes you for giving a junior read-only access.",
            "Per policy processed tracks the work done and makes a historical backlog a one-off cost to plan for.",
            "A flat annual licence looks cheapest until you discover which modules are not in it.",
            "Free tiers in this market are usually capped on the thing you most need — the number of policies.",
          ],
        },
        {
          kind: "text",
          text: "A sensible comparison converts everything to one number: cost per year for your actual volume, with your actual number of logins, including the one-off cost of getting your existing book in. Ask each vendor to compute that for your numbers and send it in writing. The ones who will not are telling you something.",
        },
        {
          kind: "callout",
          tone: "note",
          title: "Our own prices are not on this website",
          text: "Insoora charges a subscription plus policy credits consumed as documents are processed, and no figures are published here because they have not been published anywhere. We would rather say that than quote a number on a blog that turns out to be wrong. Ask us and we will tell you the current terms.",
        },
      ],
    },
    {
      heading: "Three decisions that are not about software",
      blocks: [
        {
          kind: "text",
          text: "Agencies that get no value from good software usually lost it in one of these three places, and all three are decided before the product is chosen.",
        },
        {
          kind: "h3",
          text: "Who owns the account",
        },
        {
          kind: "text",
          text: "In most of these products the account that signs up holds the plan, the data and the billing, and it cannot be transferred to a colleague later. If one person registers in their own name and then leaves, the book is in an account the business does not control. Register as the business, from an address the business controls, before anybody uploads anything.",
        },
        {
          kind: "h3",
          text: "What goes in, and in what order",
        },
        {
          kind: "text",
          text: "The instinct is to start with the archive, because it feels like the hard part. Start with the current year instead: that is what the renewal list has to be right about, and it is the half that pays for itself in the first month. The archive can be done in batches afterwards, by whoever has a quiet afternoon.",
        },
        {
          kind: "h3",
          text: "Who confirms a record",
        },
        {
          kind: "text",
          text: "If extraction flags a field, somebody has to confirm it, and that somebody has to be a person who can tell a correct expiry date from a plausible one. Deciding that it is you, for the first hundred policies, is usually right — and deciding it later, after a sub-agent has confirmed three hundred records nobody checked, is the expensive version.",
        },
      ],
    },
    {
      heading: "Where Insoora fits, and where it does not",
      blocks: [
        {
          kind: "text",
          text: "Since this is our website, the useful thing is a straight answer rather than a pitch.",
        },
        {
          kind: "text",
          text: "Insoora is the first row of the table above: policy and client records, built by reading the policy PDF rather than asking you to type it. It extracts the fields, flags what it cannot read confidently, files the policy under a customer matched on the mobile number from the document, keeps the original PDF attached, and builds a thirty-day renewal list from the expiry date on each schedule. Policyholders can be given read-only logins to their own records.",
        },
        {
          kind: "list",
          items: [
            "It is not a sales pipeline. No leads, stages, quotations or campaigns.",
            "It does not do commission, payouts or accounting.",
            "It has no insurer integration in either direction: no quoting, no issuing, no renewing.",
            "It sends nothing — no email, SMS or WhatsApp to you or your customers.",
            "It holds no security certification, has not been penetration tested, and has no multi-factor authentication yet.",
          ],
        },
        {
          kind: "text",
          text: "If your constraint is that you cannot find anything and renewals slip, that list is beside the point and the extraction is worth testing. If your constraint is prospecting or commission reconciliation, a different product is the answer and we would rather you found that out from this paragraph than from a trial.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Run the two-hour test on us too",
          text: "Five of your own documents, including the bad scan. We publish no accuracy figure precisely because the only number that predicts your result is the one you measure on your own insurers' layouts.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Which is the best insurance management software in India?",
      a: "No honest answer exists in the abstract, because the decisive variable is how well a product reads the policy documents your insurers issue — and that differs by insurer and by document quality. Shortlist two or three, upload the same five of your own policy PDFs to each, and count how many fields came out right. That measurement outranks every feature comparison.",
    },
    {
      q: "What features should insurance management software have?",
      a: "At minimum: policy records with the original document attached, a client record gathering everything one customer holds, search and filters that work on real fields, an expiry date read from the policy schedule rather than calculated, a visible review step for anything the system could not read confidently, access decided per person, and an export you can run yourself.",
    },
    {
      q: "Is free insurance software good enough for a small agency?",
      a: "Sometimes, with one caution: free tiers in this market are usually capped on the number of policies, which is the thing a growing book needs most. Check the cap and check whether an export is included in the free tier — a product you cannot leave is expensive at any price.",
    },
    {
      q: "Should I buy an all-in-one platform or a records product?",
      a: "Ask the vendor to show you their weakest module in a live screen rather than a slide. All-in-one products in this category are usually strong in one area and thin in the others, and the thin module is the one that decides whether the suite was worth it.",
    },
    {
      q: "How long does it take to move an existing book into new software?",
      a: "It depends almost entirely on whether policies are typed in or read from documents. Either way, do the current year first — that is what the renewal list must be correct about — and treat the archive as batches of work afterwards rather than a migration project that has to finish before the software is useful.",
    },
    {
      q: "Does Insoora rank itself first in this guide?",
      a: "No, and there is no ranking in it at all. We have not tested our competitors' extraction against our own documents, so a ranking from us would be an opinion wearing a number. The article gives you the test instead, and the test applies to us on the same terms.",
    },
  ],
};
