import gsap from "gsap"
import Image from "next/image"

export default function GoogleMap() {
    return (
        <>
            <div
                className="fixed left-8 top-8 z-50 cursor-pointer"
                onClick={() => {
                    gsap.to("#map-container", {
                        width: "100%",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        opacity: 1,
                        pointerEvents: "auto",
                    })
                    gsap.to("#map", {
                        width: 800,
                        height: 600,
                    })
                    gsap.to("#map-preview", {
                        opacity: 0,
                        scale: 0,
                    })
                }}>
                <div id="map-preview" className="rounded-md bg-white p-2">
                    <Image src="/location.png" alt="location" width={150} height={150} className="border" />
                </div>
            </div>
            <div
                id="map-container"
                className="pointer-events-none fixed left-0 top-0 z-50 flex opacity-0"
                onClick={() => {
                    gsap.to("#map-container", {
                        width: 150,
                        height: 150,
                        backgroundColor: "transparent",
                        opacity: 0,
                        pointerEvents: "none",
                    })
                    gsap.to("#map", {
                        width: 150,
                        height: 150,
                    })
                    gsap.to("#map-preview", {
                        opacity: 1,
                        scale: 1,
                    })
                }}>
                <iframe
                    id="map"
                    className="m-auto h-[200px] w-[200px] max-w-[90%] rounded-md"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.6050094224477!2d54.358941099999996!3d24.478178999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e673f15c1dd95%3A0xe6bd20cb96f9bd2d!2sCrown%20Phoenix%20Marketing%20Consultancy!5e0!3m2!1sen!2sae!4v1680786303303!5m2!1sen!2sae"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    )
}
