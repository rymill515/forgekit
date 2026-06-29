import { useEffect, useRef, useState } from "react";
import { Save, Pencil, AlertTriangle, Receipt } from "lucide-react";
import type { Build } from "@/lib/build-storage";
import { CATEGORIES } from "@/data/categories";
import { BuildSwitcher } from "@/components/forge/BuildSwitcher";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Warning } from "@/hooks/use-compatibility";

type Props = {
  build: Build;
  builds: Build[];
  activeId: string;
  total: number;
  warnings: Warning[];
  onRename: (name: string) => void;
  onOpenSummary: () => void;
  onSwitch: (id: string) => void;
  onNew: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

export function StickyBuildFooter({
  build,
  builds,
  activeId,
  total,
  warnings,
  onRename,
  onOpenSummary,
  onSwitch,
  onNew,
  onDuplicate,
  onDelete,
}: Props) {
  const warningCount = warnings.length;
  const selectedCount = Object.values(build.selections).filter(Boolean).length;
  const totalCategories = CATEGORIES.length;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(build.name);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(build.name), [build.name]);

  // Flash "Saved" indicator when build changes.
  useEffect(() => {
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1200);
    return () => clearTimeout(t);
  }, [build.updatedAt]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  function commit() {
    const next = draft.trim() || "My Build";
    onRename(next);
    setEditing(false);
  }

  return (
    <div className="sticky bottom-0 z-30 border-t border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") {
                  setDraft(build.name);
                  setEditing(false);
                }
              }}
              className="w-full max-w-xs rounded-md border border-[color:var(--forge-border-strong)] bg-[color:var(--forge-bg)] px-2 py-1 font-display text-sm font-semibold outline-none focus:border-[color:var(--forge-accent)]"
            />
          ) : (
            <div className="flex min-w-0 items-center gap-1">
              <BuildSwitcher
                builds={builds}
                activeId={activeId}
                activeName={build.name}
                onSwitch={onSwitch}
                onNew={onNew}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
              />
              <button
                type="button"
                onClick={() => setEditing(true)}
                aria-label="Rename build"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--forge-text-muted)] transition-colors hover:bg-[color:var(--forge-card-hover)] hover:text-[color:var(--forge-text-primary)]"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <span className="hidden text-xs text-[color:var(--forge-text-muted)] sm:inline">
            {selectedCount}/{totalCategories} parts
          </span>
        </div>

        <div className="flex items-center gap-4">
          {warningCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-[color:var(--forge-warning)]/10 px-2 py-1 text-xs text-[color:var(--forge-warning)]">
              <AlertTriangle className="h-3 w-3" />
              {warningCount} warning{warningCount === 1 ? "" : "s"}
            </span>
          )}
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--forge-text-muted)]">
              Total
            </p>
            <p className="font-display text-xl font-bold tabular-nums text-[color:var(--forge-accent)]">
              ${total.toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenSummary}
            className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--forge-accent)] px-3 py-2 text-xs font-semibold text-[color:var(--forge-accent-text)] transition-colors hover:bg-[color:var(--forge-accent-hover)]"
          >
            <Receipt className="h-3.5 w-3.5" />
            Summary
          </button>
          <span
            className={`inline-flex items-center gap-1 text-xs text-[color:var(--forge-success)] transition-opacity ${
              saved ? "opacity-100" : "opacity-0"
            }`}
          >
            <Save className="h-3 w-3" /> Saved
          </span>
        </div>
      </div>
    </div>
  );
}
