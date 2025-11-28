import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": [
            "react-toastify",
            "react-helmet",
            "react-loader-spinner",
          ],
          "form-vendor": ["formik", "yup"],
          "query-vendor": ["react-query", "axios"],
          "swiper-vendor": ["swiper"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification with esbuild (default and faster)
    minify: "esbuild",
    // Target modern browsers for better optimization
    target: "es2015",
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios"],
  },
  // Enable esbuild optimizations
  esbuild: {
    drop: ["console", "debugger"], // Remove console.logs in production
  },
});
