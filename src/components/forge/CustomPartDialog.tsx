import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { CustomPart } from "@/lib/build-storage";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryLabel: string;
  initial?: CustomPart;
  onSave: (part: CustomPart) => void;
};

const empty = { name: "", brand: "", price: "", vendorName: "", vendorUrl: "", note: "" };

export function CustomPartDialog({
  open,
  onOpenChange,
  categoryLabel,
  initial,
  onSave,
}: Props) {
  const [form, setForm] = useState(empty);

  // Seed the form whenever the dialog opens (new or editing).
  useEffect(() => {
    if (!open) return;
    setForm(
      initial
        ? {
            name: initial.name,
            brand: initial.brand ?? "",
            price: initial.priceUsd ? String(initial.priceUsd) : "",
            vendorName: initial.vendorName ?? "",
            vendorUrl: initial.vendorUrl ?? "",
            note: initial.note ?? "",
          }
        : empty,
    );
  }, [open, initial]);

  const price = Number(form.price);
  const valid = form.name.trim().length > 0 && form.price !== "" && price >= 0;

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit() {
    if (!valid) return;
    onSave({
      name: form.name.trim(),
      brand: form.brand.trim() || undefined,
      priceUsd: Math.round(price * 100) / 100,
      vendorName: form.vendorName.trim() || undefined,
      vendorUrl: form.vendorUrl.trim() || undefined,
      note: form.note.trim() || undefined,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            Add your own {categoryLabel.toLowerCase()}
          </DialogTitle>
          <DialogDescription className="text-[color:var(--forge-text-secondary)]">
            Can&#x2019;t find the exact part? Enter it manually and it&#x2019;ll
            join your build like any other.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-1">
          <div className="grid gap-1.5">
            <Label htmlFor="cp-name">Part name *</Label>
            <Input
              id="cp-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Crystal Times Domed Sapphire"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="cp-brand">Brand</Label>
              <Input
                id="cp-brand"
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cp-price">Price (USD) *</Label>
              <Input
                id="cp-price"
                type="number"
                inputMode="decimal"
                min={0}
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="cp-vendor">Vendor</Label>
              <Input
                id="cp-vendor"
                value={form.vendorName}
                onChange={(e) => set("vendorName", e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cp-url">Vendor link</Label>
              <Input
                id="cp-url"
                value={form.vendorUrl}
                onChange={(e) => set("vendorUrl", e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cp-note">Note</Label>
            <Textarea
              id="cp-note"
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="Specs, color, compatibility reminders…"
              rows={2}
            />
          </div>
          <p className="text-[11px] text-[color:var(--forge-text-muted)]">
            Heads up: compatibility warnings don&#x2019;t apply to custom parts —
            double-check fitment with your vendor.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[color:var(--forge-border)]"
          >
            Cancel
          </Button>
          <Button onClick={submit} disabled={!valid}>
            Save part
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
