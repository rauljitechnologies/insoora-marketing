import Link from "next/link";
import { cn } from "@/lib/utils";

// Layout primitives for the public website.
//
// The marketing pages are wide, centred and section-based, which is a
// different shape from the portals' sidebar + card grid — so they get their
// own small set of wrappers rather than bending `portal/panels` to fit. The
// colours, radii and type scale are the same tokens, so the two still read as
// one product.
//
// Spacing rule for the site: 80px between sections on desktop, 56px on a
// phone, and a 1280px content column. Applied here once so no page can drift
// — the header, every section and the footer all measure from this one value.

/** The centred content column every section shares. */
export function Container({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-6 shell:px-8", className)} {...p} />;
}

/**
 * One page section, with the site's vertical rhythm.
 *
 * `tone` paints the band behind it: alternating surface and background is what
 * separates sections on a long page without a rule between every one.
 */
export function Section({
  id,
  tone = "background",
  className,
  children,
}: {
  id?: string;
  tone?: "background" | "surface" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-16 shell:py-20",
        tone === "surface" && "bg-surface",
        tone === "dark" && "bg-sidebar text-white",
        // A section with an id is a scroll target: offset it so the sticky
        // header does not cover the heading when a #link lands here.
        id && "scroll-mt-20",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** The small caps label above a section heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.08em] text-primary", className)}>{children}</p>
  );
}

/**
 * Section heading block: eyebrow, title, optional lede.
 *
 * `max-w` on the lede rather than the whole block, so a long title can use the
 * full column while the body copy keeps a readable measure.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl shell:text-[32px] shell:leading-[1.15]">
        {title}
      </h2>
      {lede && (
        <p className={cn("max-w-2xl text-pretty text-[15px] leading-relaxed text-muted", align === "center" && "mx-auto")}>
          {lede}
        </p>
      )}
    </div>
  );
}

/** A plain white card used across the feature, audience and security grids. */
export function Card({ className, ...p }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6", className)}
      {...p}
    />
  );
}

/**
 * The breadcrumb trail on an inner page.
 *
 * Rendered as a real `<nav>` with an ordered list, which is what the
 * BreadcrumbList schema on the same page describes — the markup and the
 * visible trail have to agree for the structured data to be valid.
 */
export function Breadcrumb({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
        </li>
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              <span aria-hidden className="text-border">
                /
              </span>
              {last ? (
                <span className="text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The head of an inner page: trail, H1, and a short summary.
 *
 * One H1 per page, here, so no page can accidentally ship two or none.
 */
export function PageHead({
  trail,
  title,
  lede,
}: {
  trail: { name: string; href: string }[];
  title: string;
  lede: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-14 shell:py-16">
        <Breadcrumb trail={trail} />
        <h1 className="mt-5 max-w-3xl text-balance text-[28px] font-extrabold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[34px] shell:text-[40px]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted">{lede}</p>
      </Container>
    </section>
  );
}

/**
 * "Sample data" marker.
 *
 * Every product preview on this site is hand-built from a made-up policy, and
 * every one of them carries this. An interface mockup that looks like a real
 * screenshot and is not labelled is the thing the brief rules out, and it is
 * also the thing that would make a visitor doubt the rest of the page.
 */
export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent-warning" />
      Sample data
    </span>
  );
}
