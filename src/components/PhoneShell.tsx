import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, MessageCircle, Heart } from "lucide-react";

export function PhoneShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/", label: "Home", icon: Home },
    { to: "/results", label: "Shots", icon: Sparkles },
    { to: "/shot-tender", label: "Tender", icon: MessageCircle },
  ] as const;

  return (
    <div className="min-h-screen w-full bg-muted/40 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-background flex flex-col relative shadow-xl">
        <main className="flex-1 pb-24">{children}</main>
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background/95 backdrop-blur border-t border-border">
          <div className="grid grid-cols-3 px-2 py-2">
            {tabs.map(({ to, label, icon: Icon }) => {
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
  return (
    <header className="px-5 pt-6 pb-4">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-2xl bg-primary flex items-center justify-center">
          <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
        </div>
        <span className="font-bold tracking-tight text-lg">freshshot</span>
      </Link>
      {title && <h1 className="mt-5 text-2xl font-bold tracking-tight">{title}</h1>}
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </header>
  );
}