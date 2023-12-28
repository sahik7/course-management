import { IReview } from './review.interface'
import { Review } from './review.model'

const createReviewIntoDb = async (payload: IReview) => {
  const review = await Review.create(payload)
  return review
}

export const ReviewService = {
  createReviewIntoDb,
}
