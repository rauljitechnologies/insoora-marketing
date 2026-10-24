"use client";

import { Briefcase, ChevronDown, LogIn, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { appHref } from "@/lib/site-config";
import { ACCENT_TILE } from "@/lib/accents";
import { HeaderMenu, HeaderMenuItem } from "./header-menu";

// "Sign in" on the public site.
//
// The three portals are separate products with separate sign-in pages, and a
// visitor arriving from the website knows which one they are — an agent or a
// customer — but the header cannot know. Sending everyone to one login and
// letting the server bounce the wrong half (403 WRONG_PORTAL) is a worse
// first impression than simply asking.
//
// Admin is deliberately absent: staff know their URL, and advertising an
// admin door on a marketing page invites attention it does not need.
//
// Both doors are on the PRODUCT's origin, not this one — plain anchors, not
// <Link>s, because there is no client-side route across an origin for Next to
// prefetch. `appHref` is a build-time constant (NEXT_PUBLIC_APP_URL), so this
// stays a client component with no runtime lookup.
//
// The dropdown itself is `HeaderMenu`, shared with the nav's "Resources"
// menu: same open/close behaviour, same hover forgiveness, and one shared
// "which panel is open" so this menu and that one can never both be up at
// once. See header-menu.tsx for why the old plain `DropdownMenu.Root` broke.
//
// The two doors wear DIFFERENT accent tiles rather than one blue. Which door
// a visitor wants is the only decision this menu asks them to make, and the
// agent/customer split is the same violet-and-blue pair the product uses for
// its two portals — so the colours here are a hint, not decoration.

const PORTALS = [
  {
    href: appHref("/agent/login"),
    label: "Agent portal",
    hint: "Upload and manage policies",
    icon: Briefcase,
    tile: ACCENT_TILE.purple,
  },
  {
    href: appHref("/customer/login"),
    label: "Customer portal",
    hint: "View policies shared with you",
    icon: UserRound,
    tile: ACCENT_TILE.blue,
  },
] as const;

/** Dropdown for the desktop header. */
export function SignInMenu({ className }: { className?: string }) {
  return (
    <HeaderMenu
      id="sign-in"
      align="end"
      width="w-72"
      triggerClassName={cn(
        "group h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-primary-soft/60 hover:text-primary data-[state=open]:border-primary/35 data-[state=open]:bg-primary-soft/60 data-[state=open]:text-primary",
        // `inline-flex` is applied by the caller's `className` on the home
        // page header (`hidden sm:inline-flex`), which also controls when the
        // control appears at all — so it must come last.
        className,
      )}
      trigger={
        <>
          <LogIn aria-hidden className="size-4" />
          Sign in
          <ChevronDown
            aria-hidden
            className="size-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </>
      }
    >
      <p className="px-2.5 py-2 text-xs font-semibold text-muted">
        Which portal are you signing in to?
      </p>
      {PORTALS.map((p) => (
        <HeaderMenuItem
          key={p.href}
          href={p.href}
          external
          label={p.label}
          hint={p.hint}
          icon={p.icon}
          tile={p.tile}
        />
      ))}
    </HeaderMenu>
  );
}

/**
 * The same choice as plain links, for the mobile drawer.
 *
 * A dropdown inside an already-open drawer is a menu inside a menu; at that
 * width there is room to just show both doors.
 */
export function SignInLinks() {
  return (
    <>
      {PORTALS.map((p) => (
        <a
          key={p.href}
          href={p.href}
          className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-primary-soft/60"
        >
          <span aria-hidden className={cn("grid size-7 shrink-0 place-items-center rounded-md", p.tile)}>
            <p.icon className="size-4" />
          </span>
          Sign in — {p.label.replace(" portal", "")}
        </a>
      ))}
    </>
  );
}
