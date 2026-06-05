import { createFileRoute, Link } from "@tanstack/react-router";
import { MorningTitle } from "@/components/AnimatedRevealTitle";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { GOALS } from "@/data/goals";
import { shots } from "@/data/shots";

const FEATURED = shots.slice(0, 4);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "freshshot — wellness shots, made for how you feel" },
      { name: "description", content: "Pick a goal or mood and get a fresh wellness shot recipe." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PhoneShell>
      <AppHeader title={<MorningTitle />} compact />

      <section className="px-5 md:px-10 -mt-1 md:mt-0">
        <h2 className="text-lg md:text-2xl font-bold tracking-tight mb-3 md:mb-5">
          Miami! How tf we feeling?!
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {GOALS.map((g) => (
            <Link
              key={g.key}
              to="/results"
              search={{ goal: g.key }}
              className="relative rounded-2xl bg-card border border-border p-4 md:p-5 shadow-sm flex items-center gap-3 transition-all duration-200 ease-out hover:scale-105 hover:border-primary hover:shadow-lg hover:z-10 active:scale-[0.98]"
            >
              <span className="text-2xl md:text-3xl">{g.emoji}</span>
              <span className="font-semibold md:text-lg">{g.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pl-5 md:pl-10 mt-6 md:mt-10">
        <div className="flex items-baseline justify-between pr-5 md:pr-10 mb-3 md:mb-5">
          <h2 className="text-sm md:text-base font-semibold tracking-wide uppercase text-muted-foreground">Featured shots</h2>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto py-3 pb-4 pr-5 md:pr-10 snap-x snap-mandatory scrollbar-none">
          {FEATURED.map((s) => (
            <Link
              key={s.id}
              to="/shot/$slug"
              params={{ slug: s.id }}
              className="snap-start shrink-0 w-64 md:w-[calc((100%-3rem)/4)] relative rounded-2xl bg-card border border-border shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:border-primary hover:shadow-lg hover:z-10 active:scale-[0.99]"
            >
              <div className="aspect-square rounded-t-2xl bg-secondary/40 flex items-center justify-center overflow-hidden">
                {s.image ? (
                  <img src={s.image} alt={s.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-6xl">{s.emoji}</span>
                )}
              </div>
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl">{s.emoji}</span>
                  <h3 className="font-semibold leading-tight md:text-lg">{s.name}</h3>
                </div>
                <p className="mt-1.5 text-xs md:text-sm text-muted-foreground line-clamp-2">{s.benefit}</p>
                <p className="mt-2 text-xs md:text-sm font-medium text-primary">{s.base}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PhoneShell>
  );
}
