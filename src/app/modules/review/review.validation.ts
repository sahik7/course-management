import { z } from 'zod'

export const rating = [1, 2, 3, 4, 5]

const reviewValidation = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number().refine(value => rating.includes(value), {
      message: 'Invalid',
    }),
    review: z.string(),
  }),
})

export const reviewValidationSchema = {
  reviewValidation,
}
