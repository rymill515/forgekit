import { Link } from "@tanstack/react-router";
import { Cog, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const linkBase =
  "text-sm text-[color:var(--forge-text-secondary)] hover:text-[color:var(--forge-text-primary)] transition-colors";
const activeProps = {
  className:
    "text-sm text-[color:var(--forge-text-primary)] font-medium",
};

export function SiteNav() {
  const { user, loading } = useAuth();

  async function signOut() {
    await supabase.auth.signOut();
  }

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
          {loading ? null : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1.5 text-xs text-[color:var(--forge-text-muted)] md:inline-flex">
                <UserIcon className="h-3 w-3" />
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-1 rounded-md border border-[color:var(--forge-border)] px-2.5 py-1.5 text-xs text-[color:var(--forge-text-secondary)] transition-colors hover:text-[color:var(--forge-text-primary)]"
                title="Sign out"
              >
                <LogOut className="h-3 w-3" />
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-md bg-[color:var(--forge-accent)] px-3 py-1.5 text-xs font-semibold text-[color:var(--forge-accent-text)] transition-colors hover:bg-[color:var(--forge-accent-hover)]"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
