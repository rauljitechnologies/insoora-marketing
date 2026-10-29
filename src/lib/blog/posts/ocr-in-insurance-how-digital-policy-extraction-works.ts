import type { Post } from "../types";

export const post: Post = {
  slug: "ocr-in-insurance-how-digital-policy-extraction-works",
  title: "OCR in Insurance: How Digital Policy Extraction Works",
  metaTitle: "OCR in Insurance: How Digital Policy Extraction Actually Works",
  description:
    "What OCR does to an insurance policy PDF, why a text layer matters more than image quality, where extraction goes wrong, and how to judge whether a system's output can be trusted.",
  excerpt:
    "\"The software reads the policy\" covers two completely different operations with different failure modes. Knowing which one is happening tells you how much to trust the result.",
  published: "2026-10-30",
  updated: "2026-10-30",
  accent: "teal",
  category: "how-it-works",
  art: "ocr",
  audience: "Anyone evaluating extraction software",
  related: [
    "organize-insurance-policy-documents-digitally",
    "insurance-agency-management-practical-guide",
  ],
  sections: [
    {
      heading: "Two kinds of PDF that look identical",
      blocks: [
        {
          kind: "text",
          text: "Open two policy documents side by side and they look the same: a page, a logo, a schedule, some numbers. To software they are entirely different objects, and the difference decides everything about how reliably the data can be read.",
        },
        {
          kind: "text",
          text: "A digital PDF — the kind an insurer's system generates and emails — contains text as text. The characters are stored with their positions, so the policy number is literally the string of characters, retrievable exactly. Nothing has to be guessed.",
        },
        {
          kind: "text",
          text: "A scanned PDF contains a picture of a page. There is no text in the file at all, only pixels arranged so that a human eye sees letters. To get characters out, software has to look at the image and infer what the letters are. That inference is optical character recognition, and it can be wrong.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Tell them apart in two seconds",
          text: "Open the PDF and try to select a line of text with your cursor. If the text highlights word by word, there is a text layer and no OCR is needed. If you get a blue box over the whole page, it is an image and anything read from it has been guessed at.",
        },
        {
          kind: "text",
          text: "This matters commercially: a system evaluated on clean insurer-issued PDFs will look near-perfect, and the same system on the photographs your customers actually send will not. Always test with your worst documents, not your best.",
        },
      ],
    },
    {
      heading: "What OCR actually does",
      blocks: [
        {
          kind: "text",
          text: "OCR is usually described as \"reading\", which flatters it. It is closer to pattern-matching under uncertainty, and it runs in stages.",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "Clean up the image",
              text: "Straighten a skewed page, correct rotation, increase contrast between ink and paper, and remove speckle. A page photographed at an angle is deskewed here, and this stage does more for accuracy than resolution does.",
            },
            {
              title: "Find the structure",
              text: "Work out where the text is: blocks, lines, words, and — critically for policy schedules — table cells. Getting this wrong is why a value sometimes ends up attached to the wrong label.",
            },
            {
              title: "Recognise the characters",
              text: "Decide what each shape is. Modern engines do this with neural networks over whole lines rather than letter by letter, which is why context helps them and isolated characters remain hard.",
            },
            {
              title: "Apply what it knows about language",
              text: "Use a model of plausible text to resolve ambiguity. This fixes a lot of ordinary prose and helps very little with policy numbers, which are arbitrary strings where no sequence is more plausible than another.",
            },
          ],
        },
        {
          kind: "text",
          text: "The output is text plus, usually, a confidence score per region. That score is the most useful thing in the whole pipeline, and it is the thing a good system surfaces rather than hides.",
        },
        {
          kind: "h3",
          text: "The characters that cause most trouble",
        },
        {
          kind: "text",
          text: "Certain confusions recur, and they are concentrated exactly where accuracy matters — in identifiers:",
        },
        {
          kind: "table",
          columns: ["Confused pair", "Where it bites"],
          rows: [
            ["0 and O", "Policy numbers, vehicle registrations"],
            ["1, l and I", "Policy numbers, names"],
            ["5 and S", "Policy numbers, sums insured"],
            ["8 and B", "Policy numbers"],
            ["rn read as m", "Names and addresses"],
            [". and ,", "Premium amounts — a decimal point read as a comma changes the value by a factor of a hundred"],
          ],
        },
        {
          kind: "text",
          text: "In ordinary sentences a language model repairs most of these. In a policy number it cannot, because every string is equally plausible. This is why identifiers are the fields most worth checking by hand even when everything else looks right.",
        },
      ],
    },
    {
      heading: "Recognition is not extraction",
      blocks: [
        {
          kind: "text",
          text: "OCR gives you the words on the page. It does not tell you which of them is the expiry date. That second job — deciding what each value means — is extraction, and it is where the real difficulty lies.",
        },
        {
          kind: "text",
          text: "A policy schedule might contain six dates: issue date, proposal date, period of insurance from and to, premium due date, and a date of birth. All six are dates. Picking the right one for \"expiry\" requires understanding the document's structure, not just its characters.",
        },
        {
          kind: "h3",
          text: "Three approaches, and how they fail",
        },
        {
          kind: "list",
          items: [
            "Templates: for each insurer, record where each field sits. Extremely accurate for layouts you have mapped, and completely broken the day an insurer changes its format — silently, because the template still finds something at those coordinates.",
            "Rules and patterns: look for a label like \"Period of Insurance\" and take the dates near it. More tolerant of layout change, but defeated by wording differences between insurers and by multi-column schedules where \"near\" is ambiguous.",
            "Models that read the document: use a model trained on documents and layout together to identify fields by context. Handles unseen layouts far better, and fails differently — it can produce a confident, well-formed, entirely wrong answer, which is more dangerous than an obvious blank.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The failure mode to design against",
          text: "The dangerous output is not a missing field. It is a plausible one. A blank expiry date gets noticed and fixed; an expiry date that is wrong by a year looks perfectly normal in a list and surfaces only when a renewal is missed.",
        },
      ],
    },
    {
      heading: "What Indian policy documents make harder",
      blocks: [
        {
          kind: "text",
          text: "General guidance about document extraction tends to assume a narrow range of layouts. Policy documents from Indian insurers add specific complications worth knowing about.",
        },
        {
          kind: "list",
          items: [
            "Date formats are ambiguous. 05/06/2026 is the fifth of June in India and the sixth of May elsewhere. A system that assumes the wrong convention produces dates that are valid, plausible and wrong for most of the month.",
            "Names vary in form and transliteration. The same person appears as a full name, with initials, with surname first, or spelled differently across insurers — which is why a phone number identifies a customer more reliably than a name does.",
            "Amounts use the lakh and crore grouping. 12,50,000 is not a thousands-separated number, and software written for the other convention mis-parses it.",
            "Schedules are dense tables, often with merged cells and multi-line entries. Table structure detection is the stage most likely to attach a value to the wrong label.",
            "Multi-year and bundled motor policies carry more than one end date, and the earlier one is usually the one that matters.",
            "Many documents are photographs taken on a phone, because that is what customers send.",
          ],
        },
      ],
    },
    {
      heading: "How to judge an extraction system",
      blocks: [
        {
          kind: "text",
          text: "Accuracy percentages quoted in isolation are not informative — they depend entirely on which documents were measured, and the documents chosen for a demonstration are rarely the ones that cause trouble. More useful questions:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Does it tell you when it is unsure? A system with no notion of confidence is asserting everything equally, which means you have to check everything equally.",
            "Does it show the value next to the document it came from? Verification should be a glance, not a hunt through a PDF in another window.",
            "Does it guess, or does it flag? For a field it cannot read, leaving it blank and marked is correct. Filling it with a best effort and saying nothing is not.",
            "Is the original document kept? The PDF is the legal artefact. Extraction produces a convenient index over it, never a replacement for it.",
            "What happens on an unseen layout? Not whether it handles every insurer — nothing does — but whether an unknown format degrades into \"needs review\" rather than into confident nonsense.",
            "Can you correct it, and does the correction stick? Human review is part of the process, not an admission of failure.",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "The honest framing",
          text: "No extraction system reads every insurance document correctly on the first attempt. The useful question is not whether it makes mistakes but whether it tells you where they are — the difference between checking six flagged fields and re-reading sixty policies.",
        },
      ],
    },
    {
      heading: "How Insoora approaches it",
      blocks: [
        {
          kind: "text",
          text: "Since this site sells software that does this, it is worth being specific rather than general — and clear about the limits.",
        },
        {
          kind: "text",
          text: "When a policy PDF is uploaded, Insoora reads the document's text layer where it has one and runs OCR where the page is a scan. It then picks out the fields an agent actually needs: policy number, insurer, insured name, start and expiry dates, premium, and asset or vehicle details. The extracted fields are saved against the customer with the original PDF attached, so the record and the document stay together.",
        },
        {
          kind: "text",
          text: "Where a field cannot be read confidently it is marked as needing review rather than filled in with a guess, and the extracted value is shown beside the document it came from so it can be confirmed or corrected. The original PDF always remains the source of truth.",
        },
        {
          kind: "text",
          text: "The limits are real and worth stating: layouts differ from insurer to insurer, so accuracy is highest on insurer-issued digital PDFs and lower on photographs of printed policies or poor-quality scans. Insoora supports motor, health, life, travel and home policy PDFs from Indian insurers, and does not claim to read every layout correctly first time.",
        },
        {
          kind: "text",
          text: "The [features page](/features) sets out what is extracted and what happens afterwards, and the [FAQ](/faq) answers the specific questions about supported documents, bulk upload and how files are secured.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is the difference between OCR and data extraction?",
      a: "OCR converts an image of a page into characters — it tells you what the words are. Extraction decides what those words mean, identifying which value is the policy number and which date is the expiry. A document with a text layer needs no OCR but still needs extraction.",
    },
    {
      q: "Does OCR work on photographs of policy documents?",
      a: "Yes, with lower accuracy than on an insurer-issued digital PDF. Flat, evenly lit, square-on captures of the whole page work considerably better than angled ones in poor light — skew and shadow cost more accuracy than resolution does.",
    },
    {
      q: "Is extracted policy data accurate enough to rely on?",
      a: "It is accurate enough to be useful and not accurate enough to go unchecked, which is why the review step matters. Identifiers like policy numbers deserve a glance even when everything else looks right, because a language model cannot repair an arbitrary string the way it repairs ordinary prose.",
    },
    {
      q: "Do I still need the original PDF after the data is extracted?",
      a: "Always. The PDF is what an insurer, ombudsman or court will accept; the extracted fields are an index that makes it findable and actionable. Any system that discards the original in favour of its own database has thrown away the evidence and kept the summary.",
    },
    {
      q: "Why do dates get extracted incorrectly?",
      a: "Usually ambiguity rather than misrecognition. 05/06/2026 is a valid date under two conventions that disagree, and a policy schedule typically contains several dates that all look alike. Picking the wrong one produces a date that is plausible and wrong — which is why expiry dates are worth verifying against the schedule.",
    },
  ],
};
