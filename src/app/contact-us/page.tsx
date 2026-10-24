import { Clock, MapPin, Phone, UserRound } from "lucide-react";
import { Card, PageHead, Section } from "@/components/marketing/section";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata } from "@/lib/seo";
import { CONTACT, addressLines } from "@/lib/contact";
import { EnquiryForm } from "@/components/marketing/enquiry-form";
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
        title="Let's talk about your policies."
        lede="Questions about features, or about getting your agency set up? Call us, or send a message and we'll reply by email."
      />

      <Section>
        {/* The form leads and takes the wider column: it is why the page
            exists. The detail cards sit beside it on desktop and below it on
            anything narrower, so a phone visitor reaches the form first. */}
        <div className="grid gap-6 rail:grid-cols-[minmax(0,1fr)_20rem] rail:items-start">
          <Card className="order-1">
            <EnquiryForm />
          </Card>

          <div className="order-2 flex flex-col gap-4">
            {/* Phone first: it is the only way to reach a person here without
                filling in the form, and it is what someone who clicked
                "Contact Us" is usually looking for. No email address is
                published until a real mailbox exists — an address that
                bounces is worse than none. */}
            <Card className="flex flex-col gap-2">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Phone className="size-5" />
              </span>
              <p className="text-sm font-semibold text-foreground">Phone</p>
              <a
                href={CONTACT.phoneHref}
                className="text-[15px] font-semibold text-primary hover:underline"
              >
                {CONTACT.phone}
              </a>
              <p className="text-sm leading-relaxed text-muted">
                Call for anything urgent. Otherwise the form reaches us just as well.
              </p>
            </Card>

            <Card className="flex flex-col gap-2">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
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
            </Card>

            <Card className="flex flex-col gap-2">
              <span className="grid size-10 place-items-center rounded-xl bg-secondary-soft text-secondary">
                <Clock className="size-5" />
              </span>
              <p className="text-sm font-semibold text-foreground">Response</p>
              <p className="text-sm leading-relaxed text-muted">We reply to every enquiry by email.</p>
            </Card>

            <Card className="flex flex-col gap-2 border-warning/30 bg-warning-soft">
              <span className="grid size-10 place-items-center rounded-xl bg-background text-warning">
                <UserRound className="size-5" />
              </span>
              <p className="text-sm font-semibold text-foreground">Already a customer?</p>
              <p className="text-sm leading-relaxed text-foreground/80">
                For corrections to a policy, contact your insurance agent directly — they hold the record
                and are the only one who can change it.
              </p>
              {/* The customer portal is on the product's origin. */}
              <a href={appHref("/customer/login")} className="mt-1 text-sm font-semibold text-primary hover:underline">
                Sign in to your portal
              </a>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
