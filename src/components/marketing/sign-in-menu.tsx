"use client";

import { DropdownMenu } from "radix-ui";
import { Briefcase, ChevronDown, LogIn, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { appHref } from "@/lib/site-config";

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

const PORTALS = [
  {
    href: appHref("/agent/login"),
    label: "Agent portal",
    hint: "Upload and manage policies",
    icon: Briefcase,
  },
  {
    href: appHref("/customer/login"),
    label: "Customer portal",
    hint: "View policies shared with you",
    icon: UserRound,
  },
] as const;

/** Dropdown for the desktop header. */
export function SignInMenu({ className }: { className?: string }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface",
          className,
        )}
      >
        <LogIn className="size-4" />
        Sign in
        <ChevronDown className="size-3.5 text-muted" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="anim-pop z-50 w-72 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-pop"
        >
          <p className="px-2.5 py-2 text-xs font-semibold text-muted">Which portal are you signing in to?</p>
          {PORTALS.map((p) => (
            <DropdownMenu.Item key={p.href} asChild>
              <a
                href={p.href}
                className="flex cursor-pointer items-start gap-3 rounded-lg px-2.5 py-2.5 outline-none data-[highlighted]:bg-surface"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                  <p.icon className="size-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{p.label}</span>
                  <span className="mt-0.5 block text-xs text-muted">{p.hint}</span>
                </span>
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
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
          className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
        >
          <p.icon className="size-4 text-primary" />
          Sign in — {p.label.replace(" portal", "")}
        </a>
      ))}
    </>
  );
}
