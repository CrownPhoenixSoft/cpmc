import { authedProcedure, router } from "../trpc";

export const loggedInRouter = router({
    me: authedProcedure.query(async ({ ctx }) => {
        const { user } = ctx;
        // Destructuring here only makes it more illegible
        // pick only the part we want to expose in the API
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
            completedOnboarding: user.completedOnboarding,
            trialEndsAt: user.trialEndsAt,
            twoFactorEnabled: user.twoFactorEnabled,
            disableImpersonation: user.disableImpersonation,
            identityProvider: user.identityProvider,
            away: user.away,
            metadata: user.metadata,
        };
    }),
});
