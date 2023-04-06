import * as z from "zod"
import * as imports from "../zod-utils"
import { IdentityProvider, UserPermissionRole } from "@prisma/client"
import { CompleteImpersonation, ImpersonationModel, CompleteSession, SessionModel, CompleteAccount, AccountModel, CompleteFeedback, FeedbackModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _UserModel = z.object({
  id: z.number().int(),
  username: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  phone: z.string().nullish(),
  emailVerified: z.date().nullish(),
  bio: z.string().nullish(),
  avatar: z.string().nullish(),
  locale: z.string().nullish(),
  password: z.string(),
  isSuperAdmin: z.boolean(),
  identityProvider: z.nativeEnum(IdentityProvider),
  identityProviderId: z.string().nullish(),
  trialEndsAt: z.date().nullish(),
  completedOnboarding: z.boolean(),
  away: z.boolean(),
  twoFactorSecret: z.string().nullish(),
  twoFactorEnabled: z.boolean(),
  metadata: imports.userMetadata,
  verified: z.boolean().nullish(),
  role: z.nativeEnum(UserPermissionRole),
  disableImpersonation: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof _UserModel> {
  impersonatedUsers: CompleteImpersonation[]
  impersonatedBy: CompleteImpersonation[]
  sessions: CompleteSession[]
  accounts: CompleteAccount[]
  Feedback: CompleteFeedback[]
}

/**
 * UserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const UserModel: z.ZodSchema<CompleteUser> = z.lazy(() => _UserModel.extend({
  impersonatedUsers: ImpersonationModel.array(),
  impersonatedBy: ImpersonationModel.array(),
  sessions: SessionModel.array(),
  accounts: AccountModel.array(),
  Feedback: FeedbackModel.array(),
}))
