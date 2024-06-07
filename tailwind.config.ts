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
        "gradient-blue-white":
          "linear-gradient(180deg, #FFFFFF 0%, #F5F8FF 100%);",
      },
      colors: {
        primary: "#2C3A5C",
        secondary: "#333333",
        success: "#1ECC40",
        alert: "#EAAB00",
        error: "#FF5A5A",
        incomplete: "#0076FF",
        orangeStatus: "#FF6C02",
        lightBackground: "#F5FAFF",
        progress: "#90f4c9",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
    borderColor: {
      DEFAULT: "#D4E4F2",
      secondary: "#2C3A5C",
      slight: "#d4e4f2",
      borderOpticy: "#d4e4f280",
      success: "#1ECC40",
      alert: "#EAAB00",
      error: "#FF5A5A",
    },
    borderWidth: {
      DEFAULT: "0.5px",
    },
    fontFamily: {
      Helvetica: ["Helvetica Neue", "sans-serif"],
      ProductSans: ["Product Sans", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
