import { env } from "env.mjs";
import { z } from "zod";
import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "trpc/server/root";
import { getServerSession } from "modules/auth/lib/getServerSession";
import { createContext as createTrpcContext } from "trpc/server/createContext";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    /**
     * @link https://trpc.io/docs/context
     */
    createContext: ({ req, res }) => {
        const sessionGetter = () => getServerSession({ req, res });

        return createTrpcContext({ req, res }, sessionGetter);
    },
    /**
     * @link https://trpc.io/docs/error-handling
     */
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {
                  console.error(
                      `❌ tRPC failed on ${path ?? "<no-path>"}: ${
                          error.message
                      }`
                  );
              }
            : undefined,
    /**
     * Enable query batching
     */
    batching: {
        enabled: true,
    },
    /**
     * @link https://trpc.io/docs/caching#api-response-caching
     */
    responseMeta({ ctx, paths, type, errors }) {
        // const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
        // assuming you have all your public routes with the keyword `public` in them
        const allPublic =
            paths && paths.every((path) => path.startsWith("viewer.public."));
        // checking that no procedures errored
        const allOk = errors.length === 0;
        // checking we're doing a query request
        const isQuery = type === "query";
        const noHeaders = {};

        // We cannot set headers on SSG queries
        if (!ctx?.res) return noHeaders;

        const defaultHeaders: Record<"headers", Record<string, string>> = {
            headers: {},
        };

        const timezone = z
            .string()
            .safeParse(ctx.req?.headers["x-vercel-ip-timezone"]);
        if (timezone.success)
            defaultHeaders.headers["x-cal-timezone"] = timezone.data;

        // We need all these conditions to be true to set cache headers
        if (!(allPublic && allOk && isQuery)) return defaultHeaders;

        // No cache by default
        defaultHeaders.headers["cache-control"] = `no-cache`;

        // Our cache can change depending on our current paths value. Since paths is an array,
        // we want to create a map that can match potential paths with their desired cache value
        const cacheRules = {
            "public.session": `no-cache`,
            "public.i18n": `no-cache`,
        } as const;

        // Find which element above is an exact match for this group of paths
        const matchedPath = paths.find(
            (v) => v in cacheRules
        ) as keyof typeof cacheRules;

        if (matchedPath)
            defaultHeaders.headers["cache-control"] = cacheRules[matchedPath];

        // Finally we respond with our resolved cache value
        return defaultHeaders;
    },
});
