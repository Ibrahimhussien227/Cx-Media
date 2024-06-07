import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "striped-gradient":
          "repeating-linear-gradient( -45deg,#FFFFFF,#FFFFFF 3px,#e9f1f8 3px, #e9f1f8 6px )",
      },
      colors: {
        default: "#2C3A5C",
        secondary: "#5A6A93",
        active: "#FF6C02",
        lightBackground: "#F5FAFF",
      },
      backgroundColor: {
        orangeStatus: "#FFFAF8",
      },
    },
    borderColor: {
      DEFAULT: "#D4E4F2",
      active: "#FF6C02",
    },
    borderWidth: {
      DEFAULT: "0.5px",
    },
    fontFamily: {
      ProductSans: ["ProductSans", "sans-serif"],
      MinionPro: ["MinionPro Pro"],
    },
  },
  plugins: [],
};

export default config;
