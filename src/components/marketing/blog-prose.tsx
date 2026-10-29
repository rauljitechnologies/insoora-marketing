import * as React from "react";
import Link from "next/link";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { Accent } from "@/lib/accents";
import { ACCENT_TEXT } from "@/lib/accents";
import type { PostBlock, PostSection } from "@/lib/blog/types";
import { APP_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// The article body renderer.
//
// One component for all five articles, for the same reason `LegalPage` is one
// component for three legal documents: shared typography means a change to
// the reading measure or the list spacing lands everywhere, and no article
// can drift into its own style.

// ── Inline links ─────────────────────────────────────────────────────────
//
// Article text is a plain string, which is what lets `faqSchema`-style markup
// quote it verbatim and what stops a post injecting arbitrary HTML. But prose
// that cannot link is prose that has to say "see the features page" instead of
// linking to it, and contextual links are most of what internal linking is.
//
// So exactly one piece of markup is supported — `[label](/path)` — and it is
// parsed into a real element rather than inserted as HTML. There is no
// `dangerouslySetInnerHTML` anywhere in this file.
//
// Hrefs are restricted at build time to internal paths and the product's own
// origin. A post cannot link to an arbitrary third party, which keeps the
// decision about who this site vouches for out of body copy.

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** True for a path on this site. */
function isInternal(href: string): boolean {
  return href.startsWith("/");
}

function assertAllowed(href: string): void {
  if (isInternal(href)) return;
  if (href.startsWith(`${APP_URL}/`) || href === APP_URL) return;
  throw new Error(
    `blog: "${href}" is not an allowed link target. Use a path on this site ("/features") ` +
      `or a URL on the product origin (${APP_URL}).`,
  );
}

/**
 * Parse `[label](href)` out of a string into React nodes.
 *
 * Returns the string untouched when there is nothing to parse, which is the
 * common case and keeps the output tree flat.
 */
export function inline(text: string): React.ReactNode {
  LINK.lastIndex = 0;
  if (!LINK.test(text)) return text;

  LINK.lastIndex = 0;
  const out: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = LINK.exec(text)) !== null) {
    const [whole, label, href] = match;
    assertAllowed(href);

    if (match.index > cursor) out.push(text.slice(cursor, match.index));

    const className =
      "font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary";

    out.push(
      isInternal(href) ? (
        <Link key={`${href}-${match.index}`} href={href} className={className}>
          {label}
        </Link>
      ) : (
        // An absolute URL on the product origin: a plain anchor, because there
        // is no client-side route across an origin to prefetch.
        <a key={`${href}-${match.index}`} href={href} className={className}>
          {label}
        </a>
      ),
    );

    cursor = match.index + whole.length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

// ── Blocks ───────────────────────────────────────────────────────────────

const CALLOUT: Record<
  Extract<PostBlock, { kind: "callout" }>["tone"],
  { icon: typeof Info; ring: string; tint: string; ink: string }
> = {
  note: { icon: Info, ring: "border-[#BFDBFE]", tint: "bg-[#EFF6FF]", ink: "text-[#1D4ED8]" },
  tip: { icon: Lightbulb, ring: "border-[#BBF7D0]", tint: "bg-[#F0FDF4]", ink: "text-[#15803D]" },
  warning: {
    icon: AlertTriangle,
    ring: "border-[#FED7AA]",
    tint: "bg-[#FFF7ED]",
    ink: "text-[#C2410C]",
  },
};

function Block({ block, accent }: { block: PostBlock; accent: Accent }) {
  switch (block.kind) {
    case "text":
      return <p className="text-[17px] leading-[1.75] text-foreground/80">{inline(block.text)}</p>;

    case "h3":
      return (
        <h3 className="mt-3 text-[19px] font-bold leading-snug tracking-[-0.015em] text-foreground sm:text-[21px]">
          {block.text}
        </h3>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3 text-[17px] leading-[1.7] text-foreground/80">
              {block.ordered ? (
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface text-[13px] font-bold tabular-nums",
                    ACCENT_TEXT[accent],
                  )}
                >
                  {i + 1}
                </span>
              ) : (
                <span aria-hidden className="mt-[11px] size-1.5 shrink-0 rounded-full bg-border" />
              )}
              <span className="min-w-0">{inline(item)}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case "steps":
      return (
        <ol className="flex flex-col gap-4">
          {block.steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold tabular-nums text-white"
              >
                {i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[17px] font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-[16px] leading-[1.7] text-foreground/75">
                  {inline(step.text)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "table":
      // The wrapper scrolls, not the page: a five-column table on a 360px
      // phone has to go somewhere, and a body that scrolls sideways is the
      // one outcome worse than a table that does.
      return (
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[32rem] border-collapse text-left text-[15px]">
            <thead>
              <tr>
                {block.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="border-b-2 border-border px-3 py-2.5 align-bottom text-[13px] font-bold uppercase tracking-[0.06em] text-muted first:pl-0 last:pr-0"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="align-top">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={cn(
                        "border-b border-border px-3 py-3 leading-[1.6] first:pl-0 last:pr-0",
                        i === 0 ? "font-semibold text-foreground" : "text-foreground/75",
                      )}
                    >
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout": {
      const tone = CALLOUT[block.tone];
      return (
        <aside className={cn("flex gap-3.5 rounded-2xl border p-5", tone.ring, tone.tint)}>
          <tone.icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", tone.ink)} />
          <div className="min-w-0">
            <p className={cn("text-[15px] font-bold", tone.ink)}>{block.title}</p>
            <p className="mt-1.5 text-[16px] leading-[1.7] text-foreground/80">
              {inline(block.text)}
            </p>
          </div>
        </aside>
      );
    }
  }
}

/** The anchor a section heading and its contents entry share. */
export function sectionId(index: number, heading: string): string {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  // Prefixed with the index so two sections that slugify the same still get
  // distinct anchors — a link to #what-to-do should never be ambiguous.
  return `${index + 1}-${slug}`;
}

/** The article body: every section, in order. */
export function BlogProse({ sections, accent }: { sections: PostSection[]; accent: Accent }) {
  return (
    <div className="flex flex-col gap-11">
      {sections.map((section, i) => (
        <section key={section.heading} id={sectionId(i, section.heading)} className="scroll-mt-24">
          <h2 className="text-balance text-[24px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground sm:text-[29px]">
            {section.heading}
          </h2>
          <div className="mt-4 flex flex-col gap-5">
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} accent={accent} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
