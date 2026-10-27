import * as React from "react";
import { SOCIAL, type SocialProfile } from "@/lib/contact";
import { cn } from "@/lib/utils";

// The social profile links, from the one list in lib/contact.
//
// ── Why the glyphs are drawn here ──
// lucide-react dropped every brand icon at v1, so there is no `Facebook` or
// `Instagram` export left to import. These are the lucide originals (ISC),
// kept on the same 24-unit grid with the same 2px round-capped stroke as the
// phone and pin they sit beside — a solid brand mark from another icon set
// would read as pasted in.
//
// `aria-hidden` on both: the link carries the platform name as its
// accessible name, so announcing the glyph would only say it twice.

const GLYPH: Record<SocialProfile["id"], React.ReactNode> = {
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  youtube: (
    <>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

function SocialGlyph({ id, className }: { id: SocialProfile["id"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-4 shrink-0", className)}
    >
      {GLYPH[id]}
    </svg>
  );
}

/**
 * The profiles as a row of icon buttons — the footer's form.
 *
 * `target="_blank"` with `rel="noopener noreferrer"`, like every other
 * off-site link on this site: these leave for a third party, and a visitor
 * reading the footer has not finished with the page.
 *
 * Each tile is 40px square, which is the touch target a thumb needs; the
 * glyph inside it is the usual 16px.
 */
export function SocialLinks({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {SOCIAL.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} — Insoora`}
            className={cn(
              "grid size-10 place-items-center rounded-lg border transition-colors",
              linkClassName,
            )}
          >
            <SocialGlyph id={s.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The same profiles as labelled rows — for the Contact Us page, where there
 * is room to print the handle and an icon alone would be a guessing game.
 */
export function SocialLinkList({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {SOCIAL.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-semibold text-primary hover:underline"
          >
            <SocialGlyph id={s.id} />
            {s.label}
            <span className="font-normal text-muted">{s.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
