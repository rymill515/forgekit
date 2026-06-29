import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SiteNav } from "@/components/forge/SiteNav";
import { SiteFooter } from "@/components/forge/SiteFooter";
import { CategoryCard } from "@/components/forge/CategoryCard";
import { StickyBuildFooter } from "@/components/forge/StickyBuildFooter";
import { BuildSummarySheet } from "@/components/forge/BuildSummarySheet";
import { BuildNotes } from "@/components/forge/BuildNotes";
import { CATEGORIES } from "@/data/categories";
import { resolveSelection } from "@/lib/resolve-selection";
import { useBuild } from "@/hooks/use-build";
import { useCompatibility } from "@/hooks/use-compatibility";

export const Route = createFileRoute("/_authenticated/build")({
  head: () => ({
    meta: [
      { title: "Build configurator — WatchForge" },
      {
        name: "description",
        content:
          "Pick a movement, case, dial, hands, bezel, crystal, and strap. See the cost update live.",
      },
      { property: "og:title", content: "Build configurator — WatchForge" },
      {
        property: "og:description",
        content:
          "Configure a custom watch mod build. Live cost, compatibility warnings, vendor links.",
      },
    ],
  }),
  component: BuildPage,
});

function BuildPage() {
  const {
    build,
    builds,
    activeId,
    setSelection,
    setCustomPart,
    removeCustomPart,
    setStatus,
    setRetailComparison,
    setName,
    setNotes,
    reset,
    newBuild,
    duplicateBuild,
    switchBuild,
    deleteBuild,
  } = useBuild();
  const warnings = useCompatibility(build);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const total = useMemo(() => {
    return CATEGORIES.reduce(
      (sum, c) => sum + (resolveSelection(build, c.id)?.priceUsd ?? 0),
      0,
    );
  }, [build]);

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--forge-bg)] text-[color:var(--forge-text-primary)]">
      <SiteNav />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 pb-32 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--forge-text-muted)]">
                Configurator
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
                Forge your build
              </h1>
              <p className="mt-1 text-sm text-[color:var(--forge-text-secondary)]">
                Tap a category to expand. Selecting a part updates the running total.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.confirm("Clear all selections and notes?")
                ) {
                  reset();
                }
              }}
              className="inline-flex items-center gap-2 rounded-md border border-[color:var(--forge-border)] px-3 py-2 text-xs text-[color:var(--forge-text-secondary)] transition-colors hover:bg-[color:var(--forge-card-hover)] hover:text-[color:var(--forge-text-primary)]"
            >
              <RotateCcw className="h-3 w-3" />
              Reset build
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {CATEGORIES.map((meta, i) => (
              <CategoryCard
                key={meta.id}
                meta={meta}
                build={build}
                defaultOpen={i === 0 && !build.selections[meta.id]}
                onSelect={(partId) => setSelection(meta.id, partId)}
                onSetCustom={(custom) => setCustomPart(meta.id, custom)}
                onRemoveCustom={() => removeCustomPart(meta.id)}
              />
            ))}
          </div>

          <div className="mt-6">
            <BuildNotes notes={build.notes} onChange={setNotes} />
          </div>
        </div>
      </main>

      <StickyBuildFooter
        build={build}
        builds={builds}
        activeId={activeId}
        total={total}
        warnings={warnings}
        onRename={setName}
        onOpenSummary={() => setSummaryOpen(true)}
        onSwitch={switchBuild}
        onNew={newBuild}
        onDuplicate={duplicateBuild}
        onDelete={deleteBuild}
      />

      <BuildSummarySheet
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
        build={build}
        total={total}
        onStatusChange={setStatus}
        onRetailChange={setRetailComparison}
      />

      <SiteFooter />
    </div>
  );
}
