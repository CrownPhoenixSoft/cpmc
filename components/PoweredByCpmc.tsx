import Link from "next/link";
import { POWERED_BY_URL } from "@lib/constants";
import { useLocale } from "@lib/hooks/useLocale";

const PoweredByCpmc = () => {
    const { t } = useLocale();

    return (
        <div>
            <Link
                href={POWERED_BY_URL}
                target="_blank"
                className="text-bookinglight opacity-50 hover:opacity-100 dark:text-white"
            >
                <p>
                    {t("powered_by")} <p>Crown Phoenix</p>
                </p>
            </Link>
        </div>
    );
};

export default PoweredByCpmc;
