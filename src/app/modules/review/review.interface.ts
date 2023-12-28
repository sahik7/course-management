import { Types } from 'mongoose'

export type IRating = 1 | 2 | 3 | 4 | 5

export interface IReview {
  courseId: Types.ObjectId
  rating: IRating
  review: string
}
