import { User as PrismaUser } from "@prisma/client";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        user: User;
    }

    interface User extends Omit<DefaultUser, "id"> {
        id: PrismaUser["id"];
        emailVerified?: PrismaUser["emailVerified"];
        impersonatedByCUID?: string;
        username?: PrismaUser["username"];
        role?: PrismaUser["role"] | "INACTIVE_ADMIN";
        // email_verified?: boolean
        // belongsToActiveTeam?: boolean
        // emiratesId?: PrismaUser["emiratesId"];
        // serialNO?: PrismaUser["serialNO"];
    }
}
