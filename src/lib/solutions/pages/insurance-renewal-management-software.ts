import type { SolutionPage } from "../types";

// The renewals page.
//
// Its first job is to correct the expectation the query carries. People
// searching for renewal software are usually looking for something that sends
// messages, and Insoora sends nothing — it builds a list and shows an alert
// inside the portal. That is said in the opening section rather than buried
// in the limits, because a reader who needs automated SMS should be able to
// leave within one screen.
//
// "Insurance Renewal Reminder Software" is kept as a SECONDARY keyword rather
// than the primary one for exactly that reason: the page answers the question
// behind the query honestly, which includes answering it "no".

export const page: SolutionPage = {
  slug: "insurance-renewal-management-software",
  group: "solution",
  metaTitle: "Insurance Renewal Management Software — Expiry Tracking | Insoora",
  description:
    "Renewal management that reads the expiry date off the policy schedule and builds a thirty-day list, so a lapse is visible before it happens rather than after.",
  accent: "orange",
  badge: "Dates from the document, not from a reminder",
  h1: {
    lead: "Insurance renewal management that takes the date",
    highlight: "off the policy itself.",
  },
  lede:
    "Almost nobody misses a renewal on purpose. They miss it because the date lived in a reminder somebody set a year ago, and the reminder was dismissed while they were with a customer. Insoora reads the expiry date off the schedule and keeps a list, which is a different kind of object: it is still there tomorrow.",
  checks: [
    "Expiry read from the policy schedule",
    "A thirty-day list, sorted by date",
    "Separate third-party dates on motor",
    "Customers see their own days remaining",
  ],
  heroShot: "renewalTimeline",
  nav: {
    label: "Renewal management",
    hint: "A list built from the policy's own expiry date",
  },
  footerColumn: "solutions",
  primaryKeyword: "Insurance Renewal Management Software",
  secondaryKeywords: [
    "Insurance Renewal Reminder Software",
    "Insurance Policy Tracking System",
    "Insurance Premium Tracking Software",
    "Insurance Policy Expiry Tracking",
  ],
  sections: [
    {
      kind: "split",
      id: "list-not-reminder",
      accent: "orange",
      eyebrow: "Set the expectation first",
      heading: "This builds a list. It does not send messages.",
      lede:
        "If what you need is automated SMS or WhatsApp to customers, Insoora is not that, and the rest of this page will not change that.",
      paragraphs: [
        "Insoora has no outbound messaging. It does not email, text or WhatsApp your customers, and it does not run a campaign on your behalf. What it does is make the question \"what expires in the next thirty days?\" answerable without anybody having maintained an answer.",
        "The distinction is worth more than it sounds. A reminder tells one person about one policy at one moment, and once dismissed it leaves no trace that it ever existed. A list tells you about every policy in a window, in date order, and is still there tomorrow and the day after. Most of what goes wrong with renewals is a reminder being used where a list was needed.",
        "Inside the portal there is an alert bell, which surfaces the policies expiring soon, the extractions still waiting for review, and the policies not yet shared with their customer. That is a notification, not a message to a customer.",
      ],
      bullets: [
        "A renewals view of policies ending within the next thirty days, sorted by date",
        "An in-portal alert count for expiring policies, pending reviews and unshared records",
        "Policyholders see days remaining on their own cover in their own portal",
      ],
      shot: "renewalTimeline",
      limit:
        "No email, SMS or WhatsApp is sent to anyone — not to you and not to your customers. Contacting the customer is still a phone call you make.",
    },
    {
      kind: "table",
      id: "which-dates",
      accent: "blue",
      eyebrow: "The dates",
      heading: "Which dates a policy actually has",
      lede:
        "Expiry is the obvious one and for many agents the only one recorded. Several others change what you should do and when.",
      columns: ["Date", "Why it matters", "In Insoora"],
      rows: [
        [
          "Policy expiry",
          "The deadline. Cover ends, and for motor, driving after it is an offence as well as a risk.",
          "Read from the schedule. Drives the thirty-day list and the customer's days-remaining figure.",
        ],
        [
          "Policy start",
          "Establishes the term, and anchors the cycle for following years.",
          "Read from the schedule, stored alongside expiry.",
        ],
        [
          "Issue date",
          "Distinguishes when cover began from when the document was produced, which differ more often than people expect.",
          "Read where the schedule states it.",
        ],
        [
          "Third-party cover period",
          "On a long-term motor policy, third-party cover can run three or five years while own damage runs one. Two expiry dates, and only one needs acting on this year.",
          "Stored as its own start and end dates, separate from the policy's.",
        ],
        [
          "Previous policy expiry",
          "Establishes continuity, which is what a no-claim bonus depends on.",
          "Read where the schedule names the previous insurer and policy.",
        ],
        [
          "Grace period end",
          "The last point at which cover can usually be restored without underwriting again, and it varies by insurer and product.",
          "Not modelled. It is in the policy wording, not the schedule, and Insoora does not read wordings.",
        ],
      ],
      note:
        "A grace period is not an extension of cover. For many general insurance policies a claim arising during a lapse is simply not payable even if the policy is later reinstated — never tell a customer otherwise without reading that policy's own wording.",
    },
    {
      kind: "steps",
      id: "how-the-list-stays-true",
      accent: "purple",
      eyebrow: "Why the list can be trusted",
      heading: "What keeps a renewal list honest",
      lede:
        "Four properties, and the fourth is a duty on you rather than on the software.",
      steps: [
        {
          title: "The date came from the document",
          text: "Not from a convention. Software that assumes a policy runs a year from its start date is wrong about exactly the policies that matter most — short-period travel cover, multi-year motor, and anything endorsed mid-term.",
        },
        {
          title: "Nothing had to be remembered",
          text: "A policy appears on the list because of what its schedule says, not because somebody set something up when it was filed. A policy uploaded last year and forgotten about still turns up thirty days before it ends.",
        },
        {
          title: "Re-reading gives the new answer",
          text: "When a policy is endorsed and the term changes, the revised document can be uploaded and the record follows it. A date typed into a calendar has no connection to the document and cannot be re-checked against it.",
        },
        {
          title: "Flagged dates get confirmed",
          text: "If an expiry date was one of the fields the parser could not read confidently, it is flagged rather than guessed — and until a human confirms it, that policy's place on the list is only as good as the extraction. Clearing the review queue is what makes the list reliable, and it is the one part nobody else can do for you.",
        },
      ],
      shot: "reviewFlag",
    },
    {
      kind: "split",
      id: "customer-side",
      accent: "teal",
      eyebrow: "The customer's view",
      heading: "The policyholder can see their own clock",
      lede:
        "Half of renewal chasing is a customer who genuinely did not know their cover was ending.",
      paragraphs: [
        "A policyholder with a portal login sees each of their policies with how long it has left, read from the same schedule your list is built from. Cover in force, expiring within thirty days, already expired, and no expiry recorded are the four states, and they can filter to any of them.",
        "What they cannot do is act. The customer portal holds no write permission anywhere in the system: there is no renew button, no payment and no endorsement. It is a window onto their own records, and renewing remains a conversation with you.",
        "That is a smaller feature than an automated reminder and a more honest one. The customer who opens their portal and sees forty-five days left on their car policy is a customer who rings you first.",
      ],
      bullets: [
        "Four states: in force, expiring in thirty days, expired, no expiry recorded",
        "Days remaining on each policy, with the document it was read from",
        "Strictly read-only — nothing in the portal can change a record",
      ],
      shot: "customerRenewals",
      limit:
        "A policyholder sees only what their agent has shared with them. A policy that has not been assigned to a customer appears to nobody but the agency, which is why \"not yet shared\" is one of the portal's own alerts.",
    },
    {
      kind: "cards",
      id: "working-the-list",
      accent: "pink",
      eyebrow: "Turning a list into a week",
      heading: "What you can do with the renewals view",
      lede:
        "The renewals view is driven by the same filters as the policy list, which is what lets it become a working list rather than a report.",
      cards: [
        {
          icon: "clock",
          title: "Filter by window",
          text: "Expiring within thirty days is the default view. The same filter applies on the policy list, so a wider or narrower window is one control away.",
        },
        {
          icon: "search",
          title: "Narrow by insurer or line",
          text: "Everything expiring next month from one insurer, or all the health policies, filtered and sorted by date.",
        },
        {
          icon: "link",
          title: "Keep the view",
          text: "Filters live in the URL, so a filtered renewals list can be bookmarked or sent to a colleague with the same access.",
        },
        {
          icon: "download",
          title: "Take it with you",
          text: "Export the list to CSV or Excel to work from on a phone or hand to someone making calls, with the same access rules as the screen.",
        },
        {
          icon: "history",
          title: "See last year first",
          text: "Open the customer and the previous policy is there with its document, which is what a renewal conversation actually needs.",
        },
        {
          icon: "bell",
          title: "Three alert counts",
          text: "Expiring soon, waiting for review, and not yet shared with the customer — the three backlogs that quietly become lapses.",
        },
      ],
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "What renewal software this is not",
      heading: "The four things it will not do",
      lede:
        "Each of these is something a product in this category is often assumed to do.",
      items: [
        {
          title: "It does not contact anyone",
          text: "No email, no SMS, no WhatsApp, no automated calls, no templates and no campaign scheduling — to you or to your customers. The list tells you who to ring.",
        },
        {
          title: "It does not renew",
          text: "There is no connection to any insurer in either direction. Insoora cannot fetch a renewal quote, submit a renewal, collect a premium or issue cover.",
        },
        {
          title: "It does not read policy wordings",
          text: "Grace periods, waiting periods and reinstatement terms live in the wording document, not the schedule. Insoora reads schedules, so those dates are not modelled and must be checked against the policy itself.",
        },
        {
          title: "It cannot fix a date nobody confirmed",
          text: "An expiry date flagged for review and left unconfirmed is a policy whose place on the list is uncertain. The software can show you the backlog; it cannot clear it.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Does Insoora send renewal reminders to my customers?",
      a: "No. There is no outbound email, SMS or WhatsApp anywhere in the product. It builds a list of policies expiring within the next thirty days, shows an alert count inside the portal, and lets a policyholder see how long their own cover has left. Contacting the customer is still a call you make.",
    },
    {
      q: "Where does the expiry date come from?",
      a: "From the policy schedule itself, extracted when the document was read. It is not assumed to be a year after the start date, which is why short-period travel cover, multi-year motor policies and mid-term endorsements all land on the correct day.",
    },
    {
      q: "How far ahead does the renewal list look?",
      a: "The renewals view shows policies ending within the next thirty days, sorted by date. The same expiry-window filter is available on the full policy list, so a longer view is a filter rather than a different screen.",
    },
    {
      q: "What about long-term motor policies with separate third-party cover?",
      a: "They are handled. A long-term motor policy's third-party cover period is stored as its own start and end dates, separate from the policy's own expiry, so a one-year own-damage cover sitting inside three years of third party has both dates recorded and only the one that needs acting on appears as due.",
    },
    {
      q: "What if the expiry date was extracted wrongly?",
      a: "A date the parser could not read confidently is flagged for review rather than guessed, and shown beside the page it should have come from. Until it is confirmed that policy's place on the list is only as reliable as the extraction — clearing the review queue is what the list depends on.",
    },
    {
      q: "Does it track premium due dates on instalment policies?",
      a: "The premium breakdown and payment mode are read where the schedule states them, but there is no instalment schedule and no premium-due tracking. Only the policy's own period dates drive the renewal list.",
    },
  ],
  related: [
    {
      href: "/insurance-policy-management-software",
      label: "Policy management",
      text: "Where the records the renewal list is built from come from.",
    },
    {
      href: "/customer-portal",
      label: "What the customer sees",
      text: "The policyholder's own view of days remaining on each policy.",
    },
    {
      href: "/general-insurance-management-software",
      label: "Renewals across a mixed book",
      text: "Why travel, motor and health policies all land on the right date.",
    },
    {
      href: "/insurance-agency-management-software",
      label: "One list for a whole agency",
      text: "Thirty days across every seller, not one list per person.",
    },
    {
      href: "/blog/track-insurance-policy-renewals-and-important-dates",
      label: "Guide: tracking renewals",
      text: "The dates worth watching and how far ahead to make the call.",
    },
    {
      href: "/faq",
      label: "Every question answered",
      text: "How extraction, access, storage and pricing actually work.",
    },
  ],
  cta: {
    eyebrow: "Find out what is about to lapse",
    title: "Upload the book and read the next thirty days.",
    lede: "The policies you had forgotten are the ones this list is for.",
    secondary: { href: "/insurance-policy-management-software", label: "See policy management" },
  },
};
