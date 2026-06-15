import { useCallback, useEffect, useRef, useState } from "react";
import type { Category } from "@/data/categories";
import {
  type Build,
  type PartStatus,
  defaultBuild,
  loadBuild,
  saveBuild,
  clearBuild,
} from "@/lib/build-storage";

export function useBuild() {
  const [build, setBuild] = useState<Build>(() => defaultBuild());
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setBuild(loadBuild());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveBuild(build), 250);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [build, hydrated]);

  const setSelection = useCallback((category: Category, partId: string | null) => {
    setBuild((b) => {
      const next = { ...b.selections };
      const nextStatuses = { ...b.statuses };
      if (partId === null) {
        delete next[category];
        delete nextStatuses[category];
      } else {
        next[category] = partId;
      }
      return {
        ...b,
        selections: next,
        statuses: nextStatuses,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const setStatus = useCallback((category: Category, status: PartStatus) => {
    setBuild((b) => ({
      ...b,
      statuses: { ...b.statuses, [category]: status },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setRetailComparison = useCallback((value: number | null) => {
    setBuild((b) => ({
      ...b,
      retailComparison: value,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setName = useCallback((name: string) => {
    setBuild((b) => ({ ...b, name, updatedAt: new Date().toISOString() }));
  }, []);

  const setNotes = useCallback((notes: string) => {
    setBuild((b) => ({ ...b, notes, updatedAt: new Date().toISOString() }));
  }, []);

  const reset = useCallback(() => {
    clearBuild();
    setBuild(defaultBuild());
  }, []);

  return {
    build,
    hydrated,
    setSelection,
    setStatus,
    setRetailComparison,
    setName,
    setNotes,
    reset,
  };
}
