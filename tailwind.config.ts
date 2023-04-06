import { type Config } from "tailwindcss"

const base = require("./config/tailwind-preset")

export default {
    ...base,
    content: [...base.content],
    // content: [
    //     ...base.content,
    //     "./pages/**/*.{js,ts,jsx,tsx}",
    //     "./modules/**/*.{js,ts,jsx,tsx}",
    //     "./components/**/*.{js,ts,jsx,tsx}",
    //     "./icons/**/*.{js,ts,jsx,tsx}",
    //     "./ui/**/*.{js,ts,jsx,tsx}",
    // ],
    // theme: {
    //     extend: {
    //         colors: {
    //             primary: "#046684",
    //             secondary: "#B5A072",
    //         },
    //     },
    // },
    // plugins: [],
} satisfies Config
