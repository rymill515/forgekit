import { useMemo } from "react";
import type { Build } from "@/lib/build-storage";
import { PARTS, partById, type Part } from "@/data/parts";

export type Warning = {
  partId: string;
  message: string;
};

/** Human-readable names for the internal compatibility tags. */
const TAG_LABELS: Record<string, string> = {
  "nh35-movement": "an NH35-type movement",
  "miyota-9015-movement": "a Miyota 9015 movement",
  "vk-chrono-movement": "a VK meca-quartz movement",
  "nh35-feet": "NH35 dial feet",
  "miyota-9015-feet": "Miyota 9015 dial feet",
  "pusher-case": "a chronograph pusher case",
  "case-srpd": "an SRPD/SKX case",
  "case-turtle": "a Turtle case",
  "case-explorer": "an Explorer-style case",
  "case-chrono": "a chronograph case",
  "lug-20mm": "20mm lugs",
  "lug-22mm": "22mm lugs",
  "crystal-30mm": "a 30mm crystal opening",
  "crystal-31.5mm": "a 31.5mm crystal opening",
};

const labelFor = (tag: string) => TAG_LABELS[tag] ?? tag;

const listTags = (tags: string[]) => tags.map(labelFor).join(" and ");

/** Returns warnings keyed by partId for parts currently selected (or candidate parts). */
export function useCompatibility(build: Build) {
  return useMemo(() => {
    const selectedIds = Object.values(build.selections).filter(Boolean) as string[];
    const selectedParts = selectedIds.map((id) => partById(id)).filter(Boolean) as Part[];
    const offeredTags = new Set(
      selectedParts.flatMap((p) => p.compatibility ?? []),
    );

    const warnings: Warning[] = [];
    for (const p of selectedParts) {
      const missing = (p.requires ?? []).filter((t) => !offeredTags.has(t));
      if (missing.length > 0) {
        warnings.push({
          partId: p.id,
          message: `Needs ${listTags(missing)} — not covered by your other parts yet.`,
        });
      }
    }
    return warnings;
  }, [build.selections]);
}

/** Predicts a warning for a candidate part if it were selected, given the current build. */
export function predictWarning(build: Build, candidate: Part): string | null {
  const selectedIds = Object.values(build.selections).filter(Boolean) as string[];
  // replace same-category selection
  const others = selectedIds
    .map((id) => partById(id))
    .filter(Boolean)
    .filter((p) => (p as Part).category !== candidate.category) as Part[];
  // With nothing else chosen there's no real conflict to predict — stay quiet
  // so a fresh build isn't covered in warnings.
  if (others.length === 0) return null;
  const offered = new Set([
    ...others.flatMap((p) => p.compatibility ?? []),
    ...(candidate.compatibility ?? []),
  ]);
  const missing = (candidate.requires ?? []).filter((t) => !offered.has(t));
  if (missing.length === 0) return null;
  return `May not fit your build — needs ${listTags(missing)}.`;
}

export { PARTS };
