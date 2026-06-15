type Props = {
  notes: string;
  onChange: (notes: string) => void;
};

export function BuildNotes({ notes, onChange }: Props) {
  return (
    <section className="rounded-xl border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-5">
      <h3 className="font-display text-base font-semibold">Notes</h3>
      <p className="mt-1 text-xs text-[color:var(--forge-text-secondary)]">
        Vendor links to check, color combos, timing — anything you'll forget by next week.
      </p>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder="Waiting on black sandwich dial from Namoki. Crystal pre-ordered…"
        className="mt-3 w-full resize-y rounded-md border border-[color:var(--forge-border)] bg-[color:var(--forge-bg)] p-3 text-sm outline-none focus:border-[color:var(--forge-accent)]"
      />
    </section>
  );
}
