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
        hardLime: "#a6ff00",
        softLime: "#d1ff77",
        hardPink: "#ff007b",
        softPink: "#ff48c9",
        hardBlue: "#501cff",
        softBlue: "#6d77ff",
        kickYellow: "#fff000",
        appleRed: "#fc5552",
      },
    },
  },
  plugins: [],
};
export default config;
