"use client";

import { Accordion } from "radix-ui";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

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
// The answers are in the server-rendered HTML whether or not a panel is open:
// Radix renders collapsed content and hides it with CSS and `hidden`, so a
// crawler, an answer engine and a Ctrl+F all find the text. That is also what
// makes the FAQPage schema on this page honest.

export function FaqAccordion({ items }: { items: FaqItem[] }) {
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
          <Accordion.Content className="overflow-hidden data-[state=closed]:anim-acc-up data-[state=open]:anim-acc-down">
            <p className="max-w-3xl px-4 pb-5 text-[15px] leading-relaxed text-muted sm:px-5">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
