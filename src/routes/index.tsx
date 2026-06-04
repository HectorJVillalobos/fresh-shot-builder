import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { FEATURED, GOALS } from "@/lib/shots";

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
      <AppHeader title="Good morning" subtitle="What does your body need today?" />

      <section className="pl-5 mt-2">
        <div className="flex items-baseline justify-between pr-5 mb-3">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Featured shots</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 pr-5 snap-x snap-mandatory scrollbar-none">
          {FEATURED.map((s) => (
            <Link
              key={s.slug}
              to="/shot/$slug"
              params={{ slug: s.slug }}
              className="snap-start shrink-0 w-64 rounded-2xl bg-card border border-border shadow-sm overflow-hidden active:scale-[0.99] transition"
            >
              <div className="aspect-square bg-secondary/40 flex items-center justify-center overflow-hidden">
                {s.image ? (
                  <img src={s.image} alt={s.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-6xl">{s.emoji}</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.emoji}</span>
                  <h3 className="font-semibold leading-tight">{s.name}</h3>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{s.benefit}</p>
                <p className="mt-2 text-xs font-medium text-primary">{s.base}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 mt-4">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
          How do you feel?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {GOALS.map((g) => (
            <Link
              key={g.key}
              to="/results"
              search={{ goal: g.key }}
              className="rounded-2xl bg-card border border-border p-4 shadow-sm flex items-center gap-3 active:scale-[0.98] transition hover:border-primary/40"
            >
              <span className="text-2xl">{g.emoji}</span>
              <span className="font-semibold">{g.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </PhoneShell>
  );
}
