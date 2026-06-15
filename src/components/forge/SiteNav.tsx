import { Link } from "@tanstack/react-router";
import { Cog } from "lucide-react";

const linkBase =
  "text-sm text-[color:var(--forge-text-secondary)] hover:text-[color:var(--forge-text-primary)] transition-colors";
const activeProps = {
  className:
    "text-sm text-[color:var(--forge-text-primary)] font-medium",
};

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--forge-border)] bg-[color:var(--forge-bg)]/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[color:var(--forge-accent)] text-[color:var(--forge-accent-text)]">
            <Cog className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Watch<span className="text-[color:var(--forge-accent)]">Forge</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-[color:var(--forge-text-muted)] sm:inline">
            by ForgeKit
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link to="/build" className={linkBase} activeProps={activeProps}>
            Build
          </Link>
          <Link to="/learn" className={linkBase} activeProps={activeProps}>
            Learn
          </Link>
          <Link to="/support" className={linkBase} activeProps={activeProps}>
            Support
          </Link>
          <Link
            to="/build"
            className="hidden rounded-md bg-[color:var(--forge-accent)] px-3 py-1.5 text-xs font-semibold text-[color:var(--forge-accent-text)] transition-colors hover:bg-[color:var(--forge-accent-hover)] sm:inline-flex"
          >
            Start a build
          </Link>
        </nav>
      </div>
    </header>
  );
}
