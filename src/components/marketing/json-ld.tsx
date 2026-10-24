// Structured data, rendered into the page's HTML.
//
// A plain <script type="application/ld+json"> in a Server Component: no
// client JavaScript, and the markup is in the server-rendered HTML where a
// crawler and an answer engine will actually see it. `JSON.stringify` is the
// escaping — the payloads are built in lib/seo.ts from our own constants, so
// there is no user input in here to inject with.

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
