// tailwind.config.cjs
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  safelist: [
    /* 크기·flex 고정 */
    'w-32','w-40','h-48','h-60',
    'basis-32','basis-40','flex-none','shrink-0',
    'min-w-\\[8rem\\]','min-h-\\[12rem\\]',

    /* 카드 뒷면 그라디언트 팔레트 */
    { pattern: /^(from|via|to)-(purple|indigo|blue)-[6789]00$/ },
  ],

  theme: { extend: {} },
};
