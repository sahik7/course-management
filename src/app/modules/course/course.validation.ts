import { z } from 'zod'

const tagsValidation = z.object({
  name: z.string().refine(value => /^[A-Z]/.test(value), {
    message: 'First Name must start with a capital letter',
  }),
  isDeleted: z.boolean().optional().default(false),
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagsValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number(),
    details: z.object({
      level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      description: z.string(),
    }),
  }),
})

const updateCourseValidationSchema = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().optional(),
  tags: z.array(tagsValidation).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  durationInWeeks: z.number().optional(),
  details: z.object({
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    description: z.string().optional(),
  }).optional(),
})

export const courseValidationSchema = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
}
