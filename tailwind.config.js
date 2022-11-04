/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "84vh": "84vh",
      },
      fontFamily: {
        style: "Kolker Brush",
      },
      fontSize: {
        "7xl": "10rem",
      },
      gridTemplateColumns: {
        Movies: "350px 1fr",
      },
      width: {
        95: "95%",
      },
    },
  },
  plugins: [],
};
