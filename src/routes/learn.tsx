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

        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid gap-3 sm:grid-cols-2">
            {GLOSSARY.map((g) => (
              <article
                key={g.term}
                className="rounded-xl border border-[color:var(--forge-border)] bg-[color:var(--forge-card)] p-5"
              >
                <h2 className="font-display text-lg font-semibold">{g.term}</h2>
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
