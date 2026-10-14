import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#090b10',
        foreground: '#f3f1ea',
        amber: '#e3ad5d',
        navy: '#111829',
        charcoal: '#1a1d24'
      },
      boxShadow: {
        glow: '0 0 28px rgba(227, 173, 93, 0.35)'
      }
    }
  },
  plugins: []
} satisfies Config;
