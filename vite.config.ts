import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ["buffer", "process"], // Only include required polyfills
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: false, // Disable unless using `node:` protocol imports
    }),
  ],
});
