import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteUser, UserModel } from "./index"

export const _ImpersonationModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  impersonatedUserId: z.number().int(),
  impersonatedById: z.number().int(),
})

export interface CompleteImpersonation extends z.infer<typeof _ImpersonationModel> {
  impersonatedUser: CompleteUser
  impersonatedBy: CompleteUser
}

/**
 * ImpersonationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const ImpersonationModel: z.ZodSchema<CompleteImpersonation> = z.lazy(() => _ImpersonationModel.extend({
  impersonatedUser: UserModel,
  impersonatedBy: UserModel,
}))
