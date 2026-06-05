import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { shots } from "@/data/shots";
import { useFavorites } from "@/hooks/useFavorites";
import { ChevronRight, Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — freshshot" },
      { name: "description", content: "Your saved wellness shots." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { ids } = useFavorites();
  const saved = shots.filter((s) => ids.includes(s.id));

  return (
    <PhoneShell>
      <AppHeader title="Favorites" subtitle="Shots you've saved for later" />
      <div className="px-5 md:px-10">
        {saved.length === 0 ? (
          <div className="rounded-2xl bg-secondary/40 p-8 text-center">
            <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No favorites yet. Open a shot and tap the heart to save it here.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-sm font-semibold text-primary"
            >
              Browse shots
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {saved.map((s) => (
              <Link
                key={s.id}
                to="/shot/$slug"
                params={{ slug: s.id }}
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
        )}
      </div>
    </PhoneShell>
  );
}
