import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, BookOpen, Youtube, Users, ExternalLink, Star } from "lucide-react";
import { SiteNav } from "@/components/forge/SiteNav";
import { SiteFooter } from "@/components/forge/SiteFooter";
import { GLOSSARY, COMPATIBILITY_TIPS } from "@/data/glossary";
import { RESOURCE_SECTIONS, type ResourceKind } from "@/data/resources";

const KIND_ICON: Record<ResourceKind, typeof BookOpen> = {
  guide: BookOpen,
  video: Youtube,
  community: Users,
};

const KIND_LABEL: Record<ResourceKind, string> = {
  guide: "Article",
  video: "Video",
  community: "Community",
};

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Watch mod glossary" },
      {
        name: "description",
        content:
          "What is a dial foot? Why do bezels matter? A beginner-friendly glossary of watch modding terms.",
      },
      { property: "og:title", content: "Learn — Watch mod glossary" },
      {
        property: "og:description",
        content:
          "A beginner-friendly glossary of watch modding terms, plus compatibility tips.",
      },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--forge-bg)] text-[color:var(--forge-text-primary)]">
      <SiteNav />
      <main className="flex-1">
        <section className="border-b border-[color:var(--forge-border)]">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--forge-text-muted)]">
              Learn
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Watch mod glossary
            </h1>
            <p className="mt-3 max-w-2xl text-[color:var(--forge-text-secondary)]">
              The vocabulary that separates a $40 mistake from a $400 build.
            </p>
          </div>
        </section>

        <section className="border-b border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)]">
          <div className="mx-auto max-w-4xl px-4 py-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--forge-text-muted)]">
              New to modding?
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">
              Curated reading & watching
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[color:var(--forge-text-secondary)]">
              Hand-picked guides, channels, and forums. Start with the {" "}
              <Star className="-mt-0.5 inline h-3.5 w-3.5 fill-[color:var(--forge-accent)] text-[color:var(--forge-accent)]" />{" "}
              picks if you only have time for one.
            </p>

            <div className="mt-8 space-y-10">
              {RESOURCE_SECTIONS.map((section) => (
                <div key={section.id}>
                  <h3 className="font-display text-base font-semibold">
                    {section.label}
                  </h3>
                  <p className="mt-1 text-xs text-[color:var(--forge-text-secondary)]">
                    {section.intro}
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {section.items.map((r) => {
                      const Icon = KIND_ICON[r.kind];
                      return (
                        <li key={r.url}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-full flex-col gap-2 rounded-lg border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-4 transition-colors hover:border-[color:var(--forge-accent)]/60 hover:bg-[color:var(--forge-card-hover)]"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-[color:var(--forge-text-muted)]">
                                <Icon className="h-3 w-3" />
                                {KIND_LABEL[r.kind]} · {r.source}
                              </span>
                              {r.pick && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--forge-accent)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--forge-accent)]">
                                  <Star className="h-2.5 w-2.5 fill-current" />
                                  Top pick
                                </span>
                              )}
                            </div>
                            <p className="flex items-start justify-between gap-2 font-display text-sm font-semibold text-[color:var(--forge-text-primary)]">
                              <span>{r.title}</span>
                              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--forge-text-muted)] transition-colors group-hover:text-[color:var(--forge-accent)]" />
                            </p>
                            <p className="text-xs text-[color:var(--forge-text-secondary)]">
                              {r.blurb}
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--forge-text-muted)]">
            Glossary
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">
            The terms you'll hit on day one
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {GLOSSARY.map((g) => (
              <article
                key={g.term}
                className="rounded-xl border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-5"
              >
                <h3 className="font-display text-lg font-semibold">{g.term}</h3>
                <p className="mt-2 text-sm text-[color:var(--forge-text-secondary)]">
                  {g.definition}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)]">
          <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[color:var(--forge-accent)]" />
              <h2 className="font-display text-xl font-semibold">
                Compatibility tips
              </h2>
            </div>
            <ul className="mt-5 grid gap-3">
              {COMPATIBILITY_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex gap-3 rounded-lg border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-4 text-sm"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--forge-accent)]" />
                  {tip}
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
