import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import type { Ingredient, Shot } from "@/data/shots";
import { useFavorites } from "@/hooks/useFavorites";

type Props = {
  shot: Shot;
  backTo?: string;
  backSearch?: { goal?: string };
  showFavorite?: boolean;
  disclaimer?: string;
};

export function ShotDetailView({
  shot,
  backTo = "/results",
  backSearch,
  showFavorite = true,
  disclaimer,
}: Props) {
  const { isFavorite, toggle } = useFavorites();
  const [ingredients, setIngredients] = useState<Ingredient[]>(shot.ingredients);
  const [swapIndex, setSwapIndex] = useState<number | null>(null);

  useEffect(() => {
    setIngredients(shot.ingredients);
    setSwapIndex(null);
  }, [shot.id, shot.ingredients]);

  const fav = showFavorite && isFavorite(shot.id);

  return (
    <div className="md:max-w-4xl md:mx-auto md:px-10 md:pt-6 md:grid md:grid-cols-2 md:gap-10">
      <div className="relative md:rounded-3xl md:overflow-hidden md:self-start md:sticky md:top-6">
        <div className="aspect-[4/3] md:aspect-square bg-secondary/40 overflow-hidden flex items-center justify-center">
          {shot.image ? (
            <img src={shot.image} alt={shot.name} className="h-full w-full object-cover" width={800} height={800} />
          ) : (
            <span className="text-8xl">{shot.emoji}</span>
          )}
        </div>
        <Link
          to={backTo}
          search={backSearch}
          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        {showFavorite && (
          <button
            type="button"
            onClick={() => toggle(shot.id)}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-sm"
          >
            <Heart className={`h-5 w-5 ${fav ? "text-primary fill-primary" : "text-muted-foreground"}`} />
          </button>
        )}
      </div>

      <div className="px-5 py-5 md:p-0">
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl">{shot.emoji}</span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{shot.name}</h1>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">{shot.benefit}</p>
        <p className="text-sm md:text-base font-medium text-primary mt-2">Base · {shot.base}</p>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
            Ingredients
          </h2>
          <ul className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
            {ingredients.map((ing, i) => (
              <li key={`${ing.name}-${i}`}>
                <button
                  type="button"
                  disabled={!ing.substitutes?.length}
                  onClick={() => setSwapIndex(swapIndex === i ? null : i)}
                  className="w-full px-4 py-3 text-left text-sm md:text-base disabled:cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{ing.name}</p>
                      <p className="text-muted-foreground mt-0.5">{ing.why}</p>
                      {ing.substitutes?.length ? (
                        <p className="text-xs text-primary mt-1">Tap to swap</p>
                      ) : null}
                    </div>
                  </div>
                </button>
                {swapIndex === i && ing.substitutes?.length ? (
                  <div className="px-4 pb-3 flex flex-wrap gap-2">
                    {ing.substitutes.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          setIngredients((prev) =>
                            prev.map((item, idx) => (idx === i ? { ...item, name: sub } : item)),
                          );
                          setSwapIndex(null);
                        }}
                        className="rounded-full border border-primary/30 bg-secondary/50 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {disclaimer ? (
          <p className="mt-4 text-xs text-muted-foreground">{disclaimer}</p>
        ) : null}
      </div>
    </div>
  );
}
