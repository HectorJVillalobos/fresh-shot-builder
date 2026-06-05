// vite-tanstack-config bundles required plugins — do NOT duplicate them manually
// or the app will break (tanstackStart, viteReact, tailwindcss, tsConfigPaths, etc.).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Required for self-hosted Vercel deploy (outside Lovable sandbox).
  nitro: { preset: "vercel" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
