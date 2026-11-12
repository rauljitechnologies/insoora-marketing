// Custom GA4 events for this site.
//
// ── What this module is for ──────────────────────────────────────────────
//
// Until now the only thing reaching the GA4 property was `page_view`: the
// `gtag('config', …)` call in components/marketing/analytics sends the first
// one, and Enhanced Measurement covers client-side navigations. That answers
// "which pages get read" and nothing else — in particular it cannot answer
// the one question the business actually has, which is how many people start
// the contact form and how many of them finish it.
//
// So this is the small, deliberate set of events on top of `page_view`.
// Every one of them is a step in the conversion path or a press of a control
// that leads into it. Nothing here measures scroll depth, time on page, or
// anything else that produces a chart nobody acts on.
//
// ── The hard rule: no personal data, ever ────────────────────────────────
//
// Not the name, not the email address, not the phone number, not the company,
// not the website, not one character of the message, and nothing at all about
// an insurance policy. This is not a style preference:
//
//   * Google's own Measurement Protocol terms forbid sending PII to Analytics,
//     and a property found carrying it can be deleted outright.
//   * Under the DPDP Act this would be a transfer of personal data to a third
//     party for a purpose the visitor was never told about. The consent banner
//     asks permission to COUNT VISITS. It does not ask permission to send
//     somebody's email address to Google, and a yes to the first is not a yes
//     to the second.
//   * The Privacy Policy describes where enquiry data goes. "And also to
//     Google Analytics" is not in it, and must not silently become true.
//
// The enforcement is structural rather than a comment asking people to be
// careful: `track` accepts only strings and numbers, every call site below is
// in this file's own event helpers, and each helper takes exactly the
// non-identifying arguments it needs. There is no general-purpose "send this
// object" door to walk through.
//
// What IS sent: which enquiry type was chosen (a category from a fixed list
// of nine, identical for everyone who picks it), which fields failed
// validation (field NAMES, never their values), an article's slug, and a
// label describing which control was pressed. None of that identifies anyone.

/**
 * The events this site sends. A closed union, so a typo is a type error
 * rather than a new event name quietly appearing in the GA4 property and
 * splitting a report in two.
 *
 * Named in `snake_case` because that is GA4's convention and the one its
 * reports are built around. All are custom events: none collides with a GA4
 * reserved or automatically-collected name, which would otherwise be dropped
 * or, worse, merged into Google's own.
 */
export type AnalyticsEvent =
  /** The visitor put something into the contact form for the first time.
   *  Fires once per form, on first edit — not on focus, because tabbing
   *  through a page is not starting to fill it in. */
  | "contact_form_start"
  /** A submit that passed client validation and was sent to the server.
   *  The denominator for the two below. */
  | "contact_form_submit"
  /** The server confirmed the enquiry was received. The conversion. */
  | "contact_form_success"
  /** The submit did not result in a received enquiry — validation refused
   *  it, the network failed, or the server could not deliver it. */
  | "contact_form_error"
  /** A press of a control whose destination is the contact form — the
   *  closest thing this site has to "book a demo". See the note in
   *  components/marketing/analytics on how these are detected. */
  | "demo_cta_click"
  /** A press of a control that leads into the product's registration. */
  | "signup_cta_click"
  /** A blog article was opened. Distinct from `page_view`, which also fires:
   *  this one carries the article's own dimensions so the collection can be
   *  reported on without maintaining a path filter in the GA4 UI. */
  | "blog_article_view";

/**
 * Parameter values GA4 will accept from us.
 *
 * Strings and numbers only. Deliberately NOT `unknown` or `object`: a nested
 * object is flattened by gtag in ways that are easy to get wrong, and an
 * `unknown` here is the door through which a whole form-state object
 * eventually gets passed. See the rule at the top of this file.
 */
type Params = Record<string, string | number>;

/**
 * Whether gtag is actually present in this document.
 *
 * It is absent far more often than it is present, and all of these are
 * NORMAL rather than error states:
 *
 *   * the visitor declined analytics, or has not answered the banner yet —
 *     no Google script is in the document at all (see analytics.tsx);
 *   * this is `next dev` or a test, where the tags never load;
 *   * a content blocker removed it, which is common and entirely their right;
 *   * the event fired before `afterInteractive` finished loading the tag.
 *
 * Every one of them means the same thing here: there is nowhere to send this,
 * so do not. The call sites must not have to know which.
 */
function gtag(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === "undefined") return undefined;
  const fn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  return typeof fn === "function" ? fn : undefined;
}

/**
 * Sends one event, and never throws.
 *
 * ── Why the try/catch, when gtag is already checked ──────────────────────
 *
 * Because of what calls this. `contact_form_success` fires on the path that
 * shows a visitor their enquiry was received; if a third-party script threw
 * from inside that call, the success panel would never render and the visitor
 * would be told their message failed when it did not. Analytics is the least
 * important thing happening on that line and must behave like it.
 *
 * It is deliberately silent rather than logging. A blocked tag is not a
 * defect, and a console full of analytics warnings trains people to ignore
 * the console.
 */
export function track(event: AnalyticsEvent, params: Params = {}): void {
  const send = gtag();
  if (send) {
    emit(send, event, params);
    return;
  }
  // Not there YET, which is different from not there at all — see `flush`.
  queue(event, params);
}

function emit(send: (...args: unknown[]) => void, event: AnalyticsEvent, params: Params): void {
  try {
    send("event", event, params);
  } catch {
    // Intentionally empty. See the note on `track`.
  }
}

// ── The short wait for gtag ──────────────────────────────────────────────
//
// ── The problem this solves ──────────────────────────────────────────────
//
// `blog_article_view` fires from an effect when an article mounts, and the
// tags load with `strategy="afterInteractive"` — so on a cold page load the
// event is raised BEFORE `gtag` exists, every time. Dropped on the spot, the
// result is an event that works perfectly on client-side navigations and
// records nothing at all for a reader arriving from a search result, which
// is most of them. That is worse than no event: it is a number that looks
// real and is systematically wrong in one direction.
//
// ── Why a bounded queue and not a `setInterval` that waits ───────────────
//
// Nothing here may keep a timer alive on a page where the answer is never
// coming, and for most visitors it never is: a decline, an unanswered
// banner, `next dev`, or a content blocker all mean `gtag` will not appear.
// So this gives up — after a handful of polls over a few seconds, which is
// far longer than `afterInteractive` needs and far shorter than a visit.
//
// The queue is capped for the same reason. It exists to hold the one or two
// events raised in the first moments of a page load, not to buffer a
// session.
//
// ── What it deliberately does NOT do ─────────────────────────────────────
//
// It does not survive the deadline. If somebody accepts the banner a minute
// after landing, the article view raised before they answered is gone, and
// that is the right outcome rather than a gap to close: it was raised while
// this site had no permission to send it, and holding it until permission
// arrived would be collecting first and asking afterwards.

const MAX_PENDING = 10;
const POLL_MS = 250;
const MAX_POLLS = 16; // ~4 seconds.

let pending: { event: AnalyticsEvent; params: Params }[] = [];
let polls = 0;
let timer: ReturnType<typeof setTimeout> | undefined;

function queue(event: AnalyticsEvent, params: Params): void {
  if (typeof window === "undefined") return;
  if (pending.length >= MAX_PENDING) return;
  pending.push({ event, params });
  if (timer === undefined) timer = setTimeout(flush, POLL_MS);
}

function flush(): void {
  timer = undefined;
  const send = gtag();

  if (send) {
    const waiting = pending;
    pending = [];
    polls = 0;
    for (const item of waiting) emit(send, item.event, item.params);
    return;
  }

  if (++polls >= MAX_POLLS) {
    // Gave up. Dropping these is the correct outcome, not a failure.
    pending = [];
    polls = 0;
    return;
  }

  timer = setTimeout(flush, POLL_MS);
}

// ── The event helpers ────────────────────────────────────────────────────
//
// Each one takes exactly the non-identifying arguments its event needs, which
// is what keeps the no-PII rule structural instead of advisory. Call these;
// do not call `track` directly from a component.

/**
 * `enquiry_type` is the VALUE from the fixed list of nine (`demo`,
 * `agent-registration`, …), never the visitor's own words. It is the one
 * genuinely useful dimension on these events: it says which kind of enquiry
 * converts, and it is identical for everyone who picks the same option.
 *
 * An empty string when nothing has been chosen yet, which is a real state on
 * `contact_form_start` and on a validation error.
 */
export function trackFormStart(): void {
  track("contact_form_start");
}

export function trackFormSubmit(enquiryType: string): void {
  track("contact_form_submit", { enquiry_type: enquiryType });
}

export function trackFormSuccess(enquiryType: string): void {
  track("contact_form_success", { enquiry_type: enquiryType });
}

/**
 * `reason` is a code, never a message shown to the visitor and never the
 * content of a field.
 *
 * `fields` is a comma-separated list of field NAMES that failed — "email,
 * consent". The names are a fixed vocabulary from lib/enquiry and say nothing
 * about the person; what they buy is the ability to see that, say, the phone
 * rule is rejecting a form of number real people actually type, which is a
 * defect you cannot find any other way.
 */
export function trackFormError(reason: string, fields?: string[]): void {
  track("contact_form_error", {
    reason,
    ...(fields && fields.length > 0 ? { fields: fields.join(",").slice(0, 100) } : {}),
  });
}

/** `location` says WHICH control was pressed — "header", "hero",
 *  "cta_band" — so a report can tell a hero button from a footer link. */
export function trackCtaClick(event: "demo_cta_click" | "signup_cta_click", location: string): void {
  track(event, { cta_location: location });
}

export function trackArticleView(slug: string, category: string): void {
  track("blog_article_view", { article_slug: slug, article_category: category });
}
