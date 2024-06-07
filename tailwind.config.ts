import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        DEFAULT: "#2C3A5C",
        active: "#FF6C02",
        secondary: "#5A6A93",
      },
    },
    borderColor: {
      DEFAULT: "#D4E4F2",
    },
    borderWidth: {
      DEFAULT: "0.5px",
    },
    fontFamily: {
      DEFAULT: ["Product Sans", "sans-serif"],
      minion: ["Minion Pro"],
    },
  },
  plugins: [],
};
export default config;
