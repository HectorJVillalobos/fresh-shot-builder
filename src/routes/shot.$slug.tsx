import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { ShotDetailView } from "@/components/ShotDetailView";
import { shots } from "@/data/shots";

type ShotSearch = { fromGoal?: string };

export const Route = createFileRoute("/shot/$slug")({
  validateSearch: (search: Record<string, unknown>): ShotSearch => ({
    fromGoal: typeof search.fromGoal === "string" ? search.fromGoal : undefined,
  }),
  component: ShotDetail,
});

function ShotDetail() {
  const { slug } = Route.useParams();
  const { fromGoal } = Route.useSearch();
  const shot = shots.find((s) => s.id === slug);

  if (!shot) {
    return (
      <PhoneShell>
        <div className="px-5 py-12 text-center">
          <p className="text-muted-foreground">Shot not found.</p>
          <Link to="/" className="mt-4 inline-block text-primary font-semibold">
            Back home
          </Link>
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <AppHeader />
      <ShotDetailView
        shot={shot}
        backTo="/results"
        backSearch={fromGoal ? { goal: fromGoal } : undefined}
      />
    </PhoneShell>
  );
}
