import { Link } from "@tanstack/react-router";
import { TipJarButton } from "./TipJar";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-display text-sm font-semibold">
            WatchForge
          </p>
          <p className="text-xs text-[color:var(--forge-text-muted)]">
            A free planner for watch modders. Free to use. Tips keep it alive.
          </p>
          <div className="flex gap-4 pt-2 text-xs text-[color:var(--forge-text-secondary)]">
            <Link to="/build" className="hover:text-[color:var(--forge-text-primary)]">
              Build
            </Link>
            <Link to="/learn" className="hover:text-[color:var(--forge-text-primary)]">
              Learn
            </Link>
            <Link to="/support" className="hover:text-[color:var(--forge-text-primary)]">
              Support
            </Link>
          </div>
        </div>
        <TipJarButton />
      </div>
    </footer>
  );
}
