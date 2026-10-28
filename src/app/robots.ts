import type { MetadataRoute } from "next";
import { absolute, siteUrlIsConfigured } from "@/lib/seo";

// robots.txt.
//
// This host serves the public marketing pages and nothing else — the portals, the
// back office and the real API all live on the product's own domain and have
// their own robots.txt. So the only thing to keep out here is this
// deployment's one route that is not a page: the contact form's relay.
//
// Until a real domain is configured the whole site is disallowed: a preview
// host that gets indexed is the duplicate-content problem, and it is far
// easier to prevent than to clean up. sitemap.ts stops advertising itself at
// the same moment.

export default function robots(): MetadataRoute.Robots {
  if (!siteUrlIsConfigured()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absolute("/sitemap.xml"),
    host: absolute("/"),
  };
}
