import { mergeRouters, router } from "./trpc";
import { loggedInRouter } from "./routers/loggedIn";
import { publicRouter } from "./routers/public";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = mergeRouters(
    loggedInRouter,
    router({
        public: publicRouter,
    })
);

// export type definition of API
export type AppRouter = typeof appRouter;
