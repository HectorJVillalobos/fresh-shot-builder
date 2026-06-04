import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { MORE } from "@/lib/shots";
import { ArrowLeft, Heart, Shuffle } from "lucide-react";

export const Route = createFileRoute("/shot/$slug")({
  component: ShotDetail,
});

function ShotDetail() {
  const { slug } = Route.useParams();
  const shot = MORE.find((s) => s.slug === slug) ?? MORE[0];

  return (
    <PhoneShell>
      <div className="relative">
        <div className="aspect-[4/3] bg-secondary/40 overflow-hidden flex items-center justify-center">
          {shot.image ? (
            <img src={shot.image} alt={shot.name} className="h-full w-full object-cover" width={800} height={600} />
          ) : (
            <span className="text-8xl">{shot.emoji}</span>
          )}
        </div>
        <Link
          to="/results"
          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-sm">
          <Heart className="h-5 w-5 text-primary" />
        </button>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{shot.emoji}</span>
          <h1 className="text-2xl font-bold tracking-tight">{shot.name}</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{shot.benefit}</p>
        <p className="text-sm font-medium text-primary mt-2">Base · {shot.base}</p>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
            Ingredients
          </h2>
          <ul className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
            {shot.ingredients.map((i) => (
              <li key={i} className="px-4 py-3 text-sm flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {i}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
            Why it works
          </h2>
          <div className="rounded-2xl bg-secondary/40 p-4 space-y-2">
            {shot.why.map((w) => (
              <p key={w} className="text-sm text-secondary-foreground">{w}</p>
            ))}
          </div>
        </section>

        <button className="mt-6 w-full rounded-2xl border border-border bg-card p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Shuffle className="h-5 w-5 text-primary" />
            <span className="font-medium">Swap base or ingredient</span>
          </div>
          <span className="text-xs text-muted-foreground">soon</span>
        </button>

        <button className="mt-3 w-full rounded-2xl bg-primary text-primary-foreground font-semibold py-4 shadow-sm active:scale-[0.99] transition">
          Save to favorites
        </button>
      </div>
    </PhoneShell>
  );
}