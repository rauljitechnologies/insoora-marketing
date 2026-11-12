"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, AlertTriangle, CheckCheck, Send } from "lucide-react";
import { api, ClientApiError } from "@/lib/client-api";
import { Spinner } from "@/components/ui";
import { ACCENT_TILE } from "@/lib/accents";
import {
  EMPTY_ENQUIRY,
  ENQUIRY_TYPES,
  type EnquiryErrors,
  type EnquiryFields,
  FIELD_ORDER,
  MAX_FIELD,
  MAX_MESSAGE,
  validate,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

// The Contact Us form.
//
// ── Where the rules live ─────────────────────────────────────────────────
//
// In `lib/enquiry`, and this component imports them rather than restating
// them. `validate` here and `validate` in the route handler are the SAME
// function, so a field cannot pass in the browser and fail on the server —
// which is what used to happen whenever one of two hand-matched rule sets was
// edited and the other was not.
//
// ── When errors appear ───────────────────────────────────────────────────
//
// Only after the first submit attempt, never while the visitor is still
// typing their email address — validating a half-typed address is noise that
// makes a form feel hostile. On a failed submit focus moves to the first bad
// field, so a keyboard or screen-reader user is taken to the problem instead
// of being left to hunt for it.
//
// ── What the success panel may claim ─────────────────────────────────────
//
// Only what the server confirmed. The route returns `stored` and
// `confirmationSent` and the panel's wording is built from them: it mentions
// a confirmation email ONLY when one was actually accepted for delivery. The
// old panel said "we've received your enquiry and will reply to <address>"
// unconditionally, which was true of the storage and said nothing about mail
// because there was no mail. Claiming an email that never left is the one
// failure mode worth engineering against here.

/** The shape the route returns on success. */
interface EnquiryResult {
  data: {
    ok: true;
    reference?: string;
    stored?: boolean;
    confirmationSent?: boolean;
    duplicate?: boolean;
  };
}

/** Shared control styling, so every input, select and textarea on the form is
 *  the same height, radius and focus treatment.
 *
 *  The focus ring is the site's: the border moves AND a soft wide halo is laid
 *  down. A 1px border change on its own is something people genuinely miss,
 *  and the shared Button and Input in components/ui already draw the halo.
 *
 *  `h-11` is 44px — the WCAG 2.5.8 target minimum, and the reason the form is
 *  comfortable on a phone rather than merely usable.
 *
 *  Placeholders are `text-muted` and NOT `text-muted/70`, which is what they
 *  were. The muted token is #5c6b8a — 5.35:1 on white, comfortably past AA —
 *  but at 70% opacity it blends to roughly #8d97ad and 2.9:1, which fails.
 *  A Lighthouse pass caught it on the enquiry-type select, where the same
 *  value styles the unchosen placeholder row rather than a true placeholder
 *  attribute. Dimming a hint until it cannot be read is not a hint. The full
 *  token is still clearly lighter than `text-foreground`, so a placeholder
 *  still reads as one against a filled-in value. */
const CONTROL =
  "h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-invalid:border-danger aria-invalid:focus:ring-danger/20";

function Label({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {hint && <span className="ml-1.5 font-normal text-muted">{hint}</span>}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-danger">
      <AlertCircle className="mt-px size-3.5 shrink-0" />
      {children}
    </p>
  );
}

export function EnquiryForm() {
  const [f, setF] = React.useState<EnquiryFields>(EMPTY_ENQUIRY);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [sent, setSent] = React.useState<{
    first: string;
    email: string;
    reference?: string;
    confirmationSent: boolean;
  }>({ first: "", email: "", confirmationSent: false });
  const [failure, setFailure] = React.useState("");
  /** Errors the SERVER reported, for the one case where the two legitimately
   *  disagree: a submission that did not come from this form. Merged over the
   *  local ones so the right fields are marked. */
  const [serverErrors, setServerErrors] = React.useState<EnquiryErrors>({});

  // The honeypot is uncontrolled — nothing should ever type into it, so it has
  // no business in `EnquiryFields`. Read on submit so its value can actually
  // be sent; see the note at the field itself.
  const honeypot = React.useRef<HTMLInputElement>(null);
  // The success panel replaces the form, so focus would otherwise be left on
  // a button that no longer exists and fall back to <body>. Moved to the
  // confirmation heading instead, which is also what announces it.
  const confirmation = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    if (status === "success") confirmation.current?.focus();
  }, [status]);

  const errors: EnquiryErrors = touched ? { ...validate(f), ...serverErrors } : serverErrors;

  const set =
    <K extends keyof EnquiryFields>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        k === "consent"
          ? (e.target as HTMLInputElement).checked
          : k === "message"
            ? e.target.value.slice(0, MAX_MESSAGE)
            : e.target.value;
      setF((prev) => ({ ...prev, [k]: value }));
      // A field the server complained about stops being marked as soon as it
      // is edited. Leaving the mark in place makes a corrected field look
      // still-wrong, which is how people end up resubmitting unchanged.
      setServerErrors((prev) => (k in prev ? { ...prev, [k]: undefined } : prev));
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    setServerErrors({});
    const found = validate(f);
    if (Object.keys(found).length > 0) {
      const first = FIELD_ORDER.find((k) => found[k]);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await api<EnquiryResult>("/api/enquiries", {
        method: "POST",
        json: {
          name: f.name.trim(),
          email: f.email.trim(),
          phone: f.phone.trim(),
          company: f.company.trim(),
          website: f.website.trim(),
          type: f.type,
          message: f.message.trim(),
          consent: f.consent,
          // The honeypot. It was rendered on the page but never submitted,
          // so the field was decoration: a bot that filled it in was accepted
          // exactly like a human. It is checked by this site's own route,
          // which never forwards it. A real visitor sends "".
          company_website: honeypot.current?.value ?? "",
        },
      });

      setSent({
        first: f.name.trim().split(/\s+/)[0],
        email: f.email.trim(),
        reference: res.data.reference,
        confirmationSent: res.data.confirmationSent === true,
      });
      setStatus("success");
      setF(EMPTY_ENQUIRY);
      setTouched(false);
    } catch (err) {
      // Everything the visitor typed is still in state, so nothing is lost —
      // they can press send again once whatever broke is back.
      setStatus("error");
      if (err instanceof ClientApiError) {
        setFailure(err.message);
        // 422 carries the server's own per-field verdict.
        if (err.status === 422 && err.details && typeof err.details === "object") {
          setServerErrors(err.details as EnquiryErrors);
          const first = FIELD_ORDER.find((k) => (err.details as EnquiryErrors)[k]);
          if (first) document.getElementById(`f-${first}`)?.focus();
        }
      } else {
        setFailure("Please check your connection and try again. Nothing was lost — your details are still here.");
      }
    }
  };

  if (status === "success") {
    return (
      // `role="status"` so the confirmation is announced where it appears
      // rather than only noticed by sighted readers; `tabIndex={-1}` on the
      // heading makes it a focus target without adding it to the tab order.
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-success/30 bg-success-soft p-6"
      >
        <span aria-hidden className={cn("grid size-12 place-items-center rounded-xl", ACCENT_TILE.green)}>
          <CheckCheck className="size-6" />
        </span>
        <h2
          ref={confirmation}
          tabIndex={-1}
          className="text-[22px] font-bold tracking-[-0.025em] text-foreground focus-visible:outline-none"
        >
          Thank you for contacting Insoora
        </h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Your enquiry has been received{sent.first ? `, ${sent.first}` : ""}. Our team will get back to you
          by email.
        </p>

        {/* Said only when the server confirmed the confirmation email was
            accepted for delivery. "On its way to" rather than "sent to":
            acceptance by the mail provider is the furthest this code can
            see, and an inbox is not the same thing. */}
        {sent.confirmationSent && (
          <p className="text-[15px] leading-relaxed text-foreground/80">
            A copy is on its way to <span className="font-semibold">{sent.email}</span>. If it does not
            appear, check your spam folder.
          </p>
        )}

        {sent.reference && (
          <p className="text-sm leading-relaxed text-muted">
            Your reference is{" "}
            <span className="font-semibold tabular-nums text-foreground">{sent.reference}</span> — quote it
            if you call.
          </p>
        )}

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 inline-flex min-h-9 items-center text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[22px] font-bold tracking-[-0.025em] text-foreground">Send us a message</h2>
        <p className="text-sm leading-relaxed text-muted">
          Fields marked <span aria-hidden>*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger-soft p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-danger">
            <AlertCircle className="size-4 shrink-0" />
            Your message wasn&apos;t sent.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{failure}</p>
        </div>
      )}

      {/* Two columns from `sm`, one below it. Every control is `w-full`, so
          the single-column phone layout needs no rules of its own. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="f-name">
            Full name <span aria-hidden className="text-danger">*</span>
          </Label>
          <input
            id="f-name"
            name="name"
            value={f.name}
            onChange={set("name")}
            autoComplete="name"
            maxLength={MAX_FIELD}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "e-name" : undefined}
            className={cn(CONTROL, errors.name ? "border-danger" : "border-border")}
          />
          <FieldError id="e-name">{errors.name}</FieldError>
        </div>

        <div>
          <Label htmlFor="f-email">
            Business email <span aria-hidden className="text-danger">*</span>
          </Label>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            value={f.email}
            onChange={set("email")}
            autoComplete="email"
            maxLength={MAX_FIELD}
            required
            aria-required="true"
            placeholder="name@agency.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "e-email" : undefined}
            className={cn(CONTROL, errors.email ? "border-danger" : "border-border")}
          />
          <FieldError id="e-email">{errors.email}</FieldError>
        </div>

        <div>
          <Label htmlFor="f-phone" hint="(optional)">
            Phone number
          </Label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={f.phone}
            onChange={set("phone")}
            autoComplete="tel"
            maxLength={MAX_FIELD}
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "e-phone" : undefined}
            className={cn(CONTROL, errors.phone ? "border-danger" : "border-border")}
          />
          <FieldError id="e-phone">{errors.phone}</FieldError>
        </div>

        <div>
          <Label htmlFor="f-company" hint="(optional)">
            Company / agency name
          </Label>
          <input
            id="f-company"
            name="company"
            value={f.company}
            onChange={set("company")}
            autoComplete="organization"
            maxLength={MAX_FIELD}
            placeholder="Shah Insurance Services"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "e-company" : undefined}
            className={cn(CONTROL, errors.company ? "border-danger" : "border-border")}
          />
          <FieldError id="e-company">{errors.company}</FieldError>
        </div>

        <div>
          <Label htmlFor="f-website" hint="(optional)">
            Website
          </Label>
          <input
            id="f-website"
            name="website"
            type="url"
            inputMode="url"
            value={f.website}
            onChange={set("website")}
            autoComplete="url"
            maxLength={MAX_FIELD}
            placeholder="agency.com"
            aria-invalid={!!errors.website}
            aria-describedby={errors.website ? "e-website" : undefined}
            className={cn(CONTROL, errors.website ? "border-danger" : "border-border")}
          />
          <FieldError id="e-website">{errors.website}</FieldError>
        </div>

        <div>
          <Label htmlFor="f-type">
            Enquiry type <span aria-hidden className="text-danger">*</span>
          </Label>
          {/* No pre-selected option. The business asked for this to be
              required, and a <select> that arrives set to the first choice is
              not required — it is a default most people submit unread, which
              makes the answer noise in every notification. See
              `EMPTY_ENQUIRY` in lib/enquiry. */}
          <select
            id="f-type"
            name="type"
            value={f.type}
            onChange={set("type")}
            required
            aria-required="true"
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? "e-type" : undefined}
            className={cn(
              CONTROL,
              errors.type ? "border-danger" : "border-border",
              // The placeholder row reads as placeholder text until a real
              // choice is made, which is the only cue a native select gives
              // that nothing has been chosen yet.
              f.type === "" && "text-muted",
            )}
          >
            <option value="" disabled>
              Choose an option…
            </option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="text-foreground">
                {t.label}
              </option>
            ))}
          </select>
          <FieldError id="e-type">{errors.type}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="f-message">
          Message <span aria-hidden className="text-danger">*</span>
        </Label>
        <textarea
          id="f-message"
          name="message"
          value={f.message}
          onChange={set("message")}
          rows={6}
          maxLength={MAX_MESSAGE}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          // The live count is always the described-by target when there is no
          // error, so the remaining allowance is announced rather than being
          // a visual-only cue.
          aria-describedby={errors.message ? "e-message message-count" : "message-count"}
          className={cn(
            "w-full rounded-md border bg-background p-3 text-sm leading-relaxed text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-invalid:border-danger aria-invalid:focus:ring-danger/20",
            errors.message ? "border-danger" : "border-border",
          )}
          placeholder="Tell us how you manage policies today, and what you'd like to change."
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <FieldError id="e-message">{errors.message}</FieldError>
          {/* `aria-live="polite"` so the count is announced as it changes,
              but only when it starts to matter — announcing every keystroke
              from zero would make the field unusable with a screen reader. */}
          <span
            id="message-count"
            aria-live="polite"
            className={cn(
              "ml-auto shrink-0 text-xs tabular-nums",
              f.message.length >= MAX_MESSAGE ? "font-semibold text-danger" : "text-muted",
            )}
          >
            {f.message.length} / {MAX_MESSAGE}
          </span>
        </div>
      </div>

      {/* ── The sensitive-data warning ──

          Its own bordered callout rather than a line of fine print, because
          it is the one instruction on this page a visitor has to read BEFORE
          typing rather than after. As a grey sentence under the button it was
          reliably missed, and the cost of missing it is a policy number in a
          mailbox. */}
      <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning-soft p-4">
        <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-warning" />
        <p className="text-[13px] leading-relaxed text-foreground/80">
          Please do not include insurance policy documents, policy numbers, financial details or other
          sensitive personal information in this form.
        </p>
      </div>

      {/* Honeypot: off-screen rather than display:none, which some bots skip.
          A real visitor never reaches it — it is not in the tab order, and
          `aria-hidden` keeps it out of the accessibility tree.

          Its value is read on submit and sent as `company_website`, which the
          route checks and never forwards. Without that it was a field nothing
          looked at. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input ref={honeypot} id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* ── Consent ──

          A real required checkbox, not an "by sending, you agree" sentence.
          The difference is not cosmetic: the Privacy Policy is what tells
          someone what happens to what they typed, and consent nobody actively
          gave is not consent. The server checks it too — see `validate`. */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="f-consent"
            name="consent"
            type="checkbox"
            checked={f.consent}
            onChange={set("consent")}
            required
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "e-consent" : undefined}
            className={cn(
              // 24px square, which is WCAG 2.5.8's minimum target size, and
              // measured rather than assumed — at `size-5` this was the one
              // control on the whole site that came back under it.
              //
              // The label beside it is a second target for the same action
              // and would arguably have carried the "Equivalent" exception
              // on its own. Relying on an exception to ship a target one
              // notch below the floor is not worth the 4px it saves, and the
              // checkbox is deliberately NOT nested inside that label: the
              // Privacy Policy link lives in the label text, and a link
              // inside a label toggles the checkbox on its way to the page.
              "mt-px size-6 shrink-0 cursor-pointer rounded border-2 accent-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
              errors.consent ? "border-danger" : "border-border",
            )}
          />
          <label htmlFor="f-consent" className="cursor-pointer text-[13px] leading-relaxed text-foreground/80">
            I have read the{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              Privacy Policy
            </Link>{" "}
            and agree to Insoora using the details above to reply to this enquiry.
          </label>
        </div>
        <FieldError id="e-consent">{errors.consent}</FieldError>
      </div>

      {/* The site's primary action: the brand gradient, the same radius and
          the same lift as "Get Started" in the header, the hero and the
          conversion band.

          `w-full` below `sm` and auto above it. A self-start button on a
          360px screen is a small target beside a column of full-width
          fields, and the primary action should not be the hardest thing on
          the form to hit. */}
      <button
        type="submit"
        disabled={sending}
        style={{ backgroundImage: "var(--gradient-brand)" }}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(59,91,245,.65)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:self-start"
      >
        {sending ? <Spinner className="size-4" /> : <Send aria-hidden className="size-4" />}
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
