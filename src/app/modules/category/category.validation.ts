import { z } from 'zod'

const categoryValidation = z.object({
  name: z.string(),
})

export const categoryValidationSchema = {
  categoryValidation,
}
