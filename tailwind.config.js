/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
     // point the JIT to the fully compiled css file
    // to ensure all classes are included
   
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
