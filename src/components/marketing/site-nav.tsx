"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// The public site's navigation.
//
// A client component only because the mobile menu has open/closed state and
// has to close itself on navigation. The links themselves are plain <Link>s,
// so the site still works with JavaScript disabled — the menu button is the
// only thing that needs it, and below `shell` the links are also reachable
// from the footer.

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

export function SiteNav({
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
  const [open, setOpen] = React.useState(false);

  // Any navigation closes the menu, including a back gesture.
  //
  // The lint rule against setState in an effect is right in general and wrong
  // here: the external system being synchronised from IS the URL, which
  // `usePathname` only exposes as a render value. There is no state to derive
  // it from — the drawer's openness is not a function of the path, it just
  // has to end when the path changes — and the alternative, remounting the
  // nav on a `key={path}`, would throw away the header on every navigation.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setOpen(false), [path]);

  // While the drawer is open the page behind it must not scroll, or a tap on
  // the overlay scrolls the content instead of dismissing the menu.
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
  }, [open]);

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
          return (
            <DropdownMenu.Root key={n.href}>
              <DropdownMenu.Trigger className={cn(itemClass, "inline-flex items-center gap-1.5")}>
                {n.label}
                <ChevronDown className="size-3.5 opacity-70 transition-transform duration-200 data-[state=open]:rotate-180" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={8}
                  className="anim-pop z-50 w-64 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-pop"
                >
                  {n.children.map((c) => (
                    <DropdownMenu.Item key={c.href} asChild>
                      <Link
                        href={c.href}
                        className="flex cursor-pointer flex-col rounded-lg px-2.5 py-2 outline-none data-[highlighted]:bg-surface"
                      >
                        <span className="text-sm font-semibold text-foreground">{c.label}</span>
                        {c.hint && <span className="mt-0.5 text-xs text-muted">{c.hint}</span>}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 sm:flex shell:gap-3">{actions}</div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
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
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-30 cursor-default bg-foreground/40 shell:hidden"
          />
          <div
            id="site-menu"
            className="anim-rise absolute inset-x-0 top-16 z-40 border-b border-border bg-background p-4 shadow-pop shell:hidden"
          >
            <nav aria-label="Main" className="flex flex-col gap-1">
              {items.map((n) => {
                const current = isCurrent(path, n.href);
                return (
                  <React.Fragment key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                        current ? "bg-primary-soft text-primary" : "text-foreground hover:bg-surface",
                      )}
                    >
                      {n.label}
                    </Link>
                    {n.children?.map((c) => {
                      const childCurrent = isCurrent(path, c.href);
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          aria-current={childCurrent ? "page" : undefined}
                          className={cn(
                            "ml-3 rounded-lg border-l border-border px-3 py-2.5 text-sm transition-colors",
                            childCurrent ? "text-primary" : "text-foreground/80 hover:bg-surface",
                          )}
                        >
                          {c.label}
                        </Link>
                      );
                    })}
                  </React.Fragment>
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
