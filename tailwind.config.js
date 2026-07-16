/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0c1f38",
          950: "#081527",
        },
      },
    },
  },
  plugins: [],
};
