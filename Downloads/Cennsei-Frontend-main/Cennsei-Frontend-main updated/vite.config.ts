import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE_PATH is set to "/" on Vercel and "/Cennsei-Portfolio-Frontend/" for GitHub Pages.
// Falls back to "/" if not set (safe default for Vercel).
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  plugins: [react()],
  base,
});
