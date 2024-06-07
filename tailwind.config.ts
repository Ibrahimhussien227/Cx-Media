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
        active: "#FF6C02",
        secondary: "#2C3A5C",
        secondaryText: "#88B6CC",
        success: "#1ECC40",
        pending: "#FFCE00",
        incomplete: "#0076FF",
        orange: "#FF6C02",
        seperator: "#f5faff",
        lightBackground: "#F5FAFF",
        progress: "#90f4c9",
        text: "#2C3A5C",
        faint: "#93A0C3"
      },
      backgroundColor: {
        success: "#E6FFEB",
        pending: "#FFFAD0",
        incomplete: "#EDF5FF",
        orange: "#FF6C02",
        gradient: "transparent linear-gradient(90deg, #232F4B 0%, #232F4B 100%)"
      },
    },
    borderColor: {
      DEFAULT: "#5A6A93",
      borderOpticy: "#5A6A9380",
      success: "#1ECC40",
      pending: "#FFCE00",
      incomplete: "#0076FF",
      orange: "#FF6C02",
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
