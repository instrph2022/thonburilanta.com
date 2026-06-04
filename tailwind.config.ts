import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        "warm-white": "var(--warm-white)",
        sand: "var(--sand)",
        "teal-brand": "var(--teal)",
        "teal-mid": "var(--teal-mid)",
        "teal-light": "var(--teal-light)",
        "teal-dark": "var(--teal-dark)",
        ocean: "var(--ocean)",
        "ocean-light": "var(--ocean-light)",
        amber: "var(--amber)",
        "amber-light": "var(--amber-light)",
        "red-soft": "var(--red-soft)",
        dark: "var(--dark)",
        mid: "var(--mid)",
        muted: "var(--muted)",
      },
    },
  },
  plugins: [],
};
export default config;
