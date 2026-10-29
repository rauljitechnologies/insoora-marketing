import { ImageResponse } from "next/og";
import { CATEGORIES, POSTS, formatPostDate, postBySlug, readingMinutes } from "@/lib/blog";

// Each article's own social card.
//
// The site-wide card (app/opengraph-image.tsx) says what Insoora is, which is
// right for the home page and wrong for an article: five links shared from the
// blog would have produced five identical images, and a reader scrolling a
// feed would have no way to tell which piece was which. This one carries the
// headline.
//
// Colocated with the article route, so it inherits that segment's `params`.
// `generateStaticParams` is exported here as well as in `page.tsx` — the image
// is its own route handler and gets prerendered from its own list, which is
// what keeps it a build-time PNG rather than a render on every share.
//
// Same construction as the site card otherwise: no font file, no committed
// asset, brand ramp drawn inline for Satori.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

// Deliberately NO `generateImageMetadata`. It is the documented way to give a
// generated card a per-article `alt`, but it also moves the route to
// `/blog/[slug]/opengraph-image/[__metadata_id__]` — and this card's URL has
// to be written out by hand in two places (the article's `pageMetadata` and
// its BlogPosting `image`), because a page that declares `openGraph` replaces
// whatever this file would otherwise have contributed. A stable, guessable
// URL is worth more here than the convenience; the alt text is supplied
// alongside the URL at both call sites instead.

/** The hue each article's card is washed with, matching the page's accent. */
const ACCENT: Record<string, string> = {
  blue: "#2563EB",
  purple: "#7C3AED",
  red: "#DC2626",
  orange: "#EA580C",
  teal: "#0891B2",
  green: "#16A34A",
  pink: "#DB2777",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);

  // `dynamicParams = false` on the page means this only ever runs for a real
  // slug, but the route handler has no such guarantee of its own.
  if (!post) {
    return new ImageResponse(<div style={{ display: "flex" }} />, size);
  }

  const hue = ACCENT[post.accent] ?? ACCENT.blue;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
          background: "linear-gradient(135deg, #0f172a 0%, #111f3d 60%, #0b1220 100%)",
          color: "#ffffff",
        }}
      >
        {/* A bar of the article's hue, so the five cards are distinguishable
            at thumbnail size before a word of the headline is readable. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 10,
            background: hue,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="56" height="56" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="u" x1="4" y1="6" x2="96" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DC2626" />
                  <stop offset="0.5" stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="f" x1="10" y1="50" x2="90" y2="86" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DC2626" />
                  <stop offset="0.5" stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <g fill="url(#u)"><path d="M42.7 6Q43 6 42.8 6.3Q42.6 6.6 39.5 9.3Q36.3 11.9 33.8 15.4Q31.2 18.9 29.8 22.1Q28.3 25.2 27.1 30Q25.8 34.8 22.7 33.2Q19.5 31.6 17 31.4Q14.4 31.1 12 31.6Q9.6 32.2 6.5 34.2Q3.3 36.1 3.3 35.2Q3.3 34.2 4.4 31.8Q5.5 29.5 8.1 25.9Q10.7 22.3 14.4 19Q18 15.8 20.9 14Q23.8 12.1 28.5 10.1Q33.2 8 37.7 7.1Q42.2 6.2 42.3 6.2Z"/><path d="M51.3 0.4Q52.1 0.8 52.1 2.8Q52.1 4.9 54.3 5.9Q56.5 6.8 58.4 8.3Q60.4 9.8 63.3 13.4Q66.2 17 68.5 21.5Q70.7 26 71.9 30.7Q73 35.4 67.4 33.2Q61.7 31.1 55 30.5Q48.2 29.9 43.6 30.6Q39.1 31.2 33.6 33.4Q28.1 35.5 29.1 31.2Q30.1 26.9 32.4 22.2Q34.8 17.4 38.2 13.4Q41.6 9.4 45.5 7.1Q49.4 4.9 49.4 2.9Q49.4 1 49.8 0.6Q50.2 0.2 50.3 0.1Z"/><path d="M65.3 7.2Q71.9 8.6 74.6 9.8Q77.3 10.9 80.6 13Q83.8 15 86.4 17.4Q89.1 19.7 91.1 22.3Q93.2 24.8 95.7 29.9Q98.2 35 98 35.5Q97.7 36.1 94.7 34.2Q91.8 32.2 89.4 31.6Q86.9 31.1 84 31.4Q81 31.8 78.2 33.3Q75.4 34.8 74.2 29.9Q73 25 71.3 21.3Q69.5 17.6 67.6 14.8Q65.6 12.1 62.2 9.1Q58.8 6 58.8 6Z"/><path d="M50.5 31.7Q51.8 31.8 51.8 35.5Q51.8 39.3 50.3 39.2Q48.8 39.1 48.9 35.5Q49 31.8 49.1 31.7Z" /></g>
              <g fill="url(#f)"><path d="M33.2 60.2Q35 62.9 35.8 65.2Q36.7 67.6 37.3 70.1Q37.9 72.7 38 75.6Q38.1 78.5 36.9 83.4Q35.7 88.3 32.6 93.5Q29.5 98.6 28.9 99.2Q28.3 99.8 27.8 99.6Q27.3 99.4 27.1 93.5Q26.8 87.5 25.1 82.3Q23.4 77.2 21.6 73.8Q19.7 70.5 15.7 65.5Q11.7 60.5 15.2 61.7Q18.8 62.9 20.5 63Q22.3 63.1 24.9 62.2Q27.5 61.3 29.4 59.5Q31.2 57.6 31.4 57.5Z"/><path d="M35.7 49.4Q40.4 52.9 44 54.3Q47.7 55.7 51.2 55.2Q54.7 54.7 57 53.4Q59.4 52.1 63.3 49Q67.2 45.9 67.7 46.2Q68.2 46.5 64.7 52Q61.1 57.6 59.2 61.6Q57.2 65.6 53.4 79.1Q49.6 92.6 48.8 92.4Q48 92.2 46.1 83.5Q44.1 74.8 42.5 69.8Q40.8 64.8 38.8 60.6Q36.7 56.5 33.8 51.9Q30.9 47.3 30.9 46.7Q30.9 46.1 31 46Z"/><path d="M69.1 59.3Q70.9 61.1 73 62Q75.2 62.9 77.8 62.8Q80.5 62.7 83.5 61.4Q86.5 60.2 86.9 60.4Q87.3 60.5 83.3 65.3Q79.3 70.1 76.9 74.4Q74.4 78.7 73 83.7Q71.5 88.7 71.1 94.2Q70.7 99.8 70.2 99.8Q69.7 99.8 68.7 98.4Q67.6 97.1 65.7 93.8Q63.9 90.6 62.5 86.9Q61.1 83.2 60.7 80.7Q60.4 78.1 60.8 73.5Q61.3 69 62.6 65.7Q63.9 62.5 65.5 60.1Q67.2 57.6 67.3 57.5Z"/><circle cx="22" cy="54.6" r="6.4"/><circle cx="49.3" cy="46.8" r="6.8"/><circle cx="77.2" cy="54.5" r="6.4"/></g>
            </svg>
            <div
              style={{
                display: "flex",
                marginLeft: 18,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "0.06em",
              }}
            >
              INSOORA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "9px 22px",
              borderRadius: 999,
              border: `1px solid ${hue}`,
              color: hue,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {CATEGORIES[post.category]}
          </div>
        </div>

        {/* The headline. Sized by length so a long title still fits the box
            rather than overflowing it — Satori does not shrink text to fit. */}
        <div
          style={{
            display: "flex",
            fontSize: post.title.length > 54 ? 56 : 66,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.035em",
            maxWidth: 1000,
          }}
        >
          {post.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 22, color: "#94a3b8" }}>
          <div style={{ display: "flex" }}>{formatPostDate(post.published)}</div>
          <div style={{ display: "flex", margin: "0 14px" }}>·</div>
          <div style={{ display: "flex" }}>{readingMinutes(post)} min read</div>
          <div style={{ display: "flex", margin: "0 14px" }}>·</div>
          <div style={{ display: "flex" }}>insoora.com</div>
        </div>
      </div>
    ),
    size,
  );
}
