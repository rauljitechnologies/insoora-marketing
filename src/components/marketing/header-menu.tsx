"use client";

import * as React from "react";
import Link from "next/link";
import { DropdownMenu } from "radix-ui";
import { cn } from "@/lib/utils";

// The header's dropdowns — "Resources" and "Sign in" — and the single piece
// of state the whole header shares.
//
// ── Why this file exists ──────────────────────────────────────────────────
//
// Both menus were `DropdownMenu.Root`s with default props. Radix's default is
// `modal={true}`, and a modal menu does two things to the document while it
// is open:
//
//   1. sets `document.body.style.pointerEvents = "none"`, and
//   2. mounts react-remove-scroll, which locks body scrolling and compensates
//      for the scrollbar with padding.
//
// Both are correct for a dialog and wrong for a header menu:
//
//   • (2) made the page jump sideways by the scrollbar width the instant a
//     menu opened — the sticky header, and the trigger under the pointer,
//     moved out from under the cursor. A pointer that was travelling towards
//     the menu then landed outside it, which dismissed the menu before any
//     item could be clicked. That is the "closes before I can click it" and
//     the "disappears when I move into it" report, and no amount of z-index
//     or overflow tinkering would have touched it.
//
//   • (1) is the well-known stuck-`pointer-events: none` hazard: the menu
//     item is a <Link>, so selecting it starts a client-side navigation in
//     the same tick that Radix begins its close/cleanup. If the tree is
//     replaced before the layer's cleanup runs, `none` is left on <body> and
//     the entire page stops responding to the pointer until a full reload.
//
//   • (2) also fought the mobile drawer, which sets `body.style.overflow`
//     itself: whichever of the two restored last won, so the page could be
//     left permanently unscrollable after closing both.
//
// `modal={false}` is the fix for all three: no scroll lock, no layout shift,
// no body pointer-events, and outside clicks still dismiss (Radix's
// DismissableLayer handles that independently of `modal`).
//
// The second defect was branding rather than behaviour. The content is
// portaled to `document.body`, which is OUTSIDE the `.site` element that
// carries the public site's design tokens — so every `text-primary`,
// `border-border` and `bg-primary-soft` inside a dropdown resolved against
// `:root`, the back-office admin theme, and the menus wore the admin blue
// (#3B5BF5) instead of the website's (#2563EB). The portal content now
// carries `.site` itself, so it is themed like the header it belongs to.
//
// Everything else here is the contract a header menu is expected to have and
// did not: hover-to-open on a mouse, a forgiving close delay so the pointer
// can cross the gap into the panel, tap-to-open on touch, and only ever one
// menu (or the drawer) open at a time.
// ─────────────────────────────────────────────────────────────────────────

/** How long the pointer may rest on a trigger before the menu opens. */
const OPEN_DELAY = 70;
/** How long the menu survives the pointer leaving it — this is what lets the
 *  pointer cross the 8px gap between trigger and panel. */
const CLOSE_DELAY = 180;

interface HeaderMenuState {
  /** The id of the one open menu, or `"drawer"`, or null. */
  openId: string | null;
  /** The raw dispatcher, so a menu can close itself with a FUNCTIONAL update.
   *  That matters: see the note on `onOpenChange` below. */
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
}

const HeaderMenuContext = React.createContext<HeaderMenuState | null>(null);

/**
 * Owns "which header surface is open".
 *
 * One value rather than one boolean per menu, so the mutual exclusion is
 * structural: opening the Sign in menu closes Resources, opening either
 * closes the mobile drawer, and no combination can leave two panels stacked
 * on top of each other.
 */
export function HeaderMenuProvider({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const value = React.useMemo(() => ({ openId, setOpenId }), [openId]);
  return <HeaderMenuContext.Provider value={value}>{children}</HeaderMenuContext.Provider>;
}

/** The shared state, with a private fallback so a menu still works if it is
 *  ever rendered outside the header. */
export function useHeaderMenus(): HeaderMenuState {
  const ctx = React.useContext(HeaderMenuContext);
  const [localId, setLocalId] = React.useState<string | null>(null);
  const local = React.useMemo(() => ({ openId: localId, setOpenId: setLocalId }), [localId]);
  return ctx ?? local;
}

/** True only for a real mouse. Touch and pen get tap-to-open and no hover. */
function pointerHovers(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function HeaderMenu({
  id,
  label,
  trigger,
  align = "start",
  width = "w-64",
  triggerClassName,
  children,
}: {
  /** Unique within the header; also the key for mutual exclusion. */
  id: string;
  /** Accessible name, when `trigger` is iconography plus text. */
  label?: string;
  trigger: React.ReactNode;
  align?: "start" | "end";
  width?: string;
  triggerClassName?: string;
  children: React.ReactNode;
}) {
  const { openId, setOpenId } = useHeaderMenus();
  const open = openId === id;

  const timer = React.useRef<number | null>(null);

  const clearTimer = React.useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  // A menu that is torn down mid-timer (a navigation, say) must not fire a
  // setState afterwards.
  React.useEffect(() => clearTimer, [clearTimer]);

  const scheduleOpen = React.useCallback(() => {
    clearTimer();
    if (!pointerHovers()) return;
    timer.current = window.setTimeout(() => setOpenId(id), OPEN_DELAY);
  }, [clearTimer, id, setOpenId]);

  const scheduleClose = React.useCallback(() => {
    clearTimer();
    if (!pointerHovers()) return;
    // Functional, for the same reason as `onOpenChange`: by the time this
    // fires the reader may already have opened the other menu.
    timer.current = window.setTimeout(
      () => setOpenId((prev) => (prev === id ? null : prev)),
      CLOSE_DELAY,
    );
  }, [clearTimer, id, setOpenId]);

  return (
    <DropdownMenu.Root
      open={open}
      // Closing is a FUNCTIONAL update that only clears the slot if this menu
      // still holds it. Without that guard the two menus raced: clicking the
      // "Resources" trigger while "Sign in" was open fired Radix's
      // dismiss-outside for Sign in AND the open-toggle for Resources in the
      // same tick, and because both write to one shared slot, Sign in's
      // `onOpenChange(false)` landed last and wiped the menu the reader had
      // just asked for — so the click appeared to do nothing at all.
      onOpenChange={(next) => {
        clearTimer();
        setOpenId((prev) => (next ? id : prev === id ? null : prev));
      }}
      // See the note at the top of this file: this one prop is the fix for the
      // layout shift, the lost clicks and the stuck page.
      modal={false}
    >
      <DropdownMenu.Trigger
        aria-label={label}
        className={triggerClassName}
        onPointerEnter={(e) => e.pointerType === "mouse" && scheduleOpen()}
        onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
        // A trigger inside a <nav> of links is still a button, so a click or a
        // stray Enter can never navigate. Radix also calls `preventDefault()`
        // on the opening pointerdown, which is what stops the press from
        // bleeding through to whatever ends up under the pointer.
        type="button"
      >
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={8}
          // Keeps the panel inside the viewport on a narrow laptop instead of
          // running off the right edge under "Sign in".
          collisionPadding={12}
          avoidCollisions
          // `.site` because this element is portaled to <body>, outside the
          // site's token scope — without it the menu renders in the admin
          // theme's palette and typeface.
          className={cn(
            "site anim-pop z-50 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-pop",
            width,
          )}
          onPointerEnter={clearTimer}
          onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/** One row in a header menu: a title, an optional hint, and a real link. */
export function HeaderMenuItem({
  href,
  external,
  label,
  hint,
  icon: Icon,
  tile,
  current,
}: {
  href: string;
  /** An absolute URL into the product: a plain <a>, never a <Link>. */
  external?: boolean;
  label: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  /** Accent classes for the icon tile, from `lib/accents`. */
  tile?: string;
  current?: boolean;
}) {
  const body = (
    <>
      {Icon && (
        <span aria-hidden className={cn("grid size-9 shrink-0 place-items-center rounded-lg", tile)}>
          <Icon className="size-4.5" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        {hint && <span className="mt-0.5 block text-xs leading-snug text-muted">{hint}</span>}
      </span>
    </>
  );

  const className = cn(
    "flex cursor-pointer items-start gap-3 rounded-lg px-2.5 py-2.5 outline-none transition-colors",
    "data-[highlighted]:bg-surface focus-visible:bg-surface",
    current && "bg-primary-soft",
  );

  return (
    <DropdownMenu.Item asChild>
      {external ? (
        <a href={href} className={className} aria-current={current ? "page" : undefined}>
          {body}
        </a>
      ) : (
        <Link href={href} className={className} aria-current={current ? "page" : undefined}>
          {body}
        </Link>
      )}
    </DropdownMenu.Item>
  );
}

