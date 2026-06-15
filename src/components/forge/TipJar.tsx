import { Coffee } from "lucide-react";

export const BMAC_URL = "https://buymeacoffee.com/rymill515";

export function TipJarButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={BMAC_URL}
      target="_blank"
      rel="noreferrer"
      className={
        "inline-flex items-center gap-2 rounded-md bg-[color:var(--forge-accent)] px-3 py-2 text-sm font-semibold text-[color:var(--forge-accent-text)] transition-colors hover:bg-[color:var(--forge-accent-hover)] " +
        className
      }
    >
      <Coffee className="h-4 w-4" />
      Buy me a coffee
    </a>
  );
}
