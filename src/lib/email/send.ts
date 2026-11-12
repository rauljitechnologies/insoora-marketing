// Outbound email for this deployment.
//
// ── Why Resend, and why over `fetch` rather than its SDK ─────────────────
//
// Nothing in this repository sent email before this module. The enquiry form
// relayed to the product, which stored a row, and that was the whole of it —
// so a notification reaching the business depended on somebody opening the
// back office. The business asked for an email instead.
//
// Resend was chosen over SMTP: a verified sending domain with SPF, DKIM and
// DMARC is the difference between a notification landing in an inbox and
// landing in spam, and SMTP-through-a-Gmail-app-password gets neither.
//
// It is called over plain `fetch` and NOT through the `resend` npm package.
// The API is one authenticated POST to one endpoint; the SDK wraps that in a
// dependency with its own transitive tree, and this deployment ships seven
// runtime dependencies in total. The whole of the integration is the function
// below. If the request shape ever grows beyond this, the SDK is the right
// answer and swapping to it changes nothing outside this file.
//
// ── Server only ──────────────────────────────────────────────────────────
//
// `RESEND_API_KEY` is read here and must never reach the browser. It is
// deliberately NOT prefixed `NEXT_PUBLIC_`, which is what stops Next inlining
// it into a client bundle, and this module is imported only by the route
// handler at app/api/enquiries. Nothing in the client tree may import it.

/** The sending key. Unset is a supported state — see `emailConfigured`. */
const API_KEY = process.env.RESEND_API_KEY?.trim();

/**
 * The From address.
 *
 * Must be on a domain verified in the Resend dashboard, or every send is
 * rejected with a 403 that says so. The default is the address this project
 * intends to send from; it is configuration because the verified domain is a
 * decision made in a dashboard, not in code.
 *
 * A display name is included so the notification reads as "Insoora Website"
 * in a mail client rather than as a bare address.
 */
const FROM = process.env.ENQUIRY_FROM_EMAIL?.trim() || "Insoora Website <enquiries@insoora.com>";

/**
 * Where contact-form notifications go.
 *
 * Comma-separated, so a second person can be added without a code change.
 *
 * The default is the address the business confirmed. The written brief asked
 * for `toyuvrraulji@gmail.com`; that differs by two characters from the
 * address on record for the account (`toyuvrajraulji@gmail.com`), the
 * business confirmed the latter is correct, and the former is recorded here
 * only so that nobody re-introduces it from the brief as a "fix". Changing
 * this is an environment variable, not a deploy.
 */
const NOTIFY = (process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || "toyuvrajraulji@gmail.com")
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);

export function notifyRecipients(): string[] {
  return NOTIFY;
}

/**
 * True when this deployment can actually send.
 *
 * The distinction between "not configured" and "failed" matters more than it
 * looks. A preview deployment with no key has not lost an enquiry and must
 * not log an error as though it had; a production deployment whose send was
 * rejected has a real problem someone needs to see. The route reports the two
 * differently and the visitor is told the truth in both cases.
 */
export function emailConfigured(): boolean {
  return Boolean(API_KEY);
}

/** What happened to one send. Never a thrown exception: the caller's job is to
 *  decide what the visitor is told, and it needs the outcome to do that. */
export type SendResult =
  /** Resend accepted it and returned an id. The furthest this code can see —
   *  acceptance is not the same as delivery to an inbox, and nothing here
   *  should claim otherwise. */
  | { status: "sent"; id: string }
  /** No API key. Not an error; this deployment was never set up to send. */
  | { status: "not-configured" }
  /** Resend rejected it, or the request never completed. */
  | { status: "failed"; reason: string };

export interface Email {
  to: string[];
  subject: string;
  html: string;
  /** The plain-text alternative. Not optional: a mail with no text part scores
   *  worse with every spam filter there is, and some clients show it instead. */
  text: string;
  /** Set on the notification to the visitor's own address, so hitting reply in
   *  the mail client answers the enquiry. The From stays the verified domain —
   *  sending AS the visitor would fail their domain's DMARC policy. */
  replyTo?: string;
}

/**
 * Sends one email, and never throws.
 *
 * ── On the timeout ──────────────────────────────────────────────────────
 *
 * Eight seconds. The visitor is waiting on this request, and an email
 * provider having a slow day must not turn into a form that appears to hang:
 * past the timeout the send is abandoned and reported as failed, the upstream
 * store has already happened, and the visitor gets an honest answer about
 * what did and did not work. A lost notification with a stored enquiry is
 * recoverable; a visitor who gave up on a spinner is not.
 */
export async function sendEmail(email: Email): Promise<SendResult> {
  if (!API_KEY) return { status: "not-configured" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: email.to,
        subject: email.subject,
        html: email.html,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const body = (await res.json().catch(() => null)) as
      | { id?: string; message?: string; name?: string }
      | null;

    if (!res.ok) {
      // Resend's error body carries a human-readable `message` — "The
      // insoora.com domain is not verified", for instance, which is the one
      // thing a deployer needs to read. It is surfaced rather than swallowed.
      return {
        status: "failed",
        reason: body?.message ?? `Resend returned ${res.status}`,
      };
    }

    if (!body?.id) return { status: "failed", reason: "Resend accepted the request but returned no id." };

    return { status: "sent", id: body.id };
  } catch (err) {
    return {
      status: "failed",
      reason: err instanceof Error && err.name === "AbortError" ? "The send timed out." : "The send could not be completed.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
