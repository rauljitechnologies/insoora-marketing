import { FlaskConical, Quote } from "lucide-react";
import { Section, SectionHead } from "./section";
import { ACCENT_TILE } from "@/lib/accents";
import {
  hasSamples,
  visibleTestimonials,
  type Testimonial,
  type TestimonialSide,
} from "@/lib/testimonials";
import { cn } from "@/lib/utils";

// The testimonials section.
//
// Renders NOTHING when there is nothing it may show — which is the production
// state today, because every entry is currently illustrative. A section that
// disappears rather than filling itself with placeholder quotes is the whole
// design: see lib/testimonials for the filter.
//
// ── Why the labelling is this heavy ──────────────────────────────────────
//
// There are three independent markers on a sample, and that is deliberate
// rather than nervous. A single subtle one is defeated by any of the ways
// this content actually travels: a screenshot crops a banner off the top, a
// card read on its own in a feed loses the section around it, and a screen
// reader never sees a visual tint at all. So:
//
//   • a banner above the grid, naming the whole section as a design preview;
//   • a chip on every card, so a cropped screenshot still carries it;
//   • `aria-label` on each card, so the label is announced and not merely
//     looked at.
//
// None of them is decorative, and none should be removed to tidy the design.
//
// ── On structured data ───────────────────────────────────────────────────
//
// This component emits none, and must not. `Review` markup on a fictional
// quote, or an `AggregateRating` with no ratings behind it, is a false
// statement in machine-readable form and the most direct route there is to a
// manual action. Real testimonials do not change that by themselves — review
// markup would be a separate, deliberate decision.

const SIDE: Record<TestimonialSide, { tile: string; label: string }> = {
  agent: { tile: ACCENT_TILE.purple, label: "Agent side" },
  policyholder: { tile: ACCENT_TILE.blue, label: "Policyholder side" },
};

export function Testimonials() {
  const entries = visibleTestimonials();

  // Nothing to show. No empty heading, no "testimonials coming soon" — the
  // section simply is not part of the page.
  if (entries.length === 0) return null;

  const samples = hasSamples(entries);

  return (
    <Section id="testimonials" tone="surface">
      <SectionHead
        eyebrow="What the product is for"
        accent="purple"
        title="Written from both sides of the handover"
        lede="Insoora serves two people at once — the agent who files the policy and the customer who needs to see it. These describe what each side gets."
      />

      {samples && (
        <div
          role="note"
          className="mt-7 flex gap-3.5 rounded-2xl border border-warning/40 bg-warning-soft p-5"
        >
          <FlaskConical aria-hidden className="mt-0.5 size-5 shrink-0 text-warning" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-warning">
              Design preview — these are not customer reviews
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
              The quotes below are illustrative samples written to design against. The names are
              invented and the people do not exist. Nothing here is a real customer statement, no
              rating or usage is claimed, and none of it is published as review structured data.
              Real testimonials will replace them once they have been collected with consent.
            </p>
          </div>
        </div>
      )}

      <ul className="mt-7 grid gap-5 sm:grid-cols-2 shell:grid-cols-3">
        {entries.map((entry) => (
          <TestimonialCard key={entry.name} entry={entry} />
        ))}
      </ul>
    </Section>
  );
}

function TestimonialCard({ entry }: { entry: Testimonial }) {
  const side = SIDE[entry.side];
  const sample = !entry.verified;

  return (
    <li
      // The label travels with the card into the accessibility tree, so the
      // marking does not depend on the reader seeing the chip or the banner.
      aria-label={sample ? "Illustrative sample, not a customer review" : undefined}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-xl", side.tile)}>
          <Quote className="size-5" />
        </span>
        {sample && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-warning/40 bg-warning-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-warning">
            <span aria-hidden className="size-1.5 rounded-full bg-warning" />
            Sample
          </span>
        )}
      </div>

      {/* A <blockquote> because it is a quotation, sample or not. The citation
          sits outside it, which is what the element's own contract asks for. */}
      <blockquote className="text-pretty text-[15px] leading-relaxed text-foreground/85">
        {entry.quote}
      </blockquote>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4">
        <span className="text-sm font-semibold text-foreground">{entry.name}</span>
        <span className="text-[13px] text-muted">
          {entry.role} · {side.label}
        </span>
      </div>
    </li>
  );
}
