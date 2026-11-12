import { ArrowRight, AtSign, Clock, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { Card, GradientText, PageHead, Section } from "@/components/marketing/section";
import { ACCENT_TILE } from "@/lib/accents";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, contactPageSchema, jsonLdGraph, organizationSchema, pageMetadata } from "@/lib/seo";
import { CONTACT, addressLines, mapsSearchHref } from "@/lib/contact";
import { EnquiryForm } from "@/components/marketing/enquiry-form";
import { SocialLinkList } from "@/components/marketing/social-links";
import { appHref } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Insoora about insurance policy management for your agency. Call +91 81530 77965 or send a message — our office is in Godhra, Gujarat.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      {/* Organization schema with the telephone and postal address belongs on
          the page that shows them: the markup and the visible details have to
          agree, and this is where a reader sees both.

          `ContactPage` is what says that THIS page is the place to use those
          details, rather than merely that the business has them. It points at
          the Organization node by `@id` instead of restating the phone
          number, so there is one description of it in the document. */}
      <JsonLd
        data={jsonLdGraph(
          contactPageSchema(),
          organizationSchema(),
          breadcrumbSchema([{ name: "Contact Us", path: "/contact-us" }]),
        )}
      />

      <PageHead
        trail={[{ name: "Contact Us", href: "/contact-us" }]}
        accent="green"
        badge="We reply to every enquiry by email"
        title={
          <>
            Let&apos;s talk about your <GradientText>insurance workflow.</GradientText>
          </>
        }
        lede="Have questions about Insoora, need help getting your agency started, or want to understand how policy document management works? Send us a message. Our team will get back to you."
      />

      <Section>
        {/* The form leads and takes the wider column: it is why the page
            exists. The detail cards sit beside it on desktop and below it on
            anything narrower, so a phone visitor reaches the form first. */}
        <div className="grid gap-6 rail:grid-cols-[minmax(0,1fr)_20rem] rail:items-start">
          <Card className="order-1 p-6 shadow-card-hover sm:p-8">
            <EnquiryForm />
          </Card>

          <div className="order-2 flex flex-col gap-4">
            {/* Phone first: it is the only way to reach a person here without
                filling in the form, and it is what someone who clicked
                "Contact Us" is usually looking for. No email address is
                published until a real mailbox exists — an address that
                bounces is worse than none. */}
            <Card className="card-hover flex flex-col gap-2">
              <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.green)}>
                <Phone className="size-5" />
              </span>
              <p className="text-sm font-semibold text-foreground">Phone</p>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-6 items-center self-start text-[15px] font-semibold text-primary hover:underline"
              >
                {CONTACT.phone}
              </a>
              <p className="text-sm leading-relaxed text-muted">
                Call for anything urgent. Otherwise the form reaches us just as well.
              </p>
              {/* The contact person, by name, because the business asked for
                  it and because a named person is what the consumer and data
                  protection rules expect to find on a contact page.
                  Deliberately labelled "Contact person" and nothing else: no
                  statutory designation has been confirmed, so this page does
                  not call him a Grievance Officer or a Data Protection
                  Officer. See the note in lib/contact. */}
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Contact person:{" "}
                <span className="font-semibold text-foreground">{CONTACT.contactPerson}</span>
              </p>
            </Card>

            <Card className="card-hover flex flex-col gap-2">
              <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.red)}>
                <MapPin className="size-5" />
              </span>
              <p className="text-sm font-semibold text-foreground">Office</p>
              <address className="text-sm not-italic leading-relaxed text-muted">
                <span className="block font-semibold text-foreground">{CONTACT.name}</span>
                {addressLines().map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {/* The footer already offers directions and this page did not,
                  which is the wrong way round — this is the page someone opens
                  when they intend to visit. A maps SEARCH by address rather
                  than a place ID, for the same reason as the footer's: the
                  listing may not exist yet, and a search always resolves to
                  something a visitor can use. */}
              <a
                href={mapsSearchHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-9 items-center gap-1.5 self-start rounded-md text-sm font-semibold text-primary hover:underline"
              >
                Get directions
                <ArrowRight aria-hidden className="size-3.5" />
              </a>
            </Card>

            <Card className="card-hover flex flex-col gap-2">
              <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.teal)}>
                <Clock className="size-5" />
              </span>
              <p className="text-sm font-semibold text-foreground">What to expect</p>
              {/* Three statements, and each one is checkable.

                  Deliberately NO committed turnaround: "within 24 hours" is a
                  promise the business has not made, and a contact page that
                  makes one on its behalf is a contact page that breaks it.
                  Deliberately no office hours either — none has been
                  confirmed, and inventing "Monday to Saturday" to fill the
                  third line would be exactly the fabricated detail the rest
                  of this site refuses.

                  Deliberately nothing about a confirmation EMAIL. Whether one
                  is sent depends on the mail provider being configured and on
                  the send being accepted, neither of which this static page
                  can know. The form's own success panel says it, at the one
                  moment it is actually true — see `confirmationSent` in
                  enquiry-form.tsx. */}
              <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
                <li>Every enquiry gets a reply by email, to the address you give us.</li>
                <li>Each one is given a reference number, shown as soon as it reaches us.</li>
                <li>Call instead if it is urgent — the number is above.</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* ── The three supporting cards, below the two columns ──

            They were the bottom half of the right-hand rail, and that rail
            ran roughly 950px past the foot of the form on a desktop
            viewport: six stacked cards beside one, with the difference
            showing as a column of empty white under the form. The fix is
            not to pad the form out to meet them — it is to stop asking one
            narrow column to carry six cards.

            So the rail keeps the three a visitor came to this page for —
            the number, the address, and what happens after they press send
            — which together stand about as tall as the form beside them.
            These three are the supporting ones, and full width they read
            better than they did at 20rem: each gets a real line length
            instead of six words a line.

            `sm:grid-cols-2` before `rail:grid-cols-3` so the middle widths
            get two sensible columns rather than jumping from one to three.
            They stretch to the tallest of the row, which is what the grid
            does by default and what keeps the three bottoms on one line. */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 rail:mt-6 rail:grid-cols-3">
          {/* Privacy and data requests.

              This card exists because the Privacy Policy promises a route
              for access, correction, deletion and withdrawal of consent,
              and a promise with no visible door is not a route. It points
              at the enquiry form's "Account support" option, which is the
              only intake that actually reaches staff — there is no
              dedicated privacy queue in the product, and inventing a
              second address for one would mean publishing a mailbox nobody
              reads. */}
          <Card className="card-hover flex flex-col gap-2">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.teal)}>
              <ShieldCheck className="size-5" />
            </span>
            <p className="text-sm font-semibold text-foreground">Privacy & data requests</p>
            <p className="text-sm leading-relaxed text-muted">
              To ask for a copy of your data, a correction, deletion, or to withdraw a consent, send the
              form above with <span className="font-medium text-foreground">Account support</span>{" "}
              selected, or call us. We will ask a few questions to confirm it is really you before we act.
            </p>
            <Link
              href="/privacy-policy#14-your-choices-and-requests"
              className="mt-1 inline-flex min-h-9 items-center self-start rounded-md text-sm font-semibold text-primary hover:underline"
            >
              What you can ask for
            </Link>
          </Card>

          {/* The social profiles, with their handles printed: this is the
              page someone opens looking for a way to reach us, and the
              footer's icon row alone does not tell them which account is
              ours. Same list as the footer and the `sameAs` in the schema
              above — all three read lib/contact. */}
          <Card className="card-hover flex flex-col gap-2">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.purple)}>
              <AtSign className="size-5" />
            </span>
            <p className="text-sm font-semibold text-foreground">Follow us</p>
            <p className="text-sm leading-relaxed text-muted">
              Product updates and renewal reminders, as we ship them.
            </p>
            <SocialLinkList className="mt-1" />
          </Card>

          <Card className="card-hover flex flex-col gap-2 border-warning/30 bg-warning-soft">
            <span aria-hidden className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE.orange)}>
              <UserRound className="size-5" />
            </span>
            <p className="text-sm font-semibold text-foreground">Already a customer?</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              For corrections to a policy, contact your insurance agent directly — they hold the record
              and are the only one who can change it.
            </p>
            {/* The customer portal is on the product's origin. */}
            <a
              href={appHref("/customer/login")}
              className="mt-1 inline-flex min-h-9 items-center self-start rounded-md text-sm font-semibold text-primary hover:underline"
            >
              Sign in to your portal
            </a>
          </Card>
        </div>
      </Section>
    </>
  );
}
