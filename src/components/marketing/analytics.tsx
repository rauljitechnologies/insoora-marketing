"use client";

import * as React from "react";
import Script from "next/script";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Container } from "./section";
import { ACCENT_TILE } from "@/lib/accents";
import { cn } from "@/lib/utils";
import {
  CONSENT_REOPEN,
  readConsent,
  readNoConsentYet,
  subscribeToConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

// Google's two tags — and the consent gate in front of them.
//
// ── Why there is a gate at all ───────────────────────────────────────────
// Analytics cookies are not necessary for this website to work, so they are
// not covered by any "strictly necessary" reasoning: they are set because we
// would like to count visits. These tags previously loaded on every page view
// with no choice offered, which meant the Privacy Policy had to describe
// cookies being set before the visitor knew about them. The honest fix is the
// one implemented here — ask first, and load nothing until the answer is yes.
//
// This is a real gate, not a dismissable notice. Until a choice is stored no
// Google script is in the document at all, so no `_ga` cookie exists and no
// request reaches googletagmanager.com. "Decline" is sticky and loads nothing.
//
// It is NOT a DPDP consent manager, and `lib/consent` says so at length.
//
// ── Why this is a client component now ───────────────────────────────────
// It has to read a per-visitor choice out of `localStorage`, which only
// exists in the browser. The scripts themselves are still `next/script`, so
// each remote file loads once per session and the inline bootstrap stays
// ordered behind it rather than re-executing on every client navigation.
//
// ── Why `afterInteractive` ───────────────────────────────────────────────
// Google asks for the container "as high in the <head> as possible", which is
// `beforeInteractive` — and that blocks the page's own JavaScript behind a
// third-party download for tags that measure traffic rather than render it.
// `afterInteractive` runs them at the first interactive moment: early enough
// that a short visit is recorded, late enough not to compete with hydration.
// (`lazyOnload` waits for idle, which loses the bounce traffic analytics
// exists to measure.) Here they cannot run before consent in any case.
//
// ── Both tags, deliberately ──────────────────────────────────────────────
// gtag.js reports to the GA4 property directly; GTM is the container for
// anything added later from the Tag Manager UI. If a GA4 tag is ALSO
// configured inside the container the same page_view is counted twice — so
// the container must not carry one while the snippet below is here.
//
// ── Why the <noscript> fallback is gone ──────────────────────────────────
// Google's instructions include a GTM <iframe> in a <noscript> for visitors
// with JavaScript disabled. It cannot stay: such a visitor can never reach
// the banner, so firing the container for them would set analytics cookies
// from someone who was never asked. No script, no iframe, no analytics —
// which is the correct outcome, not a degraded one.

/** The GA4 property these pages report to. */
const GA_MEASUREMENT_ID = "G-C683RQCP76";

/** The Tag Manager container. */
const GTM_CONTAINER_ID = "GTM-5943B5QG";

/**
 * Production only.
 *
 * `next dev` reloads a page dozens of times an hour and every one would land
 * in the same property as real traffic; there is no development property to
 * separate them into, and a GA4 report cannot un-mix them afterwards.
 *
 * The BANNER is gated on the same flag, on purpose: a banner shown where no
 * tag could load would be asking permission for cookies that are not set,
 * which is its own small lie. To see the gate working, build and start the
 * site locally (`npm run build && npm start`) rather than running `next dev`.
 *
 * `NODE_ENV` rather than the site's `siteUrlIsConfigured()` indexing switch:
 * a preview deployment is still a real deployment someone is looking at,
 * whereas suppressing the tags whenever the canonical domain is unset would
 * report nothing from the very deployment being checked.
 */
const ENABLED = process.env.NODE_ENV === "production";

/**
 * The consent gate and, behind it, the tags.
 *
 * Rendered from the root layout so it covers every route.
 *
 * gtag.js sends the first `page_view` itself, and client-side navigations are
 * covered by GA4's Enhanced measurement ("Page changes based on browser
 * history events"), which is on by default — so there is deliberately no
 * route-change listener here. Adding one while that setting is on produces
 * two page_views per navigation, which is worse than none.
 */
export function Analytics() {
  // The stored choice, read through `useSyncExternalStore`.
  //
  // `localStorage` plus a `CustomEvent` IS an external store, and this is the
  // hook for subscribing to one. The first implementation read it with
  // `setChoice(readConsent())` inside an effect, which lint correctly
  // rejected: that is a cascading render, and the recommended pattern for
  // "React does not own this value" is this hook.
  //
  // The server snapshot is `undefined`, which is a third state meaning "not
  // read yet" and is distinct from `null`, meaning "read, and no choice was
  // made". React renders the server snapshot during SSR and the hydration
  // pass, then re-renders with the client snapshot — so nothing is emitted
  // for a visitor who already answered, and the banner never flashes at
  // someone who accepted months ago. Returning `null` here instead would put
  // the banner into the server HTML for everyone.
  const choice = React.useSyncExternalStore(subscribeToConsent, readConsent, readNoConsentYet);

  // Whether the footer control has asked for the banner back. This is genuine
  // UI state rather than stored state — it is not remembered, and it is set
  // from an event callback, never synchronously in an effect body.
  const [reopened, setReopened] = React.useState(false);

  React.useEffect(() => {
    const onReopen = () => setReopened(true);
    window.addEventListener(CONSENT_REOPEN, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN, onReopen);
  }, []);

  if (!ENABLED) return null;

  const granted = choice === "granted";
  // Asked when the store has been read and holds no choice, or when the
  // footer control brought the banner back.
  const asking = choice !== undefined && (choice === null || reopened);

  /** Stores the answer and closes the banner, including a reopened one. */
  const choose = (next: ConsentChoice) => {
    writeConsent(next);
    setReopened(false);
  };

  return (
    <>
      {granted && (
        <>
          {/* Tag Manager first, so anything the container fires has the whole
              page available to it. An inline script MUST carry an id — that
              is how Next tracks it and keeps it from running twice. */}
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
          </Script>

          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}

      {asking && <ConsentBanner onChoose={choose} />}
    </>
  );
}

/**
 * The banner.
 *
 * Accept and Decline are equally prominent, and neither is pre-selected:
 * a decline that is visually buried, or a dialog whose only exit is consent,
 * is not a choice. There is no close button for the same reason — closing a
 * cookie notice without answering is routinely treated as consent, and
 * nothing here should be able to mean that.
 *
 * `role="dialog"` rather than `alertdialog`: it is not an error, and it does
 * not steal focus from someone mid-sentence on the page. It sits at the
 * bottom, above the footer, and does not trap focus — the page stays usable
 * while it is open, because declining and reading are both legitimate.
 */
function ConsentBanner({ onChoose }: { onChoose: (choice: ConsentChoice) => void }) {
  const heading = React.useId();
  const body = React.useId();

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={heading}
      aria-describedby={body}
      // `pb-[env(safe-area-inset-bottom)]` so it clears a phone's home
      // indicator rather than sitting under it.
      className="anim-rise fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] shadow-pop backdrop-blur-[12px]"
    >
      <Container className="flex flex-col gap-4 py-4 shell:flex-row shell:items-center shell:justify-between shell:gap-8 shell:py-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className={cn("mt-0.5 grid size-9 flex-none place-items-center rounded-xl", ACCENT_TILE.teal)}
          >
            <Cookie className="size-4" />
          </span>
          <div className="min-w-0">
            <p id={heading} className="text-sm font-bold text-foreground">
              Can we count this visit?
            </p>
            <p id={body} className="mt-1 text-[13px] leading-relaxed text-muted">
              We&apos;d like to use Google Analytics to see which pages get read. It is not needed for
              the site to work, so it only loads if you say yes. Nothing is loaded while you decide.{" "}
              {/* Deep-links to the Privacy Policy's cookies section. The
                  anchor is `<index>-<slugified heading>` (lib/legal/content
                  #sectionId) and is NOT derived here on purpose: importing
                  the legal content into this client component would pull
                  every word of all three documents into the browser bundle
                  to compute one fragment. If a section is inserted above
                  "Cookies and analytics", update the number — a stale
                  anchor lands the reader at the top of the policy rather
                  than breaking the link. */}
              <Link
                href="/privacy-policy#15-cookies-and-analytics"
                className="font-medium text-primary hover:underline"
              >
                How we use cookies
              </Link>
            </p>
          </div>
        </div>

        {/* Decline first in the DOM on purpose: it is the option that needs no
            justification, and a keyboard user reaches it without passing
            through Accept. Both controls are the same size and weight. */}
        <div className="flex flex-none flex-col-reverse gap-2 min-[420px]:flex-row min-[420px]:items-center">
          <button
            type="button"
            onClick={() => onChoose("denied")}
            className="h-10 rounded-md border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => onChoose("granted")}
            className="h-10 rounded-md px-5 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(124,58,237,.8)] transition-transform hover:-translate-y-px focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Accept
          </button>
        </div>
      </Container>
    </div>
  );
}

/**
 * The footer's "Cookie settings" control.
 *
 * Consent has to be withdrawable as easily as it was given, and without this
 * the only way to undo an "Accept" would be to clear site data — which most
 * visitors neither know how to do nor should have to. Clicking it reopens the
 * banner, where either answer is available again.
 *
 * Gated on the same `ENABLED` flag as the tags: outside production there is
 * no banner to reopen, and a control that visibly does nothing is worse than
 * an absent one.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!ENABLED) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
