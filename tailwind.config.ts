
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: '#161A23', // Playful "off-black" for base
          accent: '#262A39', // Lighter dark for cards
        },
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#E879F9', // Vivid pink
          foreground: '#FDE68A', // Accent yellow for fg
        },
        secondary: {
          DEFAULT: '#38E69A',
          foreground: '#161A23'
        },
        gem: {
          DEFAULT: "#5EEAD4", // Cyan/green for gems/icons
        },
        playpurple: "#A78BFA",
        playyellow: "#FDE68A",
        playlime: "#D9F99D",
        playpink: "#F9A8D4"
      },
      fontFamily: {
        rounded: ['"Nunito", "Inter", sans-serif'],
      },
      borderRadius: {
        xl: "2rem",
        '4xl': "3rem"
      },
      boxShadow: {
        'playful': "0 6px 36px 0 rgba(207,148,255,0.20), 0 1px 6px 0 rgba(0,0,0,0.13)",
      },
      animation: {
        'bounce-twice': "bounce 0.8s 1.2 2",
        'pop': 'pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both'
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(.95)", opacity: ".6" },
          "70%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
