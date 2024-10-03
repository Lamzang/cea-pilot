import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "2/5": "40%",
      },
      colors: {
        customBlue: {
          light: "#5B99C2",
          default: "#1F316F",
        },
        customBg: {
          default: "#F9DBBA",
        },
        customModalBg: {
          default: "rgba(0, 0, 0, 0.4)",
        },
        mainBlue: {
          light: "#B8D1FF",
          default: "#51A2DA",
          gray: "#C2CEE5",
          white: "#F2F4F9",
        },
      },
    },
  },
  plugins: [],
};
export default config;
