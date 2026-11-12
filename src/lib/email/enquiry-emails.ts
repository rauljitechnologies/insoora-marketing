import { CONTACT } from "@/lib/contact";
import { ENQUIRY_TYPES, type EnquiryFields, enquiryType } from "@/lib/enquiry";
import type { Email } from "./send";

// The two emails a contact-form submission produces: a notification to the
// business, and a confirmation to the visitor.
//
// ── Why hand-written table HTML ──────────────────────────────────────────
//
// Email clients are not browsers. Outlook on Windows renders through Word's
// HTML engine, Gmail strips <style> blocks and anything resembling modern
// layout, and `flex`, `grid`, custom properties and external stylesheets are
// all unavailable in at least one client people actually use. So: nested
// tables, inline styles, and no class attributes — the 2003 techniques, which
// are still the ones that work everywhere.
//
// The one concession to the modern world is a `@media` block for the mobile
// stack, inside a <style> tag. Gmail drops it; Apple Mail and iOS Mail honour
// it. The layout is built to be acceptable without it, which is the only safe
// way to use one.
//
// ── Every interpolation is escaped ───────────────────────────────────────
//
// Every value in these templates came from a public form. `escape` is applied
// at each one without exception. The failure being prevented is not a
// theoretical XSS in a mail client (though some webmail does execute markup)
// — it is far more mundane: an agency legitimately named "Shah & Sons" breaks
// the document at the ampersand, and a message containing a "<" silently
// swallows the rest of the email.

// ── Brand ────────────────────────────────────────────────────────────────
//
// Literals, not the CSS tokens from globals.css. An email has no access to
// `var(--primary)`, and the values are repeated here rather than imported
// because a token file that an email template depends on is a token file
// nobody can change safely. These match `:root` in globals.css as of writing.
const BRAND = {
  ink: "#0b1220",
  muted: "#5c6b8a",
  border: "#e6e9f2",
  surface: "#f7f8fc",
  primary: "#3b5bf5",
  /** Flat, not the site's 135deg gradient: Outlook ignores CSS gradients and
   *  would render the fallback colour anyway, so there is no gradient to
   *  ignore. The mid stop of `--gradient-brand` is the closest single hue. */
  header: "#2a46d4",
  white: "#ffffff",
} as const;

/** HTML-escapes one value for insertion into an email body. */
function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * A multi-line message as HTML paragraphs.
 *
 * The textarea's newlines are meaningful — people write a paragraph, a blank
 * line, then a list — and `white-space: pre-wrap` is unreliable in Outlook.
 * Splitting on blank lines and emitting real block elements with <br> inside
 * them renders the same everywhere.
 */
function paragraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map(
      (block) =>
        `<p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:${BRAND.ink};">${escape(block).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");
}

/**
 * The submission timestamp, in the timezone the business reads.
 *
 * Asia/Kolkata explicitly. The server runs in UTC, and a notification saying
 * an enquiry arrived at 03:40 when the visitor sent it at 09:10 is the kind
 * of detail that makes someone distrust the rest of the email. The offset is
 * printed so there is no ambiguity about what was meant.
 */
function timestamp(at: Date): string {
  const formatted = at.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });
  return `${formatted} IST`;
}

/** The shell both emails share: a branded header, a body, and a footer. */
function layout({ heading, preheader, body }: { heading: string; preheader: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escape(heading)}</title>
<style>
  /* Dropped by Gmail, honoured by Apple Mail and iOS. The layout below is
     readable without it — this only tightens the padding on a phone. */
  @media (max-width:600px){
    .pad{padding:20px !important}
    .label{display:block !important;width:auto !important;padding:0 0 2px !important}
    .value{display:block !important;width:auto !important;padding:0 0 14px !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${BRAND.surface};-webkit-text-size-adjust:100%;">
  <!-- The preheader: the grey line a client shows beside the subject. Without
       one, clients lift the first words of the header instead. Hidden in the
       body itself by zero dimensions and transparent colour. -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;color:transparent;">${escape(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.surface};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:14px;overflow:hidden;">

          <tr>
            <td style="background:${BRAND.header};padding:22px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:19px;font-weight:700;letter-spacing:-0.02em;color:${BRAND.white};">
                    Insoora
                  </td>
                  <td align="right" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#c7d2fe;">
                    Insurance policy management
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="pad" style="padding:28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <h1 style="margin:0 0 18px;font-size:21px;line-height:1.3;font-weight:700;letter-spacing:-0.02em;color:${BRAND.ink};">${escape(heading)}</h1>
              ${body}
            </td>
          </tr>

          <tr>
            <td style="border-top:1px solid ${BRAND.border};background:${BRAND.surface};padding:18px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.muted};">
              Insoora &middot; ${escape(CONTACT.address.city)}, ${escape(CONTACT.address.state)}, ${escape(CONTACT.address.country)}<br>
              <a href="${CONTACT.phoneHref}" style="color:${BRAND.primary};text-decoration:none;">${escape(CONTACT.phone)}</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** One label/value row of the notification's detail table.
 *
 *  `—` for an absent optional field rather than an omitted row: a reader
 *  scanning the notification should be able to see that no phone number was
 *  given, which a missing row does not tell them. */
function row(label: string, value: string, { mono = false }: { mono?: boolean } = {}): string {
  const given = value.trim() !== "";
  return `<tr>
  <td class="label" valign="top" width="150" style="padding:9px 14px 9px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">${escape(label)}</td>
  <td class="value" valign="top" style="padding:9px 0;font-size:15px;line-height:1.5;color:${given ? BRAND.ink : BRAND.muted};${mono ? "font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;" : ""}border-bottom:1px solid ${BRAND.border};word-break:break-word;">${given ? value : "&mdash;"}</td>
</tr>`;
}

/** A mailto/tel/href value as a link, or plain text when absent. */
function link(href: string, text: string): string {
  return `<a href="${escape(href)}" style="color:${BRAND.primary};text-decoration:none;">${escape(text)}</a>`;
}

/** A website as the visitor typed it, linked with a scheme added if missing. */
function websiteLink(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return link(href, trimmed);
}

export interface EnquiryContext {
  fields: EnquiryFields;
  reference: string;
  at: Date;
  /** The page the form was submitted from, as an absolute URL. */
  sourceUrl: string;
  /** Whether the product's database accepted the enquiry. Printed in the
   *  notification, because it decides whether the row exists in the back
   *  office or whether this email is the only record of it. */
  stored: boolean;
}

// ── The notification to the business ─────────────────────────────────────

/**
 * Subject: exactly the line the business asked for.
 *
 * The reference is NOT in the subject, deliberately. A fixed subject threads
 * in Gmail — every enquiry collapses into one conversation — which is wrong
 * for a queue of unrelated leads. The enquirer's name is appended instead,
 * which both breaks the threading and makes the list scannable; the brief's
 * line is preserved as the prefix.
 */
export function adminNotification(ctx: EnquiryContext): Email {
  const { fields: f, reference, at, sourceUrl, stored } = ctx;
  const type = enquiryType(f.type);
  const name = f.name.trim();
  const email = f.email.trim();

  const details = [
    row("Received", escape(timestamp(at))),
    row("Reference", escape(reference), { mono: true }),
    row("Name", escape(name)),
    row("Business email", link(`mailto:${email}`, email)),
    row("Phone", f.phone.trim() ? link(`tel:${f.phone.trim().replace(/\s/g, "")}`, f.phone.trim()) : ""),
    row("Company / agency", escape(f.company.trim())),
    row("Website", websiteLink(f.website)),
    row("Enquiry type", escape(type?.label ?? f.type)),
    row("Submitted from", link(sourceUrl, sourceUrl)),
  ].join("");

  const body = `
  <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:${BRAND.muted};">
    ${escape(name)} sent an enquiry through the website contact form. Reply to this email to answer them directly.
  </p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
    ${details}
  </table>

  <h2 style="margin:0 0 10px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.muted};">Message</h2>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;">
    <tr>
      <td style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;padding:16px 18px;">
        ${paragraphs(f.message.trim())}
      </td>
    </tr>
  </table>

  ${
    stored
      ? `<p style="margin:0;font-size:13px;line-height:1.6;color:${BRAND.muted};">This enquiry is also saved in the Insoora back office under the reference above.</p>`
      : // The case worth shouting about. If the product's database did not
        // accept the enquiry, this email is the ONLY record of it, and a reader
        // who assumes otherwise will leave the lead sitting in a queue that
        // does not contain it.
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#fff7e6;border:1px solid #f6d79a;border-radius:10px;padding:14px 16px;font-size:13px;line-height:1.6;color:#7a4a05;">
        <strong>This email is the only record of this enquiry.</strong> Saving it to the Insoora back office failed, so it will not appear in the enquiries list. Reply from here and keep this message.
      </td>
    </tr>
  </table>`
  }`;

  const text = [
    `New contact enquiry — Insoora website`,
    ``,
    `Received:         ${timestamp(at)}`,
    `Reference:        ${reference}`,
    `Name:             ${name}`,
    `Business email:   ${email}`,
    `Phone:            ${f.phone.trim() || "—"}`,
    `Company / agency: ${f.company.trim() || "—"}`,
    `Website:          ${f.website.trim() || "—"}`,
    `Enquiry type:     ${type?.label ?? f.type}`,
    `Submitted from:   ${sourceUrl}`,
    ``,
    `Message:`,
    f.message.trim(),
    ``,
    stored
      ? `This enquiry is also saved in the Insoora back office under the reference above.`
      : `WARNING: saving this enquiry to the Insoora back office failed. This email is the only record of it.`,
  ].join("\n");

  return {
    to: [],
    subject: `New Contact Enquiry – Insoora Website — ${name}`,
    html: layout({
      heading: "New contact enquiry",
      preheader: `${name} — ${type?.label ?? "enquiry"} — ${reference}`,
      body,
    }),
    text,
    // Reply goes to the enquirer, not back to the website. From stays the
    // verified domain so the visitor's own DMARC policy is never in play.
    replyTo: email,
  };
}

// ── The confirmation to the visitor ──────────────────────────────────────

/**
 * Sent to the address the visitor typed, and only after the notification has
 * been accepted.
 *
 * ── What it deliberately does not do ─────────────────────────────────────
 *
 * It does not quote the message back in full, it names no internal mailbox,
 * and it promises no response time. The site says "we reply to every enquiry
 * by email" and that is the whole of what this repeats — a committed
 * turnaround nobody has agreed to is a promise the business did not make.
 *
 * It also does not say "just reply to this email", which is the line a
 * confirmation normally carries. The From address is a SENDING identity on a
 * domain verified with the mail provider; whether anybody reads mail that
 * arrives at it is a separate decision the business has not made, and
 * inviting a reply into an unmonitored mailbox loses the reply silently.
 * The phone number and the reference are offered instead. If that mailbox is
 * ever monitored, restoring the line is a one-sentence change here.
 *
 * It is also the reason the double-submit guard in the route exists: this is
 * mail sent to an address supplied by whoever filled in the form, which is an
 * open relay with extra steps if the form can be submitted in a loop.
 */
export function visitorConfirmation(ctx: EnquiryContext): Email {
  const { fields: f, reference, at } = ctx;
  const type = enquiryType(f.type);
  const first = f.name.trim().split(/\s+/)[0];

  const body = `
  <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${BRAND.ink};">
    Hi ${escape(first)},
  </p>
  <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${BRAND.ink};">
    Thank you for contacting Insoora. Your enquiry has been received and our team will get back to you by email.
  </p>
  <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:${BRAND.ink};">
    There is nothing you need to do — we have your details and we will come back to you.
  </p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;">
    <tr>
      <td style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;padding:16px 18px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="label" valign="top" width="140" style="padding:0 14px 8px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${BRAND.muted};">Your reference</td>
            <td class="value" valign="top" style="padding:0 0 8px;font-size:15px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:${BRAND.ink};">${escape(reference)}</td>
          </tr>
          <tr>
            <td class="label" valign="top" width="140" style="padding:0 14px 8px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${BRAND.muted};">Enquiry about</td>
            <td class="value" valign="top" style="padding:0 0 8px;font-size:15px;color:${BRAND.ink};">${escape(type?.label ?? "General enquiry")}</td>
          </tr>
          <tr>
            <td class="label" valign="top" width="140" style="padding:0 14px 0 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${BRAND.muted};">Sent</td>
            <td class="value" valign="top" style="font-size:15px;color:${BRAND.ink};">${escape(timestamp(at))}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <p style="margin:0 0 6px;font-size:13px;line-height:1.65;color:${BRAND.muted};">
    If something is urgent, or you would like to add to this enquiry, call us on
    ${link(CONTACT.phoneHref, CONTACT.phone)} and quote the reference above.
  </p>
  <p style="margin:0;font-size:13px;line-height:1.65;color:${BRAND.muted};">
    Please don't send policy documents, policy numbers or financial details by email. For a change to a policy on record, contact your insurance agent &mdash; they hold it and are the only one who can change it.
  </p>`;

  const text = [
    `Hi ${first},`,
    ``,
    `Thank you for contacting Insoora. Your enquiry has been received and our team will get back to you by email.`,
    ``,
    `Your reference: ${reference}`,
    `Enquiry about:  ${type?.label ?? "General enquiry"}`,
    `Sent:           ${timestamp(at)}`,
    ``,
    `There is nothing you need to do — we have your details and we will come back to you.`,
    ``,
    `If something is urgent, or you would like to add to this enquiry, call us on ${CONTACT.phone} and quote the reference above.`,
    ``,
    `Please don't send policy documents, policy numbers or financial details by email. For a change to a policy on record, contact your insurance agent — they hold it and are the only one who can change it.`,
    ``,
    `Insoora — ${CONTACT.address.city}, ${CONTACT.address.state}, ${CONTACT.address.country}`,
  ].join("\n");

  return {
    to: [f.email.trim()],
    subject: "We've received your enquiry – Insoora",
    html: layout({
      heading: "We've received your enquiry",
      preheader: `Your reference is ${reference}. Our team will reply by email.`,
      body,
    }),
    text,
  };
}

/** Every enquiry-type label, for the `.env.example` note and for tests. */
export const ENQUIRY_TYPE_LABELS = ENQUIRY_TYPES.map((t) => t.label);
