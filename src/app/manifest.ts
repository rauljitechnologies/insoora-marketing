import type { MetadataRoute } from "next";
import { PRODUCT } from "@/lib/seo";

// The web app manifest.
//
// Added because the three icons in `public/brand/` were already committed and
// referenced by nothing at all: `app/icon.svg`, `app/apple-icon.png` and
// `app/favicon.ico` cover the browser tab and iOS, but a 192/512 PNG pair and
// a maskable 512 exist for exactly one purpose — the manifest — and without
// one they were 70 kB of dead weight in the repository and Android had no
// icon to install with.
//
// Deliberately modest: `display: "browser"`, because this is a public
// marketing site and nothing about it benefits from being launched in a
// standalone window with no address bar. The manifest is here for the icons,
// the name and the theme colour, not to pretend the site is an app. The
// product's portals are the thing someone might install, and they are on
// another host with their own manifest.
//
// `start_url` is "/" rather than an absolute URL, so it resolves against
// whichever origin is serving — no hostname to keep in step with
// NEXT_PUBLIC_SITE_URL.

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PRODUCT.name} — ${PRODUCT.tagline.replace(/\.$/, "")}`,
    short_name: PRODUCT.name,
    description: PRODUCT.summary,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    // The site's own navy, matching the dark `themeColor` in app/layout.tsx.
    theme_color: "#0b1431",
    lang: "en-IN",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // A separate maskable entry: Android crops `any` icons to its own shape,
      // and a logo drawn to the edges loses its corners. The maskable file has
      // the safe-zone padding that crop needs.
      {
        src: "/brand/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
