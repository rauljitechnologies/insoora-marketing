"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderMenu, HeaderMenuItem, HeaderMenuProvider, useHeaderMenus } from "./header-menu";

// The public site's navigation.
//
// A client component only because the mobile menu has open/closed state and
// has to close itself on navigation. The links themselves are plain <Link>s,
// so the site still works with JavaScript disabled — the menu button is the
// only thing that needs it, and below `shell` the links are also reachable
// from the footer.
//
// The drawer and both header dropdowns share ONE piece of state, provided by
// `HeaderMenuProvider` here and read by `HeaderMenu` (Resources) and
// `SignInMenu` (rendered inside this component as `actions`). That is what
// makes them mutually exclusive: there is no combination of clicks that can
// leave two panels open on top of each other. See `header-menu.tsx` for the
// dropdown behaviour itself.

export interface SiteNavItem {
  href: string;
  label: string;
  /** True when `href` is an absolute URL into the product rather than a page
   *  on this site. Those must not be <Link>s: there is no client-side route
   *  to prefetch across an origin. Only the footer carries any. */
  external?: boolean;
  /** Turns this entry into a dropdown.
   *
   *  The trigger is a BUTTON, not a link — that is the correct control for a
   *  menu, and it is what gives Radix the keyboard contract. So `href` is not
   *  rendered in the header for an entry with children; it is kept only to
   *  key the entry and to mark it current. Every child page therefore also
   *  needs a plain link somewhere crawlable — the footer carries all three. */
  children?: { href: string; label: string; hint?: string }[];
}

/** Marks the current page, treating "/" as exact and the rest as prefixes.
 *
 *  An in-page anchor ("/#features") is never "current". It used to strip the
 *  hash and compare what was left — which for a link on the home page is just
 *  "/", so on the home page BOTH "Home" and "Features" lit up as the current
 *  page at once. Which section of a page the reader is looking at is a scroll
 *  position, not a route, and the nav should not guess at it. */
function isCurrent(path: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

const DRAWER = "drawer";

export function SiteNav(props: {
  items: SiteNavItem[];
  actions: React.ReactNode;
  drawerActions?: React.ReactNode;
}) {
  return (
    <HeaderMenuProvider>
      <SiteNavInner {...props} />
    </HeaderMenuProvider>
  );
}

function SiteNavInner({
  items,
  actions,
  /** Shown in the mobile drawer in place of `actions`, when the two should
   *  differ — a header dropdown becomes plain links inside a drawer. */
  drawerActions,
}: {
  items: SiteNavItem[];
  actions: React.ReactNode;
  drawerActions?: React.ReactNode;
}) {
  const path = usePathname();
  const { openId, setOpenId } = useHeaderMenus();
  const open = openId === DRAWER;
  // Functional, so closing the drawer cannot clobber a dropdown that has
  // already claimed the slot in the same tick — see `header-menu.tsx`.
  const setOpen = React.useCallback(
    (next: boolean) => setOpenId((prev) => (next ? DRAWER : prev === DRAWER ? null : prev)),
    [setOpenId],
  );

  // Any navigation closes whatever is open — the drawer, or either dropdown
  // — including on a back gesture.
  //
  // The external system being synchronised from IS the URL, which
  // `usePathname` only exposes as a render value. There is no state to derive
  // this from: the header's openness is not a function of the path, it just
  // has to end when the path changes. The alternative, remounting the nav on
  // a `key={path}`, would throw away the header on every navigation.
  React.useEffect(() => setOpenId(null), [path, setOpenId]);

  // While the drawer is open the page behind it must not scroll, or a tap on
  // the overlay scrolls the content instead of dismissing the menu.
  //
  // Only the DRAWER does this. The header dropdowns deliberately do not lock
  // scrolling (`modal={false}`) — when they did, the scrollbar vanished, the
  // page shifted sideways, and the trigger moved out from under the pointer
  // mid-click. Two independent owners of `body.style.overflow` could also
  // restore each other's value and leave the page stuck; now there is one.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      {/* Desktop links */}
      <nav aria-label="Main" className="hidden items-center gap-1 shell:flex">
        {items.map((n) => {
          const current =
            isCurrent(path, n.href) || (n.children ?? []).some((c) => isCurrent(path, c.href));
          const itemClass = cn(
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            current ? "bg-primary-soft text-primary" : "text-foreground/80 hover:bg-surface hover:text-foreground",
          );

          if (!n.children) {
            return (
              <Link key={n.href} href={n.href} aria-current={current ? "page" : undefined} className={itemClass}>
                {n.label}
              </Link>
            );
          }

          // Radix handles the keyboard contract a hand-rolled menu gets
          // wrong: Escape to close, arrow keys between items, focus returned
          // to the trigger on close, and `aria-expanded` kept in step.
          // `HeaderMenu` adds the parts Radix leaves out — hover-to-open on a
          // mouse, a close delay long enough to cross the gap into the panel,
          // and one-menu-at-a-time.
          return (
            <HeaderMenu
              key={n.href}
              id={`nav:${n.href}`}
              triggerClassName={cn(itemClass, "group inline-flex items-center gap-1.5")}
              trigger={
                <>
                  {n.label}
                  <ChevronDown
                    aria-hidden
                    className="size-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </>
              }
            >
              {n.children.map((c) => (
                <HeaderMenuItem
                  key={c.href}
                  href={c.href}
                  label={c.label}
                  hint={c.hint}
                  current={isCurrent(path, c.href)}
                />
              ))}
            </HeaderMenu>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 sm:flex shell:gap-3">{actions}</div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-surface shell:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer. Rendered below the header, so it starts under it. */}
      {open && (
        <>
          {/* The scrim, PORTALED to <body>.
              
              It was a `fixed inset-0` element inside the header — and the
              header carries `backdrop-blur-[12px]`. A backdrop-filter makes
              an element the containing block for its fixed-position
              descendants, so `inset-0` resolved against the 64px-tall header
              instead of the viewport and `top-16` then collapsed it to zero
              height. The scrim existed, covered nothing, and "tap outside to
              close" had no target to tap: on a phone the only way out of the
              drawer was the X. Portaled to <body> it is outside that
              containing block and covers the viewport as intended. */}
          {typeof document !== "undefined" &&
            createPortal(
              <button
                type="button"
                tabIndex={-1}
                aria-hidden
                onClick={() => setOpen(false)}
                className="site fixed inset-0 top-16 z-30 cursor-default bg-foreground/40 shell:hidden"
              />,
              document.body,
            )}
          <div
            id="site-menu"
            // Capped and scrollable, for two reasons. With the body locked, a
            // drawer taller than the viewport would put its last links and
            // the Get Started button out of reach on a short phone. And the
            // cap is 8rem rather than 4rem so a strip of the scrim is always
            // left showing beneath it — on a 664px phone the drawer filled
            // the screen edge to edge, which left "tap outside to close" with
            // nothing to tap.
            className="anim-rise absolute inset-x-0 top-16 z-40 max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain border-b border-border bg-background p-4 shadow-pop shell:hidden"
          >
            <nav aria-label="Main" className="flex flex-col gap-1">
              {items.map((n) => {
                const current = isCurrent(path, n.href);

                // A grouped entry is a HEADING in the drawer, not a link.
                //
                // It used to be a <Link> to the group's own href while its
                // children were listed directly underneath — so tapping
                // "Resources" navigated to /faq, which is also the first
                // child. A tap on what looks like a disclosure control
                // taking you to a page is the accidental navigation this
                // drawer should not have; nothing is lost, because every
                // child is a link right below it.
                if (n.children?.length) {
                  return (
                    <div key={n.href} className="flex flex-col gap-1 pt-1">
                      <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                        {n.label}
                      </p>
                      {n.children.map((c) => {
                        const childCurrent = isCurrent(path, c.href);
                        return (
                          <Link
                            key={c.href}
                            href={c.href}
                            aria-current={childCurrent ? "page" : undefined}
                            className={cn(
                              "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                              childCurrent
                                ? "bg-primary-soft text-primary"
                                : "text-foreground hover:bg-surface",
                            )}
                          >
                            {c.label}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      current ? "bg-primary-soft text-primary" : "text-foreground hover:bg-surface",
                    )}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3 sm:hidden">
              {drawerActions ?? actions}
            </div>
          </div>
        </>
      )}
    </>
  );
}
