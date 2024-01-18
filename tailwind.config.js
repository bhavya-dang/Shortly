/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/src/**/*.{html,js,vue}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        // shadows: ["Shadows Into Light", "cursive"],
      },
    },
  },
  plugins: [],
};
