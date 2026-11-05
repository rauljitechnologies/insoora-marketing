"use client";

import { Accordion } from "radix-ui";
import { ChevronDown } from "lucide-react";
// Takes the minimal shape rather than `FaqItem` from lib/faq: it reads `q`
// and `a` and nothing else, and the twelve solution pages carry their own
// questions (lib/solutions/types.ts) which have no FAQ category to put on
// them. Narrowing the prop to what the component actually uses is what lets
// both callers share one accordion instead of growing a second.

// The website's FAQ.
//
// Its own component rather than the portal's `customer/faq`: that one is used
// on the signed-in Help page and restyling it there would change a screen this
// brief is not allowed to touch.
//
// Radix Accordion rather than <details> so each heading is a real button with
// `aria-expanded` and arrow-key movement between questions. `type="multiple"`
// — on a help page people open two answers to compare them, and a
// single-open accordion closes the one they were reading.
//
// ── Why `forceMount` ─────────────────────────────────────────────────────
//
// This comment used to claim the answers were in the server-rendered HTML
// whether or not a panel was open. They were not, and the claim was load
// bearing — thirteen pages emit FAQPage structured data built from the same
// array this component renders, and that markup is only legal when the
// answers are actually on the page carrying it.
//
// Radix's `Accordion.Content` renders `isOpen && children` (see
// `CollapsibleContentImpl` in @radix-ui/react-collapsible). Every panel is
// closed on first render, so the server emitted eighteen questions on /faq,
// thirteen on the home page and six on each of the eleven landing pages —
// and not one answer. Stripping the `<script>` blocks out of /faq left 470
// visible words where the questions and answers together are about 2,500.
//
// Two things were broken by that, and the second is the expensive one:
//
//   1. The FAQPage markup described content the page did not contain. That
//      is the structured-data policy violation, not a technicality.
//   2. Every answer engine that reads HTML without executing JavaScript and
//      clicking saw a list of questions with no answers. These answers are
//      written to be quoted standalone (see the note in lib/faq.ts) — they
//      are the most quotable prose on the site, and they were invisible to
//      exactly the readers they were written for.
//
// `forceMount` makes Radix render the children unconditionally. It also
// stops Radix applying its own `hidden`, because `isOpen` is then always
// true — so the collapsed state has to be hidden here instead, which is what
// `data-[state=closed]:hidden` does. `display:none` is deliberate over a
// height-0 clip: a screen reader must not read eighteen answers the reader
// has not opened, and Google has always indexed text hidden behind an
// accordion, so nothing is lost by hiding it properly.
//
// The cost is the 0.18s closing animation, which `display:none` cuts short.
// The opening one still plays. That is a fair price for ninety-seven answers
// that are now in the HTML.

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="multiple" className="divide-y divide-border">
      {items.map((item, i) => (
        <Accordion.Item key={item.q} value={`q${i}`}>
          {/* `Accordion.Header` IS the heading — Radix renders it as an <h3>.
              The question therefore goes in a <span>, not a nested <h3>: a
              heading inside a heading is invalid HTML, and it was giving every
              question two levels in the outline where it needs one. */}
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-surface sm:px-5">
              <span className="text-[15px] font-semibold text-foreground">{item.q}</span>
              <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            forceMount
            className="overflow-hidden data-[state=closed]:hidden data-[state=open]:anim-acc-down"
          >
            <p className="max-w-3xl px-4 pb-5 text-[15px] leading-relaxed text-muted sm:px-5">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
