import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/forge/SiteNav";
import { SiteFooter } from "@/components/forge/SiteFooter";
import { TipJarButton } from "@/components/forge/TipJar";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support WatchForge" },
      {
        name: "description",
        content:
          "WatchForge is free. A small tip keeps it running and funds the next features.",
      },
      { property: "og:title", content: "Support WatchForge" },
      {
        property: "og:description",
        content:
          "WatchForge is free. A small tip keeps it running and funds the next features.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--forge-bg)] text-[color:var(--forge-text-primary)]">
      <SiteNav />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--forge-text-muted)]">
            Support
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Built by one person. Kept alive by tips.
          </h1>
          <p className="mt-4 text-[color:var(--forge-text-secondary)]">
            WatchForge is free. No ads, no signup, no inbox spam. If it saved you
            from buying the wrong dial — or just made planning more fun — a
            coffee goes a long way.
          </p>

          <div className="mt-8 rounded-xl border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-6">
            <h2 className="font-display text-lg font-semibold">Tip jar</h2>
            <p className="mt-1 text-sm text-[color:var(--forge-text-secondary)]">
              One-off support via Buy Me a Coffee. Anything from $3 up.
            </p>
            <div className="mt-4">
              <TipJarButton />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
