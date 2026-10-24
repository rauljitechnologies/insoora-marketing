import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT_CHIP, CTA_BAND_BACKGROUND, type Accent } from "@/lib/accents";
import { Container } from "./section";

// The website's call-to-action vocabulary.
//
// Every one of these shapes already existed on the home page as inline
// classes, and every inner page then re-invented a flatter version of it:
// the home page's primary button is a gradient-filled `rounded-xl px-6 py-3.5`
// with a violet shadow, while About, Features and the legal pages hand-rolled
// `inline-flex h-11 items-center rounded-md bg-background px-5 text-sm` — a
// different radius, a different height, a flat fill and no shadow. Four
// slightly different primary buttons on one site is not a style, it is drift.
//
// So the shapes live here once. The home page imports the same components, so
// there is exactly one definition of "the primary action" on the site and no
// page can quietly fall behind the others.

type Size = "lg" | "md";

const SIZE: Record<Size, string> = {
  // The home page hero and the conversion band.
  lg: "px-6 py-3.5 text-[15px]",
  // Section-level actions on an inner page, where a hero-sized button would
  // outweigh the text beside it.
  md: "h-11 px-5 text-sm",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25";

interface ActionProps {
  href: string;
  /** An absolute URL into the product: a plain <a>, never a <Link>, because
   *  there is no client-side route across an origin for Next to prefetch. */
  external?: boolean;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

/** Renders the right element for the destination, so no call site has to
 *  remember the <Link>-vs-<a> rule.
 *
 *  `style` is how the brand gradient gets on: a three-stop `linear-gradient`
 *  read from a custom property cannot be expressed as a Tailwind utility. */
function Action({
  href,
  external,
  className,
  style,
  children,
}: Omit<ActionProps, "size"> & { className: string; style?: React.CSSProperties }) {
  return external ? (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

/**
 * The site's primary action: the brand gradient, white label, violet lift.
 *
 * The gradient is `--gradient-brand` — the red → purple → blue ramp — rather
 * than a flat primary. That sweep is the thing that makes the site read as
 * Insoora rather than another blue SaaS page, and it belongs on every
 * "the main thing to press", not only the home page's.
 */
export function PrimaryAction({ size = "lg", className, children, ...rest }: ActionProps) {
  return (
    <Action
      {...rest}
      className={cn(
        BASE,
        SIZE[size],
        "text-white shadow-[0_14px_28px_-12px_rgba(124,58,237,.85)]",
        className,
      )}
      style={{ backgroundImage: "var(--gradient-brand)" }}
    >
      {children}
    </Action>
  );
}

/**
 * The secondary action: a gradient *border* around a white face.
 *
 * Two backgrounds clipped to different boxes — the only way to stroke an
 * element with a gradient without an extra wrapper element.
 */
export function SecondaryAction({ size = "lg", className, children, ...rest }: ActionProps) {
  return (
    <Action
      {...rest}
      className={cn(BASE, SIZE[size], "border-2 border-transparent text-[#7C3AED]", className)}
      style={{
        backgroundImage: "linear-gradient(#fff,#fff),var(--gradient-brand)",
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {children}
    </Action>
  );
}

/**
 * The "see more" chip: a small accent pill that nudges sideways on hover.
 *
 * Takes the section's own hue, so the chip at the end of a section belongs to
 * that section rather than being one more blue link.
 */
export function ChipLink({
  href,
  external,
  accent = "blue",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  accent?: Accent;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-sm font-semibold transition-transform hover:translate-x-0.5",
    ACCENT_CHIP[accent],
    className,
  );
  return external ? (
    <a href={href} className={classes}>
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}

/** A primary action ON the dark conversion band: white face, red label. */
export function BandPrimaryAction({ size = "lg", className, children, ...rest }: ActionProps) {
  return (
    <Action
      {...rest}
      className={cn(
        BASE,
        SIZE[size],
        "bg-white text-base font-bold text-[#B91C1C] shadow-[0_14px_28px_-12px_rgba(0,0,0,.45)]",
        className,
      )}
    >
      {children}
    </Action>
  );
}

/**
 * The band's second action: the palette's green, which is the only hue on the
 * band that is neither the ground nor the primary.
 *
 * `#15803D`, not the palette's brighter `#16A34A`. White on #16A34A is
 * 3.30:1, and a 16px semibold label is not "large text" under WCAG, so that
 * button failed AA everywhere it appeared — including on the home page,
 * where it has always been the second call to action. #15803D is the same
 * hue a step down and clears it at 5.02:1. The glow underneath still uses
 * the brighter green, because a shadow carries no text.
 */
export function BandSecondaryAction({ size = "lg", className, children, ...rest }: ActionProps) {
  return (
    <Action
      {...rest}
      className={cn(
        BASE,
        SIZE[size],
        "bg-[#15803D] text-base text-white shadow-[0_14px_28px_-12px_rgba(22,163,74,.8)]",
        className,
      )}
    >
      {children}
    </Action>
  );
}

/**
 * The conversion band that closes a page.
 *
 * The home page's: a deep blue with a red bloom top-right and a violet one
 * bottom-left — the brand ramp's three stops, as light. About Us and Features
 * closed with a flat `bg-sidebar` block and flat white buttons instead, which
 * is the single biggest reason those pages read as a different website. One
 * component now, so the last thing a visitor sees is the same on every page.
 */
export function CtaBand({
  eyebrow,
  title,
  lede,
  actions,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="pb-14 sm:pb-16 shell:pb-20">
      <Container>
        <div
          className="flex flex-wrap items-center justify-between gap-6 rounded-3xl p-8 text-white sm:p-12"
          style={{ background: CTA_BAND_BACKGROUND }}
        >
          <div className="flex max-w-[40rem] flex-col gap-2.5">
            <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#BFDBFE]">
              {eyebrow}
            </span>
            <h2 className="text-balance text-[26px] font-bold tracking-[-0.025em] sm:text-[32px] shell:text-4xl">
              {title}
            </h2>
            {lede && <p className="text-base text-[#DBEAFE]">{lede}</p>}
          </div>
          <div className="flex flex-wrap gap-3">{actions}</div>
        </div>
      </Container>
    </section>
  );
}
