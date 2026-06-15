import { useState } from "react";
import { ChevronDown, ExternalLink, Check, AlertTriangle } from "lucide-react";
import type { CategoryMeta } from "@/data/categories";
import { partById, partsByCategory, type Part } from "@/data/parts";
import { predictWarning } from "@/hooks/use-compatibility";
import type { Build } from "@/lib/build-storage";

type Props = {
  meta: CategoryMeta;
  build: Build;
  defaultOpen?: boolean;
  onSelect: (partId: string | null) => void;
};

export function CategoryCard({ meta, build, defaultOpen = false, onSelect }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const selectedId = build.selections[meta.id];
  const selected = partById(selectedId);
  const options = partsByCategory(meta.id);

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
              {selected ? `${selected.brand} · ${selected.name}` : meta.placeholder}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="tabular-nums text-[color:var(--forge-text-primary)]">
            {selected ? `$${selected.priceUsd.toFixed(2)}` : "—"}
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
          </div>
        </div>
      )}
    </section>
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
        <p className="line-clamp-2 text-xs text-[color:var(--forge-text-secondary)]">
          {part.description}
        </p>
      </button>
      <div className="flex items-center justify-between gap-2">
        {part.vendorUrl ? (
          <a
            href={part.vendorUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[color:var(--forge-text-secondary)] hover:text-[color:var(--forge-accent)]"
          >
            {part.vendorName ?? "Vendor"}
            <ExternalLink className="h-3 w-3" />
          </a>
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
