// Browser-side fetch helper: JSON in/out, surfaces server error messages.
//
// Trimmed from the product's copy: the original redirected a 401 to whichever
// portal's sign-in page the visitor was on. Nothing on this site is behind a
// session, so there is no 401 to handle and no portal to guess at — the only
// endpoint it ever calls is /api/enquiries.
export class ClientApiError extends Error {
  constructor(message: string, readonly status: number, readonly code?: string, readonly details?: unknown) {
    super(message);
  }
}

export async function api<T = unknown>(url: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init;
  const res = await fetch(url, {
    ...rest,
    headers: { ...(json !== undefined ? { "Content-Type": "application/json" } : {}), ...headers },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
    credentials: "same-origin",
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new ClientApiError(
      (data as { error?: { message?: string } } | null)?.error?.message ?? `Request failed (${res.status})`,
      res.status,
      (data as { error?: { code?: string } } | null)?.error?.code,
      (data as { error?: { details?: unknown } } | null)?.error?.details,
    );
  }
  return data as T;
}
