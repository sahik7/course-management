import express from 'express'
import { ReviewController } from './review.controller'
import { reviewValidationSchema } from './review.validation'
import validateReq from '../../../middlewares/validateReq'

const router = express.Router()

router.post(
  '/reviews',
  validateReq(reviewValidationSchema.reviewValidation),
  ReviewController.createReview,
)

export const ReviewRoutes = router
