import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { MORE } from "@/lib/shots";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your shots — freshshot" },
      { name: "description", content: "Wellness shots matched to your goal." },
    ],
  }),
  component: Results,
});

function Results() {
  return (
    <PhoneShell>
      <AppHeader title="Your shots" subtitle="Picked for how you feel right now" />
      <div className="px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {MORE.map((s) => (
          <Link
            key={s.slug}
            to="/shot/$slug"
            params={{ slug: s.slug }}
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
        ))}
      </div>
    </PhoneShell>
  );
}