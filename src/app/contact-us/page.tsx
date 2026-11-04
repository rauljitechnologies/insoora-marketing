import { ArrowRight, AtSign, Clock, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { Card, Eyebrow, GradientText, H2, PageHead, Section } from "@/components/marketing/section";
import { ACCENT_TILE } from "@/lib/accents";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata } from "@/lib/seo";
import { CONTACT, addressLines, addressOneLine, mapsSearchHref } from "@/lib/contact";
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
          agree, and this is where a reader sees both. */}
      <JsonLd
        data={jsonLdGraph(
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
            Let&apos;s talk about <GradientText>your policies.</GradientText>
          </>
        }
        lede="Questions about features, or about getting your agency set up? Call us, or send a message and we'll reply by email."
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
              <p className="text-sm font-semibold text-foreground">Response</p>
              <p className="text-sm leading-relaxed text-muted">We reply to every enquiry by email.</p>
            </Card>

            {/* The social profiles, with their handles printed: this is the
                page someone opens looking for a way to reach us, and the
                footer's icon row alone does not tell them which account is
                ours. Same list as the footer and the `sameAs` in the schema
                above — all three read lib/contact. */}
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
        </div>
      </Section>

      {/* ── Company Information ──

          Who you are actually dealing with, in one block, below the form
          rather than above it: somebody who came here to send a message
          should reach the form first, and somebody checking whether this is a
          real business reads to the bottom anyway.

          A definition list, because that is what this is — six label/value
          pairs — and a <dl> gives a screen reader the pairing that a grid of
          <div>s only implies. Every value is read from lib/contact, the same
          module the footer, the Organization schema and the legal documents
          read, so none of them can drift from the others.

          What is deliberately NOT here: a CIN, a GSTIN, a registered-office
          claim or a designation for the contact person. None of those has
          been verified, and the legal documents carry a review flag naming
          exactly which are still outstanding. A wrong company identifier on a
          public page is worse than an absent one. */}
      <Section id="company" tone="surface" className="border-t border-border">
        <div className="grid gap-8 rail:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] rail:gap-12">
          <div className="flex flex-col gap-2.5">
            <Eyebrow accent="purple">Company Information</Eyebrow>
            <H2>Who you are dealing with</H2>
            <p className="text-pretty text-base leading-relaxed text-foreground/70">
              Insoora is managed by {CONTACT.legalEntity}.
            </p>
          </div>

          <Card className="p-0 sm:p-0">
            <dl className="divide-y divide-border">
              {[
                { t: "Company", v: CONTACT.legalEntity },
                { t: "Product", v: "Insoora — Insurance Management Software" },
                { t: "Contact person", v: CONTACT.contactPerson },
              ].map((row) => (
                <div key={row.t} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4 sm:px-6">
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                    {row.t}
                  </dt>
                  <dd className="text-[15px] font-medium text-foreground">{row.v}</dd>
                </div>
              ))}

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4 sm:px-6">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Location
                </dt>
                <dd className="text-[15px] leading-relaxed text-foreground">
                  <address className="not-italic">{addressOneLine()}.</address>
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4 sm:px-6">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Phone
                </dt>
                <dd>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex min-h-6 items-center text-[15px] font-semibold text-primary hover:underline"
                  >
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4 sm:px-6">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Company website
                </dt>
                <dd>
                  {/* `rel="noopener noreferrer"` on every outbound link — see
                      the note on `companyUrl` in lib/contact. */}
                  <a
                    href={CONTACT.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-6 items-center gap-1.5 text-[15px] font-semibold text-primary hover:underline"
                  >
                    rauljitechnologies.com
                    <ArrowRight aria-hidden className="size-3.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      </Section>
    </>
  );
}
