# freshshot — Wellness Shot Recommender

A Miami-themed wellness-shot recommender: pick a goal or mood, browse matched shot recipes, swap ingredients, save favorites, or ask the AI **Shot-Tender** for a custom mix.

## Stack

- **Vite** + **React** + **TypeScript** + **Tailwind CSS**
- TanStack Router / Start on Vite — extended in place, not rescaffolded
- Static catalog in `src/data/shots.ts` (no database)
- One Vercel serverless function (`api/shottender.ts`) for the AI feature

## Run locally

**Node 22.12+** required (this repo pins **22.22.3** in `.nvmrc` — released May 13, 2026, before the June 1 npm incident).

### One-time: install nvm (v0.40.4, Jan 2026 — official release, not npm)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Close Terminal, reopen, then:

```bash
cd /Users/jungledev/Documents/DevProjects/fresh-shot-builder
nvm install    # reads .nvmrc → 22.22.3
nvm use
node -v        # v22.22.3
npm ci
npm run dev
```

nvm only changes Node in **this terminal** until you open another window. Other projects keep your system Node.

Open the URL Vite prints (usually `http://localhost:5173`).

For the Shot-Tender API locally, use [Vercel CLI](https://vercel.com/docs/cli) with `ANTHROPIC_API_KEY` set, or deploy to Vercel and set the env var there.

```bash
npm run build   # production build — should stay clean
```

## Features

- **Goal-based recommendations** — tap a mood/goal on Home to see matching shots
- **Per-ingredient “why it works”** — each ingredient shows a short benefit line on the detail screen
- **Ingredient swapping** — tap an ingredient to pick a listed substitute (local state only)
- **Favorites** — heart a shot; IDs persist in `localStorage`
- **Shot-Tender** — describe how you feel; Claude Haiku returns one custom shot as JSON (wellness suggestions, not medical advice)

## Built with Cursor

This project was extended and wired up using **Cursor**.

## Status / what's next

**Done:** goal-based results, shot detail with per-ingredient “why” lines and swaps, `localStorage` favorites, mobile-first layout up to `max-w-5xl` on desktop, and Shot-Tender (`POST /api/shottender` with `claude-haiku-4-5`).

**Deploy:** TanStack Start needs Nitro for Vercel (see `vite.config.ts` → `nitro: { preset: "vercel" }`). Push to GitHub, import the repo in [Vercel](https://vercel.com), set **Node 22**, and add `ANTHROPIC_API_KEY` in project env. Build command: `npm run build` (Nitro writes `.vercel/output`; do not set a static `outputDirectory`). Redeploy after env changes. Test Shot-Tender with `POST /api/shottender`.

**Nice-to-have:** shot photos in the catalog, deep links with goal pre-selected, and a Vite dev proxy to `/api/shottender` for local-only testing without the Vercel CLI.
