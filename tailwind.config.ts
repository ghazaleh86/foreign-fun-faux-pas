
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
			fontFamily: {
				sans: ['Circular', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
			  card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Headspace-inspired color palette
				headspace: {
					orange: '#F77737',
					'orange-light': '#FF8B66',
					'orange-dark': '#E55B2B',
					blue: '#4D9CE7',
					'blue-light': '#7BB3EA',
					'blue-dark': '#3A7BC8',
					green: '#68D391',
					'green-light': '#9AE6B4',
					'green-dark': '#48BB78',
					purple: '#B794F6',
					'purple-light': '#D6BCFA',
					'purple-dark': '#9F7AEA',
					yellow: '#F6E05E',
					'yellow-light': '#F7E98B',
					'yellow-dark': '#ECC94B',
					pink: '#F687B3',
					'pink-light': '#FBB6CE',
					'pink-dark': '#ED64A6',
					neutral: {
						50: '#FAFAFA',
						100: '#F5F5F5',
						200: '#E5E5E5',
						300: '#D4D4D4',
						400: '#A3A3A3',
						500: '#737373',
						600: '#525252',
						700: '#404040',
						800: '#262626',
						900: '#171717',
					},
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'gentle-bounce': {
					'0%, 100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
					},
					'50%': {
						transform: 'translateY(-10px)',
						animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
					}
				},
				'breathe': {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '0.8'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gentle-bounce': 'gentle-bounce 2s infinite',
				'breathe': 'breathe 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
