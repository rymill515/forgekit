// Affiliate link handling (PRD §3.2 / §1.4 — "once traffic is established").
//
// Vendor affiliate programs get wired up here. Until a vendor has a real
// rule below, its URLs are returned unchanged — so this is safe to ship now
// and becomes live the moment you drop in an approved tag.

type AffiliateRule = {
  /** Query param name the vendor expects, e.g. "ref" or "aff". */
  param: string;
  /** Your affiliate identifier for that vendor. */
  value: string;
};

// Keyed by the part's `vendorName`. Uncomment + fill in once approved.
const AFFILIATES: Record<string, AffiliateRule> = {
  // "Namoki": { param: "ref", value: "rymill515" },
  // "Secondhand Watches": { param: "aff", value: "rymill515" },
};

/** Append the vendor's affiliate param to a URL, if one is configured. */
export function withAffiliate(url: string, vendorName?: string): string {
  if (!vendorName) return url;
  const rule = AFFILIATES[vendorName];
  if (!rule) return url;
  try {
    const u = new URL(url);
    if (!u.searchParams.has(rule.param)) {
      u.searchParams.set(rule.param, rule.value);
    }
    return u.toString();
  } catch {
    // Non-absolute or malformed URL — leave it as-is.
    return url;
  }
}

/**
 * Record an outbound vendor click. Pushes to a GA/dataLayer-style queue if
 * the page has one; otherwise it's a no-op. No backend required — when you
 * add analytics later, the events are already firing.
 */
export function trackOutbound(vendorName: string | undefined, url: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: "vendor_outbound_click",
      vendor: vendorName ?? "unknown",
      url,
    });
  }
}
