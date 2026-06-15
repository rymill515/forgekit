import type { Category } from "@/data/categories";

export type Build = {
  name: string;
  notes: string;
  selections: Partial<Record<Category, string>>;
  updatedAt: string;
};

const KEY = "watchforge:build:v1";

export const defaultBuild = (): Build => ({
  name: "My Build",
  notes: "",
  selections: {},
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
