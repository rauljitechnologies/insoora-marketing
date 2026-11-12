"use client";

import * as React from "react";
import Script from "next/script";

// The Google Website Translator, in the footer.
//
// ── Read this before changing anything here ──────────────────────────────
//
// This widget was chosen over real translated pages with a deliberate,
// stated trade-off, and the trade-off is worth writing down because the
// costs are invisible from the outside and someone will otherwise "fix"
// them later by accident.
//
//   1. IT PRODUCES NO SEO VALUE. Google does not index widget-translated
//      text. The translation happens in the visitor's browser by rewriting
//      the DOM, so there is no Gujarati URL and no Hindi URL — nothing for a
//      crawler to fetch, nothing to put in the sitemap, nothing to rank. A
//      Gujarati speaker searching in Gujarati will not find this site
//      because of this widget. Only real `/gu/` and `/hi/` pages with
//      `hreflang` would do that.
//   2. IT IS A DISCONTINUED PRODUCT. Google closed the Website Translator
//      to new sites in 2019. `translate_a/element.js` still answers, but it
//      is unsupported and can stop working without notice or warning.
//   3. THE ATTRIBUTION IS HIDDEN, AGAINST GOOGLE'S TERMS. The widget
//      renders a "Powered by Google Translate" credit and Google's terms
//      for the Website Translator require it stay visible. `globals.css`
//      hides it, at the business's explicit instruction and after the
//      conflict was put to them twice. This is a deliberate, owned
//      decision rather than an oversight — whoever reads this next should
//      know it was not missed, and that reversing it is a one-line CSS
//      change if the position ever changes.
//
// What it buys in exchange is coverage: every page, every blog article,
// three languages, today. That was the explicit instruction.
//
// ── On the top banner ────────────────────────────────────────────────────
//
// Once a language is picked, Google injects a fixed toolbar iframe at the
// top of the document and sets `body { top: 40px }` to make room for it.
// This site has a `sticky top-0` header, which that offset drives straight
// under the toolbar — the header and the toolbar overlap and the navigation
// becomes unclickable.
//
// `globals.css` neutralises the body offset and the toolbar. That part is a
// LAYOUT fix and would be correct regardless; it is separate from the
// attribution being hidden, which is point 3 above and is not a layout
// matter at all. Two different rules, two different reasons — do not
// collapse them into one "hide the Google stuff" block.
//
// ── On privacy ───────────────────────────────────────────────────────────
//
// Translating a page sends its text to Google and sets a `googtrans` cookie.
// That is a third-party transfer the Privacy Policy does not currently
// describe, and it is NOT behind the analytics consent gate — gating it
// would mean a Gujarati speaker has to accept analytics cookies before they
// can read the page, which is worse. The Privacy Policy needs a line about
// it; see the note in the handover rather than assuming it is covered.

/** The three languages offered, as Google's language codes. */
const LANGUAGES = "en,hi,gu";

/** The element Google mounts its control into. */
const MOUNT_ID = "insoora-language-select";

/** Google's loader calls this by name, so it has to be a global. */
const CALLBACK = "insooraTranslateInit";

interface TranslateElementCtor {
  new (options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean }, el: string): unknown;
}

declare global {
  interface Window {
    [CALLBACK]: (() => void) | undefined;
    google?: { translate?: { TranslateElement?: TranslateElementCtor } };
  }
}

/** Set once the control has been mounted, so a client navigation back to a
 *  page carrying this does not stack a second copy into the container. */
let mounted = false;

function init(): void {
  const Ctor = window.google?.translate?.TranslateElement;
  const host = document.getElementById(MOUNT_ID);
  if (!Ctor || !host) return;
  // Google appends into the host rather than replacing, so an empty check is
  // what stops a second select appearing beside the first.
  if (mounted && host.childElementCount > 0) return;

  new Ctor(
    {
      pageLanguage: "en",
      includedLanguages: LANGUAGES,
      // `false` deliberately: autoDisplay translates on arrival based on the
      // browser's language, which would serve a machine translation to
      // someone who never asked for one — and, worse, to a crawler.
      autoDisplay: false,
    },
    MOUNT_ID,
  );
  mounted = true;

  // Google builds its <select> asynchronously after the constructor
  // returns, so the name has to be attached once it exists rather than
  // immediately. One retry loop, bounded, and silent if it never appears —
  // a missing label must not throw inside a third-party callback.
  let tries = 0;
  const name = () => {
    const sel = document.getElementById(MOUNT_ID)?.querySelector("select");
    if (sel) {
      sel.setAttribute("aria-label", "Translate this page — English, Hindi or Gujarati");
      return;
    }
    if (++tries < 20) window.setTimeout(name, 150);
  };
  name();
}

// Assigned at module scope rather than inside an effect, because Google's
// loader may run before React's effects do. `?cb=` names this function, and
// if it is not defined by the time the script finishes the widget silently
// never appears.
if (typeof window !== "undefined") {
  window[CALLBACK] = init;
}

export function LanguageTranslate({ className }: { className?: string }) {
  // Covers the second mount: on a client-side navigation the script is
  // already loaded and will not call the callback again.
  React.useEffect(() => {
    if (window.google?.translate?.TranslateElement) init();
  }, []);

  return (
    <div className={className}>
      {/* No heading and no list of language names: the control is the whole
          control, and its own first option reads "Select Language", which
          says what it is. Asked for as a space saving in the footer.

          The visible label going away is why `init` sets an `aria-label` on
          Google's select — a bare dropdown with no accessible name is
          announced as just "combo box", and the one thing a screen reader
          user cannot do is look at it and infer the rest. */}
      <div id={MOUNT_ID} className="translate-mount" />

      {/* `lazyOnload`, not `afterInteractive`, and the difference is
          measured rather than assumed.

          This widget is the most expensive thing on the site by some
          distance: 127 KB over the wire, 72 KB of it never executed, and
          the only reason the Lighthouse best-practices score is not 100
          (it sets a third-party cookie). On `afterInteractive` it loaded
          straight after hydration — inside the window the page is still
          painting — and a mobile run of the home page measured it at
          0.5s of LCP and 20ms of blocking time.

          `lazyOnload` waits for the load event and the browser going idle,
          which takes the whole of that cost out of the paint path. It is
          safe to defer because of where this sits: a language picker in
          the footer, below the fold on every page, which nobody reaches in
          the first second.

          The cost of deferring, stated plainly: a returning visitor who
          has already chosen Hindi or Gujarati has a `googtrans` cookie,
          and Google re-applies the translation when this script runs. So
          they see English for about a second longer than they did before.
          That happened on `afterInteractive` too — this makes the gap
          wider, not new. If that second matters more than the paint, move
          this back; nothing else has to change. */}
      <Script
        src={`https://translate.google.com/translate_a/element.js?cb=${CALLBACK}`}
        strategy="lazyOnload"
      />
    </div>
  );
}
