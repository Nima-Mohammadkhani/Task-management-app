/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['vazir', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        pastel: {
          "primary": "#FFF9C4",
          "primary-content": "#5D6B5E", 
          
          "secondary": "#81C784",
          "secondary-content": "#FFFFFF",
          
          "accent": "#FFCC80",
          "accent-content": "#5D6B5E",
          
          "neutral": "#8B9A8E",
          "neutral-content": "#FFFFFF",
          
          "base-100": "#FFFFFF",
          "base-200": "#FEFCE8", 
          "base-300": "#FFFDF0",
          
          "info": "#81D4FA",
          "info-content": "#5D6B5E",
          
          "success": "#81C784",
          "success-content": "#FFFFFF",
          
          "warning": "#FFCC80",
          "warning-content": "#5D6B5E",
          
          "error": "#EF9A9A",
          "error-content": "#5D6B5E",
        },
      },
      "light",
    ],
    defaultTheme: "pastel",
  },
}