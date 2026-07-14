/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // yaha sari React files include honi chahiye
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        transparent: "ffffff00",

        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585d69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },
        richblack: {
          5: "#ECF5FF",
          25: "#C6D6E1",
          50: "#A0B7C3",
          100: "#7A98A6",
          200: "#537988",
          300: "#2D5A6A",
          400: "#073B4C",
          500: "#063544",
          600: "#042E3B",
          700: "#032833",
          800: "#01212A",
          900: "#001822",
        },
        blue: {
          5: "#EAF5FF",
          25: "#B4DAEC",
          50: "#7EC0D9",
          100: "#47A5C5",
          200: "#118AB2",
          300: "#0F7A9D",
          400: "#0C6AB7",
          500: "#0A5A72",
          600: "#074B5D",
          700: "#053B48",
          800: "#032C34", 
          900: "#011E20",
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "edu-sa": ["Edu SA Beginner", "cursive"],
        mono: ["Roboto Mono",  "monospace"],
      },
    },
  },
  plugins: [],
}