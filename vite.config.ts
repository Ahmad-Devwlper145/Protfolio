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
    rollupOptions: {
      output: {
        // Split heavy libraries into their own cacheable chunks so the initial
        // bundle is smaller and vendor code is cached across deploys.
        manualChunks: {
          three: ["three", "three-stdlib"],
          r3f: [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/rapier",
            "@react-three/postprocessing",
          ],
          gsap: ["gsap", "gsap-trial", "@gsap/react"],
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
