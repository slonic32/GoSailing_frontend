import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/~ahordiyevs/gosailing5/",
  build: {
    sourcemap: true,
  },
});
