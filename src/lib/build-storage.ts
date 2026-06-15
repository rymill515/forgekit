import type { Category } from "@/data/categories";

/** Purchase progress for a selected part. */
export type PartStatus = "researching" | "ordered" | "received";

export const STATUS_ORDER: PartStatus[] = ["researching", "ordered", "received"];

export const STATUS_META: Record<PartStatus, { label: string; dot: string }> = {
  // `dot` is a CSS color expression for the status indicator.
  researching: { label: "Researching", dot: "var(--forge-text-muted)" },
  ordered: { label: "Ordered", dot: "var(--forge-accent)" },
  received: { label: "Received", dot: "var(--forge-success)" },
};

export type Build = {
  name: string;
  notes: string;
  selections: Partial<Record<Category, string>>;
  /** Purchase status per selected category. Absent = "researching". */
  statuses: Partial<Record<Category, PartStatus>>;
  /** Retail price the user is comparing against, for the savings calc. */
  retailComparison: number | null;
  updatedAt: string;
};

const KEY = "watchforge:build:v1";

export const defaultBuild = (): Build => ({
  name: "My Build",
  notes: "",
  selections: {},
  statuses: {},
  retailComparison: null,
  updatedAt: new Date().toISOString(),
});

export function loadBuild(): Build {
  if (typeof window === "undefined") return defaultBuild();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultBuild();
    const parsed = JSON.parse(raw) as Build;
    return { ...defaultBuild(), ...parsed };
  } catch {
    return defaultBuild();
  }
}

export function saveBuild(build: Build) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(build));
  } catch {
    // ignore quota errors
  }
}

export function clearBuild() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
