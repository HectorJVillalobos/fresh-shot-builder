import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { GOALS } from "@/data/goals";
import { shots } from "@/data/shots";
import { ChevronRight } from "lucide-react";

type ResultsSearch = { goal?: string };

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>): ResultsSearch => ({
    goal: typeof search.goal === "string" ? search.goal : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Your shots — freshshot" },
      { name: "description", content: "Wellness shots matched to your goal." },
    ],
  }),
  component: Results,
});

function Results() {
  const { goal } = Route.useSearch();
  const matched = goal ? shots.filter((s) => s.goals.includes(goal)) : shots;
  const goalLabel = GOALS.find((g) => g.key === goal)?.label;

  return (
    <PhoneShell>
      <AppHeader
        title={goalLabel ? `Shots for ${goalLabel}` : "Your shots"}
        subtitle={goal ? "Matched to your goal" : "All wellness shots"}
      />
      <div className="px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {matched.length === 0 ? (
          <p className="text-sm text-muted-foreground col-span-full text-center py-8">
            No shots for this goal yet.{" "}
            <Link to="/" className="text-primary font-medium">
              Pick another mood
            </Link>
          </p>
        ) : (
          matched.map((s) => (
            <Link
              key={s.id}
              to="/shot/$slug"
              params={{ slug: s.id }}
              search={goal ? { fromGoal: goal } : undefined}
              className="block rounded-2xl bg-card border border-border p-4 md:p-5 shadow-sm active:scale-[0.99] transition hover:shadow-md hover:border-primary/40"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-secondary/50 flex items-center justify-center text-2xl shrink-0">
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{s.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{s.benefit}</p>
                  <p className="text-xs font-medium text-primary mt-1">{s.base}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          ))
        )}
      </div>
    </PhoneShell>
  );
}
