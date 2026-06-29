import { useMemo } from "react";
import type { Build } from "@/lib/build-storage";
import { PARTS, partById, type Part } from "@/data/parts";

export type Warning = {
  partId: string;
  partName: string;
  message: string;
  missing: string[];
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

export const labelForTag = (tag: string) => TAG_LABELS[tag] ?? tag;

const listTags = (tags: string[]) => tags.map(labelForTag).join(" and ");

/** Returns warnings keyed by partId for parts currently selected. */
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
          partName: `${p.brand} ${p.name}`,
          missing,
          message: `Needs ${listTags(missing)} — not covered by your other parts yet.`,
        });
      }
    }
    return warnings;
  }, [build.selections]);
}

/** Predicts a warning for a candidate part if it were selected. */
export function predictWarning(build: Build, candidate: Part): string | null {
  const selectedIds = Object.values(build.selections).filter(Boolean) as string[];
  const others = selectedIds
    .map((id) => partById(id))
    .filter(Boolean)
    .filter((p) => (p as Part).category !== candidate.category) as Part[];
  if (others.length === 0) return null;
  const offered = new Set([
    ...others.flatMap((p) => p.compatibility ?? []),
    ...(candidate.compatibility ?? []),
  ]);
  const missing = (candidate.requires ?? []).filter((t) => !offered.has(t));
  if (missing.length === 0) return null;
  return `May not fit your build — needs ${listTags(missing)}.`;
}

/** Predicts whether a candidate part is actively recommended given current selections —
 *  i.e. it satisfies a currently-unmet `requires` tag, or its own `requires` are already
 *  satisfied AND it shares case/movement family tags with what's chosen. */
export function predictRecommendation(build: Build, candidate: Part): string | null {
  const selectedIds = Object.values(build.selections).filter(Boolean) as string[];
  const others = selectedIds
    .map((id) => partById(id))
    .filter(Boolean)
    .filter((p) => (p as Part).category !== candidate.category) as Part[];
  if (others.length === 0) return null;

  const offeredByOthers = new Set(others.flatMap((p) => p.compatibility ?? []));
  const requiredByOthers = new Set(others.flatMap((p) => p.requires ?? []));

  // 1. Candidate fills a gap: it offers a tag others require but no one provides yet.
  const candidateOffers = candidate.compatibility ?? [];
  const fills = candidateOffers.filter(
    (t) => requiredByOthers.has(t) && !offeredByOthers.has(t),
  );
  if (fills.length > 0) {
    return `Recommended — provides ${listTags(fills)}.`;
  }

  // 2. Candidate's own requirements are fully satisfied by others (positive match),
  //    and it shares at least one tag (case/lug/movement family) with them.
  const candidateRequires = candidate.requires ?? [];
  if (candidateRequires.length > 0) {
    const allMet = candidateRequires.every((t) => offeredByOthers.has(t));
    const shares = candidateOffers.some((t) => offeredByOthers.has(t));
    if (allMet && (shares || candidateRequires.length >= 2)) {
      return `Recommended — matches your selections.`;
    }
  }

  return null;
}

export { PARTS };
