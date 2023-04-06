// import path from "path"
const path = require("path")
// export * from "./config/next-i18next.config.mjs"
const i18nConfig = require("./config/next-i18next.config")

/** @type {import("next-i18next").UserConfig} */
const config = {
    ...i18nConfig,
    localePath: path.resolve("./public/static/locales"),
};

// export const localePath = path.resolve("./public/static/locales")

module.exports = config;
