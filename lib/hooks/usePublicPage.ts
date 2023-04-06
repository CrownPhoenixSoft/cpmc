import { useRouter } from "next/router";

export default function usePublicPage() {
    const router = useRouter();
    const isPublicPage = !router.pathname.startsWith("/admin");
    return isPublicPage;
}
