import type { SolutionPage } from "../types";

// ── The page that has to say "this portal does not exist" ────────────────
//
// The brief asks for an /agency-management-portal page showing an "agency
// dashboard". There is no agency portal and no agency role in the product:
// the main agent account IS the agency, and sub-agents work inside the same
// agent portal with granted capabilities.
//
// Two ways to handle that. Draw an agency dashboard anyway and let a reader
// discover after signing up that there are three portals and not four — or
// publish the page at the URL the brief asked for and spend its first section
// explaining the real structure. This is the second. The URL earns its place
// because "agency management portal" is a real thing people search for and
// the honest answer to it is a page, not a 404.
//
// Every screen shown below is a screen that exists, labelled with the portal
// it is really in.

export const page: SolutionPage = {
  slug: "agency-management-portal",
  group: "portal",
  metaTitle: "Agency Management Portal — Sub-Agents and One Shared Book | Insoora",
  description:
    "How agency management works in Insoora: no separate agency portal, one agent account holding the book, and sub-agents with capabilities granted one at a time.",
  accent: "purple",
  badge: "Three portals, not four",
  h1: {
    lead: "The agency management portal is the agent portal,",
    highlight: "with a team inside it.",
  },
  lede:
    "There is no separate agency portal in Insoora, and this page starts by saying so. The main agent account is the agency — it holds the plan, the credits and every policy — and its sub-agents work in the same portal with the capabilities the agency granted them. Here is what that looks like, screen by screen.",
  checks: [
    "One account holds the agency's whole book",
    "Sub-agents in the same portal, not a separate one",
    "Eight capabilities, granted one at a time",
    "Two cannot be delegated at all",
  ],
  heroShot: "subAgentTeam",
  nav: {
    label: "Agency portal",
    hint: "How a team works inside the agent portal",
  },
  primaryKeyword: "Insurance Sub-Agent Management Software",
  secondaryKeywords: [
    "Agency Management Portal",
    "Insurance Team Management Software",
    "Sub-Agent Access Control",
  ],
  sections: [
    {
      kind: "prose",
      id: "no-fourth-portal",
      accent: "purple",
      eyebrow: "Read this before the screenshots",
      heading: "Insoora has three portals, and none of them is an agency portal",
      lede:
        "If you came here expecting a fourth sign-in with an agency dashboard behind it, that is not how the product is built.",
      paragraphs: [
        "The three portals are the agent portal, the customer portal and the back office. An agency does not get one of its own, because an agency is not a separate kind of account — the main agent account IS the agency. It holds the subscription, it holds the policy credits, and it holds every policy that anybody on the team uploads.",
        "A sub-agent is an employee of exactly one agency. It signs into the same agent portal, sees the agency's book, and can do whatever the main agent granted it and nothing else. It has no plan, no credits and no book of its own.",
        "That is a simpler structure than most agency software, and the simplification has a consequence worth naming plainly: a sub-agent cannot take their policies with them, and the agency cannot be divided into branches or regions. The hierarchy is exactly two levels deep, and if your business needs three, this is not the shape of software you need.",
      ],
      h3: [
        {
          heading: "Why the page exists at this address anyway",
          paragraphs: [
            "Because \"agency management portal\" is what people call the thing they are looking for, and the useful response to that search is an explanation of how it really works rather than nothing at all.",
            "Every screen below is a real screen in the real product, labelled with the portal it is actually in. Nothing on this page is a drawing of an interface that does not exist.",
          ],
        },
      ],
    },
    {
      kind: "split",
      id: "the-team-screen",
      accent: "blue",
      eyebrow: "The one agency-specific screen",
      heading: "Sub-Agents: who is on the agency and what they can do",
      lede:
        "It appears in the sidebar only on a main agent account. This is where delegation actually happens.",
      paragraphs: [
        "The team screen lists everyone on the agency with the capabilities each person holds and how much they have uploaded. Adding a person creates a sub-agent account tied to this agency; there is no invitation to an existing account and no way for a sub-agent to belong to two agencies.",
        "A new sub-agent starts with read access to the agency's book and nothing more. Every further capability is granted individually, which means an agency can staff a role precisely — somebody who uploads but does not confirm, somebody who reviews but never sees an unmasked phone number, somebody who only reads.",
        "The grants are not a convenience for the interface. Each one is a permission checked on the server for every request, so hiding or showing a sidebar entry can never widen what an account is able to do.",
      ],
      bullets: [
        "Every person on the agency, with their capabilities and upload count",
        "A new sub-agent can read and nothing else until granted more",
        "Permissions checked server-side on every request, not enforced by the sidebar",
      ],
      shot: "subAgentTeam",
      limit:
        "There is no role template, no copy-permissions-from and no bulk grant. Each capability is set per person, which is fine for a team of five and tedious for a team of thirty.",
    },
    {
      kind: "screens",
      id: "screens",
      accent: "teal",
      eyebrow: "What an owner looks at",
      heading: "Three screens an agency runs on",
      lede:
        "All three are in the agent portal. The first is main-agent only; the other two are the whole agency's book, seen by anyone with access to it.",
      shots: [
        {
          shot: "subAgentTeam",
          title: "Sub-Agents — the team",
          text: "Who is on the agency, what each was granted, and who is actually uploading.",
        },
        {
          shot: "agentDashboard",
          title: "Dashboard — the agency's position",
          text: "The plan and credit balance, how many documents are processing, how many need review, and what failed. On a sub-agent's screen these figures are the agency's.",
        },
        {
          shot: "policyList",
          title: "Policies — one shared book",
          text: "Everything the agency has processed, whoever uploaded it, searchable and filterable as one list.",
        },
      ],
    },
    {
      kind: "table",
      id: "capability-matrix",
      accent: "orange",
      eyebrow: "The whole delegation model",
      heading: "What a main agent has, what a sub-agent can be given",
      lede:
        "This is the complete list. There is nothing else to grant, and the last two rows cannot be granted at any level.",
      columns: ["Capability", "Main agent", "Sub-agent"],
      rows: [
        [
          "Read the agency's policies and documents",
          "Yes",
          "Yes — from the moment the account exists, without being granted",
        ],
        [
          "Upload policy documents",
          "Yes",
          "Grantable. Uploads spend the agency's credits and the policies belong to the agency",
        ],
        [
          "Process and review extractions",
          "Yes",
          "Grantable, as two separate capabilities",
        ],
        [
          "Confirm an extraction into a policy record",
          "Yes",
          "Grantable — and the one most agencies keep central while they learn how their insurers read",
        ],
        [
          "Assign a policy to a customer",
          "Yes",
          "Grantable. This is what clears the queue of policies whose mobile number matched nobody",
        ],
        [
          "Export to CSV, and export to Excel",
          "Yes",
          "Grantable, as two separate capabilities",
        ],
        [
          "See unmasked customer contact numbers",
          "Yes",
          "Grantable. Withholding it lets a reviewing role be staffed without handing over phone numbers",
        ],
        [
          "Manage sub-agents",
          "Yes",
          "Never. Cannot be granted",
        ],
        [
          "Billing: plan, credits, payment settings",
          "Yes",
          "Never. Cannot be granted",
        ],
      ],
      note:
        "An export always follows the access of the person who ran it, so a sub-agent's export can never contain a policy they could not already open on screen.",
    },
    {
      kind: "steps",
      id: "setting-up",
      accent: "green",
      eyebrow: "Setting an agency up",
      heading: "The order that avoids rework",
      lede:
        "Five steps. Doing the first one second is the mistake worth avoiding.",
      steps: [
        {
          title: "Create the agency account first",
          text: "Register as an agent. This account will hold the plan, the credits and every policy, so it should belong to the business rather than to whoever happened to sign up — a sub-agent account cannot be promoted into it.",
        },
        {
          title: "Upload a handful of policies yourself",
          text: "Before anyone else touches it, find out how your insurers' layouts read. That ratio of clean to flagged decides how you want to split uploading from confirming.",
        },
        {
          title: "Add the people, grant nothing yet",
          text: "A new sub-agent can read the book immediately. Let them use it that way for a few days; it is often enough for the role they are actually doing.",
        },
        {
          title: "Grant upload, then decide about confirm",
          text: "Upload is the capability that removes work from you. Confirming is the one that carries judgement about a figure a customer may later dispute — keeping it central at the start and devolving it later is the common arrangement.",
        },
        {
          title: "Decide about contact numbers deliberately",
          text: "Unmasking customer phone numbers is its own capability. It is worth being a decision rather than something handed out with everything else.",
        },
      ],
      shot: "roleAccess",
    },
    {
      kind: "limits",
      id: "limits",
      accent: "red",
      eyebrow: "Where the structure stops",
      heading: "What an agency cannot do here",
      lede:
        "Four structural limits. None of them is a setting that can be changed.",
      items: [
        {
          title: "No branches, regions or sub-sub-agents",
          text: "The hierarchy is exactly two levels: an agency and its sub-agents. A multi-branch business cannot model its branches, and a sub-agent cannot have people under it.",
        },
        {
          title: "No per-person ownership",
          text: "Every policy belongs to the agency. A sub-agent who leaves takes nothing with them, which is usually the point — but it also means Insoora does not fit a network of independent agents who each want their own book.",
        },
        {
          title: "No commission, payouts or performance views",
          text: "Uploads are attributed to the person who made them and a commission rate on a document is stored, but there is no calculation, no split between sub-agents, no payout statement and no per-person revenue reporting.",
        },
        {
          title: "No task assignment or internal messaging",
          text: "The review queue is a shared list, not a workflow. Insoora does not assign work to a sub-agent, track a follow-up, or notify anybody that something needs doing.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is there a separate agency portal in Insoora?",
      a: "No. There are three portals — agent, customer and the back office — and an agency works inside the agent portal. The main agent account is the agency: it holds the plan, the policy credits and every policy, and sub-agents sign into the same portal with the capabilities the agency granted them.",
    },
    {
      q: "What exactly can a sub-agent be given?",
      a: "Eight capabilities, granted one at a time: upload documents, process extractions, review them, confirm them, assign a policy to a customer, export to CSV, export to Excel, and see unmasked customer contact numbers. Read access to the agency's book comes with the account. Billing and sub-agent management can never be granted.",
    },
    {
      q: "Can a sub-agent manage other sub-agents?",
      a: "No, and it is not a setting. Sub-agent management and billing are the two capabilities that cannot be delegated at all; they stay with the main agent account regardless of what else that person was granted.",
    },
    {
      q: "Who pays for a sub-agent's uploads?",
      a: "The agency. A sub-agent has no plan and no credits of its own — uploads spend the agency's policy credits, and the resulting policies belong to the agency account.",
    },
    {
      q: "Can an agency have branches or regions?",
      a: "No. The structure is exactly two levels deep — an agency and its sub-agents — with no branches, no regions and no sub-agents of sub-agents. If your business needs three levels, this is not the right shape of software for it.",
    },
    {
      q: "Can a sub-agent account be turned into the main agent account?",
      a: "No. Decide which account is the agency before you add anybody, because that account holds the plan, the credits and the whole book — it should belong to the business rather than to whoever happened to register first.",
    },
  ],
  related: [
    {
      href: "/insurance-agency-management-software",
      label: "The case for agency software",
      text: "What changes operationally when three people share one book.",
    },
    {
      href: "/agent-portal",
      label: "The portal itself",
      text: "All nine destinations, including the six that are not agency-specific.",
    },
    {
      href: "/admin-portal",
      label: "The back office",
      text: "The third portal, and what an operator there can see of an agency.",
    },
    {
      href: "/insurance-agent-management-software",
      label: "Before you have a team",
      text: "The same account, run by one person, and what the first week looks like.",
    },
    {
      href: "/blog/insurance-agency-management-practical-guide",
      label: "Guide: running an agency",
      text: "The operational side, software aside.",
    },
    {
      href: "/contact-us",
      label: "Describe your structure",
      text: "If you have branches or a network, ask and we will tell you plainly whether this fits.",
    },
  ],
  cta: {
    eyebrow: "Create the agency account first",
    title: "Register the business, then add the team to it.",
    lede: "The account you create holds the plan, the credits and the whole book — so start with the right one.",
    secondary: { href: "/insurance-agency-management-software", label: "Read the agency case" },
  },
};
