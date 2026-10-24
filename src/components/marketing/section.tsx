import Link from "next/link";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ACCENT_CHIP, ACCENT_TEXT, heroWash, type Accent } from "@/lib/accents";

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

/**
 * The small caps label above a section heading.
 *
 * The home page's own eyebrow — 13px, bold, 0.08em tracking — and NOT the
 * 12px semibold always-blue one this used to be. The two sat on the same site
 * at two sizes and two weights, and the inner pages were the ones wearing the
 * smaller, flatter version.
 *
 * `accent` is the section's hue. Each section owning one colour is the rule
 * the home page is built on; the inner pages ignored it and were a single
 * blue from top to bottom, which is most of why they read as a different
 * site. See lib/accents.
 */
export function Eyebrow({
  accent = "blue",
  children,
  className,
}: {
  accent?: Accent;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[13px] font-bold uppercase tracking-[0.08em]",
        ACCENT_TEXT[accent],
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * The section heading.
 *
 * One scale for the whole site. The home page wrote this out inline seven
 * times at 28/34/38px; `SectionHead` used 24/30/32px; so an inner page's
 * section headings were a step smaller than the home page's for no reason
 * anyone chose. One component, one scale, and a tweak lands everywhere.
 */
export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-balance text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[34px] shell:text-[38px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/**
 * The soft-blue inset panel.
 *
 * The home page groups "How it works" and "Product in action" into a tinted
 * rounded panel, which is what gives that page its rhythm of raised and
 * recessed bands. No inner page had one, so their sections ran together as an
 * undifferentiated column of white. Same border, ground and padding steps.
 */
export function Panel({ className, ...p }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-7 rounded-3xl border border-[#E6EEFB] bg-[#F5F9FF] p-6 sm:p-10 shell:p-14",
        className,
      )}
      {...p}
    />
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
  accent = "blue",
  title,
  lede,
  align = "left",
  /** The "see all" chip or action that sits opposite the heading on a wide
   *  screen, as it does on the home page's Features and FAQ sections. */
  aside,
  className,
}: {
  eyebrow?: string;
  accent?: Accent;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  aside?: React.ReactNode;
  className?: string;
}) {
  const head = (
    <div className={cn("flex flex-col gap-2.5", align === "center" && "items-center text-center")}>
      {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
      <H2>{title}</H2>
      {lede && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-foreground/70",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );

  if (!aside) return <div className={className}>{head}</div>;

  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      {head}
      {aside}
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
      {/* `-mx-1.5` pulls the links' own padding back out of the layout, so
          the trail still starts flush with the H1 below it while each link
          keeps a 24px-tall tap target — the separators are decorative and
          sit outside that box. The separator itself is `muted/50` rather
          than `border`: at #E2E8F0 on a near-white hero wash it was 1.19:1
          and effectively invisible, which makes a trail read as three
          unrelated words. */}
      <ol className="-mx-1.5 flex flex-wrap items-center gap-0.5 text-sm text-muted">
        <li>
          <Link
            href="/"
            className="inline-flex min-h-6 items-center rounded px-1.5 transition-colors hover:text-primary"
          >
            Home
          </Link>
        </li>
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-0.5">
              <span aria-hidden className="text-muted/50">
                /
              </span>
              {last ? (
                <span className="px-1.5 font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex min-h-6 items-center rounded px-1.5 transition-colors hover:text-primary"
                >
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
  accent = "blue",
  badge,
  title,
  lede,
  checks,
  actions,
  aside,
}: {
  trail: { name: string; href: string }[];
  /** The page's hue: tints the wash, the badge and the check marks. */
  accent?: Accent;
  /** The small pill above the H1, as the home page hero has. */
  badge?: React.ReactNode;
  title: React.ReactNode;
  lede: React.ReactNode;
  /** Up to four short reassurances under the lede, two-up on a wide screen. */
  checks?: string[];
  actions?: React.ReactNode;
  /** A preview or illustration beside the copy. Hidden below `sm`, where a
   *  stacked panel would eat a third of the screen and add nothing the
   *  headline has not already said — the same call the home page makes. */
  aside?: React.ReactNode;
}) {
  return (
    <section
      className="overflow-hidden border-b border-[#E6EEFB]"
      style={{ background: heroWash(accent) }}
    >
      <Container className="py-11 sm:py-14 shell:py-16">
        <div
          className={cn(
            "grid items-center gap-10",
            aside && "rail:grid-cols-2 rail:gap-12",
          )}
        >
          <div className="pv-rise flex flex-col items-start">
            <Breadcrumb trail={trail} />
            {badge && (
              <span
                className={cn(
                  "mt-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold",
                  ACCENT_CHIP[accent],
                )}
              >
                {badge}
              </span>
            )}
            <h1
              className={cn(
                "max-w-3xl text-balance text-[32px] font-extrabold leading-[1.08] tracking-[-0.032em] text-foreground sm:text-[40px] shell:text-[46px]",
                badge ? "mt-4" : "mt-5",
              )}
            >
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/70">
              {lede}
            </p>
            {checks && (
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-x-7">
                {checks.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span
                      aria-hidden
                      className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            )}
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="hidden sm:block">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

/**
 * A word or phrase in a heading, filled with the brand gradient.
 *
 * The home page's H1 does this to "automatically." It is the site's one
 * display flourish, and giving each inner page's H1 the same treatment is
 * what makes those headings read as the same family rather than as plain
 * navy text that happens to be large.
 */
export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: "var(--gradient-brand)" }}
    >
      {children}
    </span>
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
