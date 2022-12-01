module.exports = {
  theme: {
    color: {
      gray: '#ebedf0'
    },
    extend: {
      animation: {
        floats: 'floats 3s ease-in-out infinite',
      },
      keyframes: {
        floats: {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0)'},
        }
      }
    },
  },
  plugins: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html",
  ],
  important: true,
};
