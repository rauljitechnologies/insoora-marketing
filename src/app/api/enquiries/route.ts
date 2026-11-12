import { NextResponse, type NextRequest } from "next/server";
import { APP_URL, absolute } from "@/lib/site-config";
import {
  type EnquiryFields,
  MAX_FIELD,
  MAX_MESSAGE,
  enquiryReference,
  enquiryType,
  relayMessage,
  validate,
} from "@/lib/enquiry";
import { adminNotification, visitorConfirmation } from "@/lib/email/enquiry-emails";
import { emailConfigured, notifyRecipients, sendEmail } from "@/lib/email/send";

// The Contact Us form's endpoint.
//
// ── What it does, in order ───────────────────────────────────────────────
//
//   1. Rejects an oversized body before parsing it.
//   2. Drops anything that filled in the honeypot, while telling it it won.
//   3. Validates every field with `lib/enquiry`'s rules — the same function
//      the form ran in the browser, so nothing passes there and fails here.
//   4. Rate-limits per IP, and collapses an accidental double-submit.
//   5. Relays the enquiry to the product, which is the system of record.
//   6. Emails the business, and then the visitor.
//   7. Reports exactly what happened, which is the whole point of the route.
//
// ── Why this is no longer a transparent pipe ─────────────────────────────
//
// It used to be one: the body went upstream byte for byte and the upstream
// status came back verbatim, on the reasoning that there should be exactly
// one enquiry endpoint in the system and this was a pipe to it.
//
// Two requirements broke that. The business asked for an email notification
// on every submission, and this deployment is where the form lives, so this
// is where the mail has to be sent from. And the form now collects three
// things the product's schema has no field for — the precise enquiry type,
// the company and the website — which have to be folded into the relayed
// payload rather than sent as keys an unseen validator might reject. See
// `relayMessage` and the note on `ENQUIRY_TYPES` in lib/enquiry.
//
// The product remains the system of record. This route adds a second,
// independent sink — the mailbox — and that redundancy is deliberate: an
// enquiry is reported as received if EITHER of them accepted it, and is only
// an error if both failed. A lead is not lost because one of two systems was
// having a bad minute.
//
// ── Why the visitor's IP is forwarded ────────────────────────────────────
//
// The product rate-limits per IP and stores `ipAddress`. Without the header
// it would see every enquiry in the world arriving from one address: this
// server's.

/** Caps the body before it is read into memory. Every field has its own
 *  ceiling in `lib/enquiry`; this is the crude outer bound. */
const MAX_BODY = 16 * 1024;

/**
 * The honeypot field the form renders off-screen.
 *
 * Checked HERE rather than upstream, because this deployment cannot see the
 * product's request schema and so cannot know whether an extra key is
 * accepted or rejected by it. The relay builds its payload field by field
 * (see `relayToProduct`), so the trap never reaches the product either way.
 */
const HONEYPOT = "company_website";

// ── Rate limiting and duplicate collapse ─────────────────────────────────
//
// ── What this is, and what it is honestly not ────────────────────────────
//
// A Map in module scope. On a serverless platform that means PER INSTANCE:
// two concurrent lambdas have two separate counters, and a cold start has an
// empty one. So this is not a defence against a distributed flood and is not
// described as one.
//
// It is still worth having. It stops the two things that actually happen to a
// contact form — somebody double-clicking "send", and a single script
// hammering one endpoint from one address — and it does so before any email
// is sent, which is the part that costs money and reputation. The product's
// own per-IP limit sits behind this and is the durable one; this layer exists
// because the email send happens HERE, in front of it.
//
// A durable limiter would need Redis or a KV store, which this deployment
// does not have and which is noted in `.env.example` as the upgrade path if
// abuse ever becomes real rather than theoretical.

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

/** Recent submissions per IP, as timestamps inside the window. */
const recentByIp = new Map<string, number[]>();

/**
 * Fingerprints of recent submissions, mapped to the reference they were first
 * given.
 *
 * This is the double-submit guard, and it returns the ORIGINAL reference
 * rather than an error. A visitor whose first click succeeded and whose second
 * click produced "you have already sent this" has been told their message
 * failed when it did not — so the second click is answered with the same
 * success and the same reference, and no second pair of emails is sent.
 */
const recentByFingerprint = new Map<string, { reference: string; at: number }>();

/** Drops expired entries from both maps. Called on each request, which is
 *  often enough for a form and avoids a timer holding the process awake. */
function sweep(now: number): void {
  for (const [ip, hits] of recentByIp) {
    const live = hits.filter((t) => now - t < RATE_WINDOW_MS);
    if (live.length === 0) recentByIp.delete(ip);
    else recentByIp.set(ip, live);
  }
  for (const [key, entry] of recentByFingerprint) {
    if (now - entry.at >= RATE_WINDOW_MS) recentByFingerprint.delete(key);
  }
}

/** How many seconds until this IP may submit again, or 0 if it may now. */
function retryAfter(ip: string, now: number): number {
  const hits = recentByIp.get(ip) ?? [];
  if (hits.length < RATE_MAX) return 0;
  const oldest = Math.min(...hits);
  return Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - oldest)) / 1000));
}

/**
 * What identifies "the same submission sent twice".
 *
 * Email plus message, lowercased and whitespace-collapsed. Deliberately NOT
 * the whole payload: somebody who corrects a typo in their phone number and
 * resubmits has sent a new enquiry, and somebody whose browser retried the
 * request has not.
 *
 * Note this is a plain string in memory and includes message text. It is
 * never logged — see the logging note at the foot of this file.
 */
function fingerprint(f: EnquiryFields): string {
  return `${f.email.trim().toLowerCase()}::${f.message.trim().toLowerCase().replace(/\s+/g, " ")}`;
}

// ── Reading the body ─────────────────────────────────────────────────────

/**
 * Control characters that are never legitimate in submitted text.
 *
 * The C0 set and DEL, with tab, newline and carriage return deliberately
 * SPARED — those three are meaningful in the message textarea, where someone
 * writing a list expects their line breaks to survive.
 *
 * Stripped rather than rejected, because they arrive from paste rather than
 * from intent. The case that makes this more than tidying is the subject
 * line: `name` is interpolated into the notification email's subject, and a
 * bare CR or LF there is the classic header injection — it would let a
 * submitted name append headers of its own to the outgoing message.
 */
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Newlines too, for every field except the message. A name or a company
 *  spanning three lines is not a name, and it breaks the email's table. */
const NEWLINES = /[\r\n]+/g;

/** A field as a trimmed, length-capped string, whatever JSON actually held.
 *
 *  The cap is applied BEFORE validation rather than being left to it: a
 *  megabyte in one field would otherwise be copied into an error message and
 *  an email body on its way to being rejected. */
function field(value: unknown, max = MAX_FIELD, { multiline = false } = {}): string {
  if (typeof value !== "string") return "";
  const stripped = value.replace(CONTROL_CHARS, "");
  return (multiline ? stripped : stripped.replace(NEWLINES, " ")).trim().slice(0, max);
}

function readFields(raw: Record<string, unknown>): EnquiryFields {
  return {
    name: field(raw.name),
    email: field(raw.email),
    phone: field(raw.phone),
    company: field(raw.company),
    website: field(raw.website),
    type: field(raw.type, 40),
    // The only multiline field: its newlines are what a reader of the
    // notification sees as paragraphs.
    message: field(raw.message, MAX_MESSAGE, { multiline: true }),
    consent: raw.consent === true,
  };
}

function badRequest(code: string, message: string, status = 400) {
  return NextResponse.json({ error: { code, message } }, { status });
}

// ── The handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > MAX_BODY) {
    return badRequest("PAYLOAD_TOO_LARGE", "That message is too long.", 413);
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw) as Record<string, unknown>;
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
  } catch {
    return badRequest("INVALID_JSON", "We couldn't read that submission. Please try again.");
  }

  // The honeypot. Accepted and discarded rather than rejected: a bot that is
  // told it failed retries with the field left blank, and one that is told it
  // succeeded does not. Nothing is stored, nothing is emailed, nothing is
  // forwarded.
  const trap = parsed[HONEYPOT];
  if (typeof trap === "string" && trap.trim() !== "") {
    return NextResponse.json({ data: { ok: true, reference: enquiryReference() } }, { status: 202 });
  }

  const fields = readFields(parsed);

  // The same rules the browser ran. A field cannot pass there and fail here,
  // and this is the run that counts — the browser's is a courtesy.
  const errors = validate(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_FAILED",
          message: "Please check the highlighted fields and try again.",
          // Returned so the form can mark the exact fields, which matters for
          // the one case where client and server legitimately disagree: a
          // submission that did not come from our form at all.
          details: errors,
        },
      },
      { status: 422 },
    );
  }

  const now = Date.now();
  sweep(now);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";

  const wait = retryAfter(ip, now);
  if (wait > 0) {
    return NextResponse.json(
      {
        error: {
          code: "RATE_LIMITED",
          message: `You've sent a few messages already. Please try again in ${wait > 60 ? `${Math.ceil(wait / 60)} minutes` : `${wait} seconds`}, or call us.`,
        },
      },
      { status: 429, headers: { "Retry-After": String(wait) } },
    );
  }

  // A repeat of a submission already accepted in this window is answered with
  // the original reference and no second pair of emails.
  const print = fingerprint(fields);
  const duplicate = recentByFingerprint.get(print);
  if (duplicate) {
    return NextResponse.json({
      data: { ok: true, reference: duplicate.reference, duplicate: true },
    });
  }

  const reference = enquiryReference();
  const at = new Date();

  recentByIp.set(ip, [...(recentByIp.get(ip) ?? []), now]);
  recentByFingerprint.set(print, { reference, at: now });

  // The page the form was submitted from, for the notification. Taken from
  // the Referer and checked against this site's own origin before being
  // printed in an email — an attacker-supplied header rendered as a link in
  // the business's inbox is a phishing vector with our branding on it.
  const sourceUrl = sameOriginReferer(req) ?? absolute("/contact-us");

  // ── 1. The product: the system of record ──────────────────────────────
  const stored = await relayToProduct(fields, req, ip);

  // ── 2. The business's mailbox: the second, independent sink ───────────
  const notification = adminNotification({ fields, reference, at, sourceUrl, stored });
  const notified = await sendEmail({ ...notification, to: notifyRecipients() });

  // ── 3. The visitor's confirmation ─────────────────────────────────────
  //
  // Only after the notification has been accepted. If the business was not
  // told about the enquiry, confirming it to the visitor would be a promise
  // nobody has received — the one failure mode the brief singles out.
  const confirmation =
    notified.status === "sent"
      ? await sendEmail(visitorConfirmation({ fields, reference, at, sourceUrl, stored }))
      : ({ status: "not-configured" } as const);

  // ── What the visitor is told ──────────────────────────────────────────
  //
  // Received if EITHER sink accepted it. Both failing is the only error, and
  // it is a truthful one: nothing holds the enquiry, so asking them to try
  // again or call is the honest answer rather than a success panel over a
  // lost message.
  if (!stored && notified.status !== "sent") {
    log({
      reference,
      outcome: "lost",
      stored,
      notified: notified.status,
      reason: notified.status === "failed" ? notified.reason : undefined,
    });

    // The reference is withheld here on purpose. Handing someone a reference
    // for an enquiry no system holds invites them to quote it to support,
    // who will find nothing.
    return NextResponse.json(
      {
        error: {
          code: "NOT_DELIVERED",
          message:
            "We couldn't deliver your message just now — nothing was saved, so please try again in a moment or call us on +91 81530 77965.",
        },
      },
      { status: 502 },
    );
  }

  log({
    reference,
    outcome: "received",
    stored,
    notified: notified.status,
    confirmed: confirmation.status,
    reason: notified.status === "failed" ? notified.reason : undefined,
  });

  return NextResponse.json({
    data: {
      ok: true,
      reference,
      // Both flags are read by the form to decide its wording. It says a
      // confirmation is on its way ONLY when `confirmationSent` is true,
      // because Resend accepting the message is the furthest this code can
      // see — and even that is not proof it reached an inbox, which is why
      // the copy says "on its way to" rather than "delivered to".
      stored,
      confirmationSent: confirmation.status === "sent",
    },
  });
}

// ── The relay ────────────────────────────────────────────────────────────

/**
 * Posts the enquiry to the product's own endpoint.
 *
 * Returns whether it was accepted, and never throws: the caller treats a
 * failure as "one of two sinks is down", not as a request-ending error.
 *
 * The payload is deliberately the four keys the product already received,
 * with the new fields folded into `message` by `relayMessage` and the enquiry
 * type mapped down to the four values known to be accepted. The alternative —
 * sending `company`, `website` and nine type values at a validator this
 * deployment cannot inspect — risks rejecting every submission of a kind
 * nobody tested. See the note on `ENQUIRY_TYPES` in lib/enquiry.
 */
async function relayToProduct(fields: EnquiryFields, req: NextRequest, ip: string): Promise<boolean> {
  const type = enquiryType(fields.type);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const res = await fetch(`${APP_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Passed through so the product's per-IP limits and its stored
        // `ipAddress` / `userAgent` describe the visitor, not this server.
        ...(ip !== "unknown" ? { "x-forwarded-for": ip } : {}),
        ...(req.headers.get("user-agent") ? { "user-agent": req.headers.get("user-agent")! } : {}),
      },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        type: type?.relay ?? "other",
        message: relayMessage(fields),
      }),
      // No cookies, no credentials — there is no session to carry. A
      // server-to-server POST also carries no Origin and no Sec-Fetch-Site,
      // which is what lets it past the product's cross-site check without
      // widening CORS on a shared helper over there.
      cache: "no-store",
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * The Referer, but only when it is a URL on this site.
 *
 * A header is attacker-controlled. This value is printed in the notification
 * email as a clickable link, so anything off-origin is discarded in favour of
 * the Contact page — the business's inbox is not a place to render a stranger's
 * URL under Insoora's letterhead.
 */
function sameOriginReferer(req: NextRequest): string | null {
  const referer = req.headers.get("referer");
  if (!referer) return null;
  try {
    const url = new URL(referer);
    const site = new URL(absolute("/"));
    // The deployment's own host is allowed too: on a preview URL the site
    // origin and the request host legitimately differ.
    if (url.host !== site.host && url.host !== req.headers.get("host")) return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

// ── Logging ──────────────────────────────────────────────────────────────
//
// ── What is logged, and what deliberately is not ─────────────────────────
//
// The reference, the outcome, and the status of each sink. That is enough to
// answer the only questions a log is asked here: did this enquiry get through,
// and if not, which part broke.
//
// NOT logged: the name, the email address, the phone number, the company, the
// website, the message, or the IP. None of them is needed to diagnose a
// delivery failure, all of them are personal data under the DPDP Act, and a
// platform log is a copy of that data in a place with no retention policy and
// a different access list from the database. The Privacy Policy describes
// where enquiry data is held; it does not say "and also in the deploy logs".
//
// The one exception is Resend's own failure `reason`, which is its message
// about the send ("domain is not verified"), not about the enquirer.
function log(entry: {
  reference: string;
  outcome: "received" | "lost";
  stored: boolean;
  notified: string;
  confirmed?: string;
  reason?: string;
}): void {
  const parts = [
    `enquiry ${entry.reference}`,
    entry.outcome,
    `stored=${entry.stored}`,
    `notified=${entry.notified}`,
    ...(entry.confirmed ? [`confirmation=${entry.confirmed}`] : []),
    ...(entry.reason ? [`reason="${entry.reason}"`] : []),
    ...(emailConfigured() ? [] : ["(RESEND_API_KEY is not set)"]),
  ];
  const line = parts.join(" ");
  if (entry.outcome === "lost") console.error(`✗ ${line}`);
  else console.log(`✓ ${line}`);
}
