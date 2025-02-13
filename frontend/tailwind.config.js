/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], // Agregar DaisyUI aquí, no en vite.config.js
  daisyui: {
    themes: [
      'light', // default light theme
      'dark', // default dark theme
      'cupcake', // a cute theme
      'bumblebee', // a yellow theme
      'emerald', // a green theme
      'corporate', // a professional theme
      'synthwave', // a retro theme
      'retro', // another retro theme
      'cyberpunk', // a futuristic theme
      'valentine', // a pink theme
      'halloween', // a spooky theme
      'garden', // a green theme
      'forest', // a dark green theme
      'aqua', // a blue theme
      'lofi', // a minimalistic theme
      'pastel', // a pastel theme
      'fantasy', // a fantasy theme
      'wireframe', // a wireframe theme
      'black', // a black theme
      'luxury', // a luxurious theme
      'dracula', // a dark theme
      'cmyk', // a cmyk theme
      'autumn', // an autumn theme
      'business', // a business theme
      'acid', // a bright theme
      'lemonade', // a lemonade theme
      'night', // a night theme
      'coffee', // a coffee theme
      'winter', // a winter theme
    ],
  },
};

