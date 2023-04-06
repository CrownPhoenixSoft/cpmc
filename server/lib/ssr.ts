import { GetServerSidePropsContext } from "next"
import superjson from "superjson"

import {createProxySSGHelpers} from "@trpc/react-query/ssg"
import { createContext } from "trpc/server/createContext"
import { appRouter } from "trpc/server/root"

/**
 * Initialize server-side rendering tRPC helpers.
 * Provides a method to prefetch tRPC-queries in a `getServerSideProps`-function.
 * Automatically prefetches i18n based on the passed in `context`-object to prevent i18n-flickering.
 * Make sure to `return { props: { trpcState: ssr.dehydrate() } }` at the end.
 */
export async function ssrInit(context: GetServerSidePropsContext) {
    const ctx = await createContext(context)

    const ssr = createProxySSGHelpers({
        router: appRouter,
        transformer: superjson,
        ctx,
    })

    // always preload "viewer.public.i18n"
    await ssr.public.i18n.fetch()

    return ssr
}
