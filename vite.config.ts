import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
  },
  build: {
    // No manual chunking. The previous hand-written manualChunks map pulled
    // react/react-dom into the "r3f" chunk, so the entry statically imported
    // ~960 KB gzipped of fiber/drei/rapier/postprocessing just to boot React.
    // Character/ and TechStack/ are both dynamically imported, so Rollup's
    // default splitting already puts three + the physics stack behind those
    // lazy boundaries.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});
