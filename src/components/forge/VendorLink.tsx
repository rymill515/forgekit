import { ExternalLink } from "lucide-react";
import { withAffiliate, trackOutbound } from "@/lib/affiliates";

type Props = {
  url: string;
  vendorName?: string;
  className?: string;
};

/**
 * Outbound vendor link. Applies any configured affiliate param and records
 * the click. `rel="sponsored"` is the correct hint for affiliate links.
 */
export function VendorLink({ url, vendorName, className }: Props) {
  const href = withAffiliate(url, vendorName);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer sponsored"
      onClick={() => trackOutbound(vendorName, href)}
      className={
        className ??
        "inline-flex items-center gap-1 text-[11px] text-[color:var(--forge-text-secondary)] hover:text-[color:var(--forge-accent)]"
      }
    >
      {vendorName ?? "Vendor"}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
