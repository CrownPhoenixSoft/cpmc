import Footer from "components/Footer"
import Navbar from "components/Navbar"
import SocialMedia from "components/SocialMedia"

function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <SocialMedia />
            <Footer />
        </>
    )
}

export const getPageLayout = (page: React.ReactElement) => <PageLayout>{page}</PageLayout>
