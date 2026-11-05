import type { SolutionPage } from "../types";

// The extraction page. It leads with prose rather than a screen because the
// thing a reader has to accept before anything else on this shelf matters is
// an argument — that reading a document is a different act from typing one —
// and an argument is prose.
//
// Everything stated here about the pipeline is how the product is configured
// by default: deterministic rules first, OCR only on pages with almost no
// selectable text, AI off unless an administrator turns it on, and a human
// confirming a record before it is saved. Those are defaults a page can
// state; what it must not do is describe them as guarantees that cannot be
// changed, because an administrator can change all four.

export const page: SolutionPage = {
  slug: "insurance-policy-entry-software",
  group: "solution",
  metaTitle: "Insurance Policy Entry Software — Stop Retyping Schedules",
  description:
    "Policy entry software that reads the schedule instead of asking you to type it: deterministic rules first, OCR for scans, and a human confirming every record.",
  accent: "red",
  badge: "Deterministic first, AI off by default",
  h1: {
    lead: "Insurance policy entry software where the entry",
    highlight: "is already in the document.",
  },
  lede:
    "Policy data entry is transcription: a human reads a schedule and types what it says into a form. Insoora removes the typing without removing the human — rules read the document, anything unclear is flagged rather than guessed, and a person confirms the record against the page it came from.",
  checks: [
    "Fields read from the PDF, not retyped",
    "Most policies need no AI call at all",
    "Unclear fields flagged, never invented",
    "A human confirms before it is saved",
  ],
  heroShot: "uploadQueue",
  nav: {
    label: "Policy entry",
    hint: "The schedule read instead of retyped",
  },
  footerColumn: "product",
  primaryKeyword: "Insurance Policy Entry Software",
  secondaryKeywords: [
    "Insurance Policy Data Entry Software",
    "Automated Insurance Data Entry",
    "Insurance Policy PDF Upload Software",
    "AI Insurance Policy Data Extraction",
    "Insurance Policy OCR Software",
  ],
  sections: [
    {
      kind: "prose",
      id: "the-work",
      accent: "red",
      eyebrow: "The work being replaced",
      heading: "What policy data entry actually costs",
      lede:
        "Not the minutes. The minutes are the smallest part of it.",
      paragraphs: [
        "A motor schedule has something like forty fields worth keeping: the vehicle, its engine and chassis numbers, five separate IDV figures, own-damage and third-party premium, a no-claim bonus percentage, two sets of cover dates. Typing them takes a few minutes. The cost is not the few minutes.",
        "The cost is that transcription is lossy and silent about it. Most agents, faced with forty fields and a sheet with eight columns, keep the eight — insurer, policy number, name, premium, start, expiry, and two more — and the other thirty-two stay inside the PDF. A year later the information exists, in a file, in a folder, unsearchable.",
        "The second cost is that a typed figure has no provenance. A cell saying ₹12,450 is a claim with nothing behind it; when a customer disputes it, the only recourse is to find the document again and read it again. And the third is that transcription errors are undetectable by inspection — a digit transposed in a policy number looks exactly like a correct one.",
      ],
      h3: [
        {
          heading: "Why \"faster data entry\" is the wrong goal",
          paragraphs: [
            "Software that gives you a better form to type into has made the transcription faster and left all three costs in place. The fields you skip are still skipped, the figures still have no source, and the typo is still invisible.",
            "The goal worth having is that the policy record is derived from the document and stays attached to it. Then the fields are not selected by whoever was typing, the figures can be checked against their page, and a mis-read is something the system can flag because it knows it was unsure.",
          ],
        },
      ],
    },
    {
      kind: "steps",
      id: "pipeline",
      accent: "purple",
      eyebrow: "How the reading happens",
      heading: "From uploaded PDF to confirmed record",
      lede:
        "The order matters, and so does which steps involve a model. Most policies never reach one.",
      steps: [
        {
          title: "The file is checked and classified",
          text: "Before any extraction, a classifier decides whether this is an insurance document at all. An RC, an invoice, a bank statement or a payslip is rejected outright. A borderline document is held for an administrator to accept or reject rather than processed on a guess.",
        },
        {
          title: "Text is taken from the page",
          text: "The PDF's own text layer is parsed first, which is exact. Only pages with almost no selectable text are rendered and put through OCR — Tesseract by default, with cloud OCR services available if an administrator configures one. OCR results are cached, so a page is never read twice.",
        },
        {
          title: "Deterministic rules extract the fields",
          text: "Label-and-value pairs, inline values, period expressions, table cells, regular expressions and per-insurer templates. Then date and amount parsers normalise what was found. This is the part that does the work: a normal policy comes out of it complete, with no AI call at all.",
        },
        {
          title: "The figures are checked against each other",
          text: "Net premium plus tax against the final premium, the IDV components against the total, a name split into parts. Arithmetic that does not reconcile is treated as a signal that the extraction needs a human, not rounded away.",
        },
        {
          title: "Only what is missing goes to a model",
          text: "If a required field is still absent or genuinely ambiguous, and only if an administrator has enabled AI, a small number of narrowly-scoped calls run over the relevant chunk of text. The default configuration is AI off and a local model; cloud providers are an explicit choice with budget limits, never a silent fallback.",
        },
        {
          title: "A human confirms it",
          text: "Values are validated against a schema, scored for confidence, and anything below the bar is flagged for review beside the page it came from. By default nothing is written to the policy record until a person confirms it.",
        },
      ],
      shot: "reviewFlag",
    },
    {
      kind: "split",
      id: "bulk",
      accent: "blue",
      eyebrow: "At volume",
      heading: "A folder of policies, in one action",
      lede:
        "One policy at a time is a demo. A year's backlog is the actual problem.",
      paragraphs: [
        "Bulk upload accepts many PDFs in one go and processes them together. The queue shows the state of every file — read, needs review, failed — so attention goes only to the files that need it rather than to all of them.",
        "A file that fails does not stop the batch. A duplicate is recognised as one rather than creating a second record of the same policy. And because each document's state is visible, a backlog becomes a finite piece of work: the number of files needing a human is a number you can see.",
      ],
      bullets: [
        "Many files per upload, processed together",
        "Per-file state: read, needs review, or failed",
        "Duplicates recognised rather than re-recorded",
        "A failed file is isolated, not fatal to the batch",
      ],
      shot: "agentDashboard",
      limit:
        "Large files and long documents take longer, and the queue is where that is visible. There is no promised throughput figure, because it depends on page count, whether OCR was needed, and what else the platform is processing.",
    },
    {
      kind: "split",
      id: "stubborn-layouts",
      accent: "teal",
      eyebrow: "When an insurer's layout fights back",
      heading: "A rule written once, by a person",
      lede:
        "Every agent has one insurer whose schedule reads badly. This is what is done about it.",
      paragraphs: [
        "An administrator can add per-insurer field aliases, regular expressions and validation rules — \"on this insurer's layout, cover expiry is labelled Period of Insurance, or Valid upto\" — and test the rule against a real document before saving it. Later policies from that insurer are then parsed with it.",
        "A separate corrections view shows where extraction was changed by hand, which is what tells an administrator that a new rule is worth writing: eleven manual corrections to the same field on the same insurer is a pattern, and one rule retires it.",
        "This is deliberately a human writing a rule rather than a model learning a layout. Insoora does not train on your documents and does not improve by itself, and the trade-off is worth being explicit about: the gain is that behaviour is inspectable and repeatable, the cost is that a new layout needs someone to notice it.",
      ],
      bullets: [
        "Field aliases and patterns, per insurer",
        "Tested against a real document before it is saved",
        "A corrections view showing where humans had to intervene",
      ],
      shot: "templateRule",
      limit:
        "Template rules are configured by an administrator, not by an agent in their own portal. Insoora does not learn an insurer's layout on its own and trains no model on your documents.",
    },
    {
      kind: "table",
      id: "comparison",
      accent: "orange",
      eyebrow: "Three ways to get a policy into a system",
      heading: "Typing, templates and reading",
      lede:
        "Worth comparing honestly, because reading a document is not strictly better at everything.",
      columns: ["", "Typing it in", "A fixed import template", "Reading the document"],
      rows: [
        [
          "Setup needed",
          "None.",
          "A mapping per insurer, maintained whenever a layout changes.",
          "None for common layouts; a rule for stubborn ones.",
        ],
        [
          "Fields captured",
          "Whatever the person typing had time for.",
          "Whatever the template defines.",
          "Everything the schedule states and the platform models.",
        ],
        [
          "Provenance",
          "None. The figure stands alone.",
          "None. The source file is usually discarded.",
          "The original PDF stays attached; coverages record their source page.",
        ],
        [
          "Failure mode",
          "A silent typo. Looks correct, is not.",
          "A layout change produces wrong values in the right columns.",
          "An unreadable field is flagged, not filled. The failure is visible.",
        ],
        [
          "Scanned or photographed policies",
          "Works, slowly. A human can read a bad scan.",
          "Not applicable.",
          "OCR runs, and accuracy drops. Sometimes a human still reads it better.",
        ],
        [
          "Effort at 400 policies",
          "Weeks, and the fields get fewer as it goes on.",
          "Fast once mapped, per insurer.",
          "One upload, then a queue of the files that need attention.",
        ],
      ],
      note:
        "The honest row is the fifth. On a poor photograph of a printed policy, a careful human still beats OCR. The case for reading documents is not that it never fails — it is that when it fails it says so.",
    },
    {
      kind: "limits",
      id: "limits",
      accent: "green",
      eyebrow: "Expectations worth setting",
      heading: "What this does not promise",
      lede:
        "Extraction is the claim most easily oversold in this market, so here is what is not being claimed.",
      items: [
        {
          title: "No accuracy percentage",
          text: "Insoora publishes no extraction accuracy figure. One that was measured on a sample of insurers you do not sell would not predict your results, and a number invented for a landing page is worse than none. Upload your own documents.",
        },
        {
          title: "Not zero-touch by default",
          text: "The default configuration requires a human to confirm an extraction before it becomes a policy record. There is a setting an administrator can change, but the product as shipped assumes review.",
        },
        {
          title: "Scans and photographs read worse",
          text: "Insurer-issued digital PDFs read best because their text is selectable. A page with almost no text goes through OCR, and OCR on a phone photograph of a creased printout is the weakest case this product has.",
        },
        {
          title: "No learning from your corrections",
          text: "Correcting a field fixes that record. It does not teach the system anything. A recurring mis-read becomes a rule only when an administrator writes one, which is why the corrections view exists.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is insurance policy entry software?",
      a: "Traditionally it is a form designed for typing policy details into quickly. Insoora takes the other approach: the policy PDF is read, the fields are extracted from it, and a person confirms what was read rather than transcribing it. The entry work becomes review work.",
    },
    {
      q: "Does it use AI to read policies?",
      a: "Only when it has to, and only if an administrator has turned it on. Deterministic rules — labels, tables, patterns, per-insurer templates, date and amount parsers — extract a normal policy with no AI call at all. AI is off by default; when enabled it runs a small number of narrowly-scoped calls over just the missing or ambiguous part, and defaults to a local model rather than a cloud provider.",
    },
    {
      q: "Is my policy data sent to an AI provider?",
      a: "Not in the default configuration, where AI is disabled entirely. If an administrator enables it, the default provider is a locally-run model; a cloud provider is a separate explicit choice with budget limits and never a silent fallback. No model is trained on your documents in any configuration.",
    },
    {
      q: "What happens to a field it cannot read?",
      a: "It is marked as needing review and shown beside the page of the document it should have come from, for a human to confirm or correct. It is not filled in with a plausible value, and the original PDF always remains the source of truth.",
    },
    {
      q: "Can it read scanned or photographed policies?",
      a: "Yes, through OCR, with lower accuracy. Pages with almost no selectable text are rendered and put through OCR — Tesseract by default. A clean insurer-issued digital PDF will always read better than a photograph of a printout, and on a bad photograph a careful human may still read it better than the software.",
    },
    {
      q: "How many policies can I upload at once?",
      a: "Bulk upload accepts many files in one action and processes them together, showing the state of each. There is no published throughput figure because it depends on page count and whether OCR was needed — the queue is where actual progress is visible.",
    },
  ],
  related: [
    {
      href: "/insurance-document-management-software",
      label: "The documents themselves",
      text: "Where the PDFs live after they are read, and who can reach them.",
    },
    {
      href: "/insurance-policy-management-software",
      label: "What the record becomes",
      text: "The policy record the extraction produces, and its lifecycle.",
    },
    {
      href: "/how-it-works",
      label: "The seven steps in full",
      text: "The whole journey of one document, each step with its limit.",
    },
    {
      href: "/general-insurance-management-software",
      label: "Fields by line of business",
      text: "What is modelled on a motor schedule that is not on a health one.",
    },
    {
      href: "/blog/ocr-in-insurance-how-digital-policy-extraction-works",
      label: "Guide: how OCR reads a policy",
      text: "Why a text layer beats a scan, and what that means in practice.",
    },
    {
      href: "/agent-portal",
      label: "The upload screen",
      text: "Where this happens, drawn with sample data.",
    },
  ],
  cta: {
    eyebrow: "Judge it on your own documents",
    title: "Upload the schedule you would least like to retype.",
    lede: "Extraction quality on your insurers' layouts is the one thing no page can tell you.",
    secondary: { href: "/features", label: "See every feature" },
  },
};
