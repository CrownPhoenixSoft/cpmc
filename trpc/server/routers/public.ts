import { publicProcedure, router } from "../trpc";

export const publicRouter = router({
    session: publicProcedure.query(({ ctx }) => {
        return ctx.session;
    }),
    i18n: publicProcedure.query(async ({ ctx }) => {
        const { locale, i18n } = ctx;
        return {
            i18n,
            locale,
        };
    }),
});
