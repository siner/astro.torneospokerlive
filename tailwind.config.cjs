/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ['corporate', 'business'],
        darkTheme: 'business',
    },
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
