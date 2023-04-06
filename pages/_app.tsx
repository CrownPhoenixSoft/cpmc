import { httpBatchLink, httpLink, loggerLink, splitLink, TRPCClientErrorLike } from "@trpc/client"
import { withTRPC } from "@trpc/next"
import { Maybe } from "@trpc/server"
import "styles/globals.css"
import SuperJSON from "superjson"

import AppProviders, { AppProps } from "lib/app-providers"

import I18nLanguageHandler from "components/I18nLanguageHandler"

import { AppRouter } from "trpc/server/root"

function MyApp(props: AppProps) {
    const { Component, pageProps, err, router } = props
    let pageStatus = "200"
    if (router.pathname === "/404") {
        pageStatus = "404"
    } else if (router.pathname === "/500") {
        pageStatus = "500"
    }

    const providerProps = {
        ...props,
        pageProps: { ...props.pageProps },
    }

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <AppProviders {...providerProps}>
            <I18nLanguageHandler />
            {getLayout(<Component {...pageProps} err={err} />, router)}
        </AppProviders>
    )
}

export default withTRPC<AppRouter>({
    config() {
        const url =
            typeof window !== "undefined"
                ? "/api/trpc"
                : process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}/api/trpc`
                : `http://${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/trpc`

        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        return {
            /**
             * @link https://trpc.io/docs/links
             */
            links: [
                // adds pretty logs to your console in development and logs errors in production
                loggerLink({
                    enabled: (opts) =>
                        !!process.env.NEXT_PUBLIC_DEBUG ||
                        (opts.direction === "down" && opts.result instanceof Error),
                }),
                splitLink({
                    // check for context property `skipBatch`
                    condition: (op) => {
                        return op.context.skipBatch === true
                    },
                    // when condition is true, use normal request
                    true: httpLink({ url }),
                    // when condition is false, use batching
                    false: httpBatchLink({
                        url,
                        /** @link https://github.com/trpc/trpc/issues/2008 */
                        // maxBatchSize: 7
                    }),
                }),
            ],
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        /**
                         * 1s should be enough to just keep identical query waterfalls low
                         * @example if one page components uses a query that is also used further down the tree
                         */
                        staleTime: 1000,
                        /**
                         * Retry `useQuery()` calls depending on this function
                         */
                        retry(failureCount, _err) {
                            const err = _err as never as Maybe<TRPCClientErrorLike<AppRouter>>
                            const code = err?.data?.code
                            if (code === "BAD_REQUEST" || code === "FORBIDDEN" || code === "UNAUTHORIZED") {
                                // if input data is wrong or you're not authorized there's no point retrying a query
                                return false
                            }
                            const MAX_QUERY_RETRIES = 3
                            return failureCount < MAX_QUERY_RETRIES
                        },
                    },
                },
            },
            /**
             * @link https://trpc.io/docs/data-transformers
             */
            transformer: SuperJSON,
        }
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false,
})(MyApp)
