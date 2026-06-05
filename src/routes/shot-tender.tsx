import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShotTenderTitle } from "@/components/AnimatedRevealTitle";
import { PhoneShell, AppHeader } from "@/components/PhoneShell";
import { ShotDetailView } from "@/components/ShotDetailView";
import type { Shot } from "@/data/shots";
import { MixingShotLoader } from "@/components/MixingShotLoader";
import { Sparkles } from "lucide-react";

const DISCLAIMER =
  "Wellness suggestions only — not medical advice. Consult a professional for health concerns.";

export const Route = createFileRoute("/shot-tender")({
  head: () => ({
    meta: [{ title: "Shot-Tender — freshshot" }],
  }),
  component: ShotTender,
});

function ShotTender() {
  const [feeling, setFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customShot, setCustomShot] = useState<Shot | null>(null);

  async function askTender() {
    const text = feeling.trim();
    if (!text) return;
    setLoading(true);
    setError(null);
    setCustomShot(null);
    try {
      const res = await fetch("/api/shottender", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ feeling: text }),
      });
      const data = (await res.json()) as { shot?: Shot; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      if (data.shot) setCustomShot(data.shot);
    } catch {
      setError("Could not reach Shot-Tender. Try again after deploy or use vercel dev.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PhoneShell>
      <AppHeader
        title={<ShotTenderTitle />}
        subtitle="Tell me how you feel — I'll mix you something."
      />
      <div className="px-5 md:px-10 md:max-w-2xl md:mx-auto w-full">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
          <label htmlFor="feeling" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            How are you feeling?
          </label>
          <textarea
            id="feeling"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="Describe how you feel…"
            className="mt-3 w-full min-h-32 resize-none bg-background rounded-xl border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="button"
            disabled={loading || !feeling.trim()}
            onClick={() => void askTender()}
            className="mt-4 w-full rounded-2xl bg-primary text-primary-foreground font-semibold py-4 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Mixing your shot…" : "Ask the Shot-Tender"}
          </button>
          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        </div>

        <p className="mt-4 text-xs text-muted-foreground px-1">{DISCLAIMER}</p>

        {loading ? <MixingShotLoader /> : null}

        {!customShot && !loading ? (
          <div className="mt-5 rounded-2xl bg-secondary/40 p-4">
            <p className="text-xs text-muted-foreground">
              Try: &quot;I&apos;m groggy and have a long afternoon ahead&quot; or &quot;My stomach feels off after lunch.&quot;
            </p>
          </div>
        ) : null}

        {customShot ? (
          <div className="mt-8 -mx-5 md:mx-0">
            <ShotDetailView
              shot={customShot}
              backTo="/shot-tender"
              showFavorite={false}
              disclaimer={DISCLAIMER}
            />
          </div>
        ) : null}
      </div>
    </PhoneShell>
  );
}
