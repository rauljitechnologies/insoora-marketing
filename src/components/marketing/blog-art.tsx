import type { Accent } from "@/lib/accents";
import type { PostArt } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

// The articles' illustrations.
//
// ── Why these are drawn rather than photographed ─────────────────────────
//
// The brief for the blog asks for "properly licensed imagery or original
// illustrations", and original is the easier promise to keep: a stock
// photograph of people shaking hands in an office is licensing to track, a
// file to serve and optimise, and a picture of nothing in particular. These
// are drawn here instead, which has three practical consequences:
//
//   • Nothing is downloaded. The figures are inline SVG inside the page's
//     own HTML, so there is no second request, no format negotiation, and
//     no CDN hop before a reader sees the top of an article.
//   • There is no layout shift. Every figure declares its own aspect ratio,
//     so the box is the right size before anything paints — the problem a
//     `width`/`height` pair solves for a raster image, solved structurally.
//   • They carry the page's accent. Each article has a hue (see lib/accents)
//     and its illustration is drawn in it, which is what makes the listing
//     read as a set rather than five unrelated cards.
//
// ── Accessibility ────────────────────────────────────────────────────────
//
// These are content, not decoration: they head an article and appear on its
// card, so they get `role="img"` and a real `<title>` rather than the
// `aria-hidden` every other glyph on this site carries. The title is the alt
// text, it is passed in by the caller, and it describes what the figure shows
// rather than repeating the headline — a screen reader that has just read the
// title does not need to hear it twice.

/** Per-accent ink. The `fill`/`stroke` values SVG needs as literals, matching
 *  the `ACCENT_*` tables the rest of the site paints with. */
const INK: Record<Accent, { deep: string; mid: string; soft: string; wash: string }> = {
  blue: { deep: "#1D4ED8", mid: "#2563EB", soft: "#BFDBFE", wash: "#EFF6FF" },
  purple: { deep: "#6D28D9", mid: "#7C3AED", soft: "#DDD6FE", wash: "#F5F3FF" },
  red: { deep: "#B91C1C", mid: "#DC2626", soft: "#FECACA", wash: "#FEF2F2" },
  orange: { deep: "#C2410C", mid: "#EA580C", soft: "#FED7AA", wash: "#FFF7ED" },
  teal: { deep: "#0E7490", mid: "#0891B2", soft: "#A5F3FC", wash: "#ECFEFF" },
  green: { deep: "#15803D", mid: "#16A34A", soft: "#BBF7D0", wash: "#F0FDF4" },
  pink: { deep: "#BE185D", mid: "#DB2777", soft: "#FBCFE8", wash: "#FDF2F8" },
};

/** The drawing area every figure shares, so they crop identically. */
const VIEW = { w: 400, h: 225 } as const;

/**
 * One article illustration.
 *
 * `alt` is required and has no default: a figure that heads an article always
 * needs describing, and making it optional is how one ends up shipped without.
 */
export function BlogArt({
  art,
  accent,
  alt,
  className,
}: {
  art: PostArt;
  accent: Accent;
  /** What the figure shows. Becomes the SVG's accessible name. */
  alt: string;
  className?: string;
}) {
  const c = INK[accent];
  const Figure = FIGURES[art];

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      role="img"
      aria-label={alt}
      // `block` kills the inline-element descender gap under the figure, and
      // the aspect ratio holds the box open before paint.
      className={cn("block h-auto w-full", className)}
      style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
    >
      <rect width={VIEW.w} height={VIEW.h} rx="0" fill={c.wash} />
      <Figure c={c} />
    </svg>
  );
}

type FigureProps = { c: (typeof INK)[Accent] };

/** A sheet of paper with ruled lines — the motif most of these are built from. */
function Sheet({
  x,
  y,
  w = 86,
  h = 108,
  c,
  lines = 4,
  tone = "white",
  rotate = 0,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  c: FigureProps["c"];
  lines?: number;
  tone?: "white" | "soft";
  rotate?: number;
}) {
  return (
    <g transform={rotate ? `rotate(${rotate} ${x + w / 2} ${y + h / 2})` : undefined}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill={tone === "white" ? "#FFFFFF" : c.soft}
        stroke={c.soft}
        strokeWidth="2"
      />
      {Array.from({ length: lines }, (_, i) => (
        <rect
          key={i}
          x={x + 12}
          y={y + 20 + i * 16}
          width={i === lines - 1 ? (w - 24) * 0.55 : w - 24}
          height="5"
          rx="2.5"
          fill={i === 0 ? c.mid : c.soft}
        />
      ))}
    </g>
  );
}

/** Documents going into an ordered index — "organize policy documents". */
function Filing({ c }: FigureProps) {
  return (
    <>
      <Sheet x={44} y={52} c={c} rotate={-8} />
      <Sheet x={74} y={44} c={c} rotate={-3} />
      <Sheet x={106} y={38} c={c} lines={5} />
      {/* The index the documents resolve into. */}
      <rect x={222} y={38} width={136} height={150} rx="10" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      <rect x={222} y={38} width={136} height={26} rx="10" fill={c.deep} />
      <rect x={234} y={48} width={58} height={6} rx="3" fill="#FFFFFF" opacity="0.9" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={236} y={78 + i * 21} width="10" height="10" rx="3" fill={c.mid} />
          <rect x={254} y={81 + i * 21} width={i % 2 ? 62 : 86} height="5" rx="2.5" fill={c.soft} />
        </g>
      ))}
      {/* The arrow from pile to index. */}
      <path
        d="M196 112 L214 112"
        stroke={c.mid}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M208 106 L216 112 L208 118" fill="none" stroke={c.mid} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/** One book of business, several people — "agency management". */
function Agency({ c }: FigureProps) {
  const spokes = [
    { x: 78, y: 58 },
    { x: 78, y: 167 },
    { x: 322, y: 58 },
    { x: 322, y: 167 },
  ];
  return (
    <>
      {spokes.map((s) => (
        <path
          key={`${s.x}-${s.y}`}
          d={`M200 112 L${s.x} ${s.y}`}
          stroke={c.soft}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {spokes.map((s, i) => (
        <g key={`node-${s.x}-${s.y}`}>
          <circle cx={s.x} cy={s.y} r="26" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
          <circle cx={s.x} cy={s.y - 6} r="7.5" fill={i % 2 ? c.mid : c.deep} />
          <path
            d={`M${s.x - 12} ${s.y + 15} a12 12 0 0 1 24 0 Z`}
            fill={i % 2 ? c.mid : c.deep}
          />
        </g>
      ))}
      {/* The shared book at the centre. */}
      <rect x={162} y={78} width={76} height={68} rx="10" fill={c.deep} />
      <rect x={176} y={96} width={48} height="6" rx="3" fill="#FFFFFF" opacity="0.95" />
      <rect x={176} y={110} width={48} height="6" rx="3" fill="#FFFFFF" opacity="0.6" />
      <rect x={176} y={124} width={30} height="6" rx="3" fill="#FFFFFF" opacity="0.6" />
    </>
  );
}

/** A month with one date claimed, and a renewal cycle — "renewals". */
function Renewals({ c }: FigureProps) {
  return (
    <>
      <rect x={56} y={38} width={176} height={150} rx="12" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      <rect x={56} y={38} width={176} height={30} rx="12" fill={c.deep} />
      <rect x={72} y={49} width={44} height="7" rx="3.5" fill="#FFFFFF" opacity="0.9" />
      {Array.from({ length: 20 }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const marked = i === 13;
        return (
          <rect
            key={i}
            x={74 + col * 31}
            y={84 + row * 25}
            width="20"
            height="16"
            rx="4"
            fill={marked ? c.mid : c.soft}
            opacity={marked ? 1 : 0.65}
          />
        );
      })}
      {/* The cycle: a policy that comes back round. */}
      <path
        d="M268 142 a40 40 0 1 1 28 -11"
        fill="none"
        stroke={c.mid}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M286 126 L298 132 L292 144"
        fill="none"
        stroke={c.mid}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={296} cy={102} r="20" fill={c.deep} />
      <path d="M296 92 L296 103 L304 108" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/** A personal set of policy cards — "for policyholders". */
function Wallet({ c }: FigureProps) {
  return (
    <>
      <rect x={88} y={56} width={200} height={54} rx="10" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" transform="rotate(-6 188 83)" />
      <rect x={96} y={86} width={200} height={54} rx="10" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" transform="rotate(-2 196 113)" />
      {/* The front card, in full. */}
      <rect x={100} y={118} width={200} height={62} rx="12" fill={c.deep} />
      <circle cx={132} cy={149} r="16" fill="#FFFFFF" opacity="0.18" />
      <path
        d="M132 141 l7 4 v6 a7 7 0 0 1 -7 7 a7 7 0 0 1 -7 -7 v-6 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <rect x={160} y={138} width={106} height="7" rx="3.5" fill="#FFFFFF" opacity="0.95" />
      <rect x={160} y={154} width={72} height="6" rx="3" fill="#FFFFFF" opacity="0.55" />
      {/* A tick: the reassurance the article is about. */}
      <circle cx={288} cy={70} r="22" fill={c.mid} />
      <path d="M278 70 L285 77 L299 63" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/** A document being read into fields — "OCR and extraction". */
function Ocr({ c }: FigureProps) {
  return (
    <>
      <Sheet x={54} y={42} w={120} h={142} c={c} lines={6} />
      {/* The scan pass. */}
      <rect x={44} y={104} width={140} height="8" rx="4" fill={c.mid} opacity="0.85" />
      <rect x={44} y={104} width={140} height="8" rx="4" fill="none" stroke={c.deep} strokeWidth="1.5" />
      {/* What it resolves into: labelled, confident fields — and one flagged. */}
      {[
        { label: 64, value: 54, flagged: false },
        { label: 48, value: 72, flagged: false },
        { label: 58, value: 44, flagged: true },
        { label: 52, value: 66, flagged: false },
      ].map((row, i) => (
        <g key={i} transform={`translate(226 ${52 + i * 34})`}>
          <rect width={row.label} height="8" rx="4" fill={c.soft} />
          <rect
            y="14"
            width={row.value}
            height="11"
            rx="5.5"
            fill={row.flagged ? "none" : c.deep}
            stroke={row.flagged ? c.deep : "none"}
            strokeWidth="2"
            strokeDasharray={row.flagged ? "5 4" : undefined}
          />
        </g>
      ))}
      <path d="M192 112 L214 112" stroke={c.mid} strokeWidth="3" strokeLinecap="round" />
      <path d="M208 106 L216 112 L208 118" fill="none" stroke={c.mid} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}


// ── The second set ───────────────────────────────────────────────────────
//
// Seven more, for the seven articles added when the collection went from five
// to twelve. Same rules as the five above: one `VIEW`-sized drawing each,
// built from the same `Sheet` motif and the same per-accent ink, so a listing
// page of twelve cards reads as one set.
//
// No two articles share a figure. A set of twelve where three carry the same
// drawing is a set that looks generated, and the whole reason these are drawn
// rather than stock-photographed is that an original illustration can be
// specific to the thing the article is actually about.

/** A shortlist being judged — ticks, a cross, and one unresolved. */
function Buying({ c }: FigureProps) {
  const rows: ("yes" | "no" | "ask")[] = ["yes", "yes", "no", "ask"];
  return (
    <>
      <rect x={52} y={34} width={296} height={158} rx="12" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      <rect x={52} y={34} width={296} height={28} rx="12" fill={c.deep} />
      <rect x={68} y={44} width={78} height="7" rx="3.5" fill="#FFFFFF" opacity="0.9" />
      {rows.map((state, i) => {
        const y = 78 + i * 29;
        return (
          <g key={i}>
            <rect x={68} y={y} width={i % 2 ? 116 : 142} height="7" rx="3.5" fill={c.soft} />
            {/* The verdict column: a filled tick, a hollow cross, a question. */}
            {state === "yes" && (
              <>
                <circle cx={312} cy={y + 3} r="11" fill={c.mid} />
                <path d="M306 82 L310 86 L318 77" transform={`translate(0 ${y - 79})`} fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
            {state === "no" && (
              <>
                <circle cx={312} cy={y + 3} r="11" fill="none" stroke={c.soft} strokeWidth="2.5" />
                <path d={`M307 ${y - 2} L317 ${y + 8} M317 ${y - 2} L307 ${y + 8}`} stroke={c.deep} strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}
            {state === "ask" && (
              <>
                <circle cx={312} cy={y + 3} r="11" fill={c.soft} />
                <path d={`M308 ${y - 2} a4.5 4.5 0 0 1 8 1 c0 3 -4 3.5 -4 6`} fill="none" stroke={c.deep} strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={312} cy={y + 9} r="1.6" fill={c.deep} />
              </>
            )}
          </g>
        );
      })}
    </>
  );
}

/** A document moving through named stages into a stored record. */
function Pipeline({ c }: FigureProps) {
  return (
    <>
      <Sheet x={28} y={62} w={70} h={94} c={c} lines={4} />
      {/* Three stage nodes on a track. */}
      <path d="M110 110 L286 110" stroke={c.soft} strokeWidth="4" strokeLinecap="round" />
      {[138, 198, 258].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={110} r="15" fill={i === 1 ? c.mid : "#FFFFFF"} stroke={c.mid} strokeWidth="2.5" />
          <text
            x={x}
            y={115}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={i === 1 ? "#FFFFFF" : c.deep}
          >
            {i + 1}
          </text>
        </g>
      ))}
      {/* The record it becomes. */}
      <rect x={298} y={74} width={74} height={72} rx="10" fill={c.deep} />
      <rect x={310} y={90} width={50} height="6" rx="3" fill="#FFFFFF" opacity="0.95" />
      <rect x={310} y={104} width={36} height="5" rx="2.5" fill="#FFFFFF" opacity="0.6" />
      <rect x={310} y={116} width={44} height="5" rx="2.5" fill="#FFFFFF" opacity="0.6" />
      <rect x={310} y={128} width={28} height="5" rx="2.5" fill="#FFFFFF" opacity="0.6" />
    </>
  );
}

/** One policyholder at the centre of the policies they hold. */
function Crm({ c }: FigureProps) {
  const cards = [
    { x: 46, y: 46 },
    { x: 254, y: 46 },
    { x: 46, y: 136 },
    { x: 254, y: 136 },
  ];
  return (
    <>
      {cards.map((card) => (
        <path
          key={`${card.x}-${card.y}`}
          d={`M200 112 L${card.x + 50} ${card.y + 21}`}
          stroke={c.soft}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {cards.map((card, i) => (
        <g key={`card-${card.x}-${card.y}`}>
          <rect x={card.x} y={card.y} width={100} height={42} rx="8" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
          <rect x={card.x + 10} y={card.y + 12} width={i % 2 ? 44 : 58} height="6" rx="3" fill={c.mid} />
          <rect x={card.x + 10} y={card.y + 24} width={i % 2 ? 62 : 48} height="5" rx="2.5" fill={c.soft} />
        </g>
      ))}
      {/* The person. */}
      <circle cx={200} cy={112} r="30" fill={c.deep} />
      <circle cx={200} cy={103} r="9" fill="#FFFFFF" opacity="0.95" />
      <path d="M185 128 a15 15 0 0 1 30 0 Z" fill="#FFFFFF" opacity="0.95" />
    </>
  );
}

/** Four kinds of policy arriving in one ordered list. */
function Lines({ c }: FigureProps) {
  const kinds = [0, 1, 2, 3];
  return (
    <>
      {kinds.map((i) => (
        <g key={i}>
          <rect x={34} y={44 + i * 36} width={82} height={26} rx="7" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
          <circle cx={48} cy={57 + i * 36} r="5" fill={i % 2 ? c.mid : c.deep} />
          <rect x={60} y={54 + i * 36} width={i % 2 ? 36 : 46} height="5" rx="2.5" fill={c.soft} />
          {/* The funnel line into the shared list. */}
          <path
            d={`M120 ${57 + i * 36} C 152 ${57 + i * 36}, 160 112, 192 112`}
            fill="none"
            stroke={c.soft}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ))}
      <rect x={204} y={46} width={158} height={132} rx="10" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      <rect x={204} y={46} width={158} height={24} rx="10" fill={c.deep} />
      <rect x={216} y={55} width={62} height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
      {[0, 1, 2, 3].map((i) => (
        <g key={`row-${i}`}>
          <circle cx={219} cy={89 + i * 22} r="4.5" fill={i % 2 ? c.mid : c.deep} />
          <rect x={232} y={86 + i * 22} width={i === 3 ? 58 : 94} height="5" rx="2.5" fill={c.soft} />
          <rect x={312} y={86 + i * 22} width={34} height="5" rx="2.5" fill={c.soft} opacity="0.7" />
        </g>
      ))}
    </>
  );
}

/** Typing a form, against reading the page — the two routes to one record. */
function Keyboard({ c }: FigureProps) {
  return (
    <>
      {/* The typed route: a form and a key grid. */}
      <rect x={30} y={38} width={148} height={64} rx="9" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={42} y={50 + i * 17} width={34} height="6" rx="3" fill={c.soft} />
          <rect x={86} y={48 + i * 17} width={80} height="10" rx="5" fill="none" stroke={c.soft} strokeWidth="1.5" />
        </g>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={`key-${i}`}
          x={32 + (i % 6) * 24}
          y={118 + Math.floor(i / 6) * 24}
          width="19"
          height="19"
          rx="4"
          fill={c.soft}
          opacity="0.75"
        />
      ))}
      {/* The read route: a page with a scan beam. */}
      <Sheet x={214} y={38} w={78} h={100} c={c} lines={4} />
      <rect x={206} y={82} width={94} height="7" rx="3.5" fill={c.mid} opacity="0.9" />
      {/* Both arrive at the same record, one of them without the keys. */}
      <rect x={312} y={62} width={56} height={52} rx="9" fill={c.deep} />
      <rect x={322} y={76} width={36} height="5" rx="2.5" fill="#FFFFFF" opacity="0.95" />
      <rect x={322} y={87} width={26} height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
      <rect x={322} y={97} width={32} height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
      <path d="M296 88 L306 88" stroke={c.mid} strokeWidth="3" strokeLinecap="round" />
      <path d="M186 70 C 206 70, 206 150, 236 150" fill="none" stroke={c.soft} strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
      <path d="M248 150 L318 150 L318 124" fill="none" stroke={c.soft} strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
    </>
  );
}

/** Scattered windows resolving into one screen of tiles. */
function Dashboard({ c }: FigureProps) {
  const loose = [
    { x: 30, y: 44, w: 62, h: 44, r: -7 },
    { x: 34, y: 100, w: 56, h: 40, r: 5 },
    { x: 24, y: 150, w: 66, h: 38, r: -3 },
  ];
  return (
    <>
      {loose.map((w) => (
        <g key={`${w.x}-${w.y}`} transform={`rotate(${w.r} ${w.x + w.w / 2} ${w.y + w.h / 2})`}>
          <rect x={w.x} y={w.y} width={w.w} height={w.h} rx="6" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
          <rect x={w.x} y={w.y} width={w.w} height="9" rx="6" fill={c.soft} />
          <rect x={w.x + 8} y={w.y + 19} width={w.w - 22} height="4" rx="2" fill={c.soft} />
          <rect x={w.x + 8} y={w.y + 28} width={w.w - 34} height="4" rx="2" fill={c.soft} />
        </g>
      ))}
      <path d="M104 112 L126 112" stroke={c.mid} strokeWidth="3" strokeLinecap="round" />
      <path d="M119 106 L127 112 L119 118" fill="none" stroke={c.mid} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* The one screen. */}
      <rect x={138} y={38} width={226} height={150} rx="11" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      <rect x={138} y={38} width={226} height={24} rx="11" fill={c.deep} />
      <rect x={150} y={47} width={58} height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
      {[0, 1, 2, 3].map((i) => (
        <g key={`tile-${i}`}>
          <rect
            x={152 + (i % 2) * 104}
            y={76 + Math.floor(i / 2) * 50}
            width={94}
            height={40}
            rx="7"
            fill={c.wash}
            stroke={c.soft}
            strokeWidth="1.5"
          />
          <rect x={162 + (i % 2) * 104} y={85 + Math.floor(i / 2) * 50} width={30} height="5" rx="2.5" fill={c.soft} />
          <rect
            x={162 + (i % 2) * 104}
            y={97 + Math.floor(i / 2) * 50}
            width={i % 3 === 0 ? 44 : 30}
            height="10"
            rx="3"
            fill={i === 0 ? c.deep : c.mid}
            opacity={i === 0 ? 1 : 0.8}
          />
        </g>
      ))}
    </>
  );
}

/** A spreadsheet grid, and the structured record it cannot be. */
function Grid({ c }: FigureProps) {
  return (
    <>
      <rect x={28} y={46} width={158} height={132} rx="8" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      {/* The header row and the cells. */}
      <rect x={28} y={46} width={158} height={20} rx="8" fill={c.soft} />
      {Array.from({ length: 20 }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        // One cell is empty and one holds a flagged value — the two failure
        // modes of a register maintained by hand.
        const empty = i === 9;
        const wrong = i === 14;
        return (
          <g key={i}>
            <rect
              x={34 + col * 38}
              y={76 + row * 20}
              width="30"
              height="11"
              rx="3"
              fill={empty ? "none" : wrong ? "none" : c.soft}
              stroke={wrong ? c.deep : empty ? c.soft : "none"}
              strokeWidth={wrong || empty ? 1.5 : 0}
              strokeDasharray={empty ? "3 3" : undefined}
              opacity={empty ? 0.8 : 1}
            />
            {wrong && <path d={`M${38 + col * 38} ${81 + row * 20} L${60 + col * 38} ${81 + row * 20}`} stroke={c.deep} strokeWidth="1.5" />}
          </g>
        );
      })}
      <path d="M198 112 L220 112" stroke={c.mid} strokeWidth="3" strokeLinecap="round" />
      <path d="M213 106 L221 112 L213 118" fill="none" stroke={c.mid} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* The record: labelled fields with their document still attached. */}
      <rect x={232} y={46} width={136} height={132} rx="9" fill="#FFFFFF" stroke={c.soft} strokeWidth="2" />
      <rect x={232} y={46} width={136} height={22} rx="9" fill={c.deep} />
      <rect x={244} y={54} width={52} height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
      {[0, 1, 2].map((i) => (
        <g key={`field-${i}`}>
          <rect x={244} y={82 + i * 24} width={40} height="5" rx="2.5" fill={c.soft} />
          <rect x={244} y={92 + i * 24} width={i === 1 ? 56 : 74} height="8" rx="4" fill={c.mid} />
        </g>
      ))}
      {/* The attached document. Sits clear of the third field's value bar,
          which runs to x=318 — the two overlapped at x=312 before this moved. */}
      <rect x={322} y={126} width={40} height={40} rx="5" fill={c.wash} stroke={c.soft} strokeWidth="1.5" />
      <rect x={330} y={136} width={24} height="4" rx="2" fill={c.soft} />
      <rect x={330} y={144} width={18} height="4" rx="2" fill={c.soft} />
      <rect x={330} y={152} width={22} height="4" rx="2" fill={c.soft} />
    </>
  );
}

const FIGURES: Record<PostArt, (p: FigureProps) => React.ReactElement> = {
  filing: Filing,
  agency: Agency,
  renewals: Renewals,
  wallet: Wallet,
  ocr: Ocr,
  buying: Buying,
  pipeline: Pipeline,
  crm: Crm,
  lines: Lines,
  keyboard: Keyboard,
  dashboard: Dashboard,
  grid: Grid,
};

/**
 * What each figure shows, for the accessible name.
 *
 * Kept beside the drawings rather than in the post data: it describes the
 * ILLUSTRATION, and if a drawing is redrawn its description changes with it.
 * A post's own words have no business describing a picture it does not know
 * the contents of.
 */
export const ART_ALT: Record<PostArt, string> = {
  filing:
    "A scattered pile of policy documents resolving into a single ordered index of rows",
  agency:
    "Four people connected to one shared book of business at the centre",
  renewals:
    "A month grid with one date highlighted, beside a cycle arrow and a clock",
  wallet:
    "A fanned set of personal policy cards with a confirmation tick",
  ocr: "A document being scanned, resolving into labelled fields with one flagged for review",
  buying:
    "A shortlist of four requirements, three resolved as met or not met and one left as an open question",
  pipeline:
    "A policy document passing through three numbered stages into a stored record",
  crm: "One policyholder at the centre, connected to the four policy cards they hold",
  lines:
    "Four different kinds of policy funnelling into one ordered list",
  keyboard:
    "Two routes to the same record: a form above a keyboard, and a document being read",
  dashboard:
    "Three scattered windows resolving into a single screen of summary tiles",
  grid:
    "A spreadsheet grid with an empty cell and a struck-out one, beside a structured record with its document attached",
};
