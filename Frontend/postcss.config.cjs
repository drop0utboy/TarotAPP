// postcss.config.js
/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},    // Tailwind v4용 PostCSS 플러그인
    autoprefixer: {},             // 자동 벤더 프리픽스
  },
};