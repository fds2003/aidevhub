import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        border:        'hsl(var(--border))',
        'border-hover':'hsl(var(--border-hover))',
        input:         'hsl(var(--input))',
        ring:          'hsl(var(--ring))',
        background:    'hsl(var(--background))',
        surface:       'hsl(var(--surface))',
        foreground:    'hsl(var(--foreground))',
        primary: {
          DEFAULT:      'hsl(var(--primary))',
          hover:        'hsl(var(--primary-hover))',
          foreground:   'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:      'hsl(var(--secondary))',
          foreground:   'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:      'hsl(var(--destructive))',
          foreground:   'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:      'hsl(var(--muted))',
          foreground:   'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:      'hsl(var(--accent))',
          foreground:   'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:      'hsl(var(--popover))',
          foreground:   'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:      'hsl(var(--card))',
          foreground:   'hsl(var(--card-foreground))',
        },
        // Obsidian brand colors
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: 'hsl(var(--primary))',   // primary
          600: '#0891B2',
        },
        terminal: {
          300: '#6EE7B7',
          400: '#34D399',
          500: 'hsl(var(--accent))',   // accent
        },
        obsidian: {
          900: 'hsl(var(--surface))',
          950: 'hsl(var(--background))',
          border: 'hsl(var(--border))',
        },
      },
      borderRadius: {
        lg:   'var(--radius)',
        md:   'calc(var(--radius) - 2px)',
        sm:   'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'glow-cyan':  '0 0 20px rgba(0, 217, 255, 0.25), 0 0 60px rgba(0, 217, 255, 0.08)',
        'glow-green': '0 0 20px rgba(0, 255, 135, 0.2),  0 0 60px rgba(0, 255, 135, 0.06)',
        'card':       '0 2px 8px rgba(0,0,0,0.4)',
        'card-lg':    '0 8px 24px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%'  : { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%'      : { opacity: '0' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(0, 217, 255, 0.15)' },
          '50%'      : { borderColor: 'rgba(0, 217, 255, 0.35)' },
        },
      },
      animation: {
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
        'fade-in':        'fade-in 0.4s ease-out forwards',
        'slide-up':       'slide-up 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'shimmer':        'shimmer 2.5s linear infinite',
        'blink':          'blink 1s step-end infinite',
        'border-glow':    'border-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
