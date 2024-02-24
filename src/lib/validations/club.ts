import { z } from "zod"

export const createGroupSchema = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
})
export type CreateGrouoType = z.infer<typeof createGroupSchema>
