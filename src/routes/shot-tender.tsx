import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/shot-tender")({
  head: () => ({
    meta: [{ title: "Shot-Tender — freshshot" }],
  }),
  component: ShotTender,
});

function ShotTender() {
  return (
    <PhoneShell>
      <AppHeader title="Shot-Tender" subtitle="Tell me how you feel — I'll mix you something." />
      <div className="px-5 md:px-10 md:max-w-2xl md:mx-auto w-full">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            How are you feeling?
          </label>
          <textarea
            placeholder="Describe how you feel…"
            className="mt-3 w-full min-h-32 resize-none bg-background rounded-xl border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button className="mt-4 w-full rounded-2xl bg-primary text-primary-foreground font-semibold py-4 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition">
            <Sparkles className="h-4 w-4" />
            Ask the Shot-Tender
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-secondary/40 p-4">
          <p className="text-xs text-muted-foreground">
            Try: "I'm groggy and have a long afternoon ahead" or "My stomach feels off after lunch."
          </p>
        </div>
      </div>
    </PhoneShell>
  );
}