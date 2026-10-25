import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, FileQuestion, LifeBuoy, Sparkles, type LucideIcon } from "lucide-react";
import { Container, Eyebrow, GradientText } from "@/components/marketing/section";
import { ACCENT_TILE, heroWash, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

// The 404 page.
//
// There was none, so a mistyped or retired URL fell through to Next's built-in
// not-found: unstyled text inside the site's shell, with no way onward except
// the browser's back button. A 404 is a page a real visitor reaches — from a
// stale link, a truncated URL in an email, an old bookmark — and it is the one
// page where the only useful content is a route out.
//
// No `robots` key here on purpose. Next already emits `<meta name="robots"
// content="noindex">` for a not-found route, and declaring a second one — or
// inheriting one from the root layout, which is what used to happen — puts two
// robots tags on the page saying different things. `noindex` alone still
// permits following, so the links below are crawled.
//
// Everything here is static and server-rendered, like the seven real pages —
// it adds no JavaScript.

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page doesn't exist on the Insoora website. Browse features, read the FAQ, or get in touch.",
};

const ROUTES: { href: string; label: string; body: string; icon: LucideIcon; accent: Accent }[] = [
  {
    href: "/features",
    label: "Features",
    body: "Every capability in detail — PDF extraction, bulk upload, search, renewals and exports — with its limits.",
    icon: Sparkles,
    accent: "purple",
  },
  {
    href: "/faq",
    label: "FAQ",
    body: "How extraction behaves, which documents are supported, and who can see which policy documents.",
    icon: LifeBuoy,
    accent: "orange",
  },
  {
    href: "/",
    label: "Home",
    body: "What Insoora does, how it works in three steps, and who it is built for.",
    icon: Compass,
    accent: "blue",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
    body: "Send an enquiry or call the office in Godhra, Gujarat — we reply to every message by email.",
    icon: FileQuestion,
    accent: "green",
  },
];

export default function NotFound() {
  return (
    <section
      className="overflow-hidden border-b border-[#E6EEFB]"
      style={{ background: heroWash("red") }}
    >
      <Container className="py-16 sm:py-20 shell:py-24">
        <div className="pv-rise flex max-w-3xl flex-col items-start">
          <Eyebrow accent="red">Error 404</Eyebrow>
          <h1 className="mt-3 text-balance text-[32px] font-extrabold leading-[1.08] tracking-[-0.032em] text-foreground sm:text-[40px] shell:text-[46px]">
            That page isn&apos;t <GradientText>here.</GradientText>
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/70">
            The link may be out of date, or the address may have a typo in it. Nothing is wrong with
            your account and no policy data is affected — this is the public website, not the
            platform.
          </p>
        </div>

        {/* The four routes out, as cards rather than a list of blue links: this
            is the whole purpose of the page, so it gets the weight. */}
        <nav aria-label="Where to go next" className="mt-10">
          <ul className="grid gap-4 sm:grid-cols-2">
            {ROUTES.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="card-hover group flex h-full flex-col items-start gap-2.5 rounded-2xl border border-border bg-background p-5 shadow-card sm:p-6"
                >
                  <span
                    aria-hidden
                    className={cn("grid size-11 place-items-center rounded-xl", ACCENT_TILE[r.accent])}
                  >
                    <r.icon className="size-5" />
                  </span>
                  <span className="flex items-center gap-1.5 text-[17px] font-semibold text-foreground">
                    {r.label}
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{r.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
