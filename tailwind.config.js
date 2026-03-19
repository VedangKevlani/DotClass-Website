export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#47BA74",
        accent: "#F2813C",
        muted: "#7B8B82",
        lightbg: "#E0EADB",
        dark: "#1A1C1B"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: [],
}