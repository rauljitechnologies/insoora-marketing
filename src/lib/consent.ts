// The visitor's analytics-cookie choice.
//
// One module so the banner, the script loader and the footer's "Cookie
// settings" control all read and write the same key and hear the same event —
// three components that must never disagree about whether consent was given.
//
// ── What this is and is not ──────────────────────────────────────────────
//
// This records ONE choice by ONE visitor in ONE browser: may Google Analytics
// load on the public website. That is all it is for.
//
// It is explicitly NOT a consent manager in the sense of the Digital Personal
// Data Protection Rules, 2025, and it is not a record of consent for
// processing personal data in the platform. A DPDP consent record has to be
// kept by the Data Fiduciary, be auditable, and survive the visitor clearing
// their browser; this is a `localStorage` entry that the visitor can erase and
// that never reaches our servers. Rule 4 of those Rules — registration of a
// Consent Manager — commences on 13 November 2026 and concerns registered
// third-party platforms, not a cookie banner. Nothing here should be
// described to anyone as DPDP consent infrastructure.

/** The `localStorage` key. Namespaced, because the key lives on a shared origin. */
export const CONSENT_KEY = "insoora.analytics-consent";

/** Fired after a choice is stored, so a mounted listener can react at once. */
export const CONSENT_CHANGED = "insoora:consent-changed";

/** Fired by the footer control to bring the banner back for a second choice. */
export const CONSENT_REOPEN = "insoora:consent-reopen";

/** `null` means the visitor has not chosen yet — which is NOT consent. */
export type ConsentChoice = "granted" | "denied";

/**
 * The stored choice, or `null` if there is none.
 *
 * Every access is wrapped: `localStorage` is not merely empty in a private
 * window or with site data cleared, the accessor itself THROWS in a browser
 * configured to block storage. An exception here would take the banner — and
 * with it the whole footer — down with it, so an unreadable store is treated
 * as "no choice made", which is the safe reading: no choice means no
 * analytics.
 */
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Stores the choice and tells the page about it.
 *
 * The event is dispatched even if the write failed. A visitor who clicks
 * "Accept" in a browser that blocks storage should still get analytics for
 * that page view and should still see the banner close — the choice just
 * cannot be remembered for next time, which is the browser's decision and
 * not a reason to ignore the click.
 */
export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Not fatal; see above.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: choice }));
}

/** Reopens the banner so a visitor can change their mind. */
export function reopenConsent(): void {
  window.dispatchEvent(new Event(CONSENT_REOPEN));
}

/**
 * Subscribes to changes in the stored choice, for `useSyncExternalStore`.
 *
 * Two sources, both of which matter:
 *
 *   * `CONSENT_CHANGED` — this tab's own click. A `localStorage` write does
 *     not notify the tab that made it, so without this the banner would not
 *     close until something else re-rendered.
 *   * `storage` — ANOTHER tab's click. The browser fires it on every other
 *     tab of the origin, so accepting in one tab stops the banner nagging in
 *     the three others the visitor left open, and declining in one does not
 *     leave analytics running in another.
 *
 * Returns the unsubscribe function the hook requires.
 */
export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The server snapshot: `undefined`, meaning "the store has not been read".
 *
 * Deliberately a third value rather than `null`. `null` means "read, and the
 * visitor has not chosen", which is what makes the banner appear — and
 * returning that from the server would render the banner into the HTML for
 * every visitor, including everyone who answered weeks ago, who would then
 * watch it vanish on hydration. `undefined` renders nothing until the real
 * choice is known.
 *
 * A named function rather than an inline arrow so its identity is stable
 * across renders, which is what the hook wants.
 */
export function readNoConsentYet(): ConsentChoice | null | undefined {
  return undefined;
}
