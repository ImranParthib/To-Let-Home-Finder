/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          300: "#93C5FD",
          400: "#60A5FA",
          600: "#2563EB",
          800: "#1E40AF",
        },
        yellow: {
          300: "#FDE047",
        },
        purple: {
          600: "#9333EA",
        },
        gray: {
          50: "#F9FAFB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          700: "#374151",
          800: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
