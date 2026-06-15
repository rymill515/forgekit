import { useMemo } from "react";
import { PiggyBank, TrendingDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { VendorLink } from "@/components/forge/VendorLink";
import { CATEGORIES } from "@/data/categories";
import { partById } from "@/data/parts";
import {
  type Build,
  type PartStatus,
  STATUS_META,
  STATUS_ORDER,
} from "@/lib/build-storage";
import type { Category } from "@/data/categories";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  build: Build;
  total: number;
  onStatusChange: (category: Category, status: PartStatus) => void;
  onRetailChange: (value: number | null) => void;
};

function StatusDot({ status }: { status: PartStatus }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 shrink-0 rounded-full"
      style={{ backgroundColor: STATUS_META[status].dot }}
    />
  );
}

export function BuildSummarySheet({
  open,
  onOpenChange,
  build,
  total,
  onStatusChange,
  onRetailChange,
}: Props) {
  // Line items in canonical category order, selected parts only.
  const lineItems = useMemo(() => {
    return CATEGORIES.map((meta) => {
      const partId = build.selections[meta.id];
      const part = partById(partId);
      if (!part) return null;
      const status: PartStatus = build.statuses[meta.id] ?? "researching";
      return { meta, part, status };
    }).filter((x): x is NonNullable<typeof x> => x !== null);
  }, [build.selections, build.statuses]);

  const receivedCount = lineItems.filter(
    (li) => li.status === "received",
  ).length;
  const totalCategories = CATEGORIES.length;
  const progressPct =
    totalCategories === 0 ? 0 : (receivedCount / totalCategories) * 100;

  const retail = build.retailComparison;
  const savings = retail != null ? retail - total : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[88vh] overflow-y-auto border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)]"
      >
        <div className="mx-auto w-full max-w-2xl">
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-xl">
              {build.name} — Build Summary
            </SheetTitle>
            <SheetDescription className="text-[color:var(--forge-text-secondary)]">
              Track what you&#x2019;ve ordered, what&#x2019;s arrived, and how
              much you&#x2019;re saving versus buying retail.
            </SheetDescription>
          </SheetHeader>

          {/* Completion progress */}
          <div className="mt-5 rounded-lg border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-[color:var(--forge-text-secondary)]">
                Build completion
              </span>
              <span className="font-semibold tabular-nums">
                {receivedCount} of {totalCategories} parts received
              </span>
            </div>
            <Progress value={progressPct} className="h-2" />
          </div>

          {/* Line items */}
          <div className="mt-4 overflow-hidden rounded-lg border border-[color:var(--forge-border)]">
            {lineItems.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[color:var(--forge-text-muted)]">
                No parts selected yet. Pick parts in the configurator to see
                them here.
              </p>
            ) : (
              lineItems.map(({ meta, part, status }) => (
                <div
                  key={meta.id}
                  className="flex flex-col gap-3 border-b border-[color:var(--forge-border)] bg-[color:var(--forge-card)] px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <StatusDot status={status} />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--forge-text-muted)]">
                        {meta.label}
                      </p>
                      <p className="truncate font-medium">
                        {part.brand} · {part.name}
                      </p>
                      {part.vendorUrl && (
                        <VendorLink
                          url={part.vendorUrl}
                          vendorName={part.vendorName}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span className="font-semibold tabular-nums">
                      ${part.priceUsd.toFixed(2)}
                    </span>
                    <Select
                      value={status}
                      onValueChange={(v) =>
                        onStatusChange(meta.id, v as PartStatus)
                      }
                    >
                      <SelectTrigger className="h-8 w-36 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_ORDER.map((s) => (
                          <SelectItem key={s} value={s} className="text-xs">
                            <span className="flex items-center gap-2">
                              <StatusDot status={s} />
                              {STATUS_META[s].label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals + savings */}
          <div className="mt-4 space-y-3 rounded-lg border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[color:var(--forge-text-secondary)]">
                Build subtotal
              </span>
              <span className="font-display text-lg font-bold tabular-nums text-[color:var(--forge-accent)]">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-2 border-t border-[color:var(--forge-border)] pt-3 sm:flex-row sm:items-center sm:justify-between">
              <label
                htmlFor="retail-price"
                className="flex items-center gap-2 text-sm text-[color:var(--forge-text-secondary)]"
              >
                <PiggyBank className="h-4 w-4" />
                Retail watch you&#x2019;d buy instead
              </label>
              <div className="relative w-full sm:w-40">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--forge-text-muted)]">
                  $
                </span>
                <Input
                  id="retail-price"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  placeholder="0.00"
                  value={retail ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    onRetailChange(v === "" ? null : Math.max(0, Number(v)));
                  }}
                  className="pl-6 tabular-nums"
                />
              </div>
            </div>

            {savings != null && (
              <div
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  savings >= 0
                    ? "bg-[color:var(--forge-success)]/10 text-[color:var(--forge-success)]"
                    : "bg-[color:var(--forge-danger)]/10 text-[color:var(--forge-danger)]"
                }`}
              >
                <TrendingDown className="h-4 w-4 shrink-0" />
                {savings >= 0 ? (
                  <span>
                    Your build saves you{" "}
                    <strong className="tabular-nums">
                      ${savings.toFixed(2)}
                    </strong>{" "}
                    vs buying retail.
                  </span>
                ) : (
                  <span>
                    Your build costs{" "}
                    <strong className="tabular-nums">
                      ${Math.abs(savings).toFixed(2)}
                    </strong>{" "}
                    more than that retail watch.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
