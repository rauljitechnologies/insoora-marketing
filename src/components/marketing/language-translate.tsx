"use client";

import * as React from "react";
import Script from "next/script";
import { Languages } from "lucide-react";

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
//   3. THE GOOGLE BRANDING IS NOT OPTIONAL. The widget renders its own
//      "Powered by Google Translate" attribution and Google's terms require
//      it stay visible. Do not hide it with CSS. The original request was
//      for a translator with no Google branding anywhere; that combination
//      does not exist, and keeping the attribution is the half of it that
//      is allowed.
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
// `globals.css` neutralises the body offset and the toolbar. That is a
// LAYOUT fix, not brand removal: the attribution Google's terms require is
// the "Powered by Google Translate" line inside the widget itself, which is
// untouched and visible in the footer on every page.
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
      <strong className="flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[#A5B4FC]">
        <Languages aria-hidden className="size-3.5" />
        Language
      </strong>

      {/* The label is ours and the control is Google's. Naming the three
          languages in their own scripts is the part a Gujarati or Hindi
          reader can actually recognise — Google's control renders its option
          list in English until it has been used once. */}
      <p className="mt-2 text-sm leading-[1.6] text-[#94A3B8]">
        English · <span lang="hi">हिन्दी</span> · <span lang="gu">ગુજરાતી</span>
      </p>

      {/* Google mounts its select, and its required attribution, in here.
          `translate-mount` is styled in globals.css — the select is given the
          footer's colours so it does not arrive as a white system dropdown on
          a navy background. The attribution is left exactly as Google draws
          it. */}
      <div id={MOUNT_ID} className="translate-mount mt-2.5" />

      <Script
        src={`https://translate.google.com/translate_a/element.js?cb=${CALLBACK}`}
        strategy="afterInteractive"
      />
    </div>
  );
}
