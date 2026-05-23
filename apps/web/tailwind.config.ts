import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Gamification — vibrant indigo palette for educational tone
        brand: {
          DEFAULT: 'hsl(238 83% 62%)',
          hover: 'hsl(238 83% 52%)',
          glow: 'hsl(238 83% 62% / 0.2)',
        },
        mastery: {
          DEFAULT: 'hsl(220 6% 62%)',
          glow: 'hsl(220 6% 62% / 0.2)',
        },
        streak: {
          DEFAULT: 'hsl(220 7% 55%)',
          glow: 'hsl(220 7% 55% / 0.2)',
        },
        xp: {
          DEFAULT: 'hsl(238 83% 62%)',
          glow: 'hsl(238 83% 62% / 0.2)',
        },
        rank: {
          bronze: '#cd7f32',
          silver: '#c0c0c0',
          gold: '#ffd700',
          platinum: '#e5e4e2',
          diamond: '#b9f2ff',
          master: '#ff6b35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        sidebar: '260px',
        'sidebar-collapsed': '72px',
        topbar: '64px',
      },
      maxWidth: {
        content: '1200px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'flame-flicker': 'flame-flicker 0.8s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'xp-pop': 'xp-pop 1.5s ease-out forwards',
        shake: 'shake 0.5s ease-in-out',
        'ring-fill': 'ring-fill 1.5s ease-in-out forwards',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px hsl(238 83% 62% / 0.15)' },
          '50%': { boxShadow: '0 0 25px hsl(238 83% 62% / 0.3)' },
        },
        'flame-flicker': {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '50%': { transform: 'scaleY(1.1) scaleX(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'xp-pop': {
          '0%': { opacity: '0', transform: 'translateY(0) scale(0.5)' },
          '30%': { opacity: '1', transform: 'translateY(-10px) scale(1.2)' },
          '60%': { opacity: '1', transform: 'translateY(-25px) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(0.8)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'ring-fill': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
