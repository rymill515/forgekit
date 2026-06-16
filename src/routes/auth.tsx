import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { SiteNav } from "@/components/forge/SiteNav";
import { SiteFooter } from "@/components/forge/SiteFooter";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — WatchForge" },
      {
        name: "description",
        content: "Sign in to save and sync your watch mod builds across devices.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/build" });
    }
  }, [user, loading, navigate]);

  async function signIn(provider: "google" | "apple") {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin + "/build",
    });
    if (result.error) {
      toast.error(`${provider === "google" ? "Google" : "Apple"} sign-in failed. Please try again.`);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/build" });
  }

  return (
    <div className="min-h-screen bg-[color:var(--forge-bg)] text-[color:var(--forge-text-primary)]">
      <SiteNav />
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Sign in to save your builds
        </h1>
        <p className="mt-2 text-sm text-[color:var(--forge-text-secondary)]">
          Sync your watch builds across devices. Pick a provider to continue.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => signIn("google")}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-[color:var(--forge-border)] bg-[color:var(--forge-surface)] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[color:var(--forge-surface-hover)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <button
            onClick={() => signIn("apple")}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.04c-.03-2.75 2.25-4.07 2.35-4.13-1.28-1.87-3.27-2.13-3.98-2.16-1.7-.17-3.31 1-4.17 1-.87 0-2.2-.98-3.62-.95-1.86.03-3.58 1.08-4.54 2.75-1.93 3.36-.49 8.34 1.39 11.07.92 1.34 2.01 2.83 3.43 2.78 1.38-.06 1.9-.89 3.57-.89 1.66 0 2.13.89 3.59.86 1.48-.03 2.42-1.36 3.33-2.71 1.05-1.55 1.48-3.06 1.51-3.14-.03-.01-2.9-1.11-2.93-4.4zM14.3 4.06c.75-.91 1.26-2.18 1.12-3.44-1.08.04-2.4.72-3.18 1.63-.7.8-1.31 2.08-1.15 3.32 1.21.09 2.45-.61 3.21-1.51z"/></svg>
            Continue with Apple
          </button>

          <p className="pt-4 text-center text-xs text-[color:var(--forge-text-muted)]">
            <Link to="/" className="hover:text-[color:var(--forge-text-secondary)]">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
