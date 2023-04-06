/** @type {import("next-i18next").UserConfig} */
const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
  },
  reloadOnPrerender: process.env.NODE_ENV !== "production",
};

// export const reloadOnPrerender =process.env.NODE_ENV !== "production"

// export const i18n = {
//     defaultLocale: "en",
//     locales: ["en", "ar"],
// }

module.exports = config;
