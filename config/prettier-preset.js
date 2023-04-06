module.exports = {
    tabWidth: 4,
    bracketSpacing: true,
    bracketSameLine: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: "es5",
    semi: false,
    printWidth: 110,
    arrowParens: "always",
    importOrder: [
        "^lib/(.*)$",
        "^components/(.*)$",
        "^(server|trpc)/(.*)$",
        "^~/(.*)$",
        "^[./]",
    ],
    importOrderSeparation: true,
    plugins: [require("./merged-prettier-plugin")],
    // overrides: [
    //     {
    //         files: ["apps/website/lib/utils/wordlist/wordlist.ts"],
    //         options: {
    //             quoteProps: "consistent",
    //         },
    //     },
    // ],
};
