import { useMemo } from "react";
import type { Build } from "@/lib/build-storage";
import { PARTS, partById, type Part } from "@/data/parts";

export type Warning = {
  partId: string;
  message: string;
};

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
          message: `Needs ${missing.join(", ")} from another selected part — check vendor.`,
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
  const offered = new Set([
    ...others.flatMap((p) => p.compatibility ?? []),
    ...(candidate.compatibility ?? []),
  ]);
  const missing = (candidate.requires ?? []).filter((t) => !offered.has(t));
  if (missing.length === 0) return null;
  return `May not fit — needs ${missing.join(", ")}.`;
}

export { PARTS };
