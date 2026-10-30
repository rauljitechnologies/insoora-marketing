import { cn } from "@/lib/utils";
import { ACCENT_TILE, ACCENT_TEXT, type Accent } from "@/lib/accents";
import type { LucideIcon } from "lucide-react";

// Workflow diagrams.
//
// Two shapes, both drawn in markup rather than placed as images, for the same
// reasons as `product-shots.tsx`: they re-theme with the tokens, stay sharp at
// any density, cost no request and shift no layout.
//
// They exist because a numbered list in boxes is not a diagram. The site had
// one process visual — the home page's three steps — and the seven-step
// journey the product actually runs needs a shape that shows SEQUENCE, which
// a grid of equal cards cannot.

export interface WorkflowStep {
  n: number;
  icon: LucideIcon;
  accent: Accent;
  /** Short enough to read in the rail at a glance. */
  label: string;
  /** One line, shown only in the wide "at a glance" rail. */
  hint: string;
  /** The anchor on the page this step links to. */
  href: string;
}

/**
 * The whole journey on one line: the steps as a connected rail.
 *
 * Horizontal above `rail`, where there is room for seven stops; a two-column
 * grid of chips below it, because seven labels squeezed onto a phone's width
 * is a diagram nobody can read. The connector is a background gradient on the
 * track rather than a border on each node, so it does not break where a node
 * wraps.
 *
 * Every stop is a link to its own section, which is what makes this a
 * navigation aid rather than decoration — and gives the page seven internal
 * links a crawler can follow.
 */
export function WorkflowRail({ steps }: { steps: WorkflowStep[] }) {
  return (
    <nav aria-label="The steps on this page">
      {/* ── Wide: a connected rail ── */}
      <ol className="hidden rail:grid rail:grid-cols-7">
        {steps.map((s, i) => (
          <li key={s.n} className="relative flex flex-col items-center gap-2.5 text-center">
            {/* The track. Two halves, so the first and last stops do not
                trail a line off the end of the diagram. */}
            <span
              aria-hidden
              className={cn(
                "absolute left-0 right-0 top-[1.375rem] h-px bg-border",
                i === 0 && "left-1/2",
                i === steps.length - 1 && "right-1/2",
              )}
            />
            <a
              href={s.href}
              className="group relative flex flex-col items-center gap-2.5 rounded-xl px-1.5 py-1 transition-transform hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className={cn(
                  "relative grid size-11 place-items-center rounded-xl ring-4 ring-[#F5F9FF] transition-shadow group-hover:shadow-card",
                  ACCENT_TILE[s.accent],
                )}
              >
                <s.icon className="size-5" />
              </span>
              <span className={cn("text-[11px] font-bold tabular-nums", ACCENT_TEXT[s.accent])}>
                Step {s.n}
              </span>
              <span className="text-[13px] font-semibold leading-snug text-foreground group-hover:text-primary">
                {s.label}
              </span>
              <span className="text-[11px] leading-snug text-muted">{s.hint}</span>
            </a>
          </li>
        ))}
      </ol>

      {/* ── Narrow: the same seven as chips ── */}
      <ol className="grid grid-cols-1 gap-2 min-[30rem]:grid-cols-2 rail:hidden">
        {steps.map((s) => (
          <li key={s.n}>
            <a
              href={s.href}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/40"
            >
              <span aria-hidden className={cn("grid size-8 shrink-0 place-items-center rounded-lg", ACCENT_TILE[s.accent])}>
                <s.icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className={cn("block text-[10px] font-bold tabular-nums", ACCENT_TEXT[s.accent])}>
                  Step {s.n}
                </span>
                <span className="block text-[13px] font-semibold leading-snug text-foreground">{s.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * One step, as a row on a vertical spine.
 *
 * Deliberately NOT the alternating two-column layout /features uses. Two
 * pages that both run a long list of sections should not run it in the same
 * shape, or the second reads as the first with different words — and a
 * sequence wants a spine, where a catalogue does not.
 *
 * The spine is a left border on the row itself, with the numbered node
 * straddling it. The last step passes `last` so the line stops at its node
 * rather than running on into the section below.
 */
export function WorkflowStepRow({
  step,
  last = false,
  children,
}: {
  step: WorkflowStep;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      id={step.href.replace("#", "")}
      className={cn(
        "relative scroll-mt-24 pb-12 pl-10 last:pb-0 sm:pl-14",
        // The spine. `before` rather than a border so it can stop short on
        // the final row without changing the element's own box.
        "before:absolute before:bottom-0 before:left-[1.1875rem] before:top-12 before:w-px before:bg-border sm:before:left-[1.4375rem]",
        last && "before:hidden",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-0 grid size-10 place-items-center rounded-xl ring-4 ring-background sm:size-12",
          ACCENT_TILE[step.accent],
        )}
      >
        <step.icon className="size-5" />
      </span>
      {children}
    </li>
  );
}
