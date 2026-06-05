import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [burst, setBurst] = useState(0);

  const handleFav = () => {
    toggle(shot.id);
    setBurst((b) => b + 1);
  };

  return (
    <div className="md:max-w-4xl md:mx-auto md:px-10 md:pt-6 md:grid md:grid-cols-2 md:gap-10">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative md:rounded-3xl md:overflow-hidden md:self-start md:sticky md:top-6"
      >
        <div className="aspect-[4/3] md:aspect-square bg-secondary/40 overflow-hidden flex items-center justify-center">
          {shot.image ? (
            <motion.img
              src={shot.image}
              alt={shot.name}
              className="h-full w-full object-cover"
              width={800}
              height={800}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
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
          <motion.button
            type="button"
            onClick={handleFav}
            whileTap={{ scale: 0.85 }}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-sm overflow-visible"
          >
            <motion.span
              key={fav ? "on" : "off"}
              initial={{ scale: 0.6 }}
              animate={{ scale: fav ? [1.4, 1] : 1 }}
              transition={{ duration: 0.35, ease: "backOut" }}
              className="inline-flex"
            >
              <Heart className={`h-5 w-5 ${fav ? "text-primary fill-primary" : "text-muted-foreground"}`} />
            </motion.span>
            <AnimatePresence>
              {burst > 0 && fav && (
                <motion.span
                  key={burst}
                  className="pointer-events-none absolute inset-0 rounded-full"
                  initial={{ scale: 0.6, opacity: 0.7, boxShadow: "0 0 0 0 hsl(var(--primary) / 0.6)" }}
                  animate={{ scale: 1.8, opacity: 0, boxShadow: "0 0 0 18px hsl(var(--primary) / 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </motion.div>

      <div className="px-5 py-5 md:p-0">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
        >
          {[
            <div key="title" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl">{shot.emoji}</span>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{shot.name}</h1>
            </div>,
            <p key="benefit" className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">{shot.benefit}</p>,
            <p key="base" className="text-sm md:text-base font-medium text-primary mt-2">Base · {shot.base}</p>,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
            Ingredients
          </h2>
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
            }}
            className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden"
          >
            {ingredients.map((ing, i) => (
              <motion.li
                key={`${ing.name}-${i}`}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
              >
                <button
                  type="button"
                  disabled={!ing.substitutes?.length}
                  onClick={() => setSwapIndex(swapIndex === i ? null : i)}
                  className="w-full px-4 py-3 text-left text-sm md:text-base disabled:cursor-default active:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.07 + 0.1, type: "spring", stiffness: 400, damping: 16 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{ing.name}</p>
                      <p className="text-muted-foreground mt-0.5">{ing.why}</p>
                      {ing.substitutes?.length ? (
                        <p className="text-xs text-primary mt-1">Tap to swap</p>
                      ) : null}
                    </div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {swapIndex === i && ing.substitutes?.length ? (
                    <motion.div
                      key="subs"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3 pt-1 flex flex-wrap gap-2">
                        {ing.substitutes.map((sub, si) => (
                          <motion.button
                            key={sub}
                            type="button"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: si * 0.04 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => {
                              setIngredients((prev) =>
                                prev.map((item, idx) => (idx === i ? { ...item, name: sub } : item)),
                              );
                              setSwapIndex(null);
                            }}
                            className="rounded-full border border-primary/30 bg-secondary/50 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {sub}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {disclaimer ? (
          <p className="mt-4 text-xs text-muted-foreground">{disclaimer}</p>
        ) : null}
      </div>
    </div>
  );
}
