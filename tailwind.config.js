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
        "left-bg": "#F8F0E5",
        "right-bg": "#EADBC8",
        "custom-third": "#DAC0A3",
        "custom-text-color": "#102C57",
        "custom-text-hover": "#f6f6f6",
      },
    },
  },
  plugins: [],
};
