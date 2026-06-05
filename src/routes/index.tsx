import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
      <AppHeader title="Good morning" subtitle="What does your body need today?" />

      <section className="pl-5 md:pl-10 mt-2 md:mt-4">
        <div className="flex items-baseline justify-between pr-5 md:pr-10 mb-3 md:mb-5">
          <h2 className="text-sm md:text-base font-semibold tracking-wide uppercase text-muted-foreground">Featured shots</h2>
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 pr-5 md:pr-10 snap-x snap-mandatory scrollbar-none"
        >
          {FEATURED.map((s) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="snap-start shrink-0 w-64 md:w-[calc((100%-3rem)/4)]"
            >
              <Link
                to="/shot/$slug"
                params={{ slug: s.id }}
                className="block rounded-2xl bg-card border border-border shadow-sm overflow-hidden transition hover:shadow-md"
              >
              <div className="aspect-square bg-secondary/40 flex items-center justify-center overflow-hidden">
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-5 md:px-10 mt-4 md:mt-10">
        <h2 className="text-sm md:text-base font-semibold tracking-wide uppercase text-muted-foreground mb-3 md:mb-5">
          How do you feel?
        </h2>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {GOALS.map((g) => (
            <motion.div
              key={g.key}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/results"
                search={{ goal: g.key }}
                className="rounded-2xl bg-card border border-border p-4 md:p-5 shadow-sm flex items-center gap-3 transition hover:border-primary/40 hover:shadow-md"
              >
                <motion.span
                  className="text-2xl md:text-3xl"
                  whileHover={{ rotate: [0, -10, 10, -6, 0], transition: { duration: 0.6 } }}
                >
                  {g.emoji}
                </motion.span>
                <span className="font-semibold md:text-lg">{g.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PhoneShell>
  );
}
