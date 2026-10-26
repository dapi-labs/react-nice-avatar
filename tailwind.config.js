/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./demo/**/*.{html,js,ts,jsx,tsx}", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      highres: "1680px",
      superres: "1900px",
      "5k": "2200px",
    },
  },
  plugins: [],
};
