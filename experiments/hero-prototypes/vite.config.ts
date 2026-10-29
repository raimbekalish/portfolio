// Isolated Vite config for the Phase 2 hero prototypes.
// It is never referenced by the production build (root vite.config.ts and index.html).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: here,
  base: "./",
  plugins: [react()],
  server: { host: "127.0.0.1", port: 5199, strictPort: true },
  preview: { host: "127.0.0.1", port: 5198, strictPort: true },
  build: {
    // Builds go to the gitignored tmp/ directory, never to the production dist/.
    outDir: fileURLToPath(new URL("../../tmp/hero-prototypes-dist", import.meta.url)),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
        editorial: fileURLToPath(new URL("editorial-instrument/index.html", import.meta.url)),
        cinematic: fileURLToPath(new URL("cinematic-signal/index.html", import.meta.url)),
      },
    },
  },
});
