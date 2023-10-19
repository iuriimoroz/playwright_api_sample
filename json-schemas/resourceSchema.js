import { z } from "zod"

export const resourceSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    year: z.number(),
    color: z.string(),
    pantone_value: z.string()
  }),
  support: z.object({ url: z.string(), text: z.string() })
})