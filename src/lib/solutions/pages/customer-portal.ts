import type { SolutionPage } from "../types";

// The policyholder's portal.
//
// ── The fact this page exists to state ───────────────────────────────────
//
// A customer account's ability to OPEN a policy document is gated on that
// account having an active subscription; the policy records stay visible
// either way. An agent deciding whether to invite four hundred customers
// needs to know that before they promise anybody anything, and it is not the
// kind of thing a marketing page usually volunteers.
//
// So it is in the limits section by name, and in a FAQ, in the product's own
// terms ("downloads paused", records not deleted). No price is quoted
// anywhere, because none is published.

export const page: SolutionPage = {
  slug: "customer-portal",
  group: "portal",
  metaTitle: "Insurance Customer Portal — What Your Policyholders See",
  description:
    "A read-only insurance customer portal: every policy their agent shared, days left on each cover, and the original documents — and nothing they can change.",
  accent: "teal",
  badge: "Read-only by design",
  h1: {
    lead: "The customer portal: everything they hold,",
    highlight: "and nothing they can break.",
  },
  lede:
    "Your policyholders get a login to their own records — the policies you have shared, how long each cover has left, and the original documents to download. A customer account holds no write permission anywhere in the system, so there is nothing in it that could alter a policy.",
  checks: [
    "Seven screens, all read-only",
    "Days remaining read from the schedule",
    "Their own documents, downloadable",
    "They see only policies shared with them",
  ],
  heroShot: "vault",
  nav: {
    label: "Customer portal",
    hint: "What a policyholder sees, and cannot change",
  },
  primaryKeyword: "Insurance Customer Portal",
  secondaryKeywords: [
    "Insurance Policyholder Portal",
    "Insurance Customer Management Portal",
    "Policy Document Access for Customers",
    "Insurance Self Service Portal",
  ],
  sections: [
    {
      kind: "split",
      id: "read-only",
      accent: "teal",
      eyebrow: "The central rule",
      heading: "There is no write permission in a customer account",
      lede:
        "Not a hidden button, not a disabled form. The permission does not exist on the role.",
      paragraphs: [
        "A customer account can enter its own portal, read the policies assigned to it, and manage its own subscription. That is the complete list. It holds no upload, no edit, no assign, no delete and no export permission anywhere in the system, and every page and every request re-checks that on the server rather than relying on what the interface offered.",
        "This is why the portal is safe to hand out widely. The usual worry about giving customers access — that one of them will change something, or see something that is not theirs — is answered structurally: a policyholder can only ever see policies assigned to them, never another customer's, and there is no action available that could modify a record.",
        "The cost of that design is real and worth stating: a customer who spots a wrong detail cannot fix it. They have to contact you, and the portal says so on the screen where they found it.",
      ],
      bullets: [
        "Read their own policies, download their own documents, manage their own subscription",
        "No upload, edit, assign, delete or export — the permissions are absent, not hidden",
        "A customer never sees another customer's records",
      ],
      shot: "roleAccess",
      limit:
        "A policyholder cannot renew, pay a premium, raise a claim, endorse a policy or correct a detail. Everything that changes a policy is still a conversation with their agent.",
    },
    {
      kind: "screens",
      id: "screens",
      accent: "blue",
      eyebrow: "What it looks like",
      heading: "Three of the seven screens",
      lede:
        "Drawn with an invented policyholder. The other four are a dashboard, their subscription, their profile, and a help page.",
      shots: [
        {
          shot: "vault",
          title: "My Policies",
          text: "Everything their agent has shared, newest cover first, stacked by year with each year's document.",
        },
        {
          shot: "customerRenewals",
          title: "Renewals & Alerts",
          text: "How long each cover has left, read from the policy schedule, with what needs attention first.",
        },
        {
          shot: "customerMobile",
          title: "On a phone",
          text: "Where most policyholders will actually open it, which is the screen the portal has to work on.",
        },
      ],
    },
    {
      kind: "steps",
      id: "getting-access",
      accent: "purple",
      eyebrow: "How a customer gets in",
      heading: "From your record to their login",
      lede:
        "Four steps, and the mobile number does most of the work.",
      steps: [
        {
          title: "You hold their mobile number",
          text: "The number on the customer record is the key to everything that follows. It is also what an uploaded policy is matched against to find its customer, so a current number serves both purposes.",
        },
        {
          title: "You share the policies",
          text: "A policy becomes visible to a policyholder when it is shared with them. Until then it is visible only to your agency — which is why \"not yet shared\" is one of the three alert counts in the agent portal.",
        },
        {
          title: "They register, or you create the login",
          text: "A policyholder can register on the customer portal using the mobile number their agent already holds on record, which is how the login finds the right book of policies. An agent can also create the account.",
        },
        {
          title: "They sign in and see their own cover",
          text: "A dashboard of what they hold, the policies by year with documents, how long each has left, and a help page telling them who to contact — which is you.",
        },
      ],
      shot: "customerMatch",
    },
    {
      kind: "cards",
      id: "seven-screens",
      accent: "orange",
      eyebrow: "All seven destinations",
      heading: "Everything in a policyholder's sidebar",
      lede:
        "Named as the portal names them. There are no others, and none of them can change a policy.",
      cards: [
        {
          icon: "chart",
          title: "Dashboard",
          text: "An overview of their cover: what they hold, what is in force, and what needs attention.",
        },
        {
          icon: "shield",
          title: "My Policies",
          text: "Everything shared with them, filterable by in force, expiring within thirty days, expired, or no expiry recorded.",
        },
        {
          icon: "bell",
          title: "Renewals & Alerts",
          text: "Days remaining on each cover, taken from the expiry date on the policy document itself.",
        },
        {
          icon: "folder",
          title: "Documents",
          text: "Their policy PDFs, downloadable — the screen that stops them ringing you for a copy.",
        },
        {
          icon: "settings",
          title: "My Subscription",
          text: "Their own plan and payments. A customer plan is separate from an agent's and cannot be used to buy upload credits.",
        },
        {
          icon: "users",
          title: "Profile and Help & Support",
          text: "Their details and password, and a page of answers that ends by telling them to contact their agent.",
        },
      ],
    },
    {
      kind: "prose",
      id: "why-offer-it",
      accent: "pink",
      eyebrow: "The case for inviting customers",
      heading: "What a portal actually changes for an agent",
      paragraphs: [
        "The obvious gain is the one everybody names: fewer calls asking for a copy of a policy. That is real, and for a solo agent it is hours.",
        "The less obvious gain is better. A customer who can see that forty-five days remain on their car policy is a customer who contacts you about renewing instead of being contacted. Renewal chasing is a conversation you have to start because the other person does not know the clock is running; a portal moves some of those conversations to the other end.",
        "The third gain is the quietest. Once a customer has seen their own records laid out by year, with the documents, the gaps become visible to them too — the year nobody has a document for, the policy they thought they still had. That is a conversation worth having, and it is not one a spreadsheet of your own ever starts.",
      ],
      h3: [
            {
          heading: "And the case against",
          paragraphs: [
            "A portal is a surface. Giving four hundred people logins means four hundred accounts that can be forgotten, shared or left signed in on a family laptop, and there is no multi-factor authentication on accounts yet.",
            "It also sets an expectation. A customer who can see their records will notice when they are wrong or incomplete, and the only person who can fix either is you. A portal makes your record-keeping visible, which is an argument for it and a reason to get the records right first.",
          ],
        },
      ],
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "Before you promise your customers anything",
      heading: "Four things to know first",
      lede:
        "The first one is material and is not the kind of thing a page like this usually volunteers.",
      items: [
        {
          title: "Document downloads depend on an active customer subscription",
          text: "If a policyholder's own subscription is not active, their policy records all remain visible and nothing is deleted, but the documents cannot be opened until it is renewed. The portal says so plainly on the screen. No customer prices are published on this website, so confirm the current terms before you invite anyone.",
        },
        {
          title: "They see only what you shared",
          text: "A policy you have not shared is invisible to the policyholder it belongs to. If a customer says a policy is missing, the likely answer is that it was never shared rather than never uploaded.",
        },
        {
          title: "No notifications leave the platform",
          text: "The portal shows a policyholder how long their cover has left. It does not email, text or message them about it — there is no outbound messaging anywhere in the product.",
        },
        {
          title: "No multi-factor authentication yet",
          text: "Accounts are protected by a password over HTTPS. There is no second factor on any account type, no security certification and no penetration test. That is stated here rather than implied away.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What can a customer do in the Insoora customer portal?",
      a: "Read the policies their agent has shared with them, see how long each cover has left, download the original policy documents, and manage their own subscription and profile. That is the complete list — a customer account holds no upload, edit, assign, delete or export permission anywhere in the system.",
    },
    {
      q: "Can a customer see another customer's policies?",
      a: "No. A policyholder can only ever see policies assigned to their own account, and that boundary is enforced on the server for every request rather than by hiding anything in the interface.",
    },
    {
      q: "How does a policyholder get a login?",
      a: "They register on the customer portal using the mobile number their agent already holds on their record, which is how the account finds the right book of policies. An agent can also create the login for them.",
    },
    {
      q: "Can a customer renew a policy from the portal?",
      a: "No. There is no renew button, no premium payment for a policy and no claim intimation. The portal shows how long each cover has left; renewing is still a conversation with the agent.",
    },
    {
      q: "Does a customer need to pay to use the portal?",
      a: "A customer account can hold a subscription of its own, and if it is not active the policy documents cannot be opened — the records stay visible and nothing is deleted. No customer prices are published on this website, so ask us for the current terms before inviting your policyholders.",
    },
    {
      q: "Will my customers be notified about renewals automatically?",
      a: "No. Insoora sends no email, SMS or WhatsApp to anyone. A policyholder sees days remaining when they open their portal, and the agent sees a thirty-day renewal list — but nobody is contacted by the software.",
    },
  ],
  related: [
    {
      href: "/agent-portal",
      label: "The agent portal",
      text: "Where you share a policy, and the three alert counts that include unshared ones.",
    },
    {
      href: "/insurance-crm-software",
      label: "The customer record",
      text: "What you hold about a policyholder, and the portal-state column.",
    },
    {
      href: "/insurance-renewal-management-software",
      label: "Renewals on both sides",
      text: "Your thirty-day list and their days-remaining figure, from one date.",
    },
    {
      href: "/blog/how-customers-can-keep-insurance-policies-organized",
      label: "Guide: for policyholders",
      text: "Worth sending to a customer who wants to keep track of their own cover.",
    },
    {
      href: "/privacy-policy",
      label: "What is stored about them",
      text: "The providers involved, retention, and a policyholder's own rights.",
    },
    {
      href: "/faq",
      label: "Every question answered",
      text: "How extraction, access, storage and pricing actually work.",
    },
  ],
  cta: {
    eyebrow: "Show one customer first",
    title: "Share a policy with one customer and look at their view.",
    lede: "It is the fastest way to decide whether to offer it to the rest of your book.",
    secondary: { href: "/agent-portal", label: "See the agent portal" },
  },
};
