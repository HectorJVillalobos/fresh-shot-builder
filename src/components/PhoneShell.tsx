import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, MessageCircle, Heart } from "lucide-react";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/shot-tender", label: "Shot-Tender", icon: MessageCircle },
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
                  <span className="text-[10px] font-medium leading-tight text-center">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export function AppHeader({
  title,
  subtitle,
  compact,
}: {
  title?: ReactNode;
  subtitle?: string;
  compact?: boolean;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header
      className={`px-5 md:px-10 pt-6 md:pt-10 ${compact ? "pb-2 md:pb-4" : "pb-4 md:pb-8"}`}
    >
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
      {title &&
        (typeof title === "string" ? (
          <h1 className="mt-6 md:mt-10 text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
        ) : (
          title
        ))}
      {subtitle && <p className="mt-1 md:mt-2 text-sm md:text-base text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
