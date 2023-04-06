import { TooltipProvider } from "@radix-ui/react-tooltip"
import { SessionProvider } from "next-auth/react"
import { appWithTranslation, SSRConfig } from "next-i18next"
import { ThemeProvider } from "next-themes"
import type { AppProps as NextAppProps, AppProps as NextJsAppProps } from "next/app"
import { NextRouter } from "next/router"
import { ComponentProps, ReactNode } from "react"
import { Toaster } from "react-hot-toast"

// import { trpc } from "@cpmc/trpc/react"
import usePublicPage from "lib/hooks/usePublicPage"

import { trpc } from "trpc/react"

// import { api } from "./api";
// import { WithNonceProps } from "@lib/withNonce"
// import { MetaProvider } from "@cpmc/ui";

const I18nextAdapter = appWithTranslation<NextJsAppProps<SSRConfig> & { children: React.ReactNode }>(
    ({ children }) => <>{children}</>
)

// Workaround for https://github.com/vercel/next.js/issues/8592
export type AppProps = Omit<NextAppProps<Record<string, unknown>>, "Component"> & {
    Component: NextAppProps["Component"] & {
        requiresLicense?: boolean
        isThemeSupported?: boolean | ((arg: { router: NextRouter }) => boolean)
        getLayout?: (page: React.ReactElement, router: NextRouter) => ReactNode
    }

    /** Will be defined only is there was an error */
    err?: Error
}

type AppPropsWithChildren = AppProps & {
    children: ReactNode
}

const CustomI18nextProvider = (props: AppPropsWithChildren) => {
    /**
     * i18n should never be clubbed with other queries, so that it's caching can be managed independently.
     * We intend to not cache i18n query
     **/
    const { i18n, locale } = trpc.public.i18n.useQuery(undefined, {
        trpc: { context: { skipBatch: true } },
    }).data ?? {
        locale: "en",
    }

    const passedProps = {
        ...props,
        pageProps: {
            ...props.pageProps,
            ...i18n,
        },
        router: locale ? { locale } : props.router,
    } as unknown as ComponentProps<typeof I18nextAdapter>
    return <I18nextAdapter {...passedProps} />
}

const AppProviders = (props: AppPropsWithChildren) => {
    const session = trpc.public.session.useQuery().data
    // No need to have intercom on public pages - Good for Page Performance
    const isPublicPage = usePublicPage()
    const isThemeSupported =
        typeof props.Component.isThemeSupported === "function"
            ? props.Component.isThemeSupported({ router: props.router })
            : props.Component.isThemeSupported
    const forcedTheme = isThemeSupported ? undefined : "light"
    // console.log(forcedTheme)
    // Use namespace of embed to ensure same namespaced embed are displayed with same theme. This allows different embeds on the same website to be themed differently
    // One such example is our Embeds Demo and Testing page at http://localhost:3100
    // Having `getEmbedNamespace` defined on window before react initializes the app, ensures that embedNamespace is available on the first mount and can be used as part of storageKey
    // const embedNamespace =
    //     typeof window !== "undefined" ? window.getEmbedNamespace() : null
    // const storageKey =
    //     typeof embedNamespace === "string"
    //         ? `embed-theme-${embedNamespace}`
    //         : "theme"

    const RemainingProviders = (
        <SessionProvider session={session || undefined}>
            <CustomI18nextProvider {...props}>
                <TooltipProvider>
                    <ThemeProvider
                        // enableColorScheme={false}
                        // storageKey={"theme"}
                        forcedTheme={forcedTheme}
                        enableSystem
                        attribute="class">
                        <Toaster position="bottom-center" />
                        {props.children}
                    </ThemeProvider>
                </TooltipProvider>
            </CustomI18nextProvider>
        </SessionProvider>
    )

    if (isPublicPage) {
        return RemainingProviders
    }

    return RemainingProviders
}

export default AppProviders
