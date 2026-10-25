"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, CheckCheck, Send } from "lucide-react";
import { api, ClientApiError } from "@/lib/client-api";
import { Spinner } from "@/components/ui";
import { ACCENT_TILE } from "@/lib/accents";
import { cn } from "@/lib/utils";

// The Contact Us form.
//
// Validation runs on the client for a fast answer and again on the server,
// which is the one that counts (`/api/enquiries`). The two rule sets are
// written to match, so a field never passes here and fails there.
//
// Errors appear only after the first submit attempt, not while the visitor is
// still typing their email — validating a half-typed address is just noise.
// On a failed submit focus moves to the first bad field, so a keyboard or
// screen-reader user is taken to the problem rather than left guessing.

const TYPES = [
  { value: "product", label: "Product question" },
  { value: "agency", label: "Agency / team setup" },
  { value: "support", label: "Account support" },
  { value: "other", label: "Something else" },
] as const;

const MAX_MESSAGE = 1000;

interface Fields {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", phone: "", type: "product", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  if (!f.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter an email like name@agency.com.";
  if (f.phone.trim() && !/^\+?[0-9\s-]{10,15}$/.test(f.phone.trim())) {
    e.phone = "Enter a 10-digit mobile number, or leave blank.";
  }
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

const FIELD_ORDER: (keyof Fields)[] = ["name", "email", "phone", "message"];

/** Shared input styling, so every control on the form is the same height.
 *
 *  The focus treatment is the site's: the border moves AND a soft wide ring
 *  is laid down. A 1px border change on its own is something people genuinely
 *  miss, and the shared Button and Input in components/ui already draw the
 *  halo — the form was the one surface still using a tighter 2px ring. */
const CONTROL =
  "h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-invalid:border-danger aria-invalid:focus:ring-danger/20";

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
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger">
      <AlertCircle className="size-3.5 shrink-0" />
      {children}
    </p>
  );
}

export function EnquiryForm() {
  const [f, setF] = React.useState<Fields>(EMPTY);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [sentTo, setSentTo] = React.useState({ first: "", email: "" });
  // The honeypot is uncontrolled — nothing should ever type into it, so it
  // has no business in `Fields`. Read on submit so its value can actually be
  // sent; see the note at the field itself.
  const honeypot = React.useRef<HTMLInputElement>(null);
  // The success panel replaces the form, so focus would otherwise be left on
  // a button that no longer exists and fall back to <body>. Moved to the
  // confirmation heading instead, which is also what announces it.
  const confirmation = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    if (status === "success") confirmation.current?.focus();
  }, [status]);

  const errors = touched ? validate(f) : {};
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: k === "message" ? e.target.value.slice(0, MAX_MESSAGE) : e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validate(f);
    if (Object.keys(found).length) {
      const first = FIELD_ORDER.find((k) => found[k]);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await api("/api/enquiries", {
        method: "POST",
        json: {
          name: f.name.trim(),
          email: f.email.trim(),
          phone: f.phone.trim(),
          type: f.type,
          message: f.message.trim(),
          // The honeypot. It was rendered on the page but never submitted,
          // so the field was decoration: a bot that filled it in was accepted
          // exactly like a human. It is checked by THIS site's own relay
          // route, which drops the field before forwarding — so the product's
          // request contract is untouched either way. A real visitor sends "".
          company_website: honeypot.current?.value ?? "",
        },
      });
      setSentTo({ first: f.name.trim().split(/\s+/)[0], email: f.email.trim() });
      setStatus("success");
      setF(EMPTY);
      setTouched(false);
    } catch (err) {
      // The typed message is still in state, so nothing the visitor wrote is
      // lost — they can press send again once the connection is back.
      setStatus("error");
      if (err instanceof ClientApiError && err.status === 429) {
        setSentTo({ first: "", email: err.message });
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
          Message sent
        </h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Thanks{sentTo.first ? `, ${sentTo.first}` : ""}. We&apos;ve received your enquiry and will reply
          to <span className="font-semibold">{sentTo.email}</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <h2 className="text-[22px] font-bold tracking-[-0.025em] text-foreground">Send an enquiry</h2>

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger-soft p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-danger">
            <AlertCircle className="size-4" />
            Your message wasn&apos;t sent.
          </p>
          <p className="mt-1 text-sm text-foreground/80">
            {sentTo.email && !sentTo.first
              ? sentTo.email
              : "Please check your connection and try again. Nothing was lost — your details are still here."}
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="f-name">Full name</Label>
          <input
            id="f-name"
            name="name"
            value={f.name}
            onChange={set("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "e-name" : undefined}
            className={cn(CONTROL, errors.name ? "border-danger" : "border-border")}
          />
          <FieldError id="e-name">{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="f-email">Business email</Label>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            value={f.email}
            onChange={set("email")}
            autoComplete="email"
            placeholder="name@agency.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "e-email" : undefined}
            className={cn(CONTROL, errors.email ? "border-danger" : "border-border")}
          />
          <FieldError id="e-email">{errors.email}</FieldError>
        </div>
        <div>
          <Label htmlFor="f-phone" hint="(optional)">
            Phone
          </Label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={f.phone}
            onChange={set("phone")}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "e-phone" : undefined}
            className={cn(CONTROL, errors.phone ? "border-danger" : "border-border")}
          />
          <FieldError id="e-phone">{errors.phone}</FieldError>
        </div>
        <div>
          <Label htmlFor="f-type">Enquiry type</Label>
          <select
            id="f-type"
            name="type"
            value={f.type}
            onChange={set("type")}
            className={cn(CONTROL, "border-border")}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="f-message">Message</Label>
        <textarea
          id="f-message"
          name="message"
          value={f.message}
          onChange={set("message")}
          rows={5}
          maxLength={MAX_MESSAGE}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "e-message" : "message-count"}
          className={cn(
            "w-full rounded-md border bg-background p-3 text-sm leading-relaxed text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-invalid:border-danger aria-invalid:focus:ring-danger/20",
            errors.message ? "border-danger" : "border-border",
          )}
          placeholder="Tell us how you manage policies today, and what you'd like to change."
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <FieldError id="e-message">{errors.message}</FieldError>
          <span id="message-count" className="ml-auto shrink-0 text-xs tabular-nums text-muted">
            {f.message.length} / {MAX_MESSAGE}
          </span>
        </div>
      </div>

      {/* Honeypot: off-screen rather than display:none, which some bots skip.
          A real visitor never reaches it — it is not in the tab order.

          Its value is read on submit and sent as `company_website`, which is
          the field the product's /api/enquiries rejects a non-empty value on.
          Without that it was a field nothing looked at. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          ref={honeypot}
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-xs leading-relaxed text-muted">
        Please don&apos;t include policy documents or personal policy numbers here. By sending, you agree
        to our{" "}
        <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      {/* The site's primary action: the brand gradient, the same radius and
          the same violet lift as "Get Started" in the header, the hero and
          the conversion band. It was the one flat-blue `rounded-md` button
          left on a site whose primary actions all carry the gradient. */}
      <button
        type="submit"
        disabled={sending}
        style={{ backgroundImage: "var(--gradient-brand)" }}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(124,58,237,.85)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? <Spinner className="size-4" /> : <Send aria-hidden className="size-4" />}
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
