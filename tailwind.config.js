/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#F2870D",
        "secondary": "#080808",
        "tertiary": "#5E29A1",
        "cultured": "#F4F4F4",
        "violetblue": "#2943A1",
        "inchworm": "#BBF246",
        "sunsetorange": "#FF5959",
      },
    },
  },
  plugins: [],
};
