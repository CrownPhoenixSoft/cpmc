import * as z from "zod"
import * as imports from "../zod-utils"

export const _ServiceModel = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
