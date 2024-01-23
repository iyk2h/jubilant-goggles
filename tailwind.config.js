/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        "left-bg": "#EADBC8",
        "right-bg": "#DAC0A3",
        "custom-third": "#F8F0E5",
        "custom-text-color": "#102C57",
        "custom-text-hover": "#F8F0E5",
      },
    },
  },
  plugins: [],
};
