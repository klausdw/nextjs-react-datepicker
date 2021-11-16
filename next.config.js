/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['de', 'en', 'tr'],
    defaultLocale: 'de',
    localeDetection: false,
  },
  eslint: {
    dirs: ['pages', 'components'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}
