import * as z from "zod"
import * as imports from "../zod-utils"

export const _DoctorModel = z.object({
  id: z.number().int(),
  image: z.string(),
  fullName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
