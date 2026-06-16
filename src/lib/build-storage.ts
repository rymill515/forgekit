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

/** A part the user entered by hand when the curated options don't fit. */
export type CustomPart = {
  name: string;
  brand?: string;
  priceUsd: number;
  vendorName?: string;
  vendorUrl?: string;
  note?: string;
};

/** Sentinel stored in `selections[category]` when the user's own custom
 *  part is the active choice for that category. */
export const CUSTOM_SELECTION = "__custom__";

export type Build = {
  /** Stable id so builds can be saved and switched between. */
  id: string;
  name: string;
  notes: string;
  selections: Partial<Record<Category, string>>;
  /** User-entered parts per category, used when selection is CUSTOM_SELECTION. */
  customParts: Partial<Record<Category, CustomPart>>;
  /** Purchase status per selected category. Absent = "researching". */
  statuses: Partial<Record<Category, PartStatus>>;
  /** Retail price the user is comparing against, for the savings calc. */
  retailComparison: number | null;
  updatedAt: string;
};

/** Multiple saved builds plus which one is currently open. */
export type BuildCollection = {
  activeId: string;
  builds: Build[];
};

const KEY = "watchforge:builds:v2";
const LEGACY_KEY = "watchforge:build:v1";

export function newId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return `build-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export const defaultBuild = (name = "My Build"): Build => ({
  id: newId(),
  name,
  notes: "",
  selections: {},
  customParts: {},
  statuses: {},
  retailComparison: null,
  updatedAt: new Date().toISOString(),
});

/** Backfill any fields missing from a stored build (forward-compat). */
function normalizeBuild(b: Partial<Build>): Build {
  return { ...defaultBuild(), ...b, id: b.id ?? newId() };
}

export const defaultCollection = (): BuildCollection => {
  const first = defaultBuild();
  return { activeId: first.id, builds: [first] };
};

export function loadCollection(): BuildCollection {
  if (typeof window === "undefined") return defaultCollection();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as BuildCollection;
      const builds = (parsed.builds ?? []).map(normalizeBuild);
      if (builds.length === 0) return defaultCollection();
      const activeId = builds.some((b) => b.id === parsed.activeId)
        ? parsed.activeId
        : builds[0].id;
      return { activeId, builds };
    }

    // One-time migration from the single-build (v1) format.
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const build = normalizeBuild(JSON.parse(legacy) as Partial<Build>);
      const collection = { activeId: build.id, builds: [build] };
      saveCollection(collection);
      window.localStorage.removeItem(LEGACY_KEY);
      return collection;
    }
  } catch {
    // fall through to a fresh collection
  }
  return defaultCollection();
}

export function saveCollection(collection: BuildCollection) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(collection));
  } catch {
    // ignore quota errors
  }
}
