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
        background: "var(--background)",
        foreground: "var(--foreground)",
          'redBrown': '#c59199',
          'darkBlue': '#0C163B'


      },
      spacing:{
        '15%':"15%",
        "30%":"30%",
        "5%":"5%",
        "7%":"7%",
        "2%":"2%",
        "1%":"1%",
        "3%":"3%",
        "0%": "10%",
        "10%": "10%",
        "40%": "40%",

    },
  },
  },
  plugins: [],
};
export default config;
