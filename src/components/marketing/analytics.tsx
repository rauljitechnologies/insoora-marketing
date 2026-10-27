import Script from "next/script";

// Google's two tags: the GA4 property, and the Tag Manager container.
//
// ── Why `next/script` and not the pasted <script> tags ──
// Google's instructions are written for a hand-built HTML page. Dropped into
// a React tree as raw tags they lose the one guarantee they depend on: an
// inline <script> in a Server Component has no id, so Next cannot dedupe it
// across a client-side navigation and the snippet re-executes on every route
// change — `gtm.start` re-stamped and `gtag('js')` run again each time.
// `next/script` loads each remote file once per session, keeps the inline
// bootstrap ordered behind it, and leaves both alone on navigation.
//
// ── Why `afterInteractive` and not `beforeInteractive` ──
// Google asks for the container "as high in the <head> as possible", which
// is `beforeInteractive` — and that strategy blocks the page's own JavaScript
// behind a third-party download for a site whose tags measure traffic rather
// than render it. `afterInteractive` runs the tags at the first interactive
// moment instead: early enough that a short visit is still recorded, late
// enough that it does not compete with hydration. (`lazyOnload` waits for
// idle, which loses exactly the bounce traffic analytics exists to measure.)
//
// ── Both tags, deliberately ──
// gtag.js reports to the GA4 property directly; GTM is the container for
// anything added later from the Tag Manager UI. If a GA4 tag is ALSO
// configured inside the container, the same page_view is counted twice —
// so the container must not carry one while the snippet below is here.

/** The GA4 property these pages report to. */
const GA_MEASUREMENT_ID = "G-C683RQCP76";

/** The Tag Manager container. */
const GTM_CONTAINER_ID = "GTM-5943B5QG";

/**
 * Production only — for both components below.
 *
 * `next dev` reloads a page dozens of times an hour, and every one of those
 * would land in the same property as real traffic; there is no development
 * property to separate them into, and a GA4 report cannot un-mix them
 * afterwards. `NODE_ENV` is the gate rather than the site's
 * `siteUrlIsConfigured()` indexing switch: a preview deployment is still a
 * real deployment someone is looking at, whereas suppressing the tags
 * whenever the canonical domain is unset would report nothing from the very
 * deployment being checked.
 */
const ENABLED = process.env.NODE_ENV === "production";

/**
 * The tags themselves, rendered from the root layout so they cover every
 * route.
 *
 * gtag.js sends the first `page_view` itself. Client-side navigations are
 * covered by GA4's Enhanced measurement ("Page changes based on browser
 * history events"), which is on by default — so there is deliberately no
 * route-change listener here. Adding one while that setting is on produces
 * two page_views per navigation, which is worse than none.
 */
export function Analytics() {
  if (!ENABLED) return null;

  return (
    <>
      {/* Tag Manager first, so anything the container fires has the whole
          page available to it. An inline script MUST carry an id — that is
          how Next tracks it and keeps it from running twice. */}
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
  );
}

/**
 * Tag Manager's `<noscript>` fallback, which goes immediately after the
 * opening `<body>` tag — the one piece Google's instructions place by
 * position rather than by behaviour, because a browser with JavaScript off
 * will never reach the component above.
 *
 * Kept apart from `Analytics` for exactly that reason: the two are pasted
 * into different places in the document, so they cannot be one component.
 */
export function AnalyticsNoScript() {
  if (!ENABLED) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
