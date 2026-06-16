import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Category } from "@/data/categories";
import {
  type Build,
  type BuildCollection,
  type PartStatus,
  defaultBuild,
  defaultCollection,
  loadCollection,
  saveCollection,
} from "@/lib/build-storage";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

/** Pick a name that doesn't collide with existing builds. */
function uniqueName(base: string, builds: Build[]): string {
  const names = new Set(builds.map((b) => b.name));
  if (!names.has(base)) return base;
  let n = 2;
  while (names.has(`${base} ${n}`)) n++;
  return `${base} ${n}`;
}

export function useBuild() {
  const { user, loading: authLoading } = useAuth();
  const [collection, setCollection] = useState<BuildCollection>(() =>
    defaultCollection(),
  );
  const [hydrated, setHydrated] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cloudTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUserIdRef = useRef<string | null>(null);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    setCollection(loadCollection());
    setHydrated(true);
  }, []);

  // Pull from cloud when the signed-in user changes; merge by newest updatedAt per build.
  useEffect(() => {
    if (!hydrated || authLoading) return;
    if (!user) {
      lastUserIdRef.current = null;
      setCloudSynced(false);
      return;
    }
    if (lastUserIdRef.current === user.id) return;
    lastUserIdRef.current = user.id;
    setCloudSynced(false);

    (async () => {
      const { data, error } = await supabase
        .from("user_builds")
        .select("collection")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        console.error("Cloud load failed", error);
        setCloudSynced(true);
        return;
      }
      if (data?.collection) {
        const remote = data.collection as BuildCollection;
        setCollection((local) => mergeCollections(local, remote));
      }
      setCloudSynced(true);
    })();
  }, [user, authLoading, hydrated]);

  // Persist to localStorage and (if signed in) cloud.
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveCollection(collection), 250);

    if (user && cloudSynced) {
      if (cloudTimer.current) clearTimeout(cloudTimer.current);
      cloudTimer.current = setTimeout(async () => {
        const { error } = await supabase.from("user_builds").upsert({
          user_id: user.id,
          collection: collection as unknown as Record<string, unknown>,
          updated_at: new Date().toISOString(),
        });
        if (error) console.error("Cloud save failed", error);
      }, 800);
    }
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (cloudTimer.current) clearTimeout(cloudTimer.current);
    };
  }, [collection, hydrated, user, cloudSynced]);

  const build = useMemo(
    () =>
      collection.builds.find((b) => b.id === collection.activeId) ??
      collection.builds[0],
    [collection],
  );

  /** Apply an update to the active build, stamping updatedAt. */
  const updateActive = useCallback((patch: (b: Build) => Build) => {
    setCollection((c) => ({
      ...c,
      builds: c.builds.map((b) =>
        b.id === c.activeId
          ? { ...patch(b), updatedAt: new Date().toISOString() }
          : b,
      ),
    }));
  }, []);

  const setSelection = useCallback(
    (category: Category, partId: string | null) => {
      updateActive((b) => {
        const next = { ...b.selections };
        const nextStatuses = { ...b.statuses };
        if (partId === null) {
          delete next[category];
          delete nextStatuses[category];
        } else {
          next[category] = partId;
        }
        return { ...b, selections: next, statuses: nextStatuses };
      });
    },
    [updateActive],
  );

  const setStatus = useCallback(
    (category: Category, status: PartStatus) => {
      updateActive((b) => ({
        ...b,
        statuses: { ...b.statuses, [category]: status },
      }));
    },
    [updateActive],
  );

  const setRetailComparison = useCallback(
    (value: number | null) => {
      updateActive((b) => ({ ...b, retailComparison: value }));
    },
    [updateActive],
  );

  const setName = useCallback(
    (name: string) => {
      updateActive((b) => ({ ...b, name }));
    },
    [updateActive],
  );

  const setNotes = useCallback(
    (notes: string) => {
      updateActive((b) => ({ ...b, notes }));
    },
    [updateActive],
  );

  /** Clear the active build's contents, keeping its id and name. */
  const reset = useCallback(() => {
    updateActive((b) => ({
      ...b,
      selections: {},
      statuses: {},
      notes: "",
      retailComparison: null,
    }));
  }, [updateActive]);

  const newBuild = useCallback(() => {
    setCollection((c) => {
      const created = defaultBuild(uniqueName("My Build", c.builds));
      return { activeId: created.id, builds: [...c.builds, created] };
    });
  }, []);

  const duplicateBuild = useCallback((id: string) => {
    setCollection((c) => {
      const src = c.builds.find((b) => b.id === id);
      if (!src) return c;
      const copy = defaultBuild(uniqueName(`${src.name} copy`, c.builds));
      const created: Build = {
        ...src,
        id: copy.id,
        name: copy.name,
        updatedAt: copy.updatedAt,
      };
      return { activeId: created.id, builds: [...c.builds, created] };
    });
  }, []);

  const switchBuild = useCallback((id: string) => {
    setCollection((c) =>
      c.builds.some((b) => b.id === id) ? { ...c, activeId: id } : c,
    );
  }, []);

  const deleteBuild = useCallback((id: string) => {
    setCollection((c) => {
      const remaining = c.builds.filter((b) => b.id !== id);
      if (remaining.length === 0) return defaultCollection();
      const activeId =
        c.activeId === id ? remaining[0].id : c.activeId;
      return { activeId, builds: remaining };
    });
  }, []);

  return {
    build,
    builds: collection.builds,
    activeId: collection.activeId,
    hydrated,
    setSelection,
    setStatus,
    setRetailComparison,
    setName,
    setNotes,
    reset,
    newBuild,
    duplicateBuild,
    switchBuild,
    deleteBuild,
  };
}
