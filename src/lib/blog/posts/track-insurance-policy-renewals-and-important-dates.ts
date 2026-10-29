import type { Post } from "../types";

export const post: Post = {
  slug: "track-insurance-policy-renewals-and-important-dates",
  title: "How to Track Insurance Policy Renewals and Important Dates",
  metaTitle: "How to Track Insurance Policy Renewals and Important Dates",
  description:
    "Which insurance dates actually matter, where to find them on the policy, how far ahead to contact a customer, and how to build a renewal list that does not depend on remembering.",
  excerpt:
    "A lapsed policy is rarely a decision. It is almost always a date nobody was watching — and the fix is less about reminders than about where the date came from in the first place.",
  published: "2026-10-30",
  updated: "2026-10-30",
  accent: "orange",
  category: "agent-workflow",
  art: "renewals",
  audience: "Agents managing renewals",
  related: [
    "insurance-agency-management-practical-guide",
    "how-customers-can-keep-insurance-policies-organized",
  ],
  sections: [
    {
      heading: "Why renewals get missed",
      blocks: [
        {
          kind: "text",
          text: "Almost nobody misses a renewal because they decided not to renew. They miss it because the date lived somewhere that nobody looked at on the right day — a calendar entry made last year, a note in a diary, a message thread that scrolled away.",
        },
        {
          kind: "text",
          text: "Three failures account for most of it, and they are worth naming separately because they need different fixes.",
        },
        {
          kind: "list",
          items: [
            "The date was never captured. The policy was filed and the expiry was left inside the PDF, where nothing can act on it.",
            "The date was captured wrong. Someone read the start date and added a year — which is correct for most policies and wrong for exactly the ones that matter: short-period cover, multi-year motor policies, and anything endorsed mid-term.",
            "The date was captured correctly and nothing happened. A reminder fired while the agent was with a customer, got dismissed, and left no trace that it had ever existed.",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "The distinction that matters",
          text: "A reminder tells you about one policy at one moment. A renewal list tells you about every policy in a window, and is still there tomorrow. Almost everything that goes wrong with renewals is a reminder being used where a list was needed.",
        },
      ],
    },
    {
      heading: "The dates worth tracking",
      blocks: [
        {
          kind: "text",
          text: "Expiry is the obvious one, and for a lot of agents it is the only one recorded. Several others change what you should do and when.",
        },
        {
          kind: "table",
          columns: ["Date", "Why it matters", "Where it comes from"],
          rows: [
            [
              "Policy expiry",
              "The deadline. Cover ends; for motor, driving after it is an offence as well as a risk.",
              "The policy schedule",
            ],
            [
              "Policy start",
              "Establishes the term, and anchors the renewal cycle for following years.",
              "The policy schedule",
            ],
            [
              "Premium due date",
              "For policies paid in instalments, missing this can lapse cover long before expiry.",
              "The schedule or the payment plan",
            ],
            [
              "Grace period end",
              "The last point at which cover can usually be restored without underwriting again.",
              "The policy wording, and it varies by insurer and product",
            ],
            [
              "Waiting period end",
              "In health cover, when a previously excluded condition becomes claimable. Worth knowing before advising a switch.",
              "The policy wording",
            ],
            [
              "No-claim bonus anniversary",
              "Renewing late can forfeit accumulated bonus — a real monetary loss to the customer.",
              "The previous policy and the renewal notice",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A grace period is not an extension of cover",
          text: "Terms differ by insurer and product, and for many general insurance policies a claim arising during a lapse is simply not payable even if the policy is later reinstated. Never tell a customer they are covered during a grace period without reading that policy's own wording.",
        },
      ],
    },
    {
      heading: "Take the date from the document",
      blocks: [
        {
          kind: "text",
          text: "This is the single highest-value habit in the whole process, and it is worth being precise about why.",
        },
        {
          kind: "text",
          text: "A date typed into a reminder is a copy of a fact. Copies drift: a policy is endorsed and the term changes, a customer renews early, cover is issued for a short period to align with another policy. The document is updated and the copy is not, and nothing anywhere flags the disagreement.",
        },
        {
          kind: "text",
          text: "A date read off the policy schedule is the fact itself. When the document changes, re-reading it gives the new answer. This is why an expiry date extracted from the PDF is worth more than the same date typed into a calendar — not because typing is error-prone, though it is, but because the typed version has no connection to the source and cannot be re-checked.",
        },
        {
          kind: "h3",
          text: "Where the date actually sits",
        },
        {
          kind: "text",
          text: "On most Indian insurer schedules the term appears as a \"Period of Insurance\" line with a from and a to, often with times attached — cover frequently runs to midnight on the end date, which is why a policy expiring \"on\" the 14th may or may not cover the 14th. Read the time if it is printed. For motor policies, check whether the third-party and own-damage sections carry different end dates; on bundled and long-term products they often do, and the earlier of the two is the one that constrains you.",
        },
      ],
    },
    {
      heading: "When to make contact",
      blocks: [
        {
          kind: "text",
          text: "Too early and the customer has not thought about it and forgets the conversation. Too late and they have already taken a quote from someone else, or the policy has lapsed and the conversation is now about a gap in cover.",
        },
        {
          kind: "text",
          text: "A sequence that works for most general insurance renewals, adjusted for how much work the particular renewal needs:",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "30 days out — the heads-up",
              text: "A short message: the policy, the expiry date, and that you will send the renewal terms. The purpose is to put the date in their head before a competitor does.",
            },
            {
              title: "21 to 14 days out — the terms",
              text: "The actual renewal: premium, any change from last year, and what they need to do. If an inspection, a health declaration or documents are needed, this is the point where there is still time.",
            },
            {
              title: "7 days out — the chase",
              text: "Only to those who have not responded. By now you are competing with everyday life rather than with another agent.",
            },
            {
              title: "1 to 2 days out — the warning",
              text: "Direct, and clear about consequence: cover ends on this date, and here is what lapsing costs — the no-claim bonus, the waiting periods, and in motor the legal position.",
            },
            {
              title: "After expiry — the recovery",
              text: "Do not drop it. There is often a window in which cover can be restored, and a customer who has lapsed is at the moment most likely to act. Be accurate about whether they are covered in the meantime: they are usually not.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Record the outcome, not just the contact",
          text: "\"Called on the 4th\" is less useful than \"waiting on health declaration\". The first tells you something happened; the second tells the next person what to do. If several people work the same book, this is the difference between a pipeline and a phone log.",
        },
      ],
    },
    {
      heading: "Building a renewal list that works",
      blocks: [
        {
          kind: "text",
          text: "The mechanism matters less than the properties. Whatever you build — a spreadsheet filter, a saved view, software — it needs to do four things.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Show a window, not a day. Everything expiring in the next thirty days, sorted by date, so the week ahead is visible on one screen.",
            "Carry a status per policy. Not contacted, contacted, waiting, renewed, lapsed. Without this, nothing can be worked through systematically.",
            "Survive a busy week. If the list is only correct when someone has updated it, it will be wrong exactly when it matters most.",
            "Be visible to more than one person. A renewal list that exists on one phone fails when that person is ill.",
          ],
        },
        {
          kind: "h3",
          text: "With a spreadsheet",
        },
        {
          kind: "text",
          text: "Perfectly workable. One row per policy, an expiry column formatted as a real date rather than text, a status column, and a filter for the next thirty days. The weaknesses are known: the dates are typed, so they can be wrong and nothing will say so; and it is only as current as the last manual update.",
        },
        {
          kind: "h3",
          text: "With software that reads the policy",
        },
        {
          kind: "text",
          text: "The difference is where the date comes from. Insoora takes the expiry date from the policy document at upload rather than from a field someone filled in, and the renewals view is a standing list of policies ending within the next thirty days, sorted by date. Because the date came from the document, a policy that was endorsed or reissued updates when the new document is uploaded.",
        },
        {
          kind: "text",
          text: "It is worth saying plainly what that does not do: it will not call the customer, and it does not know about grace periods or waiting periods, which live in the policy wording rather than in a structured field. The dates it tracks are the ones printed on the schedule. [See how extraction and the renewals view work](/features).",
        },
      ],
    },
    {
      heading: "What to tell the customer",
      blocks: [
        {
          kind: "text",
          text: "A renewal reminder that only says \"your policy is expiring\" puts all the work on the customer. A reminder that contains the facts gets a decision instead of a question.",
        },
        {
          kind: "list",
          items: [
            "Which policy — insurer, type, and the asset it covers. A customer with four policies does not know which one you mean.",
            "The exact expiry date, written out. Not \"next month\".",
            "The renewal premium, and whether it changed from last year. If it went up, say by how much and why before they ask.",
            "What they have to do, as a single next step.",
            "What happens if they do nothing — specifically and accurately, including the no-claim bonus where it applies.",
          ],
        },
        {
          kind: "text",
          text: "Customers who can see their own policies tend to need fewer of these conversations, because the date is in front of them rather than in your records. If you want to point them at something useful, [How Customers Can Keep Their Insurance Policies Organized](/blog/how-customers-can-keep-insurance-policies-organized) is written for them rather than for you.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How far in advance should a renewal reminder be sent?",
      a: "First contact around thirty days before expiry, with the actual renewal terms two to three weeks out. Renewals needing an inspection, a medical or documents need the longer end of that; a straightforward motor renewal can work on a shorter cycle. The reason to start at thirty days is competitive as much as practical — it is roughly when other quotes begin arriving.",
    },
    {
      q: "What happens if an insurance policy lapses?",
      a: "It depends on the product and the insurer, and it is not safe to generalise. Many policies can be reinstated within a defined window, sometimes with fresh underwriting; accumulated benefits such as a no-claim bonus or completed health waiting periods may be reduced or lost. Claims arising while cover was lapsed are commonly not payable. Read that policy's wording rather than relying on a rule of thumb.",
    },
    {
      q: "Can I rely on the insurer's own renewal notice?",
      a: "Treat it as a backstop, not a system. Notices go to the contact details the insurer holds, which are often out of date, and they can be missed in a crowded inbox. If the insurer's notice is the only thing prompting a renewal, nobody finds out it failed until after expiry.",
    },
    {
      q: "Should renewal tracking be separate from the policy records?",
      a: "No — that separation is the source of most drift. When the renewal list is a view over the policy records rather than a second list maintained alongside them, the two cannot disagree. Two lists always diverge eventually, and the one that is wrong is usually the one being used.",
    },
  ],
};
