/** @type {import("prettier").Options} */
module.export = {
  useTabs: true,
  tabWidth: 4,
  bracketSameLine: true,
  singleAttributePerLine: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./config/tailwind.config.ts",
  importOrder: [
    "^@modules/(.*)$",
    "^@i18n/(.*)$",
    "^@a11y/(.*)$",
    "^@layouts/(.*)$",
    "^@pages/(.*)$",
    "^@components/(.*)$",
    "^@scripts/(.*)$",
    "^@styles/(.*)$",
    "^@assets/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
