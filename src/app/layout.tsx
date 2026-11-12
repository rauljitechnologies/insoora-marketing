import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { Container } from "@/components/marketing/section";
import { CONTACT, addressLines, mapsSearchHref } from "@/lib/contact";
import { BrandLogo } from "@/components/brand";
import { SiteNav, type SiteNavItem } from "@/components/marketing/site-nav";
import { SignInLinks, SignInMenu } from "@/components/marketing/sign-in-menu";
import { SocialLinks } from "@/components/marketing/social-links";
import { Analytics, CookieSettingsButton } from "@/components/marketing/analytics";
import { LanguageTranslate } from "@/components/marketing/language-translate";
import { cn } from "@/lib/utils";
import { appHref } from "@/lib/site-config";
import { PRODUCT, siteUrl } from "@/lib/seo";
import { PORTAL_PAGES, SOLUTION_PAGES, solutionsInColumn } from "@/lib/solutions";
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
// because every page sets its own it only ever reached the one route
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

  // ── Search engine ownership verification ──────────────────────────────
  //
  // `other` rather than a named key because Next only spells out Google,
  // Yandex and Yahoo; anything else is emitted verbatim as
  // `<meta name="<key>" content="<value>">`, which is exactly the tag Bing
  // Webmaster Tools asks to be pasted into the home page's <head>.
  //
  // ── Why it lives in the ROOT LAYOUT and not on the home page ──────────
  //
  // Bing only reads it at the site root, so page.tsx would be enough and is
  // where the instructions point. It goes here anyway, for two reasons.
  //
  // The first is that metadata is merged SHALLOWLY, per top-level key (see
  // the long note on `OG_IMAGE` in lib/seo for what that rule has already
  // cost this codebase once). No page sets `verification`, so every page
  // inherits this one — whereas a key set on the home page lives inside an
  // object that is spread from `pageMetadata` and then overridden, which is
  // precisely the shape someone refactors without noticing what fell out.
  //
  // The second is the failure mode. A verification tag that silently stops
  // being emitted does not break a build, a test or a page — Bing simply
  // un-verifies the property weeks later, and nobody connects the two. The
  // durable place is the file that cannot stop rendering.
  //
  // This is an OWNERSHIP TOKEN, not a secret and not a ranking signal. It
  // proves whoever controls this deployment also controls the Bing property;
  // it is public by design, visible in the HTML of every page, and safe in
  // the repository. It is also unrelated to the indexing gate above: this
  // tag ships whether or not `NEXT_PUBLIC_SITE_URL` has made the site
  // indexable, which is correct, because a property has to be verifiable
  // before there is anything to report on.
  verification: {
    other: {
      // Bing Webmaster Tools. Paired with this deployment's own property —
      // regenerating it in the Bing dashboard invalidates this string.
      "msvalidate.01": "7FA8F2D2D9F45DC784FCB4160C97BEB1",
    },
  },
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

// ── The header ───────────────────────────────────────────────────────────
//
// Five top-level entries, which is what it was before twelve pages were
// added, and the constraint that keeps it at five is physical rather than
// stylistic. The bar is one non-wrapping flex row and its tightest band is
// just below `shell` (1000px): five labels plus both actions plus the brand
// lockup inside 936px of container, which is already why the lockup drops its
// tagline there (see components/brand.tsx). A sixth label measures about
// ninety pixels and there are not ninety pixels.
//
// So the twelve new pages went into the existing shelves rather than onto the
// bar. "Product" grew from three entries to seven — the three pages that
// describe the product, and the four that each describe one portal — and a
// new "Solutions" shelf carries the eight keyword-led pages in two columns.
// "About Us" moved into "Company" alongside Blog, the FAQ and the legal
// documents, which is what paid for "Solutions".
//
// A dropdown trigger is a BUTTON, so none of these child URLs is a link in
// the header. The footer does the crawlable linking for all of them; see
// FOOTER_COLUMNS and FOOTER_SHELVES below, and the note on `SiteNavItem`.

/** The four portal tours, as header rows. Read from the collection, so a new
 *  one cannot be added without appearing in the navigation. */
const PORTAL_LINKS = PORTAL_PAGES.map((p) => ({
  href: `/${p.slug}`,
  label: p.nav.label,
  hint: p.nav.hint,
  group: "By portal",
}));

/** The eight solution pages, as header rows. Same reasoning. */
const SOLUTION_LINKS = SOLUTION_PAGES.map((p) => ({
  href: `/${p.slug}`,
  label: p.nav.label,
  hint: p.nav.hint,
}));

const NAV: SiteNavItem[] = [
  { href: "/", label: "Home" },
  {
    // `href` is /features, which is both the shelf's own landing page and the
    // first child, so the group lights up as current on all seven.
    href: "/features",
    label: "Product",
    menuWidth: "w-[21rem]",
    children: [
      {
        href: "/features",
        label: "Features",
        hint: "Every capability, and where each one stops",
        group: "Overview",
      },
      {
        href: "/how-it-works",
        label: "How It Works",
        hint: "The seven steps a policy PDF takes",
        group: "Overview",
      },
      {
        href: "/product-in-action",
        label: "Product in Action",
        hint: "Every screen, drawn with sample data",
        group: "Overview",
      },
      ...PORTAL_LINKS,
    ],
  },
  {
    // The shelf's own href is its first child. There is no /solutions index
    // page: inventing one to sit above eight pages that already link to each
    // other would be a page with nothing of its own to say, and the brief
    // rules out pages created to fill a slot.
    href: `/${SOLUTION_PAGES[0].slug}`,
    label: "Solutions",
    // Two columns, because eight rows with hints in one column is about 480px
    // of panel — taller than the space under the header on a laptop, which is
    // the point at which a dropdown stops being one.
    menuWidth: "w-[34rem]",
    menuColumns: 2,
    children: SOLUTION_LINKS,
  },
  {
    href: "/about-us",
    label: "Company",
    menuWidth: "w-[19rem]",
    children: [
      { href: "/about-us", label: "About Us", hint: "The company behind Insoora", group: "Company" },
      { href: "/blog", label: "Blog", hint: "Guides on filing, renewals and extraction", group: "Learn" },
      { href: "/faq", label: "FAQ", hint: "How extraction, access and renewals work", group: "Learn" },
      {
        href: "/privacy-policy",
        label: "Privacy Policy",
        hint: "What is stored and who can reach it",
        group: "Legal",
      },
      {
        href: "/terms-and-conditions",
        label: "Terms & Conditions",
        hint: "The terms of using Insoora",
        group: "Legal",
      },
      {
        href: "/refund-and-cancellation",
        label: "Refund & Cancellation",
        hint: "Cancelling a plan, and how refunds are handled",
        group: "Legal",
      },
    ],
  },
  { href: "/contact-us", label: "Contact Us" },
];

// ── The footer ───────────────────────────────────────────────────────────
//
// Five columns: the brand, then Product, Solutions, Resources and Legal.
//
// ── What changed, and why ────────────────────────────────────────────────
//
// It was brand + Product + Solutions + Portals + "Resources & company", with
// a trust strip under the grid and a closing bar carrying the operating
// company's name. Three things were wrong with that shape.
//
//   1. "Resources & company" was a drawer. Seven links — Blog, FAQ, About,
//      Contact and all three legal documents — in one column headed with a
//      conjunction, which is what a column gets called when nobody decided
//      what it was for. Legal is its own column now, and it is the column a
//      reader actually goes to the footer to find.
//   2. "Portals" was a column of three for a distinction the reader does not
//      have. Someone scanning a footer asks "is there something here for an
//      agency like mine", not "is this page a portal tour". The three tours
//      now sit under Solutions beside the two pages about the kinds of
//      business that use them.
//   3. The grid was followed by two more bands. The trust strip repeated
//      four claims the home page already makes in a section of its own, and
//      the closing bar ran the copyright, the operating company and the
//      build location together into one grey paragraph. Both are gone; the
//      bar is a copyright and three links.
//
// ── On the operating company ─────────────────────────────────────────────
//
// The "Managed by Raulji Technologies Private Limited" attribution has been
// removed from the footer at the business's instruction. It is NOT removed
// anywhere else, and that is a decision rather than an oversight: the
// Privacy Policy, the Terms, the About page and the Contact page all still
// name the company, because those are the pages a visitor goes to in order
// to find out who they are contracting with, and the answer has to be there.
// `CONTACT.legalEntity` and `CONTACT.companyUrl` in lib/contact remain the
// one definition those pages read.
//
// ── Why the columns are still generated ──────────────────────────────────
//
// Product and Solutions are read from `lib/solutions`, so a page cannot be
// published without a crawlable link to it. That matters more here than
// anywhere else on the site, because every one of those URLs is a child of
// a header dropdown whose trigger is a BUTTON — and a button is not a link
// a crawler can follow. `footerColumn` decides which of the two a solution
// page lands in, and `lib/solutions` fails the build if a page declares
// neither.
//
// Three links from the original design are still absent — Help centre,
// Getting started guide, Pricing. A footer link that 404s is worse than a
// shorter footer, and Pricing in particular cannot be written because no
// price is published anywhere on this site.

/** A link in one of the four list columns. */
interface FooterLink {
  href: string;
  label: string;
  /** An absolute URL into the product: a plain <a>, never a <Link>. */
  external?: boolean;
}

const FOOTER_COLUMNS: { t: string; tone: string; links: FooterLink[] }[] = [
  {
    // The capabilities: six generated pages, then the three that describe
    // the product as a whole. `solutionsInColumn` carries the editorial rule
    // for which side of the line a page falls on — see lib/solutions/types.
    t: "Product",
    tone: "text-[#93C5FD]",
    links: [
      ...solutionsInColumn("product").map((p) => ({ href: `/${p.slug}`, label: p.nav.label })),
      { href: "/how-it-works", label: "How it works" },
      { href: "/features", label: "Features" },
      // Kept although it is not among the eight the brief lists. It is a real
      // page and the footer is its only site-wide crawlable link — the header
      // entry sits inside a dropdown whose trigger is a button, so dropping it
      // here would cut its inbound links from thirty-four to the three portal
      // breadcrumbs that name it as their parent.
      { href: "/product-in-action", label: "Product in action" },
    ],
  },
  {
    // Who is using it: the two pages about a kind of business, then the three
    // portal tours. A reader who recognises themselves in "agency management"
    // wants the agency portal next, and making them cross to a fourth column
    // to find it was the old shape's mistake.
    //
    // Three portals and no more. The admin tour is retired — the back office
    // is operated by this company rather than by an agency, so a public page
    // for it marketed a portal no visitor can ever sign into. See the note in
    // lib/solutions and the 308 in next.config.ts.
    t: "Solutions",
    tone: "text-[#7DD3FC]",
    links: [
      ...solutionsInColumn("solutions").map((p) => ({ href: `/${p.slug}`, label: p.nav.label })),
      ...PORTAL_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.nav.label })),
    ],
  },
  {
    t: "Resources",
    tone: "text-[#C4B5FD]",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQs" },
      { href: "/about-us", label: "About Us" },
      { href: "/contact-us", label: "Contact Us" },
      { href: appHref("/agent/register"), label: "Get Started", external: true },
    ],
  },
];

// The fifth column is NOT in the array above, because it is not a list of
// links — it is the office, the phone and the social profiles, rendered as
// a block. It had been sitting under the brand in column one, which made
// column one the tallest thing in the footer and left the right-hand end of
// the grid empty from about the third link down. Moving it to the end
// balances the row and fills the space that was showing.
//
// What used to be here was a Legal column, and it was a duplicate: all
// three of those documents are in the closing bar, two rows below. One of
// the two had to go, and the bar is where a reader looks for them.

/** One footer column link. See the note at the call site for why the height
 *  floor is here rather than left to the line box.
 *
 *  `w-max max-w-full` rather than `w-max` alone. `w-max` sizes the target to
 *  the label instead of the whole column, which is what keeps the gap
 *  between two stacked links from becoming part of either one — but on its
 *  own it also refuses to shrink, and "Refund & Cancellation Policy" is
 *  190px against a 157px column at 360px. It ran 22px past the viewport
 *  edge. `max-w-full` caps it at the track and lets it wrap onto a second
 *  line, which costs nothing on a wide screen (where it already fits) and
 *  is the general fix rather than one for this label: the next long one
 *  wraps too instead of hanging off the side.
 *  */
const FOOTER_LINK =
  "inline-flex min-h-6 w-max max-w-full items-center text-sm text-[#CBD5E1] transition-colors hover:text-white";

/** The legal documents, which live ONLY here now.
 *
 *  Contact Us is deliberately not among them any more: the whole Contact
 *  column sits directly above, with the address and the phone number in it,
 *  and a bar link to the same page under a block that already carries the
 *  details is a link nobody needs twice. Refund & Cancellation takes the
 *  slot, which also means the bar carries all three legal documents rather
 *  than two of them. */
const BAR_LINKS: { href: string; label: string }[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-and-cancellation", label: "Refund & Cancellation Policy" },
];

/**
 * The public website shell.
 *
 * Deliberately NOT `async` and deliberately not reading a session: there is
 * no session on this host. Every one of the public pages is static, which is
 * the whole reason the site is worth deploying apart from the product — a
 * cookie read anywhere in this tree would make them all dynamic again.
 *
 * A signed-in visitor who presses "Sign in" lands on the product's own login,
 * which redirects them into their portal. That hop happens over there.
 */
// `lang="en-IN"`, not `en`. The Open Graph locale is already `en_IN` and the
// WebSite schema already says `inLanguage: "en-IN"`, so a bare `en` on the
// document itself was the one place the three disagreed — and this is the
// declaration a browser, a screen reader and a translation prompt actually
// read. The audience is Indian insurance agents; the copy uses Indian English
// and quotes an Indian address and phone number.
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

  // Below `sm` the header hides its actions entirely, so the drawer is the
  // only route to either portal or to sign-up: it carries both doors plus Get
  // Started, pinned so they cannot scroll out of the menu (see `SiteNav`).
  //
  // `lg` rather than `sm` on the button: at `sm` it was 36px tall, shorter
  // than the 44px sign-in rows above it — the primary call to action was the
  // smallest tap target in the bar.
  const drawerActions = (
    <>
      <SignInLinks />
      <a href={appHref("/agent/register")} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        Get Started
      </a>
    </>
  );

  return (
    <html lang="en-IN" className={cn(inter.variable, "h-full antialiased")}>
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
              "radial-gradient(520px 300px at 100% 0%,rgba(220,38,38,.16),transparent 70%),radial-gradient(520px 320px at 0% 100%,rgba(37,99,235,.20),transparent 70%)",
          }}
        />

        <Container className="relative py-10 sm:py-11 shell:py-12">
          {/* ── The grid ──

              Five tracks on a wide screen: the brand, then four link lists.
              The brand track is 1.6fr so its description keeps a readable
              measure while the four lists stay equal — "Refund & Cancellation
              Policy" is the longest label and sets the floor for the others.

              Below `shell` it is THREE columns, not two. Two gave the four
              lists a 2x2 block under a full-width brand, which on an iPad left
              a column of dead navy down the right of the brand paragraph — the
              exact "uncovered footer space" this redesign is for. At three the
              brand takes two tracks beside Product, and Solutions / Resources
              / Legal fill the row beneath with nothing left over.

              Below `sm` it is two columns with the brand spanning both: four
              link lists stacked one per row is a very tall footer on a phone,
              and these labels are short enough to sit two-up. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-9 md:grid-cols-3 md:gap-y-10 shell:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] shell:gap-x-10">
            {/* ── Column one: who this is ── */}
            {/* `col-span-2` up to `shell`, then back to one track.
                Without the reset the brand kept two of the five columns at
                desktop width, which filled row one with brand+Product+
                Solutions+Resources and pushed Legal onto a row of its own
                under the brand — three empty tracks beside it. */}
            <div className="col-span-2 flex min-w-0 flex-col gap-4 shell:col-span-1">
              {/* The stacked lockup already carries the tagline ("Your
                  insurance, always with you") under the wordmark — see
                  components/brand.tsx. It is deliberately not repeated as a
                  separate line of copy here. */}
              <BrandLogo tone="dark" variant="stacked" />

              <p className="max-w-sm text-sm leading-[1.7] text-[#94A3B8]">
                Insoora helps insurance agents and agencies organize policy documents, manage
                customer-wise insurance records and track important policy expiry information
                in one place.
              </p>

              {/* The official site, as the brief asks for it — but as a
                  relative link to "/" rather than the absolute
                  https://www.insoora.com/. The two resolve to the same place
                  on the production host, and an absolute one would send a
                  visitor on a preview deployment, or on any host that is not
                  www, across to production mid-session. The domain is still
                  what is printed, which is the point of showing it. */}
              <Link
                href="/"
                className="inline-flex w-max min-h-6 items-center text-sm font-semibold text-[#93C5FD] transition-colors hover:text-white"
              >
                www.insoora.com
              </Link>
            </div>

            {/* ── Columns two to five: the link lists ──

                `aria-label` on each `nav` is what keeps four navigation
                landmarks in one footer distinguishable: a screen reader
                announces "Product navigation", not four identical ones. */}
            {FOOTER_COLUMNS.map((c) => (
              <nav key={c.t} aria-label={c.t} className="flex min-w-0 flex-col gap-2.5">
                <strong className={cn("text-[13px] uppercase tracking-[0.08em]", c.tone)}>{c.t}</strong>
                {c.links.map((l) =>
                  // An absolute URL into the product gets a plain anchor:
                  // there is no client-side route across an origin.
                  //
                  // `inline-flex min-h-6 items-center w-max`: these are
                  // stacked navigation links, not links inside a sentence, so
                  // WCAG 2.2's 24px minimum target size applies with no
                  // inline exception to fall back on. At `text-sm` the line
                  // box is 20px. The column's own gap provides the spacing,
                  // so raising each link to 24px costs no layout — and
                  // `w-max` keeps the target the width of the label rather
                  // than the whole column, so the gap between two links does
                  // not become part of either one.
                  l.external ? (
                    <a key={l.href + l.label} href={l.href} className={FOOTER_LINK}>
                      {l.label}
                    </a>
                  ) : (
                    <Link key={l.href + l.label} href={l.href} className={FOOTER_LINK}>
                      {l.label}
                    </Link>
                  ),
                )}
              </nav>
            ))}

            {/* ── Column five: how to reach a person ──

                Not a `nav`, because it is not navigation — it is an address,
                a phone number and three profile links. Giving it a fifth
                navigation landmark would have made the footer announce five
                of them to a screen reader, one of which contains no site
                links at all.

                One track at every width, including the phone. Spanning two
                on a phone reads better in isolation — the address stops
                wrapping — but it pushes Resources into a row of its own and
                leaves the track beside it empty, which is the hole this
                whole pass is about. A wrapped address line costs less than a
                visible gap. */}
            <div className="flex min-w-0 flex-col gap-3">
              <strong className="text-[13px] uppercase tracking-[0.08em] text-[#FDE68A]">
                Contact Us
              </strong>

              <address className="flex flex-col gap-2.5 not-italic">
                <span className="flex items-start gap-2 text-sm leading-[1.6] text-[#94A3B8]">
                  <MapPin aria-hidden className="mt-0.5 size-3.5 flex-none text-[#FDBA74]" />
                  <span className="flex flex-col">
                    {addressLines().map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </span>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex w-max min-h-6 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#FCA5A5]"
                >
                  <Phone aria-hidden className="size-3.5 flex-none text-[#FCA5A5]" />
                  {CONTACT.phone}
                </a>
                {/* No email address. There is no published mailbox anywhere
                    on this site — the Contact page says so in as many words,
                    and an address that bounces is worse than none. When a
                    real one exists it belongs here, beside the phone, and in
                    lib/contact so the Contact page and this agree. */}
                {/* A maps search by address rather than a place ID — see
                    `mapsSearchHref`. Built from lib/contact, so a corrected
                    address cannot leave this pointing at the old one. */}
                <a
                  href={mapsSearchHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-max min-h-6 items-center gap-1.5 text-sm font-semibold text-[#FCA5A5] transition-colors hover:text-white"
                >
                  Get directions
                  <ArrowRight aria-hidden className="size-3.5" />
                </a>
              </address>

              {/* The profiles the Organization schema lists in `sameAs`. Both
                  read lib/contact, so the markup cannot claim a profile the
                  footer does not link to. */}
              <SocialLinks
                className="mt-0.5 gap-2"
                linkClassName="size-9 border-white/15 text-[#CBD5E1] hover:border-white/30 hover:bg-white/10 hover:text-white"
              />

              {/* Google's Website Translator — now just its dropdown; the
                  heading, the language list and the credit have all been
                  taken out to save footer space.

                  It sits at the foot of the Contact column rather than in
                  the closing bar: the control is 40px tall and the bar is a
                  single row of 13px text, so putting it there would have
                  deepened the bar on every page.

                  Read the header of language-translate.tsx before changing
                  it. Two things there are deliberate and look like bugs: the
                  credit is hidden against Google's terms at the business's
                  instruction, and the widget contributes nothing to search. */}
              <LanguageTranslate className="mt-4" />
            </div>
          </div>

          {/* ── The closing bar ──

              A copyright and three links. No operating-company attribution,
              no build location, no trust badges and no icon row — see the
              note above FOOTER_COLUMNS for what went and why.

              `justify-between` with both children allowed to wrap: at 360px
              the copyright takes one line and the links wrap to the next,
              which is the only arrangement that does not overflow. */}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-[13px] shell:mt-10 text-[#94A3B8]">
            <span>© {new Date().getFullYear()} Insoora. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {BAR_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-h-6 items-center transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
              {/* Reopens the consent banner. Kept although the brief's bar
                  lists only three links: consent has to be as easy to
                  withdraw as it was to give, and without this the only way
                  back from "Accept" is clearing site data. Renders nothing
                  outside production, where there is no banner. */}
              <CookieSettingsButton className="inline-flex min-h-6 items-center transition-colors hover:text-white" />
            </div>
          </div>
        </Container>
      </footer>
    </div>
    {/* Outside `.site`, and last: it renders nothing. */}
    <Analytics />
    </body>
    </html>
  );
}
