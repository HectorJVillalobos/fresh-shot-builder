import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/results", label: "Shots", icon: Sparkles },
  { to: "/shot-tender", label: "Tender", icon: MessageCircle },
] as const;

export function PhoneShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen w-full bg-muted/40 flex justify-center">
      <div className="w-full max-w-md md:max-w-5xl min-h-screen bg-background flex flex-col relative md:shadow-none shadow-xl">
        <main className="flex-1 pb-24 md:pb-12">{children}</main>
        <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-5xl bg-background/95 backdrop-blur border-t border-border z-40">
          <div className="grid grid-cols-3 px-2 py-2">
            {TABS.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? path === "/" : path.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[11px] font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export function AppHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="px-5 md:px-10 pt-6 md:pt-10 pb-4 md:pb-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-2xl bg-primary flex items-center justify-center">
            <Heart className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-bold tracking-tight text-lg md:text-xl">freshshot</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/favorites"
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              path === "/favorites" ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Link>
          <Link
            to="/favorites"
            className={`md:hidden h-9 w-9 rounded-full flex items-center justify-center ${
              path === "/favorites" ? "bg-secondary text-primary" : "text-muted-foreground"
            }`}
            aria-label="Favorites"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {TABS.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? path === "/" : path.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    active ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {title && <AnimatedTitle text={title} />}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 + title!.length * 0.04 }}
          className="mt-1 md:mt-2 text-sm md:text-base text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      className="mt-6 md:mt-10 text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] flex flex-wrap gap-x-3"
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden pb-1">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={`inline-block ${
                wi === words.length - 1
                  ? "bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent italic"
                  : ""
              }`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
