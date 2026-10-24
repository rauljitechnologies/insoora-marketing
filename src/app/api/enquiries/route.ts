import { NextResponse, type NextRequest } from "next/server";
import { APP_URL } from "@/lib/site-config";

// The Contact Us form's endpoint — a server-side forward, not a second
// implementation.
//
// Enquiries are rows in the product's database, and this deployment has no
// database, no Prisma client and no credentials. So the form posts here and
// this route relays the body to the product's own /api/enquiries, which still
// owns the validation, the honeypot, the rate limiting and the storage. There
// is exactly one enquiry endpoint in the system; this is a pipe to it.
//
// Why a pipe rather than posting at the product directly from the browser:
//
//   * no CORS to open. The product's /api/enquiries rejects cross-site
//     requests (checkOrigin), which is the CSRF defence protecting every
//     other endpoint on that host — widening it for this one form would mean
//     widening it on the shared helper. A server-to-server POST carries no
//     Origin and no Sec-Fetch-Site header, so it passes without any change
//     over there.
//   * no second origin in the site's CSP. `connect-src 'self'` stays closed.
//   * nothing about the product's hostname has to be true in the browser for
//     the form to work.
//
// The visitor's IP is forwarded explicitly, because the product rate-limits
// per IP and would otherwise see every enquiry in the world arriving from one
// address — this host's.

/** Caps the relayed body. The product validates every field; this only stops
 *  an unbounded upload being read into memory here first. */
const MAX_BODY = 8 * 1024;

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json(
      { error: { code: "PAYLOAD_TOO_LARGE", message: "That message is too long." } },
      { status: 413 },
    );
  }

  // The first hop in x-forwarded-for is the visitor; the rest is proxies.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip");

  try {
    const upstream = await fetch(`${APP_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Passed through so the product's per-IP limits and its stored
        // `ipAddress` / `userAgent` describe the visitor, not this server.
        ...(ip ? { "x-forwarded-for": ip } : {}),
        ...(req.headers.get("user-agent") ? { "user-agent": req.headers.get("user-agent")! } : {}),
      },
      body: raw,
      // No cookies, no credentials — there is no session to carry.
      cache: "no-store",
    });

    // The status and the error body are relayed verbatim: the form shows the
    // product's own messages, including the "try again in Ns" on a 429.
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    // The product being unreachable is not the visitor's fault and must not
    // read like a rejected submission. 502, and the form keeps what they
    // typed so "send" works once it is back.
    return NextResponse.json(
      {
        error: {
          code: "UPSTREAM_UNAVAILABLE",
          message: "We couldn't reach our servers. Please try again in a moment, or call us.",
        },
      },
      { status: 502 },
    );
  }
}
