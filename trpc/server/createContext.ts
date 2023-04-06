import * as trpc from "@trpc/server"
import { Maybe } from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { getServerSession } from "modules/auth/lib/getServerSession"
import type { GetServerSidePropsContext } from "next"
import type { Session } from "next-auth"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

// import { getServerSession } from "@cpmc/features/auth/lib/getServerSession";
// import { WEBSITE_URL } from "lib/constants";
// import { defaultAvatarSrc } from "@cpmc/lib/defaultAvatarImage";
import { getLocaleFromHeaders } from "lib/i18n"
import { prisma } from "lib/prisma"

type CreateContextOptions = trpcNext.CreateNextContextOptions | GetServerSidePropsContext

async function getUserFromSession({
    session,
    req,
}: {
    session: Maybe<Session>
    req: CreateContextOptions["req"]
}) {
    if (!session?.user?.id) {
        return null
    }
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            avatar: true,
            twoFactorEnabled: true,
            away: true,
            completedOnboarding: true,
            trialEndsAt: true,
            createdAt: true,
            disableImpersonation: true,
            identityProvider: true,
            metadata: true,
            role: true,
        },
    })

    if (!user) {
        return null
    }
    const { email } = user
    if (!email) {
        return null
    }

    // const rawAvatar = user.avatar;
    // This helps to prevent reaching the 4MB payload limit by avoiding base64 and instead passing the avatar url
    // user.avatar = rawAvatar
    //     ? `${WEBSITE_URL}/${user.username}/avatar.png`
    //     : defaultAvatarSrc({ email });

    const locale = getLocaleFromHeaders(req)
    return {
        ...user,
        // rawAvatar,
        email,
        locale,
    }
}

type CreateInnerContextOptions = {
    session: Session | null
    locale: string
    user: Awaited<ReturnType<typeof getUserFromSession>>
    i18n: Awaited<ReturnType<typeof serverSideTranslations>>
} & Partial<CreateContextOptions>

export async function createContextInner(opts: CreateInnerContextOptions) {
    return {
        prisma,
        ...opts,
    }
}

export const createContext = async ({ req, res }: CreateContextOptions, sessionGetter = getServerSession) => {
    const session = await sessionGetter({ req, res })

    const user = await getUserFromSession({ session, req })
    const locale = getLocaleFromHeaders(req)
    const i18n = await serverSideTranslations(locale, ["common", "vital"])

    const contextInner = await createContextInner({
        session,
        user,
        locale,
        i18n,
    })
    return { ...contextInner, req, res }
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>
