import ContactDialog from "modules/contact-us/ContactDialog"
import { useState } from "react"

import { useLocale } from "lib/hooks/useLocale"

export default function Navbar() {
    const { t } = useLocale()
    const [contactOpen, setContactOpen] = useState(false)
    const links = [
        {
            label: t("home"),
            href: "/",
        },
        {
            label: t("services"),
            href: "/services",
        },
        {
            label: t("doctors"),
            href: "/doctors",
        },
        {
            label: t("about_us"),
            href: "/about-us",
        },
        {
            label: t("contact_us"),
            href: "/contact-us",
        },
    ]

    return (
        <>
            <div className="fixed right-0 top-0 z-10 w-full p-4 text-white">
                <div className="flex justify-between">
                    <div></div>
                    <div className="flex items-center gap-2"></div>
                    <div>
                        <button
                            type="button"
                            onClick={() => setContactOpen(true)}
                            className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800">
                            Contact us
                        </button>
                    </div>
                </div>
            </div>
            <ContactDialog isOpen={contactOpen} onOpenChange={(open) => setContactOpen(open)} />
        </>
    )
}
