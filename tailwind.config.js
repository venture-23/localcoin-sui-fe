const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './container/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #1384F5, #4EABFE)'
        // Define your gradient background here
      },
      colors: {
        primary: '#1384F5', // Replace with your primary color
        secondary: '#4EABFE', // Replace with your secondary color
        text: '#212B34',
        textSecondary: 'rgba(33, 53, 52, 0.48)',
        bgGray: '#F7F8FA',
        bgWhite: '#FFFFFF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite'
      }
    }
  },

  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    })
  ]
};
