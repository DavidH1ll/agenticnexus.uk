/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--obsidian)',
        slate: 'var(--slate)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--text-muted)',
        accent: 'var(--accent)',
        amber: 'var(--amber)',
        emerald: 'var(--emerald)',
      },
    },
  },
  plugins: [],
}
