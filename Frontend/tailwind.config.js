/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
    colors: {
      primary: "#2563EB", // Blue for trust
      secondary: "#F59E0B", // Amber for energy
      accent: "#10B981", // Green for go/success
      background: "#F9FAFB",
      surface: "#FFFFFF",
    },
  },
  plugins: [],
};
