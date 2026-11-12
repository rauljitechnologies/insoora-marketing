# Audit and implementation report

Covers the work on `feat/footer-attribution-and-admin-retire`: the contact
page and its email path, the structured-data gap, and the performance pass.
Written against measurements taken from a production build (`npm run build`
then `npm start`), not from reading the code.

**Nothing here has been deployed.** The live site at www.insoora.com is still
the previous version — verified: its contact page H1 is the old "Let's talk
about your policies", and its home page carries no `WebPage` node.

---

## 1. What was verified, and how

Every number below came from one of four runs against the production build on
`localhost:3000`:

| Check | Method | Coverage |
|---|---|---|
| Metadata, headings, canonicals | HTML parsed from the served page | 35 routes |
| Structured data | JSON-LD extracted and parsed from the served HTML | 35 routes |
| Internal and external links | Every `href` crawled and resolved | 42 targets |
| Performance, accessibility, SEO | Lighthouse 12, desktop and mobile presets | 5 pages |

The route list is the sitemap's own output, so the sweep cannot test a
different set of pages from the one the site publishes.

---

## 2. On-page SEO — 35 routes, no defects

```
checked 35 routes
duplicate titles:        none
duplicate descriptions:  none
issues:                  NONE
```

Each route was checked for: exactly one `<h1>`; a self-referencing canonical
matching the route; `index, follow`; a title of 70 rendered characters or
fewer; a description between 70 and 165; an `og:image`; a `twitter:card`; and
at least one JSON-LD block. All 35 pass all nine.

Two apparent failures in the first sweep were measurement error, not defects
— the home page description and one article title were counted with HTML
entities expanded (`&#x27;` as six characters rather than one). Unescaped they
are 163 and 68, both inside their limits.

No `<img>` elements exist on the site at all, so there is no alt-text
exposure: every illustration is inline SVG with `role="img"` and a `<title>`.

---

## 3. Structured data — the gap that was found, and closed

### What was wrong

Ten public pages emitted no node describing **the page itself**. They carried
`SoftwareApplication`, `BreadcrumbList` and `FAQPage` — nodes describing the
product, the trail and the questions, all of which are things *on* the page —
while nothing said what the page was.

A second, subtler problem sat beside it. On thirteen pages the FAQ markup was
a separate anonymous `FAQPage` node next to the `WebPage` node. Two blank
assertions about one URL is not richer markup; it is the same page described
twice with nothing joining the descriptions.

### What was done

`webPageSchema` in `src/lib/seo.ts` gained two parameters and `faqSchema` was
removed:

- **`faqs`** — when a page visibly renders questions, they ride on the page
  node, which becomes `["WebPage", "FAQPage"]`. `FAQPage` is a subtype of
  `WebPage`, so this is the honest shape. The invariant that governed the old
  function is unchanged: the array passed in is always the array the accordion
  renders.
- **`image`** — so an article's page node points at that article's own
  generated card rather than the site-wide one. Before this, each article
  described its image three ways and two of them disagreed.

`blogPostingSchema`'s `mainEntityOfPage` now resolves to that same
`#webpage` id instead of asserting a fragment-less stub of its own.

### The result, counted from the served HTML

```
  34  BreadcrumbList          (every page but the home page — correct)
  25  WebPage+FAQPage
  15  SoftwareApplication
  13  BlogPosting
   9  WebPage
   3  Organization
   1  WebSite
   1  Blog
   1  ContactPage
   1  HowTo
```

25 + 9 + 1 = **35**. Every route now has exactly one page-level node, and
every node parses.

### Two deliberate refusals

- **The home page is not marked `FAQPage`**, although it renders questions
  and would be eligible. `HOME_FAQS` is a strict subset of `/faq`'s array, so
  marking it would publish the same questions as FAQ markup on two URLs —
  which Google's guidelines specifically ask sites not to do.
- **The three legal pages get `WebPage` but not `Article`.** An earlier
  comment refused both, on reasoning that only applies to the second: these
  documents are drafts pending legal review, so calling them published
  editorial works with authors and dates would be false. Naming the page is
  not. The comments now draw that line explicitly.

---

## 4. Contact page — a layout defect found by looking at it

The two-column grid put the form in one column and six stacked cards in the
other. Measured from a 1440px screenshot, the right rail ran **about 950px
past the foot of the form** — a tall column of empty white under the thing
the page exists for.

The fix was not to pad the form out to meet the rail. Three cards (Privacy &
data requests, Follow us, Already a customer?) moved out of the rail into a
full-width three-up row below the grid. The rail keeps the three a visitor
actually came for: the number, the address, and what happens after they press
send.

| | Before | After |
|---|---|---|
| Full desktop page height | 3355px | 2748px |
| Gap between form foot and rail foot | ~950px | ~10px |

The three moved cards also read better at full width — each gets a real line
length instead of six words to a line — and they stretch to the tallest of the
row, so their bottoms align.

Mobile and tablet were checked at 390px and 834px: single column, form first,
full-width fields, no horizontal overflow.

---

## 5. Performance — measured, before and after

Lighthouse 12 against the production build. **Single runs with ordinary
run-to-run variance**; treat one-point moves as noise.

The Google Website Translator was the largest single cost on the site: 127 KB
over the wire, 72 KB of it never executed, and the sole reason Best Practices
was not 100 (it sets a third-party cookie). It already used
`strategy="afterInteractive"`, which still loads inside the window the page
is painting. Moving it to `lazyOnload` takes it out of the paint path.

| Page | | Perf | Best Prac. | FCP | LCP | CLS |
|---|---|---|---|---|---|---|
| Home, desktop | before | 94 | 96 | 0.9s | 1.5s | 0 |
| Home, desktop | **after** | **100** | 96 | **0.4s** | **0.7s** | 0 |
| Home, mobile | before | 85 | 96 | 2.0s | 4.1s | 0 |
| Home, mobile | **after** | **89** | **100** | **1.5s** | **3.6s** | 0 |
| Contact, mobile | before | 94 | 96 | 0.9s | 3.1s | 0 |
| Contact, mobile | **after** | **95** | 96 | 0.9s | **2.9s** | 0 |
| Blog, mobile | before | 95 | 100 | 0.9s | 2.9s | 0 |
| Blog, mobile | after | 94 | 100 | 0.9s | 2.9s | 0 |

**Accessibility scored 100 and SEO scored 100 on all eight runs. CLS was 0 on
all eight** — a consequence of every illustration being inline SVG with a
declared aspect ratio, so there is no image to arrive late and push anything.

### What is still slow, stated honestly

Home on mobile is **3.6s LCP, above the 2.5s "good" threshold.** The cause is
not the network and not the fonts: server response is 10ms, fonts are
self-hosted by `next/font` with `display: swap` and a metric-matched
fallback, and `font-display` scores 1. 89% of LCP is render delay against
1.1s of main-thread work, of which 250ms is style and layout — the home page
carries a large DOM of inline SVG product mockups, and Lighthouse's mobile
preset applies 4× CPU throttling.

This is **lab data from one machine.** Field data from CrUX is the only
authority on what real visitors experience, and this site has none yet.

### The trade-off that was accepted

A returning visitor who has already chosen Hindi or Gujarati has a `googtrans`
cookie, and Google re-applies the translation when the script runs. Deferring
it means they see English for roughly a second longer. This was put to the
business and the deferral was chosen. Reverting is one word in
`language-translate.tsx`.

---

## 6. Links, assets and crawling

Every `href` on all 35 pages was followed.

- **No broken internal links.** The four apparent misses — `/favicon.ico`,
  `/icon.svg`, `/apple-icon.png`, `/manifest.webmanifest` — are asset routes
  absent from the sitemap by design; all four return 200.
- **Every external link resolves 200:** the two product portals, three social
  profiles, the maps search, and the operating company's site. Both
  `app.insoora.com` and `www.insoora.com` now resolve — the notes in
  `.env.example` saying they do not are stale and should be corrected.
- `/sitemap.xml` 200, 35 entries, correct content type; `/robots.txt` 200,
  allows everything but `/api/`, advertises the sitemap; `/llms.txt` 200; an
  unknown path returns a real 404.

---

## 7. Contact form — what was tested, and what was not

### Tested, and passing

Every path that rejects a submission **before** the relay, so none of these
touched the production product:

| Input | Result |
|---|---|
| Malformed JSON | 400 `INVALID_JSON` |
| Body over 16 KB | 413 `PAYLOAD_TOO_LARGE` |
| Every field invalid | 422, all seven fields named individually |
| Unknown enquiry type | 422 — the nine options are a closed set |
| Consent withheld | 422 — enforced server-side, not just in the browser |
| Honeypot filled | 202 with a decoy reference; nothing stored, sent or relayed |
| `CRLF` injected into the name | Stripped before the subject line is built |

### Not tested

**No email has ever been sent from this deployment.** `RESEND_API_KEY` is
unset, which the code treats as a supported state rather than an error: the
form works, the enquiry still reaches the product, and the route logs
`notified=not-configured`. The success panel correctly says nothing about an
email in that state.

The valid-submission path — relay, notification, confirmation, rate limiting
and duplicate collapse — is therefore **implemented and code-reviewed but not
executed.** Testing it requires sending a real enquiry to the live product.

---

## 8. Pending manual configuration

Email is the only thing standing between "implemented" and "verified". Three
things have to be true, in this order:

1. **`insoora.com` verified in Resend**, with SPF, DKIM and DMARC published in
   DNS. Without this every send is rejected with a 403 saying so. This is the
   single most likely reason for email to look configured and still not
   arrive.
2. **`RESEND_API_KEY`** set in the deployment environment. A sending-access
   key is enough; it does not need full access.
3. **Someone reads `enquiries@insoora.com`**, or `ENQUIRY_FROM_EMAIL` is
   changed to a mailbox that is read. Nothing breaks if nobody does — the
   notification sets Reply-To to the enquirer — but the visitor's confirmation
   deliberately does not invite a reply for this reason.

`ENQUIRY_NOTIFY_EMAIL` needs no change. It defaults to
**toyuvrajraulji@gmail.com**, confirmed by the business. The original brief
asked for `toyuvrraulji@gmail.com`, which differs by two characters; that was
confirmed to be a typo and must not be restored as a "fix".

---

## 9. Raised, not changed

- **`.env.example` is stale** on one factual point: it states that
  `app.insoora.com` and `www.insoora.com` do not resolve. Both do, and both
  serve. The guidance around them is still right; the fact is not.
- **The Privacy Policy does not describe the translation widget.** Translating
  a page sends its text to Google and sets a `googtrans` cookie — a
  third-party transfer, and deliberately not behind the analytics consent gate
  (gating it would mean a Gujarati speaker must accept analytics cookies to
  read the page). This needs a line in the policy. Flagged in
  `language-translate.tsx` and not resolved here, because it is a legal
  decision.
- **The hidden "Powered by Google Translate" attribution** conflicts with
  Google's terms for the Website Translator. The code records this as a
  deliberate, owned instruction from the business rather than an oversight.
  Reversing it is a one-line CSS change.
- **The Contact page still names the operating company** in a "Who you are
  dealing with" block, and `llms.txt` carries one `Managed by` sentence.
  Neither is the footer attribution Phase 11 asked to remove — the footer is
  clean, ending at "© 2026 Insoora" — and both read as accurate operator
  disclosure. Left in place rather than removed without legal review.
- **Three landing-page titles sit at 69–70 rendered characters**, inside the
  limit but with no headroom. Any brand-suffix change would push them over.

---

## 10. Status

**Completed and verified by measurement**
On-page SEO across 35 routes · structured data, one page node per route ·
contact page layout rebalance · performance pass with before/after numbers ·
internal and external link integrity · sitemap, robots, llms.txt, 404 ·
contact form rejection paths · accessibility 100 and CLS 0 on every page
measured.

**Completed, not verifiable from here**
Email notification and visitor confirmation — written, reviewed, unexecuted.

**Pending manual configuration**
Resend domain verification, `RESEND_API_KEY`, and a monitored From mailbox.

**Not implemented, deliberately**
Real `/hi/` and `/gu/` pages with `hreflang` — the widget produces no
indexable translated content and never will. Any claim of automated SMS,
WhatsApp or email renewal notifications. Field performance data, which needs
CrUX and therefore needs traffic.
