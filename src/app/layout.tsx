import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { ArrowRight, Download, FileText, Lock, MapPin, Phone, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { Container } from "@/components/marketing/section";
import { CONTACT, addressLines, mapsSearchHref } from "@/lib/contact";
import { BrandLogo } from "@/components/brand";
import { SiteNav, type SiteNavItem } from "@/components/marketing/site-nav";
import { SignInLinks, SignInMenu } from "@/components/marketing/sign-in-menu";
import { SocialLinks } from "@/components/marketing/social-links";
import { cn } from "@/lib/utils";
import { appHref } from "@/lib/site-config";
import { PRODUCT, siteUrl } from "@/lib/seo";
import "./globals.css";

// Site-wide metadata.
//
// `metadataBase` has to be here: without it a relative canonical or Open
// Graph URL is a build error, and every page below uses relative paths. It
// comes from NEXT_PUBLIC_SITE_URL (lib/site-config) — the site's own domain,
// not the product's.
//
// Indexing is decided PER PAGE by `pageMetadata`, which keeps a staging host
// out of the index until a real domain is configured — so there is no `robots`
// key here. There used to be a site-wide `{ index: true, follow: true }`, and
// because all seven pages set their own it only ever reached the one route
// that does not: the 404, where Next emits its own `noindex` and the inherited
// tag then contradicted it. Nothing inherits a robots directive now.
// The description is `PRODUCT.summary`, the same sentence the JSON-LD and the
// Open Graph cards use, rather than a second description of its own. It used
// to read "Insurance policy extraction, review and records — local-first",
// which described the product as local-first; it is a hosted web application,
// and a site-wide description that contradicts the page it sits on is both a
// quality signal and simply wrong. Every page overrides this with its own
// anyway (see `pageMetadata`) — this is the fallback.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${PRODUCT.name} — ${PRODUCT.tagline.replace(/\.$/, "")}`, template: "%s · Insoora" },
  description: PRODUCT.summary,
  applicationName: PRODUCT.name,
};

// Next injects `width=device-width, initial-scale=1` on its own; what it does
// not inject is `viewport-fit=cover`, and without that `env(safe-area-inset-*)`
// resolves to 0 on every device — so the sticky header cannot clear a notch.
//
// Deliberately NOT set: `maximumScale` / `userScalable`. Pinch-zoom is an
// accessibility feature, and "it looks more like an app" is not a reason to
// take it away.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1431" },
  ],
};

// Inter — the site's one typeface.
//
// The design names Inter and gives it a scale (H1 32/700, H2 24/600,
// H3 18/600, body 14/400, small 12/400). The product deployment stays on
// Plus Jakarta Sans; nothing is shared between the two, which is half the
// point of splitting them.
//
// Self-hosted by next/font with a metric-matched fallback, so the face costs
// no request to Google and shifts no layout while it loads.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// The public website shell: a sticky header with a mobile drawer, and the
// design's dark footer. The portals have their own shell
// (`components/portal/chrome`) and share nothing with this.

// "Resources" is a dropdown because it is the shelf the next few pages go on.
//
// Its trigger is a button, so none of the child URLs is a link in the header.
// That is correct for assistive technology, but it means the footer does the
// crawlable linking for them — every child appears there too.
const NAV: SiteNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  {
    href: "/faq",
    label: "Resources",
    children: [
      { href: "/faq", label: "FAQ", hint: "How extraction, access and renewals work" },
      { href: "/privacy-policy", label: "Privacy Policy", hint: "What is stored and who can reach it" },
      { href: "/terms-and-conditions", label: "Terms & Conditions", hint: "The terms of using Insoora" },
    ],
  },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
];

// Footer columns, from the design.
//
// Six of the design's links point at pages that do not exist — Blog, Help
// centre, Getting started guide, Refund Policy, Pricing, Data security. They
// are left out rather than pointed at a placeholder: a footer link that 404s
// is worse than a shorter footer, and inventing those pages to fill the slots
// would be inventing content.
const FOOTER_COLUMNS: { t: string; tone: string; links: SiteNavItem[] }[] = [
  {
    t: "Product",
    tone: "text-[#93C5FD]",
    links: [
      { href: "/features", label: "Features" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#product", label: "Product in action" },
      { href: appHref("/agent/login"), label: "Sign in", external: true },
    ],
  },
  {
    t: "Resources",
    tone: "text-[#FCA5A5]",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact-us", label: "Help & support" },
    ],
  },
  {
    t: "Company",
    tone: "text-[#C4B5FD]",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/contact-us", label: "Contact Us" },
    ],
  },
  {
    t: "Legal",
    tone: "text-[#86EFAC]",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
    ],
  },
];

/** The four controls the footer vouches for. Each one is implemented — this
 *  row is not a badge wall of certifications we do not hold. */
const TRUST: { icon: typeof Lock; t: string; tone: string }[] = [
  { icon: Lock, t: "HTTPS encrypted", tone: "text-[#4ADE80]" },
  { icon: Users, t: "Role-based access", tone: "text-[#93C5FD]" },
  { icon: FileText, t: "Private PDF storage", tone: "text-[#FCA5A5]" },
  { icon: Download, t: "Export anytime", tone: "text-[#C4B5FD]" },
];

/**
 * The public website shell.
 *
 * Deliberately NOT `async` and deliberately not reading a session: there is
 * no session on this host. Every one of the seven pages is static, which is
 * the whole reason the site is worth deploying apart from the product — a
 * cookie read anywhere in this tree would make all seven dynamic again.
 *
 * A signed-in visitor who presses "Sign in" lands on the product's own login,
 * which redirects them into their portal. That hop happens over there.
 */
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  const actions = (
    <>
      <SignInMenu className="hidden sm:inline-flex" />
      {/* A plain <a>, not a <Link>: this is an absolute URL on the product's
          origin, and there is no client-side route across an origin for the
          router to handle or prefetch. Same rule as SiteNavItem.external. */}
      <a
        href={appHref("/agent/register")}
        className="flex h-10 w-full items-center justify-center rounded-md px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(124,58,237,.8)] transition-transform hover:-translate-y-px sm:w-auto"
        style={{ backgroundImage: "var(--gradient-brand)" }}
      >
        Get Started
      </a>
    </>
  );

  // Below `sm` the header hides its actions, so the drawer is the only route
  // to either portal or to sign-up: it carries both doors plus Get Started.
  const drawerActions = (
    <>
      <SignInLinks />
      <a href={appHref("/agent/register")} className={cn(buttonVariants({ size: "sm" }), "w-full")}>
        Get Started
      </a>
    </>
  );

  return (
    <html lang="en" className={cn(inter.variable, "h-full antialiased")}>
    <body className="min-h-full">
    {/* `.site` is kept as a wrapper element rather than moved onto <body>:
        globals.css hangs the site's whole token set and its `.site footer`
        focus rules off this class, and it is shared verbatim with the product
        repo. */}
    <div className="site flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sidebar focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* `relative` so the mobile drawer can anchor to the header. */}
      <header className="sticky top-0 z-40 border-b border-[#EEF2F7] bg-background/90 backdrop-blur-[12px]">
        <Container className="relative flex h-16 items-center gap-6">
          <BrandLogo />
          <SiteNav items={NAV} actions={actions} drawerActions={drawerActions} />
        </Container>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="relative overflow-hidden bg-footer text-[#CBD5E1]">
        {/* The spectrum stripe: the six section accents in order, which is the
            one place the whole palette appears together. */}
        <div
          aria-hidden
          className="h-1"
          style={{
            background:
              "linear-gradient(90deg,#DC2626,#EA580C,#7C3AED,#2563EB,#0891B2,#16A34A)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(500px 280px at 100% 0%,rgba(220,38,38,.18),transparent 70%),radial-gradient(500px 300px at 0% 100%,rgba(37,99,235,.22),transparent 70%)",
          }}
        />
        <Container className="relative py-12 shell:py-14">
          {/* Four bands, each the full width of the column.

              The earlier footer hung a tall office card beside four two-item
              link lists, so whatever filled one side left a hole on the
              other. Nothing here is taller than its neighbours: the office is
              a fifth link column of plain text rather than a card, which puts
              every column within ~20px of the next and leaves the row flat. */}
          <div className="flex flex-col gap-6 border-b border-white/10 pb-10 shell:flex-row shell:items-end shell:justify-between shell:gap-12">
            <div className="flex min-w-0 flex-col gap-4">
              <BrandLogo tone="dark" variant="stacked" />
              <p className="max-w-xl text-[15px] leading-[1.6] text-[#94A3B8]">
                Insurance policy management made simple. Turn policy PDFs into organized, searchable
                records and never miss a renewal.
              </p>
              {/* The social profiles, under the brand lockup rather than in a
                  link column: they are the same entity as the logo above
                  them, not a fifth category of page. These are also the URLs
                  the Organization schema lists in `sameAs` — both come from
                  lib/contact, so the markup cannot claim a profile the
                  footer does not link to. */}
              <SocialLinks
                className="gap-2.5"
                linkClassName="border-white/15 text-[#CBD5E1] hover:bg-white/10 hover:text-white"
              />
            </div>
            <div className="flex flex-none flex-wrap items-center gap-3">
              <a
                href={appHref("/agent/register")}
                className="flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(124,58,237,.8)] transition-transform hover:-translate-y-px"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                Get Started
              </a>
              <Link
                href="/contact-us"
                className="flex h-11 items-center gap-1.5 rounded-md border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Talk to us
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Four link columns of ~177px — enough for "Terms & Conditions" —
              and a wider fifth so the landmark line of the address does not
              wrap. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-11 sm:grid-cols-3 shell:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.25fr)] shell:gap-x-8">
            {FOOTER_COLUMNS.map((c) => (
              <nav key={c.t} aria-label={c.t} className="flex min-w-0 flex-col gap-3">
                <strong className={cn("text-[13px] uppercase tracking-[0.08em]", c.tone)}>{c.t}</strong>
                {c.links.map((l) =>
                  // An absolute URL into the product gets a plain anchor —
                  // see SiteNavItem.external.
                  l.external ? (
                    <a
                      key={l.href + l.label}
                      href={l.href}
                      className="text-sm text-[#CBD5E1] transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.href + l.label}
                      href={l.href}
                      className="text-sm text-[#CBD5E1] transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ),
                )}
              </nav>
            ))}

            {/* The office, from the one definition in lib/contact — a column
                like the others, not a card that towers over them. */}
            <address className="col-span-2 flex min-w-0 flex-col gap-3 not-italic shell:col-span-1">
              <strong className="flex items-center gap-1.5 text-[13px] uppercase tracking-[0.08em] text-[#FDBA74]">
                <MapPin className="size-3.5" />
                Visit us
              </strong>
              <span className="flex flex-col gap-0.5 text-sm leading-[1.6] text-[#CBD5E1]">
                {addressLines().map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#FCA5A5]"
              >
                <Phone className="size-3.5 text-[#FCA5A5]" />
                {CONTACT.phone}
              </a>
              {/* A maps search by address rather than a place ID — see
                  `mapsSearchHref`. Built from lib/contact rather than written
                  out here, so a corrected address cannot leave the directions
                  link pointing at the old one. */}
              <a
                href={mapsSearchHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-[#FCA5A5] transition-colors hover:text-white"
              >
                Get directions
                <ArrowRight className="size-3.5" />
              </a>
            </address>
          </div>

          {/* The four controls as one rule-to-rule strip: spread across the
              full width, they close the band instead of clustering left. */}
          <ul className="grid gap-x-6 gap-y-3 border-y border-white/10 py-5 min-[420px]:grid-cols-2 shell:grid-cols-4">
            {TRUST.map((t) => (
              <li key={t.t} className="flex items-center gap-2.5 text-[13px] font-medium text-[#E2E8F0]">
                <span aria-hidden className="grid size-8 flex-none place-items-center rounded-md bg-white/[0.06]">
                  <t.icon className={cn("size-4", t.tone)} />
                </span>
                {t.t}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 pt-6 text-[13px] text-[#94A3B8]">
            <span>
              © {new Date().getFullYear()} Insoora. All rights reserved. Made in Godhra, Gujarat.
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy-policy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
                Terms
              </Link>
              {/* `#main` rather than `#top`: `#top` is the home page's hero
                  and does not exist on the six inner pages, where this
                  control silently did nothing. Every page has `#main`. */}
              <a
                href="#main"
                className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-2 font-semibold text-white transition-colors hover:bg-white/20"
              >
                <ArrowRight className="size-3.5 -rotate-90" />
                Back to top
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
    </body>
    </html>
  );
}
