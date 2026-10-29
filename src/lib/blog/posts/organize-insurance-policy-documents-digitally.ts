import type { Post } from "../types";

export const post: Post = {
  slug: "organize-insurance-policy-documents-digitally",
  title: "How to Organize Insurance Policy Documents Digitally",
  metaTitle: "How to Organize Insurance Policy Documents Digitally: A Practical System",
  description:
    "A working system for storing insurance policy PDFs: what to name files, which fields to record, how to handle renewals and scans, and how to keep the documents findable years later.",
  excerpt:
    "Most policy filing systems fail the same way — they are organized for the person who filed the document, not for the person who has to find it eighteen months later. Here is a system built around retrieval.",
  published: "2026-10-30",
  updated: "2026-10-30",
  accent: "blue",
  category: "agent-workflow",
  art: "filing",
  audience: "Agents and anyone filing policy PDFs",
  related: [
    "track-insurance-policy-renewals-and-important-dates",
    "ocr-in-insurance-how-digital-policy-extraction-works",
  ],
  sections: [
    {
      heading: "The problem is retrieval, not storage",
      blocks: [
        {
          kind: "text",
          text: "Storing an insurance policy PDF is easy. Every insurer emails one, and a folder on a laptop or a Drive account will hold thousands of them without complaint. The difficulty shows up later, on the day a customer calls and asks whether their two-wheeler cover is still running, or an insurer asks for the previous year's policy to process a no-claim bonus, or a claim needs the exact wording of an exclusion.",
        },
        {
          kind: "text",
          text: "At that moment the question is not \"where did I save it\" but \"which of these forty files is it\". A folder of documents named `POLICY_FINAL(2).pdf` and `WhatsApp Image 2026-03-14.jpeg` is not a filing system. It is a pile with a search box over it, and the search box only works if the text inside the PDF is readable — which, for anything scanned or photographed, it usually is not.",
        },
        {
          kind: "text",
          text: "So a system worth setting up has to be designed backwards, from the moment of retrieval. Three questions decide everything else: what will you know when you go looking, how fast do you need the answer, and what happens when the person looking is not you.",
        },
        {
          kind: "callout",
          tone: "note",
          title: "What \"organized\" actually has to mean",
          text: "A filing system is working when you can answer \"is this customer covered right now, and for what\" without opening a single PDF. If the answer requires opening documents, the documents are stored but the information is not organized.",
        },
      ],
    },
    {
      heading: "Decide what you are filing: the document or the data",
      blocks: [
        {
          kind: "text",
          text: "This is the distinction most filing systems miss, and it is the one that matters. A policy PDF is two different things at once, and they have opposite needs.",
        },
        {
          kind: "text",
          text: "The document is the legal artefact. It is the thing an insurer, an ombudsman or a court will accept. It must never be edited, must be kept exactly as issued, and its value is entirely in being the original.",
        },
        {
          kind: "text",
          text: "The data is what is inside it: policy number, insurer, insured name, sum insured, premium, start date, expiry date, vehicle or asset details, nominee. This is what you actually search, sort, filter and act on. It is also what you need in a hurry, and it is the part a PDF makes hardest to get at.",
        },
        {
          kind: "text",
          text: "A system that files only the document gives you an archive you have to read. A system that records only the data gives you a spreadsheet you cannot prove. You need both, with a link between them — every record pointing at the exact file it came from, and every file reachable from its record.",
        },
        {
          kind: "h3",
          text: "The minimum fields worth recording",
        },
        {
          kind: "text",
          text: "Record too few and the index cannot answer questions. Record too many and nobody keeps it up. These are the fields that earn their keep, because each one is something you will one day filter or sort by:",
        },
        {
          kind: "list",
          items: [
            "Customer name, and a phone number — the phone number is what actually identifies a person across insurers, because names are spelled inconsistently on policy documents.",
            "Insurer and policy number — together these are the unique key an insurer will ask for.",
            "Policy type: motor, health, life, travel, home. This is the single most useful filter.",
            "Start date and expiry date. The expiry date is the one that drives every reminder you will ever send.",
            "Premium, and the sum insured or IDV.",
            "The asset, where there is one: registration number for motor, the insured member names for a family floater.",
            "A link to the original PDF.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Record the expiry date even when you record nothing else",
          text: "If you only ever capture one field beyond the customer's name, make it the expiry date taken from the document itself. Almost every useful thing a filing system does — reminders, renewal lists, lapse warnings — is a query on that one date.",
        },
      ],
    },
    {
      heading: "A naming convention that survives contact with reality",
      blocks: [
        {
          kind: "text",
          text: "If files are going to live in folders, the filename has to carry enough to identify the document without opening it. The convention below is deliberately boring, and the order of the parts is the point: files sort usefully when the fields that group them come first.",
        },
        {
          kind: "text",
          text: "A workable pattern is customer, then type, then insurer, then the expiry year — for example `Sharma-Rakesh_MOTOR_ICICI_2027.pdf`. Sorting that folder alphabetically groups every document by customer; sorting by name within a customer's folder groups by policy type.",
        },
        {
          kind: "h3",
          text: "Rules that matter more than the pattern you pick",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Put the date in ISO order — 2027-04 rather than April 2027 or 04/2027. It is the only format that sorts chronologically as text, and it is unambiguous between Indian and American conventions.",
            "Never use a slash in a filename. Policy numbers routinely contain them, and on most systems a slash is a folder separator — which is how a policy number silently becomes a nested directory.",
            "Avoid spaces if the file will ever be linked or emailed; use hyphens or underscores. Spaces become %20 and make URLs unreadable.",
            "Keep the insurer's own name, not your abbreviation for it. You will remember what ICICI means; a colleague will not know what IL-GI meant.",
            "Never put a version number on a policy document. There are no versions — there is the policy that was issued, and if it was endorsed, there is a separate endorsement document.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A naming convention is a tax, and someone has to pay it",
          text: "Every scheme in this section only works if every file is renamed on arrival, every time, by whoever receives it. That discipline is where manual systems break down — not because the rules are wrong, but because renaming forty documents a week is dull work that gets deferred and then abandoned. Be honest with yourself about whether it will happen before you build the rest of your process on it.",
        },
      ],
    },
    {
      heading: "Folders, or an index?",
      blocks: [
        {
          kind: "text",
          text: "Folders encode exactly one hierarchy. Whatever you put at the top level becomes the only question you can answer quickly, and everything else becomes a manual search. That is the whole trade-off.",
        },
        {
          kind: "table",
          columns: ["Top-level folder", "Fast to answer", "Slow to answer"],
          rows: [
            [
              "By customer",
              "Everything this one person holds",
              "All motor policies expiring in March",
            ],
            [
              "By policy type",
              "All health policies",
              "Everything one customer holds",
            ],
            [
              "By expiry month",
              "This month's renewals",
              "A customer's history across years",
            ],
            [
              "By insurer",
              "Everything from one company",
              "Almost every other question",
            ],
          ],
        },
        {
          kind: "text",
          text: "There is no correct answer in that table, which is the useful finding. If your work is answering customer calls, file by customer. If your work is renewals, file by expiry month and accept that customer history will be painful.",
        },
        {
          kind: "text",
          text: "An index escapes the trade-off entirely. A spreadsheet with one row per policy and a link to the file can be sorted by any column, which means every row of that table becomes fast at once. The folder structure stops mattering, because nobody navigates it — they filter the index and follow the link.",
        },
        {
          kind: "text",
          text: "This is why the practical answer for anyone handling more than a few dozen policies is: keep a flat, consistently-named document store, and put the intelligence in an index over it. Folders are for storage. The index is the filing system.",
        },
      ],
    },
    {
      heading: "Scans, photographs and the documents you cannot search",
      blocks: [
        {
          kind: "text",
          text: "Policy documents arrive in two very different shapes, and the difference decides how much work filing them takes.",
        },
        {
          kind: "text",
          text: "An insurer-issued digital PDF has a text layer: the characters are stored as text, so the document can be searched, copied and read by software. A scan or a phone photograph has no text layer. It is a picture of a document, and to a computer it is as opaque as a photograph of a wall until optical character recognition is run over it.",
        },
        {
          kind: "text",
          text: "That distinction is invisible in a folder — both are a PDF with a similar icon — and it is the reason a search for a policy number sometimes finds nothing even though the document is right there.",
        },
        {
          kind: "h3",
          text: "Getting usable scans when you have no choice",
        },
        {
          kind: "list",
          items: [
            "Ask for the insurer's original emailed PDF before you accept a photograph. It takes one message and saves every downstream problem.",
            "If you must photograph, do it flat, in even light, with the whole page in frame and the camera parallel to the paper. Skew and shadow cost more accuracy than low resolution does.",
            "Capture the whole document, not only the schedule page. The exclusions and endorsements are the pages that matter during a claim.",
            "Keep the photograph as well as any converted copy. The original capture is your evidence of what you were given.",
          ],
        },
        {
          kind: "text",
          text: "If you want the detail on how that conversion actually works, and where it goes wrong, we wrote it up separately in [OCR in Insurance: How Digital Policy Extraction Works](/blog/ocr-in-insurance-how-digital-policy-extraction-works).",
        },
      ],
    },
    {
      heading: "Access, backup and the things that end a business",
      blocks: [
        {
          kind: "text",
          text: "A document store is only as good as its worst day. Two failures are worth designing against specifically, because both are common and both are survivable only if you planned ahead.",
        },
        {
          kind: "h3",
          text: "Loss",
        },
        {
          kind: "text",
          text: "A single laptop is one spilled cup of tea away from being a total loss. The usual rule is worth stating plainly: keep more than one copy, on more than one kind of storage, with at least one copy somewhere else physically. A cloud folder that syncs your laptop is one copy with a mirror, not two copies — if the files are deleted locally, the deletion syncs.",
        },
        {
          kind: "text",
          text: "Check that a restore actually works at least once. An untested backup is a belief, not a backup.",
        },
        {
          kind: "h3",
          text: "Exposure",
        },
        {
          kind: "text",
          text: "Policy documents are among the most sensitive files an agent holds. A single motor policy carries a name, address, phone number, vehicle registration and often a bank reference. A health policy adds medical details and family member names.",
        },
        {
          kind: "list",
          items: [
            "Never share a policy by sending a public link to a cloud folder. Those links are forwardable, usually permanent, and frequently indexable.",
            "Do not keep customer documents in a personal chat application's media folder, where they are mixed with everything else on the phone and backed up to an account that other people may be able to reach.",
            "Where a system supports it, give each person access to only what their role requires — a sub-agent should not be browsing the whole book of business, and a policyholder should only ever see their own documents.",
            "When someone leaves, their access should end the same day. This is easy with accounts and effectively impossible with a shared folder and a shared password.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Shared logins are the quiet risk",
          text: "One account used by four people cannot be audited, cannot be revoked for one person, and leaves no trace of who opened what. It is the single most common weakness in small agency setups, and it is also the easiest to fix.",
        },
      ],
    },
    {
      heading: "Putting it together: a system you can actually run",
      blocks: [
        {
          kind: "text",
          text: "Everything above reduces to a short routine. The value is in doing it on arrival, every time — the ten minutes it takes at intake is what buys back the hour at retrieval.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Capture the document as issued",
              text: "Save the insurer's original PDF, unedited. If what you were given is a photograph, keep that too, and ask for the digital original.",
            },
            {
              title: "Name it to a single convention",
              text: "Customer, type, insurer, expiry year. ISO dates, no slashes, no version numbers. Rename on arrival, never later.",
            },
            {
              title: "Record the fields into an index",
              text: "Customer and phone, insurer and policy number, type, start and expiry, premium and sum insured, asset details, and a link back to the file.",
            },
            {
              title: "Check the expiry date against the document",
              text: "This one field drives every reminder you will send. Read it off the schedule rather than inferring it from the start date — short-period and multi-year policies are exactly the ones a guess gets wrong.",
            },
            {
              title: "File the document where backup reaches it",
              text: "Into the store that is actually backed up and access-controlled, not the desktop folder that is neither.",
            },
            {
              title: "Confirm the customer can reach their own copy",
              text: "Whether that is a sent email or a portal they can sign into, the test is the same: can they get the document without calling you?",
            },
          ],
        },
        {
          kind: "text",
          text: "Run on a spreadsheet and a disciplined folder, this works. It keeps working until the volume of renaming and re-typing outgrows the time available, which for most agents happens somewhere in the low hundreds of policies — not because the system is wrong, but because step two and step three are manual data entry, and manual data entry is the part that gets skipped when the week is busy.",
        },
        {
          kind: "text",
          text: "That is the point at which it is worth letting software read the documents instead. Insoora does the second and third steps from the PDF itself: it reads the policy, extracts the fields, files the record under the customer with the original attached, and marks anything it could not read confidently as needing review rather than guessing. You can see what it reads and how it files it on the [features page](/features).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Should I keep paper copies of policy documents as well?",
      a: "Keep whatever the issuer treats as the original. For a policy emailed as a PDF, the PDF is the original and a printout adds nothing but storage. For an older policy issued on paper, the paper is the original and the scan is a convenience copy — so keep the paper, and scan it so you can actually find it.",
    },
    {
      q: "How long should insurance policy documents be kept?",
      a: "Longer than the policy runs. A claim, a dispute or a no-claim-bonus transfer can need a policy years after it expired, and renewal pricing often depends on showing continuous cover. Keeping expired policies is cheap; the usual practice is to keep them indefinitely rather than to set a deletion date you will regret.",
    },
    {
      q: "What is the best file format for storing policies?",
      a: "PDF, as issued. Do not convert to images, do not re-save through a compression tool, and do not combine several policies into one merged file — the merge is convenient once and inconvenient forever after, because the documents can no longer be retrieved separately.",
    },
    {
      q: "Is a spreadsheet good enough as a policy index?",
      a: "For a small book, yes — a spreadsheet with one row per policy and a link to the file does everything described here. Its limits are concurrent editing, the absence of access control, and the fact that every row is typed by hand, which is where errors and gaps come from as volume grows.",
    },
  ],
};
