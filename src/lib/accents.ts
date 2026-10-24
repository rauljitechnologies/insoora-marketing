// The website's section accents, in one table.
//
// The home page's design runs on a rule: each section owns one hue, used for
// its eyebrow, its icon tiles and its "see more" chip, so a long page reads
// as a sequence of chapters rather than one blue wash. That rule was written
// out as inline hexes on the home page and ignored entirely on the inner
// pages, which were a single `bg-primary-soft text-primary` blue throughout.
//
// Every value below already appeared verbatim on the home page — this is a
// consolidation, not a new palette. The hues themselves are tokens
// (`--accent-red` … `--accent-pink`) declared on `.site` in globals.css; the
// literals here are their soft/tint partners, which Tailwind needs as static
// class strings and cannot derive from a custom property.

export type Accent = "blue" | "purple" | "red" | "orange" | "teal" | "green" | "pink";

/**
 * Eyebrow / small-label TEXT colour.
 *
 * The `-ink` tokens, not the bright `--accent-*` fills: a 13px bold eyebrow
 * is not "large text" under WCAG, so it needs 4.5:1, and the bright orange,
 * teal, green and pink do not clear that on any ground the site uses. See
 * the long note beside the `-ink` tokens in globals.css. Red, violet and
 * blue already passed and are unchanged.
 */
export const ACCENT_TEXT: Record<Accent, string> = {
  blue: "text-accent-blue-ink",
  purple: "text-accent-purple-ink",
  red: "text-accent-red-ink",
  orange: "text-accent-orange-ink",
  teal: "text-accent-teal-ink",
  green: "text-accent-green-ink",
  pink: "text-accent-pink-ink",
};

/** The square icon tile behind a feature or card glyph. */
export const ACCENT_TILE: Record<Accent, string> = {
  blue: "bg-[#E8F0FE] text-[#2563EB]",
  purple: "bg-[#F3E8FF] text-[#7C3AED]",
  red: "bg-[#FEE2E2] text-[#DC2626]",
  orange: "bg-[#FFEDD5] text-[#EA580C]",
  teal: "bg-[#CFFAFE] text-[#0891B2]",
  green: "bg-[#DCFCE7] text-[#16A34A]",
  pink: "bg-[#FCE7F3] text-[#DB2777]",
};

/** The pill chip: a soft ground, a tinted border and a darker label. */
export const ACCENT_CHIP: Record<Accent, string> = {
  blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
  purple: "border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]",
  red: "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]",
  orange: "border-[#FED7AA] bg-[#FFF7ED] text-[#C2410C]",
  teal: "border-[#A5F3FC] bg-[#ECFEFF] text-[#0E7490]",
  green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  pink: "border-[#FBCFE8] bg-[#FDF2F8] text-[#BE185D]",
};

/** The light stop of a page hero's radial wash — see `heroWash` below. */
const ACCENT_WASH: Record<Accent, string> = {
  blue: "#DBEAFE",
  purple: "#EDE9FE",
  red: "#FEE2E2",
  orange: "#FFEDD5",
  teal: "#CFFAFE",
  green: "#DCFCE7",
  pink: "#FCE7F3",
};

/**
 * The page hero's background.
 *
 * Exactly the home page hero's construction — two radials over `#F8FBFF`, at
 * the same sizes and positions — with only the first stop swapped for the
 * page's own hue. That keeps every hero recognisably the same shape while
 * giving each inner page its chapter colour; passing `blue` reproduces the
 * home page's wash byte for byte.
 */
export function heroWash(accent: Accent): string {
  return [
    `radial-gradient(900px 500px at 80% 10%,${ACCENT_WASH[accent]},transparent 70%)`,
    "radial-gradient(700px 400px at 0% 100%,#EFF6FF,transparent 70%)",
    "#F8FBFF",
  ].join(",");
}

/**
 * The dark conversion band's ground.
 *
 * The home page's CTA band, lifted verbatim so every page's closing call to
 * action is the same object: a deep blue with a red bloom top-right and a
 * violet one bottom-left — the brand ramp's three stops, as light.
 */
export const CTA_BAND_BACKGROUND = [
  "radial-gradient(500px 300px at 95% 0%,#EF4444,transparent 70%)",
  "radial-gradient(500px 300px at 0% 100%,#7C3AED,transparent 70%)",
  "#1E40AF",
].join(",");
