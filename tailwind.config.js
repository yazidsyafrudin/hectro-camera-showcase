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
        canvas: "#060606",
        brass: {
          DEFAULT: "#C9A05C",
          dim: "#9E7B3B",
          glow: "#D9B26E",
        },
        parchment: {
          DEFAULT: "#EDE8E0",
          90: "rgba(237, 232, 224, 0.90)",
          55: "rgba(237, 232, 224, 0.55)",
          25: "rgba(237, 232, 224, 0.25)",
          10: "rgba(237, 232, 224, 0.10)",
          '05': "rgba(237, 232, 224, 0.05)",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'slow-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      letterSpacing: {
        'ultra': '0.28em',
        'subtle': '0.08em',
      },
    },
  },
  plugins: [],
};
