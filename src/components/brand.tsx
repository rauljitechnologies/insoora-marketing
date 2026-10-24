import Link from "next/link";
import { cn } from "@/lib/utils";

// The Insoora brand lockup: a drawn symbol beside (or above) the wordmark.
//
// One component so the public header and footer, the three portal shells, the
// auth pages, the drawn product mockups and the generated icons cannot drift
// apart. It lives at the root of components/ rather than under marketing/
// because it is not a marketing asset: the signed-in product wears it too.
//
// ── The symbol ──
// A ribbed umbrella held over three figures with their arms raised. The
// geometry is traced from the supplied brand artwork rather than redrawn by
// eye, so the silhouettes — the thin swept arms, the crescent of each outer
// figure, the scalloped canopy edge — are the artwork's own. It is vector,
// not the supplied raster: every path below is a real outline, so it stays
// sharp at any size and the brand file is never shipped to a browser.
//
// The canopy is three separate panels with the ribs as the gaps between them.
// That is deliberate: a knocked-out white rib would only be right on a white
// ground, and this mark also sits on the #0B1431 footer and the #0B1220
// portal sidebars. A gap is whatever is behind it.
//
// ── Colour ──
// The whole mark is `--gradient-brand` — the same #DC2626 → #7C3AED → #2563EB
// ramp every primary button on the site is painted with — laid across it
// left to right.
//
// It is applied twice, once per element, rather than once over the whole
// symbol: the canopy spans nearly the full width and the figures are inset,
// so a single ramp would hand the figures only the middle of it and cost
// them both end colours. Two ramps with the same stops, each measured across
// its own element, put red above red and blue above blue — the canopy's
// three panels land on the three brand colours, and each figure below sits
// under its own.
//
// So the colour moves continuously through every shape rather than being a
// set of flat fills, and the logo reads as the site's gradient resolved into
// an umbrella over three people.
//
// Nothing here introduces a value the site did not already have, and no
// background, gradient, button or section colour is set by this file.
//
// There is ONE mark, and it is the same everywhere — the public header, the
// footer, all three portal sidebars, the auth pages and the icons. A logo
// that shifts its colours by context is not one logo.
//
// An earlier version lifted the ramp to its 400 shades on dark grounds, from
// a time when the umbrella was neutral grey and the two end stops did sink
// into the navy. The whole mark carries the ramp now, and the stops clear the
// 3:1 bar for a meaningful graphic against every dark ground the product
// actually uses — the agent sidebar (#070D1C), the customer sidebar
// (#091C33), the site footer (#0B1431) and the marketing CTA (#0F172A); the
// worst pairing of the twelve is 3.01. So the second set bought nothing and
// cost the brand its consistency.
//
// The WORDMARK still flips, because it is text: dark ink on a dark sidebar is
// not a design choice, it is an invisible word.

const RAMP = ["#DC2626", "#7C3AED", "#2563EB"] as const;

const WORD_COLOUR = { light: "text-foreground", dark: "text-white" } as const;

/** The canopy, as its three panels — the gaps between them are the ribs. */
const PANELS = [
  "M42.7 6Q43 6 42.8 6.3Q42.6 6.6 39.5 9.3Q36.3 11.9 33.8 15.4Q31.2 18.9 29.8 22.1Q28.3 25.2 27.1 30Q25.8 34.8 22.7 33.2Q19.5 31.6 17 31.4Q14.4 31.1 12 31.6Q9.6 32.2 6.5 34.2Q3.3 36.1 3.3 35.2Q3.3 34.2 4.4 31.8Q5.5 29.5 8.1 25.9Q10.7 22.3 14.4 19Q18 15.8 20.9 14Q23.8 12.1 28.5 10.1Q33.2 8 37.7 7.1Q42.2 6.2 42.3 6.2Z",
  "M51.3 0.4Q52.1 0.8 52.1 2.8Q52.1 4.9 54.3 5.9Q56.5 6.8 58.4 8.3Q60.4 9.8 63.3 13.4Q66.2 17 68.5 21.5Q70.7 26 71.9 30.7Q73 35.4 67.4 33.2Q61.7 31.1 55 30.5Q48.2 29.9 43.6 30.6Q39.1 31.2 33.6 33.4Q28.1 35.5 29.1 31.2Q30.1 26.9 32.4 22.2Q34.8 17.4 38.2 13.4Q41.6 9.4 45.5 7.1Q49.4 4.9 49.4 2.9Q49.4 1 49.8 0.6Q50.2 0.2 50.3 0.1Z",
  "M65.3 7.2Q71.9 8.6 74.6 9.8Q77.3 10.9 80.6 13Q83.8 15 86.4 17.4Q89.1 19.7 91.1 22.3Q93.2 24.8 95.7 29.9Q98.2 35 98 35.5Q97.7 36.1 94.7 34.2Q91.8 32.2 89.4 31.6Q86.9 31.1 84 31.4Q81 31.8 78.2 33.3Q75.4 34.8 74.2 29.9Q73 25 71.3 21.3Q69.5 17.6 67.6 14.8Q65.6 12.1 62.2 9.1Q58.8 6 58.8 6Z",
];

/** The stub of handle visible below the canopy. */
const SHAFT = "M50.5 31.7Q51.8 31.8 51.8 35.5Q51.8 39.3 50.3 39.2Q48.8 39.1 48.9 35.5Q49 31.8 49.1 31.7Z";

/** The three bodies, left to right. Heads are circles, below. */
const BODIES = [
  "M33.2 60.2Q35 62.9 35.8 65.2Q36.7 67.6 37.3 70.1Q37.9 72.7 38 75.6Q38.1 78.5 36.9 83.4Q35.7 88.3 32.6 93.5Q29.5 98.6 28.9 99.2Q28.3 99.8 27.8 99.6Q27.3 99.4 27.1 93.5Q26.8 87.5 25.1 82.3Q23.4 77.2 21.6 73.8Q19.7 70.5 15.7 65.5Q11.7 60.5 15.2 61.7Q18.8 62.9 20.5 63Q22.3 63.1 24.9 62.2Q27.5 61.3 29.4 59.5Q31.2 57.6 31.4 57.5Z",
  "M35.7 49.4Q40.4 52.9 44 54.3Q47.7 55.7 51.2 55.2Q54.7 54.7 57 53.4Q59.4 52.1 63.3 49Q67.2 45.9 67.7 46.2Q68.2 46.5 64.7 52Q61.1 57.6 59.2 61.6Q57.2 65.6 53.4 79.1Q49.6 92.6 48.8 92.4Q48 92.2 46.1 83.5Q44.1 74.8 42.5 69.8Q40.8 64.8 38.8 60.6Q36.7 56.5 33.8 51.9Q30.9 47.3 30.9 46.7Q30.9 46.1 31 46Z",
  "M69.1 59.3Q70.9 61.1 73 62Q75.2 62.9 77.8 62.8Q80.5 62.7 83.5 61.4Q86.5 60.2 86.9 60.4Q87.3 60.5 83.3 65.3Q79.3 70.1 76.9 74.4Q74.4 78.7 73 83.7Q71.5 88.7 71.1 94.2Q70.7 99.8 70.2 99.8Q69.7 99.8 68.7 98.4Q67.6 97.1 65.7 93.8Q63.9 90.6 62.5 86.9Q61.1 83.2 60.7 80.7Q60.4 78.1 60.8 73.5Q61.3 69 62.6 65.7Q63.9 62.5 65.5 60.1Q67.2 57.6 67.3 57.5Z",
];

const HEADS = [
  { cx: 22, cy: 54.6, r: 6.4 },
  { cx: 49.3, cy: 46.8, r: 6.8 },
  { cx: 77.2, cy: 54.5, r: 6.4 },
];

/**
 * The symbol on its own — for the drawn mockups, and anywhere the wordmark
 * already appears in the surrounding text.
 *
 * The gradient ids are fixed rather than generated. Two marks on one page
 * define the same gradients twice; `url(#id)` resolves to the first in
 * document order, and since both are identical that is normally the right
 * one. Generating them would mean a `useId` hook, which would make this a
 * Client Component for no benefit.
 *
 * `idScope` is the exception, and it exists because of one real failure: the
 * portal shell renders the mark TWICE — once in the desktop sidebar and once
 * in the mobile drawer — and below the `shell` breakpoint the desktop one is
 * `display: none`. A paint server inside a `display: none` subtree does not
 * paint, so the drawer's mark resolved `url(#insoora-u)` to the hidden
 * definition and came out blank: on a phone, every portal showed a wordmark
 * with an empty square beside it. Any mark that can share a page with another
 * one that might be hidden passes its own scope.
 *
 * `aria-hidden`, always: every place it is used either sits inside a link
 * carrying the text "Insoora" or is decoration beside a visible heading, so
 * announcing it would only repeat the brand name to a screen reader.
 */
export function BrandMark({ className, idScope }: { className?: string; idScope?: string }) {
  const [from, via, to] = RAMP;
  const suffix = idScope ? `-${idScope}` : "";
  const canopyId = `insoora-u${suffix}`;
  const figureId = `insoora-f${suffix}`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8 shrink-0", className)}
    >
      <defs>
        {/* Measured across the canopy, which is wider than the figures. */}
        <linearGradient id={canopyId} x1="4" y1="6" x2="96" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="0.5" stopColor={via} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        {/* The same stops across the figure group, so the colour runs through
            the three of them the way it runs across a button. */}
        <linearGradient id={figureId} x1="10" y1="50" x2="90" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="0.5" stopColor={via} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>

      <g fill={`url(#${canopyId})`}>
        {PANELS.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={SHAFT} />
      </g>

      <g fill={`url(#${figureId})`}>
        {BODIES.map((d) => (
          <path key={d} d={d} />
        ))}
        {HEADS.map((h) => (
          <circle key={h.cx} cx={h.cx} cy={h.cy} r={h.r} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The wordmark.
 *
 * Real text, not a path: selectable, searchable, translatable, and read aloud
 * as a word. Set in the face the surrounding page already loads, at 800 with
 * open tracking — which is what keeps an all-caps word from reading as a
 * solid block at small sizes.
 */
function Wordmark({ tone, className }: { tone: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "font-extrabold uppercase leading-none tracking-[0.06em]",
        WORD_COLOUR[tone],
        className,
      )}
    >
      Insoora
    </span>
  );
}

/**
 * The full lockup, linked home.
 *
 * `horizontal` is the header lockup; `stacked` is for the footer and anywhere
 * the brand is given room of its own. Both are the same two pieces, so the
 * symbol and the wordmark can never disagree between them.
 */
export function BrandLogo({
  tone = "light",
  variant = "horizontal",
  href = "/",
  className,
}: {
  tone?: "light" | "dark";
  variant?: "horizontal" | "stacked";
  href?: string;
  className?: string;
}) {
  const stacked = variant === "stacked";

  return (
    <Link
      href={href}
      aria-label="Insoora — home"
      className={cn(
        "flex shrink-0 rounded-lg transition-opacity hover:opacity-85",
        stacked ? "flex-col items-start gap-2.5" : "items-center gap-2.5",
        className,
      )}
    >
      <BrandMark className={stacked ? "size-12" : "size-10"} />
      <Wordmark tone={tone} className={stacked ? "text-[22px]" : "text-[19px]"} />
    </Link>
  );
}
