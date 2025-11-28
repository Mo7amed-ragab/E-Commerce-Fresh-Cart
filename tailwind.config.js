/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Reduce bundle size by being more aggressive with purging
  safelist: [
    // Only safelist dynamic classes that can't be detected
    "bg-emerald-400",
    "bg-emerald-500",
    "bg-emerald-600",
    "text-emerald-600",
    "text-emerald-700",
  ],
};
