import { APP_NAME } from "lib/constants"

export default function Footer() {
    return (
        <footer id="footer" className="fixed bottom-0 left-0 mr-10 p-4 sm:mr-0">
            <div className="container mx-auto text-center sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-300">
                    © {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
                </span>
                <div className="mt-4 flex space-x-6 sm:justify-center"></div>
            </div>
        </footer>
    )
}
