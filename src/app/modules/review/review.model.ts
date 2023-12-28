import { Schema, model } from 'mongoose'
import { IReview } from './review.interface'

const reviewSchema = new Schema<IReview>(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: 'Review' },
    rating: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: '{VALUE} is not a valid Rating',
      },
      required: true,
    },
    review: { type: String, required: true, unique: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

export const Review = model<IReview>('Review', reviewSchema)
