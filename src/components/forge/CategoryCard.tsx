import { useMemo, useState } from "react";
import { ChevronDown, Check, AlertTriangle, Plus, Pencil, Trash2 } from "lucide-react";
import type { CategoryMeta } from "@/data/categories";
import {
  partById,
  partsByCategory,
  MOVEMENT_TYPE_META,
  type MovementType,
  type Part,
} from "@/data/parts";
import { predictWarning } from "@/hooks/use-compatibility";
import {
  type Build,
  type CustomPart,
  CUSTOM_SELECTION,
} from "@/lib/build-storage";
import { VendorLink } from "@/components/forge/VendorLink";
import { CustomPartDialog } from "@/components/forge/CustomPartDialog";

type Props = {
  meta: CategoryMeta;
  build: Build;
  defaultOpen?: boolean;
  onSelect: (partId: string | null) => void;
  onSetCustom: (custom: CustomPart) => void;
  onRemoveCustom: () => void;
};

type TypeFilter = MovementType | "all";

export function CategoryCard({
  meta,
  build,
  defaultOpen = false,
  onSelect,
  onSetCustom,
  onRemoveCustom,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [customOpen, setCustomOpen] = useState(false);
  const selectedId = build.selections[meta.id];
  const curated = partById(selectedId);
  const customPart = build.customParts?.[meta.id];
  const customSelected = selectedId === CUSTOM_SELECTION;
  const allOptions = partsByCategory(meta.id);

  const isMovement = meta.id === "movement";

  // Which movement families are actually present, in canonical order.
  const movementTypes = useMemo(() => {
    if (!isMovement) return [] as MovementType[];
    const order: MovementType[] = ["automatic", "quartz", "meca-quartz"];
    const present = new Set(allOptions.map((p) => p.movementType));
    return order.filter((t) => present.has(t));
  }, [isMovement, allOptions]);

  const options =
    isMovement && typeFilter !== "all"
      ? allOptions.filter((p) => p.movementType === typeFilter)
      : allOptions;

  // Display info for the current selection — curated part or custom entry.
  const selectedDisplay = customSelected && customPart
    ? { brand: customPart.brand || "Custom", name: customPart.name, priceUsd: customPart.priceUsd }
    : curated
      ? { brand: curated.brand, name: curated.name, priceUsd: curated.priceUsd }
      : null;

  const selectedSubtitle = selectedDisplay
    ? isMovement && curated?.movementType
      ? `${selectedDisplay.brand} · ${selectedDisplay.name} · ${MOVEMENT_TYPE_META[curated.movementType].label}`
      : `${selectedDisplay.brand} · ${selectedDisplay.name}`
    : meta.placeholder;

  return (
    <section className="overflow-hidden rounded-xl border border-[color:var(--forge-border)] bg-[color:var(--forge-card)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[color:var(--forge-card-hover)]"
      >
        <div className="flex flex-1 items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--forge-text-muted)]">
            {meta.id}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold">{meta.label}</h3>
            <p className="truncate text-xs text-[color:var(--forge-text-secondary)]">
              {selectedSubtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="tabular-nums text-[color:var(--forge-text-primary)]">
            {selectedDisplay ? `$${selectedDisplay.priceUsd.toFixed(2)}` : "—"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-[color:var(--forge-text-secondary)] transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-[color:var(--forge-border)] bg-[color:var(--forge-bg)] px-5 py-4">
          <p className="mb-4 text-xs text-[color:var(--forge-text-secondary)]">
            {meta.helper}
          </p>

          {isMovement && movementTypes.length > 1 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--forge-text-muted)]">
                Type
              </span>
              <FilterChip
                label="All"
                active={typeFilter === "all"}
                onClick={() => setTypeFilter("all")}
              />
              {movementTypes.map((t) => (
                <FilterChip
                  key={t}
                  label={MOVEMENT_TYPE_META[t].label}
                  active={typeFilter === t}
                  onClick={() => setTypeFilter(t)}
                />
              ))}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((p) => (
              <PartTile
                key={p.id}
                part={p}
                selected={p.id === selectedId}
                warning={predictWarning(build, p)}
                onSelect={() => {
                  onSelect(p.id === selectedId ? null : p.id);
                  setOpen(false);
                }}
              />
            ))}

            {customPart ? (
              <CustomTile
                part={customPart}
                selected={customSelected}
                onSelect={() =>
                  customSelected ? onSelect(null) : onSetCustom(customPart)
                }
                onEdit={() => setCustomOpen(true)}
                onRemove={onRemoveCustom}
              />
            ) : (
              <button
                type="button"
                onClick={() => setCustomOpen(true)}
                className="flex min-h-[7rem] flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[color:var(--forge-border-strong)] p-3 text-center text-[color:var(--forge-text-secondary)] transition-colors hover:border-[color:var(--forge-accent)] hover:text-[color:var(--forge-accent)]"
              >
                <Plus className="h-4 w-4" />
                <span className="text-xs font-medium">Enter your own</span>
                <span className="text-[11px] text-[color:var(--forge-text-muted)]">
                  Not listed? Add it manually
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      <CustomPartDialog
        open={customOpen}
        onOpenChange={setCustomOpen}
        categoryLabel={meta.label}
        initial={customPart}
        onSave={(part) => onSetCustom(part)}
      />
    </section>
  );
}

function CustomTile({
  part,
  selected,
  onSelect,
  onEdit,
  onRemove,
}: {
  part: CustomPart;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-2 rounded-lg border p-3 transition-colors ${
        selected
          ? "border-[color:var(--forge-accent)] bg-[color:var(--forge-card)]"
          : "border-[color:var(--forge-border)] bg-[color:var(--forge-card)] hover:border-[color:var(--forge-border-strong)]"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex flex-1 flex-col gap-2 text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-medium">{part.name}</p>
            <p className="text-xs text-[color:var(--forge-text-muted)]">
              {part.brand || "Custom"}
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-[color:var(--forge-bg-elevated)] px-2 py-0.5 text-xs font-semibold tabular-nums">
            ${part.priceUsd.toFixed(0)}
          </span>
        </div>
        <span className="inline-flex w-fit items-center rounded-md border border-[color:var(--forge-accent)]/40 bg-[color:var(--forge-accent)]/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[color:var(--forge-accent)]">
          Custom
        </span>
        {part.note && (
          <p className="line-clamp-2 text-xs text-[color:var(--forge-text-secondary)]">
            {part.note}
          </p>
        )}
      </button>
      <div className="flex items-center justify-between gap-2">
        {part.vendorUrl ? (
          <VendorLink url={part.vendorUrl} vendorName={part.vendorName} />
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit custom part"
            className="inline-flex h-9 w-9 items-center justify-center rounded text-[color:var(--forge-text-muted)] transition-colors hover:bg-[color:var(--forge-card-hover)] hover:text-[color:var(--forge-text-primary)]"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove custom part"
            className="inline-flex h-9 w-9 items-center justify-center rounded text-[color:var(--forge-text-muted)] transition-colors hover:bg-[color:var(--forge-card-hover)] hover:text-[color:var(--forge-danger)]"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
        active
          ? "border-[color:var(--forge-accent)] bg-[color:var(--forge-accent)]/10 text-[color:var(--forge-accent)]"
          : "border-[color:var(--forge-border)] text-[color:var(--forge-text-secondary)] hover:border-[color:var(--forge-border-strong)] hover:text-[color:var(--forge-text-primary)]"
      }`}
    >
      {label}
    </button>
  );
}

function MovementTypeBadge({ type }: { type: MovementType }) {
  return (
    <span className="inline-flex w-fit items-center rounded-md border border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[color:var(--forge-text-secondary)]">
      {MOVEMENT_TYPE_META[type].label}
    </span>
  );
}

function PartTile({
  part,
  selected,
  warning,
  onSelect,
}: {
  part: Part;
  selected: boolean;
  warning: string | null;
  onSelect: () => void;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-2 rounded-lg border p-3 transition-colors ${
        selected
          ? "border-[color:var(--forge-accent)] bg-[color:var(--forge-card)]"
          : "border-[color:var(--forge-border)] bg-[color:var(--forge-card)] hover:border-[color:var(--forge-border-strong)]"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex flex-1 flex-col gap-2 text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-medium">{part.name}</p>
            <p className="text-xs text-[color:var(--forge-text-muted)]">
              {part.brand}
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-[color:var(--forge-bg-elevated)] px-2 py-0.5 text-xs font-semibold tabular-nums">
            ${part.priceUsd.toFixed(0)}
          </span>
        </div>
        {part.movementType && (
          <MovementTypeBadge type={part.movementType} />
        )}
        <p className="line-clamp-2 text-xs text-[color:var(--forge-text-secondary)]">
          {part.description}
        </p>
      </button>
      <div className="flex items-center justify-between gap-2">
        {part.vendorUrl ? (
          <VendorLink url={part.vendorUrl} vendorName={part.vendorName} />
        ) : (
          <span />
        )}
        {selected && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[color:var(--forge-accent)]">
            <Check className="h-3 w-3" /> Selected
          </span>
        )}
      </div>
      {warning && !selected && (
        <p className="flex items-start gap-1 rounded-md bg-[color:var(--forge-warning)]/10 px-2 py-1 text-[11px] text-[color:var(--forge-warning)]">
          <AlertTriangle className="mt-[1px] h-3 w-3 shrink-0" />
          {warning}
        </p>
      )}
    </div>
  );
}
