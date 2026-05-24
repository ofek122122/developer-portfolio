import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        signal: 'var(--signal)',
        cobalt: 'var(--cobalt)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',

        // shadcn-style aliases used by existing components / habits
        background: 'var(--paper)',
        surface: 'var(--paper)',
        muted: 'var(--ink-soft)',
        border: 'var(--rule)',
        input: 'var(--rule)',
        ring: 'var(--ink)',
        primary: {
          DEFAULT: 'var(--signal)',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'var(--cobalt)',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Frank Ruhl Libre', 'Georgia', 'serif'],
        'display-he': ['Frank Ruhl Libre', 'Heebo', 'serif'],
        sans: ['Inter Tight', 'Heebo', 'system-ui', 'sans-serif'],
        hebrew: ['Heebo', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        prose: '62ch',
      },
    },
  },
  plugins: [animate],
}

export default config
