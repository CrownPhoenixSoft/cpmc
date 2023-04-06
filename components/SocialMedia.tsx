import BehanceIcon from "icons/BehanceIcon"
import DribbbleIcon from "icons/DribbbleIcon"
import FacebookIcon from "icons/Facebook"
import InstagramIcon from "icons/Instagram"
import LinkedInIcon from "icons/LinkedIn"
import TwitterIcon from "icons/Twitter"

export default function SocialMedia() {
    return (
        <div className="fixed bottom-8 right-8 flex flex-col items-center">
            <div className="flex flex-col gap-2 text-white">
                {socialMedia.map((sm, i) => (
                    <a key={i} href={sm.url} target="_blank">
                        {sm.label}
                    </a>
                ))}
            </div>

            <div className="mt-2 h-28 w-[1px] bg-white" />
        </div>
    )
}

const socialMedia = [
    {
        label: (
            <p className="inline-flex items-center gap-2 transition-all hover:scale-125 hover:text-red-400">
                <FacebookIcon className="h-6 w-6" />
            </p>
        ),
        url: "https://www.facebook.com/crownphoenixmedia",
    },
    {
        label: (
            <p className="inline-flex items-center gap-2 transition-all hover:scale-125 hover:text-red-400">
                <InstagramIcon className="h-6 w-6" />
            </p>
        ),
        url: "https://www.instagram.com/crown_phoenix_marketing",
    },
    {
        label: (
            <p className="inline-flex items-center gap-2 transition-all hover:scale-125 hover:text-red-400">
                <TwitterIcon className="h-6 w-6" />
            </p>
        ),
        url: "https://twitter.com/CrownPhoenixMC",
    },
    {
        label: (
            <p className="inline-flex items-center gap-2 transition-all hover:scale-125 hover:text-red-400">
                <LinkedInIcon className="h-6 w-6" />
            </p>
        ),
        url: "https://www.linkedin.com/company/14637548",
    },
    {
        label: (
            <p className="inline-flex items-center gap-2 transition-all hover:scale-125 hover:text-red-400">
                <DribbbleIcon className="h-6 w-6" />
            </p>
        ),
        url: "https://dribbble.com/cpmc",
    },
    {
        label: (
            <p className="inline-flex items-center gap-2 transition-all hover:scale-125 hover:text-red-400">
                <BehanceIcon className="h-6 w-6" />
            </p>
        ),
        url: "https://www.behance.net/mshallaq",
    },
]
