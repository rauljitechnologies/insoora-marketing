import type { MetadataRoute } from "next";
import { absolute, siteUrlIsConfigured } from "@/lib/seo";

// The public website's sitemap.
//
// Only the seven marketing pages. The portals, the back office, every
// /api/* route and the auth pages are all absent on purpose: they are either
// private, or they are a door rather than a destination, and a sitemap that
// lists them invites a crawler to spend its budget on pages it will be
// redirected away from.
//
// When no real domain is configured the sitemap is empty rather than full of
// localhost URLs — see robots.ts, which stops advertising it at the same time.

/** `changeFrequency` and `priority` are hints, and only honest ones are given:
 *  the home page does change most often, the legal pages barely ever. */
const PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/features", changeFrequency: "monthly", priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about-us", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrlIsConfigured()) return [];

  const lastModified = new Date();
  return PAGES.map((p) => ({
    url: absolute(p.path),
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
