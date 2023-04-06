import NextAuth from "next-auth";
import { authOptions } from "modules/auth/lib/next-auth-options";

export default NextAuth(authOptions);
