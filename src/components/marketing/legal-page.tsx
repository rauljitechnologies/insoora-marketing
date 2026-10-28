import { AlertTriangle, ScrollText } from "lucide-react";
import { Breadcrumb, Container } from "./section";
import { ChipLink } from "./cta";
import { ACCENT_TILE, heroWash } from "@/lib/accents";
import { LEGAL_REVIEW_VISIBLE, sectionId, type LegalDocument } from "@/lib/legal/content";
import { cn } from "@/lib/utils";

// Renderer shared by the Privacy Policy and the Terms pages.
//
// A sticky table of contents beside numbered sections. One renderer for both
// documents keeps their numbering, anchors and spacing identical, so a link to
// a clause behaves the same whichever document it points into.

export function LegalPage({
  doc,
  trail,
}: {
  doc: LegalDocument;
  /** The breadcrumb trail, passed in so it matches the BreadcrumbList schema
   *  the page emits. */
  trail: { name: string; href: string }[];
}) {
  const pending = doc.sections.filter((s) => s.review).length;

  return (
    <>
      {/* The same hero construction as every other page — two radials over
          #F8FBFF, tinted teal for the legal pair — rather than the flat grey
          band these two used to wear. A legal document is still part of the
          site, and a visitor who follows the footer link should not feel they
          have left it. */}
      <section
        className="overflow-hidden border-b border-[#E6EEFB]"
        style={{ background: heroWash("teal") }}
      >
        <Container className="py-11 sm:py-14">
          <div className="pv-rise flex flex-col items-start">
            <Breadcrumb trail={trail} />
            <span
              aria-hidden
              className={cn("mt-5 grid size-11 place-items-center rounded-xl", ACCENT_TILE.teal)}
            >
              <ScrollText className="size-5" />
            </span>
            <h1 className="mt-4 text-balance text-[32px] font-extrabold leading-[1.08] tracking-[-0.032em] text-foreground sm:text-[40px]">
              {doc.title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/70">
              {doc.intro}
            </p>
            <p className="mt-4 text-sm text-muted">
              Last updated <time dateTime={doc.updatedIso}>{doc.updated}</time>
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-14">
        {/* The draft warning is the first thing on the page, not a footnote:
            anyone reading this document needs to know it is not final before
            they rely on a word of it. */}
        {LEGAL_REVIEW_VISIBLE && pending > 0 && (
          <div
            role="note"
            className="mb-10 rounded-2xl border border-warning/40 bg-warning-soft p-5 sm:p-6"
          >
            <p className="flex items-center gap-2 text-sm font-bold text-warning">
              <AlertTriangle className="size-4 shrink-0" />
              Draft — not yet reviewed by a lawyer
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              This document is a starting point written against how the platform actually works.{" "}
              <span className="font-semibold">
                {pending} section{pending === 1 ? "" : "s"}
              </span>{" "}
              still need a real fact or a legal decision before this can be published — each one is
              marked below. Nothing has been invented to fill those gaps.
            </p>
          </div>
        )}

        <div className="grid gap-10 rail:grid-cols-[13.75rem_minmax(0,1fr)] rail:gap-12">
          {/* Contents. Sticky on desktop; a plain list above the text on
              anything narrower, where a sticky rail would eat the screen. */}
          {/* Contents.
              
              Capped and scrollable while sticky. The privacy policy went from
              eleven sections to eighteen, and a sticky rail taller than the
              viewport puts its last entries permanently below the fold with
              no way to reach them — the rail cannot scroll with the page
              because that is the whole point of it being sticky. `top-24`
              clears the header, so the cap is the remaining viewport height
              minus that offset and a little breathing room. */}
          <nav
            aria-label="Contents"
            className="rounded-2xl border border-border bg-surface p-4 rail:sticky rail:top-24 rail:max-h-[calc(100dvh-8rem)] rail:self-start rail:overflow-y-auto rail:overscroll-contain"
          >
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-accent-teal-ink">Contents</p>
            <ol className="mt-3 flex flex-col gap-1.5">
              {doc.sections.map((s, i) => (
                <li key={s.heading}>
                  <a
                    href={`#${sectionId(i, s.heading)}`}
                    className="flex gap-2 rounded-md px-1 py-1 text-sm leading-snug text-foreground/75 transition-colors hover:bg-background hover:text-primary"
                  >
                    <span className="shrink-0 tabular-nums text-muted">{i + 1}.</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex min-w-0 flex-col gap-10">
            {doc.sections.map((s, i) => (
              <section key={s.heading} id={sectionId(i, s.heading)} className="scroll-mt-24">
                <h2 className="text-balance text-[22px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground sm:text-[26px]">
                  <span className="mr-2 tabular-nums text-accent-teal-ink">{i + 1}.</span>
                  {s.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {s.body.map((p) => (
                    <p key={p} className="text-[15px] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="flex flex-col gap-2 pl-1">
                      {s.list.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
                          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-border" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {LEGAL_REVIEW_VISIBLE && s.review && (
                    <p className="flex gap-2.5 rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm leading-relaxed text-foreground/80">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
                      <span>
                        <span className="font-semibold text-warning">Needs review: </span>
                        {s.review}
                      </span>
                    </p>
                  )}
                </div>
              </section>
            ))}

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6 text-sm text-muted">
              Questions about this document?
              <ChipLink href="/contact-us" accent="teal">
                Contact Us
              </ChipLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
