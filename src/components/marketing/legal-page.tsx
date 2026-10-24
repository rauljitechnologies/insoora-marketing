import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Breadcrumb, Container } from "./section";
import { LEGAL_REVIEW_VISIBLE, sectionId, type LegalDocument } from "@/lib/legal/content";

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
      <section className="border-b border-border bg-surface">
        <Container className="py-12 sm:py-14">
          <Breadcrumb trail={trail} />
          <h1 className="mt-5 text-[28px] font-extrabold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[34px]">
            {doc.title}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted">{doc.intro}</p>
          <p className="mt-3 text-sm text-muted">
            Last updated <time>{doc.updated}</time>
          </p>
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
          <nav aria-label="Contents" className="rail:sticky rail:top-24 rail:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Contents</p>
            <ol className="mt-3 flex flex-col gap-1.5">
              {doc.sections.map((s, i) => (
                <li key={s.heading}>
                  <a
                    href={`#${sectionId(i, s.heading)}`}
                    className="flex gap-2 text-sm leading-snug text-foreground/75 transition-colors hover:text-primary"
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
                <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground">
                  <span className="mr-2 tabular-nums text-muted">{i + 1}.</span>
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

            <p className="border-t border-border pt-6 text-sm text-muted">
              Questions about this document? Use our{" "}
              <Link href="/contact-us" className="font-medium text-primary hover:underline">
                Contact Us
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
