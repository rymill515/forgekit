import type { Category } from "@/data/categories";
import { partById } from "@/data/parts";
import { type Build, CUSTOM_SELECTION } from "@/lib/build-storage";

/** A selected part, whether it came from the curated catalog or the user. */
export type ResolvedPart = {
  id: string;
  name: string;
  brand: string;
  priceUsd: number;
  vendorName?: string;
  vendorUrl?: string;
  description?: string;
  isCustom: boolean;
};

/** Resolve the active part for a category — curated or user-entered. */
export function resolveSelection(
  build: Build,
  category: Category,
): ResolvedPart | undefined {
  const sel = build.selections[category];
  if (!sel) return undefined;

  if (sel === CUSTOM_SELECTION) {
    const c = build.customParts?.[category];
    if (!c) return undefined;
    return {
      id: CUSTOM_SELECTION,
      name: c.name,
      brand: c.brand || "Custom",
      priceUsd: c.priceUsd,
      vendorName: c.vendorName,
      vendorUrl: c.vendorUrl,
      description: c.note,
      isCustom: true,
    };
  }

  const p = partById(sel);
  if (!p) return undefined;
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    priceUsd: p.priceUsd,
    vendorName: p.vendorName,
    vendorUrl: p.vendorUrl,
    description: p.description,
    isCustom: false,
  };
}
