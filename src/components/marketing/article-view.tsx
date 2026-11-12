"use client";

import * as React from "react";
import { trackArticleView } from "@/lib/analytics";

// `blog_article_view`, raised once per article a reader opens.
//
// ── Why this exists when `page_view` already fires ───────────────────────
//
// `page_view` carries a path and nothing else, so reporting on the blog means
// maintaining a "path starts with /blog/" filter inside the GA4 UI — a rule
// that lives nowhere in this repository, that nobody reviews, and that
// quietly stops matching the day an article moves. This event carries the
// article's own slug and shelf as parameters, so the collection can be
// reported on from dimensions the site itself supplies.
//
// It does NOT replace `page_view` and does not suppress it. The two coexist:
// one counts pages, this one describes articles. That is not double counting,
// because they are different events answering different questions — the thing
// to avoid is two `page_view`s for one view, which is why analytics.tsx has
// no route-change listener of its own.
//
// ── Why a component that renders nothing ─────────────────────────────────
//
// The article page is a server component and has the slug and the category
// already; the event has to be raised in the browser. A zero-output client
// component is the smallest bridge between the two, and it keeps the page
// itself a server component — converting the page would ship the whole
// article tree's JavaScript to the browser to send one event.

export function ArticleView({ slug, category }: { slug: string; category: string }) {
  // Keyed on the slug rather than a bare `didRun` flag.
  //
  // React may run an effect twice on mount (Strict Mode in development does
  // exactly this), and a client-side navigation between two articles reuses
  // this component instance rather than remounting it. A boolean gets the
  // first case right and the second wrong — the second article would never
  // be counted. Comparing the slug handles both: the same article is sent
  // once, a different one is sent again.
  const sent = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (sent.current === slug) return;
    sent.current = slug;
    trackArticleView(slug, category);
  }, [slug, category]);

  return null;
}
