import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Cog,
  DollarSign,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/forge/SiteNav";
import { SiteFooter } from "@/components/forge/SiteFooter";
import heroWatches from "@/assets/hero-watches.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WatchForge — Plan your next watch mod build" },
      {
        name: "description",
        content:
          "Configure a custom Seiko or NH35 build, see the cost live, track every part. Free, no signup.",
      },
      { property: "og:title", content: "WatchForge — Plan your next watch mod build" },
      {
        property: "og:description",
        content:
          "Configure a custom Seiko or NH35 build, see the cost live, track every part. Free, no signup.",
      },
    ],
  }),
  component: LandingPage,
});

const LOOP = [
  {
    icon: BookOpen,
    label: "Learn",
    body: "Glossary of every part, what fits what, and the gotchas to avoid.",
  },
  {
    icon: Cog,
    label: "Plan",
    body: "Drop parts into a build. See compatibility flags as you go.",
  },
  {
    icon: ShoppingCart,
    label: "Execute",
    body: "Vendor links per part — Namoki, Crystaltimes, Strapcode, more.",
  },
  {
    icon: DollarSign,
    label: "Track",
    body: "Live running total. Know your build cost before you commit.",
  },
];

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--forge-bg)] text-[color:var(--forge-text-primary)]">
      <SiteNav />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[color:var(--forge-border)]">
          {/* Hero photo */}
          <img
            src={heroWatches}
            alt="A custom chronograph, dive, and dress watch laid out on a wooden workbench"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* Dark gradient overlay — keeps the headline legible over the photo */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--forge-bg) 0%, color-mix(in oklab, var(--forge-bg) 78%, transparent) 42%, color-mix(in oklab, var(--forge-bg) 25%, transparent) 100%), linear-gradient(to bottom, color-mix(in oklab, var(--forge-bg) 40%, transparent) 0%, transparent 30%, var(--forge-bg) 100%)",
            }}
          />
          <div className="forge-grid-bg absolute inset-0 opacity-20" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at top left, color-mix(in oklab, var(--forge-accent) 16%, transparent), transparent 55%)",
            }}
          />
          <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-center px-4 pb-24 pt-20 sm:pt-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] px-3 py-1 text-xs text-[color:var(--forge-text-secondary)]">
              <Sparkles className="h-3 w-3 text-[color:var(--forge-accent)]" />
              v1.0 — WatchForge
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Plan your next watch mod.{" "}
              <span className="forge-gradient-text">Down to the dollar.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[color:var(--forge-text-secondary)] sm:text-lg">
              WatchForge is a free configurator for watch modders. Pick a movement, case,
              dial, hands. See the cost update live. Catch compatibility issues before you
              spend $40 on a dial that won't fit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/build"
                className="inline-flex items-center gap-2 rounded-md bg-[color:var(--forge-accent)] px-5 py-3 text-sm font-semibold text-[color:var(--forge-accent-text)] transition-colors hover:bg-[color:var(--forge-accent-hover)]"
              >
                Start a build
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 rounded-md border border-[color:var(--forge-border-strong)] px-5 py-3 text-sm font-semibold text-[color:var(--forge-text-primary)] transition-colors hover:bg-[color:var(--forge-card-hover)]"
              >
                Read the glossary
              </Link>
            </div>
            <p className="mt-4 text-xs text-[color:var(--forge-text-muted)]">
              Free forever. Sign in with Google or Apple to save your builds and
              sync them across devices.
            </p>
          </div>
        </section>

        <section className="border-b border-[color:var(--forge-border)]">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--forge-text-muted)]">
              The loop
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold tracking-tight">
              Learn. Plan. Execute. Track.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {LOOP.map((step, i) => (
                <div
                  key={step.label}
                  className="rounded-xl border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-[color:var(--forge-bg)] text-[color:var(--forge-accent)]">
                      <step.icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-xs text-[color:var(--forge-text-muted)]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm text-[color:var(--forge-text-secondary)]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--forge-text-muted)]">
                Why we built it
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Spreadsheets don't catch a wrong dial foot.
              </h2>
              <p className="mt-4 text-[color:var(--forge-text-secondary)]">
                Most modders plan in Reddit threads, browser tabs, and a Notes app. By
                the time the parts ship, half the references are gone and the math is
                wrong. WatchForge keeps the build in one place and warns you when parts
                don't talk to each other.
              </p>
            </div>
            <ul className="grid gap-3">
              {[
                "Real parts seeded — NH35, Turtle, SRPD, sandwich dials, Tropic straps.",
                "Compatibility hints flag mismatched feet or lug widths inline.",
                "Vendor links per part. One click to Namoki, Crystaltimes, Strapcode.",
                "Builds saved to your account and synced across every device.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-4 text-sm"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--forge-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
