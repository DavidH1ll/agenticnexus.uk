/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--obsidian) / <alpha-value>)',
        slate: 'rgb(var(--slate) / <alpha-value>)',
        'slate-soft': 'rgb(var(--slate-soft) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        'accent-glow': 'rgb(var(--accent-glow) / <alpha-value>)',
        amber: 'rgb(var(--amber) / <alpha-value>)',
        emerald: 'rgb(var(--emerald) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.25rem, 6.5vw + 1rem, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.5rem, 4.5vw + 1rem, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 3vw + 1rem, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        prose: '68ch',
        'page': '72rem',
      },
    },
  },
  plugins: [],
}
