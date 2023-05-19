/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
   
    
   ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      Proxima:['Proxima Nova,sans-serif']
    },
    extend: {
      backgroundImage:{

        "Landingimage":'url("./components/assets/first-banner.jpg")',
        "homepage":'url("./components/assets/home.jpg")',
        "loginImg":'url("./components/assets/4500137.jpg")',
        "flag":'url("./components/assets/27130.jpg")'

        

      },
      width: {
        '600': '600px',
        '31rem':'31rem'
       },
       fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '1.5rem':'1.5rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors:{
        'dark-purple':"#f1f5f9",
        'light-white':'rgba(255,255,0,18',
        'siteviolet':'rgb(35, 9, 57)',
        'blueColor':"#2a68ff",
        'greyIsh':'#f1f4f8',
        "cardShadow":"#252b39"
      },
      position:{
        "mt":"-23px"
      },
      height:{
        "divheight":"570px",
        
      }
     
    },
  },
  plugins: [
   
require("daisyui"),
require("tailwind-scrollbar")
  ],
}
