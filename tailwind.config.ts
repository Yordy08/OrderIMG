import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: ['./components/**/*.{vue,js,ts}', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      colors: { ink: '#172033', slate: '#64748b', brand: '#635bff', mint: '#16a394', cream: '#f7f8fc' },
      boxShadow: { soft: '0 18px 50px rgba(24, 32, 51, .08)' }
    }
  }
}
